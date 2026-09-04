import * as React from "react";
import {
  Button,
  Dialog,
  List,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Box,
  Fab,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../theme/context";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialogLesson() {
  const { id } = useParams();
  const { postLesson } = React.useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const [formLesson, setFormLesson] = useState({
    title: "",
    videoUrl: "",
    order: 0,
    summaryPoints: [""],
    quiz: {
      title: "",
      questions: [],
    },
  });

  // فتح و غلق
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // بيانات عامة
  const handleChange = (e) => {
    setFormLesson({
      ...formLesson,
      [e.target.name]: e.target.value,
    });
  };

  // ================= summary =================
  const handleSummaryChange = (index, value) => {
    const updated = [...formLesson.summaryPoints];
    updated[index] = value;

    setFormLesson({ ...formLesson, summaryPoints: updated });
  };

  const addSummary = () => {
    setFormLesson({
      ...formLesson,
      summaryPoints: [...formLesson.summaryPoints, ""],
    });
  };

  // ================= quiz =================
  const handleQuizTitle = (e) => {
    setFormLesson({
      ...formLesson,
      quiz: { ...formLesson.quiz, title: e.target.value },
    });
  };
  const bottomRef = useRef(null);

  const addQuestion = () => {
    setFormLesson({
      ...formLesson,
      quiz: {
        ...formLesson.quiz,
        questions: [
          ...formLesson.quiz.questions,
          { text: "", options: ["", ""], correct: 0 },
        ],
      },
    });
    setTimeout(() => {
      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleQuestionChange = (qIndex, value) => {
    const updated = [...formLesson.quiz.questions];
    updated[qIndex].text = value;

    setFormLesson({
      ...formLesson,
      quiz: { ...formLesson.quiz, questions: updated },
    });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...formLesson.quiz.questions];
    updated[qIndex].options[oIndex] = value;

    setFormLesson({
      ...formLesson,
      quiz: { ...formLesson.quiz, questions: updated },
    });
  };

  const addOption = (qIndex) => {
    const updated = [...formLesson.quiz.questions];
    updated[qIndex].options.push("");

    setFormLesson({
      ...formLesson,
      quiz: { ...formLesson.quiz, questions: updated },
    });
  };

  const setCorrect = (qIndex, value) => {
    const updated = [...formLesson.quiz.questions];
    updated[qIndex].correct = value;

    setFormLesson({
      ...formLesson,
      quiz: { ...formLesson.quiz, questions: updated },
    });
  };

  // ================= submit =================
  const handleSubmit = () => {
    postLesson(id, formLesson);
    console.log(formLesson);
    handleClose();
  };

  return (
    <>
      <Button
        sx={{ minWidth: "130px" }}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        اضافه درس
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{ transition: Transition }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <List sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* بيانات الدرس */}
          <TextField
            label="عنوان الدرس"
            name="title"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="رابط الفيديو"
            name="videoUrl"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="ترتيب الدرس"
            name="order"
            type="number"
            onChange={handleChange}
            fullWidth
          />

          {/* summary */}
          <h3>ملخص الدرس</h3>
          {formLesson.summaryPoints.map((point, index) => (
            <TextField
              key={index}
              label={`نقطة ${index + 1}`}
              value={point}
              onChange={(e) => handleSummaryChange(index, e.target.value)}
              fullWidth
            />
          ))}

          <Button onClick={addSummary}>إضافة نقطة</Button>

          {/* quiz */}
          <h3>Quiz</h3>

          <TextField
            label="عنوان الكويز"
            value={formLesson.quiz.title}
            onChange={handleQuizTitle}
            fullWidth
          />

          {formLesson.quiz.questions.map((q, qIndex) => (
            <Box key={qIndex} sx={{ border: "1px solid #ccc", p: 2 }}>
              <TextField
                label="السؤال"
                value={q.text}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                fullWidth
              />

              {q.options.map((opt, oIndex) => (
                <Box key={oIndex} sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <TextField
                    label={`اختيار ${oIndex + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                  />

                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correct === oIndex}
                    onChange={() => setCorrect(qIndex, oIndex)}
                  />
                </Box>
              ))}

              <Button onClick={() => addOption(qIndex)}>إضافة اختيار</Button>
            </Box>
          ))}
          <Button onClick={addQuestion}>إضافة سؤال</Button>
          {/* submit */}
          <div ref={bottomRef} />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ fontSize: "20px", py: 1 }}
          >
            نشر الدرس
          </Button>
        </List>
      </Dialog>
    </>
  );
}
