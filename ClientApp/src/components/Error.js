import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const handleBack = (history) => () => {
  history.push('/');
};

const Error = ({ history }) => {
  return (
    <Jumbotron>
      <h1>Página no encontrada</h1>
      <p>
        <Button color="primary" onClick={handleBack(history)}>
          Atrás
        </Button>
      </p>
    </Jumbotron>
  );
};

export default Error;
