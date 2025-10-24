import AxiosInstance from "@/services/AxiosInstance";
import { formatNumbers, parseStringify } from "../utils";
import { getUserInfo, UserGetStatus, UserUpdatedStatus } from "./actions.user";




export const getConsultants = async () => {

  const response = await AxiosInstance.get(`/api/v1/agents/investment-agents/`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch agents");
    }
    return response.data; 
}


export const getConsultId = async (id: string) => {
    const response = await AxiosInstance.get(`/api/v1/agents/investment-agents/${id}/`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch agent");
    }
    return response.data;
}

export const getManagers = async () => {

  const response = await AxiosInstance.get(`/api/v1/agents/investment-managers/`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch agents");
    }
    return response.data; 
}

export const getManagerId = async ({agentId}) => {
  
    const response = await AxiosInstance.get(`/api/v1/agents/investment-managers/${agentId}/`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch agent");
    }
    return response.data;
};



export const getRecommendations = async ({userId, asset}:RecommendationsProps) => {
  

    try{
        const user = await getUserInfo({userId:userId});

        console.log(user)
        console.log(asset)

        if(asset === "ação"){
            const response = await AxiosInstance.get(`/api/v1/assets/recommendations/${user[0].id}/stock/`);
            return response.data; 
        }else  if(asset === "commodities"){
            const response = await AxiosInstance.get(`/api/v1/assets/recommendations/${user[0].id}/commodities/`);
            return response.data; 
        }else  if(asset === "moeda"){
            const response = await AxiosInstance.get(`/api/v1/assets/recommendations/${user[0].id}/currency/`);
            console.log(response.data)
            return response.data; 
        }else  if(asset === "index"){
            const response = await AxiosInstance.get(`/api/v1/assets/recommendations/${user[0].id}/index/`);
            console.log(response.data)
            return response.data; 
        }
          

    }catch{
         return parseStringify({"status":500, "messages":" "})
    }

}


interface ApiResponse {
  success: boolean;
  response?: string;
  error?: string;
}

interface AskConsultantParams {
  question: string;
  agentId: string;
}

async function Consultant({ question, agentId }: AskConsultantParams): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/consultant/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, agent_id: agentId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending question to API:', error);
    return { success: false, error: 'Failed to get response from server' };
  }
}

export { Consultant };