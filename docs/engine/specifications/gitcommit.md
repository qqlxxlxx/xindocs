---
outline: deep
---

# Git 提交规范

代码规范与最佳实践

- 代码风格和统一规范（Prettier、ESLint、styleLint）
- 规范提交信息（husky、lint-staged、commitlint、czg、cz-git ）

## Git 提交信息前缀

```plain
feat: 添加登录功能
fix: 修复用户个人资料保存问题
docs: 更新README.md
style: 调整CSS样式
refactor: 重构登录逻辑
test: 添加登录功能测试
chore: 更新依赖并修复bug
```

这个例子展示了一些常用的 Git 提交信息前缀，它们代表了提交的目的或类型：

- feat: 新功能 (feature)
- fix: 修补 bug
- docs: 文档 (documentation)
- style: 格式 (不影响代码运行的变动，如缩进、空格等)
- refactor: 重构（即不是新增功能，也不是修改 bug 的代码变动。例如，将一个复杂的函数拆分成多个小函数，或者将重复的代码块抽象成函数等。）
- perf: 性能优化（例如，通过算法优化减少计算量，或者通过缓存机制减少数据库访问次数等）
- test: 增加测试
- chore: 其他修改（如构建过程、依赖管理或辅助工具的变动等）
- ci：持续集成相关的更改

这些前缀可以被项目或团队约定，用于快速了解提交的目的和影响，有助于后续代码的维护和版本的管理。

## Git 提交规范配置

在前端项目中配置 Git 提交规范，可以通过一些工具和配置文件来自动化和规范化 Git 提交信息，确保团队成员遵循统一的提交规范。最常见的做法是使用 Commitlint 和 Husky，这两个工具能够帮助你在提交代码时自动检查提交信息是否符合规范。

在 Git 中使用 Husky 来配置提交前缀规范，你需要按照以下步骤操作：

1. 安装依赖

`npm install husky commitlint/config-conventional commitlint/cli --save-dev`

2. 初始化 husky：运行 npx husky install。
3. 添加 commitlint 配置文件：在项目根目录下创建.commitlintrc.json 文件，并配置规则。

以下是一个简单的.commitlintrc.json 配置示例，它定义了提交消息的类型规则(使用 Conventional Commits 规范来检查提交信息，例如类型（type）、作用（scope）和主题（subject）的规范。)：

```plain
{
  extends: ['@commitlint/config-conventional'],
}
```

4. 设置 commit message 的钩子：在 package.json 中添加 husky 的脚本（经测试这一步骤可省略）。

```JSON
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

5.  创建 Git 钩子

在 `.husky` 目录下创建一个 `commit-msg` 钩子，命令如下：

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"
```

这条命令的作用是，当提交信息生成时，Husky 会调用 Commitlint 检查提交信息。如果提交信息不符合规范，提交操作会被中止。

这样配置后，只要你使用 git commit 命令进行提交，Husky 会调用 Commitlint 工具检查你的提交信息是否符合.commitlintrc.json 中定义的规范。如果不符合规范，commit 将会被拒绝。

## 生成标准化规范化的 commit message

