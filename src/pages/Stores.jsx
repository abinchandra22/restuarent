import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Projectcard from '../components/Projectcard'
import { getAllStoreAPI } from '../servises/allAPI'
function Stores() {
  const [allStores, setAllStores] = useState([])

  const [searchKey,setSearchKey] = useState("")

  const getAllStore = async () => {
    try {
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await getAllStoreAPI(searchKey,reqHeader)
        if (result.status === 200) {
          setAllStores(result.data)
        }else{
          console.log("Noughting to display");
        }
      }

    } catch (err) {
      console.log(err);
    }
  }
  console.log(allStores);

  useEffect(() => {
    getAllStore()
  }, [searchKey])

  return (
    <div >
      <Header></Header>
      <div style={{ marginTop: '200px', marginBottom: '20px' }} className='container-fluid'>
        <div className='d-flex justify-content-between row'>
          <div className='col-lg-6'>
            <h1 className='ms-5'>Finf All Restaurent Here</h1>

          </div>
          <div className='col-lg-6'>
            <input onChange={e=>setSearchKey(e.target.value)} style={{ width: '100%', height: '50px' }} type="text" placeholder='Search Restaurent by its Place' />
          </div>

        </div>

        <Row className='mt-5 ms-3'>
          {allStores.length > 0 ? allStores?.map((project, index) => (
            <Col key={index} sm={12} md={6} lg={4}>
              <Projectcard project={project}></Projectcard>
            </Col>
          )) :
            <div className='fw-bolder text-danger '>Noughting to display....</div>

          }


        </Row>

      </div>
    </div>

  )
}

export default Stores