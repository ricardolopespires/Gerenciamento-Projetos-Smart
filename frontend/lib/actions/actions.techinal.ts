import AxiosInstance from "@/services/AxiosInstance";
import { parseStringify } from "../utils";
import { notificationsCreated } from "./actions.notications";


export const getListTechnical = async()=>{
    try {

        const res = await AxiosInstance.get(`/api/v1/technical/list/`); 
        return res.data
        } catch (error: any) {
        return {
            status: error.response?.status || 500,
        }
    }

}







// Função principal para atualizar os dados técnicos
export const updateTechnical = async ({ assets = [] }) => {
    const results = [];
   
    for (const asset of assets) {
        try {
            // Executar todas as verificações de tendência em paralelo
            const [existingTrend4H, existingTrend1D, existingTrend1W] = await Promise.all([
               
                trendFollowers1D({ asset}),
                trendFollowers1W({ asset })
            ]);

            // Aqui você pode usar os resultados de `existingTrend4H`, `existingTrend1D`, `existingTrend1W`
            // para realizar outras ações, como criar novos sinais de tendência se necessário.

        } catch (error) {
            results.push({
                id: asset.id,
                symbol: asset.symbol,
                status: 'not_found',
                errorStatus: error.response?.status || 500,
            });
            console.error(`Error processing asset ${asset.symbol}:`, error);
        }
    }

    return results;
};

export const trendFollowers4H = async ({ assets = [] }) => {      
  try {
    const results = []; // Array para armazenar os resultados

    // Itera sobre todos os ativos
    for (const asset of assets) {
      try {
        // Faz a requisição para o servidor
        const res = await AxiosInstance.get(`/api/v1/technical/trendfollowers/${asset.symbol}/4h/timeframe/`);
  
        // Verifica se a resposta foi bem-sucedida e se há dados
        if (res.status === 200 && res.data && res.data.length > 0) {      
            if(res.data[0]?.signal != asset.signal_4h){
                console.log("Sinal diferente, precisa ser atualizado");
              const res = await updatedTrendFollower(
                { 
                  symbol:asset.symbol,
                  timeframe:'4h',
                  signal:asset.signal_4h,
                  price:asset.current_price
                }
              );
         
          continue; // Pula para o próximo ativo sem fazer nada
        }
        
        }else if (res.status === 200 && res.data && res.data.length == 0) {

          const res = await AxiosInstance.post(`/api/v1/technical/trendfollowers/`, {
            symbol: asset.symbol,
            timeframe: '4h',
            days: 0,
            price: asset.current_price,
            signal:asset.signal_4h,
            is_active: true
          });

        } else if (res.status === 404 || res.status === 500) {
          // Aqui poderia adicionar uma lógica caso o status seja 404 ou 500, se necessário
          console.warn(`Erro no asset ${asset.symbol}: Status ${res.status}`);
        }
      } catch (error) {
        // Loga o erro caso ocorra durante a requisição
        console.error(`Erro ao fazer request para o asset ${asset.symbol}:`, error);
      }
    }

    // Retorna os resultados após a execução do loop
    return results.length > 0 ? results : null;

  } catch (error) {
    // Loga o erro caso ocorra um erro geral
    console.error("Erro ao verificar trend followers:", error);
    return null;
  }
};



export const getTrendFollowings = async ({ symbol, timeframe }) => {
  try {
        const res = await AxiosInstance.get(`/api/v1/technical/trendfollowers/${symbol}/${timeframe}/timeframe/`);
        
        return res.data; // A resposta já é estruturada, então retornamos apenas os dados

  } catch (error) {
    // Melhor tratamento de erro com mensagem clara
    return { status: 400, message: error.message || "Erro ao buscar os dados" };
  }
};


