import DeskHeaderComponents from '@/routes/home/desk-header'
import { Outlet } from 'react-router-dom'
import PageFooter from '@/layouts/PageFooter'

const MainLayout = () => {
    const outLetStyle = { minHeight: 'calc(100vh - 160px)' } // 根据页头页脚高度调整

    return (
        <>
            <DeskHeaderComponents />
            <div style={outLetStyle}>
                <Outlet /> {/* 移除className，用div包裹控制高度 */}
            </div>
            <PageFooter />
        </>
    )
}
export default MainLayout