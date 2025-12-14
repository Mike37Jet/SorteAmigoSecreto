import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { realizarSorteo, validarPosibilidadSorteo } from '../utils/sorteo';

export default function Configuracion({ onSorteoCompleto }) {
  const [participantes, setParticipantes] = useState([]);
  const [nombreInput, setNombreInput] = useState('');
  const [grupoInput, setGrupoInput] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 max-w-2xl w-full"
      >
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          🎁 Amigo Secreto
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Organiza tu sorteo de manera fácil y divertida
        </p>

        {/* Formulario de entrada */}
        <div className="space-y-4 mb-6">
          <div>
            <input
              type="text"
              placeholder="Nombre del participante"
              value={nombreInput}
              onChange={(e) => setNombreInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && agregarParticipante()}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Grupo familiar (opcional)"
              value={grupoInput}
              onChange={(e) => setGrupoInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && agregarParticipante()}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
            />
            <button
              onClick={agregarParticipante}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
            >
              Agregar
            </button>
          </div>
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
        <div className="mb-6 space-y-2 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {participantes.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👤</span>
                  <div>
                    <p className="font-semibold text-gray-800">{p.nombre}</p>
                    {p.grupo && (
                      <p className="text-sm text-gray-500">
                        Familia: {p.grupo}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => eliminarParticipante(p.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </motion.div>
            ))}
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
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            participantes.length < 2 || cargando
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
        >
          {cargando ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">🎁</span>
              Sorteando...
            </span>
          ) : (
            `Sortear ${participantes.length} participantes`
          )}
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Los participantes del mismo grupo familiar no se regalan entre sí
        </p>
      </motion.div>
    </div>
  );
}
