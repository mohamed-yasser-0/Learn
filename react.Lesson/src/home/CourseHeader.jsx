import React, { useContext, useMemo } from "react";
import { Box, Typography, Chip, CircularProgress } from "@mui/material";
import { AuthContext } from "../theme/context";

function CourseHeader() {
  const { course, singleLesson, loadingCourses } = useContext(AuthContext);

  // اختيار الكورس الصحيح بشكل مباشر
  const selectedCourse = useMemo(() => {
    return course?.find(
      (c) => c._id === singleLesson?.idCours
    );
  }, [course, singleLesson?.idCours]);

  console.log("selectedCourse:", selectedCourse);

  return (
    <Box
      sx={{
        mt: 8,
        bgcolor: "primary.main",
        px: { xs: 2, md: 4 },
        py: 3.5,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {loadingCourses ? (
        <Box
          sx={{
            width: "100%",
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Background Effects */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(60deg,transparent,transparent 28px,rgba(201,168,76,.07) 28px,rgba(201,168,76,.07) 29px),repeating-linear-gradient(-60deg,transparent,transparent 28px,rgba(201,168,76,.07) 28px,rgba(201,168,76,.07) 29px)",
              pointerEvents: "none",
            }}
          />

          {[320, 240, 160].map((s, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                width: s,
                height: s,
                borderRadius: "50%",
                border: `1px solid rgba(201,168,76,${0.14 - i * 0.04})`,
                top: -s / 2 + 40,
                left: -s / 4 + i * 20,
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Content */}
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
              <Chip
                label={selectedCourse?.title || "No Title"}
                size="small"
                sx={{
                  bgcolor: "rgba(201,168,76,.2)",
                  color: "secondary.light",
                  fontWeight: 700,
                  fontSize: 11,
                }}
              />

              <Chip
                label={selectedCourse?.level || "Unknown"}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,.1)",
                  color: "rgba(255,255,255,.7)",
                  fontSize: 11,
                }}
              />
            </Box>

            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontSize: { xs: 22, md: 28 },
                mb: 0.5,
              }}
            >
              {selectedCourse?.title || "Loading..."}
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,.6)",
                fontSize: 13,
                mb: 2,
              }}
            >
              {selectedCourse?.description || ""}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}

export default CourseHeader;