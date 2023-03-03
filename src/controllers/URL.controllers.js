import { db } from "../config/database.connection.js"
import { nanoid } from "nanoid"

export async function postShort(req, res) {
    const { url } = req.body
    const shorten = nanoid(8 , url)
    const { user } = res.locals
    try {
        const { rows } = await db.query(
            `
                INSERT INTO links (url, "shortUrl", "userId" )
                VALUES ($1, $2, $3)
                RETURNING id
            `,[url, shorten, user.id])
        res.status(201).send({
            id: rows[0].id,
            shorten
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}