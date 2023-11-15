import { FacebookIcon, LinkedinIcon } from "lucide-react";
import {
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  RedditShareButton,
  RedditIcon,
} from "next-share";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

type Props = {
  tweets: string[];
  url: string;
};

export default function ResultBox({ tweets, url }: Props) {
  return (
    <div>
      {tweets.map((tweet, idx) => (
        <Card className="m-3" key={`tweet-${idx}`}>
          <CardContent className="pt-4">{tweet}</CardContent>
          <CardFooter>
            <div className="flex gap-2 justify-center">
              <TwitterShareButton title={`${tweet}`} url={url}>
                <TwitterIcon size={30} round />
              </TwitterShareButton>
              <FacebookShareButton title={`${tweet}`} url={url}>
                <FacebookIcon size={30} />
              </FacebookShareButton>
              <LinkedinShareButton title={`${tweet}`} url={url}>
                <LinkedinIcon size={30} />
              </LinkedinShareButton>
              <RedditShareButton title={`${tweet}`} url={url}>
                <RedditIcon size={30} round />
              </RedditShareButton>
              <WhatsappShareButton title={`${tweet}`} url={url}>
                <WhatsappIcon size={30} round />
              </WhatsappShareButton>
              <TelegramShareButton title={`${tweet}`} url={url}>
                <TelegramIcon size={30} round />
              </TelegramShareButton>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
