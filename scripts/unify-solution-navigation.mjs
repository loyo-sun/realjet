import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import postcss from 'postcss';

// Use the site's actual header markup and styles for standalone marketing entries.
// Local anchor bars remain in their page's own design and keep their existing handlers.
export async function unifySolutionNavigation(root, output) {
  const header = await readFile(join(root, 'site/_includes/components/header.njk'), 'utf8');
  const css = await readFile(join(root, 'site/assets/site.css'), 'utf8');
  const classes = new Set([...header.matchAll(/class="([^"]+)"/g)].flatMap(m => m[1].split(/\s+/)));
  const tree = postcss.parse(css);
  tree.walkRules(rule => {
    if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) { rule.remove(); return; }
    const selectors = rule.selectors.filter(s => [...s.matchAll(/\.([\w-]+)/g)].some(m => classes.has(m[1])));
    if (!selectors.length) rule.remove();
    else rule.selectors = selectors.map(s => `.solution-global-header ${s}`);
  });
  tree.walkAtRules(rule => { if (!rule.nodes?.length) rule.remove(); });
  const scoped = `.solution-global-header{--navy:#08253f;--navy-dark:#061b2c;--white:#fff;--cyan:#39bbc8;--container:1180px;font-family:Inter,ui-sans-serif,system-ui,sans-serif;line-height:normal;position:relative;z-index:80}.solution-global-header *{box-sizing:border-box}.solution-global-header a{text-decoration:none}.solution-global-header button{font:inherit}.solution-global-header [hidden]{display:none!important}\n${tree.toString()}\n.solution-global-header .site-header{position:relative}.solution-global-header .container{width:min(1180px,calc(100% - 44px));margin-inline:auto}.solution-global-header .solutions-tab-list [role=tab]{font-weight:400}.solution-global-header .site-submenu{line-height:1.35}\n`;
  await writeFile(join(output, 'assets/site/solution-global-header.css'), scoped);
  const sourceJs = await readFile(join(root, 'site/assets/site.js'), 'utf8');
  const navJs = sourceJs.slice(sourceJs.indexOf('const menuToggle ='), sourceJs.indexOf('\ndocument.addEventListener("click", (event) => {\n  const contactLink'));
  const tabsJs = sourceJs.slice(sourceJs.indexOf('// Solution categories support'));
  await writeFile(join(output, 'assets/site/solution-global-header.js'), `(() => {\n${navJs}\n${tabsJs}\n})();`);
  const pages = [
    ['marketing/contract_manufacturing/index.html', 'react'],
    ['marketing/precast-beam-factory/en/index.html', 'react'],
    ['marketing/spun-pipe-piles-production-line/index.html', 'react'],
    ['products/ai-infrastructure-components/index.html', 'plain'],
    ['products/new-energy-components/index.html', 'plain'],
    ['solutions/precast-concrete-plant/index.html', 'plant'],
    ['marketing/ppvc-mic-production-line/index.html', 'ppvc'],
    ['solutions/concrete-lab-automation/index.html', 'lab'],
  ];
  for (const [path, type] of pages) {
    const target = join(output, path);
    let html = await readFile(target, 'utf8');
    html = html.replace('<body', `<body data-solution-navigation="${type === 'plain' ? 'global' : 'anchor'}"`);
    html = html.replace('</head>', '<link rel="stylesheet" href="/assets/site/solution-navigation.css" /></head>');
    if (type === 'react') {
      html = html.replace('</head>', '<link rel="stylesheet" href="/assets/site/solution-global-header.css" /><script src="/assets/site/solution-global-header.js" defer></script></head>');
      html = html.replace(/(<body[^>]*>)/, `$1<div class="solution-global-header">${header}</div>`);
    } else if (type === 'plant') {
      html = html.replace('<header class="pc-header">', `${header}<header class="pc-header" data-solution-anchor>`);
      html = html.replace(/<a class="pc-brand"[^>]*>.*?<\/a>/s, '');
      html = html.replace(/<button[^>]*class="pc-menu-toggle"[\s\S]*?<\/button>/, '');
      const cta = html.match(/<a class="pc-button pc-button-primary" href="#plant-proposal"[^>]*>[\s\S]*?<\/a>/)?.[0];
      if (cta) html = html.replace(cta, '').replace(/(<nav id="pc-navigation"[\s\S]*?<\/nav>)/, `$1${cta}`);
    } else if (type === 'ppvc' || type === 'lab') {
      const pattern = new RegExp(`<nav class="${type}-section-nav"[^>]*>[\\s\\S]*?<\\/nav>`);
      const bar = html.match(pattern)?.[0];
      if (!bar) throw new Error(`Missing local navigation: ${path}`);
      const links = [...bar.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map(m => m[0]);
      const cta = links.pop();
      const aligned = bar.replace(/<div class="container">[\s\S]*?<\/div>/, `<div class="container"><div class="solution-anchor-links">${links.join('')}</div><div class="solution-anchor-actions">${cta}</div></div>`);
      html = html.replace(bar, '').replace('</header>', `</header>${aligned.replace('<nav ', '<nav data-solution-anchor ')}`);
    }
    await writeFile(target, html);
  }
}
