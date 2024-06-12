import prisma from './prismaClient'
import tagSeeder from './tag.seeder'
import taskSeeder from './task.seeder'
import userSeeder from './user.seeder'

async function seed() {
  const users = await userSeeder()

  const tags = await tagSeeder()

  await taskSeeder({ users, tags })
}

seed()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
