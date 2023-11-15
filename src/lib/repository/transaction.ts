import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "request_transaction";

const dbClient = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY as string,
    secretAccessKey: process.env.DYNAMODB_SECRET_KEY as string,
  },
  region: process.env.DYNAMODB_REGION as string,
});

export const createReqTransaction = async (
  userId: string,
  url: string,
  data: string,
  tweets: string | null
) => {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      user_id: userId,
      create_datetime: new Date().toISOString(),
      payload: {
        url,
        data,
        tweets,
      },
    },
  });
  const response = await dbClient.send(command);
  return response;
};
