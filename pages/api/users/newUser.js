import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
   try{
     const prisma = new PrismaClient()
     const user = await prisma.user.create({
       data: {
         ...req.body
       },
     })
     res.json(user)
   } catch (err) {
     console.log(err)
   }
}
