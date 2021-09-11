// Pont的获取Url
export const getUrl = (path: string, queryParams: any, method: string) => {
  const params = {
    ...(queryParams || ({} as any)),
  };

  const url = path.replace(/\{([^\\}]*(?:\\.[^\\}]*)*)\}/gm, (match, key) => {
    // eslint-disable-next-line no-param-reassign
    key = key.trim();

    if (params[key] !== undefined) {
      const value = params[key];
      delete params[key];
      return value;
    }
    console.warn('Please set value for template key: ', key);
    return '';
  });

  const paramStr =
    method.toLocaleUpperCase() === 'GET'
      ? Object.keys(params)
          .map((key) => {
            return params[key] === undefined ? '' : `${key}=${params[key]}`;
          })
          .filter((id) => id)
          .join('&')
      : null;

  if (paramStr) {
    return `${url}?${paramStr}`;
  }
  return url;
};

// Pont的根据queryParams中排除URL的参数
export const excludeUrl = (path: string, queryParams: any) => {
  const params = {
    ...(queryParams || ({} as any)),
  };

  path.replace(/\{([^\\}]*(?:\\.[^\\}]*)*)\}/gm, (match, key) => {
    // eslint-disable-next-line no-param-reassign
    key = key.trim();

    if (params[key] !== undefined) {
      delete params[key];
    }
    console.warn('Please set value for template key: ', key);
    return '';
  });

  return params;
};
