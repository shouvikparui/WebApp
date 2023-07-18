import React from "react";
import { FiUpload } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BsFacebook } from 'react-icons/bs';
import { FaInstagram } from 'react-icons/fa';
import { BsLinkedin } from 'react-icons/bs';
import { BsGoogle } from 'react-icons/bs';
import { useUserContext } from "../../context/user.context";
import { toast } from "react-hot-toast";
import axios from "../../axios/axiosInstance";

const socialLinkIcons = {
  facebook: <BsFacebook className='w-[25px] h-[25px]'/>,
  instagram: <FaInstagram className='w-[25px] h-[25px]'/>,
  linkedin: <BsLinkedin className='w-[25px] h-[25px]'/>,
  google: <BsGoogle className='w-[25px] h-[25px]'/>,
} 

function CommunityCard({ socialLinks, image, name: title, description, category: categories, _id, leaderId, userId }) {

  const {user} = useUserContext();

  const joinCommunity = async (e) => {
    e.preventDefault();
    if(!user) return toast.error('Please Login to join the community');
    console.log('Joining Community >>> ', _id, user);
    try {
      const response = await axios.post('/add-member/create-member  ', {communityId: _id, leaderId }, {
        headers: {
          authorization: `Bearer ${user.accessToken}` 
        }
      });
      console.log(response.data);
      toast.success('Notification sent to the community leader');
    }
    catch(error) {
      console.log(error);
      toast.error(error.response.data.message || 'Something went wrong');
    }
  }
  

  return (
    <div className="px-0 py-5 md:p-5 border-b-2 first:border-t-2 border-black w-full grid md:grid-cols-3 lg:grid-cols-5 flex-row items-center gap-5">
      <img
        className="w-full object-cover md:w-full h-full md:h-full lg:col-span-1  "
        src={image}
      />
      <div className="md:col-span-2 lg:col-span-2 space-y-2">
        <Link to={`/community/${_id}`} className="flex flex-row w-max justify-start items-center font-bold">
          {title}&nbsp;
          <FiUpload className="cursor-pointer" />
        </Link>
        <p className="line-clamp-3">
          {description}
        </p>
        <p>
          <b>Categories:&nbsp;</b>
          <span>{categories?.join(', ')}</span>
        </p>
      </div>
      <div className="flex flex-col-reverse xs:flex-row-reverse flex-wrap lg:flex-col items-center lg:items-end gap-y-5 md:col-span-3 lg:col-span-2 h-full justify-between">
        {leaderId !== userId && <button onClick={joinCommunity} className="btn-small flex items-start">Join Now</button>}
        {leaderId === userId && <div className="inline-flex gap-4 w-full justify-center xs:justify-start flex-wrap md:justify-end">
          <Link to={`/create-community?id=${_id}`} className="btn-small">Edit</Link>
          <Link to={`/community/${_id}`} className="btn-small">Learn More</Link>
          </div>} 
        <div className="flex flex-row justify-end md:justify-start gap-4 ">
          {socialLinks?.map((obj, id) => (
            <Link
              to={obj.link}
              target="_blank"
              className="flex justify-between items-center"
              key={id}
            >
              {socialLinkIcons[obj.name]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommunityCard;
