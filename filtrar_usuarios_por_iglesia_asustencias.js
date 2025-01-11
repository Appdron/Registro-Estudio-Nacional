// Función para filtrar por iglesia y contar asistencias
function filtrarPorIglesia() {
  pantalla.style.display = 'block';

  const iglesiaSeleccionada = document.getElementById('selectIglesia').value;
  // Obtener usuarios y asistencias desde LocalStorage
  const usuariosEnLocalStorage = JSON.parse(localStorage.getItem('Usuarios')) || [];
  const asistenciasEnLocalStorage = JSON.parse(localStorage.getItem('Estudio')) || [];

  // Filtrar usuarios por la iglesia seleccionada
  const usuariosFiltrados = usuariosEnLocalStorage.filter(usuario => usuario.Iglesia === iglesiaSeleccionada);

  // Crear una tabla con los usuarios y su cantidad de asistencias
  const tabla = document.querySelector('#res');

  tabla.innerHTML = `
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellidos</th>
        <th>Código</th>
        <th>Iglesia</th>
        <th>Cantidad de Asistencias</th>
      </tr>
    </thead>
    <tbody>
      ${usuariosFiltrados.map(usuario => {
        // Contar asistencias de cada usuario
        const asistenciasUsuario = asistenciasEnLocalStorage.filter(asistencia => asistencia.Codigo === usuario.id);
        return `
          <tr>
            <td>${usuario.Nombre}</td>
            <td>${usuario.Apellidos}</td>
            <td>${usuario.id}</td>
            <td>${usuario.Iglesia}</td>
            <td>${asistenciasUsuario.length}</td>
          </tr>
        `;
      }).join('')}
    </tbody>
  `;
}

// Generar dinámicamente las opciones del select (Iglesias únicas)
function generarOpcionesIglesias() {
  const usuariosEnLocalStorage = JSON.parse(localStorage.getItem('Usuarios')) || [];
  const iglesiasUnicas = [...new Set(usuariosEnLocalStorage.map(usuario => usuario.Iglesia))];

  const selectIglesia = document.getElementById('selectIglesia');
  iglesiasUnicas.forEach(iglesia => {
    const option = document.createElement('option');
    option.value = iglesia;
    option.textContent = iglesia;
    selectIglesia.appendChild(option);
  });
}

// Llamar a generarOpcionesIglesias cuando se cargue la página
document.addEventListener('DOMContentLoaded', generarOpcionesIglesias);
