import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { withAxiom, AxiomRequest } from "next-axiom";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { create } from "@/lib/repository/subtitle";
import { createWhisperJob } from "@/lib/runpod";

const GenerateInput = z.object({
  id: z.string().nonempty("url cannot be empty"),
});

export const PUT = withAxiom(async (req: AxiomRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const obj = GenerateInput.safeParse(await req.json());
    if (!obj.success) {
      req.log.warn("Bad payload", { userId, message: obj.error.message });
      return NextResponse.json({ message: "Bad payload" }, { status: 400 });
    }
    const data = obj.data;

    const s3 = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
      },
    });

    const link = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: `${process.env.S3_INPUT_FOLDER!}/${data.id}/${data.id}.wav`,
      }),
      { expiresIn: 120 }
    );
    console.log(link);
    const res = await createWhisperJob(
      process.env.RUNPOD_API_KEY as string,
      link,
      ""
    );
    await create(userId, data.id, res.id, res.status);

    return NextResponse.json({ status: "OK" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Opps Internal Error" },
      { status: 500 }
    );
  }
});
