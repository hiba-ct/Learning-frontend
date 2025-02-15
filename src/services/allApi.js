import commonApi from "./commonApi"
import SERVER_URL from "./serverUrl"


//register
export const registerAPI = async (reqBody)=>{
    return await commonApi("POST",`${SERVER_URL}/signup`,reqBody)
    
    
    }

//loginAPI 

export const loginApi = async (reqBody)=>{
    return await commonApi("POST",`${SERVER_URL}/login`,reqBody)
    
}


//submitAPI
export const submitAPI = async (reqBody)=>{
    return await commonApi("POST",`${SERVER_URL}/submit`,reqBody)
    
}

//allSubmitAPI 
export const allSubmitAPI=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/all-submit`,{},reqHeader)
}

//removesubmit
export const deleteContactAPI=async(id,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/contact/${id}/remove`,{},reqHeader)
    }

    // allApi.js
export const toggleNotedStatusAPI = async(id, headers) =>{
    return await commonApi("PUT"`${SERVER_URL}/contacts/${id}/noted`, {}, reqHeader);

}







//addcourseAPI

export const addCourseAPI = async (reqBody,reqHeader)=>{
    return await commonApi("POST",`${SERVER_URL}/add-courses`,reqBody,reqHeader)
    
    
    }

    //getHomeCourseApi 

export const getHomeCourseAPI =async()=>{
    return await commonApi("GET",`${SERVER_URL}/home-courses`,{})
}


//allCourseAPI 
export const allCoursesAPI=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/all-courses`,{},reqHeader)
}

 //edit course

 export const updateCourseAPI=async(id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/course/${id}/edit`,reqBody,reqHeader)
}



//removecourse
export const deleteCourseAPI=async(id,reqHeader)=>{
return await commonApi("DELETE",`${SERVER_URL}/courses/${id}/remove`,{},reqHeader)
}










//addStudentAPI

export const addStudentAPI = async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${SERVER_URL}/add-students`,reqBody,reqHeader)
    
    
    }

    //allStudentsAPI 
export const allStudentsAPI=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/all-students`,{},reqHeader)
}

//updateStudentsAPI 
export const updateStudentsAPI=async(id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/students/${id}/edit`,reqBody,reqHeader)
}


//removestudent
export const deleteStudentAPI=async(id,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/students/${id}/remove`,{},reqHeader)
}



 


    
//addserviceAPI
export const addServiceAPI = async (reqBody,reqHeader)=>{
    return await commonApi("POST",`${SERVER_URL}/add-services`,reqBody,reqHeader)
    
    
    }

     //getHomeServicesApi 

export const getHomeServicesAPI =async()=>{
    return await commonApi("GET",`${SERVER_URL}/home-services`,{})
}

//allServiceAPI 

export const allServicesAPI=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/all-services`,{},reqHeader)
}   

//updateServicesAPI 
export const updateServicesAPI=async(id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/services/${id}/edit`,reqBody,reqHeader)
}


//removeservice
export const deleteServiceAPI=async(id,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/services/${id}/remove`,{},reqHeader)
}






//addteachersAPI


export const addTeachersAPI = async (reqBody,reqHeader)=>{
    return await commonApi("POST",`${SERVER_URL}/add-teachers`,reqBody,reqHeader)
    
    
    }

     //getHomeTeachersApi 

export const getHomeTeachersAPI =async()=>{
    return await commonApi("GET",`${SERVER_URL}/home-teachers`,{})
}

//allTeachersAPI 
export const allTeachersAPI=async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/all-teachers`,{},reqHeader)
}


//updateTeachersAPI 
export const updateTeachersAPI = async (id, reqBody, reqHeader) => {
    return await commonApi("PUT", `${SERVER_URL}/teachers/${id}/edit`, reqBody, reqHeader);
  };
  

  //removeteachers
export const deleteTeachersAPI=async(id,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/teachers/${id}/remove`,{},reqHeader)
}

//updateAdminAPI 
export const updateSettingsAPI = async (id, reqBody, reqHeader) => {
    return await commonApi("PUT", `${SERVER_URL}/admin/${id}/edit`, reqBody, reqHeader);
  };


  //chatbox usermessage
  
  export const usermessageAPI = async (reqBody) => {
    return await commonApi("POST", `${SERVER_URL}/sendmessage`, reqBody);
  };


  export const adminreplyAPI = async (messageId,reqBody, reqHeader) => {
    return await commonApi("POST", `${SERVER_URL}/replymessage/${messageId}`, reqBody, reqHeader);
  };
  
  export const allMessagesAPI = async (reqHeader) => {
    return await commonApi("GET", `${SERVER_URL}/messages`, {},reqHeader);
  };


   //removemessage
export const deleteMessageAPI=async(messageId,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/deleteMessage/${messageId}`,{},reqHeader)
}




  


