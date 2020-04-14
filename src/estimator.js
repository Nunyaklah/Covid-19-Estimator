/* eslint-disable max-len */
const covid19ImpactEstimator = (data) => {
  const { avgDailyIncomeUSD, avgDailyIncomePopulation } = data.region;
  const {
    periodType,
    timeToElaspe,
    reportedCases,
    totalHospitalBeds
  } = data;

  let period;
  if (periodType === 'months') {
    period = timeToElaspe * 30;
  }
  if (periodType === 'weeks') {
    period = timeToElaspe * 7;
  }
  if (periodType === 'days') {
    period = timeToElaspe * 1;
  }

  const factor = Math.trunc(period / 3);
  const factorResult = 2 ** factor;

  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  impact.infectionsByRequestedTime = impact.currentlyInfected * factorResult;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * factorResult;

  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;

  const numberOfBedsLeft = totalHospitalBeds * 0.35;
  impact.hospitalBedsByRequestedTime = impact.severeCasesByRequestedTime / numberOfBedsLeft;
  severeImpact.hospitalBedsByRequestedTime = severeImpact.severeCasesByRequestedTime / numberOfBedsLeft;

  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05;

  impact.casesForVentilatorsByRequestedTime = impact.infectionsByRequestedTime * 0.02;
  severeImpact.casesForVentilatorsByRequestedTime = severeImpact.infectionsByRequestedTime * 0.02;

  impact.dollarsInFlight = impact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeUSD * period;
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeUSD * period;

  Math.round(impact.dollarsInFlight).toFixed(2);
  Math.round(severeImpact.dollarsInFlight).toFixed(2);
  return { data, impact, severeImpact };
};


export default covid19ImpactEstimator;
