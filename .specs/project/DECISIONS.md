# Decisões

- Workspace npm somente para o frontend; Node.js não executa a API.
- API PHP 8.2 sem framework nem Composer, compatível com o mesmo Git Deploy da Hostinger.
- SQLite via PDO, mantido fora de `public_html` em produção para sobreviver aos redeploys.
- PrimeVue em modo styled com PrimeFlex para priorizar classes utilitárias no markup.
- Avaliação de imóvel como enum (`liked`, `disliked`, `terrible`) em vez de pontuação ambígua.
- Preview de link na API PHP, com bloqueio de destinos privados para reduzir risco de SSRF.
- Portas padrão 4271 (web) e 4272 (API), livres na máquina em 14/07/2026 e configuráveis por ambiente.
