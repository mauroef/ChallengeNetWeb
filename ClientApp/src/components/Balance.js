import React from 'react';
import { Redirect } from 'react-router-dom';
import store from 'store';
import isAuthenticated from '../helpers/isAuthenticated';

const handleExit = (history) => () => {
  store.remove('authenticated');
  history.push('/');
};

const handleBack = (history) => () => {
  const number = history.location.state.detail.number;

  history.push({
    pathname: '/operaciones',
    state: { detail: number },
  });
};

const Balance = ({ history }) => {
  if (!isAuthenticated()) {
    return <Redirect to="/" />;
  }

  const { number, expirationDate, balance } = history.location.state.detail;

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div>
          <h1 className="text-primary">Balance</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Número</th>
                <th scope="col">Fecha de vencimiento</th>
                <th scope="col">Balance de cuenta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{number}</td>
                <td>{new Date(expirationDate).toLocaleDateString()}</td>
                <td>${balance}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          className="btn btn-light"
          type="button"
          onClick={handleBack(history)}
        >
          Atrás
        </button>
        <button
          className="btn btn-danger float-right"
          type="button"
          onClick={handleExit(history)}
        >
          Salir
        </button>
      </div>
    </div>
  );
};

export default Balance;
