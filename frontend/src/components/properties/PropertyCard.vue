<template>
	<article
		class="surface-card border-1 border-round-3xl overflow-hidden flex flex-column property-card"
	>
		<div class="relative card-media">
			<a
				:href="property.url"
				target="_blank"
				rel="noopener noreferrer"
				class="block w-full h-full media-link"
				:aria-label="`Abrir anúncio: ${property.title}`"
			>
				<img
					v-if="property.imageUrl && !imageFailed"
					:src="property.imageUrl"
					:alt="property.title"
					class="w-full h-full object-cover"
					loading="lazy"
					referrerpolicy="no-referrer"
					@error="imageFailed = true"
				/>
				<div
					v-else
					class="w-full h-full flex align-items-center justify-content-center media-fallback"
				>
					<i class="pi pi-building text-5xl opacity-30" />
				</div>
				<span class="absolute media-link-hint"
					>Abrir anúncio <i class="pi pi-arrow-up-right text-xs"
				/></span>
			</a>

			<div
				class="absolute top-0 left-0 m-3 flex flex-wrap align-items-center gap-2 card-labels"
			>
				<span
					v-if="position"
					class="rank-position"
					:aria-label="`Posição ${position} no ranking`"
					>#{{ position }}</span
				>
				<Button
					:label="property.agencyName ?? 'Adicionar imobiliária'"
					:icon="property.agencyName ? 'pi pi-pencil' : 'pi pi-plus'"
					severity="secondary"
					size="small"
					class="agency-label"
					:aria-label="agencyButtonLabel"
					@click="toggleAgencyEditor"
				/>
			</div>
			<Button
				icon="pi pi-trash"
				severity="secondary"
				text
				rounded
				aria-label="Remover imóvel"
				class="absolute top-0 right-0 m-2 media-action"
				@click="requestDelete"
			/>
		</div>

		<Popover ref="agencyPopover">
			<div class="agency-editor">
				<span class="block text-xs uppercase font-bold text-terracotta tracking-wide mb-1">Imobiliária</span>
				<strong class="block text-ink mb-1">{{ property.agencyName ?? 'Ainda não identificada' }}</strong>
				<small class="block opacity-60 line-height-3 mb-3">
					{{ property.agencyMatchMode === 'manual' ? 'Escolha manual preservada nas reavaliações.' : 'Identificação automática pela URL.' }}
				</small>
				<Select
					v-model="agencyDraft"
					:options="agencies"
					option-label="name"
					option-value="id"
					show-clear
					filter
					placeholder="Selecionar imobiliária"
					class="w-full"
				/>
				<div class="flex justify-content-end gap-2 mt-3">
					<Button label="Gerenciar lista" severity="secondary" text size="small" @click="manageAgencies" />
					<Button label="Salvar" icon="pi pi-check" size="small" @click="saveAgency" />
				</div>
				<Button
					label="Voltar à identificação automática"
					icon="pi pi-refresh"
					severity="secondary"
					text
					size="small"
					class="w-full mt-1"
					@click="useAutomaticAgency"
				/>
			</div>
		</Popover>

		<div class="p-4 flex flex-column flex-1">
			<div
				v-if="property.isPreferredNeighborhood || property.hasDuplicates"
				class="flex flex-wrap gap-2 mb-3"
			>
				<Tag
					v-if="property.isPreferredNeighborhood"
					:value="
						property.matchedNeighborhood
							? `Bairro desejado · ${property.matchedNeighborhood}`
							: 'Bairro desejado'
					"
					icon="pi pi-heart-fill"
					severity="success"
					rounded
				/>
				<Tag
					v-if="property.hasDuplicates"
					:value="`${property.duplicateMatches.length} possível(is) duplicata(s)`"
					icon="pi pi-clone"
					severity="info"
					rounded
				/>
			</div>

			<div
				class="flex flex-column justify-content-between align-items-start gap-3 mb-2"
			>
				<h2
					class="display-font text-2xl line-height-2 m-0 text-ink flex-order-1"
					:title="property.title"
				>
					{{ property.title }}
				</h2>
				<span
					class="font-bold text-terracotta white-space-nowrap flex-order-0"
					>{{ priceLabel }}</span
				>
			</div>
			<p v-if="property.location" class="m-0 mb-3 text-sm opacity-60">
				<i class="pi pi-map-marker mr-1" />{{ property.location }}
			</p>
			<div
				v-if="property.hasDuplicates"
				class="duplicate-note text-sm line-height-3 mb-3"
			>
				<i class="pi pi-info-circle mr-2" />{{ duplicateSummary }}
			</div>

			<div class="mt-auto">
				<span
					class="block text-xs uppercase font-bold opacity-50 mb-2 tracking-wide"
					>Meu voto</span
				>
				<div
					class="grid grid-nogutter gap-2 mb-3"
					role="group"
					aria-label="Avaliação do imóvel"
				>
					<Button
						v-for="option in ratingOptions"
						:key="option.value"
						:label="option.label"
						:icon="option.icon"
						size="small"
						:severity="
							property.rating === option.value
								? option.severity
								: 'secondary'
						"
						:outlined="property.rating !== option.value"
						class="flex-1 text-xs"
						@click="setRating(option.value)"
					/>
				</div>

				<div
					v-if="property.rating === 'liked'"
					class="preference-scale mb-4"
				>
					<div
						class="flex align-items-center justify-content-between gap-2 mb-2"
					>
						<div>
							<strong class="text-sm text-ink"
								>Quanto você gostou?</strong
							>
							<small class="block opacity-55 mt-1"
								>Opcional · entra no ranking após
								atualizar</small
							>
						</div>
						<span
							v-if="property.preferenceScore !== null"
							class="preference-value"
							>{{ preferenceDraft }}/10</span
						>
						<span v-else class="text-xs opacity-55">Sem nota</span>
					</div>
					<input
						:id="`preference-${property.id}`"
						v-model.number="preferenceDraft"
						type="range"
						min="0"
						max="10"
						step="1"
						class="w-full preference-input"
						:aria-label="`Quanto você gostou de ${property.title}, de zero a dez`"
						@change="savePreference"
					/>
					<div
						class="flex align-items-center justify-content-between text-xs opacity-55 mt-1"
					>
						<span>0 · pouco</span>
						<Button
							v-if="property.preferenceScore !== null"
							label="Limpar nota"
							size="small"
							severity="secondary"
							text
							class="clear-score"
							@click="clearPreference"
						/>
						<span>10 · amei</span>
					</div>
				</div>

				<label
					:for="`note-${property.id}`"
					class="block text-xs uppercase font-bold opacity-50 mb-2 tracking-wide"
					>Por que sim ou não?</label
				>
				<Textarea
					:id="`note-${property.id}`"
					v-model="note"
					rows="2"
					auto-resize
					maxlength="280"
					class="w-full text-sm"
					placeholder="Ex.: rua barulhenta, ótima varanda..."
					@blur="saveNote"
				/>
				<div class="flex align-items-center justify-content-between gap-2 mt-3">
					<a
						:href="property.url"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex align-items-center gap-2 text-sm font-bold text-forest no-underline"
						>Abrir anúncio <i class="pi pi-arrow-up-right text-xs"
					/></a>
					<Button
						label="Agendar visita"
						icon="pi pi-calendar-plus"
						size="small"
						severity="secondary"
						outlined
						@click="emit('schedule', property.id)"
					/>
				</div>
			</div>
		</div>
	</article>
