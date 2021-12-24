import React, { useEffect, useState } from "react"
import { getCartInfo, orderCartItems } from "../../apiCalls"
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
  Table,
} from "reactstrap"

const Cart = (props) => {
  const [cartList, setCartList] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    ;(async () => {
      const { json, totalPrice } = await getCartInfo(props.userId)
      setCartList(json)
      setTotalPrice(totalPrice)
    })()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const cur = e.target
    const orderInfo = {
      receive_user: cur.receive_user.value,
      receive_user_tel1: cur.receive_user_tel1.value,
      receive_user_tel2: cur.receive_user_tel2.value,
      receive_user_tel3: cur.receive_user_tel3.value,
      receive_address1: cur.receive_address1.value,
      receive_address2: cur.receive_address2.value,
      receive_address3: cur.receive_address3.value,
      cart_dv: cur.cart_dv.value,
      card_user: cur.card_user.value,
      card_number1: cur.card_number1.value,
      card_number2: cur.card_number2.value,
      card_number3: cur.card_number3.value,
      card_number4: cur.card_number4.value,
      card_month: cur.card_month.value,
      card_year: cur.card_year.value,
      user_id: props.userId,
      total_price: totalPrice,
    }
    console.log(orderInfo)
    orderCartItems(orderInfo)
  }
  //장바구니가 비었을 때, 상품 목록으로 이동
  if (cartList.length === 0) {
    alert("장바구니가 비었습니다.")
    window.location.href = "/product"
  }
  return (
    <Container>
      <Row style={{ textAlign: "center" }}>
        <h1>구매하기</h1>
        <Table
          style={{
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <thead>
            <tr>
              <th>상품</th>
              <th style={{ width: "60%" }}>상품명</th>
              <th>수량</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            {cartList.map((product) => (
              <tr key={product.product_id}>
                <td>
                  <img
                    alt="상품썸네일"
                    src={product.image}
                    style={{ width: 100 }}
                  />
                </td>
                <td>
                  <a
                    style={{ margin: 0, fontSize: "inherit" }}
                    href={product.link}
                  >
                    {product.title}
                  </a>
                </td>
                <td>
                  <span>{product.amount}</span>
                </td>
                <td>
                  <span>{Number(product.l_price).toLocaleString()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div
          style={{
            textAlign: "center",
            fontSize: 20,
            backgroundColor: "#f3f3f3",
            padding: "2% 0",
            margin: "2% 0",
          }}
        >
          <span>총 금액 : </span>
          {totalPrice.toLocaleString()}
          <span>원</span>
        </div>
      </Row>
      <Form onSubmit={handleSubmit} style={{ margin: "0 5%" }}>
        <Row>
          <Col style={{ margin: "0 5%" }}>
            <h4>배송지</h4>
            <FormGroup className="row">
              <Label htmlFor="receive_user">받는 사람</Label>
              <Input id="receive_user" className="col" />
            </FormGroup>
            <FormGroup className="row">
              <Label>전화번호</Label>
              <Input id="receive_user_tel1" className="col" /> -{" "}
              <Input id="receive_user_tel2" className="col" /> -
              <Input id="receive_user_tel3" className="col" />
            </FormGroup>
            <FormGroup className="row">
              <Label>주소</Label>
              <Input id="receive_address1" />
              <Input
                id="receive_address2"
                className="gy-2"
                placeholder="상세주소1"
              />
              <Input
                id="receive_address3"
                className="gy-2"
                placeholder="상세주소2"
              />
            </FormGroup>
          </Col>
          <Col style={{ margin: "0 5%" }}>
            <h4>결제정보</h4>
            <FormGroup>
              <Label>카드선택</Label>
              <Input id="cart_dv" name="select" type="select">
                <option>비씨카드</option>
                <option>신한카드</option>
                <option>국민카드</option>
                <option>롯데카드</option>
                <option>삼성카드</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="card_user">성함</Label>
              <Input id="card_user" />
            </FormGroup>
            <FormGroup className="row">
              <Label>카드번호</Label>
              <Input id="card_number1" className="col" />
              <Input id="card_number2" className="col" />
              <Input id="card_number3" className="col" />
              <Input id="card_number4" className="col" />
            </FormGroup>
            <FormGroup className="row">
              <Label>유효기간</Label>
              <Input id="card_month" className="col" /> /
              <Input id="card_year" className="col" />
            </FormGroup>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button style={{ margin: "3% 0", width: "30%" }} type="submit">
            구매하기
          </Button>
        </Row>
      </Form>
    </Container>
  )
}

export default Cart
