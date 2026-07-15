<template>
	<div>
		<h2 class="display-font text-2xl mb-1">Bancos mais indicados</h2>
		<p class="text-sm opacity-60 mb-4">
			Taxas de referência (jul/2026) para o SFH — confirme sempre o CET
			antes de decidir, ele muda por perfil, relacionamento e valor do
			imóvel.
		</p>
		<div class="lender-list">
			<article
				v-for="lender in lenders"
				:key="lender.name"
				class="lender-row"
			>
				<span class="lender-rank">{{
					String(lender.rank).padStart(2, "0")
				}}</span>
				<div class="lender-info">
					<strong class="lender-name">{{ lender.name }}</strong>
					<span class="lender-note">{{ lender.note }}</span>
				</div>
				<span class="lender-rate">{{ lender.rate }}</span>
			</article>
		</div>
	</div>
</template>

<script setup lang="ts">
const lenders = [
	{ rank: 1, name: "Banco do Brasil", rate: "a partir de 9,00% a.a. + TR", note: "Melhor taxa para cotista FGTS/poupança do BB" },
	{ rank: 2, name: "Caixa Econômica Federal", rate: "a partir de 11,19% a.a. + TR", note: "Referência do mercado, taxa preferencial para correntista" },
	{ rank: 3, name: "BRB", rate: "a partir de 11,36% a.a.", note: "Boa taxa entre os bancos regionais" },
	{ rank: 4, name: "Itaú", rate: "a partir de 11,60% a.a.", note: "Aprovação rápida entre os privados" },
	{ rank: 5, name: "Bradesco", rate: "a partir de 11,70% a.a.", note: "Faixa competitiva, bom para quem já é correntista" },
	{ rank: 6, name: "Santander", rate: "a partir de 11,79% a.a.", note: "Costuma ter campanhas para imóveis novos" },
	{ rank: 7, name: "Sicoob", rate: "aprox. 11% a 12% a.a.", note: "Cooperativa — melhor taxa se você for associado" },
	{ rank: 8, name: "Sicredi", rate: "aprox. 11% a 12% a.a.", note: "Cooperativa — vale comparar se já tem conta" },
	{ rank: 9, name: "Banrisul", rate: "próximo à média de mercado", note: "Forte para quem mora no Rio Grande do Sul" },
	{ rank: 10, name: "Inter", rate: "próximo à média de mercado", note: "100% digital, simulação rápida pelo app" },
]
</script>

<style scoped>
.lender-list {
	border: 1px solid var(--line);
	border-radius: 1.25rem;
	overflow: hidden;
}
.lender-row {
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 0.85rem 1.1rem;
	background: rgba(255, 250, 240, 0.88);
}
.lender-row + .lender-row {
	border-top: 1px solid var(--line);
}
.lender-rank {
	font-family: var(--font-display);
	font-weight: 800;
	font-size: 1.1rem;
	opacity: 0.3;
	width: 2rem;
	flex-shrink: 0;
}
.lender-info {
	display: flex;
	flex-direction: column;
	flex: 1;
	min-width: 0;
}
.lender-name {
	font-size: 1rem;
}
.lender-note {
	font-size: 0.8rem;
	opacity: 0.6;
}
.lender-rate {
	font-weight: 700;
	color: var(--terracotta);
	text-align: right;
	white-space: nowrap;
	font-size: 0.9rem;
}
</style>
