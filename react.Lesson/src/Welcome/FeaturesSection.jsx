import { Typography, Box, Container, Grid } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MicIcon from "@mui/icons-material/Mic";
import ArticleIcon from "@mui/icons-material/Article";
import MosqueIcon from "@mui/icons-material/Mosque";

function FeaturesSection() {
  const features = [
    {
      icon: <MenuBookIcon sx={{ fontSize: 26 }} />,
      title: "تعليم القرآن الكريم",
      desc: "دروس متدرجة لحفظ القرآن الكريم وتعلّم التلاوة الصحيحة خطوة بخطوة.",
    },
    {
      icon: <MicIcon sx={{ fontSize: 26 }} />,
      title: "التجويد والتلاوة",
      desc: "شرح أحكام التجويد عمليًا مع تطبيقات صوتية لتحسين القراءة والإتقان.",
    },
    {
      icon: <ArticleIcon sx={{ fontSize: 26 }} />,
      title: "القراءات وعلوم القرآن",
      desc: "تعلم القراءات القرآنية وعلوم القرآن بأسلوب مبسّط ومنظّم.",
    },
    {
      icon: <MosqueIcon sx={{ fontSize: 26 }} />,
      title: "متابعة ومراجعة مستمرة",
      desc: "اختبارات ومراجعات دورية تساعدك على تثبيت الحفظ وتحسين الأداء.",
    },
  ];
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        py: 8,
        px: { xs: 2, md: 5 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* decorative circle */}
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.1)",
          top: -120,
          left: -100,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Typography
          sx={{
            fontSize: 11,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.6)",
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          لماذا اقرأ وارتقِ؟
        </Typography>
        <Typography variant="h4" sx={{ color: "secondary.light", mb: 4.5 }}>
          مميزات المنصة
        </Typography>

        <Grid container spacing={2.5}>
          {features.map((f, i) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i}>
              <Box
                sx={{
                  bgcolor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(201,168,76,0.18)",
                  borderRadius: 2,
                  p: 3,
                  height: "100%",
                  transition: "background 0.2s",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: "rgba(201,168,76,0.14)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "secondary.light",
                    mb: 2,
                  }}
                >
                  {f.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", mb: 1, fontSize: 18 }}
                >
                  {f.title}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: 13,
                    lineHeight: 1.7,
                  }}
                >
                  {f.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
export default FeaturesSection;
