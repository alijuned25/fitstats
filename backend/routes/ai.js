const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


/* ==========================================
   GEMINI REQUEST WITH RETRY
   ========================================== */

async function generateSenseiResponse(prompt) {
  const maxAttempts = 2;

  for (
    let attempt = 1;
    attempt <= maxAttempts;
    attempt++
  ) {
    try {
      const response =
        await ai.models.generateContent({
          model: "gemini-3.5-flash-lite",
          contents: prompt,
        });

      return response;

    } catch (error) {

      const status =
        error?.status;

      /*
       * Retry temporary Gemini
       * availability errors once.
       */

      if (
        status === 503 &&
        attempt < maxAttempts
      ) {
        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              1500
            )
        );

        continue;
      }

      throw error;
    }
  }

  throw new Error(
    "Gemini request failed."
  );
}


/* ==========================================
   AI CHAT
   ========================================== */

router.post(
  "/chat",
  async (req, res) => {

    try {

      const {
        message,
        fitnessData,
      } = req.body;


      /* ======================================
         VALIDATE MESSAGE
         ====================================== */

      if (
        !message ||
        typeof message !== "string" ||
        !message.trim()
      ) {

        return res.status(400).json({
          success: false,
          message:
            "A valid message is required.",
        });

      }


      /* ======================================
         FITSTATS CONTEXT
         ====================================== */

      const context =
        fitnessData || {};


      /* ======================================
         SENSEI PROMPT
         ====================================== */

      const prompt = `
You are Sensei, the personal AI fitness mentor inside the FitStats application.

Your job is to help the user with:

- workout planning
- exercise guidance
- nutrition
- calorie goals
- macros
- fitness progress
- daily planning
- habit consistency
- general fitness questions

Use the FitStats data below when it is available.

Do not invent information that is not present in the data.

=========================
USER FITSTATS DATA
=========================

${JSON.stringify(
  context,
  null,
  2
)}

=========================
RESPONSE RULES
=========================

1. Give practical and easy-to-understand advice.
2. Be concise but useful.
3. Personalize your response using the available FitStats data.
4. Clearly distinguish between facts from the user's data and general advice.
5. Never claim the user completed something unless the data says so.
6. Never invent calories, workouts, meals, tasks, or progress.
7. Do not diagnose medical conditions.
8. For medical concerns, recommend consulting a qualified healthcare professional.
9. Do not overwhelm the user with unnecessary detail.
10. Your name is Sensei, not AI Coach or OpenAI.
11. Speak like a supportive fitness mentor.
12. When useful, mention specific numbers from the user's FitStats data.

=========================
USER MESSAGE
=========================

${message.trim()}
`;


      /* ======================================
         GEMINI REQUEST
         ====================================== */

      const response =
        await generateSenseiResponse(
          prompt
        );


      const reply =
        response?.text ||
        "Sensei couldn't generate a response right now.";


      /* ======================================
         SUCCESS
         ====================================== */

      return res.json({
        success: true,
        reply,
      });

    } catch (error) {

      console.error(
        "Sensei request error:",
        error
      );


      /* ======================================
         TEMPORARY GEMINI AVAILABILITY
         ====================================== */

      if (
        error?.status === 503
      ) {

        return res.status(503).json({
          success: false,
          message:
            "Sensei is temporarily busy. Please try again in a few seconds.",
        });

      }


      /* ======================================
         AUTHENTICATION
         ====================================== */

      if (
        error?.status === 401 ||
        error?.status === 403
      ) {

        return res.status(500).json({
          success: false,
          message:
            "Sensei authentication failed. Please check the Gemini API configuration.",
        });

      }


      /* ======================================
         RATE LIMIT
         ====================================== */

      if (
        error?.status === 429
      ) {

        return res.status(429).json({
          success: false,
          message:
            "Sensei has reached the current request limit. Please try again shortly.",
        });

      }


      /* ======================================
         GENERAL ERROR
         ====================================== */

      return res.status(500).json({
        success: false,
        message:
          "Sensei could not process your request.",
      });

    }

  }
);


module.exports = router;