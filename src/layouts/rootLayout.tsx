import { Outlet } from "react-router-dom"
import Nav from "../components/nav/Nav"
import './rootLayout.scss';
import {Theme} from '@radix-ui/themes'

function rootLayout() {

    return (
        <Theme>
            <main className='root-layout'>
                <Nav />
                <Outlet />
            </main>
        </Theme>
    )
}

export default rootLayout