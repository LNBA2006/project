import { createAction } from '@reduxjs/toolkit'
import { FAVORITE_ACTION, REQUEST } from '../constants'

export const getFavoriteProductsAction = createAction(REQUEST(FAVORITE_ACTION.GET_FAVORITE_PRODUCTS))
export const addFavoriteProductAction = createAction(REQUEST(FAVORITE_ACTION.ADD_FAVORITE_PRODUCT))
export const deleteFavoriteProductAction = createAction(REQUEST(FAVORITE_ACTION.DELETE_FAVORITE_PRODUCT))
export const countFavoriteProductAction = createAction(REQUEST(FAVORITE_ACTION.COUNT_FAVORITE_PRODUCT))