import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import swal from 'sweetalert2';
import API from '../services/api';

const swalConf = {
  title: 'Error',
  icon: 'error',
  text: 'El número de la tarjeta no existe o se encuentra bloqueda.',
};

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: '',
    };
  }

  cleanInput = () => {
    this.setState({ number: '' });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = async (e) => {
    e.preventDefault();

    const response = await API.fetchCardNumber({
      number: this.state.number.replaceAll('-', ''),
    });
    const { history } = this.props;

    if (response === null || !response.data.success) {
      swal.fire(swalConf).then(this.setState(this.cleanInput()));
      return;
    }

    history.push({
      pathname: '/ingreso-pin',
      state: { detail: response.data.number },
    });
  };

  render() {
    const { number } = this.state;

    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="text-primary">Servicio de ATM</h1>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <label htmlFor="number">
                Ingrese su número de tarjeta de 16 dígitos
              </label>
              <InputMask
                name="number"
                autoComplete="off"
                className="form-control"
                value={number}
                onChange={this.changeHandler}
                mask="9999-9999-9999-9999"
                maskChar=" "
                required
              />
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
          </form>
        </div>
      </div>
    );
  }
}
