const covid19ImpactEstimator = (data) => {
  const { name, avgAge, avgDailyIncomeUSD, avgDailyIncomePopulation } = data;
  const {
    periodType,
    timeToElaspe,
    reportedCases,
    population,
    totalHospitalBeds
  } = data.region;

  const impact = {};
  const severeImpact = {};

  let period;
  if (periodType === 'months') {
    period = timeToElaspe * 30;
  } else if (periodType === 'weeks') {
    period = timeToElaspe * 7;
  } else {
    period = periodType;
  }

  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  return { data, impact, severeImpact };
};
export default covid19ImpactEstimator;
