import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
   const data = await prisma.event.findMany({
      // where: { organizerId:req.body.userId},
      // include:{
      //    User:true
      // }
   })
   res.status(200).json(data);
 }
