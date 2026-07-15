<template>
	<div>
		<Message v-if="store.error" severity="error" class="mb-4">{{
			store.error
		}}</Message>

		<div class="grid">
			<div class="col-12 lg:col-5">
				<div
					class="surface-card border-1 border-round-3xl p-4 md:p-5 form-panel"
				>
					<h2 class="display-font text-2xl m-0 mb-4">
						Monte uma simulação
					</h2>
					<form class="grid" @submit.prevent="save">
						<div class="col-12 md:col-6">
							<label for="sim-value" class="block font-bold mb-2"
								>Valor do imóvel</label
							>
							<InputNumber
								id="sim-value"
								v-model="propertyValue"
								mode="currency"
								currency="BRL"
								locale="pt-BR"
								class="w-full"
								:min="0"
							/>
						</div>
						<div class="col-12 md:col-6">
							<label
								for="sim-down"
								class="block font-bold mb-2"
								>Entrada</label
							>
							<InputNumber
								id="sim-down"
								v-model="downPayment"
								mode="currency"
								currency="BRL"
								locale="pt-BR"
								class="w-full"
								:min="0"
							/>
						</div>
						<div class="col-12 md:col-6">
							<label for="sim-rate" class="block font-bold mb-2"
								>Taxa de juros (a.a.)</label
							>
							<InputNumber
								id="sim-rate"
								v-model="annualRate"
								suffix="%"
								locale="pt-BR"
								:min-fraction-digits="1"
								:max-fraction-digits="2"
								class="w-full"
								:min="0.1"
								:max="40"
							/>
							<small class="block mt-2 opacity-60"
								>Referência jul/2026: Caixa 11,19% · Itaú
								11,60% · Bradesco 11,70% · Santander
								11,79%</small
							>
						</div>
						<div class="col-12 md:col-6">
							<label
								for="sim-term"
								class="block font-bold mb-2"
								>Prazo (anos)</label
							>
							<InputNumber
								id="sim-term"
								v-model="termYears"
								class="w-full"
								:min="1"
								:max="35"
							/>
						</div>
						<div class="col-12">
							<label class="block font-bold mb-2"
								>Sistema de amortização</label
							>
							<SelectButton
								v-model="system"
								:options="systemOptions"
								option-label="label"
								option-value="value"
								:allow-empty="false"
								class="w-full system-toggle"
							/>
							<small class="block mt-2 opacity-60">{{
								systemHint
							}}</small>
						</div>
						<div class="col-12 md:col-6">
							<label
								for="sim-lender"
								class="block font-bold mb-2"
								>Financiador</label
							>
							<Select
								id="sim-lender"
								v-model="lender"
								:options="lenderOptions"
								editable
								placeholder="Selecione ou digite"
								class="w-full"
							/>
						</div>
						<div class="col-12 md:col-6">
							<label
								for="sim-name"
								class="block font-bold mb-2"
								>Nome da simulação</label
							>
							<InputText
								id="sim-name"
								v-model="name"
								class="w-full"
								placeholder="Ex.: Apto Vila Mariana - Caixa"
								maxlength="80"
							/>
						</div>
						<div class="col-12 flex justify-content-end mt-2">
							<Button
								type="submit"
								label="Salvar simulação"
								icon="pi pi-bookmark"
								:loading="store.saving"
								:disabled="!canSave"
							/>
						</div>
					</form>
				</div>

				<div
					class="surface-card border-1 border-round-3xl p-4 md:p-5 mt-4 costs-panel"
				>
					<h2 class="display-font text-2xl m-0 mb-1">
						Custo inicial estimado
					</h2>
					<p class="text-sm opacity-60 mt-1 mb-4">
						Além da entrada, some as taxas da compra e o que falta
						comprar para a casa.
					</p>
					<div class="grid">
						<div class="col-6">
							<label
								for="sim-itbi"
								class="block font-bold mb-2 text-sm"
								>ITBI</label
							>
							<InputNumber
								id="sim-itbi"
								v-model="itbiRate"
								suffix="%"
								class="w-full"
								:min="0"
								:max="10"
								:max-fraction-digits="1"
							/>
						</div>
						<div class="col-6">
							<label
								for="sim-registro"
								class="block font-bold mb-2 text-sm"
								>Registro em cartório</label
							>
							<InputNumber
								id="sim-registro"
								v-model="registryRate"
								suffix="%"
								class="w-full"
								:min="0"
								:max="10"
								:max-fraction-digits="1"
							/>
						</div>
						<div class="col-6">
							<label
								for="sim-bank-fees"
								class="block font-bold mb-2 text-sm"
								>Taxas do financiamento</label
							>
							<InputNumber
								id="sim-bank-fees"
								v-model="bankFeesRate"
								suffix="%"
								class="w-full"
								:min="0"
								:max="10"
								:max-fraction-digits="1"
							/>
						</div>
						<div class="col-6">
							<span class="block font-bold mb-2 text-sm"
								>Lista da casa</span
							>
							<div class="furniture-total">
								{{ moneyLabel(furnitureTotal) }}
							</div>
						</div>
					</div>

					<div class="cost-breakdown text-sm mt-4">
						<div class="flex justify-content-between py-1">
							<span>Entrada</span>
							<span>{{ moneyLabel(downPayment || 0) }}</span>
						</div>
						<div class="flex justify-content-between py-1">
							<span
								>ITBI + registro + taxas ({{
									itbiRate + registryRate + bankFeesRate
								}}%)</span
							>
							<span>{{ moneyLabel(purchaseFees) }}</span>
						</div>
						<div class="flex justify-content-between py-1">
							<span>Móveis e itens da casa</span>
							<span>{{ moneyLabel(furnitureTotal) }}</span>
						</div>
						<div
							class="flex justify-content-between py-2 mt-1 total-row"
						>
							<strong>Total para tirar do bolso</strong>
							<strong>{{ moneyLabel(initialCost) }}</strong>
						</div>
					</div>
					<small class="block mt-3 opacity-60">
						Móveis calculados a partir do valor cadastrado em
						<RouterLink to="/casa">Lista para a casa</RouterLink>.
						Escritura pública não entra porque o contrato de
						financiamento já serve como título.
					</small>
				</div>
			</div>

			<div class="col-12 lg:col-7">
				<div
					class="border-round-3xl p-4 md:p-5 h-full result-panel"
				>
					<span
						class="inline-block text-sm uppercase font-bold mb-2 eyebrow"
						>Resultado aproximado</span
					>
					<h2 class="display-font text-3xl m-0 mb-4">
						{{ moneyLabel(result.firstInstallment) }}<span
							class="text-lg font-normal opacity-70"
							>/mês {{ system === 'sac' ? '(1ª parcela)' : '' }}</span
						>
					</h2>
					<div class="grid">
						<div class="col-6 md:col-3">
							<span class="block text-xs uppercase opacity-60 mb-1"
								>Financiado</span
							>
							<strong class="text-lg">{{
								moneyLabel(result.financedAmount)
							}}</strong>
						</div>
						<div class="col-6 md:col-3">
							<span class="block text-xs uppercase opacity-60 mb-1"
								>Última parcela</span
							>
							<strong class="text-lg">{{
								moneyLabel(result.lastInstallment)
							}}</strong>
						</div>
						<div class="col-6 md:col-3">
							<span class="block text-xs uppercase opacity-60 mb-1"
								>Total de juros</span
							>
							<strong class="text-lg">{{
								moneyLabel(result.totalInterest)
							}}</strong>
						</div>
						<div class="col-6 md:col-3">
							<span class="block text-xs uppercase opacity-60 mb-1"
								>Total pago</span
							>
							<strong class="text-lg">{{
								moneyLabel(result.totalPaid)
							}}</strong>
						</div>
					</div>
					<p class="text-sm line-height-3 opacity-80 mt-4 mb-0">
						Estimativa simplificada (sem TR, seguros MIP/DFI ou
						tarifas). Para decidir de fato, compare o CET de
						cada banco.
					</p>
				</div>
			</div>
		</div>

		<div v-if="store.items.length" class="mt-5">
			<h2 class="display-font text-2xl mb-3">Simulações salvas</h2>
			<div class="grid">
				<div
					v-for="simulation in store.items"
					:key="simulation.id"
					class="col-12 md:col-6 lg:col-4"
				>
					<article
						class="surface-card border-1 border-round-3xl p-4 h-full saved-card"
					>
						<div
							class="flex align-items-start justify-content-between gap-2 mb-2"
						>
							<h3 class="display-font text-lg m-0">
								{{ simulation.name }}
							</h3>
							<Button
								icon="pi pi-times"
								text
								rounded
								severity="secondary"
								aria-label="Remover simulação"
								@click="requestDelete(simulation)"
							/>
						</div>
						<div class="flex flex-wrap gap-2 mb-3">
							<Tag :value="simulation.lender" severity="secondary" />
							<Tag
								:value="simulation.system === 'sac' ? 'SAC' : 'Price'"
								severity="info"
							/>
							<Tag
								:value="`${simulation.termMonths / 12} anos`"
								severity="secondary"
							/>
						</div>
						<div class="text-sm line-height-3 opacity-80">
							<div class="flex justify-content-between">
								<span>1ª parcela</span>
								<strong>{{
									moneyLabel(simulation.firstInstallment)
								}}</strong>
							</div>
							<div class="flex justify-content-between">
								<span>Última parcela</span>
								<strong>{{
									moneyLabel(simulation.lastInstallment)
								}}</strong>
							</div>
							<div class="flex justify-content-between">
								<span>Total de juros</span>
								<strong>{{
									moneyLabel(simulation.totalInterest)
								}}</strong>
							</div>
						</div>
					</article>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, shallowRef } from "vue"
