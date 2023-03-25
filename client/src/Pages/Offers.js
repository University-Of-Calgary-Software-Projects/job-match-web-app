import React from 'react'
import EmployerOffers from './Employer/Offers'
import EmployeeOffers from './Employee/Offers'

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function Offers() {
  return (
    localStorage.getItem("role") === "jobSeeker" ? <EmployeeOffers />: <EmployerOffers />
  )
}

export default Offers