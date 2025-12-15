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
export function generarLink(giverName, receiverName) {
  const token = encryptarAsignacion(giverName, receiverName);
  
  // Obtener la URL base completa incluyendo el path de GitHub Pages
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  
  // Obtener el base path (todo antes del #, sin trailing slash)
  let basePath = pathname.split('#')[0].replace(/\/$/, '');
  
  // Si estamos en localhost, el basePath será vacío, así que usamos el origin directamente
  const baseUrl = basePath ? `${origin}${basePath}` : origin;
  
  return `${baseUrl}/#/reveal?q=${token}`;
}
