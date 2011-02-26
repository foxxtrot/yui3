YUI.add("autocomplete-list",function(b){var h=b.Lang,u=b.Node,k=b.Array,o=9,r="_CLASS_ITEM",s="_CLASS_ITEM_ACTIVE",d="_CLASS_ITEM_HOVER",t="_SELECTOR_ITEM",f="activeItem",j="alwaysShowList",n="circular",q="hoveredItem",l="id",e="item",c="list",v="result",i="results",p="visible",g="width",m="select",a=b.Base.create("autocompleteList",b.Widget,[b.AutoCompleteBase,b.WidgetPosition,b.WidgetPositionAlign,b.WidgetStack],{ARIA_TEMPLATE:"<div/>",ITEM_TEMPLATE:"<li/>",LIST_TEMPLATE:"<ul/>",initializer:function(){var w=this.get("inputNode");if(!w){b.error("No inputNode specified.");return;}this._inputNode=w;this._listEvents=[];this.DEF_PARENT_NODE=w.get("parentNode");this[r]=this.getClassName(e);this[s]=this.getClassName(e,"active");this[d]=this.getClassName(e,"hover");this[t]="."+this[r];this.publish(m,{defaultFn:this._defSelectFn});},destructor:function(){while(this._listEvents.length){this._listEvents.pop().detach();}if(this._ariaNode){this._ariaNode.remove().destroy(true);}},bindUI:function(){this._bindInput();this._bindList();},renderUI:function(){var A=this._createAriaNode(),x=this.get("contentBox"),z=this._inputNode,y,w=z.get("parentNode");y=this._createListNode();this._set("listNode",y);x.append(y);z.addClass(this.getClassName("input")).setAttrs({"aria-autocomplete":c,"aria-expanded":false,"aria-owns":y.get("id"),role:"combobox"});w.append(A);this._ariaNode=A;this._boundingBox=this.get("boundingBox");this._contentBox=x;this._listNode=y;this._parentNode=w;},syncUI:function(){this._syncResults();this._syncVisibility();},hide:function(){return this.get(j)?this:this.set(p,false);},selectItem:function(w){if(w){if(!w.hasClass(this[r])){return this;}}else{w=this.get(f);if(!w){return this;}}this.fire(m,{itemNode:w,result:w.getData(v)});return this;},_activateNextItem:function(){var x=this.get(f),w;if(x){w=x.next(this[t])||(this.get(n)?null:x);}else{w=this._getFirstItemNode();}this.set(f,w);return this;},_activatePrevItem:function(){var x=this.get(f),w=x?x.previous(this[t]):this.get(n)&&this._getLastItemNode();this.set(f,w||null);return this;},_add:function(w){var x=[];k.each(h.isArray(w)?w:[w],function(y){x.push(this._createItemNode(y).setData(v,y));},this);x=b.all(x);this._listNode.append(x.toFrag());return x;},_ariaSay:function(y,w){var x=this.get("strings."+y);this._ariaNode.setContent(w?h.sub(x,w):x);},_bindInput:function(){var z=this._inputNode,x,y,w;if(this.get("align")===null){w=this.get("tokenInput");x=(w&&w.get("boundingBox"))||z;this.set("align",{node:x,points:["tl","bl"]});if(!this.get(g)&&(y=x.get("offsetWidth"))){this.set(g,y);}}this._listEvents.push(z.on("blur",this._onListInputBlur,this));},_bindList:function(){this._listEvents.concat([this.after({mouseover:this._afterMouseOver,mouseout:this._afterMouseOut,activeItemChange:this._afterActiveItemChange,alwaysShowListChange:this._afterAlwaysShowListChange,hoveredItemChange:this._afterHoveredItemChange,resultsChange:this._afterResultsChange,visibleChange:this._afterVisibleChange}),this._listNode.delegate("click",this._onItemClick,this[t],this)]);},_clear:function(){this.set(f,null);this._set(q,null);this._listNode.get("children").remove(true);},_createAriaNode:function(){var w=u.create(this.ARIA_TEMPLATE);return w.addClass(this.getClassName("aria")).setAttrs({"aria-live":"polite",role:"status"});},_createItemNode:function(w){var x=u.create(this.ITEM_TEMPLATE);return x.addClass(this[r]).setAttrs({id:b.stamp(x),role:"option"}).setAttribute("data-text",w.text).append(w.display);},_createListNode:function(){var w=u.create(this.LIST_TEMPLATE);return w.addClass(this.getClassName(c)).setAttrs({id:b.stamp(w),role:"listbox"});},_getFirstItemNode:function(){return this._listNode.one(this[t]);},_getLastItemNode:function(){return this._listNode.one(this[t]+":last-child");},_syncResults:function(x){var w;if(!x){x=this.get(i);}this._clear();if(x.length){w=this._add(x);this._ariaSay("items_available");}if(this.get("activateFirstItem")&&!this.get(f)){this.set(f,this._getFirstItemNode());}},_syncVisibility:function(w){if(this.get(j)){w=true;this.set(p,w);}if(typeof w==="undefined"){w=this.get(p);}this._inputNode.set("aria-expanded",w);this._boundingBox.set("aria-hidden",!w);if(w){this._syncUIPosAlign();}else{this.set(f,null);this._set(q,null);this._boundingBox.get("offsetWidth");}},_afterActiveItemChange:function(y){var x=this._inputNode,w=y.newVal,z=y.prevVal;if(z&&z._node){z.removeClass(this[s]);}if(w){w.addClass(this[s]);x.set("aria-activedescendant",w.get(l));}else{x.removeAttribute("aria-activedescendant");}if(this.get("scrollIntoView")){(w||x).scrollIntoView();}},_afterAlwaysShowListChange:function(w){this.set(p,w.newVal||this.get(i).length>0);},_afterHoveredItemChange:function(x){var w=x.newVal,y=x.prevVal;if(y){y.removeClass(this[d]);}if(w){w.addClass(this[d]);}},_afterMouseOver:function(w){var x=w.domEvent.target.ancestor(this[t],true);this._mouseOverList=true;if(x){this._set(q,x);}},_afterMouseOut:function(){this._mouseOverList=false;this._set(q,null);},_afterResultsChange:function(w){this._syncResults(w.newVal);if(!this.get(j)){this.set(p,!!w.newVal.length);}},_afterVisibleChange:function(w){this._syncVisibility(!!w.newVal);},_onListInputBlur:function(w){if(!this._mouseOverList||this._lastInputKey===o){this.hide();}},_onItemClick:function(w){var x=w.currentTarget;this.set(f,x);this.selectItem(x);},_defSelectFn:function(w){var x=w.result.text;this._inputNode.focus();this._updateValue(x);this._ariaSay("item_selected",{item:x});this.hide();}},{ATTRS:{activateFirstItem:{value:false},activeItem:{setter:b.one,value:null},alwaysShowList:{value:false},circular:{value:true},hoveredItem:{readOnly:true,value:null},listNode:{readOnly:true,value:null},scrollIntoView:{value:false},strings:{valueFn:function(){return b.Intl.get("autocomplete-list");}},tabSelect:{value:true},visible:{value:false}},CSS_PREFIX:b.ClassNameManager.getClassName("aclist")});b.AutoCompleteList=a;b.AutoComplete=a;},"@VERSION@",{after:["autocomplete-sources"],lang:["en"],skinnable:true,requires:["autocomplete-base","selector-css3","widget","widget-position","widget-position-align","widget-stack"]});
