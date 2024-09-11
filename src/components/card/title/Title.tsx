import './title.scss';

type TitleProps = {
    title: string,
}

function Title({ title }: TitleProps) {
    return (
        <h1 className={
            title.length > 16 && title.length < 19
                ? 'card-long_text_more'
                : title.length > 15 && title.length < 16
                    ? 'card-long_text'
                    : title.length > 19 ? 'card-super-long_text' : ''}
        >{title}
        </h1>
    )
}

export default Title