import BreadcrumbContainer from "../../components/Breadcrumb"
import { BREADCRUMB } from './constant'

import * as S from './styles'

const BlogPage = () => {
  return (
    <>
      <BreadcrumbContainer breadcrumb={BREADCRUMB} />
      <S.BlogWrapper>
        <h2>Trang này chưa được hoàn thiện, vui lòng thử lại sau</h2>
      </S.BlogWrapper>
    </>
  )
}

export default BlogPage
