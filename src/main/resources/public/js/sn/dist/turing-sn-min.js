var turingSNApp=angular.module("turingSNApp","ngCookies ngResource ngAnimate ngSanitize ui.router ui.bootstrap pascalprecht.translate angularMoment".split(" "));
turingSNApp.config(["$stateProvider","$urlRouterProvider","$locationProvider","$translateProvider",function(a,b,e,c){c.useSanitizeValueStrategy("escaped");e.html5Mode(!0);c.translations("en",{REMOVE:"Remove",FIRST:"First",LAST:"Last",PREVIOUS:"Previous",NEXT:"Next",SEARCH:"Search",SEARCH_FOR:"Search for",NO_RESULTS_FOUND:"No results found",APPLIED_FILTERS:"Applied Filters",SHOWING:"Showing",OF:"of",RESULTS:"results",ORDER_BY:"Order by",RELEVANCE:"Relevance",NEWEST:"Newest",OLDEST:"Oldest",SUBJECTS_FOUND:"Subjects found"});
c.translations("pt",{REMOVE:"Remover",FIRST:"Primeiro",LAST:"\u00daltimo",PREVIOUS:"Anterior",NEXT:"Pr\u00f3ximo",SEARCH:"Pesquisar",SEARCH_FOR:"Pesquisar por",NO_RESULTS_FOUND:"Nenhum resultado encontrado",APPLIED_FILTERS:"Filtros Aplicados",SHOWING:"Exibindo",OF:"de",RESULTS:"resultados",ORDER_BY:"Ordenar por",RELEVANCE:"Relev\u00e2ncia",NEWEST:"Mais recente",OLDEST:"Mais antigo",SUBJECTS_FOUND:"Assuntos Encontrados"});c.fallbackLanguage("en")}]);
turingSNApp.service("turAPIServerService",["$http","$location","$cookies",function(a,b,e){a=b.protocol();var c=b.host();b=b.port();var f=a+"://"+c+":"+b+"/api";this.get=function(){if(null!=e.get("turAPIServer"))return e.get("turAPIServer");e.put("turAPIServer",f);return f}}]);
turingSNApp.factory("vigLocale",["$window",function(a){return{getLocale:function(){var b=a.navigator;return angular.isArray(b.languages)&&0<b.languages.length?b.languages[0].split("-").join("_"):(b.language||b.browserLanguage||b.systemLanguage||b.userLanguage||"").split("-").join("_")}}}]);
turingSNApp.controller("TurSNMainCtrl",["$scope","$http","$window","$state","$rootScope","$translate","$location","turSNSearch","amMoment","vigLocale","$location","$anchorScroll","$sce",function(a,b,e,c,f,h,d,g,k,l,d,m,n){a.vigLanguage=l.getLocale().substring(0,2);h.use(a.vigLanguage);k.changeLocale("en");a.pageCount=0;a.pageStart=0;a.pageEnd=0;a.defaultTitleField="title";a.defaultDescriptionField="abstract";a.defaultTextField="text";a.defaultImageField="image";a.defaultDateField="published_date";
a.defaultUrlField="url";b=d.path().trim();b.endsWith("/")&&(b=b.substring(0,b.length-1));b=b.split("/");a.turSiteName=b[b.length-1];a.updateParameters=function(){a.turQueryString=d.url();a.turQuery=d.search().q;a.turPage=d.search().p;a.turLocale=d.search()._setlocale;a.turSort=d.search().sort;a.turFilterQuery=d.search()["fq[]"];if(null==a.turQuery||0==a.turQuery.trim().length)a.turQuery="*";if(null==a.turPage||0==a.turPage.trim().length)a.turPage="1";if(null==a.turSort||0==a.turSort.trim().length)a.turSort=
"relevance"};a.init=function(){a.updateParameters();a.initParams(a.turQuery,a.turPage,a.turLocale,a.turSort,a.turFilterQuery)};a.initParams=function(b,d,c,e,f){g.search(a.turSiteName,b,d,c,e,f).then(function(b){a.pageCount=b.data.queryContext.count;a.pageStart=b.data.queryContext.pageStart;a.pageEnd=b.data.queryContext.pageEnd;a.results=b.data.results.document;a.pages=b.data.pagination;a.facets=b.data.widget.facet;a.facetsToRemove=b.data.widget.facetToRemove;a.defaultTitleField=b.data.queryContext.defaultFields.title;
a.defaultDescriptionField=b.data.queryContext.defaultFields.description;a.defaultTextField=b.data.queryContext.defaultFields.text;a.defaultImageField=b.data.queryContext.defaultFields.image;a.defaultDateField=b.data.queryContext.defaultFields.date;a.defaultUrlField=b.data.queryContext.defaultFields.url},function(a){})};a.initURL=function(b,d,c,e,f){g.searchURL(b,d,c,e,f).then(function(b){a.pageCount=b.data.queryContext.count;a.pageStart=b.data.queryContext.pageStart;a.pageEnd=b.data.queryContext.pageEnd;
a.results=b.data.results.document;a.pages=b.data.pagination;a.facets=b.data.widget.facet;a.facetsToRemove=b.data.widget.facetToRemove},function(a){})};a.init();f.$state=c;a.turRedirect=function(b){d.hash("turHeader");d.url(a.replaceUrlSearch(b));a.updateParameters();m();a.initURL(b)};a.replaceUrlSearch=function(b){urlFormatted=b.replace("/api/sn/"+a.turSiteName+"/search","/sn/"+a.turSiteName);d.url(urlFormatted);return urlFormatted};a.turChangeSort=function(b){a.updateParameters();b=a.changeQueryStringParameter(a.turQueryString,
"sort",b);b=a.changeQueryStringParameter(b,"p",a.turPage);b=a.changeQueryStringParameter(b,"q",a.turQuery);var c=b.replace("/sn/"+a.turSiteName,"/api/sn/"+a.turSiteName+"/search");d.url(b);a.updateParameters();a.initURL(c)};a.changeQueryStringParameter=function(a,b,c){return a.replace(new RegExp("([?\x26]"+b+"(?\x3d[\x3d\x26#]|$)[^#\x26]*|(?\x3d#|$))"),"\x26"+b+"\x3d"+encodeURIComponent(c)).replace(/^([^?&]+)&/,"$1?")}}]);
turingSNApp.factory("turSNSearch",["$http","turAPIServerService",function(a,b){return{search:function(e,c,f,h,d,g){c={params:{q:c,p:f,_setlocale:h,sort:d,"fq[]":g},headers:{Accept:"application/json"}};return a.get(b.get().concat("/sn/"+e+"/search"),c)},searchURL:function(e){urlFormatted=e.replace("/api/","/");return a.get(b.get().concat(urlFormatted),{headers:{Accept:"application/json"}})}}}]);