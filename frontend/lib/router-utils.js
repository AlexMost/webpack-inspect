export const addQuery = (search, key, val) => {
  const query = new URLSearchParams(search);
  query.set(key, val);
  debugger;
  return query.toString();
};
