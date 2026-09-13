// Only complete JSON objects are displayed; unfinished strings never reach the UI.
export function planPreview(json: string): string {
  let quoted = false, escaped = false;
  const stack: number[] = [];
  const lines: string[] = [];
  let lastDay = 0;
  for (let i = 0; i < json.length; i++) {
    const char = json[i];
    if (quoted) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') quoted = false;
      continue;
    }
    if (char === '"') { quoted = true; continue; }
    if (char === '{') stack.push(i);
    else if (char === '}') {
      const depth = stack.length, start = stack.pop();
      if (depth !== 3 || start === undefined) continue;
      try {
        const stop = JSON.parse(json.slice(start, i + 1));
        if (![stop.start,stop.end,stop.place,stop.text].every(v => typeof v === 'string')) continue;
        const day = Number(json.slice(stack[1],start).match(/^\{\s*"day"\s*:\s*(\d+)/)?.[1]);
        if (!day) continue;
        if (lastDay !== day) { lines.push(`${day}일차`); lastDay = day; }
        lines.push(`${stop.start}${stop.start === stop.end ? '' : '–'+stop.end} | ${stop.place}${stop.text === stop.place ? '' : ' · '+stop.text}`);
      } catch { /* Wait for the next complete object. */ }
    }
  }
  if (lines.length) return lines.join('\n');
  const answer = json.match(/^\{\s*"answer"\s*:\s*("(?:[^"\\]|\\.)*")/);
  if (answer) { try { return JSON.parse(answer[1]); } catch {} }
  return '';
}
