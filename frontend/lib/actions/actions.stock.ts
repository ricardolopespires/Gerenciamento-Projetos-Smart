


import { parseStringify } from "../utils";
import { getAssetCryptos } from "./actions.crypto"
import AxiosInstance from "@/services/AxiosInstance"
import { getUserInfo } from "./actions.user";
import { trendFollowers1D, trendFollowers1W, trendFollowers4H } from "./actions.techinal";
import { recommendationsCreated } from "./actions.recommendations";






export const getAssetsStocks = async({UserId})=>{

        try{
            const user = await getUserInfo({userId:UserId});
            const res = await AxiosInstance.get(`/api/v1/assets/stocks/${user[0].id}/list/`)
            
               // Aguarda a execução de trendFollowers4H antes de retornar os dados
               await trendFollowers4H({ assets: res.data });
               await trendFollowers1D({ assets: res.data });
               await trendFollowers1W({ assets: res.data }); 
               await recommendationsCreated({  assets: res.data});             
          
            if(res.status === 200){        
                return res.data
            }else{
            return parseStringify({"status":400, "message":"Enviada com error"})
            }
        }catch{
            return parseStringify({"status":400, "message":"Enviada com error"})
        }

};




export const getTrendFollowingStocks = async({symbol, UserId})=>{


    try{
        const user = await getUserInfo({userId:UserId});
        const user_id = user[0].id

        const res = await AxiosInstance.get(`/api/v1/history/last-signal/${symbol}/stock/1d/${user_id}/`)  
        if(res.status === 200){        
            return res.data
        }else{
        return parseStringify({"status":400, "message":"Enviada com error"})
        }
    }catch{
        return parseStringify({"status":400, "message":"Enviada com error"})
    }

};




