import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";

import Studio from "../pages/Studio";
import PrivateRoute from "./PrivateRoute";
import { AuthState } from "../types/redux";
import ChatBot_page from "../pages/ChatBot_Page";

export interface RootState {
  auth: AuthState;
}

function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/chatBot"
          element={
            <PrivateRoute>
              <ChatBot_page />
            </PrivateRoute>
          }
        />
        <Route
          path="/studio"
          element={
            <PrivateRoute>
              <Studio />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Index;
