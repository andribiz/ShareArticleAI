import { createWhisperJob } from "@/lib/runpod";

/**
 * @jest-environment jsdom
 */
describe("Runpod library", () => {
  it("should call create whisper job", async () => {
    console.log(process.env.RUNPOD_API_KEY as string);
    const res = await createWhisperJob(process.env.RUNPOD_API_KEY as string, "", "")
    expect(res.id).toBeDefined();
    expect(res.status).toBe("IN_QUEUE");

    console.log(res);
  });
});
