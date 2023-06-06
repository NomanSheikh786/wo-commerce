import 'intl';
import 'intl/locale-data/jsonp/id';

export const toAmount = (amount) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'PKR' }).format(
    amount
  );

