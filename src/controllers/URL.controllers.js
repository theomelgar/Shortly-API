import { db } from "../config/database.connection.js"
import { nanoid } from "nanoid"

export async function postShort(req, res) {
    const { name, email, password } = res.locals.user
    try {
        let hashPassword = bcrypt.hashSync(password, 10)

        const insert = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashPassword]
        )
        if (insert.rowCount === 0) {
            return res.sendStatus(422)
        }
        res.status(201).send(console.log("User created"))
    } catch (error) {
        res.status(500).send(error.message)
    }
}