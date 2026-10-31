import type { RouteNode } from '../data.ts';
import { rng } from '../graphics.ts';
import { ring, rule } from '../sketch.ts';

// 用项目的实际处理流程绘制图版，不使用游戏关卡预览。
const flows: Record<string,string[]> = {
 mcmer:['题目与数据','模型','数值计算','结果工作区'],
 dialograph:['聊天记录','时间分段','结构化证据','报告与回查'],
 pianalysis:['MIDI','旋律标注','GPT-2','伴奏 MIDI'],
 'decision-arena':['问题澄清','独立分析','交叉质询','评分与汇总'],
 'melody-annotator':['上传 MIDI','旋律识别','手动修正','分轨导出'],
 'gif-player':['TF 卡','GIF 文件','ESP32','ST7789']
};

export function projectPlate(project:RouteNode,index:number){
 const random=rng(80+index),steps=flows[project.id];
 return `<svg class="project-plate" viewBox="0 0 400 260" role="img" aria-label="${project.title} 的处理流程" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="260" fill="#e9eeeb"/>
  <g fill="none" stroke="#3a5bc2" opacity=".13"><path d="${ring(300,100,120,random,1.5)}${ring(300,100,100,random,1)}"/></g>
  <text x="25" y="72" fill="#3a5bc2" font-family="Georgia,serif" font-size="56">${project.code}</text>
  <g fill="none" stroke="#22282b" stroke-width="1.2">${steps.map((_,i)=>`<path d="${ring(50+i*100,139,18,random,.6)}"/>${i<3?`<path d="${rule(70+i*100,139,130+i*100,139,random,1,.8)}"/>`:''}`).join('')}</g>
  ${steps.map((step,i)=>`<circle cx="${50+i*100}" cy="139" r="4" fill="#3a5bc2"/><text x="${50+i*100}" y="183" text-anchor="middle" fill="#22282b" font-family="sans-serif" font-size="11">${step}</text>`).join('')}
  <path d="${rule(25,224,375,224,random,0,.6)}" fill="none" stroke="#22282b" opacity=".25"/>
 </svg>`;
}
