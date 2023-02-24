import React from 'react'
import EmployeeApplications from './Employee/Applications'
import ErrorPage from './ErrorPage'

function Applications() {
  return (
    localStorage.getItem("role") === "jobSeeker" ? <EmployeeApplications />: <ErrorPage />
  )
}

export default Applications