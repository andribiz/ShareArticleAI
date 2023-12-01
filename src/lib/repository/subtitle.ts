import { PutCommand, UpdateCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { dbClient, TABLE_NAME } from ".";

const postfix = "S#";
const userPostfix = "U#";

export const create = async (
  userId: string,
  id: string,
  jobId: string,
  state: string
) => {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      PK: `${userPostfix}${userId}`,
      SK: `${postfix}${id}`,
      job_id: jobId,
      state,
      create_time: Date.now(),
    },
  });
  const response = await dbClient.send(command);
  return response;
};

export const updateJobId = async (
  userId: string,
  id: string,
  jobId: string
) => {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: {
      PK: `${userPostfix}${userId}`,
      SK: `${postfix}${id}`,
    },
    UpdateExpression: "set job_id = :job_id",
    ExpressionAttributeValues: {
      ":job_id": jobId,
    },
    ReturnValues: "ALL_NEW",
  });
  const response = await dbClient.send(command);
  return response;
};

export const getItemByJobId = async (jobId: string) => {
  const command = new QueryCommand({
    TableName: TABLE_NAME,
    IndexName: "job_id-PK-index",
    KeyConditionExpression: "job_id = :job_id",
    ExpressionAttributeValues: {
      ":job_id": jobId,
    },
  });
  const response = await dbClient.send(command);
  return response;
};

export const updateStateByJobID = async (jobId: string, state: string) => {
  const job_data = await getItemByJobId(jobId);
  if (!job_data.Items) {
    throw new Error("Job Id not found");
  }
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: {
      PK: job_data.Items[0].PK,
      SK: job_data.Items[0].SK,
    },
    UpdateExpression: "set #state = :state",
    ExpressionAttributeNames: {
      "#state": "state",
    },
    ExpressionAttributeValues: {
      ":state": state,
    },
    ReturnValues: "ALL_NEW",
  });
  const response = await dbClient.send(command);
  return response;
};
