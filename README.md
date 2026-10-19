# OurusDigital landing (React + GSAP + Lenis + CSS Modules)

    npm install
    npm run dev

Arquitetura
- lib/gsap.js ................... registro único de GSAP + ScrollTrigger (+ useGSAP)
- providers/SmoothScrollProvider  Lenis sincronizado ao ScrollTrigger via gsap.ticker (nasce parado)
- providers/PlateProvider ....... refs da placa 3D + variante ('blue' | 'black')
- hooks/usePlateJourney ......... coreografia da placa (entrada, idle, descida Hero → Como funciona)
- components/Preloader .......... contador + barra + cortina
- components/Plate .............. placa 3D em CSS (stage fixo)
- sections/* .................... Hero pronta; demais são esqueletos com data-section
