import { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import { lunarCrushQuery } from "../queries/lunarcrush.query";
import { LunarCrushState } from "../store/lunarcrush.store";

const useLunarCrush = (): LunarCrushState | undefined => {
  const [coinOfTheDay, setCoinOfTheDay] = useState<LunarCrushState>();
  useEffect(() => {
    const subscriptions: Subscription[] = [
      lunarCrushQuery.coinOfTheDay$.subscribe({
        next: (result) => {
          setCoinOfTheDay((state) => ({
            ...state,
            ...result,
          }));
        },
        error: (error) => console.log(error),
      }),
    ];
    return () => {
      subscriptions.map((sub) => sub.unsubscribe());
    };
  }, []);
  return coinOfTheDay;
};

export default useLunarCrush;
/*


*/
