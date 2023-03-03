import { db } from '../config/database.connection.js';
import bcrypt from 'bcrypt';

export async function signUpMW(req, res, next) {
    const user = req.body;

    try {
        const userExist = await db.query(
            `SELECT * FROM users WHERE email=$1`, [user.email]
        )
        if (userExist.rowCount > 0) {
            return res.sendStatus(409)
        }
        if (user.password !== user.confirmPassword) {
            return res.status(422).send(console.log('Password confirmation is different'))
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
            return res.sendStatus(401)
        }
        const user = userExist.rows[0]
        const comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.sendStatus(401)
        }
        res.locals.user = user
        next()
    } catch (error) {
        res.sendStatus(500);
    }
}