import React, { useContext } from "react";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  AuthContext,
  AuthProvider,
} from "./@core/presentation/contexts/auth.context";
import CreatePostPage from "./create-post/presentation/create-post.page";
import FeedPage from "./feed/presentation/feed.page";
import PostPage from "./post/presentation/post.page";
import SignInPage from "./sign-in/presentation/sign-in.page";
import SignUpPage from "./sign-up/presentation/sign-up.page";
import UserFeedPage from "./user-feed/presentation/user-feed.page";

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
          <Route path="/:id" element={<PostPage />} />
          <Route path="/profile/:id" element={<UserFeedPage />} />

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
  console.log(userInfo.user);

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
