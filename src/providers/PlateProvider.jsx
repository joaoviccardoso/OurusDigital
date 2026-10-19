import { createContext, useContext, useMemo, useRef, useState } from 'react';

const PlateContext = createContext(null);

/**
 * Estado compartilhado da placa 3D.
 * refs.current = { mover, scaler, float, card }  (preenchido pelo componente <Plate />)
 *  - mover : posição vertical guiada pelo scroll (seções 1 → 2)
 *  - scaler: animação de entrada
 *  - float : flutuação idle
 *  - card  : o objeto 3D (rotações)
 * variant: 'blue' | 'black'  (a Seção 5 chama setVariant)
 */
export function PlateProvider({ children }) {
  const refs = useRef({});
  const [variant, setVariant] = useState('blue');
  const value = useMemo(() => ({ refs, variant, setVariant }), [variant]);
  return <PlateContext.Provider value={value}>{children}</PlateContext.Provider>;
}

export const usePlate = () => useContext(PlateContext);
