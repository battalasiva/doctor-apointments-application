import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // =========== doctor menu ===============
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  // =========== doctor menu ===============
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Profile",
      path: `/user/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  // admin menu
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },

    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "fa-solid fa-users",
    },
    {
      name: "Profile",
      path: `/admin/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  // redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6 className="text-light"><Link to="/"><i className="fa-solid fa-user-doctor" /> Doctor_App</Link></h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <Link to={menu.path}>
                        <i className={menu.icon}></i>
                      </Link>
                      <Link className="menuname" to={menu.path}>
                        {menu.name}
                      </Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link className="logout-link" to="/login">
                  Logout
                </Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-heading">
                <h5>Doctor-App</h5>
                </div>
                <div className="header-content" style={{ cursor: "pointer" }}>
                  <Badge
                  className="notification-badge"
                    count={user && user.notifcation.length}
                    onClick={() => {
                      navigate("/notification");
                    }}
                  >
                    <i class="fa-solid fa-bell"></i>
                  </Badge>

                  <Link className="user-name" to="/profile">{user?.name}</Link>
                </div>
              </div>
            
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
