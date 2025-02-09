import Skeleton from "../../loading";

export default function CurrentWeatherSkeleton() {
  return (
    <div style={{ padding: "40px 0" }}>
      <div>
        <Skeleton w={200} h={24} />
      </div>
      <div>
        <Skeleton w={630} h={72} style={{ marginTop: "20px" }} />
      </div>
    </div>
  );
}
