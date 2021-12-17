import { Route } from "react-router-dom"
import Header from "../route/Header"
import Footer from "../route/Footer"
import "bootstrap/dist/css/bootstrap.css"
import "../css/toy.css"

import Board from "./board/Board"
import Login from "./login/Login"
import Register from "./register/Register"
import Product from "./product/Product"
import Cart from "./cart/Cart"
import History from "./history/History"
import Naver from "./naver/Naver"
import { useState } from "react"

function App() {
  const [userId, setUserId] = useState("const@test.com")

  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/naverApi" component={Naver} />
      <Route exact path="/board" component={Board} />
      <Route path="/product" render={() => <Product userId={userId} />} />
      <Route path="/cart" render={() => <Cart userId={userId} />} />
      <Route path="/history" render={() => <History userId={userId} />} />
      <Footer />
    </div>
  )
}

export default App
