/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { match } from "path_to_regexp";

/**
 * Match route from path name.
 */

export function MatchRoute(path: string, route: string) {
  const mtc = match(path, { decode: decodeURIComponent });

  return !!mtc(route)!;
}

export function GetParams(path: string, route: string) {
  const mtc = match(path, { decode: decodeURIComponent });

  return mtc(route)!;
}

/**
 * Normalize a pathname for matching, replaces multiple slashes with a single
 * slash and normalizes unicode characters to "NFC". When using this method,
 * `decode` should be an identity function so you don't decode strings twice.
 */
export function NormalizePathName(path: string) {
  return (
    decodeURI(path)
      // Replaces repeated slashes in the URL.
      .replace(/\/+/g, "/")
      // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
      // Note: Missing native IE support, may want to skip this step.
      .normalize()
  );
}
