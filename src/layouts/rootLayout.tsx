import { Outlet } from "react-router-dom"
import Nav from "../components/nav/Nav"
import './rootLayout.scss';

function rootLayout() {

    return (
        <main className='root-layout'>
            <Nav />
            <Outlet />
        </main>
    )
}

export default rootLayout