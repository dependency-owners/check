import { setFailed } from '@actions/core';

import { checkUnownedDependencies } from './check.js';

const run = async () => {
  try {
    const success = await checkUnownedDependencies();
    process.exit(success ? 0 : 1);
  } catch (err) {
    if (err instanceof Error) {
      setFailed(err);
    }
  }
};

run();
