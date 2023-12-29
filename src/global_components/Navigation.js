import '@/global_components/styleNavigation.scss'

import Link from "next/link"
import { Fragment } from "react"
import { getServerSession } from "next-auth/next"
import options from '@/app/api/auth/[...nextauth]/options'
import NavLink from './NavLink'
import ButtonSignOut from './ButtonSignOut'

export default async function Navigation() {
    const session = await getServerSession(options);

    return (
        <header className="header-main">
            <div className="container">
                <nav className="nav-main">
                    <div className="logo">
                        <Link href="/home" className="font-bold">Mindmap Flow</Link>
                    </div>

                    <div className="right-side">
                        <NavLink />

                        <div className="other-options">
                            {
                                session ? (
                                    <Fragment>
                                        <p>Hi, { session.user.name }</p>
                                        <Link href="/my-mindmap">My mindmap</Link>
                                        <ButtonSignOut />
                                    </Fragment>
                                ) : (
                                    <Link href="/api/auth/login" className="button-login">Đăng nhập</Link>
                                )
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}