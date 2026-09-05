import React from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import VerifiedIcon from "@mui/icons-material/Verified";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const theme = createTheme({
  palette: {
    background: { default: "#F7F3EB" },
    text: { primary: "#1A1A1A", secondary: "#5C5C5C" },
  },
  typography: {
    fontFamily: "'Cairo', sans-serif",
  },
});

const WHATSAPP_NUMBER = "201093495292";

/* ===================== بيانات الخطط ===================== */
const plans = [
  {
    icon: <MenuBookIcon sx={{ fontSize: 32 }} />,
    tag: "الأكثر طلبًا",
    tagColor: "#0D4F3C",
    tagBg: "#E6F2ED",
    title: "خطة الحفظ",
    subtitle: "من الصفر إلى الختم",
    accentColor: "#0D4F3C",
    accentLight: "#E6F2ED",
    features: ["جدول يومي منظّم", "متابعة مع الشيخ", "تصحيح التلاوة"],
    duration: "١٢ – ٣٦ شهرًا",
    message: "السلام عليكم، أريد الاشتراك في خطة الحفظ 📖",
  },
  {
    icon: <AutorenewIcon sx={{ fontSize: 32 }} />,
    tag: "للمحافظة على القرآن",
    tagColor: "#8B6914",
    tagBg: "#FBF5E6",
    title: "خطة المراجعة",
    subtitle: "تثبيت ما حفظته",
    accentColor: "#C9A84C",
    accentLight: "#FBF5E6",
    features: ["جدول مراجعة أسبوعي", "اختبارات دورية", "تقرير شهري للتقدم"],
    duration: "مستمرة",
    message: "السلام عليكم، أريد الاشتراك في خطة المراجعة 🔄",
  },
  {
    icon: <RecordVoiceOverIcon sx={{ fontSize: 32 }} />,
    tag: "للمتقدمين",
    tagColor: "#5C3D8A",
    tagBg: "#F3EDF8",
    title: "خطة القراءات",
    subtitle: "تعلّم روايات وقراءات",
    accentColor: "#6B4C9A",
    accentLight: "#F3EDF8",
    features: ["رواية حفص وورش", "شرح أحكام التجويد", "إجازة مع سند"],
    duration: "٦ – ١٨ شهرًا",
    message: "السلام عليكم، أريد الاشتراك في خطة القراءات 🎙️",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 32 }} />,
    tag: "مرونة كاملة",
    tagColor: "#8B3A2E",
    tagBg: "#F9EDEA",
    title: "خطة مخصصة",
    subtitle: "صمّم مسارك بنفسك",
    accentColor: "#A04A3C",
    accentLight: "#F9EDEA",
    features: ["يناسب جدولك الخاص", "أهداف حسب رغبتك", "دعم شخصي مستمر"],
    duration: "حسب الاتفاق",
    message: "السلام عليكم، أريد الاستفسار عن خطة مخصصة ✨",
  },
];

/* ===================== بيانات الإجازات ===================== */
const ijazahPaths = [
  {
    title: "إجازة حفص عن عاصم",
    description: "إجازة متصلة السند برواية حفص، مع إتقان التلاوة وأحكام التجويد.",
    icon: <WorkspacePremiumIcon sx={{ fontSize: 30 }} />,
    points: ["سند متصل", "اختبار شامل", "شهادة معتمدة"],
  },
  {
    title: "إجازة ورش عن نافع",
    description: "دراسة رواية ورش مع بيان الفروقات والتطبيق العملي الدقيق.",
    icon: <AutoStoriesIcon sx={{ fontSize: 30 }} />,
    points: ["رواية متقنة", "شرح الفروقات", "إجازة موثقة"],
  },
  {
    title: "إجازة التجويد",
    description: "إجازة في علم التجويد النظري والعملي مع التصحيح المستمر.",
    icon: <RecordVoiceOverIcon sx={{ fontSize: 30 }} />,
    points: ["نظري + عملي", "تمارين مكثفة", "إتقان كامل"],
  },
];

/* ===================== بيانات قصص النجاح ===================== */
const stories = [
  {
    name: "أحمد محمد",
    age: "14 سنة",
    achievement: "ختم القرآن كاملًا",
    text: "بفضل الله ثم متابعة الشيخ المنتظمة، قدرت أختم القرآن في أقل من سنتين مع إتقان التجويد.",
  },
  {
    name: "فاطمة علي",
    age: "9 سنوات",
    achievement: "حفظ 15 جزء",
    text: "البرنامج كان ممتع جدًا ومناسب لسني، والشيخ كان بيصحح لي باستمرار ويشجعني.",
  },
  {
    name: "يوسف إبراهيم",
    age: "17 سنة",
    achievement: "حصل على إجازة",
    text: "الحمد لله حصلت على إجازة برواية حفص بسند متصل بعد رحلة حفظ ومراجعة دقيقة.",
  },
  {
    name: "مريم حسن",
    age: "12 سنة",
    achievement: "ختمت 20 جزء",
    text: "الطريقة المنظمة والجدول اليومي ساعدوني أستمر بدون ملل، وأنصح كل الأطفال بالتجربة.",
  },
];

