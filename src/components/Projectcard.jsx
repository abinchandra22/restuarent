import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Addcmt from '../components/Addcmt'
import SERVER_URL from '../servises/serverUrl';

function Projectcard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      
            <Card  onClick={handleShow}   className='shadow mb-5 btn' style={{ width: '18rem' }}>
        <Card.Img height={200} variant="top" src={`${SERVER_URL}/uploades/${project?.storeImage1}`}/>
        <Card.Body className='bg-white'>
          <Card.Title className='bg-white '>{project?.resttname}</Card.Title>
        </Card.Body>
      </Card>
      {/* modal */}
      <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header className='bg-dark'  closeButton>
          <Modal.Title className='bg-dark' >Restaurent Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='align-items-center'>
            <Col sm={12} md={6}>
              <img className='img-fluid ' src={`${SERVER_URL}/uploades/${project?.storeImage1}`} alt="" />
            </Col>
            <Col sm={12} md={6}>
              <h1 className='fw-bolder text-warning'>{project?.resttname}</h1>
              <p>Place : <span className='fw-bolder text-danger'> {project?.place}</span></p>
              <p>Special Food : <span className='fw-bolder text-danger'> {project?.food}</span></p>
              <p>PhNo : <span className='fw-bolder text-danger'>{project?.overview}</span></p>

              <p>Description : <span className='fw-bolder'>{project?.phoneno}</span></p>
            </Col>
          </Row>
          <div className="mt-5 d-flex justify-content-center">
          <a href={project?.insta} target='_blank' className='text-dark ms-5 me-3'><i style={{height:'34px'}} class="fa-brands fa-square-instagram fa-2x"></i></a>
                <a href={project?.website} target='_blank' className='text-dark'><i style={{height:'34px'}} class="fa-solid fa-link fa-2x"></i></a>
                <a href={project?.location} target='_blank' className='text-dark ms-3 '><i style={{height:'34px'}} class="fa-solid fa-location-dot fa-2x"></i></a>

          </div>
          {/* <Addcmt></Addcmt> */}
      <div className=' p-5' >
    {/* <div className='d-flex justify-content-between'>
      <h4>View Comments</h4>
    </div>
    <div className='mt-5'>
      <div className='border rounded d-flex justify-content-between align-items-center'>
        <h4 className='ms-3'>comment</h4>
        <div className='icon d-flex align-items-center'>
       <button className='btn btn-link text-danger ms-2'><i style={{height:'34px'}}  className='fa-solid fa-trash text-danger fa-2x'></i> </button>
        </div>
      </div>
    </div> */}
  </div>


        </Modal.Body>

      </Modal>

    </div>
  )
}

export default Projectcard