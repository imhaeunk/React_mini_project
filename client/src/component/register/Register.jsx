import React from "react"
import { insertUser } from "../../apiCalls"
import { useForm } from "react-hook-form"
import { Button, Container, Form, Input, Label } from "reactstrap"
const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  //데이터 전송시 작동할 함수 정의
  const onSubmit = async (data) => {
    console.log(data)
    try {
      const result = await insertUser(data)
      if (result === "success") {
        alert("회원가입이 완료되었습니다")
      }
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <Container style={{}}>
      <h1>회원가입</h1>
      <Form
        style={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "40%",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label style={{ width: "50px" }} sm={1} htmlFor="email">
          이메일
        </Label>
        <input
          id="email"
          {...register("user_email", {
            required: {
              value: true,
              message: "이메일은 필수 입력값입니다.",
            },
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
              message: "이메일 형식이 올바르지 않습니다.",
            },
          })}
        />
        {errors?.email?.message}
        <br />
        <Label style={{ width: "50px" }} sm={1} htmlFor="password">
          비밀번호
        </Label>
        <input
          id="password"
          type="password"
          {...register("user_password", {
            required: {
              value: true,
              message: "비밀번호는 필수 입력값입니다.",
            },
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상입니다.",
            },
          })}
        />
        <br />
        <Label style={{ width: "50px" }} sm={1} htmlFor="major">
          전공
        </Label>
        <input
          id="major"
          type="text"
          {...register("user_major", {
            required: {
              value: true,
              message: "전공은 필수 입력값입니다.",
            },
          })}
        />
        <br />
        <Label style={{ width: "50px" }} sm={1} htmlFor="phone">
          연락처
        </Label>
        <input
          id="phone"
          type="text"
          {...register("user_phone", {
            required: {
              value: true,
              message: "핸드폰 번호는 필수 입력값입니다.",
            },
          })}
        />
        <br />
        <Label style={{ width: "50px" }} sm={1} htmlFor="name">
          이름
        </Label>
        <input
          id="name"
          type="text"
          {...register("user_name", {
            required: {
              value: true,
              message: "이름은 필수 입력값입니다.",
            },
          })}
        />
        <br />
        <Label style={{ width: "50px" }} sm={1} htmlFor="job">
          직업
        </Label>
        <input
          id="job"
          type="text"
          {...register("user_org", {
            required: {
              value: true,
              message: "직업은 필수 입력값입니다.",
            },
          })}
        />
        <br />
        <Button style={{}} type="submit">
          등록
        </Button>
      </Form>
    </Container>
  )
}

export default Register
