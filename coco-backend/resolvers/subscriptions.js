import { SubscriptionPublisher } from './../apollo'
import { withFilter } from 'graphql-subscriptions';
const models = require('./../models');

export const alertSent = {
  subscribe: withFilter(
    () => SubscriptionPublisher.asyncIterator(['ALERT_SENT']),
    (payload, {}, { user }) => {
      console.log('sub', user)
      return true
    }
  )
}