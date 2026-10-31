import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const ctx={};ctx.window=ctx;vm.createContext(ctx);
for(const f of ['content.js','curriculum.js','illustrations.js','music.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),ctx);
const {LESSONS,COURSE_UNITS,SCORES,NOTES,compilePerformance,drawScore}=ctx;
assert.equal(LESSONS.length,48);assert.equal(new Set(LESSONS.map(l=>l.id)).size,48);
for(const [i,l] of LESSONS.entries()){assert.equal(l.id,i+1);assert.equal(l.unit,Math.floor(i/4));for(const k of ['title','goal','say','practice','task','feedback','parent','check'])assert.ok(l[k],`Lesson${l.id}:${k}`);assert.equal(l.steps.length,3);assert.ok(l.answer==='any'||l.choices[l.answer]);assert.ok(l.demo||l.score||l.id<=6);if(l.score)assert.ok(SCORES[l.score]);if(l.note)assert.ok(NOTES[l.note]);}
for(const u of COURSE_UNITS)assert.equal(u.lessons.length,4);
for(const [id,s] of Object.entries(SCORES)){const flat=s.bars.flat();for(const bar of s.bars){assert.equal(bar.reduce((a,e)=>a+e.b,0),s.meter,id);for(const e of bar){assert.ok([.5,1,2,3,4].includes(e.b),id);assert.ok(e.n===null||NOTES[e.n],id)}}flat.forEach((e,i)=>{if(e.tie)assert.equal(e.n,flat[i+1]?.n,id)});for(const sl of s.slurs||[]){assert.ok(sl.from<sl.to&&s.bars[sl.bar]?.[sl.to],id)}const p=compilePerformance(s,{bpm:60});assert.equal(p.totalBeats,s.meter*s.bars.length*(s.repeat?2:1),id);assert.ok(drawScore(s).includes('score-grid'),id);for(const h of p.highlights.filter(h=>h.rest))assert.ok(!p.events.some(e=>e.start<h.start+h.duration-1e-6&&e.start+e.duration>h.start+1e-6),'Rest sounds in '+id);}
assert.equal(compilePerformance('half',{bpm:60}).events[0].duration,2);
assert.equal(compilePerformance('legato',{bpm:60}).events.length,1);
assert.equal(compilePerformance('legato',{bpm:60}).events[0].parts.length,3);
assert.equal(compilePerformance('separate').events.length,3);
const tied=compilePerformance('tie',{bpm:60});assert.equal(tied.events.length,5);assert.equal(tied.events[2].duration,2);assert.equal(tied.events[2].parts[0].n,tied.events[2].parts[1].n);
assert.equal(compilePerformance('repeat',{bpm:60}).duration,16);
const duet=compilePerformance('duet',{bpm:60,countIn:4,pulse:true});assert.equal(duet.events[0].start,4);assert.equal(duet.ticks.length,duet.totalBeats);
assert.equal(NOTES.D5.bits,'10111110');assert.equal(NOTES['F#4'].bits,'11110011');assert.equal(NOTES.Bb4.bits,'11001001');assert.equal(ctx.noteFrequency('A4'),440);assert.ok(Math.abs(ctx.noteFrequency('E5')-659.255)<.01);
console.log(JSON.stringify({lessons:LESSONS.length,units:COURSE_UNITS.length,scores:Object.keys(SCORES).length,notes:Object.keys(NOTES).length,checks:'lesson fields, bar totals, ties, rests, slurs, repeats, count-in, fingering and pitch passed'}));

const mixed={meter:4,bars:[[{n:'F#4',b:1},{n:'F4',b:1},{n:'Bb4',b:1},{n:'B4',b:1}]]};assert.equal((drawScore(mixed).match(/>♮<\/text>/g)||[]).length,2);
const keyNatural={meter:4,key:'G',bars:[[{n:'F4',b:4}],[{n:'F#4',b:4}]]};assert.equal((drawScore(keyNatural).match(/>♮<\/text>/g)||[]).length,1);
console.log('Accidental scope and composer natural-sign checks passed');

assert.ok(ctx.drawStaff(['Bb4','B4']).includes('>♮</text>'));
const appSource=fs.readFileSync('dist/app.js','utf8');const savedFn=appSource.split('\n').find(s=>s.startsWith('function savedRead('));ctx.localStorage={getItem:()=>JSON.stringify({done:[1,12,24,48,49],composition:['G4',null,'F#4','invalid']})};vm.runInContext('const STORE_KEY="little-flute-garden-v1";'+savedFn,ctx);const migrated=ctx.savedRead();assert.deepEqual(Array.from(migrated.done),[1,12,24,48]);assert.deepEqual(Array.from(migrated.composition),['G4',null,'F#4']);console.log('Existing progress and composition migration passed');
