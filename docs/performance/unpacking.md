---
outline: deep
title: 'React 拆包分包'
---

React.lazy 和 Suspense 是 React 提供的用于实现懒加载（代码拆分）和异步渲染的工具，主要用于减少初次渲染时的 JavaScript 负担，并优化性能。

## 1. React.lazy

React.lazy 是一个用于懒加载组件的函数。它接受一个函数，该函数返回一个动态导入的 Promise。只有在需要的时候（即组件渲染时），它才会异步加载对应的组件。

语法：

```js
const MyComponent = React.lazy(() => import('./MyComponent'))
```

- React.lazy 将组件的加载过程异步化，在需要使用该组件时才会触发加载，而不是在应用启动时就加载所有组件。
- 它返回一个 React 组件，当该组件渲染时，React 会动态加载它。

  例子：

```jsx
import React, { Suspense } from 'react'

// 使用 React.lazy 懒加载组件
const Dashboard = React.lazy(() => import('./Dashboard'))
const UserModule = React.lazy(() => import('./UserModule'))

function App() {
  return (
    <div>
      <h1>欢迎使用管理系统</h1>
      <Suspense fallback={<div>加载中...</div>}>
        <Dashboard />
        <UserModule />
      </Suspense>
    </div>
  )
}

export default App
```

## 2. Suspense

Suspense 是一个 React 组件，用于处理懒加载组件的加载状态。它需要传入一个 fallback 属性，这个属性指定在等待懒加载组件加载时显示的内容。

- fallback 是一个 React 元素，表示在异步加载组件时渲染的内容。通常用于显示一个加载提示，比如旋转的加载图标、文字等。
- 语法：

```jsx
<Suspense fallback={<div>加载中...</div>}>
  <LazyComponent />
</Suspense>
```

工作原理：

- 当 LazyComponent 组件尚未加载完时，Suspense 会显示 fallback 传入的内容。
- 一旦 LazyComponent 加载完成并渲染时，Suspense 会自动替换 fallback，并渲染懒加载的组件。

**例子：**

```jsx
import React, { Suspense } from 'react'

// 使用 React.lazy 动态导入组件
const Dashboard = React.lazy(() => import('./Dashboard'))

function App() {
  return (
    <div>
      <h1>欢迎使用管理系统</h1>

      {/* Suspense 包裹懒加载的组件 */}
      <Suspense fallback={<div>加载中...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  )
}

export default App
```

在上面的例子中，Dashboard 组件会在实际渲染时懒加载。如果 Dashboard 组件还没有加载完成，Suspense 会展示 "加载中..." 字样，一旦加载完成，Dashboard 组件将会被显示。

## 3. 如何搭配使用 React.lazy 和 Suspense

通常，React.lazy 用于懒加载具体的 React 组件，而 Suspense 用于包装懒加载组件的显示和加载状态。它们的关系如下：

1. React.lazy：定义懒加载的组件。
2. Suspense：包裹懒加载的组件，并定义加载时的显示内容（fallback）。

这样，只有在懒加载组件被实际渲染时，才会触发它的加载操作，从而实现了按需加载，提高了应用的性能。

完整例子：

```jsx
import React, { Suspense } from 'react'

// 使用 React.lazy 懒加载模块
const Dashboard = React.lazy(() => import('./Dashboard'))
const UserModule = React.lazy(() => import('./UserModule'))

function App() {
  return (
    <div>
      <h1>欢迎使用管理系统</h1>

      {/* Suspense 包裹懒加载组件，并提供加载中的占位内容 */}
      <Suspense fallback={<div>加载中...</div>}>
        <Dashboard />
      </Suspense>

      <Suspense fallback={<div>加载用户模块...</div>}>
        <UserModule />
      </Suspense>
    </div>
  )
}

export default App
```

- Suspense 会在 Dashboard 或 UserModule 组件懒加载时，显示指定的 fallback 内容，直到对应的组件被加载并渲染出来。

## 4. 延迟加载多个模块

假设你有多个路由模块（例如 Dashboard、UserModule、DepartmentModule 等），你可以使用 React.lazy 配合 Suspense 实现按需加载：

```jsx
import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// 动态导入每个模块
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const UserModule = React.lazy(() => import('./pages/UserModule'))
const DepartmentModule = React.lazy(() => import('./pages/DepartmentModule'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>加载中...</div>}>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/users' element={<UserModule />} />
          <Route path='/departments' element={<DepartmentModule />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
```

- 当访问 / 路径时，Dashboard 组件会懒加载。
- 当访问 /users 路径时，UserModule 组件会懒加载。

## 5. 何时使用 Suspense 和 React.lazy

- 按需加载：当你希望减少初次加载时的 JavaScript 文件大小，提升应用性能时，可以使用 React.lazy 和 Suspense 来按需加载模块。
- 路由懒加载：在多页面应用中，你可以为每个页面配置懒加载，只有用户访问该页面时才加载相应的 JavaScript 文件。
- 分包优化：与打包工具（如 Vite、Webpack）结合，按需拆分应用代码，减小首次加载的文件大小，提高页面加载速度。

## 总结

- React.lazy：用于动态加载 React 组件，减少初始加载的体积。
- Suspense：用于包裹懒加载组件，显示加载状态的内容（fallback），直到懒加载的组件加载完成。
