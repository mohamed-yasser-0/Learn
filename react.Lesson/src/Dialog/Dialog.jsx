import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../theme/context";

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
  const [imagePreview, setImagePreview] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  // إنشاء معاينة للصورة فور اختيارها، وتنظيف الرابط لما تتغير أو تتقفل النافذة
  useEffect(() => {
    if (!image) {
      setImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

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

    handleClose();
  };

  // ستايل موحّد لحقول الإدخال عشان تبقى كبيرة وواضحة لكبار السن
  const bigFieldStyle = {
    "& .MuiInputBase-input": {
      fontSize: { xs: "18px", sm: "20px" },
      padding: "16px 14px",
    },
    "& .MuiInputLabel-root": {
      fontSize: { xs: "16px", sm: "18px" },
    },
  };

  return (
    <React.Fragment>
      <Fab
        onClick={handleClickOpen}
        color="primary"
        aria-label="إضافة كورس جديد"
        sx={{ width: 64, height: 64 }}
      >
        <AddIcon sx={{ fontSize: 32 }} />
      </Fab>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{ transition: Transition }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar sx={{ minHeight: { xs: 64, sm: 72 } }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="إغلاق"
              sx={{ mr: 2 }}
            >
              <CloseIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <Typography sx={{ fontSize: { xs: "18px", sm: "22px" }, fontWeight: 600 }}>
              إضافة كورس جديد
            </Typography>
          </Toolbar>
        </AppBar>

        {/* الحاوية الرئيسية: بتتمركز في النص وتاخد عرض محدد على الشاشات الكبيرة عشان القراءة تبقى مريحة */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 640,
            mx: "auto",
            px: { xs: 2, sm: 3 },
          }}
        >
          <List
            sx={{
              p: 0,
              py: 3,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              label="عنوان الكورس"
              name="title"
              value={formCourse.title}
              onChange={handleChange}
              fullWidth
              sx={bigFieldStyle}
            />

            <TextField
              label="وصف الكورس"
              name="description"
              value={formCourse.description}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
              sx={bigFieldStyle}
            />

            <TextField
              label="المستوى"
              name="level"
              value={formCourse.level}
              onChange={handleChange}
              fullWidth
              sx={bigFieldStyle}
            />

            <TextField
              label="الفئة"
              name="cat"
              value={formCourse.cat}
              onChange={handleChange}
              fullWidth
              sx={bigFieldStyle}
            />

            {/* <TextField
              label="السعر"
              name="price"
              type="number"
              value={formCourse.price}
              onChange={handleChange}
              fullWidth
              sx={bigFieldStyle}
            /> */}

            {/* منطقة اختيار الصورة + المعاينة */}
            <Box>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  fontSize: { xs: "16px", sm: "18px" },
                  py: 1.8,
                  borderStyle: "dashed",
                  borderWidth: 2,
                }}
              >
                {image ? "تغيير الصورة" : "اختيار صورة الكورس"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>

              {imagePreview && (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="معاينة صورة الكورس"
                    sx={{
                      width: "100%",
                      maxWidth: 320,
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 2,
                      border: "1px solid #ccc",
                    }}
                  />
                  <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
                    {image?.name}
                  </Typography>
                </Box>
              )}
            </Box>

            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              sx={{ fontSize: { xs: "18px", sm: "20px" }, py: 1.8, mt: 1 }}
            >
              نشر الكورس
            </Button>
          </List>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}