import { RouterLink } from "vue-router"
import Button from "primevue/button"
import InputNumber from "primevue/inputnumber"
import InputText from "primevue/inputtext"
import Message from "primevue/message"
import Select from "primevue/select"
import SelectButton from "primevue/selectbutton"
import Tag from "primevue/tag"
import { api } from "@/services/api"
import { useFinancingStore } from "@/stores/financing"
import { calculateFinancing } from "@/utils/financing"
import type { AmortizationSystem, FinancingSimulation, FurnitureItem } from "@/types"

const store = useFinancingStore()

const propertyValue = shallowRef(500_000)
const downPayment = shallowRef(100_000)
const annualRate = shallowRef(11.19)
const termYears = shallowRef(30)
const system = shallowRef<AmortizationSystem>("sac")
const lender = shallowRef("Caixa")
const name = shallowRef("")

const itbiRate = shallowRef(3)
const registryRate = shallowRef(1)
const bankFeesRate = shallowRef(2)
const furnitureTotal = shallowRef(0)

const systemOptions = [
	{ label: "SAC", value: "sac" as const },
	{ label: "Price", value: "price" as const },
]
const lenderOptions = [
	"Banco do Brasil",
	"Caixa",
	"BRB",
	"Itaú",
	"Bradesco",
	"Santander",
	"Sicoob",
	"Sicredi",
	"Banrisul",
	"Inter",
	"Outro",
]

