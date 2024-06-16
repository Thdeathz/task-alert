import { faker } from '@faker-js/faker'
import { Tag, User } from '@prisma/client'

type TaskFactory = {
  title: string
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
    const dueDate = faker.date.future()
    const tagId = faker.helpers.arrayElement(tags).id
    const userId = users.find((user) => user.role === 'USER')?.id ?? ''

    tasks.push({ title, description, dueDate, tagId, userId })
  })

  return tasks
}

export default taskFactory
