import axios from "axios";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import _ from "lodash";

dotenv.config();

export async function GET(req) {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst`;
  const today = new Date();
  const base_date =
    _.padStart(today.getFullYear(), 4, "0") +
    _.padStart(today.getMonth() + 1, 2, "0") +
    _.padStart(today.getDate(), 2, "0");

  today.setMinutes(today.getMinutes() - 20);
  const hours = _.padStart(today.getHours(), 2, "0");
  const minutes = _.padStart(today.getMinutes(), 2, "0");
  const base_time = `${hours}${minutes}`;

  const { searchParams } = new URL(req.url);
  const nx = searchParams.get("nx");
  const ny = searchParams.get("ny");

  const params = new URLSearchParams({
    serviceKey: apiKey,
    pageNo: 1,
    numOfRows: 1000,
    dataType: "JSON",
    base_date: base_date,
    base_time: base_time,
    nx: nx,
    ny: ny,
  });

  try {
    console.log("base_date", base_date, "base_time", base_time, "nx", nx);
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
