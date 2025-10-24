import { parseStringify } from "../utils";
import AxiosInstance from "@/services/AxiosInstance"
import { getUserInfo } from "./actions.user";
import { NotificationsCreatedprops } from "@/next-env";







export const getNotificationsList = async()=>{

        try{   
            const res = await AxiosInstance.get(`/api/v1/notifications/list/`)
            if(res.status === 200){        
                return res.data
            }else{
            return parseStringify({"status":400, "message":"Enviada com error"})
            }
        }catch{
            return parseStringify({"status":400, "message":"Enviada com error"})
        }

};


export const notificationsCreated = async({title, message, notification_type}:NotificationsCreatedprops)=>{


    try{
        const res = await AxiosInstance.post('api/v1/notifications/list/',{
            "title": title,
            "message": message,
            "is_read": false,
            "notification_type": notification_type,
            "read": false
            })
        if(res.status == 201){
            return res.data
        }else{
            return parseStringify({"status":404, "message":"Erro ao enviar a menssage"})
        }

    }catch{
        return parseStringify({
            "status":500,
            "message":"erro no servidor"
        })

    }
}


export const isReadNotification = async({id})=>{

    try{
        const res = await AxiosInstance.patch(`api/v1/notifications/${id}/`,{"is_read":true})
        if(res.status == 200){
            return res.status
        }else{
            return parseStringify({"status":res.status, "message":"erro no dados enviado"})
        }
    }catch{
        return parseStringify({"status":500, "message":"erro no servidor"})
}
};