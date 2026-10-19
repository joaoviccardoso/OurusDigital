// Arquivos 3D (.glb) em public/models/  -> caminho no código começa com /models/
export const PLATE_MODELS = {
  blue: '/images/placa-azul.glb',
  black: '/images/placa-preta.glb',
};

// Se o seu GLB for UM arquivo só com as duas cores como "variantes de material",
// coloque aqui os nomes das variantes e aponte as duas entradas acima para o mesmo arquivo.
// Exemplo: { blue: 'Azul', black: 'Preta' }   (deixe null se usar dois arquivos)
export const PLATE_VARIANT_NAMES = null;

// Proporção da área onde o modelo aparece (largura / altura). Ajuste ao formato da sua placa.
export const PLATE_RATIO = '1 / 1.08';

// Se o modelo aparecer de lado/de costas no início, corrija aqui (em graus: 0, 90, 180, 270).
export const PLATE_YAW_OFFSET = 0;