import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const TABLE_NAME = process.env.AWS_TABLE_NAME as string;

console.log(process.env.AWS_REGION);
export const dbClient = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
  },
  region: process.env.AWS_REGION as string,
});
