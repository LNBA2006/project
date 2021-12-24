import { createReducer } from '@reduxjs/toolkit'
import { FAVORITE_ACTION, REQUEST, SUCCESS, FAIL } from '../constants'

const initialState = {
  favoriteProducts: {
    data: [],
    loading: false,
    error: null,
    meta: []
  }
}

const favoriteReducer = createReducer(initialState, {
  [REQUEST(FAVORITE_ACTION.GET_FAVORITE_PRODUCTS)]: (state, action) => {
    return {
      ...state,
      favoriteProducts: {
        ...state.favoriteProducts,
        loading: true
      }
    }
  },
  [SUCCESS(FAVORITE_ACTION.GET_FAVORITE_PRODUCTS)]: (state, action) => {
    const { data } = action.payload
    return {
      ...state,
      favoriteProducts: {
        ...state.favoriteProducts,
        data,
        loading: false,
        error: null
      }
    }
  },
  [FAIL(FAVORITE_ACTION.GET_FAVORITE_PRODUCTS)]: (state, action) => {
    const { error } = action.payload
    return {
      ...state,
      favoriteProducts: {
        ...state.favoriteProducts,
        loading: false,
        error
      }
    }
  },

  [REQUEST(FAVORITE_ACTION.ADD_FAVORITE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      favoriteProducts: {
        ...state.favoriteProducts,
        loading: true,
        error: null
      }
    }
  },
  [SUCCESS(FAVORITE_ACTION.ADD_FAVORITE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      favoriteProducts: {
        ...state.favoriteProducts,
        loading: false,
        error: null
      }
    }
  },
  [FAIL(FAVORITE_ACTION.ADD_FAVORITE_PRODUCT)]: (state, action) => {
    const { error } = action.payload
    return {
      ...state,
      favoriteProducts: {
        ...state.favoriteProducts,
        loading: false,
        error
      }
    }
  },

  [REQUEST(FAVORITE_ACTION.DELETE_FAVORITE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      favoriteProducts: {
        ...state.favoriteProducts,
        loading: true,
        error: null
      }
    }
  },
  [SUCCESS(FAVORITE_ACTION.DELETE_FAVORITE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      favoriteProducts: {
        ...state.favoriteProducts,
        loading: false,
        error: null
      }
    }
  },
  [FAIL(FAVORITE_ACTION.DELETE_FAVORITE_PRODUCT)]: (state, action) => {
    const { error } = action.payload
    return {
      ...state,
      favoriteProducts: {
        ...state.favoriteProducts,
        error,
        loading: false
      }
    }
  },

  [REQUEST(FAVORITE_ACTION.COUNT_FAVORITE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      favoriteProducts: {
        ...state.favoriteProducts,
        loading: true,
        error: null
      }
    }
  },
  [SUCCESS(FAVORITE_ACTION.COUNT_FAVORITE_PRODUCT)]: (state, action) => {
    const { meta } = action.payload
    return {
      ...state,
      favoriteProducts: {
        ...state.favoriteProducts,
        loading: false,
        error: null,
        meta
      }
    }
  },
  [FAIL(FAVORITE_ACTION.COUNT_FAVORITE_PRODUCT)]: (state, action) => {
    const { error } = action.payload
    return {
      ...state,
      favoriteProducts: {
        ...state.favoriteProducts,
        loading: false,
        error
      }
    }
  }
})

export default favoriteReducer