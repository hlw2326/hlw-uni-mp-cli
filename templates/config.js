/**
 * 模板配置
 * 动态扫描 templates/ 目录，自动发现平台和风格模板
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname);

const PLATFORM_NAMES = {
    'mp-weixin': '微信小程序',
    'mp-toutiao': '抖音小程序',
};

/**
 * 扫描平台目录
 */
function scanPlatforms() {
    if (!fs.existsSync(TEMPLATES_DIR)) return [];
    return fs
        .readdirSync(TEMPLATES_DIR)
        .filter((name) => {
            if (name === 'config.js') return false;
            const fullPath = path.join(TEMPLATES_DIR, name);
            return fs.statSync(fullPath).isDirectory();
        })
        .sort((a, b) => {
            if (a === 'mp-weixin') return -1;
            if (b === 'mp-weixin') return 1;
            return a.localeCompare(b);
        });
}

/**
 * 扫描平台下的所有风格模板
 */
function scanTemplates(platform) {
    const platformDir = path.join(TEMPLATES_DIR, platform);
    if (!fs.existsSync(platformDir)) return [];
    return fs
        .readdirSync(platformDir)
        .filter((name) => {
            if (name === 'base') return false;
            const fullPath = path.join(platformDir, name);
            return fs.statSync(fullPath).isDirectory();
        })
        .sort();
}

/**
 * 读取模板元数据
 */
function readTemplateMeta(platform, templateId) {
    const metaPath = path.join(TEMPLATES_DIR, platform, templateId, 'template.json');
    if (fs.existsSync(metaPath)) {
        try {
            return JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
        } catch { /* ignore */ }
    }
    return {};
}

/**
 * 获取平台配置
 */
function getPlatformConfig(platform) {
    const platformDir = path.join(TEMPLATES_DIR, platform);
    const basePath = path.join(platformDir, 'base');
    if (!fs.existsSync(platformDir) || !fs.existsSync(basePath)) return null;

    const templateIds = scanTemplates(platform);
    const templates = templateIds.map((id) => {
        const meta = readTemplateMeta(platform, id);
        return {
            id,
            name: meta.name || `模板 ${id}`,
            description: meta.description || '',
        };
    });

    return { id: platform, name: PLATFORM_NAMES[platform] || platform, templates };
}

function getAllPlatformConfigs() {
    return scanPlatforms().map((id) => getPlatformConfig(id)).filter(Boolean);
}

function getStyleTemplate(platform, templateId) {
    const config = getPlatformConfig(platform);
    return config?.templates.find((t) => t.id === templateId);
}

function getTemplatePaths(platform, templateId) {
    return {
        basePath: path.join(TEMPLATES_DIR, platform, 'base'),
        templatePath: path.join(TEMPLATES_DIR, platform, templateId),
    };
}

const platformConfigs = getAllPlatformConfigs();
const platforms = platformConfigs.map((p) => ({ id: p.id, name: p.name, templateCount: p.templates.length }));

module.exports = {
    platforms,
    platformConfigs,
    getPlatformConfig,
    getStyleTemplate,
    getTemplatePaths,
    getAllPlatformConfigs,
};
