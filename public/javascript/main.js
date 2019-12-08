!function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}__webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{enumerable:!0,get:getter})},__webpack_require__.r=function(exports){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.t=function(value,mode){if(1&mode&&(value=__webpack_require__(value)),8&mode)return value;if(4&mode&&"object"==typeof value&&value&&value.__esModule)return value;var ns=Object.create(null);if(__webpack_require__.r(ns),Object.defineProperty(ns,"default",{enumerable:!0,value}),2&mode&&"string"!=typeof value)for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module.default}:function getModuleExports(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="javascript",__webpack_require__(__webpack_require__.s=3)}([function(module,exports){module.exports=function operator(name,op){return function generator(dims,opts){dims=0|+dims;var scalars=!("scalars"in(opts=opts||{}))||opts.scalars,vectors=!("vectors"in opts)||opts.vectors,both=scalars&&vectors,body=[];if(!scalars&&!vectors)throw new Error("Your function must accept either scalars or vectors");if(body.push("return function "+name+dims+"(vec) {"),body.push("var i = arguments.length"),body.push("while (--i) {"),both&&body.push("if (Array.isArray(arguments[i])) {"),vectors)for(var i=0;i<dims;i+=1)body.push("vec["+i+"] "+op+"= arguments[i]["+i+"]");if(both&&body.push("} else {"),scalars)for(i=0;i<dims;i+=1)body.push("vec["+i+"] "+op+"= arguments[i]");return both&&body.push("}"),body.push("}"),body.push("return vec"),body.push("}"),Function(body.join("\n"))()}}},function(module,exports){var uuidCounter=1,VELOCITY_SCALAR=1,VELOCITY_X_SCALAR=.1,VELOCITY_Y_SCALAR=3,VELOCITY_Z_SCALAR=.1,VELOCITY_AXIS_MIN=5e-4,VELOCITY_AXIS_MAX=.5,SNOW_FLAKE_START_X=1,SNOW_FLAKE_START_Y=30/window.innerHeight;function random(scalar){return(2*Math.random()-1)*(scalar||1)}function positive(value){return value<0?-1*value:value}function velocityBounds(velocityAxis){return velocityAxis<0&&velocityAxis>-VELOCITY_AXIS_MIN?-VELOCITY_AXIS_MIN:velocityAxis>0&&velocityAxis<VELOCITY_AXIS_MIN?VELOCITY_AXIS_MIN:velocityAxis<0&&velocityAxis<-VELOCITY_AXIS_MAX?-VELOCITY_AXIS_MAX:velocityAxis>0&&velocityAxis>VELOCITY_AXIS_MAX?VELOCITY_AXIS_MAX:velocityAxis}module.exports={SNOW_FLAKE_SIZE:30,SNOW_FLAKE_START_X,SNOW_FLAKE_START_Y,genID:function genID(prefix){return[prefix||"uuid",uuidCounter++].join("-")},createElement:function createElement(root,attributes){for(var element=document.createElement("div"),attributeNames=Object.keys(attributes||{}),i=0,il=attributeNames.length;i<il;i++){var attributeName=attributeNames[i],attributeValue=attributes[attributeName];element.setAttribute(attributeName,attributeValue)}return root.appendChild(element),element},removeElement:function removeElement(element){element.parentNode.removeChild(element)},random,positive,randomFlakePosition:function randomFlakePosition(resetY){return[Math.random()*(3*SNOW_FLAKE_START_X)-1.5*SNOW_FLAKE_START_X,resetY?-SNOW_FLAKE_START_Y:Math.random(),random()]},randomFlakeVelocity:function randomFlakeVelocity(){return[velocityBounds(random(VELOCITY_SCALAR)*VELOCITY_X_SCALAR),velocityBounds(positive(random(VELOCITY_SCALAR))*VELOCITY_Y_SCALAR),.5*velocityBounds(random(VELOCITY_SCALAR)*VELOCITY_Z_SCALAR)]},randomFlakeRotation:function randomFlakeRotation(){return[random(),random(),random()]},randomFlakeRotationVelocity:function randomFlakeRotationVelocity(){return[random(4*VELOCITY_SCALAR),random(4*VELOCITY_SCALAR),random(4*VELOCITY_SCALAR)]}}},function(module,exports,__webpack_require__){var vAdd=__webpack_require__(6)(3),vSub=__webpack_require__(7)(3),vDiv=__webpack_require__(8)(3),vMul=__webpack_require__(9)(3),vDist=__webpack_require__(10)(3),vCross=__webpack_require__(11)(3),vMag=__webpack_require__(12)(3),vDot=__webpack_require__(13)(3),vAngle=__webpack_require__(14)(2),vLerp=__webpack_require__(15)(3),vLimit=__webpack_require__(16)(3),vNormalize=__webpack_require__(17)(3),utils=__webpack_require__(1);class Vector{constructor(_axes){Object.defineProperties(this,{_axes:{writable:!0,enumerable:!1,configurable:!0,value:this._coerceVectorData(_axes,!1)},x:{enumerable:!1,configurable:!0,get:()=>this._axes[0],set:value=>this._axes[0]=value},y:{enumerable:!1,configurable:!0,get:()=>this._axes[1],set:value=>this._axes[1]=value},z:{enumerable:!1,configurable:!0,get:()=>this._axes[2],set:value=>this._axes[2]=value}})}_coerceVectorData(_axes,allowScalar){if(!1!==allowScalar&&"number"==typeof _axes)return _axes;var axes=_axes;if(axes instanceof Vector)axes=axes.getAxes();else if(!(axes instanceof Array)||3!==axes.length)throw new TypeError("Vector: Initializer must be another Vector object, or an array of three numbers");return axes}getAxes(){return this._axes}add(axes){return vAdd(this._axes,this._coerceVectorData(axes)),this}sub(axes){return vSub(this._axes,this._coerceVectorData(axes)),this}div(axes){return vDiv(this._axes,this._coerceVectorData(axes)),this}mul(axes){return vMul(this._axes,this._coerceVectorData(axes)),this}cross(axes){return vCross(this._axes,this._coerceVectorData(axes,!1))}dist(axes){return vDist(this._axes,this._coerceVectorData(axes,!1))}dist2(_axes){var axes1=this._axes,axes2=this._coerceVectorData(_axes,!1);return axes1[0]*axes2[0]+axes1[1]*axes2[1]+axes1[2]*axes2[2]}mag(){return vMag(this._axes)}mag2(){var axes=this._axes;return axes[0]*axes[0]+axes[1]*axes[1]+axes[2]*axes[2]}dot(){return vDot(this._axes,this._coerceVectorData(axes,!1))}angle(axes){return vAngle(this._axes,this._coerceVectorData(axes,!1))}lerp(start,finish,scalar){return vLerp(this._axes,this._coerceVectorData(start,!1),this._coerceVectorData(finish,!1),scalar),this}limit(scalar){return vLimit(this._axes,scalar),this}normalize(scalar){return vNormalize(this._axes,scalar||1),this}set(axes){return this._axes=this._coerceVectorData(axes,!1),this}clone(){return new Vector(this)}}Vector.random=function random(_scalar,helper){var scalar=_scalar||1;scalar instanceof Array||(scalar=[scalar,scalar,scalar]);var vector=new Vector([utils.random(scalar[0]),utils.random(scalar[1]),utils.random(scalar[2])]);return"function"==typeof helper&&(vector=helper(vector)),vector},module.exports=Vector},function(module,exports,__webpack_require__){var App=__webpack_require__(4);window.app=new App({flakeCount:300})},function(module,exports,__webpack_require__){var SnowStorm=__webpack_require__(5);module.exports=class App{constructor(_opts){var opts=Object.assign({rootElementID:"root",flakeCount:100},_opts||{}),rootElement=document.getElementById(opts.rootElementID);Object.defineProperties(this,{_options:{writable:!1,enumerable:!1,configurable:!1,value:opts},_rootElement:{writable:!0,enumerable:!1,configurable:!0,value:rootElement},_lastRenderTime:{writable:!0,enumerable:!1,configurable:!0,value:null},_renderFunc:{writable:!1,enumerable:!1,configurable:!1,value:this.render.bind(this)}}),Object.defineProperties(this,{_storm:{writable:!0,enumerable:!1,configurable:!0,value:new SnowStorm(this.getRootElement(),this.getFlakeCount())}}),window.requestAnimationFrame(this._renderFunc)}getRootElement(){return this._rootElement}getFlakeCount(){return this._options.flakeCount}render(time){var deltaMS=this._lastRenderTime?time-this._lastRenderTime:1;this._lastRenderTime=time,window.pauseAnimations||this._storm.update(deltaMS/1e3),window.requestAnimationFrame(this._renderFunc)}}},function(module,exports,__webpack_require__){var Vector=__webpack_require__(2),SnowFlake=__webpack_require__(18),utils=__webpack_require__(1),DEFAULT_FLAKE_COUNT=100,WIND_SCALAR=.05,WIND_ROTATION_SCALAR=5e-4,WIND_LIMIT=.005;function randomWindRotation(){return[utils.random(WIND_ROTATION_SCALAR),Math.random()*WIND_ROTATION_SCALAR*.5,.25*utils.random(WIND_ROTATION_SCALAR)]}class SnowStorm{constructor(parentElement,_flakeCount){var flakeCount=_flakeCount,velocityScalar=1;_flakeCount instanceof SnowStorm&&(flakeCount=(snowStorm=_flakeCount).getFlakeCount(),velocityScalar=snowStorm.getVelocityScalar());Object.defineProperties(this,{id:{writable:!1,enumerable:!1,configurable:!1,value:utils.genID("storm")},_parentElement:{writable:!1,enumerable:!1,configurable:!1,value:parentElement},_flakeLookupTable:{writable:!0,enumerable:!1,configurable:!0,value:{}},_flakeCount:{writable:!0,enumerable:!1,configurable:!0,value:flakeCount||DEFAULT_FLAKE_COUNT},_velocityScalar:{writable:!0,enumerable:!1,configurable:!0,value:velocityScalar},_wind:{writable:!0,enumerable:!1,configurable:!0,value:new Vector([utils.random(WIND_SCALAR),utils.random(WIND_SCALAR),utils.random(WIND_SCALAR)])},_windRotation:{writable:!0,enumerable:!1,configurable:!0,value:new Vector(randomWindRotation())}});var flakes,snowStorm,element=utils.createElement(parentElement,{id:this.id,class:"snowstorm"});_flakeCount instanceof SnowStorm?flakes=(snowStorm=_flakeCount).getFlakes().slice().map(flake=>flake.clone(element)):flakes=this.generateFlakes(flakeCount||DEFAULT_FLAKE_COUNT,element);Object.defineProperties(this,{_element:{writable:!1,enumerable:!1,configurable:!1,value:element},_flakes:{writable:!0,enumerable:!1,configurable:!0,value:flakes}})}destroy(){utils.removeElement(this.getElement())}getElement(){return this._element}getParentElement(){return this.getElement().parentNode}getFlakeCount(){return this._flakeCount}getFlakes(){return this._flakes}getVelocityScalar(){return this._velocityScalar}generateFlakes(count,_parentElement){for(var flakes=new Array(count),lookupTable={},parentElement=_parentElement||this.getElement(),i=0;i<count;i++){var flake=flakes[i]=new SnowFlake({parentElement});lookupTable[flake.id]=flake}return this._flakeLookupTable=lookupTable,flakes}getFlakeByID(id){return this._flakeLookupTable[id]}clone(){return new SnowStorm(this.getParentElement(),this)}update(deltaMS){function snowFlakeEnvironmentUpdate(snowflake){snowflake.position.add(self._wind)}var self=this,flakes=this._flakes;this._wind.add([this._windRotation.x*deltaMS,this._windRotation.y*deltaMS,this._windRotation.y*deltaMS]),this._wind.mag()>WIND_LIMIT&&(this._wind.normalize(),this._wind.mul(WIND_LIMIT)),this._wind.y<0&&(this._wind.y=0),Math.random()<.25&&this._windRotation.set(randomWindRotation());for(var i=0,il=flakes.length;i<il;i++){flakes[i].update(deltaMS,.01*Math.random()-.005+1,snowFlakeEnvironmentUpdate)}}}module.exports=SnowStorm},function(module,exports,__webpack_require__){module.exports=__webpack_require__(0)("add","+")},function(module,exports,__webpack_require__){module.exports=__webpack_require__(0)("sub","-")},function(module,exports,__webpack_require__){module.exports=__webpack_require__(0)("div","/")},function(module,exports,__webpack_require__){module.exports=__webpack_require__(0)("mult","*")},function(module,exports){module.exports=function generator(dims){dims=0|+dims;var body=[];body.push("return function dist"+dims+"(vec, other) {");for(var els=[],i=0;i<dims;i+=1)body.push("var p"+i+" = other["+i+"]-vec["+i+"]"),els.push("p"+i+"*p"+i);return body.push("return Math.sqrt("+els.join(" + ")+")"),body.push("}"),Function(body.join("\n"))()}},function(module,exports){function cross2(vec,other){return vec[0]*other[1]-vec[1]*other[0]}function cross3(vec,other){return[vec[1]*other[2]-vec[2]*other[1],vec[2]*other[0]-vec[0]*other[2],vec[0]*other[1]-vec[1]*other[0]]}module.exports=function generator(dims){if(2===(dims=0|+dims))return cross2;if(3===dims)return cross3;throw new Error("cross product only supported for 2 and 3 dimensions")}},function(module,exports){module.exports=function generator(dims){dims=0|+dims;var body=[];body.push("return function mag"+dims+"(vec) {"),body.push("return Math.sqrt(");for(var contents=[],i=0;i<dims;i+=1)contents.push("vec["+i+"]*vec["+i+"]");return body.push(contents.join("+")),body.push(")"),body.push("}"),Function(body.join("\n"))()}},function(module,exports){module.exports=function generator(dims){dims=0|+dims;var body=[];body.push("return function(vec, other) {");for(var els=[],i=0;i<dims;i+=1)els.push("vec["+i+"]*other["+i+"]");return body.push("return "+els.join(" + ")),body.push("}"),Function(body.join("\n"))()}},function(module,exports){module.exports=function generator(dims){if(2!==(dims=0|+dims))throw new Error("`vectors.heading` only works in 2 dimensions");return function heading(vec,other){return Math.atan2(vec[1]-other[1],vec[0]-other[0])}}},function(module,exports){module.exports=function generator(dims){dims=0|+dims;var body=[];body.push("return function lerp"+dims+"(vec, a, b, scalar) {");for(var i=0;i<dims;i+=1)body.push("vec[$] = a[$] + (b[$] - a[$]) * scalar".replace(/\$/g,i));return body.push("return vec"),body.push("}"),Function(body.join("\n"))()}},function(module,exports){module.exports=function generator(dims){dims=0|+dims;var body=[];body.push("return function limit"+dims+"(vec, scalar) {");for(var mag=[],i=0;i<dims;i+=1)mag.push("vec["+i+"] * vec["+i+"]");body.push("var mag = "+mag.join("+")),body.push("if (mag > scalar*scalar) {"),body.push("mag = Math.sqrt(mag)");for(i=0;i<dims;i+=1)body.push("vec["+i+"] = vec["+i+"] * scalar / mag");return body.push("}"),body.push("return vec"),body.push("}"),Function(body.join("\n"))()}},function(module,exports){module.exports=function generator(dims){dims=0|+dims;var body=[];body.push("return function normalize"+dims+"(vec, scalar) {");for(var els=[],i=0;i<dims;i+=1)els.push("vec["+i+"]*vec["+i+"]");body.push("var mag = Math.sqrt("+els.join("+")+")"),body.push("if (mag === 0) {");for(i=0;i<dims;i+=1)body.push("vec["+i+"] = 0");body.push("} else {");for(i=0;i<dims;i+=1)body.push("vec["+i+"] /= mag");return body.push("}"),body.push("return vec"),body.push("}"),Function(body.join("\n"))()}},function(module,exports,__webpack_require__){var Vector=__webpack_require__(2),utils=__webpack_require__(1);class SnowFlake{constructor(_opts){var opts=Object.assign({position:utils.randomFlakePosition(),velocity:utils.randomFlakeVelocity(),rotation:utils.randomFlakeRotation(),rotationalVelocity:utils.randomFlakeRotationVelocity()},_opts||{});Object.defineProperties(this,{id:{writable:!1,enumerable:!1,configurable:!1,value:utils.genID("snowflake")},_parentElement:{writable:!1,enumerable:!1,configurable:!1,value:opts.parentElement},position:{writable:!0,enumerable:!1,configurable:!0,value:new Vector(opts.position)},velocity:{writable:!0,enumerable:!1,configurable:!0,value:new Vector(opts.velocity)},rotation:{writable:!0,enumerable:!1,configurable:!0,value:new Vector(opts.rotation)},rotationalVelocity:{writable:!0,enumerable:!1,configurable:!0,value:new Vector(opts.rotationalVelocity)},x:{enumerable:!1,configurable:!0,get:()=>this.position.x,set:value=>this.position.x=value},y:{enumerable:!1,configurable:!0,get:()=>this.position.y,set:value=>this.position.y=value},z:{enumerable:!1,configurable:!0,get:()=>this.position.z,set:value=>this.position.z=value},vx:{enumerable:!1,configurable:!0,get:()=>this.velocity.x,set:value=>this.velocity.x=value},vy:{enumerable:!1,configurable:!0,get:()=>this.velocity.y,set:value=>this.velocity.y=value},vz:{enumerable:!1,configurable:!0,get:()=>this.velocity.z,set:value=>this.velocity.z=value},rx:{enumerable:!1,configurable:!0,get:()=>this.rotation.x,set:value=>this.rotation.x=value},ry:{enumerable:!1,configurable:!0,get:()=>this.rotation.y,set:value=>this.rotation.y=value},rz:{enumerable:!1,configurable:!0,get:()=>this.rotation.z,set:value=>this.rotation.z=value},rvx:{enumerable:!1,configurable:!0,get:()=>this.rotationalVelocity.x,set:value=>this.rotationalVelocity.x=value},rvy:{enumerable:!1,configurable:!0,get:()=>this.rotationalVelocity.y,set:value=>this.rotationalVelocity.y=value},rvz:{enumerable:!1,configurable:!0,get:()=>this.rotationalVelocity.z,set:value=>this.rotationalVelocity.z=value}});var element=utils.createElement(opts.parentElement,{id:this.id,class:"snowflake",type:Math.floor(6*Math.random())+1});Object.defineProperties(this,{_element:{writable:!1,enumerable:!1,configurable:!1,value:element}})}destroy(){utils.removeElement(this.getElement())}getElement(){return this._element}getParentElement(){return this.getElement().parentNode}inBounds(x1,y1,x2,y2){var x=this.x,y=this.y;return!(x<x1)&&(!(x>x2)&&(!(y<y1)&&!(y>y2)))}resetFlake(){this.position.set(utils.randomFlakePosition(!0)),this.velocity.set(utils.randomFlakeVelocity()),this.rotationalVelocity.set(utils.randomFlakeVelocity())}finalizeFlake(){this.inBounds(-utils.SNOW_FLAKE_START_X-.001,-utils.SNOW_FLAKE_START_Y-.001,2*utils.SNOW_FLAKE_START_X+.001,1)||this.resetFlake()}update(deltaMS,_velocityScalar,helper){var element=this.getElement(),velocityScalar=_velocityScalar||1;return velocityScalar*=deltaMS,this.position.add([this.vx*velocityScalar,this.vy*velocityScalar,this.vz*velocityScalar]),this.rotation.add([this.rvx*velocityScalar,this.rvy*velocityScalar,this.rvz*velocityScalar]),"function"==typeof helper&&helper(this),this.finalizeFlake(),element.style.transform=["translate3d(",100*this.position.x,"vw,",100*this.position.y,"vh,",0*this.position.z,"px",") ","scale(",Math.abs(this.position.z)+",",Math.abs(this.position.z),") ","rotateX(",360*this.rotation.x,"deg",") ","rotateY(",360*this.rotation.y,"deg",") ","rotateZ(",360*this.rotation.z,"deg",") "].join(""),this}clone(parentElement){return new SnowFlake(parentElement||this.getParentElement(),this.position,this.velocity)}}module.exports=SnowFlake}]);