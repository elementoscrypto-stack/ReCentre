export const signals = [
  { key:'BUY', value:12, meaning:'Confidence entering the system', polarity:'positive' },
  { key:'SELL', value:-4, meaning:'Confidence leaving the system', polarity:'negative' },
  { key:'GAIN', value:8, meaning:'Trust increasing', polarity:'positive' },
  { key:'LOSS', value:-2, meaning:'Trust decreasing', polarity:'negative' },
  { key:'BUILD', value:6, meaning:'Structure strengthening', polarity:'positive' },
  { key:'DRIFT', value:18, meaning:'Movement away from market alignment', polarity:'warning' },
  { key:'CENTRE', value:82, meaning:'Movement toward recovery', polarity:'positive' },
  { key:'FLOW', value:81, meaning:'Healthy movement of value', polarity:'positive' },
  { key:'LOCK', value:92, meaning:'Customer retention strengthening', polarity:'positive' },
  { key:'LEAK', value:-11, meaning:'Customer value escaping', polarity:'negative' },
  { key:'RECENTRE', value:5, meaning:'Returning toward Level 5', polarity:'positive' }
];

export const formulas = [
  'BUY + TRUST = GAIN',
  'SELL + TRUST = LOSS',
  'DRIFT + PRESSURE = RISK',
  'CENTRE + CLARITY = STABILITY',
  'BUILD + TRUST = VALUE',
  'REPAIR + RELEVANCE = GROWTH',
  'ALIGNMENT + VALUE = RECENTRE'
];
