import { parseStringify } from "../utils";
import { getAssetCryptos } from "./actions.crypto"
import AxiosInstance from "@/services/AxiosInstance"
import { getUserInfo } from "./actions.user";
import { trendFollowers1D, trendFollowers4H, trendFollowers1W } from "./actions.techinal";
import { recommendationsCreated } from "./actions.recommendations";




export const getAssetsCurrencies = async ({ UserId }) => {
  try {
    const user = await getUserInfo({ userId: UserId });

    // Faz a requisição para obter as moedas
    const res = await AxiosInstance.get(`/api/v1/assets/currencies/${user[0].id}/list/`);

    if (res.status === 200) {
      // Aguarda a execução de trendFollowers4H antes de retornar os dados
      await trendFollowers4H({ assets: res.data });
      await trendFollowers1D({ assets: res.data });
      await trendFollowers1W({ assets: res.data });
      await recommendationsCreated({  assets: res.data});

      return res.data; // Retorna os dados da requisição, após processar o trendFollowers4H
    } else {
      return parseStringify({ "status": 400, "message": "Enviada com erro" });
    }
  } catch (error) {
    // Logando o erro para facilitar o diagnóstico
    console.error("Erro ao obter as moedas de ativos:", error);
    return parseStringify({ "status": 400, "message": "Enviada com erro" });
  }
};


export const getAssetsCurrenciesId = async ({ id }) => {
  try {
    const res = await AxiosInstance.get(`/api/v1/assets/currencies/${id}/`);
    return res.data;
    } catch (error) {
    return {
        status: 400,
        message: "Enviada com erro"
    }
  }
};