import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user.context";
import axios from "../axios/axiosInstance";
import { useModalContext } from "../context/modal.context";

function SignupLogic() {
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [CPassword, setCPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState(null);
  const [signingup, setSigningup] = useState(false);

  const { setUser } = useUserContext();
  const { setShowModal } = useModalContext();

  const navigate = useNavigate();

  const inputs = [
    {
      label: "Name",
      name: "name",
      placeholder: "John Doe",
      value: name,
      cb: setName,
      required: true,
    },
    {
      label: "Email",
      name: "email",
      placeholder: "example@email.com",
      value: email,
      type: "email",
      cb: setEmail,
      required: true,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter your password",
      value: password,
      cb: setPassword,
      type: !showPass ? "password" : "text",
      required: true,
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
    {
      label: "Confirm Password",
      placeholder: "Please retype password",
      name: "cpassword",
      value: CPassword,
      cb: setCPassword,
      required: true,
      type: !showCPass ? "password" : "text",
      rightIcon: (
        <button
          onClick={(e) => {
            e?.preventDefault();
            setShowCPass((prev) => !prev);
          }}
        >
          {showCPass ? (
            <AiOutlineEye size={24} />
          ) : (
            <AiOutlineEyeInvisible size={24} />
          )}
        </button>
      ),
    },
  ];

  const signUpUser = async (e) => {
    e?.preventDefault();
    console.log(name, email, password, CPassword);
    if (!name || !email || !password || !CPassword) {
      toast.error("Please fill all fields");
      setValidateMessage((prev) => "Please fill all fields");
      return;
    }
    if (password !== CPassword) {
      toast.error("Passwords do not match");
      setValidateMessage((prev) => "Passwords do not match");
      return;
    }
    setSigningup((prev) => true);
    setValidateMessage((prev) => null);

    try {
      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log(data);
      localStorage.setItem(
        "community-user",
        JSON.stringify(data)
      );
      setUser((prev) => (data));
      toast.success("Signed up successfully");
      setShowModal((prev) => false);
      navigate("/update-profile");
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
      setSigningup((prev) => false);
    }
  };

  return {
    inputs,
    validateMessage,
    signingup,
    setSigningup,
    setValidateMessage,
    showPass,
    setShowCPass,
    showCPass,
    setShowPass,
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    CPassword,
    setCPassword,
    signUpUser,
  };
}

export default SignupLogic;
