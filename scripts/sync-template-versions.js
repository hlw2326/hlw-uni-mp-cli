// prepublish 脚本：同步本地各包版本到模板 package.json
// 读取 monorepo 中各包的 package.json version，
// 自动更新 templates/{platform}/base/package.json 里的依赖版本。
const path = require('path');
const fs   = require('fs');

const ROOT = path.join(__dirname, '..', '..');

/** 需要同步的本地包 */
const LOCAL_PACKAGES = [
    '@hlw-uni/mp-core',
    '@hlw-uni/mp-vue',
    '@hlw-uni/mp-vite-plugin',
];

/** 读取本地包的当前版本 */
function getLocalVersion(pkgName) {
    const dir  = pkgName.replace('@hlw-uni/', '');
    const file = path.join(ROOT, dir, 'package.json');
    const pkg  = JSON.parse(fs.readFileSync(file, 'utf8'));
    return pkg.version;
}

/** 更新单个模板的 package.json */
function syncTemplate(templatePkgPath) {
    const pkg = JSON.parse(fs.readFileSync(templatePkgPath, 'utf8'));
    let changed = false;

    for (const name of LOCAL_PACKAGES) {
        const version = `^${getLocalVersion(name)}`;
        if (pkg.dependencies?.[name] && pkg.dependencies[name] !== version) {
            console.log(`  ${name}: ${pkg.dependencies[name]} → ${version}`);
            pkg.dependencies[name] = version;
            changed = true;
        }
        if (pkg.devDependencies?.[name] && pkg.devDependencies[name] !== version) {
            console.log(`  ${name}: ${pkg.devDependencies[name]} → ${version}`);
            pkg.devDependencies[name] = version;
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(templatePkgPath, JSON.stringify(pkg, null, 2) + '\n');
        console.log(`✓ Updated ${path.relative(ROOT, templatePkgPath)}`);
    } else {
        console.log(`✓ Already up to date: ${path.relative(ROOT, templatePkgPath)}`);
    }
}

const templatesDir = path.join(__dirname, '..', 'templates');
const templates = fs.readdirSync(templatesDir);

console.log('Syncing template versions...');
for (const tpl of templates) {
    const pkgFile = path.join(templatesDir, tpl, 'base', 'package.json');
    if (fs.existsSync(pkgFile)) {
        syncTemplate(pkgFile);
    }
}
