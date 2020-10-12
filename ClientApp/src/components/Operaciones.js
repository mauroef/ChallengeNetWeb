import React from 'react';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert2';
import { Jumbotron } from 'reactstrap';
import store from 'store';
import isAuthenticated from '../helpers/isAuthenticated';
import API from '../services/api';

const handleBalance = (history) => async () => {
  const number = history.location.state.detail;
  const response = await API.getCardBalance({ number });

  try {
    history.push({
      pathname: '/balance',
      state: { detail: response.data._card },
    });
  } catch {
    swal.fire({ icon: 'error', text: 'Error al ejecutar la consulta.' });
  }
};

const handleWithdraw = (history) => () => {
  const number = history.location.state.detail;

  history.push({
    pathname: '/retiro',
    state: { detail: number },
  });
};

const handleExit = (history) => () => {
  store.remove('authenticated');
  history.push('/');
};

const Operaciones = ({ history }) => {
  if (!isAuthenticated()) {
    return <Redirect to="/" />;
  }

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <Jumbotron>
          <h1>Elija una opción para poder operar.</h1>
        </Jumbotron>
        <button
          className="btn btn-danger"
          type="button"
          onClick={handleExit(history)}
        >
          Salir
        </button>
        <button
          className="btn btn-success float-right"
          type="button"
          onClick={handleWithdraw(history)}
        >
          Retiro
        </button>
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={handleBalance(history)}
        >
          Balance
        </button>
      </div>
    </div>
  );
};

export default Operaciones;
