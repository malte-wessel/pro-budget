/* pro-budget v0.1.0 | MIT | https://github.com/malte-wessel/pro-budget */
var f2=Object.defineProperty;var y2=Object.getOwnPropertyDescriptor;var a=(M,H,C,V)=>{for(var L=V>1?void 0:V?y2(H,C):H,t=M.length-1,r;t>=0;t--)(r=M[t])&&(L=(V?r(H,C,L):r(L))||L);return V&&L&&f2(H,C,L),L};var d1=globalThis,m1=d1.ShadowRoot&&(d1.ShadyCSS===void 0||d1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,O1=Symbol(),U1=new WeakMap,V1=class{constructor(H,C,V){if(this._$cssResult$=!0,V!==O1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=H,this.t=C}get styleSheet(){let H=this.o,C=this.t;if(m1&&H===void 0){let V=C!==void 0&&C.length===1;V&&(H=U1.get(C)),H===void 0&&((this.o=H=new CSSStyleSheet).replaceSync(this.cssText),V&&U1.set(C,H))}return H}toString(){return this.cssText}},G1=M=>new V1(typeof M=="string"?M:M+"",void 0,O1),s=(M,...H)=>{let C=M.length===1?M[0]:H.reduce((V,L,t)=>V+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(L)+M[t+1],M[0]);return new V1(C,M,O1)},Q1=(M,H)=>{if(m1)M.adoptedStyleSheets=H.map(C=>C instanceof CSSStyleSheet?C:C.styleSheet);else for(let C of H){let V=document.createElement("style"),L=d1.litNonce;L!==void 0&&V.setAttribute("nonce",L),V.textContent=C.cssText,M.appendChild(V)}},g1=m1?M=>M:M=>M instanceof CSSStyleSheet?(H=>{let C="";for(let V of H.cssRules)C+=V.cssText;return G1(C)})(M):M;var{is:k2,defineProperty:b2,getOwnPropertyDescriptor:w2,getOwnPropertyNames:B2,getOwnPropertySymbols:P2,getPrototypeOf:T2}=Object,p1=globalThis,z1=p1.trustedTypes,F2=z1?z1.emptyScript:"",R2=p1.reactiveElementPolyfillSupport,L1=(M,H)=>M,M1={toAttribute(M,H){switch(H){case Boolean:M=M?F2:null;break;case Object:case Array:M=M==null?M:JSON.stringify(M)}return M},fromAttribute(M,H){let C=M;switch(H){case Boolean:C=M!==null;break;case Number:C=M===null?null:Number(M);break;case Object:case Array:try{C=JSON.parse(M)}catch{C=null}}return C}},n1=(M,H)=>!k2(M,H),K1={attribute:!0,type:String,converter:M1,reflect:!1,useDefault:!1,hasChanged:n1};Symbol.metadata??=Symbol("metadata"),p1.litPropertyMetadata??=new WeakMap;var N=class extends HTMLElement{static addInitializer(H){this._$Ei(),(this.l??=[]).push(H)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(H,C=K1){if(C.state&&(C.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(H)&&((C=Object.create(C)).wrapped=!0),this.elementProperties.set(H,C),!C.noAccessor){let V=Symbol(),L=this.getPropertyDescriptor(H,V,C);L!==void 0&&b2(this.prototype,H,L)}}static getPropertyDescriptor(H,C,V){let{get:L,set:t}=w2(this.prototype,H)??{get(){return this[C]},set(r){this[C]=r}};return{get:L,set(r){let i=L?.call(this);t?.call(this,r),this.requestUpdate(H,i,V)},configurable:!0,enumerable:!0}}static getPropertyOptions(H){return this.elementProperties.get(H)??K1}static _$Ei(){if(this.hasOwnProperty(L1("elementProperties")))return;let H=T2(this);H.finalize(),H.l!==void 0&&(this.l=[...H.l]),this.elementProperties=new Map(H.elementProperties)}static finalize(){if(this.hasOwnProperty(L1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(L1("properties"))){let C=this.properties,V=[...B2(C),...P2(C)];for(let L of V)this.createProperty(L,C[L])}let H=this[Symbol.metadata];if(H!==null){let C=litPropertyMetadata.get(H);if(C!==void 0)for(let[V,L]of C)this.elementProperties.set(V,L)}this._$Eh=new Map;for(let[C,V]of this.elementProperties){let L=this._$Eu(C,V);L!==void 0&&this._$Eh.set(L,C)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(H){let C=[];if(Array.isArray(H)){let V=new Set(H.flat(1/0).reverse());for(let L of V)C.unshift(g1(L))}else H!==void 0&&C.push(g1(H));return C}static _$Eu(H,C){let V=C.attribute;return V===!1?void 0:typeof V=="string"?V:typeof H=="string"?H.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(H=>this.enableUpdating=H),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(H=>H(this))}addController(H){(this._$EO??=new Set).add(H),this.renderRoot!==void 0&&this.isConnected&&H.hostConnected?.()}removeController(H){this._$EO?.delete(H)}_$E_(){let H=new Map,C=this.constructor.elementProperties;for(let V of C.keys())this.hasOwnProperty(V)&&(H.set(V,this[V]),delete this[V]);H.size>0&&(this._$Ep=H)}createRenderRoot(){let H=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Q1(H,this.constructor.elementStyles),H}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(H=>H.hostConnected?.())}enableUpdating(H){}disconnectedCallback(){this._$EO?.forEach(H=>H.hostDisconnected?.())}attributeChangedCallback(H,C,V){this._$AK(H,V)}_$ET(H,C){let V=this.constructor.elementProperties.get(H),L=this.constructor._$Eu(H,V);if(L!==void 0&&V.reflect===!0){let t=(V.converter?.toAttribute!==void 0?V.converter:M1).toAttribute(C,V.type);this._$Em=H,t==null?this.removeAttribute(L):this.setAttribute(L,t),this._$Em=null}}_$AK(H,C){let V=this.constructor,L=V._$Eh.get(H);if(L!==void 0&&this._$Em!==L){let t=V.getPropertyOptions(L),r=typeof t.converter=="function"?{fromAttribute:t.converter}:t.converter?.fromAttribute!==void 0?t.converter:M1;this._$Em=L;let i=r.fromAttribute(C,t.type);this[L]=i??this._$Ej?.get(L)??i,this._$Em=null}}requestUpdate(H,C,V,L=!1,t){if(H!==void 0){let r=this.constructor;if(L===!1&&(t=this[H]),V??=r.getPropertyOptions(H),!((V.hasChanged??n1)(t,C)||V.useDefault&&V.reflect&&t===this._$Ej?.get(H)&&!this.hasAttribute(r._$Eu(H,V))))return;this.C(H,C,V)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(H,C,{useDefault:V,reflect:L,wrapped:t},r){V&&!(this._$Ej??=new Map).has(H)&&(this._$Ej.set(H,r??C??this[H]),t!==!0||r!==void 0)||(this._$AL.has(H)||(this.hasUpdated||V||(C=void 0),this._$AL.set(H,C)),L===!0&&this._$Em!==H&&(this._$Eq??=new Set).add(H))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(C){Promise.reject(C)}let H=this.scheduleUpdate();return H!=null&&await H,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[L,t]of this._$Ep)this[L]=t;this._$Ep=void 0}let V=this.constructor.elementProperties;if(V.size>0)for(let[L,t]of V){let{wrapped:r}=t,i=this[L];r!==!0||this._$AL.has(L)||i===void 0||this.C(L,void 0,t,i)}}let H=!1,C=this._$AL;try{H=this.shouldUpdate(C),H?(this.willUpdate(C),this._$EO?.forEach(V=>V.hostUpdate?.()),this.update(C)):this._$EM()}catch(V){throw H=!1,this._$EM(),V}H&&this._$AE(C)}willUpdate(H){}_$AE(H){this._$EO?.forEach(C=>C.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(H)),this.updated(H)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(H){return!0}update(H){this._$Eq&&=this._$Eq.forEach(C=>this._$ET(C,this[C])),this._$EM()}updated(H){}firstUpdated(H){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[L1("elementProperties")]=new Map,N[L1("finalized")]=new Map,R2?.({ReactiveElement:N}),(p1.reactiveElementVersions??=[]).push("2.1.2");var P1=globalThis,q1=M=>M,l1=P1.trustedTypes,j1=l1?l1.createPolicy("lit-html",{createHTML:M=>M}):void 0,V2="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,L2="?"+I,_2=`<${L2}>`,Q=document,e1=()=>Q.createComment(""),t1=M=>M===null||typeof M!="object"&&typeof M!="function",T1=Array.isArray,D2=M=>T1(M)||typeof M?.[Symbol.iterator]=="function",f1=`[ 	
\f\r]`,r1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,X1=/-->/g,Y1=/>/g,U=RegExp(`>|${f1}(?:([^\\s"'>=/]+)(${f1}*=${f1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),J1=/'/g,C2=/"/g,M2=/^(?:script|style|textarea|title)$/i,F1=M=>(H,...C)=>({_$litType$:M,strings:H,values:C}),o=F1(1),M5=F1(2),r5=F1(3),z=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),H2=new WeakMap,G=Q.createTreeWalker(Q,129);function r2(M,H){if(!T1(M)||!M.hasOwnProperty("raw"))throw Error("invalid template strings array");return j1!==void 0?j1.createHTML(H):H}var E2=(M,H)=>{let C=M.length-1,V=[],L,t=H===2?"<svg>":H===3?"<math>":"",r=r1;for(let i=0;i<C;i++){let A=M[i],m,Z,n=-1,b=0;for(;b<A.length&&(r.lastIndex=b,Z=r.exec(A),Z!==null);)b=r.lastIndex,r===r1?Z[1]==="!--"?r=X1:Z[1]!==void 0?r=Y1:Z[2]!==void 0?(M2.test(Z[2])&&(L=RegExp("</"+Z[2],"g")),r=U):Z[3]!==void 0&&(r=U):r===U?Z[0]===">"?(r=L??r1,n=-1):Z[1]===void 0?n=-2:(n=r.lastIndex-Z[2].length,m=Z[1],r=Z[3]===void 0?U:Z[3]==='"'?C2:J1):r===C2||r===J1?r=U:r===X1||r===Y1?r=r1:(r=U,L=void 0);let v=r===U&&M[i+1].startsWith("/>")?" ":"";t+=r===r1?A+_2:n>=0?(V.push(m),A.slice(0,n)+V2+A.slice(n)+I+v):A+I+(n===-2?i:v)}return[r2(M,t+(M[C]||"<?>")+(H===2?"</svg>":H===3?"</math>":"")),V]},i1=class M{constructor({strings:H,_$litType$:C},V){let L;this.parts=[];let t=0,r=0,i=H.length-1,A=this.parts,[m,Z]=E2(H,C);if(this.el=M.createElement(m,V),G.currentNode=this.el.content,C===2||C===3){let n=this.el.content.firstChild;n.replaceWith(...n.childNodes)}for(;(L=G.nextNode())!==null&&A.length<i;){if(L.nodeType===1){if(L.hasAttributes())for(let n of L.getAttributeNames())if(n.endsWith(V2)){let b=Z[r++],v=L.getAttribute(n).split(I),T=/([.?@])?(.*)/.exec(b);A.push({type:1,index:t,name:T[2],strings:v,ctor:T[1]==="."?k1:T[1]==="?"?b1:T[1]==="@"?w1:X}),L.removeAttribute(n)}else n.startsWith(I)&&(A.push({type:6,index:t}),L.removeAttribute(n));if(M2.test(L.tagName)){let n=L.textContent.split(I),b=n.length-1;if(b>0){L.textContent=l1?l1.emptyScript:"";for(let v=0;v<b;v++)L.append(n[v],e1()),G.nextNode(),A.push({type:2,index:++t});L.append(n[b],e1())}}}else if(L.nodeType===8)if(L.data===L2)A.push({type:2,index:t});else{let n=-1;for(;(n=L.data.indexOf(I,n+1))!==-1;)A.push({type:7,index:t}),n+=I.length-1}t++}}static createElement(H,C){let V=Q.createElement("template");return V.innerHTML=H,V}};function j(M,H,C=M,V){if(H===z)return H;let L=V!==void 0?C._$Co?.[V]:C._$Cl,t=t1(H)?void 0:H._$litDirective$;return L?.constructor!==t&&(L?._$AO?.(!1),t===void 0?L=void 0:(L=new t(M),L._$AT(M,C,V)),V!==void 0?(C._$Co??=[])[V]=L:C._$Cl=L),L!==void 0&&(H=j(M,L._$AS(M,H.values),L,V)),H}var y1=class{constructor(H,C){this._$AV=[],this._$AN=void 0,this._$AD=H,this._$AM=C}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(H){let{el:{content:C},parts:V}=this._$AD,L=(H?.creationScope??Q).importNode(C,!0);G.currentNode=L;let t=G.nextNode(),r=0,i=0,A=V[0];for(;A!==void 0;){if(r===A.index){let m;A.type===2?m=new o1(t,t.nextSibling,this,H):A.type===1?m=new A.ctor(t,A.name,A.strings,this,H):A.type===6&&(m=new B1(t,this,H)),this._$AV.push(m),A=V[++i]}r!==A?.index&&(t=G.nextNode(),r++)}return G.currentNode=Q,L}p(H){let C=0;for(let V of this._$AV)V!==void 0&&(V.strings!==void 0?(V._$AI(H,V,C),C+=V.strings.length-2):V._$AI(H[C])),C++}},o1=class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(H,C,V,L){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=H,this._$AB=C,this._$AM=V,this.options=L,this._$Cv=L?.isConnected??!0}get parentNode(){let H=this._$AA.parentNode,C=this._$AM;return C!==void 0&&H?.nodeType===11&&(H=C.parentNode),H}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(H,C=this){H=j(this,H,C),t1(H)?H===d||H==null||H===""?(this._$AH!==d&&this._$AR(),this._$AH=d):H!==this._$AH&&H!==z&&this._(H):H._$litType$!==void 0?this.$(H):H.nodeType!==void 0?this.T(H):D2(H)?this.k(H):this._(H)}O(H){return this._$AA.parentNode.insertBefore(H,this._$AB)}T(H){this._$AH!==H&&(this._$AR(),this._$AH=this.O(H))}_(H){this._$AH!==d&&t1(this._$AH)?this._$AA.nextSibling.data=H:this.T(Q.createTextNode(H)),this._$AH=H}$(H){let{values:C,_$litType$:V}=H,L=typeof V=="number"?this._$AC(H):(V.el===void 0&&(V.el=i1.createElement(r2(V.h,V.h[0]),this.options)),V);if(this._$AH?._$AD===L)this._$AH.p(C);else{let t=new y1(L,this),r=t.u(this.options);t.p(C),this.T(r),this._$AH=t}}_$AC(H){let C=H2.get(H.strings);return C===void 0&&H2.set(H.strings,C=new i1(H)),C}k(H){T1(this._$AH)||(this._$AH=[],this._$AR());let C=this._$AH,V,L=0;for(let t of H)L===C.length?C.push(V=new M(this.O(e1()),this.O(e1()),this,this.options)):V=C[L],V._$AI(t),L++;L<C.length&&(this._$AR(V&&V._$AB.nextSibling,L),C.length=L)}_$AR(H=this._$AA.nextSibling,C){for(this._$AP?.(!1,!0,C);H!==this._$AB;){let V=q1(H).nextSibling;q1(H).remove(),H=V}}setConnected(H){this._$AM===void 0&&(this._$Cv=H,this._$AP?.(H))}},X=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(H,C,V,L,t){this.type=1,this._$AH=d,this._$AN=void 0,this.element=H,this.name=C,this._$AM=L,this.options=t,V.length>2||V[0]!==""||V[1]!==""?(this._$AH=Array(V.length-1).fill(new String),this.strings=V):this._$AH=d}_$AI(H,C=this,V,L){let t=this.strings,r=!1;if(t===void 0)H=j(this,H,C,0),r=!t1(H)||H!==this._$AH&&H!==z,r&&(this._$AH=H);else{let i=H,A,m;for(H=t[0],A=0;A<t.length-1;A++)m=j(this,i[V+A],C,A),m===z&&(m=this._$AH[A]),r||=!t1(m)||m!==this._$AH[A],m===d?H=d:H!==d&&(H+=(m??"")+t[A+1]),this._$AH[A]=m}r&&!L&&this.j(H)}j(H){H===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,H??"")}},k1=class extends X{constructor(){super(...arguments),this.type=3}j(H){this.element[this.name]=H===d?void 0:H}},b1=class extends X{constructor(){super(...arguments),this.type=4}j(H){this.element.toggleAttribute(this.name,!!H&&H!==d)}},w1=class extends X{constructor(H,C,V,L,t){super(H,C,V,L,t),this.type=5}_$AI(H,C=this){if((H=j(this,H,C,0)??d)===z)return;let V=this._$AH,L=H===d&&V!==d||H.capture!==V.capture||H.once!==V.once||H.passive!==V.passive,t=H!==d&&(V===d||L);L&&this.element.removeEventListener(this.name,this,V),t&&this.element.addEventListener(this.name,this,H),this._$AH=H}handleEvent(H){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,H):this._$AH.handleEvent(H)}},B1=class{constructor(H,C,V){this.element=H,this.type=6,this._$AN=void 0,this._$AM=C,this.options=V}get _$AU(){return this._$AM._$AU}_$AI(H){j(this,H)}};var $2=P1.litHtmlPolyfillSupport;$2?.(i1,o1),(P1.litHtmlVersions??=[]).push("3.3.3");var e2=(M,H,C)=>{let V=C?.renderBefore??H,L=V._$litPart$;if(L===void 0){let t=C?.renderBefore??null;V._$litPart$=L=new o1(H.insertBefore(e1(),t),t,void 0,C??{})}return L._$AI(M),L};var R1=globalThis,x=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let H=super.createRenderRoot();return this.renderOptions.renderBefore??=H.firstChild,H}update(H){let C=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(H),this._$Do=e2(C,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}};x._$litElement$=!0,x.finalized=!0,R1.litElementHydrateSupport?.({LitElement:x});var N2=R1.litElementPolyfillSupport;N2?.({LitElement:x});(R1.litElementVersions??=[]).push("4.2.2");var S=M=>(H,C)=>{C!==void 0?C.addInitializer(()=>{customElements.define(M,H)}):customElements.define(M,H)};var I2={attribute:!0,type:String,converter:M1,reflect:!1,hasChanged:n1},W2=(M=I2,H,C)=>{let{kind:V,metadata:L}=C,t=globalThis.litPropertyMetadata.get(L);if(t===void 0&&globalThis.litPropertyMetadata.set(L,t=new Map),V==="setter"&&((M=Object.create(M)).wrapped=!0),t.set(C.name,M),V==="accessor"){let{name:r}=C;return{set(i){let A=H.get.call(this);H.set.call(this,i),this.requestUpdate(r,A,M,!0,i)},init(i){return i!==void 0&&this.C(r,void 0,M,i),i}}}if(V==="setter"){let{name:r}=C;return function(i){let A=this[r];H.call(this,i),this.requestUpdate(r,A,M,!0,i)}}throw Error("Unsupported decorator location: "+V)};function p(M){return(H,C)=>typeof C=="object"?W2(M,H,C):((V,L,t)=>{let r=L.hasOwnProperty(t);return L.constructor.createProperty(t,V),r?Object.getOwnPropertyDescriptor(L,t):void 0})(M,H,C)}function l(M){return p({...M,state:!0,attribute:!1})}var K=(M,H,C)=>(C.configurable=!0,C.enumerable=!0,Reflect.decorate&&typeof H!="object"&&Object.defineProperty(M,H,C),C);function Y(M,H){return(C,V,L)=>{let t=r=>r.renderRoot?.querySelector(M)??null;if(H){let{get:r,set:i}=typeof V=="object"?C:L??(()=>{let A=Symbol();return{get(){return this[A]},set(m){this[A]=m}}})();return K(C,V,{get(){let A=r.call(this);return A===void 0&&(A=t(this),(A!==null||this.hasUpdated)&&i.call(this,A)),A}})}return K(C,V,{get(){return t(this)}})}}var w="pro_budget",a1=class extends Error{constructor(C,V){super(V);this.code=C}};async function F(M,H){try{return await M.callWS(H)}catch(C){let V=C;throw new a1(V.code??"unknown",V.message??String(C))}}var u={subscribe(M,H){return M.connection.subscribeMessage(H,{type:`${w}/subscribe`})},createCategory:(M,H)=>F(M,{type:`${w}/categories/create`,fields:H}),updateCategory:(M,H,C)=>F(M,{type:`${w}/categories/update`,category_id:H,fields:C}),deleteCategory:(M,H)=>F(M,{type:`${w}/categories/delete`,category_id:H}),createItem:(M,H)=>F(M,{type:`${w}/items/create`,fields:H}),updateItem:(M,H,C)=>F(M,{type:`${w}/items/update`,item_id:H,fields:C}),deleteItem:(M,H)=>F(M,{type:`${w}/items/delete`,item_id:H}),setPaid:(M,H,C,V)=>F(M,{type:`${w}/paid/set`,item_id:H,date:C,paid:V}),stats:(M,H,C,V)=>F(M,{type:`${w}/stats`,year:H,month:C,...V?{user_id:V}:{}}),insights:(M,H,C)=>F(M,{type:`${w}/insights`,user_id:H,year:C}),occurrences:(M,H,C,V)=>F(M,{type:`${w}/occurrences`,start:H,end:C,...V?{user_id:V}:{}})};var v1={topBar:"ha-top-app-bar-fixed",menuButton:"ha-menu-button",iconButton:"ha-icon-button",card:"ha-card",icon:"ha-icon",form:"ha-form",dialog:"ha-dialog",dialogHeader:"ha-dialog-header",button:"ha-button",alert:"ha-alert",circularProgress:"ha-spinner",ripple:"ha-ripple",subpage:"hass-tabs-subpage",subpageDataTable:"hass-tabs-subpage-data-table",overflowMenu:"ha-icon-overflow-menu",svgIcon:"ha-svg-icon"},t2;function i2(){return t2??=(async()=>{try{await(await window.loadCardHelpers?.())?.createCardElement({type:"entities",entities:[]})?.constructor.getConfigElement?.()}catch{}await Promise.all([v1.form,v1.dialog,v1.subpage,v1.subpageDataTable].map(M=>Promise.race([customElements.whenDefined(M),new Promise(H=>setTimeout(H,4e3))])))})(),t2}var o2={"panel.title":"Budget","nav.overview":"\xDCbersicht","nav.items":"Posten","nav.calendar":"Kalender","nav.insights":"Einblicke","nav.categories":"Kategorien","common.all":"Alle","common.add":"Hinzuf\xFCgen","common.save":"Speichern","common.cancel":"Abbrechen","common.delete":"L\xF6schen","common.edit":"Bearbeiten","common.close":"Schlie\xDFen","common.loading":"L\xE4dt\u2026","common.unknown_user":"Ehemaliges Mitglied","common.monthly_hint":"Alle Betr\xE4ge als monatliches \xC4quivalent.","common.per_month":"/ Monat","common.error":"Etwas ist schiefgelaufen: {error}","common.today":"Heute","common.paid":"Bezahlt","common.unpaid":"Noch nicht bezahlt","type.earning":"Einnahme","type.expense":"Ausgabe","type.saving":"Sparen","type.earning.plural":"Einnahmen","type.expense.plural":"Ausgaben","type.saving.plural":"Sparen","recurrence.daily":"T\xE4glich","recurrence.weekly":"W\xF6chentlich","recurrence.biweekly":"Alle zwei Wochen","recurrence.monthly":"Monatlich","recurrence.quarterly":"Viertelj\xE4hrlich","recurrence.semi_annually":"Halbj\xE4hrlich","recurrence.annually":"J\xE4hrlich","cost_kind.fixed":"Fix","cost_kind.variable":"Variabel","payment.direct_debit":"Lastschrift","payment.standing_order":"Dauerauftrag","payment.manual":"Manuell / \xDCberweisung","payment.credit_card":"Kreditkarte","payment.paypal":"PayPal","due.on_day":"am {day}.","due.on_day_month":"am {day}. {month}","due.months":"am {day}. ({months})","overview.income":"Einnahmen","overview.expenses":"Ausgaben","overview.savings":"Sparen","overview.remaining":"Verbleibend","overview.members":"Mitglieder","overview.member":"Mitglied","overview.balance":"Saldo","overview.shared":"Gemeinsam","overview.personal":"Pers\xF6nlich","overview.fixed":"Fix","overview.variable":"Variabel","overview.fairness":"Fairness","overview.fairness_hint":"Anteil an den gemeinsamen Kosten gegen\xFCber dem Anteil am Haushaltseinkommen.","overview.shared_costs_paid":"Gemeinsame Kosten bezahlt","overview.shared_cost_share":"Anteil gemeinsame Kosten","overview.income_share":"Anteil Einkommen","overview.categories":"Nach Kategorie","overview.category":"Kategorie","overview.empty":"Noch keine Posten. Lege den ersten unter Posten an.","overview.other_currencies":"Posten in anderen W\xE4hrungen werden getrennt aufgef\xFChrt.","items.title":"Posten","items.add":"Posten hinzuf\xFCgen","items.search":"{count} Posten durchsuchen","items.group_by":"Gruppieren nach","items.group.category":"Kategorie","items.group.user":"Mitglied","items.group.type":"Typ","items.group.none":"Keine","categories.search":"{count} Kategorien durchsuchen","items.filter_type":"Typ","items.filter_user":"Mitglied","items.filter_category":"Kategorie","items.col_title":"Titel","items.col_amount":"Betrag","items.col_recurrence":"Turnus","items.col_due":"F\xE4llig","items.col_category":"Kategorie","items.col_user":"Mitglied","items.col_monthly":"Monatlich","items.empty":"Keine passenden Posten.","items.col_status":"Status","items.active":"Aktiv","items.inactive":"Inaktiv","item.title":"Titel","item.type":"Typ","item.amount":"Betrag","item.currency":"W\xE4hrung","item.category":"Kategorie","item.user":"Bezahlt von","item.user_earning":"Empfangen von","item.recurrence":"Turnus","item.due_weekday":"Wochentag","item.due_day":"Tag im Monat","item.due_month":"Erster Monat","item.cost_kind":"Fix / Variabel","item.shared":"Gemeinsamer Haushaltsposten","item.payment_method":"Zahlweise","item.start":"Startdatum","item.end":"Enddatum","item.advanced":"Erweitert","item.new":"Neuer Posten","item.edit":"Posten bearbeiten","item.delete_confirm":"\u201E{title}\u201C l\xF6schen?","item.amount_invalid":"Gib einen Betrag wie 12,50 ein.","calendar.agenda":"Agenda","calendar.month":"Monat","calendar.previous":"Zur\xFCck","calendar.next":"Weiter","calendar.empty":"In diesem Zeitraum ist nichts f\xE4llig.","calendar.unscheduled":"Nicht platzierbar (kein F\xE4lligkeitsmonat)","calendar.mark_paid":"Als bezahlt markieren","calendar.mark_unpaid":"Als unbezahlt markieren","calendar.weeks":"N\xE4chste {weeks} Wochen","insights.title":"Einblicke","insights.year":"Jahr","insights.savings_rate":"Sparquote","insights.fixed_cost_rate":"Fixkostenquote","insights.avg_month":"Durchschnittsmonat","insights.max_month":"Teuerster Monat","insights.min_month":"G\xFCnstigster Monat","insights.top_expenses":"Gr\xF6\xDFte Ausgaben","insights.payment_calendar":"Zahlungskalender {year}","insights.payment_calendar_hint":"Tats\xE4chliche Abfl\xFCsse je Monat, nicht normalisiert.","insights.unscheduled":"Nicht platzierbar: diese Posten haben keinen F\xE4lligkeitsmonat.","insights.no_member":"W\xE4hle ein Mitglied.","categories.title":"Kategorien","categories.add":"Kategorie hinzuf\xFCgen","categories.name":"Name","categories.color":"Farbe","categories.icon":"Symbol","categories.items":"{count} Posten","categories.in_use":"Wird von {count} Posten verwendet; l\xF6sche oder verschiebe sie zuerst.","categories.delete_confirm":"Kategorie \u201E{name}\u201C l\xF6schen?","categories.new":"Neue Kategorie","categories.edit":"Kategorie bearbeiten","errors.not_found":"Nicht gefunden.","errors.invalid":"Ung\xFCltige Eingabe: {message}","errors.in_use":"Wird noch verwendet."};var _1={"panel.title":"Budget","nav.overview":"Overview","nav.items":"Items","nav.calendar":"Calendar","nav.insights":"Insights","nav.categories":"Categories","common.all":"Everyone","common.add":"Add","common.save":"Save","common.cancel":"Cancel","common.delete":"Delete","common.edit":"Edit","common.close":"Close","common.loading":"Loading\u2026","common.unknown_user":"Former member","common.monthly_hint":"All amounts as monthly equivalents.","common.per_month":"/ month","common.error":"Something went wrong: {error}","common.today":"Today","common.none":"\u2014","common.paid":"Paid","common.unpaid":"Not paid yet","type.earning":"Earning","type.expense":"Expense","type.saving":"Saving","type.earning.plural":"Earnings","type.expense.plural":"Expenses","type.saving.plural":"Savings","recurrence.daily":"Daily","recurrence.weekly":"Weekly","recurrence.biweekly":"Every two weeks","recurrence.monthly":"Monthly","recurrence.quarterly":"Quarterly","recurrence.semi_annually":"Semi-annually","recurrence.annually":"Annually","cost_kind.fixed":"Fixed","cost_kind.variable":"Variable","payment.direct_debit":"Direct debit","payment.standing_order":"Standing order","payment.manual":"Manual / bank transfer","payment.credit_card":"Credit card","payment.paypal":"PayPal","due.on_day":"on the {day}.","due.on_day_month":"on the {day}. of {month}","due.months":"on the {day}. ({months})","overview.income":"Income","overview.expenses":"Expenses","overview.savings":"Savings","overview.remaining":"Remaining","overview.members":"Members","overview.member":"Member","overview.balance":"Balance","overview.shared":"Shared","overview.personal":"Personal","overview.fixed":"Fixed","overview.variable":"Variable","overview.fairness":"Fairness","overview.fairness_hint":"Share of shared costs paid versus share of household income.","overview.shared_costs_paid":"Shared costs paid","overview.shared_cost_share":"Share of shared costs","overview.income_share":"Share of income","overview.categories":"By category","overview.category":"Category","overview.empty":"No items yet. Add the first one under Items.","overview.other_currencies":"Items in other currencies are listed separately.","items.title":"Items","items.add":"Add item","items.search":"Search {count} items","items.group_by":"Group by","items.group.category":"Category","items.group.user":"Member","items.group.type":"Type","items.group.none":"None","categories.search":"Search {count} categories","items.filter_type":"Type","items.filter_user":"Member","items.filter_category":"Category","items.col_title":"Title","items.col_amount":"Amount","items.col_recurrence":"Recurrence","items.col_due":"Due","items.col_category":"Category","items.col_user":"Member","items.col_monthly":"Monthly","items.empty":"No items match.","items.col_status":"Status","items.active":"Active","items.inactive":"Inactive","item.title":"Title","item.type":"Type","item.amount":"Amount","item.currency":"Currency","item.category":"Category","item.user":"Paid by","item.user_earning":"Received by","item.recurrence":"Recurrence","item.due_weekday":"Weekday","item.due_day":"Day of month","item.due_month":"First month","item.cost_kind":"Fixed / variable","item.shared":"Shared household cost","item.payment_method":"Payment method","item.start":"Start date","item.end":"End date","item.advanced":"Advanced","item.new":"New item","item.edit":"Edit item","item.delete_confirm":"Delete \u201C{title}\u201D?","item.amount_invalid":"Enter an amount like 12.50.","calendar.agenda":"Agenda","calendar.month":"Month","calendar.previous":"Previous","calendar.next":"Next","calendar.empty":"Nothing due in this period.","calendar.unscheduled":"Not placeable (no due month)","calendar.mark_paid":"Mark paid","calendar.mark_unpaid":"Mark unpaid","calendar.weeks":"Next {weeks} weeks","insights.title":"Insights","insights.year":"Year","insights.savings_rate":"Savings rate","insights.fixed_cost_rate":"Fixed cost rate","insights.avg_month":"Average month","insights.max_month":"Most expensive month","insights.min_month":"Cheapest month","insights.top_expenses":"Largest expenses","insights.payment_calendar":"Payment calendar {year}","insights.payment_calendar_hint":"Actual outflows per month, not normalized.","insights.unscheduled":"Not placeable: these items have no due month.","insights.no_member":"Pick a member.","categories.title":"Categories","categories.add":"Add category","categories.name":"Name","categories.color":"Colour","categories.icon":"Icon","categories.items":"{count} items","categories.in_use":"In use by {count} items; delete or move them first.","categories.delete_confirm":"Delete category \u201C{name}\u201D?","categories.new":"New category","categories.edit":"Edit category","errors.not_found":"Not found.","errors.invalid":"Invalid input: {message}","errors.in_use":"Still in use."};var U2={en:_1,de:o2};function G2(M){return(M?.locale?.language??M?.language??"en").toLowerCase().split("-")[0]}function e(M,H,C){let V=U2[G2(M)]?.[H]??_1[H];if(C)for(let[L,t]of Object.entries(C))V=V.replaceAll(`{${L}}`,String(t));return V}var a2="M7 11H9V13H7V11M21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5M5 7H19V5H5V7M19 19V9H5V19H19M15 13V11H17V13H15M11 13V11H13V13H11M7 15H9V17H7V15M15 17V15H17V17H15M11 17V15H13V17H11Z";var A2="M9 17H7V10H9V17M13 17H11V7H13V17M17 17H15V13H17V17M19 19H5V5H19V19.1M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z";var x1="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";var d2="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z";var Z1="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";var s1="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";var m2="M11,13.5V21.5H3V13.5H11M9,15.5H5V19.5H9V15.5M12,2L17.5,11H6.5L12,2M12,5.86L10.08,9H13.92L12,5.86M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13M17.5,15A2.5,2.5 0 0,0 15,17.5A2.5,2.5 0 0,0 17.5,20A2.5,2.5 0 0,0 20,17.5A2.5,2.5 0 0,0 17.5,15Z";var p2="M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z";var n2=[{id:"overview",iconPath:p2},{id:"items",iconPath:d2},{id:"calendar",iconPath:a2},{id:"insights",iconPath:A2},{id:"categories",iconPath:m2}],D1="/pro-budget";function E1(M){let H=M?.path?.replace(/^\//,"").split("/")[0]??"";return n2.some(C=>C.id===H)?H:"overview"}function R(M,H){let C=H?.prefix??D1;return n2.map(V=>({path:`${C}/${V.id}`,name:e(M,`nav.${V.id}`),iconPath:V.iconPath}))}function J(M){return o`
    <ha-dialog open .headerTitle=${M.heading} .preventScrimClose=${!!M.sticky} @closed=${M.onClosed}>
      ${M.content}
      ${M.actions.map(H=>o`
          <ha-button
            slot="footer"
            data-action=${H.primary?"primary":"secondary"}
            appearance=${H.primary?"accent":"plain"}
            variant=${H.danger?"danger":d}
            .disabled=${H.disabled??!1}
            @click=${H.onClick}
          >
            ${H.label}
          </ha-button>
        `)}
    </ha-dialog>
  `}var h=s`
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
`;function q(M){return M?.locale?.language??M?.language??"en"}var l2=new Map;function c(M,H,C){let V=`${q(M)}|${C}`,L=l2.get(V);if(!L){try{L=new Intl.NumberFormat(q(M),{style:"currency",currency:C})}catch{L=new Intl.NumberFormat(q(M),{minimumFractionDigits:2})}l2.set(V,L)}return L.format(H/100)}function v2(M,H,C,V){let L=c(M,Math.abs(H),C);return V?`\u2212${L}`:`+${L}`}function C1(M,H){return H===null?"\u2014":new Intl.NumberFormat(q(M),{style:"percent",maximumFractionDigits:1}).format(H)}function _(M){let H=M.getFullYear(),C=String(M.getMonth()+1).padStart(2,"0"),V=String(M.getDate()).padStart(2,"0");return`${H}-${C}-${V}`}function $1(M){let[H,C,V]=M.split("-").map(Number);return new Date(H,C-1,V)}function N1(M,H,C){return new Intl.DateTimeFormat(q(M),C).format($1(H))}function D(M,H,C="long"){return new Intl.DateTimeFormat(q(M),{month:C}).format(new Date(2026,H-1,1))}function u1(M,H,C="long"){return new Intl.DateTimeFormat(q(M),{weekday:C}).format(new Date(2026,5,H))}function x2(M){let H=M.trim().replace(/\s/g,"");if(!H)return null;let C=H.lastIndexOf(","),V=H.lastIndexOf("."),L;return C>V?L=H.replace(/\./g,"").replace(",","."):V>C?L=H.replace(/,/g,""):L=H,/^\d+(\.\d{1,2})?$/.test(L)?Math.round(Number(L)*100):null}function Z2(M){return(M/100).toFixed(2)}var s2=["earning","expense","saving"],u2=["daily","weekly","biweekly","monthly","quarterly","semi_annually","annually"],S2=["fixed","variable"],c2=["direct_debit","standing_order","manual","credit_card","paypal"],I1=["quarterly","semi_annually","annually"];function Q2(M,H,C){return M?{title:M.title,type:M.type,amount:Z2(M.amount),currency:M.currency??"",category_id:M.category_id,user_id:M.user_id,recurrence:M.recurrence,due_day:M.due_day??void 0,due_month:M.due_month??void 0,cost_kind:M.cost_kind,shared:M.shared,payment_method:M.payment_method??"",start:M.start??void 0,end:M.end??void 0}:{type:"expense",recurrence:"monthly",due_day:1,cost_kind:"fixed",shared:!1,category_id:H.categories[0]?.id,user_id:C??H.users[0]?.id,amount:""}}var f=class extends x{constructor(){super(...arguments);this._open=!1;this._data={};this._error="";this._saving=!1;this._label=C=>{if(C.name==="user_id")return e(this.hass,this._data.type==="earning"?"item.user_earning":"item.user");if(C.name==="due_day"){let V=this._data.recurrence;return e(this.hass,V==="weekly"||V==="biweekly"?"item.due_weekday":"item.due_day")}return C.name==="category_id"?e(this.hass,"item.category"):e(this.hass,`item.${C.name}`)};this._onClosed=C=>{C.target===this.renderRoot.querySelector("ha-dialog")&&this._close()}}open(C){this.budget&&(this._item=C,this._data=Q2(C,this.budget,this.hass?.user?.id),this._error="",this._open=!0)}_close(){this._open=!1}get _schema(){let C=this.budget,V=this._data.recurrence,L=V==="weekly"||V==="biweekly",t=I1.includes(V),r=(m,Z)=>m.map(n=>({value:n,label:Z(n)})),i=[{name:"title",required:!0,selector:{text:{}}},{name:"",type:"grid",schema:[{name:"type",required:!0,selector:{select:{mode:"dropdown",options:r(s2,m=>e(this.hass,`type.${m}`))}}},{name:"cost_kind",selector:{select:{mode:"dropdown",options:r(S2,m=>e(this.hass,`cost_kind.${m}`))}}},{name:"amount",required:!0,selector:{text:{type:"text",suffix:C.config.currency}}},{name:"category_id",required:!0,selector:{select:{mode:"dropdown",options:C.categories.map(m=>({value:m.id,label:m.name}))}}},{name:"user_id",required:!0,selector:{select:{mode:"dropdown",options:C.users.map(m=>({value:m.id,label:m.name}))}}},{name:"recurrence",required:!0,selector:{select:{mode:"dropdown",options:r(u2,m=>e(this.hass,`recurrence.${m}`))}}}]}],A=[];return L?A.push({name:"due_day",required:!0,selector:{select:{mode:"dropdown",options:[1,2,3,4,5,6,7].map(m=>({value:String(m),label:u1(this.hass,m)}))}}}):V!=="daily"&&A.push({name:"due_day",required:!0,selector:{number:{min:1,max:31,mode:"box"}}}),t&&A.push({name:"due_month",required:!0,selector:{select:{mode:"dropdown",options:Array.from({length:12},(m,Z)=>({value:String(Z+1),label:D(this.hass,Z+1)}))}}}),A.length&&i.push({name:"",type:"grid",schema:A}),i.push({name:"shared",selector:{boolean:{}}}),i.push({name:"advanced",type:"expandable",schema:[{name:"payment_method",selector:{select:{mode:"dropdown",options:[{value:"",label:e(this.hass,"common.none")},...r(c2,m=>e(this.hass,`payment.${m}`))]}}},{name:"currency",selector:{text:{}}},{name:"",type:"grid",schema:[{name:"start",selector:{date:{}}},{name:"end",selector:{date:{}}}]}]}),i}_fields(){let C=this._data,V=x2(String(C.amount??""));if(V===null)return e(this.hass,"item.amount_invalid");let L=C.recurrence,t=I1.includes(L);return{title:String(C.title??""),type:C.type,amount:V,currency:C.currency?String(C.currency).toUpperCase():null,category_id:String(C.category_id??""),user_id:String(C.user_id??""),recurrence:L,due_day:L==="daily"||C.due_day==null?null:Number(C.due_day),due_month:t&&C.due_month!=null?Number(C.due_month):null,cost_kind:C.cost_kind??"fixed",shared:!!C.shared,payment_method:C.payment_method?C.payment_method:null,start:C.start?String(C.start):null,end:C.end?String(C.end):null}}async _save(){let C=this._fields();if(typeof C=="string"){this._error=C;return}this._saving=!0,this._error="";try{this._item?await u.updateItem(this.hass,this._item.id,C):await u.createItem(this.hass,C),this._close()}catch(V){this._error=W1(this.hass,V)}finally{this._saving=!1}}render(){return!this._open||!this.budget?d:J({heading:e(this.hass,this._item?"item.edit":"item.new"),sticky:!0,onClosed:this._onClosed,content:o`
        ${this._error?o`<ha-alert alert-type="error">${this._error}</ha-alert>`:d}
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${this._schema}
          .computeLabel=${this._label}
          @value-changed=${C=>this._data=C.detail.value}
        ></ha-form>
      `,actions:[{label:e(this.hass,"common.cancel"),onClick:()=>this._close()},{label:e(this.hass,"common.save"),primary:!0,disabled:this._saving,onClick:()=>this._save()}]})}};f.styles=[h,s`
      ha-dialog {
        --mdc-dialog-min-width: min(560px, 95vw);
      }
      ha-alert {
        display: block;
        margin-bottom: 12px;
      }
    `],a([p({attribute:!1})],f.prototype,"hass",2),a([p({attribute:!1})],f.prototype,"budget",2),a([l()],f.prototype,"_item",2),a([l()],f.prototype,"_open",2),a([l()],f.prototype,"_data",2),a([l()],f.prototype,"_error",2),a([l()],f.prototype,"_saving",2),f=a([S("pro-budget-item-dialog")],f);function W1(M,H){if(H instanceof a1){if(H.code==="not_found")return e(M,"errors.not_found");if(H.code==="in_use")return e(M,"errors.in_use");if(H.code==="invalid")return e(M,"errors.invalid",{message:H.message})}return e(M,"common.error",{error:String(H?.message??H)})}var z2=[{name:"name",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"color",selector:{ui_color:{}}}],E=class extends x{constructor(){super(...arguments);this._open=!1;this._data={};this._error="";this._onClosed=C=>{C.target===this.renderRoot.querySelector("ha-dialog")&&this._close()}}open(C){this._category=C,this._data=C?{name:C.name,icon:C.icon??void 0,color:C.color??void 0}:{},this._error="",this._open=!0}_close(){this._open=!1}async _save(){let C={name:String(this._data.name??""),icon:this._data.icon||null,color:this._data.color||null};try{this._category?await u.updateCategory(this.hass,this._category.id,C):await u.createCategory(this.hass,C),this._close()}catch(V){this._error=W1(this.hass,V)}}render(){return this._open?J({heading:e(this.hass,this._category?"categories.edit":"categories.new"),onClosed:this._onClosed,content:o`
        ${this._error?o`<ha-alert alert-type="error">${this._error}</ha-alert>`:d}
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${z2}
          .computeLabel=${C=>e(this.hass,`categories.${C.name}`)}
          @value-changed=${C=>this._data=C.detail.value}
        ></ha-form>
      `,actions:[{label:e(this.hass,"common.cancel"),onClick:()=>this._close()},{label:e(this.hass,"common.save"),primary:!0,onClick:()=>this._save()}]}):d}};E.styles=[h,s`
      ha-alert {
        display: block;
        margin-bottom: 12px;
      }
    `],a([p({attribute:!1})],E.prototype,"hass",2),a([l()],E.prototype,"_category",2),a([l()],E.prototype,"_open",2),a([l()],E.prototype,"_data",2),a([l()],E.prototype,"_error",2),E=a([S("pro-budget-category-dialog")],E);var W=class extends x{constructor(){super(...arguments);this._text="";this._open=!1;this._onClosed=C=>{C.target===this.renderRoot.querySelector("ha-dialog")&&this._close(!1)}}open(C){return this._text=C,this._open=!0,new Promise(V=>this._resolve=V)}_close(C){this._open=!1,this._resolve?.(C),this._resolve=void 0}render(){return this._open?J({heading:this._text,content:o``,onClosed:this._onClosed,actions:[{label:e(this.hass,"common.cancel"),onClick:()=>this._close(!1)},{label:e(this.hass,"common.delete"),primary:!0,danger:!0,onClick:()=>this._close(!0)}]}):o``}};W.styles=s`
    ha-dialog {
      --mdc-dialog-min-width: 320px;
    }
  `,a([p({attribute:!1})],W.prototype,"hass",2),a([l()],W.prototype,"_text",2),a([l()],W.prototype,"_open",2),W=a([S("pro-budget-confirm")],W);function K2(M,H="var(--secondary-text-color)"){return M?M==="primary"?"var(--primary-color)":M==="accent"?"var(--accent-color)":`var(--${M}-color)`:H}function $(M,H="m"){if(!M?.icon)return o``;let C=K2(M.color),V=H==="m"?36:28,L=H==="m"?20:16;return o`
    <span
      style="display: inline-flex; align-items: center; justify-content: center; flex: none; width: ${V}px; height: ${V}px; border-radius: 50%; vertical-align: middle; color: ${C}; background: color-mix(in srgb, ${C} 20%, transparent)"
    >
      <ha-icon
        .icon=${M.icon}
        style="--mdc-icon-size: ${L}px; display: flex; line-height: 0; margin: 0; width: ${L}px; height: ${L}px"
      ></ha-icon>
    </span>
  `}function H1(M,H,C,V,L){if(H.users.length<2)return d;let t=r=>C===r||!V.all&&!C&&r===M?.user?.id;return o`
    <div class="members chips">
      ${V.all?o`<button class="chip" aria-pressed=${C===""} @click=${()=>L("")}>${e(M,"common.all")}</button>`:d}
      ${H.users.map(r=>o`<button class="chip" aria-pressed=${t(r.id)} @click=${()=>L(r.id)}>${r.name}</button>`)}
    </div>
  `}var h2=8,O=class extends x{constructor(){super(...arguments);this.userId="";this.narrow=!1;this._view="agenda";this._month=_(new Date).slice(0,7);this._days=[]}updated(C){["budget","userId","_view","_month"].some(V=>C.has(V))&&this._load()}_range(){if(this._view==="agenda"){let L=new Date,t=new Date;return t.setDate(t.getDate()+h2*7-1),[_(L),_(t)]}let[C,V]=this._month.split("-").map(Number);return[_(new Date(C,V-1,1)),_(new Date(C,V,0))]}async _load(){if(!this.hass||!this.budget)return;let[C,V]=this._range();this._days=await u.occurrences(this.hass,C,V,this.userId||void 0)}_item(C){return this.budget?.items.find(V=>V.id===C)}_categoryIcon(C){let V=this.budget?.categories.find(L=>L.id===C);return $(V,"s")}_shift(C){let[V,L]=this._month.split("-").map(Number);this._month=_(new Date(V,L-1+C,1)).slice(0,7)}async _togglePaid(C,V,L){await u.setPaid(this.hass,C,V,!L),await this._load()}_frame(C){let V=H1(this.hass,this.budget,this.userId,{all:!0},L=>this.dispatchEvent(new CustomEvent("user-changed",{detail:{userId:L},bubbles:!0,composed:!0})));return o`
      <hass-tabs-subpage .hass=${this.hass} .narrow=${this.narrow} .route=${this.route} .tabs=${R(this.hass,this.route)} main-page>
        ${V} ${C}
      </hass-tabs-subpage>
    `}render(){if(!this.budget)return d;let C=this.hass;return this._frame(o`
      <div class="toolbar">
        <div class="chips">
          <button class="chip" aria-pressed=${this._view==="agenda"} @click=${()=>this._view="agenda"}>
            ${e(C,"calendar.agenda")}
          </button>
          <button class="chip" aria-pressed=${this._view==="month"} @click=${()=>this._view="month"}>
            ${e(C,"calendar.month")}
          </button>
        </div>
        <span class="grow"></span>
        ${this._view==="month"?o`
              <ha-icon-button .label=${e(C,"calendar.previous")} @click=${()=>this._shift(-1)}>
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </ha-icon-button>
              <strong>${N1(C,`${this._month}-01`,{month:"long",year:"numeric"})}</strong>
              <ha-icon-button .label=${e(C,"calendar.next")} @click=${()=>this._shift(1)}>
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </ha-icon-button>
            `:o`<span class="muted small">${e(C,"calendar.weeks",{weeks:h2})}</span>`}
      </div>
      <div class="cards">
        <ha-card>${this._view==="agenda"?this._renderAgenda():this._renderMonth()}</ha-card>
      </div>
    `)}_entry(C,V){let L=this._item(C.item_id);if(!L)return d;let t=L.currency??this.budget.config.currency,r=L.type!=="earning";return o`
      <div class="entry ${C.paid?"paid":""}">
        <span class="amount ${L.type}">${v2(this.hass,L.amount,t,r)}</span>
        ${this._categoryIcon(L.category_id)}
        <span class="title grow">${L.title}</span>
        ${r?o`
              <ha-icon-button
                .label=${e(this.hass,C.paid?"calendar.mark_unpaid":"calendar.mark_paid")}
                @click=${()=>this._togglePaid(L.id,V,C.paid)}
              >
                <ha-icon icon=${C.paid?"mdi:check-circle":"mdi:checkbox-blank-circle-outline"}></ha-icon>
              </ha-icon-button>
            `:d}
      </div>
    `}_renderAgenda(){let C=this.hass,V=_(new Date),L=this._days.filter(r=>r.date!==null),t=this._days.find(r=>r.date===null);return L.length===0&&!t?o`<div class="empty">${e(C,"calendar.empty")}</div>`:o`
      ${L.map(r=>o`
          <div class="day">
            <div class="date ${r.date===V?"today":""}">
              ${N1(C,r.date,{weekday:"short",day:"numeric",month:"short"})}
            </div>
            <div class="entries">${r.entries.map(i=>this._entry(i,r.date))}</div>
          </div>
        `)}
      ${t?o`
            <div class="day">
              <div class="date muted">${e(C,"calendar.unscheduled")}</div>
              <div class="entries">
                ${t.entries.map(r=>o`<div class="entry"><span class="title">${this._item(r.item_id)?.title}</span></div>`)}
              </div>
            </div>
          `:d}
    `}_renderMonth(){let C=this.hass,[V,L]=this._month.split("-").map(Number),r=(new Date(V,L-1,1).getDay()+6)%7,i=new Date(V,L,0).getDate(),A=[...Array(r).fill(null)];for(let v=1;v<=i;v++)A.push(_(new Date(V,L-1,v)));for(;A.length%7;)A.push(null);let m=new Map(this._days.filter(v=>v.date).map(v=>[v.date,v.entries])),Z=_(new Date),n=this.budget.config.currency,b=[1,2,3,4,5,6,7].map(v=>new Intl.DateTimeFormat(C?.locale?.language??"en",{weekday:"short"}).format(new Date(2026,5,v)));return o`
      <div class="month-grid">
        ${b.map(v=>o`<div class="head">${v}</div>`)}
        ${A.map(v=>{if(!v)return o`<div class="cell outside"></div>`;let T=m.get(v)??[],c1=0;for(let h1 of T){let A1=this._item(h1.item_id);A1&&(c1+=A1.type==="earning"?A1.amount:-A1.amount)}return o`
            <div class="cell ${v===Z?"today":""}">
              <div class="num">${$1(v).getDate()}</div>
              ${T.length?o`
                    <div class="sum ${c1<0?"expense":"earning"}">${c(C,c1,n)}</div>
                    ${T.slice(0,3).map(h1=>o`<div class="item">${this._item(h1.item_id)?.title}</div>`)}
                    ${T.length>3?o`<div class="item muted">+${T.length-3}</div>`:d}
                  `:d}
            </div>
          `})}
      </div>
      <p class="muted small" style="margin:8px 0 0">${D(C,L)} ${V}</p>
    `}};O.styles=[h,s`
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
    `],a([p({attribute:!1})],O.prototype,"hass",2),a([p({attribute:!1})],O.prototype,"budget",2),a([p()],O.prototype,"userId",2),a([p({attribute:!1})],O.prototype,"route",2),a([p({type:Boolean})],O.prototype,"narrow",2),a([l()],O.prototype,"_view",2),a([l()],O.prototype,"_month",2),a([l()],O.prototype,"_days",2),O=a([S("pro-budget-calendar")],O);var B=class extends x{constructor(){super(...arguments);this.narrow=!1}get _rows(){let C=this.budget;return C.categories.map(V=>({id:V.id,category:V,icon:V.icon,name:V.name,items:C.items.filter(L=>L.category_id===V.id).length}))}get _columns(){let C=this.hass;return{icon:{title:"",type:"icon",showNarrow:!0,moveable:!1,template:V=>$(V.category)},name:{title:e(C,"categories.name"),main:!0,sortable:!0,filterable:!0,direction:"asc",flex:2},items:{title:e(C,"nav.items"),type:"numeric",sortable:!0,minWidth:"100px"},actions:{title:"",type:"overflow-menu",showNarrow:!0,moveable:!1,template:V=>o`
          <ha-icon-overflow-menu .hass=${C} .narrow=${this.narrow} .items=${this._menu(V)}></ha-icon-overflow-menu>
        `}}}_menu(C){return[{path:Z1,label:e(this.hass,"common.edit"),action:()=>this._dialog.open(C.category)},{path:x1,label:C.items?e(this.hass,"categories.in_use",{count:C.items}):e(this.hass,"common.delete"),warning:!0,disabled:C.items>0,action:()=>{this._delete(C.category)}}]}async _delete(C){await this._confirm.open(e(this.hass,"categories.delete_confirm",{name:C.name}))&&await u.deleteCategory(this.hass,C.id)}_rowClicked(C){let V=this.budget?.categories.find(L=>L.id===C.detail.id);V&&this._dialog.open(V)}render(){if(!this.budget)return d;let C=this.hass;return o`
      <hass-tabs-subpage-data-table
        .hass=${C}
        .narrow=${this.narrow}
        .route=${this.route}
        .tabs=${R(C,this.route)}
        main-page
        has-fab
        clickable
        id="id"
        .columns=${this._columns}
        .data=${this._rows}
        .searchLabel=${e(C,"categories.search",{count:this.budget.categories.length})}
        .noDataText=${e(C,"items.empty")}
        @row-click=${this._rowClicked}
      >
        <ha-button slot="fab" size="l" variant="brand" appearance="accent" @click=${()=>this._dialog.open()}>
          <ha-svg-icon slot="start" .path=${s1}></ha-svg-icon>
          ${e(C,"categories.add")}
        </ha-button>
      </hass-tabs-subpage-data-table>
      <pro-budget-category-dialog .hass=${C}></pro-budget-category-dialog>
      <pro-budget-confirm .hass=${C}></pro-budget-confirm>
    `}};B.styles=[h,s`
      :host {
        display: block;
        height: 100%;
      }
    `],a([p({attribute:!1})],B.prototype,"hass",2),a([p({attribute:!1})],B.prototype,"budget",2),a([p({attribute:!1})],B.prototype,"route",2),a([p({type:Boolean})],B.prototype,"narrow",2),a([Y("pro-budget-category-dialog")],B.prototype,"_dialog",2),a([Y("pro-budget-confirm")],B.prototype,"_confirm",2),B=a([S("pro-budget-categories")],B);var q2={daily:365/12,weekly:52/12,biweekly:26/12,monthly:1,quarterly:1/3,semi_annually:1/6,annually:1/12},j2={quarterly:3,semi_annually:6,annually:12};function O2(M,H){return Math.round(M*q2[H])}function X2(M,H){let C=j2[M];if(!C)return[];let V=[];for(let L=(H-1)%C;L<12;L+=C)V.push(L+1);return V}function g2(M,H,C){let V=new Date(H,C,0).getDate(),L=`${H}-${String(C).padStart(2,"0")}-01`,t=`${H}-${String(C).padStart(2,"0")}-${String(V).padStart(2,"0")}`;return!(M.start&&M.start>t||M.end&&M.end<L)}function S1(M,H){if(H.recurrence==="daily"||H.due_day===null)return e(M,"common.none");if(H.recurrence==="weekly"||H.recurrence==="biweekly")return u1(M,H.due_day);if(H.due_month===null)return e(M,"due.on_day",{day:H.due_day});if(H.recurrence==="annually")return e(M,"due.on_day_month",{day:H.due_day,month:D(M,H.due_month)});let C=X2(H.recurrence,H.due_month);return C.length===0?e(M,"due.on_day",{day:H.due_day}):e(M,"due.months",{day:H.due_day,months:C.map(V=>D(M,V,"short")).join(", ")})}var y=class extends x{constructor(){super(...arguments);this.userId="";this.narrow=!1;this._year=new Date().getFullYear()}updated(C){["budget","userId","_year"].some(V=>C.has(V))&&this._load()}get _effectiveUser(){return this.userId||this.hass?.user?.id||this.budget?.users[0]?.id||""}async _load(){!this.hass||!this.budget||!this._effectiveUser||(this._insights=await u.insights(this.hass,this._effectiveUser,this._year))}_item(C){return this.budget?.items.find(V=>V.id===C)}_categoryIcon(C){let V=this.budget?.categories.find(L=>L.id===C);return $(V,"s")}_frame(C){let V=H1(this.hass,this.budget,this.userId,{all:!1},L=>this.dispatchEvent(new CustomEvent("user-changed",{detail:{userId:L},bubbles:!0,composed:!0})));return o`
      <hass-tabs-subpage .hass=${this.hass} .narrow=${this.narrow} .route=${this.route} .tabs=${R(this.hass,this.route)} main-page>
        ${V} ${C}
      </hass-tabs-subpage>
    `}render(){if(!this.budget)return d;let C=this.hass,V=this._insights,L=this.budget.config.currency,t=i=>c(C,i,L),r=this.budget.users.find(i=>i.id===this._effectiveUser);return r?this._frame(o`
      <div class="toolbar">
        <strong>${r.name}</strong>
        <span class="spacer"></span>
        <select class="select" .value=${String(this._year)} @change=${i=>this._year=Number(i.target.value)}>
          ${[-1,0,1].map(i=>{let A=new Date().getFullYear()+i;return o`<option value=${A} ?selected=${A===this._year}>${A}</option>`})}
        </select>
      </div>
      ${V?o`
            <div class="grid">
              ${[["insights.savings_rate",C1(C,V.savings_rate)],["insights.fixed_cost_rate",C1(C,V.fixed_cost_rate)],["insights.avg_month",t(V.avg_month)],["insights.max_month",V.max_month?D(C,V.max_month):e(C,"common.none")]].map(([i,A])=>o`
                  <ha-card>
                    <div class="stat"><span class="label">${e(C,i)}</span><span class="value">${A}</span></div>
                  </ha-card>
                `)}
            </div>
            <ha-card style="margin-top:16px">
              <h2>${e(C,"insights.payment_calendar",{year:this._year})}</h2>
              <p class="muted small">${e(C,"insights.payment_calendar_hint")}</p>
              ${this._renderMonths(V)}
              ${V.unscheduled.length?o`<p class="muted small">${e(C,"insights.unscheduled")} ${V.unscheduled.map(i=>this._item(i)?.title).join(", ")}</p>`:d}
            </ha-card>
            <div class="grid" style="margin-top:16px">
              ${this._group(e(C,"insights.top_expenses"),{items:V.expenses.items.slice(0,5),total:0},L,!1)}
              ${this._group(e(C,"type.earning.plural"),V.earnings,L)}
              ${this._group(e(C,"type.expense.plural"),V.expenses,L)}
              ${this._group(e(C,"type.saving.plural"),V.savings,L)}
            </div>
          `:o`<ha-card><div class="empty">${e(C,"common.loading")}</div></ha-card>`}
    `):this._frame(o`<div class="cards"><ha-card><div class="empty">${e(C,"insights.no_member")}</div></ha-card></div>`)}_renderMonths(C){let V=Math.max(1,...C.calendar.map(L=>L.total));return o`
      <div class="months">
        ${C.calendar.map(L=>o`
            <div class="month ${L.month===C.max_month?"max":L.month===C.min_month?"min":""}" title=${c(this.hass,L.total,this.budget.config.currency)}>
              <span class="total">${L.total?c(this.hass,L.total,this.budget.config.currency):""}</span>
              <div class="col" style="height:${Math.round(L.total/V*100)}%"></div>
              <span class="name">${D(this.hass,L.month,"short")}</span>
            </div>
          `)}
      </div>
    `}_group(C,V,L,t=!0){let r=this.hass;return o`
      <ha-card>
        <h2>${C}</h2>
        ${V.items.length===0?o`<div class="empty">${e(r,"common.none")}</div>`:o`
              <table class="plain">
                <tbody>
                  ${V.items.map(i=>{let A=this._item(i.item_id);return o`
                      <tr>
                        <td>${this._categoryIcon(A?.category_id)} ${A?.title??i.item_id}<br /><span class="muted small">${A?`${e(r,`recurrence.${A.recurrence}`)} \xB7 ${S1(r,A)}`:""}</span></td>
                        <td class="num">${c(r,i.monthly,L)}<span class="muted small"> ${e(r,"common.per_month")}</span></td>
                      </tr>
                    `})}
                  ${t?o`<tr><td><strong>Σ</strong></td><td class="num"><strong>${c(r,V.total,L)}</strong></td></tr>`:d}
                </tbody>
              </table>
            `}
      </ha-card>
    `}};y.styles=[h,s`
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
    `],a([p({attribute:!1})],y.prototype,"hass",2),a([p({attribute:!1})],y.prototype,"budget",2),a([p()],y.prototype,"userId",2),a([p({attribute:!1})],y.prototype,"route",2),a([p({type:Boolean})],y.prototype,"narrow",2),a([l()],y.prototype,"_year",2),a([l()],y.prototype,"_insights",2),y=a([S("pro-budget-insights")],y);var Y2={earning:"mdi:cash-plus",expense:"mdi:cash-minus",saving:"mdi:piggy-bank-outline"},P=class extends x{constructor(){super(...arguments);this.narrow=!1}get _rows(){let C=this.budget,V=this.hass,L=new Date,t=r=>C.users.find(i=>i.id===r)?.name??e(V,"common.unknown_user");return C.items.map(r=>{let i=C.categories.find(A=>A.id===r.category_id);return{id:r.id,item:r,category_icon:{icon:i?.icon??Y2[r.type],color:i?.color??null},title:r.title,type:e(V,`type.${r.type}`),amount:r.amount,monthly:O2(r.amount,r.recurrence),category:i?.name??"",member:t(r.user_id),currency:r.currency??C.config.currency,recurrence:e(V,`recurrence.${r.recurrence}`),due:S1(V,r),cost:e(V,`cost_kind.${r.cost_kind}`),shared:r.shared?e(V,"overview.shared"):e(V,"overview.personal"),status:g2(r,L.getFullYear(),L.getMonth()+1)?e(V,"items.active"):e(V,"items.inactive")}})}get _columns(){let C=this.hass;return{icon:{title:"",type:"icon",showNarrow:!0,moveable:!1,template:V=>$(V.category_icon)},title:{title:e(C,"items.col_title"),main:!0,sortable:!0,filterable:!0,direction:"asc",flex:2,template:V=>o`
          <div style="font-weight: var(--ha-font-weight-medium, 500)">${V.title}</div>
          ${this.narrow?o`<div class="secondary">
                ${[c(C,V.amount,V.currency),c(C,V.monthly,V.currency),V.recurrence,V.due,V.type,V.category,V.member].join(" \xB7 ")}
              </div>`:d}
        `},amount:{title:e(C,"items.col_amount"),type:"numeric",sortable:!0,minWidth:"120px",template:V=>c(C,V.amount,V.currency)},monthly:{title:e(C,"items.col_monthly"),type:"numeric",sortable:!0,minWidth:"120px",template:V=>o`<span class=${V.item.type}>${c(C,V.monthly,V.currency)}</span>`},recurrence:{title:e(C,"items.col_recurrence"),sortable:!0,groupable:!0,filterable:!0,minWidth:"120px"},due:{title:e(C,"items.col_due"),filterable:!0,minWidth:"120px"},type:{title:e(C,"items.filter_type"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px"},category:{title:e(C,"items.col_category"),sortable:!0,groupable:!0,filterable:!0,minWidth:"120px"},member:{title:e(C,"items.col_user"),sortable:!0,groupable:!0,filterable:!0,minWidth:"120px"},status:{title:e(C,"items.col_status"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px",defaultHidden:!0},cost:{title:e(C,"item.cost_kind"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px",defaultHidden:!0},shared:{title:e(C,"item.shared"),sortable:!0,groupable:!0,filterable:!0,minWidth:"100px",defaultHidden:!0},actions:{title:"",type:"overflow-menu",showNarrow:!0,moveable:!1,template:V=>o`
          <ha-icon-overflow-menu .hass=${C} .narrow=${this.narrow} .items=${this._menu(V.item)}></ha-icon-overflow-menu>
        `}}}_menu(C){return[{path:Z1,label:e(this.hass,"common.edit"),action:()=>this._dialog.open(C)},{path:x1,label:e(this.hass,"common.delete"),warning:!0,action:()=>{this._delete(C)}}]}async _delete(C){await this._confirm.open(e(this.hass,"item.delete_confirm",{title:C.title}))&&await u.deleteItem(this.hass,C.id)}_rowClicked(C){let V=this.budget?.items.find(L=>L.id===C.detail.id);V&&this._dialog.open(V)}render(){if(!this.budget)return d;let C=this.hass,V={column:"monthly",direction:"desc"};return o`
      <hass-tabs-subpage-data-table
        .hass=${C}
        .narrow=${this.narrow}
        .route=${this.route}
        .tabs=${R(C,this.route)}
        main-page
        has-fab
        clickable
        id="id"
        .columns=${this._columns}
        .data=${this._rows}
        .searchLabel=${e(C,"items.search",{count:this.budget.items.length})}
        .noDataText=${e(C,"items.empty")}
        .initialGroupColumn=${"category"}
        .initialSorting=${V}
        @row-click=${this._rowClicked}
      >
        <ha-button slot="fab" size="l" variant="brand" appearance="accent" @click=${()=>this._dialog.open()}>
          <ha-svg-icon slot="start" .path=${s1}></ha-svg-icon>
          ${e(C,"items.add")}
        </ha-button>
      </hass-tabs-subpage-data-table>
      <pro-budget-item-dialog .hass=${C} .budget=${this.budget}></pro-budget-item-dialog>
      <pro-budget-confirm .hass=${C}></pro-budget-confirm>
    `}};P.styles=[h,s`
      :host {
        display: block;
        height: 100%;
      }
      /* Two-line main cell on narrow screens, as HA's entities page. */
      hass-tabs-subpage-data-table {
        --data-table-row-height: 60px;
      }
    `],a([p({attribute:!1})],P.prototype,"hass",2),a([p({attribute:!1})],P.prototype,"budget",2),a([p({attribute:!1})],P.prototype,"route",2),a([p({type:Boolean})],P.prototype,"narrow",2),a([Y("pro-budget-item-dialog")],P.prototype,"_dialog",2),a([Y("pro-budget-confirm")],P.prototype,"_confirm",2),P=a([S("pro-budget-items")],P);var k=class extends x{constructor(){super(...arguments);this.userId="";this.version="";this.narrow=!1;this._stats=[]}updated(C){(C.has("budget")||C.has("userId"))&&this._load()}async _load(){if(!this.hass||!this.budget)return;let C=new Date;this._stats=await u.stats(this.hass,C.getFullYear(),C.getMonth()+1,this.userId||void 0)}_user(C){return this.budget?.users.find(V=>V.id===C)?.name??e(this.hass,"common.unknown_user")}_category(C){let V=this.budget?.categories.find(L=>L.id===C);return o`
      ${$(V,"s")}
      ${V?.name??C}
    `}_frame(C){let V=H1(this.hass,this.budget,this.userId,{all:!0},L=>this.dispatchEvent(new CustomEvent("user-changed",{detail:{userId:L},bubbles:!0,composed:!0})));return o`
      <hass-tabs-subpage .hass=${this.hass} .narrow=${this.narrow} .route=${this.route} .tabs=${R(this.hass,this.route)} main-page>
        ${V} ${C}
      </hass-tabs-subpage>
    `}render(){return this.budget?this.budget.items.length===0?this._frame(o`<div class="cards"><ha-card><div class="empty">${e(this.hass,"overview.empty")}</div></ha-card></div>`):this._frame(o`
      <div class="cards">
        <p class="muted small" style="margin:0 0 12px">${e(this.hass,"common.monthly_hint")}</p>
        ${this._stats.map((C,V)=>this._renderCurrency(C,V>0))}
        <div class="version">Pro Budget v${this.version}</div>
      </div>
    `):d}_renderCurrency(C,V){let L=this.hass,t=i=>c(L,i,C.currency),r=[["overview.income",C.totals.income,"earning"],["overview.expenses",C.totals.expenses,"expense"],["overview.savings",C.totals.savings,"saving"],["overview.remaining",C.totals.remaining,C.totals.remaining<0?"expense":""]];return o`
      ${V?o`<p class="muted small">${e(L,"overview.other_currencies")} (${C.currency})</p>`:d}
      <div class="grid">
        ${r.map(([i,A,m])=>o`
            <ha-card>
              <div class="stat">
                <span class="label">${e(L,i)}</span>
                <span class="value ${m}">${t(A)}</span>
              </div>
            </ha-card>
          `)}
      </div>
      <ha-card style="margin-top:16px">
        <h2>${e(L,"overview.members")}</h2>
        <div class="scroll">
          <table class="plain">
            <thead>
              <tr>
                <th>${e(L,"overview.member")}</th>
                <th class="num">${e(L,"overview.income")}</th>
                <th class="num">${e(L,"overview.expenses")}</th>
                <th class="num">${e(L,"overview.shared")}</th>
                <th class="num">${e(L,"overview.fixed")}</th>
                <th class="num">${e(L,"overview.savings")}</th>
                <th class="num">${e(L,"overview.balance")}</th>
              </tr>
            </thead>
            <tbody>
              ${C.members.map(i=>o`
                  <tr>
                    <td>${this._user(i.user_id)}</td>
                    <td class="num earning">${t(i.earnings)}</td>
                    <td class="num expense">${t(i.expenses.total)}</td>
                    <td class="num">${t(i.expenses.shared)}</td>
                    <td class="num">${t(i.expenses.fixed)}</td>
                    <td class="num saving">${t(i.savings)}</td>
                    <td class="num ${i.balance<0?"expense":""}">${t(i.balance)}</td>
                  </tr>
                `)}
            </tbody>
          </table>
        </div>
      </ha-card>
      <div class="grid" style="margin-top:16px">
        <ha-card>
          <h2>${e(L,"overview.fairness")}</h2>
          <p class="muted small">${e(L,"overview.fairness_hint")}</p>
          <table class="plain">
            <thead>
              <tr>
                <th>${e(L,"overview.member")}</th>
                <th class="num">${e(L,"overview.shared_costs_paid")}</th>
                <th class="num">${e(L,"overview.shared_cost_share")}</th>
                <th class="num">${e(L,"overview.income_share")}</th>
              </tr>
            </thead>
            <tbody>
              ${C.fairness.map(i=>o`
                  <tr>
                    <td>${this._user(i.user_id)}</td>
                    <td class="num">${t(i.shared_costs_paid)}</td>
                    <td class="num">${C1(L,i.shared_cost_share)}</td>
                    <td class="num">${C1(L,i.income_share)}</td>
                  </tr>
                `)}
            </tbody>
          </table>
        </ha-card>
        <ha-card>
          <h2>${e(L,"overview.categories")}</h2>
          <table class="plain">
            <thead>
              <tr>
                <th>${e(L,"overview.category")}</th>
                <th class="num">${e(L,"overview.expenses")}</th>
                <th class="num">${e(L,"overview.savings")}</th>
                <th class="num">${e(L,"overview.income")}</th>
              </tr>
            </thead>
            <tbody>
              ${C.categories.map(i=>o`
                  <tr>
                    <td>${this._category(i.category_id)}</td>
                    <td class="num">${i.expenses?t(i.expenses):""}</td>
                    <td class="num">${i.savings?t(i.savings):""}</td>
                    <td class="num">${i.earnings?t(i.earnings):""}</td>
                  </tr>
                `)}
            </tbody>
          </table>
        </ha-card>
      </div>
    `}};k.styles=[h,s`
      :host {
        display: block;
        height: 100%;
      }
    `],a([p({attribute:!1})],k.prototype,"hass",2),a([p({attribute:!1})],k.prototype,"budget",2),a([p()],k.prototype,"userId",2),a([p()],k.prototype,"version",2),a([p({attribute:!1})],k.prototype,"route",2),a([p({type:Boolean})],k.prototype,"narrow",2),a([l()],k.prototype,"_stats",2),k=a([S("pro-budget-overview")],k);var g=class extends x{constructor(){super(...arguments);this.narrow=!1;this._ready=!1;this._error="";this._userId=""}connectedCallback(){super.connectedCallback(),this._start()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.(),this._unsubscribe=void 0}updated(C){C.has("hass")&&this.hass&&!this._unsubscribe&&this._start(),C.has("route")&&this._redirectToView()}_redirectToView(){let C=this.route;!C||C.path.replace(/\//g,"")!==""||(history.replaceState(null,"",`${C.prefix??D1}/${E1(C)}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!0}})))}async _start(){if(!(!this.hass||this._unsubscribe))try{await i2(),this._unsubscribe=await u.subscribe(this.hass,C=>this._budget=C),this._ready=!0}catch(C){this._error=String(C?.message??C)}}render(){let C=this.hass,V=this._budget;if(this._error)return o`<ha-alert alert-type="error">${this._error}</ha-alert>`;if(!this._ready||!V)return o`<div class="loading">${e(C,"common.loading")}</div>`;let L={hass:C,narrow:this.narrow,route:this.route,budget:V,version:"0.1.0"},t=r=>this._userId=r.detail.userId;switch(E1(this.route)){case"items":return o`<pro-budget-items .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${V}></pro-budget-items>`;case"calendar":return o`<pro-budget-calendar .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${V} .userId=${this._userId} @user-changed=${t}></pro-budget-calendar>`;case"insights":return o`<pro-budget-insights .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${V} .userId=${this._userId} @user-changed=${t}></pro-budget-insights>`;case"categories":return o`<pro-budget-categories .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${V}></pro-budget-categories>`;default:return o`<pro-budget-overview .hass=${L.hass} .narrow=${L.narrow} .route=${L.route} .budget=${V} .userId=${this._userId} .version=${L.version} @user-changed=${t}></pro-budget-overview>`}return d}};g.styles=s`
    :host {
      display: block;
      height: 100%;
    }
    .loading,
    ha-alert {
      display: block;
      padding: 16px;
    }
  `,a([p({attribute:!1})],g.prototype,"hass",2),a([p({type:Boolean})],g.prototype,"narrow",2),a([p({attribute:!1})],g.prototype,"route",2),a([p({attribute:!1})],g.prototype,"panel",2),a([l()],g.prototype,"_budget",2),a([l()],g.prototype,"_ready",2),a([l()],g.prototype,"_error",2),a([l()],g.prototype,"_userId",2),g=a([S("pro-budget-panel")],g);console.info("%c PRO-BUDGET %c v0.1.0 ","color: white; background: #3f51b5; font-weight: 700;","color: #3f51b5; background: white; font-weight: 700;");
