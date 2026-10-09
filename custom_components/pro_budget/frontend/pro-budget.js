/* pro-budget v0.1.0 | MIT | https://github.com/malte-wessel/pro-budget */
var H5=Object.defineProperty;var V5=Object.getOwnPropertyDescriptor;var d=(M,V,C,H)=>{for(var L=H>1?void 0:H?V5(V,C):V,t=M.length-1,e;t>=0;t--)(e=M[t])&&(L=(H?e(V,C,L):e(L))||L);return H&&L&&H5(V,C,L),L};var h1=globalThis,g1=h1.ShadowRoot&&(h1.ShadyCSS===void 0||h1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$1=Symbol(),M2=new WeakMap,d1=class{constructor(V,C,H){if(this._$cssResult$=!0,H!==$1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=V,this.t=C}get styleSheet(){let V=this.o,C=this.t;if(g1&&V===void 0){let H=C!==void 0&&C.length===1;H&&(V=M2.get(C)),V===void 0&&((this.o=V=new CSSStyleSheet).replaceSync(this.cssText),H&&M2.set(C,V))}return V}toString(){return this.cssText}},Q=M=>new d1(typeof M=="string"?M:M+"",void 0,$1),u=(M,...V)=>{let C=M.length===1?M[0]:V.reduce((H,L,t)=>H+(e=>{if(e._$cssResult$===!0)return e.cssText;if(typeof e=="number")return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(L)+M[t+1],M[0]);return new d1(C,M,$1)},e2=(M,V)=>{if(g1)M.adoptedStyleSheets=V.map(C=>C instanceof CSSStyleSheet?C:C.styleSheet);else for(let C of V){let H=document.createElement("style"),L=h1.litNonce;L!==void 0&&H.setAttribute("nonce",L),H.textContent=C.cssText,M.appendChild(H)}},D1=g1?M=>M:M=>M instanceof CSSStyleSheet?(V=>{let C="";for(let H of V.cssRules)C+=H.cssText;return Q(C)})(M):M;var{is:L5,defineProperty:M5,getOwnPropertyDescriptor:e5,getOwnPropertyNames:r5,getOwnPropertySymbols:t5,getPrototypeOf:i5}=Object,O1=globalThis,r2=O1.trustedTypes,a5=r2?r2.emptyScript:"",o5=O1.reactiveElementPolyfillSupport,n1=(M,V)=>M,m1={toAttribute(M,V){switch(V){case Boolean:M=M?a5:null;break;case Object:case Array:M=M==null?M:JSON.stringify(M)}return M},fromAttribute(M,V){let C=M;switch(V){case Boolean:C=M!==null;break;case Number:C=M===null?null:Number(M);break;case Object:case Array:try{C=JSON.parse(M)}catch{C=null}}return C}},f1=(M,V)=>!L5(M,V),t2={attribute:!0,type:String,converter:m1,reflect:!1,useDefault:!1,hasChanged:f1};Symbol.metadata??=Symbol("metadata"),O1.litPropertyMetadata??=new WeakMap;var G=class extends HTMLElement{static addInitializer(V){this._$Ei(),(this.l??=[]).push(V)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(V,C=t2){if(C.state&&(C.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(V)&&((C=Object.create(C)).wrapped=!0),this.elementProperties.set(V,C),!C.noAccessor){let H=Symbol(),L=this.getPropertyDescriptor(V,H,C);L!==void 0&&M5(this.prototype,V,L)}}static getPropertyDescriptor(V,C,H){let{get:L,set:t}=e5(this.prototype,V)??{get(){return this[C]},set(e){this[C]=e}};return{get:L,set(e){let A=L?.call(this);t?.call(this,e),this.requestUpdate(V,A,H)},configurable:!0,enumerable:!0}}static getPropertyOptions(V){return this.elementProperties.get(V)??t2}static _$Ei(){if(this.hasOwnProperty(n1("elementProperties")))return;let V=i5(this);V.finalize(),V.l!==void 0&&(this.l=[...V.l]),this.elementProperties=new Map(V.elementProperties)}static finalize(){if(this.hasOwnProperty(n1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(n1("properties"))){let C=this.properties,H=[...r5(C),...t5(C)];for(let L of H)this.createProperty(L,C[L])}let V=this[Symbol.metadata];if(V!==null){let C=litPropertyMetadata.get(V);if(C!==void 0)for(let[H,L]of C)this.elementProperties.set(H,L)}this._$Eh=new Map;for(let[C,H]of this.elementProperties){let L=this._$Eu(C,H);L!==void 0&&this._$Eh.set(L,C)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(V){let C=[];if(Array.isArray(V)){let H=new Set(V.flat(1/0).reverse());for(let L of H)C.unshift(D1(L))}else V!==void 0&&C.push(D1(V));return C}static _$Eu(V,C){let H=C.attribute;return H===!1?void 0:typeof H=="string"?H:typeof V=="string"?V.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(V=>this.enableUpdating=V),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(V=>V(this))}addController(V){(this._$EO??=new Set).add(V),this.renderRoot!==void 0&&this.isConnected&&V.hostConnected?.()}removeController(V){this._$EO?.delete(V)}_$E_(){let V=new Map,C=this.constructor.elementProperties;for(let H of C.keys())this.hasOwnProperty(H)&&(V.set(H,this[H]),delete this[H]);V.size>0&&(this._$Ep=V)}createRenderRoot(){let V=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return e2(V,this.constructor.elementStyles),V}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(V=>V.hostConnected?.())}enableUpdating(V){}disconnectedCallback(){this._$EO?.forEach(V=>V.hostDisconnected?.())}attributeChangedCallback(V,C,H){this._$AK(V,H)}_$ET(V,C){let H=this.constructor.elementProperties.get(V),L=this.constructor._$Eu(V,H);if(L!==void 0&&H.reflect===!0){let t=(H.converter?.toAttribute!==void 0?H.converter:m1).toAttribute(C,H.type);this._$Em=V,t==null?this.removeAttribute(L):this.setAttribute(L,t),this._$Em=null}}_$AK(V,C){let H=this.constructor,L=H._$Eh.get(V);if(L!==void 0&&this._$Em!==L){let t=H.getPropertyOptions(L),e=typeof t.converter=="function"?{fromAttribute:t.converter}:t.converter?.fromAttribute!==void 0?t.converter:m1;this._$Em=L;let A=e.fromAttribute(C,t.type);this[L]=A??this._$Ej?.get(L)??A,this._$Em=null}}requestUpdate(V,C,H,L=!1,t){if(V!==void 0){let e=this.constructor;if(L===!1&&(t=this[V]),H??=e.getPropertyOptions(V),!((H.hasChanged??f1)(t,C)||H.useDefault&&H.reflect&&t===this._$Ej?.get(V)&&!this.hasAttribute(e._$Eu(V,H))))return;this.C(V,C,H)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(V,C,{useDefault:H,reflect:L,wrapped:t},e){H&&!(this._$Ej??=new Map).has(V)&&(this._$Ej.set(V,e??C??this[V]),t!==!0||e!==void 0)||(this._$AL.has(V)||(this.hasUpdated||H||(C=void 0),this._$AL.set(V,C)),L===!0&&this._$Em!==V&&(this._$Eq??=new Set).add(V))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(C){Promise.reject(C)}let V=this.scheduleUpdate();return V!=null&&await V,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[L,t]of this._$Ep)this[L]=t;this._$Ep=void 0}let H=this.constructor.elementProperties;if(H.size>0)for(let[L,t]of H){let{wrapped:e}=t,A=this[L];e!==!0||this._$AL.has(L)||A===void 0||this.C(L,void 0,t,A)}}let V=!1,C=this._$AL;try{V=this.shouldUpdate(C),V?(this.willUpdate(C),this._$EO?.forEach(H=>H.hostUpdate?.()),this.update(C)):this._$EM()}catch(H){throw V=!1,this._$EM(),H}V&&this._$AE(C)}willUpdate(V){}_$AE(V){this._$EO?.forEach(C=>C.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(V)),this.updated(V)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(V){return!0}update(V){this._$Eq&&=this._$Eq.forEach(C=>this._$ET(C,this[C])),this._$EM()}updated(V){}firstUpdated(V){}};G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[n1("elementProperties")]=new Map,G[n1("finalized")]=new Map,o5?.({ReactiveElement:G}),(O1.reactiveElementVersions??=[]).push("2.1.2");var z1=globalThis,i2=M=>M,y1=z1.trustedTypes,a2=y1?y1.createPolicy("lit-html",{createHTML:M=>M}):void 0,p2="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,l2="?"+z,A5=`<${l2}>`,J=document,l1=()=>J.createComment(""),v1=M=>M===null||typeof M!="object"&&typeof M!="function",K1=Array.isArray,d5=M=>K1(M)||typeof M?.[Symbol.iterator]=="function",I1=`[ 	
\f\r]`,p1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,o2=/-->/g,A2=/>/g,X=RegExp(`>|${I1}(?:([^\\s"'>=/]+)(${I1}*=${I1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),d2=/'/g,n2=/"/g,v2=/^(?:script|style|textarea|title)$/i,q1=M=>(V,...C)=>({_$litType$:M,strings:V,values:C}),a=q1(1),B5=q1(2),P5=q1(3),C1=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),m2=new WeakMap,Y=J.createTreeWalker(J,129);function x2(M,V){if(!K1(M)||!M.hasOwnProperty("raw"))throw Error("invalid template strings array");return a2!==void 0?a2.createHTML(V):V}var n5=(M,V)=>{let C=M.length-1,H=[],L,t=V===2?"<svg>":V===3?"<math>":"",e=p1;for(let A=0;A<C;A++){let o=M[A],p,n,i=-1,s=0;for(;s<o.length&&(e.lastIndex=s,n=e.exec(o),n!==null);)s=e.lastIndex,e===p1?n[1]==="!--"?e=o2:n[1]!==void 0?e=A2:n[2]!==void 0?(v2.test(n[2])&&(L=RegExp("</"+n[2],"g")),e=X):n[3]!==void 0&&(e=X):e===X?n[0]===">"?(e=L??p1,i=-1):n[1]===void 0?i=-2:(i=e.lastIndex-n[2].length,p=n[1],e=n[3]===void 0?X:n[3]==='"'?n2:d2):e===n2||e===d2?e=X:e===o2||e===A2?e=p1:(e=X,L=void 0);let x=e===X&&M[A+1].startsWith("/>")?" ":"";t+=e===p1?o+A5:i>=0?(H.push(p),o.slice(0,i)+p2+o.slice(i)+z+x):o+z+(i===-2?A:x)}return[x2(M,t+(M[C]||"<?>")+(V===2?"</svg>":V===3?"</math>":"")),H]},x1=class M{constructor({strings:V,_$litType$:C},H){let L;this.parts=[];let t=0,e=0,A=V.length-1,o=this.parts,[p,n]=n5(V,C);if(this.el=M.createElement(p,H),Y.currentNode=this.el.content,C===2||C===3){let i=this.el.content.firstChild;i.replaceWith(...i.childNodes)}for(;(L=Y.nextNode())!==null&&o.length<A;){if(L.nodeType===1){if(L.hasAttributes())for(let i of L.getAttributeNames())if(i.endsWith(p2)){let s=n[e++],x=L.getAttribute(i).split(z),w=/([.?@])?(.*)/.exec(s);o.push({type:1,index:t,name:w[2],strings:x,ctor:w[1]==="."?W1:w[1]==="?"?U1:w[1]==="@"?G1:r1}),L.removeAttribute(i)}else i.startsWith(z)&&(o.push({type:6,index:t}),L.removeAttribute(i));if(v2.test(L.tagName)){let i=L.textContent.split(z),s=i.length-1;if(s>0){L.textContent=y1?y1.emptyScript:"";for(let x=0;x<s;x++)L.append(i[x],l1()),Y.nextNode(),o.push({type:2,index:++t});L.append(i[s],l1())}}}else if(L.nodeType===8)if(L.data===l2)o.push({type:2,index:t});else{let i=-1;for(;(i=L.data.indexOf(z,i+1))!==-1;)o.push({type:7,index:t}),i+=z.length-1}t++}}static createElement(V,C){let H=J.createElement("template");return H.innerHTML=V,H}};function e1(M,V,C=M,H){if(V===C1)return V;let L=H!==void 0?C._$Co?.[H]:C._$Cl,t=v1(V)?void 0:V._$litDirective$;return L?.constructor!==t&&(L?._$AO?.(!1),t===void 0?L=void 0:(L=new t(M),L._$AT(M,C,H)),H!==void 0?(C._$Co??=[])[H]=L:C._$Cl=L),L!==void 0&&(V=e1(M,L._$AS(M,V.values),L,H)),V}var N1=class{constructor(V,C){this._$AV=[],this._$AN=void 0,this._$AD=V,this._$AM=C}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(V){let{el:{content:C},parts:H}=this._$AD,L=(V?.creationScope??J).importNode(C,!0);Y.currentNode=L;let t=Y.nextNode(),e=0,A=0,o=H[0];for(;o!==void 0;){if(e===o.index){let p;o.type===2?p=new s1(t,t.nextSibling,this,V):o.type===1?p=new o.ctor(t,o.name,o.strings,this,V):o.type===6&&(p=new Q1(t,this,V)),this._$AV.push(p),o=H[++A]}e!==o?.index&&(t=Y.nextNode(),e++)}return Y.currentNode=J,L}p(V){let C=0;for(let H of this._$AV)H!==void 0&&(H.strings!==void 0?(H._$AI(V,H,C),C+=H.strings.length-2):H._$AI(V[C])),C++}},s1=class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(V,C,H,L){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=V,this._$AB=C,this._$AM=H,this.options=L,this._$Cv=L?.isConnected??!0}get parentNode(){let V=this._$AA.parentNode,C=this._$AM;return C!==void 0&&V?.nodeType===11&&(V=C.parentNode),V}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(V,C=this){V=e1(this,V,C),v1(V)?V===m||V==null||V===""?(this._$AH!==m&&this._$AR(),this._$AH=m):V!==this._$AH&&V!==C1&&this._(V):V._$litType$!==void 0?this.$(V):V.nodeType!==void 0?this.T(V):d5(V)?this.k(V):this._(V)}O(V){return this._$AA.parentNode.insertBefore(V,this._$AB)}T(V){this._$AH!==V&&(this._$AR(),this._$AH=this.O(V))}_(V){this._$AH!==m&&v1(this._$AH)?this._$AA.nextSibling.data=V:this.T(J.createTextNode(V)),this._$AH=V}$(V){let{values:C,_$litType$:H}=V,L=typeof H=="number"?this._$AC(V):(H.el===void 0&&(H.el=x1.createElement(x2(H.h,H.h[0]),this.options)),H);if(this._$AH?._$AD===L)this._$AH.p(C);else{let t=new N1(L,this),e=t.u(this.options);t.p(C),this.T(e),this._$AH=t}}_$AC(V){let C=m2.get(V.strings);return C===void 0&&m2.set(V.strings,C=new x1(V)),C}k(V){K1(this._$AH)||(this._$AH=[],this._$AR());let C=this._$AH,H,L=0;for(let t of V)L===C.length?C.push(H=new M(this.O(l1()),this.O(l1()),this,this.options)):H=C[L],H._$AI(t),L++;L<C.length&&(this._$AR(H&&H._$AB.nextSibling,L),C.length=L)}_$AR(V=this._$AA.nextSibling,C){for(this._$AP?.(!1,!0,C);V!==this._$AB;){let H=i2(V).nextSibling;i2(V).remove(),V=H}}setConnected(V){this._$AM===void 0&&(this._$Cv=V,this._$AP?.(V))}},r1=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(V,C,H,L,t){this.type=1,this._$AH=m,this._$AN=void 0,this.element=V,this.name=C,this._$AM=L,this.options=t,H.length>2||H[0]!==""||H[1]!==""?(this._$AH=Array(H.length-1).fill(new String),this.strings=H):this._$AH=m}_$AI(V,C=this,H,L){let t=this.strings,e=!1;if(t===void 0)V=e1(this,V,C,0),e=!v1(V)||V!==this._$AH&&V!==C1,e&&(this._$AH=V);else{let A=V,o,p;for(V=t[0],o=0;o<t.length-1;o++)p=e1(this,A[H+o],C,o),p===C1&&(p=this._$AH[o]),e||=!v1(p)||p!==this._$AH[o],p===m?V=m:V!==m&&(V+=(p??"")+t[o+1]),this._$AH[o]=p}e&&!L&&this.j(V)}j(V){V===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,V??"")}},W1=class extends r1{constructor(){super(...arguments),this.type=3}j(V){this.element[this.name]=V===m?void 0:V}},U1=class extends r1{constructor(){super(...arguments),this.type=4}j(V){this.element.toggleAttribute(this.name,!!V&&V!==m)}},G1=class extends r1{constructor(V,C,H,L,t){super(V,C,H,L,t),this.type=5}_$AI(V,C=this){if((V=e1(this,V,C,0)??m)===C1)return;let H=this._$AH,L=V===m&&H!==m||V.capture!==H.capture||V.once!==H.once||V.passive!==H.passive,t=V!==m&&(H===m||L);L&&this.element.removeEventListener(this.name,this,H),t&&this.element.addEventListener(this.name,this,V),this._$AH=V}handleEvent(V){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,V):this._$AH.handleEvent(V)}},Q1=class{constructor(V,C,H){this.element=V,this.type=6,this._$AN=void 0,this._$AM=C,this.options=H}get _$AU(){return this._$AM._$AU}_$AI(V){e1(this,V)}};var m5=z1.litHtmlPolyfillSupport;m5?.(x1,s1),(z1.litHtmlVersions??=[]).push("3.3.3");var s2=(M,V,C)=>{let H=C?.renderBefore??V,L=H._$litPart$;if(L===void 0){let t=C?.renderBefore??null;H._$litPart$=L=new s1(V.insertBefore(l1(),t),t,void 0,C??{})}return L._$AI(M),L};var j1=globalThis,Z=class extends G{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let V=super.createRenderRoot();return this.renderOptions.renderBefore??=V.firstChild,V}update(V){let C=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(V),this._$Do=s2(C,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return C1}};Z._$litElement$=!0,Z.finalized=!0,j1.litElementHydrateSupport?.({LitElement:Z});var p5=j1.litElementPolyfillSupport;p5?.({LitElement:Z});(j1.litElementVersions??=[]).push("4.2.2");var g=M=>(V,C)=>{C!==void 0?C.addInitializer(()=>{customElements.define(M,V)}):customElements.define(M,V)};var l5={attribute:!0,type:String,converter:m1,reflect:!1,hasChanged:f1},v5=(M=l5,V,C)=>{let{kind:H,metadata:L}=C,t=globalThis.litPropertyMetadata.get(L);if(t===void 0&&globalThis.litPropertyMetadata.set(L,t=new Map),H==="setter"&&((M=Object.create(M)).wrapped=!0),t.set(C.name,M),H==="accessor"){let{name:e}=C;return{set(A){let o=V.get.call(this);V.set.call(this,A),this.requestUpdate(e,o,M,!0,A)},init(A){return A!==void 0&&this.C(e,void 0,M,A),A}}}if(H==="setter"){let{name:e}=C;return function(A){let o=this[e];V.call(this,A),this.requestUpdate(e,o,M,!0,A)}}throw Error("Unsupported decorator location: "+H)};function l(M){return(V,C)=>typeof C=="object"?v5(M,V,C):((H,L,t)=>{let e=L.hasOwnProperty(t);return L.constructor.createProperty(t,H),e?Object.getOwnPropertyDescriptor(L,t):void 0})(M,V,C)}function v(M){return l({...M,state:!0,attribute:!1})}var H1=(M,V,C)=>(C.configurable=!0,C.enumerable=!0,Reflect.decorate&&typeof V!="object"&&Object.defineProperty(M,V,C),C);function t1(M,V){return(C,H,L)=>{let t=e=>e.renderRoot?.querySelector(M)??null;if(V){let{get:e,set:A}=typeof H=="object"?C:L??(()=>{let o=Symbol();return{get(){return this[o]},set(p){this[o]=p}}})();return H1(C,H,{get(){let o=e.call(this);return o===void 0&&(o=t(this),(o!==null||this.hasUpdated)&&A.call(this,o)),o}})}return H1(C,H,{get(){return t(this)}})}}var _="pro_budget",Z1=class extends Error{constructor(C,H){super(H);this.code=C}};async function F(M,V){try{return await M.callWS(V)}catch(C){let H=C;throw new Z1(H.code??"unknown",H.message??String(C))}}var c={subscribe(M,V){return M.connection.subscribeMessage(V,{type:`${_}/subscribe`})},createCategory:(M,V)=>F(M,{type:`${_}/categories/create`,fields:V}),updateCategory:(M,V,C)=>F(M,{type:`${_}/categories/update`,category_id:V,fields:C}),deleteCategory:(M,V)=>F(M,{type:`${_}/categories/delete`,category_id:V}),createItem:(M,V)=>F(M,{type:`${_}/items/create`,fields:V}),updateItem:(M,V,C)=>F(M,{type:`${_}/items/update`,item_id:V,fields:C}),deleteItem:(M,V)=>F(M,{type:`${_}/items/delete`,item_id:V}),setPaid:(M,V,C,H)=>F(M,{type:`${_}/paid/set`,item_id:V,date:C,paid:H}),stats:(M,V,C,H)=>F(M,{type:`${_}/stats`,year:V,month:C,...H?{user_id:H}:{}}),overview:(M,V,C,H)=>F(M,{type:`${_}/overview`,year:V,month:C,...H?{user_id:H}:{}}),insights:(M,V,C)=>F(M,{type:`${_}/insights`,user_id:V,year:C}),updateConfig:(M,V)=>F(M,{type:`${_}/config/update`,...V}),occurrences:(M,V,C,H)=>F(M,{type:`${_}/occurrences`,start:V,end:C,...H?{user_id:H}:{}})};var b1={topBar:"ha-top-app-bar-fixed",menuButton:"ha-menu-button",iconButton:"ha-icon-button",card:"ha-card",icon:"ha-icon",form:"ha-form",dialog:"ha-dialog",dialogHeader:"ha-dialog-header",dialogFooter:"ha-dialog-footer",button:"ha-button",alert:"ha-alert",circularProgress:"ha-spinner",ripple:"ha-ripple",subpage:"hass-tabs-subpage",subpageDataTable:"hass-tabs-subpage-data-table",overflowMenu:"ha-icon-overflow-menu",svgIcon:"ha-svg-icon"},Z2;function u2(){return Z2??=(async()=>{try{await(await window.loadCardHelpers?.())?.createCardElement({type:"entities",entities:[]})?.constructor.getConfigElement?.()}catch{}await Promise.all([b1.form,b1.dialog,b1.subpage,b1.subpageDataTable].map(M=>Promise.race([customElements.whenDefined(M),new Promise(V=>setTimeout(V,4e3))])))})(),Z2}var c2={"panel.title":"Budget","nav.overview":"\xDCbersicht","nav.items":"Posten","nav.calendar":"Kalender","nav.insights":"Einblicke","nav.settings":"Einstellungen","settings.categories":"Kategorien","settings.categories_hint":"Jeder Posten geh\xF6rt zu einer Kategorie. Eine verwendete Kategorie kann nicht gel\xF6scht werden.","settings.members":"Haushaltsmitglieder","settings.members_hint":"Home-Assistant-Benutzer, die im Budget erscheinen. Ohne Auswahl ist jeder aktive Benutzer Mitglied.","settings.members_admin":"Nur Administratoren k\xF6nnen die Haushaltseinstellungen \xE4ndern.","settings.household":"Haushalt","settings.currency":"W\xE4hrung","settings.currency_hint":"ISO-4217-Code. Leer lassen f\xFCr die W\xE4hrung von Home Assistant ({currency}).","settings.lead_days":"Tage im Voraus, ab denen eine Zahlung als anstehend gilt","settings.lead_days_hint":"Manuelle Zahlungen erscheinen so viele Tage vor der F\xE4lligkeit auf der To-do-Liste.","settings.about":"\xDCber","settings.version":"Pro Budget {version}","settings.saved":"Gespeichert.","validation.currency":"Gib einen dreistelligen W\xE4hrungscode ein oder lass das Feld leer.","validation.lead_days":"Gib eine Zahl von 0 bis 60 ein.","nav.categories":"Kategorien","common.all":"Alle","common.add":"Hinzuf\xFCgen","common.save":"Speichern","common.cancel":"Abbrechen","common.delete":"L\xF6schen","common.edit":"Bearbeiten","common.close":"Schlie\xDFen","common.loading":"L\xE4dt\u2026","common.unknown_user":"Ehemaliges Mitglied","common.per_month":"/ Monat","common.error":"Etwas ist schiefgelaufen: {error}","common.today":"Heute","common.paid":"Bezahlt","common.unpaid":"Noch nicht bezahlt","type.earning":"Einnahme","type.expense":"Ausgabe","type.saving":"Sparen","type.earning.plural":"Einnahmen","type.expense.plural":"Ausgaben","type.saving.plural":"Sparen","recurrence.daily":"T\xE4glich","recurrence.weekly":"W\xF6chentlich","recurrence.biweekly":"Alle zwei Wochen","recurrence.monthly":"Monatlich","recurrence.quarterly":"Viertelj\xE4hrlich","recurrence.semi_annually":"Halbj\xE4hrlich","recurrence.annually":"J\xE4hrlich","cost_kind.fixed":"Fix","cost_kind.variable":"Variabel","payment.direct_debit":"Lastschrift","payment.standing_order":"Dauerauftrag","payment.manual":"Manuell / \xDCberweisung","payment.credit_card":"Kreditkarte","payment.paypal":"PayPal","due.on_day":"am {day}.","due.on_day_month":"am {day}. {month}","due.months":"am {day}. ({months})","overview.income":"Einnahmen","overview.expenses":"Ausgaben","overview.savings":"Sparen","overview.remaining":"Verbleibend","overview.members":"Mitglieder","overview.personal":"Pers\xF6nlich","overview.shared_costs_paid":"Gemeinsame Kosten bezahlt","overview.settlement":"Ausgleich","overview.settled":"Alles ausgeglichen.","overview.pays":"zahlt an","overview.fair_share":"Fairer Anteil","overview.rule_income":"Gemeinsame Kosten anteilig zum Einkommen aufgeteilt.","overview.rule_equal":"Gemeinsame Kosten zu gleichen Teilen aufgeteilt.","overview.nav_previous":"Vorheriger Monat","overview.nav_next":"N\xE4chster Monat","overview.scope_household":"Haushalt im {month}","overview.scope_member":"{name} im {month}","overview.monthly_equivalent":"monatliches \xC4quivalent","overview.actual_month":"tats\xE4chliche Betr\xE4ge","overview.free":"Frei verf\xFCgbar","overview.free_pct":"{pct} des Einkommens bleiben \xFCbrig","overview.free_equivalent":"{amount} im Durchschnittsmonat","overview.outflows_in":"Abfl\xFCsse im {month}","overview.paid_of":"{paid} von {due}","overview.paid_pct":"{pct} abgegangen","overview.day_of":"Tag {day} von {days}","overview.still_open":"noch {amount}","overview.income_expenses":"Einnahmen {income} \xB7 Ausgaben {expenses}","overview.seg_fixed":"Fixkosten","overview.seg_variable":"Variabel","overview.seg_savings":"Sparen","overview.seg_free":"Frei","overview.kpi_settlement":"Ausgleich","overview.kpi_open_settlement":"Offener Ausgleich","overview.on_target":"Ziel 10 % erreicht","overview.below_target":"unter 10 %","overview.fixed_high":"hoch \u2013 \xFCber 45 %","overview.fixed_ok":"im gr\xFCnen Bereich","overview.transfers_count":"{count} \xDCberweisungen","overview.pays_to":"zahlt an {names}","overview.receives_from":"erh\xE4lt von {names}","overview.by_category":"Ausgaben nach Kategorie","overview.household":"Haushalt","overview.more_categories":"+ {count} weitere \xB7 {amount}","overview.all_items":"Alle Posten","overview.free_per_month":"frei / Monat","overview.member_sub":"Einnahmen {income} \xB7 Sparquote {rate}","overview.bar_hint":"Balken: Fixkosten, variabel, Sparen, frei \u2013 Anteil am eigenen Einkommen.","overview.outflows_year":"Abfl\xFCsse {year}","overview.insights_link":"Einblicke","overview.avg":"\xD8 {amount}","overview.max_month":"Teuerster Monat: {month}","overview.max_month_sub":"{amount} \u2013 {title} {item_amount} {recurrence}","overview.next_special":"N\xE4chste Sonderzahlung","overview.next_special_sub":"{title} {amount} am {date} ({recurrence})","overview.next_month_less":"{month} wird ruhiger","overview.next_month_more":"{month} wird teurer","overview.next_month_same":"{month} bleibt gleich","overview.next_month_sub_less":"{amount} f\xE4llig \u2013 {delta} weniger als im {month}","overview.next_month_sub_more":"{amount} f\xE4llig \u2013 {delta} mehr als im {month}","overview.next_month_sub_same":"{amount} f\xE4llig","overview.up_next":"Als N\xE4chstes","overview.next_payments":"n\xE4chste Zahlungen","overview.tomorrow":"Morgen","overview.next_income":"N\xE4chster Eingang","overview.calendar_link":"Zum Kalender","overview.nothing_due":"Nichts f\xE4llig.","overview.underpaid":"zu wenig bezahlt","overview.overpaid":"zu viel bezahlt","overview.paid_fair":"bezahlt {paid} \xB7 fairer Anteil {fair}","settings.split_rule":"Faire Aufteilung der gemeinsamen Kosten","settings.split_rule.income":"Anteilig zum Einkommen","settings.split_rule.equal":"Zu gleichen Teilen","settings.split_rule_hint":"Bestimmt den fairen Anteil jedes Mitglieds an den gemeinsamen Kosten und damit, wer wem etwas zahlt.","overview.categories":"Nach Kategorie","overview.category":"Kategorie","overview.empty":"Noch keine Posten. Lege den ersten unter Posten an.","overview.other_currencies":"Posten in anderen W\xE4hrungen werden getrennt aufgef\xFChrt.","items.title":"Posten","items.add":"Posten hinzuf\xFCgen","items.search":"{count} Posten durchsuchen","items.group_by":"Gruppieren nach","items.group.category":"Kategorie","items.group.user":"Mitglied","items.group.type":"Typ","items.group.none":"Keine","categories.search":"{count} Kategorien durchsuchen","items.filter_type":"Typ","items.filter_user":"Mitglied","items.filter_category":"Kategorie","items.col_title":"Titel","items.col_amount":"Betrag","items.col_recurrence":"Turnus","items.col_due":"F\xE4llig","items.col_category":"Kategorie","items.col_user":"Mitglied","items.col_monthly":"Monatlich","items.empty":"Keine passenden Posten.","items.col_status":"Status","items.active":"Aktiv","items.inactive":"Inaktiv","item.title":"Titel","item.type":"Typ","item.amount":"Betrag","item.currency":"W\xE4hrung","item.category":"Kategorie","item.user":"Bezahlt von","item.user_earning":"Empfangen von","item.recurrence":"Turnus","item.due_weekday":"Wochentag","item.due_day":"Tag im Monat","item.due_month":"Erster Monat","item.cost_kind":"Fix / Variabel","item.shared":"Gemeinsamer Haushaltsposten","item.shared_with":"Geteilt mit","item.shared_everyone":"Alle","validation.shared_with_payer":"Das zahlende Mitglied muss zu den Beteiligten geh\xF6ren.","overview.rule_subset":"Posten, die nur mit einigen Mitgliedern geteilt sind, werden unter diesen aufgeteilt.","item.payment_method":"Zahlweise","item.start":"Startdatum","item.end":"Enddatum","item.advanced":"Erweitert","item.new":"Neuer Posten","item.edit":"Posten bearbeiten","item.delete_confirm":"\u201E{title}\u201C l\xF6schen?","item.amount_invalid":"Gib einen Betrag wie 12,50 ein.","calendar.agenda":"Agenda","calendar.month":"Monat","calendar.previous":"Zur\xFCck","calendar.next":"Weiter","calendar.empty":"In diesem Zeitraum ist nichts f\xE4llig.","calendar.unscheduled":"Nicht platzierbar (kein F\xE4lligkeitsmonat)","calendar.mark_paid":"Als bezahlt markieren","calendar.mark_unpaid":"Als unbezahlt markieren","calendar.weeks":"N\xE4chste {weeks} Wochen","insights.title":"Einblicke","insights.year":"Jahr","insights.savings_rate":"Sparquote","insights.fixed_cost_rate":"Fixkostenquote","insights.avg_month":"Durchschnittsmonat","insights.max_month":"Teuerster Monat","insights.min_month":"G\xFCnstigster Monat","insights.top_expenses":"Gr\xF6\xDFte Ausgaben","insights.payment_calendar":"Zahlungskalender {year}","insights.payment_calendar_hint":"Tats\xE4chliche Abfl\xFCsse je Monat, nicht normalisiert.","insights.unscheduled":"Nicht platzierbar: diese Posten haben keinen F\xE4lligkeitsmonat.","insights.no_member":"W\xE4hle ein Mitglied.","categories.title":"Kategorien","categories.add":"Kategorie hinzuf\xFCgen","categories.name":"Name","categories.color":"Farbe","categories.icon":"Symbol","categories.items":"{count} Posten","categories.in_use":"Wird von {count} Posten verwendet; l\xF6sche oder verschiebe sie zuerst.","categories.delete_confirm":"Kategorie \u201E{name}\u201C l\xF6schen?","categories.new":"Neue Kategorie","categories.edit":"Kategorie bearbeiten","validation.required":"Erforderlich","validation.amount":"Gib einen Betrag wie 12,50 ein.","validation.due_day":"Gib einen Tag von 1 bis {max} ein.","validation.end_before_start":"Das Enddatum liegt vor dem Startdatum.","errors.not_found":"Nicht gefunden.","errors.invalid":"Ung\xFCltige Eingabe: {message}","errors.in_use":"Wird noch verwendet."};var X1={"panel.title":"Budget","nav.overview":"Overview","nav.items":"Items","nav.calendar":"Calendar","nav.insights":"Insights","nav.settings":"Settings","settings.categories":"Categories","settings.categories_hint":"Every item belongs to a category. A category in use cannot be deleted.","settings.members":"Household members","settings.members_hint":"Home Assistant users who appear in the budget. With none selected, every active user is a member.","settings.members_admin":"Only administrators can change the household settings.","settings.household":"Household","settings.currency":"Currency","settings.currency_hint":"ISO 4217 code. Leave empty to use Home Assistant's currency ({currency}).","settings.lead_days":"Days ahead a payment counts as upcoming","settings.lead_days_hint":"Manual payments appear on the to-do list this many days before they are due.","settings.about":"About","settings.version":"Pro Budget {version}","settings.saved":"Saved.","validation.currency":"Enter a three-letter currency code or leave it empty.","validation.lead_days":"Enter a number from 0 to 60.","nav.categories":"Categories","common.all":"Everyone","common.add":"Add","common.save":"Save","common.cancel":"Cancel","common.delete":"Delete","common.edit":"Edit","common.close":"Close","common.loading":"Loading\u2026","common.unknown_user":"Former member","common.per_month":"/ month","common.error":"Something went wrong: {error}","common.today":"Today","common.none":"\u2014","common.paid":"Paid","common.unpaid":"Not paid yet","type.earning":"Earning","type.expense":"Expense","type.saving":"Saving","type.earning.plural":"Earnings","type.expense.plural":"Expenses","type.saving.plural":"Savings","recurrence.daily":"Daily","recurrence.weekly":"Weekly","recurrence.biweekly":"Every two weeks","recurrence.monthly":"Monthly","recurrence.quarterly":"Quarterly","recurrence.semi_annually":"Semi-annually","recurrence.annually":"Annually","cost_kind.fixed":"Fixed","cost_kind.variable":"Variable","payment.direct_debit":"Direct debit","payment.standing_order":"Standing order","payment.manual":"Manual / bank transfer","payment.credit_card":"Credit card","payment.paypal":"PayPal","due.on_day":"on the {day}.","due.on_day_month":"on the {day}. of {month}","due.months":"on the {day}. ({months})","overview.income":"Income","overview.expenses":"Expenses","overview.savings":"Savings","overview.remaining":"Remaining","overview.members":"Members","overview.personal":"Personal","overview.shared_costs_paid":"Shared costs paid","overview.settlement":"Settlement","overview.settled":"Everything is settled.","overview.pays":"pays","overview.fair_share":"Fair share","overview.rule_income":"Shared costs split proportionally to income.","overview.rule_equal":"Shared costs split equally.","overview.nav_previous":"Previous month","overview.nav_next":"Next month","overview.scope_household":"Household in {month}","overview.scope_member":"{name} in {month}","overview.monthly_equivalent":"monthly equivalent","overview.actual_month":"actual amounts","overview.free":"Free to spend","overview.free_pct":"{pct} of income remains","overview.free_equivalent":"{amount} in an average month","overview.outflows_in":"Outflows in {month}","overview.paid_of":"{paid} of {due}","overview.paid_pct":"{pct} paid","overview.day_of":"day {day} of {days}","overview.still_open":"{amount} still open","overview.income_expenses":"Income {income} \xB7 Expenses {expenses}","overview.seg_fixed":"Fixed costs","overview.seg_variable":"Variable","overview.seg_savings":"Savings","overview.seg_free":"Free","overview.kpi_settlement":"Settlement","overview.kpi_open_settlement":"Open settlement","overview.on_target":"on target (10 % or more)","overview.below_target":"below 10 %","overview.fixed_high":"high \u2013 above 45 %","overview.fixed_ok":"healthy","overview.transfers_count":"{count} transfers","overview.pays_to":"pays {names}","overview.receives_from":"receives from {names}","overview.by_category":"Expenses by category","overview.household":"Household","overview.more_categories":"+ {count} more \xB7 {amount}","overview.all_items":"All items","overview.free_per_month":"free / month","overview.member_sub":"Income {income} \xB7 Savings rate {rate}","overview.bar_hint":"Bars: fixed costs, variable, savings, free \u2013 share of own income.","overview.outflows_year":"Outflows {year}","overview.insights_link":"Insights","overview.avg":"\xD8 {amount}","overview.max_month":"Most expensive month: {month}","overview.max_month_sub":"{amount} \u2013 {title} {item_amount} {recurrence}","overview.next_special":"Next special payment","overview.next_special_sub":"{title} {amount} on {date} ({recurrence})","overview.next_month_less":"{month} will be calmer","overview.next_month_more":"{month} will be heavier","overview.next_month_same":"{month} looks the same","overview.next_month_sub_less":"{amount} due \u2013 {delta} less than in {month}","overview.next_month_sub_more":"{amount} due \u2013 {delta} more than in {month}","overview.next_month_sub_same":"{amount} due","overview.up_next":"Up next","overview.next_payments":"next payments","overview.tomorrow":"Tomorrow","overview.next_income":"Next income","overview.calendar_link":"Calendar","overview.nothing_due":"Nothing due.","overview.underpaid":"underpaid","overview.overpaid":"overpaid","overview.paid_fair":"paid {paid} \xB7 fair share {fair}","settings.split_rule":"Fair split of shared costs","settings.split_rule.income":"Proportional to income","settings.split_rule.equal":"Equal shares","settings.split_rule_hint":"Decides each member's fair share of the shared costs, and so who pays whom in the settlement.","overview.categories":"By category","overview.category":"Category","overview.empty":"No items yet. Add the first one under Items.","overview.other_currencies":"Items in other currencies are listed separately.","items.title":"Items","items.add":"Add item","items.search":"Search {count} items","items.group_by":"Group by","items.group.category":"Category","items.group.user":"Member","items.group.type":"Type","items.group.none":"None","categories.search":"Search {count} categories","items.filter_type":"Type","items.filter_user":"Member","items.filter_category":"Category","items.col_title":"Title","items.col_amount":"Amount","items.col_recurrence":"Recurrence","items.col_due":"Due","items.col_category":"Category","items.col_user":"Member","items.col_monthly":"Monthly","items.empty":"No items match.","items.col_status":"Status","items.active":"Active","items.inactive":"Inactive","item.title":"Title","item.type":"Type","item.amount":"Amount","item.currency":"Currency","item.category":"Category","item.user":"Paid by","item.user_earning":"Received by","item.recurrence":"Recurrence","item.due_weekday":"Weekday","item.due_day":"Day of month","item.due_month":"First month","item.cost_kind":"Fixed / variable","item.shared":"Shared household cost","item.shared_with":"Shared with","item.shared_everyone":"Everyone","validation.shared_with_payer":"The member who pays must be among the participants.","overview.rule_subset":"Items shared with some members only are split between those members.","item.payment_method":"Payment method","item.start":"Start date","item.end":"End date","item.advanced":"Advanced","item.new":"New item","item.edit":"Edit item","item.delete_confirm":"Delete \u201C{title}\u201D?","item.amount_invalid":"Enter an amount like 12.50.","calendar.agenda":"Agenda","calendar.month":"Month","calendar.previous":"Previous","calendar.next":"Next","calendar.empty":"Nothing due in this period.","calendar.unscheduled":"Not placeable (no due month)","calendar.mark_paid":"Mark paid","calendar.mark_unpaid":"Mark unpaid","calendar.weeks":"Next {weeks} weeks","insights.title":"Insights","insights.year":"Year","insights.savings_rate":"Savings rate","insights.fixed_cost_rate":"Fixed cost rate","insights.avg_month":"Average month","insights.max_month":"Most expensive month","insights.min_month":"Cheapest month","insights.top_expenses":"Largest expenses","insights.payment_calendar":"Payment calendar {year}","insights.payment_calendar_hint":"Actual outflows per month, not normalized.","insights.unscheduled":"Not placeable: these items have no due month.","insights.no_member":"Pick a member.","categories.title":"Categories","categories.add":"Add category","categories.name":"Name","categories.color":"Colour","categories.icon":"Icon","categories.items":"{count} items","categories.in_use":"In use by {count} items; delete or move them first.","categories.delete_confirm":"Delete category \u201C{name}\u201D?","categories.new":"New category","categories.edit":"Edit category","validation.required":"Required","validation.amount":"Enter an amount like 12.50.","validation.due_day":"Enter a day from 1 to {max}.","validation.end_before_start":"The end date is before the start date.","errors.not_found":"Not found.","errors.invalid":"Invalid input: {message}","errors.in_use":"Still in use."};var x5={en:X1,de:c2};function s5(M){return(M?.locale?.language??M?.language??"en").toLowerCase().split("-")[0]}function r(M,V,C){let H=x5[s5(M)]?.[V]??X1[V];if(C)for(let[L,t]of Object.entries(C))H=H.replaceAll(`{${L}}`,String(t));return H}var S2="M12,5A3.5,3.5 0 0,0 8.5,8.5A3.5,3.5 0 0,0 12,12A3.5,3.5 0 0,0 15.5,8.5A3.5,3.5 0 0,0 12,5M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M5.5,8A2.5,2.5 0 0,0 3,10.5C3,11.44 3.53,12.25 4.29,12.68C4.65,12.88 5.06,13 5.5,13C5.94,13 6.35,12.88 6.71,12.68C7.08,12.47 7.39,12.17 7.62,11.81C6.89,10.86 6.5,9.7 6.5,8.5C6.5,8.41 6.5,8.31 6.5,8.22C6.2,8.08 5.86,8 5.5,8M18.5,8C18.14,8 17.8,8.08 17.5,8.22C17.5,8.31 17.5,8.41 17.5,8.5C17.5,9.7 17.11,10.86 16.38,11.81C16.5,12 16.63,12.15 16.78,12.3C16.94,12.45 17.1,12.58 17.29,12.68C17.65,12.88 18.06,13 18.5,13C18.94,13 19.35,12.88 19.71,12.68C20.47,12.25 21,11.44 21,10.5A2.5,2.5 0 0,0 18.5,8M12,14C9.66,14 5,15.17 5,17.5V19H19V17.5C19,15.17 14.34,14 12,14M4.71,14.55C2.78,14.78 0,15.76 0,17.5V19H3V17.07C3,16.06 3.69,15.22 4.71,14.55M19.29,14.55C20.31,15.22 21,16.06 21,17.07V19H24V17.5C24,15.76 21.22,14.78 19.29,14.55M12,16C13.53,16 15.24,16.5 16.23,17H7.77C8.76,16.5 10.47,16 12,16Z";var h2="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z";var g2="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z";var O2="M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z";var f2="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z";var y2="M19 19H5V8H19M16 1V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3H18V1M10.88 12H7.27L10.19 14.11L9.08 17.56L12 15.43L14.92 17.56L13.8 14.12L16.72 12H13.12L12 8.56L10.88 12Z";var b2="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z";var k2="M9 17H7V10H9V17M13 17H11V7H13V17M17 17H15V13H17V17M19 19H5V5H19V19.1M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z";var w2="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";var _2="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";var B2="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z";var P2="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";var T2="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";var k1="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";var F2="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z";var R2="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z";var w1="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";var E2="M15 10C15 9.45 15.45 9 16 9C16.55 9 17 9.45 17 10S16.55 11 16 11 15 10.55 15 10M8 9H13V7H8V9M22 7.5V14.47L19.18 15.41L17.5 21H12V19H10V21H4.5C4.5 21 2 12.54 2 9.5S4.46 4 7.5 4H12.5C13.41 2.79 14.86 2 16.5 2C17.33 2 18 2.67 18 3.5C18 3.71 17.96 3.9 17.88 4.08C17.74 4.42 17.62 4.81 17.56 5.23L19.83 7.5H22M20 9.5H19L15.5 6C15.5 5.35 15.59 4.71 15.76 4.09C14.79 4.34 14 5.06 13.67 6H7.5C5.57 6 4 7.57 4 9.5C4 11.38 5.22 16.15 6 19H8V17H14V19H16L17.56 13.85L20 13.03V9.5Z";var _1="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";var $2="M11,13.5V21.5H3V13.5H11M9,15.5H5V19.5H9V15.5M12,2L17.5,11H6.5L12,2M12,5.86L10.08,9H13.92L12,5.86M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13M17.5,15A2.5,2.5 0 0,0 15,17.5A2.5,2.5 0 0,0 17.5,20A2.5,2.5 0 0,0 20,17.5A2.5,2.5 0 0,0 17.5,15Z";var B1="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z";var Y1="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z";var D2="M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z";var J1="M5,3C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V16.72C21.59,16.37 22,15.74 22,15V9C22,8.26 21.59,7.63 21,7.28V5A2,2 0 0,0 19,3H5M5,5H19V7H13A2,2 0 0,0 11,9V15A2,2 0 0,0 13,17H19V19H5V5M13,9H20V15H13V9M16,10.5A1.5,1.5 0 0,0 14.5,12A1.5,1.5 0 0,0 16,13.5A1.5,1.5 0 0,0 17.5,12A1.5,1.5 0 0,0 16,10.5Z";var I2=[{id:"overview",iconPath:D2},{id:"items",iconPath:F2},{id:"calendar",iconPath:f2},{id:"insights",iconPath:k2},{id:"settings",iconPath:T2}],P1="/pro-budget";function C2(M){let V=M?.path?.replace(/^\//,"").split("/")[0]??"";return V==="categories"&&(V="settings"),I2.some(C=>C.id===V)?V:"overview"}function N2(M,V){history.pushState(null,"",H2(M,V)),window.dispatchEvent(new CustomEvent("location-changed"))}function H2(M,V){return`${M?.prefix??P1}/${V}`}function W(M,V){let C=V?.prefix??P1;return I2.map(H=>({path:`${C}/${H.id}`,name:r(M,`nav.${H.id}`),iconPath:H.iconPath}))}function i1(M){return a`
    <ha-dialog
      open
      width="medium"
      .headerTitle=${M.heading}
      .preventScrimClose=${!!M.sticky}
      @closed=${M.onClosed}
    >
      ${M.content}
      <ha-dialog-footer slot="footer">
        ${M.actions.map(V=>a`
            <ha-button
              slot=${V.primary?"primaryAction":"secondaryAction"}
              data-action=${V.primary?"primary":"secondary"}
              appearance=${V.primary?"accent":"plain"}
              variant=${V.danger?"danger":"brand"}
              .disabled=${V.disabled??!1}
              @click=${V.onClick}
            >
              ${V.label}
            </ha-button>
          `)}
      </ha-dialog-footer>
    </ha-dialog>
  `}var y=u`
  * {
    box-sizing: border-box;
  }
  h2 {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0 0 4px;
  }
  .muted {
    color: var(--secondary-text-color);
  }
  .small {
    font-size: 0.85em;
  }
  .flex {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .grow {
    flex: 1;
  }
  .grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  ha-card {
    padding: 16px;
  }
  .cards {
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px;
  }
  table.plain {
    width: 100%;
    border-collapse: collapse;
  }
  table.plain th,
  table.plain td {
    text-align: left;
    padding: 8px 8px;
    border-bottom: 1px solid var(--divider-color);
    vertical-align: middle;
  }
  table.plain th {
    color: var(--secondary-text-color);
    font-weight: 500;
    font-size: 0.85em;
    white-space: nowrap;
  }
  table.plain tr:last-child td {
    border-bottom: none;
  }
  td.num,
  th.num {
    text-align: right;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .pill {
    display: inline-block;
    padding: 2px 8px;
    margin-left: 6px;
    border-radius: 12px;
    font-size: 12px;
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
    white-space: nowrap;
  }
  .earning {
    color: var(--success-color, #43a047);
  }
  .expense {
    color: var(--error-color, #db4437);
  }
  .saving {
    color: var(--info-color, #4a90d9);
  }
  .stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .stat .label {
    color: var(--secondary-text-color);
    font-size: 0.85em;
  }
  .stat .value {
    font-size: 1.5rem;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
  .select {
    height: 40px;
    padding: 0 36px 0 12px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: var(--card-background-color)
      url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23888' d='M7 10l5 5 5-5z'/></svg>")
      no-repeat right 8px center / 20px;
    color: var(--primary-text-color);
    font: inherit;
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
  }
  .toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px 16px 0;
  }
  .toolbar .spacer {
    flex: 1;
  }
  .members {
    padding: 12px 16px 0;
  }
  .version {
    padding: 24px;
    text-align: center;
    color: var(--secondary-text-color);
    font-size: 12px;
  }
  .chips {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    border-radius: 18px;
    height: 36px;
    padding: 0 14px;
    cursor: pointer;
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    --chip-color: var(--primary-color);
  }
  .chip .avatar {
    margin-left: -8px;
  }
  .chip[aria-pressed="true"] {
    background: color-mix(in srgb, var(--chip-color) 16%, transparent);
    border-color: transparent;
  }
  .bar {
    height: 6px;
    border-radius: 3px;
    background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    overflow: hidden;
  }
  .bar > div {
    height: 100%;
    background: var(--primary-color);
  }
  .empty {
    padding: 24px;
    text-align: center;
    color: var(--secondary-text-color);
  }
  .scroll {
    overflow-x: auto;
  }
  ha-icon {
    --mdc-icon-size: 20px;
  }
`;function Z5(M,V){return M?.localize("ui.common.error_required")||`${V} is required`}function U(M,V){let C=!!V.error&&!!V.touched;return a`
    <ha-input
      .label=${V.label}
      .value=${V.value==null?"":String(V.value)}
      .type=${V.type??"text"}
      .min=${V.min}
      .max=${V.max}
      ?required=${V.required}
      ?autofocus=${V.autofocus}
      auto-validate
      .invalid=${C}
      .validationMessage=${V.error??Z5(M,V.label)}
      @input=${H=>V.onChange(H.target.value)}
      @change=${H=>V.onChange(H.target.value)}
    >
      ${V.suffix?a`<span slot="end">${V.suffix}</span>`:m}
    </ha-input>
  `}function E(M,V){return a`
    <ha-selector
      .hass=${M}
      .label=${V.label}
      .required=${V.required??!1}
      .selector=${{select:{mode:"dropdown",options:V.options}}}
      .value=${V.value==null?void 0:String(V.value)}
      @value-changed=${C=>V.onChange(C.detail.value)}
    ></ha-selector>
  `}function K(M,V){return a`
    <ha-selector
      .hass=${M}
      .label=${V.label}
      .required=${V.required??!1}
      .selector=${V.selector}
      .value=${V.value}
      @value-changed=${C=>V.onChange(C.detail.value)}
    ></ha-selector>
  `}var a1=`
  .fields { display: flex; flex-direction: column; gap: 16px; }
  ha-expansion-panel { --expansion-panel-content-padding: 0 12px 12px; }
  ha-expansion-panel .fields { padding-top: 12px; }
`;function V1(M){return M?.locale?.language??M?.language??"en"}var W2=new Map;function h(M,V,C){let H=`${V1(M)}|${C}`,L=W2.get(H);if(!L){try{L=new Intl.NumberFormat(V1(M),{style:"currency",currency:C})}catch{L=new Intl.NumberFormat(V1(M),{minimumFractionDigits:2})}W2.set(H,L)}return L.format(V/100)}function L1(M,V,C,H){let L=h(M,Math.abs(V),C);return H?`\u2212${L}`:`+${L}`}function $(M,V){return V===null?"\u2014":new Intl.NumberFormat(V1(M),{style:"percent",maximumFractionDigits:1}).format(V)}function b(M){let V=M.getFullYear(),C=String(M.getMonth()+1).padStart(2,"0"),H=String(M.getDate()).padStart(2,"0");return`${V}-${C}-${H}`}function V2(M){let[V,C,H]=M.split("-").map(Number);return new Date(V,C-1,H)}function q(M,V,C){return new Intl.DateTimeFormat(V1(M),C).format(V2(V))}function O(M,V,C="long"){return new Intl.DateTimeFormat(V1(M),{month:C}).format(new Date(2026,V-1,1))}function T1(M,V,C="long"){return new Intl.DateTimeFormat(V1(M),{weekday:C}).format(new Date(2026,5,V))}function L2(M){let V=M.trim().replace(/\s/g,"");if(!V)return null;let C=V.lastIndexOf(","),H=V.lastIndexOf("."),L;return C>H?L=V.replace(/\./g,"").replace(",","."):H>C?L=V.replace(/,/g,""):L=V,/^\d+(\.\d{1,2})?$/.test(L)?Math.round(Number(L)*100):null}function U2(M){return(M/100).toFixed(2)}var G2=["earning","expense","saving"],Q2=["daily","weekly","biweekly","monthly","quarterly","semi_annually","annually"],z2=["fixed","variable"],K2=["direct_debit","standing_order","manual","credit_card","paypal"],F1=["quarterly","semi_annually","annually"],q2=["income","equal"];function u5(M,V,C){return M?{title:M.title,type:M.type,amount:U2(M.amount),currency:M.currency??"",category_id:M.category_id,user_id:M.user_id,recurrence:M.recurrence,due_day:M.due_day??void 0,due_month:M.due_month??void 0,cost_kind:M.cost_kind,shared:M.shared,shared_with:M.shared_with??[],payment_method:M.payment_method??"",start:M.start??void 0,end:M.end??void 0}:{type:"expense",recurrence:"monthly",due_day:1,cost_kind:"fixed",shared:!1,shared_with:[],category_id:V.categories[0]?.id,user_id:C??V.users[0]?.id,amount:""}}var B=class extends Z{constructor(){super(...arguments);this._open=!1;this._data={};this._error="";this._saving=!1;this._touched=new Set;this._onClosed=C=>{C.target===this.renderRoot.querySelector("ha-dialog")&&this._close()}}open(C){this.budget&&(this._item=C,this._data=u5(C,this.budget,this.hass?.user?.id),this._error="",this._touched=new Set,this._open=!0)}_close(){this._open=!1}_set(C,H){this._touched=new Set([...this._touched,C]),this._data={...this._data,[C]:H}}get _errors(){let C=this._data,H=this.hass,L={};String(C.title??"").trim()||(L.title=r(H,"validation.required")),L2(String(C.amount??""))===null&&(L.amount=r(H,"validation.amount")),C.category_id||(L.category_id=r(H,"validation.required")),C.user_id||(L.user_id=r(H,"validation.required"));let t=String(C.recurrence??"");if(t!=="daily"){let e=Number(C.due_day),A=t==="weekly"||t==="biweekly"?7:31;(C.due_day==null||C.due_day===""||!Number.isInteger(e)||e<1||e>A)&&(L.due_day=r(H,"validation.due_day",{max:A}))}return F1.includes(t)&&!C.due_month&&(L.due_month=r(H,"validation.required")),C.start&&C.end&&String(C.start)>String(C.end)&&(L.end=r(H,"validation.end_before_start")),L}_fields(){let C=this._data,H=C.recurrence,L=F1.includes(H);return{title:String(C.title??"").trim(),type:C.type,amount:L2(String(C.amount??""))??0,currency:C.currency?String(C.currency).toUpperCase():null,category_id:String(C.category_id??""),user_id:String(C.user_id??""),recurrence:H,due_day:H==="daily"||C.due_day==null||C.due_day===""?null:Number(C.due_day),due_month:L&&C.due_month?Number(C.due_month):null,cost_kind:C.cost_kind??"fixed",shared:!!C.shared,shared_with:this._participants(),payment_method:C.payment_method?C.payment_method:null,start:C.start?String(C.start):null,end:C.end?String(C.end):null}}_participants(){let C=this._data;if(!C.shared)return null;let H=C.shared_with??[],L=this.budget.users.map(t=>t.id);return H.length===0||L.every(t=>H.includes(t))?null:H}async _save(){if(!Object.keys(this._errors).length){this._saving=!0,this._error="";try{this._item?await c.updateItem(this.hass,this._item.id,this._fields()):await c.createItem(this.hass,this._fields()),this._close()}catch(C){this._error=u1(this.hass,C)}finally{this._saving=!1}}}_renderFields(){let C=this.hass,H=this.budget,L=this._data,t=this._errors,e=i=>this._touched.has(i),A=(i,s)=>i.map(x=>({value:x,label:r(C,`${s}.${x}`)})),o=String(L.recurrence??""),p=o==="weekly"||o==="biweekly",n=F1.includes(o);return a`
      <div class="fields">
        ${U(C,{label:r(C,"item.title"),value:L.title,required:!0,autofocus:!0,error:t.title,touched:e("title"),onChange:i=>this._set("title",i)})}
        ${E(C,{label:r(C,"item.type"),value:L.type,required:!0,options:A(G2,"type"),onChange:i=>this._set("type",i)})}
        ${U(C,{label:r(C,"item.amount"),value:L.amount,required:!0,suffix:H.config.currency,error:t.amount,touched:e("amount"),onChange:i=>this._set("amount",i)})}
        ${E(C,{label:r(C,"item.cost_kind"),value:L.cost_kind,options:A(z2,"cost_kind"),onChange:i=>this._set("cost_kind",i)})}
        ${E(C,{label:r(C,"item.category"),value:L.category_id,required:!0,options:H.categories.map(i=>({value:i.id,label:i.name})),onChange:i=>this._set("category_id",i)})}
        ${E(C,{label:r(C,L.type==="earning"?"item.user_earning":"item.user"),value:L.user_id,required:!0,options:H.users.map(i=>({value:i.id,label:i.name})),onChange:i=>this._set("user_id",i)})}
        ${E(C,{label:r(C,"item.recurrence"),value:L.recurrence,required:!0,options:A(Q2,"recurrence"),onChange:i=>this._set("recurrence",i)})}
        ${p?E(C,{label:r(C,"item.due_weekday"),value:L.due_day,required:!0,options:[1,2,3,4,5,6,7].map(i=>({value:String(i),label:T1(C,i)})),onChange:i=>this._set("due_day",i)}):o==="daily"?m:U(C,{label:r(C,"item.due_day"),value:L.due_day,required:!0,type:"number",min:1,max:31,error:t.due_day,touched:e("due_day"),onChange:i=>this._set("due_day",i)})}
        ${n?E(C,{label:r(C,"item.due_month"),value:L.due_month,required:!0,options:Array.from({length:12},(i,s)=>({value:String(s+1),label:O(C,s+1)})),onChange:i=>this._set("due_month",i)}):m}
        ${K(C,{label:r(C,"item.shared"),value:!!L.shared,selector:{boolean:{}},onChange:i=>this._set("shared",!!i)})}
        ${L.shared&&H.users.length>2?a`
              <div>
                ${K(C,{label:r(C,"item.shared_with"),value:(L.shared_with??[]).length?L.shared_with:H.users.map(i=>i.id),selector:{select:{multiple:!0,mode:"list",options:H.users.map(i=>({value:i.id,label:i.name}))}},onChange:i=>this._set("shared_with",Array.isArray(i)?i:[])})}
                ${t.shared_with&&e("shared_with")?a`<ha-alert alert-type="error">${t.shared_with}</ha-alert>`:m}
              </div>
            `:m}
        <ha-expansion-panel outlined .header=${r(C,"item.advanced")}>
          <div class="fields">
            ${E(C,{label:r(C,"item.payment_method"),value:L.payment_method||"",options:[{value:"",label:r(C,"common.none")},...A(K2,"payment")],onChange:i=>this._set("payment_method",i)})}
            ${U(C,{label:r(C,"item.currency"),value:L.currency,onChange:i=>this._set("currency",i)})}
            ${K(C,{label:r(C,"item.start"),value:L.start,selector:{date:{}},onChange:i=>this._set("start",i)})}
            ${K(C,{label:r(C,"item.end"),value:L.end,selector:{date:{}},onChange:i=>this._set("end",i)})}
            ${t.end&&e("end")?a`<ha-alert alert-type="error">${t.end}</ha-alert>`:m}
          </div>
        </ha-expansion-panel>
      </div>
    `}render(){return!this._open||!this.budget?m:i1({heading:r(this.hass,this._item?"item.edit":"item.new"),sticky:!0,onClosed:this._onClosed,content:a`
        ${this._error?a`<ha-alert alert-type="error">${this._error}</ha-alert>`:m}
        ${this._renderFields()}
      `,actions:[{label:r(this.hass,"common.cancel"),onClick:()=>this._close()},{label:r(this.hass,"common.save"),primary:!0,disabled:this._saving||Object.keys(this._errors).length>0,onClick:()=>this._save()}]})}};B.styles=[y,Q(a1),u`
      ha-alert {
        display: block;
        margin-bottom: 12px;
      }
    `],d([l({attribute:!1})],B.prototype,"hass",2),d([l({attribute:!1})],B.prototype,"budget",2),d([v()],B.prototype,"_item",2),d([v()],B.prototype,"_open",2),d([v()],B.prototype,"_data",2),d([v()],B.prototype,"_error",2),d([v()],B.prototype,"_saving",2),d([v()],B.prototype,"_touched",2),B=d([g("pro-budget-item-dialog")],B);function u1(M,V){if(V instanceof Z1){if(V.code==="not_found")return r(M,"errors.not_found");if(V.code==="in_use")return r(M,"errors.in_use");if(V.code==="invalid")return r(M,"errors.invalid",{message:V.message})}return r(M,"common.error",{error:String(V?.message??V)})}var D=class extends Z{constructor(){super(...arguments);this._open=!1;this._data={};this._error="";this._touched=!1;this._onClosed=C=>{C.target===this.renderRoot.querySelector("ha-dialog")&&this._close()}}open(C){this._category=C,this._data=C?{name:C.name,icon:C.icon??void 0,color:C.color??void 0}:{},this._error="",this._touched=!1,this._open=!0}_close(){this._open=!1}get _nameError(){return String(this._data.name??"").trim()?void 0:r(this.hass,"validation.required")}async _save(){if(this._nameError)return;let C={name:String(this._data.name??"").trim(),icon:this._data.icon||null,color:this._data.color||null};try{this._category?await c.updateCategory(this.hass,this._category.id,C):await c.createCategory(this.hass,C),this._close()}catch(H){this._error=u1(this.hass,H)}}render(){if(!this._open)return m;let C=this.hass;return i1({heading:r(C,this._category?"categories.edit":"categories.new"),onClosed:this._onClosed,content:a`
        ${this._error?a`<ha-alert alert-type="error">${this._error}</ha-alert>`:m}
        <div class="fields">
          ${U(C,{label:r(C,"categories.name"),value:this._data.name,required:!0,autofocus:!0,error:this._nameError,touched:this._touched,onChange:H=>{this._touched=!0,this._data={...this._data,name:H}}})}
          ${K(C,{label:r(C,"categories.icon"),value:this._data.icon,selector:{icon:{}},onChange:H=>this._data={...this._data,icon:H}})}
          ${K(C,{label:r(C,"categories.color"),value:this._data.color,selector:{ui_color:{}},onChange:H=>this._data={...this._data,color:H}})}
        </div>
      `,actions:[{label:r(C,"common.cancel"),onClick:()=>this._close()},{label:r(C,"common.save"),primary:!0,disabled:!!this._nameError,onClick:()=>this._save()}]})}};D.styles=[y,Q(a1),u`
      ha-alert {
        display: block;
        margin-bottom: 12px;
      }
    `],d([l({attribute:!1})],D.prototype,"hass",2),d([v()],D.prototype,"_category",2),d([v()],D.prototype,"_open",2),d([v()],D.prototype,"_data",2),d([v()],D.prototype,"_error",2),d([v()],D.prototype,"_touched",2),D=d([g("pro-budget-category-dialog")],D);var j=class extends Z{constructor(){super(...arguments);this._text="";this._open=!1;this._onClosed=C=>{C.target===this.renderRoot.querySelector("ha-dialog")&&this._close(!1)}}open(C){return this._text=C,this._open=!0,new Promise(H=>this._resolve=H)}_close(C){this._open=!1,this._resolve?.(C),this._resolve=void 0}render(){return this._open?i1({heading:this._text,content:a``,onClosed:this._onClosed,actions:[{label:r(this.hass,"common.cancel"),onClick:()=>this._close(!1)},{label:r(this.hass,"common.delete"),primary:!0,danger:!0,onClick:()=>this._close(!0)}]}):a``}};j.styles=u`
    ha-dialog {
      --mdc-dialog-min-width: 320px;
    }
  `,d([l({attribute:!1})],j.prototype,"hass",2),d([v()],j.prototype,"_text",2),d([v()],j.prototype,"_open",2),j=d([g("pro-budget-confirm")],j);function j2(M,V="var(--secondary-text-color)"){return M?M==="primary"?"var(--primary-color)":M==="accent"?"var(--accent-color)":`var(--${M}-color)`:V}var R1=["purple","blue","teal","orange","pink","indigo","green","deep-orange"];function X2(M){return j2(R1[(M%R1.length+R1.length)%R1.length])}function o1(M,V,C=32,H=!1){let L=H?"var(--text-primary-color, #fff)":V,t=H?V:`color-mix(in srgb, ${V} 20%, transparent)`;return a`
    <span
      class="avatar"
      style="display: inline-flex; align-items: center; justify-content: center; flex: none; width: ${C}px; height: ${C}px; border-radius: 50%; font-size: ${Math.round(C*.42)}px; font-weight: 600; line-height: 1; color: ${L}; background: ${t}"
      >${M.slice(0,1).toUpperCase()}</span
    >
  `}function I(M,V="m"){if(!M?.icon)return a``;let C=j2(M.color),H=V==="m"?36:28,L=V==="m"?20:16;return a`
    <span
      style="display: inline-flex; align-items: center; justify-content: center; flex: none; width: ${H}px; height: ${H}px; border-radius: 50%; vertical-align: middle; color: ${C}; background: color-mix(in srgb, ${C} 20%, transparent)"
    >
      <ha-icon
        .icon=${M.icon}
        style="--mdc-icon-size: ${L}px; display: flex; line-height: 0; margin: 0; width: ${L}px; height: ${L}px"
      ></ha-icon>
    </span>
  `}function c1(M,V){return X2(Math.max(0,M.users.findIndex(C=>C.id===V)))}function A1(M,V,C,H,L){if(V.users.length<2)return m;let t=A=>C===A||!H.all&&!C&&A===M?.user?.id,e=(A,o,p,n)=>a`
    <button class="chip" aria-pressed=${n} style="--chip-color: ${p}" @click=${()=>L(A)}>
      ${o1(A?o:"\u03A3",p,24,n)}
      <span>${o}</span>
    </button>
  `;return a`
    <div class="members chips">
      ${H.all?e("",r(M,"common.all"),"var(--primary-color)",C===""):m}
      ${V.users.map(A=>e(A.id,A.name,c1(V,A.id),t(A.id)))}
    </div>
  `}var Y2=8,P=class extends Z{constructor(){super(...arguments);this.userId="";this.narrow=!1;this._view="agenda";this._month=b(new Date).slice(0,7);this._days=[]}updated(C){["budget","userId","_view","_month"].some(H=>C.has(H))&&this._load()}_range(){if(this._view==="agenda"){let L=new Date,t=new Date;return t.setDate(t.getDate()+Y2*7-1),[b(L),b(t)]}let[C,H]=this._month.split("-").map(Number);return[b(new Date(C,H-1,1)),b(new Date(C,H,0))]}async _load(){if(!this.hass||!this.budget)return;let[C,H]=this._range();this._days=await c.occurrences(this.hass,C,H,this.userId||void 0)}_item(C){return this.budget?.items.find(H=>H.id===C)}_categoryIcon(C){let H=this.budget?.categories.find(L=>L.id===C);return I(H,"s")}_shift(C){let[H,L]=this._month.split("-").map(Number);this._month=b(new Date(H,L-1+C,1)).slice(0,7)}async _togglePaid(C,H,L){await c.setPaid(this.hass,C,H,!L),await this._load()}_frame(C){let H=A1(this.hass,this.budget,this.userId,{all:!0},L=>this.dispatchEvent(new CustomEvent("user-changed",{detail:{userId:L},bubbles:!0,composed:!0})));return a`
      <hass-tabs-subpage .hass=${this.hass} .narrow=${this.narrow} .route=${this.route} .tabs=${W(this.hass,this.route)} main-page>
        ${H} ${C}
      </hass-tabs-subpage>
    `}render(){if(!this.budget)return m;let C=this.hass;return this._frame(a`
      <div class="toolbar">
        <div class="chips">
          <button class="chip" aria-pressed=${this._view==="agenda"} @click=${()=>this._view="agenda"}>
            ${r(C,"calendar.agenda")}
          </button>
          <button class="chip" aria-pressed=${this._view==="month"} @click=${()=>this._view="month"}>
            ${r(C,"calendar.month")}
          </button>
        </div>
        <span class="grow"></span>
        ${this._view==="month"?a`
              <ha-icon-button .label=${r(C,"calendar.previous")} @click=${()=>this._shift(-1)}>
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </ha-icon-button>
              <strong>${q(C,`${this._month}-01`,{month:"long",year:"numeric"})}</strong>
              <ha-icon-button .label=${r(C,"calendar.next")} @click=${()=>this._shift(1)}>
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </ha-icon-button>
            `:a`<span class="muted small">${r(C,"calendar.weeks",{weeks:Y2})}</span>`}
      </div>
      <div class="cards">
        <ha-card>${this._view==="agenda"?this._renderAgenda():this._renderMonth()}</ha-card>
      </div>
    `)}_entry(C,H){let L=this._item(C.item_id);if(!L)return m;let t=L.currency??this.budget.config.currency,e=L.type!=="earning";return a`
      <div class="entry ${C.paid?"paid":""}">
        <span class="amount ${L.type}">${L1(this.hass,L.amount,t,e)}</span>
        ${this._categoryIcon(L.category_id)}
        <span class="title grow">${L.title}</span>
        ${e?a`
              <ha-icon-button
                .label=${r(this.hass,C.paid?"calendar.mark_unpaid":"calendar.mark_paid")}
                @click=${()=>this._togglePaid(L.id,H,C.paid)}
              >
                <ha-icon icon=${C.paid?"mdi:check-circle":"mdi:checkbox-blank-circle-outline"}></ha-icon>
              </ha-icon-button>
            `:m}
      </div>
    `}_renderAgenda(){let C=this.hass,H=b(new Date),L=this._days.filter(e=>e.date!==null),t=this._days.find(e=>e.date===null);return L.length===0&&!t?a`<div class="empty">${r(C,"calendar.empty")}</div>`:a`
      ${L.map(e=>a`
          <div class="day">
            <div class="date ${e.date===H?"today":""}">
              ${q(C,e.date,{weekday:"short",day:"numeric",month:"short"})}
            </div>
            <div class="entries">${e.entries.map(A=>this._entry(A,e.date))}</div>
          </div>
        `)}
      ${t?a`
            <div class="day">
              <div class="date muted">${r(C,"calendar.unscheduled")}</div>
              <div class="entries">
                ${t.entries.map(e=>a`<div class="entry"><span class="title">${this._item(e.item_id)?.title}</span></div>`)}
              </div>
            </div>
          `:m}
    `}_renderMonth(){let C=this.hass,[H,L]=this._month.split("-").map(Number),e=(new Date(H,L-1,1).getDay()+6)%7,A=new Date(H,L,0).getDate(),o=[...Array(e).fill(null)];for(let x=1;x<=A;x++)o.push(b(new Date(H,L-1,x)));for(;o.length%7;)o.push(null);let p=new Map(this._days.filter(x=>x.date).map(x=>[x.date,x.entries])),n=b(new Date),i=this.budget.config.currency,s=[1,2,3,4,5,6,7].map(x=>new Intl.DateTimeFormat(C?.locale?.language??"en",{weekday:"short"}).format(new Date(2026,5,x)));return a`
      <div class="month-grid">
        ${s.map(x=>a`<div class="head">${x}</div>`)}
        ${o.map(x=>{if(!x)return a`<div class="cell outside"></div>`;let w=p.get(x)??[],M1=0;for(let f of w){let S1=this._item(f.item_id);S1&&(M1+=S1.type==="earning"?S1.amount:-S1.amount)}return a`
            <div class="cell ${x===n?"today":""}">
              <div class="num">${V2(x).getDate()}</div>
              ${w.length?a`
                    <div class="sum ${M1<0?"expense":"earning"}">${h(C,M1,i)}</div>
                    ${w.slice(0,3).map(f=>a`<div class="item">${this._item(f.item_id)?.title}</div>`)}
                    ${w.length>3?a`<div class="item muted">+${w.length-3}</div>`:m}
                  `:m}
            </div>
          `})}
      </div>
      <p class="muted small" style="margin:8px 0 0">${O(C,L)} ${H}</p>
    `}};P.styles=[y,u`
      :host {
        display: block;
        height: 100%;
      }
      .day {
        display: flex;
        gap: 16px;
        padding: 10px 0;
        border-bottom: 1px solid var(--divider-color);
      }
      .day:last-child {
        border-bottom: none;
      }
      .date {
        flex: 0 0 140px;
        font-weight: 500;
      }
      .date.today {
        color: var(--primary-color);
      }
      .entries {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .entry {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .entry .amount {
        min-width: 110px;
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
      .entry.paid {
        opacity: 0.55;
      }
      .entry.paid .title {
        text-decoration: line-through;
      }
      .month-grid {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 4px;
      }
      .month-grid .head {
        text-align: center;
        font-size: 0.8em;
        color: var(--secondary-text-color);
        padding: 4px 0;
      }
      .cell {
        min-height: 72px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        padding: 4px;
        font-size: 0.8em;
        overflow: hidden;
      }
      .cell.outside {
        opacity: 0.4;
      }
      .cell.today {
        border-color: var(--primary-color);
      }
      .cell .num {
        text-align: right;
        color: var(--secondary-text-color);
      }
      .cell .sum {
        font-weight: 500;
        white-space: nowrap;
      }
      .cell .item {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      ha-icon-button {
        --mdc-icon-button-size: 32px;
      }
      @media (max-width: 600px) {
        .date {
          flex-basis: 90px;
        }
        .cell {
          min-height: 48px;
        }
        .cell .item {
          display: none;
        }
      }
    `],d([l({attribute:!1})],P.prototype,"hass",2),d([l({attribute:!1})],P.prototype,"budget",2),d([l()],P.prototype,"userId",2),d([l({attribute:!1})],P.prototype,"route",2),d([l({type:Boolean})],P.prototype,"narrow",2),d([v()],P.prototype,"_view",2),d([v()],P.prototype,"_month",2),d([v()],P.prototype,"_days",2),P=d([g("pro-budget-calendar")],P);var _0={daily:365/12,weekly:52/12,biweekly:26/12,monthly:1,quarterly:1/3,semi_annually:1/6,annually:1/12},c5={quarterly:3,semi_annually:6,annually:12};function S5(M,V){let C=c5[M];if(!C)return[];let H=[];for(let L=(V-1)%C;L<12;L+=C)H.push(L+1);return H}function J2(M,V,C){let H=new Date(V,C,0).getDate(),L=`${V}-${String(C).padStart(2,"0")}-01`,t=`${V}-${String(C).padStart(2,"0")}-${String(H).padStart(2,"0")}`;return!(M.start&&M.start>t||M.end&&M.end<L)}function E1(M,V){if(V.recurrence==="daily"||V.due_day===null)return r(M,"common.none");if(V.recurrence==="weekly"||V.recurrence==="biweekly")return T1(M,V.due_day);if(V.due_month===null)return r(M,"due.on_day",{day:V.due_day});if(V.recurrence==="annually")return r(M,"due.on_day_month",{day:V.due_day,month:O(M,V.due_month)});let C=S5(V.recurrence,V.due_month);return C.length===0?r(M,"due.on_day",{day:V.due_day}):r(M,"due.months",{day:V.due_day,months:C.map(H=>O(M,H,"short")).join(", ")})}var R=class extends Z{constructor(){super(...arguments);this.userId="";this.narrow=!1;this._year=new Date().getFullYear()}updated(C){["budget","userId","_year"].some(H=>C.has(H))&&this._load()}get _effectiveUser(){return this.userId||this.hass?.user?.id||this.budget?.users[0]?.id||""}async _load(){!this.hass||!this.budget||!this._effectiveUser||(this._insights=await c.insights(this.hass,this._effectiveUser,this._year))}_item(C){return this.budget?.items.find(H=>H.id===C)}_categoryIcon(C){let H=this.budget?.categories.find(L=>L.id===C);return I(H,"s")}_frame(C){let H=A1(this.hass,this.budget,this.userId,{all:!1},L=>this.dispatchEvent(new CustomEvent("user-changed",{detail:{userId:L},bubbles:!0,composed:!0})));return a`
      <hass-tabs-subpage .hass=${this.hass} .narrow=${this.narrow} .route=${this.route} .tabs=${W(this.hass,this.route)} main-page>
        ${H} ${C}
      </hass-tabs-subpage>
    `}render(){if(!this.budget)return m;let C=this.hass,H=this._insights,L=this.budget.config.currency,t=A=>h(C,A,L),e=this.budget.users.find(A=>A.id===this._effectiveUser);return e?this._frame(a`
      <div class="toolbar">
        <strong>${e.name}</strong>
        <span class="spacer"></span>
        <select class="select" .value=${String(this._year)} @change=${A=>this._year=Number(A.target.value)}>
          ${[-1,0,1].map(A=>{let o=new Date().getFullYear()+A;return a`<option value=${o} ?selected=${o===this._year}>${o}</option>`})}
        </select>
      </div>
      ${H?a`
            <div class="grid">
              ${[["insights.savings_rate",$(C,H.savings_rate)],["insights.fixed_cost_rate",$(C,H.fixed_cost_rate)],["insights.avg_month",t(H.avg_month)],["insights.max_month",H.max_month?O(C,H.max_month):r(C,"common.none")]].map(([A,o])=>a`
                  <ha-card>
                    <div class="stat"><span class="label">${r(C,A)}</span><span class="value">${o}</span></div>
                  </ha-card>
                `)}
            </div>
            <ha-card style="margin-top:16px">
              <h2>${r(C,"insights.payment_calendar",{year:this._year})}</h2>
              <p class="muted small">${r(C,"insights.payment_calendar_hint")}</p>
              ${this._renderMonths(H)}
              ${H.unscheduled.length?a`<p class="muted small">${r(C,"insights.unscheduled")} ${H.unscheduled.map(A=>this._item(A)?.title).join(", ")}</p>`:m}
            </ha-card>
            <div class="grid" style="margin-top:16px">
              ${this._group(r(C,"insights.top_expenses"),{items:H.expenses.items.slice(0,5),total:0},L,!1)}
              ${this._group(r(C,"type.earning.plural"),H.earnings,L)}
              ${this._group(r(C,"type.expense.plural"),H.expenses,L)}
              ${this._group(r(C,"type.saving.plural"),H.savings,L)}
            </div>
          `:a`<ha-card><div class="empty">${r(C,"common.loading")}</div></ha-card>`}
    `):this._frame(a`<div class="cards"><ha-card><div class="empty">${r(C,"insights.no_member")}</div></ha-card></div>`)}_renderMonths(C){let H=Math.max(1,...C.calendar.map(L=>L.total));return a`
      <div class="months">
        ${C.calendar.map(L=>a`
            <div class="month ${L.month===C.max_month?"max":L.month===C.min_month?"min":""}" title=${h(this.hass,L.total,this.budget.config.currency)}>
              <span class="total">${L.total?h(this.hass,L.total,this.budget.config.currency):""}</span>
              <div class="col" style="height:${Math.round(L.total/H*100)}%"></div>
              <span class="name">${O(this.hass,L.month,"short")}</span>
            </div>
          `)}
      </div>
    `}_group(C,H,L,t=!0){let e=this.hass;return a`
      <ha-card>
        <h2>${C}</h2>
        ${H.items.length===0?a`<div class="empty">${r(e,"common.none")}</div>`:a`
              <table class="plain">
                <tbody>
                  ${H.items.map(A=>{let o=this._item(A.item_id);return a`
                      <tr>
                        <td>${this._categoryIcon(o?.category_id)} ${o?.title??A.item_id}<br /><span class="muted small">${o?`${r(e,`recurrence.${o.recurrence}`)} \xB7 ${E1(e,o)}`:""}</span></td>
                        <td class="num">${h(e,A.monthly,L)}<span class="muted small"> ${r(e,"common.per_month")}</span></td>
                      </tr>
                    `})}
                  ${t?a`<tr><td><strong>Σ</strong></td><td class="num"><strong>${h(e,H.total,L)}</strong></td></tr>`:m}
                </tbody>
              </table>
            `}
      </ha-card>
    `}};R.styles=[y,u`
      :host {
        display: block;
        height: 100%;
      }
      .months {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 6px;
        align-items: end;
        height: 160px;
      }
      .month {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
        gap: 4px;
      }
      .month .col {
        width: 100%;
        background: var(--primary-color);
        border-radius: 4px 4px 0 0;
        min-height: 2px;
      }
      .month.max .col {
        background: var(--error-color, #db4437);
      }
      .month.min .col {
        background: var(--success-color, #43a047);
      }
      .month .name {
        font-size: 0.75em;
        color: var(--secondary-text-color);
      }
      .month .total {
        font-size: 0.7em;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      @media (max-width: 700px) {
        .month .total {
          display: none;
        }
      }
    `],d([l({attribute:!1})],R.prototype,"hass",2),d([l({attribute:!1})],R.prototype,"budget",2),d([l()],R.prototype,"userId",2),d([l({attribute:!1})],R.prototype,"route",2),d([l({type:Boolean})],R.prototype,"narrow",2),d([v()],R.prototype,"_year",2),d([v()],R.prototype,"_insights",2),R=d([g("pro-budget-insights")],R);var h5={earning:"mdi:cash-plus",expense:"mdi:cash-minus",saving:"mdi:piggy-bank-outline"},g5={earning:"var(--success-color, #43a047)",expense:"var(--error-color, #db4437)",saving:"var(--info-color, #4a90d9)"},N=class extends Z{constructor(){super(...arguments);this.narrow=!1;this._resize=new ResizeObserver(()=>this.requestUpdate())}connectedCallback(){super.connectedCallback(),this._resize.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resize.disconnect()}get _rows(){let C=this.budget,H=this.hass,L=new Date,t=e=>C.users.find(A=>A.id===e)?.name??r(H,"common.unknown_user");return C.items.map(e=>{let A=C.categories.find(o=>o.id===e.category_id);return{id:e.id,item:e,category_icon:{icon:A?.icon??h5[e.type],color:A?.color??null},title:e.title,type:r(H,`type.${e.type}`),amount:e.amount,category:A?.name??"",member:t(e.user_id),currency:e.currency??C.config.currency,recurrence:r(H,`recurrence.${e.recurrence}`),due:E1(H,e),cost:r(H,`cost_kind.${e.cost_kind}`),shared:e.shared?e.shared_with?e.shared_with.map(t).join(", "):r(H,"item.shared_everyone"):r(H,"overview.personal"),status:J2(e,L.getFullYear(),L.getMonth()+1)?r(H,"items.active"):r(H,"items.inactive")}})}get _columns(){let C=this.hass;return{icon:{title:"",type:"icon",showNarrow:!0,moveable:!1,template:H=>I(H.category_icon)},title:{title:r(C,"items.col_title"),main:!0,sortable:!0,filterable:!0,direction:"asc",flex:2,template:H=>a`
          <div style="font-weight: var(--ha-font-weight-medium, 500)">${H.title}</div>
          ${this.narrow?a`<div class="secondary">
                ${[h(C,H.amount,H.currency),H.recurrence,H.due,H.type,H.category,H.member].join(" \xB7 ")}
              </div>`:m}
        `},amount:{title:r(C,"items.col_amount"),type:"numeric",sortable:!0,minWidth:"120px",template:H=>a`<span style="color: ${g5[H.item.type]}">${h(C,H.amount,H.currency)}</span>`},recurrence:{title:r(C,"items.col_recurrence"),sortable:!0,groupable:!0,filterable:!0,minWidth:"120px"},due:{title:r(C,"items.col_due"),filterable:!0,minWidth:"120px"},type:{title:r(C,"items.filter_type"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px"},category:{title:r(C,"items.col_category"),sortable:!0,groupable:!0,filterable:!0,minWidth:"120px"},member:{title:r(C,"items.col_user"),sortable:!0,groupable:!0,filterable:!0,minWidth:"120px"},status:{title:r(C,"items.col_status"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px",defaultHidden:!0},cost:{title:r(C,"item.cost_kind"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px",defaultHidden:!0},shared:{title:r(C,"item.shared"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px",defaultHidden:!0},actions:{title:"",type:"overflow-menu",showNarrow:!0,moveable:!1,template:H=>a`
          <ha-icon-overflow-menu .hass=${C} .narrow=${this.narrow} .items=${this._menu(H.item)}></ha-icon-overflow-menu>
        `}}}_menu(C){return[{path:w1,label:r(this.hass,"common.edit"),action:()=>this._dialog.open(C)},{path:k1,label:r(this.hass,"common.delete"),warning:!0,action:()=>{this._delete(C)}}]}async _delete(C){await this._confirm.open(r(this.hass,"item.delete_confirm",{title:C.title}))&&await c.deleteItem(this.hass,C.id)}_rowClicked(C){let H=this.budget?.items.find(L=>L.id===C.detail.id);H&&this._dialog.open(H)}render(){if(!this.budget)return m;let C=this.hass,H={column:"amount",direction:"desc"};return a`
      <hass-tabs-subpage-data-table
        .hass=${C}
        .narrow=${this.narrow}
        .route=${this.route}
        .tabs=${W(C,this.route)}
        main-page
        has-fab
        clickable
        id="id"
        .columns=${this._columns}
        .data=${this._rows}
        .searchLabel=${r(C,"items.search",{count:this.budget.items.length})}
        .noDataText=${r(C,"items.empty")}
        .initialGroupColumn=${"category"}
        .initialSorting=${H}
        @row-click=${this._rowClicked}
      >
        <ha-button slot="fab" size="l" variant="brand" appearance="accent" @click=${()=>this._dialog.open()}>
          <ha-svg-icon slot="start" .path=${_1}></ha-svg-icon>
          ${r(C,"items.add")}
        </ha-button>
      </hass-tabs-subpage-data-table>
      <pro-budget-item-dialog .hass=${C} .budget=${this.budget}></pro-budget-item-dialog>
      <pro-budget-confirm .hass=${C}></pro-budget-confirm>
    `}};N.styles=[y,u`
      :host {
        display: block;
        height: 100%;
      }
      /* Two-line main cell on narrow screens, as HA's entities page. */
      hass-tabs-subpage-data-table {
        --data-table-row-height: 60px;
      }
    `],d([l({attribute:!1})],N.prototype,"hass",2),d([l({attribute:!1})],N.prototype,"budget",2),d([l({attribute:!1})],N.prototype,"route",2),d([l({type:Boolean})],N.prototype,"narrow",2),d([t1("pro-budget-item-dialog")],N.prototype,"_dialog",2),d([t1("pro-budget-confirm")],N.prototype,"_confirm",2),N=d([g("pro-budget-items")],N);var C5=5,O5=.1,f5=.45,k=class extends Z{constructor(){super(...arguments);this.userId="";this.version="";this.narrow=!1;this._year=new Date().getFullYear();this._month=new Date().getMonth()+1}updated(C){["budget","userId","_year","_month"].some(H=>C.has(H))&&this._load()}async _load(){!this.hass||!this.budget||(this._data=await c.overview(this.hass,this._year,this._month,this.userId||void 0))}_shift(C){let H=new Date(this._year,this._month-1+C,1);this._year=H.getFullYear(),this._month=H.getMonth()+1}get _isCurrentMonth(){let C=new Date;return C.getFullYear()===this._year&&C.getMonth()+1===this._month}_select(C){this.dispatchEvent(new CustomEvent("user-changed",{detail:{userId:C},bubbles:!0,composed:!0}))}_user(C){return this.budget?.users.find(H=>H.id===C)?.name??r(this.hass,"common.unknown_user")}_item(C){return this.budget?.items.find(H=>H.id===C)}_category(C){return this.budget?.categories.find(H=>H.id===C)}_link(C,H,L="link"){return a`
      <a
        class=${L}
        href=${H2(this.route,C)}
        @click=${t=>{t.preventDefault(),N2(this.route,C)}}
        >${H}</a
      >
    `}_head(C,H,L=m){return a`
      <div class="head">
        <ha-svg-icon .path=${C}></ha-svg-icon>
        <h2>${H}</h2>
        ${L}
      </div>
    `}_frame(C){let H=this.hass,L=A1(H,this.budget,this.userId,{all:!0},e=>this._select(e)),t=q(H,`${this._year}-${String(this._month).padStart(2,"0")}-01`,{month:"long",year:"numeric"});return a`
      <hass-tabs-subpage .hass=${H} .narrow=${this.narrow} .route=${this.route} .tabs=${W(H,this.route)} main-page>
        <div class="toolbar">
          <div class="period">
            <ha-icon-button .label=${r(H,"overview.nav_previous")} .path=${B2} @click=${()=>this._shift(-1)}></ha-icon-button>
            <div class="title">
              <span class="month">${t}</span>
              ${this._isCurrentMonth?a`<span class="small muted">${r(H,"common.today")} · ${q(H,b(new Date),{weekday:"short",day:"numeric",month:"short"})}</span>`:m}
            </div>
            <ha-icon-button .label=${r(H,"overview.nav_next")} .path=${P2} @click=${()=>this._shift(1)}></ha-icon-button>
          </div>
          ${L}
        </div>
        ${C}
      </hass-tabs-subpage>
    `}render(){if(!this.budget)return m;let C=this.hass;if(this.budget.items.length===0)return this._frame(a`<div class="cards"><ha-card><div class="empty">${r(C,"overview.empty")}</div></ha-card></div>`);let H=this._data;if(!H)return this._frame(a`<div class="cards"><ha-card><div class="empty">${r(C,"common.loading")}</div></ha-card></div>`);let L=H.stats[0];return this._frame(a`
      <div class="cards">
        ${H.stats.length>1?a`<p class="muted small" style="margin:0 0 12px">${r(C,"overview.other_currencies")} (${H.stats.slice(1).map(t=>t.currency).join(", ")})</p>`:m}
        <div class="dashboard">
          <div class="col">
            ${this._hero(H,L)}
            <div class="pair">${this._categories(L)} ${this._members(H.household)}</div>
            ${this._yearOutlook(H,L.currency)}
          </div>
          <div class="col">${this._upNext(H,L.currency)} ${this._settlement(H.household)}</div>
        </div>
      </div>
    `)}_hero(C,H){let L=this.hass,t=H.currency,e=f=>h(L,f,t),A=O(L,this._month),o=this.userId?r(L,"overview.scope_member",{name:this._user(this.userId),month:A}):r(L,"overview.scope_household",{month:A}),p=H.totals.remaining,n=C.progress,i=n.income,s=i-n.due,x=n.due>0?Math.min(100,n.paid/n.due*100):0,w=[{key:"overview.seg_fixed",value:n.fixed,color:"var(--orange-color)"},{key:"overview.seg_variable",value:n.variable,color:"var(--amber-color)"},{key:"overview.seg_savings",value:n.savings,color:"var(--light-blue-color)"},{key:"overview.seg_free",value:Math.max(0,s),color:"color-mix(in srgb, var(--success-color) 45%, transparent)"}],M1=f=>i>0?f/i:0;return a`
      <ha-card class="hero">
        ${this._head(J1,o,a`<span class="hint">${r(L,"overview.actual_month")}</span>`)}
        <div class="hero-top">
          <div class="free">
            <span class="disc"><ha-svg-icon .path=${J1}></ha-svg-icon></span>
            <div class="col-text">
              <span style="font-weight:500">${r(L,"overview.free")}</span>
              <span class="num big ${s<0?"negative":""}">${e(s)}</span>
              ${n.income>0?a`<span class="pct ${s<0?"bad":""}">${r(L,"overview.free_pct",{pct:$(L,s/n.income)})}</span>`:m}
              <span class="small muted num">${r(L,"overview.free_equivalent",{amount:e(p)})}</span>
            </div>
          </div>
          <div class="progress">
            <div class="between">
              <span style="font-weight:500">${r(L,"overview.outflows_in",{month:A})}</span>
              <span class="num">${r(L,"overview.paid_of",{paid:e(n.paid),due:e(n.due)})}</span>
            </div>
            <div class="track">
              <div class="fill" style="width:${x.toFixed(1)}%"></div>
              ${n.today_day!==null?a`<div class="today" title=${r(L,"common.today")} style="left:${(n.today_day/n.days_in_month*100).toFixed(1)}%"></div>`:m}
            </div>
            <div class="between small muted">
              <span>${r(L,"overview.paid_pct",{pct:$(L,n.due>0?n.paid/n.due:0)})}${n.today_day!==null?` \xB7 ${r(L,"overview.day_of",{day:n.today_day,days:n.days_in_month})}`:""}</span>
              <span class="num">${r(L,"overview.still_open",{amount:e(Math.max(0,n.due-n.paid))})}</span>
            </div>
          </div>
        </div>
        <div class="col-text" style="gap:10px">
          <div class="stack">
            ${w.map(f=>a`<div title=${r(L,f.key)} style="width:${(M1(f.value)*100).toFixed(2)}%; background:${f.color}"></div>`)}
          </div>
          <div class="legend">
            ${w.map(f=>a`
                <div class="item">
                  <span class="swatch" style="background:${f.color}"></span>
                  <div class="col-text">
                    <span class="small muted">${r(L,f.key)} · ${$(L,M1(f.value))}</span>
                    <span class="num amount">${e(f.value)}</span>
                  </div>
                </div>
              `)}
          </div>
          <span class="small muted">${r(L,"overview.income_expenses",{income:e(i),expenses:e(n.fixed+n.variable)})}</span>
        </div>
        <div class="kpis">
          ${this._kpi(E2,"var(--light-blue-color)",r(L,"insights.savings_rate"),$(L,n.savings_rate),n.savings_rate===null?["",""]:n.savings_rate>=O5?[r(L,"overview.on_target"),"good"]:[r(L,"overview.below_target"),"warn"])}
          ${this._kpi(R2,"var(--orange-color)",r(L,"insights.fixed_cost_rate"),$(L,n.fixed_cost_rate),n.fixed_cost_rate===null?["",""]:n.fixed_cost_rate>f5?[r(L,"overview.fixed_high"),"warn"]:[r(L,"overview.fixed_ok"),"good"])}
          ${this._settlementKpi(C.household)}
        </div>
      </ha-card>
    `}_kpi(C,H,L,t,e){return a`
      <div class="kpi">
        <span class="disc" style="color:${H}; background: color-mix(in srgb, ${H} 20%, transparent)">
          <ha-svg-icon .path=${C}></ha-svg-icon>
        </span>
        <div class="col-text">
          <span class="small muted">${L}</span>
          <span class="num value">${t}</span>
          ${e[0]?a`<span class="small ${e[1]}">${e[0]}</span>`:m}
        </div>
      </div>
    `}_settlementKpi(C){let H=this.hass,L=i=>h(H,i,C.currency),t="var(--deep-purple-color)";if(!this.userId){let i=C.transfers.reduce((s,x)=>s+x.amount,0);return this._kpi(B1,t,r(H,"overview.kpi_open_settlement"),L(i),[r(H,"overview.transfers_count",{count:C.transfers.length}),"muted"])}let A=C.fairness.find(i=>i.user_id===this.userId)?.balance??0,o=C.transfers.filter(i=>i.from_user_id===this.userId),p=C.transfers.filter(i=>i.to_user_id===this.userId),n=o.length?[r(H,"overview.pays_to",{names:o.map(i=>this._user(i.to_user_id)).join(", ")}),"bad"]:p.length?[r(H,"overview.receives_from",{names:p.map(i=>this._user(i.from_user_id)).join(", ")}),"good"]:["",""];return this._kpi(B1,t,r(H,"overview.kpi_settlement"),L1(H,A,C.currency,A<0),n)}_categories(C){let H=this.hass,L=n=>h(H,n,C.currency),t=C.categories.filter(n=>n.expenses>0).sort((n,i)=>i.expenses-n.expenses),e=t.slice(0,C5),A=t.slice(C5),o=e[0]?.expenses??1,p=C.totals.expenses||1;return a`
      <ha-card>
        ${this._head($2,r(H,"overview.by_category"),a`<span class="hint">${this.userId?this._user(this.userId):r(H,"overview.household")}</span>`)}
        ${e.length===0?a`<div class="empty">${r(H,"common.none")}</div>`:m}
        ${e.map(n=>{let i=this._category(n.category_id);return a`
            <div class="row">
              ${I(i)}
              <div class="grow col-text" style="gap:6px">
                <div class="between">
                  <span class="name">${i?.name??n.category_id}</span>
                  <span class="num">${L(n.expenses)} <span class="small muted">${$(H,n.expenses/p)}</span></span>
                </div>
                <div class="bar"><div style="width:${(n.expenses/o*100).toFixed(1)}%; background:${i?.color?`var(--${i.color}-color)`:"var(--primary-color)"}"></div></div>
              </div>
            </div>
          `})}
        <div class="indent">
          ${A.length?a`<span class="small muted">${r(H,"overview.more_categories",{count:A.length,amount:L(A.reduce((n,i)=>n+i.expenses,0))})} → </span>`:m}
          ${this._link("items",r(H,"overview.all_items"))}
        </div>
      </ha-card>
    `}_members(C){let H=this.hass,L=this.budget,t=e=>h(H,e,C.currency);return a`
      <ha-card>
        ${this._head(S2,r(H,"overview.members"),a`<span class="hint">${r(H,"overview.free_per_month")}</span>`)}
        ${C.members.map(e=>{let A=c1(L,e.user_id),o=e.earnings,p=i=>(o>0?i/o*100:0).toFixed(2),n=this.userId!==""&&this.userId!==e.user_id;return a`
            <button
              class="member-row ${n?"dim":""}"
              aria-pressed=${this.userId===e.user_id}
              @click=${()=>this._select(this.userId===e.user_id?"":e.user_id)}
            >
              ${o1(this._user(e.user_id),A,40)}
              <span class="grow col-text" style="flex:1; gap:6px">
                <span class="between">
                  <span class="col-text">
                    <span class="name">${this._user(e.user_id)}</span>
                    <span class="small muted">${r(H,"overview.member_sub",{income:t(e.earnings),rate:$(H,e.savings_rate)})}</span>
                  </span>
                  <span class="num ${e.balance<0?"bad":"good"}" style="font-weight:500">${t(e.balance)}</span>
                </span>
                <span class="stack thin">
                  <span style="width:${p(e.expenses.fixed)}%; background: var(--orange-color)"></span>
                  <span style="width:${p(e.expenses.variable)}%; background: var(--amber-color)"></span>
                  <span style="width:${p(e.savings)}%; background: var(--light-blue-color)"></span>
                  <span style="width:${p(Math.max(0,e.balance))}%; background: color-mix(in srgb, var(--success-color) 45%, transparent)"></span>
                </span>
              </span>
            </button>
          `})}
        <div class="small muted indent">${r(H,"overview.bar_hint")}</div>
      </ha-card>
    `}_recurrence(C){return C?r(this.hass,`recurrence.${C.recurrence}`).toLowerCase():""}_yearOutlook(C,H){let L=this.hass,t=i=>h(L,i,H),e=C.year,A=Math.max(1,...e.months.map(i=>i.total)),o=i=>`${(i/A*92).toFixed(1)}px`,p=i=>i===this._month&&e.year===this._year,n=[];if(e.max_month&&e.max_entry){let i=this._item(e.max_entry.item_id);n.push(this._note(Y1,"var(--orange-color)",r(L,"overview.max_month",{month:O(L,e.max_month)}),r(L,"overview.max_month_sub",{amount:t(e.months[e.max_month-1].total),title:i?.title??"",item_amount:t(e.max_entry.due),recurrence:this._recurrence(i)})))}if(e.next_special){let i=this._item(e.next_special.item_id);n.push(this._note(y2,"var(--red-color)",r(L,"overview.next_special"),r(L,"overview.next_special_sub",{title:i?.title??"",amount:t(i?.amount??0),date:q(L,e.next_special.date,{day:"numeric",month:"short"}),recurrence:this._recurrence(i)})))}if(e.next_month){let i=e.next_month,s=i.delta<0?"less":i.delta>0?"more":"same";n.push(this._note(h2,"var(--light-blue-color)",r(L,`overview.next_month_${s}`,{month:O(L,i.month)}),r(L,`overview.next_month_sub_${s}`,{amount:t(i.total),delta:t(Math.abs(i.delta)),month:O(L,this._month)})))}return a`
      <ha-card>
        ${this._head(b2,r(L,"overview.outflows_year",{year:e.year}),this._link("insights",`${r(L,"overview.insights_link")} \u2192`))}
        <div class="chart">
          <div class="bars">
            <div class="plot">
              <div class="avg" style="bottom:${o(e.avg_month)}"><span class="num">${r(L,"overview.avg",{amount:t(e.avg_month)})}</span></div>
              ${e.months.map(i=>a`
                  <div class="month ${p(i.month)?"current":""} ${i.month===e.max_month?"peak":""}">
                    <span class="label num ${i.month===e.max_month?"warn":""}" style="color:${p(i.month)&&i.month!==e.max_month?"var(--primary-color)":""}">${p(i.month)||i.month===e.max_month?t(i.total):""}</span>
                    <div class="col-bar" title="${O(L,i.month)}: ${t(i.total)}" style="height:${o(i.total)}"></div>
                  </div>
                `)}
            </div>
            <div class="names">${e.months.map(i=>a`<span class=${p(i.month)?"current":""}>${O(L,i.month,"short")}</span>`)}</div>
          </div>
          ${n.length?a`<div class="notes">${n}</div>`:m}
        </div>
        ${e.unscheduled.length?a`<p class="small muted" style="margin:0">${r(L,"insights.unscheduled")} ${e.unscheduled.map(i=>this._item(i)?.title).join(", ")}</p>`:m}
      </ha-card>
    `}_note(C,H,L,t){return a`
      <div class="note">
        <span class="disc" style="color:${H}; background: color-mix(in srgb, ${H} 20%, transparent)">
          <ha-svg-icon .path=${C}></ha-svg-icon>
        </span>
        <div class="col-text">
          <span class="title">${L}</span>
          <span class="small muted">${t}</span>
        </div>
      </div>
    `}_when(C){let H=this.hass,L=new Date,t=new Date;return t.setDate(L.getDate()+1),C===b(L)?r(H,"common.today"):C===b(t)?r(H,"overview.tomorrow"):q(H,C,{weekday:"short",day:"numeric",month:"short"})}_occurrence(C,H){let L=this.hass,t=this._item(C.item_id);if(!t)return m;let e=this.userId?"":` \xB7 ${this._user(t.user_id)}`;return a`
      <div class="row ${C.paid?"paid":""}">
        ${I(this._category(t.category_id))}
        <div class="grow col-text">
          <span class="name">${t.title}</span>
          <span class="small muted">${this._when(C.date)}${e}</span>
        </div>
        <span class="num ${t.type}" style="font-weight:500; white-space:nowrap">${L1(L,t.amount,t.currency??H,t.type!=="earning")}</span>
        <ha-icon-button
          class="paid-toggle"
          .label=${r(L,C.paid?"calendar.mark_unpaid":"calendar.mark_paid")}
          .path=${C.paid?w2:_2}
          @click=${()=>this._togglePaid(C)}
        ></ha-icon-button>
      </div>
    `}async _togglePaid(C){await c.setPaid(this.hass,C.item_id,C.date,!C.paid),await this._load()}_upNext(C,H){let L=this.hass,t=C.upcoming,e=C.next_income?this._item(C.next_income.item_id):void 0;return a`
      <ha-card>
        ${this._head(O2,r(L,"overview.up_next"),a`<span class="hint">${r(L,"overview.next_payments")}</span>`)}
        ${t.length?t.map(A=>this._occurrence(A,H)):a`<div class="small muted">${r(L,"overview.nothing_due")}</div>`}
        ${e&&C.next_income?a`
              <div class="divider"></div>
              <div class="row">
                <span class="disc" style="width:36px; height:36px; flex:none; border-radius:50%; display:flex; align-items:center; justify-content:center; color: var(--success-color); background: color-mix(in srgb, var(--success-color) 20%, transparent); --mdc-icon-size: 20px">
                  <ha-svg-icon .path=${Y1}></ha-svg-icon>
                </span>
                <div class="grow col-text">
                  <span class="name">${r(L,"overview.next_income")}</span>
                  <span class="small muted">${e.title} · ${this._when(C.next_income.date)}${this.userId?"":` \xB7 ${this._user(e.user_id)}`}</span>
                </div>
                <span class="num earning" style="font-weight:500; white-space:nowrap">${L1(L,e.amount,e.currency??H,!1)}</span>
              </div>
            `:m}
        <div class="indent">${this._link("calendar",`${r(L,"overview.calendar_link")} \u2192`)}</div>
      </ha-card>
    `}_settlement(C){let H=this.hass,L=this.budget,t=o=>h(H,o,C.currency),e=L.config.split_rule==="equal"?"equal":"income",A=Math.max(1,...C.fairness.map(o=>Math.abs(o.balance)));return a`
      <ha-card>
        ${this._head(B1,r(H,"overview.settlement"),a`<span class="badge">${r(H,`settings.split_rule.${e}`)}</span>`)}
        ${C.transfers.length===0?a`<p class="settled"><ha-icon icon="mdi:check-circle"></ha-icon> ${r(H,"overview.settled")}</p>`:C.transfers.map(o=>{let p=!this.userId||this.userId===o.from_user_id||this.userId===o.to_user_id;return a`
                  <div class="transfer ${p?"hl":""}">
                    ${o1(this._user(o.from_user_id),c1(L,o.from_user_id),32)}
                    <ha-svg-icon .path=${g2}></ha-svg-icon>
                    ${o1(this._user(o.to_user_id),c1(L,o.to_user_id),32)}
                    <span class="text"><b style="font-weight:500">${this._user(o.from_user_id)}</b> ${r(H,"overview.pays")} <b style="font-weight:500">${this._user(o.to_user_id)}</b></span>
                    <span class="num" style="font-weight:500; font-size:15px">${t(o.amount)}</span>
                  </div>
                `})}
        <div class="axis"><span>${r(H,"overview.underpaid")}</span><span>${r(H,"overview.overpaid")}</span></div>
        ${C.fairness.map(o=>{let p=`${(Math.abs(o.balance)/A*100).toFixed(1)}%`,n=this.userId!==""&&this.userId!==o.user_id;return a`
            <div class="balance ${n?"dim":""}" style=${n?"opacity:0.45":""}>
              <div class="between" style="font-size:13px">
                <span style="font-weight:500">${this._user(o.user_id)}</span>
                <span class="num ${o.balance<0?"bad":o.balance>0?"good":""}" style="font-weight:500">${L1(H,o.balance,C.currency,o.balance<0)}</span>
              </div>
              <div class="bars2">
                <div class="left"><div style="width:${o.balance<0?p:"0%"}"></div></div>
                <div class="mid"></div>
                <div class="right"><div style="width:${o.balance>0?p:"0%"}"></div></div>
              </div>
              <span class="small muted">${r(H,"overview.paid_fair",{paid:t(o.shared_costs_paid),fair:t(o.fair_share)})}</span>
            </div>
          `})}
        <p class="small muted" style="margin:0">
          ${r(H,e==="equal"?"overview.rule_equal":"overview.rule_income")}
          ${r(H,"overview.rule_subset")}
        </p>
      </ha-card>
    `}};k.styles=[y,u`
      :host {
        display: block;
        height: 100%;
      }
      .toolbar {
        max-width: 1240px;
        margin: 0 auto;
        padding: 16px 16px 0;
        gap: 12px;
      }
      .toolbar .members {
        padding: 0;
        margin-left: auto;
      }
      .period {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .period .title {
        display: flex;
        flex-direction: column;
        min-width: 150px;
        text-align: center;
      }
      .period .month {
        font-size: 20px;
        line-height: 26px;
        font-weight: 500;
      }
      .cards {
        max-width: 1240px;
      }
      .dashboard {
        display: grid;
        grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
        gap: 16px;
        align-items: start;
      }
      .col {
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 0;
      }
      .pair {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 16px;
      }
      @media (max-width: 1000px) {
        .dashboard {
          grid-template-columns: minmax(0, 1fr);
        }
      }
      @media (max-width: 600px) {
        .plot .label {
          display: none;
        }
      }
      ha-card {
        display: flex;
        flex-direction: column;
        gap: 14px;
        /* A light tile grey on any theme: a faint tint of the text colour on the card. */
        --tile-background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      }
      .head {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .head ha-svg-icon {
        color: var(--secondary-text-color);
      }
      .head h2 {
        flex: 1;
        margin: 0;
        font-size: 16px;
      }
      .head .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .num {
        font-variant-numeric: tabular-nums;
      }
      .link {
        font-size: 13px;
        font-weight: 500;
        color: var(--primary-color);
        text-decoration: none;
        cursor: pointer;
      }
      .link:hover {
        text-decoration: underline;
      }
      .indent {
        padding-left: 52px;
      }
      /* hero */
      .hero-top {
        display: flex;
        flex-wrap: wrap;
        gap: 24px 40px;
      }
      .free {
        flex: 1 1 300px;
        min-width: 0;
        display: flex;
        gap: 16px;
        align-items: flex-start;
      }
      .free .disc {
        width: 64px;
        height: 64px;
        flex: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--success-color);
        background: color-mix(in srgb, var(--success-color) 20%, transparent);
        --mdc-icon-size: 30px;
      }
      .free .big {
        font-size: 36px;
        line-height: 44px;
        letter-spacing: -1px;
        white-space: nowrap;
      }
      .free .big.negative {
        color: var(--error-color);
      }
      .free .pct {
        font-size: 13px;
        font-weight: 500;
        color: var(--success-color);
      }
      .progress {
        flex: 1 1 280px;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-top: 4px;
      }
      .between {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
      }
      .track {
        position: relative;
        height: 8px;
        border-radius: 4px;
        background: var(--tile-background);
      }
      .track .fill {
        position: absolute;
        inset: 0 auto 0 0;
        border-radius: 4px;
        background: var(--primary-color);
      }
      .track .today {
        position: absolute;
        top: -4px;
        bottom: -4px;
        width: 2px;
        border-radius: 1px;
        background: var(--primary-text-color);
      }
      .stack {
        display: flex;
        height: 12px;
        border-radius: 6px;
        overflow: hidden;
        gap: 2px;
        background: var(--tile-background);
      }
      .stack.thin {
        height: 8px;
        border-radius: 4px;
      }
      .legend {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 8px 16px;
      }
      .legend .item {
        display: flex;
        gap: 8px;
        align-items: flex-start;
      }
      .legend .swatch {
        width: 10px;
        height: 10px;
        border-radius: 3px;
        margin-top: 5px;
        flex: none;
      }
      .legend .amount {
        font-size: 15px;
        font-weight: 500;
      }
      .kpis {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
        gap: 10px;
      }
      .kpi {
        border-radius: 10px;
        background: var(--tile-background);
        padding: 10px 12px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .kpi .disc {
        width: 36px;
        height: 36px;
        flex: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        --mdc-icon-size: 18px;
      }
      .kpi .value {
        font-size: 16px;
        font-weight: 500;
      }
      .col-text {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .good {
        color: var(--success-color);
      }
      .bad {
        color: var(--error-color);
      }
      .warn {
        color: var(--warning-color);
      }
      /* rows with an icon, text and an amount */
      .row {
        display: flex;
        gap: 12px;
        align-items: center;
      }
      .row .grow {
        min-width: 0;
      }
      .row .name {
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .row.paid > :not(.paid-toggle) {
        opacity: 0.55;
      }
      .paid-toggle {
        --mdc-icon-button-size: 36px;
        margin-right: -8px;
        color: var(--secondary-text-color);
      }
      .row.paid .paid-toggle {
        color: var(--success-color);
      }
      .row.paid .name {
        text-decoration: line-through;
      }
      .row.dim {
        opacity: 0.45;
      }
      .member-row {
        all: unset;
        cursor: pointer;
        display: flex;
        gap: 12px;
        align-items: flex-start;
        border-radius: 8px;
      }
      .member-row:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 4px;
      }
      .bar {
        height: 6px;
        border-radius: 3px;
        background: var(--tile-background);
        overflow: hidden;
      }
      .bar > div {
        height: 100%;
        border-radius: 3px;
      }
      /* year chart */
      .chart {
        display: flex;
        flex-wrap: wrap;
        gap: 20px 32px;
      }
      .bars {
        flex: 3 1 400px;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .plot {
        position: relative;
        height: 120px;
        display: flex;
        align-items: flex-end;
        gap: 6px;
      }
      .avg {
        position: absolute;
        left: 0;
        right: 0;
        border-top: 1px dashed var(--secondary-text-color);
        opacity: 0.7;
      }
      .avg span {
        position: absolute;
        right: 0;
        bottom: 2px;
        font-size: 11px;
        line-height: 14px;
        color: var(--secondary-text-color);
        background: var(--card-background-color);
        padding-left: 4px;
      }
      .plot .month {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
      }
      .plot .label {
        font-size: 11px;
        line-height: 14px;
        font-weight: 500;
        white-space: nowrap;
      }
      .plot .col-bar {
        width: 100%;
        max-width: 40px;
        min-height: 2px;
        border-radius: 4px 4px 2px 2px;
        background: color-mix(in srgb, var(--primary-color) 30%, transparent);
      }
      .plot .current .col-bar {
        background: var(--primary-color);
      }
      .plot .peak .col-bar {
        background: var(--orange-color);
      }
      .names {
        display: flex;
        gap: 6px;
      }
      .names span {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .names span.current {
        color: var(--primary-text-color);
        font-weight: 600;
      }
      .notes {
        flex: 1 1 220px;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .note {
        display: flex;
        gap: 10px;
        align-items: flex-start;
      }
      .note .disc {
        width: 32px;
        height: 32px;
        flex: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        --mdc-icon-size: 16px;
      }
      .note .title {
        font-size: 13px;
        font-weight: 500;
      }
      /* settlement */
      .badge {
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        padding: 4px 10px;
        border-radius: 999px;
        background: var(--tile-background);
        color: var(--secondary-text-color);
      }
      .transfer {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: 10px;
      }
      .transfer.hl {
        background: var(--tile-background);
      }
      .transfer ha-svg-icon {
        color: var(--secondary-text-color);
        --mdc-icon-size: 18px;
        flex: none;
      }
      .transfer .text {
        flex: 1;
        min-width: 0;
        font-size: 13px;
      }
      .axis {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }
      .balance {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .balance .bars2 {
        display: flex;
        height: 8px;
      }
      .balance .left,
      .balance .right {
        flex: 1;
        display: flex;
        background: var(--tile-background);
      }
      .balance .left {
        justify-content: flex-end;
        border-radius: 4px 0 0 4px;
      }
      .balance .right {
        border-radius: 0 4px 4px 0;
      }
      .balance .left > div {
        background: var(--error-color);
        border-radius: 4px 0 0 4px;
      }
      .balance .right > div {
        background: var(--success-color);
        border-radius: 0 4px 4px 0;
      }
      .balance .mid {
        width: 2px;
        background: var(--primary-text-color);
        opacity: 0.5;
      }
      .settled {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--success-color);
        margin: 0;
      }
      .small {
        font-size: 12px;
        line-height: 16px;
      }
      .muted {
        color: var(--secondary-text-color);
      }
      .divider {
        border-top: 1px solid var(--divider-color);
        margin: 4px 0;
      }
    `],d([l({attribute:!1})],k.prototype,"hass",2),d([l({attribute:!1})],k.prototype,"budget",2),d([l()],k.prototype,"userId",2),d([l()],k.prototype,"version",2),d([l({attribute:!1})],k.prototype,"route",2),d([l({type:Boolean})],k.prototype,"narrow",2),d([v()],k.prototype,"_year",2),d([v()],k.prototype,"_month",2),d([v()],k.prototype,"_data",2),k=d([g("pro-budget-overview")],k);var S=class extends Z{constructor(){super(...arguments);this.narrow=!1;this.version="";this._touched=new Set;this._saving="";this._message="";this._error=""}_count(C){return this.budget?.items.filter(H=>H.category_id===C.id).length??0}_menu(C){let H=this._count(C);return[{path:w1,label:r(this.hass,"common.edit"),action:()=>this._dialog.open(C)},{path:k1,label:H?r(this.hass,"categories.in_use",{count:H}):r(this.hass,"common.delete"),warning:!0,disabled:H>0,action:()=>{this._delete(C)}}]}async _delete(C){await this._confirm.open(r(this.hass,"categories.delete_confirm",{name:C.name}))&&await c.deleteCategory(this.hass,C.id)}_renderCategories(){let C=this.hass,H=this.budget;return a`
      <ha-card>
        <h1 class="card-header">${r(C,"settings.categories")}</h1>
        <div class="card-content">
          <p class="hint">${r(C,"settings.categories_hint")}</p>
          <ha-md-list>
            ${H.categories.map(L=>a`
                <ha-md-list-item type="button" @click=${()=>this._dialog.open(L)}>
                  <span slot="start">${I(L)}</span>
                  <span slot="headline">${L.name}</span>
                  <span slot="supporting-text">${r(C,"categories.items",{count:this._count(L)})}</span>
                  <span slot="end" @click=${t=>t.stopPropagation()}>
                    <ha-icon-overflow-menu .hass=${C} narrow .items=${this._menu(L)}></ha-icon-overflow-menu>
                  </span>
                </ha-md-list-item>
              `)}
          </ha-md-list>
        </div>
        <div class="card-actions">
          <ha-button appearance="plain" @click=${()=>this._dialog.open()}>
            <ha-svg-icon slot="start" .path=${_1}></ha-svg-icon>${r(C,"categories.add")}
          </ha-button>
        </div>
      </ha-card>
    `}get _isAdmin(){return!!this.hass?.user?.is_admin}get _memberSet(){return this._members??new Set(this.budget.config.members)}_toggleMember(C,H){let L=new Set(this._memberSet);H?L.add(C):L.delete(C),this._members=L}get _membersChanged(){let C=[...this.budget.config.members].sort().join(",");return[...this._memberSet].sort().join(",")!==C}async _saveMembers(){await this._save("members",{members:[...this._memberSet]}),this._members=void 0}_renderMembers(){let C=this.hass,H=this.budget,L=this._memberSet,t=L.size===0;return a`
      <ha-card>
        <h1 class="card-header">${r(C,"settings.members")}</h1>
        <div class="card-content">
          <p class="hint">${r(C,"settings.members_hint")}</p>
          ${this._isAdmin?m:a`<ha-alert alert-type="info">${r(C,"settings.members_admin")}</ha-alert>`}
          <ha-md-list>
            ${H.all_users.map(e=>a`
                <ha-md-list-item>
                  <ha-checkbox
                    slot="start"
                    .checked=${t||L.has(e.id)}
                    .disabled=${!this._isAdmin}
                    @change=${A=>this._toggleMember(e.id,A.target.checked)}
                  ></ha-checkbox>
                  <span slot="headline">${e.name}</span>
                </ha-md-list-item>
              `)}
          </ha-md-list>
        </div>
        <div class="card-actions">
          <ha-button
            .disabled=${!this._isAdmin||!this._membersChanged||this._saving==="members"}
            @click=${()=>this._saveMembers()}
          >
            ${r(C,"common.save")}
          </ha-button>
        </div>
      </ha-card>
    `}get _currencyValue(){return this._currency??this.budget.config.currency_override??""}get _leadDaysValue(){return this._leadDays??String(this.budget.config.lead_days)}get _currencyError(){let C=this._currencyValue.trim();return C===""||/^[A-Za-z]{3}$/.test(C)?void 0:r(this.hass,"validation.currency")}get _leadDaysError(){let C=Number(this._leadDaysValue);return this._leadDaysValue.trim()!==""&&Number.isInteger(C)&&C>=0&&C<=60?void 0:r(this.hass,"validation.lead_days")}get _splitRuleValue(){return this._splitRule??this.budget.config.split_rule}get _householdChanged(){let C=this.budget;return this._currencyValue.trim().toUpperCase()!==(C.config.currency_override??"")||Number(this._leadDaysValue)!==C.config.lead_days||this._splitRuleValue!==C.config.split_rule}async _saveHousehold(){await this._save("household",{currency:this._currencyValue.trim().toUpperCase()||null,lead_days:Number(this._leadDaysValue),split_rule:this._splitRuleValue}),this._currency=void 0,this._leadDays=void 0,this._splitRule=void 0}_renderHousehold(){let C=this.hass,H=L=>this._touched.has(L);return a`
      <ha-card>
        <h1 class="card-header">${r(C,"settings.household")}</h1>
        <div class="card-content">
          ${this._isAdmin?m:a`<ha-alert alert-type="info">${r(C,"settings.members_admin")}</ha-alert>`}
          <div class="fields">
            <div>
              ${E(C,{label:r(C,"settings.split_rule"),value:this._splitRuleValue,required:!0,options:q2.map(L=>({value:L,label:r(C,`settings.split_rule.${L}`)})),onChange:L=>this._splitRule=L})}
              <p class="hint small" style="margin: 4px 0 0">${r(C,"settings.split_rule_hint")}</p>
            </div>
            <div>
              ${U(C,{label:r(C,"settings.currency"),value:this._currencyValue,error:this._currencyError,touched:H("currency"),onChange:L=>{this._touched=new Set([...this._touched,"currency"]),this._currency=L}})}
              <p class="hint small" style="margin: 4px 0 0">
                ${r(C,"settings.currency_hint",{currency:this.hass?.config.currency??""})}
              </p>
            </div>
            <div>
              ${U(C,{label:r(C,"settings.lead_days"),value:this._leadDaysValue,type:"number",min:0,max:60,required:!0,error:this._leadDaysError,touched:H("lead_days"),onChange:L=>{this._touched=new Set([...this._touched,"lead_days"]),this._leadDays=L}})}
              <p class="hint small" style="margin: 4px 0 0">${r(C,"settings.lead_days_hint")}</p>
            </div>
          </div>
        </div>
        <div class="card-actions">
          <ha-button
            .disabled=${!this._isAdmin||!this._householdChanged||!!this._currencyError||!!this._leadDaysError||this._saving==="household"}
            @click=${()=>this._saveHousehold()}
          >
            ${r(C,"common.save")}
          </ha-button>
        </div>
      </ha-card>
    `}async _save(C,H){this._saving=C,this._error="",this._message="";try{await c.updateConfig(this.hass,H),this._message=r(this.hass,"settings.saved")}catch(L){this._error=u1(this.hass,L)}finally{this._saving=""}}render(){if(!this.budget)return m;let C=this.hass;return a`
      <hass-tabs-subpage .hass=${C} .narrow=${this.narrow} .route=${this.route} .tabs=${W(C,this.route)} main-page>
        <div class="content">
          ${this._error?a`<ha-alert alert-type="error">${this._error}</ha-alert>`:m}
          ${this._message?a`<ha-alert alert-type="success">${this._message}</ha-alert>`:m}
          ${this._renderMembers()} ${this._renderHousehold()} ${this._renderCategories()}
          <ha-card>
            <h1 class="card-header">${r(C,"settings.about")}</h1>
            <div class="card-content">${r(C,"settings.version",{version:this.version})}</div>
          </ha-card>
        </div>
      </hass-tabs-subpage>
      <pro-budget-category-dialog .hass=${C}></pro-budget-category-dialog>
      <pro-budget-confirm .hass=${C}></pro-budget-confirm>
    `}};S.styles=[y,Q(a1),u`
      :host {
        display: block;
        height: 100%;
      }
      /* As ha-config pages: a centred column of cards. */
      .content {
        max-width: 600px;
        margin: 0 auto;
        padding: 28px 20px 28px;
        box-sizing: border-box;
      }
      ha-card {
        margin-bottom: 24px;
        padding: 0;
      }
      .card-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
      ha-md-list {
        padding: 0;
      }
      .hint {
        color: var(--secondary-text-color);
        margin: 0 0 16px;
      }
      ha-alert {
        display: block;
        margin-bottom: 16px;
      }
    `],d([l({attribute:!1})],S.prototype,"hass",2),d([l({attribute:!1})],S.prototype,"budget",2),d([l({attribute:!1})],S.prototype,"route",2),d([l({type:Boolean})],S.prototype,"narrow",2),d([l()],S.prototype,"version",2),d([v()],S.prototype,"_members",2),d([v()],S.prototype,"_currency",2),d([v()],S.prototype,"_leadDays",2),d([v()],S.prototype,"_splitRule",2),d([v()],S.prototype,"_touched",2),d([v()],S.prototype,"_saving",2),d([v()],S.prototype,"_message",2),d([v()],S.prototype,"_error",2),d([t1("pro-budget-category-dialog")],S.prototype,"_dialog",2),d([t1("pro-budget-confirm")],S.prototype,"_confirm",2),S=d([g("pro-budget-settings")],S);var T=class extends Z{constructor(){super(...arguments);this.narrow=!1;this._ready=!1;this._error="";this._userId="";this._userChosen=!1}connectedCallback(){super.connectedCallback(),this._start()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.(),this._unsubscribe=void 0}updated(C){C.has("hass")&&this.hass&&!this._unsubscribe&&this._start(),C.has("route")&&this._redirectToView()}_redirectToView(){let C=this.route;!C||C.path.replace(/\//g,"")!==""||(history.replaceState(null,"",`${C.prefix??P1}/${C2(C)}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!0}})))}async _start(){if(!(!this.hass||this._unsubscribe))try{await u2(),this._unsubscribe=await c.subscribe(this.hass,C=>{this._budget=C;let H=this.hass?.user?.id;!this._userChosen&&H&&C.users.some(L=>L.id===H)&&(this._userId=H)}),this._ready=!0}catch(C){this._error=String(C?.message??C)}}render(){let C=this.hass,H=this._budget;if(this._error)return a`<ha-alert alert-type="error">${this._error}</ha-alert>`;if(!this._ready||!H)return a`<div class="loading">${r(C,"common.loading")}</div>`;let L={hass:C,narrow:this.narrow,route:this.route,budget:H,version:"0.1.0"},t=e=>{this._userChosen=!0,this._userId=e.detail.userId};switch(C2(this.route)){case"items":return a`<pro-budget-items .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${H}></pro-budget-items>`;case"calendar":return a`<pro-budget-calendar .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${H} .userId=${this._userId} @user-changed=${t}></pro-budget-calendar>`;case"insights":return a`<pro-budget-insights .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${H} .userId=${this._userId} @user-changed=${t}></pro-budget-insights>`;case"settings":return a`<pro-budget-settings .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${H} .version=${L.version}></pro-budget-settings>`;default:return a`<pro-budget-overview .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${H} .userId=${this._userId} .version=${L.version} @user-changed=${t}></pro-budget-overview>`}return m}};T.styles=u`
    :host {
      display: block;
      height: 100%;
    }
    .loading,
    ha-alert {
      display: block;
      padding: 16px;
    }
  `,d([l({attribute:!1})],T.prototype,"hass",2),d([l({type:Boolean})],T.prototype,"narrow",2),d([l({attribute:!1})],T.prototype,"route",2),d([l({attribute:!1})],T.prototype,"panel",2),d([v()],T.prototype,"_budget",2),d([v()],T.prototype,"_ready",2),d([v()],T.prototype,"_error",2),d([v()],T.prototype,"_userId",2),T=d([g("pro-budget-panel")],T);console.info("%c PRO-BUDGET %c v0.1.0 ","color: white; background: #3f51b5; font-weight: 700;","color: #3f51b5; background: white; font-weight: 700;");
