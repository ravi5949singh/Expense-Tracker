const Chat = require("../models/Chat");
const { GoogleGenAI } = require("@google/genai");

// Reusable Gemini helper with retry
async function callGemini(prompt, retries = 2) {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            });
            return response.text;
        } catch (err) {
            console.error(`Gemini API attempt ${attempt + 1} failed:`, err.message);
            if (attempt === retries) throw err;
            await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        }
    }
}

exports.getChats = async (req, res) => {
    try {
        const chats = await Chat.find({ userId: req.user.userId }).sort({ createdAt: 1 });
        res.json(chats);
    } catch (error) {
        console.error("Chat fetch error:", error);
        res.status(500).json({ error: "Error fetching chats" });
    }
};

exports.analyze = async (req, res) => {
    try {
        const { expenses, query } = req.body;

        const prompt = `
        You are a financial advisor. The user has the following expense data:
        ${JSON.stringify(expenses)}
        
        The user asks: "${query}"
        
        Provide a very short, helpful response (max 3 sentences) in plain text or simple markdown.
        `;

        const aiResponse = await callGemini(prompt);

        // Save chat to history
        try {
            const chat = new Chat({ userId: req.user.userId, query, response: aiResponse });
            await chat.save();
        } catch (saveErr) {
            console.error("Chat save error (non-fatal):", saveErr.message);
        }

        res.json({ result: aiResponse });
    } catch (error) {
        console.error("AI Analyze error:", error);
        res.status(500).json({ error: "Error connecting to AI" });
    }
};

exports.advancedSummary = async (req, res) => {
    try {
        const { expenses } = req.body;

        const prompt = `
        You are a professional financial advisor.
        Here is the user's transaction data: ${JSON.stringify(expenses)}
        Please generate a professional "Monthly Financial Summary".
        Highlight:
        1. Biggest spending category.
        2. Where they can save money.
        3. A quick personalized tip.
        Format beautifully in Markdown.
        `;

        const aiResponse = await callGemini(prompt);
        res.json({ result: aiResponse });
    } catch (error) {
        console.error("AI Summary error:", error);
        res.status(500).json({ error: "Error generating summary" });
    }
};
