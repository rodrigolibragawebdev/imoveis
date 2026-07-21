import{a as e,i as t,n,t as r}from"./api-BJy3zYoj.js";import{$ as i,At as a,B as o,Bt as s,C as c,Ct as l,E as u,Et as d,H as f,Ht as p,Lt as m,Mt as h,N as g,O as _,Ot as v,Rt as y,Tt as b,U as x,Ut as S,Wt as C,Y as w,Z as T,_t as E,b as D,c as O,ct as k,dt as A,ft as j,g as M,gt as N,ht as ee,i as P,jt as F,kt as I,mt as L,n as te,ot as ne,pt as R,qt as z,s as re,st as ie,t as B,tt as ae,u as V,ut as H,vt as U,w as W,yt as G}from"./_plugin-vue_export-helper-uxP-M7hB.js";import{t as oe}from"./index-DE2eIApa.js";import{t as K}from"./tag-Rbhlll57.js";import{n as se,t as ce}from"./select-DaY2R3Fn.js";import{t as q}from"./inputnumber-DN6RvPxW.js";var le=V.extend({name:`tab`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-tab`,{"p-tab-active":t.active,"p-disabled":n.disabled}]}}}),J={name:`Tab`,extends:{name:`BaseTab`,extends:O,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:`BUTTON`},asChild:{type:Boolean,default:!1}},style:le,provide:function(){return{$pcTab:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcTabs`,`$pcTabList`],methods:{onFocus:function(){this.$pcTabs.selectOnFocus&&this.changeActiveValue()},onClick:function(){this.changeActiveValue()},onKeydown:function(e){switch(e.code){case`ArrowRight`:this.onArrowRightKey(e);break;case`ArrowLeft`:this.onArrowLeftKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`PageDown`:this.onPageDownKey(e);break;case`PageUp`:this.onPageUpKey(e);break;case`Enter`:case`NumpadEnter`:case`Space`:this.onEnterKey(e);break}},onArrowRightKey:function(e){var t=this.findNextTab(e.currentTarget);t?this.changeFocusedTab(e,t):this.onHomeKey(e),e.preventDefault()},onArrowLeftKey:function(e){var t=this.findPrevTab(e.currentTarget);t?this.changeFocusedTab(e,t):this.onEndKey(e),e.preventDefault()},onHomeKey:function(e){var t=this.findFirstTab();this.changeFocusedTab(e,t),e.preventDefault()},onEndKey:function(e){var t=this.findLastTab();this.changeFocusedTab(e,t),e.preventDefault()},onPageDownKey:function(e){this.scrollInView(this.findLastTab()),e.preventDefault()},onPageUpKey:function(e){this.scrollInView(this.findFirstTab()),e.preventDefault()},onEnterKey:function(e){this.changeActiveValue()},findNextTab:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.nextElementSibling;return t?c(t,`data-p-disabled`)||c(t,`data-pc-section`)===`activebar`?this.findNextTab(t):f(t,`[data-pc-name="tab"]`):null},findPrevTab:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.previousElementSibling;return t?c(t,`data-p-disabled`)||c(t,`data-pc-section`)===`activebar`?this.findPrevTab(t):f(t,`[data-pc-name="tab"]`):null},findFirstTab:function(){return this.findNextTab(this.$pcTabList.$refs.tabs.firstElementChild,!0)},findLastTab:function(){return this.findPrevTab(this.$pcTabList.$refs.tabs.lastElementChild,!0)},changeActiveValue:function(){this.$pcTabs.updateValue(this.value)},changeFocusedTab:function(e,t){g(t),this.scrollInView(t)},scrollInView:function(e){var t;e==null||(t=e.scrollIntoView)==null||t.call(e,{block:`nearest`})}},computed:{active:function(){return w(this.$pcTabs?.d_value,this.value)},id:function(){return`${this.$pcTabs?.$id}_tab_${this.value}`},ariaControls:function(){return`${this.$pcTabs?.$id}_tabpanel_${this.value}`},attrs:function(){return l(this.asAttrs,this.a11yAttrs,this.ptmi(`root`,this.ptParams))},asAttrs:function(){return this.as===`BUTTON`?{type:`button`,disabled:this.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.active?this.$pcTabs.tabindex:-1,role:`tab`,"aria-selected":this.active,"aria-controls":this.ariaControls,"data-pc-name":`tab`,"data-p-disabled":this.disabled,"data-p-active":this.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.active}}},dataP:function(){return x({active:this.active})}},directives:{ripple:P}};function ue(e,t,n,r,i,a){var o=F(`ripple`);return e.asChild?I(e.$slots,`default`,{key:1,dataP:a.dataP,class:C(e.cx(`root`)),active:a.active,a11yAttrs:a.a11yAttrs,onClick:a.onClick}):y((d(),j(h(e.as),l({key:0,class:e.cx(`root`),"data-p":a.dataP,onClick:a.onClick},a.attrs),{default:m(function(){return[I(e.$slots,`default`)]}),_:3},16,[`class`,`data-p`,`onClick`])),[[o]])}J.render=ue;var de={name:`ChevronLeftIcon`,extends:re};function fe(e){return ge(e)||he(e)||me(e)||pe()}function pe(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function me(e,t){if(e){if(typeof e==`string`)return Y(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Y(e,t):void 0}}function he(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function ge(e){if(Array.isArray(e))return Y(e)}function Y(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function _e(e,t,n,r,i,a){return d(),L(`svg`,l({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),fe(t[0]||=[A(`path`,{d:`M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z`,fill:`currentColor`},null,-1)]),16)}de.render=_e;var ve={name:`ChevronRightIcon`,extends:re};function ye(e){return Ce(e)||Se(e)||xe(e)||be()}function be(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function xe(e,t){if(e){if(typeof e==`string`)return X(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?X(e,t):void 0}}function Se(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Ce(e){if(Array.isArray(e))return X(e)}function X(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function we(e,t,n,r,i,a){return d(),L(`svg`,l({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),ye(t[0]||=[A(`path`,{d:`M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z`,fill:`currentColor`},null,-1)]),16)}ve.render=we;var Te={name:`TabList`,extends:{name:`BaseTabList`,extends:O,props:{},style:V.extend({name:`tablist`,classes:{root:`p-tablist`,content:`p-tablist-content p-tablist-viewport`,tabList:`p-tablist-tab-list`,activeBar:`p-tablist-active-bar`,prevButton:`p-tablist-prev-button p-tablist-nav-button`,nextButton:`p-tablist-next-button p-tablist-nav-button`}}),provide:function(){return{$pcTabList:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcTabs`],data:function(){return{isPrevButtonEnabled:!1,isNextButtonEnabled:!0}},resizeObserver:void 0,inkBarObserver:void 0,watch:{showNavigators:function(e){e?this.bindResizeObserver():this.unbindResizeObserver()},activeValue:{flush:`post`,handler:function(){this.updateInkBar(),this.bindInkBarObserver()}}},mounted:function(){var e=this;setTimeout(function(){e.updateInkBar(),e.bindInkBarObserver()},150),this.showNavigators&&(this.updateButtonState(),this.bindResizeObserver())},updated:function(){this.showNavigators&&this.updateButtonState()},beforeUnmount:function(){this.unbindResizeObserver(),this.unbindInkBarObserver()},methods:{onScroll:function(e){this.showNavigators&&this.updateButtonState(),e.preventDefault()},onPrevButtonClick:function(){var e=this.$refs.content,t=this.getVisibleButtonWidths(),n=W(e)-t,r=Math.abs(e.scrollLeft)-n*.8,i=Math.max(r,0);e.scrollLeft=_(e)?-1*i:i},onNextButtonClick:function(){var e=this.$refs.content,t=this.getVisibleButtonWidths(),n=W(e)-t,r=Math.abs(e.scrollLeft)+n*.8,i=e.scrollWidth-n,a=Math.min(r,i);e.scrollLeft=_(e)?-1*a:a},bindResizeObserver:function(){var e=this;this.resizeObserver=new ResizeObserver(function(){return e.updateButtonState()}),this.resizeObserver.observe(this.$refs.list)},unbindResizeObserver:function(){var e;(e=this.resizeObserver)==null||e.unobserve(this.$refs.list),this.resizeObserver=void 0},bindInkBarObserver:function(){var e=this;this.unbindInkBarObserver();var t=this.$refs.content,n=f(t,`[data-pc-name="tab"][data-p-active="true"]`);n&&(this.inkBarObserver=new ResizeObserver(function(){return e.updateInkBar()}),this.inkBarObserver.observe(n))},unbindInkBarObserver:function(){var e;(e=this.inkBarObserver)==null||e.disconnect(),this.inkBarObserver=void 0},updateInkBar:function(){var e=this.$refs,t=e.content,n=e.inkbar,r=e.tabs;if(n){var i=f(t,`[data-pc-name="tab"][data-p-active="true"]`);this.$pcTabs.isVertical()?(n.style.height=M(i)+`px`,n.style.top=D(i).top-D(r).top+`px`):(n.style.width=o(i)+`px`,n.style.left=D(i).left-D(r).left+`px`)}},updateButtonState:function(){var e=this.$refs,t=e.list,n=e.content,r=n.scrollTop,i=n.scrollWidth,a=n.scrollHeight,o=n.offsetWidth,s=n.offsetHeight,c=Math.abs(n.scrollLeft),l=[W(n),u(n)],d=l[0],f=l[1];this.$pcTabs.isVertical()?(this.isPrevButtonEnabled=r!==0,this.isNextButtonEnabled=t.offsetHeight>=s&&parseInt(r)!==a-f):(this.isPrevButtonEnabled=c!==0,this.isNextButtonEnabled=t.offsetWidth>=o&&parseInt(c)!==i-d)},getVisibleButtonWidths:function(){var e=this.$refs,t=e.prevButton,n=e.nextButton,r=0;return this.showNavigators&&(r=(t?.offsetWidth||0)+(n?.offsetWidth||0)),r}},computed:{templates:function(){return this.$pcTabs.$slots},activeValue:function(){return this.$pcTabs.d_value},showNavigators:function(){return this.$pcTabs.showNavigators},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0},dataP:function(){return x({scrollable:this.$pcTabs.scrollable})}},components:{ChevronLeftIcon:de,ChevronRightIcon:ve},directives:{ripple:P}},Ee=[`data-p`],De=[`aria-label`,`tabindex`],Oe=[`data-p`],ke=[`aria-orientation`],Ae=[`aria-label`,`tabindex`];function je(e,t,n,r,i,a){var o=F(`ripple`);return d(),L(`div`,l({ref:`list`,class:e.cx(`root`),"data-p":a.dataP},e.ptmi(`root`)),[a.showNavigators&&i.isPrevButtonEnabled?y((d(),L(`button`,l({key:0,ref:`prevButton`,type:`button`,class:e.cx(`prevButton`),"aria-label":a.prevButtonAriaLabel,tabindex:a.$pcTabs.tabindex,onClick:t[0]||=function(){return a.onPrevButtonClick&&a.onPrevButtonClick.apply(a,arguments)}},e.ptm(`prevButton`),{"data-pc-group-section":`navigator`}),[(d(),j(h(a.templates.previcon||`ChevronLeftIcon`),l({"aria-hidden":`true`},e.ptm(`prevIcon`)),null,16))],16,De)),[[o]]):R(``,!0),A(`div`,l({ref:`content`,class:e.cx(`content`),onScroll:t[1]||=function(){return a.onScroll&&a.onScroll.apply(a,arguments)},"data-p":a.dataP},e.ptm(`content`)),[A(`div`,l({ref:`tabs`,class:e.cx(`tabList`),role:`tablist`,"aria-orientation":a.$pcTabs.orientation||`horizontal`},e.ptm(`tabList`)),[I(e.$slots,`default`),A(`span`,l({ref:`inkbar`,class:e.cx(`activeBar`),role:`presentation`,"aria-hidden":`true`},e.ptm(`activeBar`)),null,16)],16,ke)],16,Oe),a.showNavigators&&i.isNextButtonEnabled?y((d(),L(`button`,l({key:1,ref:`nextButton`,type:`button`,class:e.cx(`nextButton`),"aria-label":a.nextButtonAriaLabel,tabindex:a.$pcTabs.tabindex,onClick:t[2]||=function(){return a.onNextButtonClick&&a.onNextButtonClick.apply(a,arguments)}},e.ptm(`nextButton`),{"data-pc-group-section":`navigator`}),[(d(),j(h(a.templates.nexticon||`ChevronRightIcon`),l({"aria-hidden":`true`},e.ptm(`nextIcon`)),null,16))],16,Ae)),[[o]]):R(``,!0)],16,Ee)}Te.render=je;var Me=V.extend({name:`tabpanel`,classes:{root:function(e){return[`p-tabpanel`,{"p-tabpanel-active":e.instance.active}]}}}),Z={name:`TabPanel`,extends:{name:`BaseTabPanel`,extends:O,props:{value:{type:[String,Number],default:void 0},as:{type:[String,Object],default:`DIV`},asChild:{type:Boolean,default:!1},header:null,headerStyle:null,headerClass:null,headerProps:null,headerActionProps:null,contentStyle:null,contentClass:null,contentProps:null,disabled:Boolean},style:Me,provide:function(){return{$pcTabPanel:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcTabs`],computed:{active:function(){return w(this.$pcTabs?.d_value,this.value)},id:function(){return`${this.$pcTabs?.$id}_tabpanel_${this.value}`},ariaLabelledby:function(){return`${this.$pcTabs?.$id}_tab_${this.value}`},attrs:function(){return l(this.a11yAttrs,this.ptmi(`root`,this.ptParams))},a11yAttrs:function(){return{id:this.id,tabindex:this.$pcTabs?.tabindex,role:`tabpanel`,"aria-labelledby":this.ariaLabelledby,"data-pc-name":`tabpanel`,"data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function Ne(e,t,n,r,i,a){var o,s;return a.$pcTabs?(d(),L(k,{key:1},[e.asChild?I(e.$slots,`default`,{key:1,class:C(e.cx(`root`)),active:a.active,a11yAttrs:a.a11yAttrs}):(d(),L(k,{key:0},[!((o=a.$pcTabs)!=null&&o.lazy)||a.active?y((d(),j(h(e.as),l({key:0,class:e.cx(`root`)},a.attrs),{default:m(function(){return[I(e.$slots,`default`)]}),_:3},16,[`class`])),[[ne,(s=a.$pcTabs)!=null&&s.lazy?!0:a.active]]):R(``,!0)],64))],64)):I(e.$slots,`default`,{key:0})}Z.render=Ne;var Pe={name:`TabPanels`,extends:{name:`BaseTabPanels`,extends:O,props:{},style:V.extend({name:`tabpanels`,classes:{root:`p-tabpanels`}}),provide:function(){return{$pcTabPanels:this,$parentInstance:this}}},inheritAttrs:!1};function Fe(e,t,n,r,i,a){return d(),L(`div`,l({class:e.cx(`root`),role:`presentation`},e.ptmi(`root`)),[I(e.$slots,`default`)],16)}Pe.render=Fe;var Ie=V.extend({name:`tabs`,style:`
    .p-tabs {
        display: flex;
        flex-direction: column;
    }

    .p-tablist {
        display: flex;
        position: relative;
        overflow: hidden;
        background: dt('tabs.tablist.background');
    }

    .p-tablist-viewport {
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        scrollbar-width: none;
        overscroll-behavior: contain auto;
    }

    .p-tablist-viewport::-webkit-scrollbar {
        display: none;
    }

    .p-tablist-tab-list {
        position: relative;
        display: flex;
        border-style: solid;
        border-color: dt('tabs.tablist.border.color');
        border-width: dt('tabs.tablist.border.width');
    }

    .p-tablist-content {
        flex-grow: 1;
    }

    .p-tablist-nav-button {
        all: unset;
        position: absolute !important;
        flex-shrink: 0;
        inset-block-start: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: dt('tabs.nav.button.background');
        color: dt('tabs.nav.button.color');
        width: dt('tabs.nav.button.width');
        transition:
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        box-shadow: dt('tabs.nav.button.shadow');
        outline-color: transparent;
        cursor: pointer;
    }

    .p-tablist-nav-button:focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.nav.button.focus.ring.shadow');
        outline: dt('tabs.nav.button.focus.ring.width') dt('tabs.nav.button.focus.ring.style') dt('tabs.nav.button.focus.ring.color');
        outline-offset: dt('tabs.nav.button.focus.ring.offset');
    }

    .p-tablist-nav-button:hover {
        color: dt('tabs.nav.button.hover.color');
    }

    .p-tablist-prev-button {
        inset-inline-start: 0;
    }

    .p-tablist-next-button {
        inset-inline-end: 0;
    }

    .p-tablist-prev-button:dir(rtl),
    .p-tablist-next-button:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-tab {
        flex-shrink: 0;
        cursor: pointer;
        user-select: none;
        position: relative;
        border-style: solid;
        white-space: nowrap;
        gap: dt('tabs.tab.gap');
        background: dt('tabs.tab.background');
        border-width: dt('tabs.tab.border.width');
        border-color: dt('tabs.tab.border.color');
        color: dt('tabs.tab.color');
        padding: dt('tabs.tab.padding');
        font-weight: dt('tabs.tab.font.weight');
        transition:
            background dt('tabs.transition.duration'),
            border-color dt('tabs.transition.duration'),
            color dt('tabs.transition.duration'),
            outline-color dt('tabs.transition.duration'),
            box-shadow dt('tabs.transition.duration');
        margin: dt('tabs.tab.margin');
        outline-color: transparent;
    }

    .p-tab:not(.p-disabled):focus-visible {
        z-index: 1;
        box-shadow: dt('tabs.tab.focus.ring.shadow');
        outline: dt('tabs.tab.focus.ring.width') dt('tabs.tab.focus.ring.style') dt('tabs.tab.focus.ring.color');
        outline-offset: dt('tabs.tab.focus.ring.offset');
    }

    .p-tab:not(.p-tab-active):not(.p-disabled):hover {
        background: dt('tabs.tab.hover.background');
        border-color: dt('tabs.tab.hover.border.color');
        color: dt('tabs.tab.hover.color');
    }

    .p-tab-active {
        background: dt('tabs.tab.active.background');
        border-color: dt('tabs.tab.active.border.color');
        color: dt('tabs.tab.active.color');
    }

    .p-tabpanels {
        background: dt('tabs.tabpanel.background');
        color: dt('tabs.tabpanel.color');
        padding: dt('tabs.tabpanel.padding');
        outline: 0 none;
    }

    .p-tabpanel:focus-visible {
        box-shadow: dt('tabs.tabpanel.focus.ring.shadow');
        outline: dt('tabs.tabpanel.focus.ring.width') dt('tabs.tabpanel.focus.ring.style') dt('tabs.tabpanel.focus.ring.color');
        outline-offset: dt('tabs.tabpanel.focus.ring.offset');
    }

    .p-tablist-active-bar {
        z-index: 1;
        display: block;
        position: absolute;
        inset-block-end: dt('tabs.active.bar.bottom');
        height: dt('tabs.active.bar.height');
        background: dt('tabs.active.bar.background');
        transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
    }
`,classes:{root:function(e){return[`p-tabs p-component`,{"p-tabs-scrollable":e.props.scrollable}]}}}),Le={name:`Tabs`,extends:{name:`BaseTabs`,extends:O,props:{value:{type:[String,Number],default:void 0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},showNavigators:{type:Boolean,default:!0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1}},style:Ie,provide:function(){return{$pcTabs:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:value`],data:function(){return{d_value:this.value}},watch:{value:function(e){this.d_value=e}},methods:{updateValue:function(e){this.d_value!==e&&(this.d_value=e,this.$emit(`update:value`,e))},isVertical:function(){return this.orientation===`vertical`}}};function Re(e,t,n,r,i,a){return d(),L(`div`,l({class:e.cx(`root`)},e.ptmi(`root`)),[I(e.$slots,`default`)],16)}Le.render=Re;var ze=V.extend({name:`togglebutton`,style:`
    .p-togglebutton {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        color: dt('togglebutton.color');
        background: dt('togglebutton.background');
        border: 1px solid dt('togglebutton.border.color');
        padding: dt('togglebutton.padding');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
        border-radius: dt('togglebutton.border.radius');
        outline-color: transparent;
        font-weight: dt('togglebutton.font.weight');
    }

    .p-togglebutton-content {
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        gap: dt('togglebutton.gap');
        padding: dt('togglebutton.content.padding');
        background: transparent;
        border-radius: dt('togglebutton.content.border.radius');
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
        background: dt('togglebutton.hover.background');
        color: dt('togglebutton.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked {
        background: dt('togglebutton.checked.background');
        border-color: dt('togglebutton.checked.border.color');
        color: dt('togglebutton.checked.color');
    }

    .p-togglebutton-checked .p-togglebutton-content {
        background: dt('togglebutton.content.checked.background');
        box-shadow: dt('togglebutton.content.checked.shadow');
    }

    .p-togglebutton:focus-visible {
        box-shadow: dt('togglebutton.focus.ring.shadow');
        outline: dt('togglebutton.focus.ring.width') dt('togglebutton.focus.ring.style') dt('togglebutton.focus.ring.color');
        outline-offset: dt('togglebutton.focus.ring.offset');
    }

    .p-togglebutton.p-invalid {
        border-color: dt('togglebutton.invalid.border.color');
    }

    .p-togglebutton:disabled {
        opacity: 1;
        cursor: default;
        background: dt('togglebutton.disabled.background');
        border-color: dt('togglebutton.disabled.border.color');
        color: dt('togglebutton.disabled.color');
    }

    .p-togglebutton-label,
    .p-togglebutton-icon {
        position: relative;
        transition: none;
    }

    .p-togglebutton-icon {
        color: dt('togglebutton.icon.color');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
        color: dt('togglebutton.icon.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
        color: dt('togglebutton.icon.checked.color');
    }

    .p-togglebutton:disabled .p-togglebutton-icon {
        color: dt('togglebutton.icon.disabled.color');
    }

    .p-togglebutton-sm {
        padding: dt('togglebutton.sm.padding');
        font-size: dt('togglebutton.sm.font.size');
    }

    .p-togglebutton-sm .p-togglebutton-content {
        padding: dt('togglebutton.content.sm.padding');
    }

    .p-togglebutton-lg {
        padding: dt('togglebutton.lg.padding');
        font-size: dt('togglebutton.lg.font.size');
    }

    .p-togglebutton-lg .p-togglebutton-content {
        padding: dt('togglebutton.content.lg.padding');
    }

    .p-togglebutton-fluid {
        width: 100%;
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-togglebutton p-component`,{"p-togglebutton-checked":t.active,"p-invalid":t.$invalid,"p-togglebutton-fluid":n.fluid,"p-togglebutton-sm p-inputfield-sm":n.size===`small`,"p-togglebutton-lg p-inputfield-lg":n.size===`large`}]},content:`p-togglebutton-content`,icon:`p-togglebutton-icon`,label:`p-togglebutton-label`}}),Be={name:`BaseToggleButton`,extends:t,props:{onIcon:String,offIcon:String,onLabel:{type:String,default:`Yes`},offLabel:{type:String,default:`No`},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null},size:{type:String,default:null},fluid:{type:Boolean,default:null}},style:ze,provide:function(){return{$pcToggleButton:this,$parentInstance:this}}};function Q(e){"@babel/helpers - typeof";return Q=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Q(e)}function Ve(e,t,n){return(t=He(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function He(e){var t=Ue(e,`string`);return Q(t)==`symbol`?t:t+``}function Ue(e,t){if(Q(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Q(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var We={name:`ToggleButton`,extends:Be,inheritAttrs:!1,emits:[`change`],methods:{getPTOptions:function(e){return(e===`root`?this.ptmi:this.ptm)(e,{context:{active:this.active,disabled:this.disabled}})},onChange:function(e){!this.disabled&&!this.readonly&&(this.writeValue(!this.d_value,e),this.$emit(`change`,e))},onBlur:function(e){var t,n;(t=(n=this.formField).onBlur)==null||t.call(n,e)}},computed:{active:function(){return this.d_value===!0},hasLabel:function(){return i(this.onLabel)&&i(this.offLabel)},label:function(){return this.hasLabel?this.d_value?this.onLabel:this.offLabel:`\xA0`},dataP:function(){return x(Ve({checked:this.active,invalid:this.$invalid},this.size,this.size))}},directives:{ripple:P}},Ge=[`tabindex`,`disabled`,`aria-pressed`,`aria-label`,`aria-labelledby`,`data-p-checked`,`data-p-disabled`,`data-p`],Ke=[`data-p`];function qe(e,t,n,r,i,a){var o=F(`ripple`);return y((d(),L(`button`,l({type:`button`,class:e.cx(`root`),tabindex:e.tabindex,disabled:e.disabled,"aria-pressed":e.d_value,onClick:t[0]||=function(){return a.onChange&&a.onChange.apply(a,arguments)},onBlur:t[1]||=function(){return a.onBlur&&a.onBlur.apply(a,arguments)}},a.getPTOptions(`root`),{"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,"data-p-checked":a.active,"data-p-disabled":e.disabled,"data-p":a.dataP}),[A(`span`,l({class:e.cx(`content`)},a.getPTOptions(`content`),{"data-p":a.dataP}),[I(e.$slots,`default`,{},function(){return[I(e.$slots,`icon`,{value:e.d_value,class:C(e.cx(`icon`))},function(){return[e.onIcon||e.offIcon?(d(),L(`span`,l({key:0,class:[e.cx(`icon`),e.d_value?e.onIcon:e.offIcon]},a.getPTOptions(`icon`)),null,16)):R(``,!0)]}),A(`span`,l({class:e.cx(`label`)},a.getPTOptions(`label`)),z(a.label),17)]})],16,Ke)],16,Ge)),[[o]])}We.render=qe;var Je=V.extend({name:`selectbutton`,style:`
    .p-selectbutton {
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        outline-color: transparent;
        border-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton {
        border-radius: 0;
        border-width: 1px 1px 1px 0;
    }

    .p-selectbutton .p-togglebutton:focus-visible {
        position: relative;
        z-index: 1;
    }

    .p-selectbutton .p-togglebutton:first-child {
        border-inline-start-width: 1px;
        border-start-start-radius: dt('selectbutton.border.radius');
        border-end-start-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton:last-child {
        border-start-end-radius: dt('selectbutton.border.radius');
        border-end-end-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton.p-invalid {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }

    .p-selectbutton-fluid {
        width: 100%;
    }
    
    .p-selectbutton-fluid .p-togglebutton {
        flex: 1 1 0;
    }
`,classes:{root:function(e){var t=e.props;return[`p-selectbutton p-component`,{"p-invalid":e.instance.$invalid,"p-selectbutton-fluid":t.fluid}]}}}),Ye={name:`BaseSelectButton`,extends:t,props:{options:Array,optionLabel:null,optionValue:null,optionDisabled:null,multiple:Boolean,allowEmpty:{type:Boolean,default:!0},dataKey:null,ariaLabelledby:{type:String,default:null},size:{type:String,default:null},fluid:{type:Boolean,default:null}},style:Je,provide:function(){return{$pcSelectButton:this,$parentInstance:this}}};function Xe(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(!n){if(Array.isArray(e)||(n=$e(e))||t){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,o=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||n.return==null||n.return()}finally{if(s)throw a}}}}function Ze(e){return tt(e)||et(e)||$e(e)||Qe()}function Qe(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function $e(e,t){if(e){if(typeof e==`string`)return $(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?$(e,t):void 0}}function et(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function tt(e){if(Array.isArray(e))return $(e)}function $(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var nt={name:`SelectButton`,extends:Ye,inheritAttrs:!1,emits:[`change`],methods:{getOptionLabel:function(e){return this.optionLabel?T(e,this.optionLabel):e},getOptionValue:function(e){return this.optionValue?T(e,this.optionValue):e},getOptionRenderKey:function(e){return this.dataKey?T(e,this.dataKey):this.getOptionLabel(e)},isOptionDisabled:function(e){return this.optionDisabled?T(e,this.optionDisabled):!1},isOptionReadonly:function(e){if(this.allowEmpty)return!1;var t=this.isSelected(e);return this.multiple?t&&this.d_value.length===1:t},onOptionSelect:function(e,t,n){var r=this;if(!(this.disabled||this.isOptionDisabled(t)||this.isOptionReadonly(t))){var i=this.isSelected(t),a=this.getOptionValue(t),o;if(this.multiple)if(i){if(o=this.d_value.filter(function(e){return!w(e,a,r.equalityKey)}),!this.allowEmpty&&o.length===0)return}else o=this.d_value?[].concat(Ze(this.d_value),[a]):[a];else{if(i&&!this.allowEmpty)return;o=i?null:a}this.writeValue(o,e),this.$emit(`change`,{originalEvent:e,value:o})}},isSelected:function(e){var t=!1,n=this.getOptionValue(e);if(this.multiple){if(this.d_value){var r=Xe(this.d_value),i;try{for(r.s();!(i=r.n()).done;){var a=i.value;if(w(a,n,this.equalityKey)){t=!0;break}}}catch(e){r.e(e)}finally{r.f()}}}else t=w(this.d_value,n,this.equalityKey);return t}},computed:{equalityKey:function(){return this.optionValue?null:this.dataKey},dataP:function(){return x({invalid:this.$invalid})}},directives:{ripple:P},components:{ToggleButton:We}},rt=[`aria-labelledby`,`data-p`];function it(e,t,n,r,i,o){var s=a(`ToggleButton`);return d(),L(`div`,l({class:e.cx(`root`),role:`group`,"aria-labelledby":e.ariaLabelledby},e.ptmi(`root`),{"data-p":o.dataP}),[(d(!0),L(k,null,v(e.options,function(t,n){return d(),j(s,{key:o.getOptionRenderKey(t),modelValue:o.isSelected(t),onLabel:o.getOptionLabel(t),offLabel:o.getOptionLabel(t),disabled:e.disabled||o.isOptionDisabled(t),unstyled:e.unstyled,size:e.size,readonly:o.isOptionReadonly(t),onChange:function(e){return o.onOptionSelect(e,t,n)},pt:e.ptm(`pcToggleButton`)},ee({_:2},[e.$slots.option?{name:`default`,fn:m(function(){return[I(e.$slots,`option`,{option:t,index:n},function(){return[A(`span`,l({ref_for:!0},e.ptm(`pcToggleButton`).label),z(o.getOptionLabel(t)),17)]})]}),key:`0`}:void 0]),1032,[`modelValue`,`onLabel`,`offLabel`,`disabled`,`unstyled`,`size`,`readonly`,`onChange`,`pt`])}),128))],16,rt)}nt.render=it;var at=ae(`financing`,()=>{let e=s([]),t=p(!1),i=p(!1),a=p(``);async function o(){t.value=!0,a.value=``;try{let{data:t}=await r.get(`/financing-simulations`);e.value=t}catch(e){a.value=n(e)}finally{t.value=!1}}async function c(e){i.value=!0,a.value=``;try{await r.post(`/financing-simulations`,e),await o()}catch(e){throw a.value=n(e),e}finally{i.value=!1}}async function l(t){a.value=``;try{await r.delete(`/financing-simulations/${t}`),e.value=e.value.filter(e=>e.id!==t)}catch(e){throw a.value=n(e),e}}return{items:e,loading:t,saving:i,error:a,load:o,create:c,remove:l}});function ot(e){let{propertyValue:t,downPayment:n,annualRate:r,termMonths:i,system:a}=e,o=Math.max(t-n,0),s=(1+r/100)**(1/12)-1;if(o===0||i<=0)return{financedAmount:0,monthlyRate:s,firstInstallment:0,lastInstallment:0,totalPaid:0,totalInterest:0};if(a===`sac`){let e=o/i,t=e+o*s,n=e+e*s,r=i*e+s*(o*(i+1))/2;return{financedAmount:o,monthlyRate:s,firstInstallment:t,lastInstallment:n,totalPaid:r,totalInterest:r-o}}let c=s===0?o/i:o*s/(1-(1+s)**-i),l=c*i;return{financedAmount:o,monthlyRate:s,firstInstallment:c,lastInstallment:c,totalPaid:l,totalInterest:l-o}}var st={class:`grid`},ct={class:`col-12 lg:col-5`},lt={class:`surface-card border-1 border-round-3xl p-4 md:p-5 form-panel`},ut={class:`col-12 md:col-6`},dt={class:`col-12 md:col-6`},ft={class:`col-12 md:col-6`},pt={class:`col-12 md:col-6`},mt={class:`col-12`},ht={class:`block mt-2 opacity-60`},gt={class:`col-12 md:col-6`},_t={class:`col-12 md:col-6`},vt={class:`col-12 flex justify-content-end mt-2`},yt={class:`surface-card border-1 border-round-3xl p-4 md:p-5 mt-4 costs-panel`},bt={class:`grid`},xt={class:`col-6`},St={class:`col-6`},Ct={class:`col-6`},wt={class:`col-6`},Tt={class:`furniture-total`},Et={class:`cost-breakdown text-sm mt-4`},Dt={class:`flex justify-content-between py-1`},Ot={class:`flex justify-content-between py-1`},kt={class:`flex justify-content-between py-1`},At={class:`flex justify-content-between py-2 mt-1 total-row`},jt={class:`block mt-3 opacity-60`},Mt={class:`col-12 lg:col-7`},Nt={class:`border-round-3xl p-4 md:p-5 h-full result-panel`},Pt={class:`display-font text-3xl m-0 mb-4`},Ft={class:`text-lg font-normal opacity-70`},It={class:`grid`},Lt={class:`col-6 md:col-3`},Rt={class:`text-lg`},zt={class:`col-6 md:col-3`},Bt={class:`text-lg`},Vt={class:`col-6 md:col-3`},Ht={class:`text-lg`},Ut={class:`col-6 md:col-3`},Wt={class:`text-lg`},Gt={key:1,class:`mt-5`},Kt={class:`grid`},qt={class:`surface-card border-1 border-round-3xl p-4 h-full saved-card`},Jt={class:`flex align-items-start justify-content-between gap-2 mb-2`},Yt={class:`display-font text-lg m-0`},Xt={class:`flex flex-wrap gap-2 mb-3`},Zt={class:`text-sm line-height-3 opacity-80`},Qt={class:`flex justify-content-between`},$t={class:`flex justify-content-between`},en={class:`flex justify-content-between`},tn=B(G({__name:`FinancingSimulator`,setup(t){let n=at(),i=p(5e5),a=p(1e5),o=p(11.19),s=p(30),c=p(`sac`),l=p(`Caixa`),u=p(``),f=p(3),h=p(1),g=p(2),_=p(0),y=[{label:`SAC`,value:`sac`},{label:`Price`,value:`price`}],x=[`Banco do Brasil`,`Caixa`,`BRB`,`Itaú`,`Bradesco`,`Santander`,`Sicoob`,`Sicredi`,`Banrisul`,`Inter`,`Outro`],C=H(()=>c.value===`sac`?`Parcelas decrescentes e menos juros no total — melhor se você pretende amortizar antecipadamente.`:`Parcela fixa do início ao fim — mais fácil de aprovar e de planejar o orçamento.`),w=H(()=>Math.round(s.value*12)),T=H(()=>ot({propertyValue:i.value||0,downPayment:a.value||0,annualRate:o.value||0,termMonths:w.value||0,system:c.value})),D=H(()=>(i.value||0)*(f.value+h.value+g.value)/100),O=H(()=>(a.value||0)+D.value+_.value),M=H(()=>u.value.trim().length>=2&&l.value.trim().length>=2&&T.value.financedAmount>0);function N(e){return new Intl.NumberFormat(`pt-BR`,{style:`currency`,currency:`BRL`,maximumFractionDigits:0}).format(e)}async function ee(){if(M.value)try{await n.create({name:u.value.trim(),propertyValue:i.value,downPayment:a.value,financedAmount:T.value.financedAmount,annualRate:o.value,termMonths:w.value,system:c.value,lender:l.value.trim(),firstInstallment:T.value.firstInstallment,lastInstallment:T.value.lastInstallment,totalPaid:T.value.totalPaid,totalInterest:T.value.totalInterest}),u.value=``}catch{}}function P(e){window.confirm(`Remover a simulação “${e.name}”?`)&&n.remove(e.id)}async function F(){try{let{data:e}=await r.get(`/furniture/items`);_.value=e.reduce((e,t)=>e+(t.price??0),0)}catch{_.value=0}}return b(()=>{n.load(),F()}),(t,r)=>(d(),L(`div`,null,[S(n).error?(d(),j(S(e),{key:0,severity:`error`,class:`mb-4`},{default:m(()=>[E(z(S(n).error),1)]),_:1})):R(``,!0),A(`div`,st,[A(`div`,ct,[A(`div`,lt,[r[18]||=A(`h2`,{class:`display-font text-2xl m-0 mb-4`},` Monte uma simulação `,-1),A(`form`,{class:`grid`,onSubmit:ie(ee,[`prevent`])},[A(`div`,ut,[r[10]||=A(`label`,{for:`sim-value`,class:`block font-bold mb-2`},`Valor do imóvel`,-1),U(S(q),{id:`sim-value`,modelValue:i.value,"onUpdate:modelValue":r[0]||=e=>i.value=e,mode:`currency`,currency:`BRL`,locale:`pt-BR`,class:`w-full`,min:0},null,8,[`modelValue`])]),A(`div`,dt,[r[11]||=A(`label`,{for:`sim-down`,class:`block font-bold mb-2`},`Entrada`,-1),U(S(q),{id:`sim-down`,modelValue:a.value,"onUpdate:modelValue":r[1]||=e=>a.value=e,mode:`currency`,currency:`BRL`,locale:`pt-BR`,class:`w-full`,min:0},null,8,[`modelValue`])]),A(`div`,ft,[r[12]||=A(`label`,{for:`sim-rate`,class:`block font-bold mb-2`},`Taxa de juros (a.a.)`,-1),U(S(q),{id:`sim-rate`,modelValue:o.value,"onUpdate:modelValue":r[2]||=e=>o.value=e,suffix:`%`,locale:`pt-BR`,"min-fraction-digits":1,"max-fraction-digits":2,class:`w-full`,min:.1,max:40},null,8,[`modelValue`]),r[13]||=A(`small`,{class:`block mt-2 opacity-60`},`Referência jul/2026: Caixa 11,19% · Itaú 11,60% · Bradesco 11,70% · Santander 11,79%`,-1)]),A(`div`,pt,[r[14]||=A(`label`,{for:`sim-term`,class:`block font-bold mb-2`},`Prazo (anos)`,-1),U(S(q),{id:`sim-term`,modelValue:s.value,"onUpdate:modelValue":r[3]||=e=>s.value=e,class:`w-full`,min:1,max:35},null,8,[`modelValue`])]),A(`div`,mt,[r[15]||=A(`label`,{class:`block font-bold mb-2`},`Sistema de amortização`,-1),U(S(nt),{modelValue:c.value,"onUpdate:modelValue":r[4]||=e=>c.value=e,options:y,"option-label":`label`,"option-value":`value`,"allow-empty":!1,class:`w-full system-toggle`},null,8,[`modelValue`]),A(`small`,ht,z(C.value),1)]),A(`div`,gt,[r[16]||=A(`label`,{for:`sim-lender`,class:`block font-bold mb-2`},`Financiador`,-1),U(S(ce),{id:`sim-lender`,modelValue:l.value,"onUpdate:modelValue":r[5]||=e=>l.value=e,options:x,editable:``,placeholder:`Selecione ou digite`,class:`w-full`},null,8,[`modelValue`])]),A(`div`,_t,[r[17]||=A(`label`,{for:`sim-name`,class:`block font-bold mb-2`},`Nome da simulação`,-1),U(S(se),{id:`sim-name`,modelValue:u.value,"onUpdate:modelValue":r[6]||=e=>u.value=e,class:`w-full`,placeholder:`Ex.: Apto Vila Mariana - Caixa`,maxlength:`80`},null,8,[`modelValue`])]),A(`div`,vt,[U(S(te),{type:`submit`,label:`Salvar simulação`,icon:`pi pi-bookmark`,loading:S(n).saving,disabled:!M.value},null,8,[`loading`,`disabled`])])],32)]),A(`div`,yt,[r[29]||=A(`h2`,{class:`display-font text-2xl m-0 mb-1`},` Custo inicial estimado `,-1),r[30]||=A(`p`,{class:`text-sm opacity-60 mt-1 mb-4`},` Além da entrada, some as taxas da compra e o que falta comprar para a casa. `,-1),A(`div`,bt,[A(`div`,xt,[r[19]||=A(`label`,{for:`sim-itbi`,class:`block font-bold mb-2 text-sm`},`ITBI`,-1),U(S(q),{id:`sim-itbi`,modelValue:f.value,"onUpdate:modelValue":r[7]||=e=>f.value=e,suffix:`%`,class:`w-full`,min:0,max:10,"max-fraction-digits":1},null,8,[`modelValue`])]),A(`div`,St,[r[20]||=A(`label`,{for:`sim-registro`,class:`block font-bold mb-2 text-sm`},`Registro em cartório`,-1),U(S(q),{id:`sim-registro`,modelValue:h.value,"onUpdate:modelValue":r[8]||=e=>h.value=e,suffix:`%`,class:`w-full`,min:0,max:10,"max-fraction-digits":1},null,8,[`modelValue`])]),A(`div`,Ct,[r[21]||=A(`label`,{for:`sim-bank-fees`,class:`block font-bold mb-2 text-sm`},`Taxas do financiamento`,-1),U(S(q),{id:`sim-bank-fees`,modelValue:g.value,"onUpdate:modelValue":r[9]||=e=>g.value=e,suffix:`%`,class:`w-full`,min:0,max:10,"max-fraction-digits":1},null,8,[`modelValue`])]),A(`div`,wt,[r[22]||=A(`span`,{class:`block font-bold mb-2 text-sm`},`Lista da casa`,-1),A(`div`,Tt,z(N(_.value)),1)])]),A(`div`,Et,[A(`div`,Dt,[r[23]||=A(`span`,null,`Entrada`,-1),A(`span`,null,z(N(a.value||0)),1)]),A(`div`,Ot,[A(`span`,null,`ITBI + registro + taxas (`+z(f.value+h.value+g.value)+`%)`,1),A(`span`,null,z(N(D.value)),1)]),A(`div`,kt,[r[24]||=A(`span`,null,`Móveis e itens da casa`,-1),A(`span`,null,z(N(_.value)),1)]),A(`div`,At,[r[25]||=A(`strong`,null,`Total para tirar do bolso`,-1),A(`strong`,null,z(N(O.value)),1)])]),A(`small`,jt,[r[27]||=E(` Móveis calculados a partir do valor cadastrado em `,-1),U(S(oe),{to:`/casa`},{default:m(()=>[...r[26]||=[E(`Lista para a casa`,-1)]]),_:1}),r[28]||=E(`. Escritura pública não entra porque o contrato de financiamento já serve como título. `,-1)])])]),A(`div`,Mt,[A(`div`,Nt,[r[35]||=A(`span`,{class:`inline-block text-sm uppercase font-bold mb-2 eyebrow`},`Resultado aproximado`,-1),A(`h2`,Pt,[E(z(N(T.value.firstInstallment)),1),A(`span`,Ft,`/mês `+z(c.value===`sac`?`(1ª parcela)`:``),1)]),A(`div`,It,[A(`div`,Lt,[r[31]||=A(`span`,{class:`block text-xs uppercase opacity-60 mb-1`},`Financiado`,-1),A(`strong`,Rt,z(N(T.value.financedAmount)),1)]),A(`div`,zt,[r[32]||=A(`span`,{class:`block text-xs uppercase opacity-60 mb-1`},`Última parcela`,-1),A(`strong`,Bt,z(N(T.value.lastInstallment)),1)]),A(`div`,Vt,[r[33]||=A(`span`,{class:`block text-xs uppercase opacity-60 mb-1`},`Total de juros`,-1),A(`strong`,Ht,z(N(T.value.totalInterest)),1)]),A(`div`,Ut,[r[34]||=A(`span`,{class:`block text-xs uppercase opacity-60 mb-1`},`Total pago`,-1),A(`strong`,Wt,z(N(T.value.totalPaid)),1)])]),r[36]||=A(`p`,{class:`text-sm line-height-3 opacity-80 mt-4 mb-0`},` Estimativa simplificada (sem TR, seguros MIP/DFI ou tarifas). Para decidir de fato, compare o CET de cada banco. `,-1)])])]),S(n).items.length?(d(),L(`div`,Gt,[r[40]||=A(`h2`,{class:`display-font text-2xl mb-3`},`Simulações salvas`,-1),A(`div`,Kt,[(d(!0),L(k,null,v(S(n).items,e=>(d(),L(`div`,{key:e.id,class:`col-12 md:col-6 lg:col-4`},[A(`article`,qt,[A(`div`,Jt,[A(`h3`,Yt,z(e.name),1),U(S(te),{icon:`pi pi-times`,text:``,rounded:``,severity:`secondary`,"aria-label":`Remover simulação`,onClick:t=>P(e)},null,8,[`onClick`])]),A(`div`,Xt,[U(S(K),{value:e.lender,severity:`secondary`},null,8,[`value`]),U(S(K),{value:e.system===`sac`?`SAC`:`Price`,severity:`info`},null,8,[`value`]),U(S(K),{value:`${e.termMonths/12} anos`,severity:`secondary`},null,8,[`value`])]),A(`div`,Zt,[A(`div`,Qt,[r[37]||=A(`span`,null,`1ª parcela`,-1),A(`strong`,null,z(N(e.firstInstallment)),1)]),A(`div`,$t,[r[38]||=A(`span`,null,`Última parcela`,-1),A(`strong`,null,z(N(e.lastInstallment)),1)]),A(`div`,en,[r[39]||=A(`span`,null,`Total de juros`,-1),A(`strong`,null,z(N(e.totalInterest)),1)])])])]))),128))])])):R(``,!0)]))}}),[[`__scopeId`,`data-v-703f8060`]]),nn={class:`lender-list`},rn={class:`lender-rank`},an={class:`lender-info`},on={class:`lender-name`},sn={class:`lender-note`},cn={class:`lender-rate`},ln=B(G({__name:`LenderRanking`,setup(e){let t=[{rank:1,name:`Banco do Brasil`,rate:`a partir de 9,00% a.a. + TR`,note:`Melhor taxa para cotista FGTS/poupança do BB`},{rank:2,name:`Caixa Econômica Federal`,rate:`a partir de 11,19% a.a. + TR`,note:`Referência do mercado, taxa preferencial para correntista`},{rank:3,name:`BRB`,rate:`a partir de 11,36% a.a.`,note:`Boa taxa entre os bancos regionais`},{rank:4,name:`Itaú`,rate:`a partir de 11,60% a.a.`,note:`Aprovação rápida entre os privados`},{rank:5,name:`Bradesco`,rate:`a partir de 11,70% a.a.`,note:`Faixa competitiva, bom para quem já é correntista`},{rank:6,name:`Santander`,rate:`a partir de 11,79% a.a.`,note:`Costuma ter campanhas para imóveis novos`},{rank:7,name:`Sicoob`,rate:`aprox. 11% a 12% a.a.`,note:`Cooperativa — melhor taxa se você for associado`},{rank:8,name:`Sicredi`,rate:`aprox. 11% a 12% a.a.`,note:`Cooperativa — vale comparar se já tem conta`},{rank:9,name:`Banrisul`,rate:`próximo à média de mercado`,note:`Forte para quem mora no Rio Grande do Sul`},{rank:10,name:`Inter`,rate:`próximo à média de mercado`,note:`100% digital, simulação rápida pelo app`}];return(e,n)=>(d(),L(`div`,null,[n[0]||=A(`h2`,{class:`display-font text-2xl mb-1`},`Bancos mais indicados`,-1),n[1]||=A(`p`,{class:`text-sm opacity-60 mb-4`},` Taxas de referência (jul/2026) para o SFH — confirme sempre o CET antes de decidir, ele muda por perfil, relacionamento e valor do imóvel. `,-1),A(`div`,nn,[(d(),L(k,null,v(t,e=>A(`article`,{key:e.name,class:`lender-row`},[A(`span`,rn,z(String(e.rank).padStart(2,`0`)),1),A(`div`,an,[A(`strong`,on,z(e.name),1),A(`span`,sn,z(e.note),1)]),A(`span`,cn,z(e.rate),1)])),64))])]))}}),[[`__scopeId`,`data-v-4b788c19`]]),un={class:`grid`},dn={class:`border-round-3xl p-4 h-full faixa-card`},fn={class:`flex align-items-center justify-content-between mb-2`},pn={class:`display-font text-lg m-0`},mn={class:`text-sm line-height-3 opacity-80`},hn={class:`flex justify-content-between py-1`},gn={class:`flex justify-content-between py-1`},_n={class:`flex justify-content-between py-1`},vn=B(G({__name:`MinhaCasaMinhaVidaInfo`,setup(e){let t=[{label:`Faixa 1`,income:`até R$ 3.200`,maxProperty:`R$ 210 mil a R$ 275 mil`,subsidy:`até 95% do imóvel`,rate:`3,75% a 4,25% a.a.`},{label:`Faixa 2`,income:`R$ 3.200,01 a R$ 5.000`,maxProperty:`R$ 210 mil a R$ 275 mil`,subsidy:`até R$ 55 mil`,rate:`4% a 4,25% a.a.`},{label:`Faixa 3`,income:`R$ 5.000,01 a R$ 9.600`,maxProperty:`até R$ 400 mil`,subsidy:`sem subsídio`,rate:`abaixo do mercado`},{label:`Faixa 4`,income:`R$ 9.600,01 a R$ 13.000`,maxProperty:`até R$ 600 mil`,subsidy:`sem subsídio`,rate:`10% a 10,5% a.a.`}];return(e,n)=>(d(),L(`div`,null,[n[3]||=A(`h2`,{class:`display-font text-2xl mb-1`},`Minha Casa Minha Vida 2026`,-1),n[4]||=A(`p`,{class:`text-sm opacity-60 mb-4`},` Se a renda familiar entrar em alguma faixa abaixo, vale simular pelo MCMV antes de ir para o financiamento tradicional — as taxas são bem menores. `,-1),A(`div`,un,[(d(),L(k,null,v(t,e=>A(`div`,{key:e.label,class:`col-12 md:col-6`},[A(`article`,dn,[A(`div`,fn,[A(`h3`,pn,z(e.label),1),U(S(K),{value:e.rate,severity:`success`},null,8,[`value`])]),A(`div`,mn,[A(`div`,hn,[n[0]||=A(`span`,null,`Renda familiar`,-1),A(`strong`,null,z(e.income),1)]),A(`div`,gn,[n[1]||=A(`span`,null,`Valor máx. do imóvel`,-1),A(`strong`,null,z(e.maxProperty),1)]),A(`div`,_n,[n[2]||=A(`span`,null,`Subsídio`,-1),A(`strong`,null,z(e.subsidy),1)])])])])),64))]),n[5]||=A(`div`,{class:`border-round-3xl p-4 md:p-5 mt-4 mcmv-note`},[A(`i`,{class:`pi pi-info-circle text-forest mr-2`}),A(`span`,{class:`text-sm line-height-3 opacity-80`},` O valor máximo do imóvel varia por localidade (regiões metropolitanas e capitais têm tetos maiores dentro de cada faixa) e o subsídio da Faixa 2 depende de renda e região — confirme os números atualizados no simulador oficial da Caixa antes de fechar negócio. `)],-1)]))}}),[[`__scopeId`,`data-v-ed674885`]]),yn={class:`mt-5`},bn=G({__name:`LendersAndPrograms`,setup(e){return(e,t)=>(d(),L(`div`,null,[U(ln),A(`div`,yn,[U(vn)])]))}}),xn={class:`grid mb-5`},Sn={class:`surface-card border-1 border-round-3xl p-4 h-full cost-card`},Cn={class:`flex align-items-center gap-3 mb-2`},wn={class:`display-font text-lg m-0`},Tn={class:`ml-auto font-bold text-terracotta`},En={class:`line-height-3 opacity-70 m-0 text-sm`},Dn=B(G({__name:`TipsRatesInfo`,setup(e){let t=[{title:`ITBI`,range:`2% a 4%`,icon:`pi pi-percentage`,description:`Imposto municipal pago pelo comprador na transferência do imóvel. Em São Paulo e no Rio a média fica em torno de 3%.`},{title:`Escritura pública`,range:`1% a 2%`,icon:`pi pi-file-edit`,description:`Necessária só na compra à vista — se o imóvel for financiado, o próprio contrato de financiamento já serve como título.`},{title:`Registro em cartório`,range:`0,5% a 1,5%`,icon:`pi pi-verified`,description:`Obrigatório em qualquer compra: é o registro que garante que o imóvel é seu perante terceiros.`},{title:`Taxas do financiamento`,range:`até 5%`,icon:`pi pi-building-columns`,description:`Avaliação do imóvel, tarifas de análise e seguros MIP/DFI. Vários bancos permitem incluir parte disso no próprio financiamento.`}];return(e,n)=>(d(),L(`div`,null,[n[0]||=A(`div`,{class:`border-round-3xl p-4 md:p-5 mb-5 budget-panel`},[A(`span`,{class:`inline-block text-sm uppercase font-bold mb-2 eyebrow`},`Regra prática`),A(`p`,{class:`text-xl line-height-3 m-0`},[E(` Reserve entre `),A(`strong`,null,`10% e 13%`),E(` do valor do imóvel só para custos de compra — além da entrada. É a soma de ITBI, escritura, registro e as primeiras taxas do financiamento. `)])],-1),n[1]||=A(`h2`,{class:`display-font text-2xl mb-3`},`Principais taxas da compra`,-1),A(`div`,xn,[(d(),L(k,null,v(t,e=>A(`div`,{key:e.title,class:`col-12 md:col-6`},[A(`article`,Sn,[A(`div`,Cn,[A(`i`,{class:C([e.icon,`text-xl text-terracotta`])},null,2),A(`h3`,wn,z(e.title),1),A(`span`,Tn,z(e.range),1)]),A(`p`,En,z(e.description),1)])])),64))]),n[2]||=N(`<h2 class="display-font text-2xl mb-3" data-v-c6a1676f>Tabela Price ou SAC?</h2><div class="grid mb-3" data-v-c6a1676f><div class="col-12 md:col-6" data-v-c6a1676f><article class="border-round-3xl p-4 md:p-5 h-full system-card sac-card" data-v-c6a1676f><h3 class="display-font text-xl m-0 mb-2" data-v-c6a1676f> SAC <span class="font-normal text-base" data-v-c6a1676f>(amortização constante)</span></h3><ul class="line-height-3 pl-3 m-0 text-sm" data-v-c6a1676f><li data-v-c6a1676f>Parcelas começam mais altas e vão diminuindo</li><li data-v-c6a1676f>Amortiza a dívida mais rápido</li><li data-v-c6a1676f>Menos juros no total do contrato</li><li data-v-c6a1676f> Melhor para quem pretende quitar antecipadamente </li></ul></article></div><div class="col-12 md:col-6" data-v-c6a1676f><article class="border-round-3xl p-4 md:p-5 h-full system-card price-card" data-v-c6a1676f><h3 class="display-font text-xl m-0 mb-2" data-v-c6a1676f> Price <span class="font-normal text-base" data-v-c6a1676f>(parcela fixa)</span></h3><ul class="line-height-3 pl-3 m-0 text-sm" data-v-c6a1676f><li data-v-c6a1676f>Parcela igual do início ao fim</li><li data-v-c6a1676f>No começo, paga mais juros que amortização</li><li data-v-c6a1676f>Custo total de juros maior</li><li data-v-c6a1676f> Exige menos renda comprometida — facilita a aprovação </li></ul></article></div></div><div class="border-round-3xl p-4 md:p-5 example-panel mb-5" data-v-c6a1676f><span class="inline-block text-sm uppercase font-bold mb-2 eyebrow" data-v-c6a1676f>Exemplo de mercado</span><p class="line-height-3 m-0" data-v-c6a1676f> Para R$ 300 mil a 10% a.a. em 180 meses, o SAC soma cerca de <strong data-v-c6a1676f>R$ 516 mil</strong> pagos ao final, contra <strong data-v-c6a1676f>R$ 580,6 mil</strong> na Price — quase R$ 65 mil a mais em juros. Use a aba <strong data-v-c6a1676f>Simular financiamento</strong> para fazer essa conta com os seus números. </p></div><div class="border-round-3xl p-4 md:p-5 cet-panel" data-v-c6a1676f><div class="flex align-items-center gap-3 mb-2" data-v-c6a1676f><i class="pi pi-info-circle text-xl text-forest" data-v-c6a1676f></i><h3 class="display-font text-lg m-0" data-v-c6a1676f> O que realmente importa: o CET </h3></div><p class="line-height-3 opacity-80 m-0 text-sm" data-v-c6a1676f> O Custo Efetivo Total (CET) inclui a taxa de juros, o seguro obrigatório (MIP e DFI) e as tarifas de administração. Dois bancos com a mesma taxa nominal podem ter CETs bem diferentes — sempre peça o CET antes de comparar propostas. </p></div>`,4)]))}}),[[`__scopeId`,`data-v-c6a1676f`]]),On=ae(`tips`,()=>{let e=s([]),t=p(!1),i=p(``);async function a(){t.value=!0;try{let{data:t}=await r.get(`/tips`);e.value=t}catch(e){i.value=n(e)}finally{t.value=!1}}return{items:e,loading:t,error:i,load:a}}),kn={class:`max-w-7xl mx-auto`},An={key:1,class:`grid`},jn={class:`surface-card border-1 border-round-3xl p-4 md:p-5 h-full tip-card`},Mn={class:`display-font text-5xl text-terracotta opacity-30`},Nn={class:`display-font text-3xl mb-3`},Pn={class:`line-height-3 opacity-70 white-space-pre-line`},Fn={key:2,class:`grid`},In={class:`h-full border-top-2 pt-4 pb-6 placeholder-card`},Ln={class:`flex align-items-center justify-content-between mb-5`},Rn={class:`display-font text-4xl opacity-25`},zn={class:`display-font text-2xl m-0 mb-2`},Bn=B(G({__name:`TipsGuide`,setup(t){let n=On(),r=[{number:`01`,title:`Documentação`,icon:`pi pi-file-check`},{number:`02`,title:`Visita e vistoria`,icon:`pi pi-search`},{number:`03`,title:`Custos da compra`,icon:`pi pi-calculator`}];return b(n.load),(t,i)=>(d(),L(`section`,kn,[i[5]||=A(`div`,{class:`mb-6 md:mb-7`},[A(`span`,{class:`inline-block text-sm uppercase font-bold text-terracotta mb-2 eyebrow`},`Antes de assinar`),A(`h1`,{class:`display-font text-5xl md:text-7xl line-height-1 m-0`},[E(`Comprar com`),A(`br`),A(`em`,null,`os olhos abertos.`)])],-1),U(S(Le),{value:`dicas`},{default:m(()=>[U(S(Te),null,{default:m(()=>[U(S(J),{value:`dicas`},{default:m(()=>[...i[0]||=[E(`Dicas`,-1)]]),_:1}),U(S(J),{value:`taxas`},{default:m(()=>[...i[1]||=[E(`Taxas e juros`,-1)]]),_:1}),U(S(J),{value:`simulador`},{default:m(()=>[...i[2]||=[E(`Simular financiamento`,-1)]]),_:1}),U(S(J),{value:`bancos`},{default:m(()=>[...i[3]||=[E(`Bancos e programas`,-1)]]),_:1})]),_:1}),U(S(Pe),null,{default:m(()=>[U(S(Z),{value:`dicas`},{default:m(()=>[S(n).error?(d(),j(S(e),{key:0,severity:`error`,class:`mb-4`},{default:m(()=>[E(z(S(n).error),1)]),_:1})):R(``,!0),S(n).items.length?(d(),L(`div`,An,[(d(!0),L(k,null,v(S(n).items,(e,t)=>(d(),L(`article`,{key:e.id,class:`col-12 md:col-6`},[A(`div`,jn,[A(`span`,Mn,z(String(t+1).padStart(2,`0`)),1),A(`h2`,Nn,z(e.title),1),A(`p`,Pn,z(e.content),1)])]))),128))])):S(n).loading?R(``,!0):(d(),L(`div`,Fn,[(d(),L(k,null,v(r,e=>A(`div`,{key:e.number,class:`col-12 md:col-4`},[A(`article`,In,[A(`div`,Ln,[A(`span`,Rn,z(e.number),1),A(`i`,{class:C([e.icon,`text-xl text-terracotta`])},null,2)]),A(`h2`,zn,z(e.title),1),i[4]||=A(`p`,{class:`line-height-3 opacity-55 m-0`},`Conteúdo reservado para a próxima etapa.`,-1)])])),64))]))]),_:1}),U(S(Z),{value:`taxas`},{default:m(()=>[U(Dn)]),_:1}),U(S(Z),{value:`simulador`},{default:m(()=>[U(tn)]),_:1}),U(S(Z),{value:`bancos`},{default:m(()=>[U(bn)]),_:1})]),_:1})]),_:1})]))}}),[[`__scopeId`,`data-v-05a6c893`]]),Vn=G({__name:`TipsView`,setup(e){return(e,t)=>(d(),j(Bn))}});export{Vn as default};