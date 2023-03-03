import { db } from "../config/database.connection.js"
import { nanoid } from "nanoid"

export async function postShort(req, res) {
    const { url } = req.body
    const shortUrl = nanoid(8, url)
    const { user } = res.locals
    try {
        const { rows } = await db.query(
            `
                INSERT INTO links (url, "shortUrl", "userId" )
                VALUES ($1, $2, $3)
                RETURNING id
            `, [url, shortUrl, user.id])
        res.status(201).send({
            id: rows[0].id,
            shortUrl
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getUrlById(req, res) {
    const { id } = req.params

    try {
        const { rows: url, rowCount } = await db.query(
            `
                SELECT * FROM links WHERE id = $1
            `, [id])
        if( rowCount === 0 ) return res.sendStatus(404)
        res.status(201).send({
            id: url[0].id,
            url: url[0].url,
            shortUrl: url[0].shortUrl
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}