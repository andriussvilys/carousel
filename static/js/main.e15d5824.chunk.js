(this.webpackJsonpcarousel=this.webpackJsonpcarousel||[]).push([[0],{12:function(e,n,a){},13:function(e,n,a){"use strict";a.r(n);var t=a(0),r=a.n(t),s=a(5),c=a.n(s),i=a(3),o=a(1),l=a(6),m=a(2),u=a.n(m),d=function(e){var n={zoomedIn:null,zoomIndex:null,zoomPower:1,x:0,y:0,startX:null,startY:null},a=(r.a.useRef(null),r.a.useRef(null),r.a.useRef()),s=r.a.useState({currentSlide:e.currentSlide,prevTransform:e.initialTransform,currentTransform:e.initialTransform}),c=Object(i.a)(s,2),m=c[0],d=c[1],g=Object(l.a)({onDragEnd:function(n){return function(n){var a=n<0?1:-1,t=m.currentTransform,r=e.images.length,s=100/r,c=null;return t>0&&(t=0,c=0),t<s-100?(t=s-100,c=r-1):((c=m.currentSlide+a)<0&&(c=0),c>r-1&&(c=r-1),t=-c*(100/r)),d(Object(o.a)(Object(o.a)({},m),{},{currentSlide:c,prevTransform:t,currentTransform:t}))}(n.movement[0])},onDrag:function(n){console.log(n);var t=a.current.clientWidth,r=e.images.length,s=m.prevTransform+100*n.movement[0]/t/r;return d(Object(o.a)(Object(o.a)({},m),{},{currentTransform:s}))}});return Object(t.useEffect)((function(){!function(a){var t=-100/e.images.length*a;d(Object(o.a)(Object(o.a)({},m),{},{currentSlide:a,currentTransform:t,prevTransform:t,zoom:Object(o.a)({},n)}))}(e.currentSlide)}),[e]),r.a.createElement("div",{ref:a,className:u.a.container},r.a.createElement("div",Object.assign({},g(),{id:"slideContainer",className:u.a.slideContainer,style:{width:"".concat(100*e.images.length,"%"),transform:"translateX(".concat(m.currentTransform,"%)")}}),e.images.map((function(n,a){return r.a.createElement("div",{className:u.a.slide,key:"".concat(n,"-").concat(a),style:{width:"".concat(100/e.images.length,"%")}},r.a.createElement("img",{draggable:!1,src:n.src,alt:n.src}))}))),r.a.createElement("button",{className:u.a.button_zoom,onClick:function(){d(Object(o.a)(Object(o.a)({},m),{},{hi:!m.hi}))}},"enlarge"),function(e){if(e&&!(e.length<0)){var n=e.map((function(e,n){return r.a.createElement("li",{key:"carouselDot-".concat(n)})}));return r.a.createElement("ul",{className:u.a.dotList},n)}}(e.images))},g=(a(12),function(e){var n=r.a.useState({index:0,initialTransform:0}),a=Object(i.a)(n,2),t=a[0],s=a[1],c=r.a.useState([1,2,3,4,5]),o=Object(i.a)(c,2),l=o[0],m=o[1],u={sparkle:[{src:"./images/sparkle-1.png",index:0},{src:"./images/sparkle-2.png",index:1},{src:"./images/sparkle-3.png",index:2},{src:"./images/sparkle-4.png",index:3},{src:"./images/long.jpg",index:4},{src:"./images/tall.png",index:5}],spring:[{src:"./images/spring-1.png",index:0},{src:"./images/spring-2.png",index:1},{src:"./images/spring-3.png",index:2}]},g=Object.keys(u);return r.a.createElement("div",{className:"App"},r.a.createElement(d,{currentSlide:t.index,initialTransform:t.initialTransform,images:l}),r.a.createElement("div",{className:"fams"},g.map((function(e){return r.a.createElement("div",{key:e,className:"famContainer"},r.a.createElement("h3",null,e),r.a.createElement("div",{className:"famImages"},u[e].map((function(n,a,t){return r.a.createElement("div",{key:"".concat(n,"-").concat(a),className:"imgWrapper"},r.a.createElement("img",{key:n.src,src:n.src,alt:n.src,onClick:function(){m(u[e]),s({index:n.index,initialTransform:100/t.length*n.index}),document.getElementById("slideContainer").classList.add("smoothSlide")}}))}))))}))))});c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g,null)),document.getElementById("root"))},2:function(e,n,a){e.exports={disableBodyScroll:"css_disableBodyScroll__1xH86",container:"css_container__3i3vU",slideContainer:"css_slideContainer__8k5Ho",slide:"css_slide__mS6RN",button_zoom:"css_button_zoom__2VlCI",zoomedIn:"css_zoomedIn__2LEqu",dotList:"css_dotList__h_sCG",dot:"css_dot__3W-KR",dot_active:"css_dot_active__3K7-S"}},7:function(e,n,a){e.exports=a(13)}},[[7,1,2]]]);
//# sourceMappingURL=main.e15d5824.chunk.js.map