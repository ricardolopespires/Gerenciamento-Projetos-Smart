import AxiosInstance from "@/services/AxiosInstance";
import { getUserInfo } from "./actions.user";
import { parseStringify } from "../utils";
import { getAssetsCurrenciesId } from "./actions.currency";
import { trendFollowers1D, trendFollowers1W, trendFollowers4H } from "./actions.techinal";



// Tipos para as respostas de tendências
interface TrendData {
  signal: string;
  price: number;
}

// Tipo para o retorno de cada timeframe (4h, 1d, 1w)
interface TrendResult {
  id: number;
  name: string;
  symbol: string;
  img:string;
  timeframe: string;
  signal: string;
  dia: number;
  price: number;
}

// Tipo para o objeto de resposta consolidado
interface TrendFollowingResponse {
  '4h': TrendResult;
  '1d': TrendResult;
  '1w': TrendResult;
}

// Tipo para os parâmetros da função getTrendFollowings
interface GetTrendFollowingParams {
  symbol: string;
}

// Tipo para o tratamento de erros
interface ErrorResponse {
  status: number;
  message: string;
}

// Função principal para obter as tendências, com base no tipo de ativo
export const getTrendFollowings = async ({
  symbol}: GetTrendFollowingParams): Promise<TrendData | ErrorResponse> => {
  try { 

    const  res = await AxiosInstance.get(`/api/v1/technical/trendfollowers/signals/check/${symbol}/`);
    return res.data;
   
  } catch (error: any) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    return { status: error.response ? error.response.status : 500, message: errorMessage || 'Erro ao buscar os dados' };
  }
};
