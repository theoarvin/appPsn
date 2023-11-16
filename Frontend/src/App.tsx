import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./features/auth.slice";
import { useNavigate } from "react-router-dom";

function App() {
  const [userToken] = useState(localStorage.getItem("authToken"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (userToken) {
    dispatch(
      setUser({
        user: "theo",
      })
    );
    navigate("/studio");
  }

  const loginGoogle = (token: string) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        dispatch(setUser(res.data));
        localStorage.setItem("token", token);
        navigate("/studio");
      })
      .catch((err) => console.log(err));
  };

  const login = () => {
    dispatch(
      setUser({
        user: "theo",
      })
    );
    localStorage.setItem("token", "fakeTokenUserTheo");
    navigate("/studio");
  };

  const GoogleConfirmation = useGoogleLogin({
    onSuccess: (codeResponse) => loginGoogle(codeResponse.access_token),
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div>
      <h2>React Google Login</h2>
      <button onClick={() => GoogleConfirmation()}>
        Sign in with Google 🚀
      </button>
      <button onClick={() => login()}>Sign in 🚀</button>
    </div>
  );
}

export default App;
