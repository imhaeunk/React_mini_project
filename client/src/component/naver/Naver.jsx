import React, { useEffect, useState } from "react"
import { getNaverKeywords, getNaverProducts, addProduct } from "../../apiCalls"
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

const Naver = (props) => {
  const [keyword, setKeyword] = useState("")
  const [keywordList, setKeywordList] = useState([])
  const [NproductList, setNProductList] = useState([])
  const [trigger, setTrigger] = useState(0)
  //트리거를 쓰는 이유는 이벤트가 일어났을 때 useEffect를 작동하게 하려고 ex)온클릭했을때 함수이름을 써주면 그 함수를 호출할 수 있지만 useEffect는 이름이 없어서, 어떠한 값을 변경시켜주면서 작동시킬 수 있기 때문에 trigger라는 state를 만들어줌.

  useEffect(() => {
    if (keyword === "") return
    ;(async () => {
      const data = await getNaverProducts(keyword)
      setNProductList(data)
    })()
  }, [trigger])

  //input 키보드이벤트 발생시
  const handleChange = async (e) => {
    setKeyword(e.target.value)
    const data = await getNaverKeywords(e.target.value)
    setKeywordList(data)
  }
  //Enter로 검색
  const searchByEnter = async (e) => {
    if (e.key === "Enter") {
      const data = await getNaverProducts(keyword)
      setNProductList(data)
      setKeywordList([]) //자동완성 목록 안보이게
    }
  }
  //자동완성되는 연관검색어를 클릭시
  const searchRelatedKeyword = async (word) => {
    setKeyword(word) //클릭한 키워드로 인풋창의 값을 바꿔줌
    setKeywordList([]) //자동완성 목록 안보이게
  }

  //상품 등록 버튼 클릭시
  const registerProduct = async (itemInfo) => {
    // 받아온 아이템 정보로 상품 등록 api이용
    await addProduct(itemInfo)
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>최저가 상품 조회 및 등록 하기</h2>
          <InputGroup>
            <Input
              value={keyword}
              onChange={handleChange}
              onKeyPress={searchByEnter}
            />
            <Button
              onClick={async () => {
                const data = await getNaverProducts(keyword)
                setNProductList(data)
              }}
            >
              검색
            </Button>
          </InputGroup>
          <ListGroup>
            {keywordList.map((word, i) => (
              <ListGroupItem
                key={i}
                onClick={() => {
                  setTrigger((prev) => prev + 1)
                  searchRelatedKeyword(word)
                }}
              >
                {word}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Table
          style={{
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >
          <thead>
            <tr>
              <th>제품</th>
              <th style={{ width: "50%" }}>상품명</th>
              <th>제조사</th>
              <th>가격</th>
              <th>등록</th>
            </tr>
          </thead>
          <tbody>
            {NproductList.map((product) => (
              <tr key={product.productId}>
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
                  <span>{product.maker}</span>
                </td>
                <td>
                  <span>{Number(product.lprice).toLocaleString()}</span>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      registerProduct(product)
                    }}
                  >
                    등록
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  )
}

export default Naver
