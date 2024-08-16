(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();const f=({price:e,name:t,quantity:r,id:s,thumbnail:o},i)=>{const c=i==null?void 0:i.find(l=>l.id==s),m=g("article",{class:"cart-item item","data-id":s});return m.innerHTML=`
                <div class="item-details">
                  <img src="${o}" alt="${t}" />
                  <div>
                    <h4 class="item-name">${t}</h4>
                    <p class="item-pricing">
                      <span class="item-quantity" aria-live="polite">${r}x</span>
                      <span class="item-price">@${e}</span>
                      <span class="item-total" aria-live="polite">${h(c?c.quantity*e:e)}</span>
                    </p>
                  </div>
                </div>
                <span class="item-total toclone" aria-live="polite">${h(c?c.quantity*e:e)}</span>
                <button class="remove-cart-item btn-action" aria-label="Remove ${t} from cart">
                    <img src="/src/assets/images/icon-remove-item.svg"  aria-hidden="true" alt="" />
                     
                </button>
  `,m},y=({price:e,category:t,name:r,image:{thumbnail:s,mobile:o,desktop:i,tablet:c}},m)=>{const l=m==null?void 0:m.items.find(v=>v.name==r),p=g("div",{class:`product loader ${l?"added":""}`,"data-id":l?l.id:I(),"data-quantity":l?l.quantity:0,"data-price":e,"data-name":r,"data-thumbnail":s});return p.innerHTML=`
            <div class="product-image">
              <div class="image">
                <img
                  src="${o}"
                  srcset="
                    ${o}  654w,
                    ${c}  427w,
                    ${i} 502w
                  "
                  alt="${r}"
                  class="lazy-load"
                />
               
              </div>
              <div class="product-actions" aria-label="Product actions">
                <button data-action="addtocart" class="addtocart main-btn" aria-label="Add to cart">
                  <img
                    src="/src/assets/images/icon-add-to-cart.svg"
                    alt=""
                    aria-hidden="true"
                  />
                  <span> Add to Cart </span>
                </button>

                <div class="product-quantity-controls main-btn" role="button">
                  <button data-action="removefromcart" class="btn-action remove" aria-label="Decrease quantity">
                    <img
                      src="/src/assets/images/icon-decrement-quantity.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </button>

                  <span class="product-quantity item-quantity" aria-live="polite">${(l==null?void 0:l.quantity)+"x"}</span>

                  <button data-action="addmore" class="btn-action addmore" aria-label="Increase quantity">
                    <img
                      src="/src/assets/images/icon-increment-quantity.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
            <section class="product-details">
              <h3 class="product-category">${t}</h3>
              <h4 class="product-name">${r}</h4>
              <span class="product-price">${h(e)}</span>
            </section>
  `,p},b=async(e,t,r)=>{try{const s=await fetch("/src/js/data.json");if(!s.ok)throw new Error("data.json doesn't exit,or Wrong Path !");const o=await s.json(),i=document.createDocumentFragment();o.forEach(c=>i.prepend(y(c,r))),e.appendChild(i)}catch(s){throw console.log(s),s}finally{setTimeout(()=>t==null?void 0:t.remove(),100)}},g=(e,t={})=>{const r=document.createElement(e);return Object.entries(t).forEach(([s,o])=>r.setAttribute(s,o)),r},n=(e,t=document)=>t.querySelector(e),C=(e,t=document)=>t.querySelectorAll(e),h=(e,t)=>t?"":"$"+parseFloat(e).toFixed(2),L=e=>{const{dataset:t}=e;return{id:t.id,price:t.price,name:t.name,quantity:t.quantity,thumbnail:t.thumbnail}},w=()=>{const e=JSON.parse(localStorage.getItem("cart"));return{items:(e==null?void 0:e.items)||[],itemsCount:(e==null?void 0:e.itemsCount)||0,total:(e==null?void 0:e.total)||0}},I=()=>Math.random().toString(36).substr(2,9),O=(e,t)=>{let r;return function(...s){const o=this;clearTimeout(r),r=setTimeout(()=>e.apply(o,s),t)}};HTMLElement.prototype.get=function(e){this.querySelector(e)};HTMLElement.prototype.getAll=function(e){this.querySelector(e)};const a={ProductsContainer:n(".products"),CartContainer:n(".cart .cart-items"),ProductsContainer:n(".products"),ItemsCount:n(".cart .item-count"),CartEmpty:n(".cart .cart-empty"),CartHolder:n(".cart .cart-holder"),CartBody:n(".cart .cart-body"),CartTotalamount:n(".cart .total-amount"),Loader:n(".page-loader"),CartElement:n(".cart"),ConfirmOrder:n(".cart .confirm-order"),OrderConfirmed:n(".order-confirmed"),Overlay:n(".overlay"),CartIcon:n(".header .cart-icon"),StartNewOrder:n(".order-confirmed .start-new-order"),Header:n(".header")};class q{constructor(t={}){this.options={rootMargin:"100px",threshold:.1,loadingClass:"loading",loadedClass:"loaded",errorClass:"error",...t},this.observer=null,this.elements=new Map,this.init()}init(){this.observer=new IntersectionObserver(this.handleIntersection.bind(this),{rootMargin:this.options.rootMargin,threshold:this.options.threshold})}observe(t){Array.isArray(t)||(t=Array.from(t)),t.forEach(r=>{this.elements.has(r)||(this.elements.set(r,{src:r.dataset.src,srcset:r.dataset.srcset,loaded:!1}),this.observer.observe(r))})}unobserve(t){this.elements.has(t)&&(this.observer.unobserve(t),this.elements.delete(t))}handleIntersection(t){t.forEach(r=>{r.isIntersecting&&this.loadElement(r.target)})}async loadElement(t){const r=this.elements.get(t);if(!(!r||r.loaded)){t.classList.add(this.options.loadingClass);try{t.tagName.toLowerCase()==="img"?await this.loadImage(t,r):await this.loadBackground(t,r),t.classList.remove(this.options.loadingClass),t.classList.add(this.options.loadedClass),r.loaded=!0,this.unobserve(t)}catch(s){console.error("Error loading element:",s),t.classList.remove(this.options.loadingClass),t.classList.add(this.options.errorClass)}}}loadImage(t,r){return new Promise((s,o)=>{t.onload=s,t.onerror=o,r.srcset&&(t.srcset=r.srcset),t.src=r.src})}loadBackground(t,r){return new Promise((s,o)=>{const i=new Image;i.onload=()=>{t.style.backgroundImage=`url(${r.src})`,s()},i.onerror=o,i.src=r.src})}refresh(){this.elements.forEach((t,r)=>{t.loaded||(this.observer.unobserve(r),this.observer.observe(r))})}destroy(){this.observer.disconnect(),this.elements.clear()}}const d={...w(),save(){localStorage.setItem("cart",JSON.stringify(this))},addItem(e){const t=this.items.findIndex(s=>s.id==e.id);let r=d.items[t];t==-1?(r={...e,quantity:1},this.items.push(r),u.renderCartItem(r)):r.quantity++,this.UpdateTotal({amount:r.price}),u.updateUi(r.id)},UpdateTotal({amount:e},t="+",r){d.total+=t=="+"?e:-e,r?d.itemsCount-=r:d.itemsCount+=t=="+"?1:-1},removeItem({id:e,quantity:t,price:r}){if(t==1)n(`[data-id="${e}"] .remove-cart-item`,a.CartContainer).click();else{const s=this.items.find(o=>o.id==e);s.quantity--,this.UpdateTotal({amount:r},"-"),u.updateUi(s.id)}},removeCompletly(e){const t=this.items.findIndex(s=>s.id==e),r=d.items[t];this.UpdateTotal({amount:r.quantity*r.price},"-",r.quantity),this.items.splice(t,1),u.updateUi(e)}},u={clonedCartBody:!1,productsClick(e){const{target:t}=e;if(!t.closest(".product"))return;const r=t.closest(".product"),s=L(r);t.closest(".remove")&&d.removeItem(s),t.closest(".addtocart, .addmore")&&d.addItem(s)},removeCartItem(e){n(`[data-id="${e}"]`,a.ProductsContainer).classList.remove("added"),n(`[data-id="${e}"]`,a.CartContainer).remove()},updateCartTotals(){a.ItemsCount.textContent=d.itemsCount,a.CartTotalamount.textContent=h(d.total)},renderCartItem(e){a.CartContainer.prepend(f(e)),n(`[data-id="${e.id}"]`,a.ProductsContainer).classList.add("added")},ClickCart(e){const{target:t}=e;if(!t.closest(".remove-cart-item"))return;const r=t.closest("[data-id]").dataset.id;d.removeCompletly(r)},updateUi(e){const t=d.items.find(r=>r.id==e);if(t){C(`[data-id="${e}"]`).forEach(s=>{n(".item-quantity",s).textContent=t.quantity+"x"});const r=n(`[data-id="${e}"]`,a.CartContainer);C(".item-total",r).forEach(s=>s.textContent=h(t.quantity*t.price))}else this.removeCartItem(e);n(`[data-id="${e}"]`,a.ProductsContainer).dataset.quantity=(t==null?void 0:t.quantity)||0,this.updateCartTotals(),this.toggleCartContent(),d.save()},toggleCartContent(){const e=d.items.length>0;a.CartEmpty.classList.toggle("hidden",e),a.CartHolder.classList.toggle("hidden",!e)},initializeCart(){if(d.itemsCount==0)return;const e=document.createDocumentFragment();d.items.forEach(t=>e.prepend(f(t,d.items))),a.CartContainer.appendChild(e),u.toggleCartContent(),u.updateCartTotals()},resetUI(){d.items=[],d.total=0,d.itemsCount=0,d.save(),a.CartContainer.innerHTML="",this.updateCartTotals(),this.toggleCartContent(),C(".product.added",a.ProductsContainer).forEach(e=>e.classList.remove("added")),this.CartVisibility(!1),a.OrderConfirmed.querySelector(".cloned").remove(),a.OrderConfirmed.classList.remove("show"),this.clonedCartBody=!1},showHeader(){let e=0;return function(){const t=window.scrollY;t>50?t>e?(a.Header.classList.remove("show"),a.Header.classList.add("hidden")):(a.Header.classList.remove("hidden"),a.Header.classList.add("show")):a.Header.classList.remove("show","hidden"),e=t}},CartVisibility(e){a.Overlay.classList.toggle("show",e),a.CartElement.classList.toggle("show",e)},CartIconClick(){this.CartVisibility(!0)},ClickOverlay(){this.CartVisibility(!1),a.OrderConfirmed.classList.remove("show")},ConfirmOrder(){const e=document.createDocumentFragment(),t=a.CartBody.cloneNode(!0);t.classList.add("cloned"),e.appendChild(t),this.clonedCartBody?a.OrderConfirmed.replaceChild(e,n(".cloned",a.OrderConfirmed)):(a.OrderConfirmed.insertBefore(e,a.OrderConfirmed.lastElementChild),this.clonedCartBody=!0),a.OrderConfirmed.classList.add("show"),a.Overlay.classList.add("show")},async init(){await b(a.ProductsContainer,a.Loader,d),new q().observe(C(".lazy-load")),a.ProductsContainer.addEventListener("click",this.productsClick),a.CartContainer.addEventListener("click",this.ClickCart),a.Overlay.addEventListener("click",this.ClickOverlay.bind(this)),a.StartNewOrder.addEventListener("click",this.resetUI.bind(this)),a.CartIcon.addEventListener("click",this.CartIconClick.bind(this)),a.ConfirmOrder.addEventListener("click",this.ConfirmOrder.bind(this)),this.initializeCart(),window.addEventListener("scroll",O(this.showHeader(),10))}};window.addEventListener("DOMContentLoaded",u.init.bind(u));
