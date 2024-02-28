import axios, { AxiosError } from "axios";
import { API_URL } from "../utilities/constants";

export const apiGet = (path: string, token?: string) => {
  console.log(`${API_URL}/${path}`);
  return axios.get(`${API_URL}/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiPost = (
  path: string,
  body: Record<string, string | object>,
  token?: string
) => {
  console.log(`${API_URL}/${path}`);
  const authHeader = token ? { Authorization: `Bearer ${token}` } : null;
  const url = `${API_URL}/${path}`;
  // JSON request
  const jsonBody = JSON.stringify(body);
  return axios.post(url, jsonBody, {
    headers: {
      ...authHeader,
      "Content-Type": "application/json",
    },
  });
};

export const apiPostForm = (
  path: string,
  body: Record<string, Blob>,
  token?: string
) => {
  console.log(`${API_URL}/${path}`);
  const authHeader = token ? { Authorization: `Bearer ${token}` } : null;
  const url = `${API_URL}/${path}`;
  const formBody = new FormData();
  for (const key in body) {
    formBody.append(key, body[key]);
  }
  return axios.post(url, formBody, {
    headers: {
      ...authHeader,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const apiPut = (
  path: string,
  body: Record<string, string | Blob>,
  token?: string,
  contentType = "json" as "json" | "form"
) => {
  const authHeader = token ? { Authorization: `Bearer ${token}` } : null;
  const url = `${API_URL}/${path}`;
  const cleanedUpBody = {} as Record<string, string | Blob>;
  Object.keys(body).forEach((key) => {
    if (body[key] !== undefined) {
      cleanedUpBody[key] = body[key];
    }
  });
  if (Object.keys(cleanedUpBody).length === 0) {
    throw new AxiosError("Empty put request");
  }
  if (contentType === "json") {
    // JSON request
    const jsonBody = JSON.stringify(cleanedUpBody);
    return axios.put(url, jsonBody, {
      headers: {
        ...authHeader,
        "Content-Type": "application/json",
      },
    });
  } else {
    // form-data request
    const formBody = new FormData();
    for (const key in cleanedUpBody) {
      formBody.append(key, cleanedUpBody[key]);
    }
    return axios.put(url, formBody, {
      headers: {
        ...authHeader,
        "Content-Type": "multipart/form-data",
      },
    });
  }
};

export const apiDelete = (path: string, token: string) => {
  return axios.delete(`${API_URL}/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
