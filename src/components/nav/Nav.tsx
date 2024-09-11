import './Nav.scss';
import NavigationLink from './NavigationLink/NavigationLink';
import catalogIcon from '../../assets/icons/links.svg';
import adminIcon from '../../assets/icons/admin.svg';
import studyIcon from '../../assets/icons/study.svg';
import climateIcon from '../../assets/icons/climate.svg';
import Videologo from './videologo/Videologo';

function Nav() {

    const navLinks = [
        {
            path:'/',
            text:'Links',
            icon:catalogIcon,
        },
        {
            path:'/weather',
            text:'Clima',
            icon:climateIcon,
        },
        {
            path:'/study',
            text:'Estudos',
            icon:studyIcon,
        },
        {
            path:'/admin',
            text:'Admin',
            icon:adminIcon,
        },
    ]

    return (
            <nav className='navbar-container'>
                <Videologo />
                    {navLinks.map((navlink,i)=> (
                        <NavigationLink
                        key={i}
                        path={navlink.path}
                        icon={navlink.icon}
                        text={navlink.text}
                        />
                    ))}
            </nav>
    )
}

export default Nav