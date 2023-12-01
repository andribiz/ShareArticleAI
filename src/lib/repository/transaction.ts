import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { dbClient, TABLE_NAME } from ".";
import xid from "xid-js";

const postfix = "T#";
const userPostfix = "U#";

export const createReqTransaction = async (
  userId: string,
  url: string,
  data: string,
  tweets: string | null
) => {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      PK: `${userPostfix}${userId}`,
      SK: `${postfix}${xid.next()}`,
      payload: {
        create_time: Date.now(),
        url,
        data,
        tweets,
      },
    },
  });
  const response = await dbClient.send(command);
  return response;
};
