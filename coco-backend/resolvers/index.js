import { literal, Op } from 'sequelize'

export const Room = {
    owner(parent, {}, { models })
    {
        return models.User.findByPk(parent.ownerId);
    },
    users(parent, {}, { models })
    {
        return models.User.findAll({
            where: {
                [Op.or]: [
                    { id: parent.ownerId },
                    literal(`exists(select 1 from Invites where userId=User.id AND accepted=1 and roomId=${parent.id})`)
                ]
            }
        })
    },
    alerts(parent, {}, { models })
    {
        return models.Alert.findAll({
            where: {
                roomId: parent.id
            }
        })
    }
}

export const Invite = {
    room(parent, {}, { models })
    {
        return models.Room.findByPk(parent.roomId)
    },
    user(parent, {}, { models })
    {
        return models.User.findByPk(parent.userId)
    }
}

export const Alert = {
    createdAt(parent)
    {
        return new Date(parent.createdAt).toISOString();
    },
    room(parent, {}, { models })
    {
        return models.Room.findByPk(parent.roomId)
    },
    responses(parent, {}, { models })
    {
        return models.Response.findAll({
            where: {
                alertId: parent.id
            }
        })
    },
    responded(parent, {}, { user, models })
    {
        if(!user)
            return null
        
        return models.Response.findOne({
            where: {
                alertId: parent.id,
                userId: user.id
            }
        })
    }
}

export const AlertResponse = {
    user(parent, {}, { models })
    {
        return models.User.findByPk(parent.userId)
    }
}

exports.Query = require('./queries.js')
exports.Mutation = require('./mutations.js')