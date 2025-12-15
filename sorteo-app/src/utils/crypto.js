import CryptoJS from 'crypto-js';

const SECRET_KEY = 'amigo-secreto-2024-key';

/**
 * Encripta los datos de una asignación individual
 */
export function encryptarAsignacion(giverName, receiverName) {
  const data = {
    para: giverName,
    teToca: receiverName,
    timestamp: new Date().getTime()
  };
  
  const jsonString = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
  
  // Convertir a Base64 URL-safe
  return encodeURIComponent(encrypted);
}

/**
 * Desencripta los datos de una asignación
 */
export function desencriptarAsignacion(token) {
  try {
    const decryptedToken = decodeURIComponent(token);
    const bytes = CryptoJS.AES.decrypt(decryptedToken, SECRET_KEY);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedString) {
      throw new Error('Token inválido');
    }
    
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Error al desencriptar:', error);
    throw new Error('Link inválido o corrupto');
  }
}

/**
 * Genera el link completo para un participante
 */
export function generarLink(giverName, receiverName, baseUrl = null) {
  const token = encryptarAsignacion(giverName, receiverName);
  
  // Si no se proporciona baseUrl, construir desde window.location
  if (!baseUrl) {
    // En producción, incluye el base path del vite.config.js
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    // Extraer el base path (todo antes del hash)
    const basePath = pathname.split('#')[0];
    baseUrl = `${origin}${basePath}`;
    // Remover trailing slash si existe
    baseUrl = baseUrl.replace(/\/$/, '');
  }
  
  return `${baseUrl}#/reveal?q=${token}`;
}
