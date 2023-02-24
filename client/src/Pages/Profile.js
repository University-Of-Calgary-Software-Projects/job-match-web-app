import React from 'react'
import EmployeeProfile from './Employee/Profile'
import EmployerProfile from './Employer/Profile'

function Profile() {
  return (
    localStorage.getItem("role") === "jobSeeker" ? <EmployeeProfile />: <EmployerProfile />
  )
}

export default Profile