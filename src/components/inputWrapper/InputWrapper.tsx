import { InputWrapperProps } from '../../Global/Types';
import './InputWrapper.scss';
import uploadicon from '../../assets/icons/create.svg';
import uploadedOkIcon from '../../assets/icons/uploaded.svg';

function InputWrapper({ inputType, labelText, setValue, value, isLoaded, setIsLoaded, id, setError }: InputWrapperProps) {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        //se o type for FILE
        if (inputType === 'file' && event.target as HTMLInputElement) {
            const fileInput = event.target as HTMLInputElement;
            const selectedFile = fileInput.files && fileInput.files[0];
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
            if (selectedFile && setIsLoaded && allowedTypes.includes(selectedFile.type)) {
                setValue(selectedFile as File);
                setIsLoaded(true);
                setError('');
            } else {
                setError('Formato de arquivo inválido ou vazio.');
                if (setIsLoaded) setIsLoaded(false);
                setValue("");
            }
            //se o type for qualquer outro
        } else {
            setValue(event.target.value);
        }
    };

    if (inputType === 'file') {
        return (
            <div className='admin-input-wrapper'>
                <label htmlFor={id}>{labelText}</label>
                <input type='file' style={{ display: 'none' }} id={id} accept="image/*" onChange={handleInputChange} />
                <button className='new-fileBtn' type='button' onClick={() => document.getElementById(id)?.click()}>{isLoaded ? <img src={uploadedOkIcon} className='form-create_icon' /> : <img src={uploadicon} className='form-create_icon' />}{isLoaded ? 'Arquivo Carregado' : 'Carregar arquivo'}</button>
            </div>
        )
    } else {
        return (
            <div className='admin-input-wrapper'>
                <label htmlFor={id}>{labelText}</label>
                <input type={inputType} value={value as string} onChange={handleInputChange} id={id} />
            </div>
        )
    }
}

export default InputWrapper