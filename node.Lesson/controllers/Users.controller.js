const AsyncWrapper = require("../middleware/AsyncWrapper.js");
const User = require("../model/users.js");
const { SUCCESS, FAIL } = require("../utils/httpStatusText.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = require("../utils/JWT.js");
const appError = require("../utils/appError.js");

const user = AsyncWrapper(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(appError.create("المستخدم غير موجود", 404, FAIL));
    }

    res.status(200).json({
        status: SUCCESS,
        data: { user }
    });
});
const register = AsyncWrapper(async (req, res, next) => {
    const { password, number } = req.body;

    if (!password || !number) {
        return next(appError.create("من فضلك أدخل رقم الهاتف وكلمة المرور", 400, FAIL));
    }

    const existingUser = await User.findOne({ number });
    if (existingUser) {
        return next(appError.create("هذا الرقم مسجل بالفعل", 400, FAIL));
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
        ...req.body,
        password: hashPassword
    });

    await user.save();

    res.status(201).json({
        status: SUCCESS,
        message: "تم إنشاء الحساب بنجاح",
        data: { user }
    });
});
const login = AsyncWrapper(async (req, res, next) => {
    const number = req.body.number;
    const password = req.body.password;

    const user = await User.findOne({ number: number });

    if (!user) {
        const error = appError.create("رقم الهاتف أو كلمة المرور غير صحيحة", 401, FAIL);
        return next(error);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const error = appError.create("رقم الهاتف أو كلمة المرور غير صحيحة", 401, FAIL);
        return next(error);
    }

    const token = await JWT({ id: user._id, role: user.role });

    res.send({
        status: SUCCESS,
        message: "تم تسجيل الدخول بنجاح",
        data: { token }
    });
});
module.exports = { register, login, user }