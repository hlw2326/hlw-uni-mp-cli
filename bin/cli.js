#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// templates/config.js
var require_config = __commonJS({
  "templates/config.js"(exports2, module2) {
    var fs2 = require("fs");
    var path2 = require("path");
    var TEMPLATES_DIR = path2.join(__dirname,"..","templates");
    var PLATFORM_NAMES = {
      "mp-weixin": "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F",
      "mp-toutiao": "\u6296\u97F3\u5C0F\u7A0B\u5E8F"
    };
    function scanPlatforms() {
      if (!fs2.existsSync(TEMPLATES_DIR)) return [];
      return fs2.readdirSync(TEMPLATES_DIR).filter((name) => {
        if (name === "config.js") return false;
        const fullPath = path2.join(TEMPLATES_DIR, name);
        return fs2.statSync(fullPath).isDirectory();
      }).sort((a, b) => {
        if (a === "mp-weixin") return -1;
        if (b === "mp-weixin") return 1;
        return a.localeCompare(b);
      });
    }
    function scanTemplates(platform) {
      const platformDir = path2.join(TEMPLATES_DIR, platform);
      if (!fs2.existsSync(platformDir)) return [];
      return fs2.readdirSync(platformDir).filter((name) => {
        if (name === "base") return false;
        const fullPath = path2.join(platformDir, name);
        return fs2.statSync(fullPath).isDirectory();
      }).sort();
    }
    function readTemplateMeta(platform, templateId) {
      const metaPath = path2.join(TEMPLATES_DIR, platform, templateId, "template.json");
      if (fs2.existsSync(metaPath)) {
        try {
          return JSON.parse(fs2.readFileSync(metaPath, "utf-8"));
        } catch {
        }
      }
      return {};
    }
    function getPlatformConfig2(platform) {
      const platformDir = path2.join(TEMPLATES_DIR, platform);
      const basePath = path2.join(platformDir, "base");
      if (!fs2.existsSync(platformDir) || !fs2.existsSync(basePath)) return null;
      const templateIds = scanTemplates(platform);
      const templates = templateIds.map((id) => {
        const meta = readTemplateMeta(platform, id);
        return {
          id,
          name: meta.name || `\u6A21\u677F ${id}`,
          description: meta.description || ""
        };
      });
      return { id: platform, name: PLATFORM_NAMES[platform] || platform, templates };
    }
    function getAllPlatformConfigs() {
      return scanPlatforms().map((id) => getPlatformConfig2(id)).filter(Boolean);
    }
    function getStyleTemplate2(platform, templateId) {
      const config2 = getPlatformConfig2(platform);
      return config2?.templates.find((t) => t.id === templateId);
    }
    function getTemplatePaths2(platform, templateId) {
      return {
        basePath: path2.join(TEMPLATES_DIR, platform, "base"),
        templatePath: path2.join(TEMPLATES_DIR, platform, templateId)
      };
    }
    var platformConfigs2 = getAllPlatformConfigs();
    var platforms2 = platformConfigs2.map((p) => ({ id: p.id, name: p.name, templateCount: p.templates.length }));
    module2.exports = {
      platforms: platforms2,
      platformConfigs: platformConfigs2,
      getPlatformConfig: getPlatformConfig2,
      getStyleTemplate: getStyleTemplate2,
      getTemplatePaths: getTemplatePaths2,
      getAllPlatformConfigs
    };
  }
});

