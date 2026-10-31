import type { RouteNode } from '../data.ts';

// 内容来源：qinghuan-yu 的公开 GitHub 主页与各项目 README。
export const profile = {
 name: { lines: ['Qing', 'UU'], cn: 'Qing-UU', latin: 'Qing-UU' },
 siteName: 'Qing-UU // Personal Node',
 role: '江西财经大学 · 计算机科学与技术', roleEn: 'COMPUTER SCIENCE',
 tagline: '记录学习过程，也整理做过的尝试。',
 bio: '在江西财经大学学习计算机科学与技术。平时写代码、弹钢琴，也做一些音乐和硬件相关的项目。',
 education: [
  { period:'2024 - 2026', subject:'软件工程（VR 软件开发）' },
  { period:'2026 - 至今', subject:'计算机科学与技术' }
 ],
 facts: [
  { label: '学校', en: 'STUDY', value: '江西财经大学' },
  { label: '方向', en: 'FOCUS', value: 'AI 系统与计算音乐' },
  { label: '兴趣', en: 'INTEREST', value: '钢琴' }
 ],
 accent: '#3a5bc2',
 contact: {
  label: 'reliarc.yu@gmail.com', url: 'mailto:reliarc.yu@gmail.com',
  links: [
   { label: 'GitHub', url: 'https://github.com/qinghuan-yu' },
   { label: '博客', url: 'https://blog.reliarc.com' },
   { label: '网易云音乐', url: 'https://music.163.com/#/artist?id=100570638' },
   { label: 'Steam', url: 'https://steamcommunity.com/id/qing_uu/' }
  ]
 },
 otherWork: { label: '日记日历', url: 'https://github.com/qinghuan-yu/Minimalist-Calendar' }
};

export const identity = { name:'Qing-UU', subtitle:'PERSONAL NODE', topics:['AI SYSTEMS','MUSIC','HARDWARE'] };

export const works: RouteNode[] = [
 { id:'mcmer', code:'MCM', kind:'operation', x:66, y:60, title:'MCMer', en:'MATHEMATICAL MODELING', meta:'数学建模', label:'AI',
  description:'从题目和数据出发，拆解建模问题、执行数值计算，并把参数来源、计算过程和结果整理成可下载的工作区。',
  tags:['Vue 3','FastAPI','Jupyter'], link:'https://github.com/qinghuan-yu/MCMer' },
 { id:'dialograph', code:'DLG', kind:'operation', x:126, y:60, title:'Dialograph', en:'CONVERSATION ANALYSIS', meta:'对话分析', label:'AI',
  description:'把本地聊天记录整理成时间线和结构化证据，分析沟通模式，并支持从报告回查原文。',
  tags:['Python','SQLite','LLM'], link:'https://github.com/qinghuan-yu/Dialograph' },
 { id:'pianalysis', code:'PNO', kind:'operation', x:186, y:60, title:'Pianalysis', en:'PIANO ACCOMPANIMENT', meta:'计算音乐', label:'MUSIC',
  description:'以主旋律为条件生成钢琴伴奏。从 MIDI 清洗、旋律与伴奏标注，到 GPT-2 训练和 MIDI 导出，串起完整流程。',
  tags:['Python','GPT-2','MIDI'], link:'https://github.com/qinghuan-yu/Pianalysis' },
 { id:'decision-arena', code:'DEC', kind:'operation', x:246, y:60, title:'Decision Arena', en:'MULTI-AGENT DECISIONS', meta:'决策工具', label:'AI',
  description:'让多个 Agent 分别分析一个决策，再交叉质询、评分和汇总。对话及阶段事件保存在 SQLite，可继续查看。',
  tags:['FastAPI','SSE','SQLite'], link:'https://github.com/qinghuan-yu/deconstruct' },
 { id:'melody-annotator', code:'MID', kind:'tutorial', x:306, y:35, title:'旋律标注工具', en:'A-MELODY-ANNOTATOR', meta:'MIDI 工具', label:'MUSIC',
  description:'用 Skyline 算法初步识别钢琴主旋律，在 Piano Roll 中点选、框选修正，试听后导出分轨 MIDI。',
  tags:['Vue 3','Canvas','Tone.js'], link:'https://github.com/qinghuan-yu/vue-piano' },
 { id:'gif-player', code:'GIF', kind:'story', x:366, y:80, title:'ESP32 GIF Player', en:'EMBEDDED ANIMATION', meta:'嵌入式', label:'HARDWARE',
  description:'从 TF 卡读取 GIF，在 ESP32 连接的 ST7789 屏幕上循环播放。',
  tags:['ESP32','ST7789','C++'], link:'https://github.com/qinghuan-yu/gif-player' }
];

export const WORKS_WIDTH = 440;
export const workLinks: [string,string][] = [
 ['mcmer','dialograph'],['dialograph','pianalysis'],['pianalysis','decision-arena'],
 ['pianalysis','melody-annotator'],['decision-arena','gif-player']
];

// 每个方向关联具体项目，不使用自评等级。
export const skills = [
 { name:'AI 工作流', en:'AI WORKFLOWS', description:'建模、计算与证据追踪', project:'MCMer', url:works[0].link! },
 { name:'对话分析', en:'CONVERSATION ANALYSIS', description:'时间线、证据检索与原文回查', project:'Dialograph', url:works[1].link! },
 { name:'计算音乐', en:'COMPUTATIONAL MUSIC', description:'旋律标注与条件伴奏生成', project:'Pianalysis', url:works[2].link! },
 { name:'多 Agent', en:'MULTI-AGENT SYSTEMS', description:'独立分析、交叉质询与汇总', project:'Decision Arena', url:works[3].link! },
 { name:'交互工具', en:'INTERACTIVE TOOLS', description:'Canvas 钢琴卷帘与实时试听', project:'旋律标注工具', url:works[4].link! },
 { name:'嵌入式', en:'EMBEDDED SYSTEMS', description:'屏幕驱动与 GIF 播放', project:'ESP32 GIF Player', url:works[5].link! }
];
