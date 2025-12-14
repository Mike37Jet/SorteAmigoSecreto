/**
 * Algoritmo de sorteo con restricciones
 * - No puede regalarse a sí mismo
 * - No puede regalar a alguien del mismo grupo familiar
 */

export function realizarSorteo(participantes) {
  let intentos = 0;
  const maxIntentos = 1000;

  while (intentos < maxIntentos) {
    // Copiamos y mezclamos (Shuffle) la lista de posibles receptores
    let receptores = [...participantes].sort(() => Math.random() - 0.5);
    let asignaciones = [];
    let esValido = true;

    for (let giver of participantes) {
      // Buscamos un receptor válido en la lista mezclada
      const receiverIndex = receptores.findIndex((receiver) => {
        // RESTRICCIÓN 1: No a sí mismo
        if (giver.id === receiver.id) return false;
        
        // RESTRICCIÓN 2: No al mismo grupo familiar (si ambos tienen grupo)
        if (giver.grupo && receiver.grupo && giver.grupo === receiver.grupo) {
          return false;
        }

        return true;
      });

      if (receiverIndex === -1) {
        // Si no hay receptor válido, el sorteo falló
        esValido = false;
        break;
      }

      // Asignamos y quitamos al receptor de la lista
      asignaciones.push({
        giverId: giver.id,
        giverName: giver.nombre,
        receiverId: receptores[receiverIndex].id,
        receiverName: receptores[receiverIndex].nombre,
      });
      
      receptores.splice(receiverIndex, 1);
    }

    if (esValido) {
      return asignaciones;
    }
    
    intentos++;
  }

  throw new Error(
    "No se encontró una combinación válida después de 1000 intentos. " +
    "Verifica que las restricciones no sean demasiado estrictas (por ejemplo, " +
    "un grupo familiar no puede tener a todos los participantes)."
  );
}

/**
 * Valida que el sorteo sea posible antes de intentarlo
 */
export function validarPosibilidadSorteo(participantes) {
  if (participantes.length < 2) {
    return { valido: false, mensaje: "Se necesitan al menos 2 participantes" };
  }

  // Verificar si hay algún grupo que contenga a todos los participantes
  const grupos = {};
  participantes.forEach(p => {
    if (p.grupo) {
      grupos[p.grupo] = (grupos[p.grupo] || 0) + 1;
    }
  });

  const totalConGrupo = Object.values(grupos).reduce((sum, count) => sum + count, 0);
  const maxGrupo = Math.max(...Object.values(grupos), 0);

  if (maxGrupo === participantes.length && participantes.length > 1) {
    return { 
      valido: false, 
      mensaje: "Todos los participantes están en el mismo grupo familiar" 
    };
  }

  return { valido: true };
}
