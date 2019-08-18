const initialData = [
  'AUD ($)',
  'BGN (лв)',
  'BRL (R$)',
  'CAD ($)',
  'CHF',
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
  'RON',
  'RUB (руб)',
  'SEK (kr)',
  'SGD ($)',
  'THB (฿)',
  'TRY (Tl)',
  'USD ($)',
  'ZAR (R)'
];

const subscriptionsReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'SET_CURRENCY_DATA':
      return state[0];
    default:
      return state;
  }
};

export default subscriptionsReducer;
