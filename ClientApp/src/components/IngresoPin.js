import React, { Component } from 'react';
import swal from 'sweetalert2';
import store from 'store';
import API from '../services/api';

const swalConf = (txt, icn) => {
  return { title: 'Error', icon: icn, text: txt };
};

export class IngresoPin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: '',
    };
  }

  cleanInput = () => {
    this.setState({ pin: '' });
  };

  handleExit = (history) => () => {
    history.push('/');
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { history } = this.props;
      const cardNumber = this.props.location.state.detail;
      const response = await API.fetchCardPin({
        number: cardNumber,
        pin: this.state.pin,
      });

      if (!(response.data === true)) {
        const tries = 4 - response.data;

        if (tries > 0) {
          swal
            .fire(
              swalConf(
                `PIN incorrecto. Intentos restantes: ${tries}.`,
                'warning'
              )
            )
            .then(this.cleanInput());

          return;
        } else {
          swal
            .fire(
              swalConf(
                `Su tarjeta ha sido bloqueada. Será redirigido a la pantalla de Home.`,
                'error'
              )
            )
            .then(this.handleExit(history));

          return;
        }
      }

      store.set('authenticated', true);
      history.push({ pathname: '/operaciones', state: { detail: cardNumber } });
    } catch (err) {
      swal
        .fire(swalConf('Error al procesar la consulta.', 'error'))
        .then(this.handleExit(this.props.history));
    }
  };

  render() {
    const { pin } = this.state;
    const { history } = this.props;

    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="text-warning">Autenticación</h1>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <label htmlFor="pin">Ingrese su número PIN</label>
              <input
                name="pin"
                className="form-control"
                type="password"
                autoComplete="off"
                value={pin}
                onChange={this.changeHandler}
              ></input>
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
