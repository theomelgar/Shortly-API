import { db } from "../config/database.connection.js"
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
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

export async function getUserById(req, res) {
    const user = res.locals.user;
    try {
        const userLinks = await db.query(`
            SELECT id, url, "shortUrl", visits AS "visitCount" 
            FROM links 
            WHERE "userId" = $1
        `, [user.id]
        )
        const userViews = await db.query(`
            SELECT SUM (visits) AS "visits" 
            FROM links 
            WHERE "userId" = $1
        `, [user.id]
        )
        const data = {
            id: user.id,
            name: user.name,
            visitCount: userViews.rows[0].visits,
            shortenedUrls: userLinks.rows,
        }
        return res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }

}

export async function ranking(req, res) {
    try {
        const rank = await db.query(`
            SELECT users.id, users.name,
            SUM (links.visits) AS "visitCount",
            COUNT (links.id) AS "linksCount"
            FROM links 
            LEFT JOIN users ON users.id = links."userId"
            GROUP BY users.id
            ORDER BY "visitCount" DESC, id ASC
            LIMIT 10
        `)
        return res.status(200).send(rank.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }

}
