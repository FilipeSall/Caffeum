import { Dispatch, MutableRefObject, SetStateAction } from "react";

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

export interface EditLinkProps extends LinksToolsProps{
    id?:string,
    bigType:string,
}   

export interface UserProps {
    name: string,
    userUid: string,
    isAdmin: boolean,
}

export interface RadioOption {
    value: string;
    label: string;
    icon:string;
}

export interface OptionsTypes {
    text:string,
    title:string,
    icon:string,
    value:string,
}

export interface ModalProps{
    setModal:Dispatch<boolean>,
    bigType:string,
    filterType:string[],
    setFilterType: Dispatch<SetStateAction<string[]>>,
    modal:boolean,
    parentRef:MutableRefObject<HTMLImageElement | null>;
}

type ValueState = string | File ;

export interface InputWrapperProps{
    inputType: string;
    labelText: string;
    value: string | File;
    setValue:  Dispatch<SetStateAction<ValueState>>;
    isLoaded?: boolean;
    setIsLoaded?: Dispatch<boolean>;
    id: string;
    setError: React.Dispatch<string>;
}

export interface MapaMentalProps {
    url:string,
    description:string,
    title:string,
    type?:string,
}

export interface jobSitesProps{
    url:string,
    title:string,
    type:string,
}