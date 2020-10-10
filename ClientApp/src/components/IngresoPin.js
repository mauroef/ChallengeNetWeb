import React, { Component } from 'react';

export class IngresoPin extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="cardPin">Ingrese su número PIN</label>
              <input
                id="cardPin"
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
            <button className="btn btn-danger float-right" type="button">
              Salir
            </button>
          </form>
        </div>
      </div>
    );
  }
}
