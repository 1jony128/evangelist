const useHTTPS = process.env.REACT_APP_USE_HTTPS;

let homeUrl = process.env.REACT_APP_HOME_URL as string;
homeUrl = homeUrl.replace("http://", "");
homeUrl = homeUrl.replace("https://", "");
let baseUrl = process.env.REACT_APP_BASE_URL as string;
baseUrl = baseUrl.replace("http://", "");
baseUrl = baseUrl.replace("https://", "");

if (useHTTPS === "true") {
  baseUrl = "https://" + baseUrl;
  homeUrl = "https://" + homeUrl;
} else {
  baseUrl = "http://" + baseUrl;
  homeUrl = "http://" + homeUrl;
}

export const HOME_URL = homeUrl;
export const BASE_URL = baseUrl;

export const headerAuth = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  [`Accept-Language`]: `${localStorage.getItem("i18nextLng")}`,
});

export const concat = (url: string) => `${BASE_URL}${url}`;

export const settingPost = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const settingGet = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const settingPostAuth = (body: {}) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headerAuth(),
    },
    body: JSON.stringify(body),
  };
};

export const settingPostNoAuth = (body: {}) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
};

export const settingGetAuthBody = (body: {}) => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headerAuth(),
    },
    body: JSON.stringify(body),
  };
};
export const settingPutAuth = (body: {}) => {
  return {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headerAuth(),
    },
    body: JSON.stringify(body),
  };
};

export const settingDeleteAuth = () => {
  return {
    method: "DELETE",
    headers: {
      ...headerAuth(),
    },
  };
};

export const settingPostFormAuth = (body: {}) => {
  return {
    method: "POST",
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      ...headerAuth(),
    },
    body: body,
  };
};

export const settingPutFormAuth = (body: {}) => {
  return {
    method: "PUT",
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      ...headerAuth(),
    },
    body: body,
  };
};
export const settingGetAuth = () => {
  return {
    method: "GET",
    responseType: "arraybuffer",
    headers: {
      ...headerAuth(),
    },
  };
};
