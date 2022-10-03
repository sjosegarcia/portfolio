import React, { FC } from "react";
import useLunarCrush from "../bloc/hooks/lunarcrush.hook";

const Dashboard: FC = () => {
  const coinOfTheDay = undefined; // useLunarCrush();
  console.log(coinOfTheDay);
  return (
    <div>
      {/* coinOfTheDay !== undefined ? (
        <span className="text-black text-9xl">{coinOfTheDay.symbol}</span>
      ) : (
        <> </>
      ) */}
    </div>
  );
};

export default Dashboard;
