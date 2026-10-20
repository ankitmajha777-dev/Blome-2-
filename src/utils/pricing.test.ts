import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateItemUnitPrice,
  calculateSubtotal,
  calculateDiscount,
  calculateTax,
  calculateOrderTotal,
  calculatePointsEarned
} from './pricing.ts';

test('calculateItemUnitPrice adds base price, size and extras accurately', () => {
  const base = 5.50;
  const sizePrice = 0.75;
  const milkPrice = 0.80;
  const extras = [{ price: 0.75 }, { price: 1.00 }];
  const price = calculateItemUnitPrice(base, sizePrice, milkPrice, extras);
  assert.equal(price, 8.80);
});

test('calculateSubtotal sums up multiple items with quantities', () => {
  const items = [
    { itemPrice: 6.50, quantity: 2 },
    { itemPrice: 4.25, quantity: 1 }
  ];
  assert.equal(calculateSubtotal(items), 17.25);
});

test('calculateDiscount applies percentage promo correctly', () => {
  const res = calculateDiscount(20.00, 'BLOOM15');
  assert.equal(res.discount, 3.00);
  assert.equal(res.appliedPromo?.code, 'BLOOM15');
});

test('calculateDiscount enforces minimum order requirement', () => {
  const res = calculateDiscount(5.00, 'BLOOM15');
  assert.equal(res.discount, 0);
  assert.match(res.error || '', /Minimum order/);
});

test('calculateDiscount applies fixed discount correctly without exceeding subtotal', () => {
  const res = calculateDiscount(10.00, 'FIRSTCUP');
  assert.equal(res.discount, 3.50);
});

test('calculateTax computes 8.25% tax accurately rounded to 2 decimals', () => {
  assert.equal(calculateTax(10.00, 0.0825), 0.83);
  assert.equal(calculateTax(20.00, 0.0825), 1.65);
});

test('calculateOrderTotal computes full breakdown properly', () => {
  const order = calculateOrderTotal(20.00, 3.00, 0.0825, 2.50);
  assert.equal(order.subtotal, 20.00);
  assert.equal(order.discount, 3.00);
  assert.equal(order.tax, 1.40);
  assert.equal(order.tip, 2.50);
  assert.equal(order.total, 20.90);
});

test('calculatePointsEarned yields 1 point per eligible dollar rounded down', () => {
  assert.equal(calculatePointsEarned(24.75), 24);
  assert.equal(calculatePointsEarned(9.99), 9);
});
