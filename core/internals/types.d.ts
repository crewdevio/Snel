/// <reference lib="dom" />

declare module "*.svelte" {
  export default Svelte2TsxComponent;
}

interface IComponentOptions {
  target: Element;
  anchor?: Element;
  props?: Props;
  context?: Map<any, any>;
  hydrate?: boolean;
  intro?: boolean;
  $$inline?: boolean;
}

declare type Props = Record<string, any>;

declare class SvelteComponentDev extends SvelteComponent {
  /**
   * @private
   * For type checking capabilities only.
   * Does not exist at runtime.
   * ### DO NOT USE!
   */
  $$prop_def: Props;
  /**
   * @private
   * For type checking capabilities only.
   * Does not exist at runtime.
   * ### DO NOT USE!
   */
  $$events_def: any;
  /**
   * @private
   * For type checking capabilities only.
   * Does not exist at runtime.
   * ### DO NOT USE!
   */
  $$slot_def: any;
  constructor(options: IComponentOptions);
  $capture_state(): void;
  $inject_state(): void;
}

declare class SvelteComponentTyped<
  Props extends Record<string, any> = any,
  Events extends Record<string, any> = any,
  Slots extends Record<string, any> = any
> extends SvelteComponentDev {
  /**
   * @private
   * For type checking capabilities only.
   * Does not exist at runtime.
   * ### DO NOT USE!
   */
  $$prop_def: Props;
  /**
   * @private
   * For type checking capabilities only.
   * Does not exist at runtime.
   * ### DO NOT USE!
   */
  $$events_def: Events;
  /**
   * @private
   * For type checking capabilities only.
   * Does not exist at runtime.
   * ### DO NOT USE!
   */
  $$slot_def: Slots;
  constructor(options: IComponentOptions);
}

interface Fragment {
  key: string | null;
  first: null;
  c: () => void;
  l: (nodes: any) => void;
  h: () => void;
  m: (target: HTMLElement, anchor: any) => void;
  p: (ctx: any, dirty: any) => void;
  r: () => void;
  f: () => void;
  a: () => void;
  i: (local: any) => void;
  o: (local: any) => void;
  d: (detaching: 0 | 1) => void;
}

interface T$$ {
  dirty: number[];
  ctx: null | any;
  bound: any;
  update: () => void;
  callbacks: any;
  after_update: any[];
  props: Record<string, 0 | string>;
  fragment: null | false | Fragment;
  not_equal: any;
  before_update: any[];
  context: Map<any, any>;
  on_mount: any[];
  on_destroy: any[];
  skip_bound: boolean;
  on_disconnect: any[];
}

declare class SvelteComponent {
  $$: T$$;
  $$set?: ($$props: any) => void;
  $destroy(): void;
  $on(type: any, callback: any): () => void;
  $set($$props: any): void;
}

declare class Svelte2TsxComponent<
  Props extends {} = {},
  Events extends {} = {},
  Slots extends {} = {}
> {
  // svelte2tsx-specific
  /**
   * @internal This is for type checking capabilities only
   * and does not exist at runtime. Don't use this property.
   */
  $$prop_def: Props;
  /**
   * @internal This is for type checking capabilities only
   * and does not exist at runtime. Don't use this property.
   */
  $$events_def: Events;
  /**
   * @internal This is for type checking capabilities only
   * and does not exist at runtime. Don't use this property.
   */
  $$slot_def: Slots;
  // https://svelte.dev/docs#Client-side_component_API
  constructor(options: Svelte2TsxComponentConstructorParameters<Props>);
  /**
   * Causes the callback function to be called whenever the component dispatches an event.
   * A function is returned that will remove the event listener when called.
   */
  $on<K extends keyof Events & string>(
    event: K,
    handler: (e: Events[K]) => any
  ): () => void;
  /**
   * Removes a component from the DOM and triggers any `onDestroy` handlers.
   */
  $destroy(): void;
  /**
   * Programmatically sets props on an instance.
   * `component.$set({ x: 1 })` is equivalent to `x = 1` inside the component's `<script>` block.
   * Calling this method schedules an update for the next microtask — the DOM is __not__ updated synchronously.
   */
  $set(props?: Partial<Props>): void;
  // From SvelteComponent(Dev) definition
  $$: any;
  $capture_state(): void;
  $inject_state(): void;
}

interface Svelte2TsxComponentConstructorParameters<Props extends {}> {
  /**
   * An HTMLElement to render to. This option is required.
   */
  target: Element;
  /**
   * A child of `target` to render the component immediately before.
   */
  anchor?: Element;
  /**
   * An object of properties to supply to the component.
   */
  props?: Props;
  hydrate?: boolean;
  intro?: boolean;
  $$inline?: boolean;
}

