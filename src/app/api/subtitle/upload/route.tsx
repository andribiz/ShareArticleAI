import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { withAxiom, AxiomRequest } from "next-axiom";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import xid from "xid-js";

export const GET = withAxiom(async (_req: AxiomRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const s3 = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
      },
    });
    const id = xid.next();

    const link = await getSignedUrl(
      s3,
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: `${process.env.S3_INPUT_FOLDER!}/${id}/${id}.wav`,
      }),
      { expiresIn: 120 }
    );

    return NextResponse.json({ status: "OK", result: { id, link } });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Opps Internal Error" },
      { status: 500 }
    );
  }
});
