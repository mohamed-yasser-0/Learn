import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  Grid,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../theme/context";
import AlertDialog from "../Dialog/AlertDialog";

function CourseCard({ course }) {
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const { loadingCourses } = React.useContext(AuthContext);
  return (
    <>
      {loadingCourses ? (
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
        
          <Box
            sx={{
              width:"100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              transition: "all 0.25s",
              overflow: "hidden",
              border: "1px solid rgba(26,92,56,0.1)",
              borderRadius: "20px 20px 0px 0px",
            }}
          >
            {/* thumbnail placeholder */}
            <Box
              sx={{
                overflow: "hidden",
                height: 280,
                position: "relative",
              }}
            >
              {/* Image */}
              <Box
                component="img"
                src={course?.imgeCourse}
                alt="course"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Save button */}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setSaved((s) => !s);
                }}
                sx={{
                  position: "absolute",
                  top: 6,
                  left: 6,
                  bgcolor: "rgba(255,255,255,0.85)",
                  width: 30,
                  height: 30,
                }}
                size="small"
              >
                {saved ? (
                  <BookmarkIcon sx={{ fontSize: 16, color: "primary.main" }} />
                ) : (
                  <BookmarkBorderIcon
                    sx={{ fontSize: 16, color: "text.secondary" }}
                  />
                )}
              </IconButton>
            </Box>
            <CardContent
              sx={{
                p: 2.5,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {/* Category + Level */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* left side */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Chip
                    label={course?.cat}
                    size="small"
                    sx={{
                      bgcolor: course.catBg,
                      color: course.catColor,
                      fontSize: 11,
                      fontWeight: 700,
                      height: 22,
                    }}
                  />

                  <Chip
                    label={course?.level}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: 11,
                      height: 22,
                      borderColor: "rgba(0,0,0,0.15)",
                    }}
                  />
                </Box>

                {/* right side - date */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 15,
                    lineHeight: 1.4,
                    color: "text.secondary",
                    fontFamily: "inherit",
                  }}
                >
                  {course?.createdAt &&
                    new Date(course?.createdAt).toLocaleString("ar-EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </Typography>
              </Box>

              <Stack direction="row" spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontSize: 17, lineHeight: 1.4, flex: 1 }}
                  >
                    {course?.title}
                  </Typography>

                  <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                    {course?.lessons} درس
                  </Typography>
                </Box>
              </Stack>
              {/* CTA */}
              <Button
                variant="contained"
                color="primary"
                size="small"
                fullWidth
                sx={{ mt: 0.5, py: 0.9 }}
                onClick={() => {
                  navigate(`/slider/${course?._id}`);
                }}
              >
                تابع التعلم
              </Button>
            </CardContent>
          </Box>
      )}
    </>
  );
}
export default CourseCard;
