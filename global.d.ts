declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.css';


declare global {
  interface Window {
    pulse_web: Function;
    // 可以继续添加更多属性
  }
}
