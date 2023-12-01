"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { convertAudio } from "@/lib/audio";
import Link from "next/link";
import axios from "axios";

export function FormVideo() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [link, setLink] = useState<string>("");

  /* const onUpload = async (data: any) => { */
  /*   const bodyData = new FormData(); */
  /*   bodyData.append("audio_file", data); */
  /*   try { */
  /*     const res = await axios.post("http://192.168.40.99:9000/asr", bodyData, { */
  /*       params: { */
  /*         encode: false, */
  /*         task: "translate", */
  /*         output: "srt", */
  /*       }, */
  /*       headers: { */
  /*         "Content-Type": "multipart/form-data", */
  /*       }, */
  /*     }); */
  /*     console.log(res); */
  /*   } catch (err) { */
  /*     console.log(err); */
  /*   } */
  /* }; */

  const onSuccessUpload = async (id: string) => {
    const res = await axios.put("/api/subtitle", {
      id,
    });
    console.log(res);
  };

  const onUpload = async (data: any) => {
    const resLink = await axios.get("/api/subtitle/upload");
    const link = resLink.data.result.link;
    console.log(link);
    await axios.put(link, data, {
      headers: { "Content-Type": "audio/wav" },
    });
    return resLink.data.result.id as string;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    try {
      const res: any = await convertAudio(file);
      console.log(res);
      setLink(res.data);
      const id = await onUpload(res.file);
      await onSuccessUpload(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (video: File | undefined | null) => {
    if (!video) return;
    setFile(video);
  };

  /* const handleUpload = async () => { */
  /*   const openai = new OpenAI({ */
  /*     apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!, */
  /*     dangerouslyAllowBrowser: true, */
  /*   }); */
  /*   const res = await openai.audio.translations.create({ */
  /*     file: file!, */
  /*     model: "whisper-1", */
  /*     response_format: "srt", */
  /*     temperature: 0.2, */
  /*   }); */
  /*   console.log(res); */
  /* }; */

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="file"
        name="file"
        accept="video/mp4"
        ref={fileInputRef}
        onChange={(e) => handleChange(e.target.files?.item(0))}
      />
      {/* <Button */}
      {/*   className="w-full my-4" */}
      {/*   onClick={() => fileInputRef?.current?.click()} */}
      {/* > */}
      {/*   Browse Video */}
      {/* </Button> */}
      <Button className="w-full" type="submit">
        Subtitle
      </Button>
      <Link href={link}>Halo</Link>
    </form>
  );
}
