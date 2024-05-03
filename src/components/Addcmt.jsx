import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Addcmt() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    
    return (
        <div>
            <div className='container d-flex justify-content-center align-items-center w-100'>
                <button onClick={handleShow} style={{ textDecoration: 'none' }} className='btn btn-link  d-flex align-items-center fw-bolder'>
                    Add Comments
                </button>
                <Modal centered size='lg'
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header className='bg-dark' closeButton >
                        <Modal.Title className='bg-dark'>Comment Box</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div >

                            <div >
                                <div className='mb-3'>
                                    <input className='border rount p-2 w-100' type="text" placeholder='Write Comment here..' />
                                </div>

                            </div>

                        </div>
                    </Modal.Body  >
                    <Modal.Footer className='bg-dark'>
                        <Button variant="primary" className='bg-danger' onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" className='bg-success'>Save</Button>
                    </Modal.Footer>
                </Modal>

            </div>

        </div>
    )
}

export default Addcmt