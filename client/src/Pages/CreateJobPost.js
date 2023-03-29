import React, { useEffect } from "react";
import ErrorPage from "./ErrorPage";
import EmployerCreateJobPost from "./Employer/CreateJobPost";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function CreateJobPost() {
  useEffect(() => {
    document.title =
      localStorage.getItem("role") === "jobSeeker"
        ? "Error: page not found"
        : "Create | JobMatch";
  }, []);

  return localStorage.getItem("role") === "jobSeeker" ? (
    <ErrorPage />
  ) : (
    <EmployerCreateJobPost />
  );
}

export default CreateJobPost;
