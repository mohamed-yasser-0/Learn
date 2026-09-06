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

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// سؤال فاضي
const emptyQuestion = () => ({
  text: "",
  options: ["", ""],
  correct: 0,
});

export default function FullScreenDialogQuiz() {
  const { id } = useParams();

  const [open, setOpen] = useState(false);

  const [formQuiz, setFormQuiz] = useState({
    title: "امتحان",
    order: 0,
    questions: [emptyQuestion()],
  });

  // =====================================
  // React Query Mutation
  // =====================================

  const quizMutation = useMutation({
    mutationFn: async (quizData) => {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `https://learn-production-6c88.up.railway.app/api/lessons/${id}`,
        quizData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    },

    onSuccess: (data) => {
      console.log("Quiz created:", data);

      // قفل الـ Dialog
      setOpen(false);

      // تفريغ الفورم
      setFormQuiz({
        order: 0,
        questions: [emptyQuestion()],
      });
    },

    onError: (error) => {
      console.error(
        "Error creating quiz:",
        error.response?.data || error.message,
      );
    },
  });

  // =====================================
  // Open / Close
  // =====================================

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // =====================================
  // Order
  // =====================================

  const handleOrderChange = (e) => {
    setFormQuiz((prev) => ({
      ...prev,
      order: e.target.value,
    }));
  };

  // =====================================
  // Questions
  // =====================================

  const handleQuestionTextChange = (qIndex, value) => {
    setFormQuiz((prev) => {
      const updatedQuestions = [...prev.questions];

      updatedQuestions[qIndex] = {
        ...updatedQuestions[qIndex],
        text: value,
      };

      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };

  // إضافة سؤال
  const addQuestion = () => {
    setFormQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, emptyQuestion()],
    }));
  };

  // حذف سؤال
  const removeQuestion = (qIndex) => {
    setFormQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, index) => index !== qIndex),
    }));
  };

  // =====================================
  // Options
  // =====================================

  const handleOptionChange = (qIndex, oIndex, value) => {
    setFormQuiz((prev) => {
      const updatedQuestions = [...prev.questions];

      const updatedOptions = [...updatedQuestions[qIndex].options];

      updatedOptions[oIndex] = value;

      updatedQuestions[qIndex] = {
        ...updatedQuestions[qIndex],
        options: updatedOptions,
      };

      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };

  // إضافة اختيار
  const addOption = (qIndex) => {
    setFormQuiz((prev) => {
      const updatedQuestions = [...prev.questions];

      updatedQuestions[qIndex] = {
        ...updatedQuestions[qIndex],

        options: [...updatedQuestions[qIndex].options, ""],
      };

      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };

  // حذف اختيار
  const removeOption = (qIndex, oIndex) => {
    setFormQuiz((prev) => {
      const updatedQuestions = [...prev.questions];

      const currentQuestion = updatedQuestions[qIndex];

      const updatedOptions = currentQuestion.options.filter(
        (_, index) => index !== oIndex,
      );

      let correct = currentQuestion.correct;

      // لو حذفنا الإجابة الصحيحة
      if (oIndex === correct) {
        correct = 0;
      }

      // لو الإجابة الصحيحة بعد الاختيار المحذوف
      if (oIndex < correct) {
        correct = correct - 1;
      }

      // حماية
      if (correct >= updatedOptions.length) {
        correct = 0;
      }

      updatedQuestions[qIndex] = {
        ...currentQuestion,
        options: updatedOptions,
        correct,
      };

      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };

  // =====================================
  // Correct Answer
  // =====================================

  const handleCorrectChange = (qIndex, oIndex) => {
    setFormQuiz((prev) => {
      const updatedQuestions = [...prev.questions];

      updatedQuestions[qIndex] = {
        ...updatedQuestions[qIndex],
        correct: oIndex,
      };

      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };

  // =====================================
  // Submit
  // =====================================

  const handleSubmit = () => {
    // تحويل البيانات للشكل المطلوب في MongoDB
    const quizData = {
      title: formQuiz.title,
      type: "quiz",

      order: Number(formQuiz.order),

      quiz: {
        questions: formQuiz.questions.map((question) => ({
          question: question.text,

          options: question.options,

          correctAnswer: question.correct,
        })),
      },
    };

    console.log("Sending:", quizData);

    quizMutation.mutate(quizData);
  };

  return (
    <>
      {/* =================================
          Open Button
      ================================= */}

      <Button
        sx={{
          minWidth: "130px",
        }}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        إضافة كويز
      </Button>

      {/* =================================
          Dialog
      ================================= */}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        {/* =================================
            AppBar
        ================================= */}

        <AppBar
          sx={{
            position: "relative",
          }}
        >
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>

            <Typography
              sx={{
                ml: 2,
                fontWeight: 700,
              }}
            >
              إضافة كويز
            </Typography>
          </Toolbar>
        </AppBar>

        {/* =================================
            Form
        ================================= */}

        <List
          sx={{
            p: {
              xs: 1.5,
              sm: 3,
            },

            display: "flex",
            flexDirection: "column",

            gap: 2,

            maxWidth: "1000px",

            width: "100%",

            mx: "auto",

            boxSizing: "border-box",
          }}
        >
          {/* =================================
              Order
          ================================= */}
          <TextField
            label="عنوان الكويز"
            value={formQuiz.title}
            onChange={(e) =>
              setFormQuiz({
                ...formQuiz,
                title: e.target.value,
              })
            }
            fullWidth
          />
          <TextField
            label="ترتيب الدرس"
            name="order"
            type="number"
            value={formQuiz.order}
            onChange={handleOrderChange}
            fullWidth
          />

          <Divider />

          {/* =================================
              Questions
          ================================= */}

          {formQuiz.questions.map((question, qIndex) => (
            <Box
              key={qIndex}
              sx={{
                border: "1px solid",
                borderColor: "divider",

                borderRadius: "12px",

                p: {
                  xs: 1.5,
                  sm: 2,
                },

                display: "flex",
                flexDirection: "column",

                gap: 1.5,
              }}
            >
              {/* Question Header */}

              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  السؤال {qIndex + 1}
                </Typography>

                {formQuiz.questions.length > 1 && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => removeQuestion(qIndex)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              {/* Question */}

              <TextField
                label="نص السؤال"
                value={question.text}
                onChange={(e) =>
                  handleQuestionTextChange(qIndex, e.target.value)
                }
                fullWidth
              />

              {/* Options Title */}

              <Typography
                sx={{
                  fontSize: 13,
                  color: "text.secondary",
                }}
              >
                الاختيارات — حدد الإجابة الصحيحة
              </Typography>

              {/* Options */}

              <RadioGroup
                value={question.correct}
                onChange={(e) =>
                  handleCorrectChange(qIndex, Number(e.target.value))
                }
              >
                {question.options.map((option, oIndex) => (
                  <Box
                    key={oIndex}
                    sx={{
                      display: "flex",

                      alignItems: "center",

                      gap: {
                        xs: 0.5,
                        sm: 1,
                      },

                      mb: 1,
                    }}
                  >
                    {/* Radio */}

                    <FormControlLabel
                      value={oIndex}
                      control={<Radio />}
                      label=""
                      sx={{
                        mr: 0,
                      }}
                    />

                    {/* Option */}

                    <TextField
                      size="small"
                      placeholder={`اختيار ${oIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      fullWidth
                    />

                    {/* Delete Option */}

                    {question.options.length > 2 && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeOption(qIndex, oIndex)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </RadioGroup>

              {/* Add Option */}

              <Button size="small" onClick={() => addOption(qIndex)}>
                إضافة اختيار
              </Button>
            </Box>
          ))}

          {/* =================================
              Add Question
          ================================= */}

          <Button variant="outlined" onClick={addQuestion}>
            إضافة سؤال جديد
          </Button>

          {/* =================================
              Submit
          ================================= */}

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={quizMutation.isPending}
            sx={{
              fontSize: "20px",
              py: 1,
            }}
          >
            {quizMutation.isPending ? "جاري نشر الكويز..." : "نشر الكويز"}
          </Button>
        </List>
      </Dialog>
    </>
  );
}
