import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
   try {
      console.log(req.body.email)
      const prisma = new PrismaClient()
      const data = await prisma.user.findFirst(
         {
            where: { email: req.body.email },
            include: { Event: true }
         }
      )
      res.json(data)
      console.log(data)
   } catch (err) {
      console.log(err);
   }
}
