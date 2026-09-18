document.addEventListener('DOMContentLoaded',()=>{
 const btn=document.getElementById('mobileMenuBtn'),drawer=document.getElementById('mobileDrawer'),icon=document.getElementById('menuIcon');
 function menu(open){drawer.classList.toggle('hidden',!open);btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');icon.className=open?'fas fa-xmark text-xl':'fas fa-bars text-xl'}
 btn.addEventListener('click',()=>menu(btn.getAttribute('aria-expanded')!=='true'));
 drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu(false)));
 matchMedia('(min-width:768px)').addEventListener('change',e=>{if(e.matches)menu(false)});
 const form=document.getElementById('leadForm'),modal=document.getElementById('successModal'),close=document.getElementById('closeModalBtn'),wa=document.getElementById('continueWhatsapp');let returnFocus;
 function dismiss(){modal.classList.add('hidden');document.body.style.overflow='';returnFocus?.focus()}
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const ids=['nombre','empresa','telefono','tipoNegocio','tamano'];const data=ids.map(id=>document.getElementById(id).value.trim());if(data.some(v=>!v)){form.querySelector('input').focus();return}const text=`Hola VELORA, quiero solicitar la prueba gratuita de aromatización de 2 días para mi negocio:\n- Nombre: ${data[0]}\n- Empresa: ${data[1]}\n- Teléfono: ${data[2]}\n- Giro: ${data[3]}\n- Espacio estimado: ${data[4]}\n\n¿Cuándo podríamos agendar la visita de instalación?`;wa.href='https://wa.me/526145989483?text='+encodeURIComponent(text);const formData=new FormData(form);fetch(form.action,{method:'POST',body:formData,headers:{'Accept':'application/json'}}).catch(()=>{});returnFocus=document.activeElement;modal.classList.remove('hidden');document.body.style.overflow='hidden';wa.focus()});
 close.addEventListener('click',dismiss);modal.addEventListener('click',e=>{if(e.target===modal)dismiss()});document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!modal.classList.contains('hidden'))dismiss();else{menu(false);btn.focus()}}if(e.key==='Tab'&&!modal.classList.contains('hidden')){if(e.shiftKey&&document.activeElement===wa){e.preventDefault();close.focus()}else if(!e.shiftKey&&document.activeElement===close){e.preventDefault();wa.focus()}}});
 document.getElementById('telefono').setAttribute('autocomplete','tel');document.getElementById('nombre').setAttribute('autocomplete','name');document.getElementById('empresa').setAttribute('autocomplete','organization');
});

// Progressive enhancement: content stays visible if motion APIs are unavailable.
document.addEventListener('DOMContentLoaded',()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const sections=[...document.querySelectorAll('main > section:not(#inicio) > div')];let observer;
 function stopReveals(){observer?.disconnect();sections.forEach(el=>el.classList.remove('reveal-ready','is-visible'))}
 if(!reduced.matches && 'IntersectionObserver' in window){
  observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:0,rootMargin:'0px 0px -35px 0px'});
  sections.forEach(el=>{el.classList.add('reveal-ready');observer.observe(el)});
 }
 const art=document.querySelector('.hero-art');if(!art)return;
 let x=0,y=0,frame=0;
 function draw(){frame=0;art.style.setProperty('--hero-rx',(-y*2.5).toFixed(2)+'deg');art.style.setProperty('--hero-ry',(x*3.5).toFixed(2)+'deg')}
 function queue(){if(!frame)frame=requestAnimationFrame(draw)}
 function reset(){x=0;y=0;art.classList.remove('is-moving');queue()}
 function move(e){if(reduced.matches || (e.pointerType==='touch' && !e.buttons))return;const r=art.getBoundingClientRect();x=Math.max(-1,Math.min(1,((e.clientX-r.left)/r.width-.5)*2));y=Math.max(-1,Math.min(1,((e.clientY-r.top)/r.height-.5)*2));art.classList.add('is-moving');queue()}
 art.addEventListener('pointermove',move,{passive:true});art.addEventListener('pointerdown',move,{passive:true});
 ['pointerleave','pointerup','pointercancel','blur'].forEach(type=>art.addEventListener(type,reset));
 art.addEventListener('keydown',e=>{if(reduced.matches)return;const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','Escape'];if(!keys.includes(e.key))return;e.preventDefault();if(e.key==='Home'||e.key==='Escape'){reset();return}art.classList.add('is-moving');if(e.key==='ArrowLeft')x=Math.max(-1,x-.25);if(e.key==='ArrowRight')x=Math.min(1,x+.25);if(e.key==='ArrowUp')y=Math.max(-1,y-.25);if(e.key==='ArrowDown')y=Math.min(1,y+.25);queue()});
 reduced.addEventListener('change',()=>{reset();if(reduced.matches)stopReveals()});
});
