export const formatPrice = (n) => {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  return format.format(n);
};

export const calculateTotalAmount = (orders) => {

  let totalAmount = 0;
  for (let order of orders) {
    totalAmount += order.orderAmount;
  }
  return formatPrice(totalAmount);
};