export const insertUrl = () => `
    INSERT INTO links (url, "shortUrl", "userId" )
    VALUES ($1, $2, $3)
    RETURNING id
`

export const selectLinksId = () =>`
    SELECT * FROM links WHERE id = $1
`

export const selectLinksShortUrl = () =>`
    SELECT * FROM links WHERE "shortUrl" = $1
`

export const updateLinkVisits = () =>`   
    UPDATE links
    SET visits = visits + 1
    WHERE url = $1
`

export const deleteShortUrl = () =>` 
    DELETE FROM links
    WHERE id = $1
`