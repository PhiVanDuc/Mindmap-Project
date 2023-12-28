import './style.scss'
import image from '@/assets/images/so-do-tu-duy.webp'
import Image from 'next/image'

export const metadata = {
    title: "Home Page",
}

export default function HomePage() {
    return (
        <main className="home-page">
            <div className="container">
                <h1 className='home-page-heading'>Học tập hiệu quả với biểu đồ tư duy</h1>

                <div className='button-free'>
                    <a href="">Sử dụng miễn phí</a>
                </div>

                <div className='image-hero'>
                    <Image src={image} alt="" />
                </div>

                <div className="useages">
                    <div className="useage">
                        <h3 className='useage-heading'>Dễ sử dụng</h3>
                        <p className='useage-content'>FWR blocks bring in an air of fresh design with their creative layouts and blocks, which are easily customizable</p>
                    </div>

                    <div className="useage">
                        <h3 className='useage-heading'>Không giới hạn</h3>
                        <p className='useage-content'>FWR blocks bring in an air of fresh design with their creative layouts and blocks, which are easily customizable</p>
                    </div>

                    <div className="useage">
                        <h3 className='useage-heading'>Quản lý và chia sẻ</h3>
                        <p className='useage-content'>FWR blocks bring in an air of fresh design with their creative layouts and blocks, which are easily customizable</p>
                    </div>
                </div>
            </div>
        </main>
    )
}