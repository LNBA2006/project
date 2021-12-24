import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './redux/sagas'
import {
  commonReducer,
  productReducer, 
  categoryReducer, 
  authReducer, 
  commentReducer,
  cartReducer,
  orderReducer,
  discountReducer,
  favoriteReducer
} from './redux/reducers'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    commonReducer,
    productReducer,
    categoryReducer,
    authReducer,
    commentReducer,
    cartReducer,
    orderReducer,
    discountReducer,
    favoriteReducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware
  ]
})

sagaMiddleware.run(rootSaga)