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

export default function makeModules(statsData) {
  const clusters = getModulesClusters(statsData.modules);
  const clusterMap = getClusterMap(clusters);
  const prefixes = getModulesPrefixes(statsData.modules, clusterMap);

  return statsData.modules
    .filter((module) => !isWebpackBuiltin(module.name))
    .map(
      (module) =>
        new Module({
          id: module.id,
          name: module.name,
          reasons: module.reasons,
          label: getShortLabel(module.name, prefixes),
          size: module.size,
        }),
    );
}
