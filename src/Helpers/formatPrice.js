/* eslint-disable import/prefer-default-export */
export function formatNumber(number) {
  const formattedNumber = number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formattedNumber;
}
