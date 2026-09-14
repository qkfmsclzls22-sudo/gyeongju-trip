import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import assert from 'node:assert/strict';
let calls = 0, mode = 'normal', failedOnce = false;
const mock = createServer((req, res) => {
  calls++; req.resume();
  req.on('end', () => {
    if (mode === 'transient' && !failedOnce) { failedOnce = true; res.writeHead(500); res.end('temporary'); return; }
    const respond = () => {
      res.writeHead(200, { 'content-type': 'text/event-stream' });
      const plan = { days: [], answer: '검증용 맞춤 응답', assumptions: '', reasons: '', tips: [] };
      res.end('data: ' + JSON.stringify({ choices: [{ index: 0, delta: { content: mode === 'invalid' ? '{' : JSON.stringify(plan) }, finish_reason: 'stop' }] }) + '\n\ndata: [DONE]\n\n');
    };
    if (mode === 'slow') setTimeout(respond, 20000); else respond();
  });
});
await new Promise(resolve => mock.listen(3212, '127.0.0.1', resolve));
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', '3211', '--hostname', '127.0.0.1'], {
  env: { ...process.env, OPENAI_API_KEY: 'local-test-only', OPENAI_BASE_URL: 'http://127.0.0.1:3212/v1' }, stdio: ['ignore', 'pipe', 'pipe']
});
child.stderr.on('data', data => process.stderr.write(data));
const deadline = setTimeout(() => { child.kill(); mock.close(); process.exit(1); }, 90000);
try {
  await new Promise((resolve, reject) => {
    child.stdout.on('data', data => { if (data.toString().includes('Ready')) resolve(); });
    child.on('exit', code => reject(new Error('server exited ' + code)));
  });
  const request = async () => {
    const response = await fetch('http://127.0.0.1:3211/api/travel-chat', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message: '경주 여행 안내', profile: '봄 당일치기 오전 도착' }),
      signal: AbortSignal.timeout(35000)
    });
    assert.equal(response.status, 200); return response.json();
  };
  for (let i = 0; i < 12; i++) {
    const answer = await request(); assert.equal(answer.reply, '검증용 맞춤 응답'); assert.notEqual(answer.fallback, true);
  }
  assert.equal(calls, 12); console.log('PASS: all 12 consecutive requests reach the model, including 11 and 12');
  mode = 'slow'; const slow = await request(); assert.equal(slow.reply, '검증용 맞춤 응답'); assert.notEqual(slow.fallback, true);
  console.log('PASS: 20-second AI generation completes without early fallback');
  mode = 'transient'; assert.equal((await request()).reply, '검증용 맞춤 응답'); assert(failedOnce);
  console.log('PASS: upstream 500 automatically recovers');
  mode = 'invalid'; const fallback = await request(); assert.equal(fallback.fallback, true); assert(fallback.reply);
  console.log('PASS: repeated invalid AI output still ends with a usable reply');
} finally { clearTimeout(deadline); child.kill(); mock.close(); }
