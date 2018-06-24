export const NPM_SIMPLE_PATTERN = /(.*?\/node_modules\/.*?)\//;
export const NPM_SCOPED_PATTERN = /(.*?\/node_modules\/@.*?\/.*?)\//;
export const WEBPACK_BUILTIN_PATTERN = /\(webpack\)/;

const NPM_PREFIX = /(^\/.*?node_modules\/).*/;

export function isNPMPackage(path) {
    return NPM_SIMPLE_PATTERN.test(path);   
}

export function isNPMScopedPackage(path) {
    return NPM_SCOPED_PATTERN.test(path);
}

export function isWebpackBuiltin(path) {
    return WEBPACK_BUILTIN_PATTERN.test(path);
}

export function getModulesMap(modules) {
    const modulesMap = {};
    modules.forEach(mod => {
        modulesMap[mod.id] = mod;
    });
    return modulesMap;
}

export function getModulesPrefixes(modules, clusterMap) {
    const prefixSet = new Set();
    modules.forEach((module) => {
        if (isWebpackBuiltin(module.name)) return;
        if (isNPMPackage(module.name)) {
            const [_, prefix] = module.name.match(NPM_PREFIX);
            prefixSet.add(prefix);
        } else {
            const cluster = clusterMap[module.id];
            if (!cluster) return;
            const clusterName = cluster.getName();
            const regex = new RegExp(`(.*?)${clusterName}`);
            const [_, prefix] = module.name.match(regex);
            prefixSet.add(prefix);
        }
    });
    return Array.from(prefixSet);
}

function maxStr(strs) {
    let result = '';
    strs.forEach((str) => {
        if (result.length < str.length) {
            result = str;
        }
    })
    return result;
}

export function getShortLabel(name, prefixes) {
    const matchPrefixes = prefixes.filter((p) => name.startsWith(p));
    if (!matchPrefixes) return name;
    const prefix = maxStr(matchPrefixes);
    return name.replace(new RegExp(`^${prefix}`), '');
}
