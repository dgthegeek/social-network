import SiteConfig from "./site.config";

export const fetcher = async (options) => {
  const response = await fetch(`${SiteConfig()}/api/${options.endpoint}`, {
    method: options.method || "GET",
    headers: {
      Authorization: options.authorizationHeader || "",
    },
    body:
      options.format === "--formData"
        ? options.data
        : JSON.stringify(options.data),
  });

  return response.json();
};
