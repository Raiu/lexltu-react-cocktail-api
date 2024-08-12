const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1";
const apiResourceExt = ".php";

export function buildUrl(
    baseUrl: string,
    resource: string,
    parameters?: { key: string, value: string }[],
    ext: string = ".php"
): string {
    /* console.log(baseUrl, method, query, ext); */
    console.log("# buildURL #")
    console.log("baseUrl:", baseUrl);
    console.log("resource:", resource);
    console.log("parameters:", parameters);
    console.log("ext:", ext);

    if (baseUrl.endsWith("/")) {
        baseUrl = baseUrl.slice(0, -1);
    }

    console.log("baseUrl after:", baseUrl);


/*     if (baseUrl.endsWith("/")) {
        baseUrl = baseUrl.slice(0, -1);
    }
    if (method.startsWith("/")) {
        method = method.slice(1);
    }
    const q = query ? `?${query}` : "";
    console.log("buildUrl: ", q)
    return `${baseUrl}/${method}${ext}` + query ? `?${query}` : ""; */
}
