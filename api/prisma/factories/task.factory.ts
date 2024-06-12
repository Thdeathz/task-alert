import { faker } from '@faker-js/faker'
import { Tag, TaskType, User } from '@prisma/client'

type TaskFactory = {
  title: string
  type: TaskType
  description: string
  dueDate: Date
  tagId: string
  userId: string
}

type Props = {
  users: User[]
  tags: Tag[]
}

const taskFactory = async ({ users, tags }: Props) => {
  const tasks: TaskFactory[] = []

  Array.from({ length: 20 }).forEach(() => {
    const title = faker.lorem.words(3)
    const description = faker.lorem.paragraph()
    const type = faker.helpers.arrayElement(Object.values(TaskType))
    const dueDate = faker.date.future()
    const tagId = faker.helpers.arrayElement(tags).id
    const userId = users.find((user) => user.role === 'USER')?.id ?? ''

    tasks.push({ title, type, description, dueDate, tagId, userId })
  })

  return tasks
}

export default taskFactory
