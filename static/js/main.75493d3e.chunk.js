(this.webpackJsonpcarousel=this.webpackJsonpcarousel||[]).push([[0],{12:function(e,n,t){},13:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(5),s=t.n(c),i=t(3),o=t(1),l=t(6),m=t(2),d=t.n(m),u=function(e){var n={zoom:!1,scale:1,distance:0,origin:0},t=r.a.useRef(null),c=(r.a.useRef(null),function(t){var a=-100/e.images.length*t;f(Object(o.a)(Object(o.a)({},g),{},{currentSlide:t,currentTransform:a,prevTransform:a,zoom:Object(o.a)({},n)}))}),s=r.a.useRef(),m=r.a.useState({currentSlide:e.currentSlide,prevTransform:e.initialTransform,currentTransform:e.initialTransform}),u=Object(i.a)(m,2),g=u[0],f=u[1],p=r.a.useState({zoom:!1,scale:1,distance:0,origin:0}),_=Object(i.a)(p,2),b=_[0],v=_[1],h=Object(l.a)({onDragEnd:function(n){return function(n){if(!b.zoom){var t=n<0?1:-1,a=g.currentTransform,r=e.images.length,c=100/r,s=null;return a>0&&(a=0,s=0),a<c-100?(a=c-100,s=r-1):((s=g.currentSlide+t)<0&&(s=0),s>r-1&&(s=r-1),a=-s*(100/r)),f(Object(o.a)(Object(o.a)({},g),{},{currentSlide:s,prevTransform:a,currentTransform:a}))}console.log("zoom")}(n.movement[0])},onDrag:function(n){if(!b.zoom){var t=s.current.clientWidth,a=e.images.length,r=g.prevTransform+100*n.movement[0]/t/a;return f(Object(o.a)(Object(o.a)({},g),{},{currentTransform:r}))}console.log("zoom")},onPinchStart:function(e){v(Object(o.a)(Object(o.a)({},b),{},{zoom:!0}))},onPinch:function(e){var n=e.da[0],a=(s.current.clientHeight,window.innerHeight,t.current.clientHeight,t.clientHeight,n/100);v(Object(o.a)(Object(o.a)({},b),{},{distance:e.da[0],scale:a}))}});return Object(a.useEffect)((function(){b.zoom?document.querySelector(".App").style.overflow="hidden":document.querySelector(".App").style.overflow="unset"}),[b]),Object(a.useEffect)((function(){c(e.currentSlide)}),[e]),r.a.createElement("div",{ref:s,className:"".concat(d.a.container," ").concat(b.zoom?d.a.showOverflow:"")},r.a.createElement("div",Object.assign({},h(),{id:"slideContainer",className:d.a.slideContainer,style:{width:"".concat(100*e.images.length,"%"),transform:"translateX(".concat(g.currentTransform,"%)")}}),e.images.map((function(n,a){return r.a.createElement("div",{className:"".concat(d.a.slide," ").concat(b.zoom?d.a.showOverflow:""),key:"".concat(n,"-").concat(a),style:g.currentSlide===n.index?{width:"".concat(100/e.images.length,"%"),transform:"scale(".concat(b.scale,")")}:{width:"".concat(100/e.images.length,"%")}},r.a.createElement("img",{draggable:!1,ref:g.currentSlide===n.index?t:null,src:n.src,alt:n.src}))}))),r.a.createElement("button",{className:d.a.button_zoom,onClick:function(){var e=b.scale+1;v({zoom:1!==(e=e>3?1:e),scale:e})}},"enlarge"),r.a.createElement("div",{style:{position:"fixed",right:0,bottom:0,background:"white",border:"2px solid",padding:"15px"}},r.a.createElement("p",null,"distance: ",b.distance),r.a.createElement("p",null,"origin: ",b.origin),r.a.createElement("p",null,"scale: ",b.scale),r.a.createElement("p",null,"zoom: ",b.zoom?"true":"false")))},g=(t(12),function(e){var n=r.a.useState({index:0,initialTransform:0}),t=Object(i.a)(n,2),a=t[0],c=t[1],s=r.a.useState([1,2,3,4,5]),o=Object(i.a)(s,2),l=o[0],m=o[1],d={sparkle:[{src:"./images/sparkle-1.png",index:0},{src:"./images/sparkle-2.png",index:1},{src:"./images/sparkle-3.png",index:2},{src:"./images/sparkle-4.png",index:3},{src:"./images/long.jpg",index:4},{src:"./images/tall.png",index:5}],spring:[{src:"./images/spring-1.png",index:0},{src:"./images/spring-2.png",index:1},{src:"./images/spring-3.png",index:2}]},g=Object.keys(d);return r.a.createElement("div",{className:"App"},r.a.createElement(u,{currentSlide:a.index,initialTransform:a.initialTransform,images:l}),r.a.createElement("div",{className:"fams"},g.map((function(e){return r.a.createElement("div",{key:e,className:"famContainer"},r.a.createElement("h3",null,e),r.a.createElement("div",{className:"famImages"},d[e].map((function(n,t,a){return r.a.createElement("div",{key:"".concat(n,"-").concat(t),className:"imgWrapper"},r.a.createElement("img",{key:n.src,src:n.src,alt:n.src,onClick:function(){m(d[e]),c({index:n.index,initialTransform:100/a.length*n.index}),document.getElementById("slideContainer").classList.add("smoothSlide")}}))}))))}))))});s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g,null)),document.getElementById("root"))},2:function(e,n,t){e.exports={disableBodyScroll:"css_disableBodyScroll__1xH86",showOverflow:"css_showOverflow__3ap7Y",container:"css_container__3i3vU",slideContainer:"css_slideContainer__8k5Ho",slide:"css_slide__mS6RN",button_zoom:"css_button_zoom__2VlCI",zoomedIn:"css_zoomedIn__2LEqu",dotList:"css_dotList__h_sCG",dot:"css_dot__3W-KR",dot_active:"css_dot_active__3K7-S"}},7:function(e,n,t){e.exports=t(13)}},[[7,1,2]]]);
//# sourceMappingURL=main.75493d3e.chunk.js.map