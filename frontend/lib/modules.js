import { getClusterMap, getModulesClusters } from "./clusterize";
import {
  getModulesPrefixes,
  getShortLabel,
  isWebpackBuiltin,
} from "./webpack-helpers";

class Module {
  constructor({ id, name, reasons, label, size }) {
    this.id = id;
    this.name = name;
    this.reasons = reasons;
    this.label = label;
    this.size = size;
  }
}

class SimpleModule extends Module {}

class ClusterModule extends Module {
  constructor(data) {
    super(data);
    this.moduleIds = data.moduleIds;
  }
}

export function isClusterModule(mod) {
  return mod instanceof ClusterModule;
}

export function isSimpleModule(mod) {
  return mod instanceof SimpleModule;
}

function processReasons(reasons) {
  return reasons.map((r) => {
    // converting all module ids to strings
    // (because will use them in routing)
    r.moduleId = r.moduleId.toString(); // eslint-disable-line
    return r;
  });
}

export default function makeModules(statsData) {
  const clusters = getModulesClusters(statsData.modules);
  const clusterMap = getClusterMap(clusters);
  const prefixes = getModulesPrefixes(statsData.modules, clusterMap);

  const modules = statsData.modules
    .filter((module) => !isWebpackBuiltin(module.name))
    .map(
      (module) =>
        new SimpleModule({
          id: module.id.toString(),
          name: module.name,
          reasons: processReasons(module.reasons),
          label: getShortLabel(module.name, prefixes),
          size: module.size,
        }),
    );
  const modsMap = {};
  modules.forEach((mod) => {
    modsMap[mod.id] = mod;
  });
  const clusterModules = clusters.map(({ id: clusterId, modIds }) => {
    const id = clusterId;
    const name = clusterId;
    let reasons = [];
    let size = 0;
    const moduleIds = new Set();
    const label = getShortLabel(clusterId, prefixes);
    modIds.forEach((modId) => {
      moduleIds.add(modId);
      const module = modsMap[modId];
      reasons = reasons.concat(module.reasons);
      size += module.size;
    });
    reasons = reasons.filter(({ moduleId }) => !modIds.has(moduleId));
    return new ClusterModule({
      id,
      name,
      reasons,
      label,
      size,
      moduleIds,
    });
  });
  return clusterModules.concat(modules);
}