[cz-git](https://cz-git.qbb.sh/zh/guide/)

## Git 提交时自动修复代码

在前端项目中引入 `lint-staged` 来优化代码质量是一种常见做法，能够确保在提交代码时自动运行代码检查工具（如 ESLint、Prettier 等），并只对暂存的文件进行操作，从而提高开发效率并保持代码整洁。

下面是如何在前端项目中引入和配置 `lint-staged` 的步骤：

### 1. 安装依赖

首先，你需要安装一些必要的依赖，包括 `lint-staged` 和常用的代码检查工具（如 ESLint 和 Prettier）。假设你使用的是 npm 或 yarn。

`npm install --save-dev lint-staged husky eslint prettier eslint-config-prettier eslint-plugin-prettier stylelint`

- `lint-staged`: 负责在 Git 提交时运行 linters。
- `husky`: 用来在 Git 提交时执行钩子命令。
- `eslint`: 用来检查 JavaScript/TypeScript 代码。
- `prettier`: 用来格式化代码。
- `eslint-config-prettier`：禁用与 Prettier 冲突的 ESLint 规则，确保它们的配置不会相互干扰。
- `eslint-plugin-prettier`：将 Prettier 作为 ESLint 规则运行，确保格式化和代码质量的一致性。
- `eslint-plugin-vue`：可选，为 Vue 3 项目提供特定的 ESLint 规则，确保 Vue 代码的质量。

### 2. 配置 Husky

`husky` 用于在 Git 提交时触发 `lint-staged` 的操作。你需要在项目中启用 Husky 钩子。

初始化 Husky：

```bash
npx husky install
```

然后，在 `package.json` 中添加一个 `prepare` 脚本，这样在安装依赖时就能自动配置 Husky：

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

接着，创建一个 Git 钩子，在每次提交前执行 `lint-staged`：

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

这会在 `.husky` 文件夹下创建一个 `pre-commit` 钩子文件，内容类似如下：

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

### 3. 配置 lint-staged

在 `lint-staged.config.cjs` 中添加 `lint-staged` 配置，指定在提交时要对哪些文件执行哪些操作。

```javascript
// 对匹配的文件类型执行命令
module.exports = {
  // 自动修复 ESLint 检测到的代码问题，使用 Prettier 格式化代码
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [
    'prettier --write--parser json',
  ],
  'package.json': ['prettier --write'],
  '*.vue': ['eslint --fix', 'prettier --write', 'stylelint --fix'],
  '*.{scss,less,styl,html}': ['stylelint --fix', 'prettier --write'],
  '*.md': ['prettier --write'],
}
```

这个 `lint-staged` 配置文件的作用是在 Git 提交时自动运行代码修复和格式化任务。每种类型的文件都设置了适当的格式化和修复命令：

- 对 JavaScript、TypeScript 和 Vue 文件，运行 `eslint --fix` 和 `prettier --write`。
- 对样式文件（如 SCSS、LESS 和 CSS），运行 `stylelint --fix` 和 `prettier --write`。
- 对 JSON 和 Markdown 文件，使用 Prettier 进行格式化。
- 对 Vue 文件，除了格式化，还修复样式相关的错误。

通过这种配置，在开发过程中，你可以确保所有提交的代码都符合一致的风格和质量标准，从而提高代码的可维护性和一致性。

### 4. 配置 ESLint 和 Prettier

如果你还没有设置 ESLint 和 Prettier，可以按以下步骤进行配置：

#### 配置 ESLint

1. 安装 ESLint 配置：

```bash
npx eslint --init
```

2. 根据项目需求选择适合的 ESLint 配置。

#### 配置 Prettier

1. 在项目根目录创建 `.prettierrc` 文件，配置 Prettier 格式化规则。例如：

```json
{
  "singleQuote": true,
  "semi": false,
  "trailingComma": "es5"
}
```

2. 为了让 ESLint 和 Prettier 配合工作，推荐安装 `eslint-config-prettier` 和 `eslint-plugin-prettier`：

```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

在 ESLint 配置文件 `.eslintrc` 中添加 Prettier 的插件和配置：

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ]
}
```

这样，Prettier 会作为 ESLint 的一部分运行，确保代码风格一致性。

### 5. 测试

在配置好所有内容之后，你可以测试是否正常工作。尝试修改一个文件并使用 Git 提交：

```bash
git add .
git commit -m "test lint-staged"
```

如果一切配置正确，`lint-staged` 会在提交之前自动运行 ESLint 和 Prettier 来修复和格式化代码。

### 总结

通过以上步骤，你成功地将 `lint-staged` 和 `husky` 集成到前端项目中，并通过 ESLint 和 Prettier 自动修复和格式化代码。这种做法能够帮助你保持代码质量和风格的一致性，避免低质量的代码进入版本库。