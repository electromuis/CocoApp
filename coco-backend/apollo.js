import { PubSub } from 'graphql-subscriptions';
const models = require('./models');
import { GetUser } from './auth';

export const apolloContext = async ({req}) =>
{
    let token = req.headers.authorization || req.query.token || '';
    token = token.replace('Bearer ', '');
    let user = null;

    try {
        user = await GetUser('local', token)
    }
    catch (e)
    {
        console.log('auth failed: ' + e)
        user = null
    }

    return { models, user }
}

export const SubscriptionPublisher = new PubSub();