"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { respToResult } from "@/lib/utils";
import ResultBox from "@/components/ResultBox";
import { Loader2 } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import CardSkeleton from "@/components/CardSkeleton";
import { useLogger } from "next-axiom";
import { useToast } from "@/components/ui/use-toast";

/* const textTweet = { */
/*   tweets: [ */
/*     "Chinese companies, such as Huawei and Tencent, are leading the way in global patent holdings in the cybersecurity technology sector as tensions between the US and China escalate. #Cybersecurity #China #Technology", */
/*     "A report reveals that Chinese firms hold six of the top 10 global patent holdings in the cybersecurity technology sector, signaling their push for self-reliance amidst growing US-China tensions. #Huawei #Tencent #Patents", */
/*     "The US and China's rivalry has prompted Chinese companies, like Huawei and Tencent, to accelerate their patent holdings in the cybersecurity technology sector. Learn more about this trend and its implications. #USChinaTensions #Cybersecurity", */
/*   ], */
/* }; */

export default function UrlBox() {
  const [url, setUrl] = useState("");
  const [tweet, setTweet] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const log = useLogger();
  const { error } = useToast();

  const validateUrl = (url: string) => {
    const regex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    return regex.test(url);
  };

  const submit = async (url: string) => {
    try {
      setLoading(true);
      const isValidUrl = validateUrl(url);
      if (!isValidUrl) {
        setErrMessage("URL Invalid");
        return;
      }
      setErrMessage("");

      const res = await fetch("/api/generate/", {
        method: "POST",
        body: JSON.stringify({
          url,
        }),
      });
      const data = await respToResult(res);
      setTweet(data.tweets);
    } catch (e: any) {
      // Handle errors here
      log.error("User submit error", { message: e });
      error("Opps...", "Something happened. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  w-full justify-center">
      <div className="w-full md:w-1/2 ">
        <div className="flex pt-4 m-4">
          <Input
            autoFocus
            className="mr-4"
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL Article / Forum Post"
            disabled={loading}
          />
          <SignedIn>
            {!loading && <Button onClick={() => submit(url)}>Generate</Button>}
            {loading && (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating
              </Button>
            )}
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
        {errMessage !== "" && (
          <div className="ml-4 text-red-600 font-medium">{errMessage}</div>
        )}
        {loading && <CardSkeleton />}
        {tweet.length > 0 && !loading && (
          <div>
            <ResultBox tweets={tweet} url={url} />
          </div>
        )}
      </div>
    </div>
  );
}
