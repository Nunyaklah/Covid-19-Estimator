/* eslint-disable max-len */
const covid19ImpactEstimator = (data) => {
  const { avgDailyIncomeUSD, avgDailyIncomePopulation } = data.region;
  const {
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;

  let period;
  if (periodType === 'months') {
    period = timeToElapse * 30;
  }
  if (periodType === 'weeks') {
    period = timeToElapse * 7;
  }
  if (periodType === 'days') {
    period = timeToElapse * 1;
  }

  const factor = Math.trunc(period / 3);
  const factorResult = 2 ** factor;

  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  impact.infectionsByRequestedTime = Math.trunc(impact.currentlyInfected * factorResult);
  severeImpact.infectionsByRequestedTime = Math.trunc(severeImpact.currentlyInfected * factorResult);

  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;

  const numberOfBedsLeft = totalHospitalBeds * 0.35;
  impact.hospitalBedsByRequestedTime = Math.trunc(numberOfBedsLeft - impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(numberOfBedsLeft - severeImpact.severeCasesByRequestedTime);

  impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);
  severeImpact.casesForICUByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.05);

  impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.02);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.02);

  impact.dollarsInFlight = impact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeUSD * period;
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeUSD * period;

  // Math.round(impact.dollarsInFlight).toFixed(2);
  // Math.round(severeImpact.dollarsInFlight).toFixed(2);
  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
