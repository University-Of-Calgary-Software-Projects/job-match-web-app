import React, { useEffect } from "react";
import ErrorPage from "./ErrorPage";
import EmployeeJobSearch from "./Employee/JobSearch";
import EmployerJobPosts from "./Employer/JobPost";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function JobSearch() {
  useEffect(() => {
    document.title =
      localStorage.getItem("role") === "jobSeeker"
        ? "Search | JobMatch"
        : "Job Posts | JobMatch";
  }, []);

  return localStorage.getItem("role") === "jobSeeker" ? (
    <EmployeeJobSearch />
  ) : (
    <EmployerJobPosts />
  );
}

export default JobSearch;
