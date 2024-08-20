export const APP_VARIABLES = {
  production: {
    env: "production",
    baseUrl: "https://app.yaper.co",
    log: false,
    oneSignalKey: "5440990a-ba73-4cb6-96ec-d3c777f00fdb",
    segmentKey: "655pjpNrRcTis3zqzpJSUnfv4e2JEt2O",
    sentryDebug: false,
    sentryDSN: "https://0cf01f210ca848059d4f7721009bc900@bugs.yaper.co/3",
  },
  staging: {
    env: "staging",
    baseUrl: "https://sadmin.yaper.co",
    log: true,
    oneSignalKey: "9762c2d9-aff9-4be6-ac46-c3791c80bb94",
    segmentKey: "pKy4EPtpPLaAWOBYKWisyP6eet5xJoIz",
    sentryDebug: true,
    sentryDSN: "https://0cf01f210ca848059d4f7721009bc900@bugs.yaper.co/3",
  },
};
