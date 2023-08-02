require("dotenv").config();
/* const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openAI = new OpenAIApi(configuration);
 */
async function test() {
  const response = await fetch("https://api.openai-365pro.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer sk-UohzmIpH0eqSXi9lAfDa2762C23044EaBd910dE2D561A18e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo-0613",
      stream: false,
      messages: [
        {
          role: "user",
          content: "what is a trojan horse virus, can you give me real life scenarios examples, how to prevent that attack too?",
        },
      ],
    }),
  });
  console.log("Response: ", response);
  const body = await response.json();
  console.log("body: ", body.choices[0].message);
}

const createImage = async (prompt) => {
  const response = await openAI.createImage({
    prompt: prompt.toString(),
    n: 2,
    size: "512x512",
    response_format: "url",
  });
  console.log(response.data.data);
  return response;
};

module.exports.createImage = createImage;
