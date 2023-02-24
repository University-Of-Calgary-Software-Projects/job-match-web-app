import React from 'react'
import EmployerOffers from './Employer/Offers'
import EmployeeOffers from './Employee/Offers'
import ErrorPage from './ErrorPage'


function Offers() {
  return (
    localStorage.getItem("role") === "jobSeeker" ? <EmployeeOffers />: <EmployerOffers />
  )
}

export default Offers