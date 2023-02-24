import React from 'react'
import EmployerOffers from './Employer/Offers'
import EmployeeOffers from './Employee/Offers'


function Offers() {
  return (
    localStorage.getItem("role") === "jobSeeker" ? <EmployeeOffers />: <EmployerOffers />
  )
}

export default Offers