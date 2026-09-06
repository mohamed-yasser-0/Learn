/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { Alert, Snackbar } from "@mui/material";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [singleLesson, setSingleLesson] = useState(null);
  const [progress, setProgress] = useState([]);
  const [exams, setExams] = useState([]);
  const [singleExam, setSingleExam] = useState(null);
  // Loading
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(false);
  //
  const [isLogged, setIsLogged] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [form, setForm] = useState({
    name: "",
    number: "",
    password: "",
    remember: false,
    confirm: "",
    agree: true,
  });
  const BASE_URL = "https://learn-production-6c88.up.railway.app/api";
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const loginUser = async () => {
    try {
      setLoadingAuth(true);

      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: form.number,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      const token = data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        setUser(data.data);
        setIsLogged(true);
        setSnackbar({
          open: true,
          message: "تم تسجيل الدخول بنجاح",
          severity: "success",
        });
      } else {
        throw new Error("Token not found");
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message });
    } finally {
      setLoadingAuth(false);
    }
  };

  const registerUser = async () => {
    try {
      setLoadingAuth(true);

      const res = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          number: form.number,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Register failed");
      }

      setUser(data.data);
      setSuccess(true);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message,
        severity: "error",
      });
    } finally {
      setLoadingAuth(false);
    }
  };

  const postCourse = async (dataCourse) => {
    try {
      setLoadingCourses(true);

      const res = await fetch(`${BASE_URL}/course`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: dataCourse && JSON.stringify(dataCourse),
      });

      const data = await res.json();
      console.log(data);

      setSnackbar({
        open: true,
        message: "تم نشر الكورس بنجاح",
        severity: "success",
      });
    } catch (err) {
      console.log(err.message);
      setSnackbar({
        open: true,
        message: err.message,
        severity: "error",
      });
    } finally {
      setLoadingCourses(false);
    }
  };
  const deleteCourse = async (id) => {
    try {
      setLoadingCourses(true);

      const res = await fetch(`${BASE_URL}/course/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await res.json();
      console.log(data);
      setSnackbar({
        open: true,
        message: "تم حذف الكورس بنجاح",
        severity: "success",
      });
    } catch (err) {
      console.log(err.message);
      setSnackbar({
        open: true,
        message: err.message,
        severity: "error",
      });
    } finally {
      setLoadingCourses(false);
    }
  };

  const getCourses = async () => {
    try {
      setLoadingCourses(true);

      const res = await fetch(`${BASE_URL}/course`, {
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed");
      }

      const courses = data?.data?.course;
      setCourse(courses);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoadingCourses(false);
    }
  };

  const getUser = async () => {
    try {
      setLoadingAuth(true);

      const res = await fetch(`${BASE_URL}/users/`, {
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed");
      }

      const user = data?.data?.user;
      setUser(user);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoadingAuth(false);
    }
  };

  const getLessons = async (id) => {
    try {
      setLoadingLessons(true);

      const res = await fetch(`${BASE_URL}/lessons/${id}`, {
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed");
      }

      const lessons = data?.data?.lessons;
      setLessons(lessons);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoadingLessons(false);
    }
  };

  const postLesson = async (id, dataLesson) => {
    try {
      setLoadingLessons(true);

      const res = await fetch(`${BASE_URL}/lessons/${id}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: dataLesson && JSON.stringify(dataLesson),
      });

      const data = await res.json();
      console.log(data);

      setSnackbar({
        open: true,
        message: "تم نشر الدرس بنجاح",
        severity: "success",
      });
    } catch (err) {
      console.log(err.message);
      setSnackbar({
        open: true,
        message: err.message,
        severity: "error",
      });
    } finally {
      setLoadingLessons(false);
    }
  };

  const getSingleLesson = async (id, handel) => {
    try {
      setLoadingLessons(true);

      const res = await fetch(`${BASE_URL}/lessons/single/${id}`, {
        method: handel,
        headers: getAuthHeaders(),
      });

      const data = await res.json();
      console.log(data);
      if (handel === "GET") {
        const lessons = data?.data?.lesson;
        setSingleLesson(lessons);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoadingLessons(false);
    }
  };

  const postProgress = async (dataLesson) => {
    try {
      setLoadingProgress(true);

      const res = await fetch(
        `${BASE_URL}/progress/watch/${dataLesson?.lessonId}`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(dataLesson),
        },
      );

      const data = await res.json();

      if (data.status === "SUCCESS") {
        setSnackbar({
          open: true,
          message: "تم تسجيل التقدم بنجاح 🎉",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: data.message || "حدث خطأ",
          severity: "error",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message,
        severity: "error",
      });
    } finally {
      setLoadingProgress(false);
    }
  };

  const getProgress = async () => {
    try {
      setLoadingProgress(true);

      const res = await fetch(`${BASE_URL}/progress/`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      const progress = data;
      setProgress(progress);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoadingProgress(false);
    }
  };
  const postExam = async (dataExam) => {
    try {
      setLoadingProgress(true);

      const res = await fetch(`${BASE_URL}/exam`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(dataExam),
      });

      const data = await res.json();

      if (data.status === "SUCCESS") {
        setSnackbar({
          open: true,
          message: "تم نشر الاختبار بنجاح 🎉",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: data.message || "حدث خطأ",
          severity: "error",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message,
        severity: "error",
      });
    } finally {
      setLoadingProgress(false);
    }
  };
  const getExam = async () => {
    try {
      setLoadingProgress(true);

      const res = await fetch(`${BASE_URL}/exam`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      const exams = data?.data?.exams;
      setExams(exams);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoadingProgress(false);
    }
  };
  const getSingleExam = async (id) => {
    try {
      setLoadingProgress(true);

      const res = await fetch(`${BASE_URL}/exam/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      const exams = data?.data?.exam;
      setSingleExam(exams);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoadingProgress(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
      getCourses();
      getUser();
      getProgress();
      getExam()
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        page,
        setPage,
        loginUser,
        registerUser,
        postCourse,
        deleteCourse,
        isLogged,
        success,
        setSuccess,
        snackbar,
        setSnackbar,
        form,
        setForm,
        course,
        setCourse,
        user,
        setUser,
        getCourses,
        getUser,
        lessons,
        setLessons,
        getLessons,
        postLesson,
        getSingleLesson,
        postProgress,
        setProgress,
        progress,
        getProgress,
        singleLesson,
        loadingAuth,
        loadingCourses,
        loadingLessons,
        loadingProgress,
        postExam,
        getExam,
        exams,
        setExams,
        getSingleExam,
        setSingleExam,
        singleExam
      }}
    >
      {children}

      {/* Snackbar - يجب أن يكون داخل المزود وليس خارجه */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", cursor: "pointer" }}
          onClick={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          icon={false}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
}
