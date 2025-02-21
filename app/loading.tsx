import styles from "./styles/skeleton.module.scss";

interface SkeletonProps {
  w: number;
  h: number;
  radius?: number;
  wUnit?: string;
  style?: React.CSSProperties;
}

export default function Skeleton({
  w,
  h,
  wUnit = "px",
  radius = 5,
  style,
}: SkeletonProps) {
  const size: React.CSSProperties = {
    width: `${w}${wUnit}`,
    height: `${h}px`,
    borderRadius: `${radius}px`,
  };

  return <div className={styles.container} style={{ ...size, ...style }} />;
}
