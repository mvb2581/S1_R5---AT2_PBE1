const express = require("express");
const app = express();
const PORT = 8081;
const fs = require("fs");
const path = require("path");

app.use(express.json());


function salvarAluno(aluno) {
  const arquivo = path.join(__dirname, "alunos.json");

  let alunos = [];

  if (fs.existsSync(arquivo)) {
    try {
      const dados = fs.readFileSync(arquivo, "utf-8");
      if (dados) {
        alunos = JSON.parse(dados);
      }
    } catch (err) {
      console.error("Erro ao ler ou parsear o arquivo:", err);
      alunos = [];
    }
  }

  alunos.push(aluno);

  try {
    fs.writeFileSync(arquivo, JSON.stringify(alunos, null, 2));
  } catch (err) {
    console.error("Erro ao salvar o arquivo:", err);
  }
}


app.post("/alunos/notas", (req, res) => {
  try {
    const { nome, notas } = req.body;

    
    if (!nome || !notas || !Array.isArray(notas)) {
      return res.status(400).json({
        erro: "Por favor, envie 'nome' e 'notas' .",
      });
    }

    
    if (notas.some(n => typeof n !== "number" || isNaN(n))) {
      return res.status(400).json({
        erro: "Notas inválidas. Todos os valores devem ser números."
      });
    }

   
    let soma = 0;
for (let i = 0; i < notas.length; i++) {
  soma += notas[i];
}
    const media = soma / notas.length;

  
    const situacao = media > 6 ? "APROVADO" : "REPROVADO";

    const aluno = { nome, media, situacao };

 
    salvarAluno(aluno);

    res.json(aluno);

  } catch (error) {
    console.error("Erro na rota /alunos/notas:", error);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