</template>

<script setup lang="ts">
import { computed, shallowRef, watch } from "vue"
import Button from "primevue/button"
import Popover from "primevue/popover"
import Select from "primevue/select"
import Tag from "primevue/tag"
import Textarea from "primevue/textarea"
import type { Property, PropertyAgencyMatchMode, PropertyRating, RealEstateAgency } from "@/types"

const props = defineProps<{ property: Property; position?: number; agencies: RealEstateAgency[] }>()
const emit = defineEmits<{
	review: [
		payload: {
			id: number
			rating: PropertyRating
			note: string
			preferenceScore: number | null
		},
	]
	delete: [id: number]
	schedule: [id: number]
	agency: [payload: { id: number; agencyId: number | null; mode: PropertyAgencyMatchMode }]
	'manage-agencies': []
}>()
const note = shallowRef(props.property.note)
const preferenceDraft = shallowRef(props.property.preferenceScore ?? 5)
const imageFailed = shallowRef(false)
const agencyDraft = shallowRef<number | null>(props.property.agencyId)
const agencyPopover = shallowRef<InstanceType<typeof Popover> | null>(null)
const ratingOptions = [
	{
		value: "liked" as const,
		label: "+1",
		icon: "pi pi-thumbs-up",
		severity: "success" as const,
	},
	{
		value: "disliked" as const,
		label: "−1",
		icon: "pi pi-thumbs-down",
		severity: "warn" as const,
	},
	{
		value: "terrible" as const,
		label: "Muito ruim",
		icon: "pi pi-times-circle",
		severity: "danger" as const,
	},
]
const priceLabel = computed(() =>
	props.property.price === null
		? "Preço não lido"
		: new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL",
				maximumFractionDigits: 0,
			}).format(props.property.price),
)
const duplicateSummary = computed(
	() =>
		props.property.duplicateMatches[0]?.reason ??
		"Este anúncio se parece com outro imóvel da lista.",
)
const agencyButtonLabel = computed(() => props.property.agencyName
	? `Editar imobiliária ${props.property.agencyName}`
	: 'Adicionar imobiliária manualmente')

watch(
	() => props.property.agencyId,
	(value) => {
		agencyDraft.value = value
	},
)

watch(
	() => props.property.note,
	(value) => {
		note.value = value
	},
)
watch(
	() => props.property.preferenceScore,
	(value) => {
		preferenceDraft.value = value ?? 5
	},
)
watch(
	() => props.property.imageUrl,
	() => {
		imageFailed.value = false
	},
)

function emitReview(rating: PropertyRating, preferenceScore: number | null) {
	emit("review", {
		id: props.property.id,
		rating,
		note: note.value.trim(),
		preferenceScore,
	})
}

