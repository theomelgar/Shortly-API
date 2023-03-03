import { db } from "../config/database.connection.js"
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import {
    insertToken,
    insertUser,
    selectUserLinks,
    sumUserVisits,
    topTenUsers
} from "../repositories/users.repositories.js";

export async function signUp(req, res) {
    const { name, email, password } = res.locals.user
    try {
        let hashPassword = bcrypt.hashSync(password, 10)

        const insert = await db.query(
            insertUser, [name, email, hashPassword]
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
        await db.query(insertToken, [token, user.id]
        )
        return res.status(200).send({ token })
    } catch (error) {
        res.status(500).send(error.message)
    }

}

export async function getUserById(req, res) {
    const user = res.locals.user;
    try {
        const userLinks = await db.query(
            selectUserLinks, [user.id]
        )
        const userViews = await db.query(
            sumUserVisits, [user.id]
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
        const rank = await db.query(topTenUsers)
        return res.status(200).send(rank.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }

}
