import axios from "axios";
import { NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config();

export async function GET() {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst`;

  const params = new URLSearchParams({
    serviceKey: apiKey,
    pageNo: 1,
    numOfRows: 1000,
    dataType: "JSON",
    base_date: 20250127,
    base_time: "0630",
    nx: 55,
    ny: 127,
  });

  try {
    console.log("apiKey", apiKey);
    const response = await axios.get(`${url}?${params.toString()}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
