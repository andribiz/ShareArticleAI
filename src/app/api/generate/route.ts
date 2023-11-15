import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@clerk/nextjs";
import crawl from "@/lib/crawler";
import OpenAI from "openai";

import { withAxiom, AxiomRequest } from "next-axiom";
import { createReqTransaction } from "@/lib/repository/transaction";
const GenerateInput = z.object({
  url: z.string().nonempty("url cannot be empty"),
});

export const POST = withAxiom(async (req: AxiomRequest) => {
  const { userId } = auth();
  try {
    if (!userId) {
      req.log.warn("Unauthorized");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const obj = GenerateInput.safeParse(await req.json());
    if (!obj.success) {
      req.log.warn("Bad payload", { userId, message: obj.error.message });
      return NextResponse.json({ message: "Bad payload" }, { status: 400 });
    }
    const data = obj.data;
    const texts = await crawl(data.url);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });
    const completions = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a social media expert. your job to help user create tweet from article. ALWAYS respond with this format \n```json\n{\ntweets: string[] \n}\n```",
        },
        {
          role: "user",
          content: `create 3 tweets to promote article below and use emoticon if possible:\n${texts}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    const tweets = completions.choices[0].message.content;
    await createReqTransaction(userId, data.url, texts, tweets);
    return NextResponse.json({
      status: "OK",
      result: tweets,
    });
  } catch (err) {
    req.log.error("Internal error", { userId, message: err });
    return NextResponse.json(
      { message: "Opps Internal Error" },
      { status: 500 }
    );
  }
});
