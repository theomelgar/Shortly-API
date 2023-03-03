import { db } from "../config/database.connection.js"
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body
    if(password !== confirmPassword) return res.status(422).send(console.log('Password confirmation is different'))
    try {
        const emailExists = await db.query(
            'SELECT users.email FROM users WHERE email=$1', [email]
        )
        if (emailExists.rowCount > 0) {
            return res.status(409).send(console.log('Email already taken.'))
        }

        let hashPassword = bcrypt.hashSync(password, 10)

        const insert = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashPassword]
        )
        if (insert.rowCount === 0){
             return res.sendStatus(400)
        }
        res.status(201).send(console.log("User created"))
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function signIn(req, res){
    const { email, password } = req.body;
    try {
        const user = await db.query(
            'SELECT users.email FROM users WHERE email=$1', [email]
        )
        if (user.rowCount > 0) {
            const token = uuid();
            
            if(user.rows[0] && bcrypt.compareSync(password, user.password)){
                return res.status(200).send(token)   
    
            } else {
                return res.status(401).send(console.log("Incorrect email or password"));
            }
        } 
        else{
            return res.status(404).send(console.log("User does not exist"))
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
       
}
