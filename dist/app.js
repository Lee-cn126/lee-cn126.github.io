'use strict';
const projects = {
  tender: {
    category: 'CASE 01 / 北京清研灵智科技有限公司 · 实习项目',
    title: '政府投标响应文件自动生成系统',
    intro: '基于 LangGraph 构建多智能体工作流，覆盖招标解析、需求提炼、RAG 检索、章节与图表生成、合规审查以及文档交付。参与已上线系统的开发与迭代，重点改善生成链路的稳定性和不同业务场景的适配。',
    metrics: [['80+', '累计支撑实际投标项目'], ['分钟级', '投标文件编写效率'], ['LangGraph', '多智能体工作流']],
    work: ['在原 LangGraph 工作流中接入新的智能体作为质量门禁，减少模型生成错误对后续链路的阻塞。', '针对低报价招标项目新增简化输出模式，重新编排工作流，简化章节内容生成逻辑，提高生成效率。'],
    tech: ['Python', 'FastAPI', 'LangGraph', 'ChromaDB / RAG', 'Vue 3', 'Playwright', 'LLM API']
  },
  prototype: {
    category: 'CASE 02 / 北京清研灵智科技有限公司 · 实习项目',
    title: 'AI 原型端到端交付系统',
    intro: '面向技术要求文档驱动的原型开发场景，将多套交互式前端原型的实践经验及业务评审反馈沉淀为可复用、可迭代的 Skill，构建标准化前端原型自动生成流程。',
    metrics: [['40+', '前端原型系统开发项目复用'], ['< 5%', '人工返修率'], ['双重评估', '功能完整性 + 视觉效果']],
    work: ['接入 Kimi 智能体与记忆路由机制，将需求理解、页面生成和交付流程连接起来。', '结合功能完整性评估与前端视觉审美评估，持续优化页面生成效果和交互体验。', '将有效的 AI 开发流程封装为可复用 Skill，推动原型开发从人工辅助生成向自动化、标准化交付演进。'],
    tech: ['Kimi API', 'Agent Skill', 'Memory Routing', 'Prompt Engineering', 'Vue 3', 'TypeScript', 'Playwright'],
  },
  medical: {
    category: 'CASE 03 / 项目实践 · 模型与隐私保护',
    title: '医疗健康数据个人信息识别与脱敏智能体',
    intro: '面向医疗非结构化文本的隐私保护需求，设计并实现覆盖多源数据读取、文本标准化、敏感实体识别、融合脱敏与质量校验的流水线。将模型推理和脱敏处理部署在本地环境，并封装为 Kettle 插件。',
    metrics: [['97.5%', 'NER 模型识别准确率'], ['96.8%', 'NER 模型召回率'], ['4-bit', '模型权重量化']],
    work: ['基于本地化 MC-BERT 进行 NER 微调，使用 LoRA 对 Transformer 注意力层的 Q/V 投影矩阵进行低秩参数适配。', '采用 4-bit 量化压缩模型权重，降低内存占用与部署资源需求，支持本地化推理。', '融合 NER 模型、正则规则库和医疗隐私术语库，识别姓名、身份证号、联系方式与住址等敏感信息。', '通过文本标准化、实体边界对齐和结果去重改善识别稳定性，利用 Kettle Plugin SDK 将识别与脱敏能力融入数据集成流程。'],
    tech: ['Python', 'PyTorch', 'MC-BERT', 'LoRA', 'NER', 'Java / Kettle Plugin SDK', 'Flask', 'MySQL', 'Docker'],
  },
  rag: {
    category: 'CASE 04 / 项目实践 · Enterprise RAG & Agent',
    title: '企业知识库与智能业务助手',
    intro: '针对企业制度、SOP 及业务文档分散、检索低效和跨文档整理成本高的问题，设计并实现基于 RAG 与 Agent 的知识助手，支持复杂文档解析、可追溯问答、多文档比较和业务报告生成。',
    metrics: [['90%', 'Recall@5 · 较基线 +15 个百分点'], ['86%', '答案正确率 · 较基线 +12 个百分点'], ['3.2 s', '模拟测试 P95 响应延迟']],
    work: ['基于 RAGFlow 搭建制度文档知识库，使用关键词与向量混合检索、重排序以及答案引用溯源。', '通过 FastAPI 集成知识检索、制度版本对比与合规清单生成工具，支持多步骤任务执行及异常处理。', '构建 100 道问答测试集，并通过数据增强提升覆盖度；对比检索策略和模型组合，使用独立评测智能体进行自动评估，结合人工抽样复核和校准。', '使用 Docker 部署服务，建立自动化评测和日志体系，支持错误追踪与效果迭代。'],
    tech: ['Python', 'FastAPI', 'RAGFlow', 'Embedding', 'Reranker', 'Function Calling', 'Docker', 'pytest'],
  }
};

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', '展开导航'); }
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? '收起导航' : '展开导航'); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 620) closeMenu(); });

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
  let count = 0;
  document.querySelectorAll('.project-card').forEach(card => { card.hidden = filter !== 'all' && !card.dataset.categories.split(' ').includes(filter); if (!card.hidden) count++; });
  document.querySelector('.project-grid').classList.toggle('is-filtered', filter !== 'all');
  document.querySelector('.project-count').textContent = `${count} 个项目`;
}));

