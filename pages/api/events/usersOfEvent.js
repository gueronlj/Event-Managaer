import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
   const data = await prisma.event.findFirst({
      where: {id: 1},
      include:{
         User:true
      }
   })
   res.status(200).json(data);
 }
