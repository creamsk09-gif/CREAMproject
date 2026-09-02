const serverless = require('serverless-http');
const { requestHandler } = require('../../server');

function netlifyRequestHandler(req, res) {
  const functionPrefix = '/.netlify/functions/api';
  if (req.url.startsWith(functionPrefix)) req.url = `/api${req.url.slice(functionPrefix.length)}`;
  else if (!req.url.startsWith('/api')) req.url = `/api${req.url.startsWith('/') ? '' : '/'}${req.url}`;
  return requestHandler(req, res);
}

const serverlessHandler = serverless(netlifyRequestHandler);

exports.handler = async (event, context) => {
  if (event.blobs) {
    const { connectLambda } = await import('@netlify/blobs');
    connectLambda(event);
  }
  return serverlessHandler(event, context);
};
