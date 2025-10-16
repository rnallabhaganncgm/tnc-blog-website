type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  cache?: "no-store" | "default" | "force-cache";
};

const BASE_URL = process.env.APP_URL;

export async function apiClient<T = any>(
  path: string, // Only pass endpoint path
  { method = "GET", headers = {}, body, cache = "default" }: FetchOptions = {}
): Promise<T> {
  const url = `${BASE_URL}${path}`; // prepend base URL automatically

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    cache,
  };

  if (body) {
    fetchOptions.body =
      headers["Content-Type"] === "application/json"
        ? JSON.stringify(body)
        : body;
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API request failed: ${res.status} - ${errorText}`);
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    return res.text() as unknown as T;
  }
}
