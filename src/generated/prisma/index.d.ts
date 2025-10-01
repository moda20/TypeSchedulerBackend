
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model cache_files
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type cache_files = $Result.DefaultSelection<Prisma.$cache_filesPayload>
/**
 * Model output_files
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type output_files = $Result.DefaultSelection<Prisma.$output_filesPayload>
/**
 * Model proxy
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type proxy = $Result.DefaultSelection<Prisma.$proxyPayload>
/**
 * Model proxy_job
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type proxy_job = $Result.DefaultSelection<Prisma.$proxy_jobPayload>
/**
 * Model schedule_job
 * 
 */
export type schedule_job = $Result.DefaultSelection<Prisma.$schedule_jobPayload>
/**
 * Model schedule_job_log
 * 
 */
export type schedule_job_log = $Result.DefaultSelection<Prisma.$schedule_job_logPayload>
/**
 * Model job_event_log
 * 
 */
export type job_event_log = $Result.DefaultSelection<Prisma.$job_event_logPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const proxy_status: {
  active: 'active',
  inactive: 'inactive'
};

export type proxy_status = (typeof proxy_status)[keyof typeof proxy_status]

}

export type proxy_status = $Enums.proxy_status

export const proxy_status: typeof $Enums.proxy_status

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Cache_files
 * const cache_files = await prisma.cache_files.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Cache_files
   * const cache_files = await prisma.cache_files.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.cache_files`: Exposes CRUD operations for the **cache_files** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cache_files
    * const cache_files = await prisma.cache_files.findMany()
    * ```
    */
  get cache_files(): Prisma.cache_filesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.output_files`: Exposes CRUD operations for the **output_files** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Output_files
    * const output_files = await prisma.output_files.findMany()
    * ```
    */
  get output_files(): Prisma.output_filesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.proxy`: Exposes CRUD operations for the **proxy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Proxies
    * const proxies = await prisma.proxy.findMany()
    * ```
    */
  get proxy(): Prisma.proxyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.proxy_job`: Exposes CRUD operations for the **proxy_job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Proxy_jobs
    * const proxy_jobs = await prisma.proxy_job.findMany()
    * ```
    */
  get proxy_job(): Prisma.proxy_jobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.schedule_job`: Exposes CRUD operations for the **schedule_job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schedule_jobs
    * const schedule_jobs = await prisma.schedule_job.findMany()
    * ```
    */
  get schedule_job(): Prisma.schedule_jobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.schedule_job_log`: Exposes CRUD operations for the **schedule_job_log** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schedule_job_logs
    * const schedule_job_logs = await prisma.schedule_job_log.findMany()
    * ```
    */
  get schedule_job_log(): Prisma.schedule_job_logDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.job_event_log`: Exposes CRUD operations for the **job_event_log** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Job_event_logs
    * const job_event_logs = await prisma.job_event_log.findMany()
    * ```
    */
  get job_event_log(): Prisma.job_event_logDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.5.0
   * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    cache_files: 'cache_files',
    output_files: 'output_files',
    proxy: 'proxy',
    proxy_job: 'proxy_job',
    schedule_job: 'schedule_job',
    schedule_job_log: 'schedule_job_log',
    job_event_log: 'job_event_log'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "cache_files" | "output_files" | "proxy" | "proxy_job" | "schedule_job" | "schedule_job_log" | "job_event_log"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      cache_files: {
        payload: Prisma.$cache_filesPayload<ExtArgs>
        fields: Prisma.cache_filesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.cache_filesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cache_filesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.cache_filesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cache_filesPayload>
          }
          findFirst: {
            args: Prisma.cache_filesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cache_filesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.cache_filesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cache_filesPayload>
          }
          findMany: {
            args: Prisma.cache_filesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cache_filesPayload>[]
          }
          create: {
            args: Prisma.cache_filesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cache_filesPayload>
          }
          createMany: {
            args: Prisma.cache_filesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.cache_filesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cache_filesPayload>
          }
          update: {
            args: Prisma.cache_filesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cache_filesPayload>
          }
          deleteMany: {
            args: Prisma.cache_filesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.cache_filesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.cache_filesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cache_filesPayload>
          }
          aggregate: {
            args: Prisma.Cache_filesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCache_files>
          }
          groupBy: {
            args: Prisma.cache_filesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Cache_filesGroupByOutputType>[]
          }
          count: {
            args: Prisma.cache_filesCountArgs<ExtArgs>
            result: $Utils.Optional<Cache_filesCountAggregateOutputType> | number
          }
        }
      }
      output_files: {
        payload: Prisma.$output_filesPayload<ExtArgs>
        fields: Prisma.output_filesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.output_filesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$output_filesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.output_filesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$output_filesPayload>
          }
          findFirst: {
            args: Prisma.output_filesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$output_filesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.output_filesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$output_filesPayload>
          }
          findMany: {
            args: Prisma.output_filesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$output_filesPayload>[]
          }
          create: {
            args: Prisma.output_filesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$output_filesPayload>
          }
          createMany: {
            args: Prisma.output_filesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.output_filesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$output_filesPayload>
          }
          update: {
            args: Prisma.output_filesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$output_filesPayload>
          }
          deleteMany: {
            args: Prisma.output_filesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.output_filesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.output_filesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$output_filesPayload>
          }
          aggregate: {
            args: Prisma.Output_filesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutput_files>
          }
          groupBy: {
            args: Prisma.output_filesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Output_filesGroupByOutputType>[]
          }
          count: {
            args: Prisma.output_filesCountArgs<ExtArgs>
            result: $Utils.Optional<Output_filesCountAggregateOutputType> | number
          }
        }
      }
      proxy: {
        payload: Prisma.$proxyPayload<ExtArgs>
        fields: Prisma.proxyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.proxyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.proxyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxyPayload>
          }
          findFirst: {
            args: Prisma.proxyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.proxyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxyPayload>
          }
          findMany: {
            args: Prisma.proxyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxyPayload>[]
          }
          create: {
            args: Prisma.proxyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxyPayload>
          }
          createMany: {
            args: Prisma.proxyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.proxyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxyPayload>
          }
          update: {
            args: Prisma.proxyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxyPayload>
          }
          deleteMany: {
            args: Prisma.proxyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.proxyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.proxyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxyPayload>
          }
          aggregate: {
            args: Prisma.ProxyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProxy>
          }
          groupBy: {
            args: Prisma.proxyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProxyGroupByOutputType>[]
          }
          count: {
            args: Prisma.proxyCountArgs<ExtArgs>
            result: $Utils.Optional<ProxyCountAggregateOutputType> | number
          }
        }
      }
      proxy_job: {
        payload: Prisma.$proxy_jobPayload<ExtArgs>
        fields: Prisma.proxy_jobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.proxy_jobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxy_jobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.proxy_jobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxy_jobPayload>
          }
          findFirst: {
            args: Prisma.proxy_jobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxy_jobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.proxy_jobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxy_jobPayload>
          }
          findMany: {
            args: Prisma.proxy_jobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxy_jobPayload>[]
          }
          create: {
            args: Prisma.proxy_jobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxy_jobPayload>
          }
          createMany: {
            args: Prisma.proxy_jobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.proxy_jobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxy_jobPayload>
          }
          update: {
            args: Prisma.proxy_jobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxy_jobPayload>
          }
          deleteMany: {
            args: Prisma.proxy_jobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.proxy_jobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.proxy_jobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proxy_jobPayload>
          }
          aggregate: {
            args: Prisma.Proxy_jobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProxy_job>
          }
          groupBy: {
            args: Prisma.proxy_jobGroupByArgs<ExtArgs>
            result: $Utils.Optional<Proxy_jobGroupByOutputType>[]
          }
          count: {
            args: Prisma.proxy_jobCountArgs<ExtArgs>
            result: $Utils.Optional<Proxy_jobCountAggregateOutputType> | number
          }
        }
      }
      schedule_job: {
        payload: Prisma.$schedule_jobPayload<ExtArgs>
        fields: Prisma.schedule_jobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.schedule_jobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_jobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.schedule_jobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_jobPayload>
          }
          findFirst: {
            args: Prisma.schedule_jobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_jobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.schedule_jobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_jobPayload>
          }
          findMany: {
            args: Prisma.schedule_jobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_jobPayload>[]
          }
          create: {
            args: Prisma.schedule_jobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_jobPayload>
          }
          createMany: {
            args: Prisma.schedule_jobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.schedule_jobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_jobPayload>
          }
          update: {
            args: Prisma.schedule_jobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_jobPayload>
          }
          deleteMany: {
            args: Prisma.schedule_jobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.schedule_jobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.schedule_jobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_jobPayload>
          }
          aggregate: {
            args: Prisma.Schedule_jobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchedule_job>
          }
          groupBy: {
            args: Prisma.schedule_jobGroupByArgs<ExtArgs>
            result: $Utils.Optional<Schedule_jobGroupByOutputType>[]
          }
          count: {
            args: Prisma.schedule_jobCountArgs<ExtArgs>
            result: $Utils.Optional<Schedule_jobCountAggregateOutputType> | number
          }
        }
      }
      schedule_job_log: {
        payload: Prisma.$schedule_job_logPayload<ExtArgs>
        fields: Prisma.schedule_job_logFieldRefs
        operations: {
          findUnique: {
            args: Prisma.schedule_job_logFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_job_logPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.schedule_job_logFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_job_logPayload>
          }
          findFirst: {
            args: Prisma.schedule_job_logFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_job_logPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.schedule_job_logFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_job_logPayload>
          }
          findMany: {
            args: Prisma.schedule_job_logFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_job_logPayload>[]
          }
          create: {
            args: Prisma.schedule_job_logCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_job_logPayload>
          }
          createMany: {
            args: Prisma.schedule_job_logCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.schedule_job_logDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_job_logPayload>
          }
          update: {
            args: Prisma.schedule_job_logUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_job_logPayload>
          }
          deleteMany: {
            args: Prisma.schedule_job_logDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.schedule_job_logUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.schedule_job_logUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$schedule_job_logPayload>
          }
          aggregate: {
            args: Prisma.Schedule_job_logAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchedule_job_log>
          }
          groupBy: {
            args: Prisma.schedule_job_logGroupByArgs<ExtArgs>
            result: $Utils.Optional<Schedule_job_logGroupByOutputType>[]
          }
          count: {
            args: Prisma.schedule_job_logCountArgs<ExtArgs>
            result: $Utils.Optional<Schedule_job_logCountAggregateOutputType> | number
          }
        }
      }
      job_event_log: {
        payload: Prisma.$job_event_logPayload<ExtArgs>
        fields: Prisma.job_event_logFieldRefs
        operations: {
          findUnique: {
            args: Prisma.job_event_logFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_event_logPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.job_event_logFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_event_logPayload>
          }
          findFirst: {
            args: Prisma.job_event_logFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_event_logPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.job_event_logFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_event_logPayload>
          }
          findMany: {
            args: Prisma.job_event_logFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_event_logPayload>[]
          }
          create: {
            args: Prisma.job_event_logCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_event_logPayload>
          }
          createMany: {
            args: Prisma.job_event_logCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.job_event_logDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_event_logPayload>
          }
          update: {
            args: Prisma.job_event_logUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_event_logPayload>
          }
          deleteMany: {
            args: Prisma.job_event_logDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.job_event_logUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.job_event_logUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_event_logPayload>
          }
          aggregate: {
            args: Prisma.Job_event_logAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob_event_log>
          }
          groupBy: {
            args: Prisma.job_event_logGroupByArgs<ExtArgs>
            result: $Utils.Optional<Job_event_logGroupByOutputType>[]
          }
          count: {
            args: Prisma.job_event_logCountArgs<ExtArgs>
            result: $Utils.Optional<Job_event_logCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    cache_files?: cache_filesOmit
    output_files?: output_filesOmit
    proxy?: proxyOmit
    proxy_job?: proxy_jobOmit
    schedule_job?: schedule_jobOmit
    schedule_job_log?: schedule_job_logOmit
    job_event_log?: job_event_logOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProxyCountOutputType
   */

  export type ProxyCountOutputType = {
    jobs: number
  }

  export type ProxyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | ProxyCountOutputTypeCountJobsArgs
  }

  // Custom InputTypes
  /**
   * ProxyCountOutputType without action
   */
  export type ProxyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProxyCountOutputType
     */
    select?: ProxyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProxyCountOutputType without action
   */
  export type ProxyCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: proxy_jobWhereInput
  }


  /**
   * Count Type Schedule_jobCountOutputType
   */

  export type Schedule_jobCountOutputType = {
    job_logs: number
    proxies: number
  }

  export type Schedule_jobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job_logs?: boolean | Schedule_jobCountOutputTypeCountJob_logsArgs
    proxies?: boolean | Schedule_jobCountOutputTypeCountProxiesArgs
  }

  // Custom InputTypes
  /**
   * Schedule_jobCountOutputType without action
   */
  export type Schedule_jobCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule_jobCountOutputType
     */
    select?: Schedule_jobCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Schedule_jobCountOutputType without action
   */
  export type Schedule_jobCountOutputTypeCountJob_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: schedule_job_logWhereInput
  }

  /**
   * Schedule_jobCountOutputType without action
   */
  export type Schedule_jobCountOutputTypeCountProxiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: proxy_jobWhereInput
  }


  /**
   * Count Type Schedule_job_logCountOutputType
   */

  export type Schedule_job_logCountOutputType = {
    cache_files: number
    output_files: number
    events: number
  }

  export type Schedule_job_logCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cache_files?: boolean | Schedule_job_logCountOutputTypeCountCache_filesArgs
    output_files?: boolean | Schedule_job_logCountOutputTypeCountOutput_filesArgs
    events?: boolean | Schedule_job_logCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * Schedule_job_logCountOutputType without action
   */
  export type Schedule_job_logCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule_job_logCountOutputType
     */
    select?: Schedule_job_logCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Schedule_job_logCountOutputType without action
   */
  export type Schedule_job_logCountOutputTypeCountCache_filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cache_filesWhereInput
  }

  /**
   * Schedule_job_logCountOutputType without action
   */
  export type Schedule_job_logCountOutputTypeCountOutput_filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: output_filesWhereInput
  }

  /**
   * Schedule_job_logCountOutputType without action
   */
  export type Schedule_job_logCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: job_event_logWhereInput
  }


  /**
   * Models
   */

  /**
   * Model cache_files
   */

  export type AggregateCache_files = {
    _count: Cache_filesCountAggregateOutputType | null
    _avg: Cache_filesAvgAggregateOutputType | null
    _sum: Cache_filesSumAggregateOutputType | null
    _min: Cache_filesMinAggregateOutputType | null
    _max: Cache_filesMaxAggregateOutputType | null
  }

  export type Cache_filesAvgAggregateOutputType = {
    id: number | null
    file_size: number | null
    time_to_live: number | null
  }

  export type Cache_filesSumAggregateOutputType = {
    id: number | null
    file_size: bigint | null
    time_to_live: bigint | null
  }

  export type Cache_filesMinAggregateOutputType = {
    id: number | null
    job_log_id: string | null
    created_at: Date | null
    updated_at: Date | null
    file_name: string | null
    file_tags: string | null
    file_path: string | null
    file_size: bigint | null
    time_to_live: bigint | null
    file_type: string | null
    last_downloaded: Date | null
  }

  export type Cache_filesMaxAggregateOutputType = {
    id: number | null
    job_log_id: string | null
    created_at: Date | null
    updated_at: Date | null
    file_name: string | null
    file_tags: string | null
    file_path: string | null
    file_size: bigint | null
    time_to_live: bigint | null
    file_type: string | null
    last_downloaded: Date | null
  }

  export type Cache_filesCountAggregateOutputType = {
    id: number
    job_log_id: number
    created_at: number
    updated_at: number
    file_name: number
    file_tags: number
    file_path: number
    file_size: number
    time_to_live: number
    file_type: number
    last_downloaded: number
    _all: number
  }


  export type Cache_filesAvgAggregateInputType = {
    id?: true
    file_size?: true
    time_to_live?: true
  }

  export type Cache_filesSumAggregateInputType = {
    id?: true
    file_size?: true
    time_to_live?: true
  }

  export type Cache_filesMinAggregateInputType = {
    id?: true
    job_log_id?: true
    created_at?: true
    updated_at?: true
    file_name?: true
    file_tags?: true
    file_path?: true
    file_size?: true
    time_to_live?: true
    file_type?: true
    last_downloaded?: true
  }

  export type Cache_filesMaxAggregateInputType = {
    id?: true
    job_log_id?: true
    created_at?: true
    updated_at?: true
    file_name?: true
    file_tags?: true
    file_path?: true
    file_size?: true
    time_to_live?: true
    file_type?: true
    last_downloaded?: true
  }

  export type Cache_filesCountAggregateInputType = {
    id?: true
    job_log_id?: true
    created_at?: true
    updated_at?: true
    file_name?: true
    file_tags?: true
    file_path?: true
    file_size?: true
    time_to_live?: true
    file_type?: true
    last_downloaded?: true
    _all?: true
  }

  export type Cache_filesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cache_files to aggregate.
     */
    where?: cache_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cache_files to fetch.
     */
    orderBy?: cache_filesOrderByWithRelationInput | cache_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: cache_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cache_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cache_files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cache_files
    **/
    _count?: true | Cache_filesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Cache_filesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Cache_filesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Cache_filesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Cache_filesMaxAggregateInputType
  }

  export type GetCache_filesAggregateType<T extends Cache_filesAggregateArgs> = {
        [P in keyof T & keyof AggregateCache_files]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCache_files[P]>
      : GetScalarType<T[P], AggregateCache_files[P]>
  }




  export type cache_filesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cache_filesWhereInput
    orderBy?: cache_filesOrderByWithAggregationInput | cache_filesOrderByWithAggregationInput[]
    by: Cache_filesScalarFieldEnum[] | Cache_filesScalarFieldEnum
    having?: cache_filesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Cache_filesCountAggregateInputType | true
    _avg?: Cache_filesAvgAggregateInputType
    _sum?: Cache_filesSumAggregateInputType
    _min?: Cache_filesMinAggregateInputType
    _max?: Cache_filesMaxAggregateInputType
  }

  export type Cache_filesGroupByOutputType = {
    id: number
    job_log_id: string
    created_at: Date
    updated_at: Date
    file_name: string
    file_tags: string | null
    file_path: string
    file_size: bigint
    time_to_live: bigint
    file_type: string
    last_downloaded: Date | null
    _count: Cache_filesCountAggregateOutputType | null
    _avg: Cache_filesAvgAggregateOutputType | null
    _sum: Cache_filesSumAggregateOutputType | null
    _min: Cache_filesMinAggregateOutputType | null
    _max: Cache_filesMaxAggregateOutputType | null
  }

  type GetCache_filesGroupByPayload<T extends cache_filesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Cache_filesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Cache_filesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Cache_filesGroupByOutputType[P]>
            : GetScalarType<T[P], Cache_filesGroupByOutputType[P]>
        }
      >
    >


  export type cache_filesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job_log_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    file_name?: boolean
    file_tags?: boolean
    file_path?: boolean
    file_size?: boolean
    time_to_live?: boolean
    file_type?: boolean
    last_downloaded?: boolean
    schedule_job_log?: boolean | schedule_job_logDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cache_files"]>



  export type cache_filesSelectScalar = {
    id?: boolean
    job_log_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    file_name?: boolean
    file_tags?: boolean
    file_path?: boolean
    file_size?: boolean
    time_to_live?: boolean
    file_type?: boolean
    last_downloaded?: boolean
  }

  export type cache_filesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "job_log_id" | "created_at" | "updated_at" | "file_name" | "file_tags" | "file_path" | "file_size" | "time_to_live" | "file_type" | "last_downloaded", ExtArgs["result"]["cache_files"]>
  export type cache_filesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedule_job_log?: boolean | schedule_job_logDefaultArgs<ExtArgs>
  }

  export type $cache_filesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "cache_files"
    objects: {
      schedule_job_log: Prisma.$schedule_job_logPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      job_log_id: string
      created_at: Date
      updated_at: Date
      file_name: string
      file_tags: string | null
      file_path: string
      file_size: bigint
      time_to_live: bigint
      file_type: string
      last_downloaded: Date | null
    }, ExtArgs["result"]["cache_files"]>
    composites: {}
  }

  type cache_filesGetPayload<S extends boolean | null | undefined | cache_filesDefaultArgs> = $Result.GetResult<Prisma.$cache_filesPayload, S>

  type cache_filesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<cache_filesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Cache_filesCountAggregateInputType | true
    }

  export interface cache_filesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['cache_files'], meta: { name: 'cache_files' } }
    /**
     * Find zero or one Cache_files that matches the filter.
     * @param {cache_filesFindUniqueArgs} args - Arguments to find a Cache_files
     * @example
     * // Get one Cache_files
     * const cache_files = await prisma.cache_files.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends cache_filesFindUniqueArgs>(args: SelectSubset<T, cache_filesFindUniqueArgs<ExtArgs>>): Prisma__cache_filesClient<$Result.GetResult<Prisma.$cache_filesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cache_files that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {cache_filesFindUniqueOrThrowArgs} args - Arguments to find a Cache_files
     * @example
     * // Get one Cache_files
     * const cache_files = await prisma.cache_files.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends cache_filesFindUniqueOrThrowArgs>(args: SelectSubset<T, cache_filesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__cache_filesClient<$Result.GetResult<Prisma.$cache_filesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cache_files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cache_filesFindFirstArgs} args - Arguments to find a Cache_files
     * @example
     * // Get one Cache_files
     * const cache_files = await prisma.cache_files.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends cache_filesFindFirstArgs>(args?: SelectSubset<T, cache_filesFindFirstArgs<ExtArgs>>): Prisma__cache_filesClient<$Result.GetResult<Prisma.$cache_filesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cache_files that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cache_filesFindFirstOrThrowArgs} args - Arguments to find a Cache_files
     * @example
     * // Get one Cache_files
     * const cache_files = await prisma.cache_files.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends cache_filesFindFirstOrThrowArgs>(args?: SelectSubset<T, cache_filesFindFirstOrThrowArgs<ExtArgs>>): Prisma__cache_filesClient<$Result.GetResult<Prisma.$cache_filesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cache_files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cache_filesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cache_files
     * const cache_files = await prisma.cache_files.findMany()
     * 
     * // Get first 10 Cache_files
     * const cache_files = await prisma.cache_files.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cache_filesWithIdOnly = await prisma.cache_files.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends cache_filesFindManyArgs>(args?: SelectSubset<T, cache_filesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cache_filesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cache_files.
     * @param {cache_filesCreateArgs} args - Arguments to create a Cache_files.
     * @example
     * // Create one Cache_files
     * const Cache_files = await prisma.cache_files.create({
     *   data: {
     *     // ... data to create a Cache_files
     *   }
     * })
     * 
     */
    create<T extends cache_filesCreateArgs>(args: SelectSubset<T, cache_filesCreateArgs<ExtArgs>>): Prisma__cache_filesClient<$Result.GetResult<Prisma.$cache_filesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cache_files.
     * @param {cache_filesCreateManyArgs} args - Arguments to create many Cache_files.
     * @example
     * // Create many Cache_files
     * const cache_files = await prisma.cache_files.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends cache_filesCreateManyArgs>(args?: SelectSubset<T, cache_filesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Cache_files.
     * @param {cache_filesDeleteArgs} args - Arguments to delete one Cache_files.
     * @example
     * // Delete one Cache_files
     * const Cache_files = await prisma.cache_files.delete({
     *   where: {
     *     // ... filter to delete one Cache_files
     *   }
     * })
     * 
     */
    delete<T extends cache_filesDeleteArgs>(args: SelectSubset<T, cache_filesDeleteArgs<ExtArgs>>): Prisma__cache_filesClient<$Result.GetResult<Prisma.$cache_filesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cache_files.
     * @param {cache_filesUpdateArgs} args - Arguments to update one Cache_files.
     * @example
     * // Update one Cache_files
     * const cache_files = await prisma.cache_files.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends cache_filesUpdateArgs>(args: SelectSubset<T, cache_filesUpdateArgs<ExtArgs>>): Prisma__cache_filesClient<$Result.GetResult<Prisma.$cache_filesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cache_files.
     * @param {cache_filesDeleteManyArgs} args - Arguments to filter Cache_files to delete.
     * @example
     * // Delete a few Cache_files
     * const { count } = await prisma.cache_files.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends cache_filesDeleteManyArgs>(args?: SelectSubset<T, cache_filesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cache_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cache_filesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cache_files
     * const cache_files = await prisma.cache_files.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends cache_filesUpdateManyArgs>(args: SelectSubset<T, cache_filesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cache_files.
     * @param {cache_filesUpsertArgs} args - Arguments to update or create a Cache_files.
     * @example
     * // Update or create a Cache_files
     * const cache_files = await prisma.cache_files.upsert({
     *   create: {
     *     // ... data to create a Cache_files
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cache_files we want to update
     *   }
     * })
     */
    upsert<T extends cache_filesUpsertArgs>(args: SelectSubset<T, cache_filesUpsertArgs<ExtArgs>>): Prisma__cache_filesClient<$Result.GetResult<Prisma.$cache_filesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cache_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cache_filesCountArgs} args - Arguments to filter Cache_files to count.
     * @example
     * // Count the number of Cache_files
     * const count = await prisma.cache_files.count({
     *   where: {
     *     // ... the filter for the Cache_files we want to count
     *   }
     * })
    **/
    count<T extends cache_filesCountArgs>(
      args?: Subset<T, cache_filesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Cache_filesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cache_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Cache_filesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Cache_filesAggregateArgs>(args: Subset<T, Cache_filesAggregateArgs>): Prisma.PrismaPromise<GetCache_filesAggregateType<T>>

    /**
     * Group by Cache_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cache_filesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends cache_filesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: cache_filesGroupByArgs['orderBy'] }
        : { orderBy?: cache_filesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, cache_filesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCache_filesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the cache_files model
   */
  readonly fields: cache_filesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for cache_files.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__cache_filesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schedule_job_log<T extends schedule_job_logDefaultArgs<ExtArgs> = {}>(args?: Subset<T, schedule_job_logDefaultArgs<ExtArgs>>): Prisma__schedule_job_logClient<$Result.GetResult<Prisma.$schedule_job_logPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the cache_files model
   */ 
  interface cache_filesFieldRefs {
    readonly id: FieldRef<"cache_files", 'Int'>
    readonly job_log_id: FieldRef<"cache_files", 'String'>
    readonly created_at: FieldRef<"cache_files", 'DateTime'>
    readonly updated_at: FieldRef<"cache_files", 'DateTime'>
    readonly file_name: FieldRef<"cache_files", 'String'>
    readonly file_tags: FieldRef<"cache_files", 'String'>
    readonly file_path: FieldRef<"cache_files", 'String'>
    readonly file_size: FieldRef<"cache_files", 'BigInt'>
    readonly time_to_live: FieldRef<"cache_files", 'BigInt'>
    readonly file_type: FieldRef<"cache_files", 'String'>
    readonly last_downloaded: FieldRef<"cache_files", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * cache_files findUnique
   */
  export type cache_filesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cache_files
     */
    select?: cache_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cache_files
     */
    omit?: cache_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cache_filesInclude<ExtArgs> | null
    /**
     * Filter, which cache_files to fetch.
     */
    where: cache_filesWhereUniqueInput
  }

  /**
   * cache_files findUniqueOrThrow
   */
  export type cache_filesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cache_files
     */
    select?: cache_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cache_files
     */
    omit?: cache_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cache_filesInclude<ExtArgs> | null
    /**
     * Filter, which cache_files to fetch.
     */
    where: cache_filesWhereUniqueInput
  }

  /**
   * cache_files findFirst
   */
  export type cache_filesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cache_files
     */
    select?: cache_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cache_files
     */
    omit?: cache_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cache_filesInclude<ExtArgs> | null
    /**
     * Filter, which cache_files to fetch.
     */
    where?: cache_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cache_files to fetch.
     */
    orderBy?: cache_filesOrderByWithRelationInput | cache_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cache_files.
     */
    cursor?: cache_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cache_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cache_files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cache_files.
     */
    distinct?: Cache_filesScalarFieldEnum | Cache_filesScalarFieldEnum[]
  }

  /**
   * cache_files findFirstOrThrow
   */
  export type cache_filesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cache_files
     */
    select?: cache_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cache_files
     */
    omit?: cache_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cache_filesInclude<ExtArgs> | null
    /**
     * Filter, which cache_files to fetch.
     */
    where?: cache_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cache_files to fetch.
     */
    orderBy?: cache_filesOrderByWithRelationInput | cache_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cache_files.
     */
    cursor?: cache_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cache_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cache_files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cache_files.
     */
    distinct?: Cache_filesScalarFieldEnum | Cache_filesScalarFieldEnum[]
  }

  /**
   * cache_files findMany
   */
  export type cache_filesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cache_files
     */
    select?: cache_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cache_files
     */
    omit?: cache_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cache_filesInclude<ExtArgs> | null
    /**
     * Filter, which cache_files to fetch.
     */
    where?: cache_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cache_files to fetch.
     */
    orderBy?: cache_filesOrderByWithRelationInput | cache_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cache_files.
     */
    cursor?: cache_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cache_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cache_files.
     */
    skip?: number
    distinct?: Cache_filesScalarFieldEnum | Cache_filesScalarFieldEnum[]
  }

  /**
   * cache_files create
   */
  export type cache_filesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cache_files
     */
    select?: cache_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cache_files
     */
    omit?: cache_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cache_filesInclude<ExtArgs> | null
    /**
     * The data needed to create a cache_files.
     */
    data: XOR<cache_filesCreateInput, cache_filesUncheckedCreateInput>
  }

  /**
   * cache_files createMany
   */
  export type cache_filesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many cache_files.
     */
    data: cache_filesCreateManyInput | cache_filesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cache_files update
   */
  export type cache_filesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cache_files
     */
    select?: cache_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cache_files
     */
    omit?: cache_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cache_filesInclude<ExtArgs> | null
    /**
     * The data needed to update a cache_files.
     */
    data: XOR<cache_filesUpdateInput, cache_filesUncheckedUpdateInput>
    /**
     * Choose, which cache_files to update.
     */
    where: cache_filesWhereUniqueInput
  }

  /**
   * cache_files updateMany
   */
  export type cache_filesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update cache_files.
     */
    data: XOR<cache_filesUpdateManyMutationInput, cache_filesUncheckedUpdateManyInput>
    /**
     * Filter which cache_files to update
     */
    where?: cache_filesWhereInput
    /**
     * Limit how many cache_files to update.
     */
    limit?: number
  }

  /**
   * cache_files upsert
   */
  export type cache_filesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cache_files
     */
    select?: cache_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cache_files
     */
    omit?: cache_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cache_filesInclude<ExtArgs> | null
    /**
     * The filter to search for the cache_files to update in case it exists.
     */
    where: cache_filesWhereUniqueInput
    /**
     * In case the cache_files found by the `where` argument doesn't exist, create a new cache_files with this data.
     */
    create: XOR<cache_filesCreateInput, cache_filesUncheckedCreateInput>
    /**
     * In case the cache_files was found with the provided `where` argument, update it with this data.
     */
    update: XOR<cache_filesUpdateInput, cache_filesUncheckedUpdateInput>
  }

  /**
   * cache_files delete
   */
  export type cache_filesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cache_files
     */
    select?: cache_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cache_files
     */
    omit?: cache_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cache_filesInclude<ExtArgs> | null
    /**
     * Filter which cache_files to delete.
     */
    where: cache_filesWhereUniqueInput
  }

  /**
   * cache_files deleteMany
   */
  export type cache_filesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cache_files to delete
     */
    where?: cache_filesWhereInput
    /**
     * Limit how many cache_files to delete.
     */
    limit?: number
  }

  /**
   * cache_files without action
   */
  export type cache_filesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cache_files
     */
    select?: cache_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cache_files
     */
    omit?: cache_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cache_filesInclude<ExtArgs> | null
  }


  /**
   * Model output_files
   */

  export type AggregateOutput_files = {
    _count: Output_filesCountAggregateOutputType | null
    _avg: Output_filesAvgAggregateOutputType | null
    _sum: Output_filesSumAggregateOutputType | null
    _min: Output_filesMinAggregateOutputType | null
    _max: Output_filesMaxAggregateOutputType | null
  }

  export type Output_filesAvgAggregateOutputType = {
    id: number | null
    file_size: number | null
  }

  export type Output_filesSumAggregateOutputType = {
    id: number | null
    file_size: bigint | null
  }

  export type Output_filesMinAggregateOutputType = {
    id: number | null
    job_log_id: string | null
    created_at: Date | null
    updated_at: Date | null
    file_name: string | null
    file_tags: string | null
    file_path: string | null
    file_size: bigint | null
    file_type: string | null
    last_downloaded: Date | null
  }

  export type Output_filesMaxAggregateOutputType = {
    id: number | null
    job_log_id: string | null
    created_at: Date | null
    updated_at: Date | null
    file_name: string | null
    file_tags: string | null
    file_path: string | null
    file_size: bigint | null
    file_type: string | null
    last_downloaded: Date | null
  }

  export type Output_filesCountAggregateOutputType = {
    id: number
    job_log_id: number
    created_at: number
    updated_at: number
    file_name: number
    file_tags: number
    file_path: number
    file_size: number
    file_type: number
    last_downloaded: number
    _all: number
  }


  export type Output_filesAvgAggregateInputType = {
    id?: true
    file_size?: true
  }

  export type Output_filesSumAggregateInputType = {
    id?: true
    file_size?: true
  }

  export type Output_filesMinAggregateInputType = {
    id?: true
    job_log_id?: true
    created_at?: true
    updated_at?: true
    file_name?: true
    file_tags?: true
    file_path?: true
    file_size?: true
    file_type?: true
    last_downloaded?: true
  }

  export type Output_filesMaxAggregateInputType = {
    id?: true
    job_log_id?: true
    created_at?: true
    updated_at?: true
    file_name?: true
    file_tags?: true
    file_path?: true
    file_size?: true
    file_type?: true
    last_downloaded?: true
  }

  export type Output_filesCountAggregateInputType = {
    id?: true
    job_log_id?: true
    created_at?: true
    updated_at?: true
    file_name?: true
    file_tags?: true
    file_path?: true
    file_size?: true
    file_type?: true
    last_downloaded?: true
    _all?: true
  }

  export type Output_filesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which output_files to aggregate.
     */
    where?: output_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of output_files to fetch.
     */
    orderBy?: output_filesOrderByWithRelationInput | output_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: output_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` output_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` output_files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned output_files
    **/
    _count?: true | Output_filesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Output_filesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Output_filesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Output_filesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Output_filesMaxAggregateInputType
  }

  export type GetOutput_filesAggregateType<T extends Output_filesAggregateArgs> = {
        [P in keyof T & keyof AggregateOutput_files]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutput_files[P]>
      : GetScalarType<T[P], AggregateOutput_files[P]>
  }




  export type output_filesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: output_filesWhereInput
    orderBy?: output_filesOrderByWithAggregationInput | output_filesOrderByWithAggregationInput[]
    by: Output_filesScalarFieldEnum[] | Output_filesScalarFieldEnum
    having?: output_filesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Output_filesCountAggregateInputType | true
    _avg?: Output_filesAvgAggregateInputType
    _sum?: Output_filesSumAggregateInputType
    _min?: Output_filesMinAggregateInputType
    _max?: Output_filesMaxAggregateInputType
  }

  export type Output_filesGroupByOutputType = {
    id: number
    job_log_id: string
    created_at: Date
    updated_at: Date
    file_name: string
    file_tags: string | null
    file_path: string
    file_size: bigint
    file_type: string
    last_downloaded: Date | null
    _count: Output_filesCountAggregateOutputType | null
    _avg: Output_filesAvgAggregateOutputType | null
    _sum: Output_filesSumAggregateOutputType | null
    _min: Output_filesMinAggregateOutputType | null
    _max: Output_filesMaxAggregateOutputType | null
  }

  type GetOutput_filesGroupByPayload<T extends output_filesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Output_filesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Output_filesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Output_filesGroupByOutputType[P]>
            : GetScalarType<T[P], Output_filesGroupByOutputType[P]>
        }
      >
    >


  export type output_filesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job_log_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    file_name?: boolean
    file_tags?: boolean
    file_path?: boolean
    file_size?: boolean
    file_type?: boolean
    last_downloaded?: boolean
    schedule_job_log?: boolean | schedule_job_logDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["output_files"]>



  export type output_filesSelectScalar = {
    id?: boolean
    job_log_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    file_name?: boolean
    file_tags?: boolean
    file_path?: boolean
    file_size?: boolean
    file_type?: boolean
    last_downloaded?: boolean
  }

  export type output_filesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "job_log_id" | "created_at" | "updated_at" | "file_name" | "file_tags" | "file_path" | "file_size" | "file_type" | "last_downloaded", ExtArgs["result"]["output_files"]>
  export type output_filesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedule_job_log?: boolean | schedule_job_logDefaultArgs<ExtArgs>
  }

  export type $output_filesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "output_files"
    objects: {
      schedule_job_log: Prisma.$schedule_job_logPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      job_log_id: string
      created_at: Date
      updated_at: Date
      file_name: string
      file_tags: string | null
      file_path: string
      file_size: bigint
      file_type: string
      last_downloaded: Date | null
    }, ExtArgs["result"]["output_files"]>
    composites: {}
  }

  type output_filesGetPayload<S extends boolean | null | undefined | output_filesDefaultArgs> = $Result.GetResult<Prisma.$output_filesPayload, S>

  type output_filesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<output_filesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Output_filesCountAggregateInputType | true
    }

  export interface output_filesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['output_files'], meta: { name: 'output_files' } }
    /**
     * Find zero or one Output_files that matches the filter.
     * @param {output_filesFindUniqueArgs} args - Arguments to find a Output_files
     * @example
     * // Get one Output_files
     * const output_files = await prisma.output_files.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends output_filesFindUniqueArgs>(args: SelectSubset<T, output_filesFindUniqueArgs<ExtArgs>>): Prisma__output_filesClient<$Result.GetResult<Prisma.$output_filesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Output_files that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {output_filesFindUniqueOrThrowArgs} args - Arguments to find a Output_files
     * @example
     * // Get one Output_files
     * const output_files = await prisma.output_files.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends output_filesFindUniqueOrThrowArgs>(args: SelectSubset<T, output_filesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__output_filesClient<$Result.GetResult<Prisma.$output_filesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Output_files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {output_filesFindFirstArgs} args - Arguments to find a Output_files
     * @example
     * // Get one Output_files
     * const output_files = await prisma.output_files.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends output_filesFindFirstArgs>(args?: SelectSubset<T, output_filesFindFirstArgs<ExtArgs>>): Prisma__output_filesClient<$Result.GetResult<Prisma.$output_filesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Output_files that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {output_filesFindFirstOrThrowArgs} args - Arguments to find a Output_files
     * @example
     * // Get one Output_files
     * const output_files = await prisma.output_files.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends output_filesFindFirstOrThrowArgs>(args?: SelectSubset<T, output_filesFindFirstOrThrowArgs<ExtArgs>>): Prisma__output_filesClient<$Result.GetResult<Prisma.$output_filesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Output_files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {output_filesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Output_files
     * const output_files = await prisma.output_files.findMany()
     * 
     * // Get first 10 Output_files
     * const output_files = await prisma.output_files.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const output_filesWithIdOnly = await prisma.output_files.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends output_filesFindManyArgs>(args?: SelectSubset<T, output_filesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$output_filesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Output_files.
     * @param {output_filesCreateArgs} args - Arguments to create a Output_files.
     * @example
     * // Create one Output_files
     * const Output_files = await prisma.output_files.create({
     *   data: {
     *     // ... data to create a Output_files
     *   }
     * })
     * 
     */
    create<T extends output_filesCreateArgs>(args: SelectSubset<T, output_filesCreateArgs<ExtArgs>>): Prisma__output_filesClient<$Result.GetResult<Prisma.$output_filesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Output_files.
     * @param {output_filesCreateManyArgs} args - Arguments to create many Output_files.
     * @example
     * // Create many Output_files
     * const output_files = await prisma.output_files.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends output_filesCreateManyArgs>(args?: SelectSubset<T, output_filesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Output_files.
     * @param {output_filesDeleteArgs} args - Arguments to delete one Output_files.
     * @example
     * // Delete one Output_files
     * const Output_files = await prisma.output_files.delete({
     *   where: {
     *     // ... filter to delete one Output_files
     *   }
     * })
     * 
     */
    delete<T extends output_filesDeleteArgs>(args: SelectSubset<T, output_filesDeleteArgs<ExtArgs>>): Prisma__output_filesClient<$Result.GetResult<Prisma.$output_filesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Output_files.
     * @param {output_filesUpdateArgs} args - Arguments to update one Output_files.
     * @example
     * // Update one Output_files
     * const output_files = await prisma.output_files.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends output_filesUpdateArgs>(args: SelectSubset<T, output_filesUpdateArgs<ExtArgs>>): Prisma__output_filesClient<$Result.GetResult<Prisma.$output_filesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Output_files.
     * @param {output_filesDeleteManyArgs} args - Arguments to filter Output_files to delete.
     * @example
     * // Delete a few Output_files
     * const { count } = await prisma.output_files.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends output_filesDeleteManyArgs>(args?: SelectSubset<T, output_filesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Output_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {output_filesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Output_files
     * const output_files = await prisma.output_files.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends output_filesUpdateManyArgs>(args: SelectSubset<T, output_filesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Output_files.
     * @param {output_filesUpsertArgs} args - Arguments to update or create a Output_files.
     * @example
     * // Update or create a Output_files
     * const output_files = await prisma.output_files.upsert({
     *   create: {
     *     // ... data to create a Output_files
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Output_files we want to update
     *   }
     * })
     */
    upsert<T extends output_filesUpsertArgs>(args: SelectSubset<T, output_filesUpsertArgs<ExtArgs>>): Prisma__output_filesClient<$Result.GetResult<Prisma.$output_filesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Output_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {output_filesCountArgs} args - Arguments to filter Output_files to count.
     * @example
     * // Count the number of Output_files
     * const count = await prisma.output_files.count({
     *   where: {
     *     // ... the filter for the Output_files we want to count
     *   }
     * })
    **/
    count<T extends output_filesCountArgs>(
      args?: Subset<T, output_filesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Output_filesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Output_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Output_filesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Output_filesAggregateArgs>(args: Subset<T, Output_filesAggregateArgs>): Prisma.PrismaPromise<GetOutput_filesAggregateType<T>>

    /**
     * Group by Output_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {output_filesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends output_filesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: output_filesGroupByArgs['orderBy'] }
        : { orderBy?: output_filesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, output_filesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutput_filesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the output_files model
   */
  readonly fields: output_filesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for output_files.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__output_filesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schedule_job_log<T extends schedule_job_logDefaultArgs<ExtArgs> = {}>(args?: Subset<T, schedule_job_logDefaultArgs<ExtArgs>>): Prisma__schedule_job_logClient<$Result.GetResult<Prisma.$schedule_job_logPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the output_files model
   */ 
  interface output_filesFieldRefs {
    readonly id: FieldRef<"output_files", 'Int'>
    readonly job_log_id: FieldRef<"output_files", 'String'>
    readonly created_at: FieldRef<"output_files", 'DateTime'>
    readonly updated_at: FieldRef<"output_files", 'DateTime'>
    readonly file_name: FieldRef<"output_files", 'String'>
    readonly file_tags: FieldRef<"output_files", 'String'>
    readonly file_path: FieldRef<"output_files", 'String'>
    readonly file_size: FieldRef<"output_files", 'BigInt'>
    readonly file_type: FieldRef<"output_files", 'String'>
    readonly last_downloaded: FieldRef<"output_files", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * output_files findUnique
   */
  export type output_filesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the output_files
     */
    select?: output_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the output_files
     */
    omit?: output_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: output_filesInclude<ExtArgs> | null
    /**
     * Filter, which output_files to fetch.
     */
    where: output_filesWhereUniqueInput
  }

  /**
   * output_files findUniqueOrThrow
   */
  export type output_filesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the output_files
     */
    select?: output_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the output_files
     */
    omit?: output_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: output_filesInclude<ExtArgs> | null
    /**
     * Filter, which output_files to fetch.
     */
    where: output_filesWhereUniqueInput
  }

  /**
   * output_files findFirst
   */
  export type output_filesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the output_files
     */
    select?: output_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the output_files
     */
    omit?: output_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: output_filesInclude<ExtArgs> | null
    /**
     * Filter, which output_files to fetch.
     */
    where?: output_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of output_files to fetch.
     */
    orderBy?: output_filesOrderByWithRelationInput | output_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for output_files.
     */
    cursor?: output_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` output_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` output_files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of output_files.
     */
    distinct?: Output_filesScalarFieldEnum | Output_filesScalarFieldEnum[]
  }

  /**
   * output_files findFirstOrThrow
   */
  export type output_filesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the output_files
     */
    select?: output_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the output_files
     */
    omit?: output_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: output_filesInclude<ExtArgs> | null
    /**
     * Filter, which output_files to fetch.
     */
    where?: output_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of output_files to fetch.
     */
    orderBy?: output_filesOrderByWithRelationInput | output_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for output_files.
     */
    cursor?: output_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` output_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` output_files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of output_files.
     */
    distinct?: Output_filesScalarFieldEnum | Output_filesScalarFieldEnum[]
  }

  /**
   * output_files findMany
   */
  export type output_filesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the output_files
     */
    select?: output_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the output_files
     */
    omit?: output_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: output_filesInclude<ExtArgs> | null
    /**
     * Filter, which output_files to fetch.
     */
    where?: output_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of output_files to fetch.
     */
    orderBy?: output_filesOrderByWithRelationInput | output_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing output_files.
     */
    cursor?: output_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` output_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` output_files.
     */
    skip?: number
    distinct?: Output_filesScalarFieldEnum | Output_filesScalarFieldEnum[]
  }

  /**
   * output_files create
   */
  export type output_filesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the output_files
     */
    select?: output_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the output_files
     */
    omit?: output_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: output_filesInclude<ExtArgs> | null
    /**
     * The data needed to create a output_files.
     */
    data: XOR<output_filesCreateInput, output_filesUncheckedCreateInput>
  }

  /**
   * output_files createMany
   */
  export type output_filesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many output_files.
     */
    data: output_filesCreateManyInput | output_filesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * output_files update
   */
  export type output_filesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the output_files
     */
    select?: output_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the output_files
     */
    omit?: output_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: output_filesInclude<ExtArgs> | null
    /**
     * The data needed to update a output_files.
     */
    data: XOR<output_filesUpdateInput, output_filesUncheckedUpdateInput>
    /**
     * Choose, which output_files to update.
     */
    where: output_filesWhereUniqueInput
  }

  /**
   * output_files updateMany
   */
  export type output_filesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update output_files.
     */
    data: XOR<output_filesUpdateManyMutationInput, output_filesUncheckedUpdateManyInput>
    /**
     * Filter which output_files to update
     */
    where?: output_filesWhereInput
    /**
     * Limit how many output_files to update.
     */
    limit?: number
  }

  /**
   * output_files upsert
   */
  export type output_filesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the output_files
     */
    select?: output_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the output_files
     */
    omit?: output_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: output_filesInclude<ExtArgs> | null
    /**
     * The filter to search for the output_files to update in case it exists.
     */
    where: output_filesWhereUniqueInput
    /**
     * In case the output_files found by the `where` argument doesn't exist, create a new output_files with this data.
     */
    create: XOR<output_filesCreateInput, output_filesUncheckedCreateInput>
    /**
     * In case the output_files was found with the provided `where` argument, update it with this data.
     */
    update: XOR<output_filesUpdateInput, output_filesUncheckedUpdateInput>
  }

  /**
   * output_files delete
   */
  export type output_filesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the output_files
     */
    select?: output_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the output_files
     */
    omit?: output_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: output_filesInclude<ExtArgs> | null
    /**
     * Filter which output_files to delete.
     */
    where: output_filesWhereUniqueInput
  }

  /**
   * output_files deleteMany
   */
  export type output_filesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which output_files to delete
     */
    where?: output_filesWhereInput
    /**
     * Limit how many output_files to delete.
     */
    limit?: number
  }

  /**
   * output_files without action
   */
  export type output_filesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the output_files
     */
    select?: output_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the output_files
     */
    omit?: output_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: output_filesInclude<ExtArgs> | null
  }


  /**
   * Model proxy
   */

  export type AggregateProxy = {
    _count: ProxyCountAggregateOutputType | null
    _avg: ProxyAvgAggregateOutputType | null
    _sum: ProxySumAggregateOutputType | null
    _min: ProxyMinAggregateOutputType | null
    _max: ProxyMaxAggregateOutputType | null
  }

  export type ProxyAvgAggregateOutputType = {
    id: number | null
    proxy_port: number | null
  }

  export type ProxySumAggregateOutputType = {
    id: number | null
    proxy_port: number | null
  }

  export type ProxyMinAggregateOutputType = {
    id: number | null
    proxy_ip: string | null
    proxy_port: number | null
    protocol: string | null
    username: string | null
    password: string | null
    description: string | null
    status: $Enums.proxy_status | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProxyMaxAggregateOutputType = {
    id: number | null
    proxy_ip: string | null
    proxy_port: number | null
    protocol: string | null
    username: string | null
    password: string | null
    description: string | null
    status: $Enums.proxy_status | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProxyCountAggregateOutputType = {
    id: number
    proxy_ip: number
    proxy_port: number
    protocol: number
    username: number
    password: number
    description: number
    status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ProxyAvgAggregateInputType = {
    id?: true
    proxy_port?: true
  }

  export type ProxySumAggregateInputType = {
    id?: true
    proxy_port?: true
  }

  export type ProxyMinAggregateInputType = {
    id?: true
    proxy_ip?: true
    proxy_port?: true
    protocol?: true
    username?: true
    password?: true
    description?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type ProxyMaxAggregateInputType = {
    id?: true
    proxy_ip?: true
    proxy_port?: true
    protocol?: true
    username?: true
    password?: true
    description?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type ProxyCountAggregateInputType = {
    id?: true
    proxy_ip?: true
    proxy_port?: true
    protocol?: true
    username?: true
    password?: true
    description?: true
    status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ProxyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which proxy to aggregate.
     */
    where?: proxyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proxies to fetch.
     */
    orderBy?: proxyOrderByWithRelationInput | proxyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: proxyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proxies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proxies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned proxies
    **/
    _count?: true | ProxyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProxyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProxySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProxyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProxyMaxAggregateInputType
  }

  export type GetProxyAggregateType<T extends ProxyAggregateArgs> = {
        [P in keyof T & keyof AggregateProxy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProxy[P]>
      : GetScalarType<T[P], AggregateProxy[P]>
  }




  export type proxyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: proxyWhereInput
    orderBy?: proxyOrderByWithAggregationInput | proxyOrderByWithAggregationInput[]
    by: ProxyScalarFieldEnum[] | ProxyScalarFieldEnum
    having?: proxyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProxyCountAggregateInputType | true
    _avg?: ProxyAvgAggregateInputType
    _sum?: ProxySumAggregateInputType
    _min?: ProxyMinAggregateInputType
    _max?: ProxyMaxAggregateInputType
  }

  export type ProxyGroupByOutputType = {
    id: number
    proxy_ip: string
    proxy_port: number
    protocol: string
    username: string | null
    password: string | null
    description: string | null
    status: $Enums.proxy_status
    created_at: Date
    updated_at: Date
    _count: ProxyCountAggregateOutputType | null
    _avg: ProxyAvgAggregateOutputType | null
    _sum: ProxySumAggregateOutputType | null
    _min: ProxyMinAggregateOutputType | null
    _max: ProxyMaxAggregateOutputType | null
  }

  type GetProxyGroupByPayload<T extends proxyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProxyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProxyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProxyGroupByOutputType[P]>
            : GetScalarType<T[P], ProxyGroupByOutputType[P]>
        }
      >
    >


  export type proxySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    proxy_ip?: boolean
    proxy_port?: boolean
    protocol?: boolean
    username?: boolean
    password?: boolean
    description?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    jobs?: boolean | proxy$jobsArgs<ExtArgs>
    _count?: boolean | ProxyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proxy"]>



  export type proxySelectScalar = {
    id?: boolean
    proxy_ip?: boolean
    proxy_port?: boolean
    protocol?: boolean
    username?: boolean
    password?: boolean
    description?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type proxyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "proxy_ip" | "proxy_port" | "protocol" | "username" | "password" | "description" | "status" | "created_at" | "updated_at", ExtArgs["result"]["proxy"]>
  export type proxyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | proxy$jobsArgs<ExtArgs>
    _count?: boolean | ProxyCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $proxyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "proxy"
    objects: {
      jobs: Prisma.$proxy_jobPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      proxy_ip: string
      proxy_port: number
      protocol: string
      username: string | null
      password: string | null
      description: string | null
      status: $Enums.proxy_status
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["proxy"]>
    composites: {}
  }

  type proxyGetPayload<S extends boolean | null | undefined | proxyDefaultArgs> = $Result.GetResult<Prisma.$proxyPayload, S>

  type proxyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<proxyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProxyCountAggregateInputType | true
    }

  export interface proxyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['proxy'], meta: { name: 'proxy' } }
    /**
     * Find zero or one Proxy that matches the filter.
     * @param {proxyFindUniqueArgs} args - Arguments to find a Proxy
     * @example
     * // Get one Proxy
     * const proxy = await prisma.proxy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends proxyFindUniqueArgs>(args: SelectSubset<T, proxyFindUniqueArgs<ExtArgs>>): Prisma__proxyClient<$Result.GetResult<Prisma.$proxyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Proxy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {proxyFindUniqueOrThrowArgs} args - Arguments to find a Proxy
     * @example
     * // Get one Proxy
     * const proxy = await prisma.proxy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends proxyFindUniqueOrThrowArgs>(args: SelectSubset<T, proxyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__proxyClient<$Result.GetResult<Prisma.$proxyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proxy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proxyFindFirstArgs} args - Arguments to find a Proxy
     * @example
     * // Get one Proxy
     * const proxy = await prisma.proxy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends proxyFindFirstArgs>(args?: SelectSubset<T, proxyFindFirstArgs<ExtArgs>>): Prisma__proxyClient<$Result.GetResult<Prisma.$proxyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proxy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proxyFindFirstOrThrowArgs} args - Arguments to find a Proxy
     * @example
     * // Get one Proxy
     * const proxy = await prisma.proxy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends proxyFindFirstOrThrowArgs>(args?: SelectSubset<T, proxyFindFirstOrThrowArgs<ExtArgs>>): Prisma__proxyClient<$Result.GetResult<Prisma.$proxyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Proxies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proxyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Proxies
     * const proxies = await prisma.proxy.findMany()
     * 
     * // Get first 10 Proxies
     * const proxies = await prisma.proxy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const proxyWithIdOnly = await prisma.proxy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends proxyFindManyArgs>(args?: SelectSubset<T, proxyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$proxyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Proxy.
     * @param {proxyCreateArgs} args - Arguments to create a Proxy.
     * @example
     * // Create one Proxy
     * const Proxy = await prisma.proxy.create({
     *   data: {
     *     // ... data to create a Proxy
     *   }
     * })
     * 
     */
    create<T extends proxyCreateArgs>(args: SelectSubset<T, proxyCreateArgs<ExtArgs>>): Prisma__proxyClient<$Result.GetResult<Prisma.$proxyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Proxies.
     * @param {proxyCreateManyArgs} args - Arguments to create many Proxies.
     * @example
     * // Create many Proxies
     * const proxy = await prisma.proxy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends proxyCreateManyArgs>(args?: SelectSubset<T, proxyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Proxy.
     * @param {proxyDeleteArgs} args - Arguments to delete one Proxy.
     * @example
     * // Delete one Proxy
     * const Proxy = await prisma.proxy.delete({
     *   where: {
     *     // ... filter to delete one Proxy
     *   }
     * })
     * 
     */
    delete<T extends proxyDeleteArgs>(args: SelectSubset<T, proxyDeleteArgs<ExtArgs>>): Prisma__proxyClient<$Result.GetResult<Prisma.$proxyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Proxy.
     * @param {proxyUpdateArgs} args - Arguments to update one Proxy.
     * @example
     * // Update one Proxy
     * const proxy = await prisma.proxy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends proxyUpdateArgs>(args: SelectSubset<T, proxyUpdateArgs<ExtArgs>>): Prisma__proxyClient<$Result.GetResult<Prisma.$proxyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Proxies.
     * @param {proxyDeleteManyArgs} args - Arguments to filter Proxies to delete.
     * @example
     * // Delete a few Proxies
     * const { count } = await prisma.proxy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends proxyDeleteManyArgs>(args?: SelectSubset<T, proxyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proxies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proxyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Proxies
     * const proxy = await prisma.proxy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends proxyUpdateManyArgs>(args: SelectSubset<T, proxyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Proxy.
     * @param {proxyUpsertArgs} args - Arguments to update or create a Proxy.
     * @example
     * // Update or create a Proxy
     * const proxy = await prisma.proxy.upsert({
     *   create: {
     *     // ... data to create a Proxy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Proxy we want to update
     *   }
     * })
     */
    upsert<T extends proxyUpsertArgs>(args: SelectSubset<T, proxyUpsertArgs<ExtArgs>>): Prisma__proxyClient<$Result.GetResult<Prisma.$proxyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Proxies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proxyCountArgs} args - Arguments to filter Proxies to count.
     * @example
     * // Count the number of Proxies
     * const count = await prisma.proxy.count({
     *   where: {
     *     // ... the filter for the Proxies we want to count
     *   }
     * })
    **/
    count<T extends proxyCountArgs>(
      args?: Subset<T, proxyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProxyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Proxy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProxyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProxyAggregateArgs>(args: Subset<T, ProxyAggregateArgs>): Prisma.PrismaPromise<GetProxyAggregateType<T>>

    /**
     * Group by Proxy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proxyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends proxyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: proxyGroupByArgs['orderBy'] }
        : { orderBy?: proxyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, proxyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProxyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the proxy model
   */
  readonly fields: proxyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for proxy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__proxyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jobs<T extends proxy$jobsArgs<ExtArgs> = {}>(args?: Subset<T, proxy$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$proxy_jobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the proxy model
   */ 
  interface proxyFieldRefs {
    readonly id: FieldRef<"proxy", 'Int'>
    readonly proxy_ip: FieldRef<"proxy", 'String'>
    readonly proxy_port: FieldRef<"proxy", 'Int'>
    readonly protocol: FieldRef<"proxy", 'String'>
    readonly username: FieldRef<"proxy", 'String'>
    readonly password: FieldRef<"proxy", 'String'>
    readonly description: FieldRef<"proxy", 'String'>
    readonly status: FieldRef<"proxy", 'proxy_status'>
    readonly created_at: FieldRef<"proxy", 'DateTime'>
    readonly updated_at: FieldRef<"proxy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * proxy findUnique
   */
  export type proxyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy
     */
    select?: proxySelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy
     */
    omit?: proxyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxyInclude<ExtArgs> | null
    /**
     * Filter, which proxy to fetch.
     */
    where: proxyWhereUniqueInput
  }

  /**
   * proxy findUniqueOrThrow
   */
  export type proxyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy
     */
    select?: proxySelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy
     */
    omit?: proxyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxyInclude<ExtArgs> | null
    /**
     * Filter, which proxy to fetch.
     */
    where: proxyWhereUniqueInput
  }

  /**
   * proxy findFirst
   */
  export type proxyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy
     */
    select?: proxySelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy
     */
    omit?: proxyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxyInclude<ExtArgs> | null
    /**
     * Filter, which proxy to fetch.
     */
    where?: proxyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proxies to fetch.
     */
    orderBy?: proxyOrderByWithRelationInput | proxyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for proxies.
     */
    cursor?: proxyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proxies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proxies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of proxies.
     */
    distinct?: ProxyScalarFieldEnum | ProxyScalarFieldEnum[]
  }

  /**
   * proxy findFirstOrThrow
   */
  export type proxyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy
     */
    select?: proxySelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy
     */
    omit?: proxyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxyInclude<ExtArgs> | null
    /**
     * Filter, which proxy to fetch.
     */
    where?: proxyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proxies to fetch.
     */
    orderBy?: proxyOrderByWithRelationInput | proxyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for proxies.
     */
    cursor?: proxyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proxies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proxies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of proxies.
     */
    distinct?: ProxyScalarFieldEnum | ProxyScalarFieldEnum[]
  }

  /**
   * proxy findMany
   */
  export type proxyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy
     */
    select?: proxySelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy
     */
    omit?: proxyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxyInclude<ExtArgs> | null
    /**
     * Filter, which proxies to fetch.
     */
    where?: proxyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proxies to fetch.
     */
    orderBy?: proxyOrderByWithRelationInput | proxyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing proxies.
     */
    cursor?: proxyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proxies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proxies.
     */
    skip?: number
    distinct?: ProxyScalarFieldEnum | ProxyScalarFieldEnum[]
  }

  /**
   * proxy create
   */
  export type proxyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy
     */
    select?: proxySelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy
     */
    omit?: proxyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxyInclude<ExtArgs> | null
    /**
     * The data needed to create a proxy.
     */
    data: XOR<proxyCreateInput, proxyUncheckedCreateInput>
  }

  /**
   * proxy createMany
   */
  export type proxyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many proxies.
     */
    data: proxyCreateManyInput | proxyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * proxy update
   */
  export type proxyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy
     */
    select?: proxySelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy
     */
    omit?: proxyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxyInclude<ExtArgs> | null
    /**
     * The data needed to update a proxy.
     */
    data: XOR<proxyUpdateInput, proxyUncheckedUpdateInput>
    /**
     * Choose, which proxy to update.
     */
    where: proxyWhereUniqueInput
  }

  /**
   * proxy updateMany
   */
  export type proxyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update proxies.
     */
    data: XOR<proxyUpdateManyMutationInput, proxyUncheckedUpdateManyInput>
    /**
     * Filter which proxies to update
     */
    where?: proxyWhereInput
    /**
     * Limit how many proxies to update.
     */
    limit?: number
  }

  /**
   * proxy upsert
   */
  export type proxyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy
     */
    select?: proxySelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy
     */
    omit?: proxyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxyInclude<ExtArgs> | null
    /**
     * The filter to search for the proxy to update in case it exists.
     */
    where: proxyWhereUniqueInput
    /**
     * In case the proxy found by the `where` argument doesn't exist, create a new proxy with this data.
     */
    create: XOR<proxyCreateInput, proxyUncheckedCreateInput>
    /**
     * In case the proxy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<proxyUpdateInput, proxyUncheckedUpdateInput>
  }

  /**
   * proxy delete
   */
  export type proxyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy
     */
    select?: proxySelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy
     */
    omit?: proxyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxyInclude<ExtArgs> | null
    /**
     * Filter which proxy to delete.
     */
    where: proxyWhereUniqueInput
  }

  /**
   * proxy deleteMany
   */
  export type proxyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which proxies to delete
     */
    where?: proxyWhereInput
    /**
     * Limit how many proxies to delete.
     */
    limit?: number
  }

  /**
   * proxy.jobs
   */
  export type proxy$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy_job
     */
    select?: proxy_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy_job
     */
    omit?: proxy_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxy_jobInclude<ExtArgs> | null
    where?: proxy_jobWhereInput
    orderBy?: proxy_jobOrderByWithRelationInput | proxy_jobOrderByWithRelationInput[]
    cursor?: proxy_jobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Proxy_jobScalarFieldEnum | Proxy_jobScalarFieldEnum[]
  }

  /**
   * proxy without action
   */
  export type proxyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy
     */
    select?: proxySelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy
     */
    omit?: proxyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxyInclude<ExtArgs> | null
  }


  /**
   * Model proxy_job
   */

  export type AggregateProxy_job = {
    _count: Proxy_jobCountAggregateOutputType | null
    _avg: Proxy_jobAvgAggregateOutputType | null
    _sum: Proxy_jobSumAggregateOutputType | null
    _min: Proxy_jobMinAggregateOutputType | null
    _max: Proxy_jobMaxAggregateOutputType | null
  }

  export type Proxy_jobAvgAggregateOutputType = {
    id: number | null
    job_id: number | null
    proxy_id: number | null
  }

  export type Proxy_jobSumAggregateOutputType = {
    id: number | null
    job_id: number | null
    proxy_id: number | null
  }

  export type Proxy_jobMinAggregateOutputType = {
    id: number | null
    job_id: number | null
    proxy_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Proxy_jobMaxAggregateOutputType = {
    id: number | null
    job_id: number | null
    proxy_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Proxy_jobCountAggregateOutputType = {
    id: number
    job_id: number
    proxy_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Proxy_jobAvgAggregateInputType = {
    id?: true
    job_id?: true
    proxy_id?: true
  }

  export type Proxy_jobSumAggregateInputType = {
    id?: true
    job_id?: true
    proxy_id?: true
  }

  export type Proxy_jobMinAggregateInputType = {
    id?: true
    job_id?: true
    proxy_id?: true
    created_at?: true
    updated_at?: true
  }

  export type Proxy_jobMaxAggregateInputType = {
    id?: true
    job_id?: true
    proxy_id?: true
    created_at?: true
    updated_at?: true
  }

  export type Proxy_jobCountAggregateInputType = {
    id?: true
    job_id?: true
    proxy_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Proxy_jobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which proxy_job to aggregate.
     */
    where?: proxy_jobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proxy_jobs to fetch.
     */
    orderBy?: proxy_jobOrderByWithRelationInput | proxy_jobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: proxy_jobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proxy_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proxy_jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned proxy_jobs
    **/
    _count?: true | Proxy_jobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Proxy_jobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Proxy_jobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Proxy_jobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Proxy_jobMaxAggregateInputType
  }

  export type GetProxy_jobAggregateType<T extends Proxy_jobAggregateArgs> = {
        [P in keyof T & keyof AggregateProxy_job]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProxy_job[P]>
      : GetScalarType<T[P], AggregateProxy_job[P]>
  }




  export type proxy_jobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: proxy_jobWhereInput
    orderBy?: proxy_jobOrderByWithAggregationInput | proxy_jobOrderByWithAggregationInput[]
    by: Proxy_jobScalarFieldEnum[] | Proxy_jobScalarFieldEnum
    having?: proxy_jobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Proxy_jobCountAggregateInputType | true
    _avg?: Proxy_jobAvgAggregateInputType
    _sum?: Proxy_jobSumAggregateInputType
    _min?: Proxy_jobMinAggregateInputType
    _max?: Proxy_jobMaxAggregateInputType
  }

  export type Proxy_jobGroupByOutputType = {
    id: number
    job_id: number
    proxy_id: number
    created_at: Date
    updated_at: Date
    _count: Proxy_jobCountAggregateOutputType | null
    _avg: Proxy_jobAvgAggregateOutputType | null
    _sum: Proxy_jobSumAggregateOutputType | null
    _min: Proxy_jobMinAggregateOutputType | null
    _max: Proxy_jobMaxAggregateOutputType | null
  }

  type GetProxy_jobGroupByPayload<T extends proxy_jobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Proxy_jobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Proxy_jobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Proxy_jobGroupByOutputType[P]>
            : GetScalarType<T[P], Proxy_jobGroupByOutputType[P]>
        }
      >
    >


  export type proxy_jobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job_id?: boolean
    proxy_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    schedule_job?: boolean | schedule_jobDefaultArgs<ExtArgs>
    proxy?: boolean | proxyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proxy_job"]>



  export type proxy_jobSelectScalar = {
    id?: boolean
    job_id?: boolean
    proxy_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type proxy_jobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "job_id" | "proxy_id" | "created_at" | "updated_at", ExtArgs["result"]["proxy_job"]>
  export type proxy_jobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedule_job?: boolean | schedule_jobDefaultArgs<ExtArgs>
    proxy?: boolean | proxyDefaultArgs<ExtArgs>
  }

  export type $proxy_jobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "proxy_job"
    objects: {
      schedule_job: Prisma.$schedule_jobPayload<ExtArgs>
      proxy: Prisma.$proxyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      job_id: number
      proxy_id: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["proxy_job"]>
    composites: {}
  }

  type proxy_jobGetPayload<S extends boolean | null | undefined | proxy_jobDefaultArgs> = $Result.GetResult<Prisma.$proxy_jobPayload, S>

  type proxy_jobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<proxy_jobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Proxy_jobCountAggregateInputType | true
    }

  export interface proxy_jobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['proxy_job'], meta: { name: 'proxy_job' } }
    /**
     * Find zero or one Proxy_job that matches the filter.
     * @param {proxy_jobFindUniqueArgs} args - Arguments to find a Proxy_job
     * @example
     * // Get one Proxy_job
     * const proxy_job = await prisma.proxy_job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends proxy_jobFindUniqueArgs>(args: SelectSubset<T, proxy_jobFindUniqueArgs<ExtArgs>>): Prisma__proxy_jobClient<$Result.GetResult<Prisma.$proxy_jobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Proxy_job that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {proxy_jobFindUniqueOrThrowArgs} args - Arguments to find a Proxy_job
     * @example
     * // Get one Proxy_job
     * const proxy_job = await prisma.proxy_job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends proxy_jobFindUniqueOrThrowArgs>(args: SelectSubset<T, proxy_jobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__proxy_jobClient<$Result.GetResult<Prisma.$proxy_jobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proxy_job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proxy_jobFindFirstArgs} args - Arguments to find a Proxy_job
     * @example
     * // Get one Proxy_job
     * const proxy_job = await prisma.proxy_job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends proxy_jobFindFirstArgs>(args?: SelectSubset<T, proxy_jobFindFirstArgs<ExtArgs>>): Prisma__proxy_jobClient<$Result.GetResult<Prisma.$proxy_jobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proxy_job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proxy_jobFindFirstOrThrowArgs} args - Arguments to find a Proxy_job
     * @example
     * // Get one Proxy_job
     * const proxy_job = await prisma.proxy_job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends proxy_jobFindFirstOrThrowArgs>(args?: SelectSubset<T, proxy_jobFindFirstOrThrowArgs<ExtArgs>>): Prisma__proxy_jobClient<$Result.GetResult<Prisma.$proxy_jobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Proxy_jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proxy_jobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Proxy_jobs
     * const proxy_jobs = await prisma.proxy_job.findMany()
     * 
     * // Get first 10 Proxy_jobs
     * const proxy_jobs = await prisma.proxy_job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const proxy_jobWithIdOnly = await prisma.proxy_job.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends proxy_jobFindManyArgs>(args?: SelectSubset<T, proxy_jobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$proxy_jobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Proxy_job.
     * @param {proxy_jobCreateArgs} args - Arguments to create a Proxy_job.
     * @example
     * // Create one Proxy_job
     * const Proxy_job = await prisma.proxy_job.create({
     *   data: {
     *     // ... data to create a Proxy_job
     *   }
     * })
     * 
     */
    create<T extends proxy_jobCreateArgs>(args: SelectSubset<T, proxy_jobCreateArgs<ExtArgs>>): Prisma__proxy_jobClient<$Result.GetResult<Prisma.$proxy_jobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Proxy_jobs.
     * @param {proxy_jobCreateManyArgs} args - Arguments to create many Proxy_jobs.
     * @example
     * // Create many Proxy_jobs
     * const proxy_job = await prisma.proxy_job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends proxy_jobCreateManyArgs>(args?: SelectSubset<T, proxy_jobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Proxy_job.
     * @param {proxy_jobDeleteArgs} args - Arguments to delete one Proxy_job.
     * @example
     * // Delete one Proxy_job
     * const Proxy_job = await prisma.proxy_job.delete({
     *   where: {
     *     // ... filter to delete one Proxy_job
     *   }
     * })
     * 
     */
    delete<T extends proxy_jobDeleteArgs>(args: SelectSubset<T, proxy_jobDeleteArgs<ExtArgs>>): Prisma__proxy_jobClient<$Result.GetResult<Prisma.$proxy_jobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Proxy_job.
     * @param {proxy_jobUpdateArgs} args - Arguments to update one Proxy_job.
     * @example
     * // Update one Proxy_job
     * const proxy_job = await prisma.proxy_job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends proxy_jobUpdateArgs>(args: SelectSubset<T, proxy_jobUpdateArgs<ExtArgs>>): Prisma__proxy_jobClient<$Result.GetResult<Prisma.$proxy_jobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Proxy_jobs.
     * @param {proxy_jobDeleteManyArgs} args - Arguments to filter Proxy_jobs to delete.
     * @example
     * // Delete a few Proxy_jobs
     * const { count } = await prisma.proxy_job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends proxy_jobDeleteManyArgs>(args?: SelectSubset<T, proxy_jobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proxy_jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proxy_jobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Proxy_jobs
     * const proxy_job = await prisma.proxy_job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends proxy_jobUpdateManyArgs>(args: SelectSubset<T, proxy_jobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Proxy_job.
     * @param {proxy_jobUpsertArgs} args - Arguments to update or create a Proxy_job.
     * @example
     * // Update or create a Proxy_job
     * const proxy_job = await prisma.proxy_job.upsert({
     *   create: {
     *     // ... data to create a Proxy_job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Proxy_job we want to update
     *   }
     * })
     */
    upsert<T extends proxy_jobUpsertArgs>(args: SelectSubset<T, proxy_jobUpsertArgs<ExtArgs>>): Prisma__proxy_jobClient<$Result.GetResult<Prisma.$proxy_jobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Proxy_jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proxy_jobCountArgs} args - Arguments to filter Proxy_jobs to count.
     * @example
     * // Count the number of Proxy_jobs
     * const count = await prisma.proxy_job.count({
     *   where: {
     *     // ... the filter for the Proxy_jobs we want to count
     *   }
     * })
    **/
    count<T extends proxy_jobCountArgs>(
      args?: Subset<T, proxy_jobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Proxy_jobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Proxy_job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Proxy_jobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Proxy_jobAggregateArgs>(args: Subset<T, Proxy_jobAggregateArgs>): Prisma.PrismaPromise<GetProxy_jobAggregateType<T>>

    /**
     * Group by Proxy_job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proxy_jobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends proxy_jobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: proxy_jobGroupByArgs['orderBy'] }
        : { orderBy?: proxy_jobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, proxy_jobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProxy_jobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the proxy_job model
   */
  readonly fields: proxy_jobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for proxy_job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__proxy_jobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schedule_job<T extends schedule_jobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, schedule_jobDefaultArgs<ExtArgs>>): Prisma__schedule_jobClient<$Result.GetResult<Prisma.$schedule_jobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    proxy<T extends proxyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, proxyDefaultArgs<ExtArgs>>): Prisma__proxyClient<$Result.GetResult<Prisma.$proxyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the proxy_job model
   */ 
  interface proxy_jobFieldRefs {
    readonly id: FieldRef<"proxy_job", 'Int'>
    readonly job_id: FieldRef<"proxy_job", 'Int'>
    readonly proxy_id: FieldRef<"proxy_job", 'Int'>
    readonly created_at: FieldRef<"proxy_job", 'DateTime'>
    readonly updated_at: FieldRef<"proxy_job", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * proxy_job findUnique
   */
  export type proxy_jobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy_job
     */
    select?: proxy_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy_job
     */
    omit?: proxy_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxy_jobInclude<ExtArgs> | null
    /**
     * Filter, which proxy_job to fetch.
     */
    where: proxy_jobWhereUniqueInput
  }

  /**
   * proxy_job findUniqueOrThrow
   */
  export type proxy_jobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy_job
     */
    select?: proxy_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy_job
     */
    omit?: proxy_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxy_jobInclude<ExtArgs> | null
    /**
     * Filter, which proxy_job to fetch.
     */
    where: proxy_jobWhereUniqueInput
  }

  /**
   * proxy_job findFirst
   */
  export type proxy_jobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy_job
     */
    select?: proxy_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy_job
     */
    omit?: proxy_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxy_jobInclude<ExtArgs> | null
    /**
     * Filter, which proxy_job to fetch.
     */
    where?: proxy_jobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proxy_jobs to fetch.
     */
    orderBy?: proxy_jobOrderByWithRelationInput | proxy_jobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for proxy_jobs.
     */
    cursor?: proxy_jobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proxy_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proxy_jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of proxy_jobs.
     */
    distinct?: Proxy_jobScalarFieldEnum | Proxy_jobScalarFieldEnum[]
  }

  /**
   * proxy_job findFirstOrThrow
   */
  export type proxy_jobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy_job
     */
    select?: proxy_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy_job
     */
    omit?: proxy_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxy_jobInclude<ExtArgs> | null
    /**
     * Filter, which proxy_job to fetch.
     */
    where?: proxy_jobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proxy_jobs to fetch.
     */
    orderBy?: proxy_jobOrderByWithRelationInput | proxy_jobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for proxy_jobs.
     */
    cursor?: proxy_jobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proxy_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proxy_jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of proxy_jobs.
     */
    distinct?: Proxy_jobScalarFieldEnum | Proxy_jobScalarFieldEnum[]
  }

  /**
   * proxy_job findMany
   */
  export type proxy_jobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy_job
     */
    select?: proxy_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy_job
     */
    omit?: proxy_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxy_jobInclude<ExtArgs> | null
    /**
     * Filter, which proxy_jobs to fetch.
     */
    where?: proxy_jobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proxy_jobs to fetch.
     */
    orderBy?: proxy_jobOrderByWithRelationInput | proxy_jobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing proxy_jobs.
     */
    cursor?: proxy_jobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proxy_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proxy_jobs.
     */
    skip?: number
    distinct?: Proxy_jobScalarFieldEnum | Proxy_jobScalarFieldEnum[]
  }

  /**
   * proxy_job create
   */
  export type proxy_jobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy_job
     */
    select?: proxy_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy_job
     */
    omit?: proxy_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxy_jobInclude<ExtArgs> | null
    /**
     * The data needed to create a proxy_job.
     */
    data: XOR<proxy_jobCreateInput, proxy_jobUncheckedCreateInput>
  }

  /**
   * proxy_job createMany
   */
  export type proxy_jobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many proxy_jobs.
     */
    data: proxy_jobCreateManyInput | proxy_jobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * proxy_job update
   */
  export type proxy_jobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy_job
     */
    select?: proxy_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy_job
     */
    omit?: proxy_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxy_jobInclude<ExtArgs> | null
    /**
     * The data needed to update a proxy_job.
     */
    data: XOR<proxy_jobUpdateInput, proxy_jobUncheckedUpdateInput>
    /**
     * Choose, which proxy_job to update.
     */
    where: proxy_jobWhereUniqueInput
  }

  /**
   * proxy_job updateMany
   */
  export type proxy_jobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update proxy_jobs.
     */
    data: XOR<proxy_jobUpdateManyMutationInput, proxy_jobUncheckedUpdateManyInput>
    /**
     * Filter which proxy_jobs to update
     */
    where?: proxy_jobWhereInput
    /**
     * Limit how many proxy_jobs to update.
     */
    limit?: number
  }

  /**
   * proxy_job upsert
   */
  export type proxy_jobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy_job
     */
    select?: proxy_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy_job
     */
    omit?: proxy_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxy_jobInclude<ExtArgs> | null
    /**
     * The filter to search for the proxy_job to update in case it exists.
     */
    where: proxy_jobWhereUniqueInput
    /**
     * In case the proxy_job found by the `where` argument doesn't exist, create a new proxy_job with this data.
     */
    create: XOR<proxy_jobCreateInput, proxy_jobUncheckedCreateInput>
    /**
     * In case the proxy_job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<proxy_jobUpdateInput, proxy_jobUncheckedUpdateInput>
  }

  /**
   * proxy_job delete
   */
  export type proxy_jobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy_job
     */
    select?: proxy_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy_job
     */
    omit?: proxy_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxy_jobInclude<ExtArgs> | null
    /**
     * Filter which proxy_job to delete.
     */
    where: proxy_jobWhereUniqueInput
  }

  /**
   * proxy_job deleteMany
   */
  export type proxy_jobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which proxy_jobs to delete
     */
    where?: proxy_jobWhereInput
    /**
     * Limit how many proxy_jobs to delete.
     */
    limit?: number
  }

  /**
   * proxy_job without action
   */
  export type proxy_jobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy_job
     */
    select?: proxy_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy_job
     */
    omit?: proxy_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxy_jobInclude<ExtArgs> | null
  }


  /**
   * Model schedule_job
   */

  export type AggregateSchedule_job = {
    _count: Schedule_jobCountAggregateOutputType | null
    _avg: Schedule_jobAvgAggregateOutputType | null
    _sum: Schedule_jobSumAggregateOutputType | null
    _min: Schedule_jobMinAggregateOutputType | null
    _max: Schedule_jobMaxAggregateOutputType | null
  }

  export type Schedule_jobAvgAggregateOutputType = {
    job_id: number | null
    average_time: number | null
  }

  export type Schedule_jobSumAggregateOutputType = {
    job_id: number | null
    average_time: number | null
  }

  export type Schedule_jobMinAggregateOutputType = {
    job_id: number | null
    job_name: string | null
    job_param: string | null
    job_cron_setting: string | null
    consumer: string | null
    exclusive: string | null
    status: string | null
    average_time: number | null
    created_at: Date | null
  }

  export type Schedule_jobMaxAggregateOutputType = {
    job_id: number | null
    job_name: string | null
    job_param: string | null
    job_cron_setting: string | null
    consumer: string | null
    exclusive: string | null
    status: string | null
    average_time: number | null
    created_at: Date | null
  }

  export type Schedule_jobCountAggregateOutputType = {
    job_id: number
    job_name: number
    job_param: number
    job_cron_setting: number
    consumer: number
    exclusive: number
    status: number
    average_time: number
    created_at: number
    _all: number
  }


  export type Schedule_jobAvgAggregateInputType = {
    job_id?: true
    average_time?: true
  }

  export type Schedule_jobSumAggregateInputType = {
    job_id?: true
    average_time?: true
  }

  export type Schedule_jobMinAggregateInputType = {
    job_id?: true
    job_name?: true
    job_param?: true
    job_cron_setting?: true
    consumer?: true
    exclusive?: true
    status?: true
    average_time?: true
    created_at?: true
  }

  export type Schedule_jobMaxAggregateInputType = {
    job_id?: true
    job_name?: true
    job_param?: true
    job_cron_setting?: true
    consumer?: true
    exclusive?: true
    status?: true
    average_time?: true
    created_at?: true
  }

  export type Schedule_jobCountAggregateInputType = {
    job_id?: true
    job_name?: true
    job_param?: true
    job_cron_setting?: true
    consumer?: true
    exclusive?: true
    status?: true
    average_time?: true
    created_at?: true
    _all?: true
  }

  export type Schedule_jobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which schedule_job to aggregate.
     */
    where?: schedule_jobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of schedule_jobs to fetch.
     */
    orderBy?: schedule_jobOrderByWithRelationInput | schedule_jobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: schedule_jobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` schedule_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` schedule_jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned schedule_jobs
    **/
    _count?: true | Schedule_jobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Schedule_jobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Schedule_jobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Schedule_jobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Schedule_jobMaxAggregateInputType
  }

  export type GetSchedule_jobAggregateType<T extends Schedule_jobAggregateArgs> = {
        [P in keyof T & keyof AggregateSchedule_job]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchedule_job[P]>
      : GetScalarType<T[P], AggregateSchedule_job[P]>
  }




  export type schedule_jobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: schedule_jobWhereInput
    orderBy?: schedule_jobOrderByWithAggregationInput | schedule_jobOrderByWithAggregationInput[]
    by: Schedule_jobScalarFieldEnum[] | Schedule_jobScalarFieldEnum
    having?: schedule_jobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Schedule_jobCountAggregateInputType | true
    _avg?: Schedule_jobAvgAggregateInputType
    _sum?: Schedule_jobSumAggregateInputType
    _min?: Schedule_jobMinAggregateInputType
    _max?: Schedule_jobMaxAggregateInputType
  }

  export type Schedule_jobGroupByOutputType = {
    job_id: number
    job_name: string
    job_param: string | null
    job_cron_setting: string
    consumer: string
    exclusive: string
    status: string
    average_time: number | null
    created_at: Date | null
    _count: Schedule_jobCountAggregateOutputType | null
    _avg: Schedule_jobAvgAggregateOutputType | null
    _sum: Schedule_jobSumAggregateOutputType | null
    _min: Schedule_jobMinAggregateOutputType | null
    _max: Schedule_jobMaxAggregateOutputType | null
  }

  type GetSchedule_jobGroupByPayload<T extends schedule_jobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Schedule_jobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Schedule_jobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Schedule_jobGroupByOutputType[P]>
            : GetScalarType<T[P], Schedule_jobGroupByOutputType[P]>
        }
      >
    >


  export type schedule_jobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    job_id?: boolean
    job_name?: boolean
    job_param?: boolean
    job_cron_setting?: boolean
    consumer?: boolean
    exclusive?: boolean
    status?: boolean
    average_time?: boolean
    created_at?: boolean
    job_logs?: boolean | schedule_job$job_logsArgs<ExtArgs>
    proxies?: boolean | schedule_job$proxiesArgs<ExtArgs>
    _count?: boolean | Schedule_jobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule_job"]>



  export type schedule_jobSelectScalar = {
    job_id?: boolean
    job_name?: boolean
    job_param?: boolean
    job_cron_setting?: boolean
    consumer?: boolean
    exclusive?: boolean
    status?: boolean
    average_time?: boolean
    created_at?: boolean
  }

  export type schedule_jobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"job_id" | "job_name" | "job_param" | "job_cron_setting" | "consumer" | "exclusive" | "status" | "average_time" | "created_at", ExtArgs["result"]["schedule_job"]>
  export type schedule_jobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job_logs?: boolean | schedule_job$job_logsArgs<ExtArgs>
    proxies?: boolean | schedule_job$proxiesArgs<ExtArgs>
    _count?: boolean | Schedule_jobCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $schedule_jobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "schedule_job"
    objects: {
      job_logs: Prisma.$schedule_job_logPayload<ExtArgs>[]
      proxies: Prisma.$proxy_jobPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      job_id: number
      job_name: string
      job_param: string | null
      job_cron_setting: string
      consumer: string
      exclusive: string
      status: string
      average_time: number | null
      created_at: Date | null
    }, ExtArgs["result"]["schedule_job"]>
    composites: {}
  }

  type schedule_jobGetPayload<S extends boolean | null | undefined | schedule_jobDefaultArgs> = $Result.GetResult<Prisma.$schedule_jobPayload, S>

  type schedule_jobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<schedule_jobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Schedule_jobCountAggregateInputType | true
    }

  export interface schedule_jobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['schedule_job'], meta: { name: 'schedule_job' } }
    /**
     * Find zero or one Schedule_job that matches the filter.
     * @param {schedule_jobFindUniqueArgs} args - Arguments to find a Schedule_job
     * @example
     * // Get one Schedule_job
     * const schedule_job = await prisma.schedule_job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends schedule_jobFindUniqueArgs>(args: SelectSubset<T, schedule_jobFindUniqueArgs<ExtArgs>>): Prisma__schedule_jobClient<$Result.GetResult<Prisma.$schedule_jobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Schedule_job that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {schedule_jobFindUniqueOrThrowArgs} args - Arguments to find a Schedule_job
     * @example
     * // Get one Schedule_job
     * const schedule_job = await prisma.schedule_job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends schedule_jobFindUniqueOrThrowArgs>(args: SelectSubset<T, schedule_jobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__schedule_jobClient<$Result.GetResult<Prisma.$schedule_jobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule_job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schedule_jobFindFirstArgs} args - Arguments to find a Schedule_job
     * @example
     * // Get one Schedule_job
     * const schedule_job = await prisma.schedule_job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends schedule_jobFindFirstArgs>(args?: SelectSubset<T, schedule_jobFindFirstArgs<ExtArgs>>): Prisma__schedule_jobClient<$Result.GetResult<Prisma.$schedule_jobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule_job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schedule_jobFindFirstOrThrowArgs} args - Arguments to find a Schedule_job
     * @example
     * // Get one Schedule_job
     * const schedule_job = await prisma.schedule_job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends schedule_jobFindFirstOrThrowArgs>(args?: SelectSubset<T, schedule_jobFindFirstOrThrowArgs<ExtArgs>>): Prisma__schedule_jobClient<$Result.GetResult<Prisma.$schedule_jobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Schedule_jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schedule_jobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schedule_jobs
     * const schedule_jobs = await prisma.schedule_job.findMany()
     * 
     * // Get first 10 Schedule_jobs
     * const schedule_jobs = await prisma.schedule_job.findMany({ take: 10 })
     * 
     * // Only select the `job_id`
     * const schedule_jobWithJob_idOnly = await prisma.schedule_job.findMany({ select: { job_id: true } })
     * 
     */
    findMany<T extends schedule_jobFindManyArgs>(args?: SelectSubset<T, schedule_jobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$schedule_jobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Schedule_job.
     * @param {schedule_jobCreateArgs} args - Arguments to create a Schedule_job.
     * @example
     * // Create one Schedule_job
     * const Schedule_job = await prisma.schedule_job.create({
     *   data: {
     *     // ... data to create a Schedule_job
     *   }
     * })
     * 
     */
    create<T extends schedule_jobCreateArgs>(args: SelectSubset<T, schedule_jobCreateArgs<ExtArgs>>): Prisma__schedule_jobClient<$Result.GetResult<Prisma.$schedule_jobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Schedule_jobs.
     * @param {schedule_jobCreateManyArgs} args - Arguments to create many Schedule_jobs.
     * @example
     * // Create many Schedule_jobs
     * const schedule_job = await prisma.schedule_job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends schedule_jobCreateManyArgs>(args?: SelectSubset<T, schedule_jobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Schedule_job.
     * @param {schedule_jobDeleteArgs} args - Arguments to delete one Schedule_job.
     * @example
     * // Delete one Schedule_job
     * const Schedule_job = await prisma.schedule_job.delete({
     *   where: {
     *     // ... filter to delete one Schedule_job
     *   }
     * })
     * 
     */
    delete<T extends schedule_jobDeleteArgs>(args: SelectSubset<T, schedule_jobDeleteArgs<ExtArgs>>): Prisma__schedule_jobClient<$Result.GetResult<Prisma.$schedule_jobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Schedule_job.
     * @param {schedule_jobUpdateArgs} args - Arguments to update one Schedule_job.
     * @example
     * // Update one Schedule_job
     * const schedule_job = await prisma.schedule_job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends schedule_jobUpdateArgs>(args: SelectSubset<T, schedule_jobUpdateArgs<ExtArgs>>): Prisma__schedule_jobClient<$Result.GetResult<Prisma.$schedule_jobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Schedule_jobs.
     * @param {schedule_jobDeleteManyArgs} args - Arguments to filter Schedule_jobs to delete.
     * @example
     * // Delete a few Schedule_jobs
     * const { count } = await prisma.schedule_job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends schedule_jobDeleteManyArgs>(args?: SelectSubset<T, schedule_jobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedule_jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schedule_jobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schedule_jobs
     * const schedule_job = await prisma.schedule_job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends schedule_jobUpdateManyArgs>(args: SelectSubset<T, schedule_jobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Schedule_job.
     * @param {schedule_jobUpsertArgs} args - Arguments to update or create a Schedule_job.
     * @example
     * // Update or create a Schedule_job
     * const schedule_job = await prisma.schedule_job.upsert({
     *   create: {
     *     // ... data to create a Schedule_job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Schedule_job we want to update
     *   }
     * })
     */
    upsert<T extends schedule_jobUpsertArgs>(args: SelectSubset<T, schedule_jobUpsertArgs<ExtArgs>>): Prisma__schedule_jobClient<$Result.GetResult<Prisma.$schedule_jobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Schedule_jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schedule_jobCountArgs} args - Arguments to filter Schedule_jobs to count.
     * @example
     * // Count the number of Schedule_jobs
     * const count = await prisma.schedule_job.count({
     *   where: {
     *     // ... the filter for the Schedule_jobs we want to count
     *   }
     * })
    **/
    count<T extends schedule_jobCountArgs>(
      args?: Subset<T, schedule_jobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Schedule_jobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Schedule_job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Schedule_jobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Schedule_jobAggregateArgs>(args: Subset<T, Schedule_jobAggregateArgs>): Prisma.PrismaPromise<GetSchedule_jobAggregateType<T>>

    /**
     * Group by Schedule_job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schedule_jobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends schedule_jobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: schedule_jobGroupByArgs['orderBy'] }
        : { orderBy?: schedule_jobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, schedule_jobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchedule_jobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the schedule_job model
   */
  readonly fields: schedule_jobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for schedule_job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__schedule_jobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job_logs<T extends schedule_job$job_logsArgs<ExtArgs> = {}>(args?: Subset<T, schedule_job$job_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$schedule_job_logPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    proxies<T extends schedule_job$proxiesArgs<ExtArgs> = {}>(args?: Subset<T, schedule_job$proxiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$proxy_jobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the schedule_job model
   */ 
  interface schedule_jobFieldRefs {
    readonly job_id: FieldRef<"schedule_job", 'Int'>
    readonly job_name: FieldRef<"schedule_job", 'String'>
    readonly job_param: FieldRef<"schedule_job", 'String'>
    readonly job_cron_setting: FieldRef<"schedule_job", 'String'>
    readonly consumer: FieldRef<"schedule_job", 'String'>
    readonly exclusive: FieldRef<"schedule_job", 'String'>
    readonly status: FieldRef<"schedule_job", 'String'>
    readonly average_time: FieldRef<"schedule_job", 'Float'>
    readonly created_at: FieldRef<"schedule_job", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * schedule_job findUnique
   */
  export type schedule_jobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job
     */
    select?: schedule_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job
     */
    omit?: schedule_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_jobInclude<ExtArgs> | null
    /**
     * Filter, which schedule_job to fetch.
     */
    where: schedule_jobWhereUniqueInput
  }

  /**
   * schedule_job findUniqueOrThrow
   */
  export type schedule_jobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job
     */
    select?: schedule_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job
     */
    omit?: schedule_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_jobInclude<ExtArgs> | null
    /**
     * Filter, which schedule_job to fetch.
     */
    where: schedule_jobWhereUniqueInput
  }

  /**
   * schedule_job findFirst
   */
  export type schedule_jobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job
     */
    select?: schedule_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job
     */
    omit?: schedule_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_jobInclude<ExtArgs> | null
    /**
     * Filter, which schedule_job to fetch.
     */
    where?: schedule_jobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of schedule_jobs to fetch.
     */
    orderBy?: schedule_jobOrderByWithRelationInput | schedule_jobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for schedule_jobs.
     */
    cursor?: schedule_jobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` schedule_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` schedule_jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of schedule_jobs.
     */
    distinct?: Schedule_jobScalarFieldEnum | Schedule_jobScalarFieldEnum[]
  }

  /**
   * schedule_job findFirstOrThrow
   */
  export type schedule_jobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job
     */
    select?: schedule_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job
     */
    omit?: schedule_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_jobInclude<ExtArgs> | null
    /**
     * Filter, which schedule_job to fetch.
     */
    where?: schedule_jobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of schedule_jobs to fetch.
     */
    orderBy?: schedule_jobOrderByWithRelationInput | schedule_jobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for schedule_jobs.
     */
    cursor?: schedule_jobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` schedule_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` schedule_jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of schedule_jobs.
     */
    distinct?: Schedule_jobScalarFieldEnum | Schedule_jobScalarFieldEnum[]
  }

  /**
   * schedule_job findMany
   */
  export type schedule_jobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job
     */
    select?: schedule_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job
     */
    omit?: schedule_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_jobInclude<ExtArgs> | null
    /**
     * Filter, which schedule_jobs to fetch.
     */
    where?: schedule_jobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of schedule_jobs to fetch.
     */
    orderBy?: schedule_jobOrderByWithRelationInput | schedule_jobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing schedule_jobs.
     */
    cursor?: schedule_jobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` schedule_jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` schedule_jobs.
     */
    skip?: number
    distinct?: Schedule_jobScalarFieldEnum | Schedule_jobScalarFieldEnum[]
  }

  /**
   * schedule_job create
   */
  export type schedule_jobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job
     */
    select?: schedule_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job
     */
    omit?: schedule_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_jobInclude<ExtArgs> | null
    /**
     * The data needed to create a schedule_job.
     */
    data?: XOR<schedule_jobCreateInput, schedule_jobUncheckedCreateInput>
  }

  /**
   * schedule_job createMany
   */
  export type schedule_jobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many schedule_jobs.
     */
    data: schedule_jobCreateManyInput | schedule_jobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * schedule_job update
   */
  export type schedule_jobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job
     */
    select?: schedule_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job
     */
    omit?: schedule_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_jobInclude<ExtArgs> | null
    /**
     * The data needed to update a schedule_job.
     */
    data: XOR<schedule_jobUpdateInput, schedule_jobUncheckedUpdateInput>
    /**
     * Choose, which schedule_job to update.
     */
    where: schedule_jobWhereUniqueInput
  }

  /**
   * schedule_job updateMany
   */
  export type schedule_jobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update schedule_jobs.
     */
    data: XOR<schedule_jobUpdateManyMutationInput, schedule_jobUncheckedUpdateManyInput>
    /**
     * Filter which schedule_jobs to update
     */
    where?: schedule_jobWhereInput
    /**
     * Limit how many schedule_jobs to update.
     */
    limit?: number
  }

  /**
   * schedule_job upsert
   */
  export type schedule_jobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job
     */
    select?: schedule_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job
     */
    omit?: schedule_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_jobInclude<ExtArgs> | null
    /**
     * The filter to search for the schedule_job to update in case it exists.
     */
    where: schedule_jobWhereUniqueInput
    /**
     * In case the schedule_job found by the `where` argument doesn't exist, create a new schedule_job with this data.
     */
    create: XOR<schedule_jobCreateInput, schedule_jobUncheckedCreateInput>
    /**
     * In case the schedule_job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<schedule_jobUpdateInput, schedule_jobUncheckedUpdateInput>
  }

  /**
   * schedule_job delete
   */
  export type schedule_jobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job
     */
    select?: schedule_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job
     */
    omit?: schedule_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_jobInclude<ExtArgs> | null
    /**
     * Filter which schedule_job to delete.
     */
    where: schedule_jobWhereUniqueInput
  }

  /**
   * schedule_job deleteMany
   */
  export type schedule_jobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which schedule_jobs to delete
     */
    where?: schedule_jobWhereInput
    /**
     * Limit how many schedule_jobs to delete.
     */
    limit?: number
  }

  /**
   * schedule_job.job_logs
   */
  export type schedule_job$job_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job_log
     */
    select?: schedule_job_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job_log
     */
    omit?: schedule_job_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_job_logInclude<ExtArgs> | null
    where?: schedule_job_logWhereInput
    orderBy?: schedule_job_logOrderByWithRelationInput | schedule_job_logOrderByWithRelationInput[]
    cursor?: schedule_job_logWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Schedule_job_logScalarFieldEnum | Schedule_job_logScalarFieldEnum[]
  }

  /**
   * schedule_job.proxies
   */
  export type schedule_job$proxiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proxy_job
     */
    select?: proxy_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proxy_job
     */
    omit?: proxy_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proxy_jobInclude<ExtArgs> | null
    where?: proxy_jobWhereInput
    orderBy?: proxy_jobOrderByWithRelationInput | proxy_jobOrderByWithRelationInput[]
    cursor?: proxy_jobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Proxy_jobScalarFieldEnum | Proxy_jobScalarFieldEnum[]
  }

  /**
   * schedule_job without action
   */
  export type schedule_jobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job
     */
    select?: schedule_jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job
     */
    omit?: schedule_jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_jobInclude<ExtArgs> | null
  }


  /**
   * Model schedule_job_log
   */

  export type AggregateSchedule_job_log = {
    _count: Schedule_job_logCountAggregateOutputType | null
    _avg: Schedule_job_logAvgAggregateOutputType | null
    _sum: Schedule_job_logSumAggregateOutputType | null
    _min: Schedule_job_logMinAggregateOutputType | null
    _max: Schedule_job_logMaxAggregateOutputType | null
  }

  export type Schedule_job_logAvgAggregateOutputType = {
    job_id: number | null
  }

  export type Schedule_job_logSumAggregateOutputType = {
    job_id: number | null
  }

  export type Schedule_job_logMinAggregateOutputType = {
    job_log_id: string | null
    job_id: number | null
    machine: string | null
    start_time: Date | null
    end_time: Date | null
    result: string | null
    error: string | null
  }

  export type Schedule_job_logMaxAggregateOutputType = {
    job_log_id: string | null
    job_id: number | null
    machine: string | null
    start_time: Date | null
    end_time: Date | null
    result: string | null
    error: string | null
  }

  export type Schedule_job_logCountAggregateOutputType = {
    job_log_id: number
    job_id: number
    machine: number
    start_time: number
    end_time: number
    result: number
    error: number
    _all: number
  }


  export type Schedule_job_logAvgAggregateInputType = {
    job_id?: true
  }

  export type Schedule_job_logSumAggregateInputType = {
    job_id?: true
  }

  export type Schedule_job_logMinAggregateInputType = {
    job_log_id?: true
    job_id?: true
    machine?: true
    start_time?: true
    end_time?: true
    result?: true
    error?: true
  }

  export type Schedule_job_logMaxAggregateInputType = {
    job_log_id?: true
    job_id?: true
    machine?: true
    start_time?: true
    end_time?: true
    result?: true
    error?: true
  }

  export type Schedule_job_logCountAggregateInputType = {
    job_log_id?: true
    job_id?: true
    machine?: true
    start_time?: true
    end_time?: true
    result?: true
    error?: true
    _all?: true
  }

  export type Schedule_job_logAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which schedule_job_log to aggregate.
     */
    where?: schedule_job_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of schedule_job_logs to fetch.
     */
    orderBy?: schedule_job_logOrderByWithRelationInput | schedule_job_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: schedule_job_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` schedule_job_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` schedule_job_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned schedule_job_logs
    **/
    _count?: true | Schedule_job_logCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Schedule_job_logAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Schedule_job_logSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Schedule_job_logMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Schedule_job_logMaxAggregateInputType
  }

  export type GetSchedule_job_logAggregateType<T extends Schedule_job_logAggregateArgs> = {
        [P in keyof T & keyof AggregateSchedule_job_log]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchedule_job_log[P]>
      : GetScalarType<T[P], AggregateSchedule_job_log[P]>
  }




  export type schedule_job_logGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: schedule_job_logWhereInput
    orderBy?: schedule_job_logOrderByWithAggregationInput | schedule_job_logOrderByWithAggregationInput[]
    by: Schedule_job_logScalarFieldEnum[] | Schedule_job_logScalarFieldEnum
    having?: schedule_job_logScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Schedule_job_logCountAggregateInputType | true
    _avg?: Schedule_job_logAvgAggregateInputType
    _sum?: Schedule_job_logSumAggregateInputType
    _min?: Schedule_job_logMinAggregateInputType
    _max?: Schedule_job_logMaxAggregateInputType
  }

  export type Schedule_job_logGroupByOutputType = {
    job_log_id: string
    job_id: number
    machine: string | null
    start_time: Date
    end_time: Date | null
    result: string | null
    error: string | null
    _count: Schedule_job_logCountAggregateOutputType | null
    _avg: Schedule_job_logAvgAggregateOutputType | null
    _sum: Schedule_job_logSumAggregateOutputType | null
    _min: Schedule_job_logMinAggregateOutputType | null
    _max: Schedule_job_logMaxAggregateOutputType | null
  }

  type GetSchedule_job_logGroupByPayload<T extends schedule_job_logGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Schedule_job_logGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Schedule_job_logGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Schedule_job_logGroupByOutputType[P]>
            : GetScalarType<T[P], Schedule_job_logGroupByOutputType[P]>
        }
      >
    >


  export type schedule_job_logSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    job_log_id?: boolean
    job_id?: boolean
    machine?: boolean
    start_time?: boolean
    end_time?: boolean
    result?: boolean
    error?: boolean
    schedule_job?: boolean | schedule_jobDefaultArgs<ExtArgs>
    cache_files?: boolean | schedule_job_log$cache_filesArgs<ExtArgs>
    output_files?: boolean | schedule_job_log$output_filesArgs<ExtArgs>
    events?: boolean | schedule_job_log$eventsArgs<ExtArgs>
    _count?: boolean | Schedule_job_logCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule_job_log"]>



  export type schedule_job_logSelectScalar = {
    job_log_id?: boolean
    job_id?: boolean
    machine?: boolean
    start_time?: boolean
    end_time?: boolean
    result?: boolean
    error?: boolean
  }

  export type schedule_job_logOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"job_log_id" | "job_id" | "machine" | "start_time" | "end_time" | "result" | "error", ExtArgs["result"]["schedule_job_log"]>
  export type schedule_job_logInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedule_job?: boolean | schedule_jobDefaultArgs<ExtArgs>
    cache_files?: boolean | schedule_job_log$cache_filesArgs<ExtArgs>
    output_files?: boolean | schedule_job_log$output_filesArgs<ExtArgs>
    events?: boolean | schedule_job_log$eventsArgs<ExtArgs>
    _count?: boolean | Schedule_job_logCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $schedule_job_logPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "schedule_job_log"
    objects: {
      schedule_job: Prisma.$schedule_jobPayload<ExtArgs>
      cache_files: Prisma.$cache_filesPayload<ExtArgs>[]
      output_files: Prisma.$output_filesPayload<ExtArgs>[]
      events: Prisma.$job_event_logPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      job_log_id: string
      job_id: number
      machine: string | null
      start_time: Date
      end_time: Date | null
      result: string | null
      error: string | null
    }, ExtArgs["result"]["schedule_job_log"]>
    composites: {}
  }

  type schedule_job_logGetPayload<S extends boolean | null | undefined | schedule_job_logDefaultArgs> = $Result.GetResult<Prisma.$schedule_job_logPayload, S>

  type schedule_job_logCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<schedule_job_logFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Schedule_job_logCountAggregateInputType | true
    }

  export interface schedule_job_logDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['schedule_job_log'], meta: { name: 'schedule_job_log' } }
    /**
     * Find zero or one Schedule_job_log that matches the filter.
     * @param {schedule_job_logFindUniqueArgs} args - Arguments to find a Schedule_job_log
     * @example
     * // Get one Schedule_job_log
     * const schedule_job_log = await prisma.schedule_job_log.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends schedule_job_logFindUniqueArgs>(args: SelectSubset<T, schedule_job_logFindUniqueArgs<ExtArgs>>): Prisma__schedule_job_logClient<$Result.GetResult<Prisma.$schedule_job_logPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Schedule_job_log that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {schedule_job_logFindUniqueOrThrowArgs} args - Arguments to find a Schedule_job_log
     * @example
     * // Get one Schedule_job_log
     * const schedule_job_log = await prisma.schedule_job_log.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends schedule_job_logFindUniqueOrThrowArgs>(args: SelectSubset<T, schedule_job_logFindUniqueOrThrowArgs<ExtArgs>>): Prisma__schedule_job_logClient<$Result.GetResult<Prisma.$schedule_job_logPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule_job_log that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schedule_job_logFindFirstArgs} args - Arguments to find a Schedule_job_log
     * @example
     * // Get one Schedule_job_log
     * const schedule_job_log = await prisma.schedule_job_log.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends schedule_job_logFindFirstArgs>(args?: SelectSubset<T, schedule_job_logFindFirstArgs<ExtArgs>>): Prisma__schedule_job_logClient<$Result.GetResult<Prisma.$schedule_job_logPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule_job_log that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schedule_job_logFindFirstOrThrowArgs} args - Arguments to find a Schedule_job_log
     * @example
     * // Get one Schedule_job_log
     * const schedule_job_log = await prisma.schedule_job_log.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends schedule_job_logFindFirstOrThrowArgs>(args?: SelectSubset<T, schedule_job_logFindFirstOrThrowArgs<ExtArgs>>): Prisma__schedule_job_logClient<$Result.GetResult<Prisma.$schedule_job_logPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Schedule_job_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schedule_job_logFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schedule_job_logs
     * const schedule_job_logs = await prisma.schedule_job_log.findMany()
     * 
     * // Get first 10 Schedule_job_logs
     * const schedule_job_logs = await prisma.schedule_job_log.findMany({ take: 10 })
     * 
     * // Only select the `job_log_id`
     * const schedule_job_logWithJob_log_idOnly = await prisma.schedule_job_log.findMany({ select: { job_log_id: true } })
     * 
     */
    findMany<T extends schedule_job_logFindManyArgs>(args?: SelectSubset<T, schedule_job_logFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$schedule_job_logPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Schedule_job_log.
     * @param {schedule_job_logCreateArgs} args - Arguments to create a Schedule_job_log.
     * @example
     * // Create one Schedule_job_log
     * const Schedule_job_log = await prisma.schedule_job_log.create({
     *   data: {
     *     // ... data to create a Schedule_job_log
     *   }
     * })
     * 
     */
    create<T extends schedule_job_logCreateArgs>(args: SelectSubset<T, schedule_job_logCreateArgs<ExtArgs>>): Prisma__schedule_job_logClient<$Result.GetResult<Prisma.$schedule_job_logPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Schedule_job_logs.
     * @param {schedule_job_logCreateManyArgs} args - Arguments to create many Schedule_job_logs.
     * @example
     * // Create many Schedule_job_logs
     * const schedule_job_log = await prisma.schedule_job_log.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends schedule_job_logCreateManyArgs>(args?: SelectSubset<T, schedule_job_logCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Schedule_job_log.
     * @param {schedule_job_logDeleteArgs} args - Arguments to delete one Schedule_job_log.
     * @example
     * // Delete one Schedule_job_log
     * const Schedule_job_log = await prisma.schedule_job_log.delete({
     *   where: {
     *     // ... filter to delete one Schedule_job_log
     *   }
     * })
     * 
     */
    delete<T extends schedule_job_logDeleteArgs>(args: SelectSubset<T, schedule_job_logDeleteArgs<ExtArgs>>): Prisma__schedule_job_logClient<$Result.GetResult<Prisma.$schedule_job_logPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Schedule_job_log.
     * @param {schedule_job_logUpdateArgs} args - Arguments to update one Schedule_job_log.
     * @example
     * // Update one Schedule_job_log
     * const schedule_job_log = await prisma.schedule_job_log.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends schedule_job_logUpdateArgs>(args: SelectSubset<T, schedule_job_logUpdateArgs<ExtArgs>>): Prisma__schedule_job_logClient<$Result.GetResult<Prisma.$schedule_job_logPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Schedule_job_logs.
     * @param {schedule_job_logDeleteManyArgs} args - Arguments to filter Schedule_job_logs to delete.
     * @example
     * // Delete a few Schedule_job_logs
     * const { count } = await prisma.schedule_job_log.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends schedule_job_logDeleteManyArgs>(args?: SelectSubset<T, schedule_job_logDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedule_job_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schedule_job_logUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schedule_job_logs
     * const schedule_job_log = await prisma.schedule_job_log.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends schedule_job_logUpdateManyArgs>(args: SelectSubset<T, schedule_job_logUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Schedule_job_log.
     * @param {schedule_job_logUpsertArgs} args - Arguments to update or create a Schedule_job_log.
     * @example
     * // Update or create a Schedule_job_log
     * const schedule_job_log = await prisma.schedule_job_log.upsert({
     *   create: {
     *     // ... data to create a Schedule_job_log
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Schedule_job_log we want to update
     *   }
     * })
     */
    upsert<T extends schedule_job_logUpsertArgs>(args: SelectSubset<T, schedule_job_logUpsertArgs<ExtArgs>>): Prisma__schedule_job_logClient<$Result.GetResult<Prisma.$schedule_job_logPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Schedule_job_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schedule_job_logCountArgs} args - Arguments to filter Schedule_job_logs to count.
     * @example
     * // Count the number of Schedule_job_logs
     * const count = await prisma.schedule_job_log.count({
     *   where: {
     *     // ... the filter for the Schedule_job_logs we want to count
     *   }
     * })
    **/
    count<T extends schedule_job_logCountArgs>(
      args?: Subset<T, schedule_job_logCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Schedule_job_logCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Schedule_job_log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Schedule_job_logAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Schedule_job_logAggregateArgs>(args: Subset<T, Schedule_job_logAggregateArgs>): Prisma.PrismaPromise<GetSchedule_job_logAggregateType<T>>

    /**
     * Group by Schedule_job_log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {schedule_job_logGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends schedule_job_logGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: schedule_job_logGroupByArgs['orderBy'] }
        : { orderBy?: schedule_job_logGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, schedule_job_logGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchedule_job_logGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the schedule_job_log model
   */
  readonly fields: schedule_job_logFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for schedule_job_log.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__schedule_job_logClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schedule_job<T extends schedule_jobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, schedule_jobDefaultArgs<ExtArgs>>): Prisma__schedule_jobClient<$Result.GetResult<Prisma.$schedule_jobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cache_files<T extends schedule_job_log$cache_filesArgs<ExtArgs> = {}>(args?: Subset<T, schedule_job_log$cache_filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cache_filesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    output_files<T extends schedule_job_log$output_filesArgs<ExtArgs> = {}>(args?: Subset<T, schedule_job_log$output_filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$output_filesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends schedule_job_log$eventsArgs<ExtArgs> = {}>(args?: Subset<T, schedule_job_log$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$job_event_logPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the schedule_job_log model
   */ 
  interface schedule_job_logFieldRefs {
    readonly job_log_id: FieldRef<"schedule_job_log", 'String'>
    readonly job_id: FieldRef<"schedule_job_log", 'Int'>
    readonly machine: FieldRef<"schedule_job_log", 'String'>
    readonly start_time: FieldRef<"schedule_job_log", 'DateTime'>
    readonly end_time: FieldRef<"schedule_job_log", 'DateTime'>
    readonly result: FieldRef<"schedule_job_log", 'String'>
    readonly error: FieldRef<"schedule_job_log", 'String'>
  }
    

  // Custom InputTypes
  /**
   * schedule_job_log findUnique
   */
  export type schedule_job_logFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job_log
     */
    select?: schedule_job_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job_log
     */
    omit?: schedule_job_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_job_logInclude<ExtArgs> | null
    /**
     * Filter, which schedule_job_log to fetch.
     */
    where: schedule_job_logWhereUniqueInput
  }

  /**
   * schedule_job_log findUniqueOrThrow
   */
  export type schedule_job_logFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job_log
     */
    select?: schedule_job_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job_log
     */
    omit?: schedule_job_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_job_logInclude<ExtArgs> | null
    /**
     * Filter, which schedule_job_log to fetch.
     */
    where: schedule_job_logWhereUniqueInput
  }

  /**
   * schedule_job_log findFirst
   */
  export type schedule_job_logFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job_log
     */
    select?: schedule_job_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job_log
     */
    omit?: schedule_job_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_job_logInclude<ExtArgs> | null
    /**
     * Filter, which schedule_job_log to fetch.
     */
    where?: schedule_job_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of schedule_job_logs to fetch.
     */
    orderBy?: schedule_job_logOrderByWithRelationInput | schedule_job_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for schedule_job_logs.
     */
    cursor?: schedule_job_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` schedule_job_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` schedule_job_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of schedule_job_logs.
     */
    distinct?: Schedule_job_logScalarFieldEnum | Schedule_job_logScalarFieldEnum[]
  }

  /**
   * schedule_job_log findFirstOrThrow
   */
  export type schedule_job_logFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job_log
     */
    select?: schedule_job_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job_log
     */
    omit?: schedule_job_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_job_logInclude<ExtArgs> | null
    /**
     * Filter, which schedule_job_log to fetch.
     */
    where?: schedule_job_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of schedule_job_logs to fetch.
     */
    orderBy?: schedule_job_logOrderByWithRelationInput | schedule_job_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for schedule_job_logs.
     */
    cursor?: schedule_job_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` schedule_job_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` schedule_job_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of schedule_job_logs.
     */
    distinct?: Schedule_job_logScalarFieldEnum | Schedule_job_logScalarFieldEnum[]
  }

  /**
   * schedule_job_log findMany
   */
  export type schedule_job_logFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job_log
     */
    select?: schedule_job_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job_log
     */
    omit?: schedule_job_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_job_logInclude<ExtArgs> | null
    /**
     * Filter, which schedule_job_logs to fetch.
     */
    where?: schedule_job_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of schedule_job_logs to fetch.
     */
    orderBy?: schedule_job_logOrderByWithRelationInput | schedule_job_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing schedule_job_logs.
     */
    cursor?: schedule_job_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` schedule_job_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` schedule_job_logs.
     */
    skip?: number
    distinct?: Schedule_job_logScalarFieldEnum | Schedule_job_logScalarFieldEnum[]
  }

  /**
   * schedule_job_log create
   */
  export type schedule_job_logCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job_log
     */
    select?: schedule_job_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job_log
     */
    omit?: schedule_job_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_job_logInclude<ExtArgs> | null
    /**
     * The data needed to create a schedule_job_log.
     */
    data: XOR<schedule_job_logCreateInput, schedule_job_logUncheckedCreateInput>
  }

  /**
   * schedule_job_log createMany
   */
  export type schedule_job_logCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many schedule_job_logs.
     */
    data: schedule_job_logCreateManyInput | schedule_job_logCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * schedule_job_log update
   */
  export type schedule_job_logUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job_log
     */
    select?: schedule_job_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job_log
     */
    omit?: schedule_job_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_job_logInclude<ExtArgs> | null
    /**
     * The data needed to update a schedule_job_log.
     */
    data: XOR<schedule_job_logUpdateInput, schedule_job_logUncheckedUpdateInput>
    /**
     * Choose, which schedule_job_log to update.
     */
    where: schedule_job_logWhereUniqueInput
  }

  /**
   * schedule_job_log updateMany
   */
  export type schedule_job_logUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update schedule_job_logs.
     */
    data: XOR<schedule_job_logUpdateManyMutationInput, schedule_job_logUncheckedUpdateManyInput>
    /**
     * Filter which schedule_job_logs to update
     */
    where?: schedule_job_logWhereInput
    /**
     * Limit how many schedule_job_logs to update.
     */
    limit?: number
  }

  /**
   * schedule_job_log upsert
   */
  export type schedule_job_logUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job_log
     */
    select?: schedule_job_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job_log
     */
    omit?: schedule_job_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_job_logInclude<ExtArgs> | null
    /**
     * The filter to search for the schedule_job_log to update in case it exists.
     */
    where: schedule_job_logWhereUniqueInput
    /**
     * In case the schedule_job_log found by the `where` argument doesn't exist, create a new schedule_job_log with this data.
     */
    create: XOR<schedule_job_logCreateInput, schedule_job_logUncheckedCreateInput>
    /**
     * In case the schedule_job_log was found with the provided `where` argument, update it with this data.
     */
    update: XOR<schedule_job_logUpdateInput, schedule_job_logUncheckedUpdateInput>
  }

  /**
   * schedule_job_log delete
   */
  export type schedule_job_logDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job_log
     */
    select?: schedule_job_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job_log
     */
    omit?: schedule_job_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_job_logInclude<ExtArgs> | null
    /**
     * Filter which schedule_job_log to delete.
     */
    where: schedule_job_logWhereUniqueInput
  }

  /**
   * schedule_job_log deleteMany
   */
  export type schedule_job_logDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which schedule_job_logs to delete
     */
    where?: schedule_job_logWhereInput
    /**
     * Limit how many schedule_job_logs to delete.
     */
    limit?: number
  }

  /**
   * schedule_job_log.cache_files
   */
  export type schedule_job_log$cache_filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cache_files
     */
    select?: cache_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cache_files
     */
    omit?: cache_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cache_filesInclude<ExtArgs> | null
    where?: cache_filesWhereInput
    orderBy?: cache_filesOrderByWithRelationInput | cache_filesOrderByWithRelationInput[]
    cursor?: cache_filesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Cache_filesScalarFieldEnum | Cache_filesScalarFieldEnum[]
  }

  /**
   * schedule_job_log.output_files
   */
  export type schedule_job_log$output_filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the output_files
     */
    select?: output_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the output_files
     */
    omit?: output_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: output_filesInclude<ExtArgs> | null
    where?: output_filesWhereInput
    orderBy?: output_filesOrderByWithRelationInput | output_filesOrderByWithRelationInput[]
    cursor?: output_filesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Output_filesScalarFieldEnum | Output_filesScalarFieldEnum[]
  }

  /**
   * schedule_job_log.events
   */
  export type schedule_job_log$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_event_log
     */
    select?: job_event_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_event_log
     */
    omit?: job_event_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_event_logInclude<ExtArgs> | null
    where?: job_event_logWhereInput
    orderBy?: job_event_logOrderByWithRelationInput | job_event_logOrderByWithRelationInput[]
    cursor?: job_event_logWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Job_event_logScalarFieldEnum | Job_event_logScalarFieldEnum[]
  }

  /**
   * schedule_job_log without action
   */
  export type schedule_job_logDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the schedule_job_log
     */
    select?: schedule_job_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the schedule_job_log
     */
    omit?: schedule_job_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: schedule_job_logInclude<ExtArgs> | null
  }


  /**
   * Model job_event_log
   */

  export type AggregateJob_event_log = {
    _count: Job_event_logCountAggregateOutputType | null
    _avg: Job_event_logAvgAggregateOutputType | null
    _sum: Job_event_logSumAggregateOutputType | null
    _min: Job_event_logMinAggregateOutputType | null
    _max: Job_event_logMaxAggregateOutputType | null
  }

  export type Job_event_logAvgAggregateOutputType = {
    id: number | null
  }

  export type Job_event_logSumAggregateOutputType = {
    id: number | null
  }

  export type Job_event_logMinAggregateOutputType = {
    id: number | null
    job_log_id: string | null
    event: string | null
    event_message: string | null
    type: string | null
    created_at: Date | null
    handled_on: Date | null
  }

  export type Job_event_logMaxAggregateOutputType = {
    id: number | null
    job_log_id: string | null
    event: string | null
    event_message: string | null
    type: string | null
    created_at: Date | null
    handled_on: Date | null
  }

  export type Job_event_logCountAggregateOutputType = {
    id: number
    job_log_id: number
    event: number
    event_message: number
    type: number
    created_at: number
    handled_on: number
    _all: number
  }


  export type Job_event_logAvgAggregateInputType = {
    id?: true
  }

  export type Job_event_logSumAggregateInputType = {
    id?: true
  }

  export type Job_event_logMinAggregateInputType = {
    id?: true
    job_log_id?: true
    event?: true
    event_message?: true
    type?: true
    created_at?: true
    handled_on?: true
  }

  export type Job_event_logMaxAggregateInputType = {
    id?: true
    job_log_id?: true
    event?: true
    event_message?: true
    type?: true
    created_at?: true
    handled_on?: true
  }

  export type Job_event_logCountAggregateInputType = {
    id?: true
    job_log_id?: true
    event?: true
    event_message?: true
    type?: true
    created_at?: true
    handled_on?: true
    _all?: true
  }

  export type Job_event_logAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which job_event_log to aggregate.
     */
    where?: job_event_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of job_event_logs to fetch.
     */
    orderBy?: job_event_logOrderByWithRelationInput | job_event_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: job_event_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` job_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` job_event_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned job_event_logs
    **/
    _count?: true | Job_event_logCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Job_event_logAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Job_event_logSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Job_event_logMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Job_event_logMaxAggregateInputType
  }

  export type GetJob_event_logAggregateType<T extends Job_event_logAggregateArgs> = {
        [P in keyof T & keyof AggregateJob_event_log]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob_event_log[P]>
      : GetScalarType<T[P], AggregateJob_event_log[P]>
  }




  export type job_event_logGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: job_event_logWhereInput
    orderBy?: job_event_logOrderByWithAggregationInput | job_event_logOrderByWithAggregationInput[]
    by: Job_event_logScalarFieldEnum[] | Job_event_logScalarFieldEnum
    having?: job_event_logScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Job_event_logCountAggregateInputType | true
    _avg?: Job_event_logAvgAggregateInputType
    _sum?: Job_event_logSumAggregateInputType
    _min?: Job_event_logMinAggregateInputType
    _max?: Job_event_logMaxAggregateInputType
  }

  export type Job_event_logGroupByOutputType = {
    id: number
    job_log_id: string
    event: string
    event_message: string
    type: string
    created_at: Date
    handled_on: Date | null
    _count: Job_event_logCountAggregateOutputType | null
    _avg: Job_event_logAvgAggregateOutputType | null
    _sum: Job_event_logSumAggregateOutputType | null
    _min: Job_event_logMinAggregateOutputType | null
    _max: Job_event_logMaxAggregateOutputType | null
  }

  type GetJob_event_logGroupByPayload<T extends job_event_logGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Job_event_logGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Job_event_logGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Job_event_logGroupByOutputType[P]>
            : GetScalarType<T[P], Job_event_logGroupByOutputType[P]>
        }
      >
    >


  export type job_event_logSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job_log_id?: boolean
    event?: boolean
    event_message?: boolean
    type?: boolean
    created_at?: boolean
    handled_on?: boolean
    schedule_job_log?: boolean | schedule_job_logDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job_event_log"]>



  export type job_event_logSelectScalar = {
    id?: boolean
    job_log_id?: boolean
    event?: boolean
    event_message?: boolean
    type?: boolean
    created_at?: boolean
    handled_on?: boolean
  }

  export type job_event_logOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "job_log_id" | "event" | "event_message" | "type" | "created_at" | "handled_on", ExtArgs["result"]["job_event_log"]>
  export type job_event_logInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedule_job_log?: boolean | schedule_job_logDefaultArgs<ExtArgs>
  }

  export type $job_event_logPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "job_event_log"
    objects: {
      schedule_job_log: Prisma.$schedule_job_logPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      job_log_id: string
      event: string
      event_message: string
      type: string
      created_at: Date
      handled_on: Date | null
    }, ExtArgs["result"]["job_event_log"]>
    composites: {}
  }

  type job_event_logGetPayload<S extends boolean | null | undefined | job_event_logDefaultArgs> = $Result.GetResult<Prisma.$job_event_logPayload, S>

  type job_event_logCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<job_event_logFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Job_event_logCountAggregateInputType | true
    }

  export interface job_event_logDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['job_event_log'], meta: { name: 'job_event_log' } }
    /**
     * Find zero or one Job_event_log that matches the filter.
     * @param {job_event_logFindUniqueArgs} args - Arguments to find a Job_event_log
     * @example
     * // Get one Job_event_log
     * const job_event_log = await prisma.job_event_log.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends job_event_logFindUniqueArgs>(args: SelectSubset<T, job_event_logFindUniqueArgs<ExtArgs>>): Prisma__job_event_logClient<$Result.GetResult<Prisma.$job_event_logPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Job_event_log that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {job_event_logFindUniqueOrThrowArgs} args - Arguments to find a Job_event_log
     * @example
     * // Get one Job_event_log
     * const job_event_log = await prisma.job_event_log.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends job_event_logFindUniqueOrThrowArgs>(args: SelectSubset<T, job_event_logFindUniqueOrThrowArgs<ExtArgs>>): Prisma__job_event_logClient<$Result.GetResult<Prisma.$job_event_logPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job_event_log that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {job_event_logFindFirstArgs} args - Arguments to find a Job_event_log
     * @example
     * // Get one Job_event_log
     * const job_event_log = await prisma.job_event_log.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends job_event_logFindFirstArgs>(args?: SelectSubset<T, job_event_logFindFirstArgs<ExtArgs>>): Prisma__job_event_logClient<$Result.GetResult<Prisma.$job_event_logPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job_event_log that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {job_event_logFindFirstOrThrowArgs} args - Arguments to find a Job_event_log
     * @example
     * // Get one Job_event_log
     * const job_event_log = await prisma.job_event_log.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends job_event_logFindFirstOrThrowArgs>(args?: SelectSubset<T, job_event_logFindFirstOrThrowArgs<ExtArgs>>): Prisma__job_event_logClient<$Result.GetResult<Prisma.$job_event_logPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Job_event_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {job_event_logFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Job_event_logs
     * const job_event_logs = await prisma.job_event_log.findMany()
     * 
     * // Get first 10 Job_event_logs
     * const job_event_logs = await prisma.job_event_log.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const job_event_logWithIdOnly = await prisma.job_event_log.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends job_event_logFindManyArgs>(args?: SelectSubset<T, job_event_logFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$job_event_logPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Job_event_log.
     * @param {job_event_logCreateArgs} args - Arguments to create a Job_event_log.
     * @example
     * // Create one Job_event_log
     * const Job_event_log = await prisma.job_event_log.create({
     *   data: {
     *     // ... data to create a Job_event_log
     *   }
     * })
     * 
     */
    create<T extends job_event_logCreateArgs>(args: SelectSubset<T, job_event_logCreateArgs<ExtArgs>>): Prisma__job_event_logClient<$Result.GetResult<Prisma.$job_event_logPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Job_event_logs.
     * @param {job_event_logCreateManyArgs} args - Arguments to create many Job_event_logs.
     * @example
     * // Create many Job_event_logs
     * const job_event_log = await prisma.job_event_log.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends job_event_logCreateManyArgs>(args?: SelectSubset<T, job_event_logCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Job_event_log.
     * @param {job_event_logDeleteArgs} args - Arguments to delete one Job_event_log.
     * @example
     * // Delete one Job_event_log
     * const Job_event_log = await prisma.job_event_log.delete({
     *   where: {
     *     // ... filter to delete one Job_event_log
     *   }
     * })
     * 
     */
    delete<T extends job_event_logDeleteArgs>(args: SelectSubset<T, job_event_logDeleteArgs<ExtArgs>>): Prisma__job_event_logClient<$Result.GetResult<Prisma.$job_event_logPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Job_event_log.
     * @param {job_event_logUpdateArgs} args - Arguments to update one Job_event_log.
     * @example
     * // Update one Job_event_log
     * const job_event_log = await prisma.job_event_log.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends job_event_logUpdateArgs>(args: SelectSubset<T, job_event_logUpdateArgs<ExtArgs>>): Prisma__job_event_logClient<$Result.GetResult<Prisma.$job_event_logPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Job_event_logs.
     * @param {job_event_logDeleteManyArgs} args - Arguments to filter Job_event_logs to delete.
     * @example
     * // Delete a few Job_event_logs
     * const { count } = await prisma.job_event_log.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends job_event_logDeleteManyArgs>(args?: SelectSubset<T, job_event_logDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Job_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {job_event_logUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Job_event_logs
     * const job_event_log = await prisma.job_event_log.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends job_event_logUpdateManyArgs>(args: SelectSubset<T, job_event_logUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Job_event_log.
     * @param {job_event_logUpsertArgs} args - Arguments to update or create a Job_event_log.
     * @example
     * // Update or create a Job_event_log
     * const job_event_log = await prisma.job_event_log.upsert({
     *   create: {
     *     // ... data to create a Job_event_log
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job_event_log we want to update
     *   }
     * })
     */
    upsert<T extends job_event_logUpsertArgs>(args: SelectSubset<T, job_event_logUpsertArgs<ExtArgs>>): Prisma__job_event_logClient<$Result.GetResult<Prisma.$job_event_logPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Job_event_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {job_event_logCountArgs} args - Arguments to filter Job_event_logs to count.
     * @example
     * // Count the number of Job_event_logs
     * const count = await prisma.job_event_log.count({
     *   where: {
     *     // ... the filter for the Job_event_logs we want to count
     *   }
     * })
    **/
    count<T extends job_event_logCountArgs>(
      args?: Subset<T, job_event_logCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Job_event_logCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job_event_log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Job_event_logAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Job_event_logAggregateArgs>(args: Subset<T, Job_event_logAggregateArgs>): Prisma.PrismaPromise<GetJob_event_logAggregateType<T>>

    /**
     * Group by Job_event_log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {job_event_logGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends job_event_logGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: job_event_logGroupByArgs['orderBy'] }
        : { orderBy?: job_event_logGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, job_event_logGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJob_event_logGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the job_event_log model
   */
  readonly fields: job_event_logFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for job_event_log.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__job_event_logClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schedule_job_log<T extends schedule_job_logDefaultArgs<ExtArgs> = {}>(args?: Subset<T, schedule_job_logDefaultArgs<ExtArgs>>): Prisma__schedule_job_logClient<$Result.GetResult<Prisma.$schedule_job_logPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the job_event_log model
   */ 
  interface job_event_logFieldRefs {
    readonly id: FieldRef<"job_event_log", 'Int'>
    readonly job_log_id: FieldRef<"job_event_log", 'String'>
    readonly event: FieldRef<"job_event_log", 'String'>
    readonly event_message: FieldRef<"job_event_log", 'String'>
    readonly type: FieldRef<"job_event_log", 'String'>
    readonly created_at: FieldRef<"job_event_log", 'DateTime'>
    readonly handled_on: FieldRef<"job_event_log", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * job_event_log findUnique
   */
  export type job_event_logFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_event_log
     */
    select?: job_event_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_event_log
     */
    omit?: job_event_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_event_logInclude<ExtArgs> | null
    /**
     * Filter, which job_event_log to fetch.
     */
    where: job_event_logWhereUniqueInput
  }

  /**
   * job_event_log findUniqueOrThrow
   */
  export type job_event_logFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_event_log
     */
    select?: job_event_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_event_log
     */
    omit?: job_event_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_event_logInclude<ExtArgs> | null
    /**
     * Filter, which job_event_log to fetch.
     */
    where: job_event_logWhereUniqueInput
  }

  /**
   * job_event_log findFirst
   */
  export type job_event_logFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_event_log
     */
    select?: job_event_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_event_log
     */
    omit?: job_event_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_event_logInclude<ExtArgs> | null
    /**
     * Filter, which job_event_log to fetch.
     */
    where?: job_event_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of job_event_logs to fetch.
     */
    orderBy?: job_event_logOrderByWithRelationInput | job_event_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for job_event_logs.
     */
    cursor?: job_event_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` job_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` job_event_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of job_event_logs.
     */
    distinct?: Job_event_logScalarFieldEnum | Job_event_logScalarFieldEnum[]
  }

  /**
   * job_event_log findFirstOrThrow
   */
  export type job_event_logFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_event_log
     */
    select?: job_event_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_event_log
     */
    omit?: job_event_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_event_logInclude<ExtArgs> | null
    /**
     * Filter, which job_event_log to fetch.
     */
    where?: job_event_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of job_event_logs to fetch.
     */
    orderBy?: job_event_logOrderByWithRelationInput | job_event_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for job_event_logs.
     */
    cursor?: job_event_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` job_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` job_event_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of job_event_logs.
     */
    distinct?: Job_event_logScalarFieldEnum | Job_event_logScalarFieldEnum[]
  }

  /**
   * job_event_log findMany
   */
  export type job_event_logFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_event_log
     */
    select?: job_event_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_event_log
     */
    omit?: job_event_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_event_logInclude<ExtArgs> | null
    /**
     * Filter, which job_event_logs to fetch.
     */
    where?: job_event_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of job_event_logs to fetch.
     */
    orderBy?: job_event_logOrderByWithRelationInput | job_event_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing job_event_logs.
     */
    cursor?: job_event_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` job_event_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` job_event_logs.
     */
    skip?: number
    distinct?: Job_event_logScalarFieldEnum | Job_event_logScalarFieldEnum[]
  }

  /**
   * job_event_log create
   */
  export type job_event_logCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_event_log
     */
    select?: job_event_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_event_log
     */
    omit?: job_event_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_event_logInclude<ExtArgs> | null
    /**
     * The data needed to create a job_event_log.
     */
    data: XOR<job_event_logCreateInput, job_event_logUncheckedCreateInput>
  }

  /**
   * job_event_log createMany
   */
  export type job_event_logCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many job_event_logs.
     */
    data: job_event_logCreateManyInput | job_event_logCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * job_event_log update
   */
  export type job_event_logUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_event_log
     */
    select?: job_event_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_event_log
     */
    omit?: job_event_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_event_logInclude<ExtArgs> | null
    /**
     * The data needed to update a job_event_log.
     */
    data: XOR<job_event_logUpdateInput, job_event_logUncheckedUpdateInput>
    /**
     * Choose, which job_event_log to update.
     */
    where: job_event_logWhereUniqueInput
  }

  /**
   * job_event_log updateMany
   */
  export type job_event_logUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update job_event_logs.
     */
    data: XOR<job_event_logUpdateManyMutationInput, job_event_logUncheckedUpdateManyInput>
    /**
     * Filter which job_event_logs to update
     */
    where?: job_event_logWhereInput
    /**
     * Limit how many job_event_logs to update.
     */
    limit?: number
  }

  /**
   * job_event_log upsert
   */
  export type job_event_logUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_event_log
     */
    select?: job_event_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_event_log
     */
    omit?: job_event_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_event_logInclude<ExtArgs> | null
    /**
     * The filter to search for the job_event_log to update in case it exists.
     */
    where: job_event_logWhereUniqueInput
    /**
     * In case the job_event_log found by the `where` argument doesn't exist, create a new job_event_log with this data.
     */
    create: XOR<job_event_logCreateInput, job_event_logUncheckedCreateInput>
    /**
     * In case the job_event_log was found with the provided `where` argument, update it with this data.
     */
    update: XOR<job_event_logUpdateInput, job_event_logUncheckedUpdateInput>
  }

  /**
   * job_event_log delete
   */
  export type job_event_logDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_event_log
     */
    select?: job_event_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_event_log
     */
    omit?: job_event_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_event_logInclude<ExtArgs> | null
    /**
     * Filter which job_event_log to delete.
     */
    where: job_event_logWhereUniqueInput
  }

  /**
   * job_event_log deleteMany
   */
  export type job_event_logDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which job_event_logs to delete
     */
    where?: job_event_logWhereInput
    /**
     * Limit how many job_event_logs to delete.
     */
    limit?: number
  }

  /**
   * job_event_log without action
   */
  export type job_event_logDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_event_log
     */
    select?: job_event_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_event_log
     */
    omit?: job_event_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_event_logInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Cache_filesScalarFieldEnum: {
    id: 'id',
    job_log_id: 'job_log_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    file_name: 'file_name',
    file_tags: 'file_tags',
    file_path: 'file_path',
    file_size: 'file_size',
    time_to_live: 'time_to_live',
    file_type: 'file_type',
    last_downloaded: 'last_downloaded'
  };

  export type Cache_filesScalarFieldEnum = (typeof Cache_filesScalarFieldEnum)[keyof typeof Cache_filesScalarFieldEnum]


  export const Output_filesScalarFieldEnum: {
    id: 'id',
    job_log_id: 'job_log_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    file_name: 'file_name',
    file_tags: 'file_tags',
    file_path: 'file_path',
    file_size: 'file_size',
    file_type: 'file_type',
    last_downloaded: 'last_downloaded'
  };

  export type Output_filesScalarFieldEnum = (typeof Output_filesScalarFieldEnum)[keyof typeof Output_filesScalarFieldEnum]


  export const ProxyScalarFieldEnum: {
    id: 'id',
    proxy_ip: 'proxy_ip',
    proxy_port: 'proxy_port',
    protocol: 'protocol',
    username: 'username',
    password: 'password',
    description: 'description',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ProxyScalarFieldEnum = (typeof ProxyScalarFieldEnum)[keyof typeof ProxyScalarFieldEnum]


  export const Proxy_jobScalarFieldEnum: {
    id: 'id',
    job_id: 'job_id',
    proxy_id: 'proxy_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Proxy_jobScalarFieldEnum = (typeof Proxy_jobScalarFieldEnum)[keyof typeof Proxy_jobScalarFieldEnum]


  export const Schedule_jobScalarFieldEnum: {
    job_id: 'job_id',
    job_name: 'job_name',
    job_param: 'job_param',
    job_cron_setting: 'job_cron_setting',
    consumer: 'consumer',
    exclusive: 'exclusive',
    status: 'status',
    average_time: 'average_time',
    created_at: 'created_at'
  };

  export type Schedule_jobScalarFieldEnum = (typeof Schedule_jobScalarFieldEnum)[keyof typeof Schedule_jobScalarFieldEnum]


  export const Schedule_job_logScalarFieldEnum: {
    job_log_id: 'job_log_id',
    job_id: 'job_id',
    machine: 'machine',
    start_time: 'start_time',
    end_time: 'end_time',
    result: 'result',
    error: 'error'
  };

  export type Schedule_job_logScalarFieldEnum = (typeof Schedule_job_logScalarFieldEnum)[keyof typeof Schedule_job_logScalarFieldEnum]


  export const Job_event_logScalarFieldEnum: {
    id: 'id',
    job_log_id: 'job_log_id',
    event: 'event',
    event_message: 'event_message',
    type: 'type',
    created_at: 'created_at',
    handled_on: 'handled_on'
  };

  export type Job_event_logScalarFieldEnum = (typeof Job_event_logScalarFieldEnum)[keyof typeof Job_event_logScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const cache_filesOrderByRelevanceFieldEnum: {
    job_log_id: 'job_log_id',
    file_name: 'file_name',
    file_tags: 'file_tags',
    file_path: 'file_path',
    file_type: 'file_type'
  };

  export type cache_filesOrderByRelevanceFieldEnum = (typeof cache_filesOrderByRelevanceFieldEnum)[keyof typeof cache_filesOrderByRelevanceFieldEnum]


  export const output_filesOrderByRelevanceFieldEnum: {
    job_log_id: 'job_log_id',
    file_name: 'file_name',
    file_tags: 'file_tags',
    file_path: 'file_path',
    file_type: 'file_type'
  };

  export type output_filesOrderByRelevanceFieldEnum = (typeof output_filesOrderByRelevanceFieldEnum)[keyof typeof output_filesOrderByRelevanceFieldEnum]


  export const proxyOrderByRelevanceFieldEnum: {
    proxy_ip: 'proxy_ip',
    protocol: 'protocol',
    username: 'username',
    password: 'password',
    description: 'description'
  };

  export type proxyOrderByRelevanceFieldEnum = (typeof proxyOrderByRelevanceFieldEnum)[keyof typeof proxyOrderByRelevanceFieldEnum]


  export const schedule_jobOrderByRelevanceFieldEnum: {
    job_name: 'job_name',
    job_param: 'job_param',
    job_cron_setting: 'job_cron_setting',
    consumer: 'consumer',
    exclusive: 'exclusive',
    status: 'status'
  };

  export type schedule_jobOrderByRelevanceFieldEnum = (typeof schedule_jobOrderByRelevanceFieldEnum)[keyof typeof schedule_jobOrderByRelevanceFieldEnum]


  export const schedule_job_logOrderByRelevanceFieldEnum: {
    job_log_id: 'job_log_id',
    machine: 'machine',
    result: 'result',
    error: 'error'
  };

  export type schedule_job_logOrderByRelevanceFieldEnum = (typeof schedule_job_logOrderByRelevanceFieldEnum)[keyof typeof schedule_job_logOrderByRelevanceFieldEnum]


  export const job_event_logOrderByRelevanceFieldEnum: {
    job_log_id: 'job_log_id',
    event: 'event',
    event_message: 'event_message',
    type: 'type'
  };

  export type job_event_logOrderByRelevanceFieldEnum = (typeof job_event_logOrderByRelevanceFieldEnum)[keyof typeof job_event_logOrderByRelevanceFieldEnum]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'proxy_status'
   */
  export type Enumproxy_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'proxy_status'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type cache_filesWhereInput = {
    AND?: cache_filesWhereInput | cache_filesWhereInput[]
    OR?: cache_filesWhereInput[]
    NOT?: cache_filesWhereInput | cache_filesWhereInput[]
    id?: IntFilter<"cache_files"> | number
    job_log_id?: StringFilter<"cache_files"> | string
    created_at?: DateTimeFilter<"cache_files"> | Date | string
    updated_at?: DateTimeFilter<"cache_files"> | Date | string
    file_name?: StringFilter<"cache_files"> | string
    file_tags?: StringNullableFilter<"cache_files"> | string | null
    file_path?: StringFilter<"cache_files"> | string
    file_size?: BigIntFilter<"cache_files"> | bigint | number
    time_to_live?: BigIntFilter<"cache_files"> | bigint | number
    file_type?: StringFilter<"cache_files"> | string
    last_downloaded?: DateTimeNullableFilter<"cache_files"> | Date | string | null
    schedule_job_log?: XOR<Schedule_job_logScalarRelationFilter, schedule_job_logWhereInput>
  }

  export type cache_filesOrderByWithRelationInput = {
    id?: SortOrder
    job_log_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_name?: SortOrder
    file_tags?: SortOrderInput | SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    time_to_live?: SortOrder
    file_type?: SortOrder
    last_downloaded?: SortOrderInput | SortOrder
    schedule_job_log?: schedule_job_logOrderByWithRelationInput
    _relevance?: cache_filesOrderByRelevanceInput
  }

  export type cache_filesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: cache_filesWhereInput | cache_filesWhereInput[]
    OR?: cache_filesWhereInput[]
    NOT?: cache_filesWhereInput | cache_filesWhereInput[]
    job_log_id?: StringFilter<"cache_files"> | string
    created_at?: DateTimeFilter<"cache_files"> | Date | string
    updated_at?: DateTimeFilter<"cache_files"> | Date | string
    file_name?: StringFilter<"cache_files"> | string
    file_tags?: StringNullableFilter<"cache_files"> | string | null
    file_path?: StringFilter<"cache_files"> | string
    file_size?: BigIntFilter<"cache_files"> | bigint | number
    time_to_live?: BigIntFilter<"cache_files"> | bigint | number
    file_type?: StringFilter<"cache_files"> | string
    last_downloaded?: DateTimeNullableFilter<"cache_files"> | Date | string | null
    schedule_job_log?: XOR<Schedule_job_logScalarRelationFilter, schedule_job_logWhereInput>
  }, "id" | "id">

  export type cache_filesOrderByWithAggregationInput = {
    id?: SortOrder
    job_log_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_name?: SortOrder
    file_tags?: SortOrderInput | SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    time_to_live?: SortOrder
    file_type?: SortOrder
    last_downloaded?: SortOrderInput | SortOrder
    _count?: cache_filesCountOrderByAggregateInput
    _avg?: cache_filesAvgOrderByAggregateInput
    _max?: cache_filesMaxOrderByAggregateInput
    _min?: cache_filesMinOrderByAggregateInput
    _sum?: cache_filesSumOrderByAggregateInput
  }

  export type cache_filesScalarWhereWithAggregatesInput = {
    AND?: cache_filesScalarWhereWithAggregatesInput | cache_filesScalarWhereWithAggregatesInput[]
    OR?: cache_filesScalarWhereWithAggregatesInput[]
    NOT?: cache_filesScalarWhereWithAggregatesInput | cache_filesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"cache_files"> | number
    job_log_id?: StringWithAggregatesFilter<"cache_files"> | string
    created_at?: DateTimeWithAggregatesFilter<"cache_files"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"cache_files"> | Date | string
    file_name?: StringWithAggregatesFilter<"cache_files"> | string
    file_tags?: StringNullableWithAggregatesFilter<"cache_files"> | string | null
    file_path?: StringWithAggregatesFilter<"cache_files"> | string
    file_size?: BigIntWithAggregatesFilter<"cache_files"> | bigint | number
    time_to_live?: BigIntWithAggregatesFilter<"cache_files"> | bigint | number
    file_type?: StringWithAggregatesFilter<"cache_files"> | string
    last_downloaded?: DateTimeNullableWithAggregatesFilter<"cache_files"> | Date | string | null
  }

  export type output_filesWhereInput = {
    AND?: output_filesWhereInput | output_filesWhereInput[]
    OR?: output_filesWhereInput[]
    NOT?: output_filesWhereInput | output_filesWhereInput[]
    id?: IntFilter<"output_files"> | number
    job_log_id?: StringFilter<"output_files"> | string
    created_at?: DateTimeFilter<"output_files"> | Date | string
    updated_at?: DateTimeFilter<"output_files"> | Date | string
    file_name?: StringFilter<"output_files"> | string
    file_tags?: StringNullableFilter<"output_files"> | string | null
    file_path?: StringFilter<"output_files"> | string
    file_size?: BigIntFilter<"output_files"> | bigint | number
    file_type?: StringFilter<"output_files"> | string
    last_downloaded?: DateTimeNullableFilter<"output_files"> | Date | string | null
    schedule_job_log?: XOR<Schedule_job_logScalarRelationFilter, schedule_job_logWhereInput>
  }

  export type output_filesOrderByWithRelationInput = {
    id?: SortOrder
    job_log_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_name?: SortOrder
    file_tags?: SortOrderInput | SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    file_type?: SortOrder
    last_downloaded?: SortOrderInput | SortOrder
    schedule_job_log?: schedule_job_logOrderByWithRelationInput
    _relevance?: output_filesOrderByRelevanceInput
  }

  export type output_filesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: output_filesWhereInput | output_filesWhereInput[]
    OR?: output_filesWhereInput[]
    NOT?: output_filesWhereInput | output_filesWhereInput[]
    job_log_id?: StringFilter<"output_files"> | string
    created_at?: DateTimeFilter<"output_files"> | Date | string
    updated_at?: DateTimeFilter<"output_files"> | Date | string
    file_name?: StringFilter<"output_files"> | string
    file_tags?: StringNullableFilter<"output_files"> | string | null
    file_path?: StringFilter<"output_files"> | string
    file_size?: BigIntFilter<"output_files"> | bigint | number
    file_type?: StringFilter<"output_files"> | string
    last_downloaded?: DateTimeNullableFilter<"output_files"> | Date | string | null
    schedule_job_log?: XOR<Schedule_job_logScalarRelationFilter, schedule_job_logWhereInput>
  }, "id" | "id">

  export type output_filesOrderByWithAggregationInput = {
    id?: SortOrder
    job_log_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_name?: SortOrder
    file_tags?: SortOrderInput | SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    file_type?: SortOrder
    last_downloaded?: SortOrderInput | SortOrder
    _count?: output_filesCountOrderByAggregateInput
    _avg?: output_filesAvgOrderByAggregateInput
    _max?: output_filesMaxOrderByAggregateInput
    _min?: output_filesMinOrderByAggregateInput
    _sum?: output_filesSumOrderByAggregateInput
  }

  export type output_filesScalarWhereWithAggregatesInput = {
    AND?: output_filesScalarWhereWithAggregatesInput | output_filesScalarWhereWithAggregatesInput[]
    OR?: output_filesScalarWhereWithAggregatesInput[]
    NOT?: output_filesScalarWhereWithAggregatesInput | output_filesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"output_files"> | number
    job_log_id?: StringWithAggregatesFilter<"output_files"> | string
    created_at?: DateTimeWithAggregatesFilter<"output_files"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"output_files"> | Date | string
    file_name?: StringWithAggregatesFilter<"output_files"> | string
    file_tags?: StringNullableWithAggregatesFilter<"output_files"> | string | null
    file_path?: StringWithAggregatesFilter<"output_files"> | string
    file_size?: BigIntWithAggregatesFilter<"output_files"> | bigint | number
    file_type?: StringWithAggregatesFilter<"output_files"> | string
    last_downloaded?: DateTimeNullableWithAggregatesFilter<"output_files"> | Date | string | null
  }

  export type proxyWhereInput = {
    AND?: proxyWhereInput | proxyWhereInput[]
    OR?: proxyWhereInput[]
    NOT?: proxyWhereInput | proxyWhereInput[]
    id?: IntFilter<"proxy"> | number
    proxy_ip?: StringFilter<"proxy"> | string
    proxy_port?: IntFilter<"proxy"> | number
    protocol?: StringFilter<"proxy"> | string
    username?: StringNullableFilter<"proxy"> | string | null
    password?: StringNullableFilter<"proxy"> | string | null
    description?: StringNullableFilter<"proxy"> | string | null
    status?: Enumproxy_statusFilter<"proxy"> | $Enums.proxy_status
    created_at?: DateTimeFilter<"proxy"> | Date | string
    updated_at?: DateTimeFilter<"proxy"> | Date | string
    jobs?: Proxy_jobListRelationFilter
  }

  export type proxyOrderByWithRelationInput = {
    id?: SortOrder
    proxy_ip?: SortOrder
    proxy_port?: SortOrder
    protocol?: SortOrder
    username?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    jobs?: proxy_jobOrderByRelationAggregateInput
    _relevance?: proxyOrderByRelevanceInput
  }

  export type proxyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: proxyWhereInput | proxyWhereInput[]
    OR?: proxyWhereInput[]
    NOT?: proxyWhereInput | proxyWhereInput[]
    proxy_ip?: StringFilter<"proxy"> | string
    proxy_port?: IntFilter<"proxy"> | number
    protocol?: StringFilter<"proxy"> | string
    username?: StringNullableFilter<"proxy"> | string | null
    password?: StringNullableFilter<"proxy"> | string | null
    description?: StringNullableFilter<"proxy"> | string | null
    status?: Enumproxy_statusFilter<"proxy"> | $Enums.proxy_status
    created_at?: DateTimeFilter<"proxy"> | Date | string
    updated_at?: DateTimeFilter<"proxy"> | Date | string
    jobs?: Proxy_jobListRelationFilter
  }, "id">

  export type proxyOrderByWithAggregationInput = {
    id?: SortOrder
    proxy_ip?: SortOrder
    proxy_port?: SortOrder
    protocol?: SortOrder
    username?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: proxyCountOrderByAggregateInput
    _avg?: proxyAvgOrderByAggregateInput
    _max?: proxyMaxOrderByAggregateInput
    _min?: proxyMinOrderByAggregateInput
    _sum?: proxySumOrderByAggregateInput
  }

  export type proxyScalarWhereWithAggregatesInput = {
    AND?: proxyScalarWhereWithAggregatesInput | proxyScalarWhereWithAggregatesInput[]
    OR?: proxyScalarWhereWithAggregatesInput[]
    NOT?: proxyScalarWhereWithAggregatesInput | proxyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"proxy"> | number
    proxy_ip?: StringWithAggregatesFilter<"proxy"> | string
    proxy_port?: IntWithAggregatesFilter<"proxy"> | number
    protocol?: StringWithAggregatesFilter<"proxy"> | string
    username?: StringNullableWithAggregatesFilter<"proxy"> | string | null
    password?: StringNullableWithAggregatesFilter<"proxy"> | string | null
    description?: StringNullableWithAggregatesFilter<"proxy"> | string | null
    status?: Enumproxy_statusWithAggregatesFilter<"proxy"> | $Enums.proxy_status
    created_at?: DateTimeWithAggregatesFilter<"proxy"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"proxy"> | Date | string
  }

  export type proxy_jobWhereInput = {
    AND?: proxy_jobWhereInput | proxy_jobWhereInput[]
    OR?: proxy_jobWhereInput[]
    NOT?: proxy_jobWhereInput | proxy_jobWhereInput[]
    id?: IntFilter<"proxy_job"> | number
    job_id?: IntFilter<"proxy_job"> | number
    proxy_id?: IntFilter<"proxy_job"> | number
    created_at?: DateTimeFilter<"proxy_job"> | Date | string
    updated_at?: DateTimeFilter<"proxy_job"> | Date | string
    schedule_job?: XOR<Schedule_jobScalarRelationFilter, schedule_jobWhereInput>
    proxy?: XOR<ProxyScalarRelationFilter, proxyWhereInput>
  }

  export type proxy_jobOrderByWithRelationInput = {
    id?: SortOrder
    job_id?: SortOrder
    proxy_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    schedule_job?: schedule_jobOrderByWithRelationInput
    proxy?: proxyOrderByWithRelationInput
  }

  export type proxy_jobWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: proxy_jobWhereInput | proxy_jobWhereInput[]
    OR?: proxy_jobWhereInput[]
    NOT?: proxy_jobWhereInput | proxy_jobWhereInput[]
    job_id?: IntFilter<"proxy_job"> | number
    proxy_id?: IntFilter<"proxy_job"> | number
    created_at?: DateTimeFilter<"proxy_job"> | Date | string
    updated_at?: DateTimeFilter<"proxy_job"> | Date | string
    schedule_job?: XOR<Schedule_jobScalarRelationFilter, schedule_jobWhereInput>
    proxy?: XOR<ProxyScalarRelationFilter, proxyWhereInput>
  }, "id">

  export type proxy_jobOrderByWithAggregationInput = {
    id?: SortOrder
    job_id?: SortOrder
    proxy_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: proxy_jobCountOrderByAggregateInput
    _avg?: proxy_jobAvgOrderByAggregateInput
    _max?: proxy_jobMaxOrderByAggregateInput
    _min?: proxy_jobMinOrderByAggregateInput
    _sum?: proxy_jobSumOrderByAggregateInput
  }

  export type proxy_jobScalarWhereWithAggregatesInput = {
    AND?: proxy_jobScalarWhereWithAggregatesInput | proxy_jobScalarWhereWithAggregatesInput[]
    OR?: proxy_jobScalarWhereWithAggregatesInput[]
    NOT?: proxy_jobScalarWhereWithAggregatesInput | proxy_jobScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"proxy_job"> | number
    job_id?: IntWithAggregatesFilter<"proxy_job"> | number
    proxy_id?: IntWithAggregatesFilter<"proxy_job"> | number
    created_at?: DateTimeWithAggregatesFilter<"proxy_job"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"proxy_job"> | Date | string
  }

  export type schedule_jobWhereInput = {
    AND?: schedule_jobWhereInput | schedule_jobWhereInput[]
    OR?: schedule_jobWhereInput[]
    NOT?: schedule_jobWhereInput | schedule_jobWhereInput[]
    job_id?: IntFilter<"schedule_job"> | number
    job_name?: StringFilter<"schedule_job"> | string
    job_param?: StringNullableFilter<"schedule_job"> | string | null
    job_cron_setting?: StringFilter<"schedule_job"> | string
    consumer?: StringFilter<"schedule_job"> | string
    exclusive?: StringFilter<"schedule_job"> | string
    status?: StringFilter<"schedule_job"> | string
    average_time?: FloatNullableFilter<"schedule_job"> | number | null
    created_at?: DateTimeNullableFilter<"schedule_job"> | Date | string | null
    job_logs?: Schedule_job_logListRelationFilter
    proxies?: Proxy_jobListRelationFilter
  }

  export type schedule_jobOrderByWithRelationInput = {
    job_id?: SortOrder
    job_name?: SortOrder
    job_param?: SortOrderInput | SortOrder
    job_cron_setting?: SortOrder
    consumer?: SortOrder
    exclusive?: SortOrder
    status?: SortOrder
    average_time?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    job_logs?: schedule_job_logOrderByRelationAggregateInput
    proxies?: proxy_jobOrderByRelationAggregateInput
    _relevance?: schedule_jobOrderByRelevanceInput
  }

  export type schedule_jobWhereUniqueInput = Prisma.AtLeast<{
    job_id?: number
    job_name?: string
    AND?: schedule_jobWhereInput | schedule_jobWhereInput[]
    OR?: schedule_jobWhereInput[]
    NOT?: schedule_jobWhereInput | schedule_jobWhereInput[]
    job_param?: StringNullableFilter<"schedule_job"> | string | null
    job_cron_setting?: StringFilter<"schedule_job"> | string
    consumer?: StringFilter<"schedule_job"> | string
    exclusive?: StringFilter<"schedule_job"> | string
    status?: StringFilter<"schedule_job"> | string
    average_time?: FloatNullableFilter<"schedule_job"> | number | null
    created_at?: DateTimeNullableFilter<"schedule_job"> | Date | string | null
    job_logs?: Schedule_job_logListRelationFilter
    proxies?: Proxy_jobListRelationFilter
  }, "job_id" | "job_name">

  export type schedule_jobOrderByWithAggregationInput = {
    job_id?: SortOrder
    job_name?: SortOrder
    job_param?: SortOrderInput | SortOrder
    job_cron_setting?: SortOrder
    consumer?: SortOrder
    exclusive?: SortOrder
    status?: SortOrder
    average_time?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: schedule_jobCountOrderByAggregateInput
    _avg?: schedule_jobAvgOrderByAggregateInput
    _max?: schedule_jobMaxOrderByAggregateInput
    _min?: schedule_jobMinOrderByAggregateInput
    _sum?: schedule_jobSumOrderByAggregateInput
  }

  export type schedule_jobScalarWhereWithAggregatesInput = {
    AND?: schedule_jobScalarWhereWithAggregatesInput | schedule_jobScalarWhereWithAggregatesInput[]
    OR?: schedule_jobScalarWhereWithAggregatesInput[]
    NOT?: schedule_jobScalarWhereWithAggregatesInput | schedule_jobScalarWhereWithAggregatesInput[]
    job_id?: IntWithAggregatesFilter<"schedule_job"> | number
    job_name?: StringWithAggregatesFilter<"schedule_job"> | string
    job_param?: StringNullableWithAggregatesFilter<"schedule_job"> | string | null
    job_cron_setting?: StringWithAggregatesFilter<"schedule_job"> | string
    consumer?: StringWithAggregatesFilter<"schedule_job"> | string
    exclusive?: StringWithAggregatesFilter<"schedule_job"> | string
    status?: StringWithAggregatesFilter<"schedule_job"> | string
    average_time?: FloatNullableWithAggregatesFilter<"schedule_job"> | number | null
    created_at?: DateTimeNullableWithAggregatesFilter<"schedule_job"> | Date | string | null
  }

  export type schedule_job_logWhereInput = {
    AND?: schedule_job_logWhereInput | schedule_job_logWhereInput[]
    OR?: schedule_job_logWhereInput[]
    NOT?: schedule_job_logWhereInput | schedule_job_logWhereInput[]
    job_log_id?: StringFilter<"schedule_job_log"> | string
    job_id?: IntFilter<"schedule_job_log"> | number
    machine?: StringNullableFilter<"schedule_job_log"> | string | null
    start_time?: DateTimeFilter<"schedule_job_log"> | Date | string
    end_time?: DateTimeNullableFilter<"schedule_job_log"> | Date | string | null
    result?: StringNullableFilter<"schedule_job_log"> | string | null
    error?: StringNullableFilter<"schedule_job_log"> | string | null
    schedule_job?: XOR<Schedule_jobScalarRelationFilter, schedule_jobWhereInput>
    cache_files?: Cache_filesListRelationFilter
    output_files?: Output_filesListRelationFilter
    events?: Job_event_logListRelationFilter
  }

  export type schedule_job_logOrderByWithRelationInput = {
    job_log_id?: SortOrder
    job_id?: SortOrder
    machine?: SortOrderInput | SortOrder
    start_time?: SortOrder
    end_time?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    schedule_job?: schedule_jobOrderByWithRelationInput
    cache_files?: cache_filesOrderByRelationAggregateInput
    output_files?: output_filesOrderByRelationAggregateInput
    events?: job_event_logOrderByRelationAggregateInput
    _relevance?: schedule_job_logOrderByRelevanceInput
  }

  export type schedule_job_logWhereUniqueInput = Prisma.AtLeast<{
    job_log_id?: string
    AND?: schedule_job_logWhereInput | schedule_job_logWhereInput[]
    OR?: schedule_job_logWhereInput[]
    NOT?: schedule_job_logWhereInput | schedule_job_logWhereInput[]
    job_id?: IntFilter<"schedule_job_log"> | number
    machine?: StringNullableFilter<"schedule_job_log"> | string | null
    start_time?: DateTimeFilter<"schedule_job_log"> | Date | string
    end_time?: DateTimeNullableFilter<"schedule_job_log"> | Date | string | null
    result?: StringNullableFilter<"schedule_job_log"> | string | null
    error?: StringNullableFilter<"schedule_job_log"> | string | null
    schedule_job?: XOR<Schedule_jobScalarRelationFilter, schedule_jobWhereInput>
    cache_files?: Cache_filesListRelationFilter
    output_files?: Output_filesListRelationFilter
    events?: Job_event_logListRelationFilter
  }, "job_log_id">

  export type schedule_job_logOrderByWithAggregationInput = {
    job_log_id?: SortOrder
    job_id?: SortOrder
    machine?: SortOrderInput | SortOrder
    start_time?: SortOrder
    end_time?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    _count?: schedule_job_logCountOrderByAggregateInput
    _avg?: schedule_job_logAvgOrderByAggregateInput
    _max?: schedule_job_logMaxOrderByAggregateInput
    _min?: schedule_job_logMinOrderByAggregateInput
    _sum?: schedule_job_logSumOrderByAggregateInput
  }

  export type schedule_job_logScalarWhereWithAggregatesInput = {
    AND?: schedule_job_logScalarWhereWithAggregatesInput | schedule_job_logScalarWhereWithAggregatesInput[]
    OR?: schedule_job_logScalarWhereWithAggregatesInput[]
    NOT?: schedule_job_logScalarWhereWithAggregatesInput | schedule_job_logScalarWhereWithAggregatesInput[]
    job_log_id?: StringWithAggregatesFilter<"schedule_job_log"> | string
    job_id?: IntWithAggregatesFilter<"schedule_job_log"> | number
    machine?: StringNullableWithAggregatesFilter<"schedule_job_log"> | string | null
    start_time?: DateTimeWithAggregatesFilter<"schedule_job_log"> | Date | string
    end_time?: DateTimeNullableWithAggregatesFilter<"schedule_job_log"> | Date | string | null
    result?: StringNullableWithAggregatesFilter<"schedule_job_log"> | string | null
    error?: StringNullableWithAggregatesFilter<"schedule_job_log"> | string | null
  }

  export type job_event_logWhereInput = {
    AND?: job_event_logWhereInput | job_event_logWhereInput[]
    OR?: job_event_logWhereInput[]
    NOT?: job_event_logWhereInput | job_event_logWhereInput[]
    id?: IntFilter<"job_event_log"> | number
    job_log_id?: StringFilter<"job_event_log"> | string
    event?: StringFilter<"job_event_log"> | string
    event_message?: StringFilter<"job_event_log"> | string
    type?: StringFilter<"job_event_log"> | string
    created_at?: DateTimeFilter<"job_event_log"> | Date | string
    handled_on?: DateTimeNullableFilter<"job_event_log"> | Date | string | null
    schedule_job_log?: XOR<Schedule_job_logScalarRelationFilter, schedule_job_logWhereInput>
  }

  export type job_event_logOrderByWithRelationInput = {
    id?: SortOrder
    job_log_id?: SortOrder
    event?: SortOrder
    event_message?: SortOrder
    type?: SortOrder
    created_at?: SortOrder
    handled_on?: SortOrderInput | SortOrder
    schedule_job_log?: schedule_job_logOrderByWithRelationInput
    _relevance?: job_event_logOrderByRelevanceInput
  }

  export type job_event_logWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: job_event_logWhereInput | job_event_logWhereInput[]
    OR?: job_event_logWhereInput[]
    NOT?: job_event_logWhereInput | job_event_logWhereInput[]
    job_log_id?: StringFilter<"job_event_log"> | string
    event?: StringFilter<"job_event_log"> | string
    event_message?: StringFilter<"job_event_log"> | string
    type?: StringFilter<"job_event_log"> | string
    created_at?: DateTimeFilter<"job_event_log"> | Date | string
    handled_on?: DateTimeNullableFilter<"job_event_log"> | Date | string | null
    schedule_job_log?: XOR<Schedule_job_logScalarRelationFilter, schedule_job_logWhereInput>
  }, "id">

  export type job_event_logOrderByWithAggregationInput = {
    id?: SortOrder
    job_log_id?: SortOrder
    event?: SortOrder
    event_message?: SortOrder
    type?: SortOrder
    created_at?: SortOrder
    handled_on?: SortOrderInput | SortOrder
    _count?: job_event_logCountOrderByAggregateInput
    _avg?: job_event_logAvgOrderByAggregateInput
    _max?: job_event_logMaxOrderByAggregateInput
    _min?: job_event_logMinOrderByAggregateInput
    _sum?: job_event_logSumOrderByAggregateInput
  }

  export type job_event_logScalarWhereWithAggregatesInput = {
    AND?: job_event_logScalarWhereWithAggregatesInput | job_event_logScalarWhereWithAggregatesInput[]
    OR?: job_event_logScalarWhereWithAggregatesInput[]
    NOT?: job_event_logScalarWhereWithAggregatesInput | job_event_logScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"job_event_log"> | number
    job_log_id?: StringWithAggregatesFilter<"job_event_log"> | string
    event?: StringWithAggregatesFilter<"job_event_log"> | string
    event_message?: StringWithAggregatesFilter<"job_event_log"> | string
    type?: StringWithAggregatesFilter<"job_event_log"> | string
    created_at?: DateTimeWithAggregatesFilter<"job_event_log"> | Date | string
    handled_on?: DateTimeNullableWithAggregatesFilter<"job_event_log"> | Date | string | null
  }

  export type cache_filesCreateInput = {
    created_at?: Date | string
    updated_at?: Date | string
    file_name: string
    file_tags?: string | null
    file_path: string
    file_size: bigint | number
    time_to_live: bigint | number
    file_type: string
    last_downloaded?: Date | string | null
    schedule_job_log: schedule_job_logCreateNestedOneWithoutCache_filesInput
  }

  export type cache_filesUncheckedCreateInput = {
    id?: number
    job_log_id: string
    created_at?: Date | string
    updated_at?: Date | string
    file_name: string
    file_tags?: string | null
    file_path: string
    file_size: bigint | number
    time_to_live: bigint | number
    file_type: string
    last_downloaded?: Date | string | null
  }

  export type cache_filesUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_name?: StringFieldUpdateOperationsInput | string
    file_tags?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    time_to_live?: BigIntFieldUpdateOperationsInput | bigint | number
    file_type?: StringFieldUpdateOperationsInput | string
    last_downloaded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    schedule_job_log?: schedule_job_logUpdateOneRequiredWithoutCache_filesNestedInput
  }

  export type cache_filesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_log_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_name?: StringFieldUpdateOperationsInput | string
    file_tags?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    time_to_live?: BigIntFieldUpdateOperationsInput | bigint | number
    file_type?: StringFieldUpdateOperationsInput | string
    last_downloaded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type cache_filesCreateManyInput = {
    id?: number
    job_log_id: string
    created_at?: Date | string
    updated_at?: Date | string
    file_name: string
    file_tags?: string | null
    file_path: string
    file_size: bigint | number
    time_to_live: bigint | number
    file_type: string
    last_downloaded?: Date | string | null
  }

  export type cache_filesUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_name?: StringFieldUpdateOperationsInput | string
    file_tags?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    time_to_live?: BigIntFieldUpdateOperationsInput | bigint | number
    file_type?: StringFieldUpdateOperationsInput | string
    last_downloaded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type cache_filesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_log_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_name?: StringFieldUpdateOperationsInput | string
    file_tags?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    time_to_live?: BigIntFieldUpdateOperationsInput | bigint | number
    file_type?: StringFieldUpdateOperationsInput | string
    last_downloaded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type output_filesCreateInput = {
    created_at?: Date | string
    updated_at?: Date | string
    file_name: string
    file_tags?: string | null
    file_path: string
    file_size: bigint | number
    file_type: string
    last_downloaded?: Date | string | null
    schedule_job_log: schedule_job_logCreateNestedOneWithoutOutput_filesInput
  }

  export type output_filesUncheckedCreateInput = {
    id?: number
    job_log_id: string
    created_at?: Date | string
    updated_at?: Date | string
    file_name: string
    file_tags?: string | null
    file_path: string
    file_size: bigint | number
    file_type: string
    last_downloaded?: Date | string | null
  }

  export type output_filesUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_name?: StringFieldUpdateOperationsInput | string
    file_tags?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    file_type?: StringFieldUpdateOperationsInput | string
    last_downloaded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    schedule_job_log?: schedule_job_logUpdateOneRequiredWithoutOutput_filesNestedInput
  }

  export type output_filesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_log_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_name?: StringFieldUpdateOperationsInput | string
    file_tags?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    file_type?: StringFieldUpdateOperationsInput | string
    last_downloaded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type output_filesCreateManyInput = {
    id?: number
    job_log_id: string
    created_at?: Date | string
    updated_at?: Date | string
    file_name: string
    file_tags?: string | null
    file_path: string
    file_size: bigint | number
    file_type: string
    last_downloaded?: Date | string | null
  }

  export type output_filesUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_name?: StringFieldUpdateOperationsInput | string
    file_tags?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    file_type?: StringFieldUpdateOperationsInput | string
    last_downloaded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type output_filesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_log_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_name?: StringFieldUpdateOperationsInput | string
    file_tags?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    file_type?: StringFieldUpdateOperationsInput | string
    last_downloaded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type proxyCreateInput = {
    proxy_ip: string
    proxy_port: number
    protocol: string
    username?: string | null
    password?: string | null
    description?: string | null
    status?: $Enums.proxy_status
    created_at?: Date | string
    updated_at?: Date | string
    jobs?: proxy_jobCreateNestedManyWithoutProxyInput
  }

  export type proxyUncheckedCreateInput = {
    id?: number
    proxy_ip: string
    proxy_port: number
    protocol: string
    username?: string | null
    password?: string | null
    description?: string | null
    status?: $Enums.proxy_status
    created_at?: Date | string
    updated_at?: Date | string
    jobs?: proxy_jobUncheckedCreateNestedManyWithoutProxyInput
  }

  export type proxyUpdateInput = {
    proxy_ip?: StringFieldUpdateOperationsInput | string
    proxy_port?: IntFieldUpdateOperationsInput | number
    protocol?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumproxy_statusFieldUpdateOperationsInput | $Enums.proxy_status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: proxy_jobUpdateManyWithoutProxyNestedInput
  }

  export type proxyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    proxy_ip?: StringFieldUpdateOperationsInput | string
    proxy_port?: IntFieldUpdateOperationsInput | number
    protocol?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumproxy_statusFieldUpdateOperationsInput | $Enums.proxy_status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: proxy_jobUncheckedUpdateManyWithoutProxyNestedInput
  }

  export type proxyCreateManyInput = {
    id?: number
    proxy_ip: string
    proxy_port: number
    protocol: string
    username?: string | null
    password?: string | null
    description?: string | null
    status?: $Enums.proxy_status
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type proxyUpdateManyMutationInput = {
    proxy_ip?: StringFieldUpdateOperationsInput | string
    proxy_port?: IntFieldUpdateOperationsInput | number
    protocol?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumproxy_statusFieldUpdateOperationsInput | $Enums.proxy_status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type proxyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    proxy_ip?: StringFieldUpdateOperationsInput | string
    proxy_port?: IntFieldUpdateOperationsInput | number
    protocol?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumproxy_statusFieldUpdateOperationsInput | $Enums.proxy_status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type proxy_jobCreateInput = {
    created_at?: Date | string
    updated_at?: Date | string
    schedule_job: schedule_jobCreateNestedOneWithoutProxiesInput
    proxy: proxyCreateNestedOneWithoutJobsInput
  }

  export type proxy_jobUncheckedCreateInput = {
    id?: number
    job_id: number
    proxy_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type proxy_jobUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    schedule_job?: schedule_jobUpdateOneRequiredWithoutProxiesNestedInput
    proxy?: proxyUpdateOneRequiredWithoutJobsNestedInput
  }

  export type proxy_jobUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    proxy_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type proxy_jobCreateManyInput = {
    id?: number
    job_id: number
    proxy_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type proxy_jobUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type proxy_jobUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    proxy_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type schedule_jobCreateInput = {
    job_name?: string
    job_param?: string | null
    job_cron_setting?: string
    consumer?: string
    exclusive?: string
    status?: string
    average_time?: number | null
    created_at?: Date | string | null
    job_logs?: schedule_job_logCreateNestedManyWithoutSchedule_jobInput
    proxies?: proxy_jobCreateNestedManyWithoutSchedule_jobInput
  }

  export type schedule_jobUncheckedCreateInput = {
    job_id?: number
    job_name?: string
    job_param?: string | null
    job_cron_setting?: string
    consumer?: string
    exclusive?: string
    status?: string
    average_time?: number | null
    created_at?: Date | string | null
    job_logs?: schedule_job_logUncheckedCreateNestedManyWithoutSchedule_jobInput
    proxies?: proxy_jobUncheckedCreateNestedManyWithoutSchedule_jobInput
  }

  export type schedule_jobUpdateInput = {
    job_name?: StringFieldUpdateOperationsInput | string
    job_param?: NullableStringFieldUpdateOperationsInput | string | null
    job_cron_setting?: StringFieldUpdateOperationsInput | string
    consumer?: StringFieldUpdateOperationsInput | string
    exclusive?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    average_time?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    job_logs?: schedule_job_logUpdateManyWithoutSchedule_jobNestedInput
    proxies?: proxy_jobUpdateManyWithoutSchedule_jobNestedInput
  }

  export type schedule_jobUncheckedUpdateInput = {
    job_id?: IntFieldUpdateOperationsInput | number
    job_name?: StringFieldUpdateOperationsInput | string
    job_param?: NullableStringFieldUpdateOperationsInput | string | null
    job_cron_setting?: StringFieldUpdateOperationsInput | string
    consumer?: StringFieldUpdateOperationsInput | string
    exclusive?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    average_time?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    job_logs?: schedule_job_logUncheckedUpdateManyWithoutSchedule_jobNestedInput
    proxies?: proxy_jobUncheckedUpdateManyWithoutSchedule_jobNestedInput
  }

  export type schedule_jobCreateManyInput = {
    job_id?: number
    job_name?: string
    job_param?: string | null
    job_cron_setting?: string
    consumer?: string
    exclusive?: string
    status?: string
    average_time?: number | null
    created_at?: Date | string | null
  }

  export type schedule_jobUpdateManyMutationInput = {
    job_name?: StringFieldUpdateOperationsInput | string
    job_param?: NullableStringFieldUpdateOperationsInput | string | null
    job_cron_setting?: StringFieldUpdateOperationsInput | string
    consumer?: StringFieldUpdateOperationsInput | string
    exclusive?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    average_time?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type schedule_jobUncheckedUpdateManyInput = {
    job_id?: IntFieldUpdateOperationsInput | number
    job_name?: StringFieldUpdateOperationsInput | string
    job_param?: NullableStringFieldUpdateOperationsInput | string | null
    job_cron_setting?: StringFieldUpdateOperationsInput | string
    consumer?: StringFieldUpdateOperationsInput | string
    exclusive?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    average_time?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type schedule_job_logCreateInput = {
    job_log_id: string
    machine?: string | null
    start_time: Date | string
    end_time?: Date | string | null
    result?: string | null
    error?: string | null
    schedule_job: schedule_jobCreateNestedOneWithoutJob_logsInput
    cache_files?: cache_filesCreateNestedManyWithoutSchedule_job_logInput
    output_files?: output_filesCreateNestedManyWithoutSchedule_job_logInput
    events?: job_event_logCreateNestedManyWithoutSchedule_job_logInput
  }

  export type schedule_job_logUncheckedCreateInput = {
    job_log_id: string
    job_id: number
    machine?: string | null
    start_time: Date | string
    end_time?: Date | string | null
    result?: string | null
    error?: string | null
    cache_files?: cache_filesUncheckedCreateNestedManyWithoutSchedule_job_logInput
    output_files?: output_filesUncheckedCreateNestedManyWithoutSchedule_job_logInput
    events?: job_event_logUncheckedCreateNestedManyWithoutSchedule_job_logInput
  }

  export type schedule_job_logUpdateInput = {
    job_log_id?: StringFieldUpdateOperationsInput | string
    machine?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    schedule_job?: schedule_jobUpdateOneRequiredWithoutJob_logsNestedInput
    cache_files?: cache_filesUpdateManyWithoutSchedule_job_logNestedInput
    output_files?: output_filesUpdateManyWithoutSchedule_job_logNestedInput
    events?: job_event_logUpdateManyWithoutSchedule_job_logNestedInput
  }

  export type schedule_job_logUncheckedUpdateInput = {
    job_log_id?: StringFieldUpdateOperationsInput | string
    job_id?: IntFieldUpdateOperationsInput | number
    machine?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    cache_files?: cache_filesUncheckedUpdateManyWithoutSchedule_job_logNestedInput
    output_files?: output_filesUncheckedUpdateManyWithoutSchedule_job_logNestedInput
    events?: job_event_logUncheckedUpdateManyWithoutSchedule_job_logNestedInput
  }

  export type schedule_job_logCreateManyInput = {
    job_log_id: string
    job_id: number
    machine?: string | null
    start_time: Date | string
    end_time?: Date | string | null
    result?: string | null
    error?: string | null
  }

  export type schedule_job_logUpdateManyMutationInput = {
    job_log_id?: StringFieldUpdateOperationsInput | string
    machine?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type schedule_job_logUncheckedUpdateManyInput = {
    job_log_id?: StringFieldUpdateOperationsInput | string
    job_id?: IntFieldUpdateOperationsInput | number
    machine?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type job_event_logCreateInput = {
    event: string
    event_message: string
    type: string
    created_at?: Date | string
    handled_on?: Date | string | null
    schedule_job_log: schedule_job_logCreateNestedOneWithoutEventsInput
  }

  export type job_event_logUncheckedCreateInput = {
    id?: number
    job_log_id: string
    event: string
    event_message: string
    type: string
    created_at?: Date | string
    handled_on?: Date | string | null
  }

  export type job_event_logUpdateInput = {
    event?: StringFieldUpdateOperationsInput | string
    event_message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    handled_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    schedule_job_log?: schedule_job_logUpdateOneRequiredWithoutEventsNestedInput
  }

  export type job_event_logUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_log_id?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    event_message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    handled_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type job_event_logCreateManyInput = {
    id?: number
    job_log_id: string
    event: string
    event_message: string
    type: string
    created_at?: Date | string
    handled_on?: Date | string | null
  }

  export type job_event_logUpdateManyMutationInput = {
    event?: StringFieldUpdateOperationsInput | string
    event_message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    handled_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type job_event_logUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_log_id?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    event_message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    handled_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type Schedule_job_logScalarRelationFilter = {
    is?: schedule_job_logWhereInput
    isNot?: schedule_job_logWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type cache_filesOrderByRelevanceInput = {
    fields: cache_filesOrderByRelevanceFieldEnum | cache_filesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type cache_filesCountOrderByAggregateInput = {
    id?: SortOrder
    job_log_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_name?: SortOrder
    file_tags?: SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    time_to_live?: SortOrder
    file_type?: SortOrder
    last_downloaded?: SortOrder
  }

  export type cache_filesAvgOrderByAggregateInput = {
    id?: SortOrder
    file_size?: SortOrder
    time_to_live?: SortOrder
  }

  export type cache_filesMaxOrderByAggregateInput = {
    id?: SortOrder
    job_log_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_name?: SortOrder
    file_tags?: SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    time_to_live?: SortOrder
    file_type?: SortOrder
    last_downloaded?: SortOrder
  }

  export type cache_filesMinOrderByAggregateInput = {
    id?: SortOrder
    job_log_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_name?: SortOrder
    file_tags?: SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    time_to_live?: SortOrder
    file_type?: SortOrder
    last_downloaded?: SortOrder
  }

  export type cache_filesSumOrderByAggregateInput = {
    id?: SortOrder
    file_size?: SortOrder
    time_to_live?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type output_filesOrderByRelevanceInput = {
    fields: output_filesOrderByRelevanceFieldEnum | output_filesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type output_filesCountOrderByAggregateInput = {
    id?: SortOrder
    job_log_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_name?: SortOrder
    file_tags?: SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    file_type?: SortOrder
    last_downloaded?: SortOrder
  }

  export type output_filesAvgOrderByAggregateInput = {
    id?: SortOrder
    file_size?: SortOrder
  }

  export type output_filesMaxOrderByAggregateInput = {
    id?: SortOrder
    job_log_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_name?: SortOrder
    file_tags?: SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    file_type?: SortOrder
    last_downloaded?: SortOrder
  }

  export type output_filesMinOrderByAggregateInput = {
    id?: SortOrder
    job_log_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    file_name?: SortOrder
    file_tags?: SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    file_type?: SortOrder
    last_downloaded?: SortOrder
  }

  export type output_filesSumOrderByAggregateInput = {
    id?: SortOrder
    file_size?: SortOrder
  }

  export type Enumproxy_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.proxy_status | Enumproxy_statusFieldRefInput<$PrismaModel>
    in?: $Enums.proxy_status[]
    notIn?: $Enums.proxy_status[]
    not?: NestedEnumproxy_statusFilter<$PrismaModel> | $Enums.proxy_status
  }

  export type Proxy_jobListRelationFilter = {
    every?: proxy_jobWhereInput
    some?: proxy_jobWhereInput
    none?: proxy_jobWhereInput
  }

  export type proxy_jobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type proxyOrderByRelevanceInput = {
    fields: proxyOrderByRelevanceFieldEnum | proxyOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type proxyCountOrderByAggregateInput = {
    id?: SortOrder
    proxy_ip?: SortOrder
    proxy_port?: SortOrder
    protocol?: SortOrder
    username?: SortOrder
    password?: SortOrder
    description?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type proxyAvgOrderByAggregateInput = {
    id?: SortOrder
    proxy_port?: SortOrder
  }

  export type proxyMaxOrderByAggregateInput = {
    id?: SortOrder
    proxy_ip?: SortOrder
    proxy_port?: SortOrder
    protocol?: SortOrder
    username?: SortOrder
    password?: SortOrder
    description?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type proxyMinOrderByAggregateInput = {
    id?: SortOrder
    proxy_ip?: SortOrder
    proxy_port?: SortOrder
    protocol?: SortOrder
    username?: SortOrder
    password?: SortOrder
    description?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type proxySumOrderByAggregateInput = {
    id?: SortOrder
    proxy_port?: SortOrder
  }

  export type Enumproxy_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.proxy_status | Enumproxy_statusFieldRefInput<$PrismaModel>
    in?: $Enums.proxy_status[]
    notIn?: $Enums.proxy_status[]
    not?: NestedEnumproxy_statusWithAggregatesFilter<$PrismaModel> | $Enums.proxy_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumproxy_statusFilter<$PrismaModel>
    _max?: NestedEnumproxy_statusFilter<$PrismaModel>
  }

  export type Schedule_jobScalarRelationFilter = {
    is?: schedule_jobWhereInput
    isNot?: schedule_jobWhereInput
  }

  export type ProxyScalarRelationFilter = {
    is?: proxyWhereInput
    isNot?: proxyWhereInput
  }

  export type proxy_jobCountOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    proxy_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type proxy_jobAvgOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    proxy_id?: SortOrder
  }

  export type proxy_jobMaxOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    proxy_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type proxy_jobMinOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    proxy_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type proxy_jobSumOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    proxy_id?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type Schedule_job_logListRelationFilter = {
    every?: schedule_job_logWhereInput
    some?: schedule_job_logWhereInput
    none?: schedule_job_logWhereInput
  }

  export type schedule_job_logOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type schedule_jobOrderByRelevanceInput = {
    fields: schedule_jobOrderByRelevanceFieldEnum | schedule_jobOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type schedule_jobCountOrderByAggregateInput = {
    job_id?: SortOrder
    job_name?: SortOrder
    job_param?: SortOrder
    job_cron_setting?: SortOrder
    consumer?: SortOrder
    exclusive?: SortOrder
    status?: SortOrder
    average_time?: SortOrder
    created_at?: SortOrder
  }

  export type schedule_jobAvgOrderByAggregateInput = {
    job_id?: SortOrder
    average_time?: SortOrder
  }

  export type schedule_jobMaxOrderByAggregateInput = {
    job_id?: SortOrder
    job_name?: SortOrder
    job_param?: SortOrder
    job_cron_setting?: SortOrder
    consumer?: SortOrder
    exclusive?: SortOrder
    status?: SortOrder
    average_time?: SortOrder
    created_at?: SortOrder
  }

  export type schedule_jobMinOrderByAggregateInput = {
    job_id?: SortOrder
    job_name?: SortOrder
    job_param?: SortOrder
    job_cron_setting?: SortOrder
    consumer?: SortOrder
    exclusive?: SortOrder
    status?: SortOrder
    average_time?: SortOrder
    created_at?: SortOrder
  }

  export type schedule_jobSumOrderByAggregateInput = {
    job_id?: SortOrder
    average_time?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type Cache_filesListRelationFilter = {
    every?: cache_filesWhereInput
    some?: cache_filesWhereInput
    none?: cache_filesWhereInput
  }

  export type Output_filesListRelationFilter = {
    every?: output_filesWhereInput
    some?: output_filesWhereInput
    none?: output_filesWhereInput
  }

  export type Job_event_logListRelationFilter = {
    every?: job_event_logWhereInput
    some?: job_event_logWhereInput
    none?: job_event_logWhereInput
  }

  export type cache_filesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type output_filesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type job_event_logOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type schedule_job_logOrderByRelevanceInput = {
    fields: schedule_job_logOrderByRelevanceFieldEnum | schedule_job_logOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type schedule_job_logCountOrderByAggregateInput = {
    job_log_id?: SortOrder
    job_id?: SortOrder
    machine?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    result?: SortOrder
    error?: SortOrder
  }

  export type schedule_job_logAvgOrderByAggregateInput = {
    job_id?: SortOrder
  }

  export type schedule_job_logMaxOrderByAggregateInput = {
    job_log_id?: SortOrder
    job_id?: SortOrder
    machine?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    result?: SortOrder
    error?: SortOrder
  }

  export type schedule_job_logMinOrderByAggregateInput = {
    job_log_id?: SortOrder
    job_id?: SortOrder
    machine?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    result?: SortOrder
    error?: SortOrder
  }

  export type schedule_job_logSumOrderByAggregateInput = {
    job_id?: SortOrder
  }

  export type job_event_logOrderByRelevanceInput = {
    fields: job_event_logOrderByRelevanceFieldEnum | job_event_logOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type job_event_logCountOrderByAggregateInput = {
    id?: SortOrder
    job_log_id?: SortOrder
    event?: SortOrder
    event_message?: SortOrder
    type?: SortOrder
    created_at?: SortOrder
    handled_on?: SortOrder
  }

  export type job_event_logAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type job_event_logMaxOrderByAggregateInput = {
    id?: SortOrder
    job_log_id?: SortOrder
    event?: SortOrder
    event_message?: SortOrder
    type?: SortOrder
    created_at?: SortOrder
    handled_on?: SortOrder
  }

  export type job_event_logMinOrderByAggregateInput = {
    id?: SortOrder
    job_log_id?: SortOrder
    event?: SortOrder
    event_message?: SortOrder
    type?: SortOrder
    created_at?: SortOrder
    handled_on?: SortOrder
  }

  export type job_event_logSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type schedule_job_logCreateNestedOneWithoutCache_filesInput = {
    create?: XOR<schedule_job_logCreateWithoutCache_filesInput, schedule_job_logUncheckedCreateWithoutCache_filesInput>
    connectOrCreate?: schedule_job_logCreateOrConnectWithoutCache_filesInput
    connect?: schedule_job_logWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type schedule_job_logUpdateOneRequiredWithoutCache_filesNestedInput = {
    create?: XOR<schedule_job_logCreateWithoutCache_filesInput, schedule_job_logUncheckedCreateWithoutCache_filesInput>
    connectOrCreate?: schedule_job_logCreateOrConnectWithoutCache_filesInput
    upsert?: schedule_job_logUpsertWithoutCache_filesInput
    connect?: schedule_job_logWhereUniqueInput
    update?: XOR<XOR<schedule_job_logUpdateToOneWithWhereWithoutCache_filesInput, schedule_job_logUpdateWithoutCache_filesInput>, schedule_job_logUncheckedUpdateWithoutCache_filesInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type schedule_job_logCreateNestedOneWithoutOutput_filesInput = {
    create?: XOR<schedule_job_logCreateWithoutOutput_filesInput, schedule_job_logUncheckedCreateWithoutOutput_filesInput>
    connectOrCreate?: schedule_job_logCreateOrConnectWithoutOutput_filesInput
    connect?: schedule_job_logWhereUniqueInput
  }

  export type schedule_job_logUpdateOneRequiredWithoutOutput_filesNestedInput = {
    create?: XOR<schedule_job_logCreateWithoutOutput_filesInput, schedule_job_logUncheckedCreateWithoutOutput_filesInput>
    connectOrCreate?: schedule_job_logCreateOrConnectWithoutOutput_filesInput
    upsert?: schedule_job_logUpsertWithoutOutput_filesInput
    connect?: schedule_job_logWhereUniqueInput
    update?: XOR<XOR<schedule_job_logUpdateToOneWithWhereWithoutOutput_filesInput, schedule_job_logUpdateWithoutOutput_filesInput>, schedule_job_logUncheckedUpdateWithoutOutput_filesInput>
  }

  export type proxy_jobCreateNestedManyWithoutProxyInput = {
    create?: XOR<proxy_jobCreateWithoutProxyInput, proxy_jobUncheckedCreateWithoutProxyInput> | proxy_jobCreateWithoutProxyInput[] | proxy_jobUncheckedCreateWithoutProxyInput[]
    connectOrCreate?: proxy_jobCreateOrConnectWithoutProxyInput | proxy_jobCreateOrConnectWithoutProxyInput[]
    createMany?: proxy_jobCreateManyProxyInputEnvelope
    connect?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
  }

  export type proxy_jobUncheckedCreateNestedManyWithoutProxyInput = {
    create?: XOR<proxy_jobCreateWithoutProxyInput, proxy_jobUncheckedCreateWithoutProxyInput> | proxy_jobCreateWithoutProxyInput[] | proxy_jobUncheckedCreateWithoutProxyInput[]
    connectOrCreate?: proxy_jobCreateOrConnectWithoutProxyInput | proxy_jobCreateOrConnectWithoutProxyInput[]
    createMany?: proxy_jobCreateManyProxyInputEnvelope
    connect?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
  }

  export type Enumproxy_statusFieldUpdateOperationsInput = {
    set?: $Enums.proxy_status
  }

  export type proxy_jobUpdateManyWithoutProxyNestedInput = {
    create?: XOR<proxy_jobCreateWithoutProxyInput, proxy_jobUncheckedCreateWithoutProxyInput> | proxy_jobCreateWithoutProxyInput[] | proxy_jobUncheckedCreateWithoutProxyInput[]
    connectOrCreate?: proxy_jobCreateOrConnectWithoutProxyInput | proxy_jobCreateOrConnectWithoutProxyInput[]
    upsert?: proxy_jobUpsertWithWhereUniqueWithoutProxyInput | proxy_jobUpsertWithWhereUniqueWithoutProxyInput[]
    createMany?: proxy_jobCreateManyProxyInputEnvelope
    set?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    disconnect?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    delete?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    connect?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    update?: proxy_jobUpdateWithWhereUniqueWithoutProxyInput | proxy_jobUpdateWithWhereUniqueWithoutProxyInput[]
    updateMany?: proxy_jobUpdateManyWithWhereWithoutProxyInput | proxy_jobUpdateManyWithWhereWithoutProxyInput[]
    deleteMany?: proxy_jobScalarWhereInput | proxy_jobScalarWhereInput[]
  }

  export type proxy_jobUncheckedUpdateManyWithoutProxyNestedInput = {
    create?: XOR<proxy_jobCreateWithoutProxyInput, proxy_jobUncheckedCreateWithoutProxyInput> | proxy_jobCreateWithoutProxyInput[] | proxy_jobUncheckedCreateWithoutProxyInput[]
    connectOrCreate?: proxy_jobCreateOrConnectWithoutProxyInput | proxy_jobCreateOrConnectWithoutProxyInput[]
    upsert?: proxy_jobUpsertWithWhereUniqueWithoutProxyInput | proxy_jobUpsertWithWhereUniqueWithoutProxyInput[]
    createMany?: proxy_jobCreateManyProxyInputEnvelope
    set?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    disconnect?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    delete?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    connect?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    update?: proxy_jobUpdateWithWhereUniqueWithoutProxyInput | proxy_jobUpdateWithWhereUniqueWithoutProxyInput[]
    updateMany?: proxy_jobUpdateManyWithWhereWithoutProxyInput | proxy_jobUpdateManyWithWhereWithoutProxyInput[]
    deleteMany?: proxy_jobScalarWhereInput | proxy_jobScalarWhereInput[]
  }

  export type schedule_jobCreateNestedOneWithoutProxiesInput = {
    create?: XOR<schedule_jobCreateWithoutProxiesInput, schedule_jobUncheckedCreateWithoutProxiesInput>
    connectOrCreate?: schedule_jobCreateOrConnectWithoutProxiesInput
    connect?: schedule_jobWhereUniqueInput
  }

  export type proxyCreateNestedOneWithoutJobsInput = {
    create?: XOR<proxyCreateWithoutJobsInput, proxyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: proxyCreateOrConnectWithoutJobsInput
    connect?: proxyWhereUniqueInput
  }

  export type schedule_jobUpdateOneRequiredWithoutProxiesNestedInput = {
    create?: XOR<schedule_jobCreateWithoutProxiesInput, schedule_jobUncheckedCreateWithoutProxiesInput>
    connectOrCreate?: schedule_jobCreateOrConnectWithoutProxiesInput
    upsert?: schedule_jobUpsertWithoutProxiesInput
    connect?: schedule_jobWhereUniqueInput
    update?: XOR<XOR<schedule_jobUpdateToOneWithWhereWithoutProxiesInput, schedule_jobUpdateWithoutProxiesInput>, schedule_jobUncheckedUpdateWithoutProxiesInput>
  }

  export type proxyUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<proxyCreateWithoutJobsInput, proxyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: proxyCreateOrConnectWithoutJobsInput
    upsert?: proxyUpsertWithoutJobsInput
    connect?: proxyWhereUniqueInput
    update?: XOR<XOR<proxyUpdateToOneWithWhereWithoutJobsInput, proxyUpdateWithoutJobsInput>, proxyUncheckedUpdateWithoutJobsInput>
  }

  export type schedule_job_logCreateNestedManyWithoutSchedule_jobInput = {
    create?: XOR<schedule_job_logCreateWithoutSchedule_jobInput, schedule_job_logUncheckedCreateWithoutSchedule_jobInput> | schedule_job_logCreateWithoutSchedule_jobInput[] | schedule_job_logUncheckedCreateWithoutSchedule_jobInput[]
    connectOrCreate?: schedule_job_logCreateOrConnectWithoutSchedule_jobInput | schedule_job_logCreateOrConnectWithoutSchedule_jobInput[]
    createMany?: schedule_job_logCreateManySchedule_jobInputEnvelope
    connect?: schedule_job_logWhereUniqueInput | schedule_job_logWhereUniqueInput[]
  }

  export type proxy_jobCreateNestedManyWithoutSchedule_jobInput = {
    create?: XOR<proxy_jobCreateWithoutSchedule_jobInput, proxy_jobUncheckedCreateWithoutSchedule_jobInput> | proxy_jobCreateWithoutSchedule_jobInput[] | proxy_jobUncheckedCreateWithoutSchedule_jobInput[]
    connectOrCreate?: proxy_jobCreateOrConnectWithoutSchedule_jobInput | proxy_jobCreateOrConnectWithoutSchedule_jobInput[]
    createMany?: proxy_jobCreateManySchedule_jobInputEnvelope
    connect?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
  }

  export type schedule_job_logUncheckedCreateNestedManyWithoutSchedule_jobInput = {
    create?: XOR<schedule_job_logCreateWithoutSchedule_jobInput, schedule_job_logUncheckedCreateWithoutSchedule_jobInput> | schedule_job_logCreateWithoutSchedule_jobInput[] | schedule_job_logUncheckedCreateWithoutSchedule_jobInput[]
    connectOrCreate?: schedule_job_logCreateOrConnectWithoutSchedule_jobInput | schedule_job_logCreateOrConnectWithoutSchedule_jobInput[]
    createMany?: schedule_job_logCreateManySchedule_jobInputEnvelope
    connect?: schedule_job_logWhereUniqueInput | schedule_job_logWhereUniqueInput[]
  }

  export type proxy_jobUncheckedCreateNestedManyWithoutSchedule_jobInput = {
    create?: XOR<proxy_jobCreateWithoutSchedule_jobInput, proxy_jobUncheckedCreateWithoutSchedule_jobInput> | proxy_jobCreateWithoutSchedule_jobInput[] | proxy_jobUncheckedCreateWithoutSchedule_jobInput[]
    connectOrCreate?: proxy_jobCreateOrConnectWithoutSchedule_jobInput | proxy_jobCreateOrConnectWithoutSchedule_jobInput[]
    createMany?: proxy_jobCreateManySchedule_jobInputEnvelope
    connect?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type schedule_job_logUpdateManyWithoutSchedule_jobNestedInput = {
    create?: XOR<schedule_job_logCreateWithoutSchedule_jobInput, schedule_job_logUncheckedCreateWithoutSchedule_jobInput> | schedule_job_logCreateWithoutSchedule_jobInput[] | schedule_job_logUncheckedCreateWithoutSchedule_jobInput[]
    connectOrCreate?: schedule_job_logCreateOrConnectWithoutSchedule_jobInput | schedule_job_logCreateOrConnectWithoutSchedule_jobInput[]
    upsert?: schedule_job_logUpsertWithWhereUniqueWithoutSchedule_jobInput | schedule_job_logUpsertWithWhereUniqueWithoutSchedule_jobInput[]
    createMany?: schedule_job_logCreateManySchedule_jobInputEnvelope
    set?: schedule_job_logWhereUniqueInput | schedule_job_logWhereUniqueInput[]
    disconnect?: schedule_job_logWhereUniqueInput | schedule_job_logWhereUniqueInput[]
    delete?: schedule_job_logWhereUniqueInput | schedule_job_logWhereUniqueInput[]
    connect?: schedule_job_logWhereUniqueInput | schedule_job_logWhereUniqueInput[]
    update?: schedule_job_logUpdateWithWhereUniqueWithoutSchedule_jobInput | schedule_job_logUpdateWithWhereUniqueWithoutSchedule_jobInput[]
    updateMany?: schedule_job_logUpdateManyWithWhereWithoutSchedule_jobInput | schedule_job_logUpdateManyWithWhereWithoutSchedule_jobInput[]
    deleteMany?: schedule_job_logScalarWhereInput | schedule_job_logScalarWhereInput[]
  }

  export type proxy_jobUpdateManyWithoutSchedule_jobNestedInput = {
    create?: XOR<proxy_jobCreateWithoutSchedule_jobInput, proxy_jobUncheckedCreateWithoutSchedule_jobInput> | proxy_jobCreateWithoutSchedule_jobInput[] | proxy_jobUncheckedCreateWithoutSchedule_jobInput[]
    connectOrCreate?: proxy_jobCreateOrConnectWithoutSchedule_jobInput | proxy_jobCreateOrConnectWithoutSchedule_jobInput[]
    upsert?: proxy_jobUpsertWithWhereUniqueWithoutSchedule_jobInput | proxy_jobUpsertWithWhereUniqueWithoutSchedule_jobInput[]
    createMany?: proxy_jobCreateManySchedule_jobInputEnvelope
    set?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    disconnect?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    delete?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    connect?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    update?: proxy_jobUpdateWithWhereUniqueWithoutSchedule_jobInput | proxy_jobUpdateWithWhereUniqueWithoutSchedule_jobInput[]
    updateMany?: proxy_jobUpdateManyWithWhereWithoutSchedule_jobInput | proxy_jobUpdateManyWithWhereWithoutSchedule_jobInput[]
    deleteMany?: proxy_jobScalarWhereInput | proxy_jobScalarWhereInput[]
  }

  export type schedule_job_logUncheckedUpdateManyWithoutSchedule_jobNestedInput = {
    create?: XOR<schedule_job_logCreateWithoutSchedule_jobInput, schedule_job_logUncheckedCreateWithoutSchedule_jobInput> | schedule_job_logCreateWithoutSchedule_jobInput[] | schedule_job_logUncheckedCreateWithoutSchedule_jobInput[]
    connectOrCreate?: schedule_job_logCreateOrConnectWithoutSchedule_jobInput | schedule_job_logCreateOrConnectWithoutSchedule_jobInput[]
    upsert?: schedule_job_logUpsertWithWhereUniqueWithoutSchedule_jobInput | schedule_job_logUpsertWithWhereUniqueWithoutSchedule_jobInput[]
    createMany?: schedule_job_logCreateManySchedule_jobInputEnvelope
    set?: schedule_job_logWhereUniqueInput | schedule_job_logWhereUniqueInput[]
    disconnect?: schedule_job_logWhereUniqueInput | schedule_job_logWhereUniqueInput[]
    delete?: schedule_job_logWhereUniqueInput | schedule_job_logWhereUniqueInput[]
    connect?: schedule_job_logWhereUniqueInput | schedule_job_logWhereUniqueInput[]
    update?: schedule_job_logUpdateWithWhereUniqueWithoutSchedule_jobInput | schedule_job_logUpdateWithWhereUniqueWithoutSchedule_jobInput[]
    updateMany?: schedule_job_logUpdateManyWithWhereWithoutSchedule_jobInput | schedule_job_logUpdateManyWithWhereWithoutSchedule_jobInput[]
    deleteMany?: schedule_job_logScalarWhereInput | schedule_job_logScalarWhereInput[]
  }

  export type proxy_jobUncheckedUpdateManyWithoutSchedule_jobNestedInput = {
    create?: XOR<proxy_jobCreateWithoutSchedule_jobInput, proxy_jobUncheckedCreateWithoutSchedule_jobInput> | proxy_jobCreateWithoutSchedule_jobInput[] | proxy_jobUncheckedCreateWithoutSchedule_jobInput[]
    connectOrCreate?: proxy_jobCreateOrConnectWithoutSchedule_jobInput | proxy_jobCreateOrConnectWithoutSchedule_jobInput[]
    upsert?: proxy_jobUpsertWithWhereUniqueWithoutSchedule_jobInput | proxy_jobUpsertWithWhereUniqueWithoutSchedule_jobInput[]
    createMany?: proxy_jobCreateManySchedule_jobInputEnvelope
    set?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    disconnect?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    delete?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    connect?: proxy_jobWhereUniqueInput | proxy_jobWhereUniqueInput[]
    update?: proxy_jobUpdateWithWhereUniqueWithoutSchedule_jobInput | proxy_jobUpdateWithWhereUniqueWithoutSchedule_jobInput[]
    updateMany?: proxy_jobUpdateManyWithWhereWithoutSchedule_jobInput | proxy_jobUpdateManyWithWhereWithoutSchedule_jobInput[]
    deleteMany?: proxy_jobScalarWhereInput | proxy_jobScalarWhereInput[]
  }

  export type schedule_jobCreateNestedOneWithoutJob_logsInput = {
    create?: XOR<schedule_jobCreateWithoutJob_logsInput, schedule_jobUncheckedCreateWithoutJob_logsInput>
    connectOrCreate?: schedule_jobCreateOrConnectWithoutJob_logsInput
    connect?: schedule_jobWhereUniqueInput
  }

  export type cache_filesCreateNestedManyWithoutSchedule_job_logInput = {
    create?: XOR<cache_filesCreateWithoutSchedule_job_logInput, cache_filesUncheckedCreateWithoutSchedule_job_logInput> | cache_filesCreateWithoutSchedule_job_logInput[] | cache_filesUncheckedCreateWithoutSchedule_job_logInput[]
    connectOrCreate?: cache_filesCreateOrConnectWithoutSchedule_job_logInput | cache_filesCreateOrConnectWithoutSchedule_job_logInput[]
    createMany?: cache_filesCreateManySchedule_job_logInputEnvelope
    connect?: cache_filesWhereUniqueInput | cache_filesWhereUniqueInput[]
  }

  export type output_filesCreateNestedManyWithoutSchedule_job_logInput = {
    create?: XOR<output_filesCreateWithoutSchedule_job_logInput, output_filesUncheckedCreateWithoutSchedule_job_logInput> | output_filesCreateWithoutSchedule_job_logInput[] | output_filesUncheckedCreateWithoutSchedule_job_logInput[]
    connectOrCreate?: output_filesCreateOrConnectWithoutSchedule_job_logInput | output_filesCreateOrConnectWithoutSchedule_job_logInput[]
    createMany?: output_filesCreateManySchedule_job_logInputEnvelope
    connect?: output_filesWhereUniqueInput | output_filesWhereUniqueInput[]
  }

  export type job_event_logCreateNestedManyWithoutSchedule_job_logInput = {
    create?: XOR<job_event_logCreateWithoutSchedule_job_logInput, job_event_logUncheckedCreateWithoutSchedule_job_logInput> | job_event_logCreateWithoutSchedule_job_logInput[] | job_event_logUncheckedCreateWithoutSchedule_job_logInput[]
    connectOrCreate?: job_event_logCreateOrConnectWithoutSchedule_job_logInput | job_event_logCreateOrConnectWithoutSchedule_job_logInput[]
    createMany?: job_event_logCreateManySchedule_job_logInputEnvelope
    connect?: job_event_logWhereUniqueInput | job_event_logWhereUniqueInput[]
  }

  export type cache_filesUncheckedCreateNestedManyWithoutSchedule_job_logInput = {
    create?: XOR<cache_filesCreateWithoutSchedule_job_logInput, cache_filesUncheckedCreateWithoutSchedule_job_logInput> | cache_filesCreateWithoutSchedule_job_logInput[] | cache_filesUncheckedCreateWithoutSchedule_job_logInput[]
    connectOrCreate?: cache_filesCreateOrConnectWithoutSchedule_job_logInput | cache_filesCreateOrConnectWithoutSchedule_job_logInput[]
    createMany?: cache_filesCreateManySchedule_job_logInputEnvelope
    connect?: cache_filesWhereUniqueInput | cache_filesWhereUniqueInput[]
  }

  export type output_filesUncheckedCreateNestedManyWithoutSchedule_job_logInput = {
    create?: XOR<output_filesCreateWithoutSchedule_job_logInput, output_filesUncheckedCreateWithoutSchedule_job_logInput> | output_filesCreateWithoutSchedule_job_logInput[] | output_filesUncheckedCreateWithoutSchedule_job_logInput[]
    connectOrCreate?: output_filesCreateOrConnectWithoutSchedule_job_logInput | output_filesCreateOrConnectWithoutSchedule_job_logInput[]
    createMany?: output_filesCreateManySchedule_job_logInputEnvelope
    connect?: output_filesWhereUniqueInput | output_filesWhereUniqueInput[]
  }

  export type job_event_logUncheckedCreateNestedManyWithoutSchedule_job_logInput = {
    create?: XOR<job_event_logCreateWithoutSchedule_job_logInput, job_event_logUncheckedCreateWithoutSchedule_job_logInput> | job_event_logCreateWithoutSchedule_job_logInput[] | job_event_logUncheckedCreateWithoutSchedule_job_logInput[]
    connectOrCreate?: job_event_logCreateOrConnectWithoutSchedule_job_logInput | job_event_logCreateOrConnectWithoutSchedule_job_logInput[]
    createMany?: job_event_logCreateManySchedule_job_logInputEnvelope
    connect?: job_event_logWhereUniqueInput | job_event_logWhereUniqueInput[]
  }

  export type schedule_jobUpdateOneRequiredWithoutJob_logsNestedInput = {
    create?: XOR<schedule_jobCreateWithoutJob_logsInput, schedule_jobUncheckedCreateWithoutJob_logsInput>
    connectOrCreate?: schedule_jobCreateOrConnectWithoutJob_logsInput
    upsert?: schedule_jobUpsertWithoutJob_logsInput
    connect?: schedule_jobWhereUniqueInput
    update?: XOR<XOR<schedule_jobUpdateToOneWithWhereWithoutJob_logsInput, schedule_jobUpdateWithoutJob_logsInput>, schedule_jobUncheckedUpdateWithoutJob_logsInput>
  }

  export type cache_filesUpdateManyWithoutSchedule_job_logNestedInput = {
    create?: XOR<cache_filesCreateWithoutSchedule_job_logInput, cache_filesUncheckedCreateWithoutSchedule_job_logInput> | cache_filesCreateWithoutSchedule_job_logInput[] | cache_filesUncheckedCreateWithoutSchedule_job_logInput[]
    connectOrCreate?: cache_filesCreateOrConnectWithoutSchedule_job_logInput | cache_filesCreateOrConnectWithoutSchedule_job_logInput[]
    upsert?: cache_filesUpsertWithWhereUniqueWithoutSchedule_job_logInput | cache_filesUpsertWithWhereUniqueWithoutSchedule_job_logInput[]
    createMany?: cache_filesCreateManySchedule_job_logInputEnvelope
    set?: cache_filesWhereUniqueInput | cache_filesWhereUniqueInput[]
    disconnect?: cache_filesWhereUniqueInput | cache_filesWhereUniqueInput[]
    delete?: cache_filesWhereUniqueInput | cache_filesWhereUniqueInput[]
    connect?: cache_filesWhereUniqueInput | cache_filesWhereUniqueInput[]
    update?: cache_filesUpdateWithWhereUniqueWithoutSchedule_job_logInput | cache_filesUpdateWithWhereUniqueWithoutSchedule_job_logInput[]
    updateMany?: cache_filesUpdateManyWithWhereWithoutSchedule_job_logInput | cache_filesUpdateManyWithWhereWithoutSchedule_job_logInput[]
    deleteMany?: cache_filesScalarWhereInput | cache_filesScalarWhereInput[]
  }

  export type output_filesUpdateManyWithoutSchedule_job_logNestedInput = {
    create?: XOR<output_filesCreateWithoutSchedule_job_logInput, output_filesUncheckedCreateWithoutSchedule_job_logInput> | output_filesCreateWithoutSchedule_job_logInput[] | output_filesUncheckedCreateWithoutSchedule_job_logInput[]
    connectOrCreate?: output_filesCreateOrConnectWithoutSchedule_job_logInput | output_filesCreateOrConnectWithoutSchedule_job_logInput[]
    upsert?: output_filesUpsertWithWhereUniqueWithoutSchedule_job_logInput | output_filesUpsertWithWhereUniqueWithoutSchedule_job_logInput[]
    createMany?: output_filesCreateManySchedule_job_logInputEnvelope
    set?: output_filesWhereUniqueInput | output_filesWhereUniqueInput[]
    disconnect?: output_filesWhereUniqueInput | output_filesWhereUniqueInput[]
    delete?: output_filesWhereUniqueInput | output_filesWhereUniqueInput[]
    connect?: output_filesWhereUniqueInput | output_filesWhereUniqueInput[]
    update?: output_filesUpdateWithWhereUniqueWithoutSchedule_job_logInput | output_filesUpdateWithWhereUniqueWithoutSchedule_job_logInput[]
    updateMany?: output_filesUpdateManyWithWhereWithoutSchedule_job_logInput | output_filesUpdateManyWithWhereWithoutSchedule_job_logInput[]
    deleteMany?: output_filesScalarWhereInput | output_filesScalarWhereInput[]
  }

  export type job_event_logUpdateManyWithoutSchedule_job_logNestedInput = {
    create?: XOR<job_event_logCreateWithoutSchedule_job_logInput, job_event_logUncheckedCreateWithoutSchedule_job_logInput> | job_event_logCreateWithoutSchedule_job_logInput[] | job_event_logUncheckedCreateWithoutSchedule_job_logInput[]
    connectOrCreate?: job_event_logCreateOrConnectWithoutSchedule_job_logInput | job_event_logCreateOrConnectWithoutSchedule_job_logInput[]
    upsert?: job_event_logUpsertWithWhereUniqueWithoutSchedule_job_logInput | job_event_logUpsertWithWhereUniqueWithoutSchedule_job_logInput[]
    createMany?: job_event_logCreateManySchedule_job_logInputEnvelope
    set?: job_event_logWhereUniqueInput | job_event_logWhereUniqueInput[]
    disconnect?: job_event_logWhereUniqueInput | job_event_logWhereUniqueInput[]
    delete?: job_event_logWhereUniqueInput | job_event_logWhereUniqueInput[]
    connect?: job_event_logWhereUniqueInput | job_event_logWhereUniqueInput[]
    update?: job_event_logUpdateWithWhereUniqueWithoutSchedule_job_logInput | job_event_logUpdateWithWhereUniqueWithoutSchedule_job_logInput[]
    updateMany?: job_event_logUpdateManyWithWhereWithoutSchedule_job_logInput | job_event_logUpdateManyWithWhereWithoutSchedule_job_logInput[]
    deleteMany?: job_event_logScalarWhereInput | job_event_logScalarWhereInput[]
  }

  export type cache_filesUncheckedUpdateManyWithoutSchedule_job_logNestedInput = {
    create?: XOR<cache_filesCreateWithoutSchedule_job_logInput, cache_filesUncheckedCreateWithoutSchedule_job_logInput> | cache_filesCreateWithoutSchedule_job_logInput[] | cache_filesUncheckedCreateWithoutSchedule_job_logInput[]
    connectOrCreate?: cache_filesCreateOrConnectWithoutSchedule_job_logInput | cache_filesCreateOrConnectWithoutSchedule_job_logInput[]
    upsert?: cache_filesUpsertWithWhereUniqueWithoutSchedule_job_logInput | cache_filesUpsertWithWhereUniqueWithoutSchedule_job_logInput[]
    createMany?: cache_filesCreateManySchedule_job_logInputEnvelope
    set?: cache_filesWhereUniqueInput | cache_filesWhereUniqueInput[]
    disconnect?: cache_filesWhereUniqueInput | cache_filesWhereUniqueInput[]
    delete?: cache_filesWhereUniqueInput | cache_filesWhereUniqueInput[]
    connect?: cache_filesWhereUniqueInput | cache_filesWhereUniqueInput[]
    update?: cache_filesUpdateWithWhereUniqueWithoutSchedule_job_logInput | cache_filesUpdateWithWhereUniqueWithoutSchedule_job_logInput[]
    updateMany?: cache_filesUpdateManyWithWhereWithoutSchedule_job_logInput | cache_filesUpdateManyWithWhereWithoutSchedule_job_logInput[]
    deleteMany?: cache_filesScalarWhereInput | cache_filesScalarWhereInput[]
  }

  export type output_filesUncheckedUpdateManyWithoutSchedule_job_logNestedInput = {
    create?: XOR<output_filesCreateWithoutSchedule_job_logInput, output_filesUncheckedCreateWithoutSchedule_job_logInput> | output_filesCreateWithoutSchedule_job_logInput[] | output_filesUncheckedCreateWithoutSchedule_job_logInput[]
    connectOrCreate?: output_filesCreateOrConnectWithoutSchedule_job_logInput | output_filesCreateOrConnectWithoutSchedule_job_logInput[]
    upsert?: output_filesUpsertWithWhereUniqueWithoutSchedule_job_logInput | output_filesUpsertWithWhereUniqueWithoutSchedule_job_logInput[]
    createMany?: output_filesCreateManySchedule_job_logInputEnvelope
    set?: output_filesWhereUniqueInput | output_filesWhereUniqueInput[]
    disconnect?: output_filesWhereUniqueInput | output_filesWhereUniqueInput[]
    delete?: output_filesWhereUniqueInput | output_filesWhereUniqueInput[]
    connect?: output_filesWhereUniqueInput | output_filesWhereUniqueInput[]
    update?: output_filesUpdateWithWhereUniqueWithoutSchedule_job_logInput | output_filesUpdateWithWhereUniqueWithoutSchedule_job_logInput[]
    updateMany?: output_filesUpdateManyWithWhereWithoutSchedule_job_logInput | output_filesUpdateManyWithWhereWithoutSchedule_job_logInput[]
    deleteMany?: output_filesScalarWhereInput | output_filesScalarWhereInput[]
  }

  export type job_event_logUncheckedUpdateManyWithoutSchedule_job_logNestedInput = {
    create?: XOR<job_event_logCreateWithoutSchedule_job_logInput, job_event_logUncheckedCreateWithoutSchedule_job_logInput> | job_event_logCreateWithoutSchedule_job_logInput[] | job_event_logUncheckedCreateWithoutSchedule_job_logInput[]
    connectOrCreate?: job_event_logCreateOrConnectWithoutSchedule_job_logInput | job_event_logCreateOrConnectWithoutSchedule_job_logInput[]
    upsert?: job_event_logUpsertWithWhereUniqueWithoutSchedule_job_logInput | job_event_logUpsertWithWhereUniqueWithoutSchedule_job_logInput[]
    createMany?: job_event_logCreateManySchedule_job_logInputEnvelope
    set?: job_event_logWhereUniqueInput | job_event_logWhereUniqueInput[]
    disconnect?: job_event_logWhereUniqueInput | job_event_logWhereUniqueInput[]
    delete?: job_event_logWhereUniqueInput | job_event_logWhereUniqueInput[]
    connect?: job_event_logWhereUniqueInput | job_event_logWhereUniqueInput[]
    update?: job_event_logUpdateWithWhereUniqueWithoutSchedule_job_logInput | job_event_logUpdateWithWhereUniqueWithoutSchedule_job_logInput[]
    updateMany?: job_event_logUpdateManyWithWhereWithoutSchedule_job_logInput | job_event_logUpdateManyWithWhereWithoutSchedule_job_logInput[]
    deleteMany?: job_event_logScalarWhereInput | job_event_logScalarWhereInput[]
  }

  export type schedule_job_logCreateNestedOneWithoutEventsInput = {
    create?: XOR<schedule_job_logCreateWithoutEventsInput, schedule_job_logUncheckedCreateWithoutEventsInput>
    connectOrCreate?: schedule_job_logCreateOrConnectWithoutEventsInput
    connect?: schedule_job_logWhereUniqueInput
  }

  export type schedule_job_logUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<schedule_job_logCreateWithoutEventsInput, schedule_job_logUncheckedCreateWithoutEventsInput>
    connectOrCreate?: schedule_job_logCreateOrConnectWithoutEventsInput
    upsert?: schedule_job_logUpsertWithoutEventsInput
    connect?: schedule_job_logWhereUniqueInput
    update?: XOR<XOR<schedule_job_logUpdateToOneWithWhereWithoutEventsInput, schedule_job_logUpdateWithoutEventsInput>, schedule_job_logUncheckedUpdateWithoutEventsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumproxy_statusFilter<$PrismaModel = never> = {
    equals?: $Enums.proxy_status | Enumproxy_statusFieldRefInput<$PrismaModel>
    in?: $Enums.proxy_status[]
    notIn?: $Enums.proxy_status[]
    not?: NestedEnumproxy_statusFilter<$PrismaModel> | $Enums.proxy_status
  }

  export type NestedEnumproxy_statusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.proxy_status | Enumproxy_statusFieldRefInput<$PrismaModel>
    in?: $Enums.proxy_status[]
    notIn?: $Enums.proxy_status[]
    not?: NestedEnumproxy_statusWithAggregatesFilter<$PrismaModel> | $Enums.proxy_status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumproxy_statusFilter<$PrismaModel>
    _max?: NestedEnumproxy_statusFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type schedule_job_logCreateWithoutCache_filesInput = {
    job_log_id: string
    machine?: string | null
    start_time: Date | string
    end_time?: Date | string | null
    result?: string | null
    error?: string | null
    schedule_job: schedule_jobCreateNestedOneWithoutJob_logsInput
    output_files?: output_filesCreateNestedManyWithoutSchedule_job_logInput
    events?: job_event_logCreateNestedManyWithoutSchedule_job_logInput
  }

  export type schedule_job_logUncheckedCreateWithoutCache_filesInput = {
    job_log_id: string
    job_id: number
    machine?: string | null
    start_time: Date | string
    end_time?: Date | string | null
    result?: string | null
    error?: string | null
    output_files?: output_filesUncheckedCreateNestedManyWithoutSchedule_job_logInput
    events?: job_event_logUncheckedCreateNestedManyWithoutSchedule_job_logInput
  }

  export type schedule_job_logCreateOrConnectWithoutCache_filesInput = {
    where: schedule_job_logWhereUniqueInput
    create: XOR<schedule_job_logCreateWithoutCache_filesInput, schedule_job_logUncheckedCreateWithoutCache_filesInput>
  }

  export type schedule_job_logUpsertWithoutCache_filesInput = {
    update: XOR<schedule_job_logUpdateWithoutCache_filesInput, schedule_job_logUncheckedUpdateWithoutCache_filesInput>
    create: XOR<schedule_job_logCreateWithoutCache_filesInput, schedule_job_logUncheckedCreateWithoutCache_filesInput>
    where?: schedule_job_logWhereInput
  }

  export type schedule_job_logUpdateToOneWithWhereWithoutCache_filesInput = {
    where?: schedule_job_logWhereInput
    data: XOR<schedule_job_logUpdateWithoutCache_filesInput, schedule_job_logUncheckedUpdateWithoutCache_filesInput>
  }

  export type schedule_job_logUpdateWithoutCache_filesInput = {
    job_log_id?: StringFieldUpdateOperationsInput | string
    machine?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    schedule_job?: schedule_jobUpdateOneRequiredWithoutJob_logsNestedInput
    output_files?: output_filesUpdateManyWithoutSchedule_job_logNestedInput
    events?: job_event_logUpdateManyWithoutSchedule_job_logNestedInput
  }

  export type schedule_job_logUncheckedUpdateWithoutCache_filesInput = {
    job_log_id?: StringFieldUpdateOperationsInput | string
    job_id?: IntFieldUpdateOperationsInput | number
    machine?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    output_files?: output_filesUncheckedUpdateManyWithoutSchedule_job_logNestedInput
    events?: job_event_logUncheckedUpdateManyWithoutSchedule_job_logNestedInput
  }

  export type schedule_job_logCreateWithoutOutput_filesInput = {
    job_log_id: string
    machine?: string | null
    start_time: Date | string
    end_time?: Date | string | null
    result?: string | null
    error?: string | null
    schedule_job: schedule_jobCreateNestedOneWithoutJob_logsInput
    cache_files?: cache_filesCreateNestedManyWithoutSchedule_job_logInput
    events?: job_event_logCreateNestedManyWithoutSchedule_job_logInput
  }

  export type schedule_job_logUncheckedCreateWithoutOutput_filesInput = {
    job_log_id: string
    job_id: number
    machine?: string | null
    start_time: Date | string
    end_time?: Date | string | null
    result?: string | null
    error?: string | null
    cache_files?: cache_filesUncheckedCreateNestedManyWithoutSchedule_job_logInput
    events?: job_event_logUncheckedCreateNestedManyWithoutSchedule_job_logInput
  }

  export type schedule_job_logCreateOrConnectWithoutOutput_filesInput = {
    where: schedule_job_logWhereUniqueInput
    create: XOR<schedule_job_logCreateWithoutOutput_filesInput, schedule_job_logUncheckedCreateWithoutOutput_filesInput>
  }

  export type schedule_job_logUpsertWithoutOutput_filesInput = {
    update: XOR<schedule_job_logUpdateWithoutOutput_filesInput, schedule_job_logUncheckedUpdateWithoutOutput_filesInput>
    create: XOR<schedule_job_logCreateWithoutOutput_filesInput, schedule_job_logUncheckedCreateWithoutOutput_filesInput>
    where?: schedule_job_logWhereInput
  }

  export type schedule_job_logUpdateToOneWithWhereWithoutOutput_filesInput = {
    where?: schedule_job_logWhereInput
    data: XOR<schedule_job_logUpdateWithoutOutput_filesInput, schedule_job_logUncheckedUpdateWithoutOutput_filesInput>
  }

  export type schedule_job_logUpdateWithoutOutput_filesInput = {
    job_log_id?: StringFieldUpdateOperationsInput | string
    machine?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    schedule_job?: schedule_jobUpdateOneRequiredWithoutJob_logsNestedInput
    cache_files?: cache_filesUpdateManyWithoutSchedule_job_logNestedInput
    events?: job_event_logUpdateManyWithoutSchedule_job_logNestedInput
  }

  export type schedule_job_logUncheckedUpdateWithoutOutput_filesInput = {
    job_log_id?: StringFieldUpdateOperationsInput | string
    job_id?: IntFieldUpdateOperationsInput | number
    machine?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    cache_files?: cache_filesUncheckedUpdateManyWithoutSchedule_job_logNestedInput
    events?: job_event_logUncheckedUpdateManyWithoutSchedule_job_logNestedInput
  }

  export type proxy_jobCreateWithoutProxyInput = {
    created_at?: Date | string
    updated_at?: Date | string
    schedule_job: schedule_jobCreateNestedOneWithoutProxiesInput
  }

  export type proxy_jobUncheckedCreateWithoutProxyInput = {
    id?: number
    job_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type proxy_jobCreateOrConnectWithoutProxyInput = {
    where: proxy_jobWhereUniqueInput
    create: XOR<proxy_jobCreateWithoutProxyInput, proxy_jobUncheckedCreateWithoutProxyInput>
  }

  export type proxy_jobCreateManyProxyInputEnvelope = {
    data: proxy_jobCreateManyProxyInput | proxy_jobCreateManyProxyInput[]
    skipDuplicates?: boolean
  }

  export type proxy_jobUpsertWithWhereUniqueWithoutProxyInput = {
    where: proxy_jobWhereUniqueInput
    update: XOR<proxy_jobUpdateWithoutProxyInput, proxy_jobUncheckedUpdateWithoutProxyInput>
    create: XOR<proxy_jobCreateWithoutProxyInput, proxy_jobUncheckedCreateWithoutProxyInput>
  }

  export type proxy_jobUpdateWithWhereUniqueWithoutProxyInput = {
    where: proxy_jobWhereUniqueInput
    data: XOR<proxy_jobUpdateWithoutProxyInput, proxy_jobUncheckedUpdateWithoutProxyInput>
  }

  export type proxy_jobUpdateManyWithWhereWithoutProxyInput = {
    where: proxy_jobScalarWhereInput
    data: XOR<proxy_jobUpdateManyMutationInput, proxy_jobUncheckedUpdateManyWithoutProxyInput>
  }

  export type proxy_jobScalarWhereInput = {
    AND?: proxy_jobScalarWhereInput | proxy_jobScalarWhereInput[]
    OR?: proxy_jobScalarWhereInput[]
    NOT?: proxy_jobScalarWhereInput | proxy_jobScalarWhereInput[]
    id?: IntFilter<"proxy_job"> | number
    job_id?: IntFilter<"proxy_job"> | number
    proxy_id?: IntFilter<"proxy_job"> | number
    created_at?: DateTimeFilter<"proxy_job"> | Date | string
    updated_at?: DateTimeFilter<"proxy_job"> | Date | string
  }

  export type schedule_jobCreateWithoutProxiesInput = {
    job_name?: string
    job_param?: string | null
    job_cron_setting?: string
    consumer?: string
    exclusive?: string
    status?: string
    average_time?: number | null
    created_at?: Date | string | null
    job_logs?: schedule_job_logCreateNestedManyWithoutSchedule_jobInput
  }

  export type schedule_jobUncheckedCreateWithoutProxiesInput = {
    job_id?: number
    job_name?: string
    job_param?: string | null
    job_cron_setting?: string
    consumer?: string
    exclusive?: string
    status?: string
    average_time?: number | null
    created_at?: Date | string | null
    job_logs?: schedule_job_logUncheckedCreateNestedManyWithoutSchedule_jobInput
  }

  export type schedule_jobCreateOrConnectWithoutProxiesInput = {
    where: schedule_jobWhereUniqueInput
    create: XOR<schedule_jobCreateWithoutProxiesInput, schedule_jobUncheckedCreateWithoutProxiesInput>
  }

  export type proxyCreateWithoutJobsInput = {
    proxy_ip: string
    proxy_port: number
    protocol: string
    username?: string | null
    password?: string | null
    description?: string | null
    status?: $Enums.proxy_status
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type proxyUncheckedCreateWithoutJobsInput = {
    id?: number
    proxy_ip: string
    proxy_port: number
    protocol: string
    username?: string | null
    password?: string | null
    description?: string | null
    status?: $Enums.proxy_status
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type proxyCreateOrConnectWithoutJobsInput = {
    where: proxyWhereUniqueInput
    create: XOR<proxyCreateWithoutJobsInput, proxyUncheckedCreateWithoutJobsInput>
  }

  export type schedule_jobUpsertWithoutProxiesInput = {
    update: XOR<schedule_jobUpdateWithoutProxiesInput, schedule_jobUncheckedUpdateWithoutProxiesInput>
    create: XOR<schedule_jobCreateWithoutProxiesInput, schedule_jobUncheckedCreateWithoutProxiesInput>
    where?: schedule_jobWhereInput
  }

  export type schedule_jobUpdateToOneWithWhereWithoutProxiesInput = {
    where?: schedule_jobWhereInput
    data: XOR<schedule_jobUpdateWithoutProxiesInput, schedule_jobUncheckedUpdateWithoutProxiesInput>
  }

  export type schedule_jobUpdateWithoutProxiesInput = {
    job_name?: StringFieldUpdateOperationsInput | string
    job_param?: NullableStringFieldUpdateOperationsInput | string | null
    job_cron_setting?: StringFieldUpdateOperationsInput | string
    consumer?: StringFieldUpdateOperationsInput | string
    exclusive?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    average_time?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    job_logs?: schedule_job_logUpdateManyWithoutSchedule_jobNestedInput
  }

  export type schedule_jobUncheckedUpdateWithoutProxiesInput = {
    job_id?: IntFieldUpdateOperationsInput | number
    job_name?: StringFieldUpdateOperationsInput | string
    job_param?: NullableStringFieldUpdateOperationsInput | string | null
    job_cron_setting?: StringFieldUpdateOperationsInput | string
    consumer?: StringFieldUpdateOperationsInput | string
    exclusive?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    average_time?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    job_logs?: schedule_job_logUncheckedUpdateManyWithoutSchedule_jobNestedInput
  }

  export type proxyUpsertWithoutJobsInput = {
    update: XOR<proxyUpdateWithoutJobsInput, proxyUncheckedUpdateWithoutJobsInput>
    create: XOR<proxyCreateWithoutJobsInput, proxyUncheckedCreateWithoutJobsInput>
    where?: proxyWhereInput
  }

  export type proxyUpdateToOneWithWhereWithoutJobsInput = {
    where?: proxyWhereInput
    data: XOR<proxyUpdateWithoutJobsInput, proxyUncheckedUpdateWithoutJobsInput>
  }

  export type proxyUpdateWithoutJobsInput = {
    proxy_ip?: StringFieldUpdateOperationsInput | string
    proxy_port?: IntFieldUpdateOperationsInput | number
    protocol?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumproxy_statusFieldUpdateOperationsInput | $Enums.proxy_status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type proxyUncheckedUpdateWithoutJobsInput = {
    id?: IntFieldUpdateOperationsInput | number
    proxy_ip?: StringFieldUpdateOperationsInput | string
    proxy_port?: IntFieldUpdateOperationsInput | number
    protocol?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: Enumproxy_statusFieldUpdateOperationsInput | $Enums.proxy_status
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type schedule_job_logCreateWithoutSchedule_jobInput = {
    job_log_id: string
    machine?: string | null
    start_time: Date | string
    end_time?: Date | string | null
    result?: string | null
    error?: string | null
    cache_files?: cache_filesCreateNestedManyWithoutSchedule_job_logInput
    output_files?: output_filesCreateNestedManyWithoutSchedule_job_logInput
    events?: job_event_logCreateNestedManyWithoutSchedule_job_logInput
  }

  export type schedule_job_logUncheckedCreateWithoutSchedule_jobInput = {
    job_log_id: string
    machine?: string | null
    start_time: Date | string
    end_time?: Date | string | null
    result?: string | null
    error?: string | null
    cache_files?: cache_filesUncheckedCreateNestedManyWithoutSchedule_job_logInput
    output_files?: output_filesUncheckedCreateNestedManyWithoutSchedule_job_logInput
    events?: job_event_logUncheckedCreateNestedManyWithoutSchedule_job_logInput
  }

  export type schedule_job_logCreateOrConnectWithoutSchedule_jobInput = {
    where: schedule_job_logWhereUniqueInput
    create: XOR<schedule_job_logCreateWithoutSchedule_jobInput, schedule_job_logUncheckedCreateWithoutSchedule_jobInput>
  }

  export type schedule_job_logCreateManySchedule_jobInputEnvelope = {
    data: schedule_job_logCreateManySchedule_jobInput | schedule_job_logCreateManySchedule_jobInput[]
    skipDuplicates?: boolean
  }

  export type proxy_jobCreateWithoutSchedule_jobInput = {
    created_at?: Date | string
    updated_at?: Date | string
    proxy: proxyCreateNestedOneWithoutJobsInput
  }

  export type proxy_jobUncheckedCreateWithoutSchedule_jobInput = {
    id?: number
    proxy_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type proxy_jobCreateOrConnectWithoutSchedule_jobInput = {
    where: proxy_jobWhereUniqueInput
    create: XOR<proxy_jobCreateWithoutSchedule_jobInput, proxy_jobUncheckedCreateWithoutSchedule_jobInput>
  }

  export type proxy_jobCreateManySchedule_jobInputEnvelope = {
    data: proxy_jobCreateManySchedule_jobInput | proxy_jobCreateManySchedule_jobInput[]
    skipDuplicates?: boolean
  }

  export type schedule_job_logUpsertWithWhereUniqueWithoutSchedule_jobInput = {
    where: schedule_job_logWhereUniqueInput
    update: XOR<schedule_job_logUpdateWithoutSchedule_jobInput, schedule_job_logUncheckedUpdateWithoutSchedule_jobInput>
    create: XOR<schedule_job_logCreateWithoutSchedule_jobInput, schedule_job_logUncheckedCreateWithoutSchedule_jobInput>
  }

  export type schedule_job_logUpdateWithWhereUniqueWithoutSchedule_jobInput = {
    where: schedule_job_logWhereUniqueInput
    data: XOR<schedule_job_logUpdateWithoutSchedule_jobInput, schedule_job_logUncheckedUpdateWithoutSchedule_jobInput>
  }

  export type schedule_job_logUpdateManyWithWhereWithoutSchedule_jobInput = {
    where: schedule_job_logScalarWhereInput
    data: XOR<schedule_job_logUpdateManyMutationInput, schedule_job_logUncheckedUpdateManyWithoutSchedule_jobInput>
  }

  export type schedule_job_logScalarWhereInput = {
    AND?: schedule_job_logScalarWhereInput | schedule_job_logScalarWhereInput[]
    OR?: schedule_job_logScalarWhereInput[]
    NOT?: schedule_job_logScalarWhereInput | schedule_job_logScalarWhereInput[]
    job_log_id?: StringFilter<"schedule_job_log"> | string
    job_id?: IntFilter<"schedule_job_log"> | number
    machine?: StringNullableFilter<"schedule_job_log"> | string | null
    start_time?: DateTimeFilter<"schedule_job_log"> | Date | string
    end_time?: DateTimeNullableFilter<"schedule_job_log"> | Date | string | null
    result?: StringNullableFilter<"schedule_job_log"> | string | null
    error?: StringNullableFilter<"schedule_job_log"> | string | null
  }

  export type proxy_jobUpsertWithWhereUniqueWithoutSchedule_jobInput = {
    where: proxy_jobWhereUniqueInput
    update: XOR<proxy_jobUpdateWithoutSchedule_jobInput, proxy_jobUncheckedUpdateWithoutSchedule_jobInput>
    create: XOR<proxy_jobCreateWithoutSchedule_jobInput, proxy_jobUncheckedCreateWithoutSchedule_jobInput>
  }

  export type proxy_jobUpdateWithWhereUniqueWithoutSchedule_jobInput = {
    where: proxy_jobWhereUniqueInput
    data: XOR<proxy_jobUpdateWithoutSchedule_jobInput, proxy_jobUncheckedUpdateWithoutSchedule_jobInput>
  }

  export type proxy_jobUpdateManyWithWhereWithoutSchedule_jobInput = {
    where: proxy_jobScalarWhereInput
    data: XOR<proxy_jobUpdateManyMutationInput, proxy_jobUncheckedUpdateManyWithoutSchedule_jobInput>
  }

  export type schedule_jobCreateWithoutJob_logsInput = {
    job_name?: string
    job_param?: string | null
    job_cron_setting?: string
    consumer?: string
    exclusive?: string
    status?: string
    average_time?: number | null
    created_at?: Date | string | null
    proxies?: proxy_jobCreateNestedManyWithoutSchedule_jobInput
  }

  export type schedule_jobUncheckedCreateWithoutJob_logsInput = {
    job_id?: number
    job_name?: string
    job_param?: string | null
    job_cron_setting?: string
    consumer?: string
    exclusive?: string
    status?: string
    average_time?: number | null
    created_at?: Date | string | null
    proxies?: proxy_jobUncheckedCreateNestedManyWithoutSchedule_jobInput
  }

  export type schedule_jobCreateOrConnectWithoutJob_logsInput = {
    where: schedule_jobWhereUniqueInput
    create: XOR<schedule_jobCreateWithoutJob_logsInput, schedule_jobUncheckedCreateWithoutJob_logsInput>
  }

  export type cache_filesCreateWithoutSchedule_job_logInput = {
    created_at?: Date | string
    updated_at?: Date | string
    file_name: string
    file_tags?: string | null
    file_path: string
    file_size: bigint | number
    time_to_live: bigint | number
    file_type: string
    last_downloaded?: Date | string | null
  }

  export type cache_filesUncheckedCreateWithoutSchedule_job_logInput = {
    id?: number
    created_at?: Date | string
    updated_at?: Date | string
    file_name: string
    file_tags?: string | null
    file_path: string
    file_size: bigint | number
    time_to_live: bigint | number
    file_type: string
    last_downloaded?: Date | string | null
  }

  export type cache_filesCreateOrConnectWithoutSchedule_job_logInput = {
    where: cache_filesWhereUniqueInput
    create: XOR<cache_filesCreateWithoutSchedule_job_logInput, cache_filesUncheckedCreateWithoutSchedule_job_logInput>
  }

  export type cache_filesCreateManySchedule_job_logInputEnvelope = {
    data: cache_filesCreateManySchedule_job_logInput | cache_filesCreateManySchedule_job_logInput[]
    skipDuplicates?: boolean
  }

  export type output_filesCreateWithoutSchedule_job_logInput = {
    created_at?: Date | string
    updated_at?: Date | string
    file_name: string
    file_tags?: string | null
    file_path: string
    file_size: bigint | number
    file_type: string
    last_downloaded?: Date | string | null
  }

  export type output_filesUncheckedCreateWithoutSchedule_job_logInput = {
    id?: number
    created_at?: Date | string
    updated_at?: Date | string
    file_name: string
    file_tags?: string | null
    file_path: string
    file_size: bigint | number
    file_type: string
    last_downloaded?: Date | string | null
  }

  export type output_filesCreateOrConnectWithoutSchedule_job_logInput = {
    where: output_filesWhereUniqueInput
    create: XOR<output_filesCreateWithoutSchedule_job_logInput, output_filesUncheckedCreateWithoutSchedule_job_logInput>
  }

  export type output_filesCreateManySchedule_job_logInputEnvelope = {
    data: output_filesCreateManySchedule_job_logInput | output_filesCreateManySchedule_job_logInput[]
    skipDuplicates?: boolean
  }

  export type job_event_logCreateWithoutSchedule_job_logInput = {
    event: string
    event_message: string
    type: string
    created_at?: Date | string
    handled_on?: Date | string | null
  }

  export type job_event_logUncheckedCreateWithoutSchedule_job_logInput = {
    id?: number
    event: string
    event_message: string
    type: string
    created_at?: Date | string
    handled_on?: Date | string | null
  }

  export type job_event_logCreateOrConnectWithoutSchedule_job_logInput = {
    where: job_event_logWhereUniqueInput
    create: XOR<job_event_logCreateWithoutSchedule_job_logInput, job_event_logUncheckedCreateWithoutSchedule_job_logInput>
  }

  export type job_event_logCreateManySchedule_job_logInputEnvelope = {
    data: job_event_logCreateManySchedule_job_logInput | job_event_logCreateManySchedule_job_logInput[]
    skipDuplicates?: boolean
  }

  export type schedule_jobUpsertWithoutJob_logsInput = {
    update: XOR<schedule_jobUpdateWithoutJob_logsInput, schedule_jobUncheckedUpdateWithoutJob_logsInput>
    create: XOR<schedule_jobCreateWithoutJob_logsInput, schedule_jobUncheckedCreateWithoutJob_logsInput>
    where?: schedule_jobWhereInput
  }

  export type schedule_jobUpdateToOneWithWhereWithoutJob_logsInput = {
    where?: schedule_jobWhereInput
    data: XOR<schedule_jobUpdateWithoutJob_logsInput, schedule_jobUncheckedUpdateWithoutJob_logsInput>
  }

  export type schedule_jobUpdateWithoutJob_logsInput = {
    job_name?: StringFieldUpdateOperationsInput | string
    job_param?: NullableStringFieldUpdateOperationsInput | string | null
    job_cron_setting?: StringFieldUpdateOperationsInput | string
    consumer?: StringFieldUpdateOperationsInput | string
    exclusive?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    average_time?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proxies?: proxy_jobUpdateManyWithoutSchedule_jobNestedInput
  }

  export type schedule_jobUncheckedUpdateWithoutJob_logsInput = {
    job_id?: IntFieldUpdateOperationsInput | number
    job_name?: StringFieldUpdateOperationsInput | string
    job_param?: NullableStringFieldUpdateOperationsInput | string | null
    job_cron_setting?: StringFieldUpdateOperationsInput | string
    consumer?: StringFieldUpdateOperationsInput | string
    exclusive?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    average_time?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proxies?: proxy_jobUncheckedUpdateManyWithoutSchedule_jobNestedInput
  }

  export type cache_filesUpsertWithWhereUniqueWithoutSchedule_job_logInput = {
    where: cache_filesWhereUniqueInput
    update: XOR<cache_filesUpdateWithoutSchedule_job_logInput, cache_filesUncheckedUpdateWithoutSchedule_job_logInput>
    create: XOR<cache_filesCreateWithoutSchedule_job_logInput, cache_filesUncheckedCreateWithoutSchedule_job_logInput>
  }

  export type cache_filesUpdateWithWhereUniqueWithoutSchedule_job_logInput = {
    where: cache_filesWhereUniqueInput
    data: XOR<cache_filesUpdateWithoutSchedule_job_logInput, cache_filesUncheckedUpdateWithoutSchedule_job_logInput>
  }

  export type cache_filesUpdateManyWithWhereWithoutSchedule_job_logInput = {
    where: cache_filesScalarWhereInput
    data: XOR<cache_filesUpdateManyMutationInput, cache_filesUncheckedUpdateManyWithoutSchedule_job_logInput>
  }

  export type cache_filesScalarWhereInput = {
    AND?: cache_filesScalarWhereInput | cache_filesScalarWhereInput[]
    OR?: cache_filesScalarWhereInput[]
    NOT?: cache_filesScalarWhereInput | cache_filesScalarWhereInput[]
    id?: IntFilter<"cache_files"> | number
    job_log_id?: StringFilter<"cache_files"> | string
    created_at?: DateTimeFilter<"cache_files"> | Date | string
    updated_at?: DateTimeFilter<"cache_files"> | Date | string
    file_name?: StringFilter<"cache_files"> | string
    file_tags?: StringNullableFilter<"cache_files"> | string | null
    file_path?: StringFilter<"cache_files"> | string
    file_size?: BigIntFilter<"cache_files"> | bigint | number
    time_to_live?: BigIntFilter<"cache_files"> | bigint | number
    file_type?: StringFilter<"cache_files"> | string
    last_downloaded?: DateTimeNullableFilter<"cache_files"> | Date | string | null
  }

  export type output_filesUpsertWithWhereUniqueWithoutSchedule_job_logInput = {
    where: output_filesWhereUniqueInput
    update: XOR<output_filesUpdateWithoutSchedule_job_logInput, output_filesUncheckedUpdateWithoutSchedule_job_logInput>
    create: XOR<output_filesCreateWithoutSchedule_job_logInput, output_filesUncheckedCreateWithoutSchedule_job_logInput>
  }

  export type output_filesUpdateWithWhereUniqueWithoutSchedule_job_logInput = {
    where: output_filesWhereUniqueInput
    data: XOR<output_filesUpdateWithoutSchedule_job_logInput, output_filesUncheckedUpdateWithoutSchedule_job_logInput>
  }

  export type output_filesUpdateManyWithWhereWithoutSchedule_job_logInput = {
    where: output_filesScalarWhereInput
    data: XOR<output_filesUpdateManyMutationInput, output_filesUncheckedUpdateManyWithoutSchedule_job_logInput>
  }

  export type output_filesScalarWhereInput = {
    AND?: output_filesScalarWhereInput | output_filesScalarWhereInput[]
    OR?: output_filesScalarWhereInput[]
    NOT?: output_filesScalarWhereInput | output_filesScalarWhereInput[]
    id?: IntFilter<"output_files"> | number
    job_log_id?: StringFilter<"output_files"> | string
    created_at?: DateTimeFilter<"output_files"> | Date | string
    updated_at?: DateTimeFilter<"output_files"> | Date | string
    file_name?: StringFilter<"output_files"> | string
    file_tags?: StringNullableFilter<"output_files"> | string | null
    file_path?: StringFilter<"output_files"> | string
    file_size?: BigIntFilter<"output_files"> | bigint | number
    file_type?: StringFilter<"output_files"> | string
    last_downloaded?: DateTimeNullableFilter<"output_files"> | Date | string | null
  }

  export type job_event_logUpsertWithWhereUniqueWithoutSchedule_job_logInput = {
    where: job_event_logWhereUniqueInput
    update: XOR<job_event_logUpdateWithoutSchedule_job_logInput, job_event_logUncheckedUpdateWithoutSchedule_job_logInput>
    create: XOR<job_event_logCreateWithoutSchedule_job_logInput, job_event_logUncheckedCreateWithoutSchedule_job_logInput>
  }

  export type job_event_logUpdateWithWhereUniqueWithoutSchedule_job_logInput = {
    where: job_event_logWhereUniqueInput
    data: XOR<job_event_logUpdateWithoutSchedule_job_logInput, job_event_logUncheckedUpdateWithoutSchedule_job_logInput>
  }

  export type job_event_logUpdateManyWithWhereWithoutSchedule_job_logInput = {
    where: job_event_logScalarWhereInput
    data: XOR<job_event_logUpdateManyMutationInput, job_event_logUncheckedUpdateManyWithoutSchedule_job_logInput>
  }

  export type job_event_logScalarWhereInput = {
    AND?: job_event_logScalarWhereInput | job_event_logScalarWhereInput[]
    OR?: job_event_logScalarWhereInput[]
    NOT?: job_event_logScalarWhereInput | job_event_logScalarWhereInput[]
    id?: IntFilter<"job_event_log"> | number
    job_log_id?: StringFilter<"job_event_log"> | string
    event?: StringFilter<"job_event_log"> | string
    event_message?: StringFilter<"job_event_log"> | string
    type?: StringFilter<"job_event_log"> | string
    created_at?: DateTimeFilter<"job_event_log"> | Date | string
    handled_on?: DateTimeNullableFilter<"job_event_log"> | Date | string | null
  }

  export type schedule_job_logCreateWithoutEventsInput = {
    job_log_id: string
    machine?: string | null
    start_time: Date | string
    end_time?: Date | string | null
    result?: string | null
    error?: string | null
    schedule_job: schedule_jobCreateNestedOneWithoutJob_logsInput
    cache_files?: cache_filesCreateNestedManyWithoutSchedule_job_logInput
    output_files?: output_filesCreateNestedManyWithoutSchedule_job_logInput
  }

  export type schedule_job_logUncheckedCreateWithoutEventsInput = {
    job_log_id: string
    job_id: number
    machine?: string | null
    start_time: Date | string
    end_time?: Date | string | null
    result?: string | null
    error?: string | null
    cache_files?: cache_filesUncheckedCreateNestedManyWithoutSchedule_job_logInput
    output_files?: output_filesUncheckedCreateNestedManyWithoutSchedule_job_logInput
  }

  export type schedule_job_logCreateOrConnectWithoutEventsInput = {
    where: schedule_job_logWhereUniqueInput
    create: XOR<schedule_job_logCreateWithoutEventsInput, schedule_job_logUncheckedCreateWithoutEventsInput>
  }

  export type schedule_job_logUpsertWithoutEventsInput = {
    update: XOR<schedule_job_logUpdateWithoutEventsInput, schedule_job_logUncheckedUpdateWithoutEventsInput>
    create: XOR<schedule_job_logCreateWithoutEventsInput, schedule_job_logUncheckedCreateWithoutEventsInput>
    where?: schedule_job_logWhereInput
  }

  export type schedule_job_logUpdateToOneWithWhereWithoutEventsInput = {
    where?: schedule_job_logWhereInput
    data: XOR<schedule_job_logUpdateWithoutEventsInput, schedule_job_logUncheckedUpdateWithoutEventsInput>
  }

  export type schedule_job_logUpdateWithoutEventsInput = {
    job_log_id?: StringFieldUpdateOperationsInput | string
    machine?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    schedule_job?: schedule_jobUpdateOneRequiredWithoutJob_logsNestedInput
    cache_files?: cache_filesUpdateManyWithoutSchedule_job_logNestedInput
    output_files?: output_filesUpdateManyWithoutSchedule_job_logNestedInput
  }

  export type schedule_job_logUncheckedUpdateWithoutEventsInput = {
    job_log_id?: StringFieldUpdateOperationsInput | string
    job_id?: IntFieldUpdateOperationsInput | number
    machine?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    cache_files?: cache_filesUncheckedUpdateManyWithoutSchedule_job_logNestedInput
    output_files?: output_filesUncheckedUpdateManyWithoutSchedule_job_logNestedInput
  }

  export type proxy_jobCreateManyProxyInput = {
    id?: number
    job_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type proxy_jobUpdateWithoutProxyInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    schedule_job?: schedule_jobUpdateOneRequiredWithoutProxiesNestedInput
  }

  export type proxy_jobUncheckedUpdateWithoutProxyInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type proxy_jobUncheckedUpdateManyWithoutProxyInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type schedule_job_logCreateManySchedule_jobInput = {
    job_log_id: string
    machine?: string | null
    start_time: Date | string
    end_time?: Date | string | null
    result?: string | null
    error?: string | null
  }

  export type proxy_jobCreateManySchedule_jobInput = {
    id?: number
    proxy_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type schedule_job_logUpdateWithoutSchedule_jobInput = {
    job_log_id?: StringFieldUpdateOperationsInput | string
    machine?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    cache_files?: cache_filesUpdateManyWithoutSchedule_job_logNestedInput
    output_files?: output_filesUpdateManyWithoutSchedule_job_logNestedInput
    events?: job_event_logUpdateManyWithoutSchedule_job_logNestedInput
  }

  export type schedule_job_logUncheckedUpdateWithoutSchedule_jobInput = {
    job_log_id?: StringFieldUpdateOperationsInput | string
    machine?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    cache_files?: cache_filesUncheckedUpdateManyWithoutSchedule_job_logNestedInput
    output_files?: output_filesUncheckedUpdateManyWithoutSchedule_job_logNestedInput
    events?: job_event_logUncheckedUpdateManyWithoutSchedule_job_logNestedInput
  }

  export type schedule_job_logUncheckedUpdateManyWithoutSchedule_jobInput = {
    job_log_id?: StringFieldUpdateOperationsInput | string
    machine?: NullableStringFieldUpdateOperationsInput | string | null
    start_time?: DateTimeFieldUpdateOperationsInput | Date | string
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    result?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type proxy_jobUpdateWithoutSchedule_jobInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    proxy?: proxyUpdateOneRequiredWithoutJobsNestedInput
  }

  export type proxy_jobUncheckedUpdateWithoutSchedule_jobInput = {
    id?: IntFieldUpdateOperationsInput | number
    proxy_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type proxy_jobUncheckedUpdateManyWithoutSchedule_jobInput = {
    id?: IntFieldUpdateOperationsInput | number
    proxy_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cache_filesCreateManySchedule_job_logInput = {
    id?: number
    created_at?: Date | string
    updated_at?: Date | string
    file_name: string
    file_tags?: string | null
    file_path: string
    file_size: bigint | number
    time_to_live: bigint | number
    file_type: string
    last_downloaded?: Date | string | null
  }

  export type output_filesCreateManySchedule_job_logInput = {
    id?: number
    created_at?: Date | string
    updated_at?: Date | string
    file_name: string
    file_tags?: string | null
    file_path: string
    file_size: bigint | number
    file_type: string
    last_downloaded?: Date | string | null
  }

  export type job_event_logCreateManySchedule_job_logInput = {
    id?: number
    event: string
    event_message: string
    type: string
    created_at?: Date | string
    handled_on?: Date | string | null
  }

  export type cache_filesUpdateWithoutSchedule_job_logInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_name?: StringFieldUpdateOperationsInput | string
    file_tags?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    time_to_live?: BigIntFieldUpdateOperationsInput | bigint | number
    file_type?: StringFieldUpdateOperationsInput | string
    last_downloaded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type cache_filesUncheckedUpdateWithoutSchedule_job_logInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_name?: StringFieldUpdateOperationsInput | string
    file_tags?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    time_to_live?: BigIntFieldUpdateOperationsInput | bigint | number
    file_type?: StringFieldUpdateOperationsInput | string
    last_downloaded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type cache_filesUncheckedUpdateManyWithoutSchedule_job_logInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_name?: StringFieldUpdateOperationsInput | string
    file_tags?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    time_to_live?: BigIntFieldUpdateOperationsInput | bigint | number
    file_type?: StringFieldUpdateOperationsInput | string
    last_downloaded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type output_filesUpdateWithoutSchedule_job_logInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_name?: StringFieldUpdateOperationsInput | string
    file_tags?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    file_type?: StringFieldUpdateOperationsInput | string
    last_downloaded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type output_filesUncheckedUpdateWithoutSchedule_job_logInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_name?: StringFieldUpdateOperationsInput | string
    file_tags?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    file_type?: StringFieldUpdateOperationsInput | string
    last_downloaded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type output_filesUncheckedUpdateManyWithoutSchedule_job_logInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    file_name?: StringFieldUpdateOperationsInput | string
    file_tags?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: BigIntFieldUpdateOperationsInput | bigint | number
    file_type?: StringFieldUpdateOperationsInput | string
    last_downloaded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type job_event_logUpdateWithoutSchedule_job_logInput = {
    event?: StringFieldUpdateOperationsInput | string
    event_message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    handled_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type job_event_logUncheckedUpdateWithoutSchedule_job_logInput = {
    id?: IntFieldUpdateOperationsInput | number
    event?: StringFieldUpdateOperationsInput | string
    event_message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    handled_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type job_event_logUncheckedUpdateManyWithoutSchedule_job_logInput = {
    id?: IntFieldUpdateOperationsInput | number
    event?: StringFieldUpdateOperationsInput | string
    event_message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    handled_on?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}