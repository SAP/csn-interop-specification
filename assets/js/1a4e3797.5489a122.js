"use strict";(self.webpackChunk_sap_csn_interop_specification=self.webpackChunk_sap_csn_interop_specification||[]).push([[2138],{1430:(e,r,t)=>{t.d(r,{W:()=>u});var n=t(6540),a=t(797),s=["zero","one","two","few","many","other"];function c(e){return s.filter((function(r){return e.includes(r)}))}var o={locale:"en",pluralForms:c(["one","other"]),select:function(e){return 1===e?"one":"other"}};function l(){var e=(0,a.A)().i18n.currentLocale;return(0,n.useMemo)((function(){try{return r=e,t=new Intl.PluralRules(r),{locale:r,pluralForms:c(t.resolvedOptions().pluralCategories),select:function(e){return t.select(e)}}}catch(n){return console.error('Failed to use Intl.PluralRules for locale "'+e+'".\nDocusaurus will fallback to the default (English) implementation.\nError: '+n.message+"\n"),o}var r,t}),[e])}function u(){var e=l();return{selectMessage:function(r,t){return function(e,r,t){var n=e.split("|");if(1===n.length)return n[0];n.length>t.pluralForms.length&&console.error("For locale="+t.locale+", a maximum of "+t.pluralForms.length+" plural forms are expected ("+t.pluralForms.join(",")+"), but the message contains "+n.length+": "+e);var a=t.select(r),s=t.pluralForms.indexOf(a);return n[Math.min(s,n.length-1)]}(t,r,e)}}}},1738:(e,r,t)=>{t.r(r),t.d(r,{default:()=>L});var n=t(1003),a=t(675),s=t(467),c=t(6540),o=t(797),l=t(5318),u=t(7143),i=t(6289),h=t(539),p=t(1430),d=t(4164),m=t(6347),f=t(9136),g=t(5351);const x=function(){var e=(0,f.A)(),r=(0,m.W6)(),t=(0,m.zy)(),n=(0,o.A)().siteConfig.baseUrl,a=e?new URLSearchParams(t.search):null,s=(null==a?void 0:a.get("q"))||"",c=(null==a?void 0:a.get("ctx"))||"",l=(null==a?void 0:a.get("version"))||"",u=function(e){var r=new URLSearchParams(t.search);return e?r.set("q",e):r.delete("q"),r};return{searchValue:s,searchContext:c&&Array.isArray(g.Hg)&&g.Hg.some((function(e){return"string"==typeof e?e===c:e.path===c}))?c:"",searchVersion:l,updateSearchPath:function(e){var t=u(e);r.replace({search:t.toString()})},updateSearchContext:function(e){var n=new URLSearchParams(t.search);n.set("ctx",e),r.replace({search:n.toString()})},generateSearchPageLink:function(e){var r=u(e);return n+"search?"+r.toString()}}};var v=t(1007),y=t(3008),A=t(6826),j=t(6068),S=t(6609),w=t(6985),C=t(2142);const _="searchContextInput_mXoe",b="searchQueryInput_CFBF",P="searchResultItem_U687",F="searchResultItemPath_uIbk",R="searchResultItemSummary_oZHr",T="searchQueryColumn_q7nx",k="searchContextColumn_oWAF";var H=t(596),I=t(4848);function N(){var e,r=(0,o.A)(),t=r.siteConfig.baseUrl,n=r.i18n.currentLocale,l=(0,p.W)().selectMessage,i=x(),m=i.searchValue,f=i.searchContext,y=i.searchVersion,A=i.updateSearchPath,j=i.updateSearchContext,S=(0,c.useState)(m),C=S[0],P=S[1],F=(0,c.useState)(),R=F[0],N=F[1],L=""+t+y,U=(0,c.useMemo)((function(){return C?(0,h.T)({id:"theme.SearchPage.existingResultsTitle",message:'Search results for "{query}"',description:"The search page title for non-empty query"},{query:C}):(0,h.T)({id:"theme.SearchPage.emptyResultsTitle",message:"Search the documentation",description:"The search page title for empty query"})}),[C]);(0,c.useEffect)((function(){A(C),C?(0,s.A)((0,a.A)().mark((function e(){var r;return(0,a.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,v.w)(L,f,C,100);case 2:r=e.sent,N(r);case 4:case"end":return e.stop()}}),e)})))():N(void 0)}),[C,L,f]);var M=(0,c.useCallback)((function(e){P(e.target.value)}),[]);(0,c.useEffect)((function(){m&&m!==C&&P(m)}),[m]);var E=(0,c.useState)(!1),z=E[0],V=E[1];return(0,c.useEffect)((function(){function e(){return(e=(0,s.A)((0,a.A)().mark((function e(){return(0,a.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Array.isArray(g.Hg)&&!f&&!g.dz){e.next=3;break}return e.next=3,(0,v.k)(L,f);case 3:V(!0);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[f,L]),(0,I.jsxs)(c.Fragment,{children:[(0,I.jsxs)(u.A,{children:[(0,I.jsx)("meta",{property:"robots",content:"noindex, follow"}),(0,I.jsx)("title",{children:U})]}),(0,I.jsxs)("div",{className:"container margin-vert--lg",children:[(0,I.jsx)("h1",{children:U}),(0,I.jsxs)("div",{className:"row",children:[(0,I.jsx)("div",{className:(0,d.A)("col",(e={},e[T]=Array.isArray(g.Hg),e["col--9"]=Array.isArray(g.Hg),e["col--12"]=!Array.isArray(g.Hg),e)),children:(0,I.jsx)("input",{type:"search",name:"q",className:b,"aria-label":"Search",onChange:M,value:C,autoComplete:"off",autoFocus:!0})}),Array.isArray(g.Hg)?(0,I.jsx)("div",{className:(0,d.A)("col","col--3","padding-left--none",k),children:(0,I.jsxs)("select",{name:"search-context",className:_,id:"context-selector",value:f,onChange:function(e){return j(e.target.value)},children:[g.dz&&(0,I.jsx)("option",{value:"",children:(0,h.T)({id:"theme.SearchPage.searchContext.everywhere",message:"Everywhere"})}),g.Hg.map((function(e){var r=(0,H.p)(e,n),t=r.label,a=r.path;return(0,I.jsx)("option",{value:a,children:t},a)}))]})}):null]}),!z&&C&&(0,I.jsx)("div",{children:(0,I.jsx)(w.A,{})}),R&&(R.length>0?(0,I.jsx)("p",{children:l(R.length,(0,h.T)({id:"theme.SearchPage.documentsFound.plurals",message:"1 document found|{count} documents found",description:'Pluralized label for "{count} documents found". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)'},{count:R.length}))}):(0,I.jsx)("p",{children:(0,h.T)({id:"theme.SearchPage.noResultsText",message:"No documents were found",description:"The paragraph for empty search result"})})),(0,I.jsx)("section",{children:R&&R.map((function(e){return(0,I.jsx)(q,{searchResult:e},e.document.i)}))})]})]})}function q(e){var r=e.searchResult,t=r.document,a=r.type,s=r.page,c=r.tokens,o=r.metadata,l=a===y.i.Title,u=a===y.i.Keywords,h=a===y.i.Description,p=h||u,d=l||p,m=a===y.i.Content,f=(l?t.b:s.b).slice(),x=m||p?t.s:t.t;d||f.push(s.t);var v="";if(g.CU&&c.length>0){for(var w,_=new URLSearchParams,b=(0,n.A)(c);!(w=b()).done;){var T=w.value;_.append("_highlight",T)}v="?"+_.toString()}return(0,I.jsxs)("article",{className:P,children:[(0,I.jsx)("h2",{children:(0,I.jsx)(i.A,{to:t.u+v+(t.h||""),dangerouslySetInnerHTML:{__html:m||p?(0,A.Z)(x,c):(0,j.C)(x,(0,S.g)(o,"t"),c,100)}})}),f.length>0&&(0,I.jsx)("p",{className:F,children:(0,C.$)(f)}),(m||h)&&(0,I.jsx)("p",{className:R,dangerouslySetInnerHTML:{__html:(0,j.C)(t.t,(0,S.g)(o,"t"),c,100)}})]})}const L=function(){return(0,I.jsx)(l.A,{children:(0,I.jsx)(N,{})})}}}]);