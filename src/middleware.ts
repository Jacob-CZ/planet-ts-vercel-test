import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'
const user_regex = new RegExp(/\/((user.*)|(online.*))/)
const admin_redex = new RegExp(/\/admin.*/)
const doctor_redex = new RegExp(/\/doctor.*/)
const user_access = ["user", "random"]
const admin_access = ["admin", "doctor","user", "random"]
const doctor_access = ["doctor", "user", "random"]
export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request)
  const role = user?.data?.user?.user_metadata.role
  const pathname = request.nextUrl.pathname
  let acces_lvl;
  let nescessary_access;
  switch (role) {
    case "admin":
      acces_lvl = admin_access
      break;
    case "doctor":
      acces_lvl = doctor_access
      break;
    case "user":
      acces_lvl = user_access
      break;
    default:
      acces_lvl = ["random"]
      break;
  }
  if (admin_redex.test(pathname) && !acces_lvl.includes("admin")) {
    console.log("match")
    return NextResponse.redirect(new URL('/error', request.url), 307)
  }
  if (doctor_redex.test(pathname) && !acces_lvl.includes("doctor")) {
    return NextResponse.redirect(new URL('/error', request.url), 307)
  }
  if (doctor_redex.test(pathname) && !acces_lvl.includes("user")) {
    return NextResponse.redirect(new URL('/error', request.url), 307)
  }

  return response
}

export const config = {
  matcher: [
    // '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    '/(test)'
  ],
}