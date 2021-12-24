import { useSelector } from 'react-redux'
import { Card, Descriptions } from 'antd'

import * as S from './styles'
import { UsernameTop } from '../../styles'

const PersonalInfo = () => {
  const { userInfo } = useSelector((state) => state.authReducer)

  return (
    <S.PersonalInfo>
      <Card title="Thông tin cá nhân">
        <Descriptions colon={false} bordered>
          <Descriptions.Item label="Tên người dùng" span={3}>
            {userInfo.data.username}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={3}>
            {userInfo.data.email}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính" span={3}>
            {userInfo.data.gender === 'male' ? 'Nam' : 'Nữ'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </S.PersonalInfo>
  )
}

export default PersonalInfo
