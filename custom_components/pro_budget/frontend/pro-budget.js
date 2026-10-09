/* pro-budget v0.1.0 | MIT | https://github.com/malte-wessel/pro-budget */
var m5=Object.defineProperty;var l5=Object.getOwnPropertyDescriptor;var n=(M,V,C,H)=>{for(var L=H>1?void 0:H?l5(V,C):V,t=M.length-1,e;t>=0;t--)(e=M[t])&&(L=(H?e(V,C,L):e(L))||L);return H&&L&&m5(V,C,L),L};var O1=globalThis,f1=O1.ShadowRoot&&(O1.ShadyCSS===void 0||O1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,q1=Symbol(),v2=new WeakMap,m1=class{constructor(V,C,H){if(this._$cssResult$=!0,H!==q1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=V,this.t=C}get styleSheet(){let V=this.o,C=this.t;if(f1&&V===void 0){let H=C!==void 0&&C.length===1;H&&(V=v2.get(C)),V===void 0&&((this.o=V=new CSSStyleSheet).replaceSync(this.cssText),H&&v2.set(C,V))}return V}toString(){return this.cssText}},Y=M=>new m1(typeof M=="string"?M:M+"",void 0,q1),Z=(M,...V)=>{let C=M.length===1?M[0]:V.reduce((H,L,t)=>H+(e=>{if(e._$cssResult$===!0)return e.cssText;if(typeof e=="number")return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(L)+M[t+1],M[0]);return new m1(C,M,q1)},x2=(M,V)=>{if(f1)M.adoptedStyleSheets=V.map(C=>C instanceof CSSStyleSheet?C:C.styleSheet);else for(let C of V){let H=document.createElement("style"),L=O1.litNonce;L!==void 0&&H.setAttribute("nonce",L),H.textContent=C.cssText,M.appendChild(H)}},j1=f1?M=>M:M=>M instanceof CSSStyleSheet?(V=>{let C="";for(let H of V.cssRules)C+=H.cssText;return Y(C)})(M):M;var{is:v5,defineProperty:x5,getOwnPropertyDescriptor:s5,getOwnPropertyNames:u5,getOwnPropertySymbols:Z5,getPrototypeOf:c5}=Object,y1=globalThis,s2=y1.trustedTypes,S5=s2?s2.emptyScript:"",h5=y1.reactiveElementPolyfillSupport,l1=(M,V)=>M,v1={toAttribute(M,V){switch(V){case Boolean:M=M?S5:null;break;case Object:case Array:M=M==null?M:JSON.stringify(M)}return M},fromAttribute(M,V){let C=M;switch(V){case Boolean:C=M!==null;break;case Number:C=M===null?null:Number(M);break;case Object:case Array:try{C=JSON.parse(M)}catch{C=null}}return C}},b1=(M,V)=>!v5(M,V),u2={attribute:!0,type:String,converter:v1,reflect:!1,useDefault:!1,hasChanged:b1};Symbol.metadata??=Symbol("metadata"),y1.litPropertyMetadata??=new WeakMap;var q=class extends HTMLElement{static addInitializer(V){this._$Ei(),(this.l??=[]).push(V)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(V,C=u2){if(C.state&&(C.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(V)&&((C=Object.create(C)).wrapped=!0),this.elementProperties.set(V,C),!C.noAccessor){let H=Symbol(),L=this.getPropertyDescriptor(V,H,C);L!==void 0&&x5(this.prototype,V,L)}}static getPropertyDescriptor(V,C,H){let{get:L,set:t}=s5(this.prototype,V)??{get(){return this[C]},set(e){this[C]=e}};return{get:L,set(e){let d=L?.call(this);t?.call(this,e),this.requestUpdate(V,d,H)},configurable:!0,enumerable:!0}}static getPropertyOptions(V){return this.elementProperties.get(V)??u2}static _$Ei(){if(this.hasOwnProperty(l1("elementProperties")))return;let V=c5(this);V.finalize(),V.l!==void 0&&(this.l=[...V.l]),this.elementProperties=new Map(V.elementProperties)}static finalize(){if(this.hasOwnProperty(l1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(l1("properties"))){let C=this.properties,H=[...u5(C),...Z5(C)];for(let L of H)this.createProperty(L,C[L])}let V=this[Symbol.metadata];if(V!==null){let C=litPropertyMetadata.get(V);if(C!==void 0)for(let[H,L]of C)this.elementProperties.set(H,L)}this._$Eh=new Map;for(let[C,H]of this.elementProperties){let L=this._$Eu(C,H);L!==void 0&&this._$Eh.set(L,C)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(V){let C=[];if(Array.isArray(V)){let H=new Set(V.flat(1/0).reverse());for(let L of H)C.unshift(j1(L))}else V!==void 0&&C.push(j1(V));return C}static _$Eu(V,C){let H=C.attribute;return H===!1?void 0:typeof H=="string"?H:typeof V=="string"?V.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(V=>this.enableUpdating=V),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(V=>V(this))}addController(V){(this._$EO??=new Set).add(V),this.renderRoot!==void 0&&this.isConnected&&V.hostConnected?.()}removeController(V){this._$EO?.delete(V)}_$E_(){let V=new Map,C=this.constructor.elementProperties;for(let H of C.keys())this.hasOwnProperty(H)&&(V.set(H,this[H]),delete this[H]);V.size>0&&(this._$Ep=V)}createRenderRoot(){let V=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return x2(V,this.constructor.elementStyles),V}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(V=>V.hostConnected?.())}enableUpdating(V){}disconnectedCallback(){this._$EO?.forEach(V=>V.hostDisconnected?.())}attributeChangedCallback(V,C,H){this._$AK(V,H)}_$ET(V,C){let H=this.constructor.elementProperties.get(V),L=this.constructor._$Eu(V,H);if(L!==void 0&&H.reflect===!0){let t=(H.converter?.toAttribute!==void 0?H.converter:v1).toAttribute(C,H.type);this._$Em=V,t==null?this.removeAttribute(L):this.setAttribute(L,t),this._$Em=null}}_$AK(V,C){let H=this.constructor,L=H._$Eh.get(V);if(L!==void 0&&this._$Em!==L){let t=H.getPropertyOptions(L),e=typeof t.converter=="function"?{fromAttribute:t.converter}:t.converter?.fromAttribute!==void 0?t.converter:v1;this._$Em=L;let d=e.fromAttribute(C,t.type);this[L]=d??this._$Ej?.get(L)??d,this._$Em=null}}requestUpdate(V,C,H,L=!1,t){if(V!==void 0){let e=this.constructor;if(L===!1&&(t=this[V]),H??=e.getPropertyOptions(V),!((H.hasChanged??b1)(t,C)||H.useDefault&&H.reflect&&t===this._$Ej?.get(V)&&!this.hasAttribute(e._$Eu(V,H))))return;this.C(V,C,H)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(V,C,{useDefault:H,reflect:L,wrapped:t},e){H&&!(this._$Ej??=new Map).has(V)&&(this._$Ej.set(V,e??C??this[V]),t!==!0||e!==void 0)||(this._$AL.has(V)||(this.hasUpdated||H||(C=void 0),this._$AL.set(V,C)),L===!0&&this._$Em!==V&&(this._$Eq??=new Set).add(V))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(C){Promise.reject(C)}let V=this.scheduleUpdate();return V!=null&&await V,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[L,t]of this._$Ep)this[L]=t;this._$Ep=void 0}let H=this.constructor.elementProperties;if(H.size>0)for(let[L,t]of H){let{wrapped:e}=t,d=this[L];e!==!0||this._$AL.has(L)||d===void 0||this.C(L,void 0,t,d)}}let V=!1,C=this._$AL;try{V=this.shouldUpdate(C),V?(this.willUpdate(C),this._$EO?.forEach(H=>H.hostUpdate?.()),this.update(C)):this._$EM()}catch(H){throw V=!1,this._$EM(),H}V&&this._$AE(C)}willUpdate(V){}_$AE(V){this._$EO?.forEach(C=>C.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(V)),this.updated(V)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(V){return!0}update(V){this._$Eq&&=this._$Eq.forEach(C=>this._$ET(C,this[C])),this._$EM()}updated(V){}firstUpdated(V){}};q.elementStyles=[],q.shadowRootOptions={mode:"open"},q[l1("elementProperties")]=new Map,q[l1("finalized")]=new Map,h5?.({ReactiveElement:q}),(y1.reactiveElementVersions??=[]).push("2.1.2");var L2=globalThis,Z2=M=>M,w1=L2.trustedTypes,c2=w1?w1.createPolicy("lit-html",{createHTML:M=>M}):void 0,y2="$lit$",X=`lit$${Math.random().toFixed(9).slice(2)}$`,b2="?"+X,g5=`<${b2}>`,L1=document,s1=()=>L1.createComment(""),u1=M=>M===null||typeof M!="object"&&typeof M!="function",M2=Array.isArray,O5=M=>M2(M)||typeof M?.[Symbol.iterator]=="function",Y1=`[ 	
\f\r]`,x1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,S2=/-->/g,h2=/>/g,H1=RegExp(`>|${Y1}(?:([^\\s"'>=/]+)(${Y1}*=${Y1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),g2=/'/g,O2=/"/g,w2=/^(?:script|style|textarea|title)$/i,e2=M=>(V,...C)=>({_$litType$:M,strings:V,values:C}),a=e2(1),Y5=e2(2),X5=e2(3),M1=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),f2=new WeakMap,V1=L1.createTreeWalker(L1,129);function k2(M,V){if(!M2(M)||!M.hasOwnProperty("raw"))throw Error("invalid template strings array");return c2!==void 0?c2.createHTML(V):V}var f5=(M,V)=>{let C=M.length-1,H=[],L,t=V===2?"<svg>":V===3?"<math>":"",e=x1;for(let d=0;d<C;d++){let o=M[d],m,A,i=-1,x=0;for(;x<o.length&&(e.lastIndex=x,A=e.exec(o),A!==null);)x=e.lastIndex,e===x1?A[1]==="!--"?e=S2:A[1]!==void 0?e=h2:A[2]!==void 0?(w2.test(A[2])&&(L=RegExp("</"+A[2],"g")),e=H1):A[3]!==void 0&&(e=H1):e===H1?A[0]===">"?(e=L??x1,i=-1):A[1]===void 0?i=-2:(i=e.lastIndex-A[2].length,m=A[1],e=A[3]===void 0?H1:A[3]==='"'?O2:g2):e===O2||e===g2?e=H1:e===S2||e===h2?e=x1:(e=H1,L=void 0);let c=e===H1&&M[d+1].startsWith("/>")?" ":"";t+=e===x1?o+g5:i>=0?(H.push(m),o.slice(0,i)+y2+o.slice(i)+X+c):o+X+(i===-2?d:c)}return[k2(M,t+(M[C]||"<?>")+(V===2?"</svg>":V===3?"</math>":"")),H]},Z1=class M{constructor({strings:V,_$litType$:C},H){let L;this.parts=[];let t=0,e=0,d=V.length-1,o=this.parts,[m,A]=f5(V,C);if(this.el=M.createElement(m,H),V1.currentNode=this.el.content,C===2||C===3){let i=this.el.content.firstChild;i.replaceWith(...i.childNodes)}for(;(L=V1.nextNode())!==null&&o.length<d;){if(L.nodeType===1){if(L.hasAttributes())for(let i of L.getAttributeNames())if(i.endsWith(y2)){let x=A[e++],c=L.getAttribute(i).split(X),b=/([.?@])?(.*)/.exec(x);o.push({type:1,index:t,name:b[2],strings:c,ctor:b[1]==="."?J1:b[1]==="?"?C2:b[1]==="@"?H2:t1}),L.removeAttribute(i)}else i.startsWith(X)&&(o.push({type:6,index:t}),L.removeAttribute(i));if(w2.test(L.tagName)){let i=L.textContent.split(X),x=i.length-1;if(x>0){L.textContent=w1?w1.emptyScript:"";for(let c=0;c<x;c++)L.append(i[c],s1()),V1.nextNode(),o.push({type:2,index:++t});L.append(i[x],s1())}}}else if(L.nodeType===8)if(L.data===b2)o.push({type:2,index:t});else{let i=-1;for(;(i=L.data.indexOf(X,i+1))!==-1;)o.push({type:7,index:t}),i+=X.length-1}t++}}static createElement(V,C){let H=L1.createElement("template");return H.innerHTML=V,H}};function r1(M,V,C=M,H){if(V===M1)return V;let L=H!==void 0?C._$Co?.[H]:C._$Cl,t=u1(V)?void 0:V._$litDirective$;return L?.constructor!==t&&(L?._$AO?.(!1),t===void 0?L=void 0:(L=new t(M),L._$AT(M,C,H)),H!==void 0?(C._$Co??=[])[H]=L:C._$Cl=L),L!==void 0&&(V=r1(M,L._$AS(M,V.values),L,H)),V}var X1=class{constructor(V,C){this._$AV=[],this._$AN=void 0,this._$AD=V,this._$AM=C}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(V){let{el:{content:C},parts:H}=this._$AD,L=(V?.creationScope??L1).importNode(C,!0);V1.currentNode=L;let t=V1.nextNode(),e=0,d=0,o=H[0];for(;o!==void 0;){if(e===o.index){let m;o.type===2?m=new c1(t,t.nextSibling,this,V):o.type===1?m=new o.ctor(t,o.name,o.strings,this,V):o.type===6&&(m=new V2(t,this,V)),this._$AV.push(m),o=H[++d]}e!==o?.index&&(t=V1.nextNode(),e++)}return V1.currentNode=L1,L}p(V){let C=0;for(let H of this._$AV)H!==void 0&&(H.strings!==void 0?(H._$AI(V,H,C),C+=H.strings.length-2):H._$AI(V[C])),C++}},c1=class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(V,C,H,L){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=V,this._$AB=C,this._$AM=H,this.options=L,this._$Cv=L?.isConnected??!0}get parentNode(){let V=this._$AA.parentNode,C=this._$AM;return C!==void 0&&V?.nodeType===11&&(V=C.parentNode),V}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(V,C=this){V=r1(this,V,C),u1(V)?V===p||V==null||V===""?(this._$AH!==p&&this._$AR(),this._$AH=p):V!==this._$AH&&V!==M1&&this._(V):V._$litType$!==void 0?this.$(V):V.nodeType!==void 0?this.T(V):O5(V)?this.k(V):this._(V)}O(V){return this._$AA.parentNode.insertBefore(V,this._$AB)}T(V){this._$AH!==V&&(this._$AR(),this._$AH=this.O(V))}_(V){this._$AH!==p&&u1(this._$AH)?this._$AA.nextSibling.data=V:this.T(L1.createTextNode(V)),this._$AH=V}$(V){let{values:C,_$litType$:H}=V,L=typeof H=="number"?this._$AC(V):(H.el===void 0&&(H.el=Z1.createElement(k2(H.h,H.h[0]),this.options)),H);if(this._$AH?._$AD===L)this._$AH.p(C);else{let t=new X1(L,this),e=t.u(this.options);t.p(C),this.T(e),this._$AH=t}}_$AC(V){let C=f2.get(V.strings);return C===void 0&&f2.set(V.strings,C=new Z1(V)),C}k(V){M2(this._$AH)||(this._$AH=[],this._$AR());let C=this._$AH,H,L=0;for(let t of V)L===C.length?C.push(H=new M(this.O(s1()),this.O(s1()),this,this.options)):H=C[L],H._$AI(t),L++;L<C.length&&(this._$AR(H&&H._$AB.nextSibling,L),C.length=L)}_$AR(V=this._$AA.nextSibling,C){for(this._$AP?.(!1,!0,C);V!==this._$AB;){let H=Z2(V).nextSibling;Z2(V).remove(),V=H}}setConnected(V){this._$AM===void 0&&(this._$Cv=V,this._$AP?.(V))}},t1=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(V,C,H,L,t){this.type=1,this._$AH=p,this._$AN=void 0,this.element=V,this.name=C,this._$AM=L,this.options=t,H.length>2||H[0]!==""||H[1]!==""?(this._$AH=Array(H.length-1).fill(new String),this.strings=H):this._$AH=p}_$AI(V,C=this,H,L){let t=this.strings,e=!1;if(t===void 0)V=r1(this,V,C,0),e=!u1(V)||V!==this._$AH&&V!==M1,e&&(this._$AH=V);else{let d=V,o,m;for(V=t[0],o=0;o<t.length-1;o++)m=r1(this,d[H+o],C,o),m===M1&&(m=this._$AH[o]),e||=!u1(m)||m!==this._$AH[o],m===p?V=p:V!==p&&(V+=(m??"")+t[o+1]),this._$AH[o]=m}e&&!L&&this.j(V)}j(V){V===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,V??"")}},J1=class extends t1{constructor(){super(...arguments),this.type=3}j(V){this.element[this.name]=V===p?void 0:V}},C2=class extends t1{constructor(){super(...arguments),this.type=4}j(V){this.element.toggleAttribute(this.name,!!V&&V!==p)}},H2=class extends t1{constructor(V,C,H,L,t){super(V,C,H,L,t),this.type=5}_$AI(V,C=this){if((V=r1(this,V,C,0)??p)===M1)return;let H=this._$AH,L=V===p&&H!==p||V.capture!==H.capture||V.once!==H.once||V.passive!==H.passive,t=V!==p&&(H===p||L);L&&this.element.removeEventListener(this.name,this,H),t&&this.element.addEventListener(this.name,this,V),this._$AH=V}handleEvent(V){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,V):this._$AH.handleEvent(V)}},V2=class{constructor(V,C,H){this.element=V,this.type=6,this._$AN=void 0,this._$AM=C,this.options=H}get _$AU(){return this._$AM._$AU}_$AI(V){r1(this,V)}};var y5=L2.litHtmlPolyfillSupport;y5?.(Z1,c1),(L2.litHtmlVersions??=[]).push("3.3.3");var _2=(M,V,C)=>{let H=C?.renderBefore??V,L=H._$litPart$;if(L===void 0){let t=C?.renderBefore??null;H._$litPart$=L=new c1(V.insertBefore(s1(),t),t,void 0,C??{})}return L._$AI(M),L};var r2=globalThis,u=class extends q{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let V=super.createRenderRoot();return this.renderOptions.renderBefore??=V.firstChild,V}update(V){let C=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(V),this._$Do=_2(C,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M1}};u._$litElement$=!0,u.finalized=!0,r2.litElementHydrateSupport?.({LitElement:u});var b5=r2.litElementPolyfillSupport;b5?.({LitElement:u});(r2.litElementVersions??=[]).push("4.2.2");var O=M=>(V,C)=>{C!==void 0?C.addInitializer(()=>{customElements.define(M,V)}):customElements.define(M,V)};var w5={attribute:!0,type:String,converter:v1,reflect:!1,hasChanged:b1},k5=(M=w5,V,C)=>{let{kind:H,metadata:L}=C,t=globalThis.litPropertyMetadata.get(L);if(t===void 0&&globalThis.litPropertyMetadata.set(L,t=new Map),H==="setter"&&((M=Object.create(M)).wrapped=!0),t.set(C.name,M),H==="accessor"){let{name:e}=C;return{set(d){let o=V.get.call(this);V.set.call(this,d),this.requestUpdate(e,o,M,!0,d)},init(d){return d!==void 0&&this.C(e,void 0,M,d),d}}}if(H==="setter"){let{name:e}=C;return function(d){let o=this[e];V.call(this,d),this.requestUpdate(e,o,M,!0,d)}}throw Error("Unsupported decorator location: "+H)};function l(M){return(V,C)=>typeof C=="object"?k5(M,V,C):((H,L,t)=>{let e=L.hasOwnProperty(t);return L.constructor.createProperty(t,H),e?Object.getOwnPropertyDescriptor(L,t):void 0})(M,V,C)}function v(M){return l({...M,state:!0,attribute:!1})}var e1=(M,V,C)=>(C.configurable=!0,C.enumerable=!0,Reflect.decorate&&typeof V!="object"&&Object.defineProperty(M,V,C),C);function i1(M,V){return(C,H,L)=>{let t=e=>e.renderRoot?.querySelector(M)??null;if(V){let{get:e,set:d}=typeof H=="object"?C:L??(()=>{let o=Symbol();return{get(){return this[o]},set(m){this[o]=m}}})();return e1(C,H,{get(){let o=e.call(this);return o===void 0&&(o=t(this),(o!==null||this.hasUpdated)&&d.call(this,o)),o}})}return e1(C,H,{get(){return t(this)}})}}var k="pro_budget",S1=class extends Error{constructor(C,H){super(H);this.code=C}};async function F(M,V){try{return await M.callWS(V)}catch(C){let H=C;throw new S1(H.code??"unknown",H.message??String(C))}}var S={subscribe(M,V){return M.connection.subscribeMessage(V,{type:`${k}/subscribe`})},createCategory:(M,V)=>F(M,{type:`${k}/categories/create`,fields:V}),updateCategory:(M,V,C)=>F(M,{type:`${k}/categories/update`,category_id:V,fields:C}),deleteCategory:(M,V)=>F(M,{type:`${k}/categories/delete`,category_id:V}),createItem:(M,V)=>F(M,{type:`${k}/items/create`,fields:V}),updateItem:(M,V,C)=>F(M,{type:`${k}/items/update`,item_id:V,fields:C}),deleteItem:(M,V)=>F(M,{type:`${k}/items/delete`,item_id:V}),setPaid:(M,V,C,H)=>F(M,{type:`${k}/paid/set`,item_id:V,date:C,paid:H}),stats:(M,V,C,H)=>F(M,{type:`${k}/stats`,year:V,month:C,...H?{user_id:H}:{}}),overview:(M,V,C,H)=>F(M,{type:`${k}/overview`,year:V,month:C,...H?{user_id:H}:{}}),insights:(M,V,C)=>F(M,{type:`${k}/insights`,user_id:V,year:C}),updateConfig:(M,V)=>F(M,{type:`${k}/config/update`,...V}),calendar:(M,V,C,H)=>F(M,{type:`${k}/calendar`,year:V,month:C,...H?{user_id:H}:{}}),occurrences:(M,V,C,H)=>F(M,{type:`${k}/occurrences`,start:V,end:C,...H?{user_id:H}:{}})};var k1={topBar:"ha-top-app-bar-fixed",menuButton:"ha-menu-button",iconButton:"ha-icon-button",card:"ha-card",icon:"ha-icon",form:"ha-form",dialog:"ha-dialog",dialogHeader:"ha-dialog-header",dialogFooter:"ha-dialog-footer",button:"ha-button",alert:"ha-alert",circularProgress:"ha-spinner",ripple:"ha-ripple",subpage:"hass-tabs-subpage",subpageDataTable:"hass-tabs-subpage-data-table",overflowMenu:"ha-icon-overflow-menu",svgIcon:"ha-svg-icon"},B2;function P2(){return B2??=(async()=>{try{await(await window.loadCardHelpers?.())?.createCardElement({type:"entities",entities:[]})?.constructor.getConfigElement?.()}catch{}await Promise.all([k1.form,k1.dialog,k1.subpage,k1.subpageDataTable].map(M=>Promise.race([customElements.whenDefined(M),new Promise(V=>setTimeout(V,4e3))])))})(),B2}var T2={"panel.title":"Budget","nav.overview":"\xDCbersicht","nav.items":"Posten","nav.calendar":"Kalender","nav.insights":"Einblicke","nav.settings":"Einstellungen","settings.categories":"Kategorien","settings.categories_hint":"Jeder Posten geh\xF6rt zu einer Kategorie. Eine verwendete Kategorie kann nicht gel\xF6scht werden.","settings.members":"Haushaltsmitglieder","settings.members_hint":"Home-Assistant-Benutzer, die im Budget erscheinen. Ohne Auswahl ist jeder aktive Benutzer Mitglied.","settings.members_admin":"Nur Administratoren k\xF6nnen die Haushaltseinstellungen \xE4ndern.","settings.household":"Haushalt","settings.currency":"W\xE4hrung","settings.currency_hint":"ISO-4217-Code. Leer lassen f\xFCr die W\xE4hrung von Home Assistant ({currency}).","settings.lead_days":"Tage im Voraus, ab denen eine Zahlung als anstehend gilt","settings.lead_days_hint":"Manuelle Zahlungen erscheinen so viele Tage vor der F\xE4lligkeit auf der To-do-Liste.","settings.about":"\xDCber","settings.version":"Pro Budget {version}","settings.saved":"Gespeichert.","validation.currency":"Gib einen dreistelligen W\xE4hrungscode ein oder lass das Feld leer.","validation.lead_days":"Gib eine Zahl von 0 bis 60 ein.","nav.categories":"Kategorien","common.all":"Alle","common.add":"Hinzuf\xFCgen","common.save":"Speichern","common.cancel":"Abbrechen","common.delete":"L\xF6schen","common.edit":"Bearbeiten","common.close":"Schlie\xDFen","common.loading":"L\xE4dt\u2026","common.unknown_user":"Ehemaliges Mitglied","common.per_month":"/ Monat","common.error":"Etwas ist schiefgelaufen: {error}","common.today":"Heute","common.paid":"Bezahlt","common.unpaid":"Noch nicht bezahlt","type.earning":"Einnahme","type.expense":"Ausgabe","type.saving":"Sparen","type.earning.plural":"Einnahmen","type.expense.plural":"Ausgaben","type.saving.plural":"Sparen","recurrence.daily":"T\xE4glich","recurrence.weekly":"W\xF6chentlich","recurrence.biweekly":"Alle zwei Wochen","recurrence.monthly":"Monatlich","recurrence.quarterly":"Viertelj\xE4hrlich","recurrence.semi_annually":"Halbj\xE4hrlich","recurrence.annually":"J\xE4hrlich","cost_kind.fixed":"Fix","cost_kind.variable":"Variabel","payment.direct_debit":"Lastschrift","payment.standing_order":"Dauerauftrag","payment.manual":"Manuell / \xDCberweisung","payment.credit_card":"Kreditkarte","payment.paypal":"PayPal","due.on_day":"am {day}.","due.on_day_month":"am {day}. {month}","due.months":"am {day}. ({months})","overview.income":"Einnahmen","overview.expenses":"Ausgaben","overview.savings":"Sparen","overview.remaining":"Verbleibend","overview.members":"Mitglieder","overview.personal":"Pers\xF6nlich","overview.shared_costs_paid":"Gemeinsame Kosten bezahlt","overview.settlement":"Ausgleich","overview.settled":"Alles ausgeglichen.","overview.pays":"zahlt an","overview.fair_share":"Fairer Anteil","overview.rule_income":"Gemeinsame Kosten anteilig zum Einkommen aufgeteilt.","overview.rule_equal":"Gemeinsame Kosten zu gleichen Teilen aufgeteilt.","overview.nav_previous":"Vorheriger Monat","overview.nav_next":"N\xE4chster Monat","overview.scope_household":"Haushalt im {month}","overview.scope_member":"{name} im {month}","overview.monthly_equivalent":"monatliches \xC4quivalent","overview.actual_month":"tats\xE4chliche Betr\xE4ge","overview.free":"Frei verf\xFCgbar","overview.free_pct":"{pct} des Einkommens bleiben \xFCbrig","overview.free_equivalent":"{amount} im Durchschnittsmonat","overview.outflows_in":"Abfl\xFCsse im {month}","overview.paid_of":"{paid} von {due}","overview.paid_pct":"{pct} abgegangen","overview.day_of":"Tag {day} von {days}","overview.still_open":"noch {amount}","overview.income_expenses":"Einnahmen {income} \xB7 Ausgaben {expenses}","overview.seg_fixed":"Fixkosten","overview.seg_variable":"Variabel","overview.seg_savings":"Sparen","overview.seg_free":"Frei","overview.kpi_settlement":"Ausgleich","overview.kpi_open_settlement":"Offener Ausgleich","overview.on_target":"Ziel 10 % erreicht","overview.below_target":"unter 10 %","overview.fixed_high":"hoch \u2013 \xFCber 45 %","overview.fixed_ok":"im gr\xFCnen Bereich","overview.transfers_count":"{count} \xDCberweisungen","overview.pays_to":"zahlt an {names}","overview.receives_from":"erh\xE4lt von {names}","overview.by_category":"Ausgaben nach Kategorie","overview.household":"Haushalt","overview.more_categories":"+ {count} weitere \xB7 {amount}","overview.all_items":"Alle Posten","overview.free_per_month":"frei / Monat","overview.member_sub":"Einnahmen {income} \xB7 Sparquote {rate}","overview.bar_hint":"Balken: Fixkosten, variabel, Sparen, frei \u2013 Anteil am eigenen Einkommen.","overview.outflows_year":"Abfl\xFCsse {year}","overview.insights_link":"Einblicke","overview.avg":"\xD8 {amount}","overview.max_month":"Teuerster Monat: {month}","overview.max_month_sub":"{amount} \u2013 {title} {item_amount} {recurrence}","overview.next_special":"N\xE4chste Sonderzahlung","overview.next_special_sub":"{title} {amount} am {date} ({recurrence})","overview.next_month_less":"{month} wird ruhiger","overview.next_month_more":"{month} wird teurer","overview.next_month_same":"{month} bleibt gleich","overview.next_month_sub_less":"{amount} f\xE4llig \u2013 {delta} weniger als im {month}","overview.next_month_sub_more":"{amount} f\xE4llig \u2013 {delta} mehr als im {month}","overview.next_month_sub_same":"{amount} f\xE4llig","overview.up_next":"Als N\xE4chstes","overview.next_payments":"n\xE4chste Zahlungen","overview.tomorrow":"Morgen","overview.next_income":"N\xE4chster Eingang","overview.calendar_link":"Zum Kalender","overview.nothing_due":"Nichts f\xE4llig.","overview.underpaid":"zu wenig bezahlt","overview.overpaid":"zu viel bezahlt","overview.paid_fair":"bezahlt {paid} \xB7 fairer Anteil {fair}","settings.split_rule":"Faire Aufteilung der gemeinsamen Kosten","settings.split_rule.income":"Anteilig zum Einkommen","settings.split_rule.equal":"Zu gleichen Teilen","settings.split_rule_hint":"Bestimmt den fairen Anteil jedes Mitglieds an den gemeinsamen Kosten und damit, wer wem etwas zahlt.","overview.categories":"Nach Kategorie","overview.category":"Kategorie","overview.empty":"Noch keine Posten. Lege den ersten unter Posten an.","overview.other_currencies":"Posten in anderen W\xE4hrungen werden getrennt aufgef\xFChrt.","items.title":"Posten","items.add":"Posten hinzuf\xFCgen","items.search":"{count} Posten durchsuchen","items.group_by":"Gruppieren nach","items.group.category":"Kategorie","items.group.user":"Mitglied","items.group.type":"Typ","items.group.none":"Keine","categories.search":"{count} Kategorien durchsuchen","items.filter_type":"Typ","items.filter_user":"Mitglied","items.filter_category":"Kategorie","items.col_title":"Titel","items.col_amount":"Betrag","items.col_recurrence":"Turnus","items.col_due":"F\xE4llig","items.col_category":"Kategorie","items.col_user":"Mitglied","items.col_monthly":"Monatlich","items.empty":"Keine passenden Posten.","items.col_status":"Status","items.active":"Aktiv","items.inactive":"Inaktiv","item.title":"Titel","item.type":"Typ","item.amount":"Betrag","item.currency":"W\xE4hrung","item.category":"Kategorie","item.user":"Bezahlt von","item.user_earning":"Empfangen von","item.recurrence":"Turnus","item.due_weekday":"Wochentag","item.due_day":"Tag im Monat","item.due_month":"Erster Monat","item.cost_kind":"Fix / Variabel","item.shared":"Gemeinsamer Haushaltsposten","item.shared_with":"Geteilt mit","item.shared_everyone":"Alle","validation.shared_with_payer":"Das zahlende Mitglied muss zu den Beteiligten geh\xF6ren.","overview.rule_subset":"Posten, die nur mit einigen Mitgliedern geteilt sind, werden unter diesen aufgeteilt.","item.payment_method":"Zahlweise","item.start":"Startdatum","item.end":"Enddatum","item.advanced":"Erweitert","item.new":"Neuer Posten","item.edit":"Posten bearbeiten","item.delete_confirm":"\u201E{title}\u201C l\xF6schen?","item.amount_invalid":"Gib einen Betrag wie 12,50 ein.","calendar.month":"Monat","calendar.list":"Liste","calendar.today":"Heute","calendar.nav_previous":"Vorheriger Monat","calendar.nav_next":"N\xE4chster Monat","calendar.out_in":"Raus im {month}","calendar.in_in":"Rein im {month}","calendar.payments_note":"{count} Zahlungen \xB7 davon {amount} am 1.","calendar.from_day":"ab dem {day}.","calendar.no_income":"keine Einnahmen","calendar.lowest":"Tiefster Stand","calendar.lowest_note":"am {day}., vor dem ersten Eingang","calendar.opening_note":"am {day}. \xB7 {opening} aus dem Vormonat \xFCbernommen","calendar.cashflow":"Geldfluss im {month}","calendar.cashflow_hint":"Stand seit dem 1., beginnend mit dem Rest der Einnahmen des Vormonats","calendar.low_title":"Tiefster Stand am {day}.: {amount}","calendar.low_sub":"So viel geht raus, bevor am {day}. der erste Eingang kommt \u2013 diesen Puffer sollte das Konto zu Monatsbeginn haben. Monatsende: {amount}.","calendar.no_minus":"Tiefster Stand am {day}.: {amount}","calendar.no_minus_sub":"Vom Vormonat blieben {opening} \u2013 genug f\xFCr alle Zahlungen vor den Einnahmen dieses Monats. Monatsende: {amount}.","calendar.no_income_sub":"In diesem Monat kommt kein Geld rein.","calendar.day_total":"Summe des Tages","calendar.no_payments_day":"Keine Zahlungen an diesem Tag.","calendar.next":"Danach","calendar.next_hint":"n\xE4chste Zahlungen","calendar.nothing_more":"Nichts mehr in diesem Monat.","calendar.ha_title":"Im Kalender von Home Assistant","calendar.ha_text":"Alle Zahlungen stehen auch in {entity} und je Mitglied in einem eigenen Kalender \u2013 f\xFCr Automationen und die Kalender-Karte.","calendar.open_ha":"Kalender \xF6ffnen","calendar.more":"+{count}","calendar.unscheduled":"Nicht platzierbar (kein F\xE4lligkeitsmonat)","calendar.mark_paid":"Als bezahlt markieren","calendar.mark_unpaid":"Als unbezahlt markieren","insights.title":"Einblicke","insights.year":"Jahr","insights.savings_rate":"Sparquote","insights.fixed_cost_rate":"Fixkostenquote","insights.avg_month":"Durchschnittsmonat","insights.max_month":"Teuerster Monat","insights.min_month":"G\xFCnstigster Monat","insights.top_expenses":"Gr\xF6\xDFte Ausgaben","insights.payment_calendar":"Zahlungskalender {year}","insights.payment_calendar_hint":"Tats\xE4chliche Abfl\xFCsse je Monat, nicht normalisiert.","insights.unscheduled":"Nicht platzierbar: diese Posten haben keinen F\xE4lligkeitsmonat.","insights.no_member":"W\xE4hle ein Mitglied.","categories.title":"Kategorien","categories.add":"Kategorie hinzuf\xFCgen","categories.name":"Name","categories.color":"Farbe","categories.icon":"Symbol","categories.items":"{count} Posten","categories.in_use":"Wird von {count} Posten verwendet; l\xF6sche oder verschiebe sie zuerst.","categories.delete_confirm":"Kategorie \u201E{name}\u201C l\xF6schen?","categories.new":"Neue Kategorie","categories.edit":"Kategorie bearbeiten","validation.required":"Erforderlich","validation.amount":"Gib einen Betrag wie 12,50 ein.","validation.due_day":"Gib einen Tag von 1 bis {max} ein.","validation.end_before_start":"Das Enddatum liegt vor dem Startdatum.","errors.not_found":"Nicht gefunden.","errors.invalid":"Ung\xFCltige Eingabe: {message}","errors.in_use":"Wird noch verwendet."};var t2={"panel.title":"Budget","nav.overview":"Overview","nav.items":"Items","nav.calendar":"Calendar","nav.insights":"Insights","nav.settings":"Settings","settings.categories":"Categories","settings.categories_hint":"Every item belongs to a category. A category in use cannot be deleted.","settings.members":"Household members","settings.members_hint":"Home Assistant users who appear in the budget. With none selected, every active user is a member.","settings.members_admin":"Only administrators can change the household settings.","settings.household":"Household","settings.currency":"Currency","settings.currency_hint":"ISO 4217 code. Leave empty to use Home Assistant's currency ({currency}).","settings.lead_days":"Days ahead a payment counts as upcoming","settings.lead_days_hint":"Manual payments appear on the to-do list this many days before they are due.","settings.about":"About","settings.version":"Pro Budget {version}","settings.saved":"Saved.","validation.currency":"Enter a three-letter currency code or leave it empty.","validation.lead_days":"Enter a number from 0 to 60.","nav.categories":"Categories","common.all":"Everyone","common.add":"Add","common.save":"Save","common.cancel":"Cancel","common.delete":"Delete","common.edit":"Edit","common.close":"Close","common.loading":"Loading\u2026","common.unknown_user":"Former member","common.per_month":"/ month","common.error":"Something went wrong: {error}","common.today":"Today","common.none":"\u2014","common.paid":"Paid","common.unpaid":"Not paid yet","type.earning":"Earning","type.expense":"Expense","type.saving":"Saving","type.earning.plural":"Earnings","type.expense.plural":"Expenses","type.saving.plural":"Savings","recurrence.daily":"Daily","recurrence.weekly":"Weekly","recurrence.biweekly":"Every two weeks","recurrence.monthly":"Monthly","recurrence.quarterly":"Quarterly","recurrence.semi_annually":"Semi-annually","recurrence.annually":"Annually","cost_kind.fixed":"Fixed","cost_kind.variable":"Variable","payment.direct_debit":"Direct debit","payment.standing_order":"Standing order","payment.manual":"Manual / bank transfer","payment.credit_card":"Credit card","payment.paypal":"PayPal","due.on_day":"on the {day}.","due.on_day_month":"on the {day}. of {month}","due.months":"on the {day}. ({months})","overview.income":"Income","overview.expenses":"Expenses","overview.savings":"Savings","overview.remaining":"Remaining","overview.members":"Members","overview.personal":"Personal","overview.shared_costs_paid":"Shared costs paid","overview.settlement":"Settlement","overview.settled":"Everything is settled.","overview.pays":"pays","overview.fair_share":"Fair share","overview.rule_income":"Shared costs split proportionally to income.","overview.rule_equal":"Shared costs split equally.","overview.nav_previous":"Previous month","overview.nav_next":"Next month","overview.scope_household":"Household in {month}","overview.scope_member":"{name} in {month}","overview.monthly_equivalent":"monthly equivalent","overview.actual_month":"actual amounts","overview.free":"Free to spend","overview.free_pct":"{pct} of income remains","overview.free_equivalent":"{amount} in an average month","overview.outflows_in":"Outflows in {month}","overview.paid_of":"{paid} of {due}","overview.paid_pct":"{pct} paid","overview.day_of":"day {day} of {days}","overview.still_open":"{amount} still open","overview.income_expenses":"Income {income} \xB7 Expenses {expenses}","overview.seg_fixed":"Fixed costs","overview.seg_variable":"Variable","overview.seg_savings":"Savings","overview.seg_free":"Free","overview.kpi_settlement":"Settlement","overview.kpi_open_settlement":"Open settlement","overview.on_target":"on target (10 % or more)","overview.below_target":"below 10 %","overview.fixed_high":"high \u2013 above 45 %","overview.fixed_ok":"healthy","overview.transfers_count":"{count} transfers","overview.pays_to":"pays {names}","overview.receives_from":"receives from {names}","overview.by_category":"Expenses by category","overview.household":"Household","overview.more_categories":"+ {count} more \xB7 {amount}","overview.all_items":"All items","overview.free_per_month":"free / month","overview.member_sub":"Income {income} \xB7 Savings rate {rate}","overview.bar_hint":"Bars: fixed costs, variable, savings, free \u2013 share of own income.","overview.outflows_year":"Outflows {year}","overview.insights_link":"Insights","overview.avg":"\xD8 {amount}","overview.max_month":"Most expensive month: {month}","overview.max_month_sub":"{amount} \u2013 {title} {item_amount} {recurrence}","overview.next_special":"Next special payment","overview.next_special_sub":"{title} {amount} on {date} ({recurrence})","overview.next_month_less":"{month} will be calmer","overview.next_month_more":"{month} will be heavier","overview.next_month_same":"{month} looks the same","overview.next_month_sub_less":"{amount} due \u2013 {delta} less than in {month}","overview.next_month_sub_more":"{amount} due \u2013 {delta} more than in {month}","overview.next_month_sub_same":"{amount} due","overview.up_next":"Up next","overview.next_payments":"next payments","overview.tomorrow":"Tomorrow","overview.next_income":"Next income","overview.calendar_link":"Calendar","overview.nothing_due":"Nothing due.","overview.underpaid":"underpaid","overview.overpaid":"overpaid","overview.paid_fair":"paid {paid} \xB7 fair share {fair}","settings.split_rule":"Fair split of shared costs","settings.split_rule.income":"Proportional to income","settings.split_rule.equal":"Equal shares","settings.split_rule_hint":"Decides each member's fair share of the shared costs, and so who pays whom in the settlement.","overview.categories":"By category","overview.category":"Category","overview.empty":"No items yet. Add the first one under Items.","overview.other_currencies":"Items in other currencies are listed separately.","items.title":"Items","items.add":"Add item","items.search":"Search {count} items","items.group_by":"Group by","items.group.category":"Category","items.group.user":"Member","items.group.type":"Type","items.group.none":"None","categories.search":"Search {count} categories","items.filter_type":"Type","items.filter_user":"Member","items.filter_category":"Category","items.col_title":"Title","items.col_amount":"Amount","items.col_recurrence":"Recurrence","items.col_due":"Due","items.col_category":"Category","items.col_user":"Member","items.col_monthly":"Monthly","items.empty":"No items match.","items.col_status":"Status","items.active":"Active","items.inactive":"Inactive","item.title":"Title","item.type":"Type","item.amount":"Amount","item.currency":"Currency","item.category":"Category","item.user":"Paid by","item.user_earning":"Received by","item.recurrence":"Recurrence","item.due_weekday":"Weekday","item.due_day":"Day of month","item.due_month":"First month","item.cost_kind":"Fixed / variable","item.shared":"Shared household cost","item.shared_with":"Shared with","item.shared_everyone":"Everyone","validation.shared_with_payer":"The member who pays must be among the participants.","overview.rule_subset":"Items shared with some members only are split between those members.","item.payment_method":"Payment method","item.start":"Start date","item.end":"End date","item.advanced":"Advanced","item.new":"New item","item.edit":"Edit item","item.delete_confirm":"Delete \u201C{title}\u201D?","item.amount_invalid":"Enter an amount like 12.50.","calendar.month":"Month","calendar.list":"List","calendar.today":"Today","calendar.nav_previous":"Previous month","calendar.nav_next":"Next month","calendar.out_in":"Out in {month}","calendar.in_in":"In in {month}","calendar.payments_note":"{count} payments \xB7 {amount} on the 1st","calendar.from_day":"from the {day}.","calendar.no_income":"no income","calendar.lowest":"Lowest balance","calendar.lowest_note":"on the {day}., before the first income","calendar.opening_note":"on the {day}. \xB7 {opening} carried over from last month","calendar.cashflow":"Cash flow in {month}","calendar.cashflow_hint":"balance since the 1st, starting with what last month's income left","calendar.low_title":"Lowest point on the {day}.: {amount}","calendar.low_sub":"This much goes out before the first income on the {day}. \u2013 the account needs this buffer at the start of the month. Month end: {amount}.","calendar.no_minus":"Lowest point on the {day}.: {amount}","calendar.no_minus_sub":"Last month's income left {opening}, enough for every payment before this month's income. Month end: {amount}.","calendar.no_income_sub":"No money comes in this month.","calendar.day_total":"Day total","calendar.no_payments_day":"No payments on this day.","calendar.next":"Next","calendar.next_hint":"next payments","calendar.nothing_more":"Nothing more this month.","calendar.ha_title":"In Home Assistant's calendar","calendar.ha_text":"Every payment is also in {entity} and in one calendar per member \u2013 for automations and the calendar card.","calendar.open_ha":"Open calendar","calendar.more":"+{count}","calendar.unscheduled":"Not placeable (no due month)","calendar.mark_paid":"Mark paid","calendar.mark_unpaid":"Mark unpaid","insights.title":"Insights","insights.year":"Year","insights.savings_rate":"Savings rate","insights.fixed_cost_rate":"Fixed cost rate","insights.avg_month":"Average month","insights.max_month":"Most expensive month","insights.min_month":"Cheapest month","insights.top_expenses":"Largest expenses","insights.payment_calendar":"Payment calendar {year}","insights.payment_calendar_hint":"Actual outflows per month, not normalized.","insights.unscheduled":"Not placeable: these items have no due month.","insights.no_member":"Pick a member.","categories.title":"Categories","categories.add":"Add category","categories.name":"Name","categories.color":"Colour","categories.icon":"Icon","categories.items":"{count} items","categories.in_use":"In use by {count} items; delete or move them first.","categories.delete_confirm":"Delete category \u201C{name}\u201D?","categories.new":"New category","categories.edit":"Edit category","validation.required":"Required","validation.amount":"Enter an amount like 12.50.","validation.due_day":"Enter a day from 1 to {max}.","validation.end_before_start":"The end date is before the start date.","errors.not_found":"Not found.","errors.invalid":"Invalid input: {message}","errors.in_use":"Still in use."};var _5={en:t2,de:T2};function B5(M){return(M?.locale?.language??M?.language??"en").toLowerCase().split("-")[0]}function r(M,V,C){let H=_5[B5(M)]?.[V]??t2[V];if(C)for(let[L,t]of Object.entries(C))H=H.replaceAll(`{${L}}`,String(t));return H}var F2="M12,5A3.5,3.5 0 0,0 8.5,8.5A3.5,3.5 0 0,0 12,12A3.5,3.5 0 0,0 15.5,8.5A3.5,3.5 0 0,0 12,5M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M5.5,8A2.5,2.5 0 0,0 3,10.5C3,11.44 3.53,12.25 4.29,12.68C4.65,12.88 5.06,13 5.5,13C5.94,13 6.35,12.88 6.71,12.68C7.08,12.47 7.39,12.17 7.62,11.81C6.89,10.86 6.5,9.7 6.5,8.5C6.5,8.41 6.5,8.31 6.5,8.22C6.2,8.08 5.86,8 5.5,8M18.5,8C18.14,8 17.8,8.08 17.5,8.22C17.5,8.31 17.5,8.41 17.5,8.5C17.5,9.7 17.11,10.86 16.38,11.81C16.5,12 16.63,12.15 16.78,12.3C16.94,12.45 17.1,12.58 17.29,12.68C17.65,12.88 18.06,13 18.5,13C18.94,13 19.35,12.88 19.71,12.68C20.47,12.25 21,11.44 21,10.5A2.5,2.5 0 0,0 18.5,8M12,14C9.66,14 5,15.17 5,17.5V19H19V17.5C19,15.17 14.34,14 12,14M4.71,14.55C2.78,14.78 0,15.76 0,17.5V19H3V17.07C3,16.06 3.69,15.22 4.71,14.55M19.29,14.55C20.31,15.22 21,16.06 21,17.07V19H24V17.5C24,15.76 21.22,14.78 19.29,14.55M12,16C13.53,16 15.24,16.5 16.23,17H7.77C8.76,16.5 10.47,16 12,16Z";var R2="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z";var i2="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z";var $2="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z";var E2="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z";var D2="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3M19 19H5V9H19V19M19 7H5V5H19V7Z";var I2="M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z";var N2="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z";var W2="M19 19H5V8H19M16 1V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3H18V1M10.88 12H7.27L10.19 14.11L9.08 17.56L12 15.43L14.92 17.56L13.8 14.12L16.72 12H13.12L12 8.56L10.88 12Z";var G2="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z";var U2="M9 17H7V10H9V17M13 17H11V7H13V17M17 17H15V13H17V17M19 19H5V5H19V19.1M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z";var z2="M3,14L3.5,14.07L8.07,9.5C7.89,8.85 8.06,8.11 8.59,7.59C9.37,6.8 10.63,6.8 11.41,7.59C11.94,8.11 12.11,8.85 11.93,9.5L14.5,12.07L15,12C15.18,12 15.35,12 15.5,12.07L19.07,8.5C19,8.35 19,8.18 19,8A2,2 0 0,1 21,6A2,2 0 0,1 23,8A2,2 0 0,1 21,10C20.82,10 20.65,10 20.5,9.93L16.93,13.5C17,13.65 17,13.82 17,14A2,2 0 0,1 15,16A2,2 0 0,1 13,14L13.07,13.5L10.5,10.93C10.18,11 9.82,11 9.5,10.93L4.93,15.5L5,16A2,2 0 0,1 3,18A2,2 0 0,1 1,16A2,2 0 0,1 3,14Z";var _1="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";var B1="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";var P1="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z";var T1="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";var Q2="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";var F1="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";var R1="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z";var K2="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z";var $1="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";var q2="M15 10C15 9.45 15.45 9 16 9C16.55 9 17 9.45 17 10S16.55 11 16 11 15 10.55 15 10M8 9H13V7H8V9M22 7.5V14.47L19.18 15.41L17.5 21H12V19H10V21H4.5C4.5 21 2 12.54 2 9.5S4.46 4 7.5 4H12.5C13.41 2.79 14.86 2 16.5 2C17.33 2 18 2.67 18 3.5C18 3.71 17.96 3.9 17.88 4.08C17.74 4.42 17.62 4.81 17.56 5.23L19.83 7.5H22M20 9.5H19L15.5 6C15.5 5.35 15.59 4.71 15.76 4.09C14.79 4.34 14 5.06 13.67 6H7.5C5.57 6 4 7.57 4 9.5C4 11.38 5.22 16.15 6 19H8V17H14V19H16L17.56 13.85L20 13.03V9.5Z";var E1="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";var j2="M11,13.5V21.5H3V13.5H11M9,15.5H5V19.5H9V15.5M12,2L17.5,11H6.5L12,2M12,5.86L10.08,9H13.92L12,5.86M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13M17.5,15A2.5,2.5 0 0,0 15,17.5A2.5,2.5 0 0,0 17.5,20A2.5,2.5 0 0,0 20,17.5A2.5,2.5 0 0,0 17.5,15Z";var D1="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z";var Y2="M16,18L18.29,15.71L13.41,10.83L9.41,14.83L2,7.41L3.41,6L9.41,12L13.41,8L19.71,14.29L22,12V18H16Z";var a2="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z";var X2="M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z";var J2="M3 11H11V3H3M5 5H9V9H5M13 21H21V13H13M15 15H19V19H15M3 21H11V13H3M5 15H9V19H5M13 3V11H21V3M19 9H15V5H19Z";var o2="M5,3C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V16.72C21.59,16.37 22,15.74 22,15V9C22,8.26 21.59,7.63 21,7.28V5A2,2 0 0,0 19,3H5M5,5H19V7H13A2,2 0 0,0 11,9V15A2,2 0 0,0 13,17H19V19H5V5M13,9H20V15H13V9M16,10.5A1.5,1.5 0 0,0 14.5,12A1.5,1.5 0 0,0 16,13.5A1.5,1.5 0 0,0 17.5,12A1.5,1.5 0 0,0 16,10.5Z";var C5=[{id:"overview",iconPath:X2},{id:"items",iconPath:R1},{id:"calendar",iconPath:N2},{id:"insights",iconPath:U2},{id:"settings",iconPath:Q2}],I1="/pro-budget";function A2(M){let V=M?.path?.replace(/^\//,"").split("/")[0]??"";return V==="categories"&&(V="settings"),C5.some(C=>C.id===V)?V:"overview"}function H5(M,V){d2(n2(M,V))}function d2(M){history.pushState(null,"",M),window.dispatchEvent(new CustomEvent("location-changed"))}function n2(M,V){return`${M?.prefix??I1}/${V}`}function z(M,V){let C=V?.prefix??I1;return C5.map(H=>({path:`${C}/${H.id}`,name:r(M,`nav.${H.id}`),iconPath:H.iconPath}))}function a1(M){return a`
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
  `}var _=Z`
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
`,N1=Z`
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
      /* The month switcher: a pill with the chevrons and the month inside, like a segmented control. */
      .period {
        display: inline-flex;
        align-items: center;
        height: 36px;
        padding: 0 2px;
        border-radius: 18px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        box-sizing: border-box;
      }
      .period ha-icon-button {
        --ha-icon-button-size: 32px;
        --ha-icon-button-padding-inline: 0;
        --mdc-icon-size: 20px;
        color: var(--secondary-text-color);
      }
      .period .title {
        min-width: 130px;
        padding: 0 4px;
        text-align: center;
      }
      .period .month {
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
      }
      .toolbar .today-hint {
        color: var(--secondary-text-color);
        font-size: 13px;
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
        flex-wrap: wrap;
        gap: 4px 10px;
      }
      .head h2 {
        white-space: nowrap;
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
        --ha-icon-button-size: 36px;
        --ha-icon-button-padding-inline: 0;
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
`;function P5(M,V){return M?.localize("ui.common.error_required")||`${V} is required`}function Q(M,V){let C=!!V.error&&!!V.touched;return a`
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
      .validationMessage=${V.error??P5(M,V.label)}
      @input=${H=>V.onChange(H.target.value)}
      @change=${H=>V.onChange(H.target.value)}
    >
      ${V.suffix?a`<span slot="end">${V.suffix}</span>`:p}
    </ha-input>
  `}function N(M,V){return a`
    <ha-selector
      .hass=${M}
      .label=${V.label}
      .required=${V.required??!1}
      .selector=${{select:{mode:"dropdown",options:V.options}}}
      .value=${V.value==null?void 0:String(V.value)}
      @value-changed=${C=>V.onChange(C.detail.value)}
    ></ha-selector>
  `}function J(M,V){return a`
    <ha-selector
      .hass=${M}
      .label=${V.label}
      .required=${V.required??!1}
      .selector=${V.selector}
      .value=${V.value}
      @value-changed=${C=>V.onChange(C.detail.value)}
    ></ha-selector>
  `}var o1=`
  .fields { display: flex; flex-direction: column; gap: 16px; }
  ha-expansion-panel { --expansion-panel-content-padding: 0 12px 12px; }
  ha-expansion-panel .fields { padding-top: 12px; }
`;function j(M){return M?.locale?.language??M?.language??"en"}var V5=new Map;function g(M,V,C){let H=`${j(M)}|${C}`,L=V5.get(H);if(!L){try{L=new Intl.NumberFormat(j(M),{style:"currency",currency:C})}catch{L=new Intl.NumberFormat(j(M),{minimumFractionDigits:2})}V5.set(H,L)}return L.format(V/100)}function B(M,V,C,H){let L=g(M,Math.abs(V),C);return H?`\u2212${L}`:`+${L}`}function L5(M,V){let C=Math.abs(V)/100,H=C>=1e4?new Intl.NumberFormat(j(M),{notation:"compact",maximumFractionDigits:1}).format(C):new Intl.NumberFormat(j(M),{maximumFractionDigits:0}).format(C);return(V<0?"\u2212":"+")+H}function W(M,V){return V===null?"\u2014":new Intl.NumberFormat(j(M),{style:"percent",maximumFractionDigits:1}).format(V)}function R(M){let V=M.getFullYear(),C=String(M.getMonth()+1).padStart(2,"0"),H=String(M.getDate()).padStart(2,"0");return`${V}-${C}-${H}`}function A1(M){let[V,C,H]=M.split("-").map(Number);return new Date(V,C-1,H)}function K(M,V,C){return new Intl.DateTimeFormat(j(M),C).format(A1(V))}function f(M,V,C="long"){return new Intl.DateTimeFormat(j(M),{month:C}).format(new Date(2026,V-1,1))}function d1(M,V,C="long"){return new Intl.DateTimeFormat(j(M),{weekday:C}).format(new Date(2026,5,V))}function p2(M){let V=M.trim().replace(/\s/g,"");if(!V)return null;let C=V.lastIndexOf(","),H=V.lastIndexOf("."),L;return C>H?L=V.replace(/\./g,"").replace(",","."):H>C?L=V.replace(/,/g,""):L=V,/^\d+(\.\d{1,2})?$/.test(L)?Math.round(Number(L)*100):null}function M5(M){return(M/100).toFixed(2)}var e5=["earning","expense","saving"],r5=["daily","weekly","biweekly","monthly","quarterly","semi_annually","annually"],t5=["fixed","variable"],i5=["direct_debit","standing_order","manual","credit_card","paypal"],W1=["quarterly","semi_annually","annually"],a5=["income","equal"];function T5(M,V,C){return M?{title:M.title,type:M.type,amount:M5(M.amount),currency:M.currency??"",category_id:M.category_id,user_id:M.user_id,recurrence:M.recurrence,due_day:M.due_day??void 0,due_month:M.due_month??void 0,cost_kind:M.cost_kind,shared:M.shared,shared_with:M.shared_with??[],payment_method:M.payment_method??"",start:M.start??void 0,end:M.end??void 0}:{type:"expense",recurrence:"monthly",due_day:1,cost_kind:"fixed",shared:!1,shared_with:[],category_id:V.categories[0]?.id,user_id:C??V.users[0]?.id,amount:""}}var $=class extends u{constructor(){super(...arguments);this._open=!1;this._data={};this._error="";this._saving=!1;this._touched=new Set;this._onClosed=C=>{C.target===this.renderRoot.querySelector("ha-dialog")&&this._close()}}open(C){this.budget&&(this._item=C,this._data=T5(C,this.budget,this.hass?.user?.id),this._error="",this._touched=new Set,this._open=!0)}_close(){this._open=!1}_set(C,H){this._touched=new Set([...this._touched,C]),this._data={...this._data,[C]:H}}get _errors(){let C=this._data,H=this.hass,L={};String(C.title??"").trim()||(L.title=r(H,"validation.required")),p2(String(C.amount??""))===null&&(L.amount=r(H,"validation.amount")),C.category_id||(L.category_id=r(H,"validation.required")),C.user_id||(L.user_id=r(H,"validation.required"));let t=String(C.recurrence??"");if(t!=="daily"){let e=Number(C.due_day),d=t==="weekly"||t==="biweekly"?7:31;(C.due_day==null||C.due_day===""||!Number.isInteger(e)||e<1||e>d)&&(L.due_day=r(H,"validation.due_day",{max:d}))}return W1.includes(t)&&!C.due_month&&(L.due_month=r(H,"validation.required")),C.start&&C.end&&String(C.start)>String(C.end)&&(L.end=r(H,"validation.end_before_start")),L}_fields(){let C=this._data,H=C.recurrence,L=W1.includes(H);return{title:String(C.title??"").trim(),type:C.type,amount:p2(String(C.amount??""))??0,currency:C.currency?String(C.currency).toUpperCase():null,category_id:String(C.category_id??""),user_id:String(C.user_id??""),recurrence:H,due_day:H==="daily"||C.due_day==null||C.due_day===""?null:Number(C.due_day),due_month:L&&C.due_month?Number(C.due_month):null,cost_kind:C.cost_kind??"fixed",shared:!!C.shared,shared_with:this._participants(),payment_method:C.payment_method?C.payment_method:null,start:C.start?String(C.start):null,end:C.end?String(C.end):null}}_participants(){let C=this._data;if(!C.shared)return null;let H=C.shared_with??[],L=this.budget.users.map(t=>t.id);return H.length===0||L.every(t=>H.includes(t))?null:H}async _save(){if(!Object.keys(this._errors).length){this._saving=!0,this._error="";try{this._item?await S.updateItem(this.hass,this._item.id,this._fields()):await S.createItem(this.hass,this._fields()),this._close()}catch(C){this._error=h1(this.hass,C)}finally{this._saving=!1}}}_renderFields(){let C=this.hass,H=this.budget,L=this._data,t=this._errors,e=i=>this._touched.has(i),d=(i,x)=>i.map(c=>({value:c,label:r(C,`${x}.${c}`)})),o=String(L.recurrence??""),m=o==="weekly"||o==="biweekly",A=W1.includes(o);return a`
      <div class="fields">
        ${Q(C,{label:r(C,"item.title"),value:L.title,required:!0,autofocus:!0,error:t.title,touched:e("title"),onChange:i=>this._set("title",i)})}
        ${N(C,{label:r(C,"item.type"),value:L.type,required:!0,options:d(e5,"type"),onChange:i=>this._set("type",i)})}
        ${Q(C,{label:r(C,"item.amount"),value:L.amount,required:!0,suffix:H.config.currency,error:t.amount,touched:e("amount"),onChange:i=>this._set("amount",i)})}
        ${N(C,{label:r(C,"item.cost_kind"),value:L.cost_kind,options:d(t5,"cost_kind"),onChange:i=>this._set("cost_kind",i)})}
        ${N(C,{label:r(C,"item.category"),value:L.category_id,required:!0,options:H.categories.map(i=>({value:i.id,label:i.name})),onChange:i=>this._set("category_id",i)})}
        ${N(C,{label:r(C,L.type==="earning"?"item.user_earning":"item.user"),value:L.user_id,required:!0,options:H.users.map(i=>({value:i.id,label:i.name})),onChange:i=>this._set("user_id",i)})}
        ${N(C,{label:r(C,"item.recurrence"),value:L.recurrence,required:!0,options:d(r5,"recurrence"),onChange:i=>this._set("recurrence",i)})}
        ${m?N(C,{label:r(C,"item.due_weekday"),value:L.due_day,required:!0,options:[1,2,3,4,5,6,7].map(i=>({value:String(i),label:d1(C,i)})),onChange:i=>this._set("due_day",i)}):o==="daily"?p:Q(C,{label:r(C,"item.due_day"),value:L.due_day,required:!0,type:"number",min:1,max:31,error:t.due_day,touched:e("due_day"),onChange:i=>this._set("due_day",i)})}
        ${A?N(C,{label:r(C,"item.due_month"),value:L.due_month,required:!0,options:Array.from({length:12},(i,x)=>({value:String(x+1),label:f(C,x+1)})),onChange:i=>this._set("due_month",i)}):p}
        ${J(C,{label:r(C,"item.shared"),value:!!L.shared,selector:{boolean:{}},onChange:i=>this._set("shared",!!i)})}
        ${L.shared&&H.users.length>2?a`
              <div>
                ${J(C,{label:r(C,"item.shared_with"),value:(L.shared_with??[]).length?L.shared_with:H.users.map(i=>i.id),selector:{select:{multiple:!0,mode:"list",options:H.users.map(i=>({value:i.id,label:i.name}))}},onChange:i=>this._set("shared_with",Array.isArray(i)?i:[])})}
                ${t.shared_with&&e("shared_with")?a`<ha-alert alert-type="error">${t.shared_with}</ha-alert>`:p}
              </div>
            `:p}
        <ha-expansion-panel outlined .header=${r(C,"item.advanced")}>
          <div class="fields">
            ${N(C,{label:r(C,"item.payment_method"),value:L.payment_method||"",options:[{value:"",label:r(C,"common.none")},...d(i5,"payment")],onChange:i=>this._set("payment_method",i)})}
            ${Q(C,{label:r(C,"item.currency"),value:L.currency,onChange:i=>this._set("currency",i)})}
            ${J(C,{label:r(C,"item.start"),value:L.start,selector:{date:{}},onChange:i=>this._set("start",i)})}
            ${J(C,{label:r(C,"item.end"),value:L.end,selector:{date:{}},onChange:i=>this._set("end",i)})}
            ${t.end&&e("end")?a`<ha-alert alert-type="error">${t.end}</ha-alert>`:p}
          </div>
        </ha-expansion-panel>
      </div>
    `}render(){return!this._open||!this.budget?p:a1({heading:r(this.hass,this._item?"item.edit":"item.new"),sticky:!0,onClosed:this._onClosed,content:a`
        ${this._error?a`<ha-alert alert-type="error">${this._error}</ha-alert>`:p}
        ${this._renderFields()}
      `,actions:[{label:r(this.hass,"common.cancel"),onClick:()=>this._close()},{label:r(this.hass,"common.save"),primary:!0,disabled:this._saving||Object.keys(this._errors).length>0,onClick:()=>this._save()}]})}};$.styles=[_,Y(o1),Z`
      ha-alert {
        display: block;
        margin-bottom: 12px;
      }
    `],n([l({attribute:!1})],$.prototype,"hass",2),n([l({attribute:!1})],$.prototype,"budget",2),n([v()],$.prototype,"_item",2),n([v()],$.prototype,"_open",2),n([v()],$.prototype,"_data",2),n([v()],$.prototype,"_error",2),n([v()],$.prototype,"_saving",2),n([v()],$.prototype,"_touched",2),$=n([O("pro-budget-item-dialog")],$);function h1(M,V){if(V instanceof S1){if(V.code==="not_found")return r(M,"errors.not_found");if(V.code==="in_use")return r(M,"errors.in_use");if(V.code==="invalid")return r(M,"errors.invalid",{message:V.message})}return r(M,"common.error",{error:String(V?.message??V)})}var G=class extends u{constructor(){super(...arguments);this._open=!1;this._data={};this._error="";this._touched=!1;this._onClosed=C=>{C.target===this.renderRoot.querySelector("ha-dialog")&&this._close()}}open(C){this._category=C,this._data=C?{name:C.name,icon:C.icon??void 0,color:C.color??void 0}:{},this._error="",this._touched=!1,this._open=!0}_close(){this._open=!1}get _nameError(){return String(this._data.name??"").trim()?void 0:r(this.hass,"validation.required")}async _save(){if(this._nameError)return;let C={name:String(this._data.name??"").trim(),icon:this._data.icon||null,color:this._data.color||null};try{this._category?await S.updateCategory(this.hass,this._category.id,C):await S.createCategory(this.hass,C),this._close()}catch(H){this._error=h1(this.hass,H)}}render(){if(!this._open)return p;let C=this.hass;return a1({heading:r(C,this._category?"categories.edit":"categories.new"),onClosed:this._onClosed,content:a`
        ${this._error?a`<ha-alert alert-type="error">${this._error}</ha-alert>`:p}
        <div class="fields">
          ${Q(C,{label:r(C,"categories.name"),value:this._data.name,required:!0,autofocus:!0,error:this._nameError,touched:this._touched,onChange:H=>{this._touched=!0,this._data={...this._data,name:H}}})}
          ${J(C,{label:r(C,"categories.icon"),value:this._data.icon,selector:{icon:{}},onChange:H=>this._data={...this._data,icon:H}})}
          ${J(C,{label:r(C,"categories.color"),value:this._data.color,selector:{ui_color:{}},onChange:H=>this._data={...this._data,color:H}})}
        </div>
      `,actions:[{label:r(C,"common.cancel"),onClick:()=>this._close()},{label:r(C,"common.save"),primary:!0,disabled:!!this._nameError,onClick:()=>this._save()}]})}};G.styles=[_,Y(o1),Z`
      ha-alert {
        display: block;
        margin-bottom: 12px;
      }
    `],n([l({attribute:!1})],G.prototype,"hass",2),n([v()],G.prototype,"_category",2),n([v()],G.prototype,"_open",2),n([v()],G.prototype,"_data",2),n([v()],G.prototype,"_error",2),n([v()],G.prototype,"_touched",2),G=n([O("pro-budget-category-dialog")],G);var C1=class extends u{constructor(){super(...arguments);this._text="";this._open=!1;this._onClosed=C=>{C.target===this.renderRoot.querySelector("ha-dialog")&&this._close(!1)}}open(C){return this._text=C,this._open=!0,new Promise(H=>this._resolve=H)}_close(C){this._open=!1,this._resolve?.(C),this._resolve=void 0}render(){return this._open?a1({heading:this._text,content:a``,onClosed:this._onClosed,actions:[{label:r(this.hass,"common.cancel"),onClick:()=>this._close(!1)},{label:r(this.hass,"common.delete"),primary:!0,danger:!0,onClick:()=>this._close(!0)}]}):a``}};C1.styles=Z`
    ha-dialog {
      --mdc-dialog-min-width: 320px;
    }
  `,n([l({attribute:!1})],C1.prototype,"hass",2),n([v()],C1.prototype,"_text",2),n([v()],C1.prototype,"_open",2),C1=n([O("pro-budget-confirm")],C1);function o5(M,V="var(--secondary-text-color)"){return M?M==="primary"?"var(--primary-color)":M==="accent"?"var(--accent-color)":`var(--${M}-color)`:V}var G1=["purple","blue","teal","orange","pink","indigo","green","deep-orange"];function A5(M){return o5(G1[(M%G1.length+G1.length)%G1.length])}function n1(M,V,C=32,H=!1){let L=H?"var(--text-primary-color, #fff)":V,t=H?V:`color-mix(in srgb, ${V} 20%, transparent)`;return a`
    <span
      class="avatar"
      style="display: inline-flex; align-items: center; justify-content: center; flex: none; width: ${C}px; height: ${C}px; border-radius: 50%; font-size: ${Math.round(C*.42)}px; font-weight: 600; line-height: 1; color: ${L}; background: ${t}"
      >${M.slice(0,1).toUpperCase()}</span
    >
  `}function E(M,V="m"){if(!M?.icon)return a``;let C=o5(M.color),H={xs:22,s:28,m:36}[V],L={xs:13,s:16,m:20}[V];return a`
    <span
      style="display: inline-flex; align-items: center; justify-content: center; flex: none; width: ${H}px; height: ${H}px; border-radius: 50%; vertical-align: middle; color: ${C}; background: color-mix(in srgb, ${C} 20%, transparent)"
    >
      <ha-icon
        .icon=${M.icon}
        style="--mdc-icon-size: ${L}px; display: flex; line-height: 0; margin: 0; width: ${L}px; height: ${L}px"
      ></ha-icon>
    </span>
  `}function g1(M,V){return A5(Math.max(0,M.users.findIndex(C=>C.id===V)))}function p1(M,V,C,H,L){if(V.users.length<2)return p;let t=d=>C===d||!H.all&&!C&&d===M?.user?.id,e=(d,o,m,A)=>a`
    <button class="chip" aria-pressed=${A} style="--chip-color: ${m}" @click=${()=>L(d)}>
      ${n1(d?o:"\u03A3",m,24,A)}
      <span>${o}</span>
    </button>
  `;return a`
    <div class="members chips">
      ${H.all?e("",r(M,"common.all"),"var(--primary-color)",C===""):p}
      ${V.users.map(d=>e(d.id,d.name,g1(V,d.id),t(d.id)))}
    </div>
  `}var F5=6,m2=3,R5=5e4,$5=150,E5="calendar.pro_budget_payments",y=class extends u{constructor(){super(...arguments);this.userId="";this.narrow=!1;this._year=new Date().getFullYear();this._month=new Date().getMonth()+1;this._selected=R(new Date);this._view="month"}updated(C){["budget","userId","_year","_month"].some(H=>C.has(H))&&this._load()}async _load(){!this.hass||!this.budget||(this._data=await S.calendar(this.hass,this._year,this._month,this.userId||void 0))}_shift(C){let H=new Date(this._year,this._month-1+C,1);this._year=H.getFullYear(),this._month=H.getMonth()+1;let L=new Date(this._year,this._month,0).getDate();this._selected=R(new Date(this._year,this._month-1,Math.min(A1(this._selected).getDate(),L)))}_today(){let C=new Date;this._year=C.getFullYear(),this._month=C.getMonth()+1,this._selected=R(C)}_iso(C){return R(new Date(this._year,this._month-1,C))}_item(C){return this.budget?.items.find(H=>H.id===C)}_user(C){return this.budget?.users.find(H=>H.id===C)?.name??r(this.hass,"common.unknown_user")}_entries(C){return C?.date?C.entries.flatMap(H=>{let L=this._item(H.item_id);return L?[{item:L,date:C.date,paid:H.paid}]:[]}):[]}_byDate(){return new Map((this._data?.days??[]).filter(C=>C.date).map(C=>[C.date,this._entries(C)]))}_signed(C){return C.item.type==="earning"?C.item.amount:-C.item.amount}_net(C){return C.reduce((H,L)=>H+this._signed(L),0)}async _togglePaid(C){await S.setPaid(this.hass,C.item.id,C.date,!C.paid),await this._load()}_select(C){this._selected=C}_frame(C){let H=this.hass,L=p1(H,this.budget,this.userId,{all:!0},e=>this.dispatchEvent(new CustomEvent("user-changed",{detail:{userId:e},bubbles:!0,composed:!0}))),t=[["month",J2,"calendar.month"],["list",R1,"calendar.list"]];return a`
      <hass-tabs-subpage .hass=${H} .narrow=${this.narrow} .route=${this.route} .tabs=${z(H,this.route)} main-page>
        <div class="toolbar">
          <div class="period">
            <ha-icon-button .label=${r(H,"calendar.nav_previous")} .path=${P1} @click=${()=>this._shift(-1)}></ha-icon-button>
            <div class="title"><span class="month">${K(H,this._iso(1),{month:"long",year:"numeric"})}</span></div>
            <ha-icon-button .label=${r(H,"calendar.nav_next")} .path=${T1} @click=${()=>this._shift(1)}></ha-icon-button>
          </div>
          <button class="chip" @click=${()=>this._today()}>${r(H,"calendar.today")}</button>
          <div class="segment" role="group">
            ${t.map(([e,d,o])=>a`
                <button aria-pressed=${this._view===e} @click=${()=>this._view=e}>
                  <ha-svg-icon .path=${d}></ha-svg-icon>${r(H,o)}
                </button>
              `)}
          </div>
          ${L}
        </div>
        ${C}
      </hass-tabs-subpage>
    `}render(){if(!this.budget)return p;let C=this.hass,H=this._data;if(!H)return this._frame(a`<div class="cards"><ha-card><div class="empty">${r(C,"common.loading")}</div></ha-card></div>`);let L=this._byDate(),t=H.days.find(e=>e.date===null);return this._frame(a`
      <div class="cards">
        ${this._tiles(H)}
        <div class="dashboard">
          <div class="col">
            ${this._view==="month"?this._grid(L):this._list(L)}
            ${t?a`<p class="small muted" style="margin:0">${r(C,"calendar.unscheduled")}: ${t.entries.map(e=>this._item(e.item_id)?.title).join(", ")}</p>`:p}
            ${this._flow(H)}
          </div>
          <div class="col">${this._selectedDay(L)} ${this._next(L)} ${this._haCard()}</div>
        </div>
      </div>
    `)}_tiles(C){let H=this.hass,L=this.budget.config.currency,t=m=>g(H,m,L),e=C.flow,d=f(H,this._month),o=(m,A,i,x,c,b)=>a`
      <ha-card class="tile">
        <span class="disc" style="color:${A}; background: color-mix(in srgb, ${A} 20%, transparent)"><ha-svg-icon .path=${m}></ha-svg-icon></span>
        <div class="col-text">
          <span class="small muted" style="font-size:13px">${i}</span>
          <span class="num value ${c}">${x}</span>
          <span class="small muted">${b}</span>
        </div>
      </ha-card>
    `;return a`
      <div class="tiles">
        ${o(i2,"var(--orange-color)",r(H,"calendar.out_in",{month:d}),B(H,e.outflow,L,!0),"",r(H,"calendar.payments_note",{count:e.outflow_count,amount:t(e.first_day_outflow)}))}
        ${o(E2,"var(--success-color)",r(H,"calendar.in_in",{month:d}),B(H,e.income,L,!1),"good",e.first_income_day?r(H,"calendar.from_day",{day:e.first_income_day}):r(H,"calendar.no_income"))}
        ${o(Y2,"var(--deep-orange-color)",r(H,"calendar.lowest"),B(H,e.low_balance,L,e.low_balance<0),e.low_balance<0?"warn":"",e.low_balance<0?r(H,"calendar.lowest_note",{day:e.low_day}):r(H,"calendar.opening_note",{day:e.low_day,opening:t(e.opening)}))}
      </div>
    `}_grid(C){let H=this.hass,L=R(new Date),e=(new Date(this._year,this._month-1,1).getDay()+6)%7,d=new Date(this._year,this._month,0).getDate(),o=new Date(this._year,this._month-1,0).getDate(),m=[];for(let A=e;A>0;A--)m.push({day:o-A+1,iso:null});for(let A=1;A<=d;A++)m.push({day:A,iso:this._iso(A)});for(let A=1;m.length%7;A++)m.push({day:A,iso:null});return a`
      <ha-card style="padding:12px; gap:6px">
        <div class="weekdays">${[1,2,3,4,5,6,7].map(A=>a`<span>${d1(H,A,"short")}</span>`)}</div>
        <div class="grid">
          ${m.map(A=>{if(!A.iso)return a`<div class="cell outside"><span class="top"><span class="daynum muted">${A.day}</span></span></div>`;let i=C.get(A.iso)??[],x=this._net(i),c=i.some(T=>T.item.type==="earning"),b=["cell",i.length?"has":"",c?"income":x<=-R5?"heavy":"",A.iso<L?"past":""].join(" ");return a`
              <button class=${b} aria-pressed=${A.iso===this._selected} @click=${()=>this._select(A.iso)}>
                <span class="top">
                  <span class="daynum ${A.iso===L?"today":""}">${A.day}</span>
                  ${i.length?a`<span class="num net ${x>0?"good":""}">${L5(H,x)}</span>`:p}
                </span>
                <span class="icons">
                  ${i.slice(0,m2).map(T=>a`<span title="${T.item.title} ${B(H,T.item.amount,T.item.currency??this.budget.config.currency,T.item.type!=="earning")}">${E(this._category(T.item),"xs")}</span>`)}
                  ${i.length>m2?a`<span class="more">${r(H,"calendar.more",{count:i.length-m2})}</span>`:p}
                </span>
              </button>
            `})}
        </div>
      </ha-card>
    `}_category(C){return this.budget?.categories.find(H=>H.id===C.category_id)}_entry(C,H="m"){let L=this.hass,t=C.item.type!=="earning",e=this.userId?"":`${this._user(C.item.user_id)} \xB7 `;return a`
      <div class="entry ${C.paid?"paid":""}">
        ${E(this._category(C.item),H)}
        <div class="grow col-text">
          <span class="title">${C.item.title}</span>
          <span class="small muted">${e}${r(L,`recurrence.${C.item.recurrence}`)}</span>
        </div>
        <span class="num amount ${C.item.type}">${B(L,C.item.amount,C.item.currency??this.budget.config.currency,t)}</span>
        ${t?a`
              <ha-icon-button
                class="paid-toggle"
                .label=${r(L,C.paid?"calendar.mark_unpaid":"calendar.mark_paid")}
                .path=${C.paid?_1:B1}
                @click=${()=>this._togglePaid(C)}
              ></ha-icon-button>
            `:p}
      </div>
    `}_list(C){let H=this.hass,L=R(new Date),t=[...C.entries()].filter(([,e])=>e.length);return t.length===0?a`<ha-card><div class="empty">${r(H,"calendar.nothing_more")}</div></ha-card>`:a`
      <ha-card style="padding: 8px 16px; gap: 0">
        ${t.map(([e,d])=>a`
            <div class="day ${e<L?"past":""}">
              <div class="when">
                <span class=${e===L?"good":""}>${K(H,e,{weekday:"short"})}</span>
                <span class="daynum ${e===L?"today":""}">${A1(e).getDate()}</span>
              </div>
              <div class="entries">${d.map(o=>this._entry(o,"m"))}</div>
            </div>
          `)}
      </ha-card>
    `}_flow(C){let H=this.hass,L=this.budget.config.currency,t=s=>B(H,s,L,s<0),e=C.flow,d=R(new Date),o=this._iso(1).slice(0,7)===d.slice(0,7)?A1(d).getDate():0,m=Math.max(0,...e.days.map(s=>s.balance)),A=Math.min(0,...e.days.map(s=>s.balance)),i=$5/(m-A||1),x=`${(m*i).toFixed(1)}px`,c=`${(-A*i).toFixed(1)}px`,b=s=>s>=0?`color-mix(in oklch, var(--success-color) ${Math.min(100,Math.round(m?s/m*400:0))}%, var(--warning-color))`:`color-mix(in oklch, var(--error-color) ${Math.round(40+60*(A?s/A:0))}%, var(--warning-color))`,T=e.days.length,w=s=>s===1||s%5===0||s===o||s===T&&(T-1)%5!==0,p5=f(H,this._month),z1,Q1;return e.low_balance<0?(z1=r(H,"calendar.low_title",{day:e.low_day,amount:t(e.low_balance)}),Q1=e.first_income_day?r(H,"calendar.low_sub",{day:e.first_income_day,amount:t(e.end_balance)}):r(H,"calendar.no_income_sub")):(z1=r(H,"calendar.no_minus",{day:e.low_day,amount:t(e.low_balance)}),Q1=r(H,"calendar.no_minus_sub",{opening:t(e.opening),amount:t(e.end_balance)})),a`
      <ha-card>
        <div class="head">
          <ha-svg-icon .path=${z2}></ha-svg-icon>
          <h2>${r(H,"calendar.cashflow",{month:p5})}</h2>
          <span class="hint">${r(H,"calendar.cashflow_hint")}</span>
        </div>
        <div class="flow">
          <div class="zero" style="top:${x}"></div>
          ${e.days.map(s=>{let K1=this._iso(s.day),l2=[s.day<o?"past":"",s.day===e.low_day?"low":"",K1===this._selected?"selected":""].join(" ");return a`
              <button class=${l2} title="${s.day}.: ${t(s.balance)}" @click=${()=>this._select(K1)}>
                <span class="pos" style="height:${x}"><span style="height:${(Math.max(0,s.balance)*i).toFixed(1)}px; background:${b(s.balance)}"></span></span>
                <span class="neg" style="height:${c}"><span style="height:${(Math.max(0,-s.balance)*i).toFixed(1)}px; background:${b(s.balance)}"></span></span>
              </button>
            `})}
        </div>
        <div class="flow-labels">${e.days.map(s=>a`<span class=${s.day===o?"today":""}>${w(s.day)?s.day:""}</span>`)}</div>
        <div class="note-box">
          <span class="disc"><ha-svg-icon .path=${i2}></ha-svg-icon></span>
          <div class="col-text">
            <span style="font-size:13px; font-weight:500">${z1}</span>
            <span class="small muted">${Q1}</span>
          </div>
        </div>
      </ha-card>
    `}_selectedDay(C){let H=this.hass,L=R(new Date),t=C.get(this._selected)??[],e=this._net(t);return a`
      <ha-card class="selected-day" style="gap:10px">
        <div class="head">
          <h2>${K(H,this._selected,{weekday:"long",day:"numeric",month:"long"})}</h2>
          ${this._selected===L?a`<span class="badge">${r(H,"calendar.today")}</span>`:p}
        </div>
        ${t.length?a`
              <div class="col-text">${t.map(d=>this._entry(d))}</div>
              <div class="total">
                <span class="muted">${r(H,"calendar.day_total")}</span>
                <span class="num ${e>0?"good":""}" style="font-weight:600">${B(H,e,this.budget.config.currency,e<0)}</span>
              </div>
            `:a`
              <div class="empty-row">
                <span class="disc"><ha-svg-icon .path=${D2}></ha-svg-icon></span>
                <span>${r(H,"calendar.no_payments_day")}</span>
              </div>
            `}
      </ha-card>
    `}_next(C){let H=this.hass,L=[...C.entries()].filter(([t])=>t>this._selected).flatMap(([,t])=>t).slice(0,F5);return a`
      <ha-card class="next" style="gap:4px">
        <div class="head" style="margin-bottom:6px">
          <h2>${r(H,"calendar.next")}</h2>
          <span class="hint">${r(H,"calendar.next_hint")}</span>
        </div>
        ${L.length===0?a`<span class="small muted">${r(H,"calendar.nothing_more")}</span>`:p}
        ${L.map(t=>a`
            <button class="next-row" @click=${()=>this._select(t.date)}>
              <span class="when">${K(H,t.date,{weekday:"short"})}<b>${A1(t.date).getDate()}</b></span>
              ${E(this._category(t.item),"s")}
              <span class="title">${t.item.title}</span>
              <span class="num ${t.item.type}" style="font-size:13px; font-weight:500; white-space:nowrap">${B(H,t.item.amount,t.item.currency??this.budget.config.currency,t.item.type!=="earning")}</span>
            </button>
          `)}
      </ha-card>
    `}_haCard(){let C=this.hass,H=r(C,"calendar.ha_text",{entity:"\0"}).split("\0");return a`
      <ha-card style="gap:12px">
        <div class="head"><h2>${r(C,"calendar.ha_title")}</h2></div>
        <span class="small muted" style="line-height:17px">${H[0]}<b style="font-weight:500; color: var(--primary-text-color)">${E5}</b>${H[1]}</span>
        <a
          class="link"
          href="/calendar"
          @click=${L=>{L.preventDefault(),d2("/calendar")}}
          >${r(C,"calendar.open_ha")} →</a
        >
      </ha-card>
    `}};y.styles=[_,N1,Z`
      :host {
        display: block;
        height: 100%;
      }
      .toolbar .segment {
        display: flex;
        padding: 3px;
        border-radius: 999px;
        background: var(--tile-background, color-mix(in srgb, var(--primary-text-color) 6%, transparent));
      }
      .segment button {
        height: 30px;
        padding: 0 14px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        font: inherit;
        font-size: 13px;
        font-weight: 500;
        --mdc-icon-size: 16px;
      }
      .segment button[aria-pressed="true"] {
        background: var(--card-background-color);
        color: var(--primary-text-color);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
      }
      .tiles {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 16px;
        margin-bottom: 16px;
      }
      .tile {
        flex-direction: row;
        align-items: center;
        gap: 14px;
        padding: 14px 16px;
      }
      .tile .disc {
        width: 44px;
        height: 44px;
        flex: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        --mdc-icon-size: 22px;
      }
      .tile .value {
        font-size: 22px;
        line-height: 28px;
      }
      /* month grid */
      .weekdays,
      .grid {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 6px;
      }
      .weekdays span {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
        text-align: center;
        padding: 4px 0;
      }
      .cell {
        all: unset;
        box-sizing: border-box;
        min-height: 96px;
        border-radius: 10px;
        padding: 6px 6px 8px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
        overflow: hidden;
        cursor: pointer;
      }
      .cell:focus-visible {
        outline: 2px solid var(--primary-color);
      }
      .cell.outside {
        cursor: default;
        opacity: 0.4;
      }
      .cell.has {
        background: var(--tile-background);
      }
      .cell.income {
        background: color-mix(in srgb, var(--success-color) 10%, transparent);
      }
      .cell.heavy {
        background: color-mix(in srgb, var(--orange-color) 10%, transparent);
      }
      .cell.past > * {
        opacity: 0.55;
      }
      .cell[aria-pressed="true"] {
        box-shadow: inset 0 0 0 2px var(--primary-color);
      }
      .cell .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4px;
      }
      .daynum {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 500;
        flex: none;
      }
      .daynum.today {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        font-weight: 600;
      }
      .cell .net {
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .cell .icons {
        display: flex;
        flex-wrap: wrap;
        gap: 3px;
        margin-top: auto;
      }
      .more {
        height: 22px;
        padding: 0 6px;
        border-radius: 11px;
        background: var(--tile-background);
        color: var(--secondary-text-color);
        font-size: 11px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
      }
      /* list */
      .day {
        display: flex;
        gap: 16px;
        padding: 12px 0;
        border-top: 1px solid var(--divider-color);
      }
      .day:first-of-type {
        border-top: none;
      }
      .day.past {
        opacity: 0.55;
      }
      .day .when {
        width: 56px;
        flex: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 2px;
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
      }
      .day .when .daynum {
        width: 36px;
        height: 36px;
        font-size: 18px;
        font-weight: 400;
        color: var(--primary-text-color);
      }
      .day .when .daynum.today {
        color: var(--text-primary-color, #fff);
      }
      .day .entries {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .entry {
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 4px 0;
      }
      .entry .grow {
        min-width: 0;
      }
      .entry .title {
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .entry .amount {
        font-weight: 500;
        white-space: nowrap;
      }
      .entry.paid > :not(.paid-toggle) {
        opacity: 0.55;
      }
      .entry.paid .title {
        text-decoration: line-through;
      }
      .paid-toggle {
        --ha-icon-button-size: 36px;
        --ha-icon-button-padding-inline: 0;
        margin-right: -8px;
        color: var(--secondary-text-color);
      }
      .entry.paid .paid-toggle {
        color: var(--success-color);
      }
      /* cash flow */
      .flow {
        position: relative;
        display: flex;
        gap: 2px;
        align-items: stretch;
      }
      .flow .zero {
        position: absolute;
        left: 0;
        right: 0;
        border-top: 1px solid var(--secondary-text-color);
        opacity: 0.5;
      }
      .flow button {
        all: unset;
        cursor: pointer;
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        border-radius: 3px;
      }
      .flow button:focus-visible {
        outline: 2px solid var(--primary-color);
      }
      .flow button.selected {
        background: var(--tile-background);
      }
      .flow .pos {
        display: flex;
        align-items: flex-end;
      }
      .flow .neg {
        display: flex;
        align-items: flex-start;
      }
      .flow .pos span {
        width: 100%;
        border-radius: 3px 3px 0 0;
      }
      .flow .neg span {
        width: 100%;
        border-radius: 0 0 3px 3px;
      }
      .flow .past span span {
        opacity: 0.5;
      }
      .flow .low span span {
        box-shadow: inset 0 0 0 2px var(--primary-text-color);
      }
      .flow-labels {
        display: flex;
        gap: 2px;
      }
      .flow-labels span {
        flex: 1;
        min-width: 0;
        text-align: center;
        font-size: 11px;
        color: var(--secondary-text-color);
      }
      .flow-labels span.today {
        color: var(--primary-color);
        font-weight: 600;
      }
      .note-box {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        padding: 10px 12px;
        border-radius: 10px;
        background: var(--tile-background);
      }
      .note-box .disc {
        width: 32px;
        height: 32px;
        flex: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--orange-color);
        background: color-mix(in srgb, var(--orange-color) 20%, transparent);
        --mdc-icon-size: 16px;
      }
      /* right column */
      .badge {
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        padding: 4px 10px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--primary-color) 16%, transparent);
        color: var(--primary-color);
      }
      .total {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid var(--divider-color);
        padding-top: 10px;
        font-size: 13px;
      }
      .next-row {
        all: unset;
        cursor: pointer;
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 6px 0;
        border-radius: 8px;
      }
      .next-row:focus-visible {
        outline: 2px solid var(--primary-color);
      }
      .next-row .when {
        width: 40px;
        flex: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 14px;
        font-size: 11px;
        color: var(--secondary-text-color);
      }
      .next-row .when b {
        font-size: 16px;
        line-height: 20px;
        font-weight: 500;
        color: var(--primary-text-color);
      }
      .next-row .title {
        flex: 1;
        min-width: 0;
        font-size: 13px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .empty-row {
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 8px 0;
        color: var(--secondary-text-color);
      }
      .empty-row .disc {
        width: 40px;
        height: 40px;
        flex: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--tile-background);
      }
      @media (max-width: 600px) {
        .cell {
          min-height: 64px;
          padding: 4px;
        }
        .cell .net {
          display: none;
        }
        .day .when {
          width: 44px;
        }
      }
    `],n([l({attribute:!1})],y.prototype,"hass",2),n([l({attribute:!1})],y.prototype,"budget",2),n([l()],y.prototype,"userId",2),n([l({attribute:!1})],y.prototype,"route",2),n([l({type:Boolean})],y.prototype,"narrow",2),n([v()],y.prototype,"_year",2),n([v()],y.prototype,"_month",2),n([v()],y.prototype,"_selected",2),n([v()],y.prototype,"_view",2),n([v()],y.prototype,"_data",2),y=n([O("pro-budget-calendar")],y);var Y0={daily:365/12,weekly:52/12,biweekly:26/12,monthly:1,quarterly:1/3,semi_annually:1/6,annually:1/12},D5={quarterly:3,semi_annually:6,annually:12};function I5(M,V){let C=D5[M];if(!C)return[];let H=[];for(let L=(V-1)%C;L<12;L+=C)H.push(L+1);return H}function d5(M,V,C){let H=new Date(V,C,0).getDate(),L=`${V}-${String(C).padStart(2,"0")}-01`,t=`${V}-${String(C).padStart(2,"0")}-${String(H).padStart(2,"0")}`;return!(M.start&&M.start>t||M.end&&M.end<L)}function U1(M,V){if(V.recurrence==="daily"||V.due_day===null)return r(M,"common.none");if(V.recurrence==="weekly"||V.recurrence==="biweekly")return d1(M,V.due_day);if(V.due_month===null)return r(M,"due.on_day",{day:V.due_day});if(V.recurrence==="annually")return r(M,"due.on_day_month",{day:V.due_day,month:f(M,V.due_month)});let C=I5(V.recurrence,V.due_month);return C.length===0?r(M,"due.on_day",{day:V.due_day}):r(M,"due.months",{day:V.due_day,months:C.map(H=>f(M,H,"short")).join(", ")})}var I=class extends u{constructor(){super(...arguments);this.userId="";this.narrow=!1;this._year=new Date().getFullYear()}updated(C){["budget","userId","_year"].some(H=>C.has(H))&&this._load()}get _effectiveUser(){return this.userId||this.hass?.user?.id||this.budget?.users[0]?.id||""}async _load(){!this.hass||!this.budget||!this._effectiveUser||(this._insights=await S.insights(this.hass,this._effectiveUser,this._year))}_item(C){return this.budget?.items.find(H=>H.id===C)}_categoryIcon(C){let H=this.budget?.categories.find(L=>L.id===C);return E(H,"s")}_frame(C){let H=p1(this.hass,this.budget,this.userId,{all:!1},L=>this.dispatchEvent(new CustomEvent("user-changed",{detail:{userId:L},bubbles:!0,composed:!0})));return a`
      <hass-tabs-subpage .hass=${this.hass} .narrow=${this.narrow} .route=${this.route} .tabs=${z(this.hass,this.route)} main-page>
        ${H} ${C}
      </hass-tabs-subpage>
    `}render(){if(!this.budget)return p;let C=this.hass,H=this._insights,L=this.budget.config.currency,t=d=>g(C,d,L),e=this.budget.users.find(d=>d.id===this._effectiveUser);return e?this._frame(a`
      <div class="toolbar">
        <strong>${e.name}</strong>
        <span class="spacer"></span>
        <select class="select" .value=${String(this._year)} @change=${d=>this._year=Number(d.target.value)}>
          ${[-1,0,1].map(d=>{let o=new Date().getFullYear()+d;return a`<option value=${o} ?selected=${o===this._year}>${o}</option>`})}
        </select>
      </div>
      ${H?a`
            <div class="grid">
              ${[["insights.savings_rate",W(C,H.savings_rate)],["insights.fixed_cost_rate",W(C,H.fixed_cost_rate)],["insights.avg_month",t(H.avg_month)],["insights.max_month",H.max_month?f(C,H.max_month):r(C,"common.none")]].map(([d,o])=>a`
                  <ha-card>
                    <div class="stat"><span class="label">${r(C,d)}</span><span class="value">${o}</span></div>
                  </ha-card>
                `)}
            </div>
            <ha-card style="margin-top:16px">
              <h2>${r(C,"insights.payment_calendar",{year:this._year})}</h2>
              <p class="muted small">${r(C,"insights.payment_calendar_hint")}</p>
              ${this._renderMonths(H)}
              ${H.unscheduled.length?a`<p class="muted small">${r(C,"insights.unscheduled")} ${H.unscheduled.map(d=>this._item(d)?.title).join(", ")}</p>`:p}
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
            <div class="month ${L.month===C.max_month?"max":L.month===C.min_month?"min":""}" title=${g(this.hass,L.total,this.budget.config.currency)}>
              <span class="total">${L.total?g(this.hass,L.total,this.budget.config.currency):""}</span>
              <div class="col" style="height:${Math.round(L.total/H*100)}%"></div>
              <span class="name">${f(this.hass,L.month,"short")}</span>
            </div>
          `)}
      </div>
    `}_group(C,H,L,t=!0){let e=this.hass;return a`
      <ha-card>
        <h2>${C}</h2>
        ${H.items.length===0?a`<div class="empty">${r(e,"common.none")}</div>`:a`
              <table class="plain">
                <tbody>
                  ${H.items.map(d=>{let o=this._item(d.item_id);return a`
                      <tr>
                        <td>${this._categoryIcon(o?.category_id)} ${o?.title??d.item_id}<br /><span class="muted small">${o?`${r(e,`recurrence.${o.recurrence}`)} \xB7 ${U1(e,o)}`:""}</span></td>
                        <td class="num">${g(e,d.monthly,L)}<span class="muted small"> ${r(e,"common.per_month")}</span></td>
                      </tr>
                    `})}
                  ${t?a`<tr><td><strong>Σ</strong></td><td class="num"><strong>${g(e,H.total,L)}</strong></td></tr>`:p}
                </tbody>
              </table>
            `}
      </ha-card>
    `}};I.styles=[_,Z`
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
    `],n([l({attribute:!1})],I.prototype,"hass",2),n([l({attribute:!1})],I.prototype,"budget",2),n([l()],I.prototype,"userId",2),n([l({attribute:!1})],I.prototype,"route",2),n([l({type:Boolean})],I.prototype,"narrow",2),n([v()],I.prototype,"_year",2),n([v()],I.prototype,"_insights",2),I=n([O("pro-budget-insights")],I);var N5={earning:"mdi:cash-plus",expense:"mdi:cash-minus",saving:"mdi:piggy-bank-outline"},W5={earning:"var(--success-color, #43a047)",expense:"var(--error-color, #db4437)",saving:"var(--info-color, #4a90d9)"},U=class extends u{constructor(){super(...arguments);this.narrow=!1;this._resize=new ResizeObserver(()=>this.requestUpdate())}connectedCallback(){super.connectedCallback(),this._resize.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resize.disconnect()}get _rows(){let C=this.budget,H=this.hass,L=new Date,t=e=>C.users.find(d=>d.id===e)?.name??r(H,"common.unknown_user");return C.items.map(e=>{let d=C.categories.find(o=>o.id===e.category_id);return{id:e.id,item:e,category_icon:{icon:d?.icon??N5[e.type],color:d?.color??null},title:e.title,type:r(H,`type.${e.type}`),amount:e.amount,category:d?.name??"",member:t(e.user_id),currency:e.currency??C.config.currency,recurrence:r(H,`recurrence.${e.recurrence}`),due:U1(H,e),cost:r(H,`cost_kind.${e.cost_kind}`),shared:e.shared?e.shared_with?e.shared_with.map(t).join(", "):r(H,"item.shared_everyone"):r(H,"overview.personal"),status:d5(e,L.getFullYear(),L.getMonth()+1)?r(H,"items.active"):r(H,"items.inactive")}})}get _columns(){let C=this.hass;return{icon:{title:"",type:"icon",showNarrow:!0,moveable:!1,template:H=>E(H.category_icon)},title:{title:r(C,"items.col_title"),main:!0,sortable:!0,filterable:!0,direction:"asc",flex:2,template:H=>a`
          <div style="font-weight: var(--ha-font-weight-medium, 500)">${H.title}</div>
          ${this.narrow?a`<div class="secondary">
                ${[g(C,H.amount,H.currency),H.recurrence,H.due,H.type,H.category,H.member].join(" \xB7 ")}
              </div>`:p}
        `},amount:{title:r(C,"items.col_amount"),type:"numeric",sortable:!0,minWidth:"120px",template:H=>a`<span style="color: ${W5[H.item.type]}">${g(C,H.amount,H.currency)}</span>`},recurrence:{title:r(C,"items.col_recurrence"),sortable:!0,groupable:!0,filterable:!0,minWidth:"120px"},due:{title:r(C,"items.col_due"),filterable:!0,minWidth:"120px"},type:{title:r(C,"items.filter_type"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px"},category:{title:r(C,"items.col_category"),sortable:!0,groupable:!0,filterable:!0,minWidth:"120px"},member:{title:r(C,"items.col_user"),sortable:!0,groupable:!0,filterable:!0,minWidth:"120px"},status:{title:r(C,"items.col_status"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px",defaultHidden:!0},cost:{title:r(C,"item.cost_kind"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px",defaultHidden:!0},shared:{title:r(C,"item.shared"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px",defaultHidden:!0},actions:{title:"",type:"overflow-menu",showNarrow:!0,moveable:!1,template:H=>a`
          <ha-icon-overflow-menu .hass=${C} .narrow=${this.narrow} .items=${this._menu(H.item)}></ha-icon-overflow-menu>
        `}}}_menu(C){return[{path:$1,label:r(this.hass,"common.edit"),action:()=>this._dialog.open(C)},{path:F1,label:r(this.hass,"common.delete"),warning:!0,action:()=>{this._delete(C)}}]}async _delete(C){await this._confirm.open(r(this.hass,"item.delete_confirm",{title:C.title}))&&await S.deleteItem(this.hass,C.id)}_rowClicked(C){let H=this.budget?.items.find(L=>L.id===C.detail.id);H&&this._dialog.open(H)}render(){if(!this.budget)return p;let C=this.hass,H={column:"amount",direction:"desc"};return a`
      <hass-tabs-subpage-data-table
        .hass=${C}
        .narrow=${this.narrow}
        .route=${this.route}
        .tabs=${z(C,this.route)}
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
          <ha-svg-icon slot="start" .path=${E1}></ha-svg-icon>
          ${r(C,"items.add")}
        </ha-button>
      </hass-tabs-subpage-data-table>
      <pro-budget-item-dialog .hass=${C} .budget=${this.budget}></pro-budget-item-dialog>
      <pro-budget-confirm .hass=${C}></pro-budget-confirm>
    `}};U.styles=[_,Z`
      :host {
        display: block;
        height: 100%;
      }
      /* Two-line main cell on narrow screens, as HA's entities page. */
      hass-tabs-subpage-data-table {
        --data-table-row-height: 60px;
      }
    `],n([l({attribute:!1})],U.prototype,"hass",2),n([l({attribute:!1})],U.prototype,"budget",2),n([l({attribute:!1})],U.prototype,"route",2),n([l({type:Boolean})],U.prototype,"narrow",2),n([i1("pro-budget-item-dialog")],U.prototype,"_dialog",2),n([i1("pro-budget-confirm")],U.prototype,"_confirm",2),U=n([O("pro-budget-items")],U);var n5=5,G5=.1,U5=.45,P=class extends u{constructor(){super(...arguments);this.userId="";this.version="";this.narrow=!1;this._year=new Date().getFullYear();this._month=new Date().getMonth()+1}updated(C){["budget","userId","_year","_month"].some(H=>C.has(H))&&this._load()}async _load(){!this.hass||!this.budget||(this._data=await S.overview(this.hass,this._year,this._month,this.userId||void 0))}_shift(C){let H=new Date(this._year,this._month-1+C,1);this._year=H.getFullYear(),this._month=H.getMonth()+1}get _isCurrentMonth(){let C=new Date;return C.getFullYear()===this._year&&C.getMonth()+1===this._month}_select(C){this.dispatchEvent(new CustomEvent("user-changed",{detail:{userId:C},bubbles:!0,composed:!0}))}_user(C){return this.budget?.users.find(H=>H.id===C)?.name??r(this.hass,"common.unknown_user")}_item(C){return this.budget?.items.find(H=>H.id===C)}_category(C){return this.budget?.categories.find(H=>H.id===C)}_link(C,H,L="link"){return a`
      <a
        class=${L}
        href=${n2(this.route,C)}
        @click=${t=>{t.preventDefault(),H5(this.route,C)}}
        >${H}</a
      >
    `}_head(C,H,L=p){return a`
      <div class="head">
        <ha-svg-icon .path=${C}></ha-svg-icon>
        <h2>${H}</h2>
        ${L}
      </div>
    `}_frame(C){let H=this.hass,L=p1(H,this.budget,this.userId,{all:!0},e=>this._select(e)),t=K(H,`${this._year}-${String(this._month).padStart(2,"0")}-01`,{month:"long",year:"numeric"});return a`
      <hass-tabs-subpage .hass=${H} .narrow=${this.narrow} .route=${this.route} .tabs=${z(H,this.route)} main-page>
        <div class="toolbar">
          <div class="period">
            <ha-icon-button .label=${r(H,"overview.nav_previous")} .path=${P1} @click=${()=>this._shift(-1)}></ha-icon-button>
            <div class="title"><span class="month">${t}</span></div>
            <ha-icon-button .label=${r(H,"overview.nav_next")} .path=${T1} @click=${()=>this._shift(1)}></ha-icon-button>
          </div>
          ${this._isCurrentMonth?a`<span class="today-hint">${r(H,"common.today")} · ${K(H,R(new Date),{weekday:"short",day:"numeric",month:"short"})}</span>`:p}
          ${L}
        </div>
        ${C}
      </hass-tabs-subpage>
    `}render(){if(!this.budget)return p;let C=this.hass;if(this.budget.items.length===0)return this._frame(a`<div class="cards"><ha-card><div class="empty">${r(C,"overview.empty")}</div></ha-card></div>`);let H=this._data;if(!H)return this._frame(a`<div class="cards"><ha-card><div class="empty">${r(C,"common.loading")}</div></ha-card></div>`);let L=H.stats[0];return this._frame(a`
      <div class="cards">
        ${H.stats.length>1?a`<p class="muted small" style="margin:0 0 12px">${r(C,"overview.other_currencies")} (${H.stats.slice(1).map(t=>t.currency).join(", ")})</p>`:p}
        <div class="dashboard">
          <div class="col">
            ${this._hero(H,L)}
            <div class="pair">${this._categories(L)} ${this._members(H.household)}</div>
            ${this._yearOutlook(H,L.currency)}
          </div>
          <div class="col">${this._upNext(H,L.currency)} ${this._settlement(H.household)}</div>
        </div>
      </div>
    `)}_hero(C,H){let L=this.hass,t=H.currency,e=w=>g(L,w,t),d=f(L,this._month),o=this.userId?r(L,"overview.scope_member",{name:this._user(this.userId),month:d}):r(L,"overview.scope_household",{month:d}),m=H.totals.remaining,A=C.progress,i=A.income,x=i-A.due,c=A.due>0?Math.min(100,A.paid/A.due*100):0,b=[{key:"overview.seg_fixed",value:A.fixed,color:"var(--orange-color)"},{key:"overview.seg_variable",value:A.variable,color:"var(--amber-color)"},{key:"overview.seg_savings",value:A.savings,color:"var(--light-blue-color)"},{key:"overview.seg_free",value:Math.max(0,x),color:"color-mix(in srgb, var(--success-color) 45%, transparent)"}],T=w=>i>0?w/i:0;return a`
      <ha-card class="hero">
        ${this._head(o2,o,a`<span class="hint">${r(L,"overview.actual_month")}</span>`)}
        <div class="hero-top">
          <div class="free">
            <span class="disc"><ha-svg-icon .path=${o2}></ha-svg-icon></span>
            <div class="col-text">
              <span style="font-weight:500">${r(L,"overview.free")}</span>
              <span class="num big ${x<0?"negative":""}">${e(x)}</span>
              ${A.income>0?a`<span class="pct ${x<0?"bad":""}">${r(L,"overview.free_pct",{pct:W(L,x/A.income)})}</span>`:p}
              <span class="small muted num">${r(L,"overview.free_equivalent",{amount:e(m)})}</span>
            </div>
          </div>
          <div class="progress">
            <div class="between">
              <span style="font-weight:500">${r(L,"overview.outflows_in",{month:d})}</span>
              <span class="num">${r(L,"overview.paid_of",{paid:e(A.paid),due:e(A.due)})}</span>
            </div>
            <div class="track">
              <div class="fill" style="width:${c.toFixed(1)}%"></div>
              ${A.today_day!==null?a`<div class="today" title=${r(L,"common.today")} style="left:${(A.today_day/A.days_in_month*100).toFixed(1)}%"></div>`:p}
            </div>
            <div class="between small muted">
              <span>${r(L,"overview.paid_pct",{pct:W(L,A.due>0?A.paid/A.due:0)})}${A.today_day!==null?` \xB7 ${r(L,"overview.day_of",{day:A.today_day,days:A.days_in_month})}`:""}</span>
              <span class="num">${r(L,"overview.still_open",{amount:e(Math.max(0,A.due-A.paid))})}</span>
            </div>
          </div>
        </div>
        <div class="col-text" style="gap:10px">
          <div class="stack">
            ${b.map(w=>a`<div title=${r(L,w.key)} style="width:${(T(w.value)*100).toFixed(2)}%; background:${w.color}"></div>`)}
          </div>
          <div class="legend">
            ${b.map(w=>a`
                <div class="item">
                  <span class="swatch" style="background:${w.color}"></span>
                  <div class="col-text">
                    <span class="small muted">${r(L,w.key)} · ${W(L,T(w.value))}</span>
                    <span class="num amount">${e(w.value)}</span>
                  </div>
                </div>
              `)}
          </div>
          <span class="small muted">${r(L,"overview.income_expenses",{income:e(i),expenses:e(A.fixed+A.variable)})}</span>
        </div>
        <div class="kpis">
          ${this._kpi(q2,"var(--light-blue-color)",r(L,"insights.savings_rate"),W(L,A.savings_rate),A.savings_rate===null?["",""]:A.savings_rate>=G5?[r(L,"overview.on_target"),"good"]:[r(L,"overview.below_target"),"warn"])}
          ${this._kpi(K2,"var(--orange-color)",r(L,"insights.fixed_cost_rate"),W(L,A.fixed_cost_rate),A.fixed_cost_rate===null?["",""]:A.fixed_cost_rate>U5?[r(L,"overview.fixed_high"),"warn"]:[r(L,"overview.fixed_ok"),"good"])}
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
          ${e[0]?a`<span class="small ${e[1]}">${e[0]}</span>`:p}
        </div>
      </div>
    `}_settlementKpi(C){let H=this.hass,L=i=>g(H,i,C.currency),t="var(--deep-purple-color)";if(!this.userId){let i=C.transfers.reduce((x,c)=>x+c.amount,0);return this._kpi(D1,t,r(H,"overview.kpi_open_settlement"),L(i),[r(H,"overview.transfers_count",{count:C.transfers.length}),"muted"])}let d=C.fairness.find(i=>i.user_id===this.userId)?.balance??0,o=C.transfers.filter(i=>i.from_user_id===this.userId),m=C.transfers.filter(i=>i.to_user_id===this.userId),A=o.length?[r(H,"overview.pays_to",{names:o.map(i=>this._user(i.to_user_id)).join(", ")}),"bad"]:m.length?[r(H,"overview.receives_from",{names:m.map(i=>this._user(i.from_user_id)).join(", ")}),"good"]:["",""];return this._kpi(D1,t,r(H,"overview.kpi_settlement"),B(H,d,C.currency,d<0),A)}_categories(C){let H=this.hass,L=A=>g(H,A,C.currency),t=C.categories.filter(A=>A.expenses>0).sort((A,i)=>i.expenses-A.expenses),e=t.slice(0,n5),d=t.slice(n5),o=e[0]?.expenses??1,m=C.totals.expenses||1;return a`
      <ha-card>
        ${this._head(j2,r(H,"overview.by_category"),a`<span class="hint">${this.userId?this._user(this.userId):r(H,"overview.household")}</span>`)}
        ${e.length===0?a`<div class="empty">${r(H,"common.none")}</div>`:p}
        ${e.map(A=>{let i=this._category(A.category_id);return a`
            <div class="row">
              ${E(i)}
              <div class="grow col-text" style="gap:6px">
                <div class="between">
                  <span class="name">${i?.name??A.category_id}</span>
                  <span class="num">${L(A.expenses)} <span class="small muted">${W(H,A.expenses/m)}</span></span>
                </div>
                <div class="bar"><div style="width:${(A.expenses/o*100).toFixed(1)}%; background:${i?.color?`var(--${i.color}-color)`:"var(--primary-color)"}"></div></div>
              </div>
            </div>
          `})}
        <div class="indent">
          ${d.length?a`<span class="small muted">${r(H,"overview.more_categories",{count:d.length,amount:L(d.reduce((A,i)=>A+i.expenses,0))})} → </span>`:p}
          ${this._link("items",r(H,"overview.all_items"))}
        </div>
      </ha-card>
    `}_members(C){let H=this.hass,L=this.budget,t=e=>g(H,e,C.currency);return a`
      <ha-card>
        ${this._head(F2,r(H,"overview.members"),a`<span class="hint">${r(H,"overview.free_per_month")}</span>`)}
        ${C.members.map(e=>{let d=g1(L,e.user_id),o=e.earnings,m=i=>(o>0?i/o*100:0).toFixed(2),A=this.userId!==""&&this.userId!==e.user_id;return a`
            <button
              class="member-row ${A?"dim":""}"
              aria-pressed=${this.userId===e.user_id}
              @click=${()=>this._select(this.userId===e.user_id?"":e.user_id)}
            >
              ${n1(this._user(e.user_id),d,40)}
              <span class="grow col-text" style="flex:1; gap:6px">
                <span class="between">
                  <span class="col-text">
                    <span class="name">${this._user(e.user_id)}</span>
                    <span class="small muted">${r(H,"overview.member_sub",{income:t(e.earnings),rate:W(H,e.savings_rate)})}</span>
                  </span>
                  <span class="num ${e.balance<0?"bad":"good"}" style="font-weight:500">${t(e.balance)}</span>
                </span>
                <span class="stack thin">
                  <span style="width:${m(e.expenses.fixed)}%; background: var(--orange-color)"></span>
                  <span style="width:${m(e.expenses.variable)}%; background: var(--amber-color)"></span>
                  <span style="width:${m(e.savings)}%; background: var(--light-blue-color)"></span>
                  <span style="width:${m(Math.max(0,e.balance))}%; background: color-mix(in srgb, var(--success-color) 45%, transparent)"></span>
                </span>
              </span>
            </button>
          `})}
        <div class="small muted indent">${r(H,"overview.bar_hint")}</div>
      </ha-card>
    `}_recurrence(C){return C?r(this.hass,`recurrence.${C.recurrence}`).toLowerCase():""}_yearOutlook(C,H){let L=this.hass,t=i=>g(L,i,H),e=C.year,d=Math.max(1,...e.months.map(i=>i.total)),o=i=>`${(i/d*92).toFixed(1)}px`,m=i=>i===this._month&&e.year===this._year,A=[];if(e.max_month&&e.max_entry){let i=this._item(e.max_entry.item_id);A.push(this._note(a2,"var(--orange-color)",r(L,"overview.max_month",{month:f(L,e.max_month)}),r(L,"overview.max_month_sub",{amount:t(e.months[e.max_month-1].total),title:i?.title??"",item_amount:t(e.max_entry.due),recurrence:this._recurrence(i)})))}if(e.next_special){let i=this._item(e.next_special.item_id);A.push(this._note(W2,"var(--red-color)",r(L,"overview.next_special"),r(L,"overview.next_special_sub",{title:i?.title??"",amount:t(i?.amount??0),date:K(L,e.next_special.date,{day:"numeric",month:"short"}),recurrence:this._recurrence(i)})))}if(e.next_month){let i=e.next_month,x=i.delta<0?"less":i.delta>0?"more":"same";A.push(this._note(R2,"var(--light-blue-color)",r(L,`overview.next_month_${x}`,{month:f(L,i.month)}),r(L,`overview.next_month_sub_${x}`,{amount:t(i.total),delta:t(Math.abs(i.delta)),month:f(L,this._month)})))}return a`
      <ha-card>
        ${this._head(G2,r(L,"overview.outflows_year",{year:e.year}),this._link("insights",`${r(L,"overview.insights_link")} \u2192`))}
        <div class="chart">
          <div class="bars">
            <div class="plot">
              <div class="avg" style="bottom:${o(e.avg_month)}"><span class="num">${r(L,"overview.avg",{amount:t(e.avg_month)})}</span></div>
              ${e.months.map(i=>a`
                  <div class="month ${m(i.month)?"current":""} ${i.month===e.max_month?"peak":""}">
                    <span class="label num ${i.month===e.max_month?"warn":""}" style="color:${m(i.month)&&i.month!==e.max_month?"var(--primary-color)":""}">${m(i.month)||i.month===e.max_month?t(i.total):""}</span>
                    <div class="col-bar" title="${f(L,i.month)}: ${t(i.total)}" style="height:${o(i.total)}"></div>
                  </div>
                `)}
            </div>
            <div class="names">${e.months.map(i=>a`<span class=${m(i.month)?"current":""}>${f(L,i.month,"short")}</span>`)}</div>
          </div>
          ${A.length?a`<div class="notes">${A}</div>`:p}
        </div>
        ${e.unscheduled.length?a`<p class="small muted" style="margin:0">${r(L,"insights.unscheduled")} ${e.unscheduled.map(i=>this._item(i)?.title).join(", ")}</p>`:p}
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
    `}_when(C){let H=this.hass,L=new Date,t=new Date;return t.setDate(L.getDate()+1),C===R(L)?r(H,"common.today"):C===R(t)?r(H,"overview.tomorrow"):K(H,C,{weekday:"short",day:"numeric",month:"short"})}_occurrence(C,H){let L=this.hass,t=this._item(C.item_id);if(!t)return p;let e=this.userId?"":` \xB7 ${this._user(t.user_id)}`;return a`
      <div class="row ${C.paid?"paid":""}">
        ${E(this._category(t.category_id))}
        <div class="grow col-text">
          <span class="name">${t.title}</span>
          <span class="small muted">${this._when(C.date)}${e}</span>
        </div>
        <span class="num ${t.type}" style="font-weight:500; white-space:nowrap">${B(L,t.amount,t.currency??H,t.type!=="earning")}</span>
        <ha-icon-button
          class="paid-toggle"
          .label=${r(L,C.paid?"calendar.mark_unpaid":"calendar.mark_paid")}
          .path=${C.paid?_1:B1}
          @click=${()=>this._togglePaid(C)}
        ></ha-icon-button>
      </div>
    `}async _togglePaid(C){await S.setPaid(this.hass,C.item_id,C.date,!C.paid),await this._load()}_upNext(C,H){let L=this.hass,t=C.upcoming,e=C.next_income?this._item(C.next_income.item_id):void 0;return a`
      <ha-card>
        ${this._head(I2,r(L,"overview.up_next"),a`<span class="hint">${r(L,"overview.next_payments")}</span>`)}
        ${t.length?t.map(d=>this._occurrence(d,H)):a`<div class="small muted">${r(L,"overview.nothing_due")}</div>`}
        ${e&&C.next_income?a`
              <div class="divider"></div>
              <div class="row">
                <span class="disc" style="width:36px; height:36px; flex:none; border-radius:50%; display:flex; align-items:center; justify-content:center; color: var(--success-color); background: color-mix(in srgb, var(--success-color) 20%, transparent); --mdc-icon-size: 20px">
                  <ha-svg-icon .path=${a2}></ha-svg-icon>
                </span>
                <div class="grow col-text">
                  <span class="name">${r(L,"overview.next_income")}</span>
                  <span class="small muted">${e.title} · ${this._when(C.next_income.date)}${this.userId?"":` \xB7 ${this._user(e.user_id)}`}</span>
                </div>
                <span class="num earning" style="font-weight:500; white-space:nowrap">${B(L,e.amount,e.currency??H,!1)}</span>
              </div>
            `:p}
        <div class="indent">${this._link("calendar",`${r(L,"overview.calendar_link")} \u2192`)}</div>
      </ha-card>
    `}_settlement(C){let H=this.hass,L=this.budget,t=o=>g(H,o,C.currency),e=L.config.split_rule==="equal"?"equal":"income",d=Math.max(1,...C.fairness.map(o=>Math.abs(o.balance)));return a`
      <ha-card>
        ${this._head(D1,r(H,"overview.settlement"),a`<span class="badge">${r(H,`settings.split_rule.${e}`)}</span>`)}
        ${C.transfers.length===0?a`<p class="settled"><ha-icon icon="mdi:check-circle"></ha-icon> ${r(H,"overview.settled")}</p>`:C.transfers.map(o=>{let m=!this.userId||this.userId===o.from_user_id||this.userId===o.to_user_id;return a`
                  <div class="transfer ${m?"hl":""}">
                    ${n1(this._user(o.from_user_id),g1(L,o.from_user_id),32)}
                    <ha-svg-icon .path=${$2}></ha-svg-icon>
                    ${n1(this._user(o.to_user_id),g1(L,o.to_user_id),32)}
                    <span class="text"><b style="font-weight:500">${this._user(o.from_user_id)}</b> ${r(H,"overview.pays")} <b style="font-weight:500">${this._user(o.to_user_id)}</b></span>
                    <span class="num" style="font-weight:500; font-size:15px">${t(o.amount)}</span>
                  </div>
                `})}
        <div class="axis"><span>${r(H,"overview.underpaid")}</span><span>${r(H,"overview.overpaid")}</span></div>
        ${C.fairness.map(o=>{let m=`${(Math.abs(o.balance)/d*100).toFixed(1)}%`,A=this.userId!==""&&this.userId!==o.user_id;return a`
            <div class="balance ${A?"dim":""}" style=${A?"opacity:0.45":""}>
              <div class="between" style="font-size:13px">
                <span style="font-weight:500">${this._user(o.user_id)}</span>
                <span class="num ${o.balance<0?"bad":o.balance>0?"good":""}" style="font-weight:500">${B(H,o.balance,C.currency,o.balance<0)}</span>
              </div>
              <div class="bars2">
                <div class="left"><div style="width:${o.balance<0?m:"0%"}"></div></div>
                <div class="mid"></div>
                <div class="right"><div style="width:${o.balance>0?m:"0%"}"></div></div>
              </div>
              <span class="small muted">${r(H,"overview.paid_fair",{paid:t(o.shared_costs_paid),fair:t(o.fair_share)})}</span>
            </div>
          `})}
        <p class="small muted" style="margin:0">
          ${r(H,e==="equal"?"overview.rule_equal":"overview.rule_income")}
          ${r(H,"overview.rule_subset")}
        </p>
      </ha-card>
    `}};P.styles=[_,N1,Z`
      :host {
        display: block;
        height: 100%;
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
    `],n([l({attribute:!1})],P.prototype,"hass",2),n([l({attribute:!1})],P.prototype,"budget",2),n([l()],P.prototype,"userId",2),n([l()],P.prototype,"version",2),n([l({attribute:!1})],P.prototype,"route",2),n([l({type:Boolean})],P.prototype,"narrow",2),n([v()],P.prototype,"_year",2),n([v()],P.prototype,"_month",2),n([v()],P.prototype,"_data",2),P=n([O("pro-budget-overview")],P);var h=class extends u{constructor(){super(...arguments);this.narrow=!1;this.version="";this._touched=new Set;this._saving="";this._message="";this._error=""}_count(C){return this.budget?.items.filter(H=>H.category_id===C.id).length??0}_menu(C){let H=this._count(C);return[{path:$1,label:r(this.hass,"common.edit"),action:()=>this._dialog.open(C)},{path:F1,label:H?r(this.hass,"categories.in_use",{count:H}):r(this.hass,"common.delete"),warning:!0,disabled:H>0,action:()=>{this._delete(C)}}]}async _delete(C){await this._confirm.open(r(this.hass,"categories.delete_confirm",{name:C.name}))&&await S.deleteCategory(this.hass,C.id)}_renderCategories(){let C=this.hass,H=this.budget;return a`
      <ha-card>
        <h1 class="card-header">${r(C,"settings.categories")}</h1>
        <div class="card-content">
          <p class="hint">${r(C,"settings.categories_hint")}</p>
          <ha-md-list>
            ${H.categories.map(L=>a`
                <ha-md-list-item type="button" @click=${()=>this._dialog.open(L)}>
                  <span slot="start">${E(L)}</span>
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
            <ha-svg-icon slot="start" .path=${E1}></ha-svg-icon>${r(C,"categories.add")}
          </ha-button>
        </div>
      </ha-card>
    `}get _isAdmin(){return!!this.hass?.user?.is_admin}get _memberSet(){return this._members??new Set(this.budget.config.members)}_toggleMember(C,H){let L=new Set(this._memberSet);H?L.add(C):L.delete(C),this._members=L}get _membersChanged(){let C=[...this.budget.config.members].sort().join(",");return[...this._memberSet].sort().join(",")!==C}async _saveMembers(){await this._save("members",{members:[...this._memberSet]}),this._members=void 0}_renderMembers(){let C=this.hass,H=this.budget,L=this._memberSet,t=L.size===0;return a`
      <ha-card>
        <h1 class="card-header">${r(C,"settings.members")}</h1>
        <div class="card-content">
          <p class="hint">${r(C,"settings.members_hint")}</p>
          ${this._isAdmin?p:a`<ha-alert alert-type="info">${r(C,"settings.members_admin")}</ha-alert>`}
          <ha-md-list>
            ${H.all_users.map(e=>a`
                <ha-md-list-item>
                  <ha-checkbox
                    slot="start"
                    .checked=${t||L.has(e.id)}
                    .disabled=${!this._isAdmin}
                    @change=${d=>this._toggleMember(e.id,d.target.checked)}
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
          ${this._isAdmin?p:a`<ha-alert alert-type="info">${r(C,"settings.members_admin")}</ha-alert>`}
          <div class="fields">
            <div>
              ${N(C,{label:r(C,"settings.split_rule"),value:this._splitRuleValue,required:!0,options:a5.map(L=>({value:L,label:r(C,`settings.split_rule.${L}`)})),onChange:L=>this._splitRule=L})}
              <p class="hint small" style="margin: 4px 0 0">${r(C,"settings.split_rule_hint")}</p>
            </div>
            <div>
              ${Q(C,{label:r(C,"settings.currency"),value:this._currencyValue,error:this._currencyError,touched:H("currency"),onChange:L=>{this._touched=new Set([...this._touched,"currency"]),this._currency=L}})}
              <p class="hint small" style="margin: 4px 0 0">
                ${r(C,"settings.currency_hint",{currency:this.hass?.config.currency??""})}
              </p>
            </div>
            <div>
              ${Q(C,{label:r(C,"settings.lead_days"),value:this._leadDaysValue,type:"number",min:0,max:60,required:!0,error:this._leadDaysError,touched:H("lead_days"),onChange:L=>{this._touched=new Set([...this._touched,"lead_days"]),this._leadDays=L}})}
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
    `}async _save(C,H){this._saving=C,this._error="",this._message="";try{await S.updateConfig(this.hass,H),this._message=r(this.hass,"settings.saved")}catch(L){this._error=h1(this.hass,L)}finally{this._saving=""}}render(){if(!this.budget)return p;let C=this.hass;return a`
      <hass-tabs-subpage .hass=${C} .narrow=${this.narrow} .route=${this.route} .tabs=${z(C,this.route)} main-page>
        <div class="content">
          ${this._error?a`<ha-alert alert-type="error">${this._error}</ha-alert>`:p}
          ${this._message?a`<ha-alert alert-type="success">${this._message}</ha-alert>`:p}
          ${this._renderMembers()} ${this._renderHousehold()} ${this._renderCategories()}
          <ha-card>
            <h1 class="card-header">${r(C,"settings.about")}</h1>
            <div class="card-content">${r(C,"settings.version",{version:this.version})}</div>
          </ha-card>
        </div>
      </hass-tabs-subpage>
      <pro-budget-category-dialog .hass=${C}></pro-budget-category-dialog>
      <pro-budget-confirm .hass=${C}></pro-budget-confirm>
    `}};h.styles=[_,Y(o1),Z`
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
    `],n([l({attribute:!1})],h.prototype,"hass",2),n([l({attribute:!1})],h.prototype,"budget",2),n([l({attribute:!1})],h.prototype,"route",2),n([l({type:Boolean})],h.prototype,"narrow",2),n([l()],h.prototype,"version",2),n([v()],h.prototype,"_members",2),n([v()],h.prototype,"_currency",2),n([v()],h.prototype,"_leadDays",2),n([v()],h.prototype,"_splitRule",2),n([v()],h.prototype,"_touched",2),n([v()],h.prototype,"_saving",2),n([v()],h.prototype,"_message",2),n([v()],h.prototype,"_error",2),n([i1("pro-budget-category-dialog")],h.prototype,"_dialog",2),n([i1("pro-budget-confirm")],h.prototype,"_confirm",2),h=n([O("pro-budget-settings")],h);var D=class extends u{constructor(){super(...arguments);this.narrow=!1;this._ready=!1;this._error="";this._userId="";this._userChosen=!1}connectedCallback(){super.connectedCallback(),this._start()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.(),this._unsubscribe=void 0}updated(C){C.has("hass")&&this.hass&&!this._unsubscribe&&this._start(),C.has("route")&&this._redirectToView()}_redirectToView(){let C=this.route;!C||C.path.replace(/\//g,"")!==""||(history.replaceState(null,"",`${C.prefix??I1}/${A2(C)}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!0}})))}async _start(){if(!(!this.hass||this._unsubscribe))try{await P2(),this._unsubscribe=await S.subscribe(this.hass,C=>{this._budget=C;let H=this.hass?.user?.id;!this._userChosen&&H&&C.users.some(L=>L.id===H)&&(this._userId=H)}),this._ready=!0}catch(C){this._error=String(C?.message??C)}}render(){let C=this.hass,H=this._budget;if(this._error)return a`<ha-alert alert-type="error">${this._error}</ha-alert>`;if(!this._ready||!H)return a`<div class="loading">${r(C,"common.loading")}</div>`;let L={hass:C,narrow:this.narrow,route:this.route,budget:H,version:"0.1.0"},t=e=>{this._userChosen=!0,this._userId=e.detail.userId};switch(A2(this.route)){case"items":return a`<pro-budget-items .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${H}></pro-budget-items>`;case"calendar":return a`<pro-budget-calendar .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${H} .userId=${this._userId} @user-changed=${t}></pro-budget-calendar>`;case"insights":return a`<pro-budget-insights .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${H} .userId=${this._userId} @user-changed=${t}></pro-budget-insights>`;case"settings":return a`<pro-budget-settings .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${H} .version=${L.version}></pro-budget-settings>`;default:return a`<pro-budget-overview .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${H} .userId=${this._userId} .version=${L.version} @user-changed=${t}></pro-budget-overview>`}return p}};D.styles=Z`
    :host {
      display: block;
      height: 100%;
    }
    .loading,
    ha-alert {
      display: block;
      padding: 16px;
    }
  `,n([l({attribute:!1})],D.prototype,"hass",2),n([l({type:Boolean})],D.prototype,"narrow",2),n([l({attribute:!1})],D.prototype,"route",2),n([l({attribute:!1})],D.prototype,"panel",2),n([v()],D.prototype,"_budget",2),n([v()],D.prototype,"_ready",2),n([v()],D.prototype,"_error",2),n([v()],D.prototype,"_userId",2),D=n([O("pro-budget-panel")],D);console.info("%c PRO-BUDGET %c v0.1.0 ","color: white; background: #3f51b5; font-weight: 700;","color: #3f51b5; background: white; font-weight: 700;");
