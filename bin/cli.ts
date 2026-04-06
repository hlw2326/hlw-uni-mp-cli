#!/usr/bin/env node
/**
 * hlw-uni CLI — TypeScript 版本（由 tsx 直接执行）
 */
import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';

interface Platform { id: string; name: string; templateCount: number; }
interface Template { id: string; name: string; description: string; colors: string[]; }
interface PlatformConfig { id: string; name: string; templates: Template[]; }

const cwd = process.cwd();
const version = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')).version;

function toKebabCase(name: string): string {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
}

function isValidProjectName(name: string): boolean {
  return /^[a-z][a-z0-9-]*$/.test(name);
}

async function copyDir(src: string, dest: string, options: { overwrite?: boolean; skipFiles?: string[] } = {}) {
  const { overwrite = true, skipFiles = [] } = options;
  if (!(await fs.pathExists(src))) return;
  await fs.ensureDir(dest);
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    if (skipFiles.includes(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath, options);
    } else {
      if (overwrite || !(await fs.pathExists(destPath))) {
        // 用原生 copyFile 而非 fs-extra.copy，确保二进制文件（PNG 等）不被 Text 模式破坏
        await fs.copyFile(srcPath, destPath);
      }
    }
  }
}

/**
 * 通用判断：文件是否可视为文本（用于决定是否做模板变量替换）。
 * 策略：按扩展名白名单快速判断；未知扩展名则读文件头字节做字符编码检测。
 */
const TEXT_EXTS = new Set([
  '.vue', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.mts',
  '.json', '.jsonc',
  '.css', '.scss', '.sass', '.less',
  '.html', '.htm', '.xml',
  '.svg',
  '.md', '.markdown',
  '.txt', '.env', '.gitignore', '.prettierrc', '.editorconfig',
  '.yaml', '.yml', '.toml',
]);

function isTextFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  if (TEXT_EXTS.has(ext)) return true;
  // 未知扩展名：读前 8KB 做编码检测，超出可打印 ASCII/UTF-8/控制字符范围则判定为二进制
  const buf = Buffer.alloc(8192);
  let fd: number | undefined;
  try {
    fd = fs.openSync(filePath, 'r');
    const n = fs.readSync(fd, buf, 0, buf.length, 0);
    const sample = buf.subarray(0, n);
    if (sample.includes(0)) return false; // 含 null 字节（PNG/字体等）→ 二进制
    // 超过 1% 的字节是不可打印的（排除换行/回车/制表）→ 二进制
    let bad = 0;
    for (const b of sample) {
      const printable = (b >= 32 && b <= 126) || b === 9 || b === 10 || b === 13;
      if (!printable) bad++;
    }
    return bad / sample.length < 0.01;
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
}

async function replaceTemplateVars(dir: string, vars: Record<string, string>) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      await replaceTemplateVars(filePath, vars);
    } else {
      // 二进制文件直接跳过，不读不写，完全保留原始内容
      if (!isTextFile(filePath)) continue;

      let content = await fs.readFile(filePath, 'utf-8');
      let changed = false;
      for (const [key, value] of Object.entries(vars)) {
        const before = content;
        content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
        if (content !== before) changed = true;
      }
      if (changed) await fs.writeFile(filePath, content);
    }
  }
}

