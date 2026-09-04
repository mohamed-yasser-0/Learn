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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const theme = createTheme({
  palette: {
    background: { default: "#F9F5EF" },
    text: { primary: "#1C1C1C", secondary: "#5A5A5A" },
  },
});

const WHATSAPP_NUMBER = "201093495292";

const plans = [
  {
    icon: <MenuBookIcon sx={{ fontSize: 32 }} />,
    tag: "الأكثر طلبًا",
    tagColor: "#1A5C38",
    tagBg: "#E8F5EE",
    title: "خطة الحفظ",
    subtitle: "من الصفر إلى الختم",
    accentColor: "#1A5C38",
    accentLight: "#E8F5EE",
    features: ["جدول يومي منظّم", "متابعة مع الشيخ", "تصحيح التلاوة"],
    duration: "١٢ – ٣٦ شهرًا",
    message: "السلام عليكم، أريد الاشتراك في خطة الحفظ 📖",
  },
  {
    icon: <AutorenewIcon sx={{ fontSize: 32 }} />,
    tag: "للمحافظة على القرآن",
    tagColor: "#8B6914",
    tagBg: "#FFF7E0",
    title: "خطة المراجعة",
    subtitle: "تثبيت ما حفظته",
    accentColor: "#C9A84C",
    accentLight: "#FFF7E0",
    features: ["جدول مراجعة أسبوعي", "اختبارات دورية", "تقرير شهري للتقدم"],
    duration: "مستمرة",
    message: "السلام عليكم، أريد الاشتراك في خطة المراجعة 🔄",
  },
  {
    icon: <RecordVoiceOverIcon sx={{ fontSize: 32 }} />,
    tag: "للمتقدمين",
    tagColor: "#6B3FA0",
    tagBg: "#F3EAFA",
    title: "خطة القراءات",
    subtitle: "تعلّم روايات وقراءات",
    accentColor: "#7B4FA0",
    accentLight: "#F3EAFA",
    features: ["رواية حفص وورش", "شرح أحكام التجويد", "إجازة مع سند"],
    duration: "٦ – ١٨ شهرًا",
    message: "السلام عليكم، أريد الاشتراك في خطة القراءات 🎙️",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 32 }} />,
    tag: "مرونة كاملة",
    tagColor: "#B03A2E",
    tagBg: "#FDEDEC",
    title: "خطة مخصصة",
    subtitle: "صمّم مسارك بنفسك",
    accentColor: "#B03A2E",
    accentLight: "#FDEDEC",
    features: ["يناسب جدولك الخاص", "أهداف حسب رغبتك", "دعم شخصي مستمر"],
    duration: "حسب الاتفاق",
    message: "السلام عليكم، أريد الاستفسار عن خطة مخصصة ✨",
  },
];

function PlanCard({ plan }) {
  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(plan.message)}`;
    window.open(url, "_blank");
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "visible",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 10px 36px rgba(0,0,0,0.13)",
        },
      }}
    >
      {/* Top accent bar */}
      <Box
        sx={{
          height: 7,
          bgcolor: plan.accentColor,
          borderRadius: "16px 16px 0 0",
        }}
      />

      <CardContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: 1.5,
        }}
      >
        {/* Icon + Tag row */}
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 3,
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
              fontFamily: "'Cairo', sans-serif",
              px: 0.5,
            }}
          />
        </Stack>

        {/* Title */}
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Amiri', serif",
              fontSize: { xs: 22, md: 24 },
              fontWeight: 700,
              lineHeight: 1.3,
              color: "text.primary",
            }}
          >
            {plan.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontFamily: "'Cairo', sans-serif",
              fontSize: 14,
              mt: 0.25,
            }}
          >
            {plan.subtitle}
          </Typography>
        </Box>

        {/* Features */}
        <Stack spacing={0.8} sx={{ flexGrow: 1 }}>
          {plan.features.map((f, i) => (
            <Stack key={i} direction="row" sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  ml: 1,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  bgcolor: plan.accentColor,
                  flexShrink: 0,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'Cairo', sans-serif",
                  fontSize: 15,
                  color: "text.secondary",
                }}
              >
                {f}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* Duration badge */}
        <Box
          sx={{
            mt: 1,
            px: 2,
            py: 0.75,
            borderRadius: 2,
            bgcolor: plan.accentLight,
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            alignSelf: "flex-start",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Cairo', sans-serif",
              fontSize: 13,
              color: plan.accentColor,
              fontWeight: 600,
            }}
          >
            ⏱ المدة: {plan.duration}
          </Typography>
        </Box>

        {/* CTA Button */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<WhatsAppIcon />}
          onClick={handleWhatsApp}
          sx={{
            mt: 1.5,
            bgcolor: "#25D366",
            color: "#fff",
            fontFamily: "'Cairo', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            borderRadius: 3,
            py: 1.25,
            gap: 0.5,
            boxShadow: "0 4px 14px rgba(37,211,102,0.35)",
            "&:hover": {
              bgcolor: "#1ebe5d",
              boxShadow: "0 6px 20px rgba(37,211,102,0.45)",
            },
          }}
        >
          ابدأ مع الشيخ الآن
        </Button>
      </CardContent>
    </Card>
  );
}

function PlansSection() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        id="plan"
        dir="rtl"
        sx={{
          bgcolor: "background.default",
          py: { xs: 10, md: 14 },
          px: { xs: 2, md: 5 },
          fontFamily: "'Cairo', sans-serif",
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 9 } }}>
            <Chip
              label="🗺️ خريطة المسارات"
              sx={{
                bgcolor: "#E8F5EE",
                color: "#1A5C38",
                fontWeight: 700,
                fontFamily: "'Cairo', sans-serif",
                fontSize: 14,
                mb: 2,
                px: 1,
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Amiri', serif",
                fontSize: { xs: 30, md: 42 },
                fontWeight: 700,
                lineHeight: 1.4,
                color: "text.primary",
                mb: 1.5,
              }}
            >
              اختر خطتك في حفظ القرآن الكريم
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Cairo', sans-serif",
                color: "text.secondary",
                fontSize: { xs: 15, md: 17 },
                maxWidth: 560,
                mx: "auto",
                lineHeight: 1.8,
              }}
            >
              اضغط على الخطة التي تناسبك وتواصل مع الشيخ مباشرةً عبر واتساب
              لتبدأ رحلتك مع كتاب الله
            </Typography>
          </Box>

          {/* Cards Grid */}
          <Grid container spacing={3} justifyContent="center">
            {plans.map((plan, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, lg: 3 }}>
                <PlanCard plan={plan} />
              </Grid>
            ))}
          </Grid>

          {/* Footer note */}
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Cairo', sans-serif",
                color: "text.secondary",
                fontSize: 14,
              }}
            >
              🟢 الشيخ متاح للرد يومياً · الاستشارة مجانية
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default PlansSection;
