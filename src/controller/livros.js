import db from "../db.js";

import Sequelize from 'sequelize';
const { Op, col, fn } = Sequelize;


import express from "express";
const app = express.Router();




    
app.post ('/generos', async (req, resp) => {
    try {
        const descricao = req.body.descricao;

        let x = await db.infoc_tdv_livro.findAll({
            where: {
                ds_genero: descricao
            }
        })
        resp.send(x);
    }catch (e){
        resp.send({ erro: e.toString() })
    }
})



    
app.get ('/livrospromocao', async (req, resp) => {
    try {

        let x = await db.infoc_tdv_livro.findAll({
            where: {
                ds_promocao: true
            }
        })
        resp.send(x);
    }catch (e){
        resp.send({ erro: e.toString() })
    }
})


    
app.get ('/livroterror', async (req, resp) => {
    try {

        let x = await db.infoc_tdv_livro.findAll({
            where: {
                id_genero: "Terror" || "terror"
            }
        })
        resp.send(x);
    }catch (e){
        resp.send({ erro: e.toString() })
    }
})


    
app.get ('/livropoesia', async (req, resp) => {
    try {

        let x = await db.infoc_tdv_livro.findAll({
            where: {
                id_genero: "Poesia" || "poesia"
            }
        })
        resp.send(x);
    }catch (e){
        resp.send({ erro: e.toString() })
    }
})


    
app.get ('/livrocomedia', async (req, resp) => {
    try {

        let x = await db.infoc_tdv_livro.findAll({
            where: {
                id_genero: "comedia" || "Comedia"
            }
        })
        resp.send(x);
    }catch (e){
        resp.send({ erro: e.toString() })
    }
})


app.get('/pagamento', async (req, resp) => {
    try {
        let pagamento = await db.infoc_tdv_forma_pagamento.findAll();
        resp.send(pagamento);
    } catch (e) {
        resp.send({ erro: 'Ocorreu um erro!' })
    }
})


  
app.get ('/livroromance', async (req, resp) => {
    try {

        let x = await db.infoc_tdv_livro.findAll({
            where: {
                id_genero: "Romance" || "romance"
            }
        })
        resp.send(x);
    }catch (e){
        resp.send({ erro: e.toString() })
    }
})


app.get ('/livrobiografia', async (req, resp) => {
    try {

        let x = await db.infoc_tdv_livro.findAll({
            where: {
                id_genero: "Biografia" || "biografia"
            }
        })
        resp.send(x);
    }catch (e){
        resp.send({ erro: e.toString() })
    }
})
app.post('/pagamento', async (req, resp) => {
    try {
        let usuParam = req.body;

        let u = await db.infoc_tdv_forma_pagamento.findOne({ where: {  nr_cartao: usuParam.nrcartao, nm_titular_cartao: usuParam.titular ,nm_sobrenome_cartao:usuParam.sobrenome , dt_vencimento:usuParam.vencimento, nr_parcelas: usuParam.parcelas, ds_cvv: usuParam.cvv} });
        if (u != null)
            return resp.send({ erro: 'Todos os campos são obrigatorios' });

        let r = await db.infoc_tdv_forma_pagamento.create({
            nr_cartao: crypto.SHA256(usuParam.nrcartao).toString(crypto.enc.Base64),
            nm_titular_cartao: usuParam.titular,
            nm_sobrenome_cartao: usuParam.sobrenome,
            dt_vencimento:usuParam.vencimento,
            nr_parcelas:usuParam.parcelas,
            ds_cvv:usuParam.cvv
          
        })
        resp.send(r);
    } catch (e) {
        resp.send({ erro: 'Ocorreu um erro!' })
    }
})


// Busca

app.get('/busca', async (req,resp) => {
    try {
        let search = req.query.search;
        let r = await db.infoc_tdv_livro.findAll( 
            { where: {
                [Op.or]: [
                    { 'nm_livro': {[Op.like]: `%${search}%` }},
                    { 'ds_descricao': {[Op.like]: `%${search}%` }},
                    { 'ds_autora': {[Op.like]: `%${search}%` }},
                    { 'ds_editora': {[Op.like]: `%${search}%` }}
                ],

            },
         });
        resp.send(r);

    } catch(e) {
        resp.send({ erro: e.toString()})
    }
})
export default app;