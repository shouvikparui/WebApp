import React from 'react'
import { NavLink , Link} from 'react-router-dom';
import { BsFacebook } from 'react-icons/bs';
import { FaInstagram } from 'react-icons/fa';
import { BsLinkedin } from 'react-icons/bs';
import { TbWorld } from 'react-icons/tb';
import { FaEnvelope } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function Footer() {

  const {pathname} = useLocation()

  const navlinks=[
    {
      name:"Community",
      link:"/community"
    },
    {
      name:"Upcoming Events",
      link:"/upcoming-events"
    },
    {
      name:"My Profile",
      link:"/update-profile"
    },
    {
      name:"Contact Us",
      link:"/contact"
    }
  ]
  const socialLinks=[
    {
      icon:< BsFacebook className='w-[20px] h-[20px]'/>,
      link:"/"
    },
    {
      icon:< FaInstagram className='w-[25px] h-[25px]'/>,
      link:"/"
    },
    {
      icon:< BsLinkedin className='w-[20px] h-[20px]'/>,
      link:"/"
    },
    {
      icon:< TbWorld className='w-[25px] h-[25px]'/>,
      link:"/"
    },
    {
      icon:< FaEnvelope className='w-[23px] h-[23px]'/>,
      link:"/"
    }
  ]
  const NavLinks=()=>(
    <div className='  flex flex-col justify-center leading-10'>
        {navlinks.map((obj,id)=>(
          <NavLink className={({isActive}) => isActive && 'footer-active'} to={obj.link} key={id}>{obj.name}</NavLink>
        ))}
    </div>
  );
  const SocialComponent=()=>(
    <div className='   '>
    <p className='leading-7 mb-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit
    Possimus non, enim doloribus adipisci, soluta quidem perspiciatis iste eos dolore iure nostrum nesciunt voluptatum obcaecati magni. Et officiis eveniet veniam ullam.</p>
    <div className='flex flex-row text-left'>
       {socialLinks.map((obj,id)=>(
         <NavLink to="" className="mr-3 flex justify-center items-center" key={id}>{obj.icon}</NavLink>
       ))}
    </div>
  </div>
  );

  if(pathname.includes('map')) return null

  return (
    <div className=' bg-gray text-white py-10'>
      
      <div className=' container-padding-minor hidden md:flex justify-between items-center '>
        <div className='w-1/4'>

        </div>
        <div className='w-2/4 border-x-2 px-10'>
         <SocialComponent/>
        </div>
        <div className='w-1/4 mx-10 '>
         <NavLinks/>
        </div>
         
      </div>
      <div className='md:hidden  flex flex-col justify-start px-10 line-clamp-3'>
         <NavLinks/>
         <hr className='w-full border-1 my-5'/>
         <SocialComponent/>
      </div>
      <p className='text-white text-md nutino mt-5 text-center'>© Lorem Ipsum 2023 | Name | All rights reserved</p>
    </div>
  )
}

export default Footer