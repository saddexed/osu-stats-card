import { VercelRequest, VercelResponse } from "@vercel/node";
import { getUser } from "../utils/osu";
import { generateSvg } from "../utils/svg";
import { fetchImageAsBase64 } from "../utils/imageUtils";
import { Resvg } from "@resvg/resvg-js";
import { join } from "path";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { username } = req.query;

    if (!username || typeof username !== "string") {
      res.status(400).send("Missing username in path");
      return;
    }

    const apiKey = process.env.OSU_API_KEY;
    if (!apiKey) {
      res.status(500).send("Server configuration error: OSU_API_KEY missing");
      return;
    }

    const user = await getUser(username, apiKey);
    console.log(`queried ${username}`);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    // Fetch images as base64 to bypass GitHub's CSP and resvg parsing issues
    const avatarUrl = `https://a.ppy.sh/${user.user_id}`;
    const flagUrl = `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${user.country.toUpperCase().split('').map(c => (c.charCodeAt(0) + 127397).toString(16)).join('-')}.svg`;
    
    const [avatarBase64, flagBase64] = await Promise.all([
      fetchImageAsBase64(avatarUrl),
      fetchImageAsBase64(flagUrl),
    ]);

    const options = {
      stats: req.query.stats !== "minimal" && req.query.stats !== "false",
    };

    const svg = generateSvg(user, options, avatarBase64, flagBase64);

    const userAgent = (req.headers["user-agent"] || "").toLowerCase();
    const isDiscord = userAgent.includes("discordbot") || userAgent.includes("twitterbot");
    
    const wantsSvg = req.query.svg === "true";

    if (!wantsSvg) {
      const resvg = new Resvg(svg, {
        font: {
          fontFiles: [
            join(process.cwd(), "src/fonts/segoeui.ttf"),     // Normal
            join(process.cwd(), "src/fonts/segoeuib.ttf"),    // Bold (700)
            join(process.cwd(), "src/fonts/segoeuiz.ttf"),    // Bold Italic (700 italic)
            join(process.cwd(), "src/fonts/seguisb.ttf"),     // SemiBold (600)
            join(process.cwd(), "src/fonts/seguibl.ttf")      // Black (800)
          ],
          loadSystemFonts: false,
          defaultFontFamily: "Segoe UI",
        },
      });
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();

      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
      res.status(200).send(pngBuffer);
      return;
    }

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate"); // Cache for 1 hour
    res.status(200).send(svg);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
