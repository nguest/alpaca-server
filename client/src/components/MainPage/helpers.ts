interface Scales {
  [key:string]: { timeframe: string; limit: number }
}

export const scales: Scales = {
  DAY: { timeframe: '5Min', limit: 78 },
  MTH: { timeframe: '1D', limit: 31 },
  '1YR': { timeframe: '1D', limit: 365 },
  '2YR': { timeframe: '1D', limit: 365 * 2 },
};
