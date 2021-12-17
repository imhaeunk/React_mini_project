import axios from "axios"

//자동완성
const getAutoComplete = async (keyword) => {
  const url = "/api/naverApi?type=search"
  const {
    data: { items },
  } = await axios.post(url, { query: keyword })
  return items[0].map((item) => item[0])
}

export { getAutoComplete }
