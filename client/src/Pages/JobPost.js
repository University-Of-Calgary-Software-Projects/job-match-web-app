import React from 'react'
import ErrorPage from './ErrorPage'
import JobApplicants from './Employer/JobApplicants'


/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function JobPost() {
  return (
    localStorage.getItem("role") === "jobSeeker" ? <ErrorPage /> :  <JobApplicants />
  )
}

export default JobPost