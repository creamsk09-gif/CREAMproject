import serverless from 'serverless-http';
import { withLambda } from '@netlify/aws-lambda-compat';
import server from '../../server.js';

const { requestHandler } = server;

function netlifyRequestHandler(req, res) {
  const functionPrefix = '/.netlify/functions/api';
  if (req.url.startsWith(functionPrefix)) req.url = `/api${req.url.slice(functionPrefix.length)}`;
  else if (!req.url.startsWith('/api')) req.url = `/api${req.url.startsWith('/') ? '' : '/'}${req.url}`;
  return requestHandler(req, res);
}

const serverlessHandler = serverless(netlifyRequestHandler);

export default withLambda((event, context) => serverlessHandler(event, context));