function setRating(rating: Exclude<PropertyRating, null>) {
	const nextRating = props.property.rating === rating ? null : rating
	emitReview(
		nextRating,
		nextRating === "liked" ? props.property.preferenceScore : null,
	)
}

function savePreference() {
	emitReview("liked", preferenceDraft.value)
}

function clearPreference() {
	preferenceDraft.value = 5
	emitReview("liked", null)
}

function saveNote() {
	const cleanNote = note.value.trim()
	if (cleanNote !== props.property.note) {
		emit("review", {
			id: props.property.id,
			rating: props.property.rating,
			note: cleanNote,
			preferenceScore: props.property.preferenceScore,
		})
	}
}

function requestDelete() {
	emit("delete", props.property.id)
}
function toggleAgencyEditor(event: Event) {
	agencyDraft.value = props.property.agencyId
	agencyPopover.value?.toggle(event)
}

function saveAgency() {
	emit('agency', { id: props.property.id, agencyId: agencyDraft.value, mode: 'manual' })
	agencyPopover.value?.hide()
}

function useAutomaticAgency() {
	emit('agency', { id: props.property.id, agencyId: null, mode: 'automatic' })
	agencyPopover.value?.hide()
}

function manageAgencies() {
	agencyPopover.value?.hide()
	emit('manage-agencies')
}
</script>

<style scoped>
.property-card {
	border-color: var(--line) !important;
	min-height: 35rem;
	box-shadow: 0 12px 40px rgba(54, 82, 68, 0.07);
	transition:
		transform 0.25s ease,
		box-shadow 0.25s ease;
}
.property-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 20px 50px rgba(54, 82, 68, 0.12);
}
.card-media {
	height: 14rem;
	background: #dce2d6;
}
.media-link {
	color: inherit;
	text-decoration: none;
}
.media-link::after {
	content: "";
	position: absolute;
	inset: 0;
	background: linear-gradient(
		180deg,
		transparent 55%,
		rgba(24, 34, 28, 0.62)
	);
	opacity: 0;
	transition: opacity 0.2s ease;
	pointer-events: none;
}
.media-link:hover::after,
.media-link:focus-visible::after {
	opacity: 1;
}
.media-link:focus-visible {
	outline: 3px solid var(--terracotta);
	outline-offset: -3px;
}
.media-link-hint {
	z-index: 1;
	right: 1rem;
	bottom: 0.85rem;
	color: var(--cream);
	font-size: 0.8rem;
	font-weight: 700;
	opacity: 0;
	transform: translateY(0.35rem);
	transition:
		opacity 0.2s ease,
		transform 0.2s ease;
}
.media-link:hover .media-link-hint,
.media-link:focus-visible .media-link-hint {
	opacity: 1;
	transform: translateY(0);
}
.media-fallback {
	color: var(--forest);
	background: linear-gradient(135deg, #e3ddcc, #d6dfd4);
}
.media-action {
	z-index: 3;
	color: var(--cream) !important;
	background: rgba(38, 48, 41, 0.55) !important;
	backdrop-filter: blur(6px);
}
.card-labels {
	z-index: 2;
	max-width: calc(100% - 4.5rem);
}
.agency-label {
	max-width: min(16rem, calc(100vw - 10rem));
	border: 1px solid rgba(255, 255, 255, .62) !important;
	border-radius: .55rem !important;
	color: var(--forest) !important;
	background: rgba(255, 252, 244, .92) !important;
	box-shadow: 0 5px 16px rgba(24, 34, 28, .12);
	backdrop-filter: blur(8px);
}
.agency-label :deep(.p-button-label) { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.agency-editor { width: min(22rem, calc(100vw - 3rem)); }
.rank-position {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 2.25rem;
	height: 2.25rem;
	padding: 0 0.55rem;
	border-radius: 999px;
	color: var(--cream);
	background: var(--forest);
	font-family: var(--font-display);
	font-weight: 800;
	box-shadow: 0 5px 15px rgba(24, 34, 28, 0.2);
}
.duplicate-note {
	padding: 0.7rem 0.85rem;
	border: 1px dashed rgba(38, 112, 134, 0.32);
	border-radius: 0.85rem;
	color: #285f70;
	background: rgba(66, 151, 177, 0.08);
}
.preference-scale {
	padding: 0.85rem 1rem 0.55rem;
	border: 1px solid rgba(32, 176, 101, 0.22);
	border-radius: 1rem;
	background: linear-gradient(
		135deg,
		rgba(32, 176, 101, 0.08),
		rgba(255, 252, 244, 0.78)
	);
}
.preference-value {
	min-width: 3.25rem;
	padding: 0.35rem 0.55rem;
	border-radius: 999px;
	color: white;
	background: var(--forest);
	text-align: center;
	font-weight: 800;
	font-variant-numeric: tabular-nums;
}
.preference-input {
	accent-color: var(--forest);
	cursor: pointer;
}
.clear-score {
	padding: 0.15rem 0.4rem !important;
}
.tracking-wide {
	letter-spacing: 0.08em;
}
</style>
