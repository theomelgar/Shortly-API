import { db } from '../config/database.connection.js';
import bcrypt from 'bcrypt';

export async function signUpMW(req, res, next) {
    const { email } = req.body;
    try {
        const userExist = await db.query(
            `SELECT * FROM users WHERE email=$1`, [email]
        )
        if (userExist.rowCount > 0) {
            return res.sendStatus(409)
        }
        res.locals.user = user
        next()
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function signInMW(req, res, next) {
    const { email, password } = req.body;
    try {
        const userExist = await db.query(
            `SELECT * FROM users WHERE email=$1`, [email]
        )
        if (userExist.rowCount <= 0) {
            return res.sendStatus(404)
        }
        const comparePassword = bcrypt.compareSync(password, userExist.rows[0].password)
        if (!comparePassword) {
            return res.sendStatus(401)
        }
        res.locals.user = user
        next()
    } catch (error) {
        res.sendStatus(500);
    }
}