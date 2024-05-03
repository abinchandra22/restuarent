// import React, { useEffect } from 'react'
// import { useState } from 'react';
// import Collapse from 'react-bootstrap/Collapse';
// import profile from '../assets/profile.jpg'

// function Profile() {
//   const [open, setOpen] = useState(false);
//   const [userData, setUserdata] = useState({
//     username: "", email: "", password: "",  uname: "", insta: "" , profileImage: ""
//    })
//    const [existingImage, setExistingImage] = useState("")
//    const [preview, setPreview] = useState("")
 
//    useEffect(() => {
//     if (sessionStorage.getItem("userdetails")) {
//       const userdetails = JSON.parse(sessionStorage.getItem("userdetails"))
//       setUserdata({...userData, username: userdetails.username, password: userdetails.password, email: userdetails.email, uname: userdetails.uname, insta: userdetails.insta })
//       setExistingImage(userdetails.profile)
//     }
//   },[open])

//   useEffect(()=>{
//     if (userData.profileImage) {
//       setPreview(URL.createObjectURL(userData.profileImage))
      
//     }else{
//       setPreview("")
//     }
//   },[userData.profileImage])
// console.log(userData);


//   return (
//     <div className='border rounded p-2'>
//     <div className='d-flex justify-content-between'>
//       <h2>Profile</h2>
//     <button onClick={() => setOpen(!open)} className='btn btn-outline-warning'><i className='fa-solid fa-caret-down fa-beat-fade'></i></button>
//     </div>
//     <Collapse in={open}>
//       <div className='text-center' id="example-collapse-text">

//         <form >
//           <label >
//             <input type="file" style={{ display: 'none' }}  onChange={e=>setUserdata({...userData,profileImage:e.target.files[0]})}/>
//             {existingImage == "" ?
//                 <img width={'200px'} height={'200px'} className='img-fluid rounde-circle mt-3' src={preview? preview:profile} alt="uplode profile pick" />
//                 :
//                 <img width={'200px'} height={'200px'} className='img-fluid rounde-circle mt-3' src={ preview?preview:`${SERVER_URL}/uploades/${existingImage}`} alt="uplode profile pick" />

//               }
//           </label>
//           <div className='mb-3 mt-3'>
//             <input type="text" className='rounded p-1 w-75' placeholder='Enter your UserName Here' value={userData.username}  onChange={e=>setUserdata({...userData,username:e.target.value})}/>
//           </div>
//           <div className='mb-3'>
//             <input type="text" className='rounded p-1 w-75' placeholder='Enter your email Here'  value={userData.email}  onChange={e=>setUserdata({...userData,username:e.target.value})}/>
//           </div>
//           <div className='mb-3 d-grid w-75 mx-auto'>
//             <button className='btn btn-warning'>Update</button>
//           </div>

//         </form>
//       </div>
//     </Collapse>
//   </div>

//   )
// }

// export default Profile