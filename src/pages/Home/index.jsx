import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, generatePath } from 'react-router-dom'
import { Badge, Rate, Row, Col, Button, Form, Input } from 'antd'
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaHeart } from 'react-icons/fa'
import Slider from 'react-slick'

import { getProductListAction, getCategoryListAction } from '../../redux/actions'
import { ROUTER, COLOR } from '../../constants'

import * as S from './styles'

const HomePage = () => {
  const { productList } = useSelector((state) => state.productReducer)
  const { categoryList } = useSelector((state) => state.categoryReducer)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getProductListAction({ limit: 30, page: 1 }))
    dispatch(getCategoryListAction())
  }, [])

  const NewProductList = productList.data.filter((item) => item.isNew)

  const EUProductList = productList.data.filter((item) =>
    item.categoryId !== 3 && item.categoryId !== 6 && item.categoryId !== 10)

  const JPUSProductList = productList.data.filter((item) =>
    item.categoryId === 3 || item.categoryId === 6 || item.categoryId === 10)

  const renderProducts = (list) => list.map((item) => {
    let total = 0
    let rate = 0
    if (item.comments) {
      item.comments.forEach((comment) => total += comment.rate)
    }
    rate = item.comments.length === 0 ? 0 : (total / item.comments.length).toFixed(1)
    return (
      <div key={item.id}>
        <S.Card
          isNew={item.isNew}
          onClick={() => navigate(generatePath(ROUTER.PRODUCT_DETAIL, { id: item.id }))}
        >
          <Badge.Ribbon text="Mới" color={COLOR.blue4}>
            <S.ProductsContainer>
              <div>
                <img src={item.image[0]} alt={item.name} />
              </div>
              <div>
                <div>{item.name}</div>
                <div>{item.price.toLocaleString()}₫</div>
                <div>
                  {rate === 0
                    ? (<span>Chưa có đánh giá</span>)
                    : (<Rate value={rate} disabled allowHalf character={<FaHeart />} />)}
                </div>
              </div>
            </S.ProductsContainer>
          </Badge.Ribbon>
        </S.Card>
      </div>
    )
  })

  const renderCarMakers = categoryList.data.map((item) => {
    return (
      <div key={item.id}>
        <S.CarMakersContainer>
          <img src={item.image} alt={item.name} />
        </S.CarMakersContainer>
      </div>
    )
  })

  const bannerSlideSetting = {
    prevArrow: <FaAngleDoubleLeft />,
    nextArrow: <FaAngleDoubleRight />,
    swipe: false,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          swipe: true
        }
      }
    ]
  }

  const carMakersSlideSetting = {
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1000,
    swipe: false,
    responsive: [
      {
        breakpoint: 1040,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 810,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  }

  const productsSlideSetting = {
    slidesToShow: 4,
    prevArrow: <FaAngleDoubleLeft />,
    nextArrow: <FaAngleDoubleRight />,
    swipe: false,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  return (
    <>
      <S.BannerWrapper>
        <Slider {...bannerSlideSetting}>
          <div><img src="https://i.ibb.co/vY4cRNp/custom-showroom-1639732346.jpg" /></div>
          <div><img src="https://i.ibb.co/mSGr1cq/custom-showroom-1639732617.jpg" /></div>
          <div><img src="https://i.ibb.co/Jnzg0R3/custom-showroom-1639732486.jpg" /></div>
          <div><img src="https://i.ibb.co/dbJ4yrQ/custom-showroom-1639732806.jpg" /></div>
          <div><img src="https://i.ibb.co/S7cSFxy/custom-showroom-1639731918.jpg" /></div>
          <div><img src="https://i.ibb.co/NYNyMc9/custom-showroom-1639732994.jpg" /></div>
        </Slider>
      </S.BannerWrapper>
      <S.HomePageWrapper>
        <S.ProductsWrapper>
          <h2>Sản phẩm mới</h2>
          <S.NewProductContainer>
            {renderProducts(NewProductList)}
            <Row justify="center">
              <Button onClick={() => navigate(ROUTER.PRODUCT_LIST)}>Xem thêm</Button>
            </Row>
          </S.NewProductContainer>
        </S.ProductsWrapper>
        <S.CarMakersWrapper>
          <h2>Các hãng xe</h2>
          <Slider {...carMakersSlideSetting}>
            {renderCarMakers}
          </Slider>
        </S.CarMakersWrapper>
        <S.ProductsWrapper>
          <h2>Hãng xe Châu Âu</h2>
          <Slider {...productsSlideSetting}>
            {renderProducts(EUProductList)}
          </Slider>
        </S.ProductsWrapper>
        <S.SubscribeWrapper>
          <S.SubscribeContainer>
            <h2>Đăng ký</h2>
            <h3>
              Đăng ký nhận bản tin của VROOOM để cập nhật những sản phẩm mới,
              thông tin ưu đãi và các mã giảm giá.
            </h3>
            <Form layout="inline">
              <Row>
                <Col span={20}>
                  <Form.Item>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item>
                    <Button type="primary">Gửi</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </S.SubscribeContainer>
        </S.SubscribeWrapper>
        <S.ProductsWrapper>
          <h2>Hãng xe Nhật, Mỹ</h2>
          <Slider {...productsSlideSetting}>
            {renderProducts(JPUSProductList)}
          </Slider>
        </S.ProductsWrapper>
      </S.HomePageWrapper>
    </>

  )
}

export default HomePage
