import {glossary,glossaryProject} from './glossary.js';
import {fresh,validateProject} from './model.js';
export const collectionKey='mlh-glossary-collection-v1';
export function newCollection(){return {collectionVersion:1,current:'001',projects:Object.fromEntries(glossary.map(g=>[g.number,glossaryProject(g.term,fresh())]))};}
export function validateCollection(raw){
 if(!raw||raw.collectionVersion!==1||typeof raw.projects!=='object'||!raw.projects||Array.isArray(raw.projects))throw Error('Invalid collection backup.');
 const ids=Object.keys(raw.projects);if(ids.length>26||ids.some(k=>!glossary.some(g=>g.number===k)&&k!=='custom'))throw Error('Invalid collection entries.');
 if(typeof raw.current!=='string'||!ids.includes(raw.current))throw Error('Current collection entry is missing.');
 const out=newCollection();for(const id of ids)out.projects[id]=validateProject(raw.projects[id]);out.current=raw.current;return out;
}
