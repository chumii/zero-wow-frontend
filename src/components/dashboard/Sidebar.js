import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavTitle,
  CNavItem,
  CButton,
  // CBadge,
  // CNavGroup,
  // CSidebarToggler,
} from "@coreui/react";
// import { Link } from "react-router-dom";
// import CIcon from "@coreui/icons-react";
// import * as icon from "@coreui/icons";
// import "./Dashboard.css";
import { Link } from "react-router-dom";
import { isAuthenticated, logOut } from "../../services/authService";

const DashboardSidebar = () => {
  const user = isAuthenticated();
  return (
    <CSidebar>
      <CSidebarBrand>Zero Dashboard</CSidebarBrand>
      {user ? (
        <CSidebarNav>
          <CNavTitle>Gilde</CNavTitle>
          <CNavItem>
            <Link to="/dashboard" className="nav-link">
              Profil
            </Link>
          </CNavItem>

          <CNavTitle>Blog</CNavTitle>
          <CNavItem>
            {" "}
            <Link to="/dashboard/bloglist" className="nav-link">
              Übersicht
            </Link>
          </CNavItem>
          <CNavItem>
            {" "}
            <Link to="/dashboard/createblogpost" className="nav-link">
              Neu
            </Link>
          </CNavItem>

          <CNavTitle>Killfeed</CNavTitle>
          <CNavItem>
            {" "}
            <Link to="/dashboard/killfeed" className="nav-link">
              Übersicht
            </Link>
          </CNavItem>
          <CNavItem>
            {" "}
            <Link to="/dashboard/createkillfeed" className="nav-link">
              Neu
            </Link>
          </CNavItem>

          <CNavTitle>Member</CNavTitle>
          <CNavItem>
            {" "}
            <Link to="/dashboard/roster" className="nav-link">
              Übersicht
            </Link>
          </CNavItem>
          <CNavTitle>Setups</CNavTitle>
          <CNavItem>
            {" "}
            <Link to="/dashboard/setups" className="nav-link">
              Übersicht
            </Link>
          </CNavItem>
          <CNavItem>
            {" "}
            <Link to="/dashboard/createsetup" className="nav-link">
              Neu
            </Link>
          </CNavItem>
          <CNavTitle>
            <CButton type="submit" color="light" onClick={logOut}>
              Logout
            </CButton>
          </CNavTitle>
        </CSidebarNav>
      ) : (
        <CSidebarNav></CSidebarNav>
      )}
    </CSidebar>
  );
};

export default DashboardSidebar;
