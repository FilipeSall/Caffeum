
import './Study.scss';
import Seo from '../../components/seo/Seo';
import { useState } from 'react';
import Header from './header/Header';
import Content from './content/Content';

function Study() {

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            <Seo
                description='Mapais mentais, links e sites para te ajudar na hora de estudar programação, como React, Typescript, Css, HTML, back-end, sites para estudar, sites para empregos, nodejs, typescript, json, git.'
                title='Caffeum | Estudos'
            />
            <section className='study-container'>
                <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Content searchTerm={searchTerm} />
            </section>
        </>
    )
}

export default Study