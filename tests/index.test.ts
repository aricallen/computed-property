import { Manager, ComputedProperty } from '../lib';

const doubleCp: ComputedProperty = {
  propName: 'doublePrice',
  deps: ['somePrice', 'discount'],
  compute: (props: any) => {
    return props.somePrice * 2 * (props.discount || 1);
  },
};

describe('ComputedPropertyManager', () => {
  it('computes props for deps props', () => {
    const manager = new Manager();
    manager.add(doubleCp);
    const otherProps = {
      somePrice: 42,
      discount: 0.8,
    };
    const updated = manager.compute(otherProps);
    expect(updated.doublePrice).toBe(42 * 2 * 0.8);
    expect(updated.somePrice).toBe(otherProps.somePrice);
    expect(updated.discount).toBe(otherProps.discount);
    expect(Object.keys(updated)).toHaveLength(3);
  });

  it('computes props for any deps props', () => {
    const manager = new Manager();
    manager.add(doubleCp);
    const otherProps = {
      somePrice: 42,
    };
    const updated = manager.compute(otherProps);
    expect(updated.doublePrice).toBe(42 * 2);
    expect(updated.somePrice).toBe(otherProps.somePrice);
    expect(Object.keys(updated)).toHaveLength(2);
  });
});
