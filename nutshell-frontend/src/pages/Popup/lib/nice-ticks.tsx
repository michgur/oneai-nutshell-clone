export function niceTicks(
  lowerBound: number,
  upperBound: number,
  maxTicks: number = 10
) {
  const range = niceNum(upperBound - lowerBound, false);
  const tickSpacing = niceNum(range / (maxTicks - 1), true);
  const lower = Math.floor(lowerBound / tickSpacing) * tickSpacing;
  const upper = Math.ceil(upperBound / tickSpacing) * tickSpacing;
  return { lower, upper, tickSpacing };
}

function niceNum(range: number, round: boolean) {
  let exponent = Math.floor(Math.log10(range));
  let fraction = range / Math.pow(10, exponent);
  let niceFraction;

  if (round) {
    if (fraction < 1.5) niceFraction = 1;
    else if (fraction < 3) niceFraction = 2;
    else if (fraction < 7) niceFraction = 5;
    else niceFraction = 10;
  } else {
    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;
  }

  return niceFraction * Math.pow(10, exponent);
}
