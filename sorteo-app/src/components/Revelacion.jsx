import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Gift, Sparkle, Confetti, SmileyXEyes, Lock, X } from '@phosphor-icons/react';
import { desencriptarAsignacion } from '../utils/crypto';
import confetti from 'canvas-confetti';

export default function Revelacion() {
  const [searchParams] = useSearchParams();
  const [revelado, setRevelado] = useState(false);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get('q');
    
    if (!token) {
      setError('Link inválido. No se encontró información de sorteo.');
      return;
    }

    try {
      const datosDesencriptados = desencriptarAsignacion(token);
      setDatos(datosDesencriptados);
    } catch (err) {
      setError('Este link es inválido o ha expirado.');
      console.error(err);
    }
  }, [searchParams]);

  const revelar = () => {
    setRevelado(true);
    
    // Efecto de confeti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-8 max-w-md w-full text-center"
        >
          <div className="mb-4">
            <SmileyXEyes size={64} weight="duotone" className="text-gray-400 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Oops...
          </h1>
          <p className="text-gray-600">{error}</p>
        </motion.div>
      </div>
    );
  }

  if (!datos) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Gift size={64} weight="duotone" className="text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {!revelado ? (
          // Vista previa - Caja cerrada
          <motion.div
            key="cerrado"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="glass rounded-3xl p-8 max-w-md w-full text-center"
          >
            <motion.div
              animate={{ 
                rotateY: [0, 10, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="mb-6 gift-box flex justify-center"
            >
              <Gift size={96} weight="duotone" className="text-emerald-600" />
            </motion.div>

            <h1 className="text-3xl font-bold mb-3 text-gray-800">
              ¡Hola {datos.para}!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Tienes una misión secreta esperándote...
            </p>

            <motion.button
              onClick={revelar}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2"
            >
              <Sparkle size={24} weight="fill" />
              Abrir Regalo
            </motion.button>

            <p className="text-sm text-gray-500 mt-4">
              Toca el botón para descubrir tu asignación
            </p>
          </motion.div>
        ) : (
          // Vista revelada
          <motion.div
            key="abierto"
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="glass rounded-3xl p-8 max-w-md w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="mb-6 flex justify-center"
            >
              <Confetti size={96} weight="duotone" className="text-emerald-600" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-semibold text-gray-700 mb-4"
            >
              ¡Tu misión es regalar a:
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-6 mb-6"
            >
              <p className="text-4xl font-bold text-white">
                {datos.teToca}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="space-y-4"
            >
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-sm text-yellow-800 flex items-start gap-2">
                  <Lock size={20} weight="fill" className="flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Recuerda:</strong> ¡Es un secreto! No le digas a nadie 
                    a quién le toca regalarle.
                  </span>
                </p>
              </div>

              <button
                onClick={() => window.location.href = '/'}
                className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
              >
                <X size={20} weight="bold" />
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
