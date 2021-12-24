import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, generatePath } from 'react-router-dom'
import { Collapse, Checkbox, Slider, Input, Row, Col, Select, Tag, Button, Badge, Rate } from 'antd'
import { FaSearch, FaHeart } from 'react-icons/fa'

import { getProductListAction, getCategoryListAction } from '../../redux/actions'
import BreadcrumbContainer from '../../components/Breadcrumb'
import { BREADCRUMB, PRICE_FILTER } from './constant'
import { ROUTER, PAGE_SIZE, COLOR } from '../../constants'

import * as S from './styles'

const ProductListPage = () => {
  const [categoryFilter, setCategoryFilter] = useState([])
  const [doorFilter, setDoorFilter] = useState([])
  const [seatFilter, setSeatFilter] = useState([])
  const [keywordFilter, setKeywordFilter] = useState('')
  const [sortFilter, setSortFilter] = useState('')
  const [priceFilter, setPriceFilter] = useState(PRICE_FILTER)

  const { productList } = useSelector((state) => state.productReducer)
  const { categoryList } = useSelector((state) => state.categoryReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategoryListAction())
    dispatch(getProductListAction({ limit: PAGE_SIZE, page: 1 }))
  }, [])

  const navigate = useNavigate()

  const handleSelectCategoryFilter = (e) => {
    const { value, checked } = e.target
    const newCategoryFilter = checked
      ? [...categoryFilter, value]
      : categoryFilter.filter((filterItem) => filterItem.id !== value.id)
    setCategoryFilter(newCategoryFilter)
    dispatch(getProductListAction({
      limit: PAGE_SIZE,
      page: 1,
      categoryFilter: newCategoryFilter,
      keyword: keywordFilter,
      priceFilter,
      sortFilter,
      doorFilter,
      seatFilter
    }))
  }

  const handleClearCategoryFilter = (categoryFilterItem) => {
    const newCatergoryFilter = categoryFilter.filter(
      (filterItem) => filterItem.id !== categoryFilterItem.id
    )
    setCategoryFilter(newCatergoryFilter)
    dispatch(getProductListAction({
      limit: PAGE_SIZE,
      page: 1,
      categoryFilter: newCatergoryFilter,
      keyword: keywordFilter,
      priceFilter,
      sortFilter,
      doorFilter,
      seatFilter
    }))
  }

  const handleCategoryTopFilter = (value) => {
    const newCategoryFilter = []
    value.forEach((item) => newCategoryFilter.push({ id: item }))
    setCategoryFilter(newCategoryFilter)
    dispatch(getProductListAction({
      limit: PAGE_SIZE,
      page: 1,
      categoryFilter: newCategoryFilter,
      keyword: keywordFilter,
      priceFilter,
      sortFilter,
      doorFilter,
      seatFilter
    }))
  }

  const handleSearchKeyword = (e) => {
    setKeywordFilter(e.target.value)
    dispatch(getProductListAction({
      limit: PAGE_SIZE,
      page: 1,
      categoryFilter,
      keyword: e.target.value,
      priceFilter,
      sortFilter,
      doorFilter,
      seatFilter
    }))
  }

  const handleSelectDoorFilter = (e) => {
    const { checked, value } = e.target
    const newDoorFilter = checked
      ? [...doorFilter, value]
      : doorFilter.filter((doorItem) => doorItem !== value)
    setDoorFilter(newDoorFilter)
    dispatch(getProductListAction({
      limit: PAGE_SIZE,
      page: 1,
      categoryFilter,
      keywordFilter,
      priceFilter,
      sortFilter,
      doorFilter: newDoorFilter,
      seatFilter
    }))
  }

  const handleDoorTopFilter = (value) => {
    const newDoorFilter = []
    value.forEach((item) => newDoorFilter.push(item))
    setDoorFilter(newDoorFilter)
    dispatch(getProductListAction({
      limit: PAGE_SIZE,
      page: 1,
      categoryFilter,
      keyword: keywordFilter,
      priceFilter,
      sortFilter,
      doorFilter: newDoorFilter,
      seatFilter
    }))
  }

  const handleSelectSeatFilter = (e) => {
    const { checked, value } = e.target
    const newSeatFilter = checked
      ? [...seatFilter, value]
      : seatFilter.filter((seatItem) => seatItem !== value)
    setSeatFilter(newSeatFilter)
    dispatch(getProductListAction({
      limit: PAGE_SIZE,
      page: 1,
      categoryFilter,
      keywordFilter,
      priceFilter,
      sortFilter,
      doorFilter,
      seatFilter: newSeatFilter
    }))
  }

  const handleSeatTopFilter = (value) => {
    const newSeatFilter = []
    value.forEach((item) => newSeatFilter.push(item))
    setSeatFilter(newSeatFilter)
    dispatch(getProductListAction({
      limit: PAGE_SIZE,
      page: 1,
      categoryFilter,
      keyword: keywordFilter,
      priceFilter,
      sortFilter,
      doorFilter,
      seatFilter: newSeatFilter
    }))
  }

  const handleClearKeyword = () => {
    setKeywordFilter('')
    dispatch(getProductListAction({
      limit: PAGE_SIZE,
      page: 1,
      categoryFilter,
      priceFilter,
      sortFilter,
      doorFilter,
      seatFilter
    }))
  }

  const handleChangeSort = (value) => {
    setSortFilter(value)
    dispatch(getProductListAction({
      limit: PAGE_SIZE,
      page: 1,
      categoryFilter,
      keyword: keywordFilter,
      priceFilter,
      sortFilter: value,
      doorFilter,
      seatFilter
    }))
  }

  const handleChangePriceFilter = (value) => {
    setPriceFilter(value)
    dispatch(getProductListAction({
      limit: PAGE_SIZE,
      page: 1,
      categoryFilter,
      keyword: keywordFilter,
      priceFilter: value,
      sortFilter,
      doorFilter,
      seatFilter
    }))
  }

  const handleClearPriceFilter = () => {
    setPriceFilter(PRICE_FILTER)
    dispatch(getProductListAction({
      limit: PAGE_SIZE,
      page: 1,
      categoryFilter,
      keyword: keywordFilter,
      priceFilter,
      sortFilter,
      doorFilter,
      seatFilter
    }))
  }

  const handleLoadMore = () => {
    dispatch(getProductListAction({
      limit: PAGE_SIZE,
      page: productList.meta.page + 1,
      more: true,
      categoryFilter,
      keyword: keywordFilter,
      priceFilter,
      sortFilter,
      doorFilter,
      seatFilter
    }))
  }

  const renderCategoryFilterTags = () => {
    return categoryFilter.map((categoryFilterItem, categoryFilterIndex) => (
      <Tag
        key={categoryFilterItem.id}
        closable
        color={COLOR.blue3}
        onClose={() => handleClearCategoryFilter(categoryFilterItem)}
      >
        {categoryFilterItem.name}
      </Tag>
    ))
  }

  const renderProductList = productList.data.map((item) => {
    let total = 0
    let rate = 0
    if (item.comments) {
      item.comments.forEach((comment) => total += comment.rate)
    }
    rate = item.comments.length === 0 ? 0 : (total / item.comments.length).toFixed(1)
    return (
      <S.Card
        key={item.id}
        isNew={item.isNew}
        onClick={() => navigate(generatePath(ROUTER.PRODUCT_DETAIL, { id: item.id }))}
      >
        <Badge.Ribbon text="Mới" color={COLOR.blue4}>
          <S.ProductItemContent>
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
          </S.ProductItemContent>
        </Badge.Ribbon>
      </S.Card>
    )
  })

  const renderCategoryList = categoryList.data.map((categoryItem, categoryIndex) => {
    const checked = categoryFilter.findIndex(((filterItem) => filterItem.id === categoryItem.id)) !== -1
    return (
      <div key={categoryIndex}>
        <Checkbox checked={checked} value={categoryItem} onChange={(e) => handleSelectCategoryFilter(e)}>
          {categoryItem.name}
        </Checkbox>
      </div>
    )
  })

  const renderTopCategoryList = categoryList.data.map((categoryItem, categoryIndex) => {
    return (
      <Select.Option key={categoryIndex} value={categoryItem.id}>
        {categoryItem.name}
      </Select.Option>
    )
  })

  return (
    <>
      <BreadcrumbContainer titlePage="Danh sách sản phẩm" breadcrumb={BREADCRUMB} />
      <S.ProductListWrapper>
        <S.ProductListContainer>
          <S.FilterWrapper>
            <Collapse>
              <Collapse.Panel header="Nhà sản xuất">
                {renderCategoryList}
              </Collapse.Panel>
              <Collapse.Panel header="Số cửa">
                <div><Checkbox value={1} onChange={(e) => handleSelectDoorFilter(e)}>2</Checkbox></div>
                <div><Checkbox value={2} onChange={(e) => handleSelectDoorFilter(e)}>4</Checkbox></div>
              </Collapse.Panel>
              <Collapse.Panel header="Số ghế ngồi">
                <div><Checkbox value={1} onChange={(e) => handleSelectSeatFilter(e)}>2</Checkbox></div>
                <div><Checkbox value={2} onChange={(e) => handleSelectSeatFilter(e)}>2+2</Checkbox></div>
                <div><Checkbox value={3} onChange={(e) => handleSelectSeatFilter(e)}>4</Checkbox></div>
              </Collapse.Panel>
              <Collapse.Panel header="Khoảng giá">
                <Slider
                  range
                  min={PRICE_FILTER[0]}
                  max={PRICE_FILTER[1]}
                  step={1000000}
                  value={priceFilter}
                  tipFormatter={(value) => value.toLocaleString()}
                  onChange={(value) => handleChangePriceFilter(value)}
                />
              </Collapse.Panel>
            </Collapse>
          </S.FilterWrapper>
          <S.SearchWrapper>
            <S.SearchContainer>
              <Row>
                <Col span={14}>
                  <S.SearchContent>
                    <Input
                      addonAfter={<FaSearch />}
                      value={keywordFilter}
                      onChange={(e) => handleSearchKeyword(e)}
                    />
                  </S.SearchContent>
                </Col>
                <Col span={10}>
                  <S.SortWrapper>
                    <Select
                      allowClear
                      placeholder="Xếp theo giá"
                      onChange={(value) => handleChangeSort(value)}
                    >
                      <Select.Option value="asc">Từ thấp &rArr; cao</Select.Option>
                      <Select.Option value="desc">Từ cao &rArr; thấp</Select.Option>
                    </Select>
                  </S.SortWrapper>
                </Col>
              </Row>
              <S.FilterTopWrapper>
                <Row>
                  <Col span={16}>
                    <Select
                      mode="multiple"
                      // defaultValue={categoryFilter} 
                      placeholder="Nhà sản xuất"
                      onChange={(value) => handleCategoryTopFilter(value)}
                    >
                      {renderTopCategoryList}
                    </Select>
                  </Col>
                  <Col span={8}>
                    <Select
                      mode="multiple"
                      placeholder="Số cửa"
                      onChange={(value) => handleDoorTopFilter(value)}
                    >
                      <Select.Option value={1}>2</Select.Option>
                      <Select.Option value={2}>4</Select.Option>
                    </Select>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Select
                      mode="multiple"
                      placeholder="Số ghế ngồi"
                      onChange={(value) => handleSeatTopFilter(value)}
                    >
                      <Select.Option value={1}>2</Select.Option>
                      <Select.Option value={2}>2+2</Select.Option>
                      <Select.Option value={3}>4</Select.Option>
                    </Select>
                  </Col>
                  <Col span={16}>
                    <Select
                      placeholder={
                        <span>
                          {priceFilter[0].toLocaleString()} &hArr; {priceFilter[1].toLocaleString()}
                        </span>
                      }
                      dropdownRender={() => (
                        <div style={{ padding: '0px 8px' }}>
                          <Slider
                            range
                            min={PRICE_FILTER[0]}
                            max={PRICE_FILTER[1]}
                            step={1000000}
                            value={priceFilter}
                            tipFormatter={(value) => value.toLocaleString()}
                            onChange={(value) => handleChangePriceFilter(value)}
                          />
                        </div>
                      )}
                    >
                    </Select>
                  </Col>
                </Row>
              </S.FilterTopWrapper>
              {!!categoryFilter.length && renderCategoryFilterTags()}
              {keywordFilter && (
                <Tag
                  closable
                  color={COLOR.blue3}
                  onClose={() => handleClearKeyword()}
                >
                  Từ khóa: {keywordFilter}
                </Tag>
              )}
              {(priceFilter[0] !== PRICE_FILTER[0] || priceFilter[1] !== PRICE_FILTER[1]) && (
                <Tag
                  closable
                  color={COLOR.blue3}
                  onClose={() => handleClearPriceFilter()}
                >
                  Giá: {priceFilter[0].toLocaleString()} &hArr; {priceFilter[1].toLocaleString()}
                </Tag>
              )}
            </S.SearchContainer>
            <S.ProductItemWrapper>
              <S.ProductItemContainer>
                {renderProductList}
              </S.ProductItemContainer>
              {productList.meta.total !== productList.data.length && (
                <Row justify="center">
                  <Button
                    onClick={() => handleLoadMore()}
                  >
                    Xem thêm
                  </Button>
                </Row>
              )}
            </S.ProductItemWrapper>
          </S.SearchWrapper>
        </S.ProductListContainer>
      </S.ProductListWrapper>
    </>
  )
}

export default ProductListPage
