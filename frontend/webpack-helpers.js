function skipSources(modules) {
    return modules.map((m) => {
        return {...m, source: '' }
    })
}

export function getModulesMap(statsData) {
    const modules = skipSources(statsData.modules);
    const modulesMap = {};
    modules.forEach(mod => {
        modulesMap[mod.id] = mod;
    });
    return modulesMap;
}
