import { GetUser, CreatToken } from './../auth'
import { SubscriptionPublisher } from './../apollo'

export const register = async (root, {name, email, password}, {models}) =>
{
  if(await models.User.findOne({'where': { email }}))
  {
    throw `Email ${email} already in use`;
  }

  const user = await models.User.create({name, email, password});

  return {
    'token': CreatToken(user),
    'user': user
  };
}

export const loginWith = async(root, { network, token }) =>
{
  const user = await GetUser(network, token)

  return {
    'token': CreatToken(user),
    'user': user
  }
}

export const login = async (root, {email, password}, {models}) =>
{
  const user = await models.User.findOne({'where': { email }})
  if(!user)
    throw new MyError('Unknown user')

  const token = CreatToken(user)

  return {
    'token': token,
    'user': user
  };
}

export const validateToken = async (root, { token }) =>
{
  const user = await GetUser('local', token);

  console.log('User', user)

  return user;
}

export const addRoom = async (root, {name}, {models, user}) => 
{
  if(!user)
    throw "Not authenticated"

  const room = await models.Room.create({name, ownerId: user.id});

  return room
}

export const invite = async (_, { userId, roomId }, { models, user } ) =>
{
  if(!user)
    throw "Not authenticated"

  const invite = await models.Invite.create({ userId, roomId })

  return invite
}

export const inviteResponse = async (_, { roomId, accepted }, { models, user }) =>
{
  if(!user)
    throw "Not authenticated"
  
  const invite = await models.Invite.findOne({
    where: {
      roomId,
      userId: user.id
    }
  })

  if(!invite)
    throw "Invite not found"

  invite.accepted = accepted
  await invite.save()

  return invite
}

export const addAlert = async(_, { roomId, response }, { models, user }) =>
{
  if(!user)
    throw "Not authenticated"

  const room = await models.Room.findByPk(roomId)
  if(!room)
    throw "Room not found"

  const alert = await models.Alert.create({
    creatorId: user.id,
    roomId
  })

  if(response) {
    const responseRow = await models.Response.create({
      userId: user.id,
      alertId: alert.id,
      response
    })
  }

  let alertSimple = alert.get({ plain: true })
  alertSimple.room = room.get({ plain: true })

  console.log(alertSimple)

  SubscriptionPublisher.publish('ALERT_SENT', {
    alertSent: alertSimple
  })

  return alert
}

export const alertResponse = async(_, { alertId, response }, { models, user }) =>
{
  if(!user)
    throw "Not authenticated"

  if(!await models.Alert.findByPk(alertId))
    throw "Alert not found"

  return await models.Response.create({
    userId: user.id,
    alertId,
    response
  })
}