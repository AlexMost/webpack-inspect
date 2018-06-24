const STATS_URL = "/stats";

export async function loadStatsData() {
  const resp = await fetch(STATS_URL);
  return resp.json();
}
