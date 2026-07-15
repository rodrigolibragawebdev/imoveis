import{c as e,i as t,n,o as r,r as i,s as a,t as o}from"./api-DlNqoSMg.js";import{At as s,B as c,D as l,Dt as u,Et as d,H as f,Nt as p,Ot as m,P as h,T as g,Tt as _,U as v,X as y,Y as b,Z as x,_ as ee,_t as S,at as C,bt as w,c as T,ct as E,d as D,dt as O,et as te,ft as k,gt as A,ht as ne,it as j,k as M,kt as N,lt as re,mt as P,n as F,nt as I,ot as L,q as R,r as z,rt as B,s as ie,st as V,t as ae,tt as oe,ut as H,vt as U,w as W,x as G,xt as K,yt as se}from"./index-O-Bl3YI-.js";import{t as q}from"./inputnumber-DQw6u8xe.js";import{t as J}from"./tag-uVrJhZAi.js";var ce=D.extend({name:`tab`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-tab`,{"p-tab-active":t.active,"p-disabled":n.disabled}]}}}),Y={name:`Tab`,extends:{name:`BaseTab`,extends:T,props:{value:{type:[String,Number],default:void 0},disabled:{type:Boolean,default:!1},as:{type:[String,Object],default:`BUTTON`},asChild:{type:Boolean,default:!1}},style:ce,provide:function(){return{$pcTab:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcTabs`,`$pcTabList`],methods:{onFocus:function(){this.$pcTabs.selectOnFocus&&this.changeActiveValue()},onClick:function(){this.changeActiveValue()},onKeydown:function(e){switch(e.code){case`ArrowRight`:this.onArrowRightKey(e);break;case`ArrowLeft`:this.onArrowLeftKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`PageDown`:this.onPageDownKey(e);break;case`PageUp`:this.onPageUpKey(e);break;case`Enter`:case`NumpadEnter`:case`Space`:this.onEnterKey(e);break}},onArrowRightKey:function(e){var t=this.findNextTab(e.currentTarget);t?this.changeFocusedTab(e,t):this.onHomeKey(e),e.preventDefault()},onArrowLeftKey:function(e){var t=this.findPrevTab(e.currentTarget);t?this.changeFocusedTab(e,t):this.onEndKey(e),e.preventDefault()},onHomeKey:function(e){var t=this.findFirstTab();this.changeFocusedTab(e,t),e.preventDefault()},onEndKey:function(e){var t=this.findLastTab();this.changeFocusedTab(e,t),e.preventDefault()},onPageDownKey:function(e){this.scrollInView(this.findLastTab()),e.preventDefault()},onPageUpKey:function(e){this.scrollInView(this.findFirstTab()),e.preventDefault()},onEnterKey:function(e){this.changeActiveValue()},findNextTab:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.nextElementSibling;return t?W(t,`data-p-disabled`)||W(t,`data-pc-section`)===`activebar`?this.findNextTab(t):f(t,`[data-pc-name="tab"]`):null},findPrevTab:function(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1]?e:e.previousElementSibling;return t?W(t,`data-p-disabled`)||W(t,`data-pc-section`)===`activebar`?this.findPrevTab(t):f(t,`[data-pc-name="tab"]`):null},findFirstTab:function(){return this.findNextTab(this.$pcTabList.$refs.tabs.firstElementChild,!0)},findLastTab:function(){return this.findPrevTab(this.$pcTabList.$refs.tabs.lastElementChild,!0)},changeActiveValue:function(){this.$pcTabs.updateValue(this.value)},changeFocusedTab:function(e,t){h(t),this.scrollInView(t)},scrollInView:function(e){var t;e==null||(t=e.scrollIntoView)==null||t.call(e,{block:`nearest`})}},computed:{active:function(){return R(this.$pcTabs?.d_value,this.value)},id:function(){return`${this.$pcTabs?.$id}_tab_${this.value}`},ariaControls:function(){return`${this.$pcTabs?.$id}_tabpanel_${this.value}`},attrs:function(){return P(this.asAttrs,this.a11yAttrs,this.ptmi(`root`,this.ptParams))},asAttrs:function(){return this.as===`BUTTON`?{type:`button`,disabled:this.disabled}:void 0},a11yAttrs:function(){return{id:this.id,tabindex:this.active?this.$pcTabs.tabindex:-1,role:`tab`,"aria-selected":this.active,"aria-controls":this.ariaControls,"data-pc-name":`tab`,"data-p-disabled":this.disabled,"data-p-active":this.active,onFocus:this.onFocus,onKeydown:this.onKeydown}},ptParams:function(){return{context:{active:this.active}}},dataP:function(){return v({active:this.active})}},directives:{ripple:z}};function le(e,t,n,r,i,a){var o=w(`ripple`);return e.asChild?U(e.$slots,`default`,{key:1,dataP:a.dataP,class:s(e.cx(`root`)),active:a.active,a11yAttrs:a.a11yAttrs,onClick:a.onClick}):d((A(),C(K(e.as),P({key:0,class:e.cx(`root`),"data-p":a.dataP,onClick:a.onClick},a.attrs),{default:_(function(){return[U(e.$slots,`default`)]}),_:3},16,[`class`,`data-p`,`onClick`])),[[o]])}Y.render=le;var ue={name:`ChevronLeftIcon`,extends:ie};function de(e){return he(e)||me(e)||pe(e)||fe()}function fe(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function pe(e,t){if(e){if(typeof e==`string`)return X(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?X(e,t):void 0}}function me(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function he(e){if(Array.isArray(e))return X(e)}function X(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function ge(e,t,n,r,i,a){return A(),V(`svg`,P({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),de(t[0]||=[j(`path`,{d:`M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z`,fill:`currentColor`},null,-1)]),16)}ue.render=ge;var _e={name:`ChevronRightIcon`,extends:ie};function ve(e){return Se(e)||xe(e)||be(e)||ye()}function ye(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function be(e,t){if(e){if(typeof e==`string`)return Z(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Z(e,t):void 0}}function xe(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function Se(e){if(Array.isArray(e))return Z(e)}function Z(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Ce(e,t,n,r,i,a){return A(),V(`svg`,P({width:`14`,height:`14`,viewBox:`0 0 14 14`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`},e.pti()),ve(t[0]||=[j(`path`,{d:`M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z`,fill:`currentColor`},null,-1)]),16)}_e.render=Ce;var we={name:`TabList`,extends:{name:`BaseTabList`,extends:T,props:{},style:D.extend({name:`tablist`,classes:{root:`p-tablist`,content:`p-tablist-content p-tablist-viewport`,tabList:`p-tablist-tab-list`,activeBar:`p-tablist-active-bar`,prevButton:`p-tablist-prev-button p-tablist-nav-button`,nextButton:`p-tablist-next-button p-tablist-nav-button`}}),provide:function(){return{$pcTabList:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcTabs`],data:function(){return{isPrevButtonEnabled:!1,isNextButtonEnabled:!0}},resizeObserver:void 0,inkBarObserver:void 0,watch:{showNavigators:function(e){e?this.bindResizeObserver():this.unbindResizeObserver()},activeValue:{flush:`post`,handler:function(){this.updateInkBar(),this.bindInkBarObserver()}}},mounted:function(){var e=this;setTimeout(function(){e.updateInkBar(),e.bindInkBarObserver()},150),this.showNavigators&&(this.updateButtonState(),this.bindResizeObserver())},updated:function(){this.showNavigators&&this.updateButtonState()},beforeUnmount:function(){this.unbindResizeObserver(),this.unbindInkBarObserver()},methods:{onScroll:function(e){this.showNavigators&&this.updateButtonState(),e.preventDefault()},onPrevButtonClick:function(){var e=this.$refs.content,t=this.getVisibleButtonWidths(),n=g(e)-t,r=Math.abs(e.scrollLeft)-n*.8,i=Math.max(r,0);e.scrollLeft=M(e)?-1*i:i},onNextButtonClick:function(){var e=this.$refs.content,t=this.getVisibleButtonWidths(),n=g(e)-t,r=Math.abs(e.scrollLeft)+n*.8,i=e.scrollWidth-n,a=Math.min(r,i);e.scrollLeft=M(e)?-1*a:a},bindResizeObserver:function(){var e=this;this.resizeObserver=new ResizeObserver(function(){return e.updateButtonState()}),this.resizeObserver.observe(this.$refs.list)},unbindResizeObserver:function(){var e;(e=this.resizeObserver)==null||e.unobserve(this.$refs.list),this.resizeObserver=void 0},bindInkBarObserver:function(){var e=this;this.unbindInkBarObserver();var t=this.$refs.content,n=f(t,`[data-pc-name="tab"][data-p-active="true"]`);n&&(this.inkBarObserver=new ResizeObserver(function(){return e.updateInkBar()}),this.inkBarObserver.observe(n))},unbindInkBarObserver:function(){var e;(e=this.inkBarObserver)==null||e.disconnect(),this.inkBarObserver=void 0},updateInkBar:function(){var e=this.$refs,t=e.content,n=e.inkbar,r=e.tabs;if(n){var i=f(t,`[data-pc-name="tab"][data-p-active="true"]`);this.$pcTabs.isVertical()?(n.style.height=ee(i)+`px`,n.style.top=G(i).top-G(r).top+`px`):(n.style.width=c(i)+`px`,n.style.left=G(i).left-G(r).left+`px`)}},updateButtonState:function(){var e=this.$refs,t=e.list,n=e.content,r=n.scrollTop,i=n.scrollWidth,a=n.scrollHeight,o=n.offsetWidth,s=n.offsetHeight,c=Math.abs(n.scrollLeft),u=[g(n),l(n)],d=u[0],f=u[1];this.$pcTabs.isVertical()?(this.isPrevButtonEnabled=r!==0,this.isNextButtonEnabled=t.offsetHeight>=s&&parseInt(r)!==a-f):(this.isPrevButtonEnabled=c!==0,this.isNextButtonEnabled=t.offsetWidth>=o&&parseInt(c)!==i-d)},getVisibleButtonWidths:function(){var e=this.$refs,t=e.prevButton,n=e.nextButton,r=0;return this.showNavigators&&(r=(t?.offsetWidth||0)+(n?.offsetWidth||0)),r}},computed:{templates:function(){return this.$pcTabs.$slots},activeValue:function(){return this.$pcTabs.d_value},showNavigators:function(){return this.$pcTabs.showNavigators},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0},dataP:function(){return v({scrollable:this.$pcTabs.scrollable})}},components:{ChevronLeftIcon:ue,ChevronRightIcon:_e},directives:{ripple:z}},Te=[`data-p`],Ee=[`aria-label`,`tabindex`],De=[`data-p`],Oe=[`aria-orientation`],ke=[`aria-label`,`tabindex`];function Ae(e,t,n,r,i,a){var o=w(`ripple`);return A(),V(`div`,P({ref:`list`,class:e.cx(`root`),"data-p":a.dataP},e.ptmi(`root`)),[a.showNavigators&&i.isPrevButtonEnabled?d((A(),V(`button`,P({key:0,ref:`prevButton`,type:`button`,class:e.cx(`prevButton`),"aria-label":a.prevButtonAriaLabel,tabindex:a.$pcTabs.tabindex,onClick:t[0]||=function(){return a.onPrevButtonClick&&a.onPrevButtonClick.apply(a,arguments)}},e.ptm(`prevButton`),{"data-pc-group-section":`navigator`}),[(A(),C(K(a.templates.previcon||`ChevronLeftIcon`),P({"aria-hidden":`true`},e.ptm(`prevIcon`)),null,16))],16,Ee)),[[o]]):L(``,!0),j(`div`,P({ref:`content`,class:e.cx(`content`),onScroll:t[1]||=function(){return a.onScroll&&a.onScroll.apply(a,arguments)},"data-p":a.dataP},e.ptm(`content`)),[j(`div`,P({ref:`tabs`,class:e.cx(`tabList`),role:`tablist`,"aria-orientation":a.$pcTabs.orientation||`horizontal`},e.ptm(`tabList`)),[U(e.$slots,`default`),j(`span`,P({ref:`inkbar`,class:e.cx(`activeBar`),role:`presentation`,"aria-hidden":`true`},e.ptm(`activeBar`)),null,16)],16,Oe)],16,De),a.showNavigators&&i.isNextButtonEnabled?d((A(),V(`button`,P({key:1,ref:`nextButton`,type:`button`,class:e.cx(`nextButton`),"aria-label":a.nextButtonAriaLabel,tabindex:a.$pcTabs.tabindex,onClick:t[2]||=function(){return a.onNextButtonClick&&a.onNextButtonClick.apply(a,arguments)}},e.ptm(`nextButton`),{"data-pc-group-section":`navigator`}),[(A(),C(K(a.templates.nexticon||`ChevronRightIcon`),P({"aria-hidden":`true`},e.ptm(`nextIcon`)),null,16))],16,ke)),[[o]]):L(``,!0)],16,Te)}we.render=Ae;var je=D.extend({name:`tabpanel`,classes:{root:function(e){return[`p-tabpanel`,{"p-tabpanel-active":e.instance.active}]}}}),Q={name:`TabPanel`,extends:{name:`BaseTabPanel`,extends:T,props:{value:{type:[String,Number],default:void 0},as:{type:[String,Object],default:`DIV`},asChild:{type:Boolean,default:!1},header:null,headerStyle:null,headerClass:null,headerProps:null,headerActionProps:null,contentStyle:null,contentClass:null,contentProps:null,disabled:Boolean},style:je,provide:function(){return{$pcTabPanel:this,$parentInstance:this}}},inheritAttrs:!1,inject:[`$pcTabs`],computed:{active:function(){return R(this.$pcTabs?.d_value,this.value)},id:function(){return`${this.$pcTabs?.$id}_tabpanel_${this.value}`},ariaLabelledby:function(){return`${this.$pcTabs?.$id}_tab_${this.value}`},attrs:function(){return P(this.a11yAttrs,this.ptmi(`root`,this.ptParams))},a11yAttrs:function(){return{id:this.id,tabindex:this.$pcTabs?.tabindex,role:`tabpanel`,"aria-labelledby":this.ariaLabelledby,"data-pc-name":`tabpanel`,"data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function Me(e,t,n,r,i,a){var o,c;return a.$pcTabs?(A(),V(I,{key:1},[e.asChild?U(e.$slots,`default`,{key:1,class:s(e.cx(`root`)),active:a.active,a11yAttrs:a.a11yAttrs}):(A(),V(I,{key:0},[!((o=a.$pcTabs)!=null&&o.lazy)||a.active?d((A(),C(K(e.as),P({key:0,class:e.cx(`root`)},a.attrs),{default:_(function(){return[U(e.$slots,`default`)]}),_:3},16,[`class`])),[[te,(c=a.$pcTabs)!=null&&c.lazy?!0:a.active]]):L(``,!0)],64))],64)):U(e.$slots,`default`,{key:0})}Q.render=Me;var Ne={name:`TabPanels`,extends:{name:`BaseTabPanels`,extends:T,props:{},style:D.extend({name:`tabpanels`,classes:{root:`p-tabpanels`}}),provide:function(){return{$pcTabPanels:this,$parentInstance:this}}},inheritAttrs:!1};function Pe(e,t,n,r,i,a){return A(),V(`div`,P({class:e.cx(`root`),role:`presentation`},e.ptmi(`root`)),[U(e.$slots,`default`)],16)}Ne.render=Pe;var Fe=D.extend({name:`tabs`,style:`
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
`,classes:{root:function(e){return[`p-tabs p-component`,{"p-tabs-scrollable":e.props.scrollable}]}}}),Ie={name:`Tabs`,extends:{name:`BaseTabs`,extends:T,props:{value:{type:[String,Number],default:void 0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},showNavigators:{type:Boolean,default:!0},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1}},style:Fe,provide:function(){return{$pcTabs:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`update:value`],data:function(){return{d_value:this.value}},watch:{value:function(e){this.d_value=e}},methods:{updateValue:function(e){this.d_value!==e&&(this.d_value=e,this.$emit(`update:value`,e))},isVertical:function(){return this.orientation===`vertical`}}};function Le(e,t,n,r,i,a){return A(),V(`div`,P({class:e.cx(`root`)},e.ptmi(`root`)),[U(e.$slots,`default`)],16)}Ie.render=Le;var Re=D.extend({name:`togglebutton`,style:`
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
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-togglebutton p-component`,{"p-togglebutton-checked":t.active,"p-invalid":t.$invalid,"p-togglebutton-fluid":n.fluid,"p-togglebutton-sm p-inputfield-sm":n.size===`small`,"p-togglebutton-lg p-inputfield-lg":n.size===`large`}]},content:`p-togglebutton-content`,icon:`p-togglebutton-icon`,label:`p-togglebutton-label`}}),ze={name:`BaseToggleButton`,extends:r,props:{onIcon:String,offIcon:String,onLabel:{type:String,default:`Yes`},offLabel:{type:String,default:`No`},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null},size:{type:String,default:null},fluid:{type:Boolean,default:null}},style:Re,provide:function(){return{$pcToggleButton:this,$parentInstance:this}}};function $(e){"@babel/helpers - typeof";return $=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},$(e)}function Be(e,t,n){return(t=Ve(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Ve(e){var t=He(e,`string`);return $(t)==`symbol`?t:t+``}function He(e,t){if($(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if($(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}var Ue={name:`ToggleButton`,extends:ze,inheritAttrs:!1,emits:[`change`],methods:{getPTOptions:function(e){return(e===`root`?this.ptmi:this.ptm)(e,{context:{active:this.active,disabled:this.disabled}})},onChange:function(e){!this.disabled&&!this.readonly&&(this.writeValue(!this.d_value,e),this.$emit(`change`,e))},onBlur:function(e){var t,n;(t=(n=this.formField).onBlur)==null||t.call(n,e)}},computed:{active:function(){return this.d_value===!0},hasLabel:function(){return y(this.onLabel)&&y(this.offLabel)},label:function(){return this.hasLabel?this.d_value?this.onLabel:this.offLabel:`\xA0`},dataP:function(){return v(Be({checked:this.active,invalid:this.$invalid},this.size,this.size))}},directives:{ripple:z}},We=[`tabindex`,`disabled`,`aria-pressed`,`aria-label`,`aria-labelledby`,`data-p-checked`,`data-p-disabled`,`data-p`],Ge=[`data-p`];function Ke(e,t,n,r,i,a){var o=w(`ripple`);return d((A(),V(`button`,P({type:`button`,class:e.cx(`root`),tabindex:e.tabindex,disabled:e.disabled,"aria-pressed":e.d_value,onClick:t[0]||=function(){return a.onChange&&a.onChange.apply(a,arguments)},onBlur:t[1]||=function(){return a.onBlur&&a.onBlur.apply(a,arguments)}},a.getPTOptions(`root`),{"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,"data-p-checked":a.active,"data-p-disabled":e.disabled,"data-p":a.dataP}),[j(`span`,P({class:e.cx(`content`)},a.getPTOptions(`content`),{"data-p":a.dataP}),[U(e.$slots,`default`,{},function(){return[U(e.$slots,`icon`,{value:e.d_value,class:s(e.cx(`icon`))},function(){return[e.onIcon||e.offIcon?(A(),V(`span`,P({key:0,class:[e.cx(`icon`),e.d_value?e.onIcon:e.offIcon]},a.getPTOptions(`icon`)),null,16)):L(``,!0)]}),j(`span`,P({class:e.cx(`label`)},a.getPTOptions(`label`)),p(a.label),17)]})],16,Ge)],16,We)),[[o]])}Ue.render=Ke;var qe=D.extend({name:`selectbutton`,style:`
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
`,classes:{root:function(e){var t=e.props;return[`p-selectbutton p-component`,{"p-invalid":e.instance.$invalid,"p-selectbutton-fluid":t.fluid}]}}}),Je={name:`BaseSelectButton`,extends:r,props:{options:Array,optionLabel:null,optionValue:null,optionDisabled:null,multiple:Boolean,allowEmpty:{type:Boolean,default:!0},dataKey:null,ariaLabelledby:{type:String,default:null},size:{type:String,default:null},fluid:{type:Boolean,default:null}},style:qe,provide:function(){return{$pcSelectButton:this,$parentInstance:this}}};function Ye(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(!n){if(Array.isArray(e)||(n=Qe(e))||t){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,o=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||n.return==null||n.return()}finally{if(s)throw a}}}}function Xe(e){return et(e)||$e(e)||Qe(e)||Ze()}function Ze(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Qe(e,t){if(e){if(typeof e==`string`)return tt(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?tt(e,t):void 0}}function $e(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function et(e){if(Array.isArray(e))return tt(e)}function tt(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var nt={name:`SelectButton`,extends:Je,inheritAttrs:!1,emits:[`change`],methods:{getOptionLabel:function(e){return this.optionLabel?b(e,this.optionLabel):e},getOptionValue:function(e){return this.optionValue?b(e,this.optionValue):e},getOptionRenderKey:function(e){return this.dataKey?b(e,this.dataKey):this.getOptionLabel(e)},isOptionDisabled:function(e){return this.optionDisabled?b(e,this.optionDisabled):!1},isOptionReadonly:function(e){if(this.allowEmpty)return!1;var t=this.isSelected(e);return this.multiple?t&&this.d_value.length===1:t},onOptionSelect:function(e,t,n){var r=this;if(!(this.disabled||this.isOptionDisabled(t)||this.isOptionReadonly(t))){var i=this.isSelected(t),a=this.getOptionValue(t),o;if(this.multiple)if(i){if(o=this.d_value.filter(function(e){return!R(e,a,r.equalityKey)}),!this.allowEmpty&&o.length===0)return}else o=this.d_value?[].concat(Xe(this.d_value),[a]):[a];else{if(i&&!this.allowEmpty)return;o=i?null:a}this.writeValue(o,e),this.$emit(`change`,{originalEvent:e,value:o})}},isSelected:function(e){var t=!1,n=this.getOptionValue(e);if(this.multiple){if(this.d_value){var r=Ye(this.d_value),i;try{for(r.s();!(i=r.n()).done;){var a=i.value;if(R(a,n,this.equalityKey)){t=!0;break}}}catch(e){r.e(e)}finally{r.f()}}}else t=R(this.d_value,n,this.equalityKey);return t}},computed:{equalityKey:function(){return this.optionValue?null:this.dataKey},dataP:function(){return v({invalid:this.$invalid})}},directives:{ripple:z},components:{ToggleButton:Ue}},rt=[`aria-labelledby`,`data-p`];function it(e,t,n,r,i,a){var o=se(`ToggleButton`);return A(),V(`div`,P({class:e.cx(`root`),role:`group`,"aria-labelledby":e.ariaLabelledby},e.ptmi(`root`),{"data-p":a.dataP}),[(A(!0),V(I,null,S(e.options,function(t,n){return A(),C(o,{key:a.getOptionRenderKey(t),modelValue:a.isSelected(t),onLabel:a.getOptionLabel(t),offLabel:a.getOptionLabel(t),disabled:e.disabled||a.isOptionDisabled(t),unstyled:e.unstyled,size:e.size,readonly:a.isOptionReadonly(t),onChange:function(e){return a.onOptionSelect(e,t,n)},pt:e.ptm(`pcToggleButton`)},E({_:2},[e.$slots.option?{name:`default`,fn:_(function(){return[U(e.$slots,`option`,{option:t,index:n},function(){return[j(`span`,P({ref_for:!0},e.ptm(`pcToggleButton`).label),p(a.getOptionLabel(t)),17)]})]}),key:`0`}:void 0]),1032,[`modelValue`,`onLabel`,`offLabel`,`disabled`,`unstyled`,`size`,`readonly`,`onChange`,`pt`])}),128))],16,rt)}nt.render=it;var at=x(`financing`,()=>{let e=u([]),t=m(!1),r=m(!1),i=m(``);async function a(){t.value=!0,i.value=``;try{let{data:t}=await o.get(`/financing-simulations`);e.value=t}catch(e){i.value=n(e)}finally{t.value=!1}}async function s(e){r.value=!0,i.value=``;try{await o.post(`/financing-simulations`,e),await a()}catch(e){throw i.value=n(e),e}finally{r.value=!1}}async function c(t){i.value=``;try{await o.delete(`/financing-simulations/${t}`),e.value=e.value.filter(e=>e.id!==t)}catch(e){throw i.value=n(e),e}}return{items:e,loading:t,saving:r,error:i,load:a,create:s,remove:c}});function ot(e){let{propertyValue:t,downPayment:n,annualRate:r,termMonths:i,system:a}=e,o=Math.max(t-n,0),s=(1+r/100)**(1/12)-1;if(o===0||i<=0)return{financedAmount:0,monthlyRate:s,firstInstallment:0,lastInstallment:0,totalPaid:0,totalInterest:0};if(a===`sac`){let e=o/i,t=e+o*s,n=e+e*s,r=i*e+s*(o*(i+1))/2;return{financedAmount:o,monthlyRate:s,firstInstallment:t,lastInstallment:n,totalPaid:r,totalInterest:r-o}}let c=s===0?o/i:o*s/(1-(1+s)**-i),l=c*i;return{financedAmount:o,monthlyRate:s,firstInstallment:c,lastInstallment:c,totalPaid:l,totalInterest:l-o}}var st={class:`grid`},ct={class:`col-12 lg:col-5`},lt={class:`surface-card border-1 border-round-3xl p-4 md:p-5 form-panel`},ut={class:`col-12 md:col-6`},dt={class:`col-12 md:col-6`},ft={class:`col-12 md:col-6`},pt={class:`col-12 md:col-6`},mt={class:`col-12`},ht={class:`block mt-2 opacity-60`},gt={class:`col-12 md:col-6`},_t={class:`col-12 md:col-6`},vt={class:`col-12 flex justify-content-end mt-2`},yt={class:`surface-card border-1 border-round-3xl p-4 md:p-5 mt-4 costs-panel`},bt={class:`grid`},xt={class:`col-6`},St={class:`col-6`},Ct={class:`col-6`},wt={class:`col-6`},Tt={class:`furniture-total`},Et={class:`cost-breakdown text-sm mt-4`},Dt={class:`flex justify-content-between py-1`},Ot={class:`flex justify-content-between py-1`},kt={class:`flex justify-content-between py-1`},At={class:`flex justify-content-between py-2 mt-1 total-row`},jt={class:`block mt-3 opacity-60`},Mt={class:`col-12 lg:col-7`},Nt={class:`border-round-3xl p-4 md:p-5 h-full result-panel`},Pt={class:`display-font text-3xl m-0 mb-4`},Ft={class:`text-lg font-normal opacity-70`},It={class:`grid`},Lt={class:`col-6 md:col-3`},Rt={class:`text-lg`},zt={class:`col-6 md:col-3`},Bt={class:`text-lg`},Vt={class:`col-6 md:col-3`},Ht={class:`text-lg`},Ut={class:`col-6 md:col-3`},Wt={class:`text-lg`},Gt={key:1,class:`mt-5`},Kt={class:`grid`},qt={class:`surface-card border-1 border-round-3xl p-4 h-full saved-card`},Jt={class:`flex align-items-start justify-content-between gap-2 mb-2`},Yt={class:`display-font text-lg m-0`},Xt={class:`flex flex-wrap gap-2 mb-3`},Zt={class:`text-sm line-height-3 opacity-80`},Qt={class:`flex justify-content-between`},$t={class:`flex justify-content-between`},en={class:`flex justify-content-between`},tn=F(k({__name:`FinancingSimulator`,setup(n){let r=at(),s=m(5e5),c=m(1e5),l=m(11.19),u=m(30),d=m(`sac`),f=m(`Caixa`),h=m(``),g=m(3),v=m(1),y=m(2),b=m(0),x=[{label:`SAC`,value:`sac`},{label:`Price`,value:`price`}],ee=[`Banco do Brasil`,`Caixa`,`BRB`,`Itaú`,`Bradesco`,`Santander`,`Sicoob`,`Sicredi`,`Banrisul`,`Inter`,`Outro`],w=B(()=>d.value===`sac`?`Parcelas decrescentes e menos juros no total — melhor se você pretende amortizar antecipadamente.`:`Parcela fixa do início ao fim — mais fácil de aprovar e de planejar o orçamento.`),T=B(()=>Math.round(u.value*12)),E=B(()=>ot({propertyValue:s.value||0,downPayment:c.value||0,annualRate:l.value||0,termMonths:T.value||0,system:d.value})),D=B(()=>(s.value||0)*(g.value+v.value+y.value)/100),te=B(()=>(c.value||0)+D.value+b.value),k=B(()=>h.value.trim().length>=2&&f.value.trim().length>=2&&E.value.financedAmount>0);function M(e){return new Intl.NumberFormat(`pt-BR`,{style:`currency`,currency:`BRL`,maximumFractionDigits:0}).format(e)}async function re(){if(k.value)try{await r.create({name:h.value.trim(),propertyValue:s.value,downPayment:c.value,financedAmount:E.value.financedAmount,annualRate:l.value,termMonths:T.value,system:d.value,lender:f.value.trim(),firstInstallment:E.value.firstInstallment,lastInstallment:E.value.lastInstallment,totalPaid:E.value.totalPaid,totalInterest:E.value.totalInterest}),h.value=``}catch{}}function P(e){window.confirm(`Remover a simulação “${e.name}”?`)&&r.remove(e.id)}async function F(){try{let{data:e}=await o.get(`/furniture/items`);b.value=e.reduce((e,t)=>e+(t.price??0),0)}catch{b.value=0}}return ne(()=>{r.load(),F()}),(n,o)=>(A(),V(`div`,null,[N(r).error?(A(),C(N(a),{key:0,severity:`error`,class:`mb-4`},{default:_(()=>[H(p(N(r).error),1)]),_:1})):L(``,!0),j(`div`,st,[j(`div`,ct,[j(`div`,lt,[o[18]||=j(`h2`,{class:`display-font text-2xl m-0 mb-4`},` Monte uma simulação `,-1),j(`form`,{class:`grid`,onSubmit:oe(re,[`prevent`])},[j(`div`,ut,[o[10]||=j(`label`,{for:`sim-value`,class:`block font-bold mb-2`},`Valor do imóvel`,-1),O(N(q),{id:`sim-value`,modelValue:s.value,"onUpdate:modelValue":o[0]||=e=>s.value=e,mode:`currency`,currency:`BRL`,locale:`pt-BR`,class:`w-full`,min:0},null,8,[`modelValue`])]),j(`div`,dt,[o[11]||=j(`label`,{for:`sim-down`,class:`block font-bold mb-2`},`Entrada`,-1),O(N(q),{id:`sim-down`,modelValue:c.value,"onUpdate:modelValue":o[1]||=e=>c.value=e,mode:`currency`,currency:`BRL`,locale:`pt-BR`,class:`w-full`,min:0},null,8,[`modelValue`])]),j(`div`,ft,[o[12]||=j(`label`,{for:`sim-rate`,class:`block font-bold mb-2`},`Taxa de juros (a.a.)`,-1),O(N(q),{id:`sim-rate`,modelValue:l.value,"onUpdate:modelValue":o[2]||=e=>l.value=e,suffix:`%`,locale:`pt-BR`,"min-fraction-digits":1,"max-fraction-digits":2,class:`w-full`,min:.1,max:40},null,8,[`modelValue`]),o[13]||=j(`small`,{class:`block mt-2 opacity-60`},`Referência jul/2026: Caixa 11,19% · Itaú 11,60% · Bradesco 11,70% · Santander 11,79%`,-1)]),j(`div`,pt,[o[14]||=j(`label`,{for:`sim-term`,class:`block font-bold mb-2`},`Prazo (anos)`,-1),O(N(q),{id:`sim-term`,modelValue:u.value,"onUpdate:modelValue":o[3]||=e=>u.value=e,class:`w-full`,min:1,max:35},null,8,[`modelValue`])]),j(`div`,mt,[o[15]||=j(`label`,{class:`block font-bold mb-2`},`Sistema de amortização`,-1),O(N(nt),{modelValue:d.value,"onUpdate:modelValue":o[4]||=e=>d.value=e,options:x,"option-label":`label`,"option-value":`value`,"allow-empty":!1,class:`w-full system-toggle`},null,8,[`modelValue`]),j(`small`,ht,p(w.value),1)]),j(`div`,gt,[o[16]||=j(`label`,{for:`sim-lender`,class:`block font-bold mb-2`},`Financiador`,-1),O(N(i),{id:`sim-lender`,modelValue:f.value,"onUpdate:modelValue":o[5]||=e=>f.value=e,options:ee,editable:``,placeholder:`Selecione ou digite`,class:`w-full`},null,8,[`modelValue`])]),j(`div`,_t,[o[17]||=j(`label`,{for:`sim-name`,class:`block font-bold mb-2`},`Nome da simulação`,-1),O(N(t),{id:`sim-name`,modelValue:h.value,"onUpdate:modelValue":o[6]||=e=>h.value=e,class:`w-full`,placeholder:`Ex.: Apto Vila Mariana - Caixa`,maxlength:`80`},null,8,[`modelValue`])]),j(`div`,vt,[O(N(e),{type:`submit`,label:`Salvar simulação`,icon:`pi pi-bookmark`,loading:N(r).saving,disabled:!k.value},null,8,[`loading`,`disabled`])])],32)]),j(`div`,yt,[o[29]||=j(`h2`,{class:`display-font text-2xl m-0 mb-1`},` Custo inicial estimado `,-1),o[30]||=j(`p`,{class:`text-sm opacity-60 mt-1 mb-4`},` Além da entrada, some as taxas da compra e o que falta comprar para a casa. `,-1),j(`div`,bt,[j(`div`,xt,[o[19]||=j(`label`,{for:`sim-itbi`,class:`block font-bold mb-2 text-sm`},`ITBI`,-1),O(N(q),{id:`sim-itbi`,modelValue:g.value,"onUpdate:modelValue":o[7]||=e=>g.value=e,suffix:`%`,class:`w-full`,min:0,max:10,"max-fraction-digits":1},null,8,[`modelValue`])]),j(`div`,St,[o[20]||=j(`label`,{for:`sim-registro`,class:`block font-bold mb-2 text-sm`},`Registro em cartório`,-1),O(N(q),{id:`sim-registro`,modelValue:v.value,"onUpdate:modelValue":o[8]||=e=>v.value=e,suffix:`%`,class:`w-full`,min:0,max:10,"max-fraction-digits":1},null,8,[`modelValue`])]),j(`div`,Ct,[o[21]||=j(`label`,{for:`sim-bank-fees`,class:`block font-bold mb-2 text-sm`},`Taxas do financiamento`,-1),O(N(q),{id:`sim-bank-fees`,modelValue:y.value,"onUpdate:modelValue":o[9]||=e=>y.value=e,suffix:`%`,class:`w-full`,min:0,max:10,"max-fraction-digits":1},null,8,[`modelValue`])]),j(`div`,wt,[o[22]||=j(`span`,{class:`block font-bold mb-2 text-sm`},`Lista da casa`,-1),j(`div`,Tt,p(M(b.value)),1)])]),j(`div`,Et,[j(`div`,Dt,[o[23]||=j(`span`,null,`Entrada`,-1),j(`span`,null,p(M(c.value||0)),1)]),j(`div`,Ot,[j(`span`,null,`ITBI + registro + taxas (`+p(g.value+v.value+y.value)+`%)`,1),j(`span`,null,p(M(D.value)),1)]),j(`div`,kt,[o[24]||=j(`span`,null,`Móveis e itens da casa`,-1),j(`span`,null,p(M(b.value)),1)]),j(`div`,At,[o[25]||=j(`strong`,null,`Total para tirar do bolso`,-1),j(`strong`,null,p(M(te.value)),1)])]),j(`small`,jt,[o[27]||=H(` Móveis calculados a partir do valor cadastrado em `,-1),O(N(ae),{to:`/casa`},{default:_(()=>[...o[26]||=[H(`Lista para a casa`,-1)]]),_:1}),o[28]||=H(`. Escritura pública não entra porque o contrato de financiamento já serve como título. `,-1)])])]),j(`div`,Mt,[j(`div`,Nt,[o[35]||=j(`span`,{class:`inline-block text-sm uppercase font-bold mb-2 eyebrow`},`Resultado aproximado`,-1),j(`h2`,Pt,[H(p(M(E.value.firstInstallment)),1),j(`span`,Ft,`/mês `+p(d.value===`sac`?`(1ª parcela)`:``),1)]),j(`div`,It,[j(`div`,Lt,[o[31]||=j(`span`,{class:`block text-xs uppercase opacity-60 mb-1`},`Financiado`,-1),j(`strong`,Rt,p(M(E.value.financedAmount)),1)]),j(`div`,zt,[o[32]||=j(`span`,{class:`block text-xs uppercase opacity-60 mb-1`},`Última parcela`,-1),j(`strong`,Bt,p(M(E.value.lastInstallment)),1)]),j(`div`,Vt,[o[33]||=j(`span`,{class:`block text-xs uppercase opacity-60 mb-1`},`Total de juros`,-1),j(`strong`,Ht,p(M(E.value.totalInterest)),1)]),j(`div`,Ut,[o[34]||=j(`span`,{class:`block text-xs uppercase opacity-60 mb-1`},`Total pago`,-1),j(`strong`,Wt,p(M(E.value.totalPaid)),1)])]),o[36]||=j(`p`,{class:`text-sm line-height-3 opacity-80 mt-4 mb-0`},` Estimativa simplificada (sem TR, seguros MIP/DFI ou tarifas). Para decidir de fato, compare o CET de cada banco. `,-1)])])]),N(r).items.length?(A(),V(`div`,Gt,[o[40]||=j(`h2`,{class:`display-font text-2xl mb-3`},`Simulações salvas`,-1),j(`div`,Kt,[(A(!0),V(I,null,S(N(r).items,t=>(A(),V(`div`,{key:t.id,class:`col-12 md:col-6 lg:col-4`},[j(`article`,qt,[j(`div`,Jt,[j(`h3`,Yt,p(t.name),1),O(N(e),{icon:`pi pi-times`,text:``,rounded:``,severity:`secondary`,"aria-label":`Remover simulação`,onClick:e=>P(t)},null,8,[`onClick`])]),j(`div`,Xt,[O(N(J),{value:t.lender,severity:`secondary`},null,8,[`value`]),O(N(J),{value:t.system===`sac`?`SAC`:`Price`,severity:`info`},null,8,[`value`]),O(N(J),{value:`${t.termMonths/12} anos`,severity:`secondary`},null,8,[`value`])]),j(`div`,Zt,[j(`div`,Qt,[o[37]||=j(`span`,null,`1ª parcela`,-1),j(`strong`,null,p(M(t.firstInstallment)),1)]),j(`div`,$t,[o[38]||=j(`span`,null,`Última parcela`,-1),j(`strong`,null,p(M(t.lastInstallment)),1)]),j(`div`,en,[o[39]||=j(`span`,null,`Total de juros`,-1),j(`strong`,null,p(M(t.totalInterest)),1)])])])]))),128))])])):L(``,!0)]))}}),[[`__scopeId`,`data-v-703f8060`]]),nn={class:`lender-list`},rn={class:`lender-rank`},an={class:`lender-info`},on={class:`lender-name`},sn={class:`lender-note`},cn={class:`lender-rate`},ln=F(k({__name:`LenderRanking`,setup(e){let t=[{rank:1,name:`Banco do Brasil`,rate:`a partir de 9,00% a.a. + TR`,note:`Melhor taxa para cotista FGTS/poupança do BB`},{rank:2,name:`Caixa Econômica Federal`,rate:`a partir de 11,19% a.a. + TR`,note:`Referência do mercado, taxa preferencial para correntista`},{rank:3,name:`BRB`,rate:`a partir de 11,36% a.a.`,note:`Boa taxa entre os bancos regionais`},{rank:4,name:`Itaú`,rate:`a partir de 11,60% a.a.`,note:`Aprovação rápida entre os privados`},{rank:5,name:`Bradesco`,rate:`a partir de 11,70% a.a.`,note:`Faixa competitiva, bom para quem já é correntista`},{rank:6,name:`Santander`,rate:`a partir de 11,79% a.a.`,note:`Costuma ter campanhas para imóveis novos`},{rank:7,name:`Sicoob`,rate:`aprox. 11% a 12% a.a.`,note:`Cooperativa — melhor taxa se você for associado`},{rank:8,name:`Sicredi`,rate:`aprox. 11% a 12% a.a.`,note:`Cooperativa — vale comparar se já tem conta`},{rank:9,name:`Banrisul`,rate:`próximo à média de mercado`,note:`Forte para quem mora no Rio Grande do Sul`},{rank:10,name:`Inter`,rate:`próximo à média de mercado`,note:`100% digital, simulação rápida pelo app`}];return(e,n)=>(A(),V(`div`,null,[n[0]||=j(`h2`,{class:`display-font text-2xl mb-1`},`Bancos mais indicados`,-1),n[1]||=j(`p`,{class:`text-sm opacity-60 mb-4`},` Taxas de referência (jul/2026) para o SFH — confirme sempre o CET antes de decidir, ele muda por perfil, relacionamento e valor do imóvel. `,-1),j(`div`,nn,[(A(),V(I,null,S(t,e=>j(`article`,{key:e.name,class:`lender-row`},[j(`span`,rn,p(String(e.rank).padStart(2,`0`)),1),j(`div`,an,[j(`strong`,on,p(e.name),1),j(`span`,sn,p(e.note),1)]),j(`span`,cn,p(e.rate),1)])),64))])]))}}),[[`__scopeId`,`data-v-4b788c19`]]),un={class:`grid`},dn={class:`border-round-3xl p-4 h-full faixa-card`},fn={class:`flex align-items-center justify-content-between mb-2`},pn={class:`display-font text-lg m-0`},mn={class:`text-sm line-height-3 opacity-80`},hn={class:`flex justify-content-between py-1`},gn={class:`flex justify-content-between py-1`},_n={class:`flex justify-content-between py-1`},vn=F(k({__name:`MinhaCasaMinhaVidaInfo`,setup(e){let t=[{label:`Faixa 1`,income:`até R$ 3.200`,maxProperty:`R$ 210 mil a R$ 275 mil`,subsidy:`até 95% do imóvel`,rate:`3,75% a 4,25% a.a.`},{label:`Faixa 2`,income:`R$ 3.200,01 a R$ 5.000`,maxProperty:`R$ 210 mil a R$ 275 mil`,subsidy:`até R$ 55 mil`,rate:`4% a 4,25% a.a.`},{label:`Faixa 3`,income:`R$ 5.000,01 a R$ 9.600`,maxProperty:`até R$ 400 mil`,subsidy:`sem subsídio`,rate:`abaixo do mercado`},{label:`Faixa 4`,income:`R$ 9.600,01 a R$ 13.000`,maxProperty:`até R$ 600 mil`,subsidy:`sem subsídio`,rate:`10% a 10,5% a.a.`}];return(e,n)=>(A(),V(`div`,null,[n[3]||=j(`h2`,{class:`display-font text-2xl mb-1`},`Minha Casa Minha Vida 2026`,-1),n[4]||=j(`p`,{class:`text-sm opacity-60 mb-4`},` Se a renda familiar entrar em alguma faixa abaixo, vale simular pelo MCMV antes de ir para o financiamento tradicional — as taxas são bem menores. `,-1),j(`div`,un,[(A(),V(I,null,S(t,e=>j(`div`,{key:e.label,class:`col-12 md:col-6`},[j(`article`,dn,[j(`div`,fn,[j(`h3`,pn,p(e.label),1),O(N(J),{value:e.rate,severity:`success`},null,8,[`value`])]),j(`div`,mn,[j(`div`,hn,[n[0]||=j(`span`,null,`Renda familiar`,-1),j(`strong`,null,p(e.income),1)]),j(`div`,gn,[n[1]||=j(`span`,null,`Valor máx. do imóvel`,-1),j(`strong`,null,p(e.maxProperty),1)]),j(`div`,_n,[n[2]||=j(`span`,null,`Subsídio`,-1),j(`strong`,null,p(e.subsidy),1)])])])])),64))]),n[5]||=j(`div`,{class:`border-round-3xl p-4 md:p-5 mt-4 mcmv-note`},[j(`i`,{class:`pi pi-info-circle text-forest mr-2`}),j(`span`,{class:`text-sm line-height-3 opacity-80`},` O valor máximo do imóvel varia por localidade (regiões metropolitanas e capitais têm tetos maiores dentro de cada faixa) e o subsídio da Faixa 2 depende de renda e região — confirme os números atualizados no simulador oficial da Caixa antes de fechar negócio. `)],-1)]))}}),[[`__scopeId`,`data-v-ed674885`]]),yn={class:`mt-5`},bn=k({__name:`LendersAndPrograms`,setup(e){return(e,t)=>(A(),V(`div`,null,[O(ln),j(`div`,yn,[O(vn)])]))}}),xn={class:`grid mb-5`},Sn={class:`surface-card border-1 border-round-3xl p-4 h-full cost-card`},Cn={class:`flex align-items-center gap-3 mb-2`},wn={class:`display-font text-lg m-0`},Tn={class:`ml-auto font-bold text-terracotta`},En={class:`line-height-3 opacity-70 m-0 text-sm`},Dn=F(k({__name:`TipsRatesInfo`,setup(e){let t=[{title:`ITBI`,range:`2% a 4%`,icon:`pi pi-percentage`,description:`Imposto municipal pago pelo comprador na transferência do imóvel. Em São Paulo e no Rio a média fica em torno de 3%.`},{title:`Escritura pública`,range:`1% a 2%`,icon:`pi pi-file-edit`,description:`Necessária só na compra à vista — se o imóvel for financiado, o próprio contrato de financiamento já serve como título.`},{title:`Registro em cartório`,range:`0,5% a 1,5%`,icon:`pi pi-verified`,description:`Obrigatório em qualquer compra: é o registro que garante que o imóvel é seu perante terceiros.`},{title:`Taxas do financiamento`,range:`até 5%`,icon:`pi pi-building-columns`,description:`Avaliação do imóvel, tarifas de análise e seguros MIP/DFI. Vários bancos permitem incluir parte disso no próprio financiamento.`}];return(e,n)=>(A(),V(`div`,null,[n[0]||=j(`div`,{class:`border-round-3xl p-4 md:p-5 mb-5 budget-panel`},[j(`span`,{class:`inline-block text-sm uppercase font-bold mb-2 eyebrow`},`Regra prática`),j(`p`,{class:`text-xl line-height-3 m-0`},[H(` Reserve entre `),j(`strong`,null,`10% e 13%`),H(` do valor do imóvel só para custos de compra — além da entrada. É a soma de ITBI, escritura, registro e as primeiras taxas do financiamento. `)])],-1),n[1]||=j(`h2`,{class:`display-font text-2xl mb-3`},`Principais taxas da compra`,-1),j(`div`,xn,[(A(),V(I,null,S(t,e=>j(`div`,{key:e.title,class:`col-12 md:col-6`},[j(`article`,Sn,[j(`div`,Cn,[j(`i`,{class:s([e.icon,`text-xl text-terracotta`])},null,2),j(`h3`,wn,p(e.title),1),j(`span`,Tn,p(e.range),1)]),j(`p`,En,p(e.description),1)])])),64))]),n[2]||=re(`<h2 class="display-font text-2xl mb-3" data-v-c6a1676f>Tabela Price ou SAC?</h2><div class="grid mb-3" data-v-c6a1676f><div class="col-12 md:col-6" data-v-c6a1676f><article class="border-round-3xl p-4 md:p-5 h-full system-card sac-card" data-v-c6a1676f><h3 class="display-font text-xl m-0 mb-2" data-v-c6a1676f> SAC <span class="font-normal text-base" data-v-c6a1676f>(amortização constante)</span></h3><ul class="line-height-3 pl-3 m-0 text-sm" data-v-c6a1676f><li data-v-c6a1676f>Parcelas começam mais altas e vão diminuindo</li><li data-v-c6a1676f>Amortiza a dívida mais rápido</li><li data-v-c6a1676f>Menos juros no total do contrato</li><li data-v-c6a1676f> Melhor para quem pretende quitar antecipadamente </li></ul></article></div><div class="col-12 md:col-6" data-v-c6a1676f><article class="border-round-3xl p-4 md:p-5 h-full system-card price-card" data-v-c6a1676f><h3 class="display-font text-xl m-0 mb-2" data-v-c6a1676f> Price <span class="font-normal text-base" data-v-c6a1676f>(parcela fixa)</span></h3><ul class="line-height-3 pl-3 m-0 text-sm" data-v-c6a1676f><li data-v-c6a1676f>Parcela igual do início ao fim</li><li data-v-c6a1676f>No começo, paga mais juros que amortização</li><li data-v-c6a1676f>Custo total de juros maior</li><li data-v-c6a1676f> Exige menos renda comprometida — facilita a aprovação </li></ul></article></div></div><div class="border-round-3xl p-4 md:p-5 example-panel mb-5" data-v-c6a1676f><span class="inline-block text-sm uppercase font-bold mb-2 eyebrow" data-v-c6a1676f>Exemplo de mercado</span><p class="line-height-3 m-0" data-v-c6a1676f> Para R$ 300 mil a 10% a.a. em 180 meses, o SAC soma cerca de <strong data-v-c6a1676f>R$ 516 mil</strong> pagos ao final, contra <strong data-v-c6a1676f>R$ 580,6 mil</strong> na Price — quase R$ 65 mil a mais em juros. Use a aba <strong data-v-c6a1676f>Simular financiamento</strong> para fazer essa conta com os seus números. </p></div><div class="border-round-3xl p-4 md:p-5 cet-panel" data-v-c6a1676f><div class="flex align-items-center gap-3 mb-2" data-v-c6a1676f><i class="pi pi-info-circle text-xl text-forest" data-v-c6a1676f></i><h3 class="display-font text-lg m-0" data-v-c6a1676f> O que realmente importa: o CET </h3></div><p class="line-height-3 opacity-80 m-0 text-sm" data-v-c6a1676f> O Custo Efetivo Total (CET) inclui a taxa de juros, o seguro obrigatório (MIP e DFI) e as tarifas de administração. Dois bancos com a mesma taxa nominal podem ter CETs bem diferentes — sempre peça o CET antes de comparar propostas. </p></div>`,4)]))}}),[[`__scopeId`,`data-v-c6a1676f`]]),On=x(`tips`,()=>{let e=u([]),t=m(!1),r=m(``);async function i(){t.value=!0;try{let{data:t}=await o.get(`/tips`);e.value=t}catch(e){r.value=n(e)}finally{t.value=!1}}return{items:e,loading:t,error:r,load:i}}),kn={class:`max-w-7xl mx-auto`},An={key:1,class:`grid`},jn={class:`surface-card border-1 border-round-3xl p-4 md:p-5 h-full tip-card`},Mn={class:`display-font text-5xl text-terracotta opacity-30`},Nn={class:`display-font text-3xl mb-3`},Pn={class:`line-height-3 opacity-70 white-space-pre-line`},Fn={key:2,class:`grid`},In={class:`h-full border-top-2 pt-4 pb-6 placeholder-card`},Ln={class:`flex align-items-center justify-content-between mb-5`},Rn={class:`display-font text-4xl opacity-25`},zn={class:`display-font text-2xl m-0 mb-2`},Bn=F(k({__name:`TipsGuide`,setup(e){let t=On(),n=[{number:`01`,title:`Documentação`,icon:`pi pi-file-check`},{number:`02`,title:`Visita e vistoria`,icon:`pi pi-search`},{number:`03`,title:`Custos da compra`,icon:`pi pi-calculator`}];return ne(t.load),(e,r)=>(A(),V(`section`,kn,[r[5]||=j(`div`,{class:`mb-6 md:mb-7`},[j(`span`,{class:`inline-block text-sm uppercase font-bold text-terracotta mb-2 eyebrow`},`Antes de assinar`),j(`h1`,{class:`display-font text-5xl md:text-7xl line-height-1 m-0`},[H(`Comprar com`),j(`br`),j(`em`,null,`os olhos abertos.`)])],-1),O(N(Ie),{value:`dicas`},{default:_(()=>[O(N(we),null,{default:_(()=>[O(N(Y),{value:`dicas`},{default:_(()=>[...r[0]||=[H(`Dicas`,-1)]]),_:1}),O(N(Y),{value:`taxas`},{default:_(()=>[...r[1]||=[H(`Taxas e juros`,-1)]]),_:1}),O(N(Y),{value:`simulador`},{default:_(()=>[...r[2]||=[H(`Simular financiamento`,-1)]]),_:1}),O(N(Y),{value:`bancos`},{default:_(()=>[...r[3]||=[H(`Bancos e programas`,-1)]]),_:1})]),_:1}),O(N(Ne),null,{default:_(()=>[O(N(Q),{value:`dicas`},{default:_(()=>[N(t).error?(A(),C(N(a),{key:0,severity:`error`,class:`mb-4`},{default:_(()=>[H(p(N(t).error),1)]),_:1})):L(``,!0),N(t).items.length?(A(),V(`div`,An,[(A(!0),V(I,null,S(N(t).items,(e,t)=>(A(),V(`article`,{key:e.id,class:`col-12 md:col-6`},[j(`div`,jn,[j(`span`,Mn,p(String(t+1).padStart(2,`0`)),1),j(`h2`,Nn,p(e.title),1),j(`p`,Pn,p(e.content),1)])]))),128))])):N(t).loading?L(``,!0):(A(),V(`div`,Fn,[(A(),V(I,null,S(n,e=>j(`div`,{key:e.number,class:`col-12 md:col-4`},[j(`article`,In,[j(`div`,Ln,[j(`span`,Rn,p(e.number),1),j(`i`,{class:s([e.icon,`text-xl text-terracotta`])},null,2)]),j(`h2`,zn,p(e.title),1),r[4]||=j(`p`,{class:`line-height-3 opacity-55 m-0`},`Conteúdo reservado para a próxima etapa.`,-1)])])),64))]))]),_:1}),O(N(Q),{value:`taxas`},{default:_(()=>[O(Dn)]),_:1}),O(N(Q),{value:`simulador`},{default:_(()=>[O(tn)]),_:1}),O(N(Q),{value:`bancos`},{default:_(()=>[O(bn)]),_:1})]),_:1})]),_:1})]))}}),[[`__scopeId`,`data-v-05a6c893`]]),Vn=k({__name:`TipsView`,setup(e){return(e,t)=>(A(),C(Bn))}});export{Vn as default};