import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    const user = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })


    // // Get the pathname of the request
    const { pathname } = request.nextUrl



    if (pathname.startsWith('/profile') && (!user)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    

    if (pathname.startsWith('/store/manage') && (!user)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (pathname.startsWith('/store/create') && (!user)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    // protect store/manage/.../:storeId 
    if (pathname.startsWith('/store/manage')) {
        const pathSegments = pathname.split('/');
        const storeIdInPath = pathSegments[pathSegments.length - 1];
    
        const referer = request.headers.get('referer');
        if (storeIdInPath !== `${user.storeId}`) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
    

    // If the pathname starts with /protected and the user is not an admin, redirect to the home page
    if (
        pathname.startsWith('/admin') &&
        (!user || user.roleId === '1' )
    ) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // Continue with the request if the user is an admin or the route is not protected
    return NextResponse.next()
}

// export const config = {
//     matcher: ['/api/profile/:path*', '/api/:path*'], // กำหนดเส้นทางที่ middleware จะทำงาน
// }