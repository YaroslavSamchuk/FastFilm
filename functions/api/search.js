export async function onRequest(context) {
  const url = new URL(context.request.url);
  const q = url.searchParams.get("query") || url.searchParams.get("q") || "";
  const token = "48ac5259825fb8f20103dac69a9029";

  if (!q) {
    return new Response(JSON.stringify({ data: { items: [] } }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
    });
  }

  // 1. Пошук через Alloha API
  try {
    const allohaUrl = `https://api.alloha.tv/?token=${token}&list=1&name=${encodeURIComponent(q)}`;
    const res = await fetch(allohaUrl);
    if (res.ok) {
      const json = await res.json();
      const items = json?.data || [];
      if (Array.isArray(items) && items.length > 0) {
        const formatted = items.map(it => ({
          id: it.id_kp || it.id_tmdb || it.token_movie,
          kinopoisk_id: it.id_kp,
          tmdb_id: it.id_tmdb,
          title: it.name || it.original_name,
          title_en: it.original_name || it.name,
          year: it.year,
          rating: it.rating_kp || it.rating_imdb || 8.0,
          poster: it.poster,
          type: it.category === 2 ? 'series' : 'movie'
        }));
        return new Response(JSON.stringify({ data: { items: formatted } }), {
          status: 200,
          headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
        });
      }
    }
  } catch (err) {}

  // 2. Резервний пошук через Kinobox
  try {
    const target = `https://api.kinobox.tv/api/movies/search/?query=${encodeURIComponent(q)}`;
    const res = await fetch(target, {
      headers: {
        "Origin": "https://tv.kinohub.vip",
        "Referer": "https://tv.kinohub.vip/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "*/*"
      }
    });
    if (res.ok) {
      const data = await res.text();
      return new Response(data, {
        status: 200,
        headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
      });
    }
  } catch (err) {}

  return new Response(JSON.stringify({ data: { items: [] } }), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" }
  });
}