type AConstructorTypeOf<T, U extends any[] = any[]> = new (...args: U) => T;
type SvelteComponentConstructor<
  T,
  U extends Svelte2TsxComponentConstructorParameters<any>
> = new (options: U) => T;

type SvelteActionReturnType = {
  update?: (args: any) => void;
  destroy?: () => void;
} | void;

type SvelteTransitionConfig = {
  delay?: number;
  duration?: number;
  easing?: (t: number) => number;
  css?: (t: number, u: number) => string;
  tick?: (t: number, u: number) => void;
};

type SvelteTransitionReturnType =
  | SvelteTransitionConfig
  | (() => SvelteTransitionConfig);

type SvelteAnimationReturnType = {
  delay?: number;
  duration?: number;
  easing?: (t: number) => number;
  css?: (t: number, u: number) => string;
  tick?: (t: number, u: number) => void;
};

type SvelteWithOptionalProps<Props, Keys extends keyof Props> = Omit<
  Props,
  Keys
> &
  Partial<Pick<Props, Keys>>;
type SvelteAllProps = { [index: string]: any };
type SveltePropsAnyFallback<Props> = {
  [K in keyof Props]: Props[K] extends undefined ? any : Props[K];
};
type SvelteRestProps = { [index: string]: any };
type SvelteSlots = { [index: string]: any };
type SvelteStore<T> = {
  subscribe: (run: (value: T) => any, invalidate?: any) => any;
};

// Forces TypeScript to look into the type which results in a better representation of it
// which helps for error messages
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

declare var process: Record<string, string> & { browser: boolean };
declare var __sveltets_AnimationMove: { from: DOMRect; to: DOMRect };

declare function __sveltets_ensureAnimation(
  animationCall: SvelteAnimationReturnType
): {};
declare function __sveltets_ensureAction(
  actionCall: SvelteActionReturnType
): {};
declare function __sveltets_ensureTransition(
  transitionCall: SvelteTransitionReturnType
): {};
declare function __sveltets_ensureFunction(
  expression: (e: Event & { detail?: any }) => unknown
): {};
declare function __sveltets_ensureType<T>(
  type: AConstructorTypeOf<T>,
  el: T
): {};
declare function __sveltets_cssProp(prop: Record<string, any>): {};
declare function __sveltets_ctorOf<T>(type: T): AConstructorTypeOf<T>;
declare function __sveltets_instanceOf<T = any>(type: AConstructorTypeOf<T>): T;
declare function __sveltets_allPropsType(): SvelteAllProps;
declare function __sveltets_restPropsType(): SvelteRestProps;
declare function __sveltets_slotsType<Slots, Key extends keyof Slots>(
  slots: Slots
): Record<Key, boolean>;

// Overload of the following two functions is necessary.
// An empty array of optionalProps makes OptionalProps type any, which means we lose the prop typing.
// optionalProps need to be first or its type cannot be infered correctly.

declare function __sveltets_partial<
  Props = {},
  Events = {},
  Slots = {}
>(render: {
  props?: Props;
  events?: Events;
  slots?: Slots;
}): { props?: SveltePropsAnyFallback<Props>; events?: Events; slots?: Slots };
declare function __sveltets_partial<
  Props = {},
  Events = {},
  Slots = {},
  OptionalProps extends keyof Props = any
>(
  optionalProps: OptionalProps[],
  render: { props?: Props; events?: Events; slots?: Slots }
): {
  props?: Expand<
    SvelteWithOptionalProps<SveltePropsAnyFallback<Props>, OptionalProps>
  >;
  events?: Events;
  slots?: Slots;
};

declare function __sveltets_partial_with_any<
  Props = {},
  Events = {},
  Slots = {}
>(render: {
  props?: Props;
  events?: Events;
  slots?: Slots;
}): {
  props?: SveltePropsAnyFallback<Props> & SvelteAllProps;
  events?: Events;
  slots?: Slots;
};
declare function __sveltets_partial_with_any<
  Props = {},
  Events = {},
  Slots = {},
  OptionalProps extends keyof Props = any
>(
  optionalProps: OptionalProps[],
  render: { props?: Props; events?: Events; slots?: Slots }
): {
  props?: Expand<
    SvelteWithOptionalProps<SveltePropsAnyFallback<Props>, OptionalProps>
  > &
    SvelteAllProps;
  events?: Events;
  slots?: Slots;
};

declare function __sveltets_with_any<
  Props = {},
  Events = {},
  Slots = {}
