export const scene = () => ({title:'',visual:'',callout:'',speech:'',action:'',status:'Draft'});
export const fresh = () => ({version:1,term:'',audience:'',language:'English',ratio:'16:9',definition:'',misconception:'',invariant:'',continuity:'',sources:'',mathReviewed:false,sourceReviewed:false,scenes:[scene()]});
export function validateProject(raw){
 if(!raw || typeof raw!=='object' || raw.version!==1 || !Array.isArray(raw.scenes) || raw.scenes.length<1 || raw.scenes.length>30) throw Error('Expected a version 1 project with 1–30 scenes.');
 const out=fresh();
 for(const key of Object.keys(out)){
  if(['version','scenes'].includes(key))continue;
  if(typeof raw[key]!==typeof out[key])throw Error(`Invalid ${key}.`);
  if(typeof raw[key]==='string' && raw[key].length>100000)throw Error(`${key} is too long.`);
  out[key]=raw[key];
 }
 if(!['English','Tamil','Tanglish'].includes(out.language)||!['16:9','9:16','1:1'].includes(out.ratio))throw Error('Unsupported language or ratio.');
 out.scenes=raw.scenes.map(s=>{const next=scene();for(const k of Object.keys(next)){if(typeof s?.[k]!=='string'||s[k].length>20000)throw Error('Invalid scene content.');next[k]=s[k];}if(!['Draft','Approved','Generated','Visually checked'].includes(next.status))throw Error('Invalid scene status.');return next;});
 return out;
}
export function qc(p){
 const issues=[];
 for(const [key,label] of [['term','Mathematical term'],['audience','Audience'],['definition','Precise definition'],['misconception','Misconception'],['invariant','Mathematical invariant'],['continuity','Continuity rules'],['sources','Source references']])if(!p[key].trim())issues.push(`${label} is missing.`);
 p.scenes.forEach((s,i)=>{for(const [key,label] of [['title','title'],['visual','visual description'],['action','action / start and end state']])if(!s[key].trim())issues.push(`Scene ${i+1}: add a ${label}.`);if(s.status==='Draft')issues.push(`Scene ${i+1}: awaiting approval.`);if(s.callout.length>150)issues.push(`Scene ${i+1}: callout may be too long to read.`);});
 if(!p.mathReviewed)issues.push('Manual mathematics review is required.');
 if(!p.sourceReviewed)issues.push('Manual source and exact speech review is required.');
 return issues;
}
export function prompts(p){return `MATH LOGIC HUB — VISUAL GLOSSARY\n${p.term||'Untitled'}\nLanguage: ${p.language} | Individual scene ratio: ${p.ratio}\nAudience: ${p.audience}\nDefinition: ${p.definition}\nMisconception: ${p.misconception}\nInvariant: ${p.invariant}\nContinuity: ${p.continuity}\n\nREVIEW\n${qc(p).map(x=>'- '+x).join('\n')||'Checklist complete. Manual approval remains the author’s responsibility.'}\n\n${p.scenes.map((s,i)=>`SCENE ${i+1}: ${s.title} [${s.status}]\nVisual: ${s.visual}\nAction and start/end state: ${s.action}\nPersistent exact callout: ${s.callout||'(none)'}\n${s.speech?'Exact approved speech (do not paraphrase): '+s.speech:'Audio: no speech.'}\nImage prompt: Create a ${p.ratio} educational mathematical visual. ${s.visual} Preserve: ${p.invariant}. Continuity: ${p.continuity}. Exact on-screen text: ${s.callout||'(none)'}. No unrequested avatar or teacher.\nVideo prompt: ${s.action} Preserve geometry, quantities and persistent callouts. Do not animate mathematical endpoints or quantities for decoration. ${s.speech?'One speaking person only; use only the exact speech above.':'No spoken dialogue.'}\n`).join('\n')}\nSOURCE NOTES\n${p.sources}\n\nThese are deterministic templates. No images or videos have been generated or visually verified by this app.\n`;}
export function example(){return {...fresh(),term:'Perpendicular',audience:'Ages 10–13',definition:'Two lines in the same plane are perpendicular if they intersect at a right angle (90°).',misconception:'Lines do not need to be horizontal and vertical to be perpendicular.',invariant:'The intersection angle is exactly 90°. Rotate both lines together without changing their relative angle.',continuity:'Use a blue line and an amber line on a pale background. Keep the right-angle marker at their intersection. No avatar.',sources:'Built-in illustrative example; not taken from your private chat. Review before production.',scenes:[{title:'Meet the right angle',visual:'Two perpendicular lines, one blue and one amber, with arrowheads at both ends and a square right-angle marker at their intersection.',callout:'Perpendicular = intersecting at 90°',speech:'',action:'Start with both lines visible. Hold their geometry fixed and reveal the 90° label.',status:'Draft'},{title:'Orientation does not matter',visual:'The same pair of lines rotated together 30° in the plane. Preserve the square right-angle marker.',callout:'Still 90°. Still perpendicular.',speech:'',action:'Rotate the entire pair together by 30°. Start and finish at a right angle; keep the label readable and persistent.',status:'Draft'}]};}
