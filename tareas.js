const readlineSync = require('readline-sync');

const tareas = [];

function mostrarTareas() {
  console.log('\nLista de tareas:');
  tareas.forEach((tarea, index) => {
    console.log(`${index + 1}. [${tarea.completada ? 'X' : ' '}] ${tarea.descripcion}`);
  });
}

function agregarTarea(descripcion) {
  tareas.push({ descripcion, completada: false });
  console.log(`Tarea "${descripcion}" agregada.`);
}

function cambiarEstadoTarea(index) {
  if (index >= 0 && index < tareas.length) {
    const opciones = ['Completada', 'Pendiente'];
    const seleccion = readlineSync.keyInSelect(opciones, 'Selecciona el estado de la tarea:');

    if (seleccion !== -1) {
      tareas[index].completada = seleccion === 0;
      console.log(`Tarea marcada como ${tareas[index].completada ? 'completada' : 'pendiente'}.`);
    }
  } else {
    console.log('Índice de tarea no válido.');
  }
}

function eliminarTarea(index) {
  if (index >= 0 && index < tareas.length) {
    const tareaEliminada = tareas.splice(index, 1);
    console.log(`Tarea "${tareaEliminada[0].descripcion}" eliminada.`);
  } else {
    console.log('Índice de tarea no válido.');
  }
}

const opciones = ['Mostrar tareas', 'Agregar tarea', 'Cambiar estado de tarea', 'Eliminar tarea', 'Salir'];

while (true) {
  const opcion = readlineSync.keyInSelect(opciones, 'Selecciona una opcion:');

  switch (opcion) {
    case 0:
      mostrarTareas();
      break;
    case 1:
      const descripcion = readlineSync.question('Ingresa la descripcion de la tarea: ');
      agregarTarea(descripcion);
      break;
    case 2:
      if (tareas.length > 0) {
        const index = readlineSync.keyInSelect(tareas.map(tarea => tarea.descripcion), 'Selecciona una tarea:');
        if (index !== -1) {
          cambiarEstadoTarea(index);
        }
      } else {
        console.log('No hay tareas para cambiar su estado.');
      }
      break;
    case 3:
      if (tareas.length > 0) {
        const index = readlineSync.keyInSelect(tareas.map(tarea => tarea.descripcion), 'Selecciona una tarea para eliminar:');
        if (index !== -1) {
          eliminarTarea(index);
        }
      } else {
        console.log('No hay tareas para eliminar.');
      }
      break;
    case 4:
      process.exit(0);
      break;
    default:
      console.log('Opción no válida. Intenta de nuevo.');
  }
}
