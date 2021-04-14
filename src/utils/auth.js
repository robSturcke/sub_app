import OneGraphAuth from 'onegraph-auth';

export const APP_ID = `cfeae7df-0759-4a4b-bc23-79104876806b`;
export const CLIENT_URL = `https://serve.onegraph.com/graphql?app_id=${APP_ID}`;
export const auth = new OneGraphAuth({
  appId: APP_ID,
});
