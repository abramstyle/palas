# 目录结构

- Gaia
  - .bin
  - docs
  - lib
    - directories
    - templates
    - Gaia.js
    - template.js
    - tools.js
  - scripts
  - utils
  - .eslintrc
  - .gitignore
  - package.json
  - README.md

# 目录结构解释

## .bin
.bin目录下存放了命令行文件。主文件为 gaia.js。

## docs
docs 目录下存放了所有的文档。这里维护了所有开发过程中的文档。有新的文档也应该存放在此处。

## lib
Gaia 主目录，所有的业务相关代码都存放在此处。

### lib/directories
此处存放了gaia 创建新项目后的目录结构以及目录中的文件内容。

### lib/templates
此处存放了 gaia 创建后的项目的文件模板。

### lib/Gaia.js
gaia 主文件，所有的操作都应该使用 Gaia 类来进行操作。

### lib/template.js
gaia 模板解析器，用于处理 gaia 创建后的项目文件模板。

### lib/tools.js
一些工具方法，例如创建一些文件夹，创建一个文件等。

## scripts
脚本文件，一个命令执行后，由`./cli/gaia.js` 调用 scripts 中的文件，该文件再操作 `lib/Gaia`来执行具体操作。

## utils
一些小工具文件，utils 中的文件是功能性无关的，通用的工具方法。

## .eslintrc
存放 eslintrc

## .gitignore
存放 gitignore

## package.json
npm 依赖管理文件

## README.md
主文档入口
