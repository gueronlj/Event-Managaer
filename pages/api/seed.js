import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {
   const data = await prisma.user.create({data:{  
      name: 'Test',
      email: 'test@gmail.com',
   }})
   console.log(data)
   res.json(data)   
}
