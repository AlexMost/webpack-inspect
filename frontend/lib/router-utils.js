export const addQuery = (search, key, val) => {
  const query = new URLSearchParams(search);
  query.set(key, val);
  return query.toString();
};

export const getQueryParam = (search, key) => {
  const query = new URLSearchParams(search);
  return query.get(key);
};