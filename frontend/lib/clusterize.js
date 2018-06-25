import {
  isNPMPackage,
  isWebpackBuiltin,
  NPM_SCOPED_PATTERN,
  NPM_SIMPLE_PATTERN
} from "./webpack-helpers";

const CAPITAL_LETTER = /[A-Z]/;

class Cluster {
  constructor(id) {
    if (!id) {
      throw new Error("Missing name argument");
    }
    this.id = id;
    this.modIds = new Set();
  }
  getId() {
    return this.id;
  }
  getName() {
    const parts = this.id.split("/");
    return parts[parts.length - 1];
  }
  hasModule(id) {
    return this.modIds.has(id);
  }
  getModulesIds() {
    return Array.from(this.modIds);
  }
  getSize() {
    return this.modIds.size;
  }
  addModule(mod) {
    this.modIds.add(mod.id);
  }
}

function getNodeModulesClusters(modules) {
  const clusterMap = {};

  modules.forEach(m => {
    const [_, packageName] =
      m.name.match(NPM_SCOPED_PATTERN) || m.name.match(NPM_SIMPLE_PATTERN);
    if (!clusterMap[packageName]) {
      clusterMap[packageName] = new Cluster(packageName);
    }
    clusterMap[packageName].addModule(m);
  });
  const result = [];
  Object.keys(clusterMap).forEach(key => {
    result.push(clusterMap[key]);
  });
  return result;
}

function getOtherClusterName(modPath) {
  const result = [];
  const parts = modPath.split("/");
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    result.push(part);
    if (CAPITAL_LETTER.test(part[0])) {
      break;
    }
  }
  return result.join("/");
}

function getOthersClusters(modules) {
  const clusters = {};
  modules.forEach(m => {
    if (CAPITAL_LETTER.test(m.name)) {
      const clusterName = getOtherClusterName(m.name);
      if (!clusters[clusterName]) {
        clusters[clusterName] = new Cluster(clusterName);
      }
      clusters[clusterName].addModule(m);
    }
  });
  const result = [];
  Object.keys(clusters).forEach(key => {
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
    if (isWebpackBuiltin(m.name)) {
      webpackBuiltin.push(m);
    } else if (isNPMPackage(m.name)) {
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
  clusters.forEach(cluster => {
    cluster.getModulesIds().forEach(modId => {
      map[modId] = cluster;
    });
  });
  return map;
}
