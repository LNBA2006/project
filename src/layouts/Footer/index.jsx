import {FaFacebook, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'
import * as S from './styles'

const Footer = () => {
  return (
    <S.Footer>
      <div>
        <S.Logo className="logo">Vrooom</S.Logo>
        <div>Công ty TNHH MTV Vrooom</div>
        <span>
          Mã số doanh nghiệp: 0102466664. 
          Đăng ký lần đầu ngày 20 tháng 06 năm 1995, 
          đăng ký thay đổi lần thứ 43, ngày 20 tháng 06 năm 2021
        </span>
      </div>
      <S.List>
        <S.Title>Về chúng tôi</S.Title>
        <ul>
          <li>Giới thiệu về Vrooom</li>
          <li>Danh sách cửa hàng</li>
          <li>Quản lý chất lượng</li>
          <li>Chính sách bảo mật và chia sẻ thông tin</li>
          <li>Điều khoản và điều kiện giao dịch</li>
        </ul>
      </S.List>
      <S.List>
        <S.Title>Hỗ trợ khách hàng</S.Title>
        <ul>
          <li>Trung tâm hỗ trợ khách hàng</li>
          <li>Chính sách giao hàng</li>
          <li>Chính sách thanh toán</li>
          <li>Chính sách đổi trả</li>
          <li>Chính sách chiết khấu ưu đãi mua sắm</li>
        </ul>
      </S.List>
      <S.List>
        <S.Title>Chăm sóc khách hàng</S.Title>
        <ul>
          <li>Mua Online: 0905 666666</li>
          <li>Chính sách giao hàng</li>
        </ul>
        <S.Connect>
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
          <FaYoutube />
        </S.Connect>
      </S.List>
    </S.Footer>
  )
}

export default Footer
