import axios from "axios"

//회원가입

//자동완성
const getNaverKeywords = async (keyword) => {
  const url = "/api/naverApi?type=search"
  const {
    data: { items },
  } = await axios.post(url, { query: keyword })
  return items[0].map((item) => item[0])
}

//상품 조회 (상품등록 탭)
const getNaverProducts = async (keyword) => {
  const url = "/api/naverApi?type=shopList"
  const {
    data: { items },
  } = await axios.post(url, { query: keyword, start: 1 })
  console.log(items)
  return items
}

//상품 등록 (상품등록 탭)
const addProduct = async (itemInfo) => {
  const url = "/api/naverApi?type=save"
  const { data } = await axios.post(url, {
    ...itemInfo,
    h_price: itemInfo.hprice,
    l_price: itemInfo.lprice,
    mall_name: itemInfo.mallName,
    product_id: itemInfo.productId,
    product_type: itemInfo.productType,
    product_count: 1,
  })
  console.log(data)
}

//등록한 상품 조회(구매하기 탭)
const getProducts = async () => {
  const url = "/api/product?type=list"
  const {
    data: { json },
  } = await axios.post(url, { user_id: "const@test.com" })
  return json
}
// 카트 ID 조회
const getCartId = async () => {
  const url = "/api/cart?type=cart_id"
  const { data } = await axios.post(url, { user_id: "const@test.com" })
  console.log("getCartId API: ", data)
  // return data
}

//상품 장바구니에 담기(구매하기 탭) +카트아이디 조회와 동시에 이루어져야함
const addToCart = async (product_id) => {
  const url = "/api/cart?type=save"
  const cart_id = getCartId() //카트아이디 조회
  const { data } = await axios.post(url, {
    cart_id,
    product_id,
    user_id: "const@test.com",
  })
  console.log("addToCart API : ", data)
}

export {
  getNaverKeywords,
  getNaverProducts,
  getProducts,
  addProduct,
  getCartId,
  addToCart,
}
