import {Router} from "express";
const router = Router();



const games =[
    {
        id: 1,
        name: "Super Mario Bros",
        genre: "Platformer",
        platform: "NES"
    },
    {
        id: 2,
        name: "The Legend of Zelda",
        genre: "Action-Adventure",
        platform: "NES"
    },
    {
        id: 3,
        name: "World of Warcraft",
        genre: "MMORPG",
        platform: "PC"
    }
];

const PlatformEnum = Object.freeze({
    PC: 'PC',
    PS4: 'PS4',
    XBOX: 'XBOX',
    SWITCH: 'SWITCH',
    NES: 'NES'
});


/**
 * @openapi
 * /api/games:
 *   get:
 *     description: Get all games, optionally filtered by genre
 *     responses:
 *       200:
 *         description: Returns the games in catalog
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: './Game.yml'
 */
router.get("/api/games", (req, res) => {
    res.send({data: games});
});



/**
 * @openapi
 * /api/games:
 *   post:
 *     description: Add a new game to the catalog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './Game.yml#/components/schemas/Game'
 *     responses:
 *       200:
 *         description: Returns the newly added game
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: './Game.yml#/components/schemas/Game'
 */
router.post("/api/games", (req, res) => {
    const { name, genre, platform } = req.body;
    if (!name || !genre || !platform) {
        res.status(400).send({ error: 'Missing required fields' });
        return;
    }
    const newGame = { id: games.length + 1, name, genre, platform };
    games.push(newgame);
    res.send({data: newgame});
});

router.delete("/api/games", (req, res) => {
    const newgame = req.body;
    games.push(newgame);
    res.send({data: newgame});
});

export default router;