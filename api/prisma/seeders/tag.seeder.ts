import tagFactory from '../factories/tag.factory'

import prisma from './prismaClient'

const tagSeeder = async () => {
  console.log('🌱 Seeding Tags...')
  const tagsData = await tagFactory()

  const tags = await Promise.all(
    tagsData.map(
      async (tag) =>
        await prisma.tag.create({
          data: {
            title: tag.title,
            slug: tag.slug,
          },
        }),
    ),
  )

  console.log('🌱 Seeding Tags completed!')

  return tags
}

export default tagSeeder
