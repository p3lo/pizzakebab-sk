export function addToOrders(id: number) {
  const orders = localStorage.getItem('orders');
  let orderArray = [];

  if (orders) {
    orderArray = JSON.parse(orders);
  }

  orderArray.push(id);
  localStorage.setItem('orders', JSON.stringify(orderArray));
}

export function removeFromOrders(id: number) {
  const orders = localStorage.getItem('orders');

  if (orders) {
    const orderArray = JSON.parse(orders);
    const index = orderArray.indexOf(id);

    if (index !== -1) {
      orderArray.splice(index, 1);
      localStorage.setItem('orders', JSON.stringify(orderArray));
    }
  }
}

export default function getAllOrderIds(): number[] {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('orders')) {
    return JSON.parse(localStorage.getItem('orders')!);
  } else {
    return [];
  }
}

export function clearOrders() {
  localStorage.removeItem('orders');
}

export function getProductsForOrders(orders: any, products: any) {
  return products.filter((product: { id: any }) => orders.includes(product.id));
}
