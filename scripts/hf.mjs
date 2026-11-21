import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { existsSync } from 'node:fs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const isWin = process.platform === 'win32';
const hfBin = path.join(root, 'node_modules', '.bin', isWin ? 'hyperframes.cmd' : 'hyperframes');

const chromeCandidates = [
  process.env.HYPERFRAMES_BROWSER_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser'
].filter(Boolean);

const systemChrome = chromeCandidates.find(p => existsSync(p));

const result = spawnSync(hfBin, process.argv.slice(2), {
  cwd: root,
  stdio: 'inherit',
  shell: isWin,
  env: {
    ...process.env,
    PUPPETEER_CACHE_DIR: path.join(root, '.cache/puppeteer'),
    HYPERFRAMES_CACHE_DIR: path.join(root, '.cache/hyperframes'),
    ...(systemChrome ? { HYPERFRAMES_BROWSER_PATH: systemChrome } : {}),
    HYPERFRAMES_NO_TELEMETRY: '1',
    HYPERFRAMES_NO_UPDATE_CHECK: '1'
  }
});

if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);

