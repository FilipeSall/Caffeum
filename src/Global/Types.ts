import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { IconBaseProps } from 'react-icons';

export interface NavigationLinkProps {
    text: string;
    path: string;
    icon?: string;
}

export interface LinksToolsProps {
    title: string;
    icon: string;
    description: string;
    types: string[];
    path: string;
}

export interface EditLinkProps extends LinksToolsProps {
    id?: string,
    bigType: string,
}

export interface UserProps {
    name: string,
    userUid: string,
    isAdmin: boolean,
}

export interface RadioOption {
    value: string;
    label: string;
    icon: string;
}

export interface OptionsTypes {
    text: string,
    title: string,
    icon: string,
    value: string,
}

export interface ModalProps {
    setModal: Dispatch<boolean>,
    bigType: string,
    filterType: string[],
    setFilterType: Dispatch<SetStateAction<string[]>>,
    modal: boolean,
    parentRef: MutableRefObject<HTMLImageElement | null>;
}

type ValueState = string | File;

export interface InputWrapperProps {
    inputType: string;
    labelText: string;
    value: string | File;
    setValue: Dispatch<SetStateAction<ValueState>>;
    isLoaded?: boolean;
    setIsLoaded?: Dispatch<boolean>;
    id: string;
    setError: React.Dispatch<string>;
}

export interface MapaMentalProps {
    url: string,
    description: string,
    title: string,
    type?: string,
}

export interface jobSitesProps {
    url: string,
    title: string,
    type: string,
}

export interface WeatherProps {
    weather: { description: string; main: string }[];
    main: { temp: number; humidity: number; pressure: number, feels_like: number };
    wind: { speed: number },
    name: string;
}

export interface SeoProps {
    title: string,
    description: string,
    type?: string,
}

export interface UseOutsideClickProps {
    modalRef: React.RefObject<HTMLElement>;
    parentRef?: React.RefObject<HTMLElement>;
    setModal: (value: boolean) => void;
}

export interface StudyLinkProps {
    title: string;
    path: string;
    tags?:string[];
    type:string;
    text?: string;
    icon?:string | IconBaseProps;
}