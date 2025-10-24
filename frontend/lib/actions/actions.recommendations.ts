
import AxiosInstance from "@/services/AxiosInstance";
import { parseStringify } from "../utils";
import { getUserInfo } from "./actions.user";
import { getTrendFollowings } from "./actions.techinal";



export const recommendationsList = async()=>{


    try{
        const res = await AxiosInstance.get(`/api/v1/assets/recommendations/list/`)
        if(res.status == 200){
            return res.data
        }else{
            return parseStringify({"status":404,"message":res.message})
        }

    }catch{
        return parseStringify({"status":500, "message":"erro oa busacr os dados no servidor"})

    }

}







export const recommendationsCreated = async ({ assets = [] }) => {
  for (const asset of assets) {
    try {
      const [medium, long] = await Promise.all([
        getTrendFollowings({ symbol: asset.symbol, timeframe: "1d" }),
        getTrendFollowings({ symbol: asset.symbol, timeframe: "1w" }),
      ]);

      const mediumSignal = medium?.[0]?.signal;
      const longSignal = long?.[0]?.signal;
      const symbol = long?.[0]?.symbol;

      if (mediumSignal && longSignal && mediumSignal === longSignal && symbol) {
        try {
          const res = await AxiosInstance.get(`/api/v1/assets/recommendations/${symbol}/`);
          if (res.status === 200) {
            console.log(symbol, longSignal);
          }
        } catch (error) {
          // Se não existir, tenta criar uma nova recomendação
          await AxiosInstance.post(`/api/v1/assets/recommendations/list/`,
            {                
                "symbol": symbol,
                "name": asset.name,
                "sector": "Serviços Financeiros",
                "price": medium.price,
                "change": 40.0,
                "recommendation": mediumSignal,
                "target": "7.00",
                "analyst": "bot",
                "rating": 4.0,
                "image": asset.image,              
                "is_active": true
            }
          );
        }
      }
    } catch (error) {
      console.error(`Erro ao processar o ativo ${asset.symbol}:`, error.message);
    }
  }
};
