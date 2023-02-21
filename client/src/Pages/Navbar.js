import React from "react";
import EmployerNavbar from './Employer/Navbar';
import EmployeeNavbar from './Employee/Navbar';

function NavBar(props) {
  return localStorage.getItem("role") === "jobSeeker" ? (
    <EmployeeNavbar>{props.children}</EmployeeNavbar>
  ) : (
    <EmployerNavbar>{props.children}</EmployerNavbar>
  );
}

export default NavBar;
