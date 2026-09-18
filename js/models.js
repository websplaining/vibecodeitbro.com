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
'grok-4.5':{n:'Grok 4.5',p:'xAI',t:['frontier','coding','reasoning']},
'grok-4.6':{n:'Grok 4.6',p:'xAI',t:['frontier','coding','reasoning']},
'glm-5.3':{n:'GLM-5.3',p:'Zhipu AI',t:['frontier','coding','reasoning']},
'glm-5.3-flash':{n:'GLM-5.3 Flash',p:'Zhipu AI',t:['fast','coding']},
'deepseek-flash':{n:'DeepSeek Flash',p:'DeepSeek',t:['fast','coding']},
'deepseek-v4.1-flash':{n:'DeepSeek V4.1 Flash',p:'DeepSeek',t:['fast','coding']},
'deepseek-v4-flash-vision-exp':{n:'DeepSeek V4 Flash Vision Exp',p:'DeepSeek',t:['vision','fast','coding']},
'qwen3.8-flash':{n:'Qwen3.8 Flash',p:'Alibaba',t:['fast','coding']},
'longcat-2.0':{n:'LongCat 2.0',p:'LongCat',t:['coding','reasoning']},
'hy4-preview':{n:'Hy4 Preview',p:'',t:['coding','fast']},
'muse-spark-1.3-contributor':{n:'Muse Spark 1.3 Contributor',p:'',t:['coding','fast']},
'muse-spark-1.2-contributor':{n:'Muse Spark 1.2 Contributor',p:'',t:['coding','fast']},
'omen-alpha':{n:'Omen Alpha',p:'',t:['coding','reasoning']}
};

var F=['minimax-m3','minimax-m2.7','minimax-m2.5','kimi-k3','kimi-k2.7-code','kimi-k2.6','kimi-k2.5','glm-5.2','glm-5.3','glm-5.3-flash','glm-5.1','glm-5','deepseek-v4-pro','deepseek-v4-flash','deepseek-flash','deepseek-v4.1-flash','deepseek-v4-flash-vision-exp','qwen3.7-max','qwen3.8-max','qwen3.8-flash','qwen3.7-plus','qwen3.6-plus','qwen3.5-plus','mimo-v2-pro','mimo-v2-omni','mimo-v2.5-pro','mimo-v2.5','longcat-2.0','hy4-preview','hy3','hy3-preview','muse-spark-1.3-contributor','muse-spark-1.2-contributor','gpt-5.6-luna','grok-4.5','grok-4.6','omen-alpha'];

var cur=F,fb=false,note=null;

function t(k){
var d=window.I18N&&window.I18N[(document.documentElement.lang||'en').split('-')[0]];
if(!d)d=window.I18N&&window.I18N.en;
return(d||{})[k]||k;
}

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

function derive(id){
var s=String(id).toLowerCase();
var pfx=[['minimax','MiniMax'],['deepseek','DeepSeek'],['longcat','LongCat'],['muse',''],['omen',''],['kimi','Moonshot'],['glm','Zhipu AI'],['qwen','Alibaba'],['mimo','MiMo'],['gpt','OpenAI'],['grok','xAI'],['hy','']];
var p='';
for(var i=0;i<pfx.length;i++){if(s.indexOf(pfx[i][0])===0){p=pfx[i][1];break;}}
var cap={minimax:'MiniMax',deepseek:'DeepSeek',kimi:'Kimi',glm:'GLM',qwen:'Qwen',mimo:'MiMo',gpt:'GPT',grok:'Grok',longcat:'LongCat',muse:'Muse',omen:'Omen',hy:'Hy',ai:'AI',vl:'VL',pro:'Pro',omni:'Omni'};
var n=String(id).split('-').map(function(w){return cap[w.toLowerCase()]||w.charAt(0).toUpperCase()+w.slice(1);}).join(' ');
var t=[];
if(/pro|max|ultra|opus|frontier/.test(s))t.push('frontier');
if(/code|coder/.test(s))t.push('coding');
if(/reason|think/.test(s))t.push('reasoning');
if(/flash|mini|fast|lite|small|turbo/.test(s))t.push('fast');
if(/vision|omni|vl/.test(s))t.push('vision');
if(!t.length)t.push('coding');
return{n:n,p:p,t:t};
}

function render(){
var ids=cur.slice().sort(function(a,b){return(M[a]?M[a].n:a).toLowerCase()<(M[b]?M[b].n:b).toLowerCase()?-1:1;});
g.innerHTML='';
ids.forEach(function(id){
var m=M[id]||derive(id);
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
