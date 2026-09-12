# OrbitOps — landing page

Landing page responsiva para o OrbitOps, um sistema operacional de operações para times que precisam transformar sinais em decisões e ações.

## O que foi construído

- Hero com visual orbital e painel de operação ao vivo.
- Seções de produto, fluxo, impacto, segurança, planos, FAQ e formulário de demo.
- Interações em JavaScript: menu mobile, tema claro/escuro, tabs acessíveis, calculadora de capacidade, atualização simulada e feedback de formulário.
- Acessibilidade: skip link, landmarks semânticos, foco visível, navegação por teclado, estados ARIA e suporte a `prefers-reduced-motion`.
- HTML, CSS e JavaScript separados, sem dependências de build.

## Como executar

Abra `index.html` diretamente no navegador ou sirva a pasta com qualquer servidor estático:

```bash
python -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

## Estrutura

```text
index.html   # marcação e conteúdo
styles.css   # tokens, layout, responsividade e animações
script.js    # interações e acessibilidade comportamental
```

As fontes Bricolage Grotesque, Manrope e DM Mono são carregadas do Google Fonts quando há conexão. O layout tem fallbacks locais para continuar legível offline.
