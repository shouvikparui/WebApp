import { useState, useCallback, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useUserContext } from "../context/user.context";
import axios from "../axios/axiosInstance";
import client from "../appwrite.config";
import { Storage, ID } from "appwrite";

function UserAccountLogic() {
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [skills, setSkills] = useState(null);
  const [socials, setSocials] = useState([]);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [password, setPassword] = useState(null);
  const [CPassword, setCPassword] = useState(null);
  const [validateMessage, setValidateMessage] = useState(null);
  const [signingup, setSigningup] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [bio, setBio] = useState(null);
  const [userId, setUserId] = useState(null);

  const { user, setUser } = useUserContext();

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setImage((prev) => e.target.files[0]);
      setImageError("");
      setImagePreview((prev) => URL.createObjectURL(e.target.files[0]));
    }
  };

  const getUser = useCallback(async () => {
    try {
      const {
        data: { user: resUser },
      } = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      setEmail((prev) => resUser?.email);
      setName((prev) => resUser?.name);
      setPhone((prev) => resUser?.phone);
      setSocials((prev) =>
        resUser?.socialLinks?.map((link) =>
          getSocialField(link?.name, link?.link)
        )
      );
      setBio((prev) => resUser?.bio);
      setState((prev) => resUser?.state);
      setCountry((prev) => resUser?.country);
      setSkills((prev) => resUser?.skills);
      setUserInfo((prev) => ({
        name: resUser?.name,
        email: resUser?.email,
        phone: resUser?.phone,
        image: resUser?.image,
        imageId: resUser?.imageId,
      }));
      setImagePreview((prev) => resUser?.image);
      setImage((prev) => resUser?.image);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const inputs = [
    {
      label: "Name",
      name: "name",
      placeholder: "Enter your name",
      value: name,
      cb: setName,
    },
    {
      label: "Skills",
      name: "skills",
      placeholder: "Enter your skills",
      value: skills,
      cb: setSkills,
    },
    {
      label: "Contact Number",
      name: "phone",
      placeholder: "Enter your contact number",
      value: phone,
      type: "number",
      cb: setPhone,
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Enter your email address",
      value: email,
      type: "email",
      cb: setEmail,
      disabled: true,
    },
    {
      label: "State",
      name: "state",
      placeholder: "Enter your state",
      value: state,
      cb: setState,
    },
    {
      label: "Country",
      name: "country",
      placeholder: "Enter your country",
      value: country,
      cb: setCountry,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter your password",
      value: password,
      cb: setPassword,
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
    {
      label: "Confirm Password",
      placeholder: "Please retype password",
      name: "cpassword",
      value: CPassword,
      cb: setCPassword,
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
    {
      label: "Bio",
      name: "bio",
      placeholder: "Enter your bio",
      value: bio,
      cb: setBio,
      type: "textarea",
    },
  ];

  const getCommunityData = useCallback(async () => {
    try {
      const { data } = await axios.get("/community/get/user-communities", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      console.log(data);
      setCommunities((prev) =>
        data.communities.map((community) => ({
          ...community,
          userId: data.userId,
        }))
      );
      setUserId((prev) => data.userId);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getCommunityData();
  }, [getCommunityData]);

  const removeSocialField = (e) => {
    e?.preventDefault();
    setSocials((prev) => prev.filter((item, i) => i !== prev.length - 1));
  };

  function getSocialField(name, link) {
    return [
      {
        label: "Social Media",
        name: "socialMedia",
        placeholder: "Enter your social media",
        type: "select",
        defaultValue: name,
        options: [
          {
            label: "Facebook",
            value: "facebook",
          },
          {
            label: "Instagram",
            value: "instagram",
          },
          {
            label: "Twitter",
            value: "twitter",
          },
          {
            label: "LinkedIn",
            value: "linkedin",
          },
          {
            label: "Github",
            value: "github",
          },
          {
            label: "Discord",
            value: "discord",
          },
        ],
      },
      {
        label: "Social Media Link",
        name: "socialMediaLink",
        placeholder: "Enter your social media link",
        type: "text",
        defaultValue: link,
      },
    ];
  }

  const socialField = [
    {
      label: "Social Media",
      name: "socialMedia",
      placeholder: "Enter your social media",
      type: "select",
      options: [
        {
          label: "Facebook",
          value: "facebook",
        },
        {
          label: "Instagram",
          value: "instagram",
        },
        {
          label: "Twitter",
          value: "twitter",
        },
        {
          label: "LinkedIn",
          value: "linkedin",
        },
        {
          label: "Github",
          value: "github",
        },
        {
          label: "Discord",
          value: "discord",
        },
      ],
    },
    {
      label: "Social Media Link",
      name: "socialMediaLink",
      placeholder: "Enter your social media link",
      type: "text",
    },
  ];

  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      const { refreshToken } = await JSON.parse(
        localStorage.getItem("community-user")
      );
      const res = await axios.delete("/auth/logout", {
        headers: {
          Authorization: `Bearer ${refreshToken} REFRESH`,
        },
      });
      localStorage.removeItem("community-user");
      setUser((prev) => null);
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
    } finally {
      localStorage.removeItem("community-user");
      setUser((prev) => null);
    }
  };

  const addNewSocialField = (e) => {
    e?.preventDefault();
    setSocials((prev) => [...prev, socialField]);
  };

  const submitUpdateForm = async (e) => {
    e.preventDefault();
    try {
      setSigningup((prev) => true);
      let uploadedFile, filePreviewUrl, imageId;
      const storage = new Storage(client);
      console.log(image);
      if (typeof image !== "string" && image !== null && image !== undefined) {
        if (userInfo?.imageId) {
          const deletedFile = await storage.deleteFile(
            import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID,
            userInfo?.imageId
          );
        }
        uploadedFile = await storage.createFile(
          import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );
        imageId = uploadedFile.$id;
        filePreviewUrl = await storage.getFilePreview(
          uploadedFile.bucketId,
          uploadedFile.$id
        );
      } else if (image === null && image !== undefined && userInfo?.imageId) {
        const deletedFile = await storage.deleteFile(
          process.env.REACT_APP_IMAGES_BUCKET_ID,
          userInfo?.imageId
        );

        filePreviewUrl = null;
        imageId = null;
      } else {
        filePreviewUrl = image;
        imageId = userInfo?.imageId;
      }
      const form = e.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const socials = [];
      let index = 0;

      while (true) {
        const nameKey = `social-${index}-0`;
        const linkKey = `social-${index}-1`;

        if (nameKey in data && linkKey in data) {
          const name = data[nameKey];
          const link = data[linkKey];
          socials.push({ name, link });
          index++;
        } else {
          break;
        }
      }
      data.socialLinks = socials;
      data.image = filePreviewUrl;
      data.imageId = imageId;
      console.log(data);
      if (data.password !== data.cpassword) {
        toast.error(
          "Passwords do not match. Please clear the password fields and try again, or confirm your password"
        );
        return;
      }
      const { data: resData } = await axios.put("/user", data, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      console.log(resData);
      toast.success(resData?.message);
      setPassword((prev) => null);
      setCPassword((prev) => null);
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error(err.message || err?.response?.data?.message);
    } finally {
      setSigningup((prev) => false);
    }
  };

  return {
    inputs,
    validateMessage,
    signingup,
    addNewSocialField,
    socials,
    removeSocialField,
    submitUpdateForm,
    userInfo,
    logoutUser,
    handleImage,
    imagePreview,
    communities,
    userId
  };
}

export default UserAccountLogic;
