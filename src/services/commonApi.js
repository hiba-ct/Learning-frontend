import axios from 'axios';

export const commonApi = async (httpMethod, url, reqBody, reqHeader) => {
  
  const reqConfig = {
    method: httpMethod,
    url,
    data: reqBody, // Use reqBody as the data
    headers: reqHeader ?reqHeader: { "Content-Type": "application/json" } // Corrected Content-Type header
  };
return await axios(reqConfig).then(res=>{
  return res
}).catch(err=>{
  return err
})
  
};

export default commonApi;
