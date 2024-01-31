import React from "react";
import {
  FaBell,
  FaEnvelope,
  FaHome,
  FaLayerGroup
} from "react-icons/fa";
import Link from "next/link";

const links = [
  {
    name: "Home",
    icon: <FaHome />,
  },
  {
    name: "Groups",
    icon: <FaLayerGroup />,
  },
  {
    name: "Notifications",
    icon: <FaBell />,
  },
  {
    name: "Messages",
    icon: <FaEnvelope />,
  },

];

const Sidebar = () => {
  return (
    <div className="leftSection">
      <div className="userProfileWidget">
        <div className="profileImage">
          <img src={"/assets/image/avatar_default.jpg"} alt="" />
        </div>
        <div className="userDetails">
          <Link href={"/Profile"} className="name">
            John Doe
          </Link>
          <div className="username">@johndoe</div>
        </div>
      </div>

      <div className="inSidebar">
        {links.map((link, index) => {
          return (
            <div className="link" key={index}>
              <div className="icon">{link.icon}</div>
              <h3>{link.name}</h3>
            </div>
          );
        })}
      </div>
      <label htmlFor="createNewPost" className="inBtn sidebarCreateBtn">
        Create Post
      </label>
    </div>
  );
};

export default Sidebar;
