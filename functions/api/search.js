export async function onRequest(context) {
  const url = new URL(context.request.url);
  const target = `https://api.kinobox.tv/api/movies/search/${url.search}`;
  
  try {
    const res = await fetch(target, {
      headers: {
        "Origin": "https://tv.kinohub.vip",
        "Referer": "https://tv.kinohub.vip/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        "Accept": "*/*"
      }
    });
    if (res.ok) {
      const data = await res.text();
      return new Response(data, {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS"
        }
      });
    }
  } catch (err) {}

  return new Response(JSON.stringify({ data: { items: [] } }), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS"
    }
  });
}
