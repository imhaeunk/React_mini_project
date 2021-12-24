import axios from "axios"

const user_id = "const@test.com"

//회원가입
const insertUser = async (userInfo) => {
  const url = "/api/user?type=signup"
  const { data } = await axios.post(url, { ...userInfo })
  return data
}

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
  } = await axios.post(url, { user_id })
  return json
}

// 카트 ID 조회
const getCartId = async (user_id) => {
  const url = "/api/cart?type=cart_id"
  const {
    data: { json },
  } = await axios.post(url, { user_id })
  console.log("getCartId API: ", json[0].cart_id)
  return json[0].cart_id
}

//상품 장바구니에 담기(구매하기 탭) +카트아이디 조회와 동시에 이루어져야함
const addToCart = async (product_id) => {
  const url = "/api/cart?type=save"
  const cart_id = await getCartId(user_id) //카트아이디 조회
  const { data } = await axios.post(url, {
    cart_id,
    product_id,
    user_id,
  })
  console.log("addToCart API : ", data)
}
// 장바구니 정보 가져오기
// await 여러개 쓸 경우에 서로 기다리지 않아도 되도록 한번에 보내기 위해 Promise.all을 쓴다.
const getCartInfo = async (user_id) => {
  const [json, cart_id] = await Promise.all([
    getCartList(user_id),
    getCartId(user_id),
  ])
  //totalPrice를 Promise.all 밖에 쓴 이유는 cart_id를 받은 후에 실행되야 되기 때문이다.
  const totalPrice = await getTotalPrice(cart_id, user_id)

  return { json, totalPrice }
}

//장바구니 리스트 조회
const getCartList = async (user_id) => {
  const url = "/api/cart?type=list"
  const {
    data: { json },
  } = await axios.post(url, { user_id })

  return json
}

//장바구니 총 금액
const getTotalPrice = async (cart_id, user_id) => {
  const url = "/api/cart?type=totalPrice"
  const {
    data: { json },
  } = await axios.post(url, { cart_id, user_id })
  // console.log("Total price: ", json[0].total_price)
  return json[0].total_price
}

// 주문 완료
const completeOrder = async (cart_id, user_id) => {
  const url = "/api/cart?type=modify"
  const { data } = await axios.post(url, {
    cart_id,
    user_id,
    complete_yn: "Y",
  })
  console.log("완료 API:", data)
}

//장바구니 주문 + 완료와 동시에 이루어져야함.
const orderCartItems = async (orderInfo) => {
  const url = "/api/cart?type=order"
  const cart_id = await getCartId(user_id) //카트아이디 조회
  console.log(orderInfo)
  const { data } = await axios.post(url, {
    ...orderInfo,
    complete_yn: "Y",
    cart_id,
  })
  console.log("주문 API : ", data)
  await completeOrder(cart_id, user_id)
}
export {
  insertUser,
  getNaverKeywords,
  getNaverProducts,
  getProducts,
  addProduct,
  addToCart,
  getCartInfo,
  orderCartItems,
}
