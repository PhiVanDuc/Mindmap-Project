"use client"

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchSaveMindmap } from '@/app/api/actions/handleFetchData';
import notify from '@/app/utils/notify';
import { stripHtml } from '@/app/utils/methods';

import './styleShareBox.scss';

export default function ShareBox({ session, mindmap }) {
    const fullUrl = useRef("");
    const router = useRouter();
    const [toggle, setToggle] = useState(!mindmap.isAccessible ? 'private' : 'public');
    const [shareImg, setShareImg] = useState(mindmap.metadata.image);
    const [shareTitle, setShareTitle] = useState(mindmap.metadata.title);
    const [shareDesc, setShareDesc] = useState(mindmap.metadata.description);

    useEffect(() => {
        fullUrl.current = window.location.href;
    }, [])

    const handleClickPrivate = () => {
        setToggle("private");
    }

    const handleClickPublic = () => {
        setToggle("public")
    }

    const handleClickSaveShare = async () => {
        if (session?.user?.email !== mindmap.email) {
            notify("warn", "Bạn không thể sửa mindmap!");
            return;
        }

        let isAccessible;
        if (toggle === "private") {
            isAccessible = false;
        } else {
            isAccessible = true;
        }

        notify("warn", "Chờ trong giây lát...")
        const response = await fetchSaveMindmap({
            ...mindmap,
            metadata: {
                image: shareImg,
                title: shareTitle,
                description: shareDesc,
            },
            isAccessible
        });

        if (response === "ok") {
            notify("success", "Lưu thành công!")
            router.refresh();
        }
        else notify("error", "Lưu thất bại!")
    }

    const handleChangeShareTitle = (event) => {
        if (!event.target.value.trim()) document.title = "Trống";
        else document.title = event.target.value.trim();
        setShareTitle(stripHtml(event.target.value));
    }

    const handleChangeShareDesc = (event) => {
        setShareDesc(stripHtml(event.target.value));
    }
    
    const handleChangeShareImg = (event) => {
        setShareImg(stripHtml(event.target.value));
    }

    const handleBlur = (event, isImage = false) => {
        if (!event.target.value.trim()) {
            if (isImage) {
                event.target.value = mindmap.metadata.image;
                setShareImg(mindmap.metadata.image);
            }
            else if (event.target.nodeName === "INPUT") {
                document.title = mindmap.metadata.title;
                event.target.value = mindmap.metadata.title;
                setShareTitle(mindmap.metadata.title);
            }
            else {
                event.target.value = mindmap.metadata.description;
                setShareDesc(mindmap.metadata.description);
            }
        }
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
                                <input type="text" id='share-title' value={ shareTitle } onChange={ handleChangeShareTitle } onBlur={ (event) => { handleBlur(event) } } />
                            </div>

                            <div className="group">
                                <label htmlFor="share-desc">Mô tả</label>
                                <textarea id='share-desc' value={ shareDesc } onChange={ handleChangeShareDesc } onBlur={ (event) => { handleBlur(event) } } />
                            </div>

                            <div className="group">
                                <label htmlFor="share-img">Ảnh chia sẻ</label>
                                <input id='share-img' value={ shareImg } onChange={ handleChangeShareImg } onBlur={ (event) => { handleBlur(event, true) } } />
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