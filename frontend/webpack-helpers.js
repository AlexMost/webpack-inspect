function skipSources(modules) {
    return modules.map((m) => {
        return {...m, source: '' }
    })
}

function bfs(modulesMap, curModule, ids=[]) {
    if (!modulesMap[curModule.id]._visited) {
        modulesMap[curModule.id]._visited = true;
        ids.push(curModule.id);
        if (curModule.reasons && curModule.reasons.length) {
            curModule.reasons.forEach((r) => {
                const mod = modulesMap[r.moduleId];
                const modIds = bfs(modulesMap, mod, ids);
                modIds.forEach((mid) => {
                    if (!modulesMap[mid]._visited) {
                        modulesMap[mid]._visited = true;`   `
                        ids.push(mid);
                    }
                })
            });
        }
    }
    return ids;
}

export function getDepIds(statsData, moduleId) {
    const modules = skipSources(statsData.modules);
    const modulesMap = {};
    modules.forEach(mod => {
        modulesMap[mod.id] = mod;
    });

    const mod = modules.find((m) => m.id === moduleId);
    return Array.from(new Set(bfs(modulesMap, mod)));
}

export function getModulesMap(statsData) {
    const modules = skipSources(statsData.modules);
    const modulesMap = {};
    modules.forEach(mod => {
        modulesMap[mod.id] = mod;
    });
    return modulesMap;
}
