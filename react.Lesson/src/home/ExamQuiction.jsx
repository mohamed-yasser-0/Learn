import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../theme/context";
import { useEffect } from "react";

function ExamPage() {
  const { singleExam, getSingleExam } = useContext(AuthContext);
  const { examId } = useParams();
  useEffect(() => {
    getSingleExam(examId);
  }, []);

  // مؤقتًا بنستخدم داتا ثابتة

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (qIndex, value) => {
    setAnswers({ ...answers, [qIndex]: value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };
  const score = singleExam?.questions.reduce((acc, q, i) => {
    return acc + (answers[i] == q.correct ? 1 : 0);
  }, 0);

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {singleExam?.title}
      </Typography>

      {singleExam?.questions.map((q, index) => (
        <Card key={index} sx={{ p: 2, mb: 2 }}>
          <Typography sx={{ mb: 1 }}>
            {index + 1}. {q.question}
          </Typography>

          <RadioGroup
            value={answers[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
          >
            {q.options.map((opt, i) => (
              <FormControlLabel
                key={i}
                value={i}
                control={<Radio />}
                label={opt}
              />
            ))}
          </RadioGroup>

          {/* إظهار الإجابة الصح بعد التسليم */}
          {submitted && (
            <Typography sx={{ color: "green", mt: 1 }}>
              الإجابة الصحيحة: {q.options[q.correct]}
            </Typography>
          )}
        </Card>
      ))}

      {!submitted ? (
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          تسليم الامتحان
        </Button>
      ) : (
        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
          نتيجتك: {score} / {singleExam?.questions.length}
        </Typography>
      )}
    </Box>
  );
}

export default ExamPage;
