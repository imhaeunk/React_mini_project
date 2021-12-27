import axios from "axios"
import React, { useState } from "react"
import { signIn } from "../../apiCalls"
import { Button, Container, Form, Input, InputGroup, Label } from "reactstrap"
import Swal from "sweetalert2"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Todo: 다른 기능들이 로그인이 되고 들어갈 수 있게

  const handleIdChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePwChange = (e) => {
    setPassword(e.target.value)
  }

  const fncLogin = async (e) => {
    e.preventDefault()
    //값이 정상적으로 입력되었는지 체크
    if (!(email && password)) {
      sweetalert("이메일과 비밀번호를 확인해주세요", "", "info", "닫기")
    }
    const data = await signIn(email, password) //로그인 API 호출
    console.log(data)

    //로그인 검증(강사님 코드)
    // if (email) {
    //   sweetalert("로그인되었음", "", "info", "닫기")
    //   //로그인 후 세션 유효기간 60분으로 설정
    //   const expires = new Date()
    //   expires.setMinutes(expires.getMinutes() + 60)
    //   //jwt
    //   axios
    //     .post("/api/user?type=webtoken", {
    //       user_email: email,
    //       user_name: user_name,
    //     })
    //     .then((response) => {
    //       console.log(response.data)
    //       console.log("token_id", response.data.token_id)
    //       console.log("token_name", response.data.token_name)

    //       cookie.save("token_id", response.data.token_id, {
    //         //특정 url에 쿠키를 저장하고 싶을 때 path 설정 "/"는 모든 url에 적용
    //         path: "/",
    //         expires,
    //       })
    //       cookie.save("token_name", response.data.token_name, {
    //         //특정 url에 쿠키를 저장하고 싶을 때 path 설정 "/"는 모든 url에 적용
    //         path: "/",
    //         expires,
    //       })
    //       cookie.save("user_password", password, response.data.token_name, {
    //         //특정 url에 쿠키를 저장하고 싶을 때 path 설정 "/"는 모든 url에 적용
    //         path: "/",
    //         expires,
    //       })
    //     })
    //     .catch((error) => {
    //       sweetalert("오류발생", error, "error", "닫기")
    //     })
    //   setTimeout(function () {
    //     window.location.href = "/naverApi"
    //   }, 1000)
    // } else {
    //   sweetalert("아이디 or 패스워드 틀림", "", "error", "닫기")
    // }
  }

  const sweetalert = (title, showConfirmButton, icon) => {
    Swal.fire({
      position: "bottom-end",
      icon: icon,
      title: title,
      showConfirmButton: showConfirmButton,
      timer: 1000,
    })
  }

  return (
    <Container style={{ textAlign: "center" }}>
      <h2>로그인</h2>
      <Form onSubmit={fncLogin}>
        <InputGroup>
          <Label sm={1} htmlFor="email">
            아이디
          </Label>
          <Input value={email} onChange={handleIdChange} id="email" />
        </InputGroup>
        <InputGroup>
          <Label sm={1} htmlFor="password">
            비밀번호
          </Label>
          <Input value={password} onChange={handlePwChange} id="pasword" />
        </InputGroup>
        <Button type="submit">로그인</Button>
      </Form>
    </Container>
  )
}

export default Login
