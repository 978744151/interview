import DeskHeaderComponents from '@/routes/home/desk-header'
import { Outlet } from 'react-router-dom'
import PageFooter from '@/layouts/PageFooter'

const MainLayout = () => {
    return (
        <>
            <DeskHeaderComponents />
            <Outlet /> {/* 这里渲染子路由内容 */}
            <PageFooter></PageFooter>
        </>
    )
}

export default MainLayout