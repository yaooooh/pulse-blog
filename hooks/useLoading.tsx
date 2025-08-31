// hooks/useLoading.ts
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Loading组件
const LoadingComponent = ({ visible, message }: { visible: boolean; message?: string }) => {
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    } else {
      // 延迟卸载以允许动画完成
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!shouldRender) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={faPaw}
          bounce
          size="3x"
          className="text-amber-400 mb-4"
        />
        {message && <p className="text-gray-700 mt-2">{message}</p>}
      </div>
    </div>,
    document.body
  );
};

// 直接Hook实现
const useLoading = (initialVisible = false) => {
  const [visible, setVisible] = useState(initialVisible);
  const [message, setMessage] = useState<string | undefined>();

  const show = (msg?: string) => {
    setMessage(msg);
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  // 返回控制方法和Loading组件
  return {
    visible,
    show,
    close,
    Loading: () => <LoadingComponent visible={visible} message={message} />
  };
};

export default useLoading;