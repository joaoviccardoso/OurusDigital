IMAGENS DO PROJETO
==================
Esta pasta (public/images) é a ÚNICA que o Vite serve como arquivo estático.
Uma pasta "images" na raiz do projeto NÃO funciona.
No código o caminho começa sempre com /images/  (sem "public").
Os nomes são sensíveis a maiúsculas: fundoHero.png ≠ fundohero.png

Arquivo                     Onde aparece
--------------------------  ---------------------------------------------
logo.png                    Header (círculo)
fundoHero.png               Fundo da Hero
mao-celular.png             Seção 2 (mão segurando o celular, PNG transparente)
solucao-avaliacoes.png      Seção 4, card 1
solucao-google.png          Seção 4, card 2
solucao-site.png            Seção 4, card 3
solucao-business.png        Seção 4, card 4
solucao-placas.png          Seção 4, card 5

Enquanto um arquivo não existir, o site usa um espaço reservado e não quebra.
