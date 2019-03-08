// const computedProperties = new Map<string, ComputedProperty>([
//   [
//     'exitPrice',
//     {
//       deps: ['buffer', 'startPrice'],
//       compute: (props: any) => {
//         return modByPercent(+props.startPrice, +props.buffer);
//       },
//     },
//   ],
// ]);

interface Pojo {
  [key: string]: any;
}

export interface ComputedProperty {
  propName: string;
  deps: string[];
  compute: (props: any) => any;
}

export class ComputedPropertyManager {
  private readonly map: Map<string, ComputedProperty>;

  constructor(cps: ComputedProperty[]) {
    const tuples = cps.map(
      (cp: ComputedProperty) => [cp.propName, cp] as [string, ComputedProperty]
    );
    this.map = new Map(tuples);
  }

  update(propName: string, otherProps: any): any {
    const computedTuples = [...this.map.entries()]
      .filter(([, cp]) => cp.deps.includes(propName))
      .map(([key, cp]) => {
        return [key, cp.compute(otherProps)];
      });

    const computed = computedTuples.reduce((acc: Pojo, curr: any) => {
      const [key, val] = curr;
      acc[key] = val;
      return acc;
    }, {});
    return { ...otherProps, ...computed };
  }
}