function printBanner() {
  const c = chalk;
  const rainbow = (t: string) =>
    t.split('').map((ch, i) => {
      const colors = [c.red, c.yellow, c.green, c.cyan, c.blue, c.magenta];
      return colors[i % colors.length](ch);
    }).join('');

  /** 终端里常见 CJK / 全角约占 2 列，用于对齐框线 */
  function visualWidth(s: string): number {
    let w = 0;
    for (const ch of s) {
      const code = ch.codePointAt(0)!;
      if (code >= 0x2e80 && code <= 0x9fff) w += 2;
      else if (code >= 0xff00 && code <= 0xffef) w += 2;
      else w += 1;
    }
    return w;
  }

  const W = 44;
  const inner = W - 4;
  const b = c.cyanBright;
  const row = (plainMeasure: string, colored: string) => {
    const pad = ' '.repeat(Math.max(0, inner - visualWidth(plainMeasure)));
    console.log(`   ${b('║')} ${colored}${pad} ${b('║')}`);
  };

  console.log();
  console.log(rainbow('   ██╗  ██╗ ██████╗ ████████╗███████╗██████╗ ███████╗'));
  console.log(rainbow('   ██║  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔══██╗██╔════╝'));
  console.log(rainbow('   ███████║██║   ██║   ██║   █████╗  ██████╔╝███████╗'));
  console.log(rainbow('   ██╔══██║██║   ██║   ██║   ██╔══╝  ██╔══██╗╚════██║'));
  console.log(rainbow('   ██║  ██║╚██████╔╝   ██║   ███████╗██║  ██║███████║'));
  console.log(rainbow('   ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝╚══════╝'));
  console.log();
  console.log('   ' + b('╔' + '═'.repeat(W) + '╗'));
  const badge = ` ${version} `;
  row(
    `◆  hlw-uni CLI  ${badge}`,
    `${c.magentaBright('◆')}  ${c.bold.white('hlw-uni')}  ${c.cyanBright('CLI')}  ${c.black.bgYellowBright(badge)}`,
  );
  const subPlain = `   UniApp 小程序脚手架生成器`;
  row(subPlain, `   ${c.dim.gray('UniApp')}   ${c.gray('小程序脚手架生成器')}`);
  console.log('   ' + b('╚' + '═'.repeat(W) + '╝'));
  console.log();
  console.log('   ' + c.dim.cyan('▸') + ' ' + c.dim('hlw-uni-mp --help'));
  console.log();
}

// 加载模板配置
const config = require('../templates/config');
const platforms = config.platforms as Platform[];
const platformConfigs = config.platformConfigs as PlatformConfig[];

function getPlatformConfig(platform: string): PlatformConfig | null {
  return config.getPlatformConfig(platform);
}

function getStyleTemplate(platform: string, templateId: string): Template | undefined {
  return config.getStyleTemplate(platform, templateId);
}

function getTemplatePaths(platform: string, templateId: string) {
  return config.getTemplatePaths(platform, templateId);
}

function isInteractive(): boolean {
  return !!process.stdin.isTTY;
}

async function runCreate(opts: {
  name: string;
  description: string;
  author: string;
  platform: string;
  template: string;
}) {
  const { name, description, author, platform, template } = opts;
  const projectPath = path.join(cwd, name);

  if (!isValidProjectName(name)) {
    console.log();
    console.log(`  ${chalk.red('✗')}  ${chalk.red.bold('无效的项目名称:')} ${chalk.red(name)}`);
    console.log(chalk.gray('  (只能包含小写字母、数字、连字符，且以字母开头)'));
    console.log();
    return;
  }

  if (await fs.pathExists(projectPath)) {
    console.log();
    console.log(`  ${chalk.yellow('⚠')}  ${chalk.yellow.bold('目录已存在:')} ${chalk.yellow(name)}`);
    console.log(chalk.gray('  (请先删除或使用其他名称)'));
    console.log();
    return;
  }

  const styleTemplate = getStyleTemplate(platform, template) as Template;

  console.log(chalk.white(`[2/4] 使用平台: ${getPlatformConfig(platform)?.name}，模板: ${styleTemplate?.name ?? template}`));
  console.log(chalk.white('[3/4] 配置项目信息'));
  console.log(chalk.white(`  - 项目名称: ${name}`));
  console.log(chalk.white(`  - 项目描述: ${description}`));
  if (author) console.log(chalk.white(`  - 作者: ${author}`));
  console.log();

  console.log(chalk.white('[4/4] 正在创建项目...'));

  const { basePath, templatePath } = getTemplatePaths(platform, template);
  const spinner = ora({ text: '  复制模板文件...', spinner: 'material', color: 'cyan' }).start();

  await fs.ensureDir(projectPath);
  await copyDir(basePath as string, projectPath, { overwrite: true });
  await copyDir(templatePath as string, projectPath, { overwrite: true, skipFiles: ['template.json'] });

  await replaceTemplateVars(projectPath, {
    name,
    description,
    author,
    date: new Date().toISOString().split('T')[0],
    primaryColor: styleTemplate?.colors[0] ?? '#3b82f6',
    secondaryColor: styleTemplate?.colors[1] ?? '#764ba2',
  });

  spinner.succeed();
  console.log();
  console.log(`  ${chalk.green('✓')}  ${chalk.bold.green('项目创建成功')}  ${chalk.gray(`${name}`)}`);
  console.log();
  console.log(`  ${chalk.cyan('▸')}  ${chalk.gray('cd')} ${chalk.white(name)} ${chalk.gray('&& npm install && npm run dev:mp-weixin')}`);
  console.log();
}

