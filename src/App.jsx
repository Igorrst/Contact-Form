import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addFormData } from './features/form/formSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    agreed: false,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    agreed: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formValues.firstName) {
      errors.firstName = 'Insira o primeiro nome';
    }
    if (!formValues.lastName) {
      errors.lastName = 'Insira o sobrenome';
    }
    if (!formValues.email) {
      errors.email = 'Email inválido';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Email inválido';
    }
    if (!formValues.message) {
      errors.message = 'Insira uma mensagem';
    }
    if (!formValues.agreed) {
      errors.agreed = 'Você deve concordar com os termos de uso';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(addFormData(formValues)); // Adicionar novo formulário à lista de formulários no estado global
      console.log('Form submitted successfully');
      alert('Formulário enviado com sucesso!'); // Exibe uma mensagem de alerta
      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        agreed: false,
      }); // Limpar os valores do formulário
    }
  };

  return (
    <div className="form-container">
      <h1>Formulário de Contato</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group half-width">
            <label>Primeiro nome <span className="required">*</span></label>
            <input
              type="text"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
            />
            {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
          </div>
          <div className="form-group half-width">
            <label>Sobrenome <span className="required">*</span></label>
            <input
              type="text"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
            />
            {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
          </div>
        </div>
        <div className="form-group full-width">
          <label>Email <span className="required">*</span></label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </div>
        <div className="form-group full-width">
          <label>Mensagem <span className="required">*</span></label>
          <textarea
            name="message"
            value={formValues.message}
            onChange={handleChange}
          ></textarea>
          {formErrors.message && <span className="error">{formErrors.message}</span>}
        </div>
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="terms"
            name="agreed"
            checked={formValues.agreed}
            onChange={handleChange}
          />
          <label htmlFor="terms">
            Eu concordo com os termos de uso <span className="required">*</span>
          </label>
          {formErrors.agreed && <span className="error">{formErrors.agreed}</span>}
        </div>
        <button type="submit" className={formValues.agreed ? 'enabled' : 'disabled'} disabled={!formValues.agreed}>
          Enviar
        </button>
      </form>
      <Link to="/saved" className="saved-forms-button">
        Saved Forms
      </Link>
    </div>
  );
}

export default App;