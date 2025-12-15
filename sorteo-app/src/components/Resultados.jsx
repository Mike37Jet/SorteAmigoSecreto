import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, CheckCircle, WhatsappLogo, ArrowClockwise, Confetti, Warning } from '@phosphor-icons/react';
import { generarLink } from '../utils/crypto';

export default function Resultados({ asignaciones, onReiniciar }) {
  const [copiado, setCopiado] = useState(null);

  const copiarLink = (link, giverId) => {
    navigator.clipboard.writeText(link);
    setCopiado(giverId);
    setTimeout(() => setCopiado(null), 2000);
  };

  const compartirWhatsApp = (link, giverName) => {
    const mensaje = `Hola *${giverName}*

Tu asignación del *Amigo Secreto* está lista.

Abre este enlace para descubrirla:

${link}

Recuerda mantener el secreto`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-8 max-w-3xl w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="mb-4"
          >
            <Confetti size={64} weight="duotone" className="text-emerald-600" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            ¡Sorteo Completado!
          </h1>
          <p className="text-gray-600">
            Comparte los enlaces con cada participante
          </p>
        </div>

        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {asignaciones.map((asignacion, index) => {
            const link = generarLink(asignacion.giverName, asignacion.receiverName);
            
            return (
              <motion.div
                key={asignacion.giverId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-5 border-2 border-gray-200 hover:border-emerald-300 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
                      <Gift size={28} weight="duotone" className="text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {asignacion.giverName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Haz clic para copiar o compartir
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => copiarLink(link, asignacion.giverId)}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      copiado === asignacion.giverId
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {copiado === asignacion.giverId ? (
                      <>
                        <CheckCircle size={20} weight="fill" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy size={20} weight="bold" />
                        Copiar
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => compartirWhatsApp(link, asignacion.giverName)}
                    className="flex-1 py-3 px-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                    title="Nota: El link será clickeable solo en producción, no con localhost"
                  >
                    <WhatsappLogo size={20} weight="fill" />
                    WhatsApp
                  </button>
                </div>

                {/* Preview del link (truncado) */}
                <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 truncate">
                    {link}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onReiniciar}
            className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <ArrowClockwise size={24} weight="bold" />
            Nuevo Sorteo
          </button>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-sm text-yellow-800 flex items-start gap-2">
            <Warning size={20} weight="fill" className="flex-shrink-0 mt-0.5" />
            <span>
              <strong>Importante:</strong> No compartas estos enlaces públicamente. 
              Cada link contiene información encriptada y solo debe ser enviado 
              a la persona correspondiente.
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
