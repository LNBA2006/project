import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { notification } from 'antd'

import { CART_ACTION, REQUEST, SUCCESS, FAIL } from '../constants'

function* getCartListSaga(action) {
  try {
    const { userId } = action.payload
    const result = yield axios.get('https://project-vrooom.herokuapp.com/carts', {
      params: {
        userId,
        _expand: 'product',
      }
    })
    yield put({
      type: SUCCESS(CART_ACTION.GET_CART_LIST),
      payload: {
        data: result.data,
      }
    })
  } catch (e) {
    yield put({
      type: FAIL(CART_ACTION.GET_CART_LIST),
      payload: { error: 'Không lấy được danh sách trong giỏ hàng' }
    })
  }
}

function* addToCartSaga(action) {
  try {
    const { productId } = action.payload
    const result = yield axios.post('https://project-vrooom.herokuapp.com/carts', action.payload)
    yield put({
      type: REQUEST(CART_ACTION.GET_CART_LIST),
      payload: {
        productId,
      }
    })
    yield put({
      type: SUCCESS(CART_ACTION.ADD_TO_CART),
      payload: {
        data: result.data
      }
    })
    yield notification.success({
      message: 'Thêm vào giỏ hàng thành công',
      top: 64
    })
  } catch (e) {
    yield put({
      type: FAIL(CART_ACTION.ADD_TO_CART),
      payload: { error: 'Không thể thêm sản phẩm vào giỏ hàng' }
    })
  }
}

function* updateCartProductSaga(action) {
  try {
    const { data, callback } = action.payload
    yield axios.patch(`https://project-vrooom.herokuapp.com/carts/${data.id}`, {
      quantity: data.quantity,
    })
    yield put({
      type: SUCCESS(CART_ACTION.UPDATE_CART_PRODUCT),
      payload: {
        data,
      }
    })
    if (callback?.showSuccess) callback.showSuccess()
  } catch (e) {
    yield put({
      type: FAIL(CART_ACTION.UPDATE_CART_PRODUCT),
      payload: { error: 'Không thể cập nhật sản phẩm trong giỏ hàng' }
    })
  }
}

function* removeCartProductSaga(action) {
  try {
    const { id } = action.payload
    yield axios.delete(`https://project-vrooom.herokuapp.com/carts/${id}`)
    yield put({
      type: SUCCESS(CART_ACTION.REMOVE_CART_PRODUCT),
      payload: {
        data: { id }
      }
    })
  } catch (e) {
    yield put({
      type: FAIL(CART_ACTION.REMOVE_CART_PRODUCT),
      payload: { error: 'Không thể xóa sản phẩm trong giỏ hàng' }
    })
  }
}

export default function* cartSaga() {
  yield takeEvery(REQUEST(CART_ACTION.GET_CART_LIST), getCartListSaga)
  yield takeEvery(REQUEST(CART_ACTION.ADD_TO_CART), addToCartSaga)
  yield takeEvery(REQUEST(CART_ACTION.UPDATE_CART_PRODUCT), updateCartProductSaga)
  yield takeEvery(REQUEST(CART_ACTION.REMOVE_CART_PRODUCT), removeCartProductSaga)
}