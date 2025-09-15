const express = require("express");
const app = express();
const PORT = 8081;
const fs = require("fs");
const path = require("path");



app.use(express.json());


const NOME  = "Mvb";
const EMAIL = "srzinho@gmail.com";
const SENHA = "2581";


function salvarUsuario(usuario) {
  const arquivo = path.join(__dirname, "usuarios.json");

  let usuarios = [];

  
  if (fs.existsSync(arquivo)) {
    const dados = fs.readFileSync(arquivo, "utf-8");
    if (dados) {
      usuarios = JSON.parse(dados);
    }
  }

  
  usuarios.push(usuario);

  
  fs.writeFileSync(arquivo, JSON.stringify(usuarios, null, 2));
}


app.post("/usuario", (req, res) => {
  try {
    const { nome, senha, email } = req.body;

    if (!nome || !senha || !email) {
      return res.status(400).json({
        erro: "Por favor, envie os campos 'nome', 'senha' e 'email'.",
      });
    }

    if (nome.length < 3) {
      return res.status(400).json({ erro: "O nome deve ter no mínimo 3 caracteres." });
    }

    if (!email.includes("@gmail.com")) {
      return res.status(400).json({ erro: "O email deve ser um Gmail válido (ex: usuario@gmail.com)." });
    }

    if (senha.length < 4) {
      return res.status(400).json({ erro: "A senha deve ter no mínimo 4 caracteres." });
    }

   
    if (nome !== NOME || senha !== SENHA || email !== EMAIL) {
      return res.status(401).json({
        erro: `Usuário '${nome}' não autorizado. Verifique nome, email ou senha.`,
      });
    }

    
    const novoUsuario = { nome, email, senha };
    salvarUsuario(novoUsuario);

    res.json({
      mensagem: `Login realizado com sucesso. Bem-vindo, ${nome}!`,
    });

  } catch (error) {
    console.error("Erro na rota /usuario:", error);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
