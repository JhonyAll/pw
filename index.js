import express from "express";
import dotenv from 'dotenv'
import { veiculos, montadoras } from "./data/data.js";

dotenv.config()

const app = express()
app.use(express.json())

app.get('/veiculo', (req, res) => {
  let veiculosResponse = veiculos

  const veiculosWithMontadora = veiculos.map(el => (el))
  veiculosWithMontadora.map(el => {
    montadoras.forEach(elM => {
      if (elM.id == el.montadora) {
        el.montadora = elM
        // console.log(el)
      }
    })
  })

  if(req.query.montadora) 
  {
    veiculosResponse = veiculosWithMontadora
  }

  req.query.nome ? 
    res.status(200).send(veiculosResponse.filter(el => 
      el.modelo.toLocaleLowerCase().includes(req.query.nome)
    )) 
  : res.status(200).send(veiculosResponse)
})
app.get('/veiculo/:id', (req, res) => {
  res.status(200).send(veiculos.find(el => el.id === req.params.id))
})

app.get('/montadora', (req, res) => {
  req.query.nome ? 
    res.status(200).send(montadoras.filter(el => 
      el.nome.toLocaleLowerCase().includes(req.query.nome)
    )) 
  : res.status(200).send(montadoras)
})
app.get('/montadora/:id', (req, res) => {
  res.status(200).send(montadoras.find(el => el.id === req.params.id))
})

app.listen(process.env.PORT, () => { console.log("Loading in " + process.env.PORT) })