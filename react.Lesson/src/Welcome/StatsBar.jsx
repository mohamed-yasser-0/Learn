import {
  Typography,
  Box,
  Grid,

} from "@mui/material";


function StatsBar() {
  const stats = [
    { num: "٤٨٠+", label: "درس مسجَّل" },
    { num: "٣٢", label: "شيخ ومدرِّس" },
    { num: "١٢ ألف", label: "طالب مسجَّل" },
    { num: "مجانًا", label: "كل المحتوى" },
  ];
  return (
    <Box sx={{ bgcolor: "secondary.main" }}>
      <Grid container>
        {stats.map((s, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Box
              sx={{
                textAlign: "center",
                py: 2.8,
                px: 2,
                borderLeft:
                  i < stats.length - 1
                    ? "1px solid rgba(26,92,56,0.2)"
                    : "none",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Amiri', serif",
                  color: "primary.dark",
                  lineHeight: 1,
                  mb: 0.5,
                }}
              >
                {s.num}
              </Typography>
              <Typography
                sx={{ fontSize: 13, color: "primary.main", fontWeight: 500 }}
              >
                {s.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default StatsBar;
