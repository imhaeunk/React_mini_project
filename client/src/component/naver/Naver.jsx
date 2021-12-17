import React, { useEffect, useState } from "react"
import { getAutoComplete } from "../../apiCalls"
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap"

const Naver = (props) => {
  const [keyword, setKeyword] = useState("")
  const [keywordList, setKeywordList] = useState([])

  useEffect(() => {
    ;(async () => {
      //useEffect안에서 async 사용해야 될 때 쓰는 형식
      const data = await getAutoComplete(keyword)
      setKeywordList(data)
      console.log(data)
    })()
  }, [keyword])

  const handleChange = (e) => {
    setKeyword(e.target.value)
  }
  return (
    <Container>
      <Row>
        <Col>
          <h2>최저가 상품 조회 및 등록 하기</h2>
          <InputGroup>
            <Input value={keyword} onChange={handleChange} />
            <Button>검색</Button>
          </InputGroup>
          <ListGroup>
            {keywordList.map((keyword) => (
              <ListGroupItem>{keyword}</ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default Naver
