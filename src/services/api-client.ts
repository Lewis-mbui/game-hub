import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "a6c4c31bb05c4347be4f4444c2c1abd4",
  },
});
