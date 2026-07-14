const PROPERTY_TYPES = {
    apartamento: 'Apartamento',
    casa: 'Casa',
    cobertura: 'Cobertura',
    kitnet: 'Kitnet',
    loft: 'Loft',
    studio: 'Studio',
    terreno: 'Terreno',
};
const ACCENTED_WORDS = {
    condominio: 'Condomínio',
    dormitorios: 'dormitórios',
    petropolis: 'Petrópolis',
    sabara: 'Sabará',
    sao: 'São',
    sebastiao: 'Sebastião',
};
const LOWERCASE_WORDS = new Set(['a', 'as', 'com', 'da', 'das', 'de', 'do', 'dos', 'e', 'em']);
function humanizeSlug(value) {
    return value
        .split('-')
        .filter(Boolean)
        .map((word, index) => {
        const normalized = word.toLowerCase();
        if (ACCENTED_WORDS[normalized])
            return ACCENTED_WORDS[normalized];
        if (index > 0 && LOWERCASE_WORDS.has(normalized))
            return normalized;
        return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    })
        .join(' ');
}
function detailsToMetadata(details, source) {
    const type = details.type ? (PROPERTY_TYPES[details.type.toLowerCase()] ?? humanizeSlug(details.type)) : 'Imóvel';
    const rooms = details.rooms
        ? ` com ${details.rooms} ${details.rooms === 1 ? 'quarto' : 'quartos'}`
        : '';
    const area = details.area ? ` · ${details.area.replace('.', ',')} m²` : '';
    const neighborhood = details.neighborhood ? humanizeSlug(details.neighborhood) : '';
    const city = details.city ? humanizeSlug(details.city) : '';
    const location = [neighborhood, city].filter(Boolean).join(', ') || null;
    return {
        title: `${type}${rooms}${area}` || `Anúncio em ${source}`,
        price: details.price ?? null,
        location,
    };
}
function parseVivaReal(slug, source) {
    const prefix = slug.match(/^(?<type>[a-z]+)-(?<rooms>\d+)-quartos-(?<neighborhood>.+?)-bairros-(?<tail>.+)$/i);
    const prefixGroups = prefix?.groups;
    if (!prefixGroups?.type || !prefixGroups.rooms || !prefixGroups.neighborhood || !prefixGroups.tail)
        return null;
    const tail = prefixGroups.tail.match(/^(?<cityAndFeatures>.+)-(?<area>\d+(?:[.,]\d+)?)m2-(?:venda|aluguel)-rs(?<price>\d+)-id-\d+$/i);
    const tailGroups = tail?.groups;
    if (!tailGroups?.cityAndFeatures || !tailGroups.area || !tailGroups.price)
        return null;
    return detailsToMetadata({
        type: prefixGroups.type,
        rooms: Number(prefixGroups.rooms),
        neighborhood: prefixGroups.neighborhood,
        city: tailGroups.cityAndFeatures.split('-com-')[0],
        area: tailGroups.area,
        price: Number(tailGroups.price),
    }, source);
}
function parseZap(slug, source) {
    const match = slug.match(/^(?:venda|aluguel)-(?<type>[a-z]+)-(?<rooms>\d+)-quartos-(?<place>.+)-porto-alegre-rs-(?<area>\d+(?:[.,]\d+)?)m2-id-\d+$/i);
    const groups = match?.groups;
    if (!groups?.type || !groups.rooms || !groups.place || !groups.area)
        return null;
    return detailsToMetadata({
        type: groups.type,
        rooms: Number(groups.rooms),
        neighborhood: groups.place.replace(/^(?:mobiliado|com-[^-]+)-/i, ''),
        city: 'porto-alegre',
        area: groups.area,
    }, source);
}
function parseImovelWeb(slug, source) {
    const locationFirst = slug.match(/^(?<type>[a-z]+)-a-venda-(?<neighborhood>.+)-(?<rooms>\d+)-quartos-(?<area>\d+(?:[.,]\d+)?)-\d+$/i);
    if (locationFirst?.groups) {
        return detailsToMetadata({
            type: locationFirst.groups.type,
            rooms: Number(locationFirst.groups.rooms),
            neighborhood: locationFirst.groups.neighborhood,
            area: locationFirst.groups.area,
        }, source);
    }
    const roomsFirst = slug.match(/^(?<type>[a-z]+)-(?<rooms>\d+)-dormitorios-(?<area>\d+(?:[.,]\d+)?)-m-em-(?<neighborhood>.+)-\d+$/i);
    if (roomsFirst?.groups) {
        return detailsToMetadata({
            type: roomsFirst.groups.type,
            rooms: Number(roomsFirst.groups.rooms),
            neighborhood: roomsFirst.groups.neighborhood,
            area: roomsFirst.groups.area,
        }, source);
    }
    const locationOnly = slug.match(/^(?<type>[a-z]+)-em-(?<neighborhood>.+)-\d+$/i);
    if (locationOnly?.groups) {
        return detailsToMetadata({
            type: locationOnly.groups.type,
            neighborhood: locationOnly.groups.neighborhood,
        }, source);
    }
    return null;
}
function parseCreditoReal(slug, source) {
    const match = slug.match(/^(?<type>[a-z]+)-em-(?<neighborhood>.+)-porto-alegre-ag-\d+-cod-\d+$/i);
    if (!match?.groups)
        return null;
    return detailsToMetadata({
        type: match.groups.type,
        neighborhood: match.groups.neighborhood,
        city: 'porto-alegre',
    }, source);
}
function parseWimoveis(slug, source) {
    const match = slug.match(/^(?<rooms>\d+)-dormitorios-(?<location>.+)-\d+$/i);
    const groups = match?.groups;
    if (!groups?.rooms || !groups.location)
        return null;
    return detailsToMetadata({
        rooms: Number(groups.rooms),
        neighborhood: groups.location,
    }, source);
}
function parseGenericSlug(slug, source) {
    const cleaned = slug
        .replace(/\.html?$/i, '')
        .replace(/-(?:id-)?\d{6,}$/i, '')
        .replace(/^(?:comprar|aluguel|venda)-/i, '');
    const readable = humanizeSlug(cleaned);
    return {
        title: readable.length >= 8 ? readable.slice(0, 180) : `Anúncio em ${source}`,
        price: null,
        location: null,
    };
}
export function extractPropertyUrlMetadata(rawUrl) {
    const url = new URL(rawUrl);
    const source = url.hostname.replace(/^www\./, '');
    const segments = decodeURIComponent(url.pathname)
        .split('/')
        .map((segment) => segment.trim())
        .filter(Boolean);
    const slug = [...segments].reverse().find((segment) => /[a-z]/i.test(segment)) ?? '';
    if (source.endsWith('vivareal.com.br'))
        return parseVivaReal(slug, source) ?? parseGenericSlug(slug, source);
    if (source.endsWith('zapimoveis.com.br'))
        return parseZap(slug, source) ?? parseGenericSlug(slug, source);
    if (source.endsWith('imovelweb.com.br'))
        return parseImovelWeb(slug.replace(/\.html?$/i, ''), source) ?? parseGenericSlug(slug, source);
    if (source.endsWith('creditoreal.com.br'))
        return parseCreditoReal(slug, source) ?? parseGenericSlug(slug, source);
    if (source.endsWith('wimoveis.com.br'))
        return parseWimoveis(slug.replace(/\.html?$/i, ''), source) ?? parseGenericSlug(slug, source);
    return parseImovelWeb(slug.replace(/\.html?$/i, ''), source) ?? parseGenericSlug(slug, source);
}
