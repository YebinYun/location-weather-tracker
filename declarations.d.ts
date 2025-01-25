declare module "*.pdf" {
  const src: string;
  export default src;
}

// JSX 네임스페이스 정의 추가
declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    [elem: string]: any;
  }
}
