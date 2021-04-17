/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export const Env = {
  Get(env: string) {
    return Deno.env.get(env);
  },
  Delete(env: string) {
    return Deno.env.delete(env);
  },
  Set(env: string, value: string) {
    return Deno.env.set(env, value);
  },
  GetAsObject() {
    return Deno.env.toObject();
  },
};
