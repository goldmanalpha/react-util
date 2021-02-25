import useDebounceState from './useDebounceState';
import _ from 'lodash';

interface Options {
  delayMs: number;
}

interface Updater<T> {
  (selection: T, forceDbSet?: boolean): void;
  clear: () => void;
  reset: () => void;
}

const useOptionManager = <T extends string>(
  initialValues: T[],
  options: Options
): [T[], T[], Updater<T>] => {
  const { delayMs = 1000 } = { ...(options || {}) };

  const [state, stateDb, setState] = useDebounceState(initialValues, delayMs);

  const updater = (key: T, forceDbSet: boolean = false) => {
    const xord = _.xor(state, [key]);
    setState(xord, forceDbSet);
  };

  updater.clear = () => {
    setState([]);
  };

  updater.reset = () => {
    setState(initialValues);
  };

  return [state, stateDb, updater];
};

export default useOptionManager;
