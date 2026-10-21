import { ImageResponse } from "next/og";

export const alt =
  "Nova — a modern e-commerce storefront built with Next.js 16, Strapi 5 and Clerk";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40" fill="none"><path d="M15 0L20.4545 5.33333L0 25.3333V14.6667L15 0Z" fill="#06D1D4"/><path d="M2.90827 28.177L15 40L30 25.3334V14.6667L20.4545 5.33337L0 25.3334L0.0041688 25.3375L20.4545 5.33337V20.6667L11.25 29.6667V20.1324L2.90827 28.177Z" fill="#3628A0"/></svg>`
).toString("base64")}`;

const STACK = ["Next.js 16", "Strapi 5", "Clerk", "Vercel"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          background:
            "linear-gradient(135deg, #f8fafc 0%, #f0fdfa 55%, #ccfbf1 100%)",
          color: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={LOGO} width={51} height={68} alt="" />
          <div
            style={{
              display: "flex",
              marginLeft: 16,
              fontSize: 46,
              fontWeight: 700,
              letterSpacing: -1.5,
            }}
          >
            Nova
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              alignItems: "center",
              padding: "10px 24px",
              borderRadius: 999,
              background: "#ffffff",
              border: "2px solid #99f6e4",
              color: "#0f766e",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Case study · 2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -3,
              maxWidth: 960,
            }}
          >
            Everyday essentials, thoughtfully made.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 31,
              lineHeight: 1.4,
              color: "#475569",
              maxWidth: 880,
            }}
          >
            A full-stack storefront with a headless CMS, real authentication and
            a responsive UI built from scratch.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {STACK.map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                marginRight: 12,
                padding: "10px 22px",
                borderRadius: 12,
                background: "#ffffff",
                border: "2px solid #e2e8f0",
                color: "#334155",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {item}
            </div>
          ))}
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              fontSize: 25,
              fontWeight: 700,
              color: "#64748b",
            }}
          >
            Built by Momen Mohamed
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
