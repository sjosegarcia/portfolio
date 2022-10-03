/*
import { of, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import {
  LunarCrushState,
  lunarCrushStore,
  LunarCrushStore,
} from "../store/lunarcrush.store";

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_LUNARCRUSH_API_KEY}`,
};

export class LunarCrushQuery extends Query<LunarCrushState> {
  coinOfTheDay$ = fromFetch("https://lunarcrush.com/api3/coinoftheday", {
    headers: headers,
  }).pipe(
    switchMap((response) => {
      if (response.ok) {
        return response.json();
      }
      return of({
        error: true,
        message: `Could not pull data from LunarCrush ${response.json()}`,
      });
    })
  );

  constructor(protected store: LunarCrushStore) {
    super(store);
  }
}

export const lunarCrushQuery = new LunarCrushQuery(lunarCrushStore);
*/
