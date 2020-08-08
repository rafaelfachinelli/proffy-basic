//DADOS
const proffys = [
  {
    name: "Rafael Fachinelli",
    avatar: "https://avatars3.githubusercontent.com/u/19878139?s=460&u=278a6f44f49af3c8edb13a811f7654dfe6e89341&v=4", 
    whatsapp: "11981050194",
    bio: "Entusiasta das melhores viagens de pensamentos avançados.<br><br>Apaixonado por explodir cérebros com conhecimento e por mudar a vida das pessoas através de análises profundas. Mais de 777 pessoas já passaram por uma das minhas viagens mentais.",
    subject: "Psicólogo",
    cost: "20,00",
    weekday: [0],
    time_from: [720],
    time_to: [1220],
  }, 
  {
    name: "Thaís Silveira",
    avatar: "https://avatars3.githubusercontent.com/u/34002389?s=460&u=87794bfaceacc304760b3329b20af09ed10e2c1b&v=4", 
    whatsapp: "89988988",
    bio: " Calistineira de plantão, as pernas mais fortes da minha região. Se deseja ser forte e usar seu próprio corpo como peso, entre em contato comigo mesmo. Mais de 500 pessoas já passaram por exercícios e tiveram seus corpos definidos com minhas estratégias.",
    subject: "Educação física",
    cost: "2.850,00",
    weekday: [1],
    time_from: [720],
    time_to: [1220],
  }
]

const subjects = [
  "Artes",
  "Biologia",
  "Ciências",
  "Educação física",
  "Física",
  "Geografia",
  "História",
  "Matemática",
  "Português",
  "Química",
]

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
]

function getSubject(subjectNumber) {
  const position = +subjectNumber - 1
  return subjects[position]
}

//FUNCIONALIDADES
function pageLanding(req, res) {
  return res.render("index.html")
}

function pageStudy(req, res) {
  const filters = req.query
  return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
  const data = req.query
  //Adicionar novos Proffys na lista
  const isNotEmpty = Object.keys(data).length != 0
  if (isNotEmpty) {

    data.subject = getSubject(data.subject)
    proffys.push(data)

    return res.redirect("/study")
  }
  return res.render("give-classes.html", { subjects, weekdays })
}

//SERVIDOR
const express = require('express')
const server = express()

//Configurar Nunjucks (Template Engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
})

server
//Configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
//Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.listen(5500)