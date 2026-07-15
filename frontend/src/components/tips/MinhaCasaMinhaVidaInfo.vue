<template>
	<div>
		<h2 class="display-font text-2xl mb-1">Minha Casa Minha Vida 2026</h2>
		<p class="text-sm opacity-60 mb-4">
			Se a renda familiar entrar em alguma faixa abaixo, vale simular
			pelo MCMV antes de ir para o financiamento tradicional — as taxas
			são bem menores.
		</p>
		<div class="grid">
			<div v-for="faixa in faixas" :key="faixa.label" class="col-12 md:col-6">
				<article class="border-round-3xl p-4 h-full faixa-card">
					<div class="flex align-items-center justify-content-between mb-2">
						<h3 class="display-font text-lg m-0">{{ faixa.label }}</h3>
						<Tag :value="faixa.rate" severity="success" />
					</div>
					<div class="text-sm line-height-3 opacity-80">
						<div class="flex justify-content-between py-1">
							<span>Renda familiar</span>
							<strong>{{ faixa.income }}</strong>
						</div>
						<div class="flex justify-content-between py-1">
							<span>Valor máx. do imóvel</span>
							<strong>{{ faixa.maxProperty }}</strong>
						</div>
						<div class="flex justify-content-between py-1">
							<span>Subsídio</span>
							<strong>{{ faixa.subsidy }}</strong>
						</div>
					</div>
				</article>
			</div>
		</div>
		<div class="border-round-3xl p-4 md:p-5 mt-4 mcmv-note">
			<i class="pi pi-info-circle text-forest mr-2" />
			<span class="text-sm line-height-3 opacity-80">
				O valor máximo do imóvel varia por localidade (regiões
				metropolitanas e capitais têm tetos maiores dentro de cada
				faixa) e o subsídio da Faixa 2 depende de renda e região —
				confirme os números atualizados no simulador oficial da Caixa
				antes de fechar negócio.
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import Tag from "primevue/tag"

const faixas = [
	{
		label: "Faixa 1",
		income: "até R$ 3.200",
		maxProperty: "R$ 210 mil a R$ 275 mil",
		subsidy: "até 95% do imóvel",
		rate: "3,75% a 4,25% a.a.",
	},
	{
		label: "Faixa 2",
		income: "R$ 3.200,01 a R$ 5.000",
		maxProperty: "R$ 210 mil a R$ 275 mil",
		subsidy: "até R$ 55 mil",
		rate: "4% a 4,25% a.a.",
	},
	{
		label: "Faixa 3",
		income: "R$ 5.000,01 a R$ 9.600",
		maxProperty: "até R$ 400 mil",
		subsidy: "sem subsídio",
		rate: "abaixo do mercado",
	},
	{
		label: "Faixa 4",
		income: "R$ 9.600,01 a R$ 13.000",
		maxProperty: "até R$ 600 mil",
		subsidy: "sem subsídio",
		rate: "10% a 10,5% a.a.",
	},
]
</script>

<style scoped>
.faixa-card {
	background: rgba(32, 176, 101, 0.06);
	border: 1px solid rgba(32, 176, 101, 0.22);
}
.mcmv-note {
	background: rgba(54, 82, 68, 0.06);
	border: 1px dashed var(--line);
}
</style>
