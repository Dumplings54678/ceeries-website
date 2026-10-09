/* Final QA enhancements: native zoom, keyboard access, and demo clarity. */
(() => {
  'use strict';
  const previousRender = render;
  render = function auditedRender(){
    previousRender();
    const photo=document.querySelector('.detail-photo img');
    if (photo && !photo.closest('.photo-zoom-button')) {
      const button=document.createElement('button');
      button.type='button';button.className='photo-zoom-button';
      button.setAttribute('aria-label','Enlarge this lip oil photograph');
      photo.parentNode.insertBefore(button,photo);button.appendChild(photo);
      const tip=document.createElement('span');tip.className='zoom-hint';tip.setAttribute('aria-hidden','true');tip.textContent='⤢  Enlarge image';button.appendChild(tip);
      button.onclick=()=>{
        const box=document.getElementById('lightbox');
        box.hidden=false;box.innerHTML='';
        const close=document.createElement('button');close.type='button';close.id='lightboxClose';close.className='lb-close';close.setAttribute('aria-label','Close photograph');close.textContent='×';
        const large=document.createElement('img');large.className='product-photo-zoom';large.src=photo.src;large.alt=photo.alt;
        box.append(close,large);close.onclick=()=>closeLightbox();
        document.body.classList.add('dialog-open');close.focus();
      };
    }
    const contact=document.getElementById('contactForm');
    if(contact && !document.getElementById('contactDemoNote')){
      const p=document.createElement('p');p.id='contactDemoNote';p.className='notice full';p.textContent='Classroom demonstration only. This form checks your entries but does not send messages. Please use example contact details.';
      contact.appendChild(p);
    }
    const sub=document.getElementById('subscribe');
    if(sub && !document.getElementById('subscriptionDemoNote')){
      const p=document.createElement('p');p.id='subscriptionDemoNote';p.className='notice';p.textContent='This is a newsletter design preview; no emails are sent.';sub.appendChild(p);
    }
  };
  window.addEventListener('keydown',event=>{
    if((event.key==='ArrowRight'||event.key==='ArrowLeft') && !document.getElementById('lightbox').hidden && document.querySelector('#lightbox .product-photo-zoom')){
      event.stopImmediatePropagation();
    }
  },true);
  // Unverified social profiles instead open the functioning CEERIES contact page.
  document.querySelectorAll('.footer .social a').forEach(a=>{
    a.setAttribute('title','Visit CEERIES contact page for official social media details');
  });
})();
