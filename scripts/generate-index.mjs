import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const componentsPath = path.join(__dirname, '../src/components.json')
const outputPath = path.join(__dirname, '../src/index.ts')

if (!fs.existsSync(componentsPath)) {
    console.error('未找到 src/components.json')
    process.exit(1)
}

const components = JSON.parse(fs.readFileSync(componentsPath, 'utf-8'))

let imports = ''
let exportsList = ''

components.forEach(({name, path: compPath}) => {
    imports += `export {default as ${name}} from '${compPath}'\n`
    exportsList += `  ${name},\n`
})

const fileContent = `/* 本文件由 scripts/generate-index.mjs 自动生成，请勿手动修改 */
${imports.trim()}
`
// 写入文件
fs.writeFileSync(outputPath, fileContent.trim() + '\n', 'utf-8')
console.log('成功生成组件统一入口文件：src/index.tsx')
