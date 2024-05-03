import React from 'react'
import Header from '../components/Header'
import Addcmt from '../components/Addcmt'
// import { useState } from 'react'
// import { useEffect } from 'react'
function view() {

  return (
    <div>
      <Header></Header>
      <div style={{  marginTop: '200px' }} className='w-100 d-flex justify-content-center align-items-center '>
        <div className='container'>
          <div className='row align-item-cem=nter'>
            <div className='col-lg-4'>
              <img className='img-fluid' src="https://i.postimg.cc/Y0cWqN8s/rest.jpg" alt="landing" />

            </div>

            <div className='col-lg-2'>  </div>

            <div className='col-lg-6'>
              <h2 className='fw-bolder text-warning'></h2>
              <p>Place : <span className='fw-bolder text-danger'> Kollam</span></p>
              <p>Special Food : <span className='fw-bolder text-danger'> Sandwhich,appam</span></p>
              <p>PhNo : <span className='fw-bolder text-danger'>7356351845</span></p>

              <p>Description : <span className='fw-bolder'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum laborum temporibus numquam architecto dolorem iure debitis cumque soluta aspernatur ut qui sequi nesciunt inventore nihil maxime reiciendis, adipisci quis recusandae?</span></p>
              <div className="mt-1">
                <a href="" target='_blank' className='text-dark ms-5 me-3'><i style={{height:'34px'}} class="fa-brands fa-square-instagram fa-2x"></i></a>
                <a href="" target='_blank' className='text-dark'><i style={{height:'34px'}} class="fa-solid fa-link fa-2x"></i></a>
                <a href="" target='_blank' className='text-dark ms-3 '><i style={{height:'34px'}} class="fa-solid fa-location-dot fa-2x"></i></a>
              </div>
            </div>
          </div>

          {/* <div className='row align-item-cem=nter  mt-5 container align-items-center me-5 ms-5'>

            <div className='col-lg-4'>
              <img className='img-fluid' src="https://i.postimg.cc/Y0cWqN8s/rest.jpg" alt="landing" />
            </div>

            <div className='col-lg-4'>
              <img className='img-fluid' src="https://i.postimg.cc/Y0cWqN8s/rest.jpg" alt="landing" />
            </div>

            <div className='col-lg-4'>
              <img className='img-fluid' src="https://i.postimg.cc/Y0cWqN8s/rest.jpg" alt="landing" />
            </div>
          </div> */}
          {/* comments */}
          
        </div>
      </div>
      <Addcmt></Addcmt>
      <div className=' p-5' >
    <div className='d-flex justify-content-between'>
      <h4>View Comments</h4>
    </div>
    <div className='mt-5'>
      <div className='border rounded d-flex justify-content-between align-items-center'>
        <h4 className='ms-3'>comment</h4>
        <div className='icon d-flex align-items-center'>
       <button className='btn btn-link text-danger ms-2'><i className='fa-solid fa-trash text-danger fa-2x'></i> </button>
        </div>
      </div>
    </div>
  </div>

    </div>
  )
}

export default view