import { Typography, Box, Container, Grid } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LanguageIcon from "@mui/icons-material/Language";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

function FeaturesSection() {
  const features = [
    {
      icon: <MenuBookIcon sx={{ fontSize: 26 }} />,
      title: "القرآن الكريم وعلومه",
      desc: "تعلم القرآن الكريم وتفسيره وعلومه من خلال برامج تعليمية متدرجة ومناهج متخصصة.",
    },
    {
      icon: <LanguageIcon sx={{ fontSize: 26 }} />,
      title: "تعليم للعرب والأعاجم",
      desc: "برامج تعليمية مناسبة للناطقين بالعربية وغير الناطقين بها، بمستويات مختلفة.",
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 26 }} />,
      title: "إعداد وتأهيل المعلمين",
      desc: "برامج ودورات متخصصة لتطوير مهارات المعلمين وتأهيلهم لتعليم القرآن وعلومه.",
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 26 }} />,
      title: "نخبة من العلماء والمتخصصين",
      desc: "التعلم على يد نخبة من العلماء والدكاترة والمتخصصين في القرآن وعلومه والمجالات الشرعية.",
    },
    {
      icon: <AutoStoriesIcon sx={{ fontSize: 26 }} />,
      title: "دورات وبرامج متنوعة",
      desc: "مجموعة متنوعة من الدورات والمحاضرات والبرامج التعليمية التي تناسب مختلف الاهتمامات والمستويات.",
    },
    {
      icon: <TrackChangesIcon sx={{ fontSize: 26 }} />,
      title: "مسارات تعليمية متكاملة",
      desc: "اختر المسار الذي يناسبك وتابع تقدمك في رحلة تعليمية منظمة من البداية حتى الإتقان.",
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
