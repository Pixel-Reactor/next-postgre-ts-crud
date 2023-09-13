import { NextApiRequest,NextApiResponse } from "next"
import { connection } from "../../utils/database"


type Data = {
  message:string,
  time:string
}

//type Data es lo que va a devolver el res.json({})

export default async (req:NextApiRequest,res:NextApiResponse<Data>)=>{
  
  const response =await connection.query('SELECT NOW()');

  return res.json({message:'pong',time:response.rows[0].now})
}