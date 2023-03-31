const axios = require("axios");

const getData = async (coin) => {
  const res = await axios.get(
    `https://rest.coinapi.io/v1/exchangerate/${coin}?apikey=${process.env.API_KEY}`
  );
  const result = res.data.rates.find((item) => item.asset_id_quote === "USD");
  return result;
};

module.exports = { getData };
