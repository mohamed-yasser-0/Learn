import React, { useState } from "react";
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
  Collapse,
  IconButton,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import cert1 from "../imge/773218331_1351440733869953_2930793003199695550_n.jpg";
import cert2 from "../imge/773450240_1351440377203322_2537070963301122672_n.jpg";
import cert3 from "../imge/773820572_1351441357203224_4516835700474019423_n.jpg";
import cert4 from "../imge/774117016_1351441223869904_4986948222296245017_n.jpg";
import cert5 from "../imge/774126263_1351440513869975_6512775546340107170_n.jpg";
import cert6 from "../imge/774165308_1351440583869968_3472424699917234996_n.jpg";
import cert7 from "../imge/774165311_1351440930536600_9050312477647401620_n.jpg";
import cert8 from "../imge/774512657_1351440833869943_1235939038169816311_n.jpg";
import cert9 from "../imge/774512665_1351441307203229_7736539507701227946_n.jpg";
import cert10 from "../imge/774595814_1351440473869979_6618350480322651109_n.jpg";
import cert11 from "../imge/774666348_1351441140536579_1305497926278094056_n.jpg";
import cert12 from "../imge/774761656_1351440757203284_7477119485444293285_n.jpg";
import cert13 from "../imge/774862835_1351440990536594_6244647155502902869_n.jpg";
import cert14 from "../imge/774886612_1351440317203328_7243453056306604525_n.jpg";
import cert15 from "../imge/774993971_1351441193869907_294954354666731876_n.jpg";
import cert16 from "../imge/774993976_1351440790536614_5219288755429808484_n.jpg";
import cert17 from "../imge/775259814_1351441273869899_8998278057012365362_n.jpg";
import cert18 from "../imge/775537561_1351440420536651_2316019436593169529_n.jpg";
import cert19 from "../imge/775654128_1351440697203290_1319820558461826544_n.jpg";
import cert20 from "../imge/776077173_1351440660536627_3942206778749947740_n.jpg";
import cert21 from "../imge/776222371_1351440620536631_2613257701441243172_n.jpg";
import cert22 from "../imge/776222383_1351440543869972_2420851041226940209_n.jpg";
import cert23 from "../imge/777418281_1351440887203271_6439058991958627147_n.jpg";