const program = new Command();
program
  .name('hlw-uni-mp')
  .description('UniApp 小程序脚手架生成器')
  .version(version);

program
  .command('create [name]')
  .description('创建一个新的 uniapp 项目')
  .option('-p, --platform <platform>', '指定平台 (mp-weixin/mp-toutiao)')
  .option('-t, --template <template>', '指定模板 ID')
  .option('-d, --description <description>', '项目描述')
  .option('-a, --author <author>', '作者名称')
  .option('--ci', '非交互模式，使用默认选项')
  .action(async (name?: string, opts?: Record<string, unknown>) => {
    try {
      printBanner();

      const options = {
        name: name || (opts?.name as string | undefined),
        platform: opts?.platform as string | undefined,
        template: opts?.template as string | undefined,
        description: opts?.description as string | undefined,
        author: opts?.author as string | undefined,
        ci: opts?.ci as boolean | undefined,
      };

      const ci = options.ci || !isInteractive();

      if (ci) {
        console.log(`  ${chalk.yellow('⚡')}  ${chalk.yellow.bold('非交互模式')}  ${chalk.gray('使用默认选项')}`);
        console.log();

        const platform = options.platform || platforms[0]?.id || 'mp-weixin';
        const platformConfig = getPlatformConfig(platform);
        const template = options.template || platformConfig?.templates[0]?.id || 'template1';
        const styleTemplate = getStyleTemplate(platform, template) as Template;

        if (!isValidProjectName(options.name || 'my-uniapp-app')) {
          console.log();
          console.log(`  ${chalk.red('✗')}  ${chalk.red.bold('无效的项目名称:')} ${chalk.red(options.name)}`);
          console.log(chalk.gray('  (只能包含小写字母、数字、连字符，且以字母开头)'));
          console.log();
          return;
        }

        await runCreate({
          name: options.name || 'my-uniapp-app',
          description: options.description || '基于 hlw-uni 脚手架创建',
          author: options.author || '',
          platform,
          template,
        });
        return;
      }

      let platform = options.platform || platforms[0]?.id;
      let template = options.template;

      console.log(chalk.white('[1/4] 选择目标平台'));
      if (!options.platform) {
        const answer = await inquirer.prompt([{
          type: 'list',
          name: 'platform',
          message: '请选择目标平台:',
          choices: platforms.map((p: Platform) => ({
            name: `${p.name} (${p.templateCount} 套模板)`,
            value: p.id,
          })),
          default: platforms[0]?.id,
        }]);
        platform = answer.platform;
      } else {
        console.log(chalk.white(`  已指定: ${platform}\n`));
      }

      const platformConfig = getPlatformConfig(platform!) as PlatformConfig;

      console.log(chalk.white(`[2/4] 选择 ${platformConfig.name} 风格模板`));
      if (!template) {
        const answer = await inquirer.prompt([{
          type: 'list',
          name: 'template',
          message: '请选择风格模板:',
          choices: platformConfig.templates.map((t: Template) => ({
            name: t.name,
            value: t.id,
          })),
          default: platformConfig.templates[0]?.id,
        }]);
        template = answer.template;
      } else {
        console.log(chalk.white(`  已指定: ${template}\n`));
      }

      console.log(chalk.white('[3/4] 配置项目信息'));
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: '项目名称:',
          default: options.name || 'my-uniapp-app',
          validate: (v: string) => isValidProjectName(v) ? true : '请输入小写字母、数字或连字符，且以字母开头',
        },
        {
          type: 'input',
          name: 'description',
          message: '项目描述:',
          default: options.description || '基于 hlw-uni 脚手架创建',
        },
        {
          type: 'input',
          name: 'author',
          message: '作者名称:',
          default: options.author || '',
        },
      ]);

      await runCreate({
        name: answers.projectName,
        description: answers.description,
        author: answers.author,
        platform: platform!,
        template: template!,
      });
    } catch (error) {
      console.log();
      console.log(`  ${chalk.red('✗')}  ${chalk.red.bold('创建失败:')} ${chalk.red((error as Error).message)}`);
      console.log();
      process.exit(1);
    }
  });

