import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server";

export const middleware = async (req) => {
    const pathname = req.nextUrl.pathname;
    const fullUrl = req.url;
    const jwt = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });

    const homeUrl = new URL("/", fullUrl);
    const loginUrl = new URL("/login", fullUrl);

    if (pathname.startsWith('/my-mindmap') && pathname.replace("/my-mindmap", "").length > 1 ) {
        const response = await fetch(new URL(`${process.env.API}/${pathname.replace("/my-mindmap/", "")}`).href, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            next: {
                tags: ["fetch-middleware"]
            }
        })

        const data = await response.json();

        if (pathname.startsWith(`/my-mindmap/${pathname.replace("/my-mindmap/", "")}`)) {
            if (Object.keys(data).length === 0) {
                return NextResponse.rewrite(new URL("/404", fullUrl));
            }
            else if (!data.isAccessible && data.email !== jwt?.email) {
                return NextResponse.redirect(homeUrl);
            }
            else if (data.isAccessible && data.email !== jwt?.email) {
                return NextResponse.next();
            }
        }
    }

    if (pathname.startsWith("/login")) {
        if (jwt) return NextResponse.redirect(homeUrl);
    }

    if (pathname.startsWith("/my-mindmap")) {
        if (!jwt) return NextResponse.redirect(loginUrl);
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}