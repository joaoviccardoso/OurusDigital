import { useGSAP, gsap, prefersReducedMotion } from '../lib/gsap';
import { usePlate } from '../providers/PlateProvider';

/**
 * Coreografia da placa fixa:
 *  1) entrada na Hero + flutuação
 *  2) descida (scrub) da âncora da Hero até a âncora da HowItWorks
 *  3) a HowItWorks faz o pin (ver HowItWorks): a placa fica parada
 *  4) saída: quando a seção seguinte sobe, a placa sai junto com a HowItWorks
 *
 * Contrato do DOM:
 *   [data-section="hero"]   com [data-plate-anchor]
 *   [data-section="how"]    com [data-plate-anchor]
 *   (a seção seguinte à "how" é usada como gatilho da saída)
 */
export function usePlateJourney(ready) {
  const { refs } = usePlate();

  useGSAP(
    () => {
      if (!ready) return;
      const { mover, exiter, scaler, float, card } = refs.current;
      const hero = document.querySelector('[data-section="hero"]');
      const how = document.querySelector('[data-section="how"]');
      if (!mover || !hero || !how) return;

      const heroAnchor = hero.querySelector('[data-plate-anchor]');
      const howAnchor = how.querySelector('[data-plate-anchor]');
      const reduced = prefersReducedMotion();

      // seção que vem depois da HowItWorks (se ela estiver com pin, está dentro de um .pin-spacer)
      const howWrapper = how.parentElement?.classList.contains('pin-spacer') ? how.parentElement : how;
      const next = howWrapper.nextElementSibling;

      // centro da âncora relativo ao topo da sua seção
      const centerIn = (anchor, section) => {
        const a = anchor.getBoundingClientRect();
        const s = section.getBoundingClientRect();
        return a.top - s.top + a.height / 2;
      };

      gsap.set(mover, { xPercent: -50, yPercent: -50 });

      // 2) descida
      const journey = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          endTrigger: how,
          end: 'top top',
          scrub: reduced ? true : 0.8,
          invalidateOnRefresh: true,
        },
      });
      journey.fromTo(
        mover,
        { y: () => centerIn(heroAnchor, hero) },
        { y: () => centerIn(howAnchor, how), ease: 'none' },
        0
      );
      if (!reduced) {
        journey.fromTo(card, { rotationY: 0 }, { rotationY: 360, ease: 'power1.inOut' }, 0);
      }

      // 4) saída: acompanha a HowItWorks subindo (topo da próxima seção: fundo → topo do viewport)
      if (next) {
        gsap.fromTo(
          exiter,
          { y: 0 },
          {
            y: () => -window.innerHeight,
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 1) entrada
      gsap.fromTo(
        scaler,
        { autoAlpha: 0, scale: reduced ? 1 : 0.7, rotationX: reduced ? 0 : 24 },
        { autoAlpha: 1, scale: 1, rotationX: 0, duration: reduced ? 0.01 : 1.3, ease: 'expo.out', delay: 0.35 }
      );

      // flutuação idle
      if (!reduced) {
        gsap.to(float, { y: -10, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      }
    },
    { dependencies: [ready] }
  );
}