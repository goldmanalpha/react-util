import { useRef, useState } from 'react'
import _ from 'lodash'

const useDebounceState = <T extends unknown>(
  initialValue: T,
  delayMs: number = 1000
): [T, T, (newValue: T, forceDbSet?: boolean) => void] => {
  const [state, setState] = useState(initialValue)
  const [stateDb, setStateDb] = useState(initialValue)

  console.log(delayMs)

  const setDebounced = useRef(
    _.debounce((newValue: T) => {
      setStateDb(newValue)
    }, delayMs)
  ).current

  const setStateBoth = (newValue: T, forceDbSet: boolean = false) => {
    setState(newValue)

    setDebounced(newValue)
    if (forceDbSet) {
      setDebounced.flush()
    }
  }

  // return [state, stateDb, setStateBoth]
  return [state, stateDb, setStateBoth]
}

export default useDebounceState
