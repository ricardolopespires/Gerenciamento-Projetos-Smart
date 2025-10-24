
import AxiosInstance from "@/services/AxiosInstance";
import { parseStringify } from "../utils";
import { getUserInfo } from "./actions.user";



export const postBuyOperations = async (params: OperationParams) => {
    try {
      const { data } = await AxiosInstance.post('/operations/buy', params);
      return data;
    } catch (error) {
      console.error('Erro ao criar operação de compra:', error);
      throw new Error('Falha ao criar operação de compra.');
    }
  };
  
  export const postSellOperations = async (params: OperationParams) => {
    try {
      const { data } = await AxiosInstance.post('/operations/sell', params);
      return data;
    } catch (error) {
      console.error('Erro ao criar operação de venda:', error);
      throw new Error('Falha ao criar operação de venda.');
    }
  };
  
  export const postCloseOperations = async ({ticket, UserId}) => {

    const user = await getUserInfo({userId:UserId})    

    try {   
      const  res = await AxiosInstance.post(`/api/v1/transactions/operations/close/${user[0].id}/`, {"ticket":ticket});  
      return res;
    } catch (error) {
      console.error('Erro ao fechar operação:', error);
      throw new Error('Falha ao fechar operação.');
    }
  };


export const postCreatedOperations = async (params: OperationParams) => {
  try {
    const { type, asset, quantity, price, userId } = params;

    // Lista de tipos de ordens válidos
    const validTypes = ['Market', 'Buy Limit', 'Sell Limit', 'Buy Stop', 'Sell Stop'];

    // Validação dos dados
    if (!validTypes.includes(type)) {
      throw new Error(`Tipo de operação inválido. Use um dos seguintes: ${validTypes.join(', ')}`);
    }

    if (!asset || quantity <= 0 || price <= 0 || !userId) {
      throw new Error('Dados da operação incompletos ou inválidos.');
    }

    // Mapear tipo de ordem para endpoint
    const endpointMap: Record<string, string> = {
      'Market': '/operations/market',
      'Buy Limit': '/operations/buy-limit',
      'Sell Limit': '/operations/sell-limit',
      'Buy Stop': '/operations/buy-stop',
      'Sell Stop': '/operations/sell-stop',
    };

    const endpoint = endpointMap[type];

    // Requisição à API
    const { data } = await AxiosInstance.post(endpoint, params);

    return {
      success: true,
      operation: data,
      message: `Operação do tipo "${type}" criada com sucesso.`,
    };
  } catch (error) {
    console.error('Erro ao criar operação:', error);
    throw new Error('Falha ao criar operação. Tente novamente.');
  }
};




  export const postInversorOperations = async ({ ticket, UserId }) => {
    if (!ticket || !UserId) {
      throw new Error('Ticket and UserId are required');
    }
  
    try {
      const user = await getUserInfo({ userId: UserId });
  
      if (!user || !user[0]?.id) {
        throw new Error('User not found or invalid');
      }
  
      const { data: currentOperation } = await AxiosInstance.post(
        `/api/v1/transactions/operations/reverse/${user[0].id}/`,
        { ticket }
      );
  
      return currentOperation;
    } catch (error) {
      console.error('Error in postInversorOperations:', error);
      throw new Error('Failed to process operation');
    }
  };




// @/lib/actions/actions.operations.ts

import { Trade } from "@/components/TradeForm" // ajuste o path conforme necessário

export const operations = async (trade: Omit<Trade, "id">) => {

  console.log(trade)
  try {
    // Aqui você pode usar fetch/axios ou salvar localmente, dependendo do contexto
    const response = await fetch("/api/trades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trade),
    })

    if (!response.ok) {
      throw new Error("Erro ao salvar a operação")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Erro ao enviar operação:", error)
    throw error
  }
}
