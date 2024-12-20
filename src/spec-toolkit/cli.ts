// CLI Script that takes config file + CLI Params
// Similar to `generateSpecPage.ts` but properly parametrized / dynamic
import { log } from "./util/log";

execCli().catch((err): void => {
  log.error(err);
  process.exit(1);
});

// TODO: Implement this
/* eslint-disable require-await */
async function execCli(): Promise<void> {
  log.warn("Not implemented yet");
}
