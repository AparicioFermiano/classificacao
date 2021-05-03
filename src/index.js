const express = require("express");//Insere a biblioteca express
const axios = require("axios"); //Faz comunicação de serviço para serviço
const app = express();//faz a requisição da biblioteca atribuindo ela a uma constante
app.use(express.json());//Coloca o express.json no projeto (Formato de dados recebidos)

const palavraChave = "importante";

const funcoes = {
    ObservacaoCriada: (observacao) => {
        observacao.status =
        observacao.texto.includes(palavraChave)
        ? "importante" : "comum";
        axios.post("http://localhost:10000/eventos",{
            tipo: "ObservacaoClassificada",
            dados: observacao,
        });
    },
};

app.post("/eventos", (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados);
    }
    catch (err){}
    res.status(200).send({msg: "ok"});
});

app.listen(7000, () => console.log("Classificação. Porta 7000")); //Define a porta a ser utilizada