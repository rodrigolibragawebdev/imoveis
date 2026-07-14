import{n as e,r as t,t as n}from"./api-DVfhv6_X.js";import{$ as r,Ct as i,Ot as a,Q as o,St as s,X as c,Z as l,at as u,bt as d,dt as f,et as p,ft as m,it as h,l as g,lt as _,nt as v,ot as y,q as b,st as x,t as S,tt as C,u as w,ut as T,wt as E,yt as D,z as O}from"./index-BqZM3z1k.js";import{n as ee,r as k,t as A}from"./baseinput-D4_zp2FO.js";import{t as j}from"./tag-CPpw5-Ra.js";var M=w.extend({name:`textarea`,style:`
    .p-textarea {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('textarea.color');
        background: dt('textarea.background');
        padding-block: dt('textarea.padding.y');
        padding-inline: dt('textarea.padding.x');
        border: 1px solid dt('textarea.border.color');
        transition:
            background dt('textarea.transition.duration'),
            color dt('textarea.transition.duration'),
            border-color dt('textarea.transition.duration'),
            outline-color dt('textarea.transition.duration'),
            box-shadow dt('textarea.transition.duration');
        appearance: none;
        border-radius: dt('textarea.border.radius');
        outline-color: transparent;
        box-shadow: dt('textarea.shadow');
    }

    .p-textarea:enabled:hover {
        border-color: dt('textarea.hover.border.color');
    }

    .p-textarea:enabled:focus {
        border-color: dt('textarea.focus.border.color');
        box-shadow: dt('textarea.focus.ring.shadow');
        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');
        outline-offset: dt('textarea.focus.ring.offset');
    }

    .p-textarea.p-invalid {
        border-color: dt('textarea.invalid.border.color');
    }

    .p-textarea.p-variant-filled {
        background: dt('textarea.filled.background');
    }

    .p-textarea.p-variant-filled:enabled:hover {
        background: dt('textarea.filled.hover.background');
    }

    .p-textarea.p-variant-filled:enabled:focus {
        background: dt('textarea.filled.focus.background');
    }

    .p-textarea:disabled {
        opacity: 1;
        background: dt('textarea.disabled.background');
        color: dt('textarea.disabled.color');
    }

    .p-textarea::placeholder {
        color: dt('textarea.placeholder.color');
    }

    .p-textarea.p-invalid::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }

    .p-textarea-fluid {
        width: 100%;
    }

    .p-textarea-resizable {
        overflow: hidden;
        resize: none;
    }

    .p-textarea-sm {
        font-size: dt('textarea.sm.font.size');
        padding-block: dt('textarea.sm.padding.y');
        padding-inline: dt('textarea.sm.padding.x');
    }

    .p-textarea-lg {
        font-size: dt('textarea.lg.font.size');
        padding-block: dt('textarea.lg.padding.y');
        padding-inline: dt('textarea.lg.padding.x');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-textarea p-component`,{"p-filled":t.$filled,"p-textarea-resizable ":n.autoResize,"p-textarea-sm p-inputfield-sm":n.size===`small`,"p-textarea-lg p-inputfield-lg":n.size===`large`,"p-invalid":t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-textarea-fluid":t.$fluid}]}}}),N={name:`BaseTextarea`,extends:A,props:{autoResize:Boolean},style:M,provide:function(){return{$pcTextarea:this,$parentInstance:this}}};function P(e){"@babel/helpers - typeof";return P=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},P(e)}function F(e,t,n){return(t=I(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function I(e){var t=L(e,`string`);return P(t)==`symbol`?t:t+``}function L(e,t){if(P(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(P(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var R={name:`Textarea`,extends:N,inheritAttrs:!1,observer:null,mounted:function(){var e=this;this.autoResize&&(this.observer=new ResizeObserver(function(){requestAnimationFrame(function(){e.resize()})}),this.observer.observe(this.$el))},updated:function(){this.autoResize&&this.resize()},beforeUnmount:function(){this.observer&&this.observer.disconnect()},methods:{resize:function(){if(this.$el.offsetParent){var e=this.$el.style.height,t=parseInt(e)||0,n=this.$el.scrollHeight;t&&n<t?(this.$el.style.height=`auto`,this.$el.style.height=`${this.$el.scrollHeight}px`):(!t||n>t)&&(this.$el.style.height=`${n}px`)}},onInput:function(e){this.autoResize&&this.resize(),this.writeValue(e.target.value,e)}},computed:{attrs:function(){return _(this.ptmi(`root`,{context:{filled:this.$filled,disabled:this.disabled}}),this.formField)},dataP:function(){return O(F({invalid:this.$invalid,fluid:this.$fluid,filled:this.$variant===`filled`},this.size,this.size))}}},z=[`value`,`name`,`disabled`,`aria-invalid`,`data-p`];function B(e,t,n,r,i,a){return f(),v(`textarea`,_({class:e.cx(`root`),value:e.d_value,name:e.name,disabled:e.disabled,"aria-invalid":e.invalid||void 0,"data-p":a.dataP,onInput:t[0]||=function(){return a.onInput&&a.onInput.apply(a,arguments)}},a.attrs),null,16,z)}R.render=B;var V={class:`surface-card border-1 border-round-3xl overflow-hidden flex flex-column property-card`},H={class:`relative card-media`},U=[`href`,`aria-label`],W=[`src`,`alt`],te={key:1,class:`w-full h-full flex align-items-center justify-content-center media-fallback`},G={class:`p-4 flex flex-column flex-1`},K={class:`flex justify-content-between align-items-start gap-3 mb-2`},q={class:`display-font text-2xl line-height-2 m-0 text-ink`},J={class:`font-bold text-terracotta white-space-nowrap`},Y={key:0,class:`m-0 mb-3 text-sm opacity-60`},X={class:`mt-auto`},Z={class:`grid grid-nogutter gap-2 mb-4`,role:`group`,"aria-label":`Avaliação do imóvel`},Q=[`for`],ne=[`href`],re=S(x({__name:`PropertyCard`,props:{property:{}},emits:[`review`,`delete`],setup(e,{emit:t}){let n=e,s=t,c=i(n.property.note),d=i(!1),p=[{value:`liked`,label:`+1`,icon:`pi pi-thumbs-up`,severity:`success`},{value:`disliked`,label:`−1`,icon:`pi pi-thumbs-down`,severity:`warn`},{value:`terrible`,label:`Muito ruim`,icon:`pi pi-times-circle`,severity:`danger`}],h=o(()=>n.property.price===null?`Preço não lido`:new Intl.NumberFormat(`pt-BR`,{style:`currency`,currency:`BRL`,maximumFractionDigits:0}).format(n.property.price));D(()=>n.property.note,e=>{c.value=e}),D(()=>n.property.imageUrl,()=>{d.value=!1});function g(e){s(`review`,{id:n.property.id,rating:n.property.rating===e?null:e,note:c.value.trim()})}function _(){let e=c.value.trim();e!==n.property.note&&s(`review`,{id:n.property.id,rating:n.property.rating,note:e})}function b(){window.confirm(`Remover este imóvel da comparação?`)&&s(`delete`,n.property.id)}return(t,n)=>(f(),v(`article`,V,[r(`div`,H,[r(`a`,{href:e.property.url,target:`_blank`,rel:`noopener noreferrer`,class:`block w-full h-full media-link`,"aria-label":`Abrir anúncio: ${e.property.title}`},[e.property.imageUrl&&!d.value?(f(),v(`img`,{key:0,src:e.property.imageUrl,alt:e.property.title,class:`w-full h-full object-cover`,loading:`lazy`,referrerpolicy:`no-referrer`,onError:n[0]||=e=>d.value=!0},null,40,W)):(f(),v(`div`,te,[...n[2]||=[r(`i`,{class:`pi pi-building text-5xl opacity-30`},null,-1)]])),n[3]||=r(`span`,{class:`absolute media-link-hint`},[u(` Abrir anúncio `),r(`i`,{class:`pi pi-arrow-up-right text-xs`})],-1)],8,U),y(E(j),{value:e.property.source,severity:`secondary`,class:`absolute top-0 left-0 m-3`},null,8,[`value`]),y(E(k),{icon:`pi pi-trash`,severity:`secondary`,text:``,rounded:``,"aria-label":`Remover imóvel`,class:`absolute top-0 right-0 m-2 media-action`,onClick:b})]),r(`div`,G,[r(`div`,K,[r(`h2`,q,a(e.property.title),1),r(`span`,J,a(h.value),1)]),e.property.location?(f(),v(`p`,Y,[n[4]||=r(`i`,{class:`pi pi-map-marker mr-1`},null,-1),u(a(e.property.location),1)])):C(``,!0),r(`div`,X,[n[6]||=r(`span`,{class:`block text-xs uppercase font-bold opacity-50 mb-2 tracking-wide`},`Meu voto`,-1),r(`div`,Z,[(f(),v(l,null,m(p,t=>y(E(k),{key:t.value,label:t.label,icon:t.icon,size:`small`,severity:e.property.rating===t.value?t.severity:`secondary`,outlined:e.property.rating!==t.value,class:`flex-1 text-xs`,onClick:e=>g(t.value)},null,8,[`label`,`icon`,`severity`,`outlined`,`onClick`])),64))]),r(`label`,{for:`note-${e.property.id}`,class:`block text-xs uppercase font-bold opacity-50 mb-2 tracking-wide`},`Por que sim ou não?`,8,Q),y(E(R),{id:`note-${e.property.id}`,modelValue:c.value,"onUpdate:modelValue":n[1]||=e=>c.value=e,rows:`2`,"auto-resize":``,maxlength:`280`,class:`w-full text-sm`,placeholder:`Ex.: rua barulhenta, ótima varanda...`,onBlur:_},null,8,[`id`,`modelValue`]),r(`a`,{href:e.property.url,target:`_blank`,rel:`noopener noreferrer`,class:`inline-flex align-items-center gap-2 mt-3 text-sm font-bold text-forest no-underline`},[...n[5]||=[u(` Abrir anúncio `,-1),r(`i`,{class:`pi pi-arrow-up-right text-xs`},null,-1)]],8,ne)])])]))}}),[[`__scopeId`,`data-v-d851f3e8`]]),ie={class:`flex flex-column md:flex-row md:align-items-end gap-4`},ae={class:`flex-1`},oe=S(x({__name:`PropertyLinkForm`,props:{loading:{type:Boolean}},emits:[`submit`],setup(e,{emit:n}){let o=n,s=i(``),l=i(``);function m(){let e=s.value.split(/[\n,]+/).map(e=>e.trim()).filter(Boolean),t=e.find(e=>{try{return![`http:`,`https:`].includes(new URL(e).protocol)}catch{return!0}});if(t){l.value=`Confira este link: ${t}`;return}if(e.length>20){l.value=`Envie no máximo 20 links de cada vez.`;return}l.value=``,o(`submit`,[...new Set(e)]),s.value=``}return(n,i)=>(f(),v(`form`,{class:`surface-card border-1 border-round-3xl p-4 md:p-5 form-panel`,onSubmit:c(m,[`prevent`])},[r(`div`,ie,[r(`div`,ae,[i[1]||=r(`label`,{for:`property-links`,class:`block font-bold text-ink mb-2`},`Links dos imóveis`,-1),y(E(R),{id:`property-links`,modelValue:s.value,"onUpdate:modelValue":i[0]||=e=>s.value=e,rows:`3`,"auto-resize":``,class:`w-full`,placeholder:`Cole um link por linha
https://site.com.br/imovel-1`,disabled:e.loading},null,8,[`modelValue`,`disabled`]),i[2]||=r(`small`,{class:`block mt-2 opacity-60`},`Até 20 links. Título, imagem e preço serão buscados quando o site permitir.`,-1)]),y(E(k),{type:`submit`,label:`Montar os cards`,icon:`pi pi-sparkles`,class:`white-space-nowrap`,loading:e.loading,disabled:!s.value.trim()},null,8,[`loading`,`disabled`])]),l.value?(f(),p(E(t),{key:0,severity:`warn`,class:`mt-3 mb-0`},{default:d(()=>[u(a(l.value),1)]),_:1})):C(``,!0)],32))}}),[[`__scopeId`,`data-v-4264add1`]]),$=b(`properties`,()=>{let t=s([]),r=i(!1),a=i(!1),o=i(``);async function c(){r.value=!0,o.value=``;try{let{data:e}=await n.get(`/properties`);t.value=e}catch(t){o.value=e(t)}finally{r.value=!1}}async function l(r){a.value=!0,o.value=``;try{let{data:e}=await n.post(`/properties/bulk`,{links:r}),i=new Set(e.map(e=>e.id));return t.value=[...e,...t.value.filter(e=>!i.has(e.id))],e.length}catch(t){throw o.value=e(t),t}finally{a.value=!1}}async function u(r,i,a){try{let{data:e}=await n.patch(`/properties/${r}/review`,{rating:i,note:a});t.value=t.value.map(t=>t.id===r?e:t)}catch(t){throw o.value=e(t),t}}async function d(r){try{await n.delete(`/properties/${r}`),t.value=t.value.filter(e=>e.id!==r)}catch(t){throw o.value=e(t),t}}return{items:t,loading:r,saving:a,error:o,load:c,addLinks:l,updateReview:u,remove:d}}),se={class:`max-w-7xl mx-auto`},ce={key:1,class:`grid mt-4`},le={key:2,class:`grid mt-4 md:mt-5`},ue={key:3,class:`text-center py-8 px-3`},de=S(x({__name:`PropertyBoard`,setup(e){let n=$(),i=g();T(n.load);async function o(e){try{let t=await n.addLinks(e);i.add({severity:`success`,summary:`Cards prontos`,detail:`${t} imóvel(is) na comparação.`,life:3e3})}catch{i.add({severity:`error`,summary:`Não foi possível cadastrar`,detail:n.error,life:4500})}}async function s(e){try{await n.updateReview(e.id,e.rating,e.note)}catch{i.add({severity:`error`,summary:`Avaliação não salva`,detail:n.error,life:4e3})}}async function c(e){try{await n.remove(e),i.add({severity:`secondary`,summary:`Imóvel removido`,life:2200})}catch{i.add({severity:`error`,summary:`Não foi possível remover`,detail:n.error,life:4e3})}}return(e,i)=>(f(),v(`section`,se,[i[1]||=h(`<div class="grid align-items-end mb-5 md:mb-6" data-v-811e8f42><div class="col-12 md:col-8" data-v-811e8f42><span class="inline-block text-sm uppercase font-bold text-terracotta mb-2 eyebrow" data-v-811e8f42>Comparar sem complicar</span><h1 class="display-font text-5xl md:text-7xl line-height-1 m-0 text-ink" data-v-811e8f42>Qual lugar parece<br data-v-811e8f42><em data-v-811e8f42>mais casa?</em></h1></div><div class="col-12 md:col-4" data-v-811e8f42><p class="text-lg line-height-3 opacity-70 mb-0" data-v-811e8f42>Cole os anúncios, vote e registre as impressões enquanto elas ainda estão frescas.</p></div></div>`,1),y(oe,{loading:E(n).saving,onSubmit:o},null,8,[`loading`]),E(n).error?(f(),p(E(t),{key:0,severity:`error`,class:`mt-4`},{default:d(()=>[u(a(E(n).error),1)]),_:1})):C(``,!0),E(n).loading?(f(),v(`div`,ce,[(f(),v(l,null,m(3,e=>r(`div`,{key:e,class:`col-12 md:col-6 xl:col-4`},[y(E(ee),{height:`34rem`,"border-radius":`1.5rem`})])),64))])):E(n).items.length?(f(),v(`div`,le,[(f(!0),v(l,null,m(E(n).items,e=>(f(),v(`div`,{key:e.id,class:`col-12 md:col-6 xl:col-4`},[y(re,{property:e,onReview:s,onDelete:c},null,8,[`property`])]))),128))])):(f(),v(`div`,ue,[...i[0]||=[r(`span`,{class:`empty-icon inline-flex align-items-center justify-content-center mb-4`},[r(`i`,{class:`pi pi-map text-4xl`})],-1),r(`h2`,{class:`display-font text-3xl m-0 mb-2`},`A comparação começa vazia.`,-1),r(`p`,{class:`opacity-60 m-0`},`Cole os primeiros links acima e cada anúncio ganha seu próprio card.`,-1)]]))]))}}),[[`__scopeId`,`data-v-811e8f42`]]),fe=x({__name:`PropertiesView`,setup(e){return(e,t)=>(f(),p(de))}});export{fe as default};