>(render: {
  props?: Props;
  events?: Events;
  slots?: Slots;
}): { props?: Props & SvelteAllProps; events?: Events; slots?: Slots };

declare function __sveltets_with_any_event<
  Props = {},
  Events = {},
  Slots = {}
>(render: {
  props?: Props;
  events?: Events;
  slots?: Slots;
}): {
  props?: Props;
  events?: Events & { [evt: string]: CustomEvent<any> };
  slots?: Slots;
};

declare function __sveltets_store_get<T = any>(store: SvelteStore<T>): T;
declare function __sveltets_any(dummy: any): any;
declare function __sveltets_empty(dummy: any): {};
declare function __sveltets_componentType(): AConstructorTypeOf<
  Svelte2TsxComponent<any, any, any>
>;
declare function __sveltets_invalidate<T>(getValue: () => T): T;

declare function __sveltets_mapWindowEvent<
  K extends keyof HTMLBodyElementEventMap
>(event: K): HTMLBodyElementEventMap[K];
declare function __sveltets_mapBodyEvent<K extends keyof WindowEventMap>(
  event: K
): WindowEventMap[K];
declare function __sveltets_mapElementEvent<
  K extends keyof HTMLElementEventMap
>(event: K): HTMLElementEventMap[K];
declare function __sveltets_mapElementTag<K extends keyof ElementTagNameMap>(
  tag: K
): ElementTagNameMap[K];
declare function __sveltets_mapElementTag<K extends keyof SVGElementTagNameMap>(
  tag: K
): SVGElementTagNameMap[K];
declare function __sveltets_mapElementTag(tag: any): HTMLElement;

declare function __sveltets_bubbleEventDef<Events, K extends keyof Events>(
  events: Events,
  eventKey: K
): Events[K];
declare function __sveltets_bubbleEventDef(events: any, eventKey: string): any;

declare const __sveltets_customEvent: CustomEvent<any>;
declare function __sveltets_toEventTypings<Typings>(): {
  [Key in keyof Typings]: CustomEvent<Typings[Key]>;
};

declare function __sveltets_unionType<T1, T2>(t1: T1, t2: T2): T1 | T2;
declare function __sveltets_unionType<T1, T2, T3>(
  t1: T1,
  t2: T2,
  t3: T3
): T1 | T2 | T3;
declare function __sveltets_unionType<T1, T2, T3, T4>(
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4
): T1 | T2 | T3 | T4;
declare function __sveltets_unionType(...types: any[]): any;

declare function __sveltets_awaitThen<T>(
  promise: T,
  onfulfilled: (value: T extends PromiseLike<infer U> ? U : T) => any,
  onrejected?: (value: T extends PromiseLike<any> ? any : never) => any
): any;

declare function __sveltets_each<T>(
  array: ArrayLike<T>,
  callbackfn: (value: T, index: number) => any
): any;

declare function createSvelte2TsxComponent<Props, Events, Slots>(render: {
  props?: Props;
  events?: Events;
  slots?: Slots;
}): SvelteComponentConstructor<
  Svelte2TsxComponent<Props, Events, Slots>,
  Svelte2TsxComponentConstructorParameters<Props>
>;

declare function __sveltets_unwrapArr<T>(arr: ArrayLike<T>): T;
declare function __sveltets_unwrapPromiseLike<T>(
  promise: PromiseLike<T> | T
): T;

interface RouteProps {
  path?: string;
  component?: typeof SvelteComponent;
  [additionalProp: string]: unknown;
}

interface RouteSlots {
  default: {
    location: RouteLocation;
    params: RouteParams;
  };
}

interface RouteLocation {
  pathname: string;
  search: string;
  hash?: string;
  state: {
    [k in string | number]: unknown;
  };
}

interface RouteParams {
  [param: string]: string;
}

interface LinkProps {
  to: string;
  replace?: boolean;
  state?: {
    [k in string | number]: unknown;
  };
  getProps?: (linkParams: GetPropsParams) => Record<string, any>;
}

interface GetPropsParams {
  location: RouteLocation;
  href: string;
  isPartiallyCurrent: boolean;
  isCurrent: boolean;
}

interface RouterProps {
  basepath?: string;
  url?: string;
}

declare module "svelte" {
  export function beforeUpdate(fn: () => any): void;
  export function onMount(fn: () => any): void;
  export function afterUpdate(fn: () => any): void;
  export function onDestroy(fn: () => any): void;
  export function createEventDispatcher<EventMap extends {} = any>(): <
    EventKey extends Extract<keyof EventMap, string>
  >(
    type: EventKey,
    detail?: EventMap[EventKey]
  ) => void;

