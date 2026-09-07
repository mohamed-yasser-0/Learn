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
  });

  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormCourse({
      ...formCourse,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("title", formCourse.title);
    formData.append("description", formCourse.description);
    formData.append("level", formCourse.level);
    formData.append("cat", formCourse.cat);
    formData.append("price", Number(formCourse.price));

    if (image) {
      formData.append("imgeCourse", image);
    }

    postCourse(formData);

    console.log("Course data:", formCourse);
    console.log("Image:", image);

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

        <List
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="عنوان الكورس"
            name="title"
            value={formCourse.title}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="وصف الكورس"
            name="description"
            value={formCourse.description}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="المستوى"
            name="level"
            value={formCourse.level}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="الفئة"
            name="cat"
            value={formCourse.cat}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="السعر"
            name="price"
            type="number"
            value={formCourse.price}
            onChange={handleChange}
            fullWidth
          />

          <Button
            variant="outlined"
            component="label"
            sx={{ fontSize: "18px" }}
          >
            {image ? image.name : "اختيار صورة الكورس"}

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

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
