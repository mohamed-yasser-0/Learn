import { Typography, Button, Box, Stack, Divider, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function HeroSection() {
  // const {  } = useContext(AuthContext);
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "92vh",
        bgcolor: "primary.main",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        py: 32,
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
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
      ))}

      <Box sx={{ position: "relative", zIndex: 2 }}>
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

        <Typography
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
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.6)",
            fontWeight: 300,
            mb: 4.5,
            fontSize: 16,
          }}
        >
          رحلة متكاملة لحفظ القرآن وتعلّم التجويد والقراءات وعلوم القرآن
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
          direction="row"
          spacing={2}
          sx={{ justifyContent: "center", mt: "50px" }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            // onClick={() => navigate("/register")}
            href="#plan"
          >
            ابدأ رحلتك مع القرآن
          </Button>

          <Button
            variant="outlined"
            size="large"
            // onClick={() => navigate("/login")}
            sx={{
              color: "rgba(255,255,255,0.8)",
              borderColor: "rgba(255,255,255,0.3)",
              "&:hover": {
                borderColor: "rgba(255,255,255,0.6)",
                bgcolor: "transparent",
              },
            }}
          >
            استعرض الدروس
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
export default HeroSection;