const systemHint = computed(() =>
	system.value === "sac"
		? "Parcelas decrescentes e menos juros no total — melhor se você pretende amortizar antecipadamente."
		: "Parcela fixa do início ao fim — mais fácil de aprovar e de planejar o orçamento.",
)

const termMonths = computed(() => Math.round(termYears.value * 12))

const result = computed(() =>
	calculateFinancing({
		propertyValue: propertyValue.value || 0,
		downPayment: downPayment.value || 0,
		annualRate: annualRate.value || 0,
		termMonths: termMonths.value || 0,
		system: system.value,
	}),
)

const purchaseFees = computed(
	() => ((propertyValue.value || 0) * (itbiRate.value + registryRate.value + bankFeesRate.value)) / 100,
)
const initialCost = computed(() => (downPayment.value || 0) + purchaseFees.value + furnitureTotal.value)

const canSave = computed(
	() =>
		name.value.trim().length >= 2 &&
		lender.value.trim().length >= 2 &&
		result.value.financedAmount > 0,
)

function moneyLabel(value: number) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
		maximumFractionDigits: 0,
	}).format(value)
}

async function save() {
	if (!canSave.value) return
	try {
		await store.create({
			name: name.value.trim(),
			propertyValue: propertyValue.value,
			downPayment: downPayment.value,
			financedAmount: result.value.financedAmount,
			annualRate: annualRate.value,
			termMonths: termMonths.value,
			system: system.value,
			lender: lender.value.trim(),
			firstInstallment: result.value.firstInstallment,
			lastInstallment: result.value.lastInstallment,
			totalPaid: result.value.totalPaid,
			totalInterest: result.value.totalInterest,
		})
		name.value = ""
	} catch {
		/* erro exibido via store.error */
	}
}

function requestDelete(simulation: FinancingSimulation) {
	if (window.confirm(`Remover a simulação “${simulation.name}”?`)) {
		store.remove(simulation.id)
	}
}

async function loadFurnitureTotal() {
	try {
		const { data } = await api.get<FurnitureItem[]>("/furniture/items")
		furnitureTotal.value = data.reduce((sum, item) => sum + (item.price ?? 0), 0)
	} catch {
		furnitureTotal.value = 0
	}
}

onMounted(() => {
	store.load()
	loadFurnitureTotal()
})
</script>

<style scoped>
.form-panel {
	border-color: var(--line) !important;
}
.costs-panel {
	border-color: var(--line) !important;
}
.furniture-total {
	height: 2.75rem;
	display: flex;
	align-items: center;
	padding: 0 0.75rem;
	border-radius: 6px;
	background: rgba(54, 82, 68, 0.06);
	font-weight: 700;
}
.cost-breakdown {
	border-top: 1px solid var(--line);
	padding-top: 0.75rem;
}
.total-row {
	border-top: 1px dashed var(--line);
}
.result-panel {
	color: var(--cream);
	background: var(--forest);
	box-shadow: 0 18px 45px rgba(54, 82, 68, 0.16);
}
.eyebrow {
	letter-spacing: 0.14em;
	color: var(--cream);
	opacity: 0.75;
}
.saved-card {
	border-color: var(--line) !important;
}
.system-toggle :deep(.p-togglebutton) {
	flex: 1;
}
</style>
