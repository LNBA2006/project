import { Result, Button, Space } from 'antd'
import { FaRegCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { ROUTER } from '../../../../constants'

import * as S from './styles'

const Success = () => {
  const navigate = useNavigate()

  return (
    <S.Done>
      <Result
        icon={<FaRegCheckCircle />}
        title="Cảm ơn bạn đã ủng hộ cửa hàng"
        extra={
          <Space>
            <Button onClick={() => navigate(ROUTER.PROFILE, { state: 'orderList' })}>Kiểm tra đơn hàng</Button>
            <Button type="primary" onClick={() => navigate(ROUTER.HOME)}>Về trang chủ</Button>
          </Space>
        }
      />
    </S.Done>
  )
}

export default Success
