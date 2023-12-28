import { v4 as uuidv4 } from 'uuid'
import './style.scss'

import MindmapTable from './MindmapTable'
import MindmapButtonNew from './MindmapButtonNew'

export default async function MyMindmapPage() {
    return (
        <main className='my-mindmap-page'>
            <div className="container">
                <h1 className="my-mindmap-page-heading">Mindmap của tôi</h1>
                <MindmapButtonNew id={uuidv4()} />

                <div className="table-recorded">
                    <header className='table-header'>
                        <div className="table-row">
                            <div className="table-data">
                                <input type="checkbox" />
                            </div>

                            <div className="table-data">
                                <p>TÊN</p>
                            </div>

                            <div className="table-data">
                                <p>TẠO LÚC</p>
                            </div>

                            <div className="table-data">
                                <p>HÀNH ĐỘNG</p>
                            </div>
                        </div>
                    </header>

                    <main className='table-body'>
                        <MindmapTable />
                    </main>
                </div>
            </div>
        </main>
    )
}