const dialog = document.querySelector('#project-dialog');
let opener = null;
function safe(text) { return text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const p = projects[button.dataset.project]; if (!p) return;
  opener = button;
  document.querySelector('#dialog-category').textContent = p.category;
  document.querySelector('#dialog-content').innerHTML = `<h2 id="dialog-title">${safe(p.title)}</h2><p class="intro">${safe(p.intro)}</p><div class="dialog-metrics">${p.metrics.map(([n,l]) => `<div><b>${safe(n)}</b><span>${safe(l)}</span></div>`).join('')}</div><h3>我的工作与技术方案</h3><ul>${p.work.map(w => `<li>${safe(w)}</li>`).join('')}</ul><h3>技术栈</h3><div class="tag-row">${p.tech.map(t => `<span>${safe(t)}</span>`).join('')}</div><a class="button primary dialog-bottom" href="mailto:1120355084@qq.com">交流这个项目 ↗</a>`;
  dialog.showModal(); dialog.scrollTop = 0; document.body.classList.add('dialog-open');
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const b = dialog.getBoundingClientRect(); if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); opener?.focus({preventScroll:true}); });

let toastTimer;
function toast(message) { const el = document.querySelector('#toast'); el.textContent = message; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 3500); }
document.querySelector('#copy-email').addEventListener('click', async () => {
  const email = '1120355084@qq.com';
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(email);
    else { const field = document.createElement('textarea'); field.value = email; field.style.position = 'fixed'; field.style.opacity = '0'; document.body.append(field); field.select(); const copied = document.execCommand('copy'); field.remove(); if (!copied) throw new Error('copy failed'); }
    toast('邮箱已复制，期待与你交流。');
  } catch { toast('请手动复制邮箱：1120355084@qq.com'); }
});
if ('IntersectionObserver' in window) { const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) nav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id)); }); }, {rootMargin:'-15% 0px -55% 0px'}); document.querySelectorAll('main section[id]').forEach(section => observer.observe(section)); }
document.querySelector('#year').textContent = String(new Date().getFullYear());

// Original template artwork: subtle pointer parallax, respecting reduced motion.
const artwork = document.querySelector('.template-art');
artwork.addEventListener('pointermove', event => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bounds = artwork.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  artwork.style.setProperty('--pointer-x', `${(((event.clientX - bounds.left) / bounds.width - 0.5) * 18).toFixed(2)}px`);
  artwork.style.setProperty('--pointer-y', `${(((event.clientY - bounds.top) / bounds.height - 0.5) * 14).toFixed(2)}px`);
});
artwork.addEventListener('pointerleave', () => {
  artwork.style.setProperty('--pointer-x', '0px');
  artwork.style.setProperty('--pointer-y', '0px');
});
