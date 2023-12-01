import axios from "axios";

export type WhisperQueue = {
  id: string;
  status: string;
};

export type WhisperResult = {
  id: string;
  output:
    | {
        detected_language: string;
        transcription: string;
      }
    | undefined
    | null;
  status:
    | "IN_QUEUE"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "FAILED"
    | "CANCELED"
    | "TIMED_OUT";
};

export const createWhisperJob = async (
  authToken: string,
  url: string,
  webhook: string
) => {
  const res = await axios.post(
    "https://api.runpod.ai/v2/whisper/run",
    {
      input: {
        audio: url,
        model: "base",
        transcription: "srt",
        translate: false,
        language: "en",
        temperature: 0,
        best_of: 5,
        beam_size: 5,
        patience: 1,
        suppress_tokens: "-1",
        initial_prompt: "None",
        condition_on_previous_text: false,
        temperature_increment_on_fallback: 0.2,
        compression_ratio_threshold: 2.4,
        logprob_threshold: -1,
        no_speech_threshold: 0.6,
      },
      webhook,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return res.data as WhisperQueue;
};

export const getWhisperResult = async (authToken: string, jobId: string) => {
  const res = await axios.get(
    `https://api.runpod.ai/v2/whisper/status/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return res.data as WhisperResult;
};
