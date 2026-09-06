import theme from "./theme/Theme";
import {CssBaseline, ThemeProvider } from "@mui/material";
import Home from "./Welcome/Home";
import { Route, Routes} from "react-router-dom";
import {LoginPage, RegisterPage } from "./user/Login";
import Main from "./home/Main";
import Layout from "./outlet/OutLet";
import ProtectedRoute from "./outlet/ProtectedRoute";
import ProfilePage from "./home/Profile";
import LessonFlowPage from "./home/Lessons";
import Sidebar from "./home/sliderLesson";
import ExamPage from "./home/ExamQuiction";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>
        <Route path="/Learn/login" element={<LoginPage />} />
        <Route path="/Learn/register" element={<RegisterPage />} />
        <Route path="/Learn" element={<Home />} />

        <Route element={<Layout />}>
          <Route
            path="/Learn/home"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Learn/lessons/:idLesson"
            element={
              <ProtectedRoute>
                <LessonFlowPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Learn/exam/:examId"
            element={
              <ProtectedRoute>
                <ExamPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Learn/slider/:id"
            element={
              <ProtectedRoute>
                <Sidebar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Learn/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
