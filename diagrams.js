// Deterministic mathematical diagrams: coordinates carry the meaning, not decoration.
const dot=(x,y)=>`<circle cx="${x}" cy="${y}" r="4"/>`;
const text=(x,y,t,size=13)=>`<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle" stroke="none">${t}</text>`;
function line(x1,y1,x2,y2,arrows='none',width=4){
 const head=(x,y,dx,dy)=>{const a=Math.atan2(dy,dx),l=10;return `<path d="M${x-l*Math.cos(a-.42)} ${y-l*Math.sin(a-.42)} L${x} ${y} L${x-l*Math.cos(a+.42)} ${y-l*Math.sin(a+.42)}" fill="none" stroke-width="${width}"/>`;};
 return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="${width}"/>${arrows==='both'?head(x1,y1,x1-x2,y1-y2):''}${arrows!=='none'?head(x2,y2,x2-x1,y2-y1):''}`;
}
const circle=(width=2)=>`<circle cx="180" cy="285" r="90" fill="none" stroke-width="${width}"/>`;
const rightMarker='<path d="M180 310H195V325" fill="none" stroke-width="2"/>';
const polygon=pts=>`<polygon points="${pts}" fill="none" stroke-width="4"/>`;
export function diagram(term,title=''){
 term=term.toLowerCase();let result='';
 const circleTerms=['radius','chord','diameter','circumference','arc','semicircle','sector','circular segment','tangent','secant'];
 if(circleTerms.includes(term)){
  if(term==='semicircle')result='<path d="M90 325 A90 90 0 0 1 270 325 Z" fill="none" stroke-width="4"/>'+text(180,352,'Straight diameter edge');
  else{
   result=circle(term==='circumference'?6:2);
   if(term==='radius')result+=line(180,285,270,285)+dot(180,285)+dot(270,285)+text(174,310,'O');
   if(term==='diameter')result+=line(90,285,270,285)+dot(90,285)+dot(180,285)+dot(270,285)+text(83,310,'A')+text(180,310,'O')+text(278,310,'B');
   if(term==='chord')result+=line(99.3774225,245,260.6225775,245)+dot(99.3774225,245)+dot(260.6225775,245);
   if(term==='arc')result+='<path d="M180 195 A90 90 0 0 1 270 285" fill="none" stroke-width="8"/>'+dot(180,195)+dot(270,285)+text(168,183,'A')+text(286,290,'B');
   if(term==='sector')result+='<path d="M180 285 L180 195 A90 90 0 0 1 270 285 Z" fill-opacity=".18" stroke-width="4"/>'+dot(180,285)+text(170,306,'O');
   if(term==='circular segment')result+='<path d="M99.3774225 245 A90 90 0 0 1 260.6225775 245 Z" fill-opacity=".2" stroke-width="4"/>'+dot(99.3774225,245)+dot(260.6225775,245);
   if(term==='tangent')result+=line(60,375,300,375,'both',3)+line(180,285,180,375,'none',2)+dot(180,375)+'<path d="M180 360H195V375" fill="none" stroke-width="2"/>';
   if(term==='secant')result+=line(50,255,310,255,'both',3)+dot(95.1471863,255)+dot(264.8528137,255);
  }
 }else if(term==='point')result=dot(180,275)+text(180,307,'P')+text(180,350,'A position, not a size',12);
 else if(['line','line segment','ray'].includes(term)){
  result=line(75,285,285,285,term==='line'?'both':term==='ray'?'end':'none');
  if(term!=='line')result+=dot(75,285)+text(75,311,'A');
  if(term==='line segment')result+=dot(285,285)+text(285,311,'B');
 }else if(['angle','acute angle','right angle','obtuse angle','straight angle','reflex angle'].includes(term)){
  const theta=term==='right angle'?90:term==='obtuse angle'||term==='reflex angle'?120:term==='straight angle'?180:60;
  const a=theta*Math.PI/180,x=180+90*Math.cos(a),y=300-90*Math.sin(a);
  result=line(180,300,270,300,'end',3)+line(180,300,x,y,'end',3)+dot(180,300);
  if(theta===90)result+='<path d="M180 283H197V300" fill="none" stroke-width="2"/>';
  else result+=`<path d="M215 300 A35 35 0 ${term==='reflex angle'?1:0} ${term==='reflex angle'?1:0} ${180+35*Math.cos(a)} ${300-35*Math.sin(a)}" fill="none" stroke-width="2"/>`;
  result+=text(180,360,term==='angle'?'One vertex · two rays':`${term==='reflex angle'?240:theta}°`);
 }else if(term==='perpendicular lines'||term==='perpendicular')result=line(65,285,295,285,'both',3)+line(180,185,180,385,'both',3)+'<path d="M180 269H196V285" fill="none" stroke-width="2"/>'+text(220,260,'90°');
 else if(term==='parallel lines')result=line(65,245,295,245,'both',3)+line(65,325,295,325,'both',3)+'<path d="M180 245V325 M174 251L180 245L186 251 M174 319L180 325L186 319" fill="none" stroke-width="1.5"/>'+text(180,366,'Constant separation',12);
 else if(term==='triangle')result=polygon('180,190 75,355 285,355');
 else if(term==='quadrilateral')result=polygon(title==='Kite outline'?'180,190 265,270 180,375 95,270':title==='Slanted tile'?'115,215 285,215 245,350 75,350':'105,215 260,240 280,350 75,350');
 else if(term==='polygon'){
  const n=title==='Octagonal sign'?8:title==='Pentagonal badge'?5:6;
  result=title==='Irregular polygon'?polygon('90,240 205,195 280,280 235,355 100,335'):polygon(Array.from({length:n},(_,i)=>{const a=-Math.PI/2+i*2*Math.PI/n;return `${180+95*Math.cos(a)},${285+95*Math.sin(a)}`;}).join(' '));
 }else result=text(180,285,'Diagram requires review',12);
 return `<g data-diagram="${circleTerms.includes(term)?'circle':term.replace(/[^a-z ]/g,'')}" stroke-linejoin="round" stroke-linecap="round">${result}</g>`;
}
