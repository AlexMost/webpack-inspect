export async function loadFromUrl(url) {
  const resp = await fetch(url);
  return resp.json();
}
