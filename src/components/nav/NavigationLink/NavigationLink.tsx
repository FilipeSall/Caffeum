import { NavLink } from 'react-router-dom';
import './NavigationLink.scss';
import { NavigationLinkProps } from '../../../Global/Types';

function NavigationLink({ path, text, icon }: NavigationLinkProps) {

    return (
            <>
                <NavLink to={path} className={`navlink`}>
                    {icon && <img src={icon} alt={`${text} icon`} />}
                    {text}
                </NavLink>
            </>
    )
}

export default NavigationLink