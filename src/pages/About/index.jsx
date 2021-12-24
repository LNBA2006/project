import BreadcrumbContainer from "../../components/Breadcrumb"
import { BREADCRUMB } from './constant'

import * as S from './styles'

const AboutPage = () => {
  return (
    <>
      <BreadcrumbContainer breadcrumb={BREADCRUMB} />
      <S.AboutWrapper>
        <h2>VROOOM</h2>
        <h3>Công ty chuyên phân phối các sản phẩm xe mô hình chính hãng</h3>
      </S.AboutWrapper>
    </>
  )
}

export default AboutPage
