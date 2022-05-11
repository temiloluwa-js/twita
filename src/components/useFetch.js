import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState({})
    const [error, setError] = useState('')
    const [pending, setPending] = useState(true)

    useEffect(() => {
        axios.get(url)
        .then(response => setData(response.data))
        .then(setPending(false))
        .catch(err => setError(err.message))
    },  [url])
  return {data, error, pending}
}

export default useFetch