import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user.context";
import axios from "../axios/axiosInstance";
import { useModalContext } from "../context/modal.context";

function LoginLogic() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState(null);
  const [signingin, setSigningin] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useUserContext();
  const { setShowModal } = useModalContext();

  const inputs = [
    {
      label: "Email",
      placeholder: "example@email.com",
      value: email,
      cb: setEmail,
      type: "email",
    },
    {
      label: "Password",
      placeholder: "Please pick a strong password",
      value: password,
      cb: setPassword,
      inputMode: "text",
      keyboard: "default",
      type: !showPass ? "password" : "text",
      rightIcon: (
        <button
          onClick={(e) => {
            e?.preventDefault();
            setShowPass((prev) => !prev);
          }}
        >
          {showPass ? (
            <AiOutlineEye size={24} />
          ) : (
            <AiOutlineEyeInvisible size={24} />
          )}
        </button>
      ),
    },
  ];

  const loginUser = async (e) => {
    e?.preventDefault();
    console.log(email, password);
    if (!email || !password) {
      toast.error("Please fill all fields");
      setValidateMessage((prev) => "Please fill all fields");
      return;
    }
    setSigningin((prev) => true);
    setValidateMessage((prev) => null);

    try {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });

      console.log(data);
      localStorage.setItem("community-user", JSON.stringify(data));
      setUser((prev) => data);
      toast.success("Logged in successfully");
      setShowModal((prev) => false);
      navigate("/");
    } catch (error) {
      setValidateMessage(
        (prev) =>
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setSigningin((prev) => false);
    }
  };

  return {
    inputs,
    validateMessage,
    signingin,
    setSigningin,
    setValidateMessage,
    showPass,
    setShowPass,
    email,
    setEmail,
    password,
    setPassword,
    loginUser,
  };
}

export default LoginLogic;
