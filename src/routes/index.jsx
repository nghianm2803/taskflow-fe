import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import SetupAccountPage from "../pages/SetupAccountPage";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import Profile from "../features/user/Profile";
import ProjectList from "../features/project/ProjectList";
import SingleProject from "../features/project/SingleProject";
import MyTasks from "../features/task/MyTasks";
import Dashboard from "../features/user/Dashboard";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:id" element={<SingleProject />} />
        <Route path="/tasks/mytasks" element={<MyTasks />} />
        <Route
          path="/me"
          element={
            <AuthRequire>
              <Profile />
            </AuthRequire>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/setup-account" element={<SetupAccountPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
}

export default Router;
