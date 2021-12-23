import React, { useEffect, useState } from "react"
import { getCartList } from "../../apiCalls"
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
      const { json, totalPrice } = await getCartList()
      setCartList(json)
      setTotalPrice(totalPrice)
    })()
  }, [])

  const handleSubmit = () => {}
  return (
    <Container>
      <Row>
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
      <Row>
        <Col>
          <h4>배송지</h4>
          <Form onSubmit={handleSubmit} style={{ margin: "5%" }}>
            <FormGroup className="row">
              <Label>받는 사람</Label>
              <Input className="col" />
            </FormGroup>
            <FormGroup className="row">
              <Label>전화번호</Label>
              <Input className="col" /> - <Input className="col" /> -
              <Input className="col" />
            </FormGroup>
            <FormGroup className="row">
              <Label>주소</Label>
              <Input />
              <Input placeholder="상세주소1" />
              <Input placeholder="상세주소2" />
            </FormGroup>
          </Form>
        </Col>
        <Col>
          <h4>결제정보</h4>
          <Form onSubmit={handleSubmit} style={{ margin: "5%" }}>
            <FormGroup>
              <Label>카드선택</Label>
              <Input name="select" type="select">
                <option>비씨카드</option>
                <option>신한카드</option>
                <option>국민카드</option>
                <option>롯데카드</option>
                <option>삼성카드</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>성함</Label>
              <Input />
            </FormGroup>
            <FormGroup className="row">
              <Label>카드번호</Label>
              <Input className="col" />
              <Input className="col" />
              <Input className="col" />
              <Input className="col" />
            </FormGroup>
            <FormGroup className="row">
              <Label>유효기간</Label>
              <Input className="col" /> /
              <Input className="col" />
              <p className="col"></p>
              <p className="col"></p>
              <p className="col"></p>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Button>구매하기</Button>
    </Container>
  )
}

export default Cart
