/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { match } from "./imports/path_to_regexp.ts";

export function MatchRoute(path: string, route: string) {
  const mtc = match(path, { decode: decodeURIComponent });

  return !!mtc(route)!;
}

export function GetParams(path: string, route: string) {
  const mtc = match(path, { decode: decodeURIComponent });

  return mtc(route)!;
}
