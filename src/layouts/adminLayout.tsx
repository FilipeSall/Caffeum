import { Outlet } from "react-router-dom";


function AdminLayout() {
    return (
            <main className="admin-layout__container">
                <Outlet />
            </main>
    )
}

export default AdminLayout