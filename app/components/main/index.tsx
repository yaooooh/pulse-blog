'use client';

import ThemeWrapper from "../../../components/theme";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeWrapper>
      <div className="min-h-[calc(100vh-132px)] overflow-hidden flex justify-around items-center">
        <div className="flex-1">
          {children}
        </div>
      </div>
    </ThemeWrapper>
  )
}

export default Main;
