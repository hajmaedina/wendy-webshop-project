import React, { useState, useRef } from 'react'
import InputFieldSet from './InputFieldSet'
import  db  from './firebase/db';
import { Link } from 'react-router-dom';

export default function NewProduct() {
    const [formWasValidated, setFormWasValidated] = useState(false);
    const [formAlertText, setFormAlertText] = useState('');
    const [formAlertType, setFormAlertType] = useState('');

    const [fieldValue, setFieldValue] = useState({
        name:'',
        type:'',
        description:'',
        price:'',
        quantity:0,
    });

    
     const [errorMessages, setErrorMessages] = useState({
        name:'',
        type:'',
        description:'',
        price:'',
        quantity:'',
     });

     const references = {
        name: useRef(),
        type: useRef(),
        description: useRef(),
        price: useRef(),
        quantity: useRef(),
        
      }
    
     const validators = {
         name: {
             required: isNotEmpty
        },
        type: {
            required: isNotEmpty
        },
        description: {
            required: isNotEmpty
        },
        price: {
            required: isNotEmpty,
            numCheck: isNotBelowZero,
        }
        
    }

    function isNotEmpty(value){
        return value !== '';
    }

    function isNotBelowZero(value){
        return value >= 0;
    }

    const errorTypes = {
        required: 'Missing field',
        numCheck: 'Sorry, the number can not go under zero',
    }

    const handleInputOnChange = (e) => {
        const value = e.target.value;
      
        setFieldValue({
            ...fieldValue,
            [e.target.name]: value
        })
    }

    const handleInputBlur = (e) => {
        const name = e.target.name;
        
        validateField(name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = isFormValid();
    
        if(isValid){
            
            db.collection('shopItems').add({
                name:fieldValue.name,
                description: fieldValue.description,
                price: parseInt(fieldValue.price),
                quantityOfStock: parseInt(fieldValue.quantity),
                type:fieldValue.type,
               
            })
            .then((doc) => {
                console.log("Document written with ID: ", doc.id);
                setFormAlertText('Yay, you did it!');
                setFormAlertType('success');
                setFieldValue({
                    name:'',
                    type:'',
                    description:'',
                    price:'',
                    quantity:0,          
                })
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }
        
    } 
     
          const isFormValid = () => {
            let isFormValid = true;
            for (const fieldName of Object.keys(fieldValue)) {
                const isFieldValid = validateField(fieldName);
                if(!isFieldValid) {
                    isFormValid = false;
                }
            }
            return isFormValid;
        }
        
        const validateField = (fieldName) => {
            const value = fieldValue[fieldName];
            let isValid = true;
            setErrorMessages((prevState) => ({
                ...prevState,
                [fieldName]: '',
            }));
            references[fieldName].current.setCustomValidity('');
        
            if(validators[fieldName] !== undefined) {
                
                for(const [validationType, validatorFn] of Object.entries(validators[fieldName])) {
                    if(isValid) {
                        isValid = validatorFn(value);
                        if(!isValid) {
                            const errorText = errorTypes[validationType];
                            setErrorMessages((prevState) => {
                                return({
                                    ...prevState,
                                    [fieldName]: errorText,
                                })
                            });
                            references[fieldName].current.setCustomValidity(errorText);
                        }
                    }
                }
            }
            return isValid;
        }
        
    


    return (
        <div className="container">
            <h1 className="text-info mt-3">Add new item</h1>
            <hr className="text-info" />
            <Link to='/'><button type="button" className="btn btn-orange">Back</button></Link>
            <form className={`needs-validation ${formWasValidated ? 'was-validated' : ''}`} noValidate={true} onSubmit={handleSubmit} >
                <InputFieldSet
                type="text"
                labelText="Name"
                reference={references.name}
                name="name"
                handleInputChange={handleInputOnChange}
                fieldValues={fieldValue}
                errors={errorMessages}
                required={true}
                handleInputBlur={handleInputBlur} 
                 />
                <InputFieldSet
                type="text"
                labelText="Type"
                reference={references.type}
                name="type"
                handleInputChange={handleInputOnChange}
                fieldValues={fieldValue}
                errors={errorMessages}
                required={true}
                handleInputBlur={handleInputBlur} 
                 />
                 <div className={`mb-3 ${errorMessages.description !== '' ? 'was-validated' : ''}`}>
                 <label htmlFor="description" className="form-label m-2 orange-light">Description</label>
                <textarea
                id="description"
                className="form-control mb-3 m-2 orange-input"
                cols="10"
                rows="2"
                name="description"
                ref={references.description}
                onChange={handleInputOnChange}
                onBlur={handleInputBlur}
                value={fieldValue.description}
                required
                >
                </textarea>
                <div className="invalid-feedback">{errorMessages.description}</div>
                </div>
                <InputFieldSet
                type="number"
                labelText="Price"
                reference={references.price}
                name="price"
                handleInputChange={handleInputOnChange}
                fieldValues={fieldValue}
                errors={errorMessages}
                required={true}
                handleInputBlur={handleInputBlur} 
                 />
                <div className="row">
                <div className="col">
                <label htmlFor="quantityOfStock" className="form-label m-2 orange-light">Quantity Of Stock</label>
                <input
                type="range"
                className="form-range m-2 mb-3"
                id="quantityOfStock"
                min="0"
                max="100"
                name="quantity"
                value={parseInt(fieldValue.quantity)}
                onChange={handleInputOnChange}
                ref={references.quantity}
                />
                </div>
                <div className="col-1 btn-orange mt-4 text-center">
                <p className="mt-3">{fieldValue.quantity}</p>
                </div>
                </div>
                <button type="submit" className="btn btn-orange m-2 mb-2">Save</button>
            </form>
            {formAlertText &&
      <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
        {formAlertText}
      </div>
      }
        </div>
    )
}
