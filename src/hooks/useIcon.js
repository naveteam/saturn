import { useMemo } from 'react'

const useIcon = icon => {
  const src = useMemo(() => {
    try {
      return require(`../assets/icons/${icon}.svg`).default
    } catch {
      return require('../assets/icons/clear.svg').default
    }
  }, [icon])

  return src
}

export default useIcon
