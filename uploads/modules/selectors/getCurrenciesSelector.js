export default function(currencies) {
  const favorites = ["GBP", "USD", "EUR"];
 
  if (!currencies) return [];

  const allCurrencies = currencies.map(c => {
    return {
      id: c.id,
      code: c.countryCode,
      value: `${c.code} - ${c.value}`,
      favorite: favorites.indexOf(c.code) !== -1,
      currencyCode: c.code
    };
  });

  return [
    ...allCurrencies.filter(c => c.favorite),
    ...allCurrencies.filter(c => !c.favorite)
  ];
}
