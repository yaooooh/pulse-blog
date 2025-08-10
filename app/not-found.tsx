// app/not-found.tsx
// "use client";
import Link from "next/link";
import { Button } from "antd";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-white px-4 text-center dark:bg-black">
      <h1 className="text-8xl font-bold bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent">
        404
      </h1>
      <p className="mt-4 text-2xl dark:text-grey-100 text-gray-700">页面未找到</p>

      <div className="mt-8 space-x-4">
        <Button type="primary">
          <Link href="/">返回首页</Link>
        </Button>
        <Button>
          <Link href="/support">联系客服</Link>
        </Button>
      </div>
    </div>
  );
}
