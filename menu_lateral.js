//console.log('Este es menu lateral');
const men_lateral = document.querySelector('.men_lateral');

const url = '/datos.json';

fetch(url)
  .then(response => response.json())
  .then(data => {
    data.men_lateral.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.Titulo;

      men_lateral.appendChild(li);
      li.setAttribute('class', 'boton_lateral');
      li.setAttribute('id',item.id)
     // console.log(item.id)
    });
  })
  .catch(error => {
    console.log('error al importar datos', error)
  })