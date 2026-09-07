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
    type: "video",
    title: "",
    videoUrl: "",
    order: 0,
    summaryPoints: [""],
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
        variant="outlined"
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
          {/* <TextField
            label="نوع الدرس"
            name="type"
            onChange={handleChange}
            fullWidth
          /> */}
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
          {/* <TextField
            label="ترتيب الدرس"
            name="order"
            type="number"
            onChange={handleChange}
            fullWidth
          /> */}

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

          <Button variant="outlined" onClick={addSummary}>
            إضافة نقطة
          </Button>
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
