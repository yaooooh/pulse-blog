在使用 **Turbopack** 的情况下，通过 `import` 加载 Markdown 文件（如 `.md` 或 `.mdx`）依旧是可行的，但需要注意以下几点：

---

## 如何在 Turbopack 中加载 Markdown 文件

### 1. 使用 `@next/mdx` 插件（推荐方案）

你仍然可以使用 Next.js 官方提供的 `@next/mdx` 插件来支持 `.md` 和 `.mdx` 文件。以下是一个基本配置示例，适用于 Turbopack：

```js
// next.config.mjs 或 next.config.ts
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js','jsx','ts','tsx','md','mdx'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],  // 可填写插件名称
  },
})

export default withMDX(nextConfig)
```

如果你使用的是 Turbopack，并想加插件，需升级到最新版本的 `@next/mdx`，并用字符串形式指定插件名称。例如：

```js
rehypePlugins: [['rehype-katex', { strict: true, throwOnError: true }]]
```

注意：**Turbopack 暂不支持传递 JavaScript 函数作为插件选项**，因为 Rust 无法序列化 JavaScript 函数。([Next.js][1], [Next.js 中文网][2])

---

### 2. 使用 `raw-loader` 作为 Markdown 源文件字符串

如果你的需求只是以字符串方式导入 `.md` 文件，而不是渲染为 React 组件，也可以使用 `raw-loader`。Turbopack 支持部分 webpack loader，其中就包括 `raw-loader`。你可以在 `next.config.js` 中这样配置：

```js
module.exports = {
  turbopack: {
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
}
```

这允许你通过如下方式导入 Markdown 文件内容：

```js
import content from './example.md';
console.log(content); // Markdown 内容作为字符串
```

([Next.js][3])

---

## 额外注意事项

* **Webpack 的 `webpack()` 配置不适用于 Turbopack**，你必须使用 `turbopack.rules` 而非 `webpack()` 来添加 loader。([Fossies][4], [Next.js][3])
* Markdown 渲染工具如 `markdown-it` 在 Turbopack 构建中可能出现 `isSpace is not defined` 的错误。这是已知问题，可通过 pin 版本（如使用 markdown‑it\@13.0.2）、补丁或使用 CommonJS 路径绕过。([Viao][5])
* 如果你有使用不可序列化的 remark 或 rehype 插件，目前在 Turbopack 中会受到限制，需等待未来支持。([Next.js 中文网][2], [Next.js][1])

---

## 总结

| 需求类型                         | 推荐处理方式                                  |
| ---------------------------- | --------------------------------------- |
| 作为 React 组件渲染 `.md` 或 `.mdx` | 使用 `@next/mdx` 并在 `next.config.mjs` 中配置 |
| 以字符串形式加载 Markdown 文件         | 使用 `raw-loader` 通过 `turbopack.rules` 配置 |
| 想使用 remark/rehype 插件         | 升级 `@next/mdx` 并确认插件选项可序列化，或暂时跳过        |

如果你能进一步说明你的目标：比如“渲染页面内容”“仅获取字符串”“使用哪些插件”等，我可以帮你定制更具体的配置示例！

[1]: https://nextjs.org/docs/app/building-your-application/configuring/mdx?utm_source=chatgpt.com "Configuring: MDX | Next.js"
[2]: https://next.nodejs.cn/docs/app/building-your-application/configuring/mdx/?utm_source=chatgpt.com "Markdown 和 MDX | Next.js 中文网"
[3]: https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack?utm_source=chatgpt.com "next.config.js: turbopack | Next.js"
[4]: https://fossies.org/linux/next.js/docs/03-architecture/turbopack.mdx?utm_source=chatgpt.com "Next.js: docs/03-architecture/turbopack.mdx | Fossies"
[5]: https://viao.co.uk/blog/markdown-it-errors-with-turbopack?utm_source=chatgpt.com "Markdown-it Errors With Turbopack And Not Without. Getting Is IsSpace Is Not Defined"
