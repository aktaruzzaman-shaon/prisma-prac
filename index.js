const express = require("express")
const { PrismaClient } = require("@prisma/client");
const app = express();
const PORT = 3001;


const prisma = new PrismaClient
app.use(express.json())

app.get("/", async (req, res) => {
    const allUsers = await prisma.users.findMany();
    res.json(allUsers)
})


app.post("/", async (req, res) => {
    const newUser = await prisma.users.create({ data: req.body });
    res.json(newUser)
})

app.put("/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const newAge = req.body.age;
    console.log(newAge)
    const updateUser = await prisma.users.update(
        {
            where: { id: parseInt(id) },
            data: { age: newAge }
        }
    );
    res.json(updateUser)
})

app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const deleteUser = await prisma.users.delete({
        where: { id: parseInt(id) }
    });
    res.json(deleteUser)
})

app.listen(PORT, () => console.log(`Server is runnign on port ${PORT}`))