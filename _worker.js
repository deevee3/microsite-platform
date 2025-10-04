export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/index.html") {
      url.pathname = `/${url.hostname.replace(/^www\./, "")}`;
    }

    return env.ASSETS.fetch(new Request(url.toString(), request));
  },
};
