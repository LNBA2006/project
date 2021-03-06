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
        //   message: 'S???n ph???m ???? t???n t???i trong gi??? h??ng',
        // })
        dispatch(updateCartProductAction({
          data: {
            id: existCartProduct.id,
            quantity: existCartProduct.quantity + productQuantity
          },
          callback: {
            showSuccess: () => notification.success({
              message: 'C???p nh???t gi??? h??ng th??nh c??ng',
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
        message: 'B???n c???n ????ng nh???p ????? th??m s???n ph???m v??o gi??? h??ng',
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
        message: 'B???n c???n ????ng nh???p ????? th??ch s???n ph???m n??y',
        top: 64
      })
    }
  }

  const handleSubmitComment = (value) => {
    const isExist = commentList.data.findIndex((item) => item.userId === userInfo.data.id) !== -1
    if (isExist) {
      notification.warning({
        message: 'B???n ???? b??nh lu???n r???i',
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
            <div>{productDetail.data.price?.toLocaleString()}???</div>
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
                Th??m v??o gi??? h??ng
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
                    Th??ch
                  </Button>
                )
                : (
                  <Button
                    icon={<FaThumbsUp />}
                    onClick={() => handleFavorite()}
                  >
                    Th??ch
                  </Button>
                )}
            </Row>
            <Row>
              {!!favoriteProducts.meta.length && (
                favoriteProducts.meta.find((item) => item.userId === userInfo.data.id)
                  ? (
                    favoriteProducts.meta.length > 1
                      ? (<span>B???n v?? {favoriteProducts.meta.length - 1} ng?????i kh??c th??ch s???n ph???m n??y</span>)
                      : (<span>B???n th??ch s???n ph???m n??y</span>)
                  )
                  : (
                    <span>{favoriteProducts.meta.length} ng?????i th??ch s???n ph???m n??y</span>
                  )
              )}
            </Row>
            <List
              header="Ch??nh s??ch"
              dataSource={POLICY}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </S.ProductInfoContainer>
        </S.ProductInfoWrapper>
        <S.ProductDetailWrapper>
          <Row gutter={16}>
            <Col span={24} order={2} md={{ span: 16, order: 1 }}>
              <Tabs defaultActiveKey="2" type="card">
                <Tabs.TabPane tab="Gi???i thi???u" key="1">
                  <S.ProductIntroduceWrapper>
                    {renderImageIntroduce}
                  </S.ProductIntroduceWrapper>
                </Tabs.TabPane>
                <Tabs.TabPane tab="????nh gi?? s???n ph???m" key="2">
                  <S.ProductCommentWrapper>
                    <h3>????nh gi?? v?? b??nh lu???n</h3>
                    {userInfo.data.username && (
                      <Form
                        form={commentForm}
                        layout="vertical"
                        // initialValues={{ rate: 0, content: '' }}
                        onFinish={(value) => handleSubmitComment(value)}
                      >
                        <Form.Item label="????nh gi??" name="rate" rules={[{
                          required: true,
                          message: 'B???n ch??a ????nh gi?? s???n ph???m'
                        }]}>
                          <Rate allowHalf character={<FaHeart />} />
                        </Form.Item>
                        <Form.Item label="B??nh lu???n" name="content" rules={[{
                          required: true,
                          message: 'B???n ch??a b??nh lu???n s???n ph???m'
                        }]}>
                          <Input.TextArea
                            placeholder="Th??m b??nh lu???n c???a b???n"
                            autoSize={{ minRows: 2, maxRows: 4 }}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button icon={<FaComment />} htmlType="submit">B??nh lu???n</Button>
                        </Form.Item>
                      </Form>
                    )}
                    <List
                      header={`${commentList.data.length} b??nh lu???n`}
                      dataSource={commentList.data}
                      locale={{
                        emptyText: (
                          <>
                            <FaRegComment />
                            <div>Ch??a c?? ????nh gi??</div>
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
                <Tabs.TabPane tab="Th??ng tin chi ti???t">
                  <Descriptions colon={false} layout="horizontal" bordered={true} size="small">
                    <Descriptions.Item label="T??n s???n ph???m" span={3}>
                      {productDetail.data.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="H??ng" span={3}>
                      {productDetail.data.category?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="S???n ph???m" span={3}>
                      {productDetail.data.isNew ? 'M???i' : 'C??'}
                    </Descriptions.Item>
                    <Descriptions.Item label="S??? c???a" span={3}>
                      {productDetail.data.door?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="S??? gh???" span={3}>
                      {productDetail.data.seat?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Gi??" span={3}>
                      {productDetail.data.price?.toLocaleString()}???
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
