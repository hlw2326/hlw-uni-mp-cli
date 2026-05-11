const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { syncTemplates } = require('./sync-template-versions');

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + '\n');
}

test('syncTemplates updates templates that only depend on available local packages', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sync-template-versions-'));

  writeJson(path.join(root, 'mp-vue', 'package.json'), {
    name: '@hlw-uni/mp-vue',
    version: '2.1.51'
  });

  writeJson(path.join(root, 'mp-vite-plugin', 'package.json'), {
    name: '@hlw-uni/mp-vite-plugin',
    version: '1.0.36'
  });

  const templatePkgPath = path.join(root, 'mp-cli', 'templates', 'mp-weixin', 'package.json');
  writeJson(templatePkgPath, {
    name: 'demo-template',
    dependencies: {
      '@hlw-uni/mp-vue': '^2.1.39'
    },
    devDependencies: {
      '@hlw-uni/mp-vite-plugin': '^1.0.30'
    }
  });

  assert.doesNotThrow(() => syncTemplates(root));

  const updatedPkg = JSON.parse(fs.readFileSync(templatePkgPath, 'utf8'));
  assert.equal(updatedPkg.dependencies['@hlw-uni/mp-vue'], '^2.1.51');
  assert.equal(updatedPkg.devDependencies['@hlw-uni/mp-vite-plugin'], '^1.0.36');
});

test('syncTemplates skips legacy templates that depend on missing local packages', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sync-template-versions-legacy-'));

  writeJson(path.join(root, 'mp-vue', 'package.json'), {
    name: '@hlw-uni/mp-vue',
    version: '2.1.51'
  });

  writeJson(path.join(root, 'mp-vite-plugin', 'package.json'), {
    name: '@hlw-uni/mp-vite-plugin',
    version: '1.0.36'
  });

  const templatePkgPath = path.join(root, 'mp-cli', 'templates', 'mp-toutiao', 'package.json');
  writeJson(templatePkgPath, {
    name: 'legacy-template',
    dependencies: {
      '@hlw-uni/mp-core': '^1.0.34',
      '@hlw-uni/mp-vue': '^1.2.21'
    },
    devDependencies: {
      '@hlw-uni/mp-vite-plugin': '^1.0.30'
    }
  });

  syncTemplates(root);

  const updatedPkg = JSON.parse(fs.readFileSync(templatePkgPath, 'utf8'));
  assert.equal(updatedPkg.dependencies['@hlw-uni/mp-core'], '^1.0.34');
  assert.equal(updatedPkg.dependencies['@hlw-uni/mp-vue'], '^1.2.21');
  assert.equal(updatedPkg.devDependencies['@hlw-uni/mp-vite-plugin'], '^1.0.30');
});
