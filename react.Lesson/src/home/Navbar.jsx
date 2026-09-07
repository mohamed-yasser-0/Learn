import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Chip,
  Badge,
  Tooltip,
} from "@mui/material";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { AuthContext } from "../theme/context";
import { useNavigate } from "react-router-dom";
const NOTIFICATIONS = [
  // {
  //   id: 1,
  //   text: "أضيف درس جديد في كورس التجويد",
  //   time: "منذ ١٠ دقائق",
  //   read: false,
  // },
  // {
  //   id: 2,
  //   text: "حصلت على شهادة إتمام العقيدة 🎉",
  //   time: "منذ ٣ ساعات",
  //   read: false,
  // },
  // {
  //   id: 3,
  //   text: "تذكير: تابع درس الفقه من حيث توقفت",
  //   time: "أمس",
  //   read: true,
  // },
];
function Navbar() {
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;
  const { user} = React.useContext(AuthContext);
  const navigate = useNavigate();

  function Logout() {
    setProfileAnchor(null);
    localStorage.removeItem("token");
    window.location.reload();
  }
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid rgba(26,92,56,0.1)",
        zIndex: 1300,
      }}
    >
      <Toolbar
        sx={{ px: { xs: 2, md: 3 }, gap: 2, minHeight: "64px !important" }}
      >
        {/* Logo */}
        <Box sx={{ mr: { md: "auto" } }}>
          <Typography
            onClick={() => navigate("/Learn/home")}
            sx={{
              fontFamily: "'Amiri', serif",
              fontSize: 24,
              color: "primary.main",
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            اقرأ وارتقِ
          </Typography>

          <Typography
            sx={{ fontSize: 10, color: "text.secondary", fontWeight: 300 }}
          >
            للقرآن والتجويد والقراءات
          </Typography>
        </Box>

        <Box
          sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 0.5 }}
        >
          {/* Points chip */}
          <Chip
            icon={
              <EmojiEventsOutlinedIcon
                sx={{ fontSize: 16, color: "secondary.dark" }}
              />
            }
            label={`${0} نقطة`}
            size="small"
            sx={{
              bgcolor: "#FFF7E0",
              color: "secondary.dark",
              fontWeight: 700,
              fontSize: 12,
              display: { xs: "none", sm: "flex" },
            }}
          />

          {/* Notifications */}
          <Tooltip title="الإشعارات">
            <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
              <Badge badgeContent={unread} color="error">
                <NotificationsOutlinedIcon sx={{ color: "text.secondary" }} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile avatar */}
          <Tooltip title="حسابي">
            <IconButton
              onClick={(e) => setProfileAnchor(e.currentTarget)}
              sx={{ p: 0.5 }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "primary.main",
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                {user?.avatar}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* ── Profile Menu ── */}
        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={() => setProfileAnchor(null)}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 220,
              borderRadius: 3,
              border: "1px solid rgba(26,92,56,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            },
          }}
        >
          {/* Profile header */}
          <Box sx={{ px: 2, pt: 2, pb: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  width: 44,
                  height: 44,
                  bgcolor: "primary.main",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {user?.avatar}
              </Avatar>
              <Box>
                <Typography
                  sx={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}
                >
                  {user?.name}
                </Typography>
                <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
                  {user?.email}
                </Typography>
                <Chip
                  label={user?.level}
                  size="small"
                  sx={{
                    mt: 0.5,
                    bgcolor: "#E8F5EE",
                    color: "primary.main",
                    fontSize: 10,
                    height: 18,
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Divider />
          <MenuItem
            onClick={() => {
              setProfileAnchor(null);
              navigate("/Learn/profile");
            }}
            sx={{ gap: 1.5, py: 1.2 }}
          >
            <ListItemIcon>
              <AccountCircleOutlinedIcon sx={{ color: "primary.main" }} />
            </ListItemIcon>
            <Typography sx={{ fontSize: 14 }}>عرض الملف الشخصي</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => setProfileAnchor(null)}
            sx={{ gap: 1.5, py: 1.2 }}
          >
            <ListItemIcon>
              <EmojiEventsOutlinedIcon sx={{ color: "secondary.dark" }} />
            </ListItemIcon>
            <Typography sx={{ fontSize: 14 }}>شهاداتي</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => Logout()} sx={{ gap: 1.5, py: 1.2 }}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "#E53935" }} />
            </ListItemIcon>
            <Typography
              sx={{ fontSize: 14, color: "#E53935", fontWeight: 600 }}
            >
              تسجيل الخروج
            </Typography>
          </MenuItem>
        </Menu>

        {/* ── Notifications Menu ── */}
        <Menu
          anchorEl={notifAnchor}
          open={Boolean(notifAnchor)}
          onClose={() => setNotifAnchor(null)}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 300,
              borderRadius: 3,
              border: "1px solid rgba(26,92,56,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
              الإشعارات
            </Typography>
            <Chip
              label={`${unread} جديد`}
              size="small"
              color="error"
              sx={{ fontSize: 11 }}
            />
          </Box>
          <Divider />
          {NOTIFICATIONS.map((n) => (
            <MenuItem
              key={n.id}
              sx={{
                py: 1.5,
                px: 2,
                alignItems: "flex-start",
                gap: 1.5,
                bgcolor: n.read ? "transparent" : "rgba(26,92,56,0.04)",
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: n.read ? "transparent" : "primary.main",
                  mt: 0.7,
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography sx={{ fontSize: 13, lineHeight: 1.5 }}>
                  {n.text}
                </Typography>
                <Typography
                  sx={{ fontSize: 11, color: "text.secondary", mt: 0.3 }}
                >
                  {n.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
          <Divider />
          <MenuItem sx={{ justifyContent: "center", py: 1 }}>
            <Typography
              sx={{ fontSize: 13, color: "primary.light", fontWeight: 600 }}
            >
              عرض كل الإشعارات
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
