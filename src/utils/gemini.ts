import { GoogleGenerativeAI } from "@google/generative-ai";
import { GOOGLE_GEMINI_API_KEY } from "../config/constants";

export interface GradingResult {
    score: number; // 0-10
    advice: string;
}

export async function gradeEssayWithGemini(
    question: string,
    userAnswer: string,
    modelAnswer: string
): Promise<GradingResult> {
    const apiKey = GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("APIキーが設定されていません。");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // User requested specific model
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash-001" });

    const prompt = `
    あなたは建設業経理士検定1級の採点官です。
    以下の論述問題に対する回答を採点し、10点満点のスコアと、簡潔なアドバイス（改善点）を日本語で出力してください。

    【採点基準】
    - 完全に正解、または模範解答と同等の内容: 10点
    - 重要なキーワードが含まれ、論理が正しい: 7-9点
    - 部分的に正しいが、重要な要素が欠けている: 4-6点
    - 大きな誤りがある、または論点がずれている: 1-3点
    - 全くの不正解、または無回答: 0点

    【問題】
    ${question}

    【模範解答】
    ${modelAnswer}

    【ユーザーの回答】
    ${userAnswer}

    【出力形式】
    以下のJSON形式のみを出力してください。Markdownのコードブロックは不要です。
    {
      "score": 点数(数値0-10),
      "advice": "具体的で建設的なフィードバック（200文字以内）"
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Robust JSON extraction
        // 1. Remove markdown code blocks
        let cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        // 2. Find the first '{' and last '}' to handle potential extra text
        const firstBrace = cleanText.indexOf('{');
        const lastBrace = cleanText.lastIndexOf('}');

        if (firstBrace !== -1 && lastBrace !== -1) {
            cleanText = cleanText.substring(firstBrace, lastBrace + 1);
        }

        const data = JSON.parse(cleanText);

        return {
            score: typeof data.score === 'number' ? data.score : 0,
            advice: data.advice || "採点できませんでした。"
        };
    } catch (error: any) {
        console.error("Gemini Grading Error:", error);

        // Detailed error messaging
        let errorMessage = "通信エラーまたはAIの解析エラーが発生しました。";
        if (error.message?.includes("API key")) {
            errorMessage = "APIキーが無効または設定されていません。";
        } else if (error.message?.includes("403")) {
            errorMessage = "APIキーの権限エラー、または無効です。";
        } else if (error.message?.includes("404")) { // Model not found
            errorMessage = "指定されたモデルが見つかりません。";
        } else if (error.name === "SyntaxError") {
            errorMessage = "AIの応答を解析できませんでした。もう一度お試しください。";
        }

        return {
            score: 0,
            advice: `${errorMessage} (${error.message})`
        };
    }
}
