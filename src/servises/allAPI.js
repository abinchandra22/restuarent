import { commonAPI } from "./commonAPI.JS"
import SERVER_URL from "./serverUrl"


// register api
export const registerAPI = async (user)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,user,"")
}

// login api
export const loginAPI = async (user)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,user,"")
}

// add api
export const addStoreAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-store`,reqBody,reqHeader)
}

// get home api
export const getHomeStoreAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/get-home-store`,"","")
}

// get all store
export const getAllStoreAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/get-all-store?search=${searchKey}`,"",reqHeader)
}


// get user store
export const getUserStoreAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/get-user-store`,"",reqHeader)
}

// edit store
export const updateStoreAPI = async (storeId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/store/edit/${storeId}`,reqBody,reqHeader)
}

// delete store
export const deleteStoreAPI = async (storeId,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/remove-store/${storeId}`,{},reqHeader)
}


// add comment api
// export const addCommentAPI = async (reqBody)=>{
//     return await commonAPI("POST",`${SERVER_URL}/comment-cmd`,reqBody,"")
// }



