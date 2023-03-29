import React, { useEffect } from 'react'
import EmployeeProfile from './Employee/Profile'
import EmployerProfile from './Employer/Profile'


/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function Profile() {
  useEffect(() => {
    document.title = "Profile | JobMatch";
  }, []);


  return (
    localStorage.getItem("role") === "jobSeeker" ? <EmployeeProfile />: <EmployerProfile />
  )
}

export default Profile