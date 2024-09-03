import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { tags, categories, users, images, imageTags } from './seed_data'

async function main() { 
  await prisma.tagCategory.createMany({
    data: categories
  });
  
  await prisma.tag.createMany({
    data: tags
  });

  await prisma.user.createMany({
    data: users
  })

  await prisma.image.createMany({
    data: images
  })

  await prisma.imageTag.createMany({
    data: imageTags
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })