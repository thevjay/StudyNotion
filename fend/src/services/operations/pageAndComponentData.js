
import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector';
import {catalogData} from '../apis'

export const getCatalogaPageData = async(categoryId) => {
 
    
    const toastId=toast.loading("Loading...");
    let result=[];
    try{

        const response=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,
            {categoryId:categoryId,});
        
           console.log("Catalog page data response", response)

        if(!response?.data?.success){
            throw new Error("Could not Fetch Category Page Data")
        }

        result=response?.data;
    }
    catch(error){
        console.log("CATALOG PAGE DATA API ERROR...",error.response ? error.response.data:error)
        toast.error(error.message);
        result=error.response?.data
    }
    toast.dismiss(toastId);
    return result;
}


