import React,{ useEffect, useState } from 'react'
import Header from '../components/Header'
import Mystore from '../components/Mystore'
// import Profile from '../components/Profile'

function Dashboard() {
  const [username,setUsername]= useState("")
  useEffect(()=>{
if(sessionStorage.getItem("username")){
  setUsername(sessionStorage.getItem("username"))
}else{
  setUsername("")
}
  },[])

  return (
    <div>
      <Header insideDashboard></Header>
      <div style={{ marginTop: '200px', marginBottom: '20px' }} className='container'>
        {/* <h1>Welcome <span className='text-warning'>{username}</span></h1> */}
        <div className='row mt-5 '>
          <div className='col-lg-8'>
            <Mystore></Mystore>
          </div>
          <div  className='col-lg-1' ></div>
          <div className='col-lg-3' >
         {/* <Profile></Profile> */}
         <h1>Welcome <span className='text-warning'>{username}</span></h1>
         <div className='mt-5 ' style={{color:'#FF004D'}} >
                   <h4 >Here, you have the capability to add, edit, and delete data pertaining to your restaurant.</h4>

         </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard