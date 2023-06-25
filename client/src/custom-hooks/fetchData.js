import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_BASE_URL

const useFetch = (query) => {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  })
  useEffect(() => {
    if (!query) return
    const fetchData = async () => {
      try {
        setData((prevState) => ({ ...prevState, isLoading: true }))
        const { data, status } = await axios.get(`/api/v1/${query}`)
        if (status === 201 || status === 200) {
          setData((prevState) => ({
            ...prevState,
            isLoading: false,
            status: status,
            apiData: data,
          }))
        }
        setData((prevState) => ({ ...prevState, isLoading: false }))
      } catch (error) {
        setData((prevState) => ({
          ...prevState,
          isLoading: false,
          serverError: error,
        }))
      }
    }
    fetchData()
  }, [query])

  return [getData, setData]
}

export default useFetch
