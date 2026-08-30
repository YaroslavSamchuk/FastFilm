export async function onRequest(context) {
  const url = new URL(context.request.url);
  const kpId = url.searchParams.get("kinopoisk") || "";
  const tmdbId = url.searchParams.get("tmdb") || "969681";
  const type = url.searchParams.get("type") || "movie";
  const isTv = (type === "series" || type === "tv");

  const collapsUrl = kpId 
    ? `https://api.delivembed.cc/embed/kp/${kpId}` 
    : (isTv ? `https://vidsrc.cc/v2/embed/tv/${tmdbId}/1/1` : `https://vidsrc.cc/v2/embed/movie/${tmdbId}`);

  const players = [
    { type: "Collaps", iframeUrl: collapsUrl },
    { type: "Turbo", iframeUrl: isTv ? `https://player.videasy.net/tv/${tmdbId}/1/1` : `https://player.videasy.net/movie/${tmdbId}` },
    { type: "Gencit", iframeUrl: isTv ? `https://vidsrc.cc/v2/embed/tv/${tmdbId}/1/1` : `https://vidsrc.cc/v2/embed/movie/${tmdbId}` },
    { type: "Veoveo", iframeUrl: isTv ? `https://vixsrc.to/tv/${tmdbId}/1/1` : `https://vixsrc.to/movie/${tmdbId}` },
    { type: "Videoseed", iframeUrl: isTv ? `https://player.vidplus.to/embed/tv/${tmdbId}/1/1` : `https://player.vidplus.to/embed/movie/${tmdbId}` },
    { type: "Alloha", iframeUrl: `https://stream.voidboost.cc/embed/${kpId || tmdbId}` }
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
