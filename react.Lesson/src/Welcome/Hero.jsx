import { Typography, Button, Box, Stack, Divider, Chip } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { keyframes } from "@mui/system";
import LOGO_URL from "../imge/Alforkans (2).png";
// حركة التكبير والتصغير عند فتح الموقع (نبضة خفيفة)
const logoPulse = keyframes`
  0% {
    transform: scale(0.85);
    opacity: 0;
  }
  60% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// نبضة مستمرة خفيفة بعد ظهور الشعار
const logoBreathing = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.04);
  }
`;

// ضع هنا مسار اللوجو الحقيقي بتاعك بدل الرابط الوهمي ده

function HeroSection() {
  // const {  } = useContext(AuthContext);
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  // const navigate = useNavigate();
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        py: { xs: 10, md: 16 },
        px: 3,
      }}
    >
      {/* geometric pattern overlay */}
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
      {/* ornament circles */}
      {[320, 260, 200].map((size, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            border: `1px solid rgba(201,168,76,${0.22 - i * 0.06})`,
            top: "43%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
      ))}

      <Box sx={{ position: "relative", zIndex: 2 }}>
        {/* اللوجو في المنتصف */}

        <Chip
          label="منصة قرآنية متكاملة"
          variant="outlined"
          sx={{
            mb: 3.5,
            color: "secondary.light",
            borderColor: "rgba(201,168,76,0.45)",
            letterSpacing: "2px",
            fontSize: 11,
            fontWeight: 600,
          }}
        />

        {/* <Typography
          variant="h2"
          sx={{
            color: "#fff",
            fontSize: { xs: 38, md: 60 },
            lineHeight: 1.2,
            mb: 1.5,
          }}
        >
          تعلَّم{" "}
          <Box component="span" sx={{ color: "secondary.light" }}>
            القرآن الكريم
          </Box>
          <br />و علومه
        </Typography> */}
        <Box
          component="img"
          src={LOGO_URL}
          alt="شعار الموقع"
          sx={{
            width: 350,
            height: 350,
            objectFit: "contain",
            display: "block",
            mx: "auto",
            filter: "drop-shadow(0 0 18px rgba(201,168,76,0.35))",
            animation: `${logoPulse} 1.1s ease-out both, ${logoBreathing} 3.5s ease-in-out 1.1s infinite`,
          }}
        />
        <Typography
          sx={{
            color: "rgba(255,255,255,0.6)",
            fontWeight: 300,
            mb: 4.5,
            fontSize: 16,
          }}
        >
          رحلة متكاملة لتعلم القرآن الكريم وعلومه
        </Typography>

        {/* Ayah box */}
        <Box
          sx={{
            display: "inline-block",
            bgcolor: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.25)",
            borderRight: "3px solid",
            borderRightColor: "secondary.main",
            borderRadius: "6px",
            px: 3.5,
            py: 1.8,
            mb: 5,
            maxWidth: 520,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Amiri', serif",
              color: "rgba(255,255,255,0.88)",
              fontSize: 20,
              lineHeight: 1.9,
            }}
          >
            ﴾ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا ﴿
          </Typography>

          <Divider
            sx={{
              bgcolor: "secondary.main",
              width: 50,
              mx: "auto",
              mt: 1,
              height: 2,
              border: "none",
            }}
          />
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2 }}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mt: 1,
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => {
              document.getElementById("plan")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            sx={{
              width: { xs: "85%", sm: "auto" },
              fontSize: { xs: "0.85rem", sm: "1rem" },
              px: { xs: 2, sm: 3 },
            }}
          >
            ابدأ رحلتك مع القرآن
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              document.getElementById("courses")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            sx={{
              width: { xs: "85%", sm: "auto" },
              fontSize: { xs: "0.85rem", sm: "1rem" },
              px: { xs: 2, sm: 3 },
              color: "rgba(255,255,255,0.8)",
              borderColor: "rgba(255,255,255,0.3)",
              "&:hover": {
                borderColor: "rgba(255,255,255,0.6)",
                bgcolor: "transparent",
              },
            }}
          >
            استعرض الدورات
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
export default HeroSection;
