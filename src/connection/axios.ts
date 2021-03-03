import axios from "axios";

const instance = axios.create({
  baseURL: "https://laundry-repo.herokuapp.com/laundry",
});

export default instance;