import { useEffect, useRef } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import CampaignIcon from "@mui/icons-material/Campaign";
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
    description:
      "إجازة متصلة السند برواية حفص، مع إتقان التلاوة وأحكام التجويد.",
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
      plan.message,
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
/* ===================== شريط آخر الأخبار (فوق) ===================== */
function NewsTicker() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* الشريط العلوي */}
      <Box
        onClick={() => setOpen(true)}
        sx={{
          bgcolor: "#0D4F3C",
          color: "white",
          height: 50,
          py: 4,
          px: 2,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          position: "sticky",
          top: 0,
          zIndex: 1100,
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          "&:hover": {
            bgcolor: "#0A3D2E",
          },
        }}
      >
        <CampaignIcon sx={{ fontSize: 20, color: "#C9A84C" }} />

        <Typography
          sx={{
            fontSize: { xs: 13.5, md: 15 },
            fontWeight: 600,
            textAlign: "center",
            lineHeight: 2,
          }}
        >
          الدورة الثالثة: قراءة الإمام ابن كثير المكي (البَزِّي وقُنْبُل) —
          الأماكن محدودة
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            bgcolor: "#C9A84C",
            color: "#1A1A1A",
            px: 1.5,
            py: 0.3,
            borderRadius: 10,
            fontWeight: 700,
            whiteSpace: "nowrap",
            display: { xs: "none", sm: "block" },
          }}
        >
          اضغط للتفاصيل
        </Typography>
      </Box>

      {/* المودال بالتفاصيل */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 400,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "92%", sm: 520 },
              bgcolor: "#FFFCF5", // ← اتصلح هنا
              borderRadius: 3,
              boxShadow: 24,
              p: 0,
              outline: "none",
              overflow: "hidden",
              border: "1px solid #E0D8CC",
            }}
          >
            {/* هيدر المودال */}
            <Box
              sx={{
                bgcolor: "#0D4F3C",
                color: "white",
                px: 3,
                py: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Amiri', serif",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                تفاصيل الدورة
              </Typography>
              <IconButton
                onClick={() => setOpen(false)}
                sx={{ color: "white" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* محتوى التفاصيل */}
            <Box sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontFamily: "'Amiri', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0D4F3C",
                  mb: 1.5,
                  lineHeight: 1.4,
                }}
              >
                قراءة الإمام ابن كثير المكي
                <br />
                بروايتيه: البَزِّي وقُنْبُل
              </Typography>

              <Typography
                sx={{
                  fontSize: 14.5,
                  color: "text.secondary",
                  lineHeight: 1.9,
                  mb: 2.5,
                }}
              >
                هل تتقن قراءة القرآن برواية حفص فقط؟
                <br />
                حان الوقت لتفتح لنفسك بابًا جديدًا من أبواب القراءات القرآنية.
                <br />
                <br />
                يسرّ أكاديمية اقرأ وارتق ورتّل أن تقدم لكم الدورة الثالثة من
                سلسلة
                <strong> مدارج القراء ومعارج الإقراء</strong>.
              </Typography>

              <Typography sx={{ fontWeight: 700, color: "#0D4F3C", mb: 1 }}>
                رحلة علمية متكاملة تجمع بين:
              </Typography>
              <Stack spacing={0.8} sx={{ mb: 2.5 }}>
                {[
                  "التأصيل العلمي لأصول القراءة وقواعدها",
                  "شرح فرش القراءة وضبط أوجه الروايتين",
                  "شرح تحريرات القراءة",
                  "التطبيق والتدريب العملي على القراءة",
                ].map((item, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    sx={{ alignItems: "center", gap: 1 }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "#0D4F3C",
                      }}
                    />
                    <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Typography
                sx={{
                  fontSize: 14.5,
                  color: "text.secondary",
                  lineHeight: 1.9,
                  mb: 2.5,
                }}
              >
                لن تكون مجرد دورة نظرية... بل تدريبٌ يجمع بين العلم والتأصيل
                والتطبيق؛ لتخرج منها قادرًا على قراءة رواية الإمام ابن كثير
                قراءةً صحيحةً متقنة بإذن الله.
              </Typography>

              <Typography sx={{ fontWeight: 700, color: "#0D4F3C", mb: 1 }}>
                ومع التسجيل تحصل على:
              </Typography>
              <Stack spacing={0.8} sx={{ mb: 3 }}>
                {[
                  "محاضرات مسجلة للرجوع إليها في أي وقت",
                  "المادة العلمية بصيغة PDF مجانًا",
                  "شهادات معتمدة للمجتازين",
                  "رسوم رمزية تتيح للجميع الانتفاع بالعلم",
                ].map((item, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    sx={{ alignItems: "center", gap: 1 }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 16, color: "#0D4F3C" }} />
                    <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Box
                sx={{
                  bgcolor: "#E6F2ED",
                  color: "#0D4F3C",
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: 14,
                  mb: 3,
                  textAlign: "center",
                  lineHeight: 1.6,
                }}
              >
                إذا كنت طالب علم، أو معلّم قرآن، أو من محبي القراءات، فهذه
                الدورة فرصتك للانتقال خطوة جديدة في طريق الإتقان.
              </Box>

              <Button
                fullWidth
                variant="contained"
                startIcon={<WhatsAppIcon />}
                onClick={() => {
                  window.open(
                    `https://wa.me/201042252747?text=${encodeURIComponent(
                      "السلام عليكم، أريد التسجيل في دورة قراءة الإمام ابن كثير (البزي وقنبل)",
                    )}`,
                    "_blank",
                  );
                }}
                sx={{
                  bgcolor: "#0D4F3C",
                  color: "#fff",
                  fontWeight: 700,
                  borderRadius: 2.5,
                  py: 1.4,
                  gap: 1,
                  fontSize: 15,
                  "&:hover": { bgcolor: "#0A3D2E" },
                }}
              >
                سجل الآن عبر واتساب
              </Button>

              <Typography
                sx={{
                  textAlign: "center",
                  mt: 2,
                  fontSize: 13,
                  color: "text.secondary",
                }}
              >
                بادر بالتسجيل فالأماكن محدودة
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
/* ===================== سكشن الاحتفال بالشهادات ===================== */
function CertificatesSection() {
  const certificates = [
    { id: 1, image: cert1, name: "شهادة" },
    { id: 2, image: cert2, name: "شهادة" },
    { id: 3, image: cert3, name: "شهادة" },
    { id: 4, image: cert4, name: "شهادة" },
    { id: 5, image: cert5, name: "شهادة" },
    { id: 6, image: cert6, name: "شهادة" },
    { id: 7, image: cert7, name: "شهادة" },
    { id: 8, image: cert8, name: "شهادة" },
    { id: 9, image: cert9, name: "شهادة" },
    { id: 10, image: cert10, name: "شهادة" },
    { id: 11, image: cert11, name: "شهادة" },
    { id: 12, image: cert12, name: "شهادة" },
    { id: 13, image: cert13, name: "شهادة" },
    { id: 14, image: cert14, name: "شهادة" },
    { id: 15, image: cert15, name: "شهادة" },
    { id: 16, image: cert16, name: "شهادة" },
    { id: 17, image: cert17, name: "شهادة" },
    { id: 18, image: cert18, name: "شهادة" },
    { id: 19, image: cert19, name: "شهادة" },
    { id: 20, image: cert20, name: "شهادة" },
    { id: 21, image: cert21, name: "شهادة" },
    { id: 22, image: cert22, name: "شهادة" },
    { id: 23, image: cert23, name: "شهادة" },
  ];

  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayRef = useRef(null);

  const next = () => {
    setCurrent((prev) => (prev + 1) % certificates.length);
  };

  const prev = () => {
    setCurrent(
      (prev) => (prev - 1 + certificates.length) % certificates.length,
    );
  };

  // السكرول التلقائي
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      next();
    }, 4000); // كل 4 ثواني

    return () => clearInterval(autoPlayRef.current);
  }, []);

  // إيقاف التلقائي لما المستخدم يلمس
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    clearInterval(autoPlayRef.current);
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }

    // إعادة تشغيل التلقائي
    autoPlayRef.current = setInterval(next, 4000);
  };

  return (
    <Box
      id="certificates"
      sx={{
        py: { xs: 8, md: 11 },
        px: { xs: 2, md: 4 },
        bgcolor: "#FAF7F0",
      }}
    >
      <Container maxWidth="lg">
        {/* العنوان */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Chip
            label="إنجازات طلابنا"
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
              fontSize: { xs: 26, md: 36 },
              fontWeight: 700,
              color: "#0D4F3C",
              mb: 1.5,
              lineHeight: 1.4,
            }}
          >
            نحتفي بإنجاز طلابنا
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: 15, md: 16 },
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.85,
            }}
          >
            الدورة الأولى من سلسلة <strong>مدارج القراء ومعارج الإقراء</strong>
            <br />
            رواية الإمام قالون عن نافع من طريق الشاطبية
          </Typography>
        </Box>

        {/* النص الاحتفالي */}
        <Box
          sx={{
            maxWidth: 720,
            mx: "auto",
            mb: 5,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              color: "text.secondary",
              lineHeight: 1.95,
              mb: 2,
            }}
          >
            في أجواءٍ يملؤها الفخر والامتنان، يسعد أكاديمية اقرأ وارتق ورتّل أن
            تقدّم شهادات طلاب دورة رواية الإمام قالون عن نافع، والتي أُقيمت خلال
            شهر يوليو 2026.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ justifyContent: "center", mb: 2.5 }}
          >
            <Box
              sx={{
                bgcolor: "#E6F2ED",
                px: 2.5,
                py: 1.2,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{ fontWeight: 700, color: "#0D4F3C", fontSize: 14 }}
              >
                شهادات إتمام واجتياز
              </Typography>
              <Typography
                sx={{ fontSize: 13, color: "text.secondary", mt: 0.3 }}
              >
                لمن أتمّ متطلبات الدورة واجتازها بنجاح
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: "#FBF5E6",
                px: 2.5,
                py: 1.2,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{ fontWeight: 700, color: "#8B6914", fontSize: 14 }}
              >
                شهادات حضور
              </Typography>
              <Typography
                sx={{ fontSize: 13, color: "text.secondary", mt: 0.3 }}
              >
                تقديرًا لمن شارك وحضر في لقاءات الدورة
              </Typography>
            </Box>
          </Stack>

          <Typography
            sx={{
              fontSize: 14.5,
              color: "text.secondary",
              lineHeight: 1.9,
              fontStyle: "italic",
            }}
          >
            كل شهادة هي ثمرة وقتٍ بُذل، وجهدٍ قُدّم، وخطوة جديدة في طريق تعلم
            كتاب الله وإتقان تلاوته.
          </Typography>
        </Box>

        {/* ========== السلايدر ========== */}
        <Box sx={{ position: "relative", maxWidth: 900, mx: "auto" }}>
          {/* الأسهم */}
          <IconButton
            onClick={prev}
            sx={{
              position: "absolute",
              left: { xs: -8, md: -50 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "white",
              boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
              zIndex: 2,
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
          >
            <ChevronLeftIcon sx={{ color: "#0D4F3C" }} />
          </IconButton>

          <IconButton
            onClick={next}
            sx={{
              position: "absolute",
              right: { xs: -8, md: -50 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "white",
              boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
              zIndex: 2,
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
          >
            <ChevronRightIcon sx={{ color: "#0D4F3C" }} />
          </IconButton>

          {/* الحاوية */}
          <Box
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            sx={{
              overflow: "hidden",
              borderRadius: 3,
              border: "1px solid #E0D8CC",
              bgcolor: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                transition: "transform 0.5s ease",
                transform: `translateX(${current * -100}%)`,
              }}
            >
              {certificates.map((cert) => (
                <Box
                  key={cert.id}
                  sx={{
                    minWidth: "100%",
                    height: { xs: 300, sm: 420, md: 480 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#F9F6F0",
                    p: 2,
                  }}
                >
                  <img
                    src={cert.image}
                    alt={cert.name}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                      borderRadius: "6px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* النقاط تحت */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "center", mt: 2.5 }}
          >
            {certificates.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrent(index)}
                sx={{
                  width: current === index ? 22 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: current === index ? "#0D4F3C" : "#C9A84C",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* دعاء ختامي */}
        <Typography
          sx={{
            textAlign: "center",
            mt: 5,
            fontSize: 14.5,
            color: "text.secondary",
            maxWidth: 580,
            mx: "auto",
            lineHeight: 1.9,
          }}
        >
          نسأل الله أن يبارك في طلابنا، وأن ينفعهم بما تعلموا، وأن يجعل القرآن
          الكريم ربيع قلوبهم ونور صدورهم.
          <br />
          <strong style={{ color: "#0D4F3C" }}>
            مبارك لطلابنا هذا الإنجاز
          </strong>
        </Typography>
      </Container>
    </Box>
  );
}
/* ===================== الصفحة الرئيسية ===================== */
function FullPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box dir="rtl" sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        {/* ========== شريط الأخبار فوق ========== */}
        <NewsTicker />
        {/* ========== 1. سكشن الخطط ========== */}
        <Box id="plan" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
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
        {/* ========== سكشن شهادات الطلاب ========== */}
        <CertificatesSection />
        {/* ========== 3. سكشن قصص النجاح ========== */}
        <Box id="stories" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
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
                      "السلام عليكم، أريد الاستفسار عن البرامج المتاحة",
                    )}`,
                    "_blank",
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
