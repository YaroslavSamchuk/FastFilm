export async function onRequest(context) {
  const url = new URL(context.request.url);
  const kpId = url.searchParams.get("kinopoisk") || "";
  const tmdbId = url.searchParams.get("tmdb") || "969681";
  const type = url.searchParams.get("type") || "movie";
  const isTv = (type === "series" || type === "tv");

  const collapsUrl = kpId 
    ? `https://api.delivembed.cc/embed/kp/${kpId}` 
    : `https://api.delivembed.cc/embed/tmdb/${tmdbId}`;

  const players = [
    { type: "Collaps (Multi)", iframeUrl: collapsUrl },
    { type: "Alloha / Videocdn", iframeUrl: isTv ? `https://vidsrc.cc/v2/embed/tv/${tmdbId}/1/1` : `https://vidsrc.cc/v2/embed/movie/${tmdbId}` },
    { type: "Videasy (Fast)", iframeUrl: isTv ? `https://player.videasy.net/tv/${tmdbId}/1/1` : `https://player.videasy.net/movie/${tmdbId}` },
    { type: "AutoEmbed (HD)", iframeUrl: isTv ? `https://player.autoembed.app/embed/tv/${tmdbId}/1/1` : `https://player.autoembed.app/embed/movie/${tmdbId}` },
    { type: "VidLink", iframeUrl: isTv ? `https://vidlink.pro/tv/${tmdbId}/1/1` : `https://vidlink.pro/movie/${tmdbId}` }
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
