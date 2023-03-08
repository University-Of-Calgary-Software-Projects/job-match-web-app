import React from 'react'
import EmployerJobPosts from './Employer/JobPost'
import EmployeeJobPosts from './Employee/JobPosts'


/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function JobPosts() {
  return (
    localStorage.getItem("role") === "jobSeeker" ? <EmployeeJobPosts /> :  <EmployerJobPosts />
  )
}

export default JobPosts