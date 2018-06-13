export function getModulesMap(statsData) {
    const modulesMap = {};
    statsData.modules.forEach(mod => {
        modulesMap[mod.id] = mod;
    });
    return modulesMap;
}
