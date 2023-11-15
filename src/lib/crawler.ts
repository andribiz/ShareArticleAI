import axios from "axios";
import cheerio from "cheerio";

const reduceText = (texts: string): string => {
  const cut_count = Math.round((texts.length - 4097) / 2) + 1;
  console.log(`Cutting Count: ${cut_count} `);

  return texts.slice(cut_count + 1, texts.length - cut_count);
};

export default async function crawl(url: string) {
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
