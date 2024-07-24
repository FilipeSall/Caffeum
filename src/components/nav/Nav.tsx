import WeatherPainel from '../weatherPainel/WeatherPainel';
import './Nav.scss';
import NavigationLink from './NavigationLink/NavigationLink';
import catalogIcon from '../../assets/icons/links.svg';
import adminIcon from '../../assets/icons/admin.svg';
import studyIcon from '../../assets/icons/study.svg';

function Nav() {

    const navLinks = [
        {
            path:'/',
            text:'Links',
            icon:catalogIcon,
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
                <WeatherPainel />
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