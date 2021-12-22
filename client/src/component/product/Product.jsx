import React, { useEffect, useState } from "react"
import { getProducts, addToCart } from "../../apiCalls"
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Row,
  Table,
} from "reactstrap"
const Product = (props) => {
  const [productList, setProductList] = useState([])

  useEffect(() => {
    ;(async () => {
      const data = await getProducts()
      console.log(data)
      setProductList(data)
    })()
  }, [])

  return (
    <Container>
      <h1>상품</h1>
      <Table
        style={{
          textAlign: "center",
          verticalAlign: "middle",
        }}
      >
        <thead>
          <tr>
            <th>카테고리</th>
            <th>상품</th>
            <th style={{ width: "40%" }}>상품명</th>
            <th>가격</th>
            <th>담기</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.product_id}>
              <td>
                <span>
                  {product.category1}
                  <br />
                  {product.category2}
                  <br />
                  {product.category3}
                  <br />
                  {product.category4}
                </span>
              </td>
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
                <span>{Number(product.l_price).toLocaleString()}</span>
              </td>
              <td>
                <Button
                  onClick={() => {
                    addToCart(product.product_id)
                  }}
                >
                  담기
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Product
