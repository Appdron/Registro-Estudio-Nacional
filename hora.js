function hora() {
  let HORA = document.getElementById('HORA');
  let minuto = document.getElementById('minuto');
  let segundo = document.getElementById('segundo');
  let fecha = document.getElementById('fecha');

  let tiempo = new Date();

  let hour = tiempo.getHours();
  let minutes = tiempo.getMinutes();
  let seconds = tiempo.getSeconds();

  let day = tiempo.getDate();
  let month = tiempo.toLocaleString('es-ES', { month: 'long' });
  let year = tiempo.getFullYear();

  HORA.innerHTML = `${hour} : ${minutes} : ${seconds}`;
 // minuto.innerHTML = ` : ${minutes}`;
//  segundo.innerHTML = `:${seconds}`;
  fecha.innerHTML = `${day} de ${month} de ${year}`;
}

hora();
setInterval(hora, 1000);