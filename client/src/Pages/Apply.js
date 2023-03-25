import React from 'react'
import ErrorPage from './ErrorPage'
import EmployeeApply from './Employee/Apply'

function Apply() {
  return (
    localStorage.getItem("role") === "jobSeeker" ? <EmployeeApply /> : <ErrorPage />
  )
}

export default Apply