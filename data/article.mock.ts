import { faker } from '@faker-js/faker'

// 套定种子，保证每次生成内容一致（可选）
faker.seed(12345)

// 文章模型接口，支持双语字段
export interface Article {
  /** 唯一 ID */
  id: string
  /** 多语言标题，属性名与 next-i18next locale 保持一致 */
  title: string
  /** 多语言描述或摘要 */
  description: string,
  content: string,
  /** ISO 日期字符串 */
  date: string
  /** 可选：作者 / 标签 / 类别等 */
  author?: string
  tags?: string[]
}

// 生成 30 篇文章
export const articlesMock: Article[] = Array.from({ length: 30 }).map((_, idx) => {
  const zhTitle = `文章标题 ${idx + 1}`
  const zhDesc  = `这是第 ${idx + 1} 篇文章的中文摘要，描述示例内容...`
  // 随机过去 90 天内日期
  const date = faker.date.recent({ days: 90 }).toISOString().split('T')[0]
  return {
    id: faker.string.uuid(),
    title: zhTitle,
    description: zhDesc,
    content: faker.lorem.sentences(100),
    date,
    author: faker.person.fullName(),
    tags: faker.helpers.uniqueArray(faker.word.adjective, 3).slice(0, 2),
  }
})

// 还可以导出一个函数版本，如果你更喜欢运行时生成：
export function makeArticles(count: number): Article[] {
  faker.seed( Math.round(Math.random() * 1e6) )
  return Array.from({ length: count }).map((_, idx) => {
    const a = faker.helpers.uniqueArray(faker.person.fullName, 1)[0]
    return {
      id: faker.string.uuid(),
      title: `文章 ${a}`,
      description: faker.lorem.sentences(2),
      content: faker.lorem.sentence(100),
      date: faker.date.recent({ days: 365 }).toISOString().substring(0, 10),
      author: a,
      tags: faker.helpers.uniqueArray(faker.word.noun, 2),
    }
  })
}

export const articleInfoMock: Article[] = Array.from({ length: 30 }).map((_, idx) => {
  const enTitle = faker.lorem.sentence(6)
  const enDesc = faker.lorem.sentences(2)
  const zhTitle = `文章标题 ${idx + 1}`
  const zhDesc = `这是第 ${idx + 1} 篇文章的中文摘要，描述示例内容...`
  const date = faker.date.recent({ days: 90 }).toISOString().split('T')[0]
  return {
    id: faker.string.uuid(),
    title: zhTitle,
    description: zhDesc,
    content: faker.lorem.sentence(100),
    date,
    author: faker.person.fullName(),
    tags: faker.helpers.uniqueArray(faker.word.adjective, 3).slice(0, 2),
  }
})
