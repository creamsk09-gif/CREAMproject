import server from '../../server.js';

const { checkAndSendDailyExpiryAlert } = server;

export default async () => {
  const result = await checkAndSendDailyExpiryAlert();
  return Response.json(result, { status: result.ok ? 200 : 500 });
};
