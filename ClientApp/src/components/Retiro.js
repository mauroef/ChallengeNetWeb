import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert2';
import store from 'store';
import isAuthenticated from '../helpers/isAuthenticated';
import API from '../services/api';

const swalConf = (tle, txt, icn, showCancel) => {
  return { title: tle, icon: icn, text: txt, showCancelButton: showCancel };
};

export class Retiro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
    };
  }

  cleanInput = () => {
    this.setState({ amount: '' });
  };

  handleExit = (history) => () => {
    store.remove('authenticated');
    history.push('/');
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { history } = this.props;
      const number = this.props.location.state.detail;
      const response = await API.withdraw({
        number: number,
        amount: +this.state.amount,
      });

      if (response.data.success) {
        swal
          .fire(
            swalConf(
              'Confirmado',
              'Operación realizada existosamente. ¿Desea ver el reporte?',
              'success',
              true
            )
          )
          .then((result) => {
            if (result.isConfirmed) {
              history.push({
                pathname: '/reporte',
                state: { detail: response.data.cardTx },
              });
            }
          });
      } else {
        swal.fire(
          swalConf(
            'Advertencia',
            'Saldo insuficiente para realizar esta operación.',
            'warning'
          )
        );
      }

      this.cleanInput();
    } catch (err) {
      swal.fire(swalConf('', 'Error al procesar la consulta.', 'error'));
    }
  };

  render() {
    if (!isAuthenticated()) {
      return <Redirect to="/" />;
    }

    const { history } = this.props;
    const { amount } = this.state;

    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="text-success">Retiro de dinero</h1>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <label htmlFor="pin">Ingrese la cantidad a retirar</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  name="amount"
                  className="form-control"
                  type="text"
                  autoComplete="off"
                  value={amount}
                  onChange={this.changeHandler}
                ></input>
              </div>
            </div>
            <button
              className="btn btn-light"
              type="button"
              onClick={this.cleanInput}
            >
              Limpiar
            </button>
            <button className="btn btn-primary float-right" type="submit">
              Aceptar
            </button>
            <button
              className="btn btn-danger float-right"
              type="button"
              onClick={this.handleExit(history)}
            >
              Salir
            </button>
          </form>
        </div>
      </div>
    );
  }
}
