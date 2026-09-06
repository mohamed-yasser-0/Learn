import React, { useEffect, useMemo, useState } from "react";
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
  Alert,
  Snackbar,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PlayCircleIcon from "@mui/icons-material/PlayCircleRounded";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../theme/context";
import FullScreenDialogLesson from "../Dialog/DialogLesson";
import DeleteCourseDialog from "../Dialog/AlertDialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import FullScreenDialogQuiz from "../Dialog/examDialog";

export default function LessonsPage() {
  const theme = useTheme();
  const { id } = useParams();

  const [activeLessonId, setActiveLessonId] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [answers, setAnswers] = useState({});
  const [finalResult, setFinalResult] = useState(false);
  const [quizResult, setQuizResult] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const { getLessons, lessons, progress, user, loadingLessons } =
    React.useContext(AuthContext);
  const delname = "course";

  useEffect(() => {
    if (id) getLessons(id);
  }, [id]);

  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const progressMutation = useMutation({
    mutationFn: async (progressData) => {
      const { data } = await axios.post(
        `https://learn-production-6c88.up.railway.app/api/progress/watch`,
        progressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return data;
    },

    onSuccess: () => {
      setSubmitError(null);
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },

    onError: (error) => {
      console.error("Error uploading progress:", error);
      setSubmitError(
        "تم حساب النتيجة، لكن حصلت مشكلة في حفظها. حاول تاني لو النتيجة مش ظاهرة في تقدمك.",
      );
    },
  });

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

  const allLessons = useMemo(
    () => lesson?.data?.lessons || [],
    [lesson?.data?.lessons],
  );
  const selectedLessonId = activeLessonId ?? allLessons[0]?._id ?? null;
  const {
    data: Progresslesson,
    isLoading: loadingProgress,
    isError: errorProgress,
  } = useQuery({
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

    enabled: !!id && !!token,
  });
  console.log("Progresslesson", Progresslesson);
  const activeLessonIndex = useMemo(
    () => allLessons.findIndex((l) => l._id === selectedLessonId),
    [allLessons, selectedLessonId],
  );

  const activeLesson = allLessons[activeLessonIndex];

  const questions = activeLesson?.quiz?.questions || [];

  const selectLesson = (lessonId) => {
    const lessonProgress = Progresslesson?.data?.find(
      (p) => p?.lessonId === lessonId,
    );
    console.log("lessonProgress", lessonProgress);
    setActiveLessonId(lessonId);
    setSubmitError(null);

    if (lessonProgress) {
      setFinalResult(true);
      setQuizResult({
        correct: lessonProgress?.quizScore[0],
        total: lessonProgress?.quizScore[1],
        percentage: lessonProgress?.quizScore[2],
      });
    } else {
      setAnswers({});
      setFinalResult(false);
      setQuizResult({});
    }
  };

  const handlePrevious = () => {
    if (activeLessonIndex > 0) {
      selectLesson(allLessons[activeLessonIndex - 1]._id);
    }
  };

  const handleNext = () => {
    if (activeLessonIndex >= 0 && activeLessonIndex < allLessons.length - 1) {
      selectLesson(allLessons[activeLessonIndex + 1]._id);
    }
  };

  const handleAnswerChange = (questionIndex, answerIndex) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: Number(answerIndex) }));
  };

  const handleSubmit = () => {
    let correct = 0;

    questions.forEach((question, index) => {
      if (answers[index] === Number(question.correctAnswer)) {
        correct++;
      }
    });

    const total = questions.length;
    const percentage = total ? Math.round((correct / total) * 100) : 0;

    const result = { correct, total, percentage };

    const progressData = {
      lessonId: selectedLessonId,
      duration: 120,
      quizScore: [correct, total, percentage],
    };

    progressMutation.mutate(progressData);

    setFinalResult(true);
    setQuizResult(result);
  };

  const isYouTube =
    activeLesson?.videoUrl?.includes("youtube.com") ||
    activeLesson?.videoUrl?.includes("youtu.be") ||
    false;

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

  if (isError) return <p style={{ marginTop: "5rem" }}>Error loading lesson</p>;
  if (errorProgress)
    return <p style={{ marginTop: "5rem" }}>Error loading progress</p>;

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
              lessons.map((l) => {
                const isDone = progress?.data?.some(
                  (e) => e.lessonId === l._id,
                );

                return (
                  <Button
                    key={l?._id}
                    variant={
                      l._id === selectedLessonId
                        ? "contained"
                        : isDone
                          ? "outlined"
                          : "contained"
                    }
                    onClick={() => selectLesson(l._id)}
                  >
                    {l?.title}
                  </Button>
                );
              })}

            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                justifyContent: "space-between",
                display: "flex",
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
        {isLoading || !activeLesson ? (
          <Box
            sx={{
              width: "100%",
              minHeight: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {activeLesson?.type === "quiz" ? (
              <Box
                sx={{ width: "100%", minHeight: "400px", p: { xs: 2, sm: 4 } }}
              >
                {finalResult ? (
                  <>
                    <Typography
                      sx={{
                        fontSize: { xs: 22, sm: 28 },
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      {activeLesson?.title}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mb: 3 }}>
                      عدد الأسئلة: {questions.length}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
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
                          <Typography
                            sx={{ fontSize: 18, fontWeight: 700, mb: 2 }}
                          >
                            {qIndex + 1}. {question.question}
                          </Typography>
                          <RadioGroup
                            value={answers[qIndex] ?? ""}
                            onChange={(e) =>
                              handleAnswerChange(qIndex, e.target.value)
                            }
                          >
                            {question.options.map((option, oIndex) => {
                              const correctIndex = Number(
                                question.correctAnswer,
                              );
                              const isCorrectOption = oIndex === correctIndex;
                              const isUserPick = answers[qIndex] === oIndex;

                              return (
                                <FormControlLabel
                                  disabled
                                  key={oIndex}
                                  value={oIndex}
                                  control={
                                    <Radio
                                      sx={{
                                        color: isCorrectOption
                                          ? "success.main"
                                          : isUserPick
                                            ? "error.main"
                                            : "text.secondary",
                                        "&.Mui-checked": {
                                          color: isCorrectOption
                                            ? "success.main"
                                            : "error.main",
                                        },
                                      }}
                                    />
                                  }
                                  label={
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        gap: 2,
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontSize: "15px",
                                          fontWeight:
                                            isCorrectOption || isUserPick
                                              ? 600
                                              : 400,
                                        }}
                                      >
                                        {option}
                                      </Typography>

                                      {isCorrectOption && (
                                        <Typography
                                          sx={{
                                            color: "success.main",
                                            fontSize: "14px",
                                            fontWeight: 700,
                                          }}
                                        >
                                          ✓ إجابة صحيحة
                                        </Typography>
                                      )}

                                      {isUserPick && !isCorrectOption && (
                                        <Typography
                                          sx={{
                                            color: "error.main",
                                            fontSize: "14px",
                                            fontWeight: 700,
                                          }}
                                        >
                                          ✕ إجابتك
                                        </Typography>
                                      )}
                                    </Box>
                                  }
                                  sx={{
                                    width: "100%",
                                    m: 0,
                                    mb: 1,
                                    px: 1,
                                    py: 0.7,
                                    border: "1px solid",
                                    borderColor: isCorrectOption
                                      ? "success.light"
                                      : isUserPick
                                        ? "error.light"
                                        : "divider",
                                    borderRadius: "8px",
                                    bgcolor: isCorrectOption
                                      ? "success.50"
                                      : isUserPick
                                        ? "error.50"
                                        : "transparent",
                                    transition: "0.2s",
                                    "&:hover": {
                                      bgcolor: "action.hover",
                                    },
                                    "& .MuiFormControlLabel-label": {
                                      width: "100%",
                                    },
                                  }}
                                />
                              );
                            })}
                          </RadioGroup>
                        </Paper>
                      ))}
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        minHeight: { xs: "auto", sm: "450px" },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: { xs: 2, sm: 4 },
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          maxWidth: "650px",
                          textAlign: "center",
                          p: { xs: 2.5, sm: 5 },
                          borderRadius: "28px",
                          border: "1px solid",
                          borderColor: "divider",
                          background: "background.paper",
                          boxShadow: "0 15px 50px rgba(0,0,0,0.08)",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "row", sm: "column" },
                            alignItems: "center",
                            justifyContent: "center",
                            gap: { xs: 1.5, sm: 0 },
                            mb: { xs: 2, sm: 1 },
                          }}
                        >
                          <Box
                            sx={{
                              width: { xs: 44, sm: 75 },
                              height: { xs: 44, sm: 75 },
                              mb: { xs: 0, sm: 2 },
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "primary.main",
                              color: "primary.contrastText",
                              fontSize: { xs: 22, sm: 36 },
                              flexShrink: 0,
                            }}
                          >
                            ✓
                          </Box>

                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 800,
                              fontSize: { xs: 20, sm: 34 },
                              mb: 0,
                            }}
                          >
                            نتيجة الكويز
                          </Typography>
                        </Box>

                        <Typography
                          sx={{
                            color: "text.secondary",
                            mb: { xs: 2.5, sm: 4 },
                            fontSize: { xs: 13.5, sm: 16 },
                          }}
                        >
                          أحسنت! لقد انتهيت من حل الكويز 🎉
                        </Typography>

                        <Box
                          sx={{
                            width: { xs: 110, sm: 170 },
                            height: { xs: 110, sm: 170 },
                            mx: "auto",
                            mb: { xs: 2.5, sm: 4 },
                            borderRadius: "50%",
                            border: { xs: "7px solid", sm: "10px solid" },
                            borderColor: "primary.main",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: 26, sm: 42 },
                              fontWeight: 900,
                              lineHeight: 1,
                            }}
                          >
                            {quizResult?.percentage}%
                          </Typography>
                          <Typography
                            sx={{
                              color: "text.secondary",
                              mt: { xs: 0.3, sm: 1 },
                              fontSize: { xs: 11, sm: 14 },
                            }}
                          >
                            النتيجة
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: { xs: 1.2, sm: 2 },
                          }}
                        >
                          <Box
                            sx={{
                              p: { xs: 1.5, sm: 2.5 },
                              borderRadius: "18px",
                              backgroundColor: "action.hover",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: { xs: 22, sm: 32 },
                                fontWeight: 800,
                                color: "success.main",
                              }}
                            >
                              {quizResult.correct}
                            </Typography>
                            <Typography
                              color="text.secondary"
                              sx={{ fontSize: { xs: 12, sm: 14 } }}
                            >
                              إجابة صحيحة
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              p: { xs: 1.5, sm: 2.5 },
                              borderRadius: "18px",
                              backgroundColor: "action.hover",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: { xs: 22, sm: 32 },
                                fontWeight: 800,
                              }}
                            >
                              {quizResult.total}
                            </Typography>
                            <Typography
                              color="text.secondary"
                              sx={{ fontSize: { xs: 12, sm: 14 } }}
                            >
                              إجمالي الأسئلة
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{
                        fontSize: { xs: 22, sm: 28 },
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      {activeLesson?.title}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mb: 3 }}>
                      عدد الأسئلة: {questions.length}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
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
                          <Typography
                            sx={{ fontSize: 18, fontWeight: 700, mb: 2 }}
                          >
                            {qIndex + 1}. {question.question}
                          </Typography>
                          <RadioGroup
                            value={answers[qIndex] ?? ""}
                            onChange={(e) =>
                              handleAnswerChange(qIndex, e.target.value)
                            }
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
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={
                        questions.length === 0 ||
                        Object.keys(answers).length < questions.length
                      }
                      sx={{
                        mt: 3,
                        px: 4,
                        py: 1.2,
                        borderRadius: "10px",
                        fontSize: 16,
                      }}
                    >
                      تسليم الامتحان
                    </Button>
                  </>
                )}
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

            {activeLesson?.type === "quiz" ? (
              <Divider sx={{ mb: 2 }} />
            ) : (
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "text.primary",
                  mb: 2,
                }}
              >
                {activeLesson?.title}
              </Typography>
            )}

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
                  onClick={handlePrevious}
                  disabled={activeLessonIndex <= 0}
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
                  onClick={handleNext}
                  disabled={
                    activeLessonIndex === -1 ||
                    activeLessonIndex >= allLessons.length - 1
                  }
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
          </>
        )}
      </Box>

      <Snackbar
        open={!!submitError}
        autoHideDuration={6000}
        onClose={() => setSubmitError(null)}
      >
        <Alert
          severity="warning"
          onClose={() => setSubmitError(null)}
          sx={{ width: "100%" }}
        >
          {submitError}
        </Alert>
      </Snackbar>
    </Box>
  );
}
