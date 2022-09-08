import { DataTypes } from "sequelize"
import { v4 as uuidv4 } from 'uuid'

import sequelize from './index.js'
import { jwtRefreshExpiration } from '../config/auth.config.js'

const RefreshToken = sequelize.define('refreshToken',{
    token : { type: DataTypes.STRING },
    expiryDate: { type: DataTypes.DATE }
})

RefreshToken.createToken = async function (user) {
    let expiredAt = new Date()
    expiredAt.setSeconds(expiredAt.getSeconds() + jwtRefreshExpiration)
    let _token = uuidv4()
    let refreshToken = await this.create({
        token: _token,
        userId: user.id,
        expiryDate: expiredAt.getTime()
    })
    return refreshToken.token;
}

RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime()
}

export default RefreshToken;

