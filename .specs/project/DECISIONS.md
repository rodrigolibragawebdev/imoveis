# Decisões

- Monorepo npm workspaces para manter frontend e backend independentes sem excesso de infraestrutura.
- Express MVC com repositórios e serviços explícitos; sem ORM para manter o SQLite transparente.
- PrimeVue em modo styled com PrimeFlex para priorizar classes utilitárias no markup.
- Avaliação de imóvel como enum (`liked`, `disliked`, `terrible`) em vez de pontuação ambígua.
- Preview de link no backend, com bloqueio de destinos privados para reduzir risco de SSRF.
- Portas padrão 4271 (web) e 4272 (API), livres na máquina em 14/07/2026 e configuráveis por ambiente.
