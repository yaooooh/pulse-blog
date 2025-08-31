import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface LoadingProps {
  visible: boolean;
  message?: string;
}

// Loading组件实现
const LoadingComponent: React.FC<LoadingProps> = ({ visible, message = "加载中..." }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    } else {
      // 添加延迟以允许退出动画完成
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!isMounted || !shouldRender) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-80 transition-opacity duration-300">
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={faPaw}
          size="3x"
          className="text-amber-400 mb-4"
          bounce
        />
        {message && <p className="text-gray-700 mt-2 text-lg">{message}</p>}
      </div>
    </div>,
    document.body
  );
};

export default LoadingComponent;
