export default function SearchInput( {labelText, placeholderText, name, inputState, onChange} ) {

    return (
        <div>
            <label htmlFor={name} className='form-label orange-light'>{labelText}</label>
            <input 
                type="text" 
                name={name} 
                id={name} 
                value={inputState} 
                onChange={onChange}
                className='form-control orange-input m-0' 
                placeholder={placeholderText}/>
        </div>
    )
}