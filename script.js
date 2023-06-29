const url = 'https://649ce7de9bac4a8e669d0d93.mockapi.io/api/v1/todos';
const todoList = document.getElementById('todo-list')
const addTodoInput = document.getElementById('todo-input')
const addTodoBtn = document.getElementById('add-button')

/*
function fetching1(){                            // sync from top to bottom
  fetch(url)                                     // 1
    .then((response) => response.json())         // 2 => 3
    .then((data) => displayData(data))           // 4 => 5
    .catch((error) => console.log(error))
}
fetching1(); */

/*
async function fetching2(){
  const resp = await fetch(url);     // fetch -> then resp        2 <- 1
  const data = await resp.json();    // resp.json -> then data    4 <- 3
  displayData(data);                 // function                  5
}
fetching2(); */

/*
const fetching3 = async () => {
  const resp = await fetch(url);
  const data = await resp.json();
  displayData(data);                 // sync function
}
fetching3(); */

/* CRUD - create, read, update, delete*/

/* Axios is a promise-based HTTP Client for node.js and the browser. It is isomorphic (= it can run in the browser and nodejs with the same codebase).*/

function fetchAxios(){
  axios                                           // third-party CDN
  .get(url)                                
  .then((response) => displayData(response.data))
  .catch((error) => console.error(error))  
}
fetchAxios();

function displayData(todos){
  todoList.innerHTML = ''

  todos.forEach(todo => {

    const listItem = document.createElement('li');
    const listItemTxt = document.createElement('span');

    const inputEl = document.createElement('input');        
    inputEl.type = 'checkbox';
    inputEl.className = 'form-check-input';

    // const editInputEl = document.createElement('input');        
    // inputEl.type = 'text';
    // inputEl.className = 'form-control edit';

    const listItemEditBtn = document.createElement('button');
    listItemEditBtn.innerText = 'Edit'
    listItemEditBtn.className = 'btn btn-sm btn-secondary' 

    const listItemDelBtn = document.createElement('button');
    listItemDelBtn.innerText = 'Delete'
    listItemDelBtn.className = 'btn btn-sm btn-secondary'      
    
    /* checkbox */
    inputEl.addEventListener('change', (event) => {
      console.log(event.target.checked, todo.id);
    });

    /* delete button */
    listItemDelBtn.addEventListener('click', () => {
      console.log('delete btn clicked: ', todo.id);

      /* DELETE -> fetch(url+/id, {method: 'DELETE', headers: {} }) */
      fetch(url + '/' + todo.id, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},  // standard headers        
      })
      .then((res) => res.json())
      .then((data) => {
        console.log('deleted:', data) 
        fetchAxios()     // refetch updated data from API endpoint, no reload UI        
      })
      .catch((err) => console.error(err));
    });

    /* edit button */
    listItemEditBtn.addEventListener('click', () => {
      console.log('edit btn clicked: ', todo.id, addTodoInput.value);

      if(addTodoInput.value !== ''){
          /* PUT -> fetch(url+/id, {method: 'PUT', headers: {}, body: {} }) */
        fetch(url + '/' + todo.id, {
          method: 'PUT',
          headers: {"Content-Type": "application/json"},  // standard headers
          body: JSON.stringify({
            title: addTodoInput.value,                    // put edited data
          })
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          fetchAxios()     // refetch updated data from API endpoint, no reload UI
          addTodoInput.value = ''; // clears input field
        })
        .catch((err) => console.error(err));
      }

      

    })

    listItemTxt.innerText = todo.title;
    listItem.append(inputEl, listItemTxt, listItemEditBtn, listItemDelBtn);
    //listItem.append(inputEl, editInputEl, listItemTxt, listItemEditBtn, listItemDelBtn);
    todoList.appendChild(listItem);
    
  });
};

/* add button */
addTodoBtn.addEventListener('click', () => {  
  
  if(addTodoInput.value !== ''){
    const newTodo = {
      title: addTodoInput.value,
      completed: false
    };
  
    /* POST -> fetch(url, {method: 'POST', headers: {}, body: }) */
    fetch(url, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},  // standard headers
      body: JSON.stringify(newTodo)
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      fetchAxios()     // refetch updated data from API endpoint, no reload UI
      addTodoInput.value = ''; // clears input field
    })
    .catch((err) => console.error(err));
  }
});

// 




// fetch(url) GET
// fetch(url, {method: 'POST' || 'PATCH'}) 
// fetch(url+/id, {method: 'PUT'}) 
// fetch(url+/id, {method: 'DELETE'}) 
