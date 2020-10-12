import axios from 'axios';
import { apiURI } from '../config/paths';

export default class API {
  static async fetchCardNumber(card) {
    const response = await axios.post(`${apiURI}ATM/PostCardNumber`, {
      Number: card.number,
    });

    return response;
  }

  static async fetchCardPin(card) {
    const response = await axios.post(`${apiURI}ATM/PostPin`, {
      Number: card.number,
      Pin: card.pin,
    });

    return response;
  }

  static async getCardBalance(card) {
    const response = await axios.post(`${apiURI}ATM/PostBalance`, {
      Number: card.number,
    });

    return response;
  }

  static async withdraw(card) {
    const response = await axios.post(`${apiURI}ATM/PostWithdraw`, {
      Number: card.number,
      Amount: card.amount,
    });

    return response;
  }
}
