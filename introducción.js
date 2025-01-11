console.log('introducción');
const resultado_asistencias = document.getElementById('resultado_asistencias');
const filtro_iglesia = document.querySelector ('.filtro-iglesia');
const presentacion = document.getElementById('presentacion')
const busqueda_asistencias = document.getElementById ('busqueda_asistencias')
const busqueda = document.querySelector ('.busqueda');

fetch('/auxiliar.txt')
  .then(response => response.text())
  .then(data => {
    //tabla.style.color='yellow';
    console.log(data)
    presentacion.innerHTML = data;
    pantalla.style.display = 'none';
    div_formulario.style.display = 'none';
    busqueda_asistencias.style.display='none';
    resultado_asistencias.style.display = 'none';
    filtro_iglesia.style.display='none';
    busqueda.style.display='none';
  })
  .catch(e => {
    console.log('error al importar datos', e)
  })