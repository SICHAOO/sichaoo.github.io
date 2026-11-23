const careers = {
  pk: {
    country:'Pakistan',title:'HSE Advisor',subtitle:'Occupational safety and HSE management in mining operations.',
    insight:'Strong alignment with site-level safety work; international certification and deeper supervisory experience are the clearest next steps.',
    requirements:[
      'A relevant bachelor’s degree in safety or a related field.',
      'Relevant HSE experience in mining, resources or construction.',
      'Safe-work systems, field risk assessment, inspections and incident prevention.',
      'Incident reporting, HSE training and emergency preparedness.',
      'Strong communication, professional qualifications and growing supervisory capability.'
    ],
    priorities:[
      'Validate an internationally recognised HSE qualification (for example, NEBOSH IGC).',
      'Build supervisor-level evidence: contractor oversight, corrective-action closure and team coaching.',
      'Strengthen documented English reporting and operational leadership.'
    ],
    skills:[
      {id:'foundation',name:'Safety engineering foundation',note:'Relevant undergraduate degree reported in profile',score:100,weight:15},
      {id:'field',name:'Mining-site HSE practice',note:'Approximately two years on overseas projects',score:88,weight:25},
      {id:'prevention',name:'Risk prevention & training',note:'Inspections, procedures, emergency readiness',score:85,weight:25},
      {id:'leadership',name:'Supervisory / leadership depth',note:'Further formal line management to demonstrate',score:68,weight:15},
      {id:'certificate',name:'International HSE credentials',note:'Not yet evidenced by supplied background',score:30,weight:10},
      {id:'communication',name:'English & local coordination',note:'Cross-cultural experience; proficiency untested',score:65,weight:10}
    ]
  },
  kz: {
    country:'Kazakhstan',title:'Environmental Compliance Specialist',subtitle:'Environmental permitting, regulatory systems and responsible resource development.',
    insight:'The unusual strength is the combination of engineering, environmental-law study and industrial practice; local permitting depth and seniority remain gaps.',
    requirements:[
      'Higher education in law, regulatory affairs, environmental / safety management or engineering.',
      'Monitor and interpret legislation; prepare permits, licences and statutory filings.',
      'Maintain compliance records and support regulatory audits and inspections.',
      'Work with Kazakhstan and wider regional regulatory frameworks.',
      'Knowledge of Kazakhstan’s environmental regulations, local processes and professional communication.'
    ],
    priorities:[
      'Develop a working command of Kazakhstan’s Environmental Code, permit process and compliance documentation.',
      'Create a bilingual regulatory-monitoring and audit-trail portfolio.',
      'Accumulate longer-term regulatory ownership and senior-level responsibilities.'
    ],
    skills:[
      {id:'academic',name:'Academic discipline alignment',note:'Safety engineering + environmental-law studies in progress',score:92,weight:15},
      {id:'regulation',name:'Environmental law & permitting',note:'Relevant study and EIA coordination experience',score:70,weight:22},
      {id:'mining',name:'Mining / industrial context',note:'Practical HSE experience in the sector',score:86,weight:18},
      {id:'local',name:'Kazakhstan-specific compliance systems',note:'Further practical permit and system ownership needed',score:50,weight:15},
      {id:'seniority',name:'Depth of compliance experience',note:'Further specialist-level experience needed beyond current HSE work',score:35,weight:20},
      {id:'language',name:'Professional language & communication',note:'Russian / Kazakh competence not independently verified',score:58,weight:10}
    ]
  },
  uz: {
    country:'Uzbekistan',title:'ESG & Sustainability Specialist',subtitle:'Sustainability disclosure, environmental performance and stakeholder engagement.',
    insight:'Environmental law and ESG disclosure research provide a valuable base, but lender-standard E&S systems and local-language capability require focused development.',
    requirements:[
      'Relevant education or experience in environmental management, sustainability or a related field.',
      'Understanding of EIA, local environmental procedures and project performance.',
      'Knowledge of ESG reporting, environmental and social management systems and action plans.',
      'Stakeholder engagement and awareness of international lender frameworks such as EBRD.',
      'Effective English and Russian or Uzbek communication for regional roles.'
    ],
    priorities:[
      'Learn EBRD Performance Requirements, ESMS, ESAP and stakeholder engagement plans.',
      'Produce a mining-relevant ESG reporting sample using GRI and IFRS S1/S2.',
      'Build functional Russian / Uzbek skills and practical regional E&S experience.'
    ],
    skills:[
      {id:'eia',name:'EIA & environmental-law background',note:'Graduate-level law research and project exposure',score:83,weight:25},
      {id:'esms',name:'EBRD standards & ESMS delivery',note:'Specialised lender frameworks not evidenced',score:42,weight:20},
      {id:'stakeholders',name:'E&S stakeholder engagement',note:'Some operational coordination; limited formal E&S evidence',score:56,weight:15},
      {id:'reporting',name:'ESG and sustainability disclosure',note:'SSCI research on Kazakhstan environmental disclosure',score:72,weight:15},
      {id:'languages',name:'Local-language capability',note:'Russian / Uzbek fluency not established',score:30,weight:15},
      {id:'years',name:'Experience and sector depth',note:'Further direct ESG and E&S project experience to develop',score:48,weight:10}
    ]
  }
};

const storageKey='sichao-career-scores-v1';
let saved={};
try{saved=JSON.parse(localStorage.getItem(storageKey)||'{}')||{}}catch{saved={}}
let active='pk';
const score=(key)=>Math.round(careers[key].skills.reduce((sum,s)=>sum+Number(saved[key]?.[s.id]??s.score),0)/careers[key].skills.length);
const $=id=>document.getElementById(id);

function renderRole(key){
  active=key;
  document.querySelectorAll('.match-tab').forEach(el=>{const on=el.dataset.role===key;el.classList.toggle('active',on);el.setAttribute('aria-selected',String(on));});
  const job=careers[key];
  $('analysisTitle').textContent=job.title;
  $('analysisSubtitle').textContent=job.subtitle;
  $('scoreInsight').textContent=job.insight;
  $('requirementsList').replaceChildren(...job.requirements.map(t=>{const li=document.createElement('li');li.textContent=t;return li}));
  $('priorityList').replaceChildren(...job.priorities.map(t=>{const li=document.createElement('li');li.textContent=t;return li}));
  const rows=job.skills.map(s=>{
    const row=document.createElement('div');row.className='skill-row';
    const val=Number(saved[key]?.[s.id]??s.score);
    const label=document.createElement('label');label.className='skill-top';label.htmlFor=`skill-${key}-${s.id}`;
    const text=document.createElement('span');
    const name=document.createElement('span');name.className='skill-name';name.textContent=s.name;
    const note=document.createElement('span');note.className='skill-note';note.textContent=s.note;
    text.append(name,note);label.append(text);
    const number=document.createElement('output');number.className='skill-score';number.id=`output-${key}-${s.id}`;number.textContent=val;
    const input=document.createElement('input');input.type='range';input.min='0';input.max='100';input.step='1';input.value=String(val);input.className='skill-slider';input.id=`skill-${key}-${s.id}`;input.setAttribute('aria-label',s.name+' score out of 100');
    input.addEventListener('input',()=>{if(!saved[key])saved[key]={};saved[key][s.id]=Number(input.value);number.textContent=input.value;try{localStorage.setItem(storageKey,JSON.stringify(saved))}catch{}updateScores();});
    row.append(label,number,input);return row;
  });
  $('skillControls').replaceChildren(...rows);
  updateScores();
}

function updateScores(){
  const current=score(active);
  $('scoreValue').innerHTML=`${current}<span>%</span>`;
  $('gapValue').textContent=`${100-current} points`;
  $('scoreRing').style.setProperty('--degree',`${current*3.6}deg`);
  const bars=$('comparisonBars');bars.replaceChildren();
  for(const key of ['pk','kz','uz']){
    const s=score(key),row=document.createElement('div');row.className='comparison-row'+(key===active?' is-selected':'');
    const label=document.createElement('div');label.className='comparison-label';label.textContent=careers[key].country;
    const desc=document.createElement('small');desc.textContent=({pk:'HSE pathway',kz:'Compliance pathway',uz:'ESG pathway'})[key];label.append(desc);
    const track=document.createElement('div');track.className='comparison-track';
    const fill=document.createElement('div');fill.className='comparison-fill';fill.style.width=`${s}%`;track.append(fill);
    const val=document.createElement('span');val.className='comparison-val';val.textContent=`${s}%`;
    row.append(label,track,val);bars.append(row);
  }
}

document.querySelectorAll('[data-role]').forEach(el=>el.addEventListener('click',()=>{
  const key=el.dataset.role;if(!careers[key])return;
  renderRole(key);
  if(el.classList.contains('role-action')) $('match').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}));
$('resetScores').addEventListener('click',()=>{delete saved[active];try{localStorage.setItem(storageKey,JSON.stringify(saved))}catch{}renderRole(active)});
$('menuToggle').addEventListener('click',()=>{const expanded=$('menuToggle').getAttribute('aria-expanded')==='true';$('menuToggle').setAttribute('aria-expanded',String(!expanded));$('mobileNav').classList.toggle('open',!expanded)});
document.querySelectorAll('#mobileNav a').forEach(a=>a.addEventListener('click',()=>{$('mobileNav').classList.remove('open');$('menuToggle').setAttribute('aria-expanded','false')}));
renderRole('pk');
