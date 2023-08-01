require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
console.log("API KEY: ", process.env.OPENAI_API_KEY);
const configuration = new Configuration({ apiKey: "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" });
const openAI = new OpenAIApi(configuration);

const createImage = async (prompt) => {
  const response = await openAI.createImage({
    prompt: "a dog in space",
    n: 2,
    size: "512x512",
    response_format: "url",
  });
  console.log(response.data.data);
  return response;
};

createImage();
module.exports.createImage = createImage;
