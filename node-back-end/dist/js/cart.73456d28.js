"use strict";(self["webpackChunkvue_front_end"]=self["webpackChunkvue_front_end"]||[]).push([[511],{4690:function(t,e,r){r.r(e),r.d(e,{default:function(){return y}});var a=r(3396);const n=(0,a._)("h1",null,"Shopping Cart",-1),o={key:0},s=(0,a._)("button",{class:"checkout-button"},"Proceed to Checkout",-1),u={key:1};function c(t,e,r,c,i,l){const p=(0,a.up)("ShoppingCartList");return(0,a.wg)(),(0,a.iD)(a.HY,null,[n,c.cartItems.length>0?((0,a.wg)(),(0,a.iD)("div",o,[(0,a.Wm)(p,{onRemoveFromCart:c.removeFromCart,products:c.cartItems},null,8,["onRemoveFromCart","products"]),s])):((0,a.wg)(),(0,a.iD)("div",u," You current have no items in your cart! "))],64)}var i=r(4870),l=r(7139);const p=["src","alt"],m={class:"details-wrap"},d=["onClick"];function v(t,e,r,n,o,s){return(0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(r.products,(e=>((0,a.wg)(),(0,a.iD)("div",{class:"product-container",key:e.id},[(0,a._)("img",{class:"product-image",src:e.imageUrl,alt:e.name},null,8,p),(0,a._)("div",m,[(0,a._)("h3",null,(0,l.zw)(e.name),1),(0,a._)("p",null,(0,l.zw)(e.price),1)]),(0,a._)("button",{onClick:r=>t.$emit("remove-from-cart",e.id),class:"remove-button"},"Remove from Cart",8,d)])))),128)}var g={name:"ShoppingCartList",props:["products"],emits:["remove-from-cart"]},f=r(89);const C=(0,f.Z)(g,[["render",v]]);var h=C,w=r(4161),k={name:"ShoppingCartPage",components:{ShoppingCartList:h},props:["user"],setup(t){const e=(0,i.iH)(t.user);let r=(0,i.iH)([]);async function n(t){const a=await w.Z["delete"](`/api/users/${e.value.uid}/cart/${t}`),n=a.data;r.value=n}return(0,a.YP)(e,(async t=>{if(t){const e=await w.Z.get(`/api/users/${t.uid}/cart`);r.value=e.data}})),(0,a.wF)((async()=>{if(e.value){const t=await w.Z.get(`/api/users/${e.value.uid}/cart`);r.value=t.data}})),{cartItems:r,removeFromCart:n}}};const _=(0,f.Z)(k,[["render",c]]);var y=_}}]);
//# sourceMappingURL=cart.73456d28.js.map