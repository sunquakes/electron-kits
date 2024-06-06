---
lang: zh-CN
title: 页面
---

## 路由和菜单

在`src/router/index.ts`文件中定义。

### 关于`Meta`属性

| 名称   | 类型        | 描述                                  |
| ------ | ----------- | ------------------------------------- |
| isMenu | `boolean`   | 当值为`true`时，路由会展示在菜单中。  |
| title  | `string`    | 菜单的名称，用 i18n 文件中的 key 值。 |
| icon   | `Component` | 菜单展示的图标组件。                  |

### 更多关于 Vue Router

[Vue Router](https://router.vuejs.org/zh/guide/)
