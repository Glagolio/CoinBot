const axios = require("axios");

const getData = async () => {
  const res = await axios.get(
    `https://rest.coinapi.io/v1/exchangerate/BTC?apikey=${process.env.API_KEY}`
  );
  const result = res.data.rates.find((item) => item.asset_id_quote === "USD");
  return result;
};

module.exports = { getData };
