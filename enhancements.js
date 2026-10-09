/* CEERIES visual and usability improvements. The original page structure and styling remain the foundation. */
(() => {
  'use strict';
  const tone = {queen:'#651a28', hot:'#d93450', diva:'#da8057', icon:'#875b49', barbie:'#ed799f', purr:'#b78b85', gorg:'#e2cfb8'};
  const shadeNames = {queen:'Dark Red',hot:'Red',diva:'Orange',icon:'Brown',barbie:'Pink',purr:'Soft Nude',gorg:'Clear'};
  const filter = { search:'', shade:'all', sort:'recommended' };
  const origRender = render;
  const origHome = home;
  const origFormula = formula;
  const origNewsletter = newsletter;
  const origCampaign = campaign;
  const origEmail = emailPage;
  const origContact = contact;
  const origCard = card;
  const titles = {'/':'CEERIES — Timeless Beauty, Purposeful Glamour','/shop':'Lip Oils — CEERIES Hydra Slay','/formula':'The Formula — CEERIES','/gallery':'The Edit — CEERIES Model Gallery','/contact':'Contact — CEERIES','/orders':'My Orders — CEERIES','/account':'Account Settings — CEERIES','/cart':'Shopping Cart — CEERIES','/checkout':'Checkout — CEERIES','/confirmation':'Order Confirmation — CEERIES','/campaign':'#MyCeeriesEdit — Social Campaign','/email':'CEERIES Email Marketing Preview','/api':'CEERIES — API Data Demonstration'};
  const safe = (value) => escapeHTML(value);
  const shadeButton = p => `<a href="#/product/${p.id}" class="shade-option" title="See ${p.name}" aria-label="See ${p.name}, ${p.shade}" ${p.id === location.hash.split('/')[2] ? 'aria-current="true"' : ''}><i style="--shade:${tone[p.id]}" aria-hidden="true"></i><span>${p.name}</span></a>`;

  /* A tiny shade explorer integrated into the existing homepage, not a new visual theme. */
  home = () => {
    let content = origHome();
    const guide = `<section class="shade-guide section" aria-labelledby="shade-guide-title"><div class="container shade-guide-inner"><div><p class="eyebrow">Find your everyday signature</p><h2 class="section-title" id="shade-guide-title">Seven shades.<br><span class="serif">One you.</span></h2><p>Discover the Hydra Slay shades, from the clear glow of Gorg to the deeper red of Queen.</p><a class="link-arrow" href="#/shop">Explore all lip oils ↗</a></div><div><div class="shade-palette" aria-label="Choose a lip oil shade">${products.map(shadeButton).join('')}</div><p class="notice">Select a shade to see its product details and add it to your bag.</p></div></div></section>`;
    content = content.replace('<section class="container section"><h2 class="section-title center">Frequently Asked Questions', guide + '<section class="container section"><h2 class="section-title center">Frequently Asked Questions');
    return content;
  };

  newsletter = () => origNewsletter().replace('</form>', '<label class="newsletter-consent"><input type="checkbox" name="consent" required> I agree to receive CEERIES marketing updates in this classroom demo.</label><p class="newsletter-feedback" id="newsletterFeedback" role="status" aria-live="polite"></p></form>');

  shop = () => `<div class="container shop-wrap"><p class="breadcrumb"><a href="#/">Home</a> › LIPPIES</p>${img('assets/hero.webp','CEERIES Hydra Slay lip oil collection','class="shop-banner" fetchpriority="high"')}<div class="shop-title-row"><div><p class="eyebrow">The Hydra Slay collection</p><h1>LIPPIES</h1><p class="muted">Seven shades for every version of you.</p></div><a class="link-arrow" href="#/formula">Discover the formula ↗</a></div><div class="shop-grid section shop-content"><aside class="shop-side"><h2>Browse by</h2><hr><a href="#/shop" class="active-category">LIPPIES</a><p class="notice">All seven Hydra Slay shades · ₱199 each</p></aside><div class="shop-main"><div class="shop-tools"><label class="search-label" for="productSearch">Find your shade<input id="productSearch" type="search" autocomplete="off" placeholder="Search shade or color…" aria-describedby="shopResultCount" value="${safe(filter.search)}"></label><label class="sort-label" for="sort">Sort by <select id="sort"><option value="recommended">Recommended</option><option value="az">Name: A–Z</option><option value="za">Name: Z–A</option><option value="low">Price: low to high</option></select></label></div><div class="filter-chips" aria-label="Filter lip oils by shade"><button data-shade="all" type="button">All shades</button>${products.map(p => `<button data-shade="${p.id}" type="button"><i style="--shade:${tone[p.id]};" aria-hidden="true"></i>${p.name}</button>`).join('')}</div><p class="shop-count" id="shopResultCount" aria-live="polite">${products.length} products</p><div class="catalog" id="shopProducts">${products.map(origCard).join('')}</div><div class="shop-empty" id="shopEmpty" hidden><h3>No shades found</h3><p>Try a different shade name or clear your search.</p><button id="resetFilters" type="button" class="outline">Show all shades</button></div></div></div></div>`;

  detail = (id) => {
    const p=prod(id); if(!p) return notfound(); quantity=1;
    return `<div class="container"><div class="product-detail"><div class="detail-photo">${img(p.image,p.name+' — '+p.shade+' Hydra Slay Lip Oil','fetchpriority="high"')}<p class="image-note">Hydra Slay Lip Oil · ${p.shade}</p></div><div class="detail-content"><p class="breadcrumb"><a href="#/shop">LIPPIES</a> / ${p.name}</p><p class="eyebrow">Hydra Slay Lip Oil</p><h1>${p.name}</h1><div class="price">${money(p.price)}</div><p>${safe(p.description)}</p><p class="availability"><span aria-hidden="true">●</span> Available in this product demo</p><h2 class="detail-small-title">Choose your shade</h2><div class="detail-swatches">${products.map(shadeButton).join('')}</div><p class="detail-quantity-label">Quantity *</p><div class="stepper"><button type="button" id="qtyMinus" aria-label="Decrease quantity">−</button><span id="qtyValue" aria-live="polite">1</span><button type="button" id="qtyPlus" aria-label="Increase quantity">+</button></div><div class="purchase-buttons"><button type="button" id="detailAdd">Add to Cart</button><button type="button" class="buy" id="buyNow">Buy Now</button></div><p class="notice">Student storefront demonstration. No actual payment is collected.</p><div class="detail-share"><button id="shareLink" type="button">Copy product link ↗</button><a href="#/contact">Ask about this shade ↗</a></div></div></div><section class="related-products" aria-labelledby="relatedTitle"><div class="related-heading"><h2 id="relatedTitle">Your next beauty edit.</h2><a class="link-arrow" href="#/shop">View every shade ↗</a></div><div class="catalog">${products.filter(item=>item.id!==id).slice(0,3).map(origCard).join('')}</div></section></div>`;
  };

  formula = () => origFormula() + `<section class="container section" aria-labelledby="featureHeading"><div class="center"><p class="eyebrow">What makes Hydra Slay special</p><h2 id="featureHeading" class="section-title">The little things<br><span class="serif">that make it yours.</span></h2></div><div class="feature-list"><article><span class="feature-num">01</span><h3>Seven expressive shades</h3><p>Clear, pink, red, orange, brown and nude tones for different everyday looks.</p></article><article><span class="feature-num">02</span><h3>Glossy everyday finish</h3><p>A mirror-like shine for moments when you want an easy finishing touch.</p></article><article><span class="feature-num">03</span><h3>Made for your routine</h3><p>A compact lip oil that fits easily into your everyday essentials.</p></article></div><div class="center" style="margin-top:36px"><a class="cta" href="#/shop">Meet the seven shades ↗</a></div></section>`;

  ordersPage = () => `<div class="page-standard"><h1>My Orders</h1><p>View your demo order history or check the status of a recent order.</p><hr>${!orders.length?`<div class="empty"><p>You haven't placed any orders yet.</p><a href="#/shop">Start Browsing</a></div>` : orders.slice().reverse().map(o=>`<article class="checkout-box tracked-order"><div class="tracked-order-head"><h2>Order #${safe(o.id)}</h2><strong>${money(o.total)}</strong></div><p>Placed ${new Date(o.date).toLocaleDateString('en-PH',{year:'numeric',month:'long',day:'numeric'})} · <span class="status-pill">${safe(o.status||'Demo order received')}</span></p><div class="ordered-items">${o.items.map(p=>`<div><span>${safe(p.name)} × ${Number(p.qty)}</span><span>${money(p.price*p.qty)}</span></div>`).join('')}</div><div class="order-progress" role="list" aria-label="Order status"><span role="listitem" class="current">✓ Received</span><span role="listitem">Processing</span><span role="listitem">Dispatched</span></div><p class="notice">Only “Received” is recorded. Later stages are illustrations and are not live delivery updates.</p></article>`).join('')}<p class="notice">Order history is stored in this browser; this is not a live customer account.</p></div>`;

  campaign = () => origCampaign().replace('Discover your shade ↗','Shop #MyCeeriesEdit ↗') + `<section class="campaign-bridge"><div class="container"><p class="eyebrow">One message, three touchpoints</p><h2>A little gloss. <span class="serif">A lot of you.</span></h2><p>The same #MyCeeriesEdit campaign connects our social posts, email preview, and Hydra Slay product collection.</p><div class="campaign-links"><a href="#/shop">Explore lip oils ↗</a><a href="#/email">See the email mockup ↗</a><a href="#/gallery">Explore the gallery ↗</a></div></div></section>`;
  emailPage = () => origEmail().replace('Your next beauty edit is here ✨','A little gloss. A lot of you. — Meet Hydra Slay').replace('Discover your everyday shine.','Discover your everyday shine. #MyCeeriesEdit');
  contact = () => origContact().replace('</form>', '<p class="form-feedback full" id="contactFeedback" role="status" aria-live="polite"></p></form>');

  function applyFilters() {
    const root = $('#shopProducts'); if(!root) return;
    const search = filter.search.trim().toLowerCase();
    let list = products.filter(p => (filter.shade==='all' || p.id===filter.shade) && [p.name,p.shade,p.description].join(' ').toLowerCase().includes(search));
    if(filter.sort==='az') list.sort((a,b)=>a.name.localeCompare(b.name));
    if(filter.sort==='za') list.sort((a,b)=>b.name.localeCompare(a.name));
    if(filter.sort==='low') list.sort((a,b)=>a.price-b.price || a.name.localeCompare(b.name));
    root.innerHTML=list.map(origCard).join('');
    $('#shopResultCount').textContent = `${list.length} of ${products.length} products`;
    $('#shopEmpty').hidden = Boolean(list.length);
    $$('.filter-chips button').forEach(button => {const active=button.dataset.shade===filter.shade;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});
    $$('[data-add]',root).forEach(button=>button.onclick=()=>add(button.dataset.add));
    const reset=$('#resetFilters');if(reset) reset.onclick=()=>{filter.shade='all';filter.search='';filter.sort='recommended';$('#productSearch').value='';$('#sort').value='recommended';applyFilters();$('#productSearch').focus()};
  }

  function installShop() {
    const input=$('#productSearch');if(!input)return;
    input.addEventListener('input',e=>{filter.search=e.target.value;applyFilters()});
    const sorter=$('#sort');sorter.value=filter.sort;sorter.onchange=e=>{filter.sort=e.target.value;applyFilters()};
    $$('.filter-chips button').forEach(button=>button.onclick=()=>{filter.shade=button.dataset.shade;applyFilters()});
    applyFilters();
  }

  function installTestimonials() {
    const list=$('.testimonial-grid');if(!list)return;
    list.id='testimonialList';list.setAttribute('aria-label','Customer testimonials');
    const controls=document.createElement('div'); controls.className='testimonials-nav';
    controls.innerHTML='<span>What our customers are saying</span><div><button type="button" id="testPrev" aria-label="Previous customer testimonial">Previous ←</button><button type="button" id="testNext" aria-label="Next customer testimonial">Next →</button></div>';
    list.parentElement.insertBefore(controls,list.nextElementSibling);
    const cards=$$('.quote',list);let current=0;
    const activate=index=>{current=(index+cards.length)%cards.length;cards.forEach((item,i)=>{item.classList.toggle('selected',i===current);item.setAttribute('aria-current',String(i===current))});if(list.scrollWidth>list.clientWidth){list.scrollTo({left:Math.max(0,cards[current].offsetLeft-list.offsetLeft),behavior:'smooth'})}};
    $('#testPrev').onclick=()=>activate(current-1);
    $('#testNext').onclick=()=>activate(current+1);
    activate(0);
  }

  function installForms() {
    const checkout=$('#checkoutForm');
    if(checkout){
      const phone=checkout.querySelector('[name="phone"]'); phone.required=true;phone.setAttribute('minlength','7');phone.setAttribute('maxlength','25');phone.setAttribute('pattern','[+0-9()\\s -]{7,25}');phone.setAttribute('title','Please enter a valid contact number (at least 7 digits).');phone.setAttribute('inputmode','tel');phone.setAttribute('placeholder','e.g. 09171234567');
      const address=checkout.querySelector('[name="address"]');address.minLength=10;address.maxLength=240;address.placeholder='Street, barangay, city, province';
      const submit=checkout.querySelector('button[type="submit"],button.cta');
      const previous=checkout.onsubmit;
      checkout.onsubmit=async e=>{if(!checkout.reportValidity())return;e.preventDefault();submit.disabled=true;submit.textContent='Placing demo order…';try{await previous(e)}finally{if(submit.isConnected){submit.disabled=false;submit.textContent='Place demo order'}}};
    }
    const contact=$('#contactForm');
    if(contact){const btn=contact.querySelector('button');const original=contact.onsubmit; contact.onsubmit=async e=>{e.preventDefault();btn.disabled=true;btn.textContent='Submitting…';await original(e);const output=$('#contactFeedback');if(output)output.textContent=$('#toast').textContent;btn.disabled=false;btn.textContent='Submit Message'};}
    const form=$('#subscribe');
    if(form){const email=form.querySelector('input[name="email"]');email.autocomplete='email';const btn=form.querySelector('button');const original=form.onsubmit; form.onsubmit=async e=>{e.preventDefault();if(!form.reportValidity())return;btn.disabled=true;btn.textContent='Subscribing…';await original(e);const feedback=$('#newsletterFeedback');if(feedback)feedback.textContent=$('#toast').textContent;btn.disabled=false;btn.textContent='Keep me posted'};}
  }
  function installDetail() {
    const plus=$('#qtyPlus'),minus=$('#qtyMinus');if(plus)plus.onclick=()=>{$('#qtyValue').textContent=quantity=Math.min(20,quantity+1)};
    if(minus)minus.onclick=()=>{$('#qtyValue').textContent=quantity=Math.max(1,quantity-1)};
  }
  function enhanceImages() {
    $$('#app img').forEach((image,i) => {image.decoding='async'; if(!image.closest('.hero-overlay') && !image.closest('.product-detail') && !image.classList.contains('shop-banner'))image.loading='lazy';});
  }
  function updateMetadata(){
    const route=decodeURIComponent(location.hash.slice(1)||'/');
    document.title=route.startsWith('/product/') ? `${(prod(route.split('/')[2])||{}).name||'Lip Oil'} — CEERIES Hydra Slay` : titles[route]||'CEERIES — Hydra Slay Lip Oil';
    const meta=document.querySelector('meta[name="description"]');if(meta && route.startsWith('/product/')){const p=prod(route.split('/')[2]);if(p)meta.content=`Discover ${p.name}, ${p.shade} Hydra Slay Lip Oil by CEERIES. ${p.description}`}
    else if(meta)meta.content='Discover CEERIES Hydra Slay Lip Oil, seven shades of shine for every version of you.';
  }
  render = function upgradedRender(){origRender();installShop();installTestimonials();installForms();installDetail();enhanceImages();updateMetadata();};
  // Share controls and drawer are still owned by the original storefront code.
  // The footer does not link to unverifiable social accounts.
})();
