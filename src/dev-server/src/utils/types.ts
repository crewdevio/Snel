/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export type EntryInfo = {
  url: string;
  name: string;
  type: string;
};

export type Args = {
  _: string[];
  // -p --port
  p: number;
  port: number;
  // --cors
  cors: boolean;
  // -h --help
  h: boolean;
  help: boolean;
  // --verbose
  verbose: boolean;
  // -q --quite
  q: boolean;
  quite: boolean;
};
