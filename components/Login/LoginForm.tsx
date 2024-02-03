'use client'

import TEXT from '@/config/Text'
import { useLanguage } from '@/hooks/useLanguage'
import { emailRegister, login, resendEmailOtp } from '@/query/user/api'
import { Dialog, DialogBody } from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import RhfTextField from '../rhf-form/rhf-text-field'
// import type { Database } from "@/lib/database.types";

// const pacifico = Pacifico({
//     subsets: ["latin"],
//     weight: "400",
// });

export default function LoginForm({}) {
  const { push } = useRouter()
  const { t } = useLanguage()

  const [open, setOpen] = useState(false)
  const [timer, setTimer] = useState<number>(30)
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true)
  const [otpCode, setOtpCode] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // use-hook-form
  const {
    getValues,
    handleSubmit,
    formState: { errors },
    watch,
  } = useFormContext()

  //mutation
  const resendEmailMutation = useMutation({
    mutationFn: resendEmailOtp,
    onSuccess: async (data) => {
      toast.success(TEXT.TOAST_SUCCESS_RESEND_EMAIL_VERIFICATION)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (user) => {
      if (user) {
        toast.success(TEXT.TOAST_SUCCESS_LOGIN)
        push('/')
      } else {
        toast.success(TEXT.TOAST_SUCCESS_REGISTER_MEMBER)
      }
      // push(Paths.HOME)
    },
    onError: (error: Error) => {
      const email: string = watch('email')

      if (error.message == 'Email not confirmed') {
        toast.error(TEXT.TOAST_ACCOINT_NOT_CONFIRM)
        resendEmailMutation.mutate({
          email: email,
        })
      } else if (error.message == 'Invalid login credentials') {
        toast.error(TEXT.TOAST_INVALID_CREDENTIALS)
      } else {
        toast.error(error.message)
      }
    },
  })

  //new register mutation

  const onSubmit = (data: any) => {
    // setIsLoading(true)
    console.log('data', data)
    const { email, password } = data
    mutation.mutate({
      email,
      password,
    })
    // mutation.mutate(data)

    // await mutation.mutate({ ...data, dob: new Date(data.dob) });
    // push(Paths.MERCHANT_ONBOARDING)
  }

  const handleOpen = () => setOpen(!open)

  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 w-full">
        <RhfTextField
          label="Email*"
          name="email"
          type="email"
          placeHolder="Please Enter Your Email"
          divClass="relative mb-8"
          inputClass="w-full py-4 px-6 border-[1px] border-gainsboro bg-palette-card outline-none rounded-lg shadow-md"
          labelClass="absolute -top-[30%] ltr:left-3 rtl:right-3 bg-palette-card p-[0.3rem] whitespace-nowrap"
        />
        <RhfTextField
          label="Password*"
          name="password"
          type="password"
          placeHolder="Please Enter Your Password"
          divClass="relative mb-8"
          inputClass="w-full py-4 px-6 border-[1px] border-gainsboro bg-palette-card outline-none rounded-lg shadow-md"
          labelClass="absolute -top-[30%] ltr:left-3 rtl:right-3 bg-palette-card p-[0.3rem] whitespace-nowrap"
        />

        <button
          type="submit"
          className="bg-palette-primary w-full py-4 rounded-lg text-palette-side text-xl shadow-lg"
          disabled={mutation.isLoading}
        >
          {t[`login`]}
        </button>
      </div>
    </form>
  )
}
