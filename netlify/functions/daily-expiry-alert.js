const { checkAndSendDailyExpiryAlert } = require('../../server');

exports.handler = async event => {
  if (event.blobs) {
    const { connectLambda } = await import('@netlify/blobs');
    connectLambda(event);
  }

  const result = await checkAndSendDailyExpiryAlert();
  return {
    statusCode: result.ok ? 200 : 500,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(result)
  };
};
