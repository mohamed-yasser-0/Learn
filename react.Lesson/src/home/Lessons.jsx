import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DownloadIcon from "@mui/icons-material/Download";
import { AuthContext } from "../theme/context";
import { useEffect } from "react";
import CourseHeader from "./CourseHeader";
import { useNavigate, useParams } from "react-router-dom";
import DeleteCourseDialog from "../Dialog/AlertDialog";

// ─── VIDEO CARD ───────────────────────────────────────────────────────────────

function VideoCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { singleLesson } = useContext(AuthContext);

  const lesson = Array.isArray(singleLesson) ? singleLesson[0] : singleLesson;
  const videoUrl = lesson?.videoUrl;

  // 🔍 Detect YouTube
  const isYouTube =
    videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be");

  // 🎯 Extract YouTube ID
  const getYouTubeId = (url) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url?.match(regExp);
    return match ? match[1] : null;
  };

  const youtubeId = getYouTubeId(videoUrl);

  // 🎨 Thumbnail
  const thumbnail = isYouTube
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : videoUrl
        ?.replace("/video/upload/", "/video/upload/so_2/")
        ?.replace(".mp4", ".jpg");

  return (
    <Box
      sx={{
        overflow: "hidden",
        mb: 2,
        borderRadius: 3,
        width: { xs: "100%", md: "80%", lg: "60%" },
        mx: "auto",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          bgcolor: "black",
          overflow: "hidden",
          cursor: !isPlaying ? "pointer" : "default",
        }}
        onClick={() => !isPlaying && setIsPlaying(true)}
      >
        {/* Thumbnail */}
        {!isPlaying && (
          <>
            <Box
              component="img"
              src={thumbnail}
              alt="video thumbnail"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                inset: 0,
              }}
            />
            <PlayCircleIcon
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: 64,
                color: "rgba(255,255,255,0.8)",
              }}
            />
          </>
        )}

        {/* 🎬 YouTube */}
        {isPlaying && isYouTube && youtubeId && (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0`}
            title="YouTube video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{
              border: "none",
            }}
          />
        )}

        {/* 🎥 Cloudinary / MP4 */}
        {isPlaying && !isYouTube && (
          <video
            src={videoUrl}
            controls
            autoPlay
            controlsList="nodownload noplaybackrate noremoteplayback"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              backgroundColor: "black",
            }}
          />
        )}
      </Box>
    </Box>
  );
}

// ─── SUMMARY CARD ─────────────────────────────────────────────────────────────
function SummaryCard() {
  const { singleLesson } = React.useContext(AuthContext);
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        overflow: "hidden",
        mb: 1.5,
        border: "1px solid rgba(201,168,76,0.2) !important",
      }}
    >
      <Box sx={{ p: 2.5, pb: 0 }}>
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              bgcolor: "#FFF7E0",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            📄
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: 10,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "secondary.dark",
              }}
            >
              ملخص الدرس
            </Typography>
          </Box>
        </Box>
        <Typography>{singleLesson?.summaryPoints}</Typography>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box sx={{ p: 2, display: "flex", gap: 1 }}>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          startIcon={<DownloadIcon />}
          sx={{
            fontSize: 12,
            borderColor: "rgba(201,168,76,.4)",
            color: "secondary.dark",
          }}
        >
          تحميل ملخص PDF
        </Button>
      </Box>
    </Box>
  );
}

// ─── QUIZ CARD ────────────────────────────────────────────────────────────────
function QuizCard() {
  const navigate = useNavigate();
  const { singleLesson, postProgress, user, course } =
    React.useContext(AuthContext);

  const questions = singleLesson?.quiz?.questions || [];

  const [answers, setAnswers] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [score, setScore] = useState(0);

  // ❗ safe course lookup (بدل filter)
  const cors = course?.find((e) => e._id === singleLesson?.idCours);

  const isPassed = questions.length ? score >= questions.length * 0.5 : false;

  const handleChange = (questionIndex, optionIndex) => {
    if (submitted) return;

    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    let newScore = 0;

    questions.forEach((q, i) => {
      if (Number(answers[i]) === q.correct) {
        newScore++;
      }
    });

    setScore(newScore);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const sub = {
    userId: user?._id,
    courseId: cors?._id, // ❗ fixed (كان array)
    lessonId: singleLesson?._id,
    watched: true,
    quizScore: score,
    quizPassed: isPassed,
  };

  if (!questions || questions.length === 0) return null;

  return (
    <>
      {/* زرار فتح/قفل */}
      {!open && (
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Button
            onClick={() => {
              setOpen(true);

              setTimeout(() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }, 100);
            }}
            variant="contained"
            sx={{
              mb: 2,
              width: "100%",
              maxWidth: "500px",
              fontSize: 20,
            }}
          >
            فتح الاختبار
          </Button>
        </Box>
      )}

      {/* الكارد */}
      <Box
        sx={{
          bgcolor: "background.paper",
          maxHeight: open ? "2000px" : "0px",
          overflow: "hidden",
          border: "1.5px solid rgba(201,168,76,0.3)",
        }}
      >
        {open && (
          <>
            {/* Header */}
            <Box
              sx={{
                px: 2.5,
                py: 2,
                borderBottom: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              <Typography sx={{ fontSize: 19, fontWeight: 600 }}>
                اختبار الدرس
              </Typography>

              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                عدد الأسئلة: {questions.length}
              </Typography>

              {submitted && (
                <Typography
                  sx={{ mt: 1, fontWeight: 600 }}
                  color="primary.main"
                >
                  نتيجتك: {score} / {questions.length}
                </Typography>
              )}
            </Box>

            {/* Questions */}
            {questions.map((q, i) => (
              <Box key={i} sx={{ p: 2.5, borderBottom: "1px solid #eee" }}>
                <Typography variant="h6" mb={2}>
                  {i + 1}. {q.text}
                </Typography>

                <RadioGroup
                  value={answers[i] ?? ""}
                  onChange={(e) => handleChange(i, Number(e.target.value))}
                >
                  {q.options.map((opt, index) => {
                    const isSelected = answers[i] === index;
                    const isCorrect = index === q.correct;

                    return (
                      <Box
                        key={index}
                        sx={{
                          mb: 2,
                          borderRadius: 1,
                          border: "2px solid",
                          borderColor: isSelected
                            ? "primary.main"
                            : "rgba(0,0,0,0.12)",
                          bgcolor: isSelected
                            ? "rgba(201,168,76,0.08)"
                            : "transparent",
                        }}
                      >
                        <FormControlLabel
                          value={index}
                          control={
                            <Radio
                              disabled={submitted}
                              sx={{
                                color: "#999",
                                "&.Mui-checked": {
                                  color: "primary.main",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              sx={{
                                fontWeight: submitted && isCorrect ? 700 : 400,
                                color:
                                  submitted && isCorrect
                                    ? "success.main"
                                    : "text.primary",
                              }}
                            >
                              {opt}
                            </Typography>
                          }
                          sx={{
                            width: "100%",
                            m: 0,
                            p: "10px 16px",
                          }}
                        />
                      </Box>
                    );
                  })}
                </RadioGroup>

                {/* نتيجة السؤال */}
                {submitted && (
                  <Box mt={1}>
                    {answers[i] === q.correct ? (
                      <Typography color="success.main">
                        ✔ إجابة صحيحة
                      </Typography>
                    ) : (
                      <Typography color="error.main">✖ إجابة خاطئة</Typography>
                    )}
                  </Box>
                )}
              </Box>
            ))}

            {/* زرار الإرسال */}
            {!submitted && (
              <Box sx={{ p: 2.5 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length !== questions.length}
                >
                  إرسال الإجابات
                </Button>
              </Box>
            )}

            {/* النتيجة النهائية */}
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography sx={{ fontWeight: 600 }}>
                {score} / {questions.length}
              </Typography>

              <Typography
                sx={{ transition: "0.3s", opacity: submitted ? 1 : 0 }}
                color={isPassed ? "success.main" : "error.main"}
              >
                {isPassed ? "ناجح" : "راسب يرجي اعاده الاختبار"}
              </Typography>
            </Box>
          </>
        )}

        {/* footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            p: 3,
            borderTop: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <Button
            disabled={!submitted}
            variant="contained"
            onClick={handleReset}
          >
            اعاده الاختبار
          </Button>

          <Button
            variant="contained"
            color="primary"
            disabled={!submitted || !isPassed}
            onClick={() => {
              postProgress(sub);
              navigate(-1);
            }}
          >
            تسليم الاختبار
          </Button>
        </Box>
      </Box>
    </>
  );
}

// ─── CONNECTOR ────────────────────────────────────────────────────────────────
function Connector({ color = "#1A5C38", opacity = 0.15 }) {
  return (
    <Box
      sx={{ width: 2, height: 28, bgcolor: color, opacity, mx: "auto", my: 0 }}
    />
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function LessonFlowPage() {
  const { getSingleLesson, singleLesson, lessons, loadingLessons } =
    React.useContext(AuthContext);
  const { idLesson } = useParams();
  const delname = "lesson";
  useEffect(() => {
    getSingleLesson(idLesson,"GET");
  }, [idLesson]);

  const questions = singleLesson?.quiz?.questions;
  console.log("questions in lesson flow page", questions);

  return (
    <>
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
          <CourseHeader totalCount={lessons.length} />

          <Box
            sx={{
              display: "grid",
              minHeight: "calc(100vh - 58px - 180px)",
            }}
          >
            {/* ── MAIN ── */}
            <Box sx={{ p: { xs: 2, md: 3.5 }, pb: 10 }}>
              <DeleteCourseDialog title={" الدرس"} delname={delname} />
              <Connector color="#1A5C38" />
              <VideoCard />
              <Connector color="#1A5C38" />
              {/* 2 — SUMMARY */}
              <SummaryCard />
              <Connector color="#C9A84C" />
              {/* 3 — QUIZ */}
              <QuizCard />
            </Box>
            {/* ── SIDEBAR ── */}
            <Box sx={{ display: { xs: "none", md: "block" } }}></Box>
          </Box>
        </>
      )}
      ;
    </>
  );
}
