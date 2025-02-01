import axios from "axios";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import _ from "lodash";

dotenv.config();

// 단기예보조회
export async function GET(req) {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst`;
  const today = new Date();
  const base_date =
    _.padStart(today.getFullYear(), 4, "0") +
    _.padStart(today.getMonth() + 1, 2, "0") +
    _.padStart(today.getDate(), 2, "0");

  // Base_time : 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회)
  // API 제공 시간(~이후) : 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10
  const hours = _.padStart(today.getHours(), 2, "0");
  const minutes = _.padStart(today.getMinutes(), 2, "0");
  const base_time = () => {
    return `${hours}${minutes}`;
  };
  const { searchParams } = new URL(req.url);
  const nx = searchParams.get("nx");
  const ny = searchParams.get("ny");

  const params = new URLSearchParams({
    serviceKey: apiKey,
    pageNo: 1,
    numOfRows: 1000,
    dataType: "JSON",
    base_date: base_date,
    base_time: base_time(),
    nx: nx,
    ny: ny,
  });

  try {
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
