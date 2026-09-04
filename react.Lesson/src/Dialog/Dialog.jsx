import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../theme/context";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const { postCourse } = React.useContext(AuthContext);

  const [formCourse, setFormCourse] = useState({
    title: "",
    description: "",
    level: "",
    cat: "",
    price: "0",
    imgeCourse: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormCourse({ ...formCourse, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const data = {
      ...formCourse,
      price: Number(formCourse.price), // نحول السعر لرقم
    };
    postCourse(data);
    console.log("data", data);
    handleClose();
  };

  return (
    <React.Fragment>
      <Fab onClick={handleClickOpen} color="primary" aria-label="add">
        <AddIcon />
      </Fab>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{ transition: Transition }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <List sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="عنوان الكورس"
            name="title"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="وصف الكورس"
            name="description"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="المستوى"
            name="level"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="الفئة"
            name="cat"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="السعر"
            name="price"
            type="number"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="لينك الصوره"
            name="imgeCourse"
            onChange={handleChange}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ fontSize: "20px" }}
          >
            نشر الكورس
          </Button>
        </List>
      </Dialog>
    </React.Fragment>
  );
}
