// Uncompressed ZIP writer. No external scripts, uploads, or runtime dependencies.
const encoder=new TextEncoder();
function crc32(bytes){let crc=0xffffffff;for(const byte of bytes){crc^=byte;for(let k=0;k<8;k++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return (crc^0xffffffff)>>>0;}
function record(size){const bytes=new Uint8Array(size);return {bytes,v:new DataView(bytes.buffer)};}
export function zipFiles(files){
 const chunks=[],central=[];let offset=0;
 for(const [filename,content] of files){
  if(!/^[a-zA-Z0-9_./-]+$/.test(filename)||filename.includes('..'))throw Error('Unsafe ZIP filename.');
  const name=encoder.encode(filename),data=encoder.encode(content),crc=crc32(data);
  const h=record(30+name.length);h.v.setUint32(0,0x04034b50,true);h.v.setUint16(4,20,true);h.v.setUint16(12,33,true);h.v.setUint32(14,crc,true);h.v.setUint32(18,data.length,true);h.v.setUint32(22,data.length,true);h.v.setUint16(26,name.length,true);h.bytes.set(name,30);
  const c=record(46+name.length);c.v.setUint32(0,0x02014b50,true);c.v.setUint16(4,20,true);c.v.setUint16(6,20,true);c.v.setUint16(14,33,true);c.v.setUint32(16,crc,true);c.v.setUint32(20,data.length,true);c.v.setUint32(24,data.length,true);c.v.setUint16(28,name.length,true);c.v.setUint32(42,offset,true);c.bytes.set(name,46);chunks.push(h.bytes,data);central.push(c.bytes);offset+=h.bytes.length+data.length;
 }
 const end=record(22),centralSize=central.reduce((n,b)=>n+b.length,0);end.v.setUint32(0,0x06054b50,true);end.v.setUint16(8,files.length,true);end.v.setUint16(10,files.length,true);end.v.setUint32(12,centralSize,true);end.v.setUint32(16,offset,true);
 return new Blob([...chunks,...central,end.bytes],{type:'application/zip'});
}
