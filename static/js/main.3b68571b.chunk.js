(this.webpackJsonpcarousel=this.webpackJsonpcarousel||[]).push([[0],[,,function(e,o,t){e.exports={disableBodyScroll:"css_disableBodyScroll__1xH86",container:"css_container__3i3vU",slideContainer:"css_slideContainer__8k5Ho",slide:"css_slide__mS6RN",button_zoom:"css_button_zoom__2VlCI",zoomedIn:"css_zoomedIn__2LEqu",dotList:"css_dotList__h_sCG",dot:"css_dot__3W-KR",dot_active:"css_dot_active__3K7-S",zoomOut:"css_zoomOut__Rt9JG"}},,,,function(e,o,t){e.exports=t(12)},,,,,function(e,o,t){},function(e,o,t){"use strict";t.r(o);var n=t(1),c=t.n(n),a=t(5),r=t.n(a),s=t(3),i=t(0),l=t(2),m=t.n(l),u=function(e){var o={zoomedIn:null,zoomIndex:null,zoomPower:1,x:0,y:0,startX:null,startY:null},t=c.a.useState({isDown:null,startX:null,cursorMove:0,transform:0,prevTransform:e.initialTransform,currentSlide:e.index,zoom:Object(i.a)({},o)}),a=Object(s.a)(t,2),r=a[0],l=a[1],u=c.a.useRef(null),d=c.a.useRef(null),f=function(){console.log("ZOOM IN");var e=null,o=function(){var o=r.zoom.zoomPower+1;return e=!0,o>3&&(o=1,e=!1),{zoomPower:o,zoomedIn:e}}();return l(Object(i.a)(Object(i.a)({},r),{},{isDown:!1,zoom:Object(i.a)(Object(i.a)({},r.zoom),{},{zoomedIn:o.zoomedIn,zoomPower:o.zoomPower,zoomIndex:r.currentSlide,y:0,x:0})}))},g=function(e){e.preventDefault();var o=document.querySelector(".".concat(m.a.container));document.querySelector(".".concat(m.a.slideContainer)).classList.remove("smoothSlide");var t=e.touches?e.touches[0].pageX:e.pageX;l(Object(i.a)(Object(i.a)({},r),{},{isDown:!0,startX:t-o.offsetLeft}))},z=function(e){if(e.touches&&e.touches.length>1){console.log(e.touches);var o=Math.hypot(e.touches[0].pageX-e.touches[1].pageX,e.touches[0].pageY-e.touches[1].pageY);return alert(o),l(Object(i.a)(Object(i.a)({},r),{},{zoom:Object(i.a)(Object(i.a)({},r.zoom),{},{zoomPower:{zoomedIn:!0,zoomPower:o}})}))}if(r.zoom.zoomedIn){console.log("mouse move zoom in"),e.preventDefault(),window.innerWidth<720&&document.querySelector("body").classList.add(m.a.disableBodyScroll);var t=d.current,n=u.current,c=document.querySelector(".".concat(m.a.container)),a={y:c.getBoundingClientRect().y,x:c.getBoundingClientRect().x,top:c.getBoundingClientRect().top},s=100*n.clientHeight/t.clientHeight,f=100*n.clientWidth/t.clientWidth,g=(100-s/r.zoom.zoomPower)/2+20,z=t.clientHeight/2,p=(((e.touches?e.touches[0].clientY-a.y:e.clientY-a.y)-z)*g/z).toFixed(2),v=(100-f/r.zoom.zoomPower)/2+20,b=t.clientWidth/2,h=(((e.touches?e.touches[0].clientX-a.x:e.clientX-a.x)-b)*v/b).toFixed(2);return l(Object(i.a)(Object(i.a)({},r),{},{zoom:Object(i.a)(Object(i.a)({},r.zoom),{},{y:p,x:h})}))}if(r.isDown){console.log("mouse move"),e.preventDefault();var O=document.querySelector(".".concat(m.a.slideContainer)),y=document.querySelector(".".concat(m.a.container)),j=e.touches?e.touches[0].pageX-y.offsetLeft:e.pageX-y.offsetLeft,_=r.startX-j,S=100*_/O.clientWidth+r.prevTransform;l(Object(i.a)(Object(i.a)({},r),{},{cursorMove:_,transform:S}))}},p=function(o){if(document.querySelector(".".concat(m.a.slideContainer)).classList.add("smoothSlide"),o.touches)console.log("touches");else{if(r.zoom.zoomedIn)return console.log("cursorPosition.zoom.zoomedIn"),f(),void document.querySelector("body").classList.remove(m.a.disableBodyScroll);if(r.isDown){if(Math.abs(r.cursorMove)<10)return console.log("cursorPosition.cursorMove < 10"),void f();var t;t=r.cursorMove>0?1:-1,console.log({cursorMove:r.cursorMove,direction:t});var n=r.transform,c=null,a=e.images.length,s=100/a;n>0&&(n=0,c=0),n<s-100?(n=s-100,c=a-1):((c=r.currentSlide+t)<0&&(c=0),c>a-1&&(c=a-1),n=c*(100/a)),l(Object(i.a)(Object(i.a)({},r),{},{isDown:!1,cursorMove:0,transform:n,prevTransform:n,currentSlide:c}))}else console.log("!cursorPosition.isDown")}};return Object(n.useEffect)((function(){l(Object(i.a)(Object(i.a)({},r),{},{direction:null,transform:e.initialTransform,prevTransform:e.initialTransform,currentSlide:e.currentSlide,zoom:Object(i.a)({},o)}))}),[e]),c.a.createElement("div",{className:m.a.container},c.a.createElement("div",{id:"slideContainer",className:m.a.slideContainer,style:{width:"".concat(100*e.images.length,"%"),transform:"translateX(".concat(-r.transform,"%)")},onMouseDown:function(e){g(e),console.log(e.type)},onTouchStart:function(e){g(e),console.log(e.type)},onMouseMove:function(e){z(e),console.log(e.type)},onTouchMove:function(e){z(e),console.log(e.type)},onMouseUp:function(e){p(e),console.log(e.type)},onMouseOut:function(e){p(e),console.log(e.type),r.zoom.zoomedIn&&(u.current.classList.add("smoothSlide"),setTimeout((function(){u.current.classList.remove("smoothSlide")}),100),l(Object(i.a)(Object(i.a)({},r),{},{zoom:Object(i.a)({},o)})))},onTouchEnd:function(e){p(e)}},e.images.map((function(o,t){return c.a.createElement("div",{className:m.a.slide,ref:r.currentSlide===o.index?d:null,key:"".concat(o,"-").concat(t),style:{width:"".concat(100/e.images.length,"%")}},c.a.createElement("img",{ref:r.currentSlide===o.index?u:null,style:r.zoom.zoomedIn?{transform:"scale(".concat(r.zoom.zoomPower,") \n                        translate(").concat(r.zoom.x,"%, \n                        ").concat(r.zoom.y,"%)")}:{},src:o.src,alt:o.src}))}))),c.a.createElement("button",{className:m.a.button_zoom,onClick:function(){var e=null,o=function(){var o=r.zoom.zoomPower+1;return e=!0,o>3&&(o=1,e=!1),{zoomPower:o,zoomedIn:e}}();l(Object(i.a)(Object(i.a)({},r),{},{zoom:Object(i.a)(Object(i.a)({},r.zoom),{},{zoomedIn:o.zoomedIn,zoomPower:o.zoomPower,zoomIndex:r.currentSlide,y:0,x:0})}))}},"enlarge"),function(t){if(t&&!(t.length<0)){var n=t.map((function(t,n){return c.a.createElement("li",{onClick:function(){!function(t){var n=100/e.images.length*t;l(Object(i.a)(Object(i.a)({},r),{},{currentSlide:t,transform:n,prevTransform:n,zoom:Object(i.a)({},o)}))}(n)},key:"carouselDot-".concat(n),className:"".concat(m.a.dot," ").concat(n===r.currentSlide?m.a.dot_active:"")})}));return c.a.createElement("ul",{className:m.a.dotList},n)}}(e.images))},d=(t(11),function(e){var o=c.a.useState({index:null,initialTransform:null}),t=Object(s.a)(o,2),n=t[0],a=t[1],r=c.a.useState([1,2,3,4,5]),i=Object(s.a)(r,2),l=i[0],m=i[1],d={sparkle:[{src:"./images/sparkle-1.png",index:0},{src:"./images/sparkle-2.png",index:1},{src:"./images/sparkle-3.png",index:2},{src:"./images/sparkle-4.png",index:3},{src:"./images/long.jpg",index:4},{src:"./images/tall.png",index:5}],spring:[{src:"./images/spring-1.png",index:0},{src:"./images/spring-2.png",index:1},{src:"./images/spring-3.png",index:2}]},f=Object.keys(d);return c.a.createElement("div",{className:"App"},c.a.createElement(u,{currentSlide:n.index,initialTransform:n.initialTransform,images:l}),c.a.createElement("div",{className:"fams"},f.map((function(e){return c.a.createElement("div",{key:e,className:"famContainer"},c.a.createElement("h3",null,e),c.a.createElement("div",{className:"famImages"},d[e].map((function(o,t,n){return c.a.createElement("div",{key:"".concat(o,"-").concat(t),className:"imgWrapper"},c.a.createElement("img",{key:o.src,src:o.src,alt:o.src,onClick:function(){m(d[e]),a({index:o.index,initialTransform:100/n.length*o.index}),document.getElementById("slideContainer").classList.add("smoothSlide")}}))}))))}))))});r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(d,null)),document.getElementById("root"))}],[[6,1,2]]]);
//# sourceMappingURL=main.3b68571b.chunk.js.map