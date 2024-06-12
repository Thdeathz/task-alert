import { faker } from '@faker-js/faker'

type TagFactory = {
  title: string
  slug: string
}
const tagFactory = async () => {
  const tags: TagFactory[] = []

  Array.from({ length: 10 }).forEach(() => {
    const title = faker.word.noun()
    const slug = faker.helpers.slugify(title)

    tags.push({ title, slug })
  })

  return tags
}

export default tagFactory
