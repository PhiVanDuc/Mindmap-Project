"use client"

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';

import { fetchSaveMindmap } from '@/app/api/actions/handleFetchData';
import notify from '@/app/utils/notify';

import './styleShareBox.scss'

export default function ShareBox({ session, mindmap }) {
    const fullUrl = useRef("");
    const originUrl = useRef("");
    const router = useRouter();
    const [toggle, setToggle] = useState("private");
    const [nameShare, setNameShare] = useState(mindmap.metadata.name);
    const [descShare, setDescShare] = useState(mindmap.metadata.desc);

    useEffect(() => {
        fullUrl.current = window.location.href;
        originUrl.current = window.location.origin;
    }, [])
    
    const handleClickPrivate = () => {
        setToggle("private");
    }

    const handleClickPublic = () => {
        setToggle("public")
    }

    const handleChangeNameShare = (event) => {
        setNameShare(event.target.value)
    }

    const handleChangeDescShare = (event) => {
        setDescShare(event.target.value)
    }

    const handleClickSaveShare = async () => {
        if (session?.user?.email !== mindmap.email) {
            notify("warn", "Bạn không thể sửa mindmap!");
            return;
        }

        let isAccessible;
        if (toggle === "private") isAccessible = false
        else isAccessible = true

        notify("warn", "Chờ trong giây lát...")
        const response = await fetchSaveMindmap({
            ...mindmap,
            metadata: {
                name: nameShare,
                desc: descShare,
                image: `${originUrl.current}${mindmap.metadata.image}`
            },
            isAccessible
        });

        if (response === "ok") {
            notify("success", "Lưu thành công!")
            router.refresh();
        }
        else notify("error", "Lưu thất bại!")
    }

    return (
        <> 
            <input type="checkbox" id='toggle-share-box' hidden />
            <input type="radio" id='toggle-share-private' name="toggle-share-body" checked={ toggle === "private" } hidden readOnly />
            <input type="radio" id='toggle-share-public' name="toggle-share-body" checked={ toggle === "public" } hidden readOnly />

            <div className="share-box">
                <label htmlFor="toggle-share-box" className='overlay'></label>

                <div className="share-box-structure">
                    <div className="share-box-header">
                        <label htmlFor="toggle-share-private" className='show-private' onClick={ handleClickPrivate }>Riêng tư</label>
                        <label htmlFor="toggle-share-public" className='show-public' onClick={ handleClickPublic }>Công khai</label>
                    </div>

                    <div className='share-box-body'>
                        <div className="body-private">
                            <p>Nếu chọn riêng tư, chỉ có bạn mới được quyền xem Mindmap này!</p>
                        </div>

                        <div className="body-public">
                            <div className="group">
                                <label htmlFor="share-link">Liên kết chia sẻ</label>
                                <input type="text" id='share-link' value={ fullUrl.current } readOnly />
                            </div>

                            <div className="group">
                                <label htmlFor="share-title">Tiêu đề</label>
                                <input type="text" id='share-title' value={ nameShare } onChange={ handleChangeNameShare } />
                            </div>

                            <div className="group">
                                <label htmlFor="share-desc">Mô tả</label>
                                <textarea id='share-desc' value={ descShare } onChange={ handleChangeDescShare } />
                            </div>

                            <div className="group">
                                <label htmlFor="share-img">Ảnh chia sẻ</label>
                                <input id='share-img' value={ `${originUrl.current}${mindmap.metadata.image}` } readOnly />
                            </div>
                        </div>
                    </div>

                    <div className="share-box-footer">
                        <label htmlFor="toggle-share-box">Đóng</label>
                        <label onClick={ handleClickSaveShare }>Lưu lại</label>
                    </div>
                </div>
            </div>
        </>
    )
}