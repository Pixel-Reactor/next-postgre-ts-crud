import { connection } from "@/utils/database";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const response = await connection.query("SELECT * FROM tasks");
        console.log(response.rows)
        return res.status(200).json(response.rows);
      } catch (error: any) {
        return res.status(400).json(error.message);
      }

    case "POST":
      try {
        const { title, description } = body;
        const response = await connection.query(
          "INSERT INTO tasks(title,description) VALUES ($1,$2) RETURNING *",
          [title, description]
        );
        return res.status(200).json(response.rows[0]);
      } catch (error) {
        console.log(error);
        return res.status(400).json({message:'Task save failed'});
      }

    case "DELETE":
      try {
        return res.status(200).json({message:"deleting tasks"});
    } catch (error) {
      return res.status(400).json({message:'Task delete failed'});
    }
     

    default:
      res.status(400).json({message:"invalid method"});
      break;
  }
};
