(function(){
  async function go(){
    const input=document.getElementById('q');
    const out=document.getElementById('results');
    const resp=await fetch('/ai-podcast-site/search/search.json',{cache:'no-store'});
    const data=await resp.json();
    function esc(s){return s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
    function render(list){
      out.innerHTML=list.map(it=>`<div class="item"><a href="/ai-podcast-site/${it.rel}"><strong>${esc(it.title)}</strong></a><div class="meta">${esc(it.date||'')}${(it.tags&&it.tags.length)?' · '+it.tags.join(', '):''}</div></div>`).join('')||'<p>No results.</p>';
    }
    function search(q){
      q=q.trim().toLowerCase(); if(!q){render([]); return;}
      const terms=q.split(/\s+/);
      render(data.filter(it=>{
        const hay=(it.title+' '+(it.tags||[]).join(' ')+' '+(it.show||'')).toLowerCase();
        return terms.every(t=>hay.includes(t));
      }).slice(0,200));
    }
    input.addEventListener('input',()=>search(input.value));
    input.focus();
  }
  document.addEventListener('DOMContentLoaded',go);
})();
