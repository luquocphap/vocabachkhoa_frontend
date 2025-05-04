// import { GoogleGenAI } from "@google/genai";
// import mysql from "mysql2/promise";

// let API_key = "AIzaSyAa0_yqEjdArIthhw1lS_IwerTAjCvPcxk";
// const AI = new GoogleGenAI({ apiKey: API_key });

// // Translate full text
// async function translateText(text, targetLanguage, retries = 3) {
//     for (let attempt = 1; attempt <= retries; attempt++) {
//         try {
//             const response = await AI.models.generateContent({
//                 model: "gemini-2.0-flash",
//                 contents: `Translate the following text into ${targetLanguage}: ${text}. Give the translation in ${targetLanguage} only.`,
//             });

//             if (response && response.text) {
//                 console.log(`Translation (${targetLanguage}):`, response.text);
//                 return response.text;
//             } else {
//                 console.error("Error: Translation response not received.");
//                 return null;
//             }
//         } catch (error) {
//             if (error.message.includes("503") && attempt < retries) {
//                 console.log(`Server overloaded. Retrying (${attempt}/${retries})...`);
//                 await new Promise(resolve => setTimeout(resolve, 2000));
//             } else {
//                 console.error("API request failed:", error);
//                 return null;
//             }
//         }
//     }
// }

// // Extract key vocab
// async function highlightKeyword(text, targetLanguage) {
//     try {
//         const response = await AI.models.generateContent({
//             model: "gemini-2.0-flash",
//             contents: `Extract the key vocabulary words from the following text and translate them into ${targetLanguage}. 
//             Provide a structured list of the translated words along with their original English terms. 
//             Only one-word or two-word keywords only. Format the output as follows:

//             "Original Word": "Translated Word"

//             Only include meaningful keywords relevant to language learning, avoiding common filler words. 
//             Text: ${text}`
//         });

//         if (response && response.text) {
//             console.log(`Highlighted Keywords (${targetLanguage}):`, response.text);
//             return response.text;
//         } else {
//             console.error("Error: Translation response not received.");
//             return null;
//         }
//     } catch (error) {
//         console.error("API request failed:", error);
//         return null;
//     }
// }

// // Parse Gemini keyword output
// function extractKeywords(text) {
//     const lines = text
//         .split('\n')
//         .map(line => line.trim())
//         .filter(line => line.includes(':'));

//     const keywordPairs = lines.map(line => {
//         const [original, translated] = line.split(':').map(part =>
//             part.trim().replace(/^\[|\]$/g, '')
//         );

//         return {
//             originalWord: original,
//             translatedWord: translated
//         };
//     });

//     return keywordPairs;
// }

// // SQL connection info
// const dbConfig = { //tự điền
//     host: '',
//     user: '',
//     password: '',
//     database: '',
//     port: 
// };

// // Insert keyword pairs into DB
// async function insertKeywordsToSQL(keywords) {
//     const connection = await mysql.createConnection(dbConfig);

//     try {
//         await connection.execute(`
//             CREATE TABLE IF NOT EXISTS vocabulary (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 original_word VARCHAR(255),
//                 translated_word VARCHAR(255)
//             )`
//         );

//         const insertQuery = 'INSERT INTO vocabulary (original_word, translated_word) VALUES (?, ?)';

//         for (const { originalWord, translatedWord } of keywords) {
//             await connection.execute(insertQuery, [originalWord, translatedWord]);
//         }

//         console.log('All keywords inserted into the database.');
//     } catch (err) {
//         console.error('Database insertion error:', err.message);
//     } finally {
//         await connection.end();
//     }
// }

// // Main execution
// async function runTranslationTasks(input) {
//     const translationResult = await translateText(input, "Vietnamese");

//     const highlightedKeywordsRaw = await highlightKeyword(input, "Vietnamese");

//     const keywords = extractKeywords(highlightedKeywordsRaw);

//     await insertKeywordsToSQL(keywords);
// }

// // Run the script
// runTranslationTasks();
// let input = ``

import { GoogleGenAI } from "@google/genai";

let API_key = "AIzaSyAa0_yqEjdArIthhw1lS_IwerTAjCvPcxk";

const AI = new GoogleGenAI({ apiKey: API_key });

async function highlightKeyword(text, targetLanguage) {
    try {
        const response = await AI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Extract the key vocabulary words from the following text and translate them into ${targetLanguage}. 
            Provide a structured list of the translated words along with their original English terms. 
            Only one-word or two-word keywords only. Format the output as follows:

            Original Word: Translated Word

            Only include meaningful keywords relevant to language learning, avoiding common filler words. 
            
            Text: ${text}`
        });

        if (response && response.text) {
            console.log(`Highlighted Keywords (${targetLanguage}):, response.text`);
            return response.text;
        } 
        else {
            console.error("Error: Translation response not received.");
            return null;
        }
    } 
    catch (error) {
        console.error("API request failed:", error);
        return null;
    }
}

// async function translateText(text, targetLanguage) {
//     try {
//         const response = await AI.models.generateContent({
//             model: "gemini-2.0-flash",
//             contents: Detect the language of the following text, then translate it into ${targetLanguage}: ${text}. Give the translation in the ${targetLanguage} only, do not add any explanation.,
//         });

//         if (response && response.text) {
//             console.log(Translation (${targetLanguage}):, response.text);
//             return response.text;
//         } 
//         else {
//             console.error("Error: Translation response not received.");
//             return null;
//         }
//     } 
//     catch (error) {
//         console.error("API request failed:", error);
//         return null;
//     }
// }

async function translateText(text, targetLanguage, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await AI.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `Translate the following text into ${targetLanguage}: ${text}. Give the translation in ${targetLanguage} only.`
            });

            if (response && response.text) {
                console.log(`Translation (${targetLanguage}):, response.text`);
                return response.text;
            } else {
                console.error("Error: Translation response not received.");
                return null;
            }
        } catch (error) {
            if (error.message.includes("503") && attempt < retries) {
                console.log(`Server overloaded. Retrying (${attempt}/${retries})...`);
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
            } else {
                console.error("API request failed:", error);
                return null;
            }
        }
    }
}


// Example Usage
let input = "Researchers found that factors such as higher consumption of champagne and white wine, increased fruit intake, along with maintaining a positive mood, weight management, blood pressure control and improved education, may serve as important protective factors. They concluded that between 40% and 63% of sudden cardiac arrest cases could be avoidable when looking at all 56 risk factors. Their findings were published in the Canadian Journal of Cardiology.";

async function runTranslationTasks() {
    let input = "Researchers found that factors such as higher consumption of champagne and white wine, increased fruit intake, along with maintaining a positive mood, weight management, blood pressure control and improved education, may serve as important protective factors. They concluded that between 40% and 63% of sudden cardiac arrest cases could be avoidable when looking at all 56 risk factors. Their findings were published in the Canadian Journal of Cardiology.";

    // console.log("Translating the text...");
    // let translationResult = await translateText(input, "Vietnamese");

    console.log("Highlighting keywords...");
    let highlightedKeywords = await highlightKeyword(input, "Vietnamese");

    // console.log("Translation:", translationResult);
    console.log("Highlighted Keywords:", highlightedKeywords);
}

// Execute the script properly
runTranslationTasks();


function extractKeywords(text) {
    const lines = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.includes(':'));

    const keywordPairs = lines.map(line => {
        const [original, translated] = line.split(':').map(part =>
            part.trim().replace(/^\[|\]$/g, '') // remove outer brackets
        );

        return {
            originalWord: original,
            translatedWord: translated
        };
    });

    return keywordPairs;
}

extractKeywords(input)

