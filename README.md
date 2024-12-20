# 项目部署地址
https://XingzhiY.github.io/stardew-sacrifice-tracker

# 说明
本人沉迷星露谷物语48小时有余，苦于记不住献祭物品，一直在游戏里反复开关背包检查，怕错过季节，因此做了个网站方便记录和筛选。
欢迎fork或者直接提pull request补全优化信息。


# 项目初始化与部署指南

本项目使用 React + TypeScript，并整合 Tailwind CSS，同时支持通过 GitHub Pages 进行部署。以下为详细步骤说明。

## 环境初始化

1. 创建 React 应用（使用 TypeScript 模板，并使用 npm）：
    ```bash
    npx create-react-app . --template typescript --use-npm
    npm install react@18 react-dom@18
    npm install
    ```

   **注意**：`index` 文件的 `import` 路径中需加上 `.tsx` 后缀。

2. 安装 Tailwind CSS：
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

## 部署到 GitHub Pages

1. 安装部署工具 `gh-pages`：
    ```bash
    npm install gh-pages --save-dev
    ```

2. 在 `package.json` 中添加部署配置（将 `homepage` 替换为你的 GitHub 用户名和仓库名）：
    ```json
    {
      "homepage": "https://XingzhiY.github.io/stardew-sacrifice-tracker",
      "scripts": {
        "predeploy": "npm run build",
        "deploy": "gh-pages -d build"
      }
    }
    ```

3. 执行部署：
    ```bash
    npm run deploy
    ```






# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
