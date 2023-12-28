"use client"

import Link from "next/link"
import '@/global_components/styleNavigation.scss'
import { redirect, usePathname } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react"
import { Fragment } from "react"

export default function Navigation() {
    const pathname = usePathname();
    const { data } = useSession();

    return (
        <header className="header-main">
            <div className="container">
                <nav className="nav-main">
                    <div className="logo">
                        <Link href="/home" className="font-bold">Mindmap Flow</Link>
                    </div>

                    <div className="right-side">
                        <ul className="nav-list">
                            <li className="nav-item">
                                <Link href="/home" className={ pathname === "/home" ? "nav-link active" : "nav-link" }>Trang chủ</Link>
                            </li>

                            <li className="nav-item">
                                <Link href="/about" className={ pathname === "/about" ? "nav-link active" : "nav-link" }>Giới thiệu</Link>
                            </li>

                            <li className="nav-item">
                                <Link href="/features" className={ pathname === "/features" ? "nav-link active" : "nav-link" }>Tính năng</Link>
                            </li>

                            <li className="nav-item">
                                <Link href="/prices" className={ pathname === "/prices" ? "nav-link active" : "nav-link" }>Bảng giá</Link>
                            </li>

                            <li className="nav-item">
                                <Link href="/contact" className={ pathname === "/contact" ? "nav-link active" : "nav-link" }>Liên hệ</Link>
                            </li>
                        </ul>

                        <div className="other-options">
                            {
                                data ? (
                                    <Fragment>
                                        <p>Hi, { data.user.name }</p>
                                        <Link href="/my-mindmap">Mindmap</Link>
                                        <button className="button-logout" onClick={() => { signOut({ callbackUrl: `${window.location.origin}/home` }) }}>Đăng xuất</button>
                                    </Fragment>
                                ) : (
                                    <button className="button-login" onClick={() => { signIn() }}>Đăng nhập</button>
                                )
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}