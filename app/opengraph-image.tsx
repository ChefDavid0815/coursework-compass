import { ImageResponse } from "next/og";

export const alt = "Coursework Compass — Know what to do next";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: "#f4f4f1", color: "#171715", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, fontWeight: 700 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: "#20221e", color: "#f7f7f3", fontSize: 26 }}>↗</div>
        Coursework Compass
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 3, color: "#65705d", textTransform: "uppercase" }}>A calmer way through coursework</div>
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", fontSize: 88, lineHeight: 0.98, letterSpacing: -5, fontWeight: 700 }}>
          <span>Your assignment is big.</span>
          <span style={{ color: "#8b8b84" }}>Your next step isn’t.</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22, color: "#676761" }}>
        <span>Clear plans for meaningful work.</span>
        <span style={{ padding: "13px 22px", borderRadius: 999, background: "#20221e", color: "#f7f7f3", fontWeight: 700 }}>Know what to do next</span>
      </div>
    </div>,
    size,
  );
}
