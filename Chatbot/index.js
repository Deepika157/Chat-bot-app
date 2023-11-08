
import express from "express";
import cors from "cors";
import { OpenAI }  from "openai";
import bodyparser from "body-parser";

const app = express();

const port = 8000;
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())
app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
  })
);

const apiKey = "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";
const client = new OpenAI({
  apiKey: apiKey // This is also the default, can be omitted
});

app.post("/send", async (req, res) => {
  const userMessage = req.body.message;
 // console.log(userMessage)
  try {
   /*  const response = await openai.completions.create({
      model: "davinci:ft-deepikanegi-2023-08-14-06-20-06",
      prompt: userMessage,
      max_tokens: 50,
    }); */
    const completion = await client.chat.completions.create({
      messages: [
        {"role": "system", "content": "This is a factual chatbot that answers only about Fahdu."},
        {"role": "user", "content":  userMessage}
      ],
      model: "ft:gpt-3.5-turbo-0613:ginie-digital::7xU6wOYQ",
    });

    const botReply = completion.choices[0].message.content.trim();
   // console.log(botReply);
    res.send(botReply)
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." + error });
  }
});

app.listen(port, () => {
  console.log("listen port 8000");
});