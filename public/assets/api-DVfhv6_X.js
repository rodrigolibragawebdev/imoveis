import{$ as e,J as t,Tt as n,bt as r,dt as i,et as a,gt as o,ht as s,i as c,lt as l,mt as u,n as d,nt as f,pt as p,s as m,tt as h,u as g,xt as _,z as v}from"./index-BqZM3z1k.js";var y=Object.defineProperty,b=(e,t)=>{let n={};for(var r in e)y(n,r,{get:e[r],enumerable:!0});return t||y(n,Symbol.toStringTag,{value:`Module`}),n},x=g.extend({name:`message`,style:`
    .p-message {
        display: grid;
        grid-template-rows: 1fr;
        border-radius: dt('message.border.radius');
        outline-width: dt('message.border.width');
        outline-style: solid;
    }

    .p-message-content-wrapper {
        min-height: 0;
    }

    .p-message-content {
        display: flex;
        align-items: center;
        padding: dt('message.content.padding');
        gap: dt('message.content.gap');
    }

    .p-message-icon {
        flex-shrink: 0;
    }

    .p-message-close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-inline-start: auto;
        overflow: hidden;
        position: relative;
        width: dt('message.close.button.width');
        height: dt('message.close.button.height');
        border-radius: dt('message.close.button.border.radius');
        background: transparent;
        transition:
            background dt('message.transition.duration'),
            color dt('message.transition.duration'),
            outline-color dt('message.transition.duration'),
            box-shadow dt('message.transition.duration'),
            opacity 0.3s;
        outline-color: transparent;
        color: inherit;
        padding: 0;
        border: none;
        cursor: pointer;
        user-select: none;
    }

    .p-message-close-icon {
        font-size: dt('message.close.icon.size');
        width: dt('message.close.icon.size');
        height: dt('message.close.icon.size');
    }

    .p-message-close-button:focus-visible {
        outline-width: dt('message.close.button.focus.ring.width');
        outline-style: dt('message.close.button.focus.ring.style');
        outline-offset: dt('message.close.button.focus.ring.offset');
    }

    .p-message-info {
        background: dt('message.info.background');
        outline-color: dt('message.info.border.color');
        color: dt('message.info.color');
        box-shadow: dt('message.info.shadow');
    }

    .p-message-info .p-message-close-button:focus-visible {
        outline-color: dt('message.info.close.button.focus.ring.color');
        box-shadow: dt('message.info.close.button.focus.ring.shadow');
    }

    .p-message-info .p-message-close-button:hover {
        background: dt('message.info.close.button.hover.background');
    }

    .p-message-info.p-message-outlined {
        color: dt('message.info.outlined.color');
        outline-color: dt('message.info.outlined.border.color');
    }

    .p-message-info.p-message-simple {
        color: dt('message.info.simple.color');
    }

    .p-message-success {
        background: dt('message.success.background');
        outline-color: dt('message.success.border.color');
        color: dt('message.success.color');
        box-shadow: dt('message.success.shadow');
    }

    .p-message-success .p-message-close-button:focus-visible {
        outline-color: dt('message.success.close.button.focus.ring.color');
        box-shadow: dt('message.success.close.button.focus.ring.shadow');
    }

    .p-message-success .p-message-close-button:hover {
        background: dt('message.success.close.button.hover.background');
    }

    .p-message-success.p-message-outlined {
        color: dt('message.success.outlined.color');
        outline-color: dt('message.success.outlined.border.color');
    }

    .p-message-success.p-message-simple {
        color: dt('message.success.simple.color');
    }

    .p-message-warn {
        background: dt('message.warn.background');
        outline-color: dt('message.warn.border.color');
        color: dt('message.warn.color');
        box-shadow: dt('message.warn.shadow');
    }

    .p-message-warn .p-message-close-button:focus-visible {
        outline-color: dt('message.warn.close.button.focus.ring.color');
        box-shadow: dt('message.warn.close.button.focus.ring.shadow');
    }

    .p-message-warn .p-message-close-button:hover {
        background: dt('message.warn.close.button.hover.background');
    }

    .p-message-warn.p-message-outlined {
        color: dt('message.warn.outlined.color');
        outline-color: dt('message.warn.outlined.border.color');
    }

    .p-message-warn.p-message-simple {
        color: dt('message.warn.simple.color');
    }

    .p-message-error {
        background: dt('message.error.background');
        outline-color: dt('message.error.border.color');
        color: dt('message.error.color');
        box-shadow: dt('message.error.shadow');
    }

    .p-message-error .p-message-close-button:focus-visible {
        outline-color: dt('message.error.close.button.focus.ring.color');
        box-shadow: dt('message.error.close.button.focus.ring.shadow');
    }

    .p-message-error .p-message-close-button:hover {
        background: dt('message.error.close.button.hover.background');
    }

    .p-message-error.p-message-outlined {
        color: dt('message.error.outlined.color');
        outline-color: dt('message.error.outlined.border.color');
    }

    .p-message-error.p-message-simple {
        color: dt('message.error.simple.color');
    }

    .p-message-secondary {
        background: dt('message.secondary.background');
        outline-color: dt('message.secondary.border.color');
        color: dt('message.secondary.color');
        box-shadow: dt('message.secondary.shadow');
    }

    .p-message-secondary .p-message-close-button:focus-visible {
        outline-color: dt('message.secondary.close.button.focus.ring.color');
        box-shadow: dt('message.secondary.close.button.focus.ring.shadow');
    }

    .p-message-secondary .p-message-close-button:hover {
        background: dt('message.secondary.close.button.hover.background');
    }

    .p-message-secondary.p-message-outlined {
        color: dt('message.secondary.outlined.color');
        outline-color: dt('message.secondary.outlined.border.color');
    }

    .p-message-secondary.p-message-simple {
        color: dt('message.secondary.simple.color');
    }

    .p-message-contrast {
        background: dt('message.contrast.background');
        outline-color: dt('message.contrast.border.color');
        color: dt('message.contrast.color');
        box-shadow: dt('message.contrast.shadow');
    }

    .p-message-contrast .p-message-close-button:focus-visible {
        outline-color: dt('message.contrast.close.button.focus.ring.color');
        box-shadow: dt('message.contrast.close.button.focus.ring.shadow');
    }

    .p-message-contrast .p-message-close-button:hover {
        background: dt('message.contrast.close.button.hover.background');
    }

    .p-message-contrast.p-message-outlined {
        color: dt('message.contrast.outlined.color');
        outline-color: dt('message.contrast.outlined.border.color');
    }

    .p-message-contrast.p-message-simple {
        color: dt('message.contrast.simple.color');
    }

    .p-message-text {
        font-size: dt('message.text.font.size');
        font-weight: dt('message.text.font.weight');
    }

    .p-message-icon {
        font-size: dt('message.icon.size');
        width: dt('message.icon.size');
        height: dt('message.icon.size');
    }

    .p-message-sm .p-message-content {
        padding: dt('message.content.sm.padding');
    }

    .p-message-sm .p-message-text {
        font-size: dt('message.text.sm.font.size');
    }

    .p-message-sm .p-message-icon {
        font-size: dt('message.icon.sm.size');
        width: dt('message.icon.sm.size');
        height: dt('message.icon.sm.size');
    }

    .p-message-sm .p-message-close-icon {
        font-size: dt('message.close.icon.sm.size');
        width: dt('message.close.icon.sm.size');
        height: dt('message.close.icon.sm.size');
    }

    .p-message-lg .p-message-content {
        padding: dt('message.content.lg.padding');
    }

    .p-message-lg .p-message-text {
        font-size: dt('message.text.lg.font.size');
    }

    .p-message-lg .p-message-icon {
        font-size: dt('message.icon.lg.size');
        width: dt('message.icon.lg.size');
        height: dt('message.icon.lg.size');
    }

    .p-message-lg .p-message-close-icon {
        font-size: dt('message.close.icon.lg.size');
        width: dt('message.close.icon.lg.size');
        height: dt('message.close.icon.lg.size');
    }

    .p-message-outlined {
        background: transparent;
        outline-width: dt('message.outlined.border.width');
    }

    .p-message-simple {
        background: transparent;
        outline-color: transparent;
        box-shadow: none;
    }

    .p-message-simple .p-message-content {
        padding: dt('message.simple.content.padding');
    }

    .p-message-outlined .p-message-close-button:hover,
    .p-message-simple .p-message-close-button:hover {
        background: transparent;
    }

    .p-message-enter-active {
        animation: p-animate-message-enter 0.3s ease-out forwards;
        overflow: hidden;
    }

    .p-message-leave-active {
        animation: p-animate-message-leave 0.15s ease-in forwards;
        overflow: hidden;
    }

    @keyframes p-animate-message-enter {
        from {
            opacity: 0;
            grid-template-rows: 0fr;
        }
        to {
            opacity: 1;
            grid-template-rows: 1fr;
        }
    }

    @keyframes p-animate-message-leave {
        from {
            opacity: 1;
            grid-template-rows: 1fr;
        }
        to {
            opacity: 0;
            margin: 0;
            grid-template-rows: 0fr;
        }
    }
`,classes:{root:function(e){var t=e.props;return[`p-message p-component p-message-`+t.severity,{"p-message-outlined":t.variant===`outlined`,"p-message-simple":t.variant===`simple`,"p-message-sm":t.size===`small`,"p-message-lg":t.size===`large`}]},contentWrapper:`p-message-content-wrapper`,content:`p-message-content`,icon:`p-message-icon`,text:`p-message-text`,closeButton:`p-message-close-button`,closeIcon:`p-message-close-icon`}}),S={name:`BaseMessage`,extends:m,props:{severity:{type:String,default:`info`},closable:{type:Boolean,default:!1},life:{type:Number,default:null},icon:{type:String,default:void 0},closeIcon:{type:String,default:void 0},closeButtonProps:{type:null,default:null},size:{type:String,default:null},variant:{type:String,default:null}},style:x,provide:function(){return{$pcMessage:this,$parentInstance:this}}};function C(e){"@babel/helpers - typeof";return C=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},C(e)}function w(e,t,n){return(t=T(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function T(e){var t=E(e,`string`);return C(t)==`symbol`?t:t+``}function E(e,t){if(C(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(C(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var ee={name:`Message`,extends:S,inheritAttrs:!1,emits:[`close`,`life-end`],timeout:null,data:function(){return{visible:!0}},mounted:function(){var e=this;this.life&&setTimeout(function(){e.visible=!1,e.$emit(`life-end`)},this.life)},methods:{close:function(e){this.visible=!1,this.$emit(`close`,e)}},computed:{closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0},dataP:function(){return v(w(w({outlined:this.variant===`outlined`,simple:this.variant===`simple`},this.severity,this.severity),this.size,this.size))}},directives:{ripple:d},components:{TimesIcon:c}};function D(e){"@babel/helpers - typeof";return D=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},D(e)}function te(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?te(Object(n),!0).forEach(function(t){k(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):te(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function k(e,t,n){return(t=A(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function A(e){var t=j(e,`string`);return D(t)==`symbol`?t:t+``}function j(e,t){if(D(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(D(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var M=[`data-p`],ne=[`data-p`],re=[`data-p`],ie=[`aria-label`,`data-p`],N=[`data-p`];function ae(c,d,m,g,v,y){var b=u(`TimesIcon`),x=s(`ripple`);return i(),a(t,l({name:`p-message`,appear:``},c.ptmi(`transition`)),{default:r(function(){return[v.visible?(i(),f(`div`,l({key:0,class:c.cx(`root`),role:`alert`,"aria-live":`assertive`,"aria-atomic":`true`,"data-p":y.dataP},c.ptm(`root`)),[e(`div`,l({class:c.cx(`contentWrapper`)},c.ptm(`contentWrapper`)),[c.$slots.container?p(c.$slots,`container`,{key:0,closeCallback:y.close}):(i(),f(`div`,l({key:1,class:c.cx(`content`),"data-p":y.dataP},c.ptm(`content`)),[p(c.$slots,`icon`,{class:n(c.cx(`icon`))},function(){return[(i(),a(o(c.icon?`span`:null),l({class:[c.cx(`icon`),c.icon],"data-p":y.dataP},c.ptm(`icon`)),null,16,[`class`,`data-p`]))]}),c.$slots.default?(i(),f(`div`,l({key:0,class:c.cx(`text`),"data-p":y.dataP},c.ptm(`text`)),[p(c.$slots,`default`)],16,re)):h(``,!0),c.closable?_((i(),f(`button`,l({key:1,class:c.cx(`closeButton`),"aria-label":y.closeAriaLabel,type:`button`,onClick:d[0]||=function(e){return y.close(e)},"data-p":y.dataP},O(O({},c.closeButtonProps),c.ptm(`closeButton`))),[p(c.$slots,`closeicon`,{},function(){return[c.closeIcon?(i(),f(`i`,l({key:0,class:[c.cx(`closeIcon`),c.closeIcon],"data-p":y.dataP},c.ptm(`closeIcon`)),null,16,N)):(i(),a(b,l({key:1,class:[c.cx(`closeIcon`),c.closeIcon],"data-p":y.dataP},c.ptm(`closeIcon`)),null,16,[`class`,`data-p`]))]})],16,ie)),[[x]]):h(``,!0)],16,ne))],16)],16,M)):h(``,!0)]}),_:3},16)}ee.render=ae;function oe(e,t){return function(){return e.apply(t,arguments)}}var{toString:P}=Object.prototype,{getPrototypeOf:F}=Object,{iterator:se,toStringTag:ce}=Symbol,le=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),ue=(e,t)=>{let n=e,r=[];for(;n!=null&&n!==Object.prototype;){if(r.indexOf(n)!==-1)return!1;if(r.push(n),le(n,t))return!0;n=F(n)}return!1},de=(e,t)=>e!=null&&ue(e,t)?e[t]:void 0,fe=(e=>t=>{let n=P.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),I=e=>(e=e.toLowerCase(),t=>fe(t)===e),pe=e=>t=>typeof t===e,{isArray:L}=Array,R=pe(`undefined`);function z(e){return e!==null&&!R(e)&&e.constructor!==null&&!R(e.constructor)&&B(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}var me=I(`ArrayBuffer`);function he(e){let t;return t=typeof ArrayBuffer<`u`&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&me(e.buffer),t}var ge=pe(`string`),B=pe(`function`),_e=pe(`number`),V=e=>typeof e==`object`&&!!e,ve=e=>e===!0||e===!1,ye=e=>{if(!V(e))return!1;let t=F(e);return(t===null||t===Object.prototype||F(t)===null)&&!ue(e,ce)&&!ue(e,se)},be=e=>{if(!V(e)||z(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},xe=I(`Date`),Se=I(`File`),Ce=e=>!!(e&&e.uri!==void 0),we=e=>e&&e.getParts!==void 0,Te=I(`Blob`),Ee=I(`FileList`),De=e=>V(e)&&B(e.pipe);function Oe(){return typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}}var ke=Oe(),Ae=ke.FormData===void 0?void 0:ke.FormData,je=e=>{if(!e)return!1;if(Ae&&e instanceof Ae)return!0;let t=F(e);if(!t||t===Object.prototype||!B(e.append))return!1;let n=fe(e);return n===`formdata`||n===`object`&&B(e.toString)&&e.toString()===`[object FormData]`},Me=I(`URLSearchParams`),[Ne,Pe,Fe,Ie]=[`ReadableStream`,`Request`,`Response`,`Headers`].map(I),Le=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,``);function H(e,t,{allOwnKeys:n=!1}={}){if(e==null)return;let r,i;if(typeof e!=`object`&&(e=[e]),L(e))for(r=0,i=e.length;r<i;r++)t.call(null,e[r],r,e);else{if(z(e))return;let i=n?Object.getOwnPropertyNames(e):Object.keys(e),a=i.length,o;for(r=0;r<a;r++)o=i[r],t.call(null,e[o],o,e)}}function Re(e,t){if(z(e))return null;t=t.toLowerCase();let n=Object.keys(e),r=n.length,i;for(;r-->0;)if(i=n[r],t===i.toLowerCase())return i;return null}var U=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:global,ze=e=>!R(e)&&e!==U;function Be(...e){let{caseless:t,skipUndefined:n}=ze(this)&&this||{},r={},i=(e,i)=>{if(i===`__proto__`||i===`constructor`||i===`prototype`)return;let a=t&&typeof i==`string`&&Re(r,i)||i,o=le(r,a)?r[a]:void 0;ye(o)&&ye(e)?r[a]=Be(o,e):ye(e)?r[a]=Be({},e):L(e)?r[a]=e.slice():(!n||!R(e))&&(r[a]=e)};for(let t=0,n=e.length;t<n;t++){let n=e[t];if(!n||z(n)||(H(n,i),typeof n!=`object`||L(n)))continue;let r=Object.getOwnPropertySymbols(n);for(let e=0;e<r.length;e++){let t=r[e];Qe.call(n,t)&&i(n[t],t)}}return r}var Ve=(e,t,n,{allOwnKeys:r}={})=>(H(t,(t,r)=>{n&&B(t)?Object.defineProperty(e,r,{__proto__:null,value:oe(t,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,r,{__proto__:null,value:t,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:r}),e),He=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Ue=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),Object.defineProperty(e.prototype,"constructor",{__proto__:null,value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{__proto__:null,value:t.prototype}),n&&Object.assign(e.prototype,n)},We=(e,t,n,r)=>{let i,a,o,s={};if(t||={},e==null)return t;do{for(i=Object.getOwnPropertyNames(e),a=i.length;a-->0;)o=i[a],(!r||r(o,e,t))&&!s[o]&&(t[o]=e[o],s[o]=!0);e=n!==!1&&F(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},Ge=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;let r=e.indexOf(t,n);return r!==-1&&r===n},Ke=e=>{if(!e)return null;if(L(e))return e;let t=e.length;if(!_e(t))return null;let n=Array(t);for(;t-->0;)n[t]=e[t];return n},qe=(e=>t=>e&&t instanceof e)(typeof Uint8Array<`u`&&F(Uint8Array)),Je=(e,t)=>{let n=(e&&e[se]).call(e),r;for(;(r=n.next())&&!r.done;){let n=r.value;t.call(e,n[0],n[1])}},Ye=(e,t)=>{let n,r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},Xe=I(`HTMLFormElement`),Ze=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(e,t,n){return t.toUpperCase()+n}),{propertyIsEnumerable:Qe}=Object.prototype,$e=I(`RegExp`),et=(e,t)=>{let n=Object.getOwnPropertyDescriptors(e),r={};H(n,(n,i)=>{let a;(a=t(n,i,e))!==!1&&(r[i]=a||n)}),Object.defineProperties(e,r)},tt=e=>{et(e,(t,n)=>{if(B(e)&&[`arguments`,`caller`,`callee`].includes(n))return!1;let r=e[n];if(B(r)){if(t.enumerable=!1,`writable`in t){t.writable=!1;return}t.set||=()=>{throw Error(`Can not rewrite read-only method '`+n+`'`)}}})},nt=(e,t)=>{let n={},r=e=>{e.forEach(e=>{n[e]=!0})};return L(e)?r(e):r(String(e).split(t)),n},rt=()=>{},it=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function at(e){return!!(e&&B(e.append)&&e[ce]===`FormData`&&e[se])}var ot=e=>{let t=new WeakSet,n=e=>{if(V(e)){if(t.has(e))return;if(z(e))return e;if(!(`toJSON`in e)){t.add(e);let r=L(e)?[]:{};return H(e,(e,t)=>{let i=n(e);!R(i)&&(r[t]=i)}),t.delete(e),r}}return e};return n(e)},st=I(`AsyncFunction`),ct=e=>e&&(V(e)||B(e))&&B(e.then)&&B(e.catch),lt=((e,t)=>e?setImmediate:t?((e,t)=>(U.addEventListener(`message`,({source:n,data:r})=>{n===U&&r===e&&t.length&&t.shift()()},!1),n=>{t.push(n),U.postMessage(e,`*`)}))(`axios@${Math.random()}`,[]):e=>setTimeout(e))(typeof setImmediate==`function`,B(U.postMessage)),ut=typeof queueMicrotask<`u`?queueMicrotask.bind(U):typeof process<`u`&&process.nextTick||lt,dt=e=>e!=null&&B(e[se]),W={isArray:L,isArrayBuffer:me,isBuffer:z,isFormData:je,isArrayBufferView:he,isString:ge,isNumber:_e,isBoolean:ve,isObject:V,isPlainObject:ye,isEmptyObject:be,isReadableStream:Ne,isRequest:Pe,isResponse:Fe,isHeaders:Ie,isUndefined:R,isDate:xe,isFile:Se,isReactNativeBlob:Ce,isReactNative:we,isBlob:Te,isRegExp:$e,isFunction:B,isStream:De,isURLSearchParams:Me,isTypedArray:qe,isFileList:Ee,forEach:H,merge:Be,extend:Ve,trim:Le,stripBOM:He,inherits:Ue,toFlatObject:We,kindOf:fe,kindOfTest:I,endsWith:Ge,toArray:Ke,forEachEntry:Je,matchAll:Ye,isHTMLForm:Xe,hasOwnProperty:le,hasOwnProp:le,hasOwnInPrototypeChain:ue,getSafeProp:de,reduceDescriptors:et,freezeMethods:tt,toObjectSet:nt,toCamelCase:Ze,noop:rt,toFiniteNumber:it,findKey:Re,global:U,isContextDefined:ze,isSpecCompliantForm:at,toJSONObject:ot,isAsyncFn:st,isThenable:ct,setImmediate:lt,asap:ut,isIterable:dt,isSafeIterable:e=>e!=null&&ue(e,se)&&dt(e)},ft=W.toObjectSet([`age`,`authorization`,`content-length`,`content-type`,`etag`,`expires`,`from`,`host`,`if-modified-since`,`if-unmodified-since`,`last-modified`,`location`,`max-forwards`,`proxy-authorization`,`referer`,`retry-after`,`user-agent`]),pt=e=>{let t={},n,r,i;return e&&e.split(`
`).forEach(function(e){i=e.indexOf(`:`),n=e.substring(0,i).trim().toLowerCase(),r=e.substring(i+1).trim(),!(!n||t[n]&&ft[n])&&(n===`set-cookie`?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+`, `+r:r)}),t};function mt(e){let t=0,n=e.length;for(;t<n;){let n=e.charCodeAt(t);if(n!==9&&n!==32)break;t+=1}for(;n>t;){let t=e.charCodeAt(n-1);if(t!==9&&t!==32)break;--n}return t===0&&n===e.length?e:e.slice(t,n)}var ht=RegExp(`[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+`,`g`),gt=RegExp(`[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+`,`g`);function _t(e,t){return W.isArray(e)?e.map(e=>_t(e,t)):mt(String(e).replace(t,``))}var vt=e=>_t(e,ht),yt=e=>_t(e,gt);function bt(e){let t=Object.create(null);return W.forEach(e.toJSON(),(e,n)=>{t[n]=yt(e)}),t}var xt=Symbol(`internals`);function G(e){return e&&String(e).trim().toLowerCase()}function St(e){return e===!1||e==null?e:W.isArray(e)?e.map(St):vt(String(e))}function Ct(e){let t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g,r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}var wt=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Tt(e,t,n,r,i){if(W.isFunction(r))return r.call(this,t,n);if(i&&(t=n),W.isString(t)){if(W.isString(r))return t.indexOf(r)!==-1;if(W.isRegExp(r))return r.test(t)}}function Et(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,n)=>t.toUpperCase()+n)}function Dt(e,t){let n=W.toCamelCase(` `+t);[`get`,`set`,`has`].forEach(r=>{Object.defineProperty(e,r+n,{__proto__:null,value:function(e,n,i){return this[r].call(this,t,e,n,i)},configurable:!0})})}var K=class{constructor(e){e&&this.set(e)}set(e,t,n){let r=this;function i(e,t,n){let i=G(t);if(!i)return;let a=W.findKey(r,i);(!a||r[a]===void 0||n===!0||n===void 0&&r[a]!==!1)&&(r[a||t]=St(e))}let a=(e,t)=>W.forEach(e,(e,n)=>i(e,n,t));if(W.isPlainObject(e)||e instanceof this.constructor)a(e,t);else if(W.isString(e)&&(e=e.trim())&&!wt(e))a(pt(e),t);else if(W.isObject(e)&&W.isSafeIterable(e)){let n=Object.create(null),r,i;for(let t of e){if(!W.isArray(t))throw TypeError(`Object iterator must return a key-value pair`);i=t[0],W.hasOwnProp(n,i)?(r=n[i],n[i]=W.isArray(r)?[...r,t[1]]:[r,t[1]]):n[i]=t[1]}a(n,t)}else e!=null&&i(t,e,n);return this}get(e,t){if(e=G(e),e){let n=W.findKey(this,e);if(n){let e=this[n];if(!t)return e;if(t===!0)return Ct(e);if(W.isFunction(t))return t.call(this,e,n);if(W.isRegExp(t))return t.exec(e);throw TypeError(`parser must be boolean|regexp|function`)}}}has(e,t){if(e=G(e),e){let n=W.findKey(this,e);return!!(n&&this[n]!==void 0&&(!t||Tt(this,this[n],n,t)))}return!1}delete(e,t){let n=this,r=!1;function i(e){if(e=G(e),e){let i=W.findKey(n,e);i&&(!t||Tt(n,n[i],i,t))&&(delete n[i],r=!0)}}return W.isArray(e)?e.forEach(i):i(e),r}clear(e){let t=Object.keys(this),n=t.length,r=!1;for(;n--;){let i=t[n];(!e||Tt(this,this[i],i,e,!0))&&(delete this[i],r=!0)}return r}normalize(e){let t=this,n={};return W.forEach(this,(r,i)=>{let a=W.findKey(n,i);if(a){t[a]=St(r),delete t[i];return}let o=e?Et(i):String(i).trim();o!==i&&delete t[i],t[o]=St(r),n[o]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){let t=Object.create(null);return W.forEach(this,(n,r)=>{n!=null&&n!==!1&&(t[r]=e&&W.isArray(n)?n.join(`, `):n)}),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,t])=>e+`: `+t).join(`
`)}getSetCookie(){return this.get(`set-cookie`)||[]}get[Symbol.toStringTag](){return`AxiosHeaders`}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){let n=new this(e);return t.forEach(e=>n.set(e)),n}static accessor(e){let t=(this[xt]=this[xt]={accessors:{}}).accessors,n=this.prototype;function r(e){let r=G(e);t[r]||(Dt(n,e),t[r]=!0)}return W.isArray(e)?e.forEach(r):r(e),this}};K.accessor([`Content-Type`,`Content-Length`,`Accept`,`Accept-Encoding`,`User-Agent`,`Authorization`]),W.reduceDescriptors(K.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(e){this[n]=e}}}),W.freezeMethods(K);var Ot=`[REDACTED ****]`;function kt(e){if(W.hasOwnProp(e,`toJSON`))return!0;let t=Object.getPrototypeOf(e);for(;t&&t!==Object.prototype;){if(W.hasOwnProp(t,`toJSON`))return!0;t=Object.getPrototypeOf(t)}return!1}function At(e,t){let n=new Set(t.map(e=>String(e).toLowerCase())),r=[],i=e=>{if(typeof e!=`object`||!e||W.isBuffer(e))return e;if(r.indexOf(e)!==-1)return;e instanceof K&&(e=e.toJSON()),r.push(e);let t;if(W.isArray(e))t=[],e.forEach((e,n)=>{let r=i(e);W.isUndefined(r)||(t[n]=r)});else{if(!W.isPlainObject(e)&&kt(e))return r.pop(),e;t=Object.create(null);for(let[r,a]of Object.entries(e)){let e=n.has(r.toLowerCase())?Ot:i(a);W.isUndefined(e)||(t[r]=e)}}return r.pop(),t};return i(e)}var q=class e extends Error{static from(t,n,r,i,a,o){let s=new e(t.message,n||t.code,r,i,a);return Object.defineProperty(s,"cause",{__proto__:null,value:t,writable:!0,enumerable:!1,configurable:!0}),s.name=t.name,t.status!=null&&s.status==null&&(s.status=t.status),o&&Object.assign(s,o),s}constructor(e,t,n,r,i){super(e),Object.defineProperty(this,"message",{__proto__:null,value:e,enumerable:!0,writable:!0,configurable:!0}),this.name=`AxiosError`,this.isAxiosError=!0,t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),i&&(this.response=i,this.status=i.status)}toJSON(){let e=this.config,t=e&&W.hasOwnProp(e,`redact`)?e.redact:void 0,n=W.isArray(t)&&t.length>0?At(e,t):W.toJSONObject(e);return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:n,code:this.code,status:this.status}}};q.ERR_BAD_OPTION_VALUE=`ERR_BAD_OPTION_VALUE`,q.ERR_BAD_OPTION=`ERR_BAD_OPTION`,q.ECONNABORTED=`ECONNABORTED`,q.ETIMEDOUT=`ETIMEDOUT`,q.ECONNREFUSED=`ECONNREFUSED`,q.ERR_NETWORK=`ERR_NETWORK`,q.ERR_FR_TOO_MANY_REDIRECTS=`ERR_FR_TOO_MANY_REDIRECTS`,q.ERR_DEPRECATED=`ERR_DEPRECATED`,q.ERR_BAD_RESPONSE=`ERR_BAD_RESPONSE`,q.ERR_BAD_REQUEST=`ERR_BAD_REQUEST`,q.ERR_CANCELED=`ERR_CANCELED`,q.ERR_NOT_SUPPORT=`ERR_NOT_SUPPORT`,q.ERR_INVALID_URL=`ERR_INVALID_URL`,q.ERR_FORM_DATA_DEPTH_EXCEEDED=`ERR_FORM_DATA_DEPTH_EXCEEDED`;function jt(e){return W.isPlainObject(e)||W.isArray(e)}function Mt(e){return W.endsWith(e,`[]`)?e.slice(0,-2):e}function Nt(e,t,n){return e?e.concat(t).map(function(e,t){return e=Mt(e),!n&&t?`[`+e+`]`:e}).join(n?`.`:``):t}function Pt(e){return W.isArray(e)&&!e.some(jt)}var Ft=W.toFlatObject(W,{},null,function(e){return/^is[A-Z]/.test(e)});function It(e,t,n){if(!W.isObject(e))throw TypeError(`target must be an object`);t||=new FormData,n=W.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(e,t){return!W.isUndefined(t[e])});let r=n.metaTokens,i=n.visitor||m,a=n.dots,o=n.indexes,s=n.Blob||typeof Blob<`u`&&Blob,c=n.maxDepth===void 0?100:n.maxDepth,l=s&&W.isSpecCompliantForm(t),u=[];if(!W.isFunction(i))throw TypeError(`visitor must be a function`);function d(e){if(e===null)return``;if(W.isDate(e))return e.toISOString();if(W.isBoolean(e))return e.toString();if(!l&&W.isBlob(e))throw new q(`Blob is not supported. Use a Buffer instead.`);if(W.isArrayBuffer(e)||W.isTypedArray(e)){if(l&&typeof s==`function`)return new s([e]);if(typeof Buffer<`u`)return Buffer.from(e);throw new q(`Blob is not supported. Use a Buffer instead.`,q.ERR_NOT_SUPPORT)}return e}function f(e){if(e>c)throw new q(`Object is too deeply nested (`+e+` levels). Max depth: `+c,q.ERR_FORM_DATA_DEPTH_EXCEEDED)}function p(e,t){if(c===1/0)return JSON.stringify(e);let n=[];return JSON.stringify(e,function(e,r){if(!W.isObject(r))return r;for(;n.length&&n[n.length-1]!==this;)n.pop();return n.push(r),f(t+n.length-1),r})}function m(e,n,i){let s=e;if(W.isReactNative(t)&&W.isReactNativeBlob(e))return t.append(Nt(i,n,a),d(e)),!1;if(e&&!i&&typeof e==`object`){if(W.endsWith(n,`{}`))n=r?n:n.slice(0,-2),e=p(e,1);else if(W.isArray(e)&&Pt(e)||(W.isFileList(e)||W.endsWith(n,`[]`))&&(s=W.toArray(e)))return n=Mt(n),s.forEach(function(e,r){!(W.isUndefined(e)||e===null)&&t.append(o===!0?Nt([n],r,a):o===null?n:n+`[]`,d(e))}),!1}return jt(e)?!0:(t.append(Nt(i,n,a),d(e)),!1)}let h=Object.assign(Ft,{defaultVisitor:m,convertValue:d,isVisitable:jt});function g(e,n,r=0){if(!W.isUndefined(e)){if(f(r),u.indexOf(e)!==-1)throw Error(`Circular reference detected in `+n.join(`.`));u.push(e),W.forEach(e,function(e,a){(!(W.isUndefined(e)||e===null)&&i.call(t,e,W.isString(a)?a.trim():a,n,h))===!0&&g(e,n?n.concat(a):[a],r+1)}),u.pop()}}if(!W.isObject(e))throw TypeError(`data must be an object`);return g(e),t}function Lt(e){let t={"!":`%21`,"'":`%27`,"(":`%28`,")":`%29`,"~":`%7E`,"%20":`+`};return encodeURIComponent(e).replace(/[!'()~]|%20/g,function(e){return t[e]})}function Rt(e,t){this._pairs=[],e&&It(e,this,t)}var zt=Rt.prototype;zt.append=function(e,t){this._pairs.push([e,t])},zt.toString=function(e){let t=e?t=>e.call(this,t,Lt):Lt;return this._pairs.map(function(e){return t(e[0])+`=`+t(e[1])},``).join(`&`)};function Bt(e){return encodeURIComponent(e).replace(/%3A/gi,`:`).replace(/%24/g,`$`).replace(/%2C/gi,`,`).replace(/%20/g,`+`)}function Vt(e,t,n){if(!t)return e;e||=``;let r=W.isFunction(n)?{serialize:n}:n,i=W.getSafeProp(r,`encode`)||Bt,a=W.getSafeProp(r,`serialize`),o;if(o=a?a(t,r):W.isURLSearchParams(t)?t.toString():new Rt(t,r).toString(i),o){let t=e.indexOf(`#`);t!==-1&&(e=e.slice(0,t)),e+=(e.indexOf(`?`)===-1?`?`:`&`)+o}return e}var Ht=class{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&=[]}forEach(e){W.forEach(this.handlers,function(t){t!==null&&e(t)})}},Ut={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0,advertiseZstdAcceptEncoding:!1,validateStatusUndefinedResolves:!0},Wt={isBrowser:!0,classes:{URLSearchParams:typeof URLSearchParams<`u`?URLSearchParams:Rt,FormData:typeof FormData<`u`?FormData:null,Blob:typeof Blob<`u`?Blob:null},protocols:[`http`,`https`,`file`,`blob`,`url`,`data`]},Gt=b({hasBrowserEnv:()=>Kt,hasStandardBrowserEnv:()=>Jt,hasStandardBrowserWebWorkerEnv:()=>Yt,navigator:()=>qt,origin:()=>Xt}),Kt=typeof window<`u`&&typeof document<`u`,qt=typeof navigator==`object`&&navigator||void 0,Jt=Kt&&(!qt||[`ReactNative`,`NativeScript`,`NS`].indexOf(qt.product)<0),Yt=typeof WorkerGlobalScope<`u`&&self instanceof WorkerGlobalScope&&typeof self.importScripts==`function`,Xt=Kt&&window.location.href||`http://localhost`,J={...Gt,...Wt};function Zt(e,t){return It(e,new J.classes.URLSearchParams,{visitor:function(e,t,n,r){return J.isNode&&W.isBuffer(e)?(this.append(t,e.toString(`base64`)),!1):r.defaultVisitor.apply(this,arguments)},...t})}var Qt=100;function $t(e){if(e>Qt)throw new q(`FormData field is too deeply nested (`+e+` levels). Max depth: `+Qt,q.ERR_FORM_DATA_DEPTH_EXCEEDED)}function en(e){let t=[],n=/\w+|\[(\w*)]/g,r;for(;(r=n.exec(e))!==null;)$t(t.length),t.push(r[0]===`[]`?``:r[1]||r[0]);return t}function tn(e){let t={},n=Object.keys(e),r,i=n.length,a;for(r=0;r<i;r++)a=n[r],t[a]=e[a];return t}function nn(e){function t(e,n,r,i){$t(i);let a=e[i++];if(a===`__proto__`)return!0;let o=Number.isFinite(+a),s=i>=e.length;return a=!a&&W.isArray(r)?r.length:a,s?(W.hasOwnProp(r,a)?r[a]=W.isArray(r[a])?r[a].concat(n):[r[a],n]:r[a]=n,!o):((!W.hasOwnProp(r,a)||!W.isObject(r[a]))&&(r[a]=[]),t(e,n,r[a],i)&&W.isArray(r[a])&&(r[a]=tn(r[a])),!o)}if(W.isFormData(e)&&W.isFunction(e.entries)){let n={};return W.forEachEntry(e,(e,r)=>{t(en(e),r,n,0)}),n}return null}var Y=(e,t)=>e!=null&&W.hasOwnProp(e,t)?e[t]:void 0;function rn(e,t,n){if(W.isString(e))try{return(t||JSON.parse)(e),W.trim(e)}catch(e){if(e.name!==`SyntaxError`)throw e}return(n||JSON.stringify)(e)}var an={transitional:Ut,adapter:[`xhr`,`http`,`fetch`],transformRequest:[function(e,t){let n=t.getContentType()||``,r=n.indexOf(`application/json`)>-1,i=W.isObject(e);if(i&&W.isHTMLForm(e)&&(e=new FormData(e)),W.isFormData(e))return r?JSON.stringify(nn(e)):e;if(W.isArrayBuffer(e)||W.isBuffer(e)||W.isStream(e)||W.isFile(e)||W.isBlob(e)||W.isReadableStream(e))return e;if(W.isArrayBufferView(e))return e.buffer;if(W.isURLSearchParams(e))return t.setContentType(`application/x-www-form-urlencoded;charset=utf-8`,!1),e.toString();let a;if(i){let t=Y(this,`formSerializer`);if(n.indexOf(`application/x-www-form-urlencoded`)>-1)return Zt(e,t).toString();if((a=W.isFileList(e))||n.indexOf(`multipart/form-data`)>-1){let n=Y(this,`env`),r=n&&n.FormData;return It(a?{"files[]":e}:e,r&&new r,t)}}return i||r?(t.setContentType(`application/json`,!1),rn(e)):e}],transformResponse:[function(e){let t=Y(this,`transitional`)||an.transitional,n=t&&t.forcedJSONParsing,r=Y(this,`responseType`),i=r===`json`;if(W.isResponse(e)||W.isReadableStream(e))return e;if(e&&W.isString(e)&&(n&&!r||i)){let n=!(t&&t.silentJSONParsing)&&i;try{return JSON.parse(e,Y(this,`parseReviver`))}catch(e){if(n)throw e.name===`SyntaxError`?q.from(e,q.ERR_BAD_RESPONSE,this,null,Y(this,`response`)):e}}return e}],timeout:0,xsrfCookieName:`XSRF-TOKEN`,xsrfHeaderName:`X-XSRF-TOKEN`,maxContentLength:-1,maxBodyLength:-1,env:{FormData:J.classes.FormData,Blob:J.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:`application/json, text/plain, */*`,"Content-Type":void 0}}};W.forEach([`delete`,`get`,`head`,`post`,`put`,`patch`,`query`],e=>{an.headers[e]={}});function on(e,t){let n=this||an,r=t||n,i=K.from(r.headers),a=r.data;return W.forEach(e,function(e){a=e.call(n,a,i.normalize(),t?t.status:void 0)}),i.normalize(),a}function sn(e){return!!(e&&e.__CANCEL__)}var cn=class extends q{constructor(e,t,n){super(e??`canceled`,q.ERR_CANCELED,t,n),this.name=`CanceledError`,this.__CANCEL__=!0}};function ln(e,t,n){let r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new q(`Request failed with status code `+n.status,n.status>=400&&n.status<500?q.ERR_BAD_REQUEST:q.ERR_BAD_RESPONSE,n.config,n.request,n))}function un(e){let t=/^([-+\w]{1,25}):(?:\/\/)?/.exec(e);return t&&t[1]||``}function dn(e,t){e||=10;let n=Array(e),r=Array(e),i=0,a=0,o;return t=t===void 0?1e3:t,function(s){let c=Date.now(),l=r[a];o||=c,n[i]=s,r[i]=c;let u=a,d=0;for(;u!==i;)d+=n[u++],u%=e;if(i=(i+1)%e,i===a&&(a=(a+1)%e),c-o<t)return;let f=l&&c-l;return f?Math.round(d*1e3/f):void 0}}function fn(e,t){let n=0,r=1e3/t,i,a,o=(t,r=Date.now())=>{n=r,i=null,a&&=(clearTimeout(a),null),e(...t)};return[(...e)=>{let t=Date.now(),s=t-n;s>=r?o(e,t):(i=e,a||=setTimeout(()=>{a=null,o(i)},r-s))},()=>i&&o(i)]}var pn=(e,t,n=3)=>{let r=0,i=dn(50,250);return fn(n=>{if(!n||typeof n.loaded!=`number`)return;let a=n.loaded,o=n.lengthComputable?n.total:void 0,s=o==null?a:Math.min(a,o),c=Math.max(0,s-r),l=i(c);r=Math.max(r,s),e({loaded:s,total:o,progress:o?s/o:void 0,bytes:c,rate:l||void 0,estimated:l&&o?(o-s)/l:void 0,event:n,lengthComputable:o!=null,[t?`download`:`upload`]:!0})},n)},mn=(e,t)=>{let n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},hn=e=>(...t)=>W.asap(()=>e(...t)),gn=J.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,J.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(J.origin),J.navigator&&/(msie|trident)/i.test(J.navigator.userAgent)):()=>!0,_n=J.hasStandardBrowserEnv?{write(e,t,n,r,i,a,o){if(typeof document>`u`)return;let s=[`${e}=${encodeURIComponent(t)}`];W.isNumber(n)&&s.push(`expires=${new Date(n).toUTCString()}`),W.isString(r)&&s.push(`path=${r}`),W.isString(i)&&s.push(`domain=${i}`),a===!0&&s.push(`secure`),W.isString(o)&&s.push(`SameSite=${o}`),document.cookie=s.join(`; `)},read(e){if(typeof document>`u`)return null;let t=document.cookie.split(`;`);for(let n=0;n<t.length;n++){let r=t[n].replace(/^\s+/,``),i=r.indexOf(`=`);if(i!==-1&&r.slice(0,i)===e)try{return decodeURIComponent(r.slice(i+1))}catch{return r.slice(i+1)}}return null},remove(e){this.write(e,``,Date.now()-864e5,`/`)}}:{write(){},read(){return null},remove(){}};function vn(e){return typeof e==`string`&&/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function yn(e,t){return t?e.replace(/\/?\/$/,``)+`/`+t.replace(/^\/+/,``):e}var bn=/^https?:(?!\/\/)/i,xn=/[\t\n\r]/g;function Sn(e){let t=0;for(;t<e.length&&e.charCodeAt(t)<=32;)t++;return e.slice(t)}function Cn(e){return Sn(e).replace(xn,``)}function wn(e,t){if(typeof e==`string`&&bn.test(Cn(e)))throw new q(`Invalid URL: missing "//" after protocol`,q.ERR_INVALID_URL,t)}function Tn(e,t,n,r){wn(t,r);let i=!vn(t);return e&&(i||n===!1)?(wn(e,r),yn(e,t)):t}var En=e=>e instanceof K?{...e}:e;function X(e,t){e||={},t||={};let n=Object.create(null);Object.defineProperty(n,"hasOwnProperty",{__proto__:null,value:Object.prototype.hasOwnProperty,enumerable:!1,writable:!0,configurable:!0});function r(e,t,n,r){return W.isPlainObject(e)&&W.isPlainObject(t)?W.merge.call({caseless:r},e,t):W.isPlainObject(t)?W.merge({},t):W.isArray(t)?t.slice():t}function i(e,t,n,i){if(!W.isUndefined(t))return r(e,t,n,i);if(!W.isUndefined(e))return r(void 0,e,n,i)}function a(e,t){if(!W.isUndefined(t))return r(void 0,t)}function o(e,t){if(!W.isUndefined(t))return r(void 0,t);if(!W.isUndefined(e))return r(void 0,e)}function s(n){let r=W.hasOwnProp(t,`transitional`)?t.transitional:void 0;if(!W.isUndefined(r))if(W.isPlainObject(r)){if(W.hasOwnProp(r,n))return r[n]}else return;let i=W.hasOwnProp(e,`transitional`)?e.transitional:void 0;if(W.isPlainObject(i)&&W.hasOwnProp(i,n))return i[n]}function c(n,i,a){if(W.hasOwnProp(t,a))return r(n,i);if(W.hasOwnProp(e,a))return r(void 0,n)}let l={url:a,method:a,data:a,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,allowedSocketPaths:o,responseEncoding:o,validateStatus:c,headers:(e,t,n)=>i(En(e),En(t),n,!0)};return W.forEach(Object.keys({...e,...t}),function(r){if(r===`__proto__`||r===`constructor`||r===`prototype`)return;let a=W.hasOwnProp(l,r)?l[r]:i,o=a(W.hasOwnProp(e,r)?e[r]:void 0,W.hasOwnProp(t,r)?t[r]:void 0,r);W.isUndefined(o)&&a!==c||(n[r]=o)}),W.hasOwnProp(t,`validateStatus`)&&W.isUndefined(t.validateStatus)&&s(`validateStatusUndefinedResolves`)===!1&&(W.hasOwnProp(e,`validateStatus`)?n.validateStatus=r(void 0,e.validateStatus):delete n.validateStatus),n}var Dn=[`content-type`,`content-length`];function On(e,t,n){if(n!==`content-only`){e.set(t);return}Object.entries(t||{}).forEach(([t,n])=>{Dn.includes(t.toLowerCase())&&e.set(t,n)})}var kn=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(e,t)=>String.fromCharCode(parseInt(t,16)));function An(e){let t=X({},e),n=e=>W.hasOwnProp(t,e)?t[e]:void 0,r=n(`data`),i=n(`withXSRFToken`),a=n(`xsrfHeaderName`),o=n(`xsrfCookieName`),s=n(`headers`),c=n(`auth`),l=n(`baseURL`),u=n(`allowAbsoluteUrls`),d=n(`url`);if(t.headers=s=K.from(s),t.url=Vt(Tn(l,d,u,t),n(`params`),n(`paramsSerializer`)),c){let t=W.getSafeProp(c,`username`)||``,n=W.getSafeProp(c,`password`)||``;try{s.set(`Authorization`,`Basic `+btoa(t+`:`+(n?kn(n):``)))}catch(t){throw q.from(t,q.ERR_BAD_OPTION_VALUE,e)}}if(W.isFormData(r)&&(J.hasStandardBrowserEnv||J.hasStandardBrowserWebWorkerEnv||W.isReactNative(r)?s.setContentType(void 0):W.isFunction(r.getHeaders)&&On(s,r.getHeaders(),n(`formDataHeaderPolicy`))),J.hasStandardBrowserEnv&&(W.isFunction(i)&&(i=i(t)),i===!0||i==null&&gn(t.url))){let e=a&&o&&_n.read(o);e&&s.set(a,e)}return t}var jn=typeof XMLHttpRequest<`u`&&function(e){return new Promise(function(t,n){let r=An(e),i=r.data,a=K.from(r.headers).normalize(),{responseType:o,onUploadProgress:s,onDownloadProgress:c}=r,l,u,d,f,p;function m(){f&&f(),p&&p(),r.cancelToken&&r.cancelToken.unsubscribe(l),r.signal&&r.signal.removeEventListener(`abort`,l)}let h=new XMLHttpRequest;h.open(r.method.toUpperCase(),r.url,!0),h.timeout=r.timeout;function g(){if(!h)return;let r=K.from(`getAllResponseHeaders`in h&&h.getAllResponseHeaders());ln(function(e){t(e),m()},function(e){n(e),m()},{data:!o||o===`text`||o===`json`?h.responseText:h.response,status:h.status,statusText:h.statusText,headers:r,config:e,request:h}),h=null}`onloadend`in h?h.onloadend=g:h.onreadystatechange=function(){!h||h.readyState!==4||h.status===0&&!(h.responseURL&&h.responseURL.startsWith(`file:`))||setTimeout(g)},h.onabort=function(){h&&=(n(new q(`Request aborted`,q.ECONNABORTED,e,h)),m(),null)},h.onerror=function(t){let r=new q(t&&t.message?t.message:`Network Error`,q.ERR_NETWORK,e,h);r.event=t||null,n(r),m(),h=null},h.ontimeout=function(){let t=r.timeout?`timeout of `+r.timeout+`ms exceeded`:`timeout exceeded`,i=r.transitional||Ut;r.timeoutErrorMessage&&(t=r.timeoutErrorMessage),n(new q(t,i.clarifyTimeoutError?q.ETIMEDOUT:q.ECONNABORTED,e,h)),m(),h=null},i===void 0&&a.setContentType(null),`setRequestHeader`in h&&W.forEach(bt(a),function(e,t){h.setRequestHeader(t,e)}),W.isUndefined(r.withCredentials)||(h.withCredentials=!!r.withCredentials),o&&o!==`json`&&(h.responseType=r.responseType),c&&([d,p]=pn(c,!0),h.addEventListener(`progress`,d)),s&&h.upload&&([u,f]=pn(s),h.upload.addEventListener(`progress`,u),h.upload.addEventListener(`loadend`,f)),(r.cancelToken||r.signal)&&(l=t=>{h&&=(n(!t||t.type?new cn(null,e,h):t),h.abort(),m(),null)},r.cancelToken&&r.cancelToken.subscribe(l),r.signal&&(r.signal.aborted?l():r.signal.addEventListener(`abort`,l)));let _=un(r.url);if(_&&!J.protocols.includes(_)){n(new q(`Unsupported protocol `+_+`:`,q.ERR_BAD_REQUEST,e)),m();return}h.send(i||null)})},Mn=(e,t)=>{if(e=e?e.filter(Boolean):[],!t&&!e.length)return;let n=new AbortController,r=!1,i=function(e){if(!r){r=!0,o();let t=e instanceof Error?e:this.reason;n.abort(t instanceof q?t:new cn(t instanceof Error?t.message:t))}},a=t&&setTimeout(()=>{a=null,i(new q(`timeout of ${t}ms exceeded`,q.ETIMEDOUT))},t),o=()=>{e&&=(a&&clearTimeout(a),a=null,e.forEach(e=>{e.unsubscribe?e.unsubscribe(i):e.removeEventListener(`abort`,i)}),null)};e.forEach(e=>e.addEventListener(`abort`,i,{once:!0}));let{signal:s}=n;return s.unsubscribe=()=>W.asap(o),s},Nn=function*(e,t){let n=e.byteLength;if(!t||n<t){yield e;return}let r=0,i;for(;r<n;)i=r+t,yield e.slice(r,i),r=i},Pn=async function*(e,t){for await(let n of Fn(e))yield*Nn(n,t)},Fn=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}let t=e.getReader();try{for(;;){let{done:e,value:n}=await t.read();if(e)break;yield n}}finally{await t.cancel()}},In=(e,t,n,r)=>{let i=Pn(e,t),a=0,o,s=e=>{o||(o=!0,r&&r(e))};return new ReadableStream({async pull(e){try{let{done:t,value:r}=await i.next();if(t){s(),e.close();return}let o=r.byteLength;n&&n(a+=o),e.enqueue(new Uint8Array(r))}catch(e){throw s(e),e}},cancel(e){return s(e),i.return()}},{highWaterMark:2})},Ln=e=>e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102,Rn=(e,t,n)=>t+2<n&&Ln(e.charCodeAt(t+1))&&Ln(e.charCodeAt(t+2));function zn(e){if(!e||typeof e!=`string`||!e.startsWith(`data:`))return 0;let t=e.indexOf(`,`);if(t<0)return 0;let n=e.slice(5,t),r=e.slice(t+1);if(/;base64/i.test(n)){let e=r.length,t=r.length;for(let n=0;n<t;n++)if(r.charCodeAt(n)===37&&n+2<t){let t=r.charCodeAt(n+1),i=r.charCodeAt(n+2);Ln(t)&&Ln(i)&&(e-=2,n+=2)}let n=0,i=t-1,a=e=>e>=2&&r.charCodeAt(e-2)===37&&r.charCodeAt(e-1)===51&&(r.charCodeAt(e)===68||r.charCodeAt(e)===100);i>=0&&(r.charCodeAt(i)===61?(n++,i--):a(i)&&(n++,i-=3)),n===1&&i>=0&&(r.charCodeAt(i)===61||a(i))&&n++;let o=Math.floor(e/4)*3-(n||0);return o>0?o:0}let i=0;for(let e=0,t=r.length;e<t;e++){let n=r.charCodeAt(e);if(n===37&&Rn(r,e,t))i+=1,e+=2;else if(n<128)i+=1;else if(n<2048)i+=2;else if(n>=55296&&n<=56319&&e+1<t){let t=r.charCodeAt(e+1);t>=56320&&t<=57343?(i+=4,e++):i+=3}else i+=3}return i}var Bn=`1.18.1`,Vn=64*1024,{isFunction:Hn}=W,Un=e=>encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi,(e,t)=>String.fromCharCode(parseInt(t,16))),Wn=e=>{if(!W.isString(e))return e;try{return decodeURIComponent(e)}catch{return e}},Gn=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Kn=e=>{let t=e.indexOf(`://`),n=e;return t!==-1&&(n=n.slice(t+3)),n.includes(`@`)||n.includes(`:`)},qn=e=>{let t=W.global!==void 0&&W.global!==null?W.global:globalThis,{ReadableStream:n,TextEncoder:r}=t;e=W.merge.call({skipUndefined:!0},{Request:t.Request,Response:t.Response},e);let{fetch:i,Request:a,Response:o}=e,s=i?Hn(i):typeof fetch==`function`,c=Hn(a),l=Hn(o);if(!s)return!1;let u=s&&Hn(n),d=s&&(typeof r==`function`?(e=>t=>e.encode(t))(new r):async e=>new Uint8Array(await new a(e).arrayBuffer())),f=c&&u&&Gn(()=>{let e=!1,t=new a(J.origin,{body:new n,method:`POST`,get duplex(){return e=!0,`half`}}),r=t.headers.has(`Content-Type`);return t.body!=null&&t.body.cancel(),e&&!r}),p=l&&u&&Gn(()=>W.isReadableStream(new o(``).body)),m={stream:p&&(e=>e.body)};s&&[`text`,`arrayBuffer`,`blob`,`formData`,`stream`].forEach(e=>{!m[e]&&(m[e]=(t,n)=>{let r=t&&t[e];if(r)return r.call(t);throw new q(`Response type '${e}' is not supported`,q.ERR_NOT_SUPPORT,n)})});let h=async e=>{if(e==null)return 0;if(W.isBlob(e))return e.size;if(W.isSpecCompliantForm(e))return(await new a(J.origin,{method:`POST`,body:e}).arrayBuffer()).byteLength;if(W.isArrayBufferView(e)||W.isArrayBuffer(e))return e.byteLength;if(W.isURLSearchParams(e)&&(e+=``),W.isString(e))return(await d(e)).byteLength},g=async(e,t)=>W.toFiniteNumber(e.getContentLength())??h(t);return async e=>{let{url:t,method:n,data:s,signal:l,cancelToken:d,timeout:_,onDownloadProgress:v,onUploadProgress:y,responseType:b,headers:x,withCredentials:S=`same-origin`,fetchOptions:C,maxContentLength:w,maxBodyLength:T}=An(e),E=W.isNumber(w)&&w>-1,ee=W.isNumber(T)&&T>-1,D=t=>W.hasOwnProp(e,t)?e[t]:void 0,te=i||fetch;b=b?(b+``).toLowerCase():`text`;let O=Mn([l,d&&d.toAbortSignal()],_),k=null,A=O&&O.unsubscribe&&(()=>{O.unsubscribe()}),j,M=null,ne=()=>new q(`Request body larger than maxBodyLength limit`,q.ERR_BAD_REQUEST,e,k);try{let i,l=D(`auth`);if(l&&(i={username:W.getSafeProp(l,`username`)||``,password:W.getSafeProp(l,`password`)||``}),Kn(t)){let e=new URL(t,J.origin);!i&&(e.username||e.password)&&(i={username:Wn(e.username),password:Wn(e.password)}),(e.username||e.password)&&(e.username=``,e.password=``,t=e.href)}if(i&&(x.delete(`authorization`),x.set(`Authorization`,`Basic `+btoa(Un((i.username||``)+`:`+(i.password||``))))),E&&typeof t==`string`&&t.startsWith(`data:`)&&zn(t)>w)throw new q(`maxContentLength size of `+w+` exceeded`,q.ERR_BAD_RESPONSE,e,k);if(ee&&n!==`get`&&n!==`head`){let e=await h(s);if(typeof e==`number`&&isFinite(e)&&(j=e,e>T))throw ne()}let d=ee&&(W.isReadableStream(s)||W.isStream(s)),_=(e,t,n)=>In(e,Vn,e=>{if(ee&&e>T)throw M=ne();t&&t(e)},n);if(f&&n!==`get`&&n!==`head`&&(y||d)){if(j??=await g(x,s),j!==0||d){let e=new a(t,{method:`POST`,body:s,duplex:`half`}),n;if(W.isFormData(s)&&(n=e.headers.get(`content-type`))&&x.setContentType(n),e.body){let[t,n]=y&&mn(j,pn(hn(y)))||[];s=_(e.body,t,n)}}}else if(d&&!c&&u&&n!==`get`&&n!==`head`)s=_(s);else if(d&&c&&!f&&n!==`get`&&n!==`head`)throw new q(`Stream request bodies are not supported by the current fetch implementation`,q.ERR_NOT_SUPPORT,e,k);W.isString(S)||(S=S?`include`:`omit`);let re=c&&`credentials`in a.prototype;if(W.isFormData(s)){let e=x.getContentType();e&&/^multipart\/form-data/i.test(e)&&!/boundary=/i.test(e)&&x.delete(`content-type`)}x.set(`User-Agent`,`axios/`+Bn,!1);let ie={...C,signal:O,method:n.toUpperCase(),headers:bt(x.normalize()),body:s,duplex:`half`,credentials:re?S:void 0};k=c&&new a(t,ie);let N=await(c?te(k,C):te(t,ie)),ae=K.from(N.headers);if(E){let t=W.toFiniteNumber(ae.getContentLength());if(t!=null&&t>w)throw new q(`maxContentLength size of `+w+` exceeded`,q.ERR_BAD_RESPONSE,e,k)}let oe=p&&(b===`stream`||b===`response`);if(p&&N.body&&(v||E||oe&&A)){let t={};[`status`,`statusText`,`headers`].forEach(e=>{t[e]=N[e]});let n=W.toFiniteNumber(ae.getContentLength()),[r,i]=v&&mn(n,pn(hn(v),!0))||[],a=0;N=new o(In(N.body,Vn,t=>{if(E&&(a=t,a>w))throw new q(`maxContentLength size of `+w+` exceeded`,q.ERR_BAD_RESPONSE,e,k);r&&r(t)},()=>{i&&i(),A&&A()}),t)}b||=`text`;let P=await m[W.findKey(m,b)||`text`](N,e);if(E&&!p&&!oe){let t;if(P!=null&&(typeof P.byteLength==`number`?t=P.byteLength:typeof P.size==`number`?t=P.size:typeof P==`string`&&(t=typeof r==`function`?new r().encode(P).byteLength:P.length)),typeof t==`number`&&t>w)throw new q(`maxContentLength size of `+w+` exceeded`,q.ERR_BAD_RESPONSE,e,k)}return!oe&&A&&A(),await new Promise((t,n)=>{ln(t,n,{data:P,headers:K.from(N.headers),status:N.status,statusText:N.statusText,config:e,request:k})})}catch(t){if(A&&A(),O&&O.aborted&&O.reason instanceof q){let n=O.reason;throw n.config=e,k&&(n.request=k),t!==n&&Object.defineProperty(n,"cause",{__proto__:null,value:t,writable:!0,enumerable:!1,configurable:!0}),n}if(M)throw k&&!M.request&&(M.request=k),M;if(t instanceof q)throw k&&!t.request&&(t.request=k),t;if(t&&t.name===`TypeError`&&/Load failed|fetch/i.test(t.message)){let n=new q(`Network Error`,q.ERR_NETWORK,e,k,t&&t.response);throw Object.defineProperty(n,"cause",{__proto__:null,value:t.cause||t,writable:!0,enumerable:!1,configurable:!0}),n}throw q.from(t,t&&t.code,e,k,t&&t.response)}}},Jn=new Map,Yn=e=>{let t=e&&e.env||{},{fetch:n,Request:r,Response:i}=t,a=[r,i,n],o=a.length,s,c,l=Jn;for(;o--;)s=a[o],c=l.get(s),c===void 0&&l.set(s,c=o?new Map:qn(t)),l=c;return c};Yn();var Xn={http:null,xhr:jn,fetch:{get:Yn}};W.forEach(Xn,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{__proto__:null,value:t})}catch{}Object.defineProperty(e,"adapterName",{__proto__:null,value:t})}});var Zn=e=>`- ${e}`,Qn=e=>W.isFunction(e)||e===null||e===!1;function $n(e,t){e=W.isArray(e)?e:[e];let{length:n}=e,r,i,a={};for(let o=0;o<n;o++){r=e[o];let n;if(i=r,!Qn(r)&&(i=Xn[(n=String(r)).toLowerCase()],i===void 0))throw new q(`Unknown adapter '${n}'`);if(i&&(W.isFunction(i)||(i=i.get(t))))break;a[n||`#`+o]=i}if(!i){let e=Object.entries(a).map(([e,t])=>`adapter ${e} `+(t===!1?`is not supported by the environment`:`is not available in the build`));throw new q(`There is no suitable adapter to dispatch the request `+(n?e.length>1?`since :
`+e.map(Zn).join(`
`):` `+Zn(e[0]):`as no adapter specified`),q.ERR_NOT_SUPPORT)}return i}var er={getAdapter:$n,adapters:Xn};function tr(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new cn(null,e)}function nr(e){return tr(e),e.headers=K.from(e.headers),e.data=on.call(e,e.transformRequest),[`post`,`put`,`patch`].indexOf(e.method)!==-1&&e.headers.setContentType(`application/x-www-form-urlencoded`,!1),er.getAdapter(e.adapter||an.adapter,e)(e).then(function(t){tr(e),e.response=t;try{t.data=on.call(e,e.transformResponse,t)}finally{delete e.response}return t.headers=K.from(t.headers),t},function(t){if(!sn(t)&&(tr(e),t&&t.response)){e.response=t.response;try{t.response.data=on.call(e,e.transformResponse,t.response)}finally{delete e.response}t.response.headers=K.from(t.response.headers)}return Promise.reject(t)})}var rr={};[`object`,`boolean`,`number`,`function`,`string`,`symbol`].forEach((e,t)=>{rr[e]=function(n){return typeof n===e||`a`+(t<1?`n `:` `)+e}});var ir={};rr.transitional=function(e,t,n){function r(e,t){return`[Axios v`+Bn+`] Transitional option '`+e+`'`+t+(n?`. `+n:``)}return(n,i,a)=>{if(e===!1)throw new q(r(i,` has been removed`+(t?` in `+t:``)),q.ERR_DEPRECATED);return t&&!ir[i]&&(ir[i]=!0,console.warn(r(i,` has been deprecated since v`+t+` and will be removed in the near future`))),!e||e(n,i,a)}},rr.spelling=function(e){return(t,n)=>(console.warn(`${n} is likely a misspelling of ${e}`),!0)};function ar(e,t,n){if(typeof e!=`object`||!e)throw new q(`options must be an object`,q.ERR_BAD_OPTION_VALUE);let r=Object.keys(e),i=r.length;for(;i-->0;){let a=r[i],o=Object.prototype.hasOwnProperty.call(t,a)?t[a]:void 0;if(o){let t=e[a],n=t===void 0||o(t,a,e);if(n!==!0)throw new q(`option `+a+` must be `+n,q.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new q(`Unknown option `+a,q.ERR_BAD_OPTION)}}var or={assertOptions:ar,validators:rr},Z=or.validators,Q=class{constructor(e){this.defaults=e||{},this.interceptors={request:new Ht,response:new Ht}}async request(e,t){try{return await this._request(e,t)}catch(e){if(e instanceof Error){let t={};Error.captureStackTrace?Error.captureStackTrace(t):t=Error();let n=(()=>{if(!t.stack)return``;let e=t.stack.indexOf(`
`);return e===-1?``:t.stack.slice(e+1)})();try{if(!e.stack)e.stack=n;else if(n){let t=n.indexOf(`
`),r=t===-1?-1:n.indexOf(`
`,t+1),i=r===-1?``:n.slice(r+1);String(e.stack).endsWith(i)||(e.stack+=`
`+n)}}catch{}}throw e}}_request(e,t){typeof e==`string`?(t||={},t.url=e):t=e||{},t=X(this.defaults,t);let{transitional:n,paramsSerializer:r,headers:i}=t;n!==void 0&&or.assertOptions(n,{silentJSONParsing:Z.transitional(Z.boolean),forcedJSONParsing:Z.transitional(Z.boolean),clarifyTimeoutError:Z.transitional(Z.boolean),legacyInterceptorReqResOrdering:Z.transitional(Z.boolean),advertiseZstdAcceptEncoding:Z.transitional(Z.boolean),validateStatusUndefinedResolves:Z.transitional(Z.boolean)},!1),r!=null&&(W.isFunction(r)?t.paramsSerializer={serialize:r}:or.assertOptions(r,{encode:Z.function,serialize:Z.function},!0)),t.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls===void 0?t.allowAbsoluteUrls=!0:t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls),or.assertOptions(t,{baseUrl:Z.spelling(`baseURL`),withXsrfToken:Z.spelling(`withXSRFToken`)},!0),t.method=(t.method||this.defaults.method||`get`).toLowerCase();let a=i&&W.merge(i.common,i[t.method]);i&&W.forEach([`delete`,`get`,`head`,`post`,`put`,`patch`,`query`,`common`],e=>{delete i[e]}),t.headers=K.concat(a,i);let o=[],s=!0;this.interceptors.request.forEach(function(e){if(typeof e.runWhen==`function`&&e.runWhen(t)===!1)return;s&&=e.synchronous;let n=t.transitional||Ut;n&&n.legacyInterceptorReqResOrdering?o.unshift(e.fulfilled,e.rejected):o.push(e.fulfilled,e.rejected)});let c=[];this.interceptors.response.forEach(function(e){c.push(e.fulfilled,e.rejected)});let l,u=0,d;if(!s){let e=[nr.bind(this),void 0];for(e.unshift(...o),e.push(...c),d=e.length,l=Promise.resolve(t);u<d;)l=l.then(e[u++],e[u++]);return l}d=o.length;let f=t;for(;u<d;){let e=o[u++],t=o[u++];try{f=e(f)}catch(e){t.call(this,e);break}}try{l=nr.call(this,f)}catch(e){return Promise.reject(e)}for(u=0,d=c.length;u<d;)l=l.then(c[u++],c[u++]);return l}getUri(e){return e=X(this.defaults,e),Vt(Tn(e.baseURL,e.url,e.allowAbsoluteUrls,e),e.params,e.paramsSerializer)}};W.forEach([`delete`,`get`,`head`,`options`],function(e){Q.prototype[e]=function(t,n){return this.request(X(n||{},{method:e,url:t,data:n&&W.hasOwnProp(n,`data`)?n.data:void 0}))}}),W.forEach([`post`,`put`,`patch`,`query`],function(e){function t(t){return function(n,r,i){return this.request(X(i||{},{method:e,headers:t?{"Content-Type":`multipart/form-data`}:{},url:n,data:r}))}}Q.prototype[e]=t(),e!==`query`&&(Q.prototype[e+`Form`]=t(!0))});var sr=class e{constructor(e){if(typeof e!=`function`)throw TypeError(`executor must be a function.`);let t;this.promise=new Promise(function(e){t=e});let n=this;this.promise.then(e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-->0;)n._listeners[t](e);n._listeners=null}),this.promise.then=e=>{let t,r=new Promise(e=>{n.subscribe(e),t=e}).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e(function(e,r,i){n.reason||(n.reason=new cn(e,r,i),t(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;let t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}toAbortSignal(){let e=new AbortController,t=t=>{e.abort(t)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let t;return{token:new e(function(e){t=e}),cancel:t}}};function cr(e){return function(t){return e.apply(null,t)}}function lr(e){return W.isObject(e)&&e.isAxiosError===!0}var ur={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(ur).forEach(([e,t])=>{ur[t]=e});function dr(e){let t=new Q(e),n=oe(Q.prototype.request,t);return W.extend(n,Q.prototype,t,{allOwnKeys:!0}),W.extend(n,t,null,{allOwnKeys:!0}),n.create=function(t){return dr(X(e,t))},n}var $=dr(an);$.Axios=Q,$.CanceledError=cn,$.CancelToken=sr,$.isCancel=sn,$.VERSION=Bn,$.toFormData=It,$.AxiosError=q,$.Cancel=$.CanceledError,$.all=function(e){return Promise.all(e)},$.spread=cr,$.isAxiosError=lr,$.mergeConfig=X,$.AxiosHeaders=K,$.formToJSON=e=>nn(W.isHTMLForm(e)?new FormData(e):e),$.getAdapter=er.getAdapter,$.HttpStatusCode=ur,$.default=$;var fr=$.create({baseURL:`/api`,timeout:6e4,headers:{"Content-Type":`application/json`}});function pr(e){return $.isAxiosError(e)?e.response?.data?.message??`Não foi possível conversar com a API.`:`Ocorreu um erro inesperado.`}export{pr as n,ee as r,fr as t};