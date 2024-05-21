import { NextResponse } from "next/server";
import wordsTR from "@/data/wordsTR.json";
import wordsEN from "@/data/wordsEN.json";

export async function POST(req: Request) {
  const body = await req.json();
  const { word, language } = body;

  try {
    if (language === "en") {
      const inDictionary = wordsEN.some(
        (item) => item.toLowerCase() === word.toLowerCase()
      );
      if (inDictionary)
        return NextResponse.json({
          success: true,
          length: word.length,
          language,
        });
      else
        return NextResponse.json({
          success: false,
          length: word.length,
          language,
        });
    } else if (language === "tr") {
      const inDictionary = wordsTR.some(
        (item) => item.toLowerCase() === word.toLowerCase()
      );
      if (inDictionary)
        return NextResponse.json({
          success: true,
          length: word.length,
          language,
        });
      else
        return NextResponse.json({
          success: false,
          length: word.length,
          language,
        });
    } else {
      return NextResponse.json('Only "tr" and "en" languages are allowed.');
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json('Only "tr" and "en" languages are allowed.');
  }
}
