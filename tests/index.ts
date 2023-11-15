// import crawl from "@/lib/crawler";
// import axios from "axios";
const axios = require("axios");
// import cheerio from "cheerio";
const cheerio = require("cheerio");

const reduceText = (texts: string): string => {
  const cut_count = Math.round((texts.length - 4097) / 2) + 1;
  console.log(`Cutting Count: ${cut_count} `);

  return texts.slice(cut_count + 1, texts.length - cut_count);
};

async function crawl(url: string) {
  const resp = await axios.get(url);
  const $ = cheerio.load(resp.data);
  const contents = $("body *")
    .contents()
    .toArray()
    .map((element: any) =>
      element.type === "text" &&
      !["style", "script"].includes(element.parent.name)
        ? {
            tag: element.parent.name,
            type: element.type,
            text: $(element).text().trim(),
          }
        : null
    )
    .filter((content: any) => content !== null && content.text !== "");

  const texts = contents.map((content: any) => content.text).join();
  if (texts.length > 4097) {
    return reduceText(texts);
  }
  return texts;
}

async function main() {
  const url =
    "https://nasional.kompas.com/read/2023/11/15/12054791/profil-capres-cawapres-nomor-urut-2-prabowo-gibran-parpol-pendukung-dan";
  const res = await crawl(url);
  console.log(res);
  console.log(res.length);
}

main().catch((err) => console.log(err));
