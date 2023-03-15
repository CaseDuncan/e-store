import React from 'react'

const Footer = () => {

    const date = new Date()
    const year = date.getFullYear()
  return (
      <div className='conatiner'>
          <div className="row">
              <div className="col-md-6 offset-5">
                  <p className='fw-bold fixed-bottom'>E-store &copy;{ year} all rights reserved</p>
              </div>
          </div>
    </div>
  )
}

export default Footer