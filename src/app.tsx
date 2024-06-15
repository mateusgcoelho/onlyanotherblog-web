import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./@core/presentation/contexts/auth.context";
import FeedPage from "./feed/presentation/feed.page";
import PostPage from "./post/presentation/post.page";
import SignInPage from "./sign-in/presentation/sign-in.page";
import SignUpPage from "./sign-up/presentation/sign-up.page";
import UserFeedPage from "./user-feed/presentation/user-feed.page";

export const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/:id" element={<PostPage />} />
        <Route path="/profile/:id" element={<UserFeedPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
