# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a Sorteo Amigo Secreto! 

## 🎯 Cómo Contribuir

### 1. Reportar Bugs 🐛

Si encuentras un bug:

1. Verifica que no exista un issue similar
2. Crea un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs actual
   - Screenshots si aplica
   - Información del navegador/sistema

**Template:**
```markdown
**Descripción del bug:**
[Descripción clara]

**Pasos para reproducir:**
1. Ve a '...'
2. Click en '...'
3. Observa el error

**Comportamiento esperado:**
[Qué debería pasar]

**Screenshots:**
[Si aplica]

**Entorno:**
- Navegador: [Chrome 120]
- OS: [Windows 11]
- Versión: [1.0.0]
```

### 2. Sugerir Características ✨

Para nuevas ideas:

1. Abre un issue con etiqueta `enhancement`
2. Describe la característica
3. Explica el caso de uso
4. Si es posible, propón una solución

### 3. Enviar Pull Requests 🔧

#### Proceso:

1. **Fork el repositorio**
   ```bash
   # Click en Fork en GitHub
   ```

2. **Clona tu fork**
   ```bash
   git clone https://github.com/TU-USUARIO/SorteAmigoSecreto.git
   cd SorteAmigoSecreto
   ```

3. **Crea una rama**
   ```bash
   git checkout -b feature/mi-nueva-caracteristica
   # o
   git checkout -b fix/correccion-de-bug
   ```

4. **Haz tus cambios**
   ```bash
   cd sorteo-app
   npm install
   npm run dev
   # Realiza tus cambios
   ```

5. **Prueba tus cambios**
   ```bash
   npm run build
   npm run preview
   # Verifica que todo funcione
   ```

6. **Commit**
   ```bash
   git add .
   git commit -m "feat: Agrega nueva característica"
   # o
   git commit -m "fix: Corrige bug en sorteo"
   ```

7. **Push**
   ```bash
   git push origin feature/mi-nueva-caracteristica
   ```

8. **Abre un Pull Request**
   - Ve a tu fork en GitHub
   - Click en "Compare & pull request"
   - Describe tus cambios
   - Espera la revisión

## 📝 Guías de Estilo

### Commits

Usa [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: Agrega nueva característica
fix: Corrige bug
docs: Actualiza documentación
style: Cambios de formato (sin afectar funcionalidad)
refactor: Refactorización de código
test: Agrega o modifica tests
chore: Tareas de mantenimiento
```

**Ejemplos:**
```bash
git commit -m "feat: Agrega soporte para exclusiones manuales"
git commit -m "fix: Corrige error en algoritmo de sorteo"
git commit -m "docs: Actualiza README con nuevas instrucciones"
```

### Código JavaScript/React

```javascript
// ✅ Buenas prácticas
- Usa nombres descriptivos
- Componentes funcionales con hooks
- Comentarios claros
- Manejo de errores
- PropTypes o TypeScript en el futuro

// ❌ Evita
- Nombres genéricos (data, temp, x)
- Componentes de clase
- Código sin comentarios complejos
- console.log en producción
```

### CSS/Tailwind

```css
/* ✅ Usa clases de Tailwind */
<div className="flex items-center gap-4 p-6 rounded-lg">

/* ❌ Evita estilos inline cuando sea posible */
<div style={{ display: 'flex', padding: '24px' }}>
```

## 🧪 Testing

Actualmente no hay tests automatizados, pero son bienvenidos!

**Checklist manual:**
- [ ] La aplicación carga sin errores
- [ ] El sorteo funciona correctamente
- [ ] Los links se generan bien
- [ ] La revelación muestra el nombre correcto
- [ ] No hay errores en consola
- [ ] Funciona en móvil
- [ ] Funciona en diferentes navegadores

## 🌟 Áreas de Contribución

### Fácil 🟢
- Mejorar documentación
- Agregar ejemplos
- Corregir typos
- Mejorar estilos CSS
- Agregar animaciones

### Intermedio 🟡
- Agregar nuevas características UI
- Mejorar algoritmo de sorteo
- Optimizar rendimiento
- Agregar validaciones

### Avanzado 🔴
- Implementar tests
- Agregar PWA
- Soporte multi-idioma
- Sistema de plugins
- Analytics (sin comprometer privacidad)

## 📋 Ideas para Contribuir

### Features Pendientes:
- [ ] Modo oscuro
- [ ] Guardar configuraciones
- [ ] Exportar/importar participantes
- [ ] Plantillas de mensajes
- [ ] PWA con offline support
- [ ] Tests unitarios
- [ ] Tests E2E
- [ ] Soporte i18n (internacionalización)
- [ ] Temas personalizables
- [ ] Historial de sorteos

### Mejoras:
- [ ] Mejorar accesibilidad (ARIA labels)
- [ ] Optimizar bundle size
- [ ] Lazy loading de componentes
- [ ] Mejorar SEO
- [ ] Agregar meta tags Open Graph

## 🔍 Review Process

1. **Automático**: GitHub Actions verificará el build
2. **Manual**: Revisión de código por mantenedores
3. **Feedback**: Posibles cambios solicitados
4. **Merge**: Una vez aprobado, se fusiona

## 💬 Comunicación

- **Issues**: Para bugs y features
- **Discussions**: Para ideas y preguntas
- **Pull Requests**: Para contribuciones de código

## ⚡ Quick Start para Contribuidores

```bash
# 1. Fork y clona
git clone https://github.com/TU-USUARIO/SorteAmigoSecreto.git
cd SorteAmigoSecreto/sorteo-app

# 2. Instala dependencias
npm install

# 3. Ejecuta en desarrollo
npm run dev

# 4. Haz tus cambios
# ...

# 5. Verifica que compile
npm run build

# 6. Commit y push
git add .
git commit -m "feat: Mi contribución"
git push origin mi-rama

# 7. Abre PR en GitHub
```

## 🎖️ Reconocimientos

Todos los contribuidores serán listados en el README.

## 📜 Código de Conducta

### Nuestro Compromiso

Crear un ambiente respetuoso, inclusivo y acogedor.

### Comportamiento Esperado

✅ Ser respetuoso y cortés
✅ Aceptar críticas constructivas
✅ Enfocarse en lo mejor para la comunidad
✅ Mostrar empatía

### Comportamiento Inaceptable

❌ Lenguaje ofensivo
❌ Acoso o intimidación
❌ Spam o autopromoción
❌ Comportamiento no profesional

## 📞 Contacto

¿Preguntas? Abre un issue o discussion.

---

**¡Gracias por contribuir! 🎉**
