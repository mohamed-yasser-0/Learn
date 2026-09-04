import React, { useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  CardContent,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../theme/context";

function ExamCard() {
  const { exams } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!exams || exams.length === 0) {
    return (
      <Box sx={{ width: "100%", textAlign: "center", mt: 5 }}>
        <Typography variant="h5" color="text.secondary">
          لا يوجد اختبارات حالياً
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2.5}>
      {exams.map((exam) => (
        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={exam._id}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "all 0.25s",
              overflow: "hidden",
              border: "1px solid rgba(26,92,56,0.1)",
              borderRadius: "20px",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 3,
              },
            }}
          >
            {/* الهيدر */}
            <Box
              sx={{
                height: 120,
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                {exam?.title}
              </Typography>
            </Box>

            <CardContent
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {/* المادة + المستوى */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Chip label={exam?.subject} size="small" />
                <Chip label={exam?.level} size="small" variant="outlined" />
              </Box>

              {/* عدد الأسئلة */}
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                {exam?.questions?.length || 0} سؤال
              </Typography>

              {/* زر */}
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => navigate(`/exam/${exam._id}`)}
              >
                ابدأ الامتحان
              </Button>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default ExamCard;
