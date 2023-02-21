import React from 'react'
import ErrorPage from './ErrorPage'
import EmployeeJobSearch from './Employee/JobSearch'

function JobSearch() {
  return (
    localStorage.getItem("role") === "jobSeeker" ? <EmployeeJobSearch /> : <ErrorPage />
  )
}

export default JobSearch