import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  const logoBuffer = readFileSync(
    path.join(process.cwd(), "public", "logos", "asrep-logo.png")
  );
  const logoDataUrl = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "56px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoDataUrl}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          alt="ASREP Africa"
        />
      </div>
    ),
    { ...size }
  );
}
