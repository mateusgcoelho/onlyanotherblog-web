import React, { useContext } from "react";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  AuthContext,
  AuthProvider,
} from "./@core/presentation/contexts/auth.context";
import CreatePostPage from "./pages/create-post/create-post.page";
import FeedPage from "./pages/feed/feed.page";
import PostPage from "./pages/post/post.page";
import SignInPage from "./pages/sign-in/sign-in.page";
import SignUpPage from "./pages/sign-up/sign-up.page";
import UserFeedPage from "./pages/user-feed/user-feed.page";

export const App: React.FC = () => (
  <BrowserRouter>
    <Toaster
      containerStyle={{
        position: "absolute",
        padding: 0,
        margin: 0,
        overflow: "hidden",
      }}
    />
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <AuthProvider>
        <Routes>
          <Route
            path="/create-post"
            Component={() => (
              <ProtectedRoute>
                <CreatePostPage />
              </ProtectedRoute>
            )}
          />
          <Route path="/" element={<FeedPage />} />
          <Route path="/:username" element={<UserFeedPage />} />
          <Route path="/posts/:id" element={<PostPage />} />

          <Route
            path="/signup"
            element={
              <OnlyWithoutUserRoute>
                <SignUpPage />
              </OnlyWithoutUserRoute>
            }
          />

          <Route
            path="/signin"
            element={
              <OnlyWithoutUserRoute>
                <SignInPage />
              </OnlyWithoutUserRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </CookiesProvider>
  </BrowserRouter>
);

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { userInfo } = useContext(AuthContext);

  if (!userInfo.user) {
    return <Navigate to="/signin" />;
  }

  return children;
};

const OnlyWithoutUserRoute: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { userInfo } = useContext(AuthContext);

  if (userInfo.user) {
    return <Navigate to="/" />;
  }

  return children;
};
