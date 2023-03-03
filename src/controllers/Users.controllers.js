import { db } from "../config/database.connection.js"
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body
    if (password !== confirmPassword) return res.status(422).send(console.log('Password confirmation is different'))
    try {
        const emailExists = await db.query(
            'SELECT users.email FROM users WHERE email=$1', [email]
        )
        if (emailExists.rowCount > 0) {
            return res.status(409).send(console.log('Email already taken.'))
        }
        if (!name || !email || !password || !confirmPassword) {
            return res.sendStatus(422)
        }
        let hashPassword = bcrypt.hashSync(password, 10)

        const insert = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashPassword]
        )
        if (insert.rowCount === 0) {
            return res.sendStatus(400)
        }
        res.status(201).send(console.log("User created"))
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function signIn(req, res) {
    const user = res.locals.user;
    const token = uuid();
    try {
        await db.query(`
            UPDATE users SET token = $1 WHERE id = $2
            `, [token, user.id]
        )
        return res.status(200).send({ token })
    } catch (error) {
        res.status(500).send(error.message)
    }

}