// bin/cli.ts
var import_commander = require("commander");
var import_chalk = __toESM(require("chalk"));
var import_inquirer = __toESM(require("inquirer"));
var import_ora = __toESM(require("ora"));
var import_path = __toESM(require("path"));
var import_fs_extra = __toESM(require("fs-extra"));
var cwd = process.cwd();
var version = JSON.parse(import_fs_extra.default.readFileSync(import_path.default.join(__dirname, "../package.json"), "utf-8")).version;
function toKebabCase(name) {
  return name.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "");
}
function isValidProjectName(name) {
  return /^[a-z][a-z0-9-]*$/.test(name);
}
async function copyDir(src, dest, options = {}) {
  const { overwrite = true, skipFiles = [] } = options;
  if (!await import_fs_extra.default.pathExists(src)) return;
  await import_fs_extra.default.ensureDir(dest);
  const entries = await import_fs_extra.default.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    if (skipFiles.includes(entry.name)) continue;
    const srcPath = import_path.default.join(src, entry.name);
    const destPath = import_path.default.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath, options);
    } else {
      if (overwrite || !await import_fs_extra.default.pathExists(destPath)) {
        await import_fs_extra.default.copyFile(srcPath, destPath);
      }
    }
  }
}
var TEXT_EXTS = /* @__PURE__ */ new Set([
  ".vue",
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".mts",
  ".json",
  ".jsonc",
  ".css",
  ".scss",
  ".sass",
  ".less",
  ".html",
  ".htm",
  ".xml",
  ".svg",
  ".md",
  ".markdown",
  ".txt",
  ".env",
  ".gitignore",
  ".prettierrc",
  ".editorconfig",
  ".yaml",
  ".yml",
  ".toml"
]);
function isTextFile(filePath) {
  const ext = import_path.default.extname(filePath).toLowerCase();
  if (TEXT_EXTS.has(ext)) return true;
  const buf = Buffer.alloc(8192);
  let fd;
  try {
    fd = import_fs_extra.default.openSync(filePath, "r");
    const n = import_fs_extra.default.readSync(fd, buf, 0, buf.length, 0);
    const sample = buf.subarray(0, n);
    if (sample.includes(0)) return false;
    let bad = 0;
    for (const b of sample) {
      const printable = b >= 32 && b <= 126 || b === 9 || b === 10 || b === 13;
      if (!printable) bad++;
    }
    return bad / sample.length < 0.01;
  } finally {
    if (fd !== void 0) import_fs_extra.default.closeSync(fd);
  }
}
async function replaceTemplateVars(dir, vars) {
  const files = await import_fs_extra.default.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const filePath = import_path.default.join(dir, file.name);
    if (file.isDirectory()) {
      await replaceTemplateVars(filePath, vars);
    } else {
      if (!isTextFile(filePath)) continue;
      let content = await import_fs_extra.default.readFile(filePath, "utf-8");
      let changed = false;
      for (const [key, value] of Object.entries(vars)) {
        const before = content;
        content = content.replace(new RegExp(`{{${key}}}`, "g"), value);
        if (content !== before) changed = true;
      }
      if (changed) await import_fs_extra.default.writeFile(filePath, content);
    }
  }
}
function printBanner() {
  const c = import_chalk.default;
  function visualWidth(s) {
    let w = 0;
    for (const ch of s) {
      const code = ch.codePointAt(0);
      if (code >= 11904 && code <= 40959 || code >= 65280 && code <= 65519) w += 2;
      else w += 1;
    }
    return w;
  }
  const W = 50;
  const ind = "  ";
  const row = (plain, colored) => {
    const pad = " ".repeat(Math.max(0, W - visualWidth(plain)));
    console.log(`${ind}${c.dim("\u2502")} ${colored}${pad} ${c.dim("\u2502")}`);
  };
  const blank = () => console.log(`${ind}${c.dim("\u2502")}${" ".repeat(W + 2)}${c.dim("\u2502")}`);
  const nameChars = "hlw-uni-mp".split("");
  const nameColors = [
    c.cyanBright,
    c.cyanBright,
    c.cyanBright,
    c.dim,
    c.blueBright,
    c.blueBright,
    c.blueBright,
    c.dim,
    c.magentaBright,
    c.magentaBright
  ];
  const nameGrad = nameChars.map((ch, i) => nameColors[i](ch)).join(c.dim(" "));
  const namePlain = "h l w - u n i - m p";
  const badge = ` v${version} `;
  const titleGap = W - 3 - namePlain.length - badge.length;
  const titleLine = c.cyan("\u273B") + "  " + nameGrad + " ".repeat(Math.max(0, titleGap)) + c.bgCyan.black(badge);
  const cmdColW = 16;
  const cmdRow = (cmd, arg, desc) => {
    const full = arg ? `${cmd} ${arg}` : cmd;
    const padLen = Math.max(0, cmdColW - full.length);
    const plain = `  \u276F  ${full}${" ".repeat(padLen)}${desc}`;
    const colored = `  ${c.cyan("\u276F")}  ${c.bold.white(cmd)}` + (arg ? ` ${c.dim(arg)}` : "") + " ".repeat(padLen) + c.dim(desc);
    row(plain, colored);
  };
  console.log();
  console.log(`${ind}${c.dim("\u256D" + "\u2500".repeat(W + 2) + "\u256E")}`);
  blank();
  console.log(`${ind}${c.dim("\u2502")} ${titleLine} ${c.dim("\u2502")}`);
  blank();
  row("  UniApp \u5C0F\u7A0B\u5E8F\u811A\u624B\u67B6\u751F\u6210\u5668", `  ${c.white("UniApp \u5C0F\u7A0B\u5E8F\u811A\u624B\u67B6\u751F\u6210\u5668")}`);
  blank();
  cmdRow("create", "<name>", "\u5F00\u59CB\u521B\u5EFA\u65B0\u9879\u76EE");
  cmdRow("--help", "", "\u67E5\u770B\u6240\u6709\u547D\u4EE4");
  blank();
  console.log(`${ind}${c.dim("\u2570" + "\u2500".repeat(W + 2) + "\u256F")}`);
  console.log();
}
var config = require_config();
var platforms = config.platforms;
var platformConfigs = config.platformConfigs;
function getPlatformConfig(platform) {
  return config.getPlatformConfig(platform);
}
function getStyleTemplate(platform, templateId) {
  return config.getStyleTemplate(platform, templateId);
}
function getTemplatePaths(platform, templateId) {
  return config.getTemplatePaths(platform, templateId);
}
function isInteractive() {
  return !!process.stdin.isTTY;
}
async function runCreate(opts) {
  const { name, description, author, platform, template } = opts;
  const projectPath = import_path.default.join(cwd, name);
  if (!isValidProjectName(name)) {
    console.log();
    console.log(`  ${import_chalk.default.red("\u2717")}  ${import_chalk.default.red.bold("\u65E0\u6548\u7684\u9879\u76EE\u540D\u79F0:")} ${import_chalk.default.red(name)}`);
    console.log(import_chalk.default.gray("  (\u53EA\u80FD\u5305\u542B\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u8FDE\u5B57\u7B26\uFF0C\u4E14\u4EE5\u5B57\u6BCD\u5F00\u5934)"));
    console.log();
    return;
  }
  if (await import_fs_extra.default.pathExists(projectPath)) {
    console.log();
    console.log(`  ${import_chalk.default.yellow("\u26A0")}  ${import_chalk.default.yellow.bold("\u76EE\u5F55\u5DF2\u5B58\u5728:")} ${import_chalk.default.yellow(name)}`);
    console.log(import_chalk.default.gray("  (\u8BF7\u5148\u5220\u9664\u6216\u4F7F\u7528\u5176\u4ED6\u540D\u79F0)"));
    console.log();
    return;
  }
  const styleTemplate = getStyleTemplate(platform, template);
  console.log(import_chalk.default.white(`[2/4] \u4F7F\u7528\u5E73\u53F0: ${getPlatformConfig(platform)?.name}\uFF0C\u6A21\u677F: ${styleTemplate?.name ?? template}`));
  console.log(import_chalk.default.white("[3/4] \u914D\u7F6E\u9879\u76EE\u4FE1\u606F"));
  console.log(import_chalk.default.white(`  - \u9879\u76EE\u540D\u79F0: ${name}`));
  console.log(import_chalk.default.white(`  - \u9879\u76EE\u63CF\u8FF0: ${description}`));
  if (author) console.log(import_chalk.default.white(`  - \u4F5C\u8005: ${author}`));
  console.log();
  console.log(import_chalk.default.white("[4/4] \u6B63\u5728\u521B\u5EFA\u9879\u76EE..."));
  const { basePath, templatePath } = getTemplatePaths(platform, template);
  const spinner = (0, import_ora.default)({ text: "  \u590D\u5236\u6A21\u677F\u6587\u4EF6...", spinner: "material", color: "cyan" }).start();
  await import_fs_extra.default.ensureDir(projectPath);
  await copyDir(basePath, projectPath, { overwrite: true });
  await copyDir(templatePath, projectPath, { overwrite: true, skipFiles: ["template.json"] });
  await replaceTemplateVars(projectPath, {
    name,
    description,
    author,
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  });
  spinner.succeed();
  console.log();
  console.log(`  ${import_chalk.default.green("\u2713")}  ${import_chalk.default.bold.green("\u9879\u76EE\u521B\u5EFA\u6210\u529F")}  ${import_chalk.default.gray(`${name}`)}`);
  console.log();
  console.log(`  ${import_chalk.default.cyan("\u25B8")}  ${import_chalk.default.gray("cd")} ${import_chalk.default.white(name)} ${import_chalk.default.gray("&& npm install && npm run dev:mp-weixin")}`);
  console.log();
}
var program = new import_commander.Command();
program.name("hlw-uni-mp").description("UniApp \u5C0F\u7A0B\u5E8F\u811A\u624B\u67B6\u751F\u6210\u5668").version(version);
program.command("create [name]").description("\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684 uniapp \u9879\u76EE").option("-p, --platform <platform>", "\u6307\u5B9A\u5E73\u53F0 (mp-weixin/mp-toutiao)").option("-t, --template <template>", "\u6307\u5B9A\u6A21\u677F ID").option("-d, --description <description>", "\u9879\u76EE\u63CF\u8FF0").option("-a, --author <author>", "\u4F5C\u8005\u540D\u79F0").option("--ci", "\u975E\u4EA4\u4E92\u6A21\u5F0F\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u9009\u9879").action(async (name, opts) => {
  try {
    printBanner();
    const options = {
      name: name || opts?.name,
      platform: opts?.platform,
      template: opts?.template,
      description: opts?.description,
      author: opts?.author,
      ci: opts?.ci
    };
    const ci = options.ci || !isInteractive();
    if (ci) {
      console.log(`  ${import_chalk.default.yellow("\u26A1")}  ${import_chalk.default.yellow.bold("\u975E\u4EA4\u4E92\u6A21\u5F0F")}  ${import_chalk.default.gray("\u4F7F\u7528\u9ED8\u8BA4\u9009\u9879")}`);
      console.log();
      const platform2 = options.platform || platforms[0]?.id || "mp-weixin";
      const platformConfig2 = getPlatformConfig(platform2);
      const template2 = options.template || platformConfig2?.templates[0]?.id || "template1";
      const styleTemplate = getStyleTemplate(platform2, template2);
      if (!isValidProjectName(options.name || "my-uniapp-app")) {
        console.log();
        console.log(`  ${import_chalk.default.red("\u2717")}  ${import_chalk.default.red.bold("\u65E0\u6548\u7684\u9879\u76EE\u540D\u79F0:")} ${import_chalk.default.red(options.name)}`);
        console.log(import_chalk.default.gray("  (\u53EA\u80FD\u5305\u542B\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u8FDE\u5B57\u7B26\uFF0C\u4E14\u4EE5\u5B57\u6BCD\u5F00\u5934)"));
        console.log();
        return;
      }
      await runCreate({
        name: options.name || "my-uniapp-app",
        description: options.description || "\u57FA\u4E8E hlw-uni \u811A\u624B\u67B6\u521B\u5EFA",
        author: options.author || "",
        platform: platform2,
        template: template2
      });
      return;
    }
    let platform = options.platform || platforms[0]?.id;
    let template = options.template;
    console.log(import_chalk.default.white("[1/4] \u9009\u62E9\u76EE\u6807\u5E73\u53F0"));
    if (!options.platform) {
      const answer = await import_inquirer.default.prompt([{
        type: "list",
        name: "platform",
        message: "\u8BF7\u9009\u62E9\u76EE\u6807\u5E73\u53F0:",
        choices: platforms.map((p) => ({
          name: `${p.name} (${p.templateCount} \u5957\u6A21\u677F)`,
          value: p.id
        })),
        default: platforms[0]?.id
      }]);
      platform = answer.platform;
    } else {
      console.log(import_chalk.default.white(`  \u5DF2\u6307\u5B9A: ${platform}
`));
    }
    const platformConfig = getPlatformConfig(platform);
    console.log(import_chalk.default.white(`[2/4] \u9009\u62E9 ${platformConfig.name} \u98CE\u683C\u6A21\u677F`));
    if (!template) {
      const answer = await import_inquirer.default.prompt([{
        type: "list",
        name: "template",
        message: "\u8BF7\u9009\u62E9\u98CE\u683C\u6A21\u677F:",
        choices: platformConfig.templates.map((t) => ({
          name: t.name,
          value: t.id
        })),
        default: platformConfig.templates[0]?.id
      }]);
      template = answer.template;
    } else {
      console.log(import_chalk.default.white(`  \u5DF2\u6307\u5B9A: ${template}
`));
    }
    console.log(import_chalk.default.white("[3/4] \u914D\u7F6E\u9879\u76EE\u4FE1\u606F"));
    const answers = await import_inquirer.default.prompt([
      {
        type: "input",
        name: "projectName",
        message: "\u9879\u76EE\u540D\u79F0:",
        default: options.name || "my-uniapp-app",
        validate: (v) => isValidProjectName(v) ? true : "\u8BF7\u8F93\u5165\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u6216\u8FDE\u5B57\u7B26\uFF0C\u4E14\u4EE5\u5B57\u6BCD\u5F00\u5934"
      },
      {
        type: "input",
        name: "description",
        message: "\u9879\u76EE\u63CF\u8FF0:",
        default: options.description || "\u57FA\u4E8E hlw-uni \u811A\u624B\u67B6\u521B\u5EFA"
      },
      {
        type: "input",
        name: "author",
        message: "\u4F5C\u8005\u540D\u79F0:",
        default: options.author || ""
      }
    ]);
    await runCreate({
      name: answers.projectName,
      description: answers.description,
      author: answers.author,
      platform,
      template
    });
  } catch (error) {
    console.log();
    console.log(`  ${import_chalk.default.red("\u2717")}  ${import_chalk.default.red.bold("\u521B\u5EFA\u5931\u8D25:")} ${import_chalk.default.red(error.message)}`);
    console.log();
    process.exit(1);
  }
});
program.command("add <type> [name]").description("\u6DFB\u52A0\u9875\u9762\u6216\u7EC4\u4EF6").option("--ci", "\u975E\u4EA4\u4E92\u6A21\u5F0F\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u9009\u9879").action(async (type, name, opts) => {
  const ci = opts?.ci || !isInteractive();
  const itemType = type === "page" ? "\u9875\u9762" : "\u7EC4\u4EF6";
  printBanner();
  let itemName = name;
  if (!ci) {
    const answer = await import_inquirer.default.prompt([{
      type: "input",
      name: "itemName",
      message: `${itemType}\u540D\u79F0:`,
      default: name || "",
      validate: (v) => v.trim() ? true : "\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"
    }]);
    itemName = answer.itemName;
  }
  if (!itemName?.trim()) {
    console.log();
    console.log(`  ${import_chalk.default.red("\u2717")}  ${import_chalk.default.red.bold(`${itemType}\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A`)}`);
    console.log();
    return;
  }
  const kebabName = toKebabCase(itemName);
  const spinner = (0, import_ora.default)({ text: `  \u521B\u5EFA${itemType} ${itemName}...`, spinner: "material", color: "cyan" }).start();
  if (type === "page") {
    const pagesDir = import_path.default.join(cwd, "src", "pages", kebabName);
    await import_fs_extra.default.ensureDir(pagesDir);
    await import_fs_extra.default.writeFile(
      import_path.default.join(pagesDir, "index.vue"),
      `<template>
  <view class="${kebabName}-page">
    <text class="title">${itemName}</text>
  </view>
</template>
<script setup lang="ts">
onLoad(() => { console.log('${itemName} \u9875\u9762\u52A0\u8F7D') })
</script>
<style scoped lang="scss">
.${kebabName}-page { padding: 32rpx; }
.title { font-size: 36rpx; font-weight: bold; }
</style>`
    );
    const pagesJsonPath = import_path.default.join(cwd, "src", "pages.json");
    if (await import_fs_extra.default.pathExists(pagesJsonPath)) {
      const pagesJson = await import_fs_extra.default.readJson(pagesJsonPath);
      const routePath = `pages/${kebabName}/index`;
      if (!pagesJson.pages.find((p) => p.path === routePath)) {
        pagesJson.pages.push({ path: routePath, style: { navigationBarTitleText: itemName } });
        await import_fs_extra.default.writeJson(pagesJsonPath, pagesJson, { spaces: 2 });
      }
    }
  } else if (type === "component") {
    const componentsDir = import_path.default.join(cwd, "src", "components", kebabName);
    await import_fs_extra.default.ensureDir(componentsDir);
    await import_fs_extra.default.writeFile(
      import_path.default.join(componentsDir, "index.vue"),
      `<template>
  <view class="${kebabName}"><slot></slot></view>
</template>
<script setup lang="ts">
defineProps<{ title?: string }>()
</script>
<style scoped lang="scss">
.${kebabName} { display: flex; }
</style>`
    );
  }
  spinner.succeed();
  console.log();
  console.log(`  ${import_chalk.default.green("\u2713")}  ${import_chalk.default.bold.green(`${itemType}\u521B\u5EFA\u6210\u529F`)}  ${import_chalk.default.gray(`${itemName}`)}`);
  console.log();
});
program.command("list").description("\u5217\u51FA\u6240\u6709\u53EF\u7528\u7684\u5E73\u53F0\u548C\u6A21\u677F").action(() => {
  const W = 62;
  const c = import_chalk.default;
  console.log();
  console.log(c.cyan.bold("  " + "\u2550".repeat(W)));
  console.log();
  console.log(c.cyan(`  ${"\u53EF\u7528\u7684\u5E73\u53F0\u548C\u6A21\u677F".padStart(30).padEnd(W)}`));
  console.log(c.gray(`  ${"\u5B8C\u6574\u7684\u5E73\u53F0\u548C\u6A21\u677F\u5217\u8868".padStart(30).padEnd(W)}`));
  console.log();
  console.log(c.cyan.bold("  " + "\u2550".repeat(W)));
  console.log();
  platformConfigs.forEach((platform) => {
    console.log(`  ${import_chalk.default.bold.cyan("\u25B8")} ${import_chalk.default.bold.white(platform.name)}`);
    platform.templates.forEach((t, i) => {
      console.log(`    ${import_chalk.default.gray(`${i + 1}.`)} ${t.name}`);
    });
    console.log();
  });
});
program.parse();
