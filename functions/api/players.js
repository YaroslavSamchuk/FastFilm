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

  const imdbId = url.searchParams.get("imdb") || "";

  // 2. Безпомилковий резервний список на базі офіційного дзеркала api.ortified.ws
  const collapsUrl = kpId 
    ? `https://api.ortified.ws/embed/kp/${kpId}` 
    : (imdbId 
        ? `https://api.ortified.ws/embed/imdb/${imdbId}` 
        : (isTv ? `https://vidsrc.to/embed/tv/${tmdbId}/1/1` : `https://vidsrc.to/embed/movie/${tmdbId}`));

  const players = [
    { type: "Collaps", iframeUrl: collapsUrl },
    { type: "Turbo", iframeUrl: isTv ? `https://vidlink.pro/tv/${tmdbId}/1/1` : `https://vidlink.pro/movie/${tmdbId}` },
    { type: "AutoEmbed", iframeUrl: isTv ? `https://player.autoembed.cc/embed/tv/${tmdbId}/1/1` : `https://player.autoembed.cc/embed/movie/${tmdbId}` },
    { type: "Veoveo", iframeUrl: isTv ? `https://vixsrc.to/tv/${tmdbId}/1/1` : `https://vixsrc.to/movie/${tmdbId}` },
    { type: "EmbedSu", iframeUrl: isTv ? `https://embed.su/embed/tv/${tmdbId}/1/1` : `https://embed.su/embed/movie/${tmdbId}` },
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
