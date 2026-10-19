// Usage: node scripts/qr.mjs https://example.com [out.png]
import QRCode from "qrcode"

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason)
  process.exit(1)
})

const [url, out = "public/qr.png"] = process.argv.slice(2)
if (!url) {
  console.error("Usage: node scripts/qr.mjs <url> [out.png]")
  process.exit(1)
}

await QRCode.toFile(out, url, { width: 1024, margin: 2, errorCorrectionLevel: "M", color: { dark: "#09090b", light: "#ffffff" } })
console.log(`Wrote ${out} for ${url}`)
