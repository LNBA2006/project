import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, generatePath } from 'react-router-dom'
import { Card, Badge, Rate } from 'antd'
import { FaHeart } from 'react-icons/fa'

import { getUserInfoAction, getFavoriteProductsAction, getProductListAction } from '../../../../redux/actions'
import { ROUTER, COLOR } from '../../../../constants'

import * as S from './styles'


const FavoriteProducts = () => {
  const { userInfo } = useSelector((state) => state.authReducer)
  const { favoriteProducts } = useSelector((state) => state.favoriteReducer)
  const { productList } = useSelector((state) => state.productReducer)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUserInfoAction())
    dispatch(getProductListAction({ limit: 30, page: 1 }))
    dispatch(getFavoriteProductsAction({ userId: userInfo.data.id }))
  }, [userInfo.data])

  // const newFavoriteProducts = favoriteProducts.data.map((item) => {
  //   return productList.data.find((product) => product.id === item.productId)
  // })
  const newFavoriteProducts = productList.data.filter((item) => {
    return favoriteProducts.data.find((product) => product.productId === item.id)
  })

  const renderFavoriteProducts = newFavoriteProducts.map((item) => {
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
            <S.FavoriteProductsContent>
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
            </S.FavoriteProductsContent>
          </Badge.Ribbon>
        </S.Card>
      </div>
    )
  })

  return (
    <S.FavoriteProductsWrapper>
      <Card title="Sản phẩm yêu thích">
        <S.FavoriteProductsContainer>
          {renderFavoriteProducts}
        </S.FavoriteProductsContainer>
      </Card>
    </S.FavoriteProductsWrapper>
  )
}

export default FavoriteProducts
