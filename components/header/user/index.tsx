import React from 'react'
import { useSelector } from 'react-redux'
import { IUserInfoRootState } from '../../../lib/types/user'
import UserAccountBtn from './UserAccountBtn'
import LoginBtn from './LoginBtn'
import { useAuth } from '@/utils/authProvider'

const User = () => {
  const { user } = useAuth()
  return <div>{user ? <UserAccountBtn /> : <LoginBtn />}</div>
}

export default User
