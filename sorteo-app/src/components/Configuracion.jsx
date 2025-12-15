import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, UserPlus, X, Sparkle, Users } from '@phosphor-icons/react';
import { realizarSorteo, validarPosibilidadSorteo } from '../utils/sorteo';

export default function Configuracion({ onSorteoCompleto }) {
  const [participantes, setParticipantes] = useState([]);
  const [nombreInput, setNombreInput] = useState('');
  const [grupoInput, setGrupoInput] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  // Obtener grupos únicos existentes
  const gruposExistentes = [...new Set(participantes
    .map(p => p.grupo)
    .filter(g => g !== null && g !== '')
  )];

  // Paleta de colores para grupos
  const coloresGrupo = [
    { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-700', chip: 'bg-blue-500' },
    { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-700', chip: 'bg-purple-500' },
    { bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-700', chip: 'bg-pink-500' },
    { bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-700', chip: 'bg-orange-500' },
    { bg: 'bg-teal-100', border: 'border-teal-300', text: 'text-teal-700', chip: 'bg-teal-500' },
    { bg: 'bg-indigo-100', border: 'border-indigo-300', text: 'text-indigo-700', chip: 'bg-indigo-500' },
  ];

  const obtenerColorGrupo = (grupo) => {
    if (!grupo) return { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-700', chip: 'bg-gray-500' };
    const index = gruposExistentes.indexOf(grupo);
    return coloresGrupo[index % coloresGrupo.length];
  };

  const agregarParticipante = () => {
    if (!nombreInput.trim()) {
      setError('Ingresa un nombre válido');
      return;
    }

    const nuevoParticipante = {
      id: Date.now(),
      nombre: nombreInput.trim(),
      grupo: grupoInput.trim() || null
    };

    setParticipantes([...participantes, nuevoParticipante]);
    setNombreInput('');
    setGrupoInput('');
    setError('');
  };

  const seleccionarGrupo = (grupo) => {
    setGrupoInput(grupo);
  };

  const limpiarGrupo = () => {
    setGrupoInput('');
  };

  const eliminarParticipante = (id) => {
    setParticipantes(participantes.filter(p => p.id !== id));
  };

  const ejecutarSorteo = () => {
    setError('');
    
    const validacion = validarPosibilidadSorteo(participantes);
    if (!validacion.valido) {
      setError(validacion.mensaje);
      return;
    }

    setCargando(true);

    // Simulamos un delay para la animación
    setTimeout(() => {
      try {
        const resultado = realizarSorteo(participantes);
        onSorteoCompleto(resultado);
      } catch (err) {
        setError(err.message);
        setCargando(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-2xl w-full"
      >
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          <Gift size={40} weight="duotone" className="text-emerald-600 sm:w-12 sm:h-12" />
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Amigo Secreto
          </h1>
        </div>
        <p className="text-center text-gray-600 mb-8">
          Organiza tu sorteo de manera fácil y divertida
        </p>

        {/* Formulario de entrada */}
        <div className="space-y-3 sm:space-y-4 mb-6">
          <div>
            <input
              type="text"
              placeholder="Nombre del participante"
              value={nombreInput}
              onChange={(e) => setNombreInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && agregarParticipante()}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors text-sm sm:text-base"
            />
          </div>

          {/* Grupos existentes como chips clickeables */}
          {gruposExistentes.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600 font-medium">Grupos:</span>
              {gruposExistentes.map((grupo) => {
                const colores = obtenerColorGrupo(grupo);
                return (
                  <button
                    key={grupo}
                    type="button"
                    onClick={() => seleccionarGrupo(grupo)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      grupoInput === grupo
                        ? `${colores.chip} text-white shadow-md`
                        : `${colores.bg} ${colores.text} hover:shadow-md`
                    }`}
                  >
                    {grupo}
                  </button>
                );
              })}
              {grupoInput && (
                <button
                  type="button"
                  onClick={limpiarGrupo}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all"
                >
                  Sin grupo
                </button>
              )}
            </div>
          )}

          <div className="flex gap-2 sm:gap-3">
            <input
              type="text"
              placeholder="Grupo familiar (opcional)"
              value={grupoInput}
              onChange={(e) => setGrupoInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && agregarParticipante()}
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
              list="grupos-sugeridos"
            />
            <datalist id="grupos-sugeridos">
              {gruposExistentes.map((grupo) => (
                <option key={grupo} value={grupo} />
              ))}
            </datalist>
            <button
              onClick={agregarParticipante}
              className="px-3 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-1 sm:gap-2"
            >
              <UserPlus size={20} weight="bold" />
              <span className="hidden sm:inline">Agregar</span>
            </button>
          </div>

          {grupoInput && (
            <p className="text-sm text-blue-600 flex items-center gap-1">
              <Users size={16} weight="duotone" />
              Agregando a: <strong>{grupoInput}</strong>
            </p>
          )}
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lista de participantes */}
        <div className="space-y-3 mb-6">
          <AnimatePresence>
            {participantes.map((p) => {
              const colores = obtenerColorGrupo(p.grupo);
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`flex items-center justify-between p-3 rounded-xl border-2 ${colores.bg} ${colores.border}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${p.grupo ? colores.chip : 'bg-emerald-500'} bg-opacity-20 flex items-center justify-center`}>
                      <Users size={24} weight="duotone" className={p.grupo ? colores.text : 'text-emerald-600'} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{p.nombre}</p>
                      {p.grupo && (
                        <p className={`text-sm ${colores.text} font-medium`}>
                          Familia: {p.grupo}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => eliminarParticipante(p.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  >
                    <X size={20} weight="bold" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {participantes.length === 0 && (
          <p className="text-center text-gray-400 mb-6">
            Aún no hay participantes. ¡Agrega al menos 2!
          </p>
        )}

        {/* Botón de sorteo */}
        <button
          onClick={ejecutarSorteo}
          disabled={participantes.length < 2 || cargando}
          className={`w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all ${
            participantes.length < 2 || cargando
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
        >
          {cargando ? (
            <span className="flex items-center justify-center gap-2">
              <Gift size={24} weight="duotone" className="animate-spin" />
              Sorteando...
            </span>
          ) : (
            <span className="flex items-center gap-2 justify-center">
              <Sparkle size={20} weight="fill" />
              Sortear {participantes.length} participantes
            </span>
          )}
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Los participantes del mismo grupo familiar no se regalan entre sí
        </p>
      </motion.div>
    </div>
  );
}
