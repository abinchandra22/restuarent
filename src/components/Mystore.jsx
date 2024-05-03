import React from 'react'
import Add from '../components/Add'
import Edit from '../components/Edit'
import { useEffect,useState } from 'react'
import { deleteStoreAPI, getUserStoreAPI } from '../servises/allAPI'
import { addResponseContext ,updateResponseContext} from '../context/ContextShare';
import { useContext } from 'react'
function Mystore() {
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const {editResponse, setEditResponse} = useContext(updateResponseContext)

  // user project
  const [allStores, setAllStores] = useState([])

  const getUserStore = async()=>{
    try{
      const token = sessionStorage.getItem("token")
if(token){
  const reqHeader ={
    "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
   }
   const result = await getUserStoreAPI(reqHeader)
   if (result.status === 200) {
    setAllStores(result.data)
   }

    }

  }catch(err){
    console.log(err);
  }
}

console.log(allStores);
useEffect(()=>{
  getUserStore()
},[addResponse,editResponse])

const handleDeleteStore = async (storeId)=>{
  const token = sessionStorage.getItem("token")
  if (token) {
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`  
    }
    try{
      const result = await deleteStoreAPI(storeId,reqHeader)
      if (result.status==200) {
        getUserStore()
      }else{
        console.log(result);
      }
    }catch(err){
      console.log(err);
    }
  }
}


  return (
    <div className='border round p-2' >
    <div className='d-flex justify-content-between'>
      <h2>My Spote</h2>
      <Add></Add>
    </div>
    <div className='mt-4'>
      {allStores.length>0? allStores.map((project,index)=>(
             <div key={index} className='border rounded d-flex justify-content-between align-items-center'>
        <h4 className='ms-3'>{project?.resttname}</h4>
        <div className='icon d-flex align-items-center'>
          <Edit project={project}></Edit>
          {/* <a href=""  className='btn btn-link ms-2'> <i style={{height:'34px'}}  className='fa-brands text-info fa-square-instagram fa-2x'></i></a> */}
       <button onClick={()=>handleDeleteStore(project._id)} className='btn btn-link text-danger ms-2'><i style={{height:'34px'}} className='fa-solid fa-trash text-danger fa-2x'></i> </button>
        </div>
      </div>
 
      )):
      <div className='fw-bolder text-danger fs-4'>Noughting to display</div>

      }
    </div>
  </div>

  )
}

export default Mystore