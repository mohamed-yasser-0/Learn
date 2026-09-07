import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Box,
  Typography,
  IconButton,
  Avatar,
  Chip,
  Grid,
  LinearProgress,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Badge,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import QuizIcon from "@mui/icons-material/Quiz";
import CloseIcon from "@mui/icons-material/Close";
import FullScreenDialog from "../Dialog/Dialog";
import { AuthContext } from "../theme/context";
import CourseCard from "./CourseCard";
import ExamCard from "./ExamCard";
import FullScreenDialogExam from "../Dialog/examDialog";
import { useNavigate } from "react-router-dom";
// ─── DATA ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "الكل",
  "فقه",
  "عقيدة",
  "علوم القرآن",
  "حديث",
  "سيرة",
  "تفسير",
  "لغة عربية",
];

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ open, onClose, selected, setSelected }) {
  const navigate = useNavigate();
  const { user, progress, exams } = React.useContext(AuthContext);
  const SIDEBAR_ITEMS = [
    // { icon: <DashboardOutlinedIcon />, label: "لوحة التحكم", value: "dashboard" },
    {
      icon: <MenuBookOutlinedIcon />,
      label: "كورسات",
      value: "courses",
    },
    // { icon: <BookmarkBorderIcon />, label: "المحفوظات", value: "saved" },
    // {
    //   icon: (
    //     <Badge
    //       color="error"
    //       variant="dot"
    //       overlap="circular"
    //       invisible={!(exams.length >= 1)}
    //     >
    //       <QuizIcon />
    //     </Badge>
    //   ),
    //   label: "امتحانات",
    //   value: "exams",
    // },
    // { icon: <SettingsOutlinedIcon />, label: "الإعدادات", value: "settings" },
  ];

  const pct = Math.round(progress?.data?.length);
  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setSelected(newValue);
    }
  };
  function Logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
  const content = (
    <Box
      sx={{
        width: 220,
        pt: "64px",
        height: "100%",
        bgcolor: "#fff",
        borderLeft: "1px solid rgba(26,92,56,0.08)",
      }}
    >
      {/* User card */}
      <Box
        onClick={() => {
          onClose();
          navigate("/Learn/profile");
        }}
        sx={{
          p: 2.5,
          bgcolor: "primary.main",
          mx: 2,
          mt: 2,
          borderRadius: 2,
          pointerEvents: "auto",
          cursor: "pointer",

          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              bgcolor: "secondary.main",
              color: "primary.dark",
              fontWeight: 700,
            }}
          >
            {user?.avatar}
          </Avatar>
          <Box>
            <Typography
              sx={{
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {user?.name}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>
              {pct || 0}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 1.5 }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>
              مستوى الإنجاز
            </Typography>
            <Typography
              sx={{ color: "secondary.light", fontSize: 11, fontWeight: 700 }}
            >
              {pct || 0}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={pct || 0}
            sx={{
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.2)",
              "& .MuiLinearProgress-bar": { bgcolor: "secondary.main" },
            }}
          />
        </Box>
      </Box>

      <List sx={{ px: 1, mt: 1 }}>
        <ToggleButtonGroup
          value={selected}
          exclusive
          onChange={handleChange}
          orientation="vertical" // عشان Sidebar
          fullWidth
        >
          {SIDEBAR_ITEMS.map((item, i) => (
            <ToggleButton key={i} value={item.value}>
              <Box sx={{ mr: 1 }}>{item.icon}</Box>
              <ListItemText primary={item.label} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </List>

      <Box sx={{ p: 2, mt: "auto" }}>
        <ListItemButton
          onClick={() => Logout()}
          sx={{
            borderRadius: 2,
            color: "#E53935",
            "&:hover": { bgcolor: "rgba(229,57,53,0.06)" },
            gap: 1.5,
          }}
        >
          <LogoutIcon sx={{ fontSize: 20 }} />
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
            تسجيل الخروج
          </Typography>
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* permanent on desktop */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 1200,
        }}
      >
        {content}
      </Box>
      {/* drawer on mobile */}
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{ display: { md: "none" } }}
        PaperProps={{ sx: { bgcolor: "#fff" } }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {content}
      </Drawer>
    </>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Main() {
  const { course, user, progress, getProgress, loadingProgress, loadingAuth } =
    React.useContext(AuthContext);
  useEffect(() => {
    getProgress();
  }, []);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [selected, setSelected] = useState("courses");

  const filtered = course.filter((c) => {
    const catMatch = activeCategory === "الكل" || c.cat === activeCategory;
    return catMatch;
  });
  const pct = Math.round(progress?.data?.length);
  return (
    <>
      {loadingAuth || loadingProgress ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <CssBaseline />
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            selected={selected}
            setSelected={setSelected}
          />

          {/* Main content — offset by sidebar (220px) on desktop */}
          <Box
            sx={{
              pt: "64px",
              pr: { xs: 0, md: "220px" },
              minHeight: "100vh",
              bgcolor: "background.default",
            }}
          >
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              {/* ── Welcome banner ── */}
              <Box
                sx={{
                  display: { xs: "block", md: "none" },
                  bgcolor: "primary.main",
                  borderRadius: 1,
                  p: { xs: 3, md: 4 },
                  mb: 4,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar
                    sx={{
                      bgcolor: "secondary.main",
                      color: "primary.dark",
                      fontWeight: 700,
                    }}
                  >
                    {user?.avatar}
                  </Avatar>
                  <Box>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: 13,
                        fontWeight: 700,
                        lineHeight: 1.2,
                      }}
                    >
                      {user?.name}
                    </Typography>
                    <Typography
                      sx={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}
                    >
                      {pct || 0}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 1.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      sx={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}
                    >
                      مستوى الإنجاز
                    </Typography>
                    <Typography
                      sx={{
                        color: "secondary.light",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {pct || 0}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={pct || 0}
                    sx={{
                      borderRadius: 2,
                      bgcolor: "rgba(255,255,255,0.2)",
                      "& .MuiLinearProgress-bar": { bgcolor: "secondary.main" },
                    }}
                  />
                </Box>
              </Box>
              {/* ── Category chips ── */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 3.5,
                  flexWrap: "wrap",
                  width: "100%",
                  justifyContent: "space-center",
                }}
              >
                {CATEGORIES.map((cat) => (
                  <Chip
                    key={cat}
                    label={cat}
                    onClick={() => setActiveCategory(cat)}
                    variant={activeCategory === cat ? "filled" : "outlined"}
                    sx={{
                      bgcolor:
                        activeCategory === cat ? "primary.main" : "transparent",
                      color: activeCategory === cat ? "#fff" : "text.secondary",
                      borderColor:
                        activeCategory === cat
                          ? "primary.main"
                          : "rgba(0,0,0,0.18)",
                      fontWeight: activeCategory === cat ? 700 : 400,
                      fontSize: 13,
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor:
                          activeCategory === cat
                            ? "primary.light"
                            : "rgba(26,92,56,0.06)",
                      },
                      transition: "all 0.2s",
                    }}
                  />
                ))}
              </Box>

              {/* ── Results count ── */}
              <Typography
                sx={{ fontSize: 13, color: "text.secondary", mb: 2.5 }}
              >
                {filtered.length} كورس متاح
                {activeCategory !== "الكل" && ` في ${activeCategory}`}
              </Typography>

              {/* ── Courses Grid ── */}
              <Grid container spacing={2.5}>
                {selected === "courses" &&
                  filtered.map((course) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={course.id}>
                      <CourseCard course={course} />
                    </Grid>
                  ))}
                {selected === "exams" && (
                  <Grid size={12} key={course.id}>
                    <ExamCard />
                  </Grid>
                )}

                <Grid
                  size={12}
                  sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                >
                  {selected === "courses" && user?.role === "ADMIN" ? (
                    <FullScreenDialog />
                  ) : (
                    ""
                  )}
                  {selected === "exams" && user?.role === "ADMIN" ? (
                    <FullScreenDialogExam />
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
      )}
      ;
    </>
  );
}
