import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { log } from 'console'
// import supabase from "@/lib/supabase";

const supabase = createClientComponentClient()

// query
export async function getAuthUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export async function verifyEmailOtp(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  })

  if (error) {
    alert('Email verification failed. Please try again.')
    throw new Error(error.message)
  }

  if (data) {
    return true
  }
}

export async function sendEmailOtp({ email }: { email: string }) {
  const { data, error } = await supabase.auth.resend({
    type: 'email_change',
    email,
  })
  if (error) {
    throw new Error(error.message)
  }

  if (data) {
    return true
  }
}

export async function resendEmailOtp({ email }: { email: string }) {
  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email,
  })
  if (error) {
    throw new Error(error.message)
  }

  if (data) {
    return true
  }
}

// mutation
export async function googleLogin({
  loginType,
  pathname,
}: {
  loginType: string
  pathname?: string
}) {
  console.log('pathname', location.origin + pathname)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // redirectTo:
      //   loginType == "user"
      //     ? `${location.origin + pathname}`
      //     : `${location.origin}/merchant`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      skipBrowserRedirect: true,
      // redirectTo: `${location.origin}/close-page`,
      redirectTo: 'https://example.com/welcome',
      // google oAuth takes a 'login_hint' query param if we already know which email we're logging into
      // queryParams: { login_hint: decoded.email },
    },
  })

  console.log(data, error, 'google logedd')
  return data

  // const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //         queryParams: {
  //             access_type: "offline",
  //             prompt: "consent",
  //         },
  //         redirectTo: `${location.origin}/merchant`,
  //     },
  // });
}

export async function loginWithGoogleOneTap(idToken: any) {
  // console.log("api idToken: ", idToken);

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: idToken,
  })

  // await supabase
  //     .from("users")
  //     .update({
  //         last_login_at: new Date().toISOString(),
  //     })
  //     .eq("id", data?.user?.id);

  console.log('one tap data', data)
}

export async function login(signInData: SignInDto) {
  const { email, password, ref } = signInData

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  console.log('login data', data)

  // Update the user's last_login_at field in the database.
  await supabase
    .from(ref ? ref : 'users')
    .update({
      last_login_at: new Date().toISOString(),
    })
    .eq('id', data?.user?.id)

  return data
}

export async function emailRegister(
  signUpData: SignUpData,
): Promise<{ status: string; email: string }> {
  try {
    const { email, password, confirm_password } = signUpData

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    let status = ''

    if (userData) {
      //have merchant record, ask user to login
      status = 'merchant exists'
    } else {
      status = 'no user auth'
      const { data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/users/auth/callback`,
          data: {
            type: 'user',
          },
        },
      })

      console.log('data', data)

      await supabase.from('users').insert({
        id: data?.user?.id as string,
        email: signUpData.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        // last_login_at: new Date().toISOString(),
      })
    }
    return { status, email: email }
  } catch (error: any) {
    throw new Error(error.message)
  }

  // const { email, password, confirm_password } = signUpData;

  // const { data: merchantData, error: merchantError } = await supabase
  //     .from("merchants")
  //     .select("id")
  //     .eq("email", email)
  //     .single();

  // const { data: userData, error: userError } = await supabase
  //     .from("users")
  //     .select("id")
  //     .eq("email", email)
  //     .single();

  // console.log("merchantData", merchantData);
  // console.log("userData", userData);

  // if (merchantData) {
  //     //have merchant record, ask user to login

  //     console.log("have acc, pls login");
  // } else if (userData) {
  //     //have user record, insert record to merchant table
  //     console.log("have user data");

  //     await supabase.from(merchantRef).insert({
  //         // ...rest,
  //         id: userData.id,
  //         email,
  //         created_at: new Date().toISOString(),
  //         updated_at: new Date().toISOString(),
  //         // last_login_at: new Date().toISOString(),
  //     });
  // } else {
  //     // no merchant record
  //     console.log("no merchant record");

  //     // const { data: signUpData } = await supabase.auth.signUp({
  //     //     email,
  //     //     password,
  //     //     options: {
  //     //         emailRedirectTo: `127.0.0.1:3000/auth/callback`,
  //     //         // emailRedirectTo: `${location.origin}/auth/callback`,
  //     //     },
  //     // });
  //     const { data, error } = await supabase.auth.signInWithOtp({
  //         email,
  //         options: {
  //             emailRedirectTo: `${location.origin}/auth/callback`,
  //         },
  //     });

  //     console.log("data", data);
  //     console.log("error", error);

  //     // await supabase.from(merchantRef).insert({
  //     //     // ...rest,
  //     //     id: data.user?.id as string,
  //     //     email: email,
  //     //     created_at: new Date().toISOString(),
  //     //     updated_at: new Date().toISOString(),
  //     //     // last_login_at: new Date().toISOString(),
  //     // });
  // }
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  console.log('logout error', error)
}