export const trendFollowers1D = async ({ assets = [] }) => {    
  try {
    const results = []; // Array para armazenar os resultados

    // Itera sobre todos os ativos
    for (const asset of assets) {


      try {
        // Faz a requisição para o servidor
        const res = await AxiosInstance.get(`/api/v1/technical/trendfollowers/${asset.symbol}/1d/timeframe/`);       
      
        // Verifica se a resposta foi bem-sucedida e se há dados
        if (res.status === 200 && res.data && res.data.length > 0) {
           if(res.data[0].signal != asset.signal_1d){
                const res = await updatedTrendFollower(
                { 
                  symbol:asset.symbol,
                  timeframe:'1d',
                  signal:asset.signal_1d,
                  price:asset.current_price
                }
              );
            }
       
          results.push(res.data[0]); // Adiciona o primeiro registro ao array de resultados        
        }else if (res.status === 200 && res.data && res.data.length == 0) {

          const res = await AxiosInstance.post(`/api/v1/technical/trendfollowers/`, {
            symbol: asset.symbol,
            name: asset.name,
            img:asset.image,
            timeframe: '1d',
            days: 0,
            price: asset.current_price,
            signal:asset.signal_1d,
            is_active: true
            });

    

        } else if (res.status === 404 || res.status === 500) {
          // Aqui poderia adicionar uma lógica caso o status seja 404 ou 500, se necessário
          console.warn(`Erro no asset ${asset.symbol}: Status ${res.status}`);
        }
      } catch (error) {
        // Loga o erro caso ocorra durante a requisição
        console.error(`Erro ao fazer request para o asset ${asset.symbol}:`, error);
      }
    }

    // Retorna os resultados após a execução do loop
    return results.length > 0 ? results : null;

  } catch (error) {
    // Loga o erro caso ocorra um erro geral
    console.error("Erro ao verificar trend followers:", error);
    return null;
  }
};


export const trendFollowers1W = async ({ assets = [] }) => {    
  try {
    const results = []; // Array para armazenar os resultados

    // Itera sobre todos os ativos
    for (const asset of assets) {
      try {
        // Faz a requisição para o servidor
        const res = await AxiosInstance.get(`/api/v1/technical/trendfollowers/${asset.symbol}/1w/timeframe/`);      
    
        // Verifica se a resposta foi bem-sucedida e se há dados
        if (res.status === 200 && res.data && res.data.length > 0) {

              if(res.data[0].signal != asset.signal_1w){
          const res = await updatedTrendFollower(
            { 
              symbol:asset.symbol,
              timeframe:'1w',
              signal:asset.signal_1w,
              price:asset.current_price
            });
        
            }          
          results.push(res.data[0]); // Adiciona o primeiro registro ao array de resultados
        
        }else if (res.status === 200 && res.data && res.data.length == 0) {

          const res = await AxiosInstance.post(`/api/v1/technical/trendfollowers/`, {
            symbol: asset.symbol,
             name: asset.name,
            img:asset.image,
            timeframe: '1w',
            days: 0,
            price: asset.current_price,
            signal:asset.signal_1w,
            is_active: true
          });

          

        } else if (res.status === 404 || res.status === 500) {
          // Aqui poderia adicionar uma lógica caso o status seja 404 ou 500, se necessário
          console.warn(`Erro no asset ${asset.symbol}: Status ${res.status}`);
        }
      } catch (error) {
        // Loga o erro caso ocorra durante a requisição
        console.error(`Erro ao fazer request para o asset ${asset.symbol}:`, error);
      }
    }

    // Retorna os resultados após a execução do loop
    return results.length > 0 ? results : null;

  } catch (error) {
    // Loga o erro caso ocorra um erro geral
    console.error("Erro ao verificar trend followers:", error);
    return null;
  }
};


type UpdateTrendFollowerParams = {
  symbol: string;
  timeframe: string;
  signal: string;
  price: number;
};





export const updatedTrendFollower = async ({ symbol, timeframe, signal, price }: UpdateTrendFollowerParams) => {
  try {
    const res = await AxiosInstance.patch(`/api/v1/technical/trendfollowers/${symbol}/${timeframe}/timeframe/`, {
      signal,
      price,
    });

 
    if (res.status === 200) {
      // Timeframes legíveis
      const timeframeLabels: Record<string, string> = {
        '4h': '4 horas',
        '1d': 'diário',
        '1w': 'semanal',
      };

      const periodo = timeframeLabels[timeframe] || timeframe;

      // Capitaliza o sinal, ex: "compra" => "Compra"
      const formattedSignal = signal.charAt(0).toUpperCase() + signal.slice(1).toLowerCase();

      // Notificação
      await notificationsCreated({
        title: `Sinal de ${formattedSignal} detectado para ${symbol} (${periodo})`,
        message: `O ativo ${symbol} apresentou um sinal de ${formattedSignal} no período ${periodo}, ao preço de R$ ${price}. Avalie as condições do ativo antes de realizar qualquer operação.`,
        notification_type: "alert",
      });
    }

    return res.data;

  } catch (error: any) {
    return { status: 400, message: error.message || "Erro ao buscar os dados" };
  }
};