program
  .command('add <type> [name]')
  .description('添加页面或组件')
  .option('--ci', '非交互模式，使用默认选项')
  .action(async (type: string, name?: string, opts?: Record<string, unknown>) => {
    const ci = (opts?.ci as boolean) || !isInteractive();
    const itemType = type === 'page' ? '页面' : '组件';
    printBanner();

    let itemName = name;

    if (!ci) {
      const answer = await inquirer.prompt([{
        type: 'input',
        name: 'itemName',
        message: `${itemType}名称:`,
        default: name || '',
        validate: (v: string) => v.trim() ? true : '名称不能为空',
      }]);
      itemName = answer.itemName;
    }

    if (!itemName?.trim()) {
      console.log();
      console.log(`  ${chalk.red('✗')}  ${chalk.red.bold(`${itemType}名称不能为空`)}`);
      console.log();
      return;
    }

    const kebabName = toKebabCase(itemName);
    const spinner = ora({ text: `  创建${itemType} ${itemName}...`, spinner: 'material', color: 'cyan' }).start();

    if (type === 'page') {
      const pagesDir = path.join(cwd, 'src', 'pages', kebabName);
      await fs.ensureDir(pagesDir);
      await fs.writeFile(
        path.join(pagesDir, 'index.vue'),
        `<template>
  <view class="${kebabName}-page">
    <text class="title">${itemName}</text>
  </view>
</template>
<script setup lang="ts">
onLoad(() => { console.log('${itemName} 页面加载') })
</script>
<style scoped lang="scss">
.${kebabName}-page { padding: 32rpx; }
.title { font-size: 36rpx; font-weight: bold; }
</style>`,
      );

      const pagesJsonPath = path.join(cwd, 'src', 'pages.json');
      if (await fs.pathExists(pagesJsonPath)) {
        const pagesJson = await fs.readJson(pagesJsonPath);
        const routePath = `pages/${kebabName}/index`;
        if (!pagesJson.pages.find((p: { path: string }) => p.path === routePath)) {
          pagesJson.pages.push({ path: routePath, style: { navigationBarTitleText: itemName } });
          await fs.writeJson(pagesJsonPath, pagesJson, { spaces: 2 });
        }
      }
    } else if (type === 'component') {
      const componentsDir = path.join(cwd, 'src', 'components', kebabName);
      await fs.ensureDir(componentsDir);
      await fs.writeFile(
        path.join(componentsDir, 'index.vue'),
        `<template>
  <view class="${kebabName}"><slot></slot></view>
</template>
<script setup lang="ts">
defineProps<{ title?: string }>()
</script>
<style scoped lang="scss">
.${kebabName} { display: flex; }
</style>`,
      );
    }

    spinner.succeed();
    console.log();
    console.log(`  ${chalk.green('✓')}  ${chalk.bold.green(`${itemType}创建成功`)}  ${chalk.gray(`${itemName}`)}`);
    console.log();
  });

program
  .command('list')
  .description('列出所有可用的平台和模板')
  .action(() => {
    const W = 62;
    const c = chalk;

    console.log();
    console.log(c.cyan.bold('  ' + '═'.repeat(W)));
    console.log();
    console.log(c.cyan(`  ${'可用的平台和模板'.padStart(30).padEnd(W)}`));
    console.log(c.gray(`  ${'完整的平台和模板列表'.padStart(30).padEnd(W)}`));
    console.log();
    console.log(c.cyan.bold('  ' + '═'.repeat(W)));
    console.log();
    platformConfigs.forEach((platform: PlatformConfig) => {
      console.log(`  ${chalk.bold.cyan('▸')} ${chalk.bold.white(platform.name)}`);
      platform.templates.forEach((t: Template, i: number) => {
        console.log(`    ${chalk.gray(`${i + 1}.`)} ${t.name}`);
      });
      console.log();
    });
  });

program.parse();
