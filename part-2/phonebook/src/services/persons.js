import axios from "axios";

const baseUrl = "https://damp-shadow-787.fly.dev/api/persons";

const getAllPerson = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const createPerson = (personObject) => {
  return axios.post(baseUrl, personObject).then((res) => res.data);
};

const erasePerson = (personId) => {
  return axios.delete(`${baseUrl}/${personId}`).then((res) => res.data);
};

const updatePerson = (personObject, personId) => {
  return axios
    .put(`${baseUrl}/${personId}`, personObject)
    .then((res) => res.data);
};

export default {
  getAllPerson,
  createPerson,
  erasePerson,
  updatePerson,
};
