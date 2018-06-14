export function getModulesMap(modules) {
    const modulesMap = {};
    modules.forEach(mod => {
        modulesMap[mod.id] = mod;
    });
    return modulesMap;
}
