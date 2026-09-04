import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { AuthContext } from "../theme/context";
import { useNavigate, useParams } from "react-router-dom";
import FullScreenDialogLesson from "../Dialog/DialogLesson";
import DeleteCourseDialog from "../Dialog/AlertDialog";

function Sidebar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getLessons, lessons, progress, user, loadingLessons } =
    React.useContext(AuthContext);
  const delname = "course"
  useEffect(() => {
    if (id) getLessons(id);
  }, [id]);
  return (
    <Box
      sx={{
        height: "90vh",
        p: { xs: 1, md: 3 },
        mt: 8,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {loadingLessons ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {Array.isArray(lessons) &&
            lessons.map((lesson) => {
              const isDone = progress?.data?.some(
                (e) => e.lessonId === lesson._id,
              );

              return (
                <Button
                  key={lesson._id}
                  variant={isDone ? "outlined" : "contained"}
                  onClick={() => navigate(`/lessons/${lesson._id}`)}
                >
                  {lesson.title}
                </Button>
              );
            })}

          <Box sx={{ width: "100%", textAlign: "center" }}>
            {user?.role === "ADMIN" && <FullScreenDialogLesson />}
          </Box>
          <Box sx={{ width: "100%", textAlign: "center" }}>
            {user?.role === "ADMIN" && <DeleteCourseDialog title={" الكورس"} delname={delname}  />}
          </Box>
        </>
      )}
    </Box>
  );
}
export default Sidebar;
