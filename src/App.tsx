import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const services = [
  {
    category: "基礎清潔管理",
    items: [
      { name: "基礎清潔管理", level: "基礎", price: 1800 },
      { name: "深層清潔管理", level: "進階", price: 2300 }
    ]
  }
];

export default function App() {
  const [selected, setSelected] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = async () => {
    if (!phone || !time) {
      alert("請填寫完整資料");
      return;
    }

    try {
      // ✅ 存 Firebase
      await addDoc(collection(db, "bookings"), {
        service: selected.name,
        level: selected.level,
        price: selected.price,
        phone,
        time,
        createdAt: new Date()
      });

      // ✅ 呼叫 LINE API（之後會生效）
      await fetch("/api/notify-line", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          service: selected.name,
          level: selected.level,
          price: selected.price,
          phone,
          time
        })
      });

      alert("預約成功");
      setSelected(null);
      setPhone("");
      setTime("");

    } catch (err) {
      console.error(err);
      alert("錯誤");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Hanna Skin Studio</h1>

      {!selected && (
        <div>
          {services.map((group, i) => (
            <div key={i}>
              <h2>{group.category}</h2>

              {group.items.map((item, j) => (
                <div
                  key={j}
                  onClick={() => setSelected(item)}
                  style={{
                    background: "#fff",
                    padding: 10,
                    margin: 5,
                    cursor: "pointer"
                  }}
                >
                  {item.name}（{item.level}） - ${item.price}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div>
          <h2>{selected.name}</h2>

          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <input
            placeholder="手機"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={handleBooking}>確認預約</button>
          <button onClick={() => setSelected(null)}>返回</button>
        </div>
      )}
    </div>
  );
}