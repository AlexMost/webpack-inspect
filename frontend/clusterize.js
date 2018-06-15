const NPM_SIMPLE_PATTERN = /(.*?\/node_modules\/.*?)\//;
const NPM_SCOPED_PATTERN = /(.*?\/node_modules\/@.*?\/.*?)\//;
const WEBPACK_BUILTIN_PATTERN = /\(webpack\)/;

class Cluster {
    constructor(name) {
        if (!name) {
            throw new Error('Missing name argument');
        }
        this.name = name;
        this.modIds = new Set();
    }
    getName() {
        return this.name;
    }
    hasModule(id) {
        return this.modIds.has(id);
    }
    getModulesIds() {
        return Array.from(this.modIds);
    }
    getSize(){
        return this.modIds.size;
    }
    addModule(mod) {
        this.modIds.add(mod.id);
    }
}


function getNodeModulesClusters(modules) {
    const clusterMap = {};

    modules.forEach((m) => {
        const [_, packageName] = m.name.match(NPM_SCOPED_PATTERN) || m.name.match(NPM_SIMPLE_PATTERN);
        if (!clusterMap[packageName]) {
            clusterMap[packageName] = new Cluster(packageName);
        }
        clusterMap[packageName].addModule(m);
    });
    const result = [];
    Object.keys(clusterMap).forEach((key) => {
        result.push(clusterMap[key]);
    })
    return result;
}

function getOtherClusterName(modPath) {
    const result = [];
    const parts = modPath.split('/');
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        result.push(part);
        if (/[A-Z]/.test(part[0])) {
            break;
        }
    }
    return result.join('/');
}

function getOthersClusters(modules) {
    const clusters = {};
    modules.forEach((m) => {
        if (/[A-Z]/.test(m.name)) {
            const clusterName = getOtherClusterName(m.name);
            if (!clusters[clusterName]) {
                clusters[clusterName] = new Cluster(clusterName);
            }
            clusters[clusterName].addModule(m);
        }
    });
    const result = [];
    Object.keys(clusters).forEach((key) => {
        if (clusters[key].getSize() !== 1) {
            result.push(clusters[key]);
        }
    });
    return result;
}

export function getModulesClusters(modules) {
    const webpackBuiltin = [];
    const nodeModules = [];
    const others = [];

    modules.forEach(m => {
        if (m.name.match(WEBPACK_BUILTIN_PATTERN)) {
            webpackBuiltin.push(m);
        } else if (m.name.match(NPM_SIMPLE_PATTERN)) {
            nodeModules.push(m);
        } else {
            others.push(m);
        }
    });

    const nodeModulesClusters = getNodeModulesClusters(nodeModules);
    const othersClusters = getOthersClusters(others);
    const clusters = [...nodeModulesClusters, ...othersClusters];
    return clusters;
}


export function getClusterMap(modules) {
    const clusters = getModulesClusters(modules);
    const map = {};
    clusters.forEach((cluster) => {
        cluster.getModulesIds().forEach((modId) => {
            map[modId] = cluster.getName();
        });
    });
    return map;
}
