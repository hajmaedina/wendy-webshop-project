import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InputFieldSet from '../InputFieldSet';
import db from '../firebase/db';

export default function EditForm() {
  const { id } = useParams();

  const [fieldValues, setFieldValues] = useState({
    name: '',
    type: '',
    description: '',
    price: '',
    quantityOfStock: '',
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const [formAlertText, setFormAlertText] = useState('');
  const [formAlertType, setFormAlertType] = useState('');

  const references = {
    name: useRef(),
    type: useRef(),
    description: useRef(),
    price: useRef(),
    quantityOfStock: useRef(),
  };

  const [errors, setErrors] = useState({
    name: '',
    type: '',
    description: '',
    price: '',
    quantityOfStock: '',
  });

  const validators = {
    name: {
      required: isNotEmpty,
    },
    type: {
      required: isNotEmpty,
    },
    description: {
      required: isNotEmpty,
    },
    price: {
      required: isNotEmpty,
      moreThanNull: moreThanNull,
    },
    quantityOfStock: {
      required: isNotEmpty,
      moreThanNull: moreThanNull,
    },
  };

  function isNotEmpty(value) {
    return value !== '';
  }

  function moreThanNull(value) {
    if (!isNaN(value)) {
      if (value >= 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const errorTypes = {
    required: 'Missing details.',
    moreThanNull: 'Please, give a number bigger than 0.',
  };

  function isFormValid() {
    let isFormValid = true;
    for (const fieldName of Object.keys(fieldValues)) {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isFormValid = false;
      }
    }
    return isFormValid;
  }

  function validateField(fieldName) {
    const value = fieldValues[fieldName];
    let isValid = true;
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: '',
    }));
    //references[fieldName].current.setCustomValidity('');

    if (validators[fieldName] !== undefined) {
      for (const [validationType, validatorFn] of Object.entries(
        validators[fieldName]
      )) {
        if (isValid) {
          isValid = validatorFn(value);
          if (!isValid) {
            const errorText = errorTypes[validationType];
            setErrors((previousErrors) => {
              return {
                ...previousErrors,
                [fieldName]: errorText,
              };
            });
            references[fieldName].current.setCustomValidity(errorText);
          }
        }
      }
    }
    return isValid;
  }

  function handleInputChange(e) {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFieldValues({
      ...fieldValues,
      [fieldName]: value,
    });
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: '',
    }));
  }

  function handleInputBlur(e) {
    const name = e.target.name;
    validateField(name);
  }


  function handleSubmit(e) {
    e.preventDefault();

    const isValid = isFormValid();

    if (isValid) {
      db.collection('shopItems')
        .doc(id)
        .update({
          name: fieldValues.name,
          type: fieldValues.type,
          description: fieldValues.description,
          price: parseInt(fieldValues.price),
          quantityOfStock: parseInt(fieldValues.quantityOfStock),
        })
        .then((docRef) => {
          setFieldValues({
            name: '',
            type: '',
            description: '',
            price: '',
            quantityOfStock: '',
          });
          setFormAlertText('Well done! Changes added successfully.');
          setFormAlertType('success');
        });
    } else {
      setFormAlertText('Sorry, we cannot add your changes. Please, try again.');
      setFormAlertType('danger');
    }
  }

  useEffect(() => {
    db.collection('shopItems')
      .doc(id)
      .get()
      .then((docRef) => {
        let data = docRef.data();

        setFieldValues(data);
      });
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-info mt-3">Edit product details</h1>
        <hr className="text-info" />
        {/* <Link to='/'><button type="button" className="btn btn-orange">Back</button></Link> */}
        <form
          onSubmit={handleSubmit}
          noValidate={true}
          className={`needs-validation ${formWasValidated ? 'was-validated' : ''
            }`}
        >
          <InputFieldSet
            reference={references.name}
            name="name"
            labelText="Name"
            type="text"
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />

          <InputFieldSet
            reference={references.type}
            name="type"
            labelText="Type"
            type="text"
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />

          <InputFieldSet
            reference={references.description}
            name="description"
            labelText="Description"
            type="text"
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />

          <InputFieldSet
            reference={references.price}
            name="price"
            labelText="Price"
            type="number"
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
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
                name="quantityOfStock"
                fieldValues={fieldValues}
                value={parseInt(fieldValues.quantityOfStock)}
                onChange={handleInputChange}
                ref={references.quantityOfStock}
              />
            </div>
            <div className="col-1 btn-orange mt-4 text-center">
              <p className="mt-3">{parseInt(fieldValues.quantityOfStock)}</p>
            </div>
          </div>

          <Link to='/'><button type="submit" className="btn btn-orange m-2 mb-2">
            Save
          </button></Link>

        </form>
        {formAlertText && (
          <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
            {formAlertText}
          </div>
        )}
      </div>
    </div>
  );
}



