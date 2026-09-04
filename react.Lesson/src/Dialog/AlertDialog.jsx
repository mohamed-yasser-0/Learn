import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { AuthContext } from "../theme/context";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteCourseDialog({ title, delname }) {
  const [open, setOpen] = React.useState(false);
  const { deleteCourse, getSingleLesson } = React.useContext(AuthContext);
  const { idLesson } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    setOpen(false);
    if (delname === "course") {
      deleteCourse(id);
      navigate(-1);
    } else if (delname === "lesson") {
      getSingleLesson(idLesson, "DELETE");
      navigate(-1);
    }
  };

  return (
    <React.Fragment>
      <Button
        sx={{ minWidth: "130px" }}
        variant="contained"
        color="error"
        onClick={handleClickOpen}
      >
        حذف {title}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        role="alertdialog"
        dir="rtl" // مهم جداً للعربية
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          id="delete-dialog-title"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <WarningAmberIcon color="error" />
          هل تريد حذف {title}؟
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            سيتم حذف {title} بالكامل وكل محتوياته
            <br />
            <strong>هذا الإجراء لا يمكن التراجع عنه.</strong>
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ padding: "16px 24px" }}>
          <Button
            sx={{ ml: 1 }}
            onClick={handleClose}
            variant="outlined"
            color="inherit"
          >
            إلغاء
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            autoFocus
          >
            نعم، حذف {title}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
