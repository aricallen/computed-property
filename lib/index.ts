interface Pojo {
  [key: string]: any;
}

export interface ComputedProperty {
  propName: string;
  deps: string[];
  compute: (props: any) => any;
}

export class Manager {
  private readonly map: Map<string, ComputedProperty>;

  constructor(cps?: ComputedProperty[]) {
    if (cps) {
      const tuples = cps.map(
        (cp: ComputedProperty) => [cp.propName, cp] as [string, ComputedProperty]
      );
      this.map = new Map(tuples);
    } else {
      this.map = new Map();
    }
  }

  compute(props: Pojo): Pojo {
    const computedTuples = [...this.map.entries()].map(([key, cp]) => {
      return [key, cp.compute(props)];
    });

    const computed = computedTuples.reduce((acc: Pojo, curr: any) => {
      const [key, val] = curr;
      acc[key] = val;
      return acc;
    }, {});
    return { ...props, ...computed };
  }

  add(cp: ComputedProperty): void {
    this.map.set(cp.propName, cp);
  }

  clear(): void {
    this.map.clear();
  }

  remove(propName: string): void {
    this.map.delete(propName);
  }
}
