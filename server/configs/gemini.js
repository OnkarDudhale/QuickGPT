import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {

    apiEndpoint: "https://generativelanguage.googleapis.com/v1", 
});

export default genAI;
