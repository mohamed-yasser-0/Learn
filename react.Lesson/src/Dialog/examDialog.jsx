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
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../theme/context";
import { useRef } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialogExam() {
  const { postExam } = React.useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const [formExam, setFormExam] = useState({
    title: "",
    subject: "",
    level: "",
    questions: [],
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // ================= basic fields =================
  const handleChange = (field, value) => {
    setFormExam({ ...formExam, [field]: value });
  };
  const bottomRef = useRef(null);
  // ================= questions =================
const addQuestion = () => {
  setFormExam((prev) => ({
    ...prev,
    questions: [
      ...prev.questions,
      {
        question: "",
        options: ["", ""],
        correct: 0,
      },
    ],
  }));

  setTimeout(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};

  const handleQuestionChange = (qIndex, value) => {
    const updated = [...formExam.questions];
    updated[qIndex].question = value;

    setFormExam({ ...formExam, questions: updated });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...formExam.questions];
    updated[qIndex].options[oIndex] = value;

    setFormExam({ ...formExam, questions: updated });
  };

  const addOption = (qIndex) => {
    const updated = [...formExam.questions];
    updated[qIndex].options.push("");

    setFormExam({ ...formExam, questions: updated });
  };

  const setCorrect = (qIndex, value) => {
    const updated = [...formExam.questions];
    updated[qIndex].correct = value;

    setFormExam({ ...formExam, questions: updated });
  };

  // ================= submit =================
  const handleSubmit = () => {
    postExam(formExam);
    console.log(formExam);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        إضافة امتحان
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
          {/* بيانات الامتحان */}
          <TextField
            label="عنوان الامتحان"
            value={formExam.title}
            onChange={(e) => handleChange("title", e.target.value)}
            fullWidth
          />

          <TextField
            label="المادة"
            value={formExam.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            fullWidth
          />

          <TextField
            label="المستوى (سهل / متوسط / صعب)"
            value={formExam.level}
            onChange={(e) => handleChange("level", e.target.value)}
            fullWidth
          />

          {/* الأسئلة */}

          {formExam.questions.map((q, qIndex) => (
            <Box key={qIndex} sx={{ border: "1px solid #ccc", p: 2 }}>
              <TextField
                label="السؤال"
                value={q.question}
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
          <div ref={bottomRef} />
          <Button variant="contained" onClick={handleSubmit}>
            نشر الامتحان
          </Button>
        </List>
      </Dialog>
    </>
  );
}
