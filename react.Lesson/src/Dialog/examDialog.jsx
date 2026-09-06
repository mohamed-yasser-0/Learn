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
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AuthContext } from "../theme/context";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// شكل سؤال فاضي جديد
const emptyQuestion = () => ({
  text: "",
  options: ["", ""],
  correct: 0,
});

export default function FullScreenDialogQuiz() {
  const { id } = useParams();
  const { postQuiz } = React.useContext(AuthContext); // عدّل الاسم لو مختلف عندك

  const [open, setOpen] = useState(false);

  const [formQuiz, setFormQuiz] = useState({
    order: 0,
    questions: [emptyQuestion()],
  });

  // فتح و غلق
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // ترتيب الدرس اللي الكويز بتاعه
  const handleOrderChange = (e) => {
    setFormQuiz({ ...formQuiz, order: e.target.value });
  };

  // ================= questions =================
  const handleQuestionTextChange = (qIndex, value) => {
    const updated = [...formQuiz.questions];
    updated[qIndex].text = value;
    setFormQuiz({ ...formQuiz, questions: updated });
  };

  const addQuestion = () => {
    setFormQuiz({
      ...formQuiz,
      questions: [...formQuiz.questions, emptyQuestion()],
    });
  };

  const removeQuestion = (qIndex) => {
    const updated = formQuiz.questions.filter((_, i) => i !== qIndex);
    setFormQuiz({ ...formQuiz, questions: updated });
  };

  // ================= options =================
  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...formQuiz.questions];
    updated[qIndex].options[oIndex] = value;
    setFormQuiz({ ...formQuiz, questions: updated });
  };

  const addOption = (qIndex) => {
    const updated = [...formQuiz.questions];
    updated[qIndex].options.push("");
    setFormQuiz({ ...formQuiz, questions: updated });
  };

  const removeOption = (qIndex, oIndex) => {
    const updated = [...formQuiz.questions];
    updated[qIndex].options = updated[qIndex].options.filter(
      (_, i) => i !== oIndex,
    );
    // لو الإجابة الصح كانت الاختيار اللي اتشال، رجّعها لأول اختيار
    if (updated[qIndex].correct >= updated[qIndex].options.length) {
      updated[qIndex].correct = 0;
    }
    setFormQuiz({ ...formQuiz, questions: updated });
  };

  const handleCorrectChange = (qIndex, oIndex) => {
    const updated = [...formQuiz.questions];
    updated[qIndex].correct = oIndex;
    setFormQuiz({ ...formQuiz, questions: updated });
  };

  // ================= submit =================
  const handleSubmit = () => {
    postQuiz(id, formQuiz);
    console.log(formQuiz);
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
        اضافه كويز
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
          {/* ترتيب الدرس */}
          <TextField
            label="ترتيب الدرس اللي الكويز ده بتاعه"
            name="order"
            type="number"
            value={formQuiz.order}
            onChange={handleOrderChange}
            fullWidth
          />

          <Divider />

          {/* الأسئلة */}
          {formQuiz.questions.map((question, qIndex) => (
            <Box
              key={qIndex}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "12px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontWeight: 700 }}>
                  السؤال {qIndex + 1}
                </Typography>
                {formQuiz.questions.length > 1 && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => removeQuestion(qIndex)}
                  >
                    {/* <DeleteOutlineIcon fontSize="small" /> */}
                  </IconButton>
                )}
              </Box>

              <TextField
                label="نص السؤال"
                value={question.text}
                onChange={(e) =>
                  handleQuestionTextChange(qIndex, e.target.value)
                }
                fullWidth
              />

              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                الاختيارات (حدد دايرة الإجابة الصح)
              </Typography>

              <RadioGroup
                value={question.correct}
                onChange={(e) =>
                  handleCorrectChange(qIndex, Number(e.target.value))
                }
              >
                {question.options.map((option, oIndex) => (
                  <Box
                    key={oIndex}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <FormControlLabel
                      value={oIndex}
                      control={<Radio />}
                      label=""
                      sx={{ mr: 0 }}
                    />
                    <TextField
                      size="small"
                      placeholder={`اختيار ${oIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      fullWidth
                    />
                    {question.options.length > 2 && (
                      <IconButton
                        size="small"
                        onClick={() => removeOption(qIndex, oIndex)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </RadioGroup>

              <Button size="small" onClick={() => addOption(qIndex)}>
                إضافة اختيار
              </Button>
            </Box>
          ))}

          <Button onClick={addQuestion}>إضافة سؤال جديد</Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ fontSize: "20px", py: 1 }}
          >
            نشر الكويز
          </Button>
        </List>
      </Dialog>
    </>
  );
}