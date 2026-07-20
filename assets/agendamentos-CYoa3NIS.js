import{n as e,r as t,t as n}from"./api-CXCW7-t-.js";import{Ct as r,It as i,Q as a,Rt as o,V as s,bt as c,c as l,dt as u,st as d}from"./_plugin-vue_export-helper-DpZpdVsf.js";var f=l.extend({name:`textarea`,style:`
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
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-textarea p-component`,{"p-filled":t.$filled,"p-textarea-resizable ":n.autoResize,"p-textarea-sm p-inputfield-sm":n.size===`small`,"p-textarea-lg p-inputfield-lg":n.size===`large`,"p-invalid":t.$invalid,"p-variant-filled":t.$variant===`filled`,"p-textarea-fluid":t.$fluid}]}}}),p={name:`BaseTextarea`,extends:t,props:{autoResize:Boolean},style:f,provide:function(){return{$pcTextarea:this,$parentInstance:this}}};function m(e){"@babel/helpers - typeof";return m=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},m(e)}function h(e,t,n){return(t=g(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function g(e){var t=_(e,`string`);return m(t)==`symbol`?t:t+``}function _(e,t){if(m(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(m(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var v={name:`Textarea`,extends:p,inheritAttrs:!1,observer:null,mounted:function(){var e=this;this.autoResize&&(this.observer=new ResizeObserver(function(){requestAnimationFrame(function(){e.resize()})}),this.observer.observe(this.$el))},updated:function(){this.autoResize&&this.resize()},beforeUnmount:function(){this.observer&&this.observer.disconnect()},methods:{resize:function(){if(this.$el.offsetParent){var e=this.$el.style.height,t=parseInt(e)||0,n=this.$el.scrollHeight;t&&n<t?(this.$el.style.height=`auto`,this.$el.style.height=`${this.$el.scrollHeight}px`):(!t||n>t)&&(this.$el.style.height=`${n}px`)}},onInput:function(e){this.autoResize&&this.resize(),this.writeValue(e.target.value,e)}},computed:{attrs:function(){return c(this.ptmi(`root`,{context:{filled:this.$filled,disabled:this.disabled}}),this.formField)},dataP:function(){return s(h({invalid:this.$invalid,fluid:this.$fluid,filled:this.$variant===`filled`},this.size,this.size))}}},y=[`value`,`name`,`disabled`,`aria-invalid`,`data-p`];function b(e,t,n,i,a,o){return r(),u(`textarea`,c({class:e.cx(`root`),value:e.d_value,name:e.name,disabled:e.disabled,"aria-invalid":e.invalid||void 0,"data-p":o.dataP,onInput:t[0]||=function(){return o.onInput&&o.onInput.apply(o,arguments)}},o.attrs),null,16,y)}v.render=b;var x=a(`agendamentos`,()=>{let t=i([]),r=o(!1),a=o(!1),s=o(``),c=d(()=>{let e=new Set;for(let n of t.value)n.active&&e.add(n.propertyId);return e});function l(e){let n=t.value.findIndex(t=>t.id===e.id);n===-1?t.value.unshift(e):t.value[n]=e}async function u(){r.value=!0,s.value=``;try{let{data:e}=await n.get(`/agendamentos`);t.value=e}catch(t){s.value=e(t)}finally{r.value=!1}}async function f(t){a.value=!0,s.value=``;try{let{data:e}=await n.post(`/agendamentos`,{propertyId:t});return l(e),e}catch(t){throw s.value=e(t),t}finally{a.value=!1}}async function p(t,r){s.value=``;try{let{data:e}=await n.patch(`/agendamentos/${t}`,{advanced:r});l(e)}catch(t){throw s.value=e(t),t}}async function m(t){s.value=``;try{let{data:e}=await n.post(`/agendamentos/${t}/return`);l(e)}catch(t){throw s.value=e(t),t}}async function h(r){s.value=``;try{await n.delete(`/agendamentos/${r}`),t.value=t.value.filter(e=>e.id!==r)}catch(t){throw s.value=e(t),t}}async function g(t,r){s.value=``;try{let{data:e}=await n.post(`/agendamentos/${t}/notes`,{content:r});l(e)}catch(t){throw s.value=e(t),t}}async function _(r,i){s.value=``;try{await n.delete(`/agendamentos/${r}/notes/${i}`);let e=t.value.find(e=>e.id===r);e&&(e.notes=e.notes.filter(e=>e.id!==i))}catch(t){throw s.value=e(t),t}}async function v(t,r){a.value=!0,s.value=``;try{let e=new FormData;e.append(`photo`,r);let{data:i}=await n.post(`/agendamentos/${t}/photos`,e,{headers:{"Content-Type":void 0}});l(i)}catch(t){throw s.value=e(t),t}finally{a.value=!1}}async function y(r,i){s.value=``;try{await n.delete(`/agendamentos/${r}/photos/${i}`);let e=t.value.find(e=>e.id===r);e&&(e.photos=e.photos.filter(e=>e.id!==i))}catch(t){throw s.value=e(t),t}}return{items:t,loading:r,saving:a,error:s,activeProperties:c,load:u,schedule:f,setAdvanced:p,returnToListing:m,remove:h,addNote:g,removeNote:_,addPhoto:v,removePhoto:y}});export{v as n,x as t};