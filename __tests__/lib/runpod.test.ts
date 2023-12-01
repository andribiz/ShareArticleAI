import { createWhisperJob, getWhisperResult } from "@/lib/runpod";

/**
 * @jest-environment jsdom
 */
describe.skip("Runpod library", () => {
  let id = "";
  const apiKey = process.env.RUNPOD_API_KEY as string;
  it("should call create whisper job", async () => {
    const res = await createWhisperJob(
      apiKey,
      "https://github.com/runpod-workers/sample-inputs/raw/main/audio/gettysburg.wav",
      ""
    );
    expect(res.id).toBeDefined();
    expect(res.status).toBe("IN_QUEUE");
  });
  it("Should check whisper result ", async () => {
    const res = await getWhisperResult(
      apiKey,
      "4e59840b-5570-4ae9-9d60-c289ef52986b-e1"
    );
    expect(res.status).toBeDefined();
    console.log(res);
  });
});
