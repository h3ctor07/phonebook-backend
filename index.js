const { request, response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

const persons = [
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`This server is running on port ${PORT}`);
})