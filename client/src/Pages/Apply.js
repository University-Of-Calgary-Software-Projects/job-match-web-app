import React, { useEffect } from "react";
import ErrorPage from "./ErrorPage";
import EmployeeApply from "./Employee/Apply";

function Apply() {
  useEffect(() => {
    document.title =
      localStorage.getItem("role") === "jobSeeker"
        ? "Apply | JobMatch"
        : "Error: page not found";
  }, []);

  return localStorage.getItem("role") === "jobSeeker" ? (
    <EmployeeApply />
  ) : (
    <ErrorPage />
  );
}

export default Apply;
