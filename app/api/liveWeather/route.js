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
  const hours = _.padStart(today.getHours(), 2, "0");
  const minutes = _.padStart(today.getMinutes(), 2, "0");
  const currentTime = hours + minutes;

  // Base_time : 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회)
  // API 제공 시간(~이후) : 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10
  const getBaseTime = () => {
    let returnBaseTime;
    // 각 기준 시간에 따른 반환 로직
    if (currentTime < "0210") returnBaseTime = "2310";
    else if (currentTime < "0510") returnBaseTime = "0210";
    else if (currentTime < "0810") returnBaseTime = "0510";
    else if (currentTime < "1110") returnBaseTime = "0810";
    else if (currentTime < "1410") returnBaseTime = "1110";
    else if (currentTime < "1710") returnBaseTime = "1410";
    else if (currentTime < "2010") returnBaseTime = "1710";
    else if (currentTime < "2310") returnBaseTime = "2010";
    else returnBaseTime = "2310"; // 모든 시간이 지나쳤을 경우

    console.log("currentTime", currentTime);
    return returnBaseTime;
  };

  const base_date =
    _.padStart(today.getFullYear(), 4, "0") +
    _.padStart(today.getMonth() + 1, 2, "0") +
    // 02시 이전일 경우 전날 데이터
    (hours === "00" || hours === "01" || currentTime < "0210"
      ? _.padStart(today.getDate() - 1, 2, "0")
      : _.padStart(today.getDate(), 2, "0"));

  const { searchParams } = new URL(req.url);
  const nx = searchParams.get("nx");
  const ny = searchParams.get("ny");

  const params = new URLSearchParams({
    serviceKey: apiKey,
    pageNo: 1,
    numOfRows: 1000,
    dataType: "JSON",
    base_date: base_date,
    base_time: getBaseTime(),
    nx: nx,
    ny: ny,
  });

  try {
    const response = await axios.get(`${url}?${params.toString()}`);
    const items = response.data.response.body.items.item;
    const filteredData = items.reduce(
      (acc, item) => {
        switch (item.category) {
          case "TMP":
            acc.time.push(item.fcstTime); // 시간
            acc.temperature.push(parseFloat(item.fcstValue)); // 기온
            break;
          case "POP":
            acc.precipitationProbability.push(item.fcstValue); // 강수확률
            break;
          case "PTY":
            acc.precipitation.push(item.fcstValue); // 강수량
            break;
          case "WSD":
            acc.wind.push(item.fcstValue); // 바람(풍속)
            break;
          case "REH":
            acc.humidity.push(item.fcstValue); // 습도
            break;
          default:
            break; // 필요한 다른 카테고리는 무시
        }
        return acc;
      },
      {
        time: [],
        temperature: [],
        precipitationProbability: [],
        precipitation: [],
        wind: [],
        humidity: [],
      }
    );
    const limitedData = {
      time: filteredData.time.slice(0, 24),
      temperature: filteredData.temperature.slice(0, 24),
      precipitationProbability: filteredData.precipitationProbability.slice(
        0,
        24
      ),
      precipitation: filteredData.precipitation.slice(0, 24),
      wind: filteredData.wind.slice(0, 24),
      humidity: filteredData.humidity.slice(0, 24),
    };

    return NextResponse.json(limitedData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
