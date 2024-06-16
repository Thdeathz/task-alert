import { Tag, User } from '@prisma/client'

import taskFactory from '../factories/task.factory'

import prisma from './prismaClient'

type Props = {
  users: User[]
  tags: Tag[]
}

const taskSeeder = async ({ users, tags }: Props) => {
  console.log('🌱 Seeding Tasks...')
  const tasksData = await taskFactory({
    users,
    tags,
  })

  const tasks = await Promise.all(
    tasksData.map(
      async (task) =>
        await prisma.task.create({
          data: {
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            tagId: task.tagId,
            userId: task.userId,
          },
        }),
    ),
  )

  console.log('🌱 Seeding Tasks completed!')

  return tasks
}

export default taskSeeder
