/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
  Stack,
  Link,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import LockResetIcon from "@mui/icons-material/LockReset";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../theme/context";
// ─── SHARED LAYOUT ────────────────────────────────────────────────────────────
function AuthLayout({ children }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
      }}
    >
      {/* Left panel — decorative */}
      <Box
        sx={{
          bgcolor: "primary.main",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* geometric circles */}
        {[380, 300, 220].map((s, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: s,
              height: s,
              borderRadius: "50%",
              border: `1px solid rgba(201,168,76,${0.2 - i * 0.05})`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        ))}
        {/* pattern */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
            repeating-linear-gradient(60deg, transparent, transparent 30px, rgba(201,168,76,0.06) 30px, rgba(201,168,76,0.06) 31px),
            repeating-linear-gradient(-60deg, transparent, transparent 30px, rgba(201,168,76,0.06) 30px, rgba(201,168,76,0.06) 31px)
          `,
            pointerEvents: "none",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Amiri', serif",
              color: "secondary.light",
              fontSize: 52,
              mb: 1,
            }}
          >
            الفُرقان
          </Typography>
          <Typography
            sx={{ color: "rgba(255,255,255,0.5)", fontWeight: 300, mb: 3 }}
          >
            للعلم الشرعي
          </Typography>
          <Box
            sx={{
              bgcolor: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRight: "3px solid",
              borderRightColor: "secondary.main",
              borderRadius: 1.5,
              px: 3,
              py: 2,
              maxWidth: 340,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Amiri', serif",
                color: "rgba(255,255,255,0.85)",
                fontSize: 19,
                lineHeight: 1.9,
              }}
            >
              ﴾ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴿
            </Typography>
            <Divider
              sx={{
                bgcolor: "secondary.main",
                width: 40,
                mx: "auto",
                mt: 1,
                height: 2,
                border: "none",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Right panel — form */}
      <Box
        sx={{
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, md: 6 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 420 }}>{children}</Box>
      </Box>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          borderRadius: "12px",
          padding: "5px 10px",
          textTransform: "none",
          fontWeight: "bold",
          boxShadow: 3,
          bgcolor: "secondary.light",
          color: "black",
          display: { xs: "none", md: "flex" },
        }}
      >
        رجوع
      </Button>
    </Box>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { form, setForm, loginUser, isLogged, getCourses, getUser } =
    React.useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogged) {
      getCourses();
      getUser();
      navigate("/home");
    }
  }, [isLogged, navigate]);
  const handle = (field) => (e) =>
    setForm((p) => ({
      ...p,
      [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const submit = async () => {
    if (!form.number || !form.password) {
      setError("يرجى تعبئة جميع الحقول");
      return;
    }
    setError("");
    loginUser();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
  };

  return (
    <AuthLayout>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            bgcolor: "rgba(26,92,56,0.1)",
            border: "1px solid rgba(26,92,56,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <LockOutlinedIcon sx={{ color: "primary.main", fontSize: 26 }} />
        </Box>
        <Typography variant="h4" sx={{ color: "primary.main", mb: 0.5 }}>
          تسجيل الدخول
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
          أهلاً بعودتك — قم بتسجيل الدخول للمتابعة
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2.5}>
        <TextField
          label="الرقم الهاتف"
          type="number"
          value={form.number}
          onChange={handle("number")}
          fullWidth
          dir="ltr"
          inputProps={{ style: { textAlign: "right" } }}
        />
        <TextField
          label="كلمة المرور"
          type={showPass ? "text" : "password"}
          value={form.password}
          onChange={handle("password")}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPass((p) => !p)}
                  edge="end"
                  size="small"
                  sx={{ mr: 0.5 }}
                >
                  {showPass ? (
                    <VisibilityOffIcon fontSize="small" />
                  ) : (
                    <VisibilityIcon fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={form.remember}
                onChange={handle("remember")}
                size="small"
                sx={{
                  color: "primary.main",
                  "&.Mui-checked": { color: "primary.main" },
                }}
              />
            }
            label={<Typography sx={{ fontSize: 13 }}>تذكرني</Typography>}
          />
          {/* <Link
            component="button"
            onClick={() => navigate("/forgot")}
            underline="hover"
            sx={{ fontSize: 13, color: "primary.light" }}
          >
            نسيت كلمة المرور؟
          </Link> */}
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={submit}
          disabled={loading}
          sx={{ mt: 0.5, py: 1.4 }}
        >
          {loading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "تسجيل الدخول"
          )}
        </Button>

        <Divider sx={{ my: 0.5 }}>
          <Typography sx={{ fontSize: 12, color: "text.secondary", px: 1 }}>
            أو
          </Typography>
        </Divider>

        <Button
          variant="outlined"
          color="primary"
          fullWidth
          size="large"
          onClick={() => {
            navigate("/register");
          }}
          sx={{ py: 1.4 }}
        >
          إنشاء حساب جديد
        </Button>
      </Stack>
    </AuthLayout>
  );
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────
function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { form, setForm, registerUser, success } =
    React.useContext(AuthContext);
  const navigate = useNavigate();

  const handle = (f) => (e) =>
    setForm((p) => ({
      ...p,
      [f]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const submits = async () => {
    if (!form.name || !form.number || !form.password || !form.confirm) {
      setError("يرجى تعبئة جميع الحقول");
      return;
    }
    if (form.password !== form.confirm) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }
    if (form.password.length < 8) {
      setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }
    if (!form.agree) {
      setError("يجب الموافقة على الشروط والأحكام");
      return;
    }
    setError("");
    registerUser();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  };

  const strengthColor = (p) => {
    if (p.length === 0) return "transparent";
    if (p.length < 6) return "#E53935";
    if (p.length < 10) return "#C9A84C";
    return "#1A5C38";
  };
  const strengthLabel = (p) => {
    if (p.length === 0) return "";
    if (p.length < 6) return "ضعيفة";
    if (p.length < 10) return "متوسطة";
    return "قوية";
  };

  if (success)
    return (
      <AuthLayout>
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              bgcolor: "rgba(26,92,56,0.1)",
              border: "2px solid rgba(26,92,56,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <Typography sx={{ fontSize: 32 }}>✓</Typography>
          </Box>
          <Typography variant="h5" sx={{ color: "primary.main", mb: 1.5 }}>
            تم إنشاء الحساب!
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 4, lineHeight: 1.8 }}>
            تم تسجيل حسابك بنجاح. يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              navigate("/login");
            }}
            sx={{ py: 1.4 }}
          >
            الذهاب لتسجيل الدخول
          </Button>
        </Box>
      </AuthLayout>
    );

  return (
    <AuthLayout>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            bgcolor: "rgba(26,92,56,0.1)",
            border: "1px solid rgba(26,92,56,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <PersonAddOutlinedIcon sx={{ color: "primary.main", fontSize: 26 }} />
        </Box>
        <Typography variant="h4" sx={{ color: "primary.main", mb: 0.5 }}>
          إنشاء حساب جديد
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
          انضم إلى آلاف الطلاب في رحلة طلب العلم
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2.2}>
        <TextField
          label="الاسم الكامل"
          value={form.name}
          onChange={handle("name")}
          fullWidth
        />
        <TextField
          label="الرقم الهاتف"
          type="number"
          value={form.number}
          onChange={handle("number")}
          fullWidth
          dir="ltr"
          inputProps={{ style: { textAlign: "right" } }}
        />

        <Box>
          <TextField
            label="كلمة المرور"
            type={showPass ? "text" : "password"}
            value={form.password}
            onChange={handle("password")}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPass((prev) => !prev)}
                    edge="end"
                  >
                    {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {form.password && (
            <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  bgcolor: "#eee",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: `${Math.min((form.password.length / 12) * 100, 100)}%`,
                    bgcolor: strengthColor(form.password),
                    transition: "width 0.3s, background-color 0.3s",
                    borderRadius: 2,
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: 12,
                  color: strengthColor(form.password),
                  fontWeight: 600,
                  minWidth: 40,
                }}
              >
                {strengthLabel(form.password)}
              </Typography>
            </Box>
          )}
        </Box>

        <TextField
          label="تأكيد كلمة المرور"
          type={showPass2 ? "text" : "password"}
          value={form.confirm}
          onChange={handle("confirm")}
          fullWidth
          error={form.confirm.length > 0 && form.confirm !== form.password}
          helperText={
            form.confirm.length > 0 && form.confirm !== form.password
              ? "كلمتا المرور غير متطابقتين"
              : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPass2((p) => !p)}
                  edge="end"
                  size="small"
                >
                  {showPass2 ? (
                    <VisibilityOffIcon fontSize="small" />
                  ) : (
                    <VisibilityIcon fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={form.agree}
              onChange={handle("agree")}
              size="small"
              sx={{
                color: "primary.main",
                "&.Mui-checked": { color: "primary.main" },
              }}
            />
          }
          label={
            <Typography sx={{ fontSize: 13 }}>
              أوافق على{" "}
              <Link href="#" underline="hover" sx={{ color: "primary.light" }}>
                الشروط والأحكام
              </Link>{" "}
              و{" "}
              <Link href="#" underline="hover" sx={{ color: "primary.light" }}>
                سياسة الخصوصية
              </Link>
            </Typography>
          }
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={() => submits()}
          disabled={loading}
          sx={{ py: 1.4 }}
        >
          {loading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "إنشاء الحساب"
          )}
        </Button>

        <Typography sx={{ textAlign: "center", fontSize: 14 }}>
          لديك حساب بالفعل؟{" "}
          <Link
            component="button"
            onClick={() => {
              navigate("/login");
            }}
            underline="hover"
            sx={{ color: "primary.light", fontWeight: 700 }}
          >
            سجّل دخولك
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}
// ─── FORGOT PASSWORD ──────────────────────────────────────────────────────────
function ForgotPage() {
  const [number, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!number) {
      setError("يرجى إدخال البريد الإلكتروني");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1300));
    setLoading(false);
    setSent(true);
  };
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            bgcolor: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <LockResetIcon sx={{ color: "secondary.dark", fontSize: 26 }} />
        </Box>
        <Typography variant="h4" sx={{ color: "primary.main", mb: 0.5 }}>
          استعادة كلمة المرور
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
          أدخل بريدك الإلكتروني وسنرسل لك رابط الاستعادة
        </Typography>
      </Box>

      {sent ? (
        <Box>
          <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
            تم إرسال رابط الاستعادة إلى بريدك الإلكتروني. تحقق من صندوق الوارد.
          </Alert>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => navigate("/forgot")}
            sx={{ py: 1.4 }}
          >
            العودة لتسجيل الدخول
          </Button>
        </Box>
      ) : (
        <Stack spacing={2.5}>
          {error && (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            label="البريد الإلكتروني"
            type="number"
            value={number}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            dir="ltr"
            inputProps={{ style: { textAlign: "right" } }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={submit}
            disabled={loading}
            sx={{ py: 1.4 }}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "إرسال رابط الاستعادة"
            )}
          </Button>
          <Typography sx={{ textAlign: "center", fontSize: 14 }}>
            <Link
              component="button"
              onClick={() => navigate("/login")}
              underline="hover"
              sx={{ color: "primary.light" }}
            >
              ← العودة لتسجيل الدخول
            </Link>
          </Typography>
        </Stack>
      )}
    </AuthLayout>
  );
}
export { LoginPage, RegisterPage, ForgotPage };
