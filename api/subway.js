export default async function handler(req, res) {
  const { station } = req.query;
  const apiKey = (process.env.SEOUL_SUBWAY_API_KEY || "6c67546d4172686b38347542595741").trim();

  if (!station) {
    return res.status(400).json({ error: "station 파라미터가 필요합니다." });
  }

  const targetUrl = `http://swopenAPI.seoul.go.kr/api/subway/${apiKey}/json/realtimeStationArrival/0/30/${encodeURIComponent(station)}`;

  try {
    const response = await fetch(targetUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    const text = await response.text();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(text);
  } catch (err) {
    return res.status(502).json({ error: "API_FETCH_FAILED", detail: err.message });
  }
}