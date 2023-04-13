import { useState, useEffect } from 'react'

const usePersist = () => {
  let item = null

  if (typeof window !== 'undefined') {
    item = localStorage.getItem('persist')
  }

  const [persist, setPersist] = useState(item ? JSON.parse(item) : false)

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist))
  }, [persist])

  return [persist, setPersist]
}
export default usePersist