  export function setContext<T>(key: any, context: T): void;
  export function getContext<T>(key: any): T;
  export function tick(): Promise<void>;
}

declare module "svelte/store" {
  export type Subscriber<T> = (value: T) => void;
  /** Unsubscribes from value updates. */
  export type Unsubscriber = () => void;
  /** Callback to update a value. */
  export type Updater<T> = (value: T) => T;
  /** Cleanup logic callback. */
  type Invalidator<T> = (value?: T) => void;
  /** Start and stop notification callbacks. */
  export type StartStopNotifier<T> = (
    set: Subscriber<T>
  ) => Unsubscriber | void;
  /** Readable interface for subscribing. */
  export interface Readable<T> {
    /**
     * Subscribe on value changes.
     * @param run subscription callback
     * @param invalidate cleanup callback
     */
    subscribe(
      this: void,
      run: Subscriber<T>,
      invalidate?: Invalidator<T>
    ): Unsubscriber;
  }
  /** Writable interface for both updating and subscribing. */
  export interface Writable<T> extends Readable<T> {
    /**
     * Set value and inform subscribers.
     * @param value to set
     */
    set(this: void, value: T): void;
    /**
     * Update value using callback and inform subscribers.
     * @param updater callback
     */
    update(this: void, updater: Updater<T>): void;
  }
  /**
   * Creates a `Readable` store that allows reading by subscription.
   * @param value initial value
   * @param {StartStopNotifier}start start and stop notifications for subscriptions
   */
  export function readable<T>(
    value: T,
    start: StartStopNotifier<T>
  ): Readable<T>;
  /**
   * Create a `Writable` store that allows both updating and reading by subscription.
   * @param {*=}value initial value
   * @param {StartStopNotifier=}start start and stop notifications for subscriptions
   */
  export function writable<T>(
    value: T,
    start?: StartStopNotifier<T>
  ): Writable<T>;
  /** One or more `Readable`s. */
  type Stores = Readable<any> | [Readable<any>, ...Array<Readable<any>>];
  /** One or more values from `Readable` stores. */
  type StoresValues<T> = T extends Readable<infer U>
    ? U
    : {
        [K in keyof T]: T[K] extends Readable<infer U> ? U : never;
      };
  /**
   * Derived value store by synchronizing one or more readable stores and
   * applying an aggregation function over its input values.
   *
   * @param stores - input stores
   * @param fn - function callback that aggregates the values
   * @param initial_value - when used asynchronously
   */
  export function derived<S extends Stores, T>(
    stores: S,
    fn: (
      values: StoresValues<S>,
      set: (value: T) => void
    ) => Unsubscriber | void,
    initial_value?: T
  ): Readable<T>;
  /**
   * Derived value store by synchronizing one or more readable stores and
   * applying an aggregation function over its input values.
   *
   * @param stores - input stores
   * @param fn - function callback that aggregates the values
   * @param initial_value - initial value
   */
  export function derived<S extends Stores, T>(
    stores: S,
    fn: (values: StoresValues<S>) => T,
    initial_value?: T
  ): Readable<T>;
  /**
   * Derived value store by synchronizing one or more readable stores and
   * applying an aggregation function over its input values.
   *
   * @param stores - input stores
   * @param fn - function callback that aggregates the values
   */
  export function derived<S extends Stores, T>(
    stores: S,
    fn: (values: StoresValues<S>) => T
  ): Readable<T>;
  /**
   * Get the current value from a store by subscribing and immediately unsubscribing.
   * @param store readable
   */
}

