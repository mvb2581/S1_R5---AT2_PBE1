const express = require("express");
const app = express();
const PORT = 8081;
const fs = require("fs");
const path = require("path");

app.use(express.json());


app.post("/soma", (req, res) => {
    try {
        const { numeros } = req.body;

        // if (!Array.isArray(numeros)) {
        //     return res.status(400).json({ erro: "Envie números no campo 'numeros'." });
        // }


        const todosNumeros = numeros.every(n => typeof n === "number" && !isNaN(n));
        if (!todosNumeros) {
            return res.status(400).json({ erro: "Todos os valores devem ser números válidos." });
        }


        const soma = numeros.reduce((acumulador, atual) => acumulador + atual, 0);

        res.status(201).json({ soma });
    } catch (error) {
        console.log(error);
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

