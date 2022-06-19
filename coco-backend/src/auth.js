import jsonwebtoken from 'jsonwebtoken'
import * as GoogleStrat from 'passport-google-oauth2'
const models = require('./models');
const secret = 'asdc0- m7qw789456378689aN&dw';

const networks = {
    google: {
        client: new GoogleStrat.Strategy(
            {
                clientID: '651463278960-9nlk2n370vopiknmss7nq604a21k3gv2.apps.googleusercontent.com',
                clientSecret: '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',
                callbackURL: 'http://127.0.0.1:8080/'
            },
            () => null
        ),
        user: async (token) => {
            const profile = await new Promise((resolve, reject) => {
                networks.google.client.userProfile(token, (err, profile) => {
                    if(err)
                        reject(err)
                    else
                        resolve(profile)
                })
            })

            const [user, created] = await models.User.findOrCreate({
                where: { googleId: profile.id },
                defaults: {
                    name: profile.displayName,
                    email: profile.email
                }
            })

            return user
        }
    },
    local: {
        user: async (token) => {
            const decoded = jsonwebtoken.verify(
                token,
                secret
            );

            const user = await models.User.findByPk(decoded.id);
            
            if(!user)
                throw 'User not found'

            if(user.email != decoded.email)
                throw 'Token invalid'

            return user
        }
    }
}

export const CreatToken = (user) =>
{
    return jsonwebtoken.sign(
        { id: user.id, email: user.email},
        secret,
        { expiresIn: '1y' }
    )
}

export const GetUser = async (network, token) =>
{
    return await networks[network].user(token)
}