/**
 * 平台配置
 * 动态扫描 templates/ 目录，自动发现可用平台
 * 默认只有 微信小程序(mp-weixin) 和 抖音小程序(mp-toutiao)
 *
 * 目录结构约定：templates/{platform}/ 直接存放完整项目模板
 *   识别条件：目录下存在 package.json
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
            if (!fs.statSync(fullPath).isDirectory()) return false;
            return fs.existsSync(path.join(fullPath, 'package.json'));
        })
        .sort((a, b) => {
            if (a === 'mp-weixin') return -1;
            if (b === 'mp-weixin') return 1;
            return a.localeCompare(b);
        });
}

/**
 * 获取平台配置
 */
function getPlatformConfig(platform) {
    const platformDir = path.join(TEMPLATES_DIR, platform);
    if (!fs.existsSync(platformDir) || !fs.existsSync(path.join(platformDir, 'package.json'))) return null;
    return { id: platform, name: PLATFORM_NAMES[platform] || platform };
}

function getAllPlatformConfigs() {
    return scanPlatforms().map((id) => getPlatformConfig(id)).filter(Boolean);
}

function getTemplatePath(platform) {
    return path.join(TEMPLATES_DIR, platform);
}

const platformConfigs = getAllPlatformConfigs();
const platforms = platformConfigs.map((p) => ({ id: p.id, name: p.name }));

module.exports = {
    platforms,
    platformConfigs,
    getPlatformConfig,
    getTemplatePath,
    getAllPlatformConfigs,
};
