import React from 'react';
import { useSelector } from 'react-redux';
import './SavedForms.css';

function SavedForms() {
  const forms = useSelector((state) => state.form.forms);

  return (
    <div className="saved-forms-container">
      {forms.length > 0 ? (
        forms.map((form, index) => (
          <div key={index} className="card">
            <p><strong>Nome:</strong> {form.firstName} {form.lastName}</p>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Mensagem:</strong> {form.message}</p>
          </div>
        ))
      ) : (
        <p>Nenhum dado de formulário recebido.</p>
      )}
    </div>
  );
}

export default SavedForms;