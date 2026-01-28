
import { GoogleGenAI, Type } from "@google/genai";
import { StudentApplication } from "../types";

// Always initialize with the named apiKey parameter from process.env.API_KEY without fallbacks
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeProfile = async (app: StudentApplication) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyse ce profil d'étudiant marocain souhaitant étudier à l'étranger:
      Nom: ${app.fullName}
      Bac: ${app.bacYear}, Dernier diplôme: ${app.otherDiplomas} (${app.lastDiplomaYear})
      Destination: ${app.destination}
      Garanti: ${app.hasGuarantor} (${app.guarantorType})
      Blocage 70k+ MAD: ${app.canBlockFunds}
      Domaines: ${app.studyFields.join(', ')}
      
      Donne un résumé court (max 3 phrases) sur la viabilité de son visa et de son admission.`,
      config: {
        temperature: 0.7,
      },
    });
    // The response.text property directly returns the generated text content
    return response.text;
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return "Analyse indisponible pour le moment.";
  }
};
