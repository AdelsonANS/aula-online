import axios from 'axios';

function api(cep){
    const instance = axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return instance;
}

export default api;