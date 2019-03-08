import { Manager, ComputedProperty } from '../lib';

const doubleCp: ComputedProperty = {
  propName: 'doublePrice',
  deps: ['somePrice', 'discount'],
  compute: (props: any) => {
    return props.somePrice * 2 * props.discount;
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
    // expect(updated.somePrice, otherProps.somePrice, 'should not mutate other props');
    // expect(updated.discount, otherProps.discount, 'should not mutate other props');
    // expect(Object.keys(updated).length, 3, 'should not add to props');
  });

  it('computes props for any deps props', () => {
    const manager = new Manager();
    manager.add(doubleCp);
    const otherProps = {
      somePrice: 42,
    };
    const updated = manager.compute(otherProps);
    // expect(updated.doublePrice, 42 * 2, 'should compute doublePrice');
    // expect(updated.somePrice, otherProps.somePrice, 'should not mutate other props');
    // expect(Object.keys(updated).length, 3, 'should not add to props');
  });
});
