import axios from "axios";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import _ from "lodash";

dotenv.config();

// 실시간 예보조회
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
  const getBaseTime = () => {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();

    // 현재 시간 문자열 생성
    const currentTime = _.padStart(hours, 2, "0") + _.padStart(minutes, 2, "0");

    // 반환할 base_time
    let returnBaseTime;

    // 각 기준 시간에 따른 반환 로직
    if (currentTime < "0510") returnBaseTime = "0210";
    else if (currentTime < "0810") returnBaseTime = "0510";
    else if (currentTime < "1110") returnBaseTime = "0810";
    else if (currentTime < "1410") returnBaseTime = "1110";
    else if (currentTime < "1710") returnBaseTime = "1410";
    else if (currentTime < "2010") returnBaseTime = "1710";
    else if (currentTime < "2310") returnBaseTime = "2010";
    else returnBaseTime = "2310"; // 모든 시간이 지나쳤을 경우

    return returnBaseTime;
  };

  console.log(getBaseTime());

  const { searchParams } = new URL(req.url);
  const nx = searchParams.get("nx");
  const ny = searchParams.get("ny");

  const params = new URLSearchParams({
    serviceKey: apiKey,
    pageNo: 1,
    numOfRows: 1000,
    dataType: "JSON",
    base_date: base_date,
    base_time: 2000,
    nx: nx,
    ny: ny,
  });

  try {
    console.log(getBaseTime());
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
