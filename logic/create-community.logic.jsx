import { useState, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useUserContext } from "../context/user.context";
import axios from "../axios/axiosInstance";
import client from "../appwrite.config";
import { Storage, ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function CreateCommunityLogic() {

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [socials, setSocials] = useState([]);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [description, setDescription] = useState(null);
  const [signingup, setSigningup] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [communityInfo, setCommunityInfo] = useState(null);
  const [category, setCategory] = useState(null);

  const [cityOptions, setCityOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  const { user, setUser } = useUserContext();

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setImage((prev) => e.target.files[0]);
      setImagePreview((prev) => URL.createObjectURL(e.target.files[0]));
    }
  };
  
  const getCountryOptions = useCallback(async () => {
    try {
      const{data} = await axios.get("https://countriesnow.space/api/v0.1/countries/");
      console.log(data.data);
      const countryList = data.data.map((obj) => ({label: obj.country, value: obj.country}));
      setCountryOptions(prev => countryList);
    }
    catch (error) {
      console.log(error);
    }
  }, []);

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

  const getCommunityInfo = useCallback(async () => {
    if(id) {
      try {
        const {data} = await axios.get(`/community/single/${id}`);
        console.log(data);
        setName(prev => data.name);
        setEmail(prev => data.email);
        // setSocials(prev => data.socials);
        setCity(prev => data.city);
        setState(prev => data.state);
        setCountry(prev => data.country);
        setLocation(prev => data.locationName);
        setLatitude(prev => data.location[0]);
        setLongitude(prev => data.location[1]);
        setDescription(prev => data.description);
        setCategory(prev => data.category.join(','));
        setSocials((prev) =>
        data?.socialLinks?.map((link) =>
          getSocialField(link?.name, link?.link)
        )
      );
      setImagePreview(prev => data.image);
      }
      catch (error) {
        console.log(error);
      }
    }
  }, [id]);

  useEffect(() => {
    getCommunityInfo();
  }, [getCommunityInfo]);

  const getStateOptions = useCallback(async () => {
    try {
      const{data} = await axios.post(`https://countriesnow.space/api/v0.1/countries/states`, {
        country
      });
      console.log(data.data);
      const stateList = data.data.states.map((obj) => ({label: obj.name, value: obj.name}));
      setStateOptions(prev => stateList);
    }
    catch (error) {
      console.log(error);
    }
  }, [country]);

  const getCityOptions = useCallback(async () => {
    try {
      const{data} = await axios.post(`https://countriesnow.space/api/v0.1/countries/cities`, {
        country,
        state
      });
      console.log(data.data);
      const cityList = data.data.map((obj) => ({label: obj, value: obj}));
      setCityOptions(prev => cityList);
    }
    catch (error) {
      console.log(error);
    }
  }, [country, state]);

  useEffect(() => {
    if (country) {
      getStateOptions();
    }
  }, [country, getStateOptions]);

  useEffect(() => {
    if (state) {
      getCityOptions();
    }
  }, [state, getCityOptions]);

  useEffect(() => {
    getCountryOptions();
  }, [getCountryOptions]);

  const inputs = [
    {
      label: "Name",
      name: "name",
      placeholder: "Enter your name",
      value: name,
      cb: setName,
      required: true,
    },
    
    {
      label: "Email",
      name: "email",
      placeholder: "Enter your email address",
      value: email,
      type: "email",
      cb: setEmail,
      required: true,
    },
    {
      label: "Country",
      name: "country",
      placeholder: "Enter your country",
        type: "select",
        options: countryOptions,
      value: country,
      cb: setCountry,
        required: true,
    },
    {
      label: "State",
      name: "state",
      placeholder: "Enter your state",
        type: "select",
        options: stateOptions,
      value: state,
      cb: setState,
      required: true,
    },
    {
      label: "City",
      name: "city",
      placeholder: "Enter your city",
      type: "select",
      options: cityOptions,
      value: city,
      cb: setCity,
      required: true,
    },
    {
        label: "Location Name",
        name: "locationName",
        placeholder: "Enter your location name",
        value: location,
        cb: setLocation,
        required: true,
    },
    {
      label: "Latitude",
      name: "latitude",
      placeholder: "Enter your latitude",
      value: latitude,
      cb: setLatitude,
      required: true,
    },
    {
      label: "Longitude",
      name: "longitude",
      placeholder: "Enter your longitude",
      value: longitude,
      cb: setLongitude,
      required: true,
    },
    {
      label: "Category",
      name: "category",
      placeholder: "Enter your category (comma separated)",
      type: "text",
      value: category,
      cb: setCategory,
      required: true,
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Enter your description",
      value: description,
      cb: setDescription,
      type: "textarea",
      required: true,
  },
  ];

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
            label: "Website",
            value: "website",
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
      if (typeof image !== "string") {
        if (communityInfo?.imageId) {
          const deletedFile = await storage.deleteFile(
            import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID,
            communityInfo?.imageId
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
      } else if (image === null) {
        const deletedFile = await storage.deleteFile(
          process.env.REACT_APP_IMAGES_BUCKET_ID,
          communityInfo?.imageId
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
      data.location = [data.latitude, data.longitude]
      data.category = data.category.split(",").map((item) => item.trim());
      console.log(data);
      const { data: resData } = id ? await axios.put(`/community/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        }
      }) : await axios.post("/community/create", data, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      console.log(resData);
      toast.success(resData?.message);
      navigate('/community')
    } catch (err) {
      console.log(err);
      toast.error(err.message || err?.response?.data?.message);
    } finally {
      setSigningup((prev) => false);
    }
  };

  return {
    inputs,
    signingup,
    addNewSocialField,
    socials,
    removeSocialField,
    submitUpdateForm,
    handleImage,
    communityInfo,
    imagePreview,
    id
  };
}

export default CreateCommunityLogic;
