/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { Alert, Snackbar } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const AuthContext = createContext();

const BASE_URL = "https://learn-production-6c88.up.railway.app/api";
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  const [page, setPage] = useState("login");
  const [singleLesson, setSingleLesson] = useState(null);
  const [singleExam, setSingleExam] = useState(null);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [singleExamLoading, setSingleExamLoading] = useState(false);
  const [lessons, setLessonsState] = useState([]);

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

  // ---------------- Queries (GET) ----------------

  const coursesQuery = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/course`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed");
      return data?.data?.course;
    },
    enabled: isLogged,
  });

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/users/`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed");
      return data?.data?.user;
    },
    enabled: isLogged,
  });

  const progressQuery = useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/progress/`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      return res.json();
    },
    enabled: isLogged,
  });

  const examsQuery = useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/exam`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      return data?.data?.exams;
    },
    enabled: isLogged,
  });

  // ---------------- Mutations (POST/DELETE) ----------------

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: form.number,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      const token = data?.data?.token;
      if (!token) throw new Error("Token not found");
      return { token, userData: data.data };
    },
  });

  const registerMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          number: form.number,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Register failed");
      return data.data;
    },
  });

  const postCourseMutation = useMutation({
    mutationFn: async (dataCourse) => {
      const res = await fetch(`${BASE_URL}/course`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: dataCourse,
      });
      const text = await res.text();
      console.log("STATUS:", res.status);
      console.log("RESPONSE:", text);
      if (!res.ok) throw new Error(text || "حدث خطأ في السيرفر");
      return JSON.parse(text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  const deleteCourseMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${BASE_URL}/course/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  const postLessonMutation = useMutation({
    mutationFn: async ({ id, dataLesson }) => {
      const res = await fetch(`${BASE_URL}/lessons/${id}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: dataLesson && JSON.stringify(dataLesson),
      });
      return res.json();
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lessons", variables.id] });
    },
  });

  const postProgressMutation = useMutation({
    mutationFn: async (dataLesson) => {
      const res = await fetch(
        `${BASE_URL}/progress/watch/${dataLesson?.lessonId}`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(dataLesson),
        },
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });

  const postExamMutation = useMutation({
    mutationFn: async (dataExam) => {
      const res = await fetch(`${BASE_URL}/exam`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(dataExam),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });

  // ---------------- Derived values (بعد ما كل الـ hooks اتعرفت) ----------------

  const course = coursesQuery.data ?? [];
  const setCourse = (value) => queryClient.setQueryData(["courses"], value);
  const getCourses = () => coursesQuery.refetch();
  const loadingCourses =
    coursesQuery.isFetching ||
    postCourseMutation.isPending ||
    deleteCourseMutation.isPending;

  const user = userQuery.data ?? null;
  const setUser = (value) => queryClient.setQueryData(["user"], value);
  const getUser = () => userQuery.refetch();

  const progress = progressQuery.data ?? [];
  const setProgress = (value) => queryClient.setQueryData(["progress"], value);
  const getProgress = () => progressQuery.refetch();

  const exams = examsQuery.data ?? [];
  const setExams = (value) => queryClient.setQueryData(["exams"], value);
  const getExam = () => examsQuery.refetch();

  const loadingProgress =
    progressQuery.isFetching ||
    postProgressMutation.isPending ||
    postExamMutation.isPending ||
    examsQuery.isFetching ||
    singleExamLoading;

  const loadingAuth = loginMutation.isPending || registerMutation.isPending;

  const setLessons = (value) => setLessonsState(value);

  // ---------------- Actions اللي بتستخدم الـ mutations فوق ----------------

  const loginUser = async () => {
    try {
      const { token, userData } = await loginMutation.mutateAsync();
      localStorage.setItem("token", token);
      setUser(userData);
      setIsLogged(true);
      setSnackbar({
        open: true,
        message: "تم تسجيل الدخول بنجاح",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({ open: true, message: err.message });
    }
  };

  const registerUser = async () => {
    try {
      const data = await registerMutation.mutateAsync();
      setUser(data);
      setSuccess(true);
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const postCourse = async (dataCourse) => {
    try {
      const data = await postCourseMutation.mutateAsync(dataCourse);
      console.log(data);
      setSnackbar({
        open: true,
        message: "تم نشر الكورس بنجاح",
        severity: "success",
      });
    } catch (err) {
      console.log(err.message);
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const deleteCourse = async (id) => {
    try {
      const data = await deleteCourseMutation.mutateAsync(id);
      console.log(data);
      setSnackbar({
        open: true,
        message: "تم حذف الكورس بنجاح",
        severity: "success",
      });
    } catch (err) {
      console.log(err.message);
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const postLesson = async (id, dataLesson) => {
    try {
      const data = await postLessonMutation.mutateAsync({ id, dataLesson });
      console.log(data);
      setSnackbar({
        open: true,
        message: "تم نشر الدرس بنجاح",
        severity: "success",
      });
    } catch (err) {
      console.log(err.message);
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const postProgress = async (dataLesson) => {
    try {
      const data = await postProgressMutation.mutateAsync(dataLesson);
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
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const postExam = async (dataExam) => {
    try {
      const data = await postExamMutation.mutateAsync(dataExam);
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
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const getLessons = async (id) => {
    try {
      setLoadingLessons(true);
      const data = await queryClient.fetchQuery({
        queryKey: ["lessons", id],
        queryFn: async () => {
          const res = await fetch(`${BASE_URL}/lessons/${id}`, {
            headers: getAuthHeaders(),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data?.message || "Failed");
          return data?.data?.lessons;
        },
      });
      setLessonsState(data);
    } catch (err) {
      console.log(err.message);
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
        const lesson = data?.data?.lesson;
        setSingleLesson(lesson);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoadingLessons(false);
    }
  };

  const getSingleExam = async (id) => {
    try {
      setSingleExamLoading(true);
      const data = await queryClient.fetchQuery({
        queryKey: ["exam", id],
        queryFn: async () => {
          const res = await fetch(`${BASE_URL}/exam/${id}`, {
            method: "GET",
            headers: getAuthHeaders(),
          });
          const data = await res.json();
          return data?.data?.exam;
        },
      });
      setSingleExam(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setSingleExamLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
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
        singleExam,
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
