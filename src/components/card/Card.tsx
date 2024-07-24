import './Card.scss';
import { LinksToolsProps, OptionsTypes } from '../../Global/Types';
import { Link } from 'react-router-dom';

import { toolsTypesOptions, depenciesTypesOptions } from '../../Global/typesOptions';

function Card({ description, icon, title, types, path }: LinksToolsProps) {

    const textFormatted = (value: string, key: number) => {
        const findOption = (options: OptionsTypes[], value: string) => {
            return options.find(option => option.value === value);
        }
        const option = findOption([...toolsTypesOptions, ...depenciesTypesOptions], value);
        if (option) {
            return <p key={key}> <img src={option.icon} alt={title} /> {option.title}</p>;
        } else {
            return null;
        }
    }

    return (
        <Link to={`${path}`} target='_blank' className={`card`}>
            <img src={icon} alt={title} className={`card-logo__img`} />
            <h1>{title}</h1>
            <p className='card-description'>{description}</p>
            <div className={`card-type__wrapper`}>
                {types.map((type, i) => (
                    textFormatted(type, i)
                ))}
            </div>
        </Link>
    )
}

export default Card