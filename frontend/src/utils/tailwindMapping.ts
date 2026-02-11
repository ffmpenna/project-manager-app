// src/utils/tailwind-mapping.js

/**
 * @typedef {'blue' | 'yellow' | 'green' | 'gray' | 'red' | 'purple'} ColorKey
 * * Mapeamento centralizado para gerar classes Tailwind dinamicamente.
 * O objeto garante que todas as classes estáticas necessárias (como 'bg-blue-400')
 * sejam detectadas pelo Purging do Tailwind.
 */
export const colorMap = {
  // Mapeamento Base de Cores (A chave é a cor que você passa via props)
  blue: '400',
  yellow: '400',
  green: '400',
  red: '400',
  purple: '400',
  gray: '400',

  // Funções para construir classes Tailwind de forma segura

  /**
   * Constrói a classe de fundo (background). Ex: 'bg-blue-400'
   * @param {ColorKey} color
   * @returns {string}
   */
  getBgClass: (color: string): string => {
    // Retorna a classe de fundo usando a chave do mapa.
    const shade = colorMap[color] || colorMap.gray;
    return `bg-${color}-${shade}`;
  },

  /**
   * Constrói a classe de borda. Ex: 'border-blue-400'
   * @param {ColorKey} color
   * @returns {string}
   */
  getBorderClass: (color) => {
    const shade = colorMap[color] || colorMap.gray;
    return `border-${color}-${shade}`;
  },

  /**
   * Constrói a classe de texto. Útil para ícones ou títulos. Ex: 'text-blue-600'
   * @param {ColorKey} color
   * @returns {string}
   */
  getTextClass: (color) => {
    // Usamos um tom um pouco mais escuro para melhor contraste com o fundo
    const shade = colorMap[color] === '400' ? '600' : colorMap[color];
    return `text-${color}-${shade}`;
  },

  /**
   * Constrói a classe de cor principal (como 'blue-400'). Útil para construir outras classes.
   * @param {ColorKey} color
   * @returns {string}
   */
  getBaseColor: (color) => {
    const shade = colorMap[color] || colorMap.gray;
    return `${color}-${shade}`;
  },
};
