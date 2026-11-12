(()=>{
 const player=document.getElementById('youtube-player');
 const selected=new URLSearchParams(location.search).get('v');
 let current=selected&&/^[\w-]{11}$/.test(selected)?selected:null;
 const playlist='UUQO8t8e6CEdq6JqzshZnlvA';
 function play(id,title,autoplay=false){
  if(!player)return;
  player.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id)+'?list='+playlist+'&rel=0'+(autoplay?'&autoplay=1':'');
  if(title)document.getElementById('youtube-now-title').textContent=title;
  else document.getElementById('youtube-now-title').textContent='Xavier en video';
  document.getElementById('youtube-original').href='https://www.youtube.com/watch?v='+id;
  current=id;
 }
 if(current)play(current,null);
 function card(video){
  const a=document.createElement('a');a.className='xs-video-card';a.href='videos.html?v='+video.id;
  const thumb=document.createElement('div');thumb.className='xs-video-thumb';
  const img=document.createElement('img');img.src='https://i.ytimg.com/vi/'+video.id+'/hqdefault.jpg';img.alt='';img.loading='lazy';img.width=480;img.height=360;
  const icon=document.createElement('span');icon.className='xs-video-play';icon.setAttribute('aria-hidden','true');icon.textContent='▶';thumb.append(img,icon);
  const body=document.createElement('div');body.className='xs-video-copy';
  const date=document.createElement('small');date.textContent=new Intl.DateTimeFormat('es',{day:'numeric',month:'short',year:'numeric'}).format(new Date(video.published));
  const title=document.createElement('h3');title.textContent=video.title;
  const link=document.createElement('span');link.textContent='Ver video →';body.append(date,title,link);a.append(thumb,body);
  if(player)a.addEventListener('click',event=>{event.preventDefault();play(video.id,video.title,true);history.replaceState(null,'','videos.html?v='+video.id);player.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'center'});});
  return a;
 }
 fetch('assets/youtube-videos.json', {cache:'no-store'}).then(r=>{if(!r.ok)throw Error('unavailable');return r.json()}).then(data=>{
  if(!Array.isArray(data.videos)||!data.videos.length)throw Error('empty');
  document.querySelectorAll('[data-youtube-videos]').forEach(grid=>grid.replaceChildren(...data.videos.slice(0,Number(grid.dataset.limit)||15).map(card)));
  if(player){const active=data.videos.find(v=>v.id===current);if(active)document.getElementById('youtube-now-title').textContent=active.title;else if(!current)play(data.videos[0].id,data.videos[0].title);}
  if(data.source==='snapshot')document.querySelectorAll('[data-youtube-status]').forEach(el=>{el.textContent='Puedes consultar las últimas publicaciones directamente en el canal de YouTube.';el.hidden=false;});
 }).catch(()=>document.querySelectorAll('[data-youtube-status]').forEach(el=>{el.textContent='Puedes consultar las últimas publicaciones directamente en el canal de YouTube.';el.hidden=false;}));
 // Keep the initial cards usable if a live update is unavailable.
 if(player)document.querySelectorAll('[data-youtube-videos] .xs-video-card').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const id=new URL(a.href).searchParams.get('v');play(id,a.querySelector('h3').textContent,true);history.replaceState(null,'','videos.html?v='+id);player.scrollIntoView({behavior:'smooth',block:'center'});}));
})();
