import { Link, NavLink, useLocation } from "react-router-dom";
import { routeConfig } from "../../../route.config";
import { FiChevronRight } from "react-icons/fi";
import { useUserContext } from "../../context/user.context";
import { HiMenuAlt3 } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { useModalContext } from "../../context/modal.context";
import { useEffect, useState } from "react";
import Authentication from "../../pages/Auth/Authentication";
import UserAccountLogic from "../../logic/useraccount.logic";
import { BiLogOut, BiNotification, BiUser } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { MdCreate, MdNotifications, MdSettings } from "react-icons/md";

function Navbar() {
  const { user, setUser } = useUserContext();
  const [showNav, setShowNav] = useState(false);
  const { pathname } = useLocation();

  const { toggleModal, setModalChild } = useModalContext();

  const { logoutUser } = UserAccountLogic();

  function toggleNav(e) {
    e.preventDefault();
    setShowNav((prev) => !prev);
  }

  useEffect(() => {
    if (showNav) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showNav]);

  if (pathname.includes("map")) return null;

  return (
    <nav className="inline-flex-between container-padding bg-neutral">
      <Link to="/">Logo</Link>
      <button onClick={toggleNav} id="nav-btn" className="">
        <HiMenuAlt3 className="text-2xl" />
      </button>
      <div
        className={`inline-flex gap-8 items-center ${
          showNav ? "show-nav-menu" : "hide-nav-menu"
        }`}
      >
        <button
          onClick={toggleNav}
          id="nav-btn"
          className="absolute top-0 right-0 m-4"
        >
          <GrClose className="text-2xl" />
        </button>
        <div
          onClick={(e) => {
            e.target.tagName === "A" && setShowNav((prev) => false);
          }}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          {routeConfig.map((route, index) => {
            if (!route.showOnNav) return null;
            return (
              <NavLink key={`${route.path}${route.name}`} to={route.path}>
                {route.name}
              </NavLink>
            );
          })}
          {!user || user === null ? (
            <>
              <button
                id="signup-btn-desktop"
                className="btn-primary"
                onClick={(e) => {
                  setModalChild((prev) => <Authentication />);
                  toggleModal(e);
                }}
              >
                Sign up now <FiChevronRight />
              </button>
              <Link
                id="signup-btn-phone"
                to="/auth/signup"
                className="btn-primary"
              >
                Sign up now <FiChevronRight />
              </Link>
            </>
          ) : (
            // <NavLink key={`${'/account'}${'My Account'}`} to={'/account'}>
            //     My Account
            //   </NavLink>
            <>
              <div className="relative group">
                <NavLink key={`${"/account"}${"My Account"}`} to={"/update-profile"}>
                  My Account
                </NavLink>
                <div className="grid-rows-0 h-0 group-hover:grid-rows-1 group-hover:h-[200px] transition-all duration-500 ease-out absolute top-8 -right-5 overflow-hidden">
                  <div id="sub-nav-links" className="flex flex-col gap-4 items-start justify-start input-div w-max text-left">
                    <Link
                      className="hover:text-primary w-full"
                      to="/update-profile"
                    >
                      <BiUser/> Edit Profile
                    </Link>
                    <Link
                      className="hover:text-primary w-full"
                      to="/notifications"
                    >
                      <MdNotifications/> Notification
                    </Link>
                    <Link
                      className="hover:text-primary w-full"
                      to="/create-community"
                    >
                      <MdCreate/> Create Community
                    </Link>
                    <Link className="hover:text-primary w-full" to="/settings">
                      <MdSettings/> Settings
                    </Link>
                    <button onClick={logoutUser} className="m-0 text-left font-semibold w-full mt-1 pt-2 border-t border-black">
                      <BiLogOut/> Logout
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
