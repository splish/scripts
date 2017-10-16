const path = require('path');
const spawn = require('cross-spawn');

const [executor, _bin, script, ...args] = process.argv;

const attemptResolve = (...args) => {
  try {
    return require.resolve(...args);
  } catch (err) {
    return null;
  }
};

const handleSignal = result => {
  if (result.signal === 'SIGKILL') {
    console.log(
      `The script "${script}" failed because the process exited too early. ` +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.'
    );
  } else if (result.signal === 'SIGTERM') {
    console.log(
      `The script "${script}" failed because the process exited too early. ` +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.'
    );
  }
  process.exit(1);
};

const spawnScript = () => {
  const relativeScriptPath = path.join(__dirname, 'scripts', script);
  const scriptPath = attemptResolve(relativeScriptPath);

  if (!scriptPath) {
    throw new Error(`Unknown script ${script}.`);
  }

  const result = spawn.sync(executor, [scriptPath, ...args], {
    stdio: 'inherit'
  });

  if (result.signal) {
    handleSignal(result);
  } else {
    process.exit(result.status);
  }
};

if (script) {
  spawnScript();
} else {
  console.log('Please provide a script.');
}
