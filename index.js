const fs = require('fs');
const opn = require('opn');
const start = require('./server');


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


function discover(statsPath, moduleName) {
    const statsJSON = JSON.parse(fs.readFileSync(statsPath));
    const modules = skipSources(statsJSON.modules);
    const modulesMap = {};
    modules.forEach(mod => {
        modulesMap[mod.id] = mod;
    });

    const mod = modules.find((m) => m.name.includes(moduleName));
    const idSet = new Set(bfs(modulesMap, mod));
    
    const host = start(statsJSON, mod.id);
    if (process.env.NODE_ENV === 'production') {
        opn(host);
    }
    // const graph = buildGraph(modulesMap, mod);
    // console.log(ids);
}


discover(process.argv[2], process.argv[3]);