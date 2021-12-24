import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from '../constants'

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload
    yield axios.post('https://project-vrooom.herokuapp.com/register', data)
    yield put({ type: SUCCESS(AUTH_ACTION.REGISTER) })
    yield callback.redirectLogin()
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.REGISTER),
      payload: {
        error: e.response.data === 'Email already exists' && 'Email này đã được đăng ký tài khoản'
      }
    })
  }
}

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload
    const result = yield axios.post('https://project-vrooom.herokuapp.com/login', data)
    yield localStorage.setItem('userInfo', JSON.stringify({
      accessToken: result.data.accessToken,
    }))
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data.user,
      }
    })
    yield callback.redirectHome()
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: {
        error: (e.response.data === 'Cannot find user' || 'Incorrect password')
          && 'Tên đăng nhập hoặc mật khẩu không đúng'
      }
    })
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload
    const result = yield axios.get(`https://project-vrooom.herokuapp.com/users/${id}`)
    yield put({
      type: SUCCESS(AUTH_ACTION.GET_USER_INFO),
      payload: {
        data: result.data
      }
    })
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.GET_USER_INFO),
      payload: {
        error: 'Không thể lấy dữ liệu người dùng'
      }
    })
  }
}

export default function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.REGISTER), registerSaga)
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga)
  yield takeEvery(REQUEST(AUTH_ACTION.GET_USER_INFO), getUserInfoSaga)
}
