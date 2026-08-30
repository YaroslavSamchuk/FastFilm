export async function onRequest(context) {
  const url = new URL(context.request.url);
  const kpId = url.searchParams.get("kinopoisk") || "";
  const tmdbId = url.searchParams.get("tmdb") || "969681";
  const title = url.searchParams.get("title") || "";
  const type = url.searchParams.get("type") || "movie";
  const isTv = (type === "series" || type === "tv");

  // 1. Спроба отримати динамічні плеєри від офіційного API Kinobox
  try {
    const upstreamUrl = `https://api.kinobox.tv/api/players?kinopoisk=${encodeURIComponent(kpId)}&tmdb=${encodeURIComponent(tmdbId)}&title=${encodeURIComponent(title)}`;
    const upstreamRes = await fetch(upstreamUrl, {
      headers: {
        "Origin": "https://tv.kinohub.vip",
        "Referer": "https://tv.kinohub.vip/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        "Accept": "*/*"
      }
    });

    if (upstreamRes.ok) {
      const data = await upstreamRes.json();
      if (Array.isArray(data) && data.length > 0) {
        return new Response(JSON.stringify({ data: data }), {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS"
          }
        });
      }
    }
  } catch (err) {}

  // 2. Безпомилковий резервний список на базі офіційного дзеркала api.ortified.ws
  const collapsUrl = kpId 
    ? `https://api.ortified.ws/embed/kp/${kpId}` 
    : (isTv ? `https://vidsrc.to/embed/tv/${tmdbId}/1/1` : `https://vidsrc.to/embed/movie/${tmdbId}`);

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
