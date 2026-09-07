// const AsyncWrapper = require("../middleware/AsyncWrapper.js");
// const { SUCCESS, FAIL } = require("../utils/httpStatusText.js");
// const appError = require("../utils/appError.js");


// const postDeg = AsyncWrapper(async (req, res, next) => {
//     const examDeg = new Course(req.body);
//     await examDeg.save();

//     res.status(201).json({
//         status: SUCCESS,
//         message: "تم إضافة الدرجات بنجاح",
//         data: { examDeg }
//     });
// });
// const getSingleDeg = AsyncWrapper(async (req, res, next) => {
//     const userId = req.user.id
//     const deg = examDeg.findById()

//     res.status(201).json({
//         status: SUCCESS,
//         message: "تم إضافة الدرجات بنجاح",
//         data: { deg }
//     });
// });

// module.exports = { postDeg, getSingleDeg }