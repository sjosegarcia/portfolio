import { Observable, BehaviorSubject } from "rxjs";

type GetSecondArgumentOfAnyFunction<T> = T extends (
  first: any,
  second: infer SecondArgument,
  ...args: any[]
) => any
  ? SecondArgument
  : never;

type Handlers<V, C> = {
  [K in keyof C]: C[K] extends (arg1: any) => any
    ? () => V
    : C[K] extends (arg1: any, arg2: any) => any
    ? (payload: GetSecondArgumentOfAnyFunction<C[K]>) => V
    : never;
};

export interface Config<V> {
  [key: string]: (value: V, payload?: any) => V;
}

export const createStore = <V, C extends Config<V>>(
  initValue: V,
  config: C
): Handlers<V, C> & {
  value$: Observable<V>;
  readonly value: V;
} => {
  const subject = new BehaviorSubject(initValue);
  const value$ = subject.asObservable();

  const handlers = Object.keys(config).reduce<Handlers<V, C>>((acc, key) => {
    return {
      ...acc,
      [key]: (payload?: any) => {
        const newValue = config[key](subject.getValue(), payload);

        subject.next(newValue);

        return newValue;
      },
    };
  }, {} as Handlers<V, C>);

  return {
    ...handlers,
    value$,
    get value() {
      return subject.getValue();
    },
  };
};
