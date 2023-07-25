import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import SetupAccountPage from "../pages/SetupAccountPage";
import NotFoundPage from "../pages/NotFoundPage";
import UserProfilePage from "../pages/UserProfilePage";
import AuthRequire from "./AuthRequire";
import Profile from "../features/user/Profile";
import ProjectList from "../features/project/ProjectList";
import SingleProject from "../features/project/SingleProject";
import MyTasks from "../features/task/MyTasks";

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
        <Route path="users/:userId" element={<UserProfilePage />} />
        <Route
          path="/me"
          element={
            <AuthRequire>
              <Profile />
            </AuthRequire>
          }
        />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/setup-account" element={<SetupAccountPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
