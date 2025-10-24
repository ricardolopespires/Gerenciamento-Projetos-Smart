import AxiosInstance from "@/services/AxiosInstance"
import axios from "axios";
/**
 * Função de espera (delay)
 * @param ms Tempo em milissegundos
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Busca dados de países e aguarda após a resposta
 */
export const getApiEconomicList = async () => {
  try {
    const response = await AxiosInstance.get('/api/v1/economic/countries/');
    console.log("Dados de países recebidos, aguardando...");

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os dados dos países:", error);
    throw error;
  }
};


export const getApiEconomicId = async ({ Id }: { Id: string }) => {
  try {
    const response = await axios(`https://restcountries.com/v3.1/alpha/${Id}`);
    if (!response.data || !response.data[0]) {
      throw new Error(`No country found for ID: ${Id}`);
    }
    return response.data[0];
  } catch (error) {
    console.error("Erro ao buscar os dados dos países:", error);
    throw error;
  }
};