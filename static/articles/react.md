在 **Next.js** 中读取某个文件夹里的所有文件，通常是在服务端（如 `getStaticProps` 或 `getStaticPaths`）执行的，这样可以在构建时动态获取内容列表，比如 Markdown 或 JSON 文件：

---

## 如何实现：使用 `fs` 模块读取目录内容（服务端）

你可以这样写：

```js
import fs from 'fs'
import path from 'path'

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'posts')  // 假设你的文件都在项目根的 posts 文件夹
  const filenames = fs.readdirSync(postsDir)         // 同步读取目录下所有文件名

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename)
    const content = fs.readFileSync(filePath, 'utf-8')      // 读取文件内容
    return { filename, content }
  })

  return { props: { posts } }
}
```

这里，`process.cwd()` 会指向项目的根目录，是推荐方式，比使用 `__dirname` 更稳定 ([nextjs.zcopy.site][1], [GitHub][2])。

---

## 如果你使用的是 App Router（Next.js 13+）

你可以在 `generateStaticParams` 或 `generateMetadata` 中类似使用：

```js
import fs from 'fs/promises'
import path from 'path'

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'articles')
  const files = await fs.readdir(dir)
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ''),
  }))
}
```

---

## 社区经验分享

> “Use a simple node script to read the directory and count files, and call that in `getStaticProps`” —— 也有开发者在 Reddit 推荐这种做法。([Reddit][3])

同时，使用文件系统读取成千上百个文件确实可能影响构建时间，建议在必要时搭配 ISR（增量静态生成）优化构建性能 ([Reddit][4])。

---

## 总结方法对照表

| 场景                   | 推荐方式                                                           |
| -------------------- | -------------------------------------------------------------- |
| Pages Router 中读取文件列表 | 在 `getStaticProps` 使用 `fs.readdirSync` 或 `fs.promises.readdir` |
| 使用 App Router + 动态参数 | 在 `generateStaticParams` 中读取目录并生成参数                            |
| 构建性能关注               | 可考虑 ISR 或懒加载生成路径来优化性能                                          |

---

如果你能告诉我你的使用场景，比如你要读取的是 Markdown、JSON，还是图片文件，或者你使用的是 Pages 还是 App Router，我可以给你一个更贴合你项目的代码方案。

[1]: https://nextjs.zcopy.site/docs/basic-features/data-fetching?utm_source=chatgpt.com "Basic Features: Data fetching | Next.js"
[2]: https://github.com/talentdevl/NEXT/blob/main/docs/basic-features/data-fetching.md?utm_source=chatgpt.com "NEXT/docs/basic-features/data-fetching.md at main · talentdevl/NEXT · GitHub"
[3]: https://www.reddit.com/r/nextjs/comments/j6obsf?utm_source=chatgpt.com "How to count files inside the public folder?"
[4]: https://www.reddit.com/r/nextjs/comments/113gzil?utm_source=chatgpt.com "Using getStaticProps with thousands of md files"
