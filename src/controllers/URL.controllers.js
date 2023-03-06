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
        `, [url, shortUrl, user.id]
        )
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
            `, [id]
        )
        if (rowCount === 0) return res.sendStatus(404)
        res.status(200).send({
            id: url[0].id,
            url: url[0].url,
            shortUrl: url[0].shortUrl
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function redirect(req, res) {
    const { shortUrl } = req.params

    try {
        const { rows, rowCount } = await db.query(
            `
                SELECT * FROM links WHERE "shortUrl" = $1
            `, [shortUrl])
        if (rowCount < 1) return res.sendStatus(404)

        const [url] = result.rows

        await db.query(
            `   
                UPDATE links
                SET visits = visits + 1
                WHERE id = $1
            `, [url.id]
        )
        return res.redirect(rows[0].url)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params
    const { user } = res.locals

    try {
        const { rows: url, rowCount } = await db.query(
            `
                SELECT * FROM links WHERE id = $1
            `, [id])
        if (rowCount < 1) return res.sendStatus(404)
        if (url[0].userId !== user.id) return res.sendStatus(401)

        await db.query(
            ` 
                DELETE FROM links
                WHERE id = $1
            `, [id]
        )
        return res.sendStatus(204)
    } catch (error) {
        res.status(500).send(error.message)
    }
}