import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI securely
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      })
    : null;

  // API endpoint for AI Copilot
  app.post("/api/copilot", async (req: express.Request, res: express.Response) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      if (!ai) {
        // Fallback for development if API key is not present
        const simulatedResponses: Record<string, string> = {
          "Analyze GST Outward Supplies for optimization": `**GST Optimization & Intelligence Report**
*BharatMind AI Analyst | GSTR-1 & GSTR-3B audit*

1. **Unclaimed Input Tax Credit (ITC)**: Identified ₹2.43 Lakhs in unclaimed ITC from 3 supplier invoices under GSTR-2B. Reconcile before the next filing cycle to conserve cash flow.
2. **HSN Code Verification**: 2 items in Shopify Catalog have incorrect HSN codes (mismatched 12% vs 18% rate). Correcting this prevents future audit notices from GST Dept.
3. **Filing Readiness**: Ready for automatic GSTR-1 generation. Estimated tax liability for June 2026 is ₹4,82,100 with zero delay penalty risk.`,
          "Translate Invoice into Tamil & Hindi": `**Invoice translation completed successfully!**

**Hindi (हिंदी):**
• *विवरण (Description)*: प्रीमियम बासमती चावल (Premium Basmati Rice)
• *कुल राशि (Total Amount)*: ₹12,500
• *कर दर (GST Rate)*: 5% CGST / SGST

**Tamil (தமிழ்):**
• *விவரம் (Description)*: பிரீமியம் பாஸ்மதி அரிசி
• *மொத்த தொகை (Total Amount)*: ₹12,500
• *வரி விகிதம் (GST Rate)*: 5% CGST / SGST`,
          "Draft shopify cart recovery voice script": `**Shopify Abandoned Cart Recovery - Conversational Voice AI Script**
*Tone: Courteous, helpful, in Hinglish / English*

"Namaste [Customer Name]! Main BharatMind Business Assistant bol raha hoon from [Store Name]. Humein dikha ki aapne [Product Name] cart mein choda tha. Kya koi check-out problem thi? 

Main aapko ek special code **BHARAT10** de raha hoon jisse aapko abhi ₹250 instant discount milega aur standard delivery free hogi. Kya main order finalize karne mein aapki help karoon?"`,
          "Compare retail pricing with local Kirana competitors": `**Competitor Intelligence Dashboard**
*Market Pricing Index (Delhi-NCR Region)*

• **Your Store (Premium Basmati Rice)**: ₹110 / kg
• **Competitor A (Local Supermarket)**: ₹115 / kg
• **Competitor B (Quick Commerce App)**: ₹125 / kg (Delivery in 10 mins)

*BharatMind AI Recommendation*: You have a 12% price advantage over Quick Commerce. Launch a geo-targeted WhatsApp Campaign targeting apartments within 2km highlighting your wholesale-direct rate.`
        };

        const key = Object.keys(simulatedResponses).find(k => prompt.includes(k) || k.includes(prompt));
        const answer = key ? simulatedResponses[key] : `**BharatMind Business Intelligence Output**

Your query: "${prompt}"

*Recommendation Summary:*
- **Action Item**: Verify your Tally ERP 9 ledger connections.
- **Financial Impact**: Streamlining outward supply invoicing could save up to ₹1,20,000 in monthly interest cycles.
- **Workflow Automation**: Deploying our localized WhatsApp automation bot would reduce order status queries by 45%.

*(Note: Connect your real Gemini API key in the secrets panel to get full dynamic AI reasoning.)*`;

        // Simulate short network delay for premium feel
        await new Promise((resolve) => setTimeout(resolve, 800));
        return res.json({ text: answer });
      }

      // Query Gemini!
      const systemInstruction = `You are BharatMind AI, a world-class business copilot and AI operating system for Indian businesses.
You help small, medium and large enterprises with Tally, GST, Shopify, local competitor analysis, local Indian languages, accounting, inventory, and automated workflows.
Your response must be professional, highly structured, in a SaaS marketing/analytical tone, using Indian business terms (Lakhs, Crores, GST, ITC, Tally, Kirana, Hinglish).
Use clean Markdown with bolding, lists, and numbers for readability. Keep it concise (max 200 words) so it fits beautifully inside our SaaS live dashboard preview card.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({ text: response.text || "No response generated" });
    } catch (error: any) {
      console.error("Gemini Copilot Error:", error);
      return res.status(500).json({ error: error.message || "Failed to call Gemini" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
