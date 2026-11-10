import { test } from 'node:test';
import assert from 'node:assert/strict';
import { homePlate, personnelPlate } from '../src/plates.ts';
import { operators } from '../src/data.ts';
import { birdPlate } from '../src/graphics.ts';

const identity = { name:'Qing-UU', subtitle:'QINGHUAN-YU', topics:['AI SYSTEMS','MUSIC','SOFTWARE'] };
const unrelated = /LATERANO|RHODES ISLAND|SIDESTORY|SANCTUM|1099|STARS|FAITH|ORDER|FREEDOM/;

test('portfolio identity replaces festival text in the home plate',()=>{
 const svg=homePlate(undefined,'QY','Qing-UU / AI SYSTEMS / MUSIC / ','svg',identity);
 assert.match(svg,/Qing-UU/);
 assert.match(svg,/AI SYSTEMS/);
 assert.doesNotMatch(svg,unrelated);
});

test('a profile plate uses the supplied identity without game metadata or ratings',()=>{
 const person={...operators[0],name:'Qing-UU',english:'Qing-UU',role:'开发',branch:'计算机科学',tags:['AI','MIDI','WEB']};
 const svg=personnelPlate(person,0,undefined,false,'svg',[],identity);
 assert.match(svg,/Qing-UU/);
 assert.match(svg,/QINGHUAN-YU/);
 assert.doesNotMatch(svg,unrelated);
 assert.doesNotMatch(svg,/★/);
});

test('the focus illustration displays its supplied captions instead of fictional statistics',()=>{
 const svg=birdPlate(true,'focus',18,{title:'项目方向',rows:['AI SYSTEMS','MIDI','SOFTWARE']});
 assert.ok(svg.includes('项目方向'),'uses the requested title');
 assert.ok(!/1099|0\.0417|羽兽何以飞翔/.test(svg),'removes inherited game captions');
});
