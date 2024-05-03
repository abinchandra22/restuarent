import React, { useEffect, useState } from 'react'
import Sfs from '../assets/Sfs.gif'
import tea2 from '../assets/tea2.png'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import Projectcard from '../components/Projectcard'
import Footer from '../components/Footer'
import { getHomeStoreAPI } from '../servises/allAPI'

function Home() {
  const [allStores, setAllStores] = useState([])
  const [loginStatus, setLoginStatus] = useState(false)
  const navigate = useNavigate()

  const getHomeStore = async () => {
    try {
      const result = await getHomeStoreAPI()
      if (result.status === 200) {
        setAllStores(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }
  console.log(allStores);
  useEffect(() => {
    getHomeStore()
    if (sessionStorage.getItem("token")) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [])
  const handleNavigate = () => {
    navigate('/stores')
  }

  return (
    <div >
      <Header></Header>
      <div style={{ color: 'white', marginTop: '200px' }} className='w-100 d-flex justify-content-center align-items-center'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <h2 style={{ color: '#FF922C' }} className='fw-bolder text-align mb-3 '>
                Discover your ideal dining spot right here.
              </h2>
              <p style={{ textAlign: 'justify' }}>"One-stop destination for all your tastes, where users can add and manage their restaurants. Users can also discover restaurants in different locations, explore their special dishes, and find details such as location and contact information through this website."</p>
              {loginStatus ?
                <Link className='btn btn-warning mt-3' to={'/dashboard'}>Manage Your Store <i className='fa-solid fa-arrow-right'></i></Link> :
                <Link className='btn btn-warning mt-3' to={'/login'}>Start to Explore <i className='fa-solid fa-arrow-right'></i></Link>

              }
            </div>
            <div className='col-lg-1'></div>
            <div className='col-lg-2'>
              <img className='img-fluid' src={tea2} alt="landing" />
            </div>
            <div className='col-lg-2'>
              <img style={{ height: '150px' }} className='img-fluid' src={Sfs} alt="landing" />
            </div>
          </div>
        </div>

      </div>
      {/* all projects */}
      <div className='mt-5'>
        <h1 style={{ color: '#FF004D' }} className='text-center  mb-5'>Explore The Restaurants</h1>
        <marquee >
          <div className='d-flex'>
          {  allStores.length > 0 && allStores.map((project,index)=>(
            <div key={index} className='project me-5'>
              <Projectcard project={project}></Projectcard>
            </div>
          ))}
            
          </div>
        </marquee>
        <div className='text-center'>
          <button onClick={handleNavigate} className='btn btn-link'>View More </button>
        </div>
      </div>

      <Footer></Footer>
    </div>




  )
}

export default Home