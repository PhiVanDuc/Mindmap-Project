import '@/assets/scss/globals.scss'
import Navigation from "@/global_components/Navigation"
import Footer from "@/global_components/Footer"
import AuthProvider from './context/AuthProvider'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className='font-custom'>
            <body>
                <AuthProvider>
                    <Navigation />
                    {children}
                    <Footer />
                </AuthProvider>

                <ToastContainer />
            </body>
        </html>
    )
}