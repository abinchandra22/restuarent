import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import gallery from '../assets/gallery.webp'
import SERVER_URL from '../servises/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateStoreAPI } from '../servises/allAPI';
import { updateResponseContext } from '../context/ContextShare';

function Edit({ project }) {
  // context
  const {editResponse, setEditResponse} = useContext(updateResponseContext)

  const [storeData, setStoreData] = useState({
    id:project._id, resttname: project.resttname, place: project.place, food: project.food, insta: project.insta, location: project.location, website: project.website, overview: project.overview, phoneno: project.phoneno, storeImage1: ""
  })
  const [preview1, setPreview1] = useState("")

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setStoreData({ id: project._id, resttname: project.resttname, place: project.place, food: project.food, insta: project.insta, location: project.location, website: project.website, overview: project.overview, phoneno: project.phoneno, storeImage1: "" })
    setPreview1("")
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (storeData.storeImage1) {
      setPreview1(URL.createObjectURL(storeData.storeImage1))
    } else {
      setPreview1("")
    }
  }, [storeData.storeImage1])

  const handleUpdateStore = async () => {
    const {id, resttname, place, food, insta, location, website, overview, phoneno, storeImage1 } = storeData
    if (!resttname || !place || !food || !location || !overview || !phoneno) {
      toast.info("Please fill necessary items")
    } else {
      const reqBody = new FormData()
      reqBody.append("resttname", resttname)
      reqBody.append("place", place)
      reqBody.append("food", food)
      reqBody.append("insta", insta)
      reqBody.append("location", location)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      reqBody.append("phoneno", phoneno)
      preview1 ? reqBody.append("storeImage1", storeImage1) : reqBody.append("storeImage1", project, storeImage1)

      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type":preview1? "multipart/form-data" :"application/json",
          "Authorization": `Bearer ${token}`
        }
        console.log("prossid to pi call");
        try{
          const result = await updateStoreAPI(id,reqBody,reqHeader)
          if (result.status==200) {
            handleClose()
            // share response to ,myproject component using contextshare
            setEditResponse(result.data)
          }else{
            console.log(result);
          }
        }catch(err){
          console.log(err);
        }
              }
    }
  }
  return (
    <>
      <button onClick={handleShow} style={{ textDecoration: 'none' }} className='btn btn-link text-success d-flex align-items-center fw-bolder'>
        <i style={{ height: '34px' }} className='fa-solid fa-edit fa-2x '></i>
      </button>

      <Modal centered size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='bg-dark' closeButton>
          <Modal.Title className='bg-dark' >Edit the Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-4'>
              <label className='w-100 d-flex align-items-center flex-column justify-content-center'>
                <input type="file" style={{ display: 'none' }} onChange={e => setStoreData({ ...storeData, storeImage1: e.target.files[0] })} />

                <img height={'200px'} width={'200px'} className='img-fluid' src={preview1 ? preview1 : `${SERVER_URL}/uploades/${project?.storeImage1}`}
                  alt="project uplode pick" />
              </label>
            </div>
            <div className='col-lg-8'>
              <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Restaurent Name' value={storeData.resttname} onChange={e => setStoreData({ ...storeData, resttname: e.target.value })} />
              </div>

              <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Place' value={storeData.place} onChange={e => setStoreData({ ...storeData, place: e.target.value })} />
              </div>

              <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Special Foods' value={storeData.food} onChange={e => setStoreData({ ...storeData, food: e.target.value })} />
              </div>


              <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Restaurent Instagram Link (Optional)' value={storeData.insta} onChange={e => setStoreData({ ...storeData, insta: e.target.value })} />
              </div>

              <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Restaurent Location Link ' value={storeData.location} onChange={e => setStoreData({ ...storeData, location: e.target.value })} />
              </div>


              <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Restaurent Website Link (Optional)' value={storeData.website} onChange={e => setStoreData({ ...storeData, website: e.target.value })} />
              </div>

              <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Description about Your Restaurent' value={storeData.overview} onChange={e => setStoreData({ ...storeData, overview: e.target.value })} />
              </div>

              <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Enter your PhNo' value={storeData.phoneno} onChange={e => setStoreData({ ...storeData, phoneno: e.target.value })} />
              </div>



            </div>
          </div>

          {/* <div className='row mt-5'>
          <div className='col-lg-4'>
              <label className='w-100 d-flex align-items-center flex-column justify-content-center'>
                <img height={'200px'} width={'200px'} className='img-fluid' src={gallery} alt="project uplode pick" />
              </label>
            </div>

            <div className='col-lg-4'>
              <label className='w-100 d-flex align-items-center flex-column justify-content-center'>
                <img height={'200px'} width={'200px'} className='img-fluid' src={gallery} alt="project uplode pick" />
              </label>
            </div>

            <div className='col-lg-4'>
              <label className='w-100 d-flex align-items-center flex-column justify-content-center'>
                <img height={'200px'} width={'200px'} className='img-fluid' src={gallery} alt="project uplode pick" />
              </label>
            </div>
          </div> */}
        </Modal.Body>
        <Modal.Footer className='bg-dark' >
          <Button variant="primary" className='bg-danger' onClick={handleClose}>
            Cansel
          </Button>
          <Button onClick={handleUpdateStore} variant="primary" className='bg-success'>Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} theme='colored'></ToastContainer>

    </>
  )
}

export default Edit