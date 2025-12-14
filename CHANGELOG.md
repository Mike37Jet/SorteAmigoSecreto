# 📝 Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [1.0.0] - 2025-12-14

### 🎉 Lanzamiento Inicial

#### ✨ Agregado
- Sistema completo de sorteo de Amigo Secreto
- Algoritmo inteligente con restricciones familiares
- Encriptación AES-256 para enlaces
- Interfaz minimalista con Tailwind CSS
- Animaciones suaves con Framer Motion
- Efecto de confeti al revelar asignación
- Componente de configuración (organizador)
- Componente de resultados con generación de links
- Componente de revelación (participante)
- Integración con WhatsApp para compartir
- Copiar enlace al portapapeles
- Validación de configuraciones inválidas
- Manejo de errores y casos edge
- Diseño responsive para móvil y desktop
- GitHub Actions workflow para CI/CD
- Despliegue automático a GitHub Pages
- Documentación completa:
  - README principal
  - Guía de inicio rápido (QUICKSTART.md)
  - Guía de despliegue (DEPLOYMENT.md)
  - Configuración GitHub Pages (GITHUB_PAGES_SETUP.md)
  - Ejemplos de uso (EXAMPLES.md)
  - Resumen del proyecto (PROJECT_SUMMARY.md)
  - Guía de contribución (CONTRIBUTING.md)
  - Licencia MIT (LICENSE)

#### 🛠️ Tecnologías Implementadas
- React 19.2.0
- Vite 7.2.7
- Tailwind CSS 3.x
- Framer Motion 12.23.26
- Crypto-JS 4.2.0
- React Router DOM 7.10.1
- Canvas Confetti 1.9.4

#### 🎨 Características de Diseño
- Gradientes modernos (emerald → blue)
- Efectos glass morphism
- Bordes redondeados consistentes
- Sombras suaves
- Transiciones fluidas
- Animaciones de entrada/salida
- Feedback visual inmediato

#### 🔐 Seguridad
- Sin almacenamiento en servidor
- Sin cookies ni tracking
- Encriptación de datos sensibles
- URLs con tokens seguros

#### 📦 Build & Deploy
- Bundle optimizado (146KB gzipped)
- CSS purificado (3.37KB gzipped)
- Tiempo de build: ~2.7s
- Deploy automático con GitHub Actions

---

## [Unreleased]

### 🚧 En Desarrollo
- Modo oscuro
- Guardar configuraciones en localStorage
- Exportar/importar participantes

### 💡 Planeado
- PWA (Progressive Web App)
- Tests unitarios
- Tests E2E
- Soporte multi-idioma (i18n)
- Plantillas de mensajes personalizables
- Historial de sorteos
- Analytics (respetando privacidad)

---

## Tipos de Cambios

- `✨ Agregado` - Para nuevas características
- `🔧 Cambiado` - Para cambios en funcionalidad existente
- `⚠️ Deprecado` - Para características que serán removidas
- `🗑️ Removido` - Para características removidas
- `🐛 Corregido` - Para corrección de bugs
- `🔒 Seguridad` - Para vulnerabilidades corregidas
- `📝 Documentación` - Para cambios en documentación

---

## [Formato de Versiones]

```
MAJOR.MINOR.PATCH

MAJOR: Cambios incompatibles con versiones anteriores
MINOR: Nueva funcionalidad compatible con versiones anteriores
PATCH: Correcciones de bugs compatibles con versiones anteriores
```

---

**Última actualización:** 14 de diciembre de 2025
