import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Row,
  Col,
  List,
  Tabs,
  Descriptions,
  Form,
  Rate,
  Input,
  Comment,
  Space,
  notification,
  Image,
  Avatar
} from 'antd'
import {
  FaCartPlus,
  FaMinus,
  FaPlus,
  FaThumbsUp,
  FaComment,
  FaRegUser,
  FaHeart,
  FaRegComment
} from 'react-icons/fa'
import Slider from 'react-slick'
import moment from 'moment'

import {
  getProductDetailAction,
  getFavoriteProductsAction,
  addFavoriteProductAction,
  deleteFavoriteProductAction,
  countFavoriteProductAction,
  getCommentListAction,
  postCommentAction,
  addToCartAction,
  updateCartProductAction
} from '../../redux/actions'
import BreadcrumbContainer from '../../components/Breadcrumb'
import { BREADCRUMB, POLICY } from './constant'

import * as S from './styles'

const ProductDetailPage = () => {
  const [productQuantity, setProductQuantity] = useState(1)
  const [image, setImage] = useState(null)

  const { id } = useParams()

  const { userInfo } = useSelector((state) => state.authReducer)
  const { productDetail } = useSelector((state) => state.productReducer)
  const { favoriteProducts } = useSelector((state) => state.favoriteReducer)
  const { commentList } = useSelector((state) => state.commentReducer)
  const { cartList } = useSelector((state) => state.cartReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(getProductDetailAction({ id }))
      dispatch(getCommentListAction({ productId: id }))
      dispatch(getFavoriteProductsAction({ userId: userInfo.data.id }))
    }
  }, [id, userInfo.data])

  useEffect(() => {
    dispatch(countFavoriteProductAction({ productId: parseInt(id) }))
  }, [favoriteProducts.data.length])

  const [commentForm] = Form.useForm()

  const handleAddToCart = () => {
    if (userInfo.data.id) {
      const existCartProduct = cartList.data.find((item) => item.productId === parseInt(id))
      if (existCartProduct) {
        // notification.error({
        //   message: 'Sản phẩm đã tồn tại trong giỏ hàng',
        // })
        dispatch(updateCartProductAction({
          data: {
            id: existCartProduct.id,
            quantity: existCartProduct.quantity + productQuantity
          },
          callback: {
            showSuccess: () => notification.success({
              message: 'Cập nhật giỏ hàng thành công',
              top: 64,
            })
          }
        }))
      } else {
        dispatch(addToCartAction({
          quantity: productQuantity,
          userId: userInfo.data.id,
          productId: parseInt(id)
        }))
      }
    } else {
      notification.error({
        message: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng',
        top: 64,
      })
    }
  }

  const handleFavorite = () => {
    if (userInfo.data.id) {
      const existFavoriteProduct = favoriteProducts.data.findIndex(
        (item) => item.productId === productDetail.data.id && item.userId === userInfo.data.id) !== -1
      if (existFavoriteProduct) {
        dispatch(deleteFavoriteProductAction({
          id: favoriteProducts.data.find(
            (item) => item.productId === productDetail.data.id && item.userId === userInfo.data.id).id
        }))
      } else {
        dispatch(addFavoriteProductAction({
          userId: userInfo.data.id,
          productId: productDetail.data.id
        }))
      }
    } else {
      notification.error({
        message: 'Bạn cần đăng nhập để thích sản phẩm này',
        top: 64
      })
    }
  }

  const handleSubmitComment = (value) => {
    const isExist = commentList.data.findIndex((item) => item.userId === userInfo.data.id) !== -1
    if (isExist) {
      notification.warning({
        message: 'Bạn đã bình luận rồi',
        top: 64
      })
    } else {
      dispatch(postCommentAction({
        ...value,
        productId: parseInt(id),
        userId: userInfo.data.id,
      }))
      commentForm.resetFields()
    }
  }

  const renderProductRate = () => {
    let total = 0;
    if (!commentList.data.length) return 0
    commentList.data.forEach((item) => {
      total = total + item.rate
    })
    return (total / commentList.data.length).toFixed(1)
  }

  const renderImageSlider = productDetail.data.image?.map((item) => {
    return (
      <div key={item}>
        <Image src={item} />
      </div>
    )
  })

  const renderImageNav = productDetail.data.image?.map((item) => {
    return (
      <div key={item}>
        <img src={item} />
      </div>
    )
  })

  const renderImageIntroduce = productDetail.data.image?.map((item) => {
    return (
      <div key={item}>
        <img src={item} />
      </div>
    )
  })

  return (
    <>
      <BreadcrumbContainer titlePage={productDetail.data.name} breadcrumb={BREADCRUMB} height="104px" />
      <S.ProductWrapper>
        <S.ProductInfoWrapper>
          <S.ProductImageWrapper>
            <S.ImageSliderWrapper>
              {productDetail.data.image && (
                <Slider
                  accessibility={false}
                  slidesToShow={1}
                  swipe={false}
                  ref={(slide) => setImage(slide)}
                >
                  {renderImageSlider}
                </Slider>
              )}
            </S.ImageSliderWrapper>
            <S.ImageNavWrapper>
              {productDetail.data.image && (
                <Slider
                  accessibility={false}
                  asNavFor={image}
                  slidesToShow={3}
                  focusOnSelect={true}
                  centerMode={true}
                >
                  {renderImageNav}
                </Slider>
              )}
            </S.ImageNavWrapper>
          </S.ProductImageWrapper>
          <S.ProductInfoContainer>
            <div>{productDetail.data.name}</div>
            <Space>
              <Rate disabled allowHalf character={<FaHeart />} value={renderProductRate()} />
              {!!commentList.data.length && <h3>{renderProductRate()}</h3>}
            </Space>
            <div>{productDetail.data.price?.toLocaleString()}₫</div>
            <Row>
              <Button
                icon={<FaMinus />}
                disabled={productQuantity <= 1}
                onClick={() => setProductQuantity(productQuantity - 1)}
              >
              </Button>
              <Input value={productQuantity} />
              <Button
                icon={<FaPlus />}
                onClick={() => setProductQuantity(productQuantity + 1)}
              >
              </Button>
              <Button
                icon={<FaCartPlus />}
                danger
                type="primary"
                onClick={() => handleAddToCart()}
              >
                Thêm vào giỏ hàng
              </Button>
            </Row>
            <Row>
              {userInfo.data.id
                ? (
                  <Button
                    type={favoriteProducts.data.find(
                      (item) => item.userId === userInfo.data.id && item.productId === parseInt(id)
                    ) && 'primary'}
                    icon={<FaThumbsUp />}
                    onClick={() => handleFavorite()}
                  >
                    Thích
                  </Button>
                )
                : (
                  <Button
                    icon={<FaThumbsUp />}
                    onClick={() => handleFavorite()}
                  >
                    Thích
                  </Button>
                )}
            </Row>
            <Row>
              {!!favoriteProducts.meta.length && (
                favoriteProducts.meta.find((item) => item.userId === userInfo.data.id)
                  ? (
                    favoriteProducts.meta.length > 1
                      ? (<span>Bạn và {favoriteProducts.meta.length - 1} người khác thích sản phẩm này</span>)
                      : (<span>Bạn thích sản phẩm này</span>)
                  )
                  : (
                    <span>{favoriteProducts.meta.length} người thích sản phẩm này</span>
                  )
              )}
            </Row>
            <List
              header="Chính sách"
              dataSource={POLICY}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </S.ProductInfoContainer>
        </S.ProductInfoWrapper>
        <S.ProductDetailWrapper>
          <Row gutter={16}>
            <Col span={24} order={2} md={{ span: 16, order: 1 }}>
              <Tabs defaultActiveKey="2" type="card">
                <Tabs.TabPane tab="Giới thiệu" key="1">
                  <S.ProductIntroduceWrapper>
                    {renderImageIntroduce}
                  </S.ProductIntroduceWrapper>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đánh giá sản phẩm" key="2">
                  <S.ProductCommentWrapper>
                    <h3>Đánh giá và bình luận</h3>
                    {userInfo.data.username && (
                      <Form
                        form={commentForm}
                        layout="vertical"
                        // initialValues={{ rate: 0, content: '' }}
                        onFinish={(value) => handleSubmitComment(value)}
                      >
                        <Form.Item label="Đánh giá" name="rate" rules={[{
                          required: true,
                          message: 'Bạn chưa đánh giá sản phẩm'
                        }]}>
                          <Rate allowHalf character={<FaHeart />} />
                        </Form.Item>
                        <Form.Item label="Bình luận" name="content" rules={[{
                          required: true,
                          message: 'Bạn chưa bình luận sản phẩm'
                        }]}>
                          <Input.TextArea
                            placeholder="Thêm bình luận của bạn"
                            autoSize={{ minRows: 2, maxRows: 4 }}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button icon={<FaComment />} htmlType="submit">Bình luận</Button>
                        </Form.Item>
                      </Form>
                    )}
                    <List
                      header={`${commentList.data.length} bình luận`}
                      dataSource={commentList.data}
                      locale={{
                        emptyText: (
                          <>
                            <FaRegComment />
                            <div>Chưa có đánh giá</div>
                          </>
                        )
                      }}
                      renderItem={(item) => (
                        <Comment
                          author={item.user?.username}
                          avatar={<Avatar icon={<FaRegUser />} />}
                          content={
                            <div>
                              <Rate disabled value={item.rate} allowHalf character={<FaHeart />} />
                              <p>{item.content}</p>
                            </div>
                          }
                          datetime={moment(item.createdAt).fromNow()}
                        />
                      )}
                    />
                  </S.ProductCommentWrapper>
                </Tabs.TabPane>
              </Tabs>
            </Col>
            <Col span={24} order={1} md={{ span: 8, order: 2 }}>
              <Tabs type="card">
                <Tabs.TabPane tab="Thông tin chi tiết">
                  <Descriptions colon={false} layout="horizontal" bordered={true} size="small">
                    <Descriptions.Item label="Tên sản phẩm" span={3}>
                      {productDetail.data.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Hãng" span={3}>
                      {productDetail.data.category?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sản phẩm" span={3}>
                      {productDetail.data.isNew ? 'Mới' : 'Cũ'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số cửa" span={3}>
                      {productDetail.data.door?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số ghế" span={3}>
                      {productDetail.data.seat?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giá" span={3}>
                      {productDetail.data.price?.toLocaleString()}₫
                    </Descriptions.Item>
                  </Descriptions>
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </S.ProductDetailWrapper>
      </S.ProductWrapper>
    </>
  )
}

export default ProductDetailPage
