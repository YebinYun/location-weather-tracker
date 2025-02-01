declare module "*.pdf" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const content: string;
  export default content;
}

// JSX 네임스페이스 정의 추가
declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    [elem: string]: any;
  }
}
