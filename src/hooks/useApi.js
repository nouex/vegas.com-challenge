import { useEffect, useState } from "react"

const useApi = (path) => {
  const [data, setData] = useState(null)
  const url = `http://localhost:8888/${path}`

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(json => {
        setData(json)
      })
      .catch(e => console.log(e))
  }, [url])

  return [data, setData]
}

export default useApi
