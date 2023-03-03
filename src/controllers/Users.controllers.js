import { db } from "../config/database.connection.js"
import bcrypt from "bcrypt";

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body
    if(password !== confirmPassword) return res.status(422).send('Password confirmation is different')
    try {
        const emailExists = await db.query(
            'SELECT users.email FROM users WHERE email=$1', [email]
        )
        if (emailExists.rowCount > 0) {
            return res.status(409).send('Email already taken.')
        }

        let hashPassword = bcrypt.hashSync(password, 10)

        const insert = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashPassword]
        )
        if (insert.rowCount === 0){
             return res.sendStatus(400)
        }
        res.status(201).send("User created")
    } catch (error) {
        res.status(500).send(error.message)
    }
}