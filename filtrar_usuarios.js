function filtrarUsuarios(criterio) {
  // Obtener usuarios del LocalStorage
  const usuariosEnLocalStorage = JSON.parse(localStorage.getItem('Usuarios')) || [];

  // Filtrar usuarios según el criterio ingresado
  const usuariosFiltrados = usuariosEnLocalStorage.filter(usuario => {
    return (
      usuario.Nombre.toLowerCase().includes(criterio.toLowerCase()) ||
      usuario.Apellidos.toLowerCase().includes(criterio.toLowerCase()) ||
      usuario.ci.toString().includes(criterio) ||
      usuario.celular.toString().includes(criterio) ||
      usuario.Iglesia.toLowerCase().includes(criterio.toLowerCase()) ||
      usuario.Sector.toLowerCase().includes(criterio.toLowerCase()) ||
      usuario.Departamento.toLowerCase().includes(criterio.toLowerCase())
    );
  });

  // Mostrar los usuarios filtrados en la tabla
  actualizarTablaUsuarios(usuariosFiltrados);
}

function actualizarTablaUsuarios(usuarios) {
  const tablaUsuarios = document.querySelector('.tablaUsuarios');
  const tbody = tablaUsuarios.querySelector('.cuerpo_tabla_usuarios');

  if (usuarios.length > 0) {
    tbody.innerHTML = usuarios.map(usuario => `
      <tr>
        <td class='celda_dat id'>${usuario.id}</td>
        <td class='celda_dat nombre'>${usuario.Nombre}</td>
        <td class='celda_dat apellidos'>${usuario.Apellidos}</td>
        <td class='celda_dat ci'>${usuario.ci}</td>
        <td class='celda_dat celular'>${usuario.celular}</td>
        <td class='celda_dat iglesia'>${usuario.Iglesia}</td>
        <td class='celda_dat sector'>${usuario.Sector}</td>
        <td class='celda_dat departamento'>${usuario.Departamento}</td>
        <td class='celda_dat editar'>
          <button class='btn_actualizar' onclick="editarUsuario('${usuario.id}')">Actualizar</button>
          <button class='btn_eliminar'>Eliminar</button>
        </td>
      </tr>
    `).join('');
  } else {
    tbody.innerHTML = `<tr><td colspan="9">No se encontraron usuarios.</td></tr>`;
  }
}


///=== mi evento en Javascript oninput
// Selecciona el campo de búsqueda
const inputBusqueda = document.getElementById('inputBusqueda');

// Agrega un evento para capturar cada vez que el usuario escriba
inputBusqueda.addEventListener('input', function() {
  const criterio = inputBusqueda.value; // Obtiene el valor ingresado
  filtrarUsuarios(criterio); // Llama a la función de filtrado
});
