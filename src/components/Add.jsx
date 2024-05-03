import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import gallery from '../assets/gallery.webp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addStoreAPI } from '../servises/allAPI';
import { addResponseContext } from '../context/ContextShare';

function Add() {
const {addResponse,setAddResponse} = useContext(addResponseContext)

const [storeData,setStoreData] = useState({
  resttname:"",place:"",food:"",insta:"",location:"", website:"",overview:"",phoneno:"",storeImage1:""
})
console.log(storeData);

const [imageFileStatus,setImageFileStatus] = useState(false)
// state for imgurl
const [preview1,setPreview1] = useState("")


  const [show, setShow] = useState(false);

  const handleClose = () =>{
    setShow(false);
    setStoreData({  resttname:"",place:"",food:"",insta:"",location:"",website:"",overview:"",phoneno:"",storeImage1:""  })
    setPreview1(gallery)
  } 

  const handleShow = () => setShow(true);


  useEffect(()=>{
    if (storeData.storeImage1?. type=="image/png" || storeData.storeImage1?. type=="image/jpeg") {
      // console.log("generate image url");
      setImageFileStatus(true)
            setPreview1(URL.createObjectURL(storeData.storeImage1));

    }else{
      setImageFileStatus(false)
      setStoreData({...storeData,storeImage1:""})
      setPreview1("")
      // console.log("only following type");
    }
  },[storeData.storeImage1])

  // useEffect(()=>{
  //   if (storeData.storeImage2?. type=="image/png" || storeData.storeImage2?. type=="image/jpeg") {
  //     setPreview2(URL.createObjectURL(storeData.storeImage2));
  //     setImageFileStatus(true)

  //   }else{
  //     setImageFileStatus(false)
  //     setStoreData({...storeData,storeImage2:""})

  //     setPreview2("")
  //   }
  // },[storeData.storeImage2])

  // useEffect(()=>{
  //   if (storeData.storeImage3?. type=="image/png" || storeData.storeImage3?. type=="image/jpeg") {
  //     setPreview3(URL.createObjectURL(storeData.storeImage3));
  //     setImageFileStatus(true)

  //   }else{
  //     setImageFileStatus(false)
  //     setStoreData({...storeData,storeImage3:""})

  //     setPreview3("")
  //   }
  // },[storeData.storeImage3])

  // useEffect(()=>{
  //   if (storeData.storeImage4?. type=="image/png" || storeData.storeImage4?. type=="image/jpeg") {
  //     setPreview4(URL.createObjectURL(storeData.storeImage4));
  //     setImageFileStatus(true)

  //   }else{
  //     setImageFileStatus(false)
  //     setStoreData({...storeData,storeImage4:""})

  //     setPreview4("")
  //   }
  // },[storeData.storeImage4])

const handleStoreUplode = async()=>{
  const {  resttname,place,food,insta ,location,website,overview,phoneno,storeImage1} = storeData
  if(!resttname || !place || !food ||!location || !overview || !phoneno || !storeImage1){
    toast.info("Please fill necessary items")
  }else{
    const reqBody = new FormData()
    reqBody.append("resttname",resttname)
    reqBody.append("place",place)
    reqBody.append("food",food)
    reqBody.append("insta",insta)
    reqBody.append("location",location)
    reqBody.append("website",website)
    reqBody.append("overview",overview)
    reqBody.append("phoneno",phoneno)
    reqBody.append("storeImage1",storeImage1)

    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader ={
        "Content-Type":"multipart/form-data",
       "Authorization" :`Bearer ${token}`
      }
      console.log("prossid to pi call");
  try
  { const result = await addStoreAPI(reqBody,reqHeader)
  console.log(result);
  if (result.status===200) {
    toast.success(`New Store ${result.data.resttname} has added successfully!! `)
    // share res to context
    setAddResponse(result.data)
    handleClose()
  }else{
    toast.warning(result.response.data)
  }
  }catch(err){
    console.log(err);
  }
    }
  }
}


  return (
    <>
      <button onClick={handleShow} style={{ textDecoration: 'none' }} className='btn btn-link text-warning d-flex align-items-center fw-bolder'>
        <h4><i style={{ height: '50px' }} className='fa-solig fa-plus fa-2x me-2'></i>Add Store</h4>
      </button>

    <Modal centered size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='bg-dark' closeButton >
          <Modal.Title className='bg-dark'>Enter the details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-4'>
              <label className='w-100 d-flex align-items-center flex-column justify-content-center'>
                <input type="file" style={{display:'none'}} onChange={e=>setStoreData({...storeData,storeImage1:e.target.files[0]})}/>
                <img height={'200px'} width={'200px'} className='img-fluid' src={preview1?preview1:gallery} alt="project uplode pick" />
              </label>

{!imageFileStatus&&<div className='text-danger'>*Uplode only following file type (jpg,png,jpeg)*</div>
}           
            </div>
            <div className='col-lg-8'>
              <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Restaurent Name' value={storeData.resttname} onChange={e=>setStoreData({...storeData,resttname:e.target.value})}/>
                 </div>

                 <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Place' value={storeData.place} onChange={e=>setStoreData({...storeData,place:e.target.value})}/>
                 </div>

                 <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Special Foods'value={storeData.food} onChange={e=>setStoreData({...storeData,food:e.target.value})}/>
                 </div>


                 <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Restaurent Instagram Link (Optional)'value={storeData.insta} onChange={e=>setStoreData({...storeData,insta:e.target.value})}/>
                 </div>

                 <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Restaurent Location Link 'value={storeData.location} onChange={e=>setStoreData({...storeData,location:e.target.value})}/>
                 </div>

                 <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Restaurent Website Link (Optional)'value={storeData.website} onChange={e=>setStoreData({...storeData,website:e.target.value})}/>
                 </div>


                 <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Description about Your Restaurent'value={storeData.overview} onChange={e=>setStoreData({...storeData,overview:e.target.value})}/>
                 </div>

                 <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Enter your PhNo'value={storeData.phoneno} onChange={e=>setStoreData({...storeData,phoneno:e.target.value})}/>
                 </div>


            </div>
          </div>

          {/* <div className='row mt-5 p5'>
          <div className='col-lg-4'>
              <label className='w-100 d-flex align-items-center flex-column justify-content-center'>
              <input type="file" style={{display:'none'}}  onChange={e=>setStoreData({...storeData,storeImage2:e.target.files[0]})} />
                <img height={'200px'} width={'200px'} className='img-fluid' src={preview2?preview2:gallery} alt="project uplode pick" />
              </label>
              {    !imageFileStatus&&          <div className='text-danger'>*Uplode only following file type (jpg,png,jpeg)*</div>
}           

            </div>

            <div className='col-lg-4 p5'>
              <label className='w-100 d-flex align-items-center flex-column justify-content-center'>
              <input type="file" style={{display:'none'}}  onChange={e=>setStoreData({...storeData,storeImage3:e.target.files[0]})}/>
                <img height={'200px'} width={'200px'} className='img-fluid' src={preview3?preview3:gallery} alt="project uplode pick" />
              </label>
              {    !imageFileStatus&&          <div className='text-danger'>*Uplode only following file type (jpg,png,jpeg)*</div>
}           

            </div>

            <div className='col-lg-4 p5'>
              <label className='w-100 d-flex align-items-center flex-column justify-content-center'>
              <input type="file" style={{display:'none'}}  onChange={e=>setStoreData({...storeData,storeImage4:e.target.files[0]})}/>
                <img height={'200px'} width={'200px'} className='img-fluid' src={preview4?preview4:gallery} alt="project uplode pick" />
              </label>
              {    !imageFileStatus&&          <div className='text-danger'>*Uplode only following file type (jpg,png,jpeg)*</div>
}           

            </div> */}
          {/* </div> */}
        </Modal.Body  >
        <Modal.Footer className='bg-dark'>
          <Button variant="primary" className='bg-danger' onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className='bg-success'onClick={handleStoreUplode} >Save</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} theme='colored'></ToastContainer>


    </>
  )
}

export default Add