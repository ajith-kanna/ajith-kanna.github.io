(function(){
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const sunSvgPath = "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z";
  const moonSvgPath = "M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z";

  function updateThemeIcon(theme) { themeIcon.querySelector('path').setAttribute('d', theme === 'light' ? sunSvgPath : moonSvgPath); }

  const savedTheme = localStorage.getItem('portfolio_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('portfolio_theme', currentTheme);
    updateThemeIcon(currentTheme);
  });

  /* =========================================================
     CONTENT DATA
     Edit the arrays below to update page content.
     No HTML editing needed for any of these sections.
  ========================================================= */
  const metricsData = [
    { value: '3+', label: 'Years Experience' },
    // { value: '168+', label: 'Enterprise Users' },
    // { value: '60%', label: 'Render Drop' }
  ];

  const skillGroupsData = [
    { title: 'Interface (Frontend)', tags: ['React.js', 'Next.js', 'Tailwind CSS', 'Ant Design'] },
    { title: 'Mainframe (Backend)', tags: ['Node.js', 'Express.js', 'TypeScript', 'REST APIs'] },
    { title: 'Data &amp; Cloud', tags: ['MySQL', 'MongoDB', 'AWS', 'Git'] }
  ];

  const timelineData = [
    {
      role: 'Software Developer',
      company: 'DocMe // 2024 - Present',
      points: ['Developing scalable HRMS features.', 'Improving user experience and workflows.', 'Fixing production level bugs.']
    },
    {
      role: 'Software Trainee',
      company: 'CRUD Operations // 2023 - 2024',
      points: ['Helped students understand web development.', 'Built responsive frontend components.']
    }
  ];

  const projectsData = [
    { image: 'Image // 01', title: 'E-Learning Platform', subtitle: 'Course Management', tags: ['React', 'Tailwind', 'MongoDB', "Node", "Express"], link: 'https://e-learning-web-frontend.vercel.app/' },
  ];

  const contactLinksData = [
    { label: 'Email', href: 'mailto:ajith.kanna.dev@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/ajith-kanna', external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ajithkanna-reactdeveloper', external: true }
  ];

  /* ---- Render functions: turn the data above into markup ---- */
  function renderMetrics(){
    const el = document.getElementById('metrics-grid');
    if (!el) return;
    el.innerHTML = metricsData.map(m => `
      <div class="metric-card">
        <span class="metric-value">${m.value}</span>
        <span class="metric-label">${m.label}</span>
      </div>`).join('');
  }

  function renderSkillGroups(){
    const el = document.getElementById('skills-groups');
    if (!el) return;
    el.innerHTML = skillGroupsData.map((g, i) => `
      <div class="skill-group"${i === skillGroupsData.length - 1 ? ' style="margin-bottom:0;"' : ''}>
        <div class="skill-group-title">${g.title}</div>
        <div class="skill-tags">${g.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>`).join('');
  }

  function renderTimeline(){
    const el = document.getElementById('timeline');
    if (!el) return;
    el.innerHTML = timelineData.map(item => `
      <div class="timeline-item">
        <div class="timeline-node"></div>
        <div class="timeline-content">
          <h2>${item.role}</h2>
          <div class="role-subtitle">${item.company}</div>
          <ul class="exp-list">${item.points.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>
      </div>`).join('');
  }

  function renderProjects(){
    const el = document.getElementById('project-grid');
    if (!el) return;
    el.innerHTML = projectsData.map(p => `
      <div class="glass-card project-card">
        <div class="project-img-wrapper">${p.image}</div>
        <h2>${p.title}</h2>
        <div class="role-subtitle">${p.subtitle}</div>
        <div class="skill-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <a href="${p.link}" class="contact-btn">View Live Project</a>
      </div>`).join('');
  }

  function renderContactLinks(){
    const el = document.getElementById('footer-links');
    if (!el) return;
    el.innerHTML = contactLinksData.map(c =>
      `<a href="${c.href}"${c.external ? ' target="_blank" rel="noopener"' : ''} class="contact-btn">${c.label}</a>`
    ).join('');
  }

  renderMetrics();
  renderSkillGroups();
  renderTimeline();
  renderProjects();
  renderContactLinks();

  function create3DCube(id, w, h, d, themeClass){
    const cube = document.createElement('div');
    cube.id = id; cube.className = `cube ${themeClass}`;
    cube.style.width = w + 'px'; cube.style.height = h + 'px';
    cube.style.marginLeft = (-w/2) + 'px'; cube.style.marginTop = (-h/2) + 'px';
    if (themeClass === 'theme-red') return cube;
    const faces = [
      {name:'front', w:w, h:h, ml:-w/2, mt:-h/2, t:`translateZ(${d/2}px)`},
      {name:'back',  w:w, h:h, ml:-w/2, mt:-h/2, t:`rotateY(180deg) translateZ(${d/2}px)`},
      {name:'right', w:d, h:h, ml:-d/2, mt:-h/2, t:`rotateY(90deg) translateZ(${w/2}px)`},
      {name:'left',  w:d, h:h, ml:-d/2, mt:-h/2, t:`rotateY(-90deg) translateZ(${w/2}px)`},
      {name:'top',   w:w, h:d, ml:-w/2, mt:-d/2, t:`rotateX(90deg) translateZ(${h/2}px)`},
      {name:'bottom',w:w, h:d, ml:-w/2, mt:-d/2, t:`rotateX(-90deg) translateZ(${h/2}px)`}
    ];
    const frag = document.createDocumentFragment();
    faces.forEach(f=>{
      const face = document.createElement('div'); face.className = `face ${f.name}`;
      face.style.cssText = `width:${f.w}px;height:${f.h}px;left:50%;top:50%;margin-left:${f.ml}px;margin-top:${f.mt}px;transform:${f.t};`;
      frag.appendChild(face);
    });
    cube.appendChild(frag); return cube;
  }

  /* ---- Adjusted Robot Joint Coordinates ---- */
  const partsData = [
    {id:'head-part', w:90,h:70,d:75, theme:'theme-white', target:{x:0,y:-120,z:10,rx:0,ry:0,rz:0}, start:{x:0,y:-800,z:500,rx:360,ry:720,rz:0}},
    {id:'neck', w:30,h:20,d:30, theme:'theme-grey', target:{x:0,y:-75,z:5,rx:0,ry:0,rz:0}, start:{x:200,y:-600,z:-400,rx:180,ry:90,rz:90}},
    {id:'ant-stick', w:6,h:30,d:6, theme:'theme-grey', target:{x:0,y:-170,z:0,rx:0,ry:0,rz:0}, start:{x:0,y:-400,z:300,rx:180,ry:360,rz:0}},
    {id:'ant-tip', w:16,h:16,d:16, theme:'theme-red', target:{x:0,y:-185,z:4,rx:0,ry:0,rz:0}, start:{x:0,y:-500,z:400,rx:0,ry:0,rz:0}},
    {id:'torso-part', w:96,h:90,d:70, theme:'theme-white', target:{x:0,y:-20,z:0,rx:0,ry:0,rz:0}, start:{x:-500,y:300,z:-600,rx:90,ry:180,rz:-90}},
    {id:'pelvis', w:60,h:30,d:50, theme:'theme-grey', target:{x:0,y:40,z:0,rx:0,ry:0,rz:0}, start:{x:400,y:600,z:200,rx:-90,ry:-180,rz:90}},
    {id:'shoulder-l', w:25,h:25,d:25, theme:'theme-grey', target:{x:-60,y:-30,z:0,rx:0,ry:0,rz:0}, start:{x:-800,y:100,z:300,rx:360,ry:180,rz:0}},
    {id:'arm-l', w:25,h:65,d:25, theme:'theme-white', target:{x:-68,y:14,z:0,rx:0,ry:0,rz:15}, start:{x:-900,y:400,z:-300,rx:-180,ry:-90,rz:180}},
    {id:'hand-l', w:20,h:20,d:25, theme:'theme-grey', target:{x:-79,y:55,z:0,rx:0,ry:0,rz:15}, start:{x:-1000,y:600,z:-100,rx:90,ry:90,rz:90}},
    {id:'shoulder-r', w:25,h:25,d:25, theme:'theme-grey', target:{x:60,y:-30,z:0,rx:0,ry:0,rz:0}, start:{x:800,y:100,z:300,rx:-360,ry:-180,rz:0}},
    {id:'arm-r', w:25,h:65,d:25, theme:'theme-white', target:{x:68,y:14,z:0,rx:0,ry:0,rz:-15}, start:{x:900,y:400,z:-300,rx:180,ry:90,rz:-180}},
    {id:'hand-r', w:20,h:20,d:25, theme:'theme-grey', target:{x:79,y:55,z:0,rx:0,ry:0,rz:-15}, start:{x:-1000,y:600,z:-100,rx:-90,ry:-90,rz:-90}},
    {id:'hip-l', w:25,h:25,d:25, theme:'theme-grey', target:{x:-25,y:65,z:0,rx:0,ry:0,rz:0}, start:{x:-300,y:800,z:600,rx:180,ry:270,rz:90}},
    {id:'leg-l', w:35,h:70,d:35, theme:'theme-white', target:{x:-25,y:115,z:0,rx:0,ry:0,rz:0}, start:{x:-500,y:1000,z:-400,rx:-180,ry:-270,rz:-90}},
    {id:'foot-l', w:45,h:18,d:60, theme:'theme-grey', target:{x:-25,y:155,z:10,rx:0,ry:0,rz:0}, start:{x:-600,y:1200,z:200,rx:90,ry:0,rz:180}},
    {id:'hip-r', w:25,h:25,d:25, theme:'theme-grey', target:{x:25,y:65,z:0,rx:0,ry:0,rz:0}, start:{x:300,y:800,z:600,rx:-180,ry:-270,rz:-90}},
    {id:'leg-r', w:35,h:70,d:35, theme:'theme-white', target:{x:25,y:115,z:0,rx:0,ry:0,rz:0}, start:{x:500,y:1000,z:-400,rx:180,ry:270,rz:90}},
    {id:'foot-r', w:45,h:18,d:60, theme:'theme-grey', target:{x:25,y:155,z:10,rx:0,ry:0,rz:0}, start:{x:-600,y:1200,z:200,rx:-90,ry:0,rz:-180}}
  ];

  /* ---- Arc Reactor Docking Coordinates ---- */
  const coreData = [
    {id:'core-1', w:200, h:200, start:{x:-1200, y:-600, z:800, rx:360, ry:180, rz:90}, mission:{x:-100, y:-100, z:0, rx:0, ry:0, rz:0}, final:{x:-12, y:-32, z:36, rx:0, ry:0, rz:0}},
    {id:'core-2', w:200, h:200, start:{x:1200, y:-800, z:-400, rx:-360, ry:90, rz:-90}, mission:{x:100, y:-100, z:0, rx:0, ry:0, rz:0}, final:{x:12, y:-32, z:36, rx:0, ry:0, rz:0}}, 
    {id:'core-3', w:200, h:200, start:{x:900, y:900, z:800, rx:180, ry:-180, rz:270}, mission:{x:100, y:100, z:0, rx:0, ry:0, rz:0}, final:{x:12, y:-8, z:36, rx:0, ry:0, rz:0}}, 
    {id:'core-4', w:200, h:200, start:{x:-900, y:1200, z:-600, rx:-180, ry:-270, rz:-180}, mission:{x:-100, y:100, z:0, rx:0, ry:0, rz:0}, final:{x:-12, y:-8, z:36, rx:0, ry:0, rz:0}} 
  ];

  const world = document.getElementById('world');
  const shadow = document.getElementById('floor-shadow');
  const frag = document.createDocumentFragment();
  
  const activeParts = partsData.map(data=>{
    const el = create3DCube(data.id, data.w, data.h, data.d, data.theme);
    frag.appendChild(el); return {element:el, start:data.start, target:data.target};
  });
  
  const numLayers = 10; 
  const coreElements = coreData.map(data => {
    const wrapper = document.createElement('div');
    wrapper.className = 'core-segment-wrapper';
    wrapper.style.width = data.w + 'px';
    wrapper.style.height = data.h + 'px';
    wrapper.style.position = 'absolute';
    wrapper.style.top = '50%';
    wrapper.style.left = '50%';
    wrapper.style.marginLeft = (-data.w/2) + 'px';
    wrapper.style.marginTop = (-data.h/2) + 'px';
    wrapper.style.transformStyle = 'preserve-3d';
    wrapper.style.willChange = 'transform';
    
    const layers = [];
    
    for(let i=0; i<numLayers; i++) {
        const layerMask = document.createElement('div');
        layerMask.className = 'core-layer-mask';
        layerMask.style.width = '100%';
        layerMask.style.height = '100%';
        layerMask.style.position = 'absolute';
        layerMask.style.overflow = 'hidden'; 
        
        const arc = document.createElement('div');
        arc.style.width = '400px';
        arc.style.height = '400px';
        arc.style.borderRadius = '50%';
        arc.style.position = 'absolute';
        arc.style.boxSizing = 'border-box';
        
        if (data.id === 'core-1') { arc.style.top = '0'; arc.style.left = '0'; }
        if (data.id === 'core-2') { arc.style.top = '0'; arc.style.left = '-200px'; }
        if (data.id === 'core-3') { arc.style.top = '-200px'; arc.style.left = '-200px'; }
        if (data.id === 'core-4') { arc.style.top = '-200px'; arc.style.left = '0'; }

        const isOuterFace = (i === 0 || i === numLayers - 1);
        const borderColor = isOuterFace ? 'var(--neon-base)' : 'var(--neon-shade)';
        arc.style.border = `40px solid ${borderColor}`;

        if(isOuterFace) {
            layerMask.style.filter = 'drop-shadow(0 0 10px var(--neon-glow)) drop-shadow(0 0 20px var(--neon-glow))';
        }

        layerMask.appendChild(arc);
        wrapper.appendChild(layerMask);
        layers.push({ layer: layerMask, arc: arc });
    }

    frag.appendChild(wrapper);
    return { element: wrapper, layers: layers, data: data };
  });

  world.appendChild(frag);
  if (shadow) world.appendChild(shadow);

  const headPartDiv = document.getElementById('head-part');
  if (headPartDiv){
    const frontFace = headPartDiv.querySelector('.face.front');
    if (frontFace){
      frontFace.innerHTML = `
        <div class="eyes-row">
          <div class="robot-eye left-eye"></div>
          <div class="robot-eye right-eye"></div>
        </div>
        <div class="robot-mouth"></div>`;
    }
  }

  const droneWrapper = document.getElementById('companion-drone-wrapper');
  const holoCard = document.getElementById('hologram-skills-card');
  const holoBeam = document.getElementById('holo-beam');
  const skillsSection = document.getElementById('skills-section');
  const expSection = document.getElementById('exp-section');
  const projectsSection = document.getElementById('projects-section');
  const contactSection = document.getElementById('contact-section');
  const headEl = document.getElementById('head-part');
  const viewportEl = document.getElementById('viewport');
  const allSections = document.querySelectorAll('main > section');
  const robotEyeMouthEls = document.querySelectorAll('.robot-eye, .robot-mouth');
  const droneBodyEl = droneWrapper.querySelector('.drone-body-3d');
  const droneEyesSlotEl = droneWrapper.querySelector('.drone-eyes-slot');
  const halfLayerSpan = (numLayers - 1) / 2;

  let vW = window.innerWidth, vH = window.innerHeight;
  let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;
  let maxScroll = Math.max(document.documentElement.scrollHeight - vH, 1);

  function recalcMetrics(){
    vW = window.innerWidth; vH = window.innerHeight;
    maxScroll = Math.max(document.documentElement.scrollHeight - vH, 1);
  }

  window.addEventListener('mousemove', (e)=>{
    targetMouseX = (e.clientX / vW) * 2 - 1;
    targetMouseY = (e.clientY / vH) * 2 - 1;
  }, {passive:true});

  let resizeTimer;
  window.addEventListener('resize', ()=>{
    clearTimeout(resizeTimer); resizeTimer = setTimeout(recalcMetrics, 120);
  }, {passive:true});

  const lerp = (a,b,f)=> a + (b - a) * f;

  function render(){
    mouseX = lerp(mouseX, targetMouseX, 0.05);
    mouseY = lerp(mouseY, targetMouseY, 0.05);

    const skillsTop = skillsSection.getBoundingClientRect().top;
    const expTop = expSection.getBoundingClientRect().top;
    const projectsTop = projectsSection.getBoundingClientRect().top;
    const contactTop = contactSection.getBoundingClientRect().top;

    const entryProgress = Math.max(0, Math.min(1, (vH - skillsTop) / vH));
    const droneTravel = Math.min(1, entryProgress / 0.45);
    const holoReveal = Math.max(0, (entryProgress - 0.45) / 0.45);

    const exitProgress = Math.max(0, Math.min(1, (expTop - vH * 0.35) / (vH * 0.65)));
    const transitionToSec3 = 1 - exitProgress;
    
    const holoHideProgress = Math.min(1, transitionToSec3 / 0.5);
    const droneHideProgress = Math.max(0, (transitionToSec3 - 0.5) / 0.5);

    const droneX = lerp(vW - 200, vW / 2 - 55, droneTravel);
    const droneY = lerp(vH * 0.05, vH * 0.12, entryProgress);
    
    let droneScale = lerp(0.85, 1.05, droneTravel) * lerp(1, 0, droneHideProgress);
    const t = performance.now() * 0.001;
    const wanderFade = Math.max(0, 1 - entryProgress / 0.15);
    let droneOffsetX = 0, droneOffsetY = 0;
    
    if (wanderFade > 0){
      droneOffsetX = (Math.sin(t * 0.27) * 0.6 + Math.sin(t * 0.13 + 1.7) * 0.4) * 100 * wanderFade;
      droneOffsetY = (Math.cos(t * 0.19) * 0.5 + Math.sin(t * 0.31 + 0.9) * 0.5) * 60 * wanderFade;
      droneScale *= lerp(1, 0.6, wanderFade);
    }
    
    droneWrapper.style.transform = `translate3d(${droneX + droneOffsetX}px, ${droneY + droneOffsetY}px, 0) scale(${droneScale})`;
    droneWrapper.style.filter = wanderFade > 0 ? `blur(${(wanderFade * 2.2).toFixed(2)}px)` : '';
    droneWrapper.style.opacity = (Math.max(0, 1 - droneHideProgress * 1.2) * lerp(1, 0.68, wanderFade)).toFixed(3);

    if (droneBodyEl) {
      droneBodyEl.style.borderRadius = droneHideProgress > 0 ? `${lerp(24, 50, Math.min(1, droneHideProgress * 2))}%` : '24px';
      if (droneEyesSlotEl) droneEyesSlotEl.style.opacity = Math.max(0, 1 - droneHideProgress * 2).toFixed(2);
    }

    const beamScaleY = lerp(0, vH * 0.22 / 260, holoReveal) * (1 - holoHideProgress);
    holoBeam.style.transform = `translate3d(${droneX + droneOffsetX + 15}px, ${droneY + droneOffsetY + 70 * droneScale}px, 0) scaleY(${beamScaleY})`;
    holoBeam.style.opacity = (holoReveal * (1 - holoHideProgress)).toFixed(3);

    const currentHoloYOffset = lerp(lerp(-30, 0, holoReveal), -150, holoHideProgress);
    const cardScale = lerp(0.7, 1, holoReveal) * lerp(1, 0, holoHideProgress);
    
    holoCard.style.transform = `translate(-50%, ${currentHoloYOffset}px) scale(${cardScale})`;
    holoCard.style.opacity = (holoReveal * Math.max(0, 1 - holoHideProgress * 1.2)).toFixed(3);
    holoCard.style.borderRadius = holoHideProgress > 0 ? `${lerp(16, 50, Math.min(1, holoHideProgress * 2))}%` : '16px';

    const projectsAbsoluteTop = window.scrollY + projectsTop;
    const targetAssemblyScroll = Math.max(1, projectsAbsoluteTop - (vH * 0.2));
    const assemblyProgress = Math.min(Math.max(window.scrollY / targetAssemblyScroll, 0), 1);
    const isFullyAssembled = assemblyProgress >= 1;

    for (let i = 0; i < robotEyeMouthEls.length; i++){
      isFullyAssembled ? robotEyeMouthEls[i].classList.add('assembled') : robotEyeMouthEls[i].classList.remove('assembled');
    }

    const viewportCenter = vH / 2;
    const fadeZone = vH * 0.15;
    const sectionRects = [];
    for (let i = 0; i < allSections.length; i++) sectionRects.push(allSections[i].getBoundingClientRect());
    for (let i = 0; i < allSections.length; i++){
      const rect = sectionRects[i];
      const sectionCenter = rect.top + rect.height / 2;
      let sectionOpacity = 1;

      if (rect.top > vH - fadeZone) sectionOpacity = (vH - rect.top) / fadeZone;
      else if (rect.bottom < fadeZone) sectionOpacity = rect.bottom / fadeZone;

      allSections[i].style.opacity = Math.max(0, Math.min(1, sectionOpacity)).toFixed(3);
      allSections[i].style.transform = `translateY(${((sectionCenter - viewportCenter) * 0.04).toFixed(1)}px)`;
    }

    const zoomProgress = Math.min(Math.max((vH * 0.85 - contactTop) / (vH * 0.85), 0), 1);

    for (let i = 0; i < activeParts.length; i++){
      const part = activeParts[i], s = part.start, t = part.target;
      part.element.style.transform =
        `translate3d(${lerp(s.x,t.x,assemblyProgress)}px, ${lerp(s.y,t.y,assemblyProgress)}px, ${lerp(s.z,t.z,assemblyProgress)}px) `+
        `rotateX(${lerp(s.rx,t.rx||0,assemblyProgress)}deg) rotateY(${lerp(s.ry,t.ry||0,assemblyProgress)}deg) rotateZ(${lerp(s.rz,t.rz||0,assemblyProgress)}deg)`;
    }

    let p1 = Math.min(Math.max(assemblyProgress / 0.4, 0), 1); 
    let p2 = Math.min(Math.max((assemblyProgress - 0.8) / 0.2, 0), 1); 

    coreElements.forEach(core => {
      const d = core.data;
      
      let currentX = lerp(lerp(d.start.x, d.mission.x, p1), d.final.x, p2);
      let currentY = lerp(lerp(d.start.y, d.mission.y, p1), d.final.y, p2);
      let currentZ = lerp(lerp(d.start.z, d.mission.z, p1), d.final.z, p2);
      
      let currentRX = lerp(lerp(d.start.rx, d.mission.rx, p1), d.final.rx, p2);
      let currentRY = lerp(lerp(d.start.ry, d.mission.ry, p1), d.final.ry, p2);
      let currentRZ = lerp(lerp(d.start.rz, d.mission.rz, p1), d.final.rz, p2);

      let currentScale = lerp(1, 0.12, p2); 
      let currentBw = lerp(40, 200, p2); 
      let currentSpread = lerp(6, 1, p2); 

      core.element.style.transform = `translate3d(${currentX}px, ${currentY}px, ${currentZ}px) rotateX(${currentRX}deg) rotateY(${currentRY}deg) rotateZ(${currentRZ}deg) scale(${currentScale})`;
      
      for (let li = 0; li < core.layers.length; li++){
        const item = core.layers[li];
        item.arc.style.borderWidth = currentBw + 'px';
        const zOffset = (li - halfLayerSpan) * currentSpread;
        item.layer.style.transform = `translateZ(${zOffset}px)`;
      }
    });

    if (headEl && assemblyProgress > 0.7) headEl.style.transform += ` rotateY(${mouseX * 25}deg) rotateX(${-mouseY * 20}deg)`;

    viewportEl.style.paddingRight = `${lerp(26, 50, zoomProgress)}vw`;
    world.style.transform = `translateY(${lerp(0, vH * 0.5, zoomProgress)}px) scale(${lerp(0.85, 3.2, zoomProgress)}) rotateY(${mouseX * 10}deg) rotateX(${-mouseY * 5}deg)`;

    shadow.style.transform = `translate(-50%, 172px) rotateX(90deg) scale(${lerp(0.2, 1.2, assemblyProgress)})`;
    shadow.style.opacity = (lerp(0.02, 0.8, assemblyProgress) * (1 - zoomProgress * 0.8)).toFixed(3);

    requestAnimationFrame(render);
  }

  if (reducedMotion){
    activeParts.forEach(part=>{
      const t = part.target;
      part.element.style.transform = `translate3d(${t.x}px, ${t.y}px, ${t.z}px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) rotateZ(${t.rz}deg)`;
    });
    
    coreElements.forEach(core => {
      const t = core.data.final;
      core.element.style.transform = `translate3d(${t.x}px, ${t.y}px, ${t.z}px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) rotateZ(${t.rz}deg) scale(0.12)`;
      
      core.layers.forEach((item, index) => {
        item.arc.style.borderWidth = '200px';
        let zOffset = (index - (numLayers - 1) / 2) * 1;
        item.layer.style.transform = `translateZ(${zOffset}px)`;
      });
    });

    droneWrapper.style.opacity = '0'; holoBeam.style.opacity = '0'; holoCard.style.opacity = '0';
    allSections.forEach(sec => sec.style.opacity = '1');
  } else {
    requestAnimationFrame(render);
  }

  document.querySelectorAll('.contact-btn').forEach(btn=>{
    btn.addEventListener('mouseenter', ()=>document.body.classList.add('is-excited'));
    btn.addEventListener('mouseleave', ()=>document.body.classList.remove('is-excited'));
    btn.addEventListener('focus', ()=>document.body.classList.add('is-excited'));
    btn.addEventListener('blur', ()=>document.body.classList.remove('is-excited'));
  });
})();