/* ===================== كارت الخطة ===================== */
function PlanCard({ plan }) {
  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      plan.message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(13,79,60,0.08)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "1px solid #E8E0D5",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 32px rgba(13,79,60,0.14)",
        },
      }}
    >
      <Box sx={{ height: 6, bgcolor: plan.accentColor }} />

      <CardContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: 1.5,
        }}
      >
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Box
            sx={{
              width: 54,
              height: 54,
              borderRadius: 2,
              bgcolor: plan.accentLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: plan.accentColor,
            }}
          >
            {plan.icon}
          </Box>
          <Chip
            label={plan.tag}
            size="small"
            sx={{
              bgcolor: plan.tagBg,
              color: plan.tagColor,
              fontWeight: 700,
              fontSize: 12,
            }}
          />
        </Stack>

        <Box>
          <Typography
            sx={{
              fontFamily: "'Amiri', serif",
              fontSize: { xs: 22, md: 24 },
              fontWeight: 700,
              color: "#0D4F3C",
              lineHeight: 1.3,
            }}
          >
            {plan.title}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 14, mt: 0.3 }}>
            {plan.subtitle}
          </Typography>
        </Box>

        <Stack spacing={0.9} sx={{ flexGrow: 1 }}>
          {plan.features.map((f, i) => (
            <Stack key={i} direction="row" sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  ml: 1.2,
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: plan.accentColor,
                  flexShrink: 0,
                }}
              />
              <Typography sx={{ fontSize: 14.5, color: "text.secondary" }}>
                {f}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Box
          sx={{
            mt: 1,
            px: 1.8,
            py: 0.7,
            borderRadius: 2,
            bgcolor: plan.accentLight,
            alignSelf: "flex-start",
          }}
        >
          <Typography
            sx={{ fontSize: 13, color: plan.accentColor, fontWeight: 600 }}
          >
            ⏱ المدة: {plan.duration}
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          startIcon={<WhatsAppIcon />}
          onClick={handleWhatsApp}
          sx={{
            gap: 1,
            mt: 1.5,
            bgcolor: "#0D4F3C",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            borderRadius: 2.5,
            py: 1.2,
            "&:hover": { bgcolor: "#0A3D2E" },
          }}
        >
          ابدأ مع الشيخ الآن
        </Button>
      </CardContent>
    </Card>
  );
}

