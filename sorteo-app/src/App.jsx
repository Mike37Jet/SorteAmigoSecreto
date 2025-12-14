import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Configuracion from './components/Configuracion';
import Resultados from './components/Resultados';
import Revelacion from './components/Revelacion';

function App() {
  const [asignaciones, setAsignaciones] = useState(null);

  const handleSorteoCompleto = (resultado) => {
    setAsignaciones(resultado);
  };

  const handleReiniciar = () => {
    setAsignaciones(null);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            asignaciones ? (
              <Resultados 
                asignaciones={asignaciones} 
                onReiniciar={handleReiniciar}
              />
            ) : (
              <Configuracion onSorteoCompleto={handleSorteoCompleto} />
            )
          } 
        />
        <Route path="/reveal" element={<Revelacion />} />
      </Routes>
    </Router>
  );
}

export default App;
