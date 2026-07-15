<template>
	<div>
		<div
			class="border-round-3xl p-4 md:p-5 mb-5 budget-panel"
		>
			<span class="inline-block text-sm uppercase font-bold mb-2 eyebrow"
				>Regra prática</span
			>
			<p class="text-xl line-height-3 m-0">
				Reserve entre <strong>10% e 13%</strong> do valor do imóvel só
				para custos de compra — além da entrada. É a soma de ITBI,
				escritura, registro e as primeiras taxas do financiamento.
			</p>
		</div>

		<h2 class="display-font text-2xl mb-3">Principais taxas da compra</h2>
		<div class="grid mb-5">
			<div v-for="cost in costs" :key="cost.title" class="col-12 md:col-6">
				<article
					class="surface-card border-1 border-round-3xl p-4 h-full cost-card"
				>
					<div class="flex align-items-center gap-3 mb-2">
						<i :class="cost.icon" class="text-xl text-terracotta" />
						<h3 class="display-font text-lg m-0">
							{{ cost.title }}
						</h3>
						<span class="ml-auto font-bold text-terracotta">{{
							cost.range
						}}</span>
					</div>
					<p class="line-height-3 opacity-70 m-0 text-sm">
						{{ cost.description }}
					</p>
				</article>
			</div>
		</div>

		<h2 class="display-font text-2xl mb-3">Tabela Price ou SAC?</h2>
		<div class="grid mb-3">
			<div class="col-12 md:col-6">
				<article
					class="border-round-3xl p-4 md:p-5 h-full system-card sac-card"
				>
					<h3 class="display-font text-xl m-0 mb-2">
						SAC <span class="font-normal text-base">(amortização constante)</span>
					</h3>
					<ul class="line-height-3 pl-3 m-0 text-sm">
						<li>Parcelas começam mais altas e vão diminuindo</li>
						<li>Amortiza a dívida mais rápido</li>
						<li>Menos juros no total do contrato</li>
						<li>
							Melhor para quem pretende quitar antecipadamente
						</li>
					</ul>
				</article>
			</div>
			<div class="col-12 md:col-6">
				<article
					class="border-round-3xl p-4 md:p-5 h-full system-card price-card"
				>
					<h3 class="display-font text-xl m-0 mb-2">
						Price <span class="font-normal text-base">(parcela fixa)</span>
					</h3>
					<ul class="line-height-3 pl-3 m-0 text-sm">
						<li>Parcela igual do início ao fim</li>
						<li>No começo, paga mais juros que amortização</li>
						<li>Custo total de juros maior</li>
						<li>
							Exige menos renda comprometida — facilita a
							aprovação
						</li>
					</ul>
				</article>
			</div>
		</div>

		<div class="border-round-3xl p-4 md:p-5 example-panel mb-5">
			<span class="inline-block text-sm uppercase font-bold mb-2 eyebrow"
				>Exemplo de mercado</span
			>
			<p class="line-height-3 m-0">
				Para R$ 300 mil a 10% a.a. em 180 meses, o SAC soma cerca de
				<strong>R$ 516 mil</strong> pagos ao final, contra
				<strong>R$ 580,6 mil</strong> na Price — quase R$ 65 mil a mais
				em juros. Use a aba <strong>Simular financiamento</strong> para
				fazer essa conta com os seus números.
			</p>
		</div>

		<div class="border-round-3xl p-4 md:p-5 cet-panel">
			<div class="flex align-items-center gap-3 mb-2">
				<i class="pi pi-info-circle text-xl text-forest" />
				<h3 class="display-font text-lg m-0">
					O que realmente importa: o CET
				</h3>
			</div>
			<p class="line-height-3 opacity-80 m-0 text-sm">
				O Custo Efetivo Total (CET) inclui a taxa de juros, o seguro
				obrigatório (MIP e DFI) e as tarifas de administração. Dois
				bancos com a mesma taxa nominal podem ter CETs bem diferentes
				— sempre peça o CET antes de comparar propostas.
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
const costs = [
	{
		title: "ITBI",
		range: "2% a 4%",
		icon: "pi pi-percentage",
		description:
			"Imposto municipal pago pelo comprador na transferência do imóvel. Em São Paulo e no Rio a média fica em torno de 3%.",
	},
	{
		title: "Escritura pública",
		range: "1% a 2%",
		icon: "pi pi-file-edit",
		description:
			"Necessária só na compra à vista — se o imóvel for financiado, o próprio contrato de financiamento já serve como título.",
	},
	{
		title: "Registro em cartório",
		range: "0,5% a 1,5%",
		icon: "pi pi-verified",
		description:
			"Obrigatório em qualquer compra: é o registro que garante que o imóvel é seu perante terceiros.",
	},
	{
		title: "Taxas do financiamento",
		range: "até 5%",
		icon: "pi pi-building-columns",
		description:
			"Avaliação do imóvel, tarifas de análise e seguros MIP/DFI. Vários bancos permitem incluir parte disso no próprio financiamento.",
	},
]
</script>

<style scoped>
.eyebrow {
	letter-spacing: 0.14em;
}
.budget-panel {
	color: var(--cream);
	background: var(--forest);
	box-shadow: 0 18px 45px rgba(54, 82, 68, 0.16);
}
.cost-card {
	border-color: var(--line) !important;
}
.system-card {
	border: 1px solid var(--line);
}
.sac-card {
	background: rgba(32, 176, 101, 0.08);
	border-color: rgba(32, 176, 101, 0.28) !important;
}
.price-card {
	background: rgba(182, 92, 58, 0.08);
	border-color: rgba(182, 92, 58, 0.28) !important;
}
.example-panel {
	background: rgba(255, 250, 240, 0.7);
	border: 1px solid var(--line);
}
.cet-panel {
	background: rgba(66, 151, 177, 0.08);
	border: 1px dashed rgba(38, 112, 134, 0.32);
}
</style>
