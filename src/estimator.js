const covid19ImpactEstimator = (data) => {
  const input = data;
  const estimator = {
    data: {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 4,
        avgDailyIncomePopulation: 0.73
      },
      periodType: 'days',
      timeToElapse: 38,
      reportedCases: input,
      population: 92931687,
      totalHospitalsBeds: 678874
    },
    estimate: {
      impact: {
        currentlyInfected: 0,
        infectionsByRequestedTime: 0,
        severeCasesByRequestedTime: 0,
        hospitalBedsByRequestedTime: 0,
        casesForVentilatorsByrequestedTime: 0,
        dollarsInFlight: 0
      },
      severeImpact: {
        currentlyInfected: 0,
        infectionsByRequestedTime: 0,
        severeCasesByRequestedTime: 0,
        hospitalBedsByRequestedTime: 0,
        casesForVentilatorsByrequestedTime: 0,
        dollarsInFlight: 0
      }
    }
  };
  function currentlyInfectedEstimate() {
    const estimate = estimator.data.reportedCases * 10;
    estimator.estimate.impact.currentlyInfected = estimate;
  }

  function currentlyInfectedEstimateSevere() {
    const estimate = estimator.data.reportedCases * 50;
    estimator.estimate.severeImpact.currentlyInfected = estimate;
  }

  function infectionsByRequestedTime() {
    const estimate = estimator.estimate.impact.currentlyInfected * 512;
    estimator.estimate.impact.infectionsByRequestedTime = estimate;
  }

  function infectionsByRequestedTimeSevere() {
    const estimate = estimator.estimate.severeImpact.currentlyInfected * 512;
    estimator.estimate.severeImpact.infectionsByRequestedTime = estimate;
  }
  infectionsByRequestedTime();
  currentlyInfectedEstimateSevere();
  currentlyInfectedEstimate();
  infectionsByRequestedTimeSevere();
};

covid19ImpactEstimator(2747);

export default covid19ImpactEstimator;
