import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

import { labels, priorities, statuses } from "./data"

const tasks = Array.from({ length: 100 }, () => ({
  id: `USB-${faker.number.int({ min: 1000, max: 9999 })}`,
  title: faker.company.catchPhrase().replace(/^./, (letter) => letter.toUpperCase()),
  status: faker.helpers.arrayElement(statuses).value,
  label: faker.helpers.arrayElement(labels).value,
  priority: faker.helpers.arrayElement(priorities).value,
  content: faker.lorem.paragraph(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  author: faker.person.fullName(),
  authorImage: faker.image.avatar(),
  upvotes: faker.number.int({ min: 0, max: 100 }),
}))

fs.writeFileSync(
  path.join(__dirname, "posts.json"),
  JSON.stringify(tasks, null, 2)
)

console.log("✅ Tasks data generated.")
