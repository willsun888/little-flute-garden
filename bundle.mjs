import { readFile, writeFile, mkdir } from 'node:fs/promises';
const scripts = ['content.js','curriculum.js','illustrations.js','music.js','app.js'];
let html = await readFile(new URL('./dist/index.html',import.meta.url),'utf8');
const css = await readFile(new URL('./dist/styles.css',import.meta.url),'utf8');
html = html.replace('<link rel="stylesheet" href="styles.css">','<style>'+css+'</style>');
let combined='';
for(const file of scripts){html=html.replace('<script defer src="'+file+'"></script>','');combined+='\n'+await readFile(new URL('./dist/'+file,import.meta.url),'utf8');}
html=html.replace('</body>','<script>'+combined.replaceAll('</script','<\\/script')+'</script></body>');
await mkdir(new URL('./output/',import.meta.url),{recursive:true});
await writeFile(new URL('./output/小小长笛家.html',import.meta.url),html);
await mkdir(new URL('./docs/',import.meta.url),{recursive:true});
await writeFile(new URL('./docs/index.html',import.meta.url),html);
await writeFile(new URL('./docs/.nojekyll',import.meta.url),'');
console.log(JSON.stringify({file:'output/小小长笛家.html',bytes:Buffer.byteLength(html)}));
