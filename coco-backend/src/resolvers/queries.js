import { literal, Op } from 'sequelize'

export const hello = () =>  { return 'Hello world!'; }

export const rooms = async (_, {}, { models, user }) =>
{
    if(!user)
        throw 'Not authenticated'
    
    
    return models.Room.findAll({
        where: {
            [Op.or]: [
            {ownerId: user.id},
            literal(`exists(select 1 from Invites where userId=${user.id} AND accepted=1 and roomId=Room.id)`)
            ]
        }
    })
}

export const room = async (_, { id }, { models, user }) =>
{
    //f(!user)
    //    throw 'Not authenticated'

    return models.Room.findByPk(id);
}
 
export const invites = async(_, { accepted }, { models, user }) => 
{
    if(!user)
    return []

    let q = {userId: user.id}
    switch(accepted) {
    case 'EMPTY':
        q['accepted'] = null
        break;
    case 'YES':
        q['accepted'] = 1
        break;
    case 'NO':
        q['accepted'] = 0
        break;
    }
    
    return models.Invite.findAll({
        where: q
    })
}

export const alerts = async(_, { responded }, { models, user }) =>
{
    if(!user)
        return []

    const rooms = await models.Room.findAll({
        attributes: ['id'],
        where: {
            [Op.or]: [
                {ownerId: user.id},
                literal(`exists(select 1 from Invites where userId=${user.id} AND accepted=1 and roomId=Room.id)`)
            ]
        },
        raw: true
    })

    let q = {}

    if(responded === true)
    {
        q[Op.and] = [
            {
                roomId: {
                    [Op.in]: rooms.map(r => r.id)
                }
            },
            literal(`exists(select 1 from Responses where userId=${user.id} AND alertId=Alert.id)`)
        ]
    }
    else if(responded === false)
    {
        q[Op.and] = [
            {
                roomId: {
                    [Op.in]: rooms.map(r => r.id)
                }
            },
            literal(`not exists(select 1 from Responses where userId=${user.id} AND alertId=Alert.id)`)
        ]
    }
    else
    {
        q.roomId = {
            [Op.in]: rooms.map(r => r.id)
        }
    }

    return models.Alert.findAll({
        where: q
    })
}