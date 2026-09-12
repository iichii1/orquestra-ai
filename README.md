# OrbitOps — landing page

Landing page responsiva para o OrbitOps, uma plataforma de operações para times que entregam continuamente. O projeto é intencionalmente leve: HTML, CSS e JavaScript vanilla, sem build step ou dependências de runtime.

## Executar localmente

Abra `index.html` diretamente no navegador ou sirva a pasta com qualquer servidor estático:

```bash
python -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

## Incluído

- Hero com preview visual do centro de comando, benefícios, métricas, depoimento, preços, FAQ e CTA.
- Menu mobile com estados ARIA, link para pular ao conteúdo e foco visível.
- Tema claro/escuro persistido em `localStorage`, com fallback para a preferência do sistema.
- Alternância mensal/anual nos preços.
- Formulário de contato demonstrativo com validação de nome e e-mail, mensagens de erro e estado de sucesso.
- Layout responsivo para mobile, tablet e desktop, além de suporte a `prefers-reduced-motion`.

## Arquivos

- `index.html` — estrutura semântica e conteúdo.
- `styles.css` — identidade visual, temas, animações e breakpoints.
- `script.js` — interações do menu, tema, preços, FAQ nativo e validação do formulário.
