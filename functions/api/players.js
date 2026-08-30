export async function onRequest(context) {
  const url = new URL(context.request.url);
  const kpId = url.searchParams.get("kinopoisk") || "";
  const tmdbId = url.searchParams.get("tmdb") || "969681";
  const type = url.searchParams.get("type") || "movie";
  const isTv = (type === "series" || type === "tv");

  const collapsUrl = isTv 
    ? `https://api.ortified.ws/embed/kp/${kpId || tmdbId}` 
    : `https://api.ortified.ws/embed/movie/${kpId || tmdbId}`;

  const players = [
    { type: "Turbo", iframeUrl: isTv ? `https://player.videasy.net/tv/${tmdbId}/1/1` : `https://player.videasy.net/movie/${tmdbId}` },
    { type: "Collaps", iframeUrl: collapsUrl },
    { type: "Veoveo", iframeUrl: isTv ? `https://vixsrc.to/tv/${tmdbId}/1/1` : `https://vixsrc.to/movie/${tmdbId}` },
    { type: "Gencit", iframeUrl: isTv ? `https://vidsrc.to/embed/tv/${tmdbId}/1/1` : `https://vidsrc.to/embed/movie/${tmdbId}` },
    { type: "Videoseed", iframeUrl: isTv ? `https://www.2embed.cc/embedtv/${tmdbId}&s=1&e=1` : `https://www.2embed.cc/embed/${tmdbId}` },
    { type: "Alloha", iframeUrl: isTv ? `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1&s=1&e=1` : `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1` }
  ];

  return new Response(JSON.stringify({ data: players }), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS"
    }
  });
}
