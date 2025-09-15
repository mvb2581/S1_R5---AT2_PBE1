const express = require("express");
const app = express();
const PORT = 8081;
const fs = require("fs");
const path = require("path");

app.use(express.json());

app.post('/soma', (req, res) => {
    const { numeros } = req.body;

    
    if (!Array.isArray(numeros)) {
        return res.status(400).json({ erro: "Envie números no campo 'numeros'." });
    }

    
    const soma = numeros
        .filter(n => typeof n === 'number' && !isNaN(n)) 
        .reduce((acc, num) => acc + num, 0); 

    res.json({ soma });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


