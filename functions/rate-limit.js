let requestCounts = {};

exports.handler = async (event, context) => {
  const ip = event.headers['client-ip'];
  const now = Date.now();

  if (!requestCounts[ip]) {
    requestCounts[ip] = { count: 1, start: now };
  } else {
    requestCounts[ip].count++;
  }

  const timeWindow = 60 * 1000;
  const maxRequests = 100;

  if (now - requestCounts[ip].start > timeWindow) {
    requestCounts[ip] = { count: 1, start: now };
  }

  if (requestCounts[ip].count > maxRequests) {
    return {
      statusCode: 429,
      body: 'Too Many Requests',
    };
  }

  return {
    statusCode: 200,
    body: 'Request Allowed',
  };
};
