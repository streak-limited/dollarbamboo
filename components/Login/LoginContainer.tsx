'use client'

import { EmailLoginFields } from '@/config/formFields/LoginFields'
import { SignUpFields } from '@/config/formFields/SignUpFields'
import { useLanguage } from '@/hooks/useLanguage'
import { IUserInfoRootState } from '@/lib/types/user'
import { useAuth } from '@/utils/authProvider'
import { faGoogle, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faMobile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { Pacifico } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { title } from 'process'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RhfTextField from '../rhf-form/rhf-text-field'
import RHFWrapper from '../rhf-form/rhf-wrapper'
import Input from '../UI/Input'
import LoginForm from './LoginForm'
import SignUpForm from './LoginForm'

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
})
interface SignUpContainerProps {
  title: string
  errorMessage: string
}

export default function LoginContainer() {
  const { user } = useAuth()

  let title = 'Login'
  const userNameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const errorMessageRef = useRef<HTMLSpanElement | null>(null)
  const { t } = useLanguage()
  const dispatch = useDispatch()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const { redirect } = router.query
  const userInfo = useSelector(
    (state: IUserInfoRootState) => state.userInfo.userInformation,
  )

  useEffect(() => {
    if (userInfo) {
      router.push((redirect as string) || '/')
    }
  }, [userInfo, redirect, router])

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="w-full md:w-[50%] max-w-[500px] border-2 bg-palette-card shadow-lg py-4 px-8 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold">{t[`Sign Up`]}</h2>

          <div className="mt-8">
            <RHFWrapper
              formFields={EmailLoginFields}
              // onSubmit={(data) => console.log(data)}
            >
              <LoginForm />
            </RHFWrapper>
          </div>
          {/* {errorMessage && (
            <span
              ref={errorMessageRef}
              className="text-rose-600 block -mt-4 mb-4"
            >
              {t[`${errorMessage}`] ? t[`${errorMessage}`] : errorMessage}
            </span>
          )} */}
        </div>
      </div>
    </>
  )
}
