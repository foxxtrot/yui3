YUI.add("widget-modality",function(c){var n="widget",p="renderUI",e="bindUI",j="syncUI",t="boundingBox",l="contentBox",q="visible",d="zIndex",k="Change",h=c.Lang.isBoolean,r=c.ClassNameManager.getClassName,i="maskShow",a="maskHide",s="clickoutside",m="focusoutside";supportsPosFixed=(function(){
/*! IS_POSITION_FIXED_SUPPORTED - Juriy Zaytsev (kangax) - http://yura.thinkweb2.com/cft/ */
var v=null,w,u;if(document.createElement){w=document.createElement("div");if(w&&w.style){w.style.position="fixed";w.style.top="10px";u=document.body;if(u&&u.appendChild&&u.removeChild){u.appendChild(w);v=(w.offsetTop===10);u.removeChild(w);}}}return v;}());function o(u){if(u.modal){c.after(this._renderUIModal,this,p);c.after(this._syncUIModal,this,j);c.after(this._bindUIModal,this,e);if(this.get("rendered")){this._renderUIModal();this._syncUIModal();this._bindUIModal();}}}var g="modal",b="mask",f={modal:r(n,g),mask:r(n,b)};o.ATTRS={maskNode:{getter:"_getMaskNode",readOnly:true},modal:{value:false,validator:h},focusOn:{value:[{eventName:s},{eventName:m}],validator:c.Lang.isArray}};o.CLASSES=f;o._GET_MASK=function(){var u=c.one(".yui3-widget-mask")||null;if(u){return u;}else{u=c.Node.create("<div></div>");u.addClass(f.mask);u.setStyles({position:supportsPosFixed?"fixed":"absolute",width:"100%",height:"100%",top:"0",left:"0",display:"block"});return u;}};o.STACK=[];o.prototype={_maskNode:o._GET_MASK(),_uiHandlesModal:null,_renderUIModal:function(){var u=this.get(t);this._repositionMask(this);u.addClass(f.modal);},_bindUIModal:function(){this.after(q+k,this._afterHostVisibleChangeModal);this.after(d+k,this._afterHostZIndexChangeModal);this.after("focusOnChange",this._afterFocusOnChange);},_syncUIModal:function(){this._uiSetHostVisibleModal(this.get(q));this._uiSetHostZIndexModal(this.get(d));},_focus:function(v){var w=this.get(t),u=w.get("tabIndex");w.set("tabIndex",u>=0?u:0);this.focus();},_blur:function(){this.blur();},_getMaskNode:function(){return o._GET_MASK();},_uiSetHostVisibleModal:function(y){var u=o.STACK,w,v=this.get("maskNode"),x=this.get("modal");if(y){c.Array.each(u,function(z){z._detachUIHandlesModal();z._blur();});u.unshift(this);this._repositionMask(this);this._uiSetHostZIndexModal(this.get(d));o._GET_MASK().show();if(x){c.later(1,this,"_attachUIHandlesModal");this._focus();}}else{u.splice(c.Array.indexOf(u,this),1);this._detachUIHandlesModal();this._blur();if(u.length){w=u[0];this._repositionMask(w);w._uiSetHostZIndexModal(w.get(d));if(w.get("modal")){c.later(1,w,"_attachUIHandlesModal");w._focus();}}else{if(v.getStyle("display")==="block"){v.hide();}}}},_uiSetHostZIndexModal:function(u){if(this.get("modal")){this.get("maskNode").setStyle(d,u||0);}},_attachUIHandlesModal:function(){if(this._uiHandlesModal){return;}var A=this.get(t),x=this.get("maskNode"),z=this.get("focusOn"),u=c.bind(this._focus,this),v=[],w=0,y={node:undefined,ev:undefined,keyCode:undefined};for(;w<z.length;w++){y.node=z[w].node;y.ev=z[w].eventName;y.keyCode=z[w].keyCode;if(!y.node&&!y.keyCode&&y.ev){v.push(A.on(y.ev,u));}else{if(y.node&&!y.keyCode&&y.ev){v.push(y.node.on(y.ev,u));}else{if(y.node&&y.keyCode&&y.ev){v.push(y.node.on(y.ev,u,y.keyCode));}else{c.Log('focusOn ATTR Error: The event with name "'+y.ev+'" could not be attached.');}}}}if(!supportsPosFixed){v.push(c.one("win").on("scroll",c.bind(function(B){x.setStyle("top",x.get("docScrollY"));},this)));}this._uiHandlesModal=v;},_detachUIHandlesModal:function(){c.each(this._uiHandlesModal,function(u){u.detach();});this._uiHandlesModal=null;},_afterHostVisibleChangeModal:function(u){this._uiSetHostVisibleModal(u.newVal);},_afterHostZIndexChangeModal:function(u){this._uiSetHostZIndexModal(u.newVal);},isNested:function(){var v=o.STACK.length,u=(v>1)?true:false;return u;},_repositionMask:function(u){var w=this.get("modal"),v=u.get("modal"),x=this.get("maskNode"),y;if(w&&!v){x.remove();this.fire(a);}else{if((!w&&v)||(w&&v)){x.remove();this.fire(a);y=u.get(t),bbParent=y.get("parentNode")||c.one("body");bbParent.insert(x,bbParent.get("firstChild"));this.fire(i);}}},_afterFocusOnChange:function(u){this._detachUIHandlesModal();if(this.get(q)){this._attachUIHandlesModal();}}};c.WidgetModality=o;},"@VERSION@",{requires:["widget","event-outside","base-build"]});