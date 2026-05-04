export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const { service, level, price, phone, time } = req.body;

  const message = `
📩 新預約
服務：${service}（${level}）
價格：${price}
時間：${time}
電話：${phone}
`;

  try {
    const token = (globalThis as any).process?.env?.LINE_CHANNEL_ACCESS_TOKEN;
    const userId = (globalThis as any).process?.env?.LINE_USER_ID;

    await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        to: userId,
        messages: [
          {
            type: "text",
            text: message
          }
        ]
      })
    });

    res.status(200).json({ ok: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "LINE 發送失敗" });
  }
}