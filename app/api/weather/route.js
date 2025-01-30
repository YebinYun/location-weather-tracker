import axios from "axios";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import _ from "lodash";

dotenv.config();

// 초단기실황조회
export async function GET(req) {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst`;
  const today = new Date();
  const base_date =
    _.padStart(today.getFullYear(), 4, "0") +
    _.padStart(today.getMonth() + 1, 2, "0") +
    _.padStart(today.getDate(), 2, "0");

  // 매시간 정시에 생성되고 10분마다 최신 정보로 업데이트
  const hours = _.padStart(today.getHours(), 2, "0");
  const minutes = _.padStart(today.getMinutes(), 2, "0");
  const base_time = () => {
    if (minutes < 10) {
      return `${String(parseInt(hours) - 1).padStart(2, "0")}00`; // 00, 01, 02, ..., 09 분일 경우
    } else {
      return `${hours}00`; // 10, 11, 12, ..., 59 분일 경우
    }
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
