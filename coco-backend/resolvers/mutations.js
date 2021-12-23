import jsonwebtoken from 'jsonwebtoken'
const secret = 'asdc0- m7qw789456378689aN&dw';

export const register = async (root, {name, email, password}, {models}) =>
{
  if(await models.User.findOne({'where': { email }}))
  {
    throw `Email ${email} already in use`;
  }

  const user = await models.User.create({name, email, password});

  const token = jsonwebtoken.sign(
    { id: user.id, email: user.email},
    secret,
    { expiresIn: '1y' }
  )

  return {
    'token': token,
    'user': user
  };
}

export const login = async (root, {email, password}, {models}) =>
{
  const user = await models.User.findOne({'where': { email }})
  if(!user)
    throw new MyError('Unknown user')

  const token = jsonwebtoken.sign(
    { id: user.id, email: user.email},
    secret,
    { expiresIn: '1y' }
  )

  return {
    'token': token,
    'user': user
  };
}

export const validateToken = async (root, {token}, {models}) =>
{
  const decoded = jsonwebtoken.verify(
    token,
    secret
  );

  if(!decoded)
    throw "Invalid token (1)";

  const user = await models.User.findByPk(decoded.id);
  if(!user)
    throw "Invalid token (2)";

  if(user.email !== decoded.email)
    throw "Invalid token (3)";

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

export const addAlert = async(_, { roomId }, { models, user }) =>
{
  if(!user)
    throw "Not authenticated"

  if(!await models.Room.findByPk(roomId))
    throw "Room not found"

  return await models.Alert.create({
    userId: user.id,
    roomId
  })
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