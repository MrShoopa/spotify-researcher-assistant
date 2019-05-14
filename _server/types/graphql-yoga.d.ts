export class GraphQLServer {
  constructor(props: any);
  subscriptionServerOptions: any;
  options: any;
  middlewareFragmentReplacements: any;
  middlewares: any;
  express: any;
  subscriptionServer: any;
  context: any;
  executableSchema: any;
  createHttpServer(options: any): any;
  createSubscriptionServer(combinedServer: any): void;
  get(path: any, ...args: any[]): any;
  post(path: any, ...args: any[]): any;
  start(optionsOrCallback: any, callback: any): any;
  use(path: any, ...args: any[]): any;
}
export class GraphQLServerLambda {
  constructor(props: any);
  middlewareFragmentReplacements: any;
  graphqlHandler: any;
  playgroundHandler: any;
  handler: any;
  options: any;
  context: any;
  executableSchema: any;
}
export class MockList {
  constructor(len: any, wrappedFunction: any);
  len: any;
  wrappedFunction: any;
  mock(root: any, args: any, context: any, info: any, fieldType: any, mockTypeFunc: any): any;
  randint(low: any, high: any): any;
}
export class PubSub {
  constructor(options: any);
  ee: any;
  subscriptions: any;
  subIdCounter: any;
  asyncIterator(triggers: any): any;
  publish(triggerName: any, payload: any): any;
  subscribe(triggerName: any, onMessage: any): any;
  unsubscribe(subId: any): void;
}
export function withFilter(asyncIteratorFn: any, filterFn: any): any;
