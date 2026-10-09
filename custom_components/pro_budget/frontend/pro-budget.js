/* pro-budget v0.1.0 | MIT | https://github.com/malte-wessel/pro-budget */
var k2=Object.defineProperty;var w2=Object.getOwnPropertyDescriptor;var a=(M,H,C,V)=>{for(var L=V>1?void 0:V?w2(H,C):H,t=M.length-1,e;t>=0;t--)(e=M[t])&&(L=(V?e(H,C,L):e(L))||L);return V&&L&&k2(H,C,L),L};var x1=globalThis,Z1=x1.ShadowRoot&&(x1.ShadyCSS===void 0||x1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,B1=Symbol(),j1=new WeakMap,t1=class{constructor(H,C,V){if(this._$cssResult$=!0,V!==B1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=H,this.t=C}get styleSheet(){let H=this.o,C=this.t;if(Z1&&H===void 0){let V=C!==void 0&&C.length===1;V&&(H=j1.get(C)),H===void 0&&((this.o=H=new CSSStyleSheet).replaceSync(this.cssText),V&&j1.set(C,H))}return H}toString(){return this.cssText}},U=M=>new t1(typeof M=="string"?M:M+"",void 0,B1),Z=(M,...H)=>{let C=M.length===1?M[0]:H.reduce((V,L,t)=>V+(e=>{if(e._$cssResult$===!0)return e.cssText;if(typeof e=="number")return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(L)+M[t+1],M[0]);return new t1(C,M,B1)},X1=(M,H)=>{if(Z1)M.adoptedStyleSheets=H.map(C=>C instanceof CSSStyleSheet?C:C.styleSheet);else for(let C of H){let V=document.createElement("style"),L=x1.litNonce;L!==void 0&&V.setAttribute("nonce",L),V.textContent=C.cssText,M.appendChild(V)}},P1=Z1?M=>M:M=>M instanceof CSSStyleSheet?(H=>{let C="";for(let V of H.cssRules)C+=V.cssText;return U(C)})(M):M;var{is:B2,defineProperty:P2,getOwnPropertyDescriptor:T2,getOwnPropertyNames:F2,getOwnPropertySymbols:R2,getPrototypeOf:_2}=Object,s1=globalThis,Y1=s1.trustedTypes,E2=Y1?Y1.emptyScript:"",D2=s1.reactiveElementPolyfillSupport,i1=(M,H)=>M,o1={toAttribute(M,H){switch(H){case Boolean:M=M?E2:null;break;case Object:case Array:M=M==null?M:JSON.stringify(M)}return M},fromAttribute(M,H){let C=M;switch(H){case Boolean:C=M!==null;break;case Number:C=M===null?null:Number(M);break;case Object:case Array:try{C=JSON.parse(M)}catch{C=null}}return C}},u1=(M,H)=>!B2(M,H),J1={attribute:!0,type:String,converter:o1,reflect:!1,useDefault:!1,hasChanged:u1};Symbol.metadata??=Symbol("metadata"),s1.litPropertyMetadata??=new WeakMap;var I=class extends HTMLElement{static addInitializer(H){this._$Ei(),(this.l??=[]).push(H)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(H,C=J1){if(C.state&&(C.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(H)&&((C=Object.create(C)).wrapped=!0),this.elementProperties.set(H,C),!C.noAccessor){let V=Symbol(),L=this.getPropertyDescriptor(H,V,C);L!==void 0&&P2(this.prototype,H,L)}}static getPropertyDescriptor(H,C,V){let{get:L,set:t}=T2(this.prototype,H)??{get(){return this[C]},set(e){this[C]=e}};return{get:L,set(e){let o=L?.call(this);t?.call(this,e),this.requestUpdate(H,o,V)},configurable:!0,enumerable:!0}}static getPropertyOptions(H){return this.elementProperties.get(H)??J1}static _$Ei(){if(this.hasOwnProperty(i1("elementProperties")))return;let H=_2(this);H.finalize(),H.l!==void 0&&(this.l=[...H.l]),this.elementProperties=new Map(H.elementProperties)}static finalize(){if(this.hasOwnProperty(i1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(i1("properties"))){let C=this.properties,V=[...F2(C),...R2(C)];for(let L of V)this.createProperty(L,C[L])}let H=this[Symbol.metadata];if(H!==null){let C=litPropertyMetadata.get(H);if(C!==void 0)for(let[V,L]of C)this.elementProperties.set(V,L)}this._$Eh=new Map;for(let[C,V]of this.elementProperties){let L=this._$Eu(C,V);L!==void 0&&this._$Eh.set(L,C)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(H){let C=[];if(Array.isArray(H)){let V=new Set(H.flat(1/0).reverse());for(let L of V)C.unshift(P1(L))}else H!==void 0&&C.push(P1(H));return C}static _$Eu(H,C){let V=C.attribute;return V===!1?void 0:typeof V=="string"?V:typeof H=="string"?H.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(H=>this.enableUpdating=H),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(H=>H(this))}addController(H){(this._$EO??=new Set).add(H),this.renderRoot!==void 0&&this.isConnected&&H.hostConnected?.()}removeController(H){this._$EO?.delete(H)}_$E_(){let H=new Map,C=this.constructor.elementProperties;for(let V of C.keys())this.hasOwnProperty(V)&&(H.set(V,this[V]),delete this[V]);H.size>0&&(this._$Ep=H)}createRenderRoot(){let H=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return X1(H,this.constructor.elementStyles),H}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(H=>H.hostConnected?.())}enableUpdating(H){}disconnectedCallback(){this._$EO?.forEach(H=>H.hostDisconnected?.())}attributeChangedCallback(H,C,V){this._$AK(H,V)}_$ET(H,C){let V=this.constructor.elementProperties.get(H),L=this.constructor._$Eu(H,V);if(L!==void 0&&V.reflect===!0){let t=(V.converter?.toAttribute!==void 0?V.converter:o1).toAttribute(C,V.type);this._$Em=H,t==null?this.removeAttribute(L):this.setAttribute(L,t),this._$Em=null}}_$AK(H,C){let V=this.constructor,L=V._$Eh.get(H);if(L!==void 0&&this._$Em!==L){let t=V.getPropertyOptions(L),e=typeof t.converter=="function"?{fromAttribute:t.converter}:t.converter?.fromAttribute!==void 0?t.converter:o1;this._$Em=L;let o=e.fromAttribute(C,t.type);this[L]=o??this._$Ej?.get(L)??o,this._$Em=null}}requestUpdate(H,C,V,L=!1,t){if(H!==void 0){let e=this.constructor;if(L===!1&&(t=this[H]),V??=e.getPropertyOptions(H),!((V.hasChanged??u1)(t,C)||V.useDefault&&V.reflect&&t===this._$Ej?.get(H)&&!this.hasAttribute(e._$Eu(H,V))))return;this.C(H,C,V)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(H,C,{useDefault:V,reflect:L,wrapped:t},e){V&&!(this._$Ej??=new Map).has(H)&&(this._$Ej.set(H,e??C??this[H]),t!==!0||e!==void 0)||(this._$AL.has(H)||(this.hasUpdated||V||(C=void 0),this._$AL.set(H,C)),L===!0&&this._$Em!==H&&(this._$Eq??=new Set).add(H))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(C){Promise.reject(C)}let H=this.scheduleUpdate();return H!=null&&await H,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[L,t]of this._$Ep)this[L]=t;this._$Ep=void 0}let V=this.constructor.elementProperties;if(V.size>0)for(let[L,t]of V){let{wrapped:e}=t,o=this[L];e!==!0||this._$AL.has(L)||o===void 0||this.C(L,void 0,t,o)}}let H=!1,C=this._$AL;try{H=this.shouldUpdate(C),H?(this.willUpdate(C),this._$EO?.forEach(V=>V.hostUpdate?.()),this.update(C)):this._$EM()}catch(V){throw H=!1,this._$EM(),V}H&&this._$AE(C)}willUpdate(H){}_$AE(H){this._$EO?.forEach(C=>C.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(H)),this.updated(H)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(H){return!0}update(H){this._$Eq&&=this._$Eq.forEach(C=>this._$ET(C,this[C])),this._$EM()}updated(H){}firstUpdated(H){}};I.elementStyles=[],I.shadowRootOptions={mode:"open"},I[i1("elementProperties")]=new Map,I[i1("finalized")]=new Map,D2?.({ReactiveElement:I}),(s1.reactiveElementVersions??=[]).push("2.1.2");var $1=globalThis,C2=M=>M,S1=$1.trustedTypes,H2=S1?S1.createPolicy("lit-html",{createHTML:M=>M}):void 0,t2="$lit$",G=`lit$${Math.random().toFixed(9).slice(2)}$`,i2="?"+G,$2=`<${i2}>`,q=document,A1=()=>q.createComment(""),d1=M=>M===null||typeof M!="object"&&typeof M!="function",N1=Array.isArray,N2=M=>N1(M)||typeof M?.[Symbol.iterator]=="function",T1=`[ 	
\f\r]`,a1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,V2=/-->/g,L2=/>/g,z=RegExp(`>|${T1}(?:([^\\s"'>=/]+)(${T1}*=${T1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),M2=/'/g,r2=/"/g,o2=/^(?:script|style|textarea|title)$/i,I1=M=>(H,...C)=>({_$litType$:M,strings:H,values:C}),i=I1(1),t5=I1(2),i5=I1(3),j=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),e2=new WeakMap,K=q.createTreeWalker(q,129);function a2(M,H){if(!N1(M)||!M.hasOwnProperty("raw"))throw Error("invalid template strings array");return H2!==void 0?H2.createHTML(H):H}var I2=(M,H)=>{let C=M.length-1,V=[],L,t=H===2?"<svg>":H===3?"<math>":"",e=a1;for(let o=0;o<C;o++){let A=M[o],v,s,d=-1,h=0;for(;h<A.length&&(e.lastIndex=h,s=e.exec(A),s!==null);)h=e.lastIndex,e===a1?s[1]==="!--"?e=V2:s[1]!==void 0?e=L2:s[2]!==void 0?(o2.test(s[2])&&(L=RegExp("</"+s[2],"g")),e=z):s[3]!==void 0&&(e=z):e===z?s[0]===">"?(e=L??a1,d=-1):s[1]===void 0?d=-2:(d=e.lastIndex-s[2].length,v=s[1],e=s[3]===void 0?z:s[3]==='"'?r2:M2):e===r2||e===M2?e=z:e===V2||e===L2?e=a1:(e=z,L=void 0);let l=e===z&&M[o+1].startsWith("/>")?" ":"";t+=e===a1?A+$2:d>=0?(V.push(v),A.slice(0,d)+t2+A.slice(d)+G+l):A+G+(d===-2?o:l)}return[a2(M,t+(M[C]||"<?>")+(H===2?"</svg>":H===3?"</math>":"")),V]},m1=class M{constructor({strings:H,_$litType$:C},V){let L;this.parts=[];let t=0,e=0,o=H.length-1,A=this.parts,[v,s]=I2(H,C);if(this.el=M.createElement(v,V),K.currentNode=this.el.content,C===2||C===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(L=K.nextNode())!==null&&A.length<o;){if(L.nodeType===1){if(L.hasAttributes())for(let d of L.getAttributeNames())if(d.endsWith(t2)){let h=s[e++],l=L.getAttribute(d).split(G),R=/([.?@])?(.*)/.exec(h);A.push({type:1,index:t,name:R[2],strings:l,ctor:R[1]==="."?R1:R[1]==="?"?_1:R[1]==="@"?E1:H1}),L.removeAttribute(d)}else d.startsWith(G)&&(A.push({type:6,index:t}),L.removeAttribute(d));if(o2.test(L.tagName)){let d=L.textContent.split(G),h=d.length-1;if(h>0){L.textContent=S1?S1.emptyScript:"";for(let l=0;l<h;l++)L.append(d[l],A1()),K.nextNode(),A.push({type:2,index:++t});L.append(d[h],A1())}}}else if(L.nodeType===8)if(L.data===i2)A.push({type:2,index:t});else{let d=-1;for(;(d=L.data.indexOf(G,d+1))!==-1;)A.push({type:7,index:t}),d+=G.length-1}t++}}static createElement(H,C){let V=q.createElement("template");return V.innerHTML=H,V}};function C1(M,H,C=M,V){if(H===j)return H;let L=V!==void 0?C._$Co?.[V]:C._$Cl,t=d1(H)?void 0:H._$litDirective$;return L?.constructor!==t&&(L?._$AO?.(!1),t===void 0?L=void 0:(L=new t(M),L._$AT(M,C,V)),V!==void 0?(C._$Co??=[])[V]=L:C._$Cl=L),L!==void 0&&(H=C1(M,L._$AS(M,H.values),L,V)),H}var F1=class{constructor(H,C){this._$AV=[],this._$AN=void 0,this._$AD=H,this._$AM=C}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(H){let{el:{content:C},parts:V}=this._$AD,L=(H?.creationScope??q).importNode(C,!0);K.currentNode=L;let t=K.nextNode(),e=0,o=0,A=V[0];for(;A!==void 0;){if(e===A.index){let v;A.type===2?v=new p1(t,t.nextSibling,this,H):A.type===1?v=new A.ctor(t,A.name,A.strings,this,H):A.type===6&&(v=new D1(t,this,H)),this._$AV.push(v),A=V[++o]}e!==A?.index&&(t=K.nextNode(),e++)}return K.currentNode=q,L}p(H){let C=0;for(let V of this._$AV)V!==void 0&&(V.strings!==void 0?(V._$AI(H,V,C),C+=V.strings.length-2):V._$AI(H[C])),C++}},p1=class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(H,C,V,L){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=H,this._$AB=C,this._$AM=V,this.options=L,this._$Cv=L?.isConnected??!0}get parentNode(){let H=this._$AA.parentNode,C=this._$AM;return C!==void 0&&H?.nodeType===11&&(H=C.parentNode),H}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(H,C=this){H=C1(this,H,C),d1(H)?H===m||H==null||H===""?(this._$AH!==m&&this._$AR(),this._$AH=m):H!==this._$AH&&H!==j&&this._(H):H._$litType$!==void 0?this.$(H):H.nodeType!==void 0?this.T(H):N2(H)?this.k(H):this._(H)}O(H){return this._$AA.parentNode.insertBefore(H,this._$AB)}T(H){this._$AH!==H&&(this._$AR(),this._$AH=this.O(H))}_(H){this._$AH!==m&&d1(this._$AH)?this._$AA.nextSibling.data=H:this.T(q.createTextNode(H)),this._$AH=H}$(H){let{values:C,_$litType$:V}=H,L=typeof V=="number"?this._$AC(H):(V.el===void 0&&(V.el=m1.createElement(a2(V.h,V.h[0]),this.options)),V);if(this._$AH?._$AD===L)this._$AH.p(C);else{let t=new F1(L,this),e=t.u(this.options);t.p(C),this.T(e),this._$AH=t}}_$AC(H){let C=e2.get(H.strings);return C===void 0&&e2.set(H.strings,C=new m1(H)),C}k(H){N1(this._$AH)||(this._$AH=[],this._$AR());let C=this._$AH,V,L=0;for(let t of H)L===C.length?C.push(V=new M(this.O(A1()),this.O(A1()),this,this.options)):V=C[L],V._$AI(t),L++;L<C.length&&(this._$AR(V&&V._$AB.nextSibling,L),C.length=L)}_$AR(H=this._$AA.nextSibling,C){for(this._$AP?.(!1,!0,C);H!==this._$AB;){let V=C2(H).nextSibling;C2(H).remove(),H=V}}setConnected(H){this._$AM===void 0&&(this._$Cv=H,this._$AP?.(H))}},H1=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(H,C,V,L,t){this.type=1,this._$AH=m,this._$AN=void 0,this.element=H,this.name=C,this._$AM=L,this.options=t,V.length>2||V[0]!==""||V[1]!==""?(this._$AH=Array(V.length-1).fill(new String),this.strings=V):this._$AH=m}_$AI(H,C=this,V,L){let t=this.strings,e=!1;if(t===void 0)H=C1(this,H,C,0),e=!d1(H)||H!==this._$AH&&H!==j,e&&(this._$AH=H);else{let o=H,A,v;for(H=t[0],A=0;A<t.length-1;A++)v=C1(this,o[V+A],C,A),v===j&&(v=this._$AH[A]),e||=!d1(v)||v!==this._$AH[A],v===m?H=m:H!==m&&(H+=(v??"")+t[A+1]),this._$AH[A]=v}e&&!L&&this.j(H)}j(H){H===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,H??"")}},R1=class extends H1{constructor(){super(...arguments),this.type=3}j(H){this.element[this.name]=H===m?void 0:H}},_1=class extends H1{constructor(){super(...arguments),this.type=4}j(H){this.element.toggleAttribute(this.name,!!H&&H!==m)}},E1=class extends H1{constructor(H,C,V,L,t){super(H,C,V,L,t),this.type=5}_$AI(H,C=this){if((H=C1(this,H,C,0)??m)===j)return;let V=this._$AH,L=H===m&&V!==m||H.capture!==V.capture||H.once!==V.once||H.passive!==V.passive,t=H!==m&&(V===m||L);L&&this.element.removeEventListener(this.name,this,V),t&&this.element.addEventListener(this.name,this,H),this._$AH=H}handleEvent(H){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,H):this._$AH.handleEvent(H)}},D1=class{constructor(H,C,V){this.element=H,this.type=6,this._$AN=void 0,this._$AM=C,this.options=V}get _$AU(){return this._$AM._$AU}_$AI(H){C1(this,H)}};var W2=$1.litHtmlPolyfillSupport;W2?.(m1,p1),($1.litHtmlVersions??=[]).push("3.3.3");var A2=(M,H,C)=>{let V=C?.renderBefore??H,L=V._$litPart$;if(L===void 0){let t=C?.renderBefore??null;V._$litPart$=L=new p1(H.insertBefore(A1(),t),t,void 0,C??{})}return L._$AI(M),L};var W1=globalThis,x=class extends I{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let H=super.createRenderRoot();return this.renderOptions.renderBefore??=H.firstChild,H}update(H){let C=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(H),this._$Do=A2(C,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};x._$litElement$=!0,x.finalized=!0,W1.litElementHydrateSupport?.({LitElement:x});var U2=W1.litElementPolyfillSupport;U2?.({LitElement:x});(W1.litElementVersions??=[]).push("4.2.2");var c=M=>(H,C)=>{C!==void 0?C.addInitializer(()=>{customElements.define(M,H)}):customElements.define(M,H)};var G2={attribute:!0,type:String,converter:o1,reflect:!1,hasChanged:u1},Q2=(M=G2,H,C)=>{let{kind:V,metadata:L}=C,t=globalThis.litPropertyMetadata.get(L);if(t===void 0&&globalThis.litPropertyMetadata.set(L,t=new Map),V==="setter"&&((M=Object.create(M)).wrapped=!0),t.set(C.name,M),V==="accessor"){let{name:e}=C;return{set(o){let A=H.get.call(this);H.set.call(this,o),this.requestUpdate(e,A,M,!0,o)},init(o){return o!==void 0&&this.C(e,void 0,M,o),o}}}if(V==="setter"){let{name:e}=C;return function(o){let A=this[e];H.call(this,o),this.requestUpdate(e,A,M,!0,o)}}throw Error("Unsupported decorator location: "+V)};function p(M){return(H,C)=>typeof C=="object"?Q2(M,H,C):((V,L,t)=>{let e=L.hasOwnProperty(t);return L.constructor.createProperty(t,V),e?Object.getOwnPropertyDescriptor(L,t):void 0})(M,H,C)}function n(M){return p({...M,state:!0,attribute:!1})}var X=(M,H,C)=>(C.configurable=!0,C.enumerable=!0,Reflect.decorate&&typeof H!="object"&&Object.defineProperty(M,H,C),C);function V1(M,H){return(C,V,L)=>{let t=e=>e.renderRoot?.querySelector(M)??null;if(H){let{get:e,set:o}=typeof V=="object"?C:L??(()=>{let A=Symbol();return{get(){return this[A]},set(v){this[A]=v}}})();return X(C,V,{get(){let A=e.call(this);return A===void 0&&(A=t(this),(A!==null||this.hasUpdated)&&o.call(this,A)),A}})}return X(C,V,{get(){return t(this)}})}}var k="pro_budget",n1=class extends Error{constructor(C,V){super(V);this.code=C}};async function P(M,H){try{return await M.callWS(H)}catch(C){let V=C;throw new n1(V.code??"unknown",V.message??String(C))}}var u={subscribe(M,H){return M.connection.subscribeMessage(H,{type:`${k}/subscribe`})},createCategory:(M,H)=>P(M,{type:`${k}/categories/create`,fields:H}),updateCategory:(M,H,C)=>P(M,{type:`${k}/categories/update`,category_id:H,fields:C}),deleteCategory:(M,H)=>P(M,{type:`${k}/categories/delete`,category_id:H}),createItem:(M,H)=>P(M,{type:`${k}/items/create`,fields:H}),updateItem:(M,H,C)=>P(M,{type:`${k}/items/update`,item_id:H,fields:C}),deleteItem:(M,H)=>P(M,{type:`${k}/items/delete`,item_id:H}),setPaid:(M,H,C,V)=>P(M,{type:`${k}/paid/set`,item_id:H,date:C,paid:V}),stats:(M,H,C,V)=>P(M,{type:`${k}/stats`,year:H,month:C,...V?{user_id:V}:{}}),insights:(M,H,C)=>P(M,{type:`${k}/insights`,user_id:H,year:C}),updateConfig:(M,H)=>P(M,{type:`${k}/config/update`,...H}),occurrences:(M,H,C,V)=>P(M,{type:`${k}/occurrences`,start:H,end:C,...V?{user_id:V}:{}})};var c1={topBar:"ha-top-app-bar-fixed",menuButton:"ha-menu-button",iconButton:"ha-icon-button",card:"ha-card",icon:"ha-icon",form:"ha-form",dialog:"ha-dialog",dialogHeader:"ha-dialog-header",dialogFooter:"ha-dialog-footer",button:"ha-button",alert:"ha-alert",circularProgress:"ha-spinner",ripple:"ha-ripple",subpage:"hass-tabs-subpage",subpageDataTable:"hass-tabs-subpage-data-table",overflowMenu:"ha-icon-overflow-menu",svgIcon:"ha-svg-icon"},d2;function m2(){return d2??=(async()=>{try{await(await window.loadCardHelpers?.())?.createCardElement({type:"entities",entities:[]})?.constructor.getConfigElement?.()}catch{}await Promise.all([c1.form,c1.dialog,c1.subpage,c1.subpageDataTable].map(M=>Promise.race([customElements.whenDefined(M),new Promise(H=>setTimeout(H,4e3))])))})(),d2}var p2={"panel.title":"Budget","nav.overview":"\xDCbersicht","nav.items":"Posten","nav.calendar":"Kalender","nav.insights":"Einblicke","nav.settings":"Einstellungen","settings.categories":"Kategorien","settings.categories_hint":"Jeder Posten geh\xF6rt zu einer Kategorie. Eine verwendete Kategorie kann nicht gel\xF6scht werden.","settings.members":"Haushaltsmitglieder","settings.members_hint":"Home-Assistant-Benutzer, die im Budget erscheinen. Ohne Auswahl ist jeder aktive Benutzer Mitglied.","settings.members_admin":"Nur Administratoren k\xF6nnen die Haushaltseinstellungen \xE4ndern.","settings.household":"Haushalt","settings.currency":"W\xE4hrung","settings.currency_hint":"ISO-4217-Code. Leer lassen f\xFCr die W\xE4hrung von Home Assistant ({currency}).","settings.lead_days":"Tage im Voraus, ab denen eine Zahlung als anstehend gilt","settings.lead_days_hint":"Manuelle Zahlungen erscheinen so viele Tage vor der F\xE4lligkeit auf der To-do-Liste.","settings.about":"\xDCber","settings.version":"Pro Budget {version}","settings.saved":"Gespeichert.","validation.currency":"Gib einen dreistelligen W\xE4hrungscode ein oder lass das Feld leer.","validation.lead_days":"Gib eine Zahl von 0 bis 60 ein.","nav.categories":"Kategorien","common.all":"Alle","common.add":"Hinzuf\xFCgen","common.save":"Speichern","common.cancel":"Abbrechen","common.delete":"L\xF6schen","common.edit":"Bearbeiten","common.close":"Schlie\xDFen","common.loading":"L\xE4dt\u2026","common.unknown_user":"Ehemaliges Mitglied","common.monthly_hint":"Alle Betr\xE4ge als monatliches \xC4quivalent.","common.per_month":"/ Monat","common.error":"Etwas ist schiefgelaufen: {error}","common.today":"Heute","common.paid":"Bezahlt","common.unpaid":"Noch nicht bezahlt","type.earning":"Einnahme","type.expense":"Ausgabe","type.saving":"Sparen","type.earning.plural":"Einnahmen","type.expense.plural":"Ausgaben","type.saving.plural":"Sparen","recurrence.daily":"T\xE4glich","recurrence.weekly":"W\xF6chentlich","recurrence.biweekly":"Alle zwei Wochen","recurrence.monthly":"Monatlich","recurrence.quarterly":"Viertelj\xE4hrlich","recurrence.semi_annually":"Halbj\xE4hrlich","recurrence.annually":"J\xE4hrlich","cost_kind.fixed":"Fix","cost_kind.variable":"Variabel","payment.direct_debit":"Lastschrift","payment.standing_order":"Dauerauftrag","payment.manual":"Manuell / \xDCberweisung","payment.credit_card":"Kreditkarte","payment.paypal":"PayPal","due.on_day":"am {day}.","due.on_day_month":"am {day}. {month}","due.months":"am {day}. ({months})","overview.income":"Einnahmen","overview.expenses":"Ausgaben","overview.savings":"Sparen","overview.remaining":"Verbleibend","overview.members":"Mitglieder","overview.member":"Mitglied","overview.balance":"Saldo","overview.shared":"Gemeinsam","overview.personal":"Pers\xF6nlich","overview.fixed":"Fix","overview.variable":"Variabel","overview.fairness":"Fairness","overview.fairness_hint":"Anteil an den gemeinsamen Kosten gegen\xFCber dem Anteil am Haushaltseinkommen.","overview.shared_costs_paid":"Gemeinsame Kosten bezahlt","overview.shared_cost_share":"Anteil gemeinsame Kosten","overview.income_share":"Anteil Einkommen","overview.categories":"Nach Kategorie","overview.category":"Kategorie","overview.empty":"Noch keine Posten. Lege den ersten unter Posten an.","overview.other_currencies":"Posten in anderen W\xE4hrungen werden getrennt aufgef\xFChrt.","items.title":"Posten","items.add":"Posten hinzuf\xFCgen","items.search":"{count} Posten durchsuchen","items.group_by":"Gruppieren nach","items.group.category":"Kategorie","items.group.user":"Mitglied","items.group.type":"Typ","items.group.none":"Keine","categories.search":"{count} Kategorien durchsuchen","items.filter_type":"Typ","items.filter_user":"Mitglied","items.filter_category":"Kategorie","items.col_title":"Titel","items.col_amount":"Betrag","items.col_recurrence":"Turnus","items.col_due":"F\xE4llig","items.col_category":"Kategorie","items.col_user":"Mitglied","items.col_monthly":"Monatlich","items.empty":"Keine passenden Posten.","items.col_status":"Status","items.active":"Aktiv","items.inactive":"Inaktiv","item.title":"Titel","item.type":"Typ","item.amount":"Betrag","item.currency":"W\xE4hrung","item.category":"Kategorie","item.user":"Bezahlt von","item.user_earning":"Empfangen von","item.recurrence":"Turnus","item.due_weekday":"Wochentag","item.due_day":"Tag im Monat","item.due_month":"Erster Monat","item.cost_kind":"Fix / Variabel","item.shared":"Gemeinsamer Haushaltsposten","item.payment_method":"Zahlweise","item.start":"Startdatum","item.end":"Enddatum","item.advanced":"Erweitert","item.new":"Neuer Posten","item.edit":"Posten bearbeiten","item.delete_confirm":"\u201E{title}\u201C l\xF6schen?","item.amount_invalid":"Gib einen Betrag wie 12,50 ein.","calendar.agenda":"Agenda","calendar.month":"Monat","calendar.previous":"Zur\xFCck","calendar.next":"Weiter","calendar.empty":"In diesem Zeitraum ist nichts f\xE4llig.","calendar.unscheduled":"Nicht platzierbar (kein F\xE4lligkeitsmonat)","calendar.mark_paid":"Als bezahlt markieren","calendar.mark_unpaid":"Als unbezahlt markieren","calendar.weeks":"N\xE4chste {weeks} Wochen","insights.title":"Einblicke","insights.year":"Jahr","insights.savings_rate":"Sparquote","insights.fixed_cost_rate":"Fixkostenquote","insights.avg_month":"Durchschnittsmonat","insights.max_month":"Teuerster Monat","insights.min_month":"G\xFCnstigster Monat","insights.top_expenses":"Gr\xF6\xDFte Ausgaben","insights.payment_calendar":"Zahlungskalender {year}","insights.payment_calendar_hint":"Tats\xE4chliche Abfl\xFCsse je Monat, nicht normalisiert.","insights.unscheduled":"Nicht platzierbar: diese Posten haben keinen F\xE4lligkeitsmonat.","insights.no_member":"W\xE4hle ein Mitglied.","categories.title":"Kategorien","categories.add":"Kategorie hinzuf\xFCgen","categories.name":"Name","categories.color":"Farbe","categories.icon":"Symbol","categories.items":"{count} Posten","categories.in_use":"Wird von {count} Posten verwendet; l\xF6sche oder verschiebe sie zuerst.","categories.delete_confirm":"Kategorie \u201E{name}\u201C l\xF6schen?","categories.new":"Neue Kategorie","categories.edit":"Kategorie bearbeiten","validation.required":"Erforderlich","validation.amount":"Gib einen Betrag wie 12,50 ein.","validation.due_day":"Gib einen Tag von 1 bis {max} ein.","validation.end_before_start":"Das Enddatum liegt vor dem Startdatum.","errors.not_found":"Nicht gefunden.","errors.invalid":"Ung\xFCltige Eingabe: {message}","errors.in_use":"Wird noch verwendet."};var U1={"panel.title":"Budget","nav.overview":"Overview","nav.items":"Items","nav.calendar":"Calendar","nav.insights":"Insights","nav.settings":"Settings","settings.categories":"Categories","settings.categories_hint":"Every item belongs to a category. A category in use cannot be deleted.","settings.members":"Household members","settings.members_hint":"Home Assistant users who appear in the budget. With none selected, every active user is a member.","settings.members_admin":"Only administrators can change the household settings.","settings.household":"Household","settings.currency":"Currency","settings.currency_hint":"ISO 4217 code. Leave empty to use Home Assistant's currency ({currency}).","settings.lead_days":"Days ahead a payment counts as upcoming","settings.lead_days_hint":"Manual payments appear on the to-do list this many days before they are due.","settings.about":"About","settings.version":"Pro Budget {version}","settings.saved":"Saved.","validation.currency":"Enter a three-letter currency code or leave it empty.","validation.lead_days":"Enter a number from 0 to 60.","nav.categories":"Categories","common.all":"Everyone","common.add":"Add","common.save":"Save","common.cancel":"Cancel","common.delete":"Delete","common.edit":"Edit","common.close":"Close","common.loading":"Loading\u2026","common.unknown_user":"Former member","common.monthly_hint":"All amounts as monthly equivalents.","common.per_month":"/ month","common.error":"Something went wrong: {error}","common.today":"Today","common.none":"\u2014","common.paid":"Paid","common.unpaid":"Not paid yet","type.earning":"Earning","type.expense":"Expense","type.saving":"Saving","type.earning.plural":"Earnings","type.expense.plural":"Expenses","type.saving.plural":"Savings","recurrence.daily":"Daily","recurrence.weekly":"Weekly","recurrence.biweekly":"Every two weeks","recurrence.monthly":"Monthly","recurrence.quarterly":"Quarterly","recurrence.semi_annually":"Semi-annually","recurrence.annually":"Annually","cost_kind.fixed":"Fixed","cost_kind.variable":"Variable","payment.direct_debit":"Direct debit","payment.standing_order":"Standing order","payment.manual":"Manual / bank transfer","payment.credit_card":"Credit card","payment.paypal":"PayPal","due.on_day":"on the {day}.","due.on_day_month":"on the {day}. of {month}","due.months":"on the {day}. ({months})","overview.income":"Income","overview.expenses":"Expenses","overview.savings":"Savings","overview.remaining":"Remaining","overview.members":"Members","overview.member":"Member","overview.balance":"Balance","overview.shared":"Shared","overview.personal":"Personal","overview.fixed":"Fixed","overview.variable":"Variable","overview.fairness":"Fairness","overview.fairness_hint":"Share of shared costs paid versus share of household income.","overview.shared_costs_paid":"Shared costs paid","overview.shared_cost_share":"Share of shared costs","overview.income_share":"Share of income","overview.categories":"By category","overview.category":"Category","overview.empty":"No items yet. Add the first one under Items.","overview.other_currencies":"Items in other currencies are listed separately.","items.title":"Items","items.add":"Add item","items.search":"Search {count} items","items.group_by":"Group by","items.group.category":"Category","items.group.user":"Member","items.group.type":"Type","items.group.none":"None","categories.search":"Search {count} categories","items.filter_type":"Type","items.filter_user":"Member","items.filter_category":"Category","items.col_title":"Title","items.col_amount":"Amount","items.col_recurrence":"Recurrence","items.col_due":"Due","items.col_category":"Category","items.col_user":"Member","items.col_monthly":"Monthly","items.empty":"No items match.","items.col_status":"Status","items.active":"Active","items.inactive":"Inactive","item.title":"Title","item.type":"Type","item.amount":"Amount","item.currency":"Currency","item.category":"Category","item.user":"Paid by","item.user_earning":"Received by","item.recurrence":"Recurrence","item.due_weekday":"Weekday","item.due_day":"Day of month","item.due_month":"First month","item.cost_kind":"Fixed / variable","item.shared":"Shared household cost","item.payment_method":"Payment method","item.start":"Start date","item.end":"End date","item.advanced":"Advanced","item.new":"New item","item.edit":"Edit item","item.delete_confirm":"Delete \u201C{title}\u201D?","item.amount_invalid":"Enter an amount like 12.50.","calendar.agenda":"Agenda","calendar.month":"Month","calendar.previous":"Previous","calendar.next":"Next","calendar.empty":"Nothing due in this period.","calendar.unscheduled":"Not placeable (no due month)","calendar.mark_paid":"Mark paid","calendar.mark_unpaid":"Mark unpaid","calendar.weeks":"Next {weeks} weeks","insights.title":"Insights","insights.year":"Year","insights.savings_rate":"Savings rate","insights.fixed_cost_rate":"Fixed cost rate","insights.avg_month":"Average month","insights.max_month":"Most expensive month","insights.min_month":"Cheapest month","insights.top_expenses":"Largest expenses","insights.payment_calendar":"Payment calendar {year}","insights.payment_calendar_hint":"Actual outflows per month, not normalized.","insights.unscheduled":"Not placeable: these items have no due month.","insights.no_member":"Pick a member.","categories.title":"Categories","categories.add":"Add category","categories.name":"Name","categories.color":"Colour","categories.icon":"Icon","categories.items":"{count} items","categories.in_use":"In use by {count} items; delete or move them first.","categories.delete_confirm":"Delete category \u201C{name}\u201D?","categories.new":"New category","categories.edit":"Edit category","validation.required":"Required","validation.amount":"Enter an amount like 12.50.","validation.due_day":"Enter a day from 1 to {max}.","validation.end_before_start":"The end date is before the start date.","errors.not_found":"Not found.","errors.invalid":"Invalid input: {message}","errors.in_use":"Still in use."};var z2={en:U1,de:p2};function K2(M){return(M?.locale?.language??M?.language??"en").toLowerCase().split("-")[0]}function r(M,H,C){let V=z2[K2(M)]?.[H]??U1[H];if(C)for(let[L,t]of Object.entries(C))V=V.replaceAll(`{${L}}`,String(t));return V}var n2="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z";var l2="M9 17H7V10H9V17M13 17H11V7H13V17M17 17H15V13H17V17M19 19H5V5H19V19.1M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z";var v2="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";var h1="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";var x2="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z";var g1="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";var O1="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";var Z2="M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z";var s2=[{id:"overview",iconPath:Z2},{id:"items",iconPath:x2},{id:"calendar",iconPath:n2},{id:"insights",iconPath:l2},{id:"settings",iconPath:v2}],G1="/pro-budget";function Q1(M){let H=M?.path?.replace(/^\//,"").split("/")[0]??"";return H==="categories"&&(H="settings"),s2.some(C=>C.id===H)?H:"overview"}function _(M,H){let C=H?.prefix??G1;return s2.map(V=>({path:`${C}/${V.id}`,name:r(M,`nav.${V.id}`),iconPath:V.iconPath}))}function L1(M){return i`
    <ha-dialog
      open
      width="medium"
      .headerTitle=${M.heading}
      .preventScrimClose=${!!M.sticky}
      @closed=${M.onClosed}
    >
      ${M.content}
      <ha-dialog-footer slot="footer">
        ${M.actions.map(H=>i`
            <ha-button
              slot=${H.primary?"primaryAction":"secondaryAction"}
              data-action=${H.primary?"primary":"secondary"}
              appearance=${H.primary?"accent":"plain"}
              variant=${H.danger?"danger":"brand"}
              .disabled=${H.disabled??!1}
              @click=${H.onClick}
            >
              ${H.label}
            </ha-button>
          `)}
      </ha-dialog-footer>
    </ha-dialog>
  `}var g=Z`
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
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    border-radius: 16px;
    height: 32px;
    padding: 0 12px;
    cursor: pointer;
    font: inherit;
    font-size: 14px;
  }
  .chip[aria-pressed="true"] {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--text-primary-color);
  }
  .bar {
    height: 6px;
    border-radius: 3px;
    background: var(--divider-color);
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
`;function q2(M,H){return M?.localize("ui.common.error_required")||`${H} is required`}function E(M,H){let C=!!H.error&&!!H.touched;return i`
    <ha-input
      .label=${H.label}
      .value=${H.value==null?"":String(H.value)}
      .type=${H.type??"text"}
      .min=${H.min}
      .max=${H.max}
      ?required=${H.required}
      ?autofocus=${H.autofocus}
      auto-validate
      .invalid=${C}
      .validationMessage=${H.error??q2(M,H.label)}
      @input=${V=>H.onChange(V.target.value)}
      @change=${V=>H.onChange(V.target.value)}
    >
      ${H.suffix?i`<span slot="end">${H.suffix}</span>`:m}
    </ha-input>
  `}function W(M,H){return i`
    <ha-selector
      .hass=${M}
      .label=${H.label}
      .required=${H.required??!1}
      .selector=${{select:{mode:"dropdown",options:H.options}}}
      .value=${H.value==null?void 0:String(H.value)}
      @value-changed=${C=>H.onChange(C.detail.value)}
    ></ha-selector>
  `}function Y(M,H){return i`
    <ha-selector
      .hass=${M}
      .label=${H.label}
      .required=${H.required??!1}
      .selector=${H.selector}
      .value=${H.value}
      @value-changed=${C=>H.onChange(C.detail.value)}
    ></ha-selector>
  `}var M1=`
  .fields { display: flex; flex-direction: column; gap: 16px; }
  ha-expansion-panel { --expansion-panel-content-padding: 0 12px 12px; }
  ha-expansion-panel .fields { padding-top: 12px; }
`;function J(M){return M?.locale?.language??M?.language??"en"}var u2=new Map;function O(M,H,C){let V=`${J(M)}|${C}`,L=u2.get(V);if(!L){try{L=new Intl.NumberFormat(J(M),{style:"currency",currency:C})}catch{L=new Intl.NumberFormat(J(M),{minimumFractionDigits:2})}u2.set(V,L)}return L.format(H/100)}function S2(M,H,C,V){let L=O(M,Math.abs(H),C);return V?`\u2212${L}`:`+${L}`}function r1(M,H){return H===null?"\u2014":new Intl.NumberFormat(J(M),{style:"percent",maximumFractionDigits:1}).format(H)}function D(M){let H=M.getFullYear(),C=String(M.getMonth()+1).padStart(2,"0"),V=String(M.getDate()).padStart(2,"0");return`${H}-${C}-${V}`}function z1(M){let[H,C,V]=M.split("-").map(Number);return new Date(H,C-1,V)}function K1(M,H,C){return new Intl.DateTimeFormat(J(M),C).format(z1(H))}function $(M,H,C="long"){return new Intl.DateTimeFormat(J(M),{month:C}).format(new Date(2026,H-1,1))}function f1(M,H,C="long"){return new Intl.DateTimeFormat(J(M),{weekday:C}).format(new Date(2026,5,H))}function q1(M){let H=M.trim().replace(/\s/g,"");if(!H)return null;let C=H.lastIndexOf(","),V=H.lastIndexOf("."),L;return C>V?L=H.replace(/\./g,"").replace(",","."):V>C?L=H.replace(/,/g,""):L=H,/^\d+(\.\d{1,2})?$/.test(L)?Math.round(Number(L)*100):null}function c2(M){return(M/100).toFixed(2)}var h2=["earning","expense","saving"],g2=["daily","weekly","biweekly","monthly","quarterly","semi_annually","annually"],O2=["fixed","variable"],f2=["direct_debit","standing_order","manual","credit_card","paypal"],y1=["quarterly","semi_annually","annually"];function j2(M,H,C){return M?{title:M.title,type:M.type,amount:c2(M.amount),currency:M.currency??"",category_id:M.category_id,user_id:M.user_id,recurrence:M.recurrence,due_day:M.due_day??void 0,due_month:M.due_month??void 0,cost_kind:M.cost_kind,shared:M.shared,payment_method:M.payment_method??"",start:M.start??void 0,end:M.end??void 0}:{type:"expense",recurrence:"monthly",due_day:1,cost_kind:"fixed",shared:!1,category_id:H.categories[0]?.id,user_id:C??H.users[0]?.id,amount:""}}var f=class extends x{constructor(){super(...arguments);this._open=!1;this._data={};this._error="";this._saving=!1;this._touched=new Set;this._onClosed=C=>{C.target===this.renderRoot.querySelector("ha-dialog")&&this._close()}}open(C){this.budget&&(this._item=C,this._data=j2(C,this.budget,this.hass?.user?.id),this._error="",this._touched=new Set,this._open=!0)}_close(){this._open=!1}_set(C,V){this._touched=new Set([...this._touched,C]),this._data={...this._data,[C]:V}}get _errors(){let C=this._data,V=this.hass,L={};String(C.title??"").trim()||(L.title=r(V,"validation.required")),q1(String(C.amount??""))===null&&(L.amount=r(V,"validation.amount")),C.category_id||(L.category_id=r(V,"validation.required")),C.user_id||(L.user_id=r(V,"validation.required"));let t=String(C.recurrence??"");if(t!=="daily"){let e=Number(C.due_day),o=t==="weekly"||t==="biweekly"?7:31;(C.due_day==null||C.due_day===""||!Number.isInteger(e)||e<1||e>o)&&(L.due_day=r(V,"validation.due_day",{max:o}))}return y1.includes(t)&&!C.due_month&&(L.due_month=r(V,"validation.required")),C.start&&C.end&&String(C.start)>String(C.end)&&(L.end=r(V,"validation.end_before_start")),L}_fields(){let C=this._data,V=C.recurrence,L=y1.includes(V);return{title:String(C.title??"").trim(),type:C.type,amount:q1(String(C.amount??""))??0,currency:C.currency?String(C.currency).toUpperCase():null,category_id:String(C.category_id??""),user_id:String(C.user_id??""),recurrence:V,due_day:V==="daily"||C.due_day==null||C.due_day===""?null:Number(C.due_day),due_month:L&&C.due_month?Number(C.due_month):null,cost_kind:C.cost_kind??"fixed",shared:!!C.shared,payment_method:C.payment_method?C.payment_method:null,start:C.start?String(C.start):null,end:C.end?String(C.end):null}}async _save(){if(!Object.keys(this._errors).length){this._saving=!0,this._error="";try{this._item?await u.updateItem(this.hass,this._item.id,this._fields()):await u.createItem(this.hass,this._fields()),this._close()}catch(C){this._error=l1(this.hass,C)}finally{this._saving=!1}}}_renderFields(){let C=this.hass,V=this.budget,L=this._data,t=this._errors,e=d=>this._touched.has(d),o=(d,h)=>d.map(l=>({value:l,label:r(C,`${h}.${l}`)})),A=String(L.recurrence??""),v=A==="weekly"||A==="biweekly",s=y1.includes(A);return i`
      <div class="fields">
        ${E(C,{label:r(C,"item.title"),value:L.title,required:!0,autofocus:!0,error:t.title,touched:e("title"),onChange:d=>this._set("title",d)})}
        ${W(C,{label:r(C,"item.type"),value:L.type,required:!0,options:o(h2,"type"),onChange:d=>this._set("type",d)})}
        ${E(C,{label:r(C,"item.amount"),value:L.amount,required:!0,suffix:V.config.currency,error:t.amount,touched:e("amount"),onChange:d=>this._set("amount",d)})}
        ${W(C,{label:r(C,"item.cost_kind"),value:L.cost_kind,options:o(O2,"cost_kind"),onChange:d=>this._set("cost_kind",d)})}
        ${W(C,{label:r(C,"item.category"),value:L.category_id,required:!0,options:V.categories.map(d=>({value:d.id,label:d.name})),onChange:d=>this._set("category_id",d)})}
        ${W(C,{label:r(C,L.type==="earning"?"item.user_earning":"item.user"),value:L.user_id,required:!0,options:V.users.map(d=>({value:d.id,label:d.name})),onChange:d=>this._set("user_id",d)})}
        ${W(C,{label:r(C,"item.recurrence"),value:L.recurrence,required:!0,options:o(g2,"recurrence"),onChange:d=>this._set("recurrence",d)})}
        ${v?W(C,{label:r(C,"item.due_weekday"),value:L.due_day,required:!0,options:[1,2,3,4,5,6,7].map(d=>({value:String(d),label:f1(C,d)})),onChange:d=>this._set("due_day",d)}):A==="daily"?m:E(C,{label:r(C,"item.due_day"),value:L.due_day,required:!0,type:"number",min:1,max:31,error:t.due_day,touched:e("due_day"),onChange:d=>this._set("due_day",d)})}
        ${s?W(C,{label:r(C,"item.due_month"),value:L.due_month,required:!0,options:Array.from({length:12},(d,h)=>({value:String(h+1),label:$(C,h+1)})),onChange:d=>this._set("due_month",d)}):m}
        ${Y(C,{label:r(C,"item.shared"),value:!!L.shared,selector:{boolean:{}},onChange:d=>this._set("shared",!!d)})}
        <ha-expansion-panel outlined .header=${r(C,"item.advanced")}>
          <div class="fields">
            ${W(C,{label:r(C,"item.payment_method"),value:L.payment_method||"",options:[{value:"",label:r(C,"common.none")},...o(f2,"payment")],onChange:d=>this._set("payment_method",d)})}
            ${E(C,{label:r(C,"item.currency"),value:L.currency,onChange:d=>this._set("currency",d)})}
            ${Y(C,{label:r(C,"item.start"),value:L.start,selector:{date:{}},onChange:d=>this._set("start",d)})}
            ${Y(C,{label:r(C,"item.end"),value:L.end,selector:{date:{}},onChange:d=>this._set("end",d)})}
            ${t.end&&e("end")?i`<ha-alert alert-type="error">${t.end}</ha-alert>`:m}
          </div>
        </ha-expansion-panel>
      </div>
    `}render(){return!this._open||!this.budget?m:L1({heading:r(this.hass,this._item?"item.edit":"item.new"),sticky:!0,onClosed:this._onClosed,content:i`
        ${this._error?i`<ha-alert alert-type="error">${this._error}</ha-alert>`:m}
        ${this._renderFields()}
      `,actions:[{label:r(this.hass,"common.cancel"),onClick:()=>this._close()},{label:r(this.hass,"common.save"),primary:!0,disabled:this._saving||Object.keys(this._errors).length>0,onClick:()=>this._save()}]})}};f.styles=[g,U(M1),Z`
      ha-alert {
        display: block;
        margin-bottom: 12px;
      }
    `],a([p({attribute:!1})],f.prototype,"hass",2),a([p({attribute:!1})],f.prototype,"budget",2),a([n()],f.prototype,"_item",2),a([n()],f.prototype,"_open",2),a([n()],f.prototype,"_data",2),a([n()],f.prototype,"_error",2),a([n()],f.prototype,"_saving",2),a([n()],f.prototype,"_touched",2),f=a([c("pro-budget-item-dialog")],f);function l1(M,H){if(H instanceof n1){if(H.code==="not_found")return r(M,"errors.not_found");if(H.code==="in_use")return r(M,"errors.in_use");if(H.code==="invalid")return r(M,"errors.invalid",{message:H.message})}return r(M,"common.error",{error:String(H?.message??H)})}var T=class extends x{constructor(){super(...arguments);this._open=!1;this._data={};this._error="";this._touched=!1;this._onClosed=C=>{C.target===this.renderRoot.querySelector("ha-dialog")&&this._close()}}open(C){this._category=C,this._data=C?{name:C.name,icon:C.icon??void 0,color:C.color??void 0}:{},this._error="",this._touched=!1,this._open=!0}_close(){this._open=!1}get _nameError(){return String(this._data.name??"").trim()?void 0:r(this.hass,"validation.required")}async _save(){if(this._nameError)return;let C={name:String(this._data.name??"").trim(),icon:this._data.icon||null,color:this._data.color||null};try{this._category?await u.updateCategory(this.hass,this._category.id,C):await u.createCategory(this.hass,C),this._close()}catch(V){this._error=l1(this.hass,V)}}render(){if(!this._open)return m;let C=this.hass;return L1({heading:r(C,this._category?"categories.edit":"categories.new"),onClosed:this._onClosed,content:i`
        ${this._error?i`<ha-alert alert-type="error">${this._error}</ha-alert>`:m}
        <div class="fields">
          ${E(C,{label:r(C,"categories.name"),value:this._data.name,required:!0,autofocus:!0,error:this._nameError,touched:this._touched,onChange:V=>{this._touched=!0,this._data={...this._data,name:V}}})}
          ${Y(C,{label:r(C,"categories.icon"),value:this._data.icon,selector:{icon:{}},onChange:V=>this._data={...this._data,icon:V}})}
          ${Y(C,{label:r(C,"categories.color"),value:this._data.color,selector:{ui_color:{}},onChange:V=>this._data={...this._data,color:V}})}
        </div>
      `,actions:[{label:r(C,"common.cancel"),onClick:()=>this._close()},{label:r(C,"common.save"),primary:!0,disabled:!!this._nameError,onClick:()=>this._save()}]})}};T.styles=[g,U(M1),Z`
      ha-alert {
        display: block;
        margin-bottom: 12px;
      }
    `],a([p({attribute:!1})],T.prototype,"hass",2),a([n()],T.prototype,"_category",2),a([n()],T.prototype,"_open",2),a([n()],T.prototype,"_data",2),a([n()],T.prototype,"_error",2),a([n()],T.prototype,"_touched",2),T=a([c("pro-budget-category-dialog")],T);var Q=class extends x{constructor(){super(...arguments);this._text="";this._open=!1;this._onClosed=C=>{C.target===this.renderRoot.querySelector("ha-dialog")&&this._close(!1)}}open(C){return this._text=C,this._open=!0,new Promise(V=>this._resolve=V)}_close(C){this._open=!1,this._resolve?.(C),this._resolve=void 0}render(){return this._open?L1({heading:this._text,content:i``,onClosed:this._onClosed,actions:[{label:r(this.hass,"common.cancel"),onClick:()=>this._close(!1)},{label:r(this.hass,"common.delete"),primary:!0,danger:!0,onClick:()=>this._close(!0)}]}):i``}};Q.styles=Z`
    ha-dialog {
      --mdc-dialog-min-width: 320px;
    }
  `,a([p({attribute:!1})],Q.prototype,"hass",2),a([n()],Q.prototype,"_text",2),a([n()],Q.prototype,"_open",2),Q=a([c("pro-budget-confirm")],Q);function X2(M,H="var(--secondary-text-color)"){return M?M==="primary"?"var(--primary-color)":M==="accent"?"var(--accent-color)":`var(--${M}-color)`:H}function N(M,H="m"){if(!M?.icon)return i``;let C=X2(M.color),V=H==="m"?36:28,L=H==="m"?20:16;return i`
    <span
      style="display: inline-flex; align-items: center; justify-content: center; flex: none; width: ${V}px; height: ${V}px; border-radius: 50%; vertical-align: middle; color: ${C}; background: color-mix(in srgb, ${C} 20%, transparent)"
    >
      <ha-icon
        .icon=${M.icon}
        style="--mdc-icon-size: ${L}px; display: flex; line-height: 0; margin: 0; width: ${L}px; height: ${L}px"
      ></ha-icon>
    </span>
  `}function e1(M,H,C,V,L){if(H.users.length<2)return m;let t=e=>C===e||!V.all&&!C&&e===M?.user?.id;return i`
    <div class="members chips">
      ${V.all?i`<button class="chip" aria-pressed=${C===""} @click=${()=>L("")}>${r(M,"common.all")}</button>`:m}
      ${H.users.map(e=>i`<button class="chip" aria-pressed=${t(e.id)} @click=${()=>L(e.id)}>${e.name}</button>`)}
    </div>
  `}var y2=8,y=class extends x{constructor(){super(...arguments);this.userId="";this.narrow=!1;this._view="agenda";this._month=D(new Date).slice(0,7);this._days=[]}updated(C){["budget","userId","_view","_month"].some(V=>C.has(V))&&this._load()}_range(){if(this._view==="agenda"){let L=new Date,t=new Date;return t.setDate(t.getDate()+y2*7-1),[D(L),D(t)]}let[C,V]=this._month.split("-").map(Number);return[D(new Date(C,V-1,1)),D(new Date(C,V,0))]}async _load(){if(!this.hass||!this.budget)return;let[C,V]=this._range();this._days=await u.occurrences(this.hass,C,V,this.userId||void 0)}_item(C){return this.budget?.items.find(V=>V.id===C)}_categoryIcon(C){let V=this.budget?.categories.find(L=>L.id===C);return N(V,"s")}_shift(C){let[V,L]=this._month.split("-").map(Number);this._month=D(new Date(V,L-1+C,1)).slice(0,7)}async _togglePaid(C,V,L){await u.setPaid(this.hass,C,V,!L),await this._load()}_frame(C){let V=e1(this.hass,this.budget,this.userId,{all:!0},L=>this.dispatchEvent(new CustomEvent("user-changed",{detail:{userId:L},bubbles:!0,composed:!0})));return i`
      <hass-tabs-subpage .hass=${this.hass} .narrow=${this.narrow} .route=${this.route} .tabs=${_(this.hass,this.route)} main-page>
        ${V} ${C}
      </hass-tabs-subpage>
    `}render(){if(!this.budget)return m;let C=this.hass;return this._frame(i`
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
        ${this._view==="month"?i`
              <ha-icon-button .label=${r(C,"calendar.previous")} @click=${()=>this._shift(-1)}>
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </ha-icon-button>
              <strong>${K1(C,`${this._month}-01`,{month:"long",year:"numeric"})}</strong>
              <ha-icon-button .label=${r(C,"calendar.next")} @click=${()=>this._shift(1)}>
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </ha-icon-button>
            `:i`<span class="muted small">${r(C,"calendar.weeks",{weeks:y2})}</span>`}
      </div>
      <div class="cards">
        <ha-card>${this._view==="agenda"?this._renderAgenda():this._renderMonth()}</ha-card>
      </div>
    `)}_entry(C,V){let L=this._item(C.item_id);if(!L)return m;let t=L.currency??this.budget.config.currency,e=L.type!=="earning";return i`
      <div class="entry ${C.paid?"paid":""}">
        <span class="amount ${L.type}">${S2(this.hass,L.amount,t,e)}</span>
        ${this._categoryIcon(L.category_id)}
        <span class="title grow">${L.title}</span>
        ${e?i`
              <ha-icon-button
                .label=${r(this.hass,C.paid?"calendar.mark_unpaid":"calendar.mark_paid")}
                @click=${()=>this._togglePaid(L.id,V,C.paid)}
              >
                <ha-icon icon=${C.paid?"mdi:check-circle":"mdi:checkbox-blank-circle-outline"}></ha-icon>
              </ha-icon-button>
            `:m}
      </div>
    `}_renderAgenda(){let C=this.hass,V=D(new Date),L=this._days.filter(e=>e.date!==null),t=this._days.find(e=>e.date===null);return L.length===0&&!t?i`<div class="empty">${r(C,"calendar.empty")}</div>`:i`
      ${L.map(e=>i`
          <div class="day">
            <div class="date ${e.date===V?"today":""}">
              ${K1(C,e.date,{weekday:"short",day:"numeric",month:"short"})}
            </div>
            <div class="entries">${e.entries.map(o=>this._entry(o,e.date))}</div>
          </div>
        `)}
      ${t?i`
            <div class="day">
              <div class="date muted">${r(C,"calendar.unscheduled")}</div>
              <div class="entries">
                ${t.entries.map(e=>i`<div class="entry"><span class="title">${this._item(e.item_id)?.title}</span></div>`)}
              </div>
            </div>
          `:m}
    `}_renderMonth(){let C=this.hass,[V,L]=this._month.split("-").map(Number),e=(new Date(V,L-1,1).getDay()+6)%7,o=new Date(V,L,0).getDate(),A=[...Array(e).fill(null)];for(let l=1;l<=o;l++)A.push(D(new Date(V,L-1,l)));for(;A.length%7;)A.push(null);let v=new Map(this._days.filter(l=>l.date).map(l=>[l.date,l.entries])),s=D(new Date),d=this.budget.config.currency,h=[1,2,3,4,5,6,7].map(l=>new Intl.DateTimeFormat(C?.locale?.language??"en",{weekday:"short"}).format(new Date(2026,5,l)));return i`
      <div class="month-grid">
        ${h.map(l=>i`<div class="head">${l}</div>`)}
        ${A.map(l=>{if(!l)return i`<div class="cell outside"></div>`;let R=v.get(l)??[],k1=0;for(let w1 of R){let v1=this._item(w1.item_id);v1&&(k1+=v1.type==="earning"?v1.amount:-v1.amount)}return i`
            <div class="cell ${l===s?"today":""}">
              <div class="num">${z1(l).getDate()}</div>
              ${R.length?i`
                    <div class="sum ${k1<0?"expense":"earning"}">${O(C,k1,d)}</div>
                    ${R.slice(0,3).map(w1=>i`<div class="item">${this._item(w1.item_id)?.title}</div>`)}
                    ${R.length>3?i`<div class="item muted">+${R.length-3}</div>`:m}
                  `:m}
            </div>
          `})}
      </div>
      <p class="muted small" style="margin:8px 0 0">${$(C,L)} ${V}</p>
    `}};y.styles=[g,Z`
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
    `],a([p({attribute:!1})],y.prototype,"hass",2),a([p({attribute:!1})],y.prototype,"budget",2),a([p()],y.prototype,"userId",2),a([p({attribute:!1})],y.prototype,"route",2),a([p({type:Boolean})],y.prototype,"narrow",2),a([n()],y.prototype,"_view",2),a([n()],y.prototype,"_month",2),a([n()],y.prototype,"_days",2),y=a([c("pro-budget-calendar")],y);var r0={daily:365/12,weekly:52/12,biweekly:26/12,monthly:1,quarterly:1/3,semi_annually:1/6,annually:1/12},Y2={quarterly:3,semi_annually:6,annually:12};function J2(M,H){let C=Y2[M];if(!C)return[];let V=[];for(let L=(H-1)%C;L<12;L+=C)V.push(L+1);return V}function b2(M,H,C){let V=new Date(H,C,0).getDate(),L=`${H}-${String(C).padStart(2,"0")}-01`,t=`${H}-${String(C).padStart(2,"0")}-${String(V).padStart(2,"0")}`;return!(M.start&&M.start>t||M.end&&M.end<L)}function b1(M,H){if(H.recurrence==="daily"||H.due_day===null)return r(M,"common.none");if(H.recurrence==="weekly"||H.recurrence==="biweekly")return f1(M,H.due_day);if(H.due_month===null)return r(M,"due.on_day",{day:H.due_day});if(H.recurrence==="annually")return r(M,"due.on_day_month",{day:H.due_day,month:$(M,H.due_month)});let C=J2(H.recurrence,H.due_month);return C.length===0?r(M,"due.on_day",{day:H.due_day}):r(M,"due.months",{day:H.due_day,months:C.map(V=>$(M,V,"short")).join(", ")})}var w=class extends x{constructor(){super(...arguments);this.userId="";this.narrow=!1;this._year=new Date().getFullYear()}updated(C){["budget","userId","_year"].some(V=>C.has(V))&&this._load()}get _effectiveUser(){return this.userId||this.hass?.user?.id||this.budget?.users[0]?.id||""}async _load(){!this.hass||!this.budget||!this._effectiveUser||(this._insights=await u.insights(this.hass,this._effectiveUser,this._year))}_item(C){return this.budget?.items.find(V=>V.id===C)}_categoryIcon(C){let V=this.budget?.categories.find(L=>L.id===C);return N(V,"s")}_frame(C){let V=e1(this.hass,this.budget,this.userId,{all:!1},L=>this.dispatchEvent(new CustomEvent("user-changed",{detail:{userId:L},bubbles:!0,composed:!0})));return i`
      <hass-tabs-subpage .hass=${this.hass} .narrow=${this.narrow} .route=${this.route} .tabs=${_(this.hass,this.route)} main-page>
        ${V} ${C}
      </hass-tabs-subpage>
    `}render(){if(!this.budget)return m;let C=this.hass,V=this._insights,L=this.budget.config.currency,t=o=>O(C,o,L),e=this.budget.users.find(o=>o.id===this._effectiveUser);return e?this._frame(i`
      <div class="toolbar">
        <strong>${e.name}</strong>
        <span class="spacer"></span>
        <select class="select" .value=${String(this._year)} @change=${o=>this._year=Number(o.target.value)}>
          ${[-1,0,1].map(o=>{let A=new Date().getFullYear()+o;return i`<option value=${A} ?selected=${A===this._year}>${A}</option>`})}
        </select>
      </div>
      ${V?i`
            <div class="grid">
              ${[["insights.savings_rate",r1(C,V.savings_rate)],["insights.fixed_cost_rate",r1(C,V.fixed_cost_rate)],["insights.avg_month",t(V.avg_month)],["insights.max_month",V.max_month?$(C,V.max_month):r(C,"common.none")]].map(([o,A])=>i`
                  <ha-card>
                    <div class="stat"><span class="label">${r(C,o)}</span><span class="value">${A}</span></div>
                  </ha-card>
                `)}
            </div>
            <ha-card style="margin-top:16px">
              <h2>${r(C,"insights.payment_calendar",{year:this._year})}</h2>
              <p class="muted small">${r(C,"insights.payment_calendar_hint")}</p>
              ${this._renderMonths(V)}
              ${V.unscheduled.length?i`<p class="muted small">${r(C,"insights.unscheduled")} ${V.unscheduled.map(o=>this._item(o)?.title).join(", ")}</p>`:m}
            </ha-card>
            <div class="grid" style="margin-top:16px">
              ${this._group(r(C,"insights.top_expenses"),{items:V.expenses.items.slice(0,5),total:0},L,!1)}
              ${this._group(r(C,"type.earning.plural"),V.earnings,L)}
              ${this._group(r(C,"type.expense.plural"),V.expenses,L)}
              ${this._group(r(C,"type.saving.plural"),V.savings,L)}
            </div>
          `:i`<ha-card><div class="empty">${r(C,"common.loading")}</div></ha-card>`}
    `):this._frame(i`<div class="cards"><ha-card><div class="empty">${r(C,"insights.no_member")}</div></ha-card></div>`)}_renderMonths(C){let V=Math.max(1,...C.calendar.map(L=>L.total));return i`
      <div class="months">
        ${C.calendar.map(L=>i`
            <div class="month ${L.month===C.max_month?"max":L.month===C.min_month?"min":""}" title=${O(this.hass,L.total,this.budget.config.currency)}>
              <span class="total">${L.total?O(this.hass,L.total,this.budget.config.currency):""}</span>
              <div class="col" style="height:${Math.round(L.total/V*100)}%"></div>
              <span class="name">${$(this.hass,L.month,"short")}</span>
            </div>
          `)}
      </div>
    `}_group(C,V,L,t=!0){let e=this.hass;return i`
      <ha-card>
        <h2>${C}</h2>
        ${V.items.length===0?i`<div class="empty">${r(e,"common.none")}</div>`:i`
              <table class="plain">
                <tbody>
                  ${V.items.map(o=>{let A=this._item(o.item_id);return i`
                      <tr>
                        <td>${this._categoryIcon(A?.category_id)} ${A?.title??o.item_id}<br /><span class="muted small">${A?`${r(e,`recurrence.${A.recurrence}`)} \xB7 ${b1(e,A)}`:""}</span></td>
                        <td class="num">${O(e,o.monthly,L)}<span class="muted small"> ${r(e,"common.per_month")}</span></td>
                      </tr>
                    `})}
                  ${t?i`<tr><td><strong>Σ</strong></td><td class="num"><strong>${O(e,V.total,L)}</strong></td></tr>`:m}
                </tbody>
              </table>
            `}
      </ha-card>
    `}};w.styles=[g,Z`
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
    `],a([p({attribute:!1})],w.prototype,"hass",2),a([p({attribute:!1})],w.prototype,"budget",2),a([p()],w.prototype,"userId",2),a([p({attribute:!1})],w.prototype,"route",2),a([p({type:Boolean})],w.prototype,"narrow",2),a([n()],w.prototype,"_year",2),a([n()],w.prototype,"_insights",2),w=a([c("pro-budget-insights")],w);var C5={earning:"mdi:cash-plus",expense:"mdi:cash-minus",saving:"mdi:piggy-bank-outline"},H5={earning:"var(--success-color, #43a047)",expense:"var(--error-color, #db4437)",saving:"var(--info-color, #4a90d9)"},F=class extends x{constructor(){super(...arguments);this.narrow=!1;this._resize=new ResizeObserver(()=>this.requestUpdate())}connectedCallback(){super.connectedCallback(),this._resize.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resize.disconnect()}get _rows(){let C=this.budget,V=this.hass,L=new Date,t=e=>C.users.find(o=>o.id===e)?.name??r(V,"common.unknown_user");return C.items.map(e=>{let o=C.categories.find(A=>A.id===e.category_id);return{id:e.id,item:e,category_icon:{icon:o?.icon??C5[e.type],color:o?.color??null},title:e.title,type:r(V,`type.${e.type}`),amount:e.amount,category:o?.name??"",member:t(e.user_id),currency:e.currency??C.config.currency,recurrence:r(V,`recurrence.${e.recurrence}`),due:b1(V,e),cost:r(V,`cost_kind.${e.cost_kind}`),shared:e.shared?r(V,"overview.shared"):r(V,"overview.personal"),status:b2(e,L.getFullYear(),L.getMonth()+1)?r(V,"items.active"):r(V,"items.inactive")}})}get _columns(){let C=this.hass;return{icon:{title:"",type:"icon",showNarrow:!0,moveable:!1,template:V=>N(V.category_icon)},title:{title:r(C,"items.col_title"),main:!0,sortable:!0,filterable:!0,direction:"asc",flex:2,template:V=>i`
          <div style="font-weight: var(--ha-font-weight-medium, 500)">${V.title}</div>
          ${this.narrow?i`<div class="secondary">
                ${[O(C,V.amount,V.currency),V.recurrence,V.due,V.type,V.category,V.member].join(" \xB7 ")}
              </div>`:m}
        `},amount:{title:r(C,"items.col_amount"),type:"numeric",sortable:!0,minWidth:"120px",template:V=>i`<span style="color: ${H5[V.item.type]}">${O(C,V.amount,V.currency)}</span>`},recurrence:{title:r(C,"items.col_recurrence"),sortable:!0,groupable:!0,filterable:!0,minWidth:"120px"},due:{title:r(C,"items.col_due"),filterable:!0,minWidth:"120px"},type:{title:r(C,"items.filter_type"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px"},category:{title:r(C,"items.col_category"),sortable:!0,groupable:!0,filterable:!0,minWidth:"120px"},member:{title:r(C,"items.col_user"),sortable:!0,groupable:!0,filterable:!0,minWidth:"120px"},status:{title:r(C,"items.col_status"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px",defaultHidden:!0},cost:{title:r(C,"item.cost_kind"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px",defaultHidden:!0},shared:{title:r(C,"item.shared"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px",defaultHidden:!0},actions:{title:"",type:"overflow-menu",showNarrow:!0,moveable:!1,template:V=>i`
          <ha-icon-overflow-menu .hass=${C} .narrow=${this.narrow} .items=${this._menu(V.item)}></ha-icon-overflow-menu>
        `}}}_menu(C){return[{path:g1,label:r(this.hass,"common.edit"),action:()=>this._dialog.open(C)},{path:h1,label:r(this.hass,"common.delete"),warning:!0,action:()=>{this._delete(C)}}]}async _delete(C){await this._confirm.open(r(this.hass,"item.delete_confirm",{title:C.title}))&&await u.deleteItem(this.hass,C.id)}_rowClicked(C){let V=this.budget?.items.find(L=>L.id===C.detail.id);V&&this._dialog.open(V)}render(){if(!this.budget)return m;let C=this.hass,V={column:"amount",direction:"desc"};return i`
      <hass-tabs-subpage-data-table
        .hass=${C}
        .narrow=${this.narrow}
        .route=${this.route}
        .tabs=${_(C,this.route)}
        main-page
        has-fab
        clickable
        id="id"
        .columns=${this._columns}
        .data=${this._rows}
        .searchLabel=${r(C,"items.search",{count:this.budget.items.length})}
        .noDataText=${r(C,"items.empty")}
        .initialGroupColumn=${"category"}
        .initialSorting=${V}
        @row-click=${this._rowClicked}
      >
        <ha-button slot="fab" size="l" variant="brand" appearance="accent" @click=${()=>this._dialog.open()}>
          <ha-svg-icon slot="start" .path=${O1}></ha-svg-icon>
          ${r(C,"items.add")}
        </ha-button>
      </hass-tabs-subpage-data-table>
      <pro-budget-item-dialog .hass=${C} .budget=${this.budget}></pro-budget-item-dialog>
      <pro-budget-confirm .hass=${C}></pro-budget-confirm>
    `}};F.styles=[g,Z`
      :host {
        display: block;
        height: 100%;
      }
      /* Two-line main cell on narrow screens, as HA's entities page. */
      hass-tabs-subpage-data-table {
        --data-table-row-height: 60px;
      }
    `],a([p({attribute:!1})],F.prototype,"hass",2),a([p({attribute:!1})],F.prototype,"budget",2),a([p({attribute:!1})],F.prototype,"route",2),a([p({type:Boolean})],F.prototype,"narrow",2),a([V1("pro-budget-item-dialog")],F.prototype,"_dialog",2),a([V1("pro-budget-confirm")],F.prototype,"_confirm",2),F=a([c("pro-budget-items")],F);var B=class extends x{constructor(){super(...arguments);this.userId="";this.version="";this.narrow=!1;this._stats=[]}updated(C){(C.has("budget")||C.has("userId"))&&this._load()}async _load(){if(!this.hass||!this.budget)return;let C=new Date;this._stats=await u.stats(this.hass,C.getFullYear(),C.getMonth()+1,this.userId||void 0)}_user(C){return this.budget?.users.find(V=>V.id===C)?.name??r(this.hass,"common.unknown_user")}_category(C){let V=this.budget?.categories.find(L=>L.id===C);return i`
      ${N(V,"s")}
      ${V?.name??C}
    `}_frame(C){let V=e1(this.hass,this.budget,this.userId,{all:!0},L=>this.dispatchEvent(new CustomEvent("user-changed",{detail:{userId:L},bubbles:!0,composed:!0})));return i`
      <hass-tabs-subpage .hass=${this.hass} .narrow=${this.narrow} .route=${this.route} .tabs=${_(this.hass,this.route)} main-page>
        ${V} ${C}
      </hass-tabs-subpage>
    `}render(){return this.budget?this.budget.items.length===0?this._frame(i`<div class="cards"><ha-card><div class="empty">${r(this.hass,"overview.empty")}</div></ha-card></div>`):this._frame(i`
      <div class="cards">
        <p class="muted small" style="margin:0 0 12px">${r(this.hass,"common.monthly_hint")}</p>
        ${this._stats.map((C,V)=>this._renderCurrency(C,V>0))}
      </div>
    `):m}_renderCurrency(C,V){let L=this.hass,t=o=>O(L,o,C.currency),e=[["overview.income",C.totals.income,"earning"],["overview.expenses",C.totals.expenses,"expense"],["overview.savings",C.totals.savings,"saving"],["overview.remaining",C.totals.remaining,C.totals.remaining<0?"expense":""]];return i`
      ${V?i`<p class="muted small">${r(L,"overview.other_currencies")} (${C.currency})</p>`:m}
      <div class="grid">
        ${e.map(([o,A,v])=>i`
            <ha-card>
              <div class="stat">
                <span class="label">${r(L,o)}</span>
                <span class="value ${v}">${t(A)}</span>
              </div>
            </ha-card>
          `)}
      </div>
      <ha-card style="margin-top:16px">
        <h2>${r(L,"overview.members")}</h2>
        <div class="scroll">
          <table class="plain">
            <thead>
              <tr>
                <th>${r(L,"overview.member")}</th>
                <th class="num">${r(L,"overview.income")}</th>
                <th class="num">${r(L,"overview.expenses")}</th>
                <th class="num">${r(L,"overview.shared")}</th>
                <th class="num">${r(L,"overview.fixed")}</th>
                <th class="num">${r(L,"overview.savings")}</th>
                <th class="num">${r(L,"overview.balance")}</th>
              </tr>
            </thead>
            <tbody>
              ${C.members.map(o=>i`
                  <tr>
                    <td>${this._user(o.user_id)}</td>
                    <td class="num earning">${t(o.earnings)}</td>
                    <td class="num expense">${t(o.expenses.total)}</td>
                    <td class="num">${t(o.expenses.shared)}</td>
                    <td class="num">${t(o.expenses.fixed)}</td>
                    <td class="num saving">${t(o.savings)}</td>
                    <td class="num ${o.balance<0?"expense":""}">${t(o.balance)}</td>
                  </tr>
                `)}
            </tbody>
          </table>
        </div>
      </ha-card>
      <div class="grid" style="margin-top:16px">
        <ha-card>
          <h2>${r(L,"overview.fairness")}</h2>
          <p class="muted small">${r(L,"overview.fairness_hint")}</p>
          <table class="plain">
            <thead>
              <tr>
                <th>${r(L,"overview.member")}</th>
                <th class="num">${r(L,"overview.shared_costs_paid")}</th>
                <th class="num">${r(L,"overview.shared_cost_share")}</th>
                <th class="num">${r(L,"overview.income_share")}</th>
              </tr>
            </thead>
            <tbody>
              ${C.fairness.map(o=>i`
                  <tr>
                    <td>${this._user(o.user_id)}</td>
                    <td class="num">${t(o.shared_costs_paid)}</td>
                    <td class="num">${r1(L,o.shared_cost_share)}</td>
                    <td class="num">${r1(L,o.income_share)}</td>
                  </tr>
                `)}
            </tbody>
          </table>
        </ha-card>
        <ha-card>
          <h2>${r(L,"overview.categories")}</h2>
          <table class="plain">
            <thead>
              <tr>
                <th>${r(L,"overview.category")}</th>
                <th class="num">${r(L,"overview.expenses")}</th>
                <th class="num">${r(L,"overview.savings")}</th>
                <th class="num">${r(L,"overview.income")}</th>
              </tr>
            </thead>
            <tbody>
              ${C.categories.map(o=>i`
                  <tr>
                    <td>${this._category(o.category_id)}</td>
                    <td class="num">${o.expenses?t(o.expenses):""}</td>
                    <td class="num">${o.savings?t(o.savings):""}</td>
                    <td class="num">${o.earnings?t(o.earnings):""}</td>
                  </tr>
                `)}
            </tbody>
          </table>
        </ha-card>
      </div>
    `}};B.styles=[g,Z`
      :host {
        display: block;
        height: 100%;
      }
    `],a([p({attribute:!1})],B.prototype,"hass",2),a([p({attribute:!1})],B.prototype,"budget",2),a([p()],B.prototype,"userId",2),a([p()],B.prototype,"version",2),a([p({attribute:!1})],B.prototype,"route",2),a([p({type:Boolean})],B.prototype,"narrow",2),a([n()],B.prototype,"_stats",2),B=a([c("pro-budget-overview")],B);var S=class extends x{constructor(){super(...arguments);this.narrow=!1;this.version="";this._touched=new Set;this._saving="";this._message="";this._error=""}_count(C){return this.budget?.items.filter(V=>V.category_id===C.id).length??0}_menu(C){let V=this._count(C);return[{path:g1,label:r(this.hass,"common.edit"),action:()=>this._dialog.open(C)},{path:h1,label:V?r(this.hass,"categories.in_use",{count:V}):r(this.hass,"common.delete"),warning:!0,disabled:V>0,action:()=>{this._delete(C)}}]}async _delete(C){await this._confirm.open(r(this.hass,"categories.delete_confirm",{name:C.name}))&&await u.deleteCategory(this.hass,C.id)}_renderCategories(){let C=this.hass,V=this.budget;return i`
      <ha-card>
        <h1 class="card-header">${r(C,"settings.categories")}</h1>
        <div class="card-content">
          <p class="hint">${r(C,"settings.categories_hint")}</p>
          <ha-md-list>
            ${V.categories.map(L=>i`
                <ha-md-list-item type="button" @click=${()=>this._dialog.open(L)}>
                  <span slot="start">${N(L)}</span>
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
            <ha-svg-icon slot="start" .path=${O1}></ha-svg-icon>${r(C,"categories.add")}
          </ha-button>
        </div>
      </ha-card>
    `}get _isAdmin(){return!!this.hass?.user?.is_admin}get _memberSet(){return this._members??new Set(this.budget.config.members)}_toggleMember(C,V){let L=new Set(this._memberSet);V?L.add(C):L.delete(C),this._members=L}get _membersChanged(){let C=[...this.budget.config.members].sort().join(",");return[...this._memberSet].sort().join(",")!==C}async _saveMembers(){await this._save("members",{members:[...this._memberSet]}),this._members=void 0}_renderMembers(){let C=this.hass,V=this.budget,L=this._memberSet,t=L.size===0;return i`
      <ha-card>
        <h1 class="card-header">${r(C,"settings.members")}</h1>
        <div class="card-content">
          <p class="hint">${r(C,"settings.members_hint")}</p>
          ${this._isAdmin?m:i`<ha-alert alert-type="info">${r(C,"settings.members_admin")}</ha-alert>`}
          <ha-md-list>
            ${V.all_users.map(e=>i`
                <ha-md-list-item>
                  <ha-checkbox
                    slot="start"
                    .checked=${t||L.has(e.id)}
                    .disabled=${!this._isAdmin}
                    @change=${o=>this._toggleMember(e.id,o.target.checked)}
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
    `}get _currencyValue(){return this._currency??this.budget.config.currency_override??""}get _leadDaysValue(){return this._leadDays??String(this.budget.config.lead_days)}get _currencyError(){let C=this._currencyValue.trim();return C===""||/^[A-Za-z]{3}$/.test(C)?void 0:r(this.hass,"validation.currency")}get _leadDaysError(){let C=Number(this._leadDaysValue);return this._leadDaysValue.trim()!==""&&Number.isInteger(C)&&C>=0&&C<=60?void 0:r(this.hass,"validation.lead_days")}get _householdChanged(){let C=this.budget;return this._currencyValue.trim().toUpperCase()!==(C.config.currency_override??"")||Number(this._leadDaysValue)!==C.config.lead_days}async _saveHousehold(){await this._save("household",{currency:this._currencyValue.trim().toUpperCase()||null,lead_days:Number(this._leadDaysValue)}),this._currency=void 0,this._leadDays=void 0}_renderHousehold(){let C=this.hass,V=L=>this._touched.has(L);return i`
      <ha-card>
        <h1 class="card-header">${r(C,"settings.household")}</h1>
        <div class="card-content">
          ${this._isAdmin?m:i`<ha-alert alert-type="info">${r(C,"settings.members_admin")}</ha-alert>`}
          <div class="fields">
            <div>
              ${E(C,{label:r(C,"settings.currency"),value:this._currencyValue,error:this._currencyError,touched:V("currency"),onChange:L=>{this._touched=new Set([...this._touched,"currency"]),this._currency=L}})}
              <p class="hint small" style="margin: 4px 0 0">
                ${r(C,"settings.currency_hint",{currency:this.hass?.config.currency??""})}
              </p>
            </div>
            <div>
              ${E(C,{label:r(C,"settings.lead_days"),value:this._leadDaysValue,type:"number",min:0,max:60,required:!0,error:this._leadDaysError,touched:V("lead_days"),onChange:L=>{this._touched=new Set([...this._touched,"lead_days"]),this._leadDays=L}})}
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
    `}async _save(C,V){this._saving=C,this._error="",this._message="";try{await u.updateConfig(this.hass,V),this._message=r(this.hass,"settings.saved")}catch(L){this._error=l1(this.hass,L)}finally{this._saving=""}}render(){if(!this.budget)return m;let C=this.hass;return i`
      <hass-tabs-subpage .hass=${C} .narrow=${this.narrow} .route=${this.route} .tabs=${_(C,this.route)} main-page>
        <div class="content">
          ${this._error?i`<ha-alert alert-type="error">${this._error}</ha-alert>`:m}
          ${this._message?i`<ha-alert alert-type="success">${this._message}</ha-alert>`:m}
          ${this._renderMembers()} ${this._renderHousehold()} ${this._renderCategories()}
          <ha-card>
            <h1 class="card-header">${r(C,"settings.about")}</h1>
            <div class="card-content">${r(C,"settings.version",{version:this.version})}</div>
          </ha-card>
        </div>
      </hass-tabs-subpage>
      <pro-budget-category-dialog .hass=${C}></pro-budget-category-dialog>
      <pro-budget-confirm .hass=${C}></pro-budget-confirm>
    `}};S.styles=[g,U(M1),Z`
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
    `],a([p({attribute:!1})],S.prototype,"hass",2),a([p({attribute:!1})],S.prototype,"budget",2),a([p({attribute:!1})],S.prototype,"route",2),a([p({type:Boolean})],S.prototype,"narrow",2),a([p()],S.prototype,"version",2),a([n()],S.prototype,"_members",2),a([n()],S.prototype,"_currency",2),a([n()],S.prototype,"_leadDays",2),a([n()],S.prototype,"_touched",2),a([n()],S.prototype,"_saving",2),a([n()],S.prototype,"_message",2),a([n()],S.prototype,"_error",2),a([V1("pro-budget-category-dialog")],S.prototype,"_dialog",2),a([V1("pro-budget-confirm")],S.prototype,"_confirm",2),S=a([c("pro-budget-settings")],S);var b=class extends x{constructor(){super(...arguments);this.narrow=!1;this._ready=!1;this._error="";this._userId=""}connectedCallback(){super.connectedCallback(),this._start()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.(),this._unsubscribe=void 0}updated(C){C.has("hass")&&this.hass&&!this._unsubscribe&&this._start(),C.has("route")&&this._redirectToView()}_redirectToView(){let C=this.route;!C||C.path.replace(/\//g,"")!==""||(history.replaceState(null,"",`${C.prefix??G1}/${Q1(C)}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!0}})))}async _start(){if(!(!this.hass||this._unsubscribe))try{await m2(),this._unsubscribe=await u.subscribe(this.hass,C=>this._budget=C),this._ready=!0}catch(C){this._error=String(C?.message??C)}}render(){let C=this.hass,V=this._budget;if(this._error)return i`<ha-alert alert-type="error">${this._error}</ha-alert>`;if(!this._ready||!V)return i`<div class="loading">${r(C,"common.loading")}</div>`;let L={hass:C,narrow:this.narrow,route:this.route,budget:V,version:"0.1.0"},t=e=>this._userId=e.detail.userId;switch(Q1(this.route)){case"items":return i`<pro-budget-items .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${V}></pro-budget-items>`;case"calendar":return i`<pro-budget-calendar .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${V} .userId=${this._userId} @user-changed=${t}></pro-budget-calendar>`;case"insights":return i`<pro-budget-insights .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${V} .userId=${this._userId} @user-changed=${t}></pro-budget-insights>`;case"settings":return i`<pro-budget-settings .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${V} .version=${L.version}></pro-budget-settings>`;default:return i`<pro-budget-overview .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${V} .userId=${this._userId} .version=${L.version} @user-changed=${t}></pro-budget-overview>`}return m}};b.styles=Z`
    :host {
      display: block;
      height: 100%;
    }
    .loading,
    ha-alert {
      display: block;
      padding: 16px;
    }
  `,a([p({attribute:!1})],b.prototype,"hass",2),a([p({type:Boolean})],b.prototype,"narrow",2),a([p({attribute:!1})],b.prototype,"route",2),a([p({attribute:!1})],b.prototype,"panel",2),a([n()],b.prototype,"_budget",2),a([n()],b.prototype,"_ready",2),a([n()],b.prototype,"_error",2),a([n()],b.prototype,"_userId",2),b=a([c("pro-budget-panel")],b);console.info("%c PRO-BUDGET %c v0.1.0 ","color: white; background: #3f51b5; font-weight: 700;","color: #3f51b5; background: white; font-weight: 700;");
