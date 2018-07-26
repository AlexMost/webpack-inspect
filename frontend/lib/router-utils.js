export const addQuery = (search, key, val) => {
  const query = new URLSearchParams(search);
  query.set(key, val);
  return query.toString();
};

export const getQueryParam = (search, key) => {
  const query = new URLSearchParams(search);
  return query.get(key);
};

export const makeGoToUrl = (history, location) => (url, params) => {
  const historyObj = {
    pathname: url,
    search: location.search,
  };
  if (params) {
    let queryParams = location.search;
    Object.keys(params).forEach((key) => {
      queryParams = addQuery(queryParams, key, params[key]);
    });
    historyObj.search = queryParams;
  }
  history.push(historyObj);
};
