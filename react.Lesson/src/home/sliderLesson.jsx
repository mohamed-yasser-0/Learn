import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Avatar,
  Divider,
  Button,
  CircularProgress,
  useTheme,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlayCircleIcon from "@mui/icons-material/PlayCircleRounded";
import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import GroupRounded from "@mui/icons-material/GroupRounded";
import StarRounded from "@mui/icons-material/StarRounded";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../theme/context";
import FullScreenDialogLesson from "../Dialog/DialogLesson";
import DeleteCourseDialog from "../Dialog/AlertDialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FullScreenDialogQuiz from "../Dialog/examDialog";

export default function LessonsPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeLessonId, setActiveLessonId] = React.useState(
    "6a9d09792b72179995d1dfda",
  );
  const [showSummary, setShowSummary] = useState(false);
  const [answers, setAnswers] = useState({});
  console.log("lessonId", activeLessonId);
  const { getLessons, lessons, progress, user, loadingLessons } =
    React.useContext(AuthContext);
  const delname = "course";

  useEffect(() => {
    if (id) getLessons(id);
  }, [id]);
  const token = localStorage.getItem("token");
  console.log("token", token);
  const {
    data: lesson,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lesson", id],

    queryFn: async () => {
      const { data } = await axios.get(
        `https://learn-production-6c88.up.railway.app/api/lessons/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    },

    enabled: !!id && !!token,
  });
  if (isLoading) return <p style={{ marginTop: "5rem" }}>Loading...</p>;

  if (isError) return <p style={{ marginTop: "5rem" }}>Error loading lesson</p>;

  console.log(lesson.data.lessons);
  const activeLesson = lesson?.data?.lessons?.find(
    (lesson) => lesson._id === activeLessonId,
  );
  const questions = lesson?.quiz?.questions || [];

  const handleAnswerChange = (questionIndex, answerIndex) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: Number(answerIndex) }));
  };
  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    const total = questions.length;
    const percentage = total ? Math.round((correct / total) * 100) : 0;
    const result = { correct, total, percentage };
    console.log("Quiz Result:", result);
    true?.(result);
  };
  const isYouTube =
    activeLesson?.videoUrl.includes("youtube.com") ||
    activeLesson?.videoUrl.includes("youtu.be");
  const renderPlayer = () => {
    if (!activeLesson?.videoUrl) {
      return (
        <PlayCircleIcon
          sx={{ fontSize: 76, color: alpha(theme.palette.primary.main, 0.9) }}
        />
      );
    }

    if (isYouTube) {
      const videoId =
        activeLesson?.videoUrl.split("v=")[1]?.split("&")[0] ||
        activeLesson?.videoUrl.split("/").pop();
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={activeLesson?.title}
          style={{
            width: "100%",
            height: "100%",
            border: 0,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    // cloudinary أو أي provider تاني بيرجع mp4 مباشر
    return (
      <video
        src={activeLesson?.videoUrl?.replace("/q_auto/f_auto", "")}
        controls
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    );
  };
  return (
    <Box
      sx={{
        mt: 8,
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: { xs: "column-reverse", lg: "row" },
        gap: 3,
        p: { xs: 2, md: 3 },
      }}
    >
      {/* ---------------- الجنب الأول: الدروس ---------------- */}
      <Box
        sx={{
          width: { xs: "100%", lg: 360 },
          flexShrink: 0,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "18px",
          height: "90vh",
          p: { xs: 1, md: 3 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflowY: "auto",
        }}
      >
        {loadingLessons ? (
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
            {Array.isArray(lessons) &&
              lessons.map((lesson) => {
                const isDone = progress?.data?.some(
                  (e) => e.lessonId === lesson._id,
                );

                return (
                  <Button
                    key={lesson?._id}
                    variant={isDone ? "outlined" : "contained"}
                    onClick={() => {
                      // navigate(`/Learn/lessons/${lesson._id}`);
                      setActiveLessonId(lesson._id);
                    }}
                  >
                    {lesson?.title}
                  </Button>
                );
              })}

            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                justifyContent: "space-between",
              }}
            >
              {user?.role === "ADMIN" && <FullScreenDialogLesson />}
              {user?.role === "ADMIN" && <FullScreenDialogQuiz />}
            </Box>
            <Box sx={{ width: "100%", textAlign: "center" }}>
              {user?.role === "ADMIN" && (
                <DeleteCourseDialog title={" الكورس"} delname={delname} />
              )}
            </Box>
          </>
        )}
      </Box>

      {/* ---------------- الجنب التاني: فيديو الدرس + البيانات المعروفة ---------------- */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {/* الفيديو */}
        {activeLesson?.type === "quiz" ? (
          <Box sx={{ width: "100%", minHeight: "400px", p: { xs: 2, sm: 4 } }}>
            {/* عنوان الكويز */}
            <Typography
              sx={{ fontSize: { xs: 22, sm: 28 }, fontWeight: 700, mb: 1 }}
            >
              {lesson.title}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 3 }}>
              عدد الأسئلة: {questions.length}
            </Typography>
            {/* الأسئلة */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {questions.map((question, qIndex) => (
                <Paper
                  key={qIndex}
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "16px",
                  }}
                >
                  <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 2 }}>
                    {qIndex + 1}. {question.question}
                  </Typography>
                  <RadioGroup
                    value={answers[qIndex] ?? ""}
                    onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
                  >
                    {question.options.map((option, oIndex) => (
                      <FormControlLabel
                        key={oIndex}
                        value={oIndex}
                        control={<Radio />}
                        label={option}
                        sx={{ mb: 0.5 }}
                      />
                    ))}
                  </RadioGroup>
                </Paper>
              ))}
            </Box>
            {/* Submit */}
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, px: 4, py: 1.2, borderRadius: "10px", fontSize: 16 }}
            >
              تسليم الامتحان
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              position: "relative",
              borderRadius: "18px",
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
              aspectRatio: "16/9",
              background: `linear-gradient(
        135deg,
        ${theme.palette.background.default} 0%,
        ${theme.palette.background.paper} 60%,
        ${theme.palette.background.default} 100%
      )`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            {renderPlayer()}
          </Box>
        )}

        {/* عنوان الدرس */}
        <Typography
          sx={{
            fontSize: 12,
            color: "primary.light",
            fontWeight: 600,
            letterSpacing: 0.5,
            mb: 0.5,
          }}
        >
          LESSON {"mockLesson.order"}
        </Typography>
        <Typography
          sx={{ fontSize: 24, fontWeight: 700, color: "text.primary", mb: 2 }}
        >
          {activeLesson?.title}
        </Typography>
        {/* البيانات المعروفة تحت الفيديو */}
        <Box sx={{ mb: 3 }}>
          <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2 }}
            sx={{
              mb: 3,
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              size="small"
              variant="contained"
              // onClick={handlePrevious}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                color: "white",
                fontSize: { xs: "12px", sm: "14px" },
                px: { xs: 1, sm: 2 },
                py: { xs: 0.7, sm: 1 },
                minWidth: { xs: "100px", sm: "auto" },
                whiteSpace: "nowrap",
              }}
            >
              ← الدرس السابق
            </Button>

            <Button
              size="small"
              variant="contained"
              // onClick={handleNext}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                color: "white",
                fontSize: { xs: "12px", sm: "14px" },
                px: { xs: 1, sm: 2 },
                py: { xs: 0.7, sm: 1 },
                minWidth: { xs: "100px", sm: "auto" },
                whiteSpace: "nowrap",
              }}
            >
              الدرس التالي →
            </Button>
          </Stack>
          <Button
            size="small"
            variant="text"
            onClick={() => setShowSummary((prev) => !prev)}
            sx={{
              textTransform: "none",
              textDecoration: "underline",
              minWidth: "auto",
              padding: 0,
              fontSize: { xs: "11px", sm: "14px" },
              color: "primary.main",
              "&:hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
              },
            }}
          >
            {showSummary ? "إخفاء الملخص" : "عرض ملخص الدرس"}
          </Button>
          {showSummary && activeLesson?.summaryPoints?.length > 0 && (
            <Stack spacing={0.8} sx={{ mt: 1.5 }}>
              {activeLesson.summaryPoints
                .filter((point) => point.trim() !== "")
                .map((point, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        mt: "6px",
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 13.5,
                        color: "text.secondary",
                        lineHeight: 1.7,
                      }}
                    >
                      {point}
                    </Typography>
                  </Stack>
                ))}
            </Stack>
          )}
        </Box>
        <Divider sx={{ mb: 2 }} />
      </Box>
    </Box>
  );
}
