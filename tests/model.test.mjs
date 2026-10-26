import {test} from 'node:test';import assert from 'node:assert/strict';import {fresh,validateProject,qc,prompts,example} from '../model.js';
test('blank project flags missing information and approvals',()=>{assert.ok(qc(fresh()).length>=10);});
test('project backup round trip retains exact Tamil speech',()=>{const p=example();p.language='Tamil';p.scenes[0].speech='இது 90° கோணம்.';assert.deepEqual(validateProject(JSON.parse(JSON.stringify(p))),p);assert.ok(prompts(p).includes(p.scenes[0].speech));});
test('invalid imported projects are rejected',()=>{for(const p of [null,{}, {...fresh(),scenes:[]},{...fresh(),ratio:'4:3'},{...fresh(),scenes:Array(31).fill({})},{...fresh(),scenes:[{...fresh().scenes[0],status:'Approved<script>'}]}])assert.throws(()=>validateProject(p));});
test('fresh project data does not share scene references',()=>{const a=fresh(),b=fresh();a.scenes[0].title='changed';assert.equal(b.scenes[0].title,'');});
test('silent scenes never invent voiceover',()=>{assert.match(prompts(example()),/Audio: no speech/);});
test('QC only clears with required content and human review',()=>{const p=example();p.mathReviewed=p.sourceReviewed=true;p.scenes.forEach(s=>s.status='Approved');assert.deepEqual(qc(p),[]);p.scenes[0].visual='';assert.ok(qc(p).some(x=>x.includes('visual description')));});