/* ===================== الصفحة الرئيسية ===================== */
function FullPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box dir="rtl" sx={{ bgcolor: "background.default", minHeight: "100vh" }}>

        {/* ========== 1. سكشن الخطط ========== */}
        <Box id="plans" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
              <Chip
                label="خريطة المسارات"
                sx={{
                  bgcolor: "#E6F2ED",
                  color: "#0D4F3C",
                  fontWeight: 700,
                  fontSize: 13,
                  mb: 2,
                }}
              />
              <Typography
                sx={{
                  fontFamily: "'Amiri', serif",
                  fontSize: { xs: 28, md: 40 },
                  fontWeight: 700,
                  color: "#0D4F3C",
                  mb: 1.5,
                  lineHeight: 1.4,
                }}
              >
                اختر خطتك في حفظ القرآن الكريم
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: 15, md: 16.5 },
                  maxWidth: 540,
                  mx: "auto",
                  lineHeight: 1.85,
                }}
              >
                اضغط على الخطة التي تناسبك وتواصل مع الشيخ مباشرةً عبر واتساب
                لتبدأ رحلتك مع كتاب الله
              </Typography>
            </Box>

            <Grid container spacing={3} sx={{ justifyContent: "center" }}>
              {plans.map((plan, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, lg: 3 }}>
                  <PlanCard plan={plan} />
                </Grid>
              ))}
            </Grid>

            <Typography
              sx={{
                textAlign: "center",
                mt: 5,
                color: "text.secondary",
                fontSize: 14,
              }}
            >
              🟢 الشيخ متاح للرد يومياً · الاستشارة مجانية
            </Typography>
          </Container>
        </Box>

        {/* ========== 2. سكشن الإجازات والسند ========== */}
        <Box
          id="ijazah"
          sx={{
            py: { xs: 8, md: 12 },
            px: { xs: 2, md: 4 },
            bgcolor: "#F0EBE1",
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
              <Chip
                icon={<VerifiedIcon sx={{ fontSize: 16 }} />}
                label="الإجازات والسند"
                sx={{
                  bgcolor: "#E6F2ED",
                  color: "#0D4F3C",
                  fontWeight: 700,
                  fontSize: 13,
                  mb: 2,
                }}
              />
              <Typography
                sx={{
                  fontFamily: "'Amiri', serif",
                  fontSize: { xs: 28, md: 38 },
                  fontWeight: 700,
                  color: "#0D4F3C",
                  mb: 1.5,
                }}
              >
                احصل على إجازة متصلة السند
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 16,
                  maxWidth: 520,
                  mx: "auto",
                  lineHeight: 1.8,
                }}
              >
                برامج إجازة منظمة بإشراف مباشر، بسند متصل وموثق
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {ijazahPaths.map((path, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      border: "1px solid #E0D8CC",
                      bgcolor: "#FFFCFI",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        borderColor: "#0D4F3C",
                        boxShadow: "0 8px 24px rgba(13,79,60,0.1)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3.5 }}>
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: 2,
                          bgcolor: "#E6F2ED",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#0D4F3C",
                          mb: 2.2,
                        }}
                      >
                        {path.icon}
                      </Box>

                      <Typography
                        sx={{
                          fontFamily: "'Amiri', serif",
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#0D4F3C",
                          mb: 1.2,
                        }}
                      >
                        {path.title}
                      </Typography>

                      <Typography
                        sx={{
                          color: "text.secondary",
                          fontSize: 14.5,
                          lineHeight: 1.8,
                          mb: 2.2,
                        }}
                      >
                        {path.description}
                      </Typography>

                      <Divider sx={{ mb: 2, borderColor: "#E8E0D5" }} />

                      <Stack spacing={1.1}>
                        {path.points.map((point, i) => (
                          <Stack
                            key={i}
                            direction="row"
                            sx={{ alignItems: "center", gap: 1 }}
                          >
                            <CheckCircleIcon
                              sx={{ fontSize: 17, color: "#0D4F3C" }}
                            />
                            <Typography sx={{ fontSize: 14 }}>
                              {point}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ========== 3. سكشن قصص النجاح ========== */}
        <Box
          id="stories"
          sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}
        >
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
              <Chip
                label="قصص النجاح"
                sx={{
                  bgcolor: "#E6F2ED",
                  color: "#0D4F3C",
                  fontWeight: 700,
                  fontSize: 13,
                  mb: 2,
                }}
              />
              <Typography
                sx={{
                  fontFamily: "'Amiri', serif",
                  fontSize: { xs: 28, md: 38 },
                  fontWeight: 700,
                  color: "#0D4F3C",
                  mb: 1.5,
                }}
              >
                طلابنا يتحدثون عن تجربتهم
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 16,
                  maxWidth: 520,
                  mx: "auto",
                  lineHeight: 1.8,
                }}
              >
                قصص حقيقية لطلاب حققوا إنجازات مميزة في الحفظ والإتقان
              </Typography>
            </Box>

            <Grid container spacing={3} sx={{ mb: 6 }}>
              {stories.map((story, index) => (
                <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      border: "1px solid #E0D8CC",
                      bgcolor: "#FFFCFI",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 10px 28px rgba(13,79,60,0.1)",
                        borderColor: "#0D4F3C",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "#0D4F3C",
                            width: 46,
                            height: 46,
                            fontWeight: 700,
                            fontSize: 18,
                          }}
                        >
                          {story.name.charAt(0)}
                        </Avatar>
                        <FormatQuoteIcon
                          sx={{ fontSize: 28, color: "#C9A84C" }}
                        />
                      </Stack>

                      <Typography
                        sx={{ fontWeight: 700, fontSize: 16, mb: 0.3 }}
                      >
                        {story.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          color: "text.secondary",
                          mb: 1.5,
                        }}
                      >
                        {story.age}
                      </Typography>

                      <Chip
                        icon={<EmojiEventsIcon sx={{ fontSize: 15 }} />}
                        label={story.achievement}
                        size="small"
                        sx={{
                          mb: 2,
                          bgcolor: "#FBF5E6",
                          color: "#8B6914",
                          fontWeight: 700,
                          fontSize: 12,
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "text.secondary",
                          lineHeight: 1.85,
                        }}
                      >
                        {story.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* CTA */}
            <Box
              sx={{
                bgcolor: "#0D4F3C",
                borderRadius: 3,
                p: { xs: 4, md: 5 },
                textAlign: "center",
                color: "white",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Amiri', serif",
                  fontSize: { xs: 22, md: 26 },
                  fontWeight: 700,
                  mb: 1.2,
                }}
              >
                كن أنت القصة القادمة
              </Typography>
              <Typography
                sx={{
                  opacity: 0.9,
                  mb: 3,
                  fontSize: 15,
                  maxWidth: 420,
                  mx: "auto",
                  lineHeight: 1.8,
                }}
              >
                ابدأ رحلتك مع القرآن الآن، والاستشارة مجانية بالكامل
              </Typography>
              <Button
                variant="contained"
                startIcon={<WhatsAppIcon />}
                onClick={() =>
                  window.open(
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "السلام عليكم، أريد الاستفسار عن البرامج المتاحة"
                    )}`,
                    "_blank"
                  )
                }
                sx={{
                  bgcolor: "#C9A84C",
                  color: "#1A1A1A",
                  fontWeight: 700,
                  borderRadius: 2.5,
                  gap: 1,
                  px: 4,
                  py: 1.3,
                  "&:hover": { bgcolor: "#B8973F" },
                }}
              >
                تواصل مع الشيخ عبر واتساب
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default FullPage;