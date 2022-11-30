const { request, response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

//main page
app.get('/', (request, response) => {
    response.send('<h1>Phonebook Backend</h1>')
})

//get all phonebook entries
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//get only one entry
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    console.log(person);

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }

})

//get info about number of entries in phonebbok and time of request
app.get('/info', (request, response) => {
    const PBsize = persons.length
    response.send(`
    <p>Phonebook has info for ${PBsize} people</p>
    <p>${new Date()}</p>
    `)
})

//delete person from phonebook
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()

})

//generate random unique id
const generateId = () =>{
    randomId = Math.floor(Math.random() * 10000)

    if (persons.find(person => person.id === randomId)){
        return generateId()
    } else {
        return randomId
    }
}


//add person to phonebook
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name){
        return response.status(400).json({
            error: "name can't be empty"
        })
    }

    if (!body.number){
        return response.status(400).json({
            error: "number can't be empty"
        })
    }
    
    if (persons.find(person => person.name === body.name)){
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number,
        date: new Date()
    }

    persons = persons.concat(newPerson)

    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`This server is running on port ${PORT}`);
})