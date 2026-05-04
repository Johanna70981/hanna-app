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

  await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      to: process.env.LINE_USER_ID,
      messages: [
        {
          type: "text",
          text: message
        }
      ]
    })
  });

  res.status(200).json({ ok: true });
}