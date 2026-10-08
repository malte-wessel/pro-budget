/* pro-budget v0.1.0 | MIT | https://github.com/malte-wessel/pro-budget */
var xt=Object.defineProperty;var wt=Object.getOwnPropertyDescriptor;var m=(n,t,e,r)=>{for(var s=r>1?void 0:r?wt(t,e):t,a=n.length-1,i;a>=0;a--)(i=n[a])&&(s=(r?i(t,e,s):i(s))||s);return r&&s&&xt(t,e,s),s};var he=globalThis,pe=he.ShadowRoot&&(he.ShadyCSS===void 0||he.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Se=Symbol(),qe=new WeakMap,te=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==Se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(pe&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=qe.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&qe.set(e,t))}return t}toString(){return this.cssText}},Pe=n=>new te(typeof n=="string"?n:n+"",void 0,Se),w=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((r,s,a)=>r+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[a+1],n[0]);return new te(e,n,Se)},Ge=(n,t)=>{if(pe)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),s=he.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,n.appendChild(r)}},Ae=pe?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return Pe(e)})(n):n;var{is:St,defineProperty:At,getOwnPropertyDescriptor:Et,getOwnPropertyNames:kt,getOwnPropertySymbols:Ct,getPrototypeOf:Mt}=Object,ue=globalThis,je=ue.trustedTypes,Tt=je?je.emptyScript:"",Rt=ue.reactiveElementPolyfillSupport,re=(n,t)=>n,se={toAttribute(n,t){switch(t){case Boolean:n=n?Tt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},ge=(n,t)=>!St(n,t),Ve={attribute:!0,type:String,converter:se,reflect:!1,useDefault:!1,hasChanged:ge};Symbol.metadata??=Symbol("metadata"),ue.litPropertyMetadata??=new WeakMap;var U=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ve){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&At(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){let{get:s,set:a}=Et(this.prototype,t)??{get(){return this[e]},set(i){this[e]=i}};return{get:s,set(i){let c=s?.call(this);a?.call(this,i),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ve}static _$Ei(){if(this.hasOwnProperty(re("elementProperties")))return;let t=Mt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(re("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(re("properties"))){let e=this.properties,r=[...kt(e),...Ct(e)];for(let s of r)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)e.unshift(Ae(s))}else t!==void 0&&e.push(Ae(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ge(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let a=(r.converter?.toAttribute!==void 0?r.converter:se).toAttribute(e,r.type);this._$Em=t,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let a=r.getPropertyOptions(s),i=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:se;this._$Em=s;let c=i.fromAttribute(e,a.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(t,e,r,s=!1,a){if(t!==void 0){let i=this.constructor;if(s===!1&&(a=this[t]),r??=i.getPropertyOptions(t),!((r.hasChanged??ge)(a,e)||r.useDefault&&r.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:a},i){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??e??this[t]),a!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,a]of r){let{wrapped:i}=a,c=this[s];i!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,a,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[re("elementProperties")]=new Map,U[re("finalized")]=new Map,Rt?.({ReactiveElement:U}),(ue.reactiveElementVersions??=[]).push("2.1.2");var Ie=globalThis,We=n=>n,ye=Ie.trustedTypes,Ye=ye?ye.createPolicy("lit-html",{createHTML:n=>n}):void 0,et="$lit$",K=`lit$${Math.random().toFixed(9).slice(2)}$`,tt="?"+K,It=`<${tt}>`,j=document,ie=()=>j.createComment(""),ae=n=>n===null||typeof n!="object"&&typeof n!="function",He=Array.isArray,Ht=n=>He(n)||typeof n?.[Symbol.iterator]=="function",Ee=`[ 	
\f\r]`,ne=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ze=/-->/g,Je=/>/g,P=RegExp(`>|${Ee}(?:([^\\s"'>=/]+)(${Ee}*=${Ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qe=/'/g,Xe=/"/g,rt=/^(?:script|style|textarea|title)$/i,Ne=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),l=Ne(1),tr=Ne(2),rr=Ne(3),z=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),Be=new WeakMap,G=j.createTreeWalker(j,129);function st(n,t){if(!He(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ye!==void 0?Ye.createHTML(t):t}var Nt=(n,t)=>{let e=n.length-1,r=[],s,a=t===2?"<svg>":t===3?"<math>":"",i=ne;for(let c=0;c<e;c++){let d=n[c],p,_,v=-1,u=0;for(;u<d.length&&(i.lastIndex=u,_=i.exec(d),_!==null);)u=i.lastIndex,i===ne?_[1]==="!--"?i=Ze:_[1]!==void 0?i=Je:_[2]!==void 0?(rt.test(_[2])&&(s=RegExp("</"+_[2],"g")),i=P):_[3]!==void 0&&(i=P):i===P?_[0]===">"?(i=s??ne,v=-1):_[1]===void 0?v=-2:(v=i.lastIndex-_[2].length,p=_[1],i=_[3]===void 0?P:_[3]==='"'?Xe:Qe):i===Xe||i===Qe?i=P:i===Ze||i===Je?i=ne:(i=P,s=void 0);let f=i===P&&n[c+1].startsWith("/>")?" ":"";a+=i===ne?d+It:v>=0?(r.push(p),d.slice(0,v)+et+d.slice(v)+K+f):d+K+(v===-2?c:f)}return[st(n,a+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},oe=class n{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let a=0,i=0,c=t.length-1,d=this.parts,[p,_]=Nt(t,e);if(this.el=n.createElement(p,r),G.currentNode=this.el.content,e===2||e===3){let v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(s=G.nextNode())!==null&&d.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let v of s.getAttributeNames())if(v.endsWith(et)){let u=_[i++],f=s.getAttribute(v).split(K),R=/([.?@])?(.*)/.exec(u);d.push({type:1,index:a,name:R[2],strings:f,ctor:R[1]==="."?Ce:R[1]==="?"?Me:R[1]==="@"?Te:J}),s.removeAttribute(v)}else v.startsWith(K)&&(d.push({type:6,index:a}),s.removeAttribute(v));if(rt.test(s.tagName)){let v=s.textContent.split(K),u=v.length-1;if(u>0){s.textContent=ye?ye.emptyScript:"";for(let f=0;f<u;f++)s.append(v[f],ie()),G.nextNode(),d.push({type:2,index:++a});s.append(v[u],ie())}}}else if(s.nodeType===8)if(s.data===tt)d.push({type:2,index:a});else{let v=-1;for(;(v=s.data.indexOf(K,v+1))!==-1;)d.push({type:7,index:a}),v+=K.length-1}a++}}static createElement(t,e){let r=j.createElement("template");return r.innerHTML=t,r}};function Z(n,t,e=n,r){if(t===z)return t;let s=r!==void 0?e._$Co?.[r]:e._$Cl,a=ae(t)?void 0:t._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),a===void 0?s=void 0:(s=new a(n),s._$AT(n,e,r)),r!==void 0?(e._$Co??=[])[r]=s:e._$Cl=s),s!==void 0&&(t=Z(n,s._$AS(n,t.values),s,r)),t}var ke=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,s=(t?.creationScope??j).importNode(e,!0);G.currentNode=s;let a=G.nextNode(),i=0,c=0,d=r[0];for(;d!==void 0;){if(i===d.index){let p;d.type===2?p=new le(a,a.nextSibling,this,t):d.type===1?p=new d.ctor(a,d.name,d.strings,this,t):d.type===6&&(p=new Re(a,this,t)),this._$AV.push(p),d=r[++c]}i!==d?.index&&(a=G.nextNode(),i++)}return G.currentNode=j,s}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},le=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),ae(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==z&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ht(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&ae(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=oe.createElement(st(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{let a=new ke(s,this),i=a.u(this.options);a.p(e),this.T(i),this._$AH=a}}_$AC(t){let e=Be.get(t.strings);return e===void 0&&Be.set(t.strings,e=new oe(t)),e}k(t){He(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,s=0;for(let a of t)s===e.length?e.push(r=new n(this.O(ie()),this.O(ie()),this,this.options)):r=e[s],r._$AI(a),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=We(t).nextSibling;We(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,a){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=h}_$AI(t,e=this,r,s){let a=this.strings,i=!1;if(a===void 0)t=Z(this,t,e,0),i=!ae(t)||t!==this._$AH&&t!==z,i&&(this._$AH=t);else{let c=t,d,p;for(t=a[0],d=0;d<a.length-1;d++)p=Z(this,c[r+d],e,d),p===z&&(p=this._$AH[d]),i||=!ae(p)||p!==this._$AH[d],p===h?t=h:t!==h&&(t+=(p??"")+a[d+1]),this._$AH[d]=p}i&&!s&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ce=class extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}},Me=class extends J{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},Te=class extends J{constructor(t,e,r,s,a){super(t,e,r,s,a),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??h)===z)return;let r=this._$AH,s=t===h&&r!==h||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,a=t!==h&&(r===h||s);s&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Re=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}};var Dt=Ie.litHtmlPolyfillSupport;Dt?.(oe,le),(Ie.litHtmlVersions??=[]).push("3.3.3");var nt=(n,t,e)=>{let r=e?.renderBefore??t,s=r._$litPart$;if(s===void 0){let a=e?.renderBefore??null;r._$litPart$=s=new le(t.insertBefore(ie(),a),a,void 0,e??{})}return s._$AI(n),s};var De=globalThis,b=class extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=nt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}};b._$litElement$=!0,b.finalized=!0,De.litElementHydrateSupport?.({LitElement:b});var Lt=De.litElementPolyfillSupport;Lt?.({LitElement:b});(De.litElementVersions??=[]).push("4.2.2");var x=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};var Ot={attribute:!0,type:String,converter:se,reflect:!1,hasChanged:ge},Ut=(n=Ot,t,e)=>{let{kind:r,metadata:s}=e,a=globalThis.litPropertyMetadata.get(s);if(a===void 0&&globalThis.litPropertyMetadata.set(s,a=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),a.set(e.name,n),r==="accessor"){let{name:i}=e;return{set(c){let d=t.get.call(this);t.set.call(this,c),this.requestUpdate(i,d,n,!0,c)},init(c){return c!==void 0&&this.C(i,void 0,n,c),c}}}if(r==="setter"){let{name:i}=e;return function(c){let d=this[i];t.call(this,c),this.requestUpdate(i,d,n,!0,c)}}throw Error("Unsupported decorator location: "+r)};function y(n){return(t,e)=>typeof e=="object"?Ut(n,t,e):((r,s,a)=>{let i=s.hasOwnProperty(a);return s.constructor.createProperty(a,r),i?Object.getOwnPropertyDescriptor(s,a):void 0})(n,t,e)}function g(n){return y({...n,state:!0,attribute:!1})}var V=(n,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(n,t,e),e);function Q(n,t){return(e,r,s)=>{let a=i=>i.renderRoot?.querySelector(n)??null;if(t){let{get:i,set:c}=typeof r=="object"?e:s??(()=>{let d=Symbol();return{get(){return this[d]},set(p){this[d]=p}}})();return V(e,r,{get(){let d=i.call(this);return d===void 0&&(d=a(this),(d!==null||this.hasUpdated)&&c.call(this,d)),d}})}return V(e,r,{get(){return a(this)}})}}var it={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},at=n=>(...t)=>({_$litDirective$:n,values:t}),ve=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var X=at(class extends ve{constructor(n){if(super(n),n.type!==it.ATTRIBUTE||n.name!=="class"||n.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(t=>n[t]).join(" ")+" "}update(n,[t]){if(this.st===void 0){this.st=new Set,n.strings!==void 0&&(this.nt=new Set(n.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}let e=n.element.classList;for(let r of this.st)r in t||(e.remove(r),this.st.delete(r));for(let r in t){let s=!!t[r];s===this.st.has(r)||this.nt?.has(r)||(s?(e.add(r),this.st.add(r)):(e.remove(r),this.st.delete(r)))}return z}});var M="pro_budget",ce=class extends Error{constructor(e,r){super(r);this.code=e}};async function I(n,t){try{return await n.callWS(t)}catch(e){let r=e;throw new ce(r.code??"unknown",r.message??String(e))}}var $={subscribe(n,t){return n.connection.subscribeMessage(t,{type:`${M}/subscribe`})},createCategory:(n,t)=>I(n,{type:`${M}/categories/create`,fields:t}),updateCategory:(n,t,e)=>I(n,{type:`${M}/categories/update`,category_id:t,fields:e}),deleteCategory:(n,t)=>I(n,{type:`${M}/categories/delete`,category_id:t}),createItem:(n,t)=>I(n,{type:`${M}/items/create`,fields:t}),updateItem:(n,t,e)=>I(n,{type:`${M}/items/update`,item_id:t,fields:e}),deleteItem:(n,t)=>I(n,{type:`${M}/items/delete`,item_id:t}),setPaid:(n,t,e,r)=>I(n,{type:`${M}/paid/set`,item_id:t,date:e,paid:r}),stats:(n,t,e,r)=>I(n,{type:`${M}/stats`,year:t,month:e,...r?{user_id:r}:{}}),insights:(n,t,e)=>I(n,{type:`${M}/insights`,user_id:t,year:e}),occurrences:(n,t,e,r)=>I(n,{type:`${M}/occurrences`,start:t,end:e,...r?{user_id:r}:{}})};var ot={topBar:"ha-top-app-bar-fixed",menuButton:"ha-menu-button",iconButton:"ha-icon-button",card:"ha-card",icon:"ha-icon",form:"ha-form",dialog:"ha-dialog",dialogHeader:"ha-dialog-header",button:"ha-button",alert:"ha-alert",circularProgress:"ha-spinner",ripple:"ha-ripple"},lt;function ct(){return lt??=(async()=>{try{await(await window.loadCardHelpers?.())?.createCardElement({type:"entities",entities:[]})?.constructor.getConfigElement?.()}catch{}await Promise.all([ot.form,ot.dialog].map(n=>Promise.race([customElements.whenDefined(n),new Promise(t=>setTimeout(t,4e3))])))})(),lt}var dt={"panel.title":"Budget","nav.overview":"\xDCbersicht","nav.items":"Posten","nav.calendar":"Kalender","nav.insights":"Einblicke","nav.categories":"Kategorien","common.all":"Alle","common.add":"Hinzuf\xFCgen","common.save":"Speichern","common.cancel":"Abbrechen","common.delete":"L\xF6schen","common.edit":"Bearbeiten","common.close":"Schlie\xDFen","common.loading":"L\xE4dt\u2026","common.unknown_user":"Ehemaliges Mitglied","common.monthly_hint":"Alle Betr\xE4ge als monatliches \xC4quivalent.","common.per_month":"/ Monat","common.error":"Etwas ist schiefgelaufen: {error}","common.today":"Heute","common.paid":"Bezahlt","common.unpaid":"Noch nicht bezahlt","type.earning":"Einnahme","type.expense":"Ausgabe","type.saving":"Sparen","type.earning.plural":"Einnahmen","type.expense.plural":"Ausgaben","type.saving.plural":"Sparen","recurrence.daily":"T\xE4glich","recurrence.weekly":"W\xF6chentlich","recurrence.biweekly":"Alle zwei Wochen","recurrence.monthly":"Monatlich","recurrence.quarterly":"Viertelj\xE4hrlich","recurrence.semi_annually":"Halbj\xE4hrlich","recurrence.annually":"J\xE4hrlich","cost_kind.fixed":"Fix","cost_kind.variable":"Variabel","payment.direct_debit":"Lastschrift","payment.standing_order":"Dauerauftrag","payment.manual":"Manuell / \xDCberweisung","payment.credit_card":"Kreditkarte","payment.paypal":"PayPal","due.on_day":"am {day}.","due.on_day_month":"am {day}. {month}","due.months":"am {day}. ({months})","overview.income":"Einnahmen","overview.expenses":"Ausgaben","overview.savings":"Sparen","overview.remaining":"Verbleibend","overview.members":"Mitglieder","overview.member":"Mitglied","overview.balance":"Saldo","overview.shared":"Gemeinsam","overview.personal":"Pers\xF6nlich","overview.fixed":"Fix","overview.variable":"Variabel","overview.fairness":"Fairness","overview.fairness_hint":"Anteil an den gemeinsamen Kosten gegen\xFCber dem Anteil am Haushaltseinkommen.","overview.shared_costs_paid":"Gemeinsame Kosten bezahlt","overview.shared_cost_share":"Anteil gemeinsame Kosten","overview.income_share":"Anteil Einkommen","overview.categories":"Nach Kategorie","overview.category":"Kategorie","overview.empty":"Noch keine Posten. Lege den ersten unter Posten an.","overview.other_currencies":"Posten in anderen W\xE4hrungen werden getrennt aufgef\xFChrt.","items.title":"Posten","items.add":"Posten hinzuf\xFCgen","items.search":"{count} Posten durchsuchen","items.group_by":"Gruppieren nach","items.group.category":"Kategorie","items.group.user":"Mitglied","items.group.type":"Typ","items.group.none":"Keine","categories.search":"{count} Kategorien durchsuchen","items.filter_type":"Typ","items.filter_user":"Mitglied","items.filter_category":"Kategorie","items.col_title":"Titel","items.col_amount":"Betrag","items.col_recurrence":"Turnus","items.col_due":"F\xE4llig","items.col_category":"Kategorie","items.col_user":"Mitglied","items.col_monthly":"Monatlich","items.empty":"Keine passenden Posten.","items.inactive":"Inaktiv","item.title":"Titel","item.type":"Typ","item.amount":"Betrag","item.currency":"W\xE4hrung","item.category":"Kategorie","item.user":"Bezahlt von","item.user_earning":"Empfangen von","item.recurrence":"Turnus","item.due_weekday":"Wochentag","item.due_day":"Tag im Monat","item.due_month":"Erster Monat","item.cost_kind":"Fix / Variabel","item.shared":"Gemeinsamer Haushaltsposten","item.payment_method":"Zahlweise","item.start":"Startdatum","item.end":"Enddatum","item.advanced":"Erweitert","item.new":"Neuer Posten","item.edit":"Posten bearbeiten","item.delete_confirm":"\u201E{title}\u201C l\xF6schen?","item.amount_invalid":"Gib einen Betrag wie 12,50 ein.","calendar.agenda":"Agenda","calendar.month":"Monat","calendar.previous":"Zur\xFCck","calendar.next":"Weiter","calendar.empty":"In diesem Zeitraum ist nichts f\xE4llig.","calendar.unscheduled":"Nicht platzierbar (kein F\xE4lligkeitsmonat)","calendar.mark_paid":"Als bezahlt markieren","calendar.mark_unpaid":"Als unbezahlt markieren","calendar.weeks":"N\xE4chste {weeks} Wochen","insights.title":"Einblicke","insights.year":"Jahr","insights.savings_rate":"Sparquote","insights.fixed_cost_rate":"Fixkostenquote","insights.avg_month":"Durchschnittsmonat","insights.max_month":"Teuerster Monat","insights.min_month":"G\xFCnstigster Monat","insights.top_expenses":"Gr\xF6\xDFte Ausgaben","insights.payment_calendar":"Zahlungskalender {year}","insights.payment_calendar_hint":"Tats\xE4chliche Abfl\xFCsse je Monat, nicht normalisiert.","insights.unscheduled":"Nicht platzierbar: diese Posten haben keinen F\xE4lligkeitsmonat.","insights.no_member":"W\xE4hle ein Mitglied.","categories.title":"Kategorien","categories.add":"Kategorie hinzuf\xFCgen","categories.name":"Name","categories.icon":"Symbol","categories.items":"{count} Posten","categories.in_use":"Wird von {count} Posten verwendet; l\xF6sche oder verschiebe sie zuerst.","categories.delete_confirm":"Kategorie \u201E{name}\u201C l\xF6schen?","categories.new":"Neue Kategorie","categories.edit":"Kategorie bearbeiten","errors.not_found":"Nicht gefunden.","errors.invalid":"Ung\xFCltige Eingabe: {message}","errors.in_use":"Wird noch verwendet."};var Le={"panel.title":"Budget","nav.overview":"Overview","nav.items":"Items","nav.calendar":"Calendar","nav.insights":"Insights","nav.categories":"Categories","common.all":"Everyone","common.add":"Add","common.save":"Save","common.cancel":"Cancel","common.delete":"Delete","common.edit":"Edit","common.close":"Close","common.loading":"Loading\u2026","common.unknown_user":"Former member","common.monthly_hint":"All amounts as monthly equivalents.","common.per_month":"/ month","common.error":"Something went wrong: {error}","common.today":"Today","common.none":"\u2014","common.paid":"Paid","common.unpaid":"Not paid yet","type.earning":"Earning","type.expense":"Expense","type.saving":"Saving","type.earning.plural":"Earnings","type.expense.plural":"Expenses","type.saving.plural":"Savings","recurrence.daily":"Daily","recurrence.weekly":"Weekly","recurrence.biweekly":"Every two weeks","recurrence.monthly":"Monthly","recurrence.quarterly":"Quarterly","recurrence.semi_annually":"Semi-annually","recurrence.annually":"Annually","cost_kind.fixed":"Fixed","cost_kind.variable":"Variable","payment.direct_debit":"Direct debit","payment.standing_order":"Standing order","payment.manual":"Manual / bank transfer","payment.credit_card":"Credit card","payment.paypal":"PayPal","due.on_day":"on the {day}.","due.on_day_month":"on the {day}. of {month}","due.months":"on the {day}. ({months})","overview.income":"Income","overview.expenses":"Expenses","overview.savings":"Savings","overview.remaining":"Remaining","overview.members":"Members","overview.member":"Member","overview.balance":"Balance","overview.shared":"Shared","overview.personal":"Personal","overview.fixed":"Fixed","overview.variable":"Variable","overview.fairness":"Fairness","overview.fairness_hint":"Share of shared costs paid versus share of household income.","overview.shared_costs_paid":"Shared costs paid","overview.shared_cost_share":"Share of shared costs","overview.income_share":"Share of income","overview.categories":"By category","overview.category":"Category","overview.empty":"No items yet. Add the first one under Items.","overview.other_currencies":"Items in other currencies are listed separately.","items.title":"Items","items.add":"Add item","items.search":"Search {count} items","items.group_by":"Group by","items.group.category":"Category","items.group.user":"Member","items.group.type":"Type","items.group.none":"None","categories.search":"Search {count} categories","items.filter_type":"Type","items.filter_user":"Member","items.filter_category":"Category","items.col_title":"Title","items.col_amount":"Amount","items.col_recurrence":"Recurrence","items.col_due":"Due","items.col_category":"Category","items.col_user":"Member","items.col_monthly":"Monthly","items.empty":"No items match.","items.inactive":"Inactive","item.title":"Title","item.type":"Type","item.amount":"Amount","item.currency":"Currency","item.category":"Category","item.user":"Paid by","item.user_earning":"Received by","item.recurrence":"Recurrence","item.due_weekday":"Weekday","item.due_day":"Day of month","item.due_month":"First month","item.cost_kind":"Fixed / variable","item.shared":"Shared household cost","item.payment_method":"Payment method","item.start":"Start date","item.end":"End date","item.advanced":"Advanced","item.new":"New item","item.edit":"Edit item","item.delete_confirm":"Delete \u201C{title}\u201D?","item.amount_invalid":"Enter an amount like 12.50.","calendar.agenda":"Agenda","calendar.month":"Month","calendar.previous":"Previous","calendar.next":"Next","calendar.empty":"Nothing due in this period.","calendar.unscheduled":"Not placeable (no due month)","calendar.mark_paid":"Mark paid","calendar.mark_unpaid":"Mark unpaid","calendar.weeks":"Next {weeks} weeks","insights.title":"Insights","insights.year":"Year","insights.savings_rate":"Savings rate","insights.fixed_cost_rate":"Fixed cost rate","insights.avg_month":"Average month","insights.max_month":"Most expensive month","insights.min_month":"Cheapest month","insights.top_expenses":"Largest expenses","insights.payment_calendar":"Payment calendar {year}","insights.payment_calendar_hint":"Actual outflows per month, not normalized.","insights.unscheduled":"Not placeable: these items have no due month.","insights.no_member":"Pick a member.","categories.title":"Categories","categories.add":"Add category","categories.name":"Name","categories.icon":"Icon","categories.items":"{count} items","categories.in_use":"In use by {count} items; delete or move them first.","categories.delete_confirm":"Delete category \u201C{name}\u201D?","categories.new":"New category","categories.edit":"Edit category","errors.not_found":"Not found.","errors.invalid":"Invalid input: {message}","errors.in_use":"Still in use."};var zt={en:Le,de:dt};function Ft(n){return(n?.locale?.language??n?.language??"en").toLowerCase().split("-")[0]}function o(n,t,e){let r=zt[Ft(n)]?.[t]??Le[t];if(e)for(let[s,a]of Object.entries(e))r=r.replaceAll(`{${s}}`,String(a));return r}var A=w`
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
  /* The toolbar under the header, as on HA's settings pages. */
  .toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px 16px;
    min-height: 64px;
    background: var(--card-background-color);
    border-bottom: 1px solid var(--divider-color);
    position: sticky;
    top: 0;
    z-index: 2;
  }
  .toolbar .search {
    flex: 1 1 200px;
    display: flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 12px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: var(--card-background-color);
    max-width: 480px;
  }
  .toolbar .search ha-icon {
    --mdc-icon-size: 20px;
    color: var(--secondary-text-color);
  }
  .toolbar .search input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: 0;
    background: none;
    font: inherit;
    color: var(--primary-text-color);
  }
  .toolbar .spacer {
    flex: 1;
  }
  .toolbar select,
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
  .toolbar ha-button {
    --mdc-theme-primary: var(--primary-color);
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
`;function B(n){return l`
    <ha-dialog open .headerTitle=${n.heading} .preventScrimClose=${!!n.sticky} @closed=${n.onClosed}>
      ${n.content}
      ${n.actions.map(t=>l`
          <ha-button
            slot="footer"
            data-action=${t.primary?"primary":"secondary"}
            appearance=${t.primary?"accent":"plain"}
            variant=${t.danger?"danger":h}
            .disabled=${t.disabled??!1}
            @click=${t.onClick}
          >
            ${t.label}
          </ha-button>
        `)}
    </ha-dialog>
  `}function W(n){return n?.locale?.language??n?.language??"en"}var mt=new Map;function E(n,t,e){let r=`${W(n)}|${e}`,s=mt.get(r);if(!s){try{s=new Intl.NumberFormat(W(n),{style:"currency",currency:e})}catch{s=new Intl.NumberFormat(W(n),{minimumFractionDigits:2})}mt.set(r,s)}return s.format(t/100)}function ht(n,t,e,r){let s=E(n,Math.abs(t),e);return r?`\u2212${s}`:`+${s}`}function ee(n,t){return t===null?"\u2014":new Intl.NumberFormat(W(n),{style:"percent",maximumFractionDigits:1}).format(t)}function H(n){let t=n.getFullYear(),e=String(n.getMonth()+1).padStart(2,"0"),r=String(n.getDate()).padStart(2,"0");return`${t}-${e}-${r}`}function Oe(n){let[t,e,r]=n.split("-").map(Number);return new Date(t,e-1,r)}function Ue(n,t,e){return new Intl.DateTimeFormat(W(n),e).format(Oe(t))}function N(n,t,e="long"){return new Intl.DateTimeFormat(W(n),{month:e}).format(new Date(2026,t-1,1))}function _e(n,t,e="long"){return new Intl.DateTimeFormat(W(n),{weekday:e}).format(new Date(2026,5,t))}function pt(n){let t=n.trim().replace(/\s/g,"");if(!t)return null;let e=t.lastIndexOf(","),r=t.lastIndexOf("."),s;return e>r?s=t.replace(/\./g,"").replace(",","."):r>e?s=t.replace(/,/g,""):s=t,/^\d+(\.\d{1,2})?$/.test(s)?Math.round(Number(s)*100):null}function ut(n){return(n/100).toFixed(2)}var de=["earning","expense","saving"],gt=["daily","weekly","biweekly","monthly","quarterly","semi_annually","annually"],yt=["fixed","variable"],vt=["direct_debit","standing_order","manual","credit_card","paypal"],ze=["quarterly","semi_annually","annually"];function Kt(n,t,e){return n?{title:n.title,type:n.type,amount:ut(n.amount),currency:n.currency??"",category_id:n.category_id,user_id:n.user_id,recurrence:n.recurrence,due_day:n.due_day??void 0,due_month:n.due_month??void 0,cost_kind:n.cost_kind,shared:n.shared,payment_method:n.payment_method??"",start:n.start??void 0,end:n.end??void 0}:{type:"expense",recurrence:"monthly",due_day:1,cost_kind:"fixed",shared:!1,category_id:t.categories[0]?.id,user_id:e??t.users[0]?.id,amount:""}}var C=class extends b{constructor(){super(...arguments);this._open=!1;this._data={};this._error="";this._saving=!1;this._label=e=>{if(e.name==="user_id")return o(this.hass,this._data.type==="earning"?"item.user_earning":"item.user");if(e.name==="due_day"){let r=this._data.recurrence;return o(this.hass,r==="weekly"||r==="biweekly"?"item.due_weekday":"item.due_day")}return e.name==="category_id"?o(this.hass,"item.category"):o(this.hass,`item.${e.name}`)};this._onClosed=e=>{e.target===this.renderRoot.querySelector("ha-dialog")&&this._close()}}open(e){this.budget&&(this._item=e,this._data=Kt(e,this.budget,this.hass?.user?.id),this._error="",this._open=!0)}_close(){this._open=!1}get _schema(){let e=this.budget,r=this._data.recurrence,s=r==="weekly"||r==="biweekly",a=ze.includes(r),i=(p,_)=>p.map(v=>({value:v,label:_(v)})),c=[{name:"title",required:!0,selector:{text:{}}},{name:"",type:"grid",schema:[{name:"type",required:!0,selector:{select:{mode:"dropdown",options:i(de,p=>o(this.hass,`type.${p}`))}}},{name:"cost_kind",selector:{select:{mode:"dropdown",options:i(yt,p=>o(this.hass,`cost_kind.${p}`))}}},{name:"amount",required:!0,selector:{text:{type:"text",suffix:e.config.currency}}},{name:"category_id",required:!0,selector:{select:{mode:"dropdown",options:e.categories.map(p=>({value:p.id,label:p.name}))}}},{name:"user_id",required:!0,selector:{select:{mode:"dropdown",options:e.users.map(p=>({value:p.id,label:p.name}))}}},{name:"recurrence",required:!0,selector:{select:{mode:"dropdown",options:i(gt,p=>o(this.hass,`recurrence.${p}`))}}}]}],d=[];return s?d.push({name:"due_day",required:!0,selector:{select:{mode:"dropdown",options:[1,2,3,4,5,6,7].map(p=>({value:String(p),label:_e(this.hass,p)}))}}}):r!=="daily"&&d.push({name:"due_day",required:!0,selector:{number:{min:1,max:31,mode:"box"}}}),a&&d.push({name:"due_month",required:!0,selector:{select:{mode:"dropdown",options:Array.from({length:12},(p,_)=>({value:String(_+1),label:N(this.hass,_+1)}))}}}),d.length&&c.push({name:"",type:"grid",schema:d}),c.push({name:"shared",selector:{boolean:{}}}),c.push({name:"advanced",type:"expandable",schema:[{name:"payment_method",selector:{select:{mode:"dropdown",options:[{value:"",label:o(this.hass,"common.none")},...i(vt,p=>o(this.hass,`payment.${p}`))]}}},{name:"currency",selector:{text:{}}},{name:"",type:"grid",schema:[{name:"start",selector:{date:{}}},{name:"end",selector:{date:{}}}]}]}),c}_fields(){let e=this._data,r=pt(String(e.amount??""));if(r===null)return o(this.hass,"item.amount_invalid");let s=e.recurrence,a=ze.includes(s);return{title:String(e.title??""),type:e.type,amount:r,currency:e.currency?String(e.currency).toUpperCase():null,category_id:String(e.category_id??""),user_id:String(e.user_id??""),recurrence:s,due_day:s==="daily"||e.due_day==null?null:Number(e.due_day),due_month:a&&e.due_month!=null?Number(e.due_month):null,cost_kind:e.cost_kind??"fixed",shared:!!e.shared,payment_method:e.payment_method?e.payment_method:null,start:e.start?String(e.start):null,end:e.end?String(e.end):null}}async _save(){let e=this._fields();if(typeof e=="string"){this._error=e;return}this._saving=!0,this._error="";try{this._item?await $.updateItem(this.hass,this._item.id,e):await $.createItem(this.hass,e),this._close()}catch(r){this._error=Fe(this.hass,r)}finally{this._saving=!1}}render(){return!this._open||!this.budget?h:B({heading:o(this.hass,this._item?"item.edit":"item.new"),sticky:!0,onClosed:this._onClosed,content:l`
        ${this._error?l`<ha-alert alert-type="error">${this._error}</ha-alert>`:h}
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${this._schema}
          .computeLabel=${this._label}
          @value-changed=${e=>this._data=e.detail.value}
        ></ha-form>
      `,actions:[{label:o(this.hass,"common.cancel"),onClick:()=>this._close()},{label:o(this.hass,"common.save"),primary:!0,disabled:this._saving,onClick:()=>this._save()}]})}};C.styles=[A,w`
      ha-dialog {
        --mdc-dialog-min-width: min(560px, 95vw);
      }
      ha-alert {
        display: block;
        margin-bottom: 12px;
      }
    `],m([y({attribute:!1})],C.prototype,"hass",2),m([y({attribute:!1})],C.prototype,"budget",2),m([g()],C.prototype,"_item",2),m([g()],C.prototype,"_open",2),m([g()],C.prototype,"_data",2),m([g()],C.prototype,"_error",2),m([g()],C.prototype,"_saving",2),C=m([x("pro-budget-item-dialog")],C);function Fe(n,t){if(t instanceof ce){if(t.code==="not_found")return o(n,"errors.not_found");if(t.code==="in_use")return o(n,"errors.in_use");if(t.code==="invalid")return o(n,"errors.invalid",{message:t.message})}return o(n,"common.error",{error:String(t?.message??t)})}var qt=[{name:"name",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}}],D=class extends b{constructor(){super(...arguments);this._open=!1;this._data={};this._error="";this._onClosed=e=>{e.target===this.renderRoot.querySelector("ha-dialog")&&this._close()}}open(e){this._category=e,this._data=e?{name:e.name,icon:e.icon??void 0}:{},this._error="",this._open=!0}_close(){this._open=!1}async _save(){let e={name:String(this._data.name??""),icon:this._data.icon||null};try{this._category?await $.updateCategory(this.hass,this._category.id,e):await $.createCategory(this.hass,e),this._close()}catch(r){this._error=Fe(this.hass,r)}}render(){return this._open?B({heading:o(this.hass,this._category?"categories.edit":"categories.new"),onClosed:this._onClosed,content:l`
        ${this._error?l`<ha-alert alert-type="error">${this._error}</ha-alert>`:h}
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${qt}
          .computeLabel=${e=>o(this.hass,`categories.${e.name}`)}
          @value-changed=${e=>this._data=e.detail.value}
        ></ha-form>
      `,actions:[{label:o(this.hass,"common.cancel"),onClick:()=>this._close()},{label:o(this.hass,"common.save"),primary:!0,onClick:()=>this._save()}]}):h}};D.styles=[A,w`
      ha-alert {
        display: block;
        margin-bottom: 12px;
      }
    `],m([y({attribute:!1})],D.prototype,"hass",2),m([g()],D.prototype,"_category",2),m([g()],D.prototype,"_open",2),m([g()],D.prototype,"_data",2),m([g()],D.prototype,"_error",2),D=m([x("pro-budget-category-dialog")],D);var q=class extends b{constructor(){super(...arguments);this._text="";this._open=!1;this._onClosed=e=>{e.target===this.renderRoot.querySelector("ha-dialog")&&this._close(!1)}}open(e){return this._text=e,this._open=!0,new Promise(r=>this._resolve=r)}_close(e){this._open=!1,this._resolve?.(e),this._resolve=void 0}render(){return this._open?B({heading:this._text,content:l``,onClosed:this._onClosed,actions:[{label:o(this.hass,"common.cancel"),onClick:()=>this._close(!1)},{label:o(this.hass,"common.delete"),primary:!0,danger:!0,onClick:()=>this._close(!0)}]}):l``}};q.styles=w`
    ha-dialog {
      --mdc-dialog-min-width: 320px;
    }
  `,m([y({attribute:!1})],q.prototype,"hass",2),m([g()],q.prototype,"_text",2),m([g()],q.prototype,"_open",2),q=m([x("pro-budget-confirm")],q);var _t=8,T=class extends b{constructor(){super(...arguments);this.userId="";this._view="agenda";this._month=H(new Date).slice(0,7);this._days=[]}updated(e){["budget","userId","_view","_month"].some(r=>e.has(r))&&this._load()}_range(){if(this._view==="agenda"){let s=new Date,a=new Date;return a.setDate(a.getDate()+_t*7-1),[H(s),H(a)]}let[e,r]=this._month.split("-").map(Number);return[H(new Date(e,r-1,1)),H(new Date(e,r,0))]}async _load(){if(!this.hass||!this.budget)return;let[e,r]=this._range();this._days=await $.occurrences(this.hass,e,r,this.userId||void 0)}_item(e){return this.budget?.items.find(r=>r.id===e)}_shift(e){let[r,s]=this._month.split("-").map(Number);this._month=H(new Date(r,s-1+e,1)).slice(0,7)}async _togglePaid(e,r,s){await $.setPaid(this.hass,e,r,!s),await this._load()}render(){if(!this.budget)return h;let e=this.hass;return l`
      <div class="toolbar">
        <div class="chips">
          <button class="chip" aria-pressed=${this._view==="agenda"} @click=${()=>this._view="agenda"}>
            ${o(e,"calendar.agenda")}
          </button>
          <button class="chip" aria-pressed=${this._view==="month"} @click=${()=>this._view="month"}>
            ${o(e,"calendar.month")}
          </button>
        </div>
        <span class="grow"></span>
        ${this._view==="month"?l`
              <ha-icon-button .label=${o(e,"calendar.previous")} @click=${()=>this._shift(-1)}>
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </ha-icon-button>
              <strong>${Ue(e,`${this._month}-01`,{month:"long",year:"numeric"})}</strong>
              <ha-icon-button .label=${o(e,"calendar.next")} @click=${()=>this._shift(1)}>
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </ha-icon-button>
            `:l`<span class="muted small">${o(e,"calendar.weeks",{weeks:_t})}</span>`}
      </div>
      <div class="cards">
        <ha-card>${this._view==="agenda"?this._renderAgenda():this._renderMonth()}</ha-card>
      </div>
    `}_entry(e,r){let s=this._item(e.item_id);if(!s)return h;let a=s.currency??this.budget.config.currency,i=s.type!=="earning";return l`
      <div class="entry ${e.paid?"paid":""}">
        <span class="amount ${s.type}">${ht(this.hass,s.amount,a,i)}</span>
        <span class="title grow">${s.title}</span>
        ${i?l`
              <ha-icon-button
                .label=${o(this.hass,e.paid?"calendar.mark_unpaid":"calendar.mark_paid")}
                @click=${()=>this._togglePaid(s.id,r,e.paid)}
              >
                <ha-icon icon=${e.paid?"mdi:check-circle":"mdi:checkbox-blank-circle-outline"}></ha-icon>
              </ha-icon-button>
            `:h}
      </div>
    `}_renderAgenda(){let e=this.hass,r=H(new Date),s=this._days.filter(i=>i.date!==null),a=this._days.find(i=>i.date===null);return s.length===0&&!a?l`<div class="empty">${o(e,"calendar.empty")}</div>`:l`
      ${s.map(i=>l`
          <div class="day">
            <div class="date ${i.date===r?"today":""}">
              ${Ue(e,i.date,{weekday:"short",day:"numeric",month:"short"})}
            </div>
            <div class="entries">${i.entries.map(c=>this._entry(c,i.date))}</div>
          </div>
        `)}
      ${a?l`
            <div class="day">
              <div class="date muted">${o(e,"calendar.unscheduled")}</div>
              <div class="entries">
                ${a.entries.map(i=>l`<div class="entry"><span class="title">${this._item(i.item_id)?.title}</span></div>`)}
              </div>
            </div>
          `:h}
    `}_renderMonth(){let e=this.hass,[r,s]=this._month.split("-").map(Number),i=(new Date(r,s-1,1).getDay()+6)%7,c=new Date(r,s,0).getDate(),d=[...Array(i).fill(null)];for(let f=1;f<=c;f++)d.push(H(new Date(r,s-1,f)));for(;d.length%7;)d.push(null);let p=new Map(this._days.filter(f=>f.date).map(f=>[f.date,f.entries])),_=H(new Date),v=this.budget.config.currency,u=[1,2,3,4,5,6,7].map(f=>new Intl.DateTimeFormat(e?.locale?.language??"en",{weekday:"short"}).format(new Date(2026,5,f)));return l`
      <div class="month-grid">
        ${u.map(f=>l`<div class="head">${f}</div>`)}
        ${d.map(f=>{if(!f)return l`<div class="cell outside"></div>`;let R=p.get(f)??[],xe=0;for(let we of R){let me=this._item(we.item_id);me&&(xe+=me.type==="earning"?me.amount:-me.amount)}return l`
            <div class="cell ${f===_?"today":""}">
              <div class="num">${Oe(f).getDate()}</div>
              ${R.length?l`
                    <div class="sum ${xe<0?"expense":"earning"}">${E(e,xe,v)}</div>
                    ${R.slice(0,3).map(we=>l`<div class="item">${this._item(we.item_id)?.title}</div>`)}
                    ${R.length>3?l`<div class="item muted">+${R.length-3}</div>`:h}
                  `:h}
            </div>
          `})}
      </div>
      <p class="muted small" style="margin:8px 0 0">${N(e,s)} ${r}</p>
    `}};T.styles=[A,w`
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
    `],m([y({attribute:!1})],T.prototype,"hass",2),m([y({attribute:!1})],T.prototype,"budget",2),m([y()],T.prototype,"userId",2),m([g()],T.prototype,"_view",2),m([g()],T.prototype,"_month",2),m([g()],T.prototype,"_days",2),T=m([x("pro-budget-calendar")],T);var fe=w`
  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  .table th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-weight: 500;
    text-align: left;
    height: 56px;
    padding: 0 16px;
    border-bottom: 1px solid var(--divider-color);
    white-space: nowrap;
    user-select: none;
  }
  .table th.sortable {
    cursor: pointer;
  }
  .table th ha-icon {
    --mdc-icon-size: 18px;
    vertical-align: middle;
    margin-right: 4px;
    opacity: 0.7;
  }
  .table td {
    height: 56px;
    padding: 0 16px;
    border-bottom: 1px solid var(--divider-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 0;
  }
  .table td.icon,
  .table th.icon {
    width: 56px;
    max-width: 56px;
    padding-right: 0;
    color: var(--secondary-text-color);
  }
  .table td.icon ha-icon {
    --mdc-icon-size: 24px;
  }
  .table td.num,
  .table th.num {
    text-align: right;
    font-variant-numeric: tabular-nums;
    width: 1%;
    max-width: none;
  }
  .table td.menu,
  .table th.menu {
    width: 56px;
    max-width: 56px;
    padding: 0 8px 0 0;
    text-align: right;
    overflow: visible;
  }
  .table tr.row {
    display: table-row;
    cursor: pointer;
  }
  .table tr.row:hover td {
    background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.04);
  }
  .table tr.group td {
    height: 48px;
    background: var(--secondary-background-color);
    font-weight: 500;
    cursor: pointer;
    overflow: visible;
    max-width: none;
  }
  .table tr.group ha-icon {
    --mdc-icon-size: 20px;
    vertical-align: middle;
    margin: 0 20px 0 0;
    transition: transform 120ms;
  }
  .table tr.group.collapsed ha-icon {
    transform: rotate(180deg);
  }
  .table .secondary {
    display: block;
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 16px;
  }
  .table .empty {
    text-align: center;
    color: var(--secondary-text-color);
    height: 120px;
  }
  @media (max-width: 870px) {
    .table .optional {
      display: none;
    }
  }
  /* row menu */
  .rowmenu {
    position: relative;
    display: inline-block;
  }
  .rowmenu ha-icon-button {
    --mdc-icon-button-size: 40px;
    color: var(--secondary-text-color);
  }
  .rowmenu .items {
    display: none;
    position: absolute;
    right: 0;
    top: 40px;
    z-index: 5;
    min-width: 160px;
    padding: 8px 0;
    background: var(--card-background-color);
    border-radius: 8px;
    box-shadow:
      0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
  .rowmenu[open] .items {
    display: block;
  }
  .rowmenu .items button {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    height: 48px;
    padding: 0 16px;
    border: 0;
    background: none;
    color: var(--primary-text-color);
    font: inherit;
    cursor: pointer;
    text-align: left;
    white-space: nowrap;
  }
  .rowmenu .items button:hover:not(:disabled) {
    background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.04);
  }
  .rowmenu .items button:disabled {
    opacity: 0.4;
    cursor: default;
  }
  .rowmenu .items button.danger {
    color: var(--error-color);
  }
  .rowmenu .items ha-icon {
    --mdc-icon-size: 20px;
  }
`,Y=null;document.addEventListener("click",()=>{Y?.removeAttribute("open"),Y=null});function Pt(n){n.stopPropagation();let t=n.currentTarget.closest(".rowmenu"),e=t.hasAttribute("open");Y?.removeAttribute("open"),Y=null,e||(t.setAttribute("open",""),Y=t)}function Gt(n,t){return l`
    <div class="rowmenu" @click=${e=>e.stopPropagation()}>
      <ha-icon-button @click=${Pt}><ha-icon icon="mdi:dots-vertical"></ha-icon></ha-icon-button>
      <div class="items">
        ${t.map(e=>l`
            <button
              class=${X({danger:!!e.danger})}
              ?disabled=${e.disabled?.(n)??!1}
              @click=${r=>{r.stopPropagation(),Y?.removeAttribute("open"),Y=null,e.onSelect(n)}}
            >
              <ha-icon .icon=${e.icon}></ha-icon>${e.label}
            </button>
          `)}
      </div>
    </div>
  `}function be(n){let t=s=>X({num:!!s.numeric,optional:!!s.optional,icon:s.key==="icon",sortable:!!s.sort}),e=n.groups.reduce((s,a)=>s+a.rows.length,0),r=n.columns.length+(n.menu?1:0);return l`
    <table class="table">
      <thead>
        <tr>
          ${n.columns.map(s=>l`
              <th class=${t(s)} style=${s.width?`width:${s.width}`:h} @click=${s.sort&&n.onSort?()=>n.onSort(s.key):h}>
                ${n.sortKey===s.key?l`<ha-icon icon=${n.sortDesc?"mdi:arrow-down":"mdi:arrow-up"}></ha-icon>`:h}${s.title}
              </th>
            `)}
          ${n.menu?l`<th class="menu"></th>`:h}
        </tr>
      </thead>
      <tbody>
        ${e===0?l`<tr><td class="empty" colspan=${r}>${n.emptyText}</td></tr>`:h}
        ${n.groups.map(s=>{let a=n.collapsed.has(s.key);return l`
            ${s.title?l`
                  <tr class=${X({group:!0,collapsed:a})} @click=${()=>n.onToggleGroup(s.key)}>
                    <td colspan=${r}><ha-icon icon="mdi:chevron-up"></ha-icon>${s.title}</td>
                  </tr>
                `:h}
            ${a?h:s.rows.map(i=>l`
                    <tr class="row" data-key=${n.rowKey(i)} @click=${()=>n.onRowClick?.(i)}>
                      ${n.columns.map(c=>l`<td class=${t(c)}>${c.render(i)}</td>`)}
                      ${n.menu?l`<td class="menu">${Gt(i,n.menu)}</td>`:h}
                    </tr>
                  `)}
          `})}
      </tbody>
    </table>
  `}function ft(n,t,e){if(!t?.sort)return n;let r=t.sort;return[...n].sort((s,a)=>{let i=r(s),c=r(a),d=typeof i=="number"&&typeof c=="number"?i-c:String(i).localeCompare(String(c));return e?-d:d})}var L=class extends b{constructor(){super(...arguments);this._search=""}_count(e){return this.budget?.items.filter(r=>r.category_id===e.id).length??0}async _delete(e){await this._confirm.open(o(this.hass,"categories.delete_confirm",{name:e.name}))&&await $.deleteCategory(this.hass,e.id)}render(){if(!this.budget)return h;let e=this.hass,r=this._search.trim().toLowerCase(),s=this.budget.categories.filter(i=>!r||i.name.toLowerCase().includes(r)),a=[{key:"icon",title:"",render:i=>i.icon?l`<ha-icon .icon=${i.icon}></ha-icon>`:h},{key:"name",title:o(e,"categories.name"),render:i=>i.name},{key:"items",title:o(e,"nav.items"),numeric:!0,render:i=>String(this._count(i))}];return l`
      <div class="toolbar">
        <label class="search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            type="search"
            placeholder=${o(e,"categories.search",{count:this.budget.categories.length})}
            .value=${this._search}
            @input=${i=>this._search=i.target.value}
          />
        </label>
        <span class="spacer"></span>
        <ha-button @click=${()=>this._dialog.open()}>
          <ha-icon slot="start" icon="mdi:plus"></ha-icon>${o(e,"categories.add")}
        </ha-button>
      </div>
      ${be({columns:a,groups:[{key:"all",title:"",rows:s}],rowKey:i=>i.id,onRowClick:i=>this._dialog.open(i),menu:[{label:o(e,"common.edit"),icon:"mdi:pencil",onSelect:i=>this._dialog.open(i)},{label:o(e,"common.delete"),icon:"mdi:delete",danger:!0,disabled:i=>this._count(i)>0,onSelect:i=>this._delete(i)}],collapsed:new Set,onToggleGroup:()=>{},emptyText:o(e,"items.empty")})}
      <pro-budget-category-dialog .hass=${e}></pro-budget-category-dialog>
      <pro-budget-confirm .hass=${e}></pro-budget-confirm>
    `}};L.styles=[A,fe],m([y({attribute:!1})],L.prototype,"hass",2),m([y({attribute:!1})],L.prototype,"budget",2),m([g()],L.prototype,"_search",2),m([Q("pro-budget-category-dialog")],L.prototype,"_dialog",2),m([Q("pro-budget-confirm")],L.prototype,"_confirm",2),L=m([x("pro-budget-categories")],L);var jt={daily:365/12,weekly:52/12,biweekly:26/12,monthly:1,quarterly:1/3,semi_annually:1/6,annually:1/12},Vt={quarterly:3,semi_annually:6,annually:12};function Ke(n,t){return Math.round(n*jt[t])}function Wt(n,t){let e=Vt[n];if(!e)return[];let r=[];for(let s=(t-1)%e;s<12;s+=e)r.push(s+1);return r}function bt(n,t,e){let r=new Date(t,e,0).getDate(),s=`${t}-${String(e).padStart(2,"0")}-01`,a=`${t}-${String(e).padStart(2,"0")}-${String(r).padStart(2,"0")}`;return!(n.start&&n.start>a||n.end&&n.end<s)}function $e(n,t){if(t.recurrence==="daily"||t.due_day===null)return o(n,"common.none");if(t.recurrence==="weekly"||t.recurrence==="biweekly")return _e(n,t.due_day);if(t.due_month===null)return o(n,"due.on_day",{day:t.due_day});if(t.recurrence==="annually")return o(n,"due.on_day_month",{day:t.due_day,month:N(n,t.due_month)});let e=Wt(t.recurrence,t.due_month);return e.length===0?o(n,"due.on_day",{day:t.due_day}):o(n,"due.months",{day:t.due_day,months:e.map(r=>N(n,r,"short")).join(", ")})}var O=class extends b{constructor(){super(...arguments);this.userId="";this._year=new Date().getFullYear()}updated(e){["budget","userId","_year"].some(r=>e.has(r))&&this._load()}get _effectiveUser(){return this.userId||this.hass?.user?.id||this.budget?.users[0]?.id||""}async _load(){!this.hass||!this.budget||!this._effectiveUser||(this._insights=await $.insights(this.hass,this._effectiveUser,this._year))}_item(e){return this.budget?.items.find(r=>r.id===e)}render(){if(!this.budget)return h;let e=this.hass,r=this._insights,s=this.budget.config.currency,a=c=>E(e,c,s),i=this.budget.users.find(c=>c.id===this._effectiveUser);return i?l`
      <div class="toolbar">
        <strong>${i.name}</strong>
        <span class="spacer"></span>
        <select class="select" .value=${String(this._year)} @change=${c=>this._year=Number(c.target.value)}>
          ${[-1,0,1].map(c=>{let d=new Date().getFullYear()+c;return l`<option value=${d} ?selected=${d===this._year}>${d}</option>`})}
        </select>
      </div>
      ${r?l`
            <div class="grid">
              ${[["insights.savings_rate",ee(e,r.savings_rate)],["insights.fixed_cost_rate",ee(e,r.fixed_cost_rate)],["insights.avg_month",a(r.avg_month)],["insights.max_month",r.max_month?N(e,r.max_month):o(e,"common.none")]].map(([c,d])=>l`
                  <ha-card>
                    <div class="stat"><span class="label">${o(e,c)}</span><span class="value">${d}</span></div>
                  </ha-card>
                `)}
            </div>
            <ha-card style="margin-top:16px">
              <h2>${o(e,"insights.payment_calendar",{year:this._year})}</h2>
              <p class="muted small">${o(e,"insights.payment_calendar_hint")}</p>
              ${this._renderMonths(r)}
              ${r.unscheduled.length?l`<p class="muted small">${o(e,"insights.unscheduled")} ${r.unscheduled.map(c=>this._item(c)?.title).join(", ")}</p>`:h}
            </ha-card>
            <div class="grid" style="margin-top:16px">
              ${this._group(o(e,"insights.top_expenses"),{items:r.expenses.items.slice(0,5),total:0},s,!1)}
              ${this._group(o(e,"type.earning.plural"),r.earnings,s)}
              ${this._group(o(e,"type.expense.plural"),r.expenses,s)}
              ${this._group(o(e,"type.saving.plural"),r.savings,s)}
            </div>
          `:l`<ha-card><div class="empty">${o(e,"common.loading")}</div></ha-card>`}
    `:l`<ha-card><div class="empty">${o(e,"insights.no_member")}</div></ha-card>`}_renderMonths(e){let r=Math.max(1,...e.calendar.map(s=>s.total));return l`
      <div class="months">
        ${e.calendar.map(s=>l`
            <div class="month ${s.month===e.max_month?"max":s.month===e.min_month?"min":""}" title=${E(this.hass,s.total,this.budget.config.currency)}>
              <span class="total">${s.total?E(this.hass,s.total,this.budget.config.currency):""}</span>
              <div class="col" style="height:${Math.round(s.total/r*100)}%"></div>
              <span class="name">${N(this.hass,s.month,"short")}</span>
            </div>
          `)}
      </div>
    `}_group(e,r,s,a=!0){let i=this.hass;return l`
      <ha-card>
        <h2>${e}</h2>
        ${r.items.length===0?l`<div class="empty">${o(i,"common.none")}</div>`:l`
              <table class="plain">
                <tbody>
                  ${r.items.map(c=>{let d=this._item(c.item_id);return l`
                      <tr>
                        <td>${d?.title??c.item_id}<br /><span class="muted small">${d?`${o(i,`recurrence.${d.recurrence}`)} \xB7 ${$e(i,d)}`:""}</span></td>
                        <td class="num">${E(i,c.monthly,s)}<span class="muted small"> ${o(i,"common.per_month")}</span></td>
                      </tr>
                    `})}
                  ${a?l`<tr><td><strong>Σ</strong></td><td class="num"><strong>${E(i,r.total,s)}</strong></td></tr>`:h}
                </tbody>
              </table>
            `}
      </ha-card>
    `}};O.styles=[A,w`
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
    `],m([y({attribute:!1})],O.prototype,"hass",2),m([y({attribute:!1})],O.prototype,"budget",2),m([y()],O.prototype,"userId",2),m([g()],O.prototype,"_year",2),m([g()],O.prototype,"_insights",2),O=m([x("pro-budget-insights")],O);var Yt={earning:"mdi:cash-plus",expense:"mdi:cash-minus",saving:"mdi:piggy-bank-outline"},Zt=["category","user","type","none"],S=class extends b{constructor(){super(...arguments);this.narrow=!1;this._search="";this._type="";this._user="";this._grouping="category";this._sortKey="monthly";this._sortDesc=!0;this._collapsed=new Set}_name(e){return this.budget?.users.find(r=>r.id===e)?.name??o(this.hass,"common.unknown_user")}_category(e){return this.budget?.categories.find(r=>r.id===e)}get _columns(){let e=this.hass,r=this.budget,s=new Date,a=i=>i.currency??r.config.currency;return[{key:"icon",title:"",render:i=>l`<ha-icon .icon=${this._category(i.category_id)?.icon??Yt[i.type]}></ha-icon>`},{key:"title",title:o(e,"items.col_title"),width:"40%",sort:i=>i.title.toLowerCase(),render:i=>l`
          ${i.title}
          ${i.shared?l`<span class="pill">${o(e,"overview.shared")}</span>`:h}
          ${i.cost_kind==="variable"?l`<span class="pill">${o(e,"cost_kind.variable")}</span>`:h}
          ${bt(i,s.getFullYear(),s.getMonth()+1)?h:l`<span class="pill">${o(e,"items.inactive")}</span>`}
          <span class="secondary">${o(e,`type.${i.type}`)} · ${o(e,`recurrence.${i.recurrence}`)} · ${$e(e,i)}</span>
        `},{key:"amount",title:o(e,"items.col_amount"),numeric:!0,sort:i=>i.amount,render:i=>E(e,i.amount,a(i))},{key:"monthly",title:o(e,"items.col_monthly"),numeric:!0,sort:i=>Ke(i.amount,i.recurrence),render:i=>l`<span class=${i.type}>${E(e,Ke(i.amount,i.recurrence),a(i))}</span>`},{key:"category",title:o(e,"items.col_category"),optional:!0,sort:i=>this._category(i.category_id)?.name??"",render:i=>this._category(i.category_id)?.name??""},{key:"user",title:o(e,"items.col_user"),optional:!0,sort:i=>this._name(i.user_id),render:i=>this._name(i.user_id)}]}get _groups(){let e=this.budget,r=this._search.trim().toLowerCase(),s=e.items.filter(u=>!this._type||u.type===this._type).filter(u=>!this._user||u.user_id===this._user).filter(u=>!r||u.title.toLowerCase().includes(r)),a=this._columns.find(u=>u.key===this._sortKey),i=ft(s,a,this._sortDesc);if(this._grouping==="none")return[{key:"all",title:"",rows:i}];let c=u=>this._grouping==="category"?u.category_id:this._grouping==="user"?u.user_id:u.type,d=u=>this._grouping==="category"?this._category(u)?.name??u:this._grouping==="user"?this._name(u):o(this.hass,`type.${u}.plural`),p=this._grouping==="category"?e.categories.map(u=>u.id):this._grouping==="user"?e.users.map(u=>u.id):[...de],_=new Map;for(let u of i)_.set(c(u),[..._.get(c(u))??[],u]);return[...p.filter(u=>_.has(u)),...[..._.keys()].filter(u=>!p.includes(u))].map(u=>({key:u,title:d(u),rows:_.get(u)}))}_sort(e){this._sortKey===e?this._sortDesc=!this._sortDesc:(this._sortKey=e,this._sortDesc=e==="amount"||e==="monthly")}_toggleGroup(e){let r=new Set(this._collapsed);r.has(e)?r.delete(e):r.add(e),this._collapsed=r}async _delete(e){await this._confirm.open(o(this.hass,"item.delete_confirm",{title:e.title}))&&await $.deleteItem(this.hass,e.id)}render(){if(!this.budget)return h;let e=this.hass,r=this.budget;return l`
      <div class="toolbar">
        <label class="search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            type="search"
            placeholder=${o(e,"items.search",{count:r.items.length})}
            .value=${this._search}
            @input=${s=>this._search=s.target.value}
          />
        </label>
        <select class="select" @change=${s=>this._type=s.target.value}>
          <option value="">${o(e,"items.filter_type")}: ${o(e,"common.all")}</option>
          ${de.map(s=>l`<option value=${s} ?selected=${s===this._type}>${o(e,`type.${s}.plural`)}</option>`)}
        </select>
        ${r.users.length>1?l`
              <select class="select" @change=${s=>this._user=s.target.value}>
                <option value="">${o(e,"items.filter_user")}: ${o(e,"common.all")}</option>
                ${r.users.map(s=>l`<option value=${s.id} ?selected=${s.id===this._user}>${s.name}</option>`)}
              </select>
            `:h}
        <select class="select" @change=${s=>this._grouping=s.target.value}>
          ${Zt.map(s=>l`<option value=${s} ?selected=${s===this._grouping}>${o(e,"items.group_by")}: ${o(e,`items.group.${s}`)}</option>`)}
        </select>
        <span class="spacer"></span>
        <ha-button @click=${()=>this._dialog.open()}>
          <ha-icon slot="start" icon="mdi:plus"></ha-icon>${this.narrow?h:o(e,"items.add")}
        </ha-button>
      </div>
      ${be({columns:this._columns,groups:this._groups,rowKey:s=>s.id,onRowClick:s=>this._dialog.open(s),menu:[{label:o(e,"common.edit"),icon:"mdi:pencil",onSelect:s=>this._dialog.open(s)},{label:o(e,"common.delete"),icon:"mdi:delete",danger:!0,onSelect:s=>this._delete(s)}],collapsed:this._collapsed,onToggleGroup:s=>this._toggleGroup(s),sortKey:this._sortKey,sortDesc:this._sortDesc,onSort:s=>this._sort(s),emptyText:o(e,"items.empty")})}
      <pro-budget-item-dialog .hass=${e} .budget=${r}></pro-budget-item-dialog>
      <pro-budget-confirm .hass=${e}></pro-budget-confirm>
    `}};S.styles=[A,fe],m([y({attribute:!1})],S.prototype,"hass",2),m([y({attribute:!1})],S.prototype,"budget",2),m([y({type:Boolean})],S.prototype,"narrow",2),m([g()],S.prototype,"_search",2),m([g()],S.prototype,"_type",2),m([g()],S.prototype,"_user",2),m([g()],S.prototype,"_grouping",2),m([g()],S.prototype,"_sortKey",2),m([g()],S.prototype,"_sortDesc",2),m([g()],S.prototype,"_collapsed",2),m([Q("pro-budget-item-dialog")],S.prototype,"_dialog",2),m([Q("pro-budget-confirm")],S.prototype,"_confirm",2),S=m([x("pro-budget-items")],S);var F=class extends b{constructor(){super(...arguments);this.userId="";this._stats=[]}updated(e){(e.has("budget")||e.has("userId"))&&this._load()}async _load(){if(!this.hass||!this.budget)return;let e=new Date;this._stats=await $.stats(this.hass,e.getFullYear(),e.getMonth()+1,this.userId||void 0)}_user(e){return this.budget?.users.find(r=>r.id===e)?.name??o(this.hass,"common.unknown_user")}_category(e){return this.budget?.categories.find(r=>r.id===e)?.name??e}render(){return this.budget?this.budget.items.length===0?l`<div class="cards"><ha-card><div class="empty">${o(this.hass,"overview.empty")}</div></ha-card></div>`:l`
      <div class="cards">
        <p class="muted small" style="margin:0 0 12px">${o(this.hass,"common.monthly_hint")}</p>
        ${this._stats.map((e,r)=>this._renderCurrency(e,r>0))}
      </div>
    `:h}_renderCurrency(e,r){let s=this.hass,a=c=>E(s,c,e.currency),i=[["overview.income",e.totals.income,"earning"],["overview.expenses",e.totals.expenses,"expense"],["overview.savings",e.totals.savings,"saving"],["overview.remaining",e.totals.remaining,e.totals.remaining<0?"expense":""]];return l`
      ${r?l`<p class="muted small">${o(s,"overview.other_currencies")} (${e.currency})</p>`:h}
      <div class="grid">
        ${i.map(([c,d,p])=>l`
            <ha-card>
              <div class="stat">
                <span class="label">${o(s,c)}</span>
                <span class="value ${p}">${a(d)}</span>
              </div>
            </ha-card>
          `)}
      </div>
      <ha-card style="margin-top:16px">
        <h2>${o(s,"overview.members")}</h2>
        <div class="scroll">
          <table class="plain">
            <thead>
              <tr>
                <th>${o(s,"overview.member")}</th>
                <th class="num">${o(s,"overview.income")}</th>
                <th class="num">${o(s,"overview.expenses")}</th>
                <th class="num">${o(s,"overview.shared")}</th>
                <th class="num">${o(s,"overview.fixed")}</th>
                <th class="num">${o(s,"overview.savings")}</th>
                <th class="num">${o(s,"overview.balance")}</th>
              </tr>
            </thead>
            <tbody>
              ${e.members.map(c=>l`
                  <tr>
                    <td>${this._user(c.user_id)}</td>
                    <td class="num earning">${a(c.earnings)}</td>
                    <td class="num expense">${a(c.expenses.total)}</td>
                    <td class="num">${a(c.expenses.shared)}</td>
                    <td class="num">${a(c.expenses.fixed)}</td>
                    <td class="num saving">${a(c.savings)}</td>
                    <td class="num ${c.balance<0?"expense":""}">${a(c.balance)}</td>
                  </tr>
                `)}
            </tbody>
          </table>
        </div>
      </ha-card>
      <div class="grid" style="margin-top:16px">
        <ha-card>
          <h2>${o(s,"overview.fairness")}</h2>
          <p class="muted small">${o(s,"overview.fairness_hint")}</p>
          <table class="plain">
            <thead>
              <tr>
                <th>${o(s,"overview.member")}</th>
                <th class="num">${o(s,"overview.shared_costs_paid")}</th>
                <th class="num">${o(s,"overview.shared_cost_share")}</th>
                <th class="num">${o(s,"overview.income_share")}</th>
              </tr>
            </thead>
            <tbody>
              ${e.fairness.map(c=>l`
                  <tr>
                    <td>${this._user(c.user_id)}</td>
                    <td class="num">${a(c.shared_costs_paid)}</td>
                    <td class="num">${ee(s,c.shared_cost_share)}</td>
                    <td class="num">${ee(s,c.income_share)}</td>
                  </tr>
                `)}
            </tbody>
          </table>
        </ha-card>
        <ha-card>
          <h2>${o(s,"overview.categories")}</h2>
          <table class="plain">
            <thead>
              <tr>
                <th>${o(s,"overview.category")}</th>
                <th class="num">${o(s,"overview.expenses")}</th>
                <th class="num">${o(s,"overview.savings")}</th>
                <th class="num">${o(s,"overview.income")}</th>
              </tr>
            </thead>
            <tbody>
              ${e.categories.map(c=>l`
                  <tr>
                    <td>${this._category(c.category_id)}</td>
                    <td class="num">${c.expenses?a(c.expenses):""}</td>
                    <td class="num">${c.savings?a(c.savings):""}</td>
                    <td class="num">${c.earnings?a(c.earnings):""}</td>
                  </tr>
                `)}
            </tbody>
          </table>
        </ha-card>
      </div>
    `}};F.styles=A,m([y({attribute:!1})],F.prototype,"hass",2),m([y({attribute:!1})],F.prototype,"budget",2),m([y()],F.prototype,"userId",2),m([g()],F.prototype,"_stats",2),F=m([x("pro-budget-overview")],F);var $t=[{id:"overview",icon:"mdi:view-dashboard-outline"},{id:"items",icon:"mdi:format-list-bulleted"},{id:"calendar",icon:"mdi:calendar-month-outline"},{id:"insights",icon:"mdi:chart-box-outline"},{id:"categories",icon:"mdi:shape-outline"}],k=class extends b{constructor(){super(...arguments);this.narrow=!1;this._ready=!1;this._error="";this._userId=""}connectedCallback(){super.connectedCallback(),this._start()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe?.(),this._unsubscribe=void 0}updated(e){e.has("hass")&&this.hass&&!this._unsubscribe&&this._start(),e.has("narrow")&&this.toggleAttribute("narrow",this.narrow)}async _start(){if(!(!this.hass||this._unsubscribe))try{await ct(),this._unsubscribe=await $.subscribe(this.hass,e=>this._budget=e),this._ready=!0}catch(e){this._error=String(e?.message??e)}}get _view(){let e=this.route?.path?.replace(/^\//,"").split("/")[0]??"";return $t.some(r=>r.id===e)?e:"overview"}_navigate(e,r){r.preventDefault(),history.pushState(null,"",`${this.route?.prefix??"/pro-budget"}/${e}`),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}_tabs(){let e=this.route?.prefix??"/pro-budget";return l`
      <nav>
        ${$t.map(r=>l`
            <a
              href="${e}/${r.id}"
              aria-current=${this._view===r.id?"page":h}
              title=${o(this.hass,`nav.${r.id}`)}
              @click=${s=>this._navigate(r.id,s)}
            >
              <ha-icon .icon=${r.icon}></ha-icon
              ><span class="name">${o(this.hass,`nav.${r.id}`)}</span>
              <ha-ripple></ha-ripple>
            </a>
          `)}
      </nav>
    `}render(){let e=this.hass,r=this._budget;return l`
      <header>
        <div class="toolbar-content">
          <ha-menu-button .hass=${e} .narrow=${this.narrow}></ha-menu-button>
          ${this.narrow?l`<div class="main-title">${o(e,"panel.title")}</div>`:this._tabs()}
        </div>
      </header>
      <main>
        ${this._error?l`<ha-alert alert-type="error">${this._error}</ha-alert>`:h}
        ${!this._ready||!r?l`<div class="empty">${o(e,"common.loading")}</div>`:l`
              ${this._view!=="categories"&&this._view!=="items"&&r.users.length>1?this._renderUserFilter(r):h}
              ${this._renderView(r)}
              <div class="version">Pro Budget v${"0.1.0"}</div>
            `}
      </main>
      ${this.narrow?this._tabs():h}
    `}_renderUserFilter(e){let r=this._view!=="insights",s=a=>this._userId===a||!r&&!this._userId&&a===this.hass?.user?.id;return l`
      <div class="members chips">
        ${r?l`<button class=${X({chip:!0})} aria-pressed=${this._userId===""} @click=${()=>this._userId=""}>${o(this.hass,"common.all")}</button>`:h}
        ${e.users.map(a=>l`<button class="chip" aria-pressed=${s(a.id)} @click=${()=>this._userId=a.id}>${a.name}</button>`)}
      </div>
    `}_renderView(e){let r=this.hass;switch(this._view){case"items":return l`<pro-budget-items .hass=${r} .budget=${e} .narrow=${this.narrow}></pro-budget-items>`;case"calendar":return l`<pro-budget-calendar .hass=${r} .budget=${e} .userId=${this._userId}></pro-budget-calendar>`;case"insights":return l`<pro-budget-insights .hass=${r} .budget=${e} .userId=${this._userId}></pro-budget-insights>`;case"categories":return l`<pro-budget-categories .hass=${r} .budget=${e}></pro-budget-categories>`;default:return l`<pro-budget-overview .hass=${r} .budget=${e} .userId=${this._userId}></pro-budget-overview>`}}};k.styles=[A,w`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--primary-background-color);
        color: var(--primary-text-color);
      }
      /* As hass-tabs-subpage: pinned to the viewport, so the bottom bar stays visible. */
      :host([narrow]) {
        position: fixed;
        inset: 0;
        width: 100%;
      }
      header {
        flex: 0 0 auto;
        box-sizing: border-box;
        height: calc(var(--header-height, 56px) + var(--safe-area-inset-top, 0px));
        padding-top: var(--safe-area-inset-top, 0px);
        background-color: var(--sidebar-background-color);
        color: var(--sidebar-text-color);
        font-size: var(--ha-font-size-xl, 20px);
        font-weight: var(--ha-font-weight-normal, 400);
        border-bottom: 1px solid var(--divider-color);
      }
      .toolbar-content {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 8px 12px;
        box-sizing: border-box;
      }
      :host([narrow]) .toolbar-content {
        padding: 4px;
      }
      ha-menu-button {
        color: var(--sidebar-icon-color);
        flex-shrink: 0;
        display: flex;
        margin-right: 24px;
        margin-inline-end: 24px;
        margin-inline-start: initial;
      }
      :host([narrow]) ha-menu-button {
        margin-right: 0;
        margin-inline-end: 0;
      }
      .main-title {
        flex: 1;
        min-width: 0;
        line-height: var(--ha-line-height-normal, 1.5);
        margin-inline-start: var(--main-title-margin, var(--ha-space-2, 8px));
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      /* Sized by the tabs (--header-height), overflowing the toolbar padding as in HA; the
         header's own padding must not clip the underline. */
      nav {
        display: flex;
        flex: 1;
        justify-content: center;
        overflow: hidden;
        font-size: var(--ha-font-size-m, 14px);
      }
      nav a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: var(--ha-space-2, 8px);
        box-sizing: border-box;
        height: var(--header-height, 56px);
        max-width: 45%;
        min-width: 0;
        overflow: hidden;
        padding: 0 32px;
        color: var(--sidebar-text-color);
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
        outline: none;
        position: relative;
      }
      nav a .name {
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
      }
      nav a ha-icon {
        --mdc-icon-size: 24px;
        flex-shrink: 0;
      }
      nav a[aria-current="page"] {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
      }
      /* Hover and press feedback is HA's ripple (secondary text colour at 8 % / 12 %). */
      nav a ha-ripple {
        --ha-ripple-color: var(--secondary-text-color);
      }
      nav a:focus-visible::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: var(--secondary-text-color);
        opacity: 0.08;
      }
      /* Narrow: the tabs become a bottom bar. */
      :host([narrow]) nav {
        flex: 0 0 auto;
        height: auto;
        justify-content: space-around;
        box-sizing: border-box;
        padding: 0 calc(16px + var(--safe-area-inset-right, 0px)) var(--safe-area-inset-bottom, 0px)
          calc(16px + var(--safe-area-inset-left, 0px));
        background-color: var(--sidebar-background-color);
        border-top: 1px solid var(--divider-color);
        font-size: var(--ha-font-size-s, 12px);
        z-index: 2;
      }
      :host([narrow]) nav a {
        flex: 1;
        max-width: none;
        min-width: 0;
        flex-direction: column;
        gap: 0;
        padding: 0 4px;
      }
      :host([narrow]) nav a ha-icon {
        margin-bottom: var(--ha-space-1, 4px);
      }
      :host([narrow]) nav a[aria-current="page"] {
        border-bottom: none;
      }
      main {
        flex: 1;
        overflow: auto;
        min-height: 0;
        position: relative;
      }
      .members {
        display: flex;
        gap: 8px;
        padding: 12px 16px 0;
      }
      .version {
        padding: 24px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 12px;
      }
    `],m([y({attribute:!1})],k.prototype,"hass",2),m([y({type:Boolean})],k.prototype,"narrow",2),m([y({attribute:!1})],k.prototype,"route",2),m([y({attribute:!1})],k.prototype,"panel",2),m([g()],k.prototype,"_budget",2),m([g()],k.prototype,"_ready",2),m([g()],k.prototype,"_error",2),m([g()],k.prototype,"_userId",2),k=m([x("pro-budget-panel")],k);console.info("%c PRO-BUDGET %c v0.1.0 ","color: white; background: #3f51b5; font-weight: 700;","color: #3f51b5; background: white; font-weight: 700;");
