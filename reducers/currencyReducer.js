const initialData = [
  'AUD ($)',
  'BGN (лв)',
  'BRL (R$)',
  'CAD ($)',
  'CNY (¥)',
  'CZK (Kč)',
  'DKK (kr)',
  'EUR (€)',
  'GBP (£)',
  'HKD ($)',
  'ILS (₪)',
  'INR (₹)',
  'ISK (kr)',
  'JPY (￥)',
  'KRW (₩)',
  'MXN ($)',
  'MYR (RM)',
  'NOK (kr)',
  'NZD ($)',
  'PHP (P)',
  'PLN (zł)',
  'RUB (руб)',
  'SEK (kr)',
  'SGD ($)',
  'THB (฿)',
  'TRY (Tl)',
  'USD ($)',
  'ZAR (R)'
];

const currencyReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'GET_CURRENCY_DATA':
      return state;
    default:
      return state;
  }
};

export default currencyReducer;
