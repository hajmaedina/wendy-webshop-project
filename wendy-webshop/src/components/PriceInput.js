export default function PriceInput( {labelText, placeholderText, name, inputType, inputState, onChange} ) {

    return (
        <div>
            <label htmlFor={name} className='form-label orange-light'>{labelText}</label>
            <input 
                type={inputType} 
                name={name} 
                id={name} 
                value={inputState} 
                onChange={onChange}
                className='form-control orange-input m-0' 
                placeholder={placeholderText}/>
        </div>
    )
}