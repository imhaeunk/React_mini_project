import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Container, Table } from "reactstrap"
import { getOrderList, getOrderDetail } from "../../apiCalls"

const History = (props) => {
  const [orderList, setOrderList] = useState([])
  const [detail, setDetail] = useState([])
  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      const orders = await getOrderList(props.userId)
      setOrderList(orders)
    })()
  }, [])
  return (
    <Container>
      <h1>구매 내역</h1>
      <Table
        style={{
          textAlign: "center",
          verticalAlign: "middle",
        }}
      >
        <thead>
          <tr>
            <th>주문 번호</th>
            <th>주문 일시</th>
            <th>결제 금액</th>
            <th>상세 보기</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((product) => (
            <tr key={product.order_id}>
              <td>
                {/* 주문번호 */}
                {product.order_id}
              </td>
              <td>
                {/* 주문일시 */}
                {product.insert_date}
              </td>
              <td>
                {/* 결제금액 */}
                {product.total_price.toLocaleString()}
              </td>
              <td>
                <Button
                  onClick={() => {
                    history.push({
                      pathname: `/history/detail/${product.order_id}`,
                      state: { orderId: product.order_id },
                    })
                  }}
                >
                  상세보기
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default History
