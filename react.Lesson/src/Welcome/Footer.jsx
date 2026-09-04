import {
  Box,
  Link,
  Stack,
  Typography,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";

// ─── Social buttons config ────────────────────────────────────────────────────
// ─── Social buttons config ────────────────────────────────────────────────────
const socialLinks = [
  {
    icon: <WhatsAppIcon fontSize="small" />,
    href: "https://wa.me/01556451729",
    bg: "#25D366",
    title: "واتساب",
  },
  {
    icon: <TelegramIcon fontSize="small" />,
    href: "https://t.me/iqra_irtaki",
    bg: "#229ED9",
    title: "تيليغرام",
  },
  {
    icon: <YouTubeIcon fontSize="small" />,
    href: "https://youtube.com/@iqra_irtaki",
    bg: "#FF0000",
    title: "يوتيوب",
  },
  {
    icon: <FacebookIcon fontSize="small" />,
    href: "https://www.facebook.com/profile.php?id=100070121174711",
    bg: "#1877F2",
    title: "فيسبوك",
  },
];

const quickLinks = [
  "الدروس والمحاضرات",
  "القرآن والتجويد",
  "القراءات",
  "الأسئلة الشائعة",
];

const contactItems = [
  {
    icon: <EmailIcon sx={{ fontSize: 16, color: "secondary.light" }} />,
    text: "info@iqra-irtaki.com",
  },
  {
    icon: <WhatsAppIcon sx={{ fontSize: 16, color: "#25D366" }} />,
    text: "+20 10 XXX XXXX",
  },
  {
    icon: <TelegramIcon sx={{ fontSize: 16, color: "#229ED9" }} />,
    text: "قناة اقرأ وارتقِ على تيليغرام",
  },
];

const bottomLinks = ["من نحن", "منهجنا", "سياسة الخصوصية", "الشروط والأحكام"];

// ─── Component ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#111",
        pt: 5,
        pb: 3,
        px: { xs: 3, md: 6 },
        borderTop: "1px solid rgba(201,168,76,0.18)",
      }}
    >
      {/* ── Top grid ── */}
      <Grid container spacing={4}>
        {/* Brand + Social */}
        <Grid item xs={12} md={4.5}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Amiri', serif",
              color: "secondary.light",
              lineHeight: 1,
              mb: 0.5,
            }}
          >
            اقرأ وارتقِ
          </Typography>

          <Typography
            sx={{ fontSize: 12, color: "rgba(255,255,255,0.35)", mb: 2 }}
          >
            لتعليم القرآن والتجويد والقراءات
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.85,
              mb: 3,
            }}
          >
            منصة تعليمية قرآنية تهدف إلى تعليم القرآن الكريم، التجويد، والقراءات
            بأسلوب منهجي مبسّط.
          </Typography>

          {/* Social icons */}
          <Stack direction="row" spacing={1}>
            {socialLinks.map((s) => (
              <IconButton
                key={s.title}
                component="a"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.title}
                size="small"
                sx={{
                  bgcolor: s.bg,
                  color: "#fff",
                  width: 38,
                  height: 38,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: s.bg,
                    opacity: 0.82,
                    transform: "translateY(-2px)",
                  },
                  transition: "transform 0.2s, opacity 0.2s",
                }}
              >
                {s.icon}
              </IconButton>
            ))}
          </Stack>
        </Grid>

        {/* Quick links */}
        <Grid item xs={6} md={3.5}>
          <Typography
            sx={{
              fontSize: 11,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "secondary.light",
              fontWeight: 700,
              mb: 2,
            }}
          >
            روابط سريعة
          </Typography>
          <Stack spacing={1.2}>
            {quickLinks.map((l) => (
              <Link
                key={l}
                href="#"
                underline="none"
                sx={{
                  color: "rgba(255,255,255,0.48)",
                  fontSize: 14,
                  "&:hover": { color: "secondary.light" },
                  transition: "color 0.2s",
                }}
              >
                {l}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Contact */}
        <Grid item xs={6} md={4}>
          <Typography
            sx={{
              fontSize: 11,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "secondary.light",
              fontWeight: 700,
              mb: 2,
            }}
          >
            تواصل معنا
          </Typography>
          <Stack spacing={1.8}>
            {contactItems.map((c, i) => (
              <Stack key={i} direction="row" alignItems="center" spacing={1.2}>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: 1.5,
                    bgcolor: "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {c.icon}
                </Box>
                <Typography
                  sx={{ fontSize: 13, color: "rgba(255,255,255,0.48)" }}
                >
                  {c.text}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>

      {/* ── Divider ── */}
      <Divider
        sx={{ width: "100%", mt: 2.5, borderColor: "rgba(255,255,255,0.07)" }}
      />

      {/* ── Bottom bar ── */}
      <Box
        sx={{
          pt: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.28)" }}>
          © ١٤٤٦ هـ — اقرأ وارتقِ — منصة تعليم القرآن والقراءات
        </Typography>
        <Stack direction="row" spacing={2.5}>
          {bottomLinks.map((l) => (
            <Link
              key={l}
              href="#"
              underline="hover"
              sx={{
                fontSize: 12,
                color: "rgba(255,255,255,0.32)",
                "&:hover": { color: "secondary.light" },
              }}
            >
              {l}
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default Footer;
