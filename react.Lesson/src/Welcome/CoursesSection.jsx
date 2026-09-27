import React, { useCallback, useMemo, useState } from "react";
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
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Tabs,
  Tab,
} from "@mui/material";
import cert2 from "../imge/WhatsApp Image 2026-09-27 at 4.05.56 PM.jpeg";
import cert3 from "../imge/WhatsApp Image 2026-09-27 at 4.05.57 PM.jpeg";
import cert4 from "../imge/WhatsApp Image 2026-09-27 at 4.05.58 PM (1).jpeg";
import cert5 from "../imge/WhatsApp Image 2026-09-27 at 4.05.58 PM (2).jpeg";
import cert6 from "../imge/WhatsApp Image 2026-09-27 at 4.05.58 PM.jpeg";
import cert7 from "../imge/WhatsApp Image 2026-09-27 at 4.05.59 PM.jpeg";
import cert8 from "../imge/WhatsApp Image 2026-09-27 at 4.06.00 PM (1).jpeg";
import cert9 from "../imge/WhatsApp Image 2026-09-27 at 4.06.00 PM.jpeg";
import cert10 from "../imge/WhatsApp Image 2026-09-27 at 4.06.01 PM (1).jpeg";
import cert11 from "../imge/WhatsApp Image 2026-09-27 at 4.06.01 PM.jpeg";
import cert12 from "../imge/WhatsApp Image 2026-09-28 at 4.05.59 PM.jpeg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "../styles.css";

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
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

const DEFAULT_TEACHER = "الشيخ أحمد خالد";

const diplomas = [
  {
    id: "dip-1",
    name: "دبلومة إتقان القراءات العشر",
    // teacher: DEFAULT_TEACHER,
    days: "الإثنين والأربعاء والجمعة",
    time: "09:00 م",
    startLabel: "2/10/2026",
    startDate: "2026-10-02T21:00:00",
    status: "مخططة",
  },
  {
    id: "dip-2",
    name: "دبلومة تأهيل معلم القرآن للأعاجم والعرب",
    teacher: "",
    days: "يوم ويوم",
    time: "9 م و10 م",
    startLabel: "بداية أكتوبر 2026",
    startDate: "2026-10-01T21:00:00",
    status: "مخططة",
  },
];

