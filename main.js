document.addEventListener('DOMContentLoaded', () => {
  const usuarios = document.getElementById('usuarios');
  const btnAgregar = document.querySelector('#btn_agregar');
  const pantalla = document.getElementById('pantalla');
  const div_tabla = document.getElementById('div_tabla');
  const div_formulario = document.getElementById('div_formulario');
  const tabla = document.getElementById('tabla');
  const lateral = document.querySelector('.lateral');
  const principal = document.querySelector('.principal');
  const btn_registrar_usuarios = document.createElement('button');
  const inputBusquedaCodigo = document.getElementById('input_busqueda_codigo');
  const btnBusqueda = document.getElementById('btnBusqueda');
  const resultadoAsistencias = document.getElementById('resultado_asistencias');
  const registrar_windows = document.createElement('div');
  let editando = false;
  const busqueda_asistencias = document.getElementById('busqueda_asistencias');
  let deslizar = false;
  let idEditando = null;

  if (btnAgregar) {
    btnAgregar.addEventListener('click', agregarRegistro);
  }

  if (btnBusqueda) {
    btnBusqueda.addEventListener('click', () => {
      const codigo = inputBusquedaCodigo.value;
      if (codigo) {
        buscarYMostrarAsistencias(codigo);
      } else {
        alert("Por favor, ingresa un código.");
      }
    });
  }
  //Registrar Asistencias de los asistentes
  function agregarRegistro() {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const fechaActual = `${dia}/${mes}/${anio}`;

    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();
    const horaActual = `${hora}:${minutos}:${segundos}`;

    const codigo = document.querySelector('#input_codigo').value;

    if (codigo) {
      const nuevoRegistro = {
        Codigo: codigo,
        Fecha: fechaActual,
        Hora: horaActual
      };

      let datosEnLocalStorage = JSON.parse(localStorage.getItem('Estudio')) || [];
      datosEnLocalStorage.unshift(nuevoRegistro);
      localStorage.setItem('Estudio', JSON.stringify(datosEnLocalStorage));

      actualizarTabla();
      document.querySelector('#input_codigo').value = '';
      document.querySelector('#input_codigo').focus();
    } else {
      alert("Por favor, ingresa un código.");
    }
  }
  //Funcion Para actualizar los registros de asistencias
  function actualizarTabla() {
    presentacion.style.display = 'none';
    resultadoAsistencias.style.display = 'none';
    div_tabla.style.display = 'block';
    div_formulario.style.display = 'block';
    pantalla.style.display = 'block';
    let res = document.querySelector('#res');
    res.innerHTML = '';

    const datosEnLocalStorage = JSON.parse(localStorage.getItem('Estudio')) || [];

    if (datosEnLocalStorage.length > 0) {
      res.innerHTML = `
               <!thead>
          <tr>
              <th id="codigo">Codigo</th>
              <th id="fecha">Fecha</th>
              <th id="hora">Hora</th>
            </tr>
     `
      datosEnLocalStorage.forEach(item => {
        res.innerHTML += `
          <tr>
            <td>${item.Codigo}</td>
            <td>${item.Fecha}</td>
            <td>${item.Hora}</td>
          </tr>
        `;
      });
    }
  }

  //actualizarTabla();

  function ocultar() {
    lateral.style.left = '-300px';
    deslizar = false;
  }

  function mostrar() {
    lateral.style.left = '0px';
    deslizar = true;
  }

  function manejar_lateral() {
    if (deslizar) {
      ocultar();
    } else {
      mostrar();
    }
  }

  document.addEventListener('click', (e) => {
    const CLICK = e.target;
    switch (CLICK.id) {
      case 'app':
        manejar_lateral();
        break;
      case 'usuarios':
        ocultar();

        USUARIOS_REGISTRADOS();

        break;
      case 'asistencias_registradas':
        ocultar();
        registrar_windows.style.display = 'none';
        btn_registrar_usuarios.style.display = 'none';
        busqueda_asistencias.style.display = 'none';

        actualizarTabla();
        break;
      case 'registrar_datos':
        ocultar();
        busqueda_asistencias.style.display = 'none';

        FORM_REGISTRAR_USUARIOS();
        break;
      case 'btn_registrar_usuarios':
        REGISTRAR_USUARIOS();
        break;
      case 'Actualizar_datos':
        alert('aqui buscar datos ya sea por id, nombre, iglesia es decir fimtrando para actualizar....')
        break;
      case 'Eliminar_usuario':
        alert('aqui buscar datos ya sea por id, nombre, iglesia es decir fimtrando para eliminar....')
        break;
      case 'Seleccionar_x_iglesia':
        ocultar();
      presentacion.style.display='none';
        filtro_iglesia.style.display = 'block';
        

        break;
      case 'Reporte_para_credencial':
        alert('aqui sacar reporte para credencial')
        break;


      case 'pantalla':
      case 'cuerpo':
      case 'lateral':
      case 'encabezado_lateral':
      case 'case':

        ocultar();
        break;

      default:
        console.log(CLICK.id || CLICK.tagName);
        break;
    }
  });
  //USUARIOS REGISTRADOS 
  function USUARIOS_REGISTRADOS() {
    presentacion.style.display = 'none';
    btn_registrar_usuarios.style.display = 'none';
    pantalla.style.display = 'block'
    busqueda_asistencias.style.display = 'flex';
    registrar_windows.innerHTML = ''; // Limpiar el contenido previo
    registrar_windows.style.display = 'block';
    div_tabla.style.display = 'none';
    div_formulario.style.display = 'none';
    pantalla.appendChild(registrar_windows);
    //document.querySelector('.input-container').style.display='none';
    let usuariosEnLocalStorage = JSON.parse(localStorage.getItem('Usuarios')) || [];

    if (usuariosEnLocalStorage.length > 0) {
      // Ordenar los usuarios por ID (numéricamente)
      usuariosEnLocalStorage.sort((a, b) => a.id - b.id);

      const tablaUsuarios = document.createElement('table');
      tablaUsuarios.innerHTML = `
        <thead class='encabezado_tabla_usuarios'>
          <tr>
            <th class='id'>IDD</th>
            <th class='nombre'>Nombre</th>
            <th class='apellidos'>Apellidos</th>
            <th class='ci'>CI</th>
            <th class='celular'>Celular</th>
            <th class='iglesia'>Iglesia</th>
            <th class='sector'>Sector</th>
            <th class='departamento'>Departamento</th>
            <th class='editar'>Editar</th>
          </tr>
        </thead>
        <tbody class='cuerpo_tabla_usuarios'>
          ${usuariosEnLocalStorage.map(usuario => `
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
            </tr>`).join('')}
        </tbody>
      `;
      registrar_windows.appendChild(tablaUsuarios);
      tablaUsuarios.setAttribute('class', 'tablaUsuarios');
    } else {
      registrar_windows.innerHTML = '<p>No hay usuarios registrados.</p>';
    }

    if (editando) {
      FORM_REGISTRAR_USUARIOS();
    }
  }

  // const registrar_windows = document.createElement('div');

  function FORM_REGISTRAR_USUARIOS() {
    registrar_windows.innerHTML = '';
    registrar_windows.style.display = 'block';
    pantalla.style.display = 'flex';
    btn_registrar_usuarios.style.display = 'block';
    div_tabla.style.display = 'none';
    div_formulario.style.display = 'none';
    pantalla.appendChild(registrar_windows);
    registrar_windows.setAttribute('class', 'registrar_windows');

    const array = ['id', 'Nombre', 'Apellidos', 'ci', 'celular', 'Iglesia', 'Sector', 'Departamento'];

    for (let prop of array) {
      const container = document.createElement('div');
      container.setAttribute('class', 'input-container');

      const label = document.createElement('label');
      label.setAttribute('class', 'labels');
      label.setAttribute('for', prop);
      label.textContent = prop + ': ';

      const input = document.createElement('input');
      input.setAttribute('class', 'inputs');
      input.setAttribute('id', prop);
      input.setAttribute('name', prop);
      input.placeholder = prop;
      container.appendChild(label);
      container.appendChild(input);
      //  container.setAttribute('class', 'container');
      registrar_windows.appendChild(container);
      // eliminar el fondo azul
      //container.style.background = 'blue';
    }

    btn_registrar_usuarios.textContent = 'Registrar Datos';
    principal.appendChild(btn_registrar_usuarios);
    btn_registrar_usuarios.setAttribute('class', 'btn_registrar_usuarios');
    btn_registrar_usuarios.setAttribute('id', 'btn_registrar_usuarios');

    const proximoId = obtenerProximoId();
    document.getElementById('id').value = proximoId;
  }

  const REGISTRAR_USUARIOS = () => {
    const usuario = {
      id: document.getElementById('id').value,
      Nombre: document.getElementById('Nombre').value,
      Apellidos: document.getElementById('Apellidos').value,
      ci: document.getElementById('ci').value,
      celular: document.getElementById('celular').value,
      Iglesia: document.getElementById('Iglesia').value,
      Sector: document.getElementById('Sector').value,
      Departamento: document.getElementById('Departamento').value
    };

    if (usuario.id && usuario.Nombre && usuario.Apellidos && usuario.ci && usuario.celular && usuario.Iglesia && usuario.Sector && usuario.Departamento) {
      let usuariosEnLocalStorage = JSON.parse(localStorage.getItem('Usuarios')) || [];

      const idExistente = usuariosEnLocalStorage.some(u => u.id === usuario.id);
      if (idExistente) {
        alert('El ID ingresado ya existe. Por favor, ingrese un ID diferente o edite un usuario existente.');
      } else {
        usuariosEnLocalStorage.push(usuario);
        localStorage.setItem('Usuarios', JSON.stringify(usuariosEnLocalStorage));
        alert('Usuario registrado correctamente');
      }

      USUARIOS_REGISTRADOS();
      resetFormulario();
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  function resetFormulario() {
    document.getElementById('id').value = obtenerProximoId();
    document.getElementById('Nombre').value = '';
    document.getElementById('Apellidos').value = '';
    document.getElementById('ci').value = '';
    document.getElementById('celular').value = '';
    document.getElementById('Iglesia').value = '';
    document.getElementById('Sector').value = '';
    document.getElementById('Departamento').value = '';
  }

  // function obtenerProximoId() {
  //  const usuariosEnLocalStorage = JSON.parse(localStorage.getItem('Usuarios')) || [];

  // const ultimoUsuario = usuariosEnLocalStorage[usuariosEnLocalStorage.length - 1];
  //  const ultimoId = ultimoUsuario ? parseInt(ultimoUsuario.id) : 0;
  //  return ultimoId + 1;
  // }
  function obtenerProximoId() {
    const usuariosEnLocalStorage = JSON.parse(localStorage.getItem('Usuarios')) || [];

    // Obtener el ID más alto entre los usuarios registrados
    const maxId = usuariosEnLocalStorage.reduce((max, usuario) => {
      return Math.max(max, parseInt(usuario.id) || 0); // Asegurar que el ID sea numérico
    }, 0);

    return maxId + 1; // Retornar el siguiente ID
  }


  window.editarUsuario = function(id) {
    busqueda_asistencias.style.display = 'none';
    editando = true;
    idEditando = id;
    const usuariosEnLocalStorage = JSON.parse(localStorage.getItem('Usuarios')) || [];
    const usuarioAEditar = usuariosEnLocalStorage.find(usuario => usuario.id === id);

    if (usuarioAEditar) {
      FORM_REGISTRAR_USUARIOS();
      document.getElementById('id').value = usuarioAEditar.id;
      document.getElementById('Nombre').value = usuarioAEditar.Nombre;
      document.getElementById('Apellidos').value = usuarioAEditar.Apellidos;
      document.getElementById('ci').value = usuarioAEditar.ci;
      document.getElementById('celular').value = usuarioAEditar.celular;
      document.getElementById('Iglesia').value = usuarioAEditar.Iglesia;
      document.getElementById('Sector').value = usuarioAEditar.Sector;
      document.getElementById('Departamento').value = usuarioAEditar.Departamento;

      btn_registrar_usuarios.textContent = 'Actualizar Datos';
      btn_registrar_usuarios.onclick = actualizarUsuario;
    }
  };

  function actualizarUsuario() {
    const usuariosEnLocalStorage = JSON.parse(localStorage.getItem('Usuarios')) || [];
    const usuarioActualizado = {
      id: idEditando,
      Nombre: document.getElementById('Nombre').value,
      Apellidos: document.getElementById('Apellidos').value,
      ci: document.getElementById('ci').value,
      celular: document.getElementById('celular').value,
      Iglesia: document.getElementById('Iglesia').value,
      Sector: document.getElementById('Sector').value,
      Departamento: document.getElementById('Departamento').value
    };

    const index = usuariosEnLocalStorage.findIndex(usuario => usuario.id === idEditando);
    if (index !== -1) {
      usuariosEnLocalStorage[index] = usuarioActualizado;
      localStorage.setItem('Usuarios', JSON.stringify(usuariosEnLocalStorage));
      alert('Usuario actualizado correctamente');
    } else {
      alert('Error al actualizar el usuario. Por favor, intente de nuevo.');
    }

    editando = false;
    idEditando = null;
    USUARIOS_REGISTRADOS();
    // resetFormulario();
  }

  function buscarYMostrarAsistencias(codigo) {
    const usuariosEnLocalStorage = JSON.parse(localStorage.getItem('Usuarios')) || [];
    const asistenciasEnLocalStorage = JSON.parse(localStorage.getItem('Estudio')) || [];
    resultado_asistencias.style.display = 'block';

    const usuario = usuariosEnLocalStorage.find(u => u.id === codigo);

    if (!usuario) {
      resultadoAsistencias.innerHTML = `<p>No se encontró un usuario con el código: ${codigo}</p>`;
      return;
    }

    const asistenciasUsuario = asistenciasEnLocalStorage.filter(a => a.Codigo === codigo);

    if (asistenciasUsuario.length === 0) {
      resultadoAsistencias.innerHTML = `<p>No hay asistencias registradas para el código: ${codigo}</p>`;
      return;
    }

    resultadoAsistencias.innerHTML = `
    <div class='div_dat_reporte'> esto es
      <h3>Nombre: <span class='datos'>${usuario.Nombre} ${usuario.Apellidos}</h3>
      <h3>CI: <span class='datos'>${usuario.ci}</span></h3>
      <h3>Celular: <span class='datos'>${usuario.celular}</h3>
      <h3>Iglesia: <span class='datos'>${usuario.Iglesia}</h3>
      <h3>Sector: <span class='datos'>${usuario.Sector}</h3>
      <h3>Departamento: <span class='datos'>${usuario.Departamento}</h3>
     </div> 
     <div class='div_tabla_reporte'>
      <table class='tabla_reporte'>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          ${asistenciasUsuario.map(a => `
            <tr>
              <td class='celd'>${a.Codigo}</td>
              <td class='celd'>${usuario.Nombre}</td>
              <td class='celd'>${a.Fecha}</td>
              <td class='celd'>${a.Hora}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      </div>
    `;
  }
});