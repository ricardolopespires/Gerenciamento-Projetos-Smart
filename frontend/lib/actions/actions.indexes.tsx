import { parseStringify } from "../utils";
import AxiosInstance from "@/services/AxiosInstance"
import { getUserInfo } from "./actions.user";
import { trendFollowers1D, trendFollowers1W, trendFollowers4H } from "./actions.techinal";
import { recommendationsCreated } from "@/lib/actions/actions.recommendations";






export const getAssetsIndexes = async({UserId})=>{

        try{
            const user = await getUserInfo({userId:UserId});
            const res = await AxiosInstance.get(`/api/v1/assets/indices/${user[0].id}/list/`)

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