declare module "svelte/transition" {
  export type EasingFunction = (t: number) => number;
  export interface TransitionConfig {
    delay?: number;
    duration?: number;
    easing?: EasingFunction;
    css?: (t: number, u: number) => string;
    tick?: (t: number, u: number) => void;
  }
  export interface BlurParams {
    delay?: number;
    duration?: number;
    easing?: EasingFunction;
    amount?: number;
    opacity?: number;
  }
  export function blur(
    node: Element,
    { delay, duration, easing, amount, opacity }?: BlurParams
  ): TransitionConfig;
  export interface FadeParams {
    delay?: number;
    duration?: number;
    easing?: EasingFunction;
  }
  export function fade(
    node: Element,
    { delay, duration, easing }?: FadeParams
  ): TransitionConfig;
  export interface FlyParams {
    delay?: number;
    duration?: number;
    easing?: EasingFunction;
    x?: number;
    y?: number;
    opacity?: number;
  }
  export function fly(
    node: Element,
    { delay, duration, easing, x, y, opacity }?: FlyParams
  ): TransitionConfig;
  export interface SlideParams {
    delay?: number;
    duration?: number;
    easing?: EasingFunction;
  }
  export function slide(
    node: Element,
    { delay, duration, easing }?: SlideParams
  ): TransitionConfig;
  export interface ScaleParams {
    delay?: number;
    duration?: number;
    easing?: EasingFunction;
    start?: number;
    opacity?: number;
  }
  export function scale(
    node: Element,
    { delay, duration, easing, start, opacity }?: ScaleParams
  ): TransitionConfig;
  export interface DrawParams {
    delay?: number;
    speed?: number;
    duration?: number | ((len: number) => number);
    easing?: EasingFunction;
  }
  export function draw(
    node: SVGElement & {
      getTotalLength(): number;
    },
    { delay, speed, duration, easing }?: DrawParams
  ): TransitionConfig;
  export interface CrossfadeParams {
    delay?: number;
    duration?: number | ((len: number) => number);
    easing?: EasingFunction;
  }
  export function crossfade({
    fallback,
    ...defaults
  }: CrossfadeParams & {
    fallback?: (
      node: Element,
      params: CrossfadeParams,
      intro: boolean
    ) => TransitionConfig;
  }): Array<
    (
      node: Element,
      params: CrossfadeParams & {
        key: any;
      }
    ) => () => TransitionConfig
  >;
}

declare module "svelte/easing" {
  export function backInOut(t: number): number;
  export function backIn(t: number): number;
  export function backOut(t: number): number;
  export function bounceOut(t: number): number;
  export function bounceInOut(t: number): number;
  export function bounceIn(t: number): number;
  export function circInOut(t: number): number;
  export function circIn(t: number): number;
  export function circOut(t: number): number;
  export function cubicInOut(t: number): number;
  export function cubicIn(t: number): number;
  export function cubicOut(t: number): number;
  export function elasticInOut(t: number): number;
  export function elasticIn(t: number): number;
  export function elasticOut(t: number): number;
  export function expoInOut(t: number): number;
  export function expoIn(t: number): number;
  export function expoOut(t: number): number;
  export function quadInOut(t: number): number;
  export function quadIn(t: number): number;
  export function quadOut(t: number): number;
  export function quartInOut(t: number): number;
  export function quartIn(t: number): number;
  export function quartOut(t: number): number;
  export function quintInOut(t: number): number;
  export function quintIn(t: number): number;
  export function quintOut(t: number): number;
  export function sineInOut(t: number): number;
  export function sineIn(t: number): number;
  export function sineOut(t: number): number;
}

declare module "svelte/animate" {
  export interface AnimationConfig {
    delay?: number;
    duration?: number;
    easing?: (t: number) => number;
    css?: (t: number, u: number) => string;
    tick?: (t: number, u: number) => void;
  }
  interface FlipParams {
    delay?: number;
    duration?: number | ((len: number) => number);
    easing?: (t: number) => number;
  }
  export function flip(
    node: Element,
    animation: {
      from: DOMRect;
      to: DOMRect;
    },
    params?: FlipParams
  ): AnimationConfig;
}

declare module "svelte-routing" {
  export const navigate: (
    to: string,
    {
      replace,
      state,
    }?: {
      replace?: boolean;
      state?: {
        [k in string | number]: unknown;
      };
    }
  ) => void;

  export const link: (node: Element) => { destroy(): void };
  export const links: (node: Element) => { destroy(): void };
}

declare module "svelte-routing/Link.svelte" {
  export default class Link extends SvelteComponentTyped<LinkProps> {}
}

declare module "svelte-routing/Route.svelte" {
  export default class Route extends SvelteComponentTyped<
    RouteProps,
    Record<string, any>,
    RouteSlots
  > {}
}

declare module "svelte-routing/Router.svelte" {
  export default class Router extends SvelteComponentTyped<RouterProps> {}
}

declare module "snel" {
  interface Env {
    Get(env: string): string | undefined;
    Delete(env: string): void;
    Set(env: string, value: string): void;
    GetAsObject(): { [index: string]: string };
  }

  interface ICore {
    /**
     * manage env variables in snel
     */
    Env: Env;

    /**
     * Match route from path name.
     */
    MatchRoute(path: string, route: string): Boolean;

    /**
     * get params from request object
     */
    GetParams<P extends object = object>(
      path: string,
      route: string
    ):
      | {
          path: string;
          index: number;
          params: P;
        }
      | false;

    /**
     * Normalize a pathname for matching, replaces multiple slashes with a single
     * slash and normalizes unicode characters to "NFC". When using this method,
     * `decode` should be an identity function so you don't decode strings twice.
     */
    NormalizePathName(path: string): string;
  }

  const Core: ICore;

  export { Core };
}
