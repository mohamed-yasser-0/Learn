import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
} from "@mui/material";
import { AuthContext } from "../theme/context";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const ProfilePage = ({ gradesData, stats }) => {
  const { user, loadingAuth, loadingProgress } = React.useContext(AuthContext);

  const rows = Array.isArray(gradesData) ? gradesData : [];
  const firstLetter = user?.name?.trim()[0] || "؟";
  const token = localStorage.getItem("token");
  const { data: Progresslesson, isError: errorProgress } = useQuery({
    queryKey: ["progress"],

    queryFn: async () => {
      const { data } = await axios.get(
        `https://learn-production-6c88.up.railway.app/api/progress/watch`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    },

    enabled: !!token,
  });
    const totalPoints = Progresslesson?.data?.reduce((acc, item) => acc + item.quizScore[0], 0);
  return (
    <Box
      sx={{
        mt: 8,
        width: "100%",
        direction: "rtl",
        p: { xs: 1, md: 2 },
        height: "90vh",
      }}
    >
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
          <Box
            sx={{
              bgcolor: "primary.main",
              height: "220px",
              borderRadius: 4,
              mb: 4,
              display: "flex",
              alignItems: "flex-end",
              p: 4,
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              color: "#fff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3.5,
                zIndex: 2,
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 90, md: 125 },
                  height: { xs: 90, md: 125 },
                  bgcolor: "#fff",
                  color: "#1a237e",
                  fontSize: { xs: "35px", md: "55px" },
                  fontWeight: "700",
                  border: "5px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                }}
              >
                {firstLetter}
              </Avatar>

              <Box>
                <Typography variant="h4" fontWeight="700">
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ opacity: 0.85, fontWeight: 400 }}
                >
                  {user?.phone}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
                  تاريخ الانضمام:{" "}
                  {new Date(user?.createdAt).toLocaleDateString("ar-EG")}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* 2. Stats Cards - المربعات المختصرة */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              {
                label: "إجمالي الدرجات",
                value: totalPoints || 0,
                color: "primary.main",
              },
              {
                label: "عدد الاختبارات",
                value: Progresslesson?.data?.length || 0,
                color: "secondary.main",
              },
              {
                label: "الترتيب",
                value: stats?.rank || "—",
                color: "success.main",
              },
            ].map((card, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <Typography variant="h4" fontWeight="800" color={card.color}>
                    {card.value}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    {card.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* 3. Grades Table - جدول البيانات الرئيسي */}
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <Table>
              <TableHead sx={{ bgcolor: "#f8f9fa" }}>
                <TableRow>
                  <TableCell align="right" sx={{ fontWeight: "700" }}>
                    الموضوع / المادة
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "700" }}>
                    التاريخ
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "700" }}>
                    الدرجة
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "700" }}>
                    الحالة
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell align="right" sx={{ fontWeight: 500 }}>
                        {row.subject}
                      </TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: "bold", color: "primary.main" }}
                      >
                        {row.score}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={row.score >= 50 ? "ناجح" : "راسب"}
                          color={row.score >= 50 ? "success" : "error"}
                          size="small"
                          variant="filled"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                      <Typography color="text.secondary">
                        لا توجد بيانات درجات متاحة حالياً
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default ProfilePage;
