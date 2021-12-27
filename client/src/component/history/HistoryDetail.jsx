import React from "react"
import { useLocation } from "react-router"

const HistoryDetail = ({ userId }) => {
  const location = useLocation()
  const orderId = location.state.orderId

  return (
    <div>
      <div>{orderId}</div>
      <div>{userId}</div>
    </div>
  )
}

export default HistoryDetail
