import {Router} from "express";
const router = Router();

const users =[
    {name: "John", age: 30},
    {name: "Jane", age: 25}
];


/**
 * @openapi
 * /api/users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Returns the users that was created
 */
router.get("/api/users", (req, res) => {
    res.send({data: users});
});

/**
 * @openapi
 * /api/users:
 *   post:
 *     description: Create a new user
 *     responses:
 *       200:
 *         description: Returns the users that was created
 */
router.post("/api/users", (req, res) => {
    const newUser = req.body;
    users.push(newUser);

    res.send({data: newUser});
});

export default router;