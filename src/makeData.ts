import { faker } from "@faker-js/faker";

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
};

export type MetricChange = {
  value: number;
  percentage: number;
  providerId: number;
  funnelWeightId: number;
  contentId: number;
  averageLast7Days: number;
  suggested: number;
  change: number;
};

export type FunnelMetrics = {
  budget: MetricChange;
  impressions: MetricChange;
  clicks: MetricChange;
  sessions: MetricChange;
  addToCart: MetricChange;
  conversions: MetricChange;
  totalRevenue: MetricChange;
};

export type FunnelCategory = {
  metrics: MetricChange[];
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newMetricChange = (): MetricChange => {
  return {
    value: parseFloat(faker.finance.amount(0, 1000, 2)),
    percentage: parseFloat(faker.finance.amount(0, 100, 2)),
    providerId: faker.number.int({ max: 49 }),
    funnelWeightId: faker.number.int({ max: 1000 }),
    contentId: faker.number.int({ max: 1000 }),
    averageLast7Days: faker.number.int({ max: 1000 }),
    suggested: faker.number.int({ max: 1000 }),
    change: faker.number.int({ max: 1000 }),
  };
};

const newFunnelCategory = (): FunnelCategory => {
  return {
    metrics: range(100).map(() => newMetricChange()),
  };
};

export function makeData(...lens: number[]): MetricChange[] {
  const makeDataLevel = (depth = 0): MetricChange[] => {
    const len = lens[depth]!;
    return range(len).flatMap(() => newFunnelCategory().metrics);
  };

  return makeDataLevel();
}
