import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
// import InputFieldSet from './InputFieldSet';
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
    required: 'Hiányzó érték.',
    moreThanNull: 'Nem adható meg negatív szám.',
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
          setFormAlertText('Sikeres módosítás.');
          setFormAlertType('success');
        });
    } else {
      setFormAlertText('Sikertelen módosítás.');
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
        <h1 className="mt-3">Új termék regisztráció</h1>
        <form
          onSubmit={handleSubmit}
          noValidate={true}
          className={`needs-validation ${formWasValidated ? 'was-validated' : ''
            }`}
        >
          <InputFieldSet
            reference={references.name}
            name="name"
            labelText="Név"
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
            labelText="Típus"
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
            labelText="Leírás"
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
            labelText="Ár"
            type="number"
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />

          <InputFieldSet
            reference={references.quantityOfStock}
            name="quantityOfStock"
            labelText="Mennyiség"
            type="number"
            errors={errors}
            fieldValues={fieldValues}
            handleInputBlur={handleInputBlur}
            handleInputChange={handleInputChange}
            required={true}
          />

          <button type="submit" className="btn btn-primary mt-3">
            Mentés
          </button>
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



function InputFieldSet({
  errors,
  fieldValues,
  handleInputChange,
  handleInputBlur,
  type,
  name,
  labelText,
  required,
  reference,
}) {
  return (
    <div className={`mb-3 ${errors[name] !== '' ? 'was-validated' : ''}`}>
      <label htmlFor={name} className="form-label m-2">
        {labelText}
      </label>
      <input
        type={type}
        className="form-control m-2"
        id={name}
        name={name}
        value={fieldValues[name]}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        required={required}
        ref={reference}
      />
      <div className="invalid-feedback">{errors[name]}</div>
    </div>
  );
}