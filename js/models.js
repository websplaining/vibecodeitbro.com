/* VibeCode It, Bro - Live Model List */
(function(){
'use strict';
var c=document.getElementById('models');
if(!c)return;
var g=document.getElementById('modelsGrid');
var l=document.getElementById('modelsLoading');

var M={
'minimax-m3':{n:'MiniMax M3',p:'MiniMax',t:['frontier','coding']},
'minimax-m2.7':{n:'MiniMax M2.7',p:'MiniMax',t:['coding','reasoning']},
'minimax-m2.5':{n:'MiniMax M2.5',p:'MiniMax',t:['coding','fast']},
'kimi-k3':{n:'Kimi K3',p:'Moonshot',t:['frontier','coding','reasoning']},
'kimi-k2.7-code':{n:'Kimi K2.7 Code',p:'Moonshot',t:['coding']},
'kimi-k2.6':{n:'Kimi K2.6',p:'Moonshot',t:['frontier','coding']},
'kimi-k2.5':{n:'Kimi K2.5',p:'Moonshot',t:['coding','reasoning']},
'glm-5.2':{n:'GLM-5.2',p:'Zhipu AI',t:['frontier','coding','reasoning']},
'glm-5.1':{n:'GLM-5.1',p:'Zhipu AI',t:['frontier','coding']},
'glm-5':{n:'GLM-5',p:'Zhipu AI',t:['coding','reasoning']},
'deepseek-v4-pro':{n:'DeepSeek V4 Pro',p:'DeepSeek',t:['frontier','coding','reasoning']},
'deepseek-v4-flash':{n:'DeepSeek V4 Flash',p:'DeepSeek',t:['fast','coding']},
'qwen3.7-max':{n:'Qwen3.7 Max',p:'Alibaba',t:['frontier','coding','reasoning']},
'qwen3.8-max':{n:'Qwen3.8 Max',p:'Alibaba',t:['frontier','coding','reasoning']},
'qwen3.7-plus':{n:'Qwen3.7 Plus',p:'Alibaba',t:['coding','reasoning']},
'qwen3.6-plus':{n:'Qwen3.6 Plus',p:'Alibaba',t:['coding','fast']},
'qwen3.5-plus':{n:'Qwen3.5 Plus',p:'Alibaba',t:['coding','fast']},
'mimo-v2-pro':{n:'MiMo-V2 Pro',p:'MiMo',t:['coding','reasoning']},
'mimo-v2-omni':{n:'MiMo-V2 Omni',p:'MiMo',t:['vision','coding']},
'mimo-v2.5-pro':{n:'MiMo-V2.5 Pro',p:'MiMo',t:['frontier','coding']},
'mimo-v2.5':{n:'MiMo-V2.5',p:'MiMo',t:['coding','fast']},
'hy3':{n:'Hy3',p:'',t:['coding','fast']},
'hy3-preview':{n:'Hy3 Preview',p:'',t:['coding','fast']},
'gpt-5.6-luna':{n:'GPT 5.6 Luna',p:'OpenAI',t:['frontier','coding','reasoning']},
'grok-4.5':{n:'Grok 4.5',p:'xAI',t:['frontier','coding','reasoning']}
};

var F=['minimax-m3','minimax-m2.7','minimax-m2.5','kimi-k3','kimi-k2.7-code','kimi-k2.6','kimi-k2.5','glm-5.2','glm-5.1','glm-5','deepseek-v4-pro','deepseek-v4-flash','qwen3.7-max','qwen3.8-max','qwen3.7-plus','qwen3.6-plus','qwen3.5-plus','mimo-v2-pro','mimo-v2-omni','mimo-v2.5-pro','mimo-v2.5','hy3','hy3-preview','gpt-5.6-luna','grok-4.5'];

var cur=F,fb=false,note=null;

function t(k){
var d=window.I18N&&window.I18N[(document.documentElement.lang||'en').split('-')[0]];
if(!d)d=window.I18N&&window.I18N.en;
return(d||{})[k]||k;
}

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

function render(){
var ids=cur.slice().sort(function(a,b){return(M[a]?M[a].n:a).toLowerCase()<(M[b]?M[b].n:b).toLowerCase()?-1:1;});
g.innerHTML='';
ids.forEach(function(id){
var m=M[id]||{n:id,p:'',t:[]};
var e=document.createElement('div');
e.className='ml';
e.innerHTML='<div class="ml__n">'+esc(m.n)+'</div>'+(m.p?'<div class="ml__p">'+esc(m.p)+'</div>':'')+'<div class="ml__t">'+m.t.map(function(tg){return'<span class="ml__tg">'+t('models.'+tg)+'</span>';}).join('')+'</div>';
g.appendChild(e);
});
if(fb&&!note){
note=document.createElement('div');
note.className='mo__note';
g.parentNode.insertBefore(note,g);
}
if(note)note.textContent=t('models.fallback');
if(l)l.hidden=true;g.hidden=false;c.setAttribute('aria-busy','false');
}

var x=new XMLHttpRequest();
x.timeout=8000;
x.open('GET','/api/go/models',true);
x.onload=function(){
if(x.status!==200){fb=true;render();return;}
try{
var d=JSON.parse(x.responseText);
var ids=(d.data||[]).map(function(m){return m.id;}).filter(Boolean);
if(ids.length){cur=ids;fb=false;}else{fb=true;}
}catch(e){fb=true;}
render();
};
x.onerror=function(){fb=true;render();};
x.ontimeout=function(){fb=true;render();};
x.send();

window.ModelsGo={render:render};
})();
