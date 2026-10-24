import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
export async function finalizeManufacturingSplit(root,output) {
  const redirects=JSON.parse(await readFile(join(root,'site/_data/manufacturingRedirects.json'),'utf8'));
  const legacy=join(output,'marketing/contract_manufacturing/index.html');
  await writeFile(legacy,`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex, follow"><meta http-equiv="refresh" content="0;url=${redirects.target}"><link rel="canonical" href="https://realjetech.com${redirects.target}"><title>REALJET manufacturing capabilities</title></head><body><p>This page has moved to <a href="${redirects.target}">REALJET manufacturing capabilities</a>.</p></body></html>`);
  const rules=await readFile(join(output,'_redirects'),'utf8');
  const sitemap=await readFile(join(output,'sitemap.xml'),'utf8');
  const pages=['solutions/contract-manufacturing/','about/manufacturing-capabilities/'];
  for(const path of pages){
    const html=await readFile(join(output,path,'index.html'),'utf8');
    assert(html.includes(`rel="canonical" href="https://realjetech.com/${path}"`));
    assert(sitemap.includes(`https://realjetech.com/${path}`));
    assert.equal([...html.matchAll(/<h1\b/g)].length,1);
    assert(html.includes('data-manufacturing-hub='));
    assert(html.includes('name="universal-enquiry"'));
    for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))JSON.parse(match[1]);
    for(const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)){
      const url=match[1];if(url.includes('mailto:'))continue;
      await readFile(join(output,url.slice(1)+(url.endsWith('/')?'index.html':'')));
    }
  }
  for(const alias of redirects.aliases)assert(rules.includes(`${alias} ${redirects.target} 301!`));
  for(const alias of redirects.serviceAliases)assert(rules.includes(`${alias} ${redirects.serviceTarget} 301!`));
  assert(!sitemap.includes('https://realjetech.com/services/contract-manufacturing/'));
  const header=await readFile(join(root,'site/_includes/components/header.njk'),'utf8');
  assert(header.includes('class="solution-service-link" href="/solutions/contract-manufacturing/"'));
  assert(!sitemap.includes('https://realjetech.com/marketing/contract_manufacturing/'));
  console.log('Manufacturing split validation passed: two pages, local assets, structured data and permanent redirect rules.');
}
