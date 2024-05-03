import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import login from '../assets/login.png'
import logo2 from '../assets/logo2.png'
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../servises/allAPI';
import { tokenAuthContext } from '../context/TokenAuth';

function Auth({ insideRegister }) {
 const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)

  // spinner
  const [loginStatus,setLoginStatus] = useState(false)
  const navigate = useNavigate()
  // register
  const [userInputData, setUserInputData] = useState({
    username: "", email: "", password: ""
  })
  
  const handleRegister = async (e) => {
    e.preventDefault()
    console.log(userInputData);
    const { username, email, password } = userInputData
    if (!username || !email || !password) {
      toast.info("Please fill the form completely")
    } else {
      // alert("prossied to register")
      try {
        const result = await registerAPI(userInputData)
        console.log(result);
        if (result.status === 200) {
          toast.success(`Welcome ${result.data.username} Please login to explore our site..`)
          setUserInputData({ username: "", email: "", password: "" })
          // navigate to login page
          setTimeout(() => {
            navigate("/login")
          }, 2000)
        } else {
          toast.error(result.response.data)
        }
      } catch (err) {
        console.log(err);
      }
    }

  }
  const handleLogin = async (e) => {
    // to prevent autoreloding in form
    e.preventDefault()
    //  console.log(userInputData);
    const { email, password } = userInputData
    if (!email || !password) {
      toast.info("please fill the form complete!!!")
    }
    else {
      try {
        const result = await loginAPI({ email, password })
        // while putting this log we can get datas
        console.log(result);
        if (result.status === 200) {
          // store token,username using sessionstorage
          sessionStorage.setItem("username", result.data.existingUser.username)
          sessionStorage.setItem("token", result.data.token)
          sessionStorage.setItem("userDetails",JSON.stringify(result.data.existingUser) )
          // convert to string
          // sessionStorage.setItem("userdetails",JSON.stringify(result.data.existingUser))
          // loading....
          setLoginStatus(true)
          setIsAuthorised(true)

          // navigate to landingpage
          setTimeout(() => {
            setUserInputData({ email: "", password: "" })

            navigate("/")
            setLoginStatus(false)
          }, 2000)
        } else {
          toast.error(result.response.data)
        }
      } catch (err) {
        console.log(err);
      }
    }
  }


  return (
    <div style={{ width: '100%' }} className='d-flex justify-content-center align-items-center mt-5'>
      <div className='container w-75'>
        <Link to={'/'} style={{ textDecoration: 'none' }}><i class="fa-solid fa-arrow-left fa-beat"></i><b>Back To Home</b></Link>
        <div className='card shadow p-5 ' style={{ backgroundColor: '#FF922C' }}>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <img className='w-100' src={login} alt="" />
            </div>
            <div className='col-lg-6'>
              <h1 className='fw-bolder text-light mt-2'>
                <img className='img-fluid' style={{ height: '100px', width: '100px' }} src={logo2} alt="" />
                <span style={{ color: '#FF922C', wordWrap: 'break-word' }}>Eats</span><span style={{ color: '#FF004D', wordWrap: 'break-word' }}>Explorer</span>

              </h1>
              {/* condition rendering*/}
              <h5 className='fw-bolder text-light mt-2'>
                Sign {insideRegister ? 'Up' : 'In'} to your Account
              </h5>
              <Form>
                {
                  insideRegister &&
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control type="text" placeholder="Enter User Name" value={userInputData.username} onChange={e => setUserInputData({ ...userInputData, username: e.target.value })} />
                  </Form.Group>
                }
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Enter email" value={userInputData.email} onChange={e => setUserInputData({ ...userInputData, email: e.target.value })} />
                </Form.Group>

                {/* spinner */}
                { loginStatus && <div style={{marginLeft:'150px'}}>
                  <Spinner animation="grow" variant="primary" size="sm" />
                  <Spinner animation="grow" variant="warning" size="md" />
                  <Spinner animation="grow" variant="danger" size="lg" />
                </div>}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" value={userInputData.password} onChange={e => setUserInputData({ ...userInputData, password: e.target.value })} />
                </Form.Group>
                {
                  insideRegister ?
                    <div>
                      <button onClick={handleRegister} className='btn btn-light mb-2'>Register</button>
                      <p>Allready have an Account? Click here to <Link to={'/login'} className='text-danger'>Login</Link></p>
                    </div> :
                    <div>
                      <button onClick={handleLogin} className='btn btn-light mb-2'>Login  </button>
                      <p>If yoy are a New User? Click here to <Link to={'/register'} className='text-danger'>Register</Link></p>
                    </div>
                }
              </Form>
            </div>
            <ToastContainer autoClose={3000} theme='colored'></ToastContainer>

          </div>
        </div>
      </div>
    </div>

  )
}

export default Auth