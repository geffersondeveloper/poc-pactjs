import 'dotenv/config'

import axios from 'axios'

// const baseUrl = `https://run.mocky.io/v3`

// const consultaUsuarios = async () => {
//   return await axios.get(`${baseUrl}/370c18ef-2806-4910-b1ee-0a70a526fb2d`);
// }

const baseUrl = `http://localhost:4000`

const consultaUsuarios = async () => {
  return await axios.get(`${baseUrl}/370c18ef-2806-4910-b1ee-0a70a526fb2d`);
}

module.exports = {
    consultaUsuarios
}