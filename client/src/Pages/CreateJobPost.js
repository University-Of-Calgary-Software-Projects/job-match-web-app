import React from 'react'
import ErrorPage from './ErrorPage'
import EmployerCreateJobPost from './Employer/CreateJobPost'

function CreateJobPost() {
  return (
    localStorage.getItem("role") === "jobSeeker" ? <ErrorPage />: <EmployerCreateJobPost />
  )
}

export default CreateJobPost