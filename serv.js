

const list = document.querySelector('#list')
let USERS = []
const filter = document.getElementById('filter')

async  function start() {
    try {
        list.innerHTML = 'Loading...'
        const resp = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await resp.json()
        setTimeout(() => {
            USERS = data
            render(data)
        },2000)
    } 
    catch(err) {
        list.style.color = 'red'
        list.innerHTML = err.message  
    }
}

filter.addEventListener('input', (event) => {
const value = event.target.value.toLowerCase()
const filteredUsers = USERS.filter((user) => {
return user.name.toLowerCase().includes(value)
})
render(filteredUsers)
})

function render(users = []) {
    if (users.length === 0) {
        list.innerHTML = 'No matches'
    } else {
    const html = users.map(toHTML).join('')
    list.innerHTML = html 
    }
}

function toHTML(user) {
    return `
        <li class ="list-group-item">${user.name}</li>
    `
}

start()