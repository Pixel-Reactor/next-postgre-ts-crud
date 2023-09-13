import { NextApiRequest, NextApiResponse } from "next"
import { connection } from "@/utils/database";
export default async(req:NextApiRequest,res:NextApiResponse)=>{
   const {method,query,body}= req;
   switch (method) {
    case "GET":
      try {
        const response = await connection.query('SELECT * FROM tasks WHERE id=$1',[query.id]);
        if(response.rows.length){
          return res.status(200).json(response.rows[0]);
        }else{
          return res.status(404).json({message:'tarea no encontrada'})
        }
        
      } catch (error) {
        return res.status(500).json({message:'Problemas con el servidor'})
      }
    
      case "PUT":
       
         try { 
         
          const {title,description,done} = body;
          console.log('put',title,description,done)
          const response = await connection.query('UPDATE tasks SET title=$1,description=$2 ,done=$3 WHERE  id=$4 RETURNING *',[title,description,done,query.id]);
          if(response.rows.length){
            return res.status(200).json(response.rows[0]);
          }else{
            return res.status(404).json({message:'tarea no encontrada'})
          }
          
        } catch (error) {
          return res.status(500).json({message:'Problemas con el servidor'})
        }


      case "DELETE": try {
       
        const response = await connection.query('DELETE FROM tasks WHERE id=$1',[query.id]);
        if(response.rowCount > 0){
          return res.status(200).json({message:'tarea eliminada correctamente'});
        }else{
          return res.status(404).json({message:'tarea no encontrada'})
        }
        
      } catch (error) {
        return res.status(500).json({message:'Problemas con el servidor'})
      }
    default:
        return res.status(400).json('method not allowed')
    
   }
}
  