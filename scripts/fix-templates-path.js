/**
 * postbuild 脚本：修复 esbuild 打包后 TEMPLATES_DIR 路径
 *
 * esbuild 会把 config.js 中的 __dirname 内联为 bin/ 目录，
 * 但模板文件实际在 ../templates/ 下，需要修正路径。
 */
const path = require('path');
const fs = require('fs');

const cliPath = path.join(__dirname, '..', 'bin', 'cli.js');
let content = fs.readFileSync(cliPath, 'utf8');

const fix = 'path2.join(__dirname,"..","templates")';

if (!content.includes(fix)) {
  content = content.replace(
    /var TEMPLATES_DIR = path2\.join\(__dirname\);/,
    `var TEMPLATES_DIR = ${fix};`,
  );
  fs.writeFileSync(cliPath, content);
  console.log('✓ Fixed TEMPLATES_DIR path');
} else {
  console.log('✓ TEMPLATES_DIR path already fixed');
}
