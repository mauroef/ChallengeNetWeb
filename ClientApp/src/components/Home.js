import React, { Component } from 'react';

export class Home extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="cardNumber">
                Ingrese su número de tarjeta de 16 dígitos
              </label>
              <input
                id="cardNumber"
                className="form-control"
                type="text"
                autoComplete="off"
              ></input>
            </div>
            <button className="btn btn-light" type="button">
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