const courses = [
  {
    id: "c-1",
    name: "الماهر في علم التجويد كاملًا بكل مستوياته",
    teacher: DEFAULT_TEACHER,
    days: "السبت والثلاثاء والخميس",
    time: "09:00 م",
    startLabel: "6/10/2026",
    startDate: "2026-10-06T21:00:00",
    status: "مخططة",
  },
  {
    id: "c-2",
    name: "قراءة الإمام أبو عمرو البصري برواية الدوري والسوسي",
    teacher: DEFAULT_TEACHER,
    days: "الأحد والأربعاء",
    time: "10:00 م",
    startLabel: "14/10/2026",
    startDate: "2026-10-14T22:00:00",
    status: "مخططة",
  },
  {
    id: "c-3",
    name: "قراءة الإمام ابن عامر برواية هشام وابن ذكوان",
    teacher: DEFAULT_TEACHER,
    days: "الأحد والأربعاء",
    time: "10:00 م",
    startLabel: "29/11/2026",
    startDate: "2026-11-29T22:00:00",
    status: "مخططة",
  },
  {
    id: "c-4",
    name: "قراءة الإمام حمزة برواية خلف وخلاد",
    teacher: DEFAULT_TEACHER,
    days: "الأحد والأربعاء",
    time: "10:00 م",
    startLabel: "3/1/2027",
    startDate: "2027-01-03T22:00:00",
    status: "مخططة",
  },
  {
    id: "c-5",
    name: "قراءة الإمام الكسائي برواية أبي الحارث",
    teacher: DEFAULT_TEACHER,
    days: "الأحد والأربعاء",
    time: "10:00 م",
    startLabel: "7/2/2027",
    startDate: "2027-02-07T22:00:00",
    status: "مخططة",
  },
  {
    id: "c-6",
    name: "متن الدرة المضية في القراءات الثلاث المتممة",
    teacher: DEFAULT_TEACHER,
    days: "الإثنين والجمعة",
    time: "10:00 م",
    startLabel: "1/1/2027",
    startDate: "2027-01-01T22:00:00",
    status: "مخططة",
  },

  {
    id: "c-8",
    name: "علم الوقف والابتداء",
    teacher: "د. محمد عبدالله سليمان",
    days: "—",
    time: "—",
    startLabel: "نوفمبر 2026",
    startDate: "2026-11-01T20:00:00",
    status: "مخططة",
  },
  {
    id: "c-9",
    name: "القواعد الحسان في تفسير القرآن",
    teacher: "د. محمد عبدالله سليمان",
    days: "—",
    time: "—",
    startLabel: "نوفمبر 2026",
    startDate: "2026-11-01T20:05:00",
    status: "مخططة",
  },
  {
    id: "c-10",
    name: "مفاتيح التدبر",
    teacher: "د. محمد عبدالعظيم",
    days: "—",
    time: "—",
    startLabel: "نوفمبر 2026",
    startDate: "2026-11-01T20:10:00",
    status: "مخططة",
  },
  {
    id: "c-11",
    name: "رسم وضبط المصحف",
    teacher: "د. إبراهيم الوزان",
    days: "—",
    time: "—",
    startLabel: "ديسمبر 2026",
    startDate: "2026-12-01T20:00:00",
    status: "مخططة",
  },
  {
    id: "c-12",
    name: "توجيه رواية حفص وبلاغيات قرآنية",
    teacher: "د. عبدالله الطاهر",
    days: "—",
    time: "—",
    startLabel: "ديسمبر 2026",
    startDate: "2026-12-01T20:05:00",
    status: "مخططة",
  },
  {
    id: "c-13",
    name: "الآجرومية في علم النحو",
    teacher: "الشيخ يوسف أحمد",
    days: "—",
    time: "—",
    startLabel: "ديسمبر 2026",
    startDate: "2026-12-01T20:10:00",
    status: "مخططة",
  },
  {
    id: "c-14",
    name: "أنماط شخصيات الطلاب",
    teacher: "د. عمرو الزواوي",
    days: "—",
    time: "—",
    startLabel: "يناير 2027",
    startDate: "2027-01-01T20:00:00",
    status: "مخططة",
  },
  {
    id: "c-15",
    name: "أساسيات إدارة حلقات الأعاجم",
    teacher: "",
    days: "—",
    time: "—",
    startLabel: "فبراير 2027",
    startDate: "2027-02-01T20:00:00",
    status: "مخططة",
  },
  {
    id: "c-16",
    name: "التجويد بالإنجليزية",
    teacher: "",
    days: "—",
    time: "—",
    startLabel: "مارس 2027",
    startDate: "2027-03-01T20:00:00",
    status: "مخططة",
  },
];
/* ===================== بيانات الخطط ===================== */
export const plansData = [
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
/* =========================================================
   أدوات مساعدة للعداد والصيغة العربية
   ========================================================= */

const UNIT_FORMS = {
  يوم: { 1: "يوم واحد", 2: "يومين", many: "يوم" },
  ساعة: { 1: "ساعة واحدة", 2: "ساعتين", many: "ساعة" },
  دقيقة: { 1: "دقيقة واحدة", 2: "دقيقتين", many: "دقيقة" },
};

function unitLabel(n, base) {
  const f = UNIT_FORMS[base];
  if (n === 1) return f[1];
  if (n === 2) return f[2];
  return `${n} ${f.many}`;
}
/* ===================== شريط آخر الأخبار (فوق) ===================== */
// function NewsTicker() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* الشريط العلوي */}
//       <Box
//         onClick={() => setOpen(true)}
//         sx={{
//           bgcolor: "#0D4F3C",
//           color: "white",
//           height: 50,
//           py: 4,
//           px: 2,
//           cursor: "pointer",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 1.5,
//           position: "sticky",
//           top: 0,
//           zIndex: 1100,
//           boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
//           "&:hover": {
//             bgcolor: "#0A3D2E",
//           },
//         }}
//       >
//         <CampaignIcon sx={{ fontSize: 20, color: "#C9A84C" }} />

//         <Typography
//           sx={{
//             fontSize: { xs: 13.5, md: 15 },
//             fontWeight: 600,
//             textAlign: "center",
//             lineHeight: 2,
//           }}
//         >
//           الدورة الثالثة: قراءة الإمام ابن كثير المكي (البَزِّي وقُنْبُل) —
//           الأماكن محدودة
//         </Typography>

//         <Typography
//           sx={{
//             fontSize: 13,
//             bgcolor: "#C9A84C",
//             color: "#1A1A1A",
//             px: 1.5,
//             py: 0.3,
//             borderRadius: 10,
//             fontWeight: 700,
//             whiteSpace: "nowrap",
//             display: { xs: "none", sm: "block" },
//           }}
//         >
//           اضغط للتفاصيل
//         </Typography>
//       </Box>

//       {/* المودال بالتفاصيل */}
//       <Modal
//         open={open}
//         onClose={() => setOpen(false)}
//         closeAfterTransition
//         slots={{ backdrop: Backdrop }}
//         slotProps={{
//           backdrop: {
//             timeout: 400,
//           },
//         }}
//       >
//         <Fade in={open}>
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: { xs: "92%", sm: 520 },
//               bgcolor: "#FFFCF5", // ← اتصلح هنا
//               borderRadius: 3,
//               boxShadow: 24,
//               p: 0,
//               outline: "none",
//               overflow: "hidden",
//               border: "1px solid #E0D8CC",
//             }}
//           >
//             {/* هيدر المودال */}
//             <Box
//               sx={{
//                 bgcolor: "#0D4F3C",
//                 color: "white",
//                 px: 3,
//                 py: 2,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <Typography
//                 sx={{
//                   fontFamily: "'Amiri', serif",
//                   fontSize: 18,
//                   fontWeight: 700,
//                 }}
//               >
//                 تفاصيل الدورة
//               </Typography>
//               <IconButton
//                 onClick={() => setOpen(false)}
//                 sx={{ color: "white" }}
//               >
//                 <CloseIcon />
//               </IconButton>
//             </Box>

//             {/* محتوى التفاصيل */}
//             <Box sx={{ p: 3 }}>
//               <Typography
//                 sx={{
//                   fontFamily: "'Amiri', serif",
//                   fontSize: 20,
//                   fontWeight: 700,
//                   color: "#0D4F3C",
//                   mb: 1.5,
//                   lineHeight: 1.4,
//                 }}
//               >
//                 قراءة الإمام ابن كثير المكي
//                 <br />
//                 بروايتيه: البَزِّي وقُنْبُل
//               </Typography>

//               <Typography
//                 sx={{
//                   fontSize: 14.5,
//                   color: "text.secondary",
//                   lineHeight: 1.9,
//                   mb: 2.5,
//                 }}
//               >
//                 هل تتقن قراءة القرآن برواية حفص فقط؟
//                 <br />
//                 حان الوقت لتفتح لنفسك بابًا جديدًا من أبواب القراءات القرآنية.
//                 <br />
//                 <br />
//                 يسرّ أكاديمية اقرأ وارتق ورتّل أن تقدم لكم الدورة الثالثة من
//                 سلسلة
//                 <strong> مدارج القراء ومعارج الإقراء</strong>.
//               </Typography>

//               <Typography sx={{ fontWeight: 700, color: "#0D4F3C", mb: 1 }}>
//                 رحلة علمية متكاملة تجمع بين:
//               </Typography>
//               <Stack spacing={0.8} sx={{ mb: 2.5 }}>
//                 {[
//                   "التأصيل العلمي لأصول القراءة وقواعدها",
//                   "شرح فرش القراءة وضبط أوجه الروايتين",
//                   "شرح تحريرات القراءة",
//                   "التطبيق والتدريب العملي على القراءة",
//                 ].map((item, i) => (
//                   <Stack
//                     key={i}
//                     direction="row"
//                     sx={{ alignItems: "center", gap: 1 }}
//                   >
//                     <Box
//                       sx={{
//                         width: 6,
//                         height: 6,
//                         borderRadius: "50%",
//                         bgcolor: "#0D4F3C",
//                       }}
//                     />
//                     <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
//                       {item}
//                     </Typography>
//                   </Stack>
//                 ))}
//               </Stack>

//               <Typography
//                 sx={{
//                   fontSize: 14.5,
//                   color: "text.secondary",
//                   lineHeight: 1.9,
//                   mb: 2.5,
//                 }}
//               >
//                 لن تكون مجرد دورة نظرية... بل تدريبٌ يجمع بين العلم والتأصيل
//                 والتطبيق؛ لتخرج منها قادرًا على قراءة رواية الإمام ابن كثير
//                 قراءةً صحيحةً متقنة بإذن الله.
//               </Typography>

//               <Typography sx={{ fontWeight: 700, color: "#0D4F3C", mb: 1 }}>
//                 ومع التسجيل تحصل على:
//               </Typography>
//               <Stack spacing={0.8} sx={{ mb: 3 }}>
//                 {[
//                   "محاضرات مسجلة للرجوع إليها في أي وقت",
//                   "المادة العلمية بصيغة PDF مجانًا",
//                   "شهادات معتمدة للمجتازين",
//                   "رسوم رمزية تتيح للجميع الانتفاع بالعلم",
//                 ].map((item, i) => (
//                   <Stack
//                     key={i}
//                     direction="row"
//                     sx={{ alignItems: "center", gap: 1 }}
//                   >
//                     <CheckCircleIcon sx={{ fontSize: 16, color: "#0D4F3C" }} />
//                     <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
//                       {item}
//                     </Typography>
//                   </Stack>
//                 ))}
//               </Stack>

//               <Box
//                 sx={{
//                   bgcolor: "#E6F2ED",
//                   color: "#0D4F3C",
//                   px: 2,
//                   py: 1.5,
//                   borderRadius: 2,
//                   fontWeight: 600,
//                   fontSize: 14,
//                   mb: 3,
//                   textAlign: "center",
//                   lineHeight: 1.6,
//                 }}
//               >
//                 إذا كنت طالب علم، أو معلّم قرآن، أو من محبي القراءات، فهذه
//                 الدورة فرصتك للانتقال خطوة جديدة في طريق الإتقان.
//               </Box>

//               <Button
//                 fullWidth
//                 variant="contained"
//                 startIcon={<WhatsAppIcon />}
//                 onClick={() => {
//                   window.open(
//                     `https://wa.me/201042252747?text=${encodeURIComponent(
//                       "السلام عليكم، أريد التسجيل في دورة قراءة الإمام ابن كثير (البزي وقنبل)",
//                     )}`,
//                     "_blank",
//                   );
//                 }}
//                 sx={{
//                   bgcolor: "#0D4F3C",
//                   color: "#fff",
//                   fontWeight: 700,
//                   borderRadius: 2.5,
//                   py: 1.4,
//                   gap: 1,
//                   fontSize: 15,
//                   "&:hover": { bgcolor: "#0A3D2E" },
//                 }}
//               >
//                 سجل الآن عبر واتساب
//               </Button>

//               <Typography
//                 sx={{
//                   textAlign: "center",
//                   mt: 2,
//                   fontSize: 13,
//                   color: "text.secondary",
//                 }}
//               >
//                 بادر بالتسجيل فالأماكن محدودة
//               </Typography>
//             </Box>
//           </Box>
//         </Fade>
//       </Modal>
//     </>
//   );
// }
/* ===================== سكشن الاحتفال بالشهادات ===================== */
function CertificatesSection() {
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
        {/* النص الاحتفالي */}
        <Box
          sx={{
            maxWidth: 720,
            mx: "auto",
            mb: 5,
            textAlign: "center",
          }}
        >
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

        <Swiper
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={10}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          style={{
            width: "100%",
            height: "100%",
          }}
          className="mySwiper"
        >
          {[
            cert2,
            cert3,
            cert4,
            cert5,
            cert6,
            cert7,
            cert8,
            cert9,
            cert10,
            cert11,
            cert12,
          ].map((cert, index) => (
            <SwiperSlide
              key={index}
              style={{
                textAlign: "center",
                fontSize: "18px",
                background: "#F9F6F0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={cert}
                alt={`Certificate ${index + 2}`}
                sx={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

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
        <Box
          sx={{
            mt: 5,
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
            للحجز أو الاستفسار اضغط هنا
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
{
  /* ========== 1. سكشن الخطط ========== */
}
function getTimeStatus(startISO, now) {
  const start = new Date(startISO).getTime();
  const diffMs = start - now.getTime();

  if (diffMs <= 0) {
    return { label: "شغالة الآن", isLive: true };
  }

  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return {
      label: `باقي ${unitLabel(days, "يوم")}${
        hours > 0 ? " و" + unitLabel(hours, "ساعة") : ""
      }`,
      isLive: false,
    };
  }
  if (hours > 0) {
    return {
      label: `باقي ${unitLabel(hours, "ساعة")}${
        minutes > 0 ? " و" + unitLabel(minutes, "دقيقة") : ""
      }`,
      isLive: false,
    };
  }
  return {
    label: `باقي ${unitLabel(Math.max(minutes, 1), "دقيقة")}`,
    isLive: false,
  };
}
/* ===================== كارت الخطة ===================== */
function PlanCard({ plan, whatsappNumber }) {
  const handleWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
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
            <Stack
              key={i}
              direction="row"
              sx={{ alignItems: "center", gap: 1.2 }}
            >
              <Box
                sx={{
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
          للحجز أو الاستفسار اضغط هنا
        </Button>
      </CardContent>
    </Card>
  );
}
const STORAGE_KEY = "saved_courses_diplomas";
function ItemCard({ item, isDiploma, now, isNearest, isSaved, onToggleSave }) {
  const { label, isLive } = getTimeStatus(item.startDate, now);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        p: { xs: 2.25, sm: 3 },
        borderRadius: 3,
        bgcolor: "#fff",
        border: isLive
          ? "1.5px solid #2E7D32"
          : isNearest
            ? "1.5px solid #C9971E"
            : "1px solid #E3ECE7",
        boxShadow: isLive
          ? "0 0 0 3px rgba(46,125,50,0.08)"
          : isNearest
            ? "0 0 0 3px rgba(201,151,30,0.08)"
            : "none",
        display: "flex",
        flexDirection: "column",
        gap: 1.75,
        transition: "border-color .2s ease, box-shadow .2s ease",
        "&:hover": { borderColor: "#0D4F3C" },
      }}
    >
      {/* شريط علوي: أيقونة + عنوان + زرار الحفظ */}
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ alignItems: "center", gap: 1 }}
      >
        <Box
          sx={{
            flexShrink: 0,
            width: 44,
            height: 44,
            borderRadius: "12px",
            bgcolor: isDiploma ? "#0D4F3C" : "#E6F2ED",
            color: isDiploma ? "#fff" : "#0D4F3C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isDiploma ? (
            <WorkspacePremiumIcon fontSize="small" />
          ) : (
            <MenuBookIcon fontSize="small" />
          )}
        </Box>

        <Typography
          sx={{
            flex: 1,
            fontFamily: "'Amiri', serif",
            fontWeight: 700,
            fontSize: { xs: 16.5, sm: 18 },
            color: "#0D4F3C",
            lineHeight: 1.6,
          }}
        >
          {item.name}
        </Typography>

        <IconButton
          size="small"
          onClick={() => onToggleSave(item.id)}
          aria-label="حفظ"
          sx={{
            flexShrink: 0,
            color: isSaved ? "#C9971E" : "#B7C4BE",
            "&:hover": { color: "#C9971E" },
          }}
        >
          {isSaved ? (
            <BookmarkIcon fontSize="small" />
          ) : (
            <BookmarkBorderIcon fontSize="small" />
          )}
        </IconButton>
      </Stack>

      {(isLive || isNearest) && (
        <Chip
          label={isLive ? "شغالة الآن" : "الأقرب"}
          size="small"
          icon={
            isLive ? (
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  bgcolor: "#2E7D32",
                  ml: 0.75,
                  "@keyframes pulse": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0.25 },
                    "100%": { opacity: 1 },
                  },
                  animation: "pulse 1.6s ease-in-out infinite",
                }}
              />
            ) : undefined
          }
          sx={{
            alignSelf: "flex-start",
            bgcolor: isLive ? "#EAF6EC" : "#FDF4E1",
            color: isLive ? "#1B5E20" : "#8A6100",
            fontWeight: 700,
            fontSize: 12.5,
          }}
        />
      )}

      <Divider sx={{ borderColor: "#EEF3F0" }} />

      <Stack spacing={1.1}>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <PersonIcon sx={{ fontSize: 18, color: "#6B8F80" }} />
          <Typography sx={{ fontSize: 14.5, color: "text.secondary" }}>
            المعلم: <b style={{ color: "#0D4F3C" }}>{item.teacher}</b>
          </Typography>
        </Stack>

        {item.days !== "—" && (
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <CalendarMonthIcon sx={{ fontSize: 18, color: "#6B8F80" }} />
            <Typography sx={{ fontSize: 14.5, color: "text.secondary" }}>
              أيام الحضور: {item.days}
            </Typography>
          </Stack>
        )}

        {item.time !== "—" && (
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <AccessTimeIcon sx={{ fontSize: 18, color: "#6B8F80" }} />
            <Typography sx={{ fontSize: 14.5, color: "text.secondary" }}>
              الموعد: {item.time}
            </Typography>
          </Stack>
        )}
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={0.75}
        sx={{
          mt: "auto",
          pt: 1,
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 13.5, color: "#9AA9A2" }}>
          البداية: {item.startLabel}
        </Typography>
        <Chip
          label={label}
          size="small"
          sx={{
            bgcolor: isLive ? "#EAF6EC" : "#F0F5F2",
            color: isLive ? "#1B5E20" : "#0D4F3C",
            fontWeight: 700,
            fontSize: 12.5,
          }}
        />
      </Stack>
      <Button
        component="a"
        href={`https://wa.me/201093495292?text=${encodeURIComponent(
          `السلام عليكم، أنا مهتم بـ "${item.name}"، ممكن أعرف تفاصيل أكتر؟`,
        )}`}
        fullWidth
        variant="contained"
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
        للحجز أو الاستفسار اضغط هنا
      </Button>
    </Box>
  );
}
/* ===================== الصفحة الرئيسية ===================== */
function FullPage() {
  const [tab, setTab] = useState(0);
  const [now, setNow] = useState(() => new Date());
  const [saved, setSaved] = useState([]);

  // تحديث العداد كل دقيقة، عشان "باقي كام" و"شغالة الآن" يفضلوا صحيحين
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // تحميل المحفوظ من localStorage أول ما الصفحة تفتح في المتصفح
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch (e) {
      // لو الوصول للـ localStorage فشل (متصفح خاص، إلخ)، نتجاهل بهدوء
    }
  }, []);

  const toggleSave = useCallback((id) => {
    setSaved((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        // تجاهل بهدوء لو التخزين مش متاح
      }
      return next;
    });
  }, []);

  // ترتيب كل قسم حسب الأقرب في الوقت (الشغالة دلوقتي والأقدم تاريخًا تطلع فوق)
  const sortedDiplomas = useMemo(
    () =>
      [...diplomas].sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate),
      ),
    [],
  );
  const sortedCourses = useMemo(
    () =>
      [...courses].sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate),
      ),
    [],
  );

  const list = tab === 0 ? sortedDiplomas : sortedCourses;

  // أول عنصر لسه مستقبلي (غير شغال دلوقتي) هو "الأقرب"
  const nearestId = useMemo(() => {
    const upcoming = list.find(
      (item) => !getTimeStatus(item.startDate, now).isLive,
    );
    return upcoming ? upcoming.id : null;
  }, [list, now]);
  return (
    <ThemeProvider theme={theme}>
      <Box dir="rtl" sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        {/* ========== شريط الأخبار فوق ========== */}
        {/* <NewsTicker /> */}
        <Box
          id="courses"
          dir="rtl"
          sx={{
            py: { xs: 6, md: 12 },
            px: { xs: 2, md: 4 },
            bgcolor: "#FAFCFB",
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: { xs: 4, md: 7 } }}>
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
                  fontSize: { xs: 26, sm: 32, md: 40 },
                  fontWeight: 700,
                  color: "#0D4F3C",
                  mb: 1.5,
                  lineHeight: 1.4,
                }}
              >
                الدبلومات والدورات
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: 14.5, md: 16.5 },
                  maxWidth: 560,
                  mx: "auto",
                  lineHeight: 1.9,
                }}
              >
                اختر المسار الذي يناسبك، وابدأ رحلتك في تعلُّم كتاب الله وعلومه
                على أيدي نخبة من العلماء والدكاترة والمشايخ المتخصصين.
              </Typography>

              <Box
                sx={{
                  height: 3,
                  width: 72,
                  mx: "auto",
                  mt: 2.5,
                  borderRadius: 2,
                  background:
                    "repeating-linear-gradient(45deg, #0D4F3C 0 6px, transparent 6px 12px)",
                }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                variant="scrollable"
                scrollButtons={false}
                sx={{
                  minHeight: 0,
                  maxWidth: "100%",
                  bgcolor: "#F0F5F2",
                  borderRadius: 999,
                  p: 0.6,
                  "& .MuiTabs-indicator": { display: "none" },
                  "& .MuiTabs-flexContainer": { gap: 0.5 },
                }}
              >
                {["الدبلومات", "الدورات"].map((label) => (
                  <Tab
                    key={label}
                    label={label}
                    sx={{
                      minHeight: 0,
                      px: { xs: 2.5, sm: 3.5 },
                      py: 1.1,
                      borderRadius: 999,
                      fontWeight: 700,
                      fontSize: { xs: 14, sm: 15.5 },
                      color: "#0D4F3C",
                      whiteSpace: "nowrap",
                      "&.Mui-selected": {
                        bgcolor: "#0D4F3C",
                        color: "#fff",
                      },
                    }}
                  />
                ))}
              </Tabs>
            </Box>

            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {list.map((item) => (
                <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <ItemCard
                    item={item}
                    isDiploma={tab === 0}
                    now={now}
                    isNearest={item.id === nearestId}
                    isSaved={saved.includes(item.id)}
                    onToggleSave={toggleSave}
                  />
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
              🟢 متاحون يومياً · ابدأ رحلتك في تعلم القرآن وعلومه مجاناً
            </Typography>
          </Container>
        </Box>
        {/* ==========   حلقات القرأن ========== */}
        <Container maxWidth="lg" id="plan">
          <Box sx={{ textAlign: "center", mb: 5, mt: 10 }}>
            <Typography
              sx={{
                fontFamily: "'Amiri', serif",
                fontSize: { xs: 26, md: 34 },
                fontWeight: 700,
                color: "#0D4F3C",
                lineHeight: 1.3,
              }}
            >
              حلقات تحفيظ القرآن الكريم
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: { xs: 14, md: 16 },
                mt: 1,
              }}
            >
              اختر البرنامج المناسب لك، وابدأ رحلتك في تعلم القرآن وعلومه
              بسهولة.
            </Typography>
          </Box>
          <Grid container spacing={3} sx={{ mb: 10 }}>
            {plansData.map((plan) => (
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}
                key={plan.title}
              >
                <PlanCard plan={plan} whatsappNumber={WHATSAPP_NUMBER} />
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* ========== 2. سكشن الإجازات والسند ========== */}
        {/* <Box
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
        </Box> */}
        {/* ========== سكشن شهادات الطلاب ========== */}
        <CertificatesSection />
        {/* ========== 3. سكشن قصص النجاح ========== */}
        {/* <Box
          id="courses"
          dir="rtl"
          sx={{
            py: { xs: 6, md: 12 },
            px: { xs: 2, md: 4 },
            bgcolor: "#FAFCFB",
          }}
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
                للحجز أو الاستفسار اضغط هنا
              </Button>
            </Box>
          </Container>
        </Box> */}
      </Box>
    </ThemeProvider>
  );
}

export default FullPage;
