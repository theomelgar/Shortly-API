export const insertUser = () => `
INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
`

export const insertToken = () => `
    UPDATE users SET token = $1 WHERE id = $2
`

export const selectUserLinks = () => `
    SELECT id, url, "shortUrl", visits AS "visitCount" 
    FROM links 
    WHERE "userId" = $1
`

export const sumUserVisits = () => `
    SELECT SUM (visits) AS "visits" 
    FROM links 
    WHERE "userId" = $1
`

export const topTenUsers = () => `
    SELECT users.id, users.name,
    SUM (links.visits) AS "visitCount",
    COUNT (links.id) AS "linksCount"
    FROM links 
    LEFT JOIN users ON users.id = links."userId"
    GROUP BY users.id
    ORDER BY "visitCount" DESC, id ASC
    LIMIT 10
`