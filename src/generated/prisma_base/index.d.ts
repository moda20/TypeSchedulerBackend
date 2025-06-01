
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
 * Model user
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>
/**
 * Model appConfig
 * 
 */
export type appConfig = $Result.DefaultSelection<Prisma.$appConfigPayload>
/**
 * Model appConfigAudit
 * 
 */
export type appConfigAudit = $Result.DefaultSelection<Prisma.$appConfigAuditPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appConfig`: Exposes CRUD operations for the **appConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppConfigs
    * const appConfigs = await prisma.appConfig.findMany()
    * ```
    */
  get appConfig(): Prisma.appConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appConfigAudit`: Exposes CRUD operations for the **appConfigAudit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppConfigAudits
    * const appConfigAudits = await prisma.appConfigAudit.findMany()
    * ```
    */
  get appConfigAudit(): Prisma.appConfigAuditDelegate<ExtArgs, ClientOptions>;
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
    user: 'user',
    appConfig: 'appConfig',
    appConfigAudit: 'appConfigAudit'
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
      modelProps: "user" | "appConfig" | "appConfigAudit"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      appConfig: {
        payload: Prisma.$appConfigPayload<ExtArgs>
        fields: Prisma.appConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.appConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.appConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigPayload>
          }
          findFirst: {
            args: Prisma.appConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.appConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigPayload>
          }
          findMany: {
            args: Prisma.appConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigPayload>[]
          }
          create: {
            args: Prisma.appConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigPayload>
          }
          createMany: {
            args: Prisma.appConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.appConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigPayload>
          }
          update: {
            args: Prisma.appConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigPayload>
          }
          deleteMany: {
            args: Prisma.appConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.appConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.appConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigPayload>
          }
          aggregate: {
            args: Prisma.AppConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppConfig>
          }
          groupBy: {
            args: Prisma.appConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.appConfigCountArgs<ExtArgs>
            result: $Utils.Optional<AppConfigCountAggregateOutputType> | number
          }
        }
      }
      appConfigAudit: {
        payload: Prisma.$appConfigAuditPayload<ExtArgs>
        fields: Prisma.appConfigAuditFieldRefs
        operations: {
          findUnique: {
            args: Prisma.appConfigAuditFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigAuditPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.appConfigAuditFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigAuditPayload>
          }
          findFirst: {
            args: Prisma.appConfigAuditFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigAuditPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.appConfigAuditFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigAuditPayload>
          }
          findMany: {
            args: Prisma.appConfigAuditFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigAuditPayload>[]
          }
          create: {
            args: Prisma.appConfigAuditCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigAuditPayload>
          }
          createMany: {
            args: Prisma.appConfigAuditCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.appConfigAuditDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigAuditPayload>
          }
          update: {
            args: Prisma.appConfigAuditUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigAuditPayload>
          }
          deleteMany: {
            args: Prisma.appConfigAuditDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.appConfigAuditUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.appConfigAuditUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$appConfigAuditPayload>
          }
          aggregate: {
            args: Prisma.AppConfigAuditAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppConfigAudit>
          }
          groupBy: {
            args: Prisma.appConfigAuditGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppConfigAuditGroupByOutputType>[]
          }
          count: {
            args: Prisma.appConfigAuditCountArgs<ExtArgs>
            result: $Utils.Optional<AppConfigAuditCountAggregateOutputType> | number
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
    user?: userOmit
    appConfig?: appConfigOmit
    appConfigAudit?: appConfigAuditOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    configChanges: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    configChanges?: boolean | UserCountOutputTypeCountConfigChangesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConfigChangesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: appConfigAuditWhereInput
  }


  /**
   * Count Type AppConfigCountOutputType
   */

  export type AppConfigCountOutputType = {
    appConfigAudit: number
  }

  export type AppConfigCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appConfigAudit?: boolean | AppConfigCountOutputTypeCountAppConfigAuditArgs
  }

  // Custom InputTypes
  /**
   * AppConfigCountOutputType without action
   */
  export type AppConfigCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfigCountOutputType
     */
    select?: AppConfigCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AppConfigCountOutputType without action
   */
  export type AppConfigCountOutputTypeCountAppConfigAuditArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: appConfigAuditWhereInput
  }


  /**
   * Models
   */

  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    created_at: Date | null
    updated_at: Date | null
    username: string | null
    password: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    created_at: Date | null
    updated_at: Date | null
    username: string | null
    password: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    created_at: number
    updated_at: number
    username: number
    password: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    created_at?: true
    updated_at?: true
    username?: true
    password?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    created_at?: true
    updated_at?: true
    username?: true
    password?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    created_at?: true
    updated_at?: true
    username?: true
    password?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    created_at: Date
    updated_at: Date
    username: string
    password: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    created_at?: boolean
    updated_at?: boolean
    username?: boolean
    password?: boolean
    configChanges?: boolean | user$configChangesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type userSelectScalar = {
    id?: boolean
    email?: boolean
    created_at?: boolean
    updated_at?: boolean
    username?: boolean
    password?: boolean
  }

  export type userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "created_at" | "updated_at" | "username" | "password", ExtArgs["result"]["user"]>
  export type userInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    configChanges?: boolean | user$configChangesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {
      configChanges: Prisma.$appConfigAuditPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      created_at: Date
      updated_at: Date
      username: string
      password: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
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
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    configChanges<T extends user$configChangesArgs<ExtArgs> = {}>(args?: Subset<T, user$configChangesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$appConfigAuditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the user model
   */ 
  interface userFieldRefs {
    readonly id: FieldRef<"user", 'Int'>
    readonly email: FieldRef<"user", 'String'>
    readonly created_at: FieldRef<"user", 'DateTime'>
    readonly updated_at: FieldRef<"user", 'DateTime'>
    readonly username: FieldRef<"user", 'String'>
    readonly password: FieldRef<"user", 'String'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * user.configChanges
   */
  export type user$configChangesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfigAudit
     */
    select?: appConfigAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfigAudit
     */
    omit?: appConfigAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigAuditInclude<ExtArgs> | null
    where?: appConfigAuditWhereInput
    orderBy?: appConfigAuditOrderByWithRelationInput | appConfigAuditOrderByWithRelationInput[]
    cursor?: appConfigAuditWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppConfigAuditScalarFieldEnum | AppConfigAuditScalarFieldEnum[]
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
  }


  /**
   * Model appConfig
   */

  export type AggregateAppConfig = {
    _count: AppConfigCountAggregateOutputType | null
    _avg: AppConfigAvgAggregateOutputType | null
    _sum: AppConfigSumAggregateOutputType | null
    _min: AppConfigMinAggregateOutputType | null
    _max: AppConfigMaxAggregateOutputType | null
  }

  export type AppConfigAvgAggregateOutputType = {
    id: number | null
  }

  export type AppConfigSumAggregateOutputType = {
    id: number | null
  }

  export type AppConfigMinAggregateOutputType = {
    id: number | null
    key: string | null
    value: string | null
    is_encrypted: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AppConfigMaxAggregateOutputType = {
    id: number | null
    key: string | null
    value: string | null
    is_encrypted: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AppConfigCountAggregateOutputType = {
    id: number
    key: number
    value: number
    is_encrypted: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AppConfigAvgAggregateInputType = {
    id?: true
  }

  export type AppConfigSumAggregateInputType = {
    id?: true
  }

  export type AppConfigMinAggregateInputType = {
    id?: true
    key?: true
    value?: true
    is_encrypted?: true
    created_at?: true
    updated_at?: true
  }

  export type AppConfigMaxAggregateInputType = {
    id?: true
    key?: true
    value?: true
    is_encrypted?: true
    created_at?: true
    updated_at?: true
  }

  export type AppConfigCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    is_encrypted?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AppConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which appConfig to aggregate.
     */
    where?: appConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of appConfigs to fetch.
     */
    orderBy?: appConfigOrderByWithRelationInput | appConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: appConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` appConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` appConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned appConfigs
    **/
    _count?: true | AppConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppConfigMaxAggregateInputType
  }

  export type GetAppConfigAggregateType<T extends AppConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateAppConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppConfig[P]>
      : GetScalarType<T[P], AggregateAppConfig[P]>
  }




  export type appConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: appConfigWhereInput
    orderBy?: appConfigOrderByWithAggregationInput | appConfigOrderByWithAggregationInput[]
    by: AppConfigScalarFieldEnum[] | AppConfigScalarFieldEnum
    having?: appConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppConfigCountAggregateInputType | true
    _avg?: AppConfigAvgAggregateInputType
    _sum?: AppConfigSumAggregateInputType
    _min?: AppConfigMinAggregateInputType
    _max?: AppConfigMaxAggregateInputType
  }

  export type AppConfigGroupByOutputType = {
    id: number
    key: string
    value: string | null
    is_encrypted: boolean
    created_at: Date
    updated_at: Date
    _count: AppConfigCountAggregateOutputType | null
    _avg: AppConfigAvgAggregateOutputType | null
    _sum: AppConfigSumAggregateOutputType | null
    _min: AppConfigMinAggregateOutputType | null
    _max: AppConfigMaxAggregateOutputType | null
  }

  type GetAppConfigGroupByPayload<T extends appConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppConfigGroupByOutputType[P]>
            : GetScalarType<T[P], AppConfigGroupByOutputType[P]>
        }
      >
    >


  export type appConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    is_encrypted?: boolean
    created_at?: boolean
    updated_at?: boolean
    appConfigAudit?: boolean | appConfig$appConfigAuditArgs<ExtArgs>
    _count?: boolean | AppConfigCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appConfig"]>



  export type appConfigSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    is_encrypted?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type appConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "value" | "is_encrypted" | "created_at" | "updated_at", ExtArgs["result"]["appConfig"]>
  export type appConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appConfigAudit?: boolean | appConfig$appConfigAuditArgs<ExtArgs>
    _count?: boolean | AppConfigCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $appConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "appConfig"
    objects: {
      appConfigAudit: Prisma.$appConfigAuditPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      key: string
      value: string | null
      is_encrypted: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["appConfig"]>
    composites: {}
  }

  type appConfigGetPayload<S extends boolean | null | undefined | appConfigDefaultArgs> = $Result.GetResult<Prisma.$appConfigPayload, S>

  type appConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<appConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppConfigCountAggregateInputType | true
    }

  export interface appConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['appConfig'], meta: { name: 'appConfig' } }
    /**
     * Find zero or one AppConfig that matches the filter.
     * @param {appConfigFindUniqueArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends appConfigFindUniqueArgs>(args: SelectSubset<T, appConfigFindUniqueArgs<ExtArgs>>): Prisma__appConfigClient<$Result.GetResult<Prisma.$appConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AppConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {appConfigFindUniqueOrThrowArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends appConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, appConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__appConfigClient<$Result.GetResult<Prisma.$appConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appConfigFindFirstArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends appConfigFindFirstArgs>(args?: SelectSubset<T, appConfigFindFirstArgs<ExtArgs>>): Prisma__appConfigClient<$Result.GetResult<Prisma.$appConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appConfigFindFirstOrThrowArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends appConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, appConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__appConfigClient<$Result.GetResult<Prisma.$appConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AppConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppConfigs
     * const appConfigs = await prisma.appConfig.findMany()
     * 
     * // Get first 10 AppConfigs
     * const appConfigs = await prisma.appConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appConfigWithIdOnly = await prisma.appConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends appConfigFindManyArgs>(args?: SelectSubset<T, appConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$appConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AppConfig.
     * @param {appConfigCreateArgs} args - Arguments to create a AppConfig.
     * @example
     * // Create one AppConfig
     * const AppConfig = await prisma.appConfig.create({
     *   data: {
     *     // ... data to create a AppConfig
     *   }
     * })
     * 
     */
    create<T extends appConfigCreateArgs>(args: SelectSubset<T, appConfigCreateArgs<ExtArgs>>): Prisma__appConfigClient<$Result.GetResult<Prisma.$appConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AppConfigs.
     * @param {appConfigCreateManyArgs} args - Arguments to create many AppConfigs.
     * @example
     * // Create many AppConfigs
     * const appConfig = await prisma.appConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends appConfigCreateManyArgs>(args?: SelectSubset<T, appConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AppConfig.
     * @param {appConfigDeleteArgs} args - Arguments to delete one AppConfig.
     * @example
     * // Delete one AppConfig
     * const AppConfig = await prisma.appConfig.delete({
     *   where: {
     *     // ... filter to delete one AppConfig
     *   }
     * })
     * 
     */
    delete<T extends appConfigDeleteArgs>(args: SelectSubset<T, appConfigDeleteArgs<ExtArgs>>): Prisma__appConfigClient<$Result.GetResult<Prisma.$appConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AppConfig.
     * @param {appConfigUpdateArgs} args - Arguments to update one AppConfig.
     * @example
     * // Update one AppConfig
     * const appConfig = await prisma.appConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends appConfigUpdateArgs>(args: SelectSubset<T, appConfigUpdateArgs<ExtArgs>>): Prisma__appConfigClient<$Result.GetResult<Prisma.$appConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AppConfigs.
     * @param {appConfigDeleteManyArgs} args - Arguments to filter AppConfigs to delete.
     * @example
     * // Delete a few AppConfigs
     * const { count } = await prisma.appConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends appConfigDeleteManyArgs>(args?: SelectSubset<T, appConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppConfigs
     * const appConfig = await prisma.appConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends appConfigUpdateManyArgs>(args: SelectSubset<T, appConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AppConfig.
     * @param {appConfigUpsertArgs} args - Arguments to update or create a AppConfig.
     * @example
     * // Update or create a AppConfig
     * const appConfig = await prisma.appConfig.upsert({
     *   create: {
     *     // ... data to create a AppConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppConfig we want to update
     *   }
     * })
     */
    upsert<T extends appConfigUpsertArgs>(args: SelectSubset<T, appConfigUpsertArgs<ExtArgs>>): Prisma__appConfigClient<$Result.GetResult<Prisma.$appConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AppConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appConfigCountArgs} args - Arguments to filter AppConfigs to count.
     * @example
     * // Count the number of AppConfigs
     * const count = await prisma.appConfig.count({
     *   where: {
     *     // ... the filter for the AppConfigs we want to count
     *   }
     * })
    **/
    count<T extends appConfigCountArgs>(
      args?: Subset<T, appConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AppConfigAggregateArgs>(args: Subset<T, AppConfigAggregateArgs>): Prisma.PrismaPromise<GetAppConfigAggregateType<T>>

    /**
     * Group by AppConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appConfigGroupByArgs} args - Group by arguments.
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
      T extends appConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: appConfigGroupByArgs['orderBy'] }
        : { orderBy?: appConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, appConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the appConfig model
   */
  readonly fields: appConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for appConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__appConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    appConfigAudit<T extends appConfig$appConfigAuditArgs<ExtArgs> = {}>(args?: Subset<T, appConfig$appConfigAuditArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$appConfigAuditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the appConfig model
   */ 
  interface appConfigFieldRefs {
    readonly id: FieldRef<"appConfig", 'Int'>
    readonly key: FieldRef<"appConfig", 'String'>
    readonly value: FieldRef<"appConfig", 'String'>
    readonly is_encrypted: FieldRef<"appConfig", 'Boolean'>
    readonly created_at: FieldRef<"appConfig", 'DateTime'>
    readonly updated_at: FieldRef<"appConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * appConfig findUnique
   */
  export type appConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfig
     */
    select?: appConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfig
     */
    omit?: appConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigInclude<ExtArgs> | null
    /**
     * Filter, which appConfig to fetch.
     */
    where: appConfigWhereUniqueInput
  }

  /**
   * appConfig findUniqueOrThrow
   */
  export type appConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfig
     */
    select?: appConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfig
     */
    omit?: appConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigInclude<ExtArgs> | null
    /**
     * Filter, which appConfig to fetch.
     */
    where: appConfigWhereUniqueInput
  }

  /**
   * appConfig findFirst
   */
  export type appConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfig
     */
    select?: appConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfig
     */
    omit?: appConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigInclude<ExtArgs> | null
    /**
     * Filter, which appConfig to fetch.
     */
    where?: appConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of appConfigs to fetch.
     */
    orderBy?: appConfigOrderByWithRelationInput | appConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for appConfigs.
     */
    cursor?: appConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` appConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` appConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of appConfigs.
     */
    distinct?: AppConfigScalarFieldEnum | AppConfigScalarFieldEnum[]
  }

  /**
   * appConfig findFirstOrThrow
   */
  export type appConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfig
     */
    select?: appConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfig
     */
    omit?: appConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigInclude<ExtArgs> | null
    /**
     * Filter, which appConfig to fetch.
     */
    where?: appConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of appConfigs to fetch.
     */
    orderBy?: appConfigOrderByWithRelationInput | appConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for appConfigs.
     */
    cursor?: appConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` appConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` appConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of appConfigs.
     */
    distinct?: AppConfigScalarFieldEnum | AppConfigScalarFieldEnum[]
  }

  /**
   * appConfig findMany
   */
  export type appConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfig
     */
    select?: appConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfig
     */
    omit?: appConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigInclude<ExtArgs> | null
    /**
     * Filter, which appConfigs to fetch.
     */
    where?: appConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of appConfigs to fetch.
     */
    orderBy?: appConfigOrderByWithRelationInput | appConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing appConfigs.
     */
    cursor?: appConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` appConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` appConfigs.
     */
    skip?: number
    distinct?: AppConfigScalarFieldEnum | AppConfigScalarFieldEnum[]
  }

  /**
   * appConfig create
   */
  export type appConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfig
     */
    select?: appConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfig
     */
    omit?: appConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a appConfig.
     */
    data: XOR<appConfigCreateInput, appConfigUncheckedCreateInput>
  }

  /**
   * appConfig createMany
   */
  export type appConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many appConfigs.
     */
    data: appConfigCreateManyInput | appConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * appConfig update
   */
  export type appConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfig
     */
    select?: appConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfig
     */
    omit?: appConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a appConfig.
     */
    data: XOR<appConfigUpdateInput, appConfigUncheckedUpdateInput>
    /**
     * Choose, which appConfig to update.
     */
    where: appConfigWhereUniqueInput
  }

  /**
   * appConfig updateMany
   */
  export type appConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update appConfigs.
     */
    data: XOR<appConfigUpdateManyMutationInput, appConfigUncheckedUpdateManyInput>
    /**
     * Filter which appConfigs to update
     */
    where?: appConfigWhereInput
    /**
     * Limit how many appConfigs to update.
     */
    limit?: number
  }

  /**
   * appConfig upsert
   */
  export type appConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfig
     */
    select?: appConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfig
     */
    omit?: appConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the appConfig to update in case it exists.
     */
    where: appConfigWhereUniqueInput
    /**
     * In case the appConfig found by the `where` argument doesn't exist, create a new appConfig with this data.
     */
    create: XOR<appConfigCreateInput, appConfigUncheckedCreateInput>
    /**
     * In case the appConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<appConfigUpdateInput, appConfigUncheckedUpdateInput>
  }

  /**
   * appConfig delete
   */
  export type appConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfig
     */
    select?: appConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfig
     */
    omit?: appConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigInclude<ExtArgs> | null
    /**
     * Filter which appConfig to delete.
     */
    where: appConfigWhereUniqueInput
  }

  /**
   * appConfig deleteMany
   */
  export type appConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which appConfigs to delete
     */
    where?: appConfigWhereInput
    /**
     * Limit how many appConfigs to delete.
     */
    limit?: number
  }

  /**
   * appConfig.appConfigAudit
   */
  export type appConfig$appConfigAuditArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfigAudit
     */
    select?: appConfigAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfigAudit
     */
    omit?: appConfigAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigAuditInclude<ExtArgs> | null
    where?: appConfigAuditWhereInput
    orderBy?: appConfigAuditOrderByWithRelationInput | appConfigAuditOrderByWithRelationInput[]
    cursor?: appConfigAuditWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppConfigAuditScalarFieldEnum | AppConfigAuditScalarFieldEnum[]
  }

  /**
   * appConfig without action
   */
  export type appConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfig
     */
    select?: appConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfig
     */
    omit?: appConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigInclude<ExtArgs> | null
  }


  /**
   * Model appConfigAudit
   */

  export type AggregateAppConfigAudit = {
    _count: AppConfigAuditCountAggregateOutputType | null
    _avg: AppConfigAuditAvgAggregateOutputType | null
    _sum: AppConfigAuditSumAggregateOutputType | null
    _min: AppConfigAuditMinAggregateOutputType | null
    _max: AppConfigAuditMaxAggregateOutputType | null
  }

  export type AppConfigAuditAvgAggregateOutputType = {
    id: number | null
    configId: number | null
    changedUserId: number | null
  }

  export type AppConfigAuditSumAggregateOutputType = {
    id: number | null
    configId: number | null
    changedUserId: number | null
  }

  export type AppConfigAuditMinAggregateOutputType = {
    id: number | null
    configId: number | null
    oldValue: string | null
    newValue: string | null
    changedUserId: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AppConfigAuditMaxAggregateOutputType = {
    id: number | null
    configId: number | null
    oldValue: string | null
    newValue: string | null
    changedUserId: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AppConfigAuditCountAggregateOutputType = {
    id: number
    configId: number
    oldValue: number
    newValue: number
    changedUserId: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AppConfigAuditAvgAggregateInputType = {
    id?: true
    configId?: true
    changedUserId?: true
  }

  export type AppConfigAuditSumAggregateInputType = {
    id?: true
    configId?: true
    changedUserId?: true
  }

  export type AppConfigAuditMinAggregateInputType = {
    id?: true
    configId?: true
    oldValue?: true
    newValue?: true
    changedUserId?: true
    created_at?: true
    updated_at?: true
  }

  export type AppConfigAuditMaxAggregateInputType = {
    id?: true
    configId?: true
    oldValue?: true
    newValue?: true
    changedUserId?: true
    created_at?: true
    updated_at?: true
  }

  export type AppConfigAuditCountAggregateInputType = {
    id?: true
    configId?: true
    oldValue?: true
    newValue?: true
    changedUserId?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AppConfigAuditAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which appConfigAudit to aggregate.
     */
    where?: appConfigAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of appConfigAudits to fetch.
     */
    orderBy?: appConfigAuditOrderByWithRelationInput | appConfigAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: appConfigAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` appConfigAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` appConfigAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned appConfigAudits
    **/
    _count?: true | AppConfigAuditCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppConfigAuditAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppConfigAuditSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppConfigAuditMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppConfigAuditMaxAggregateInputType
  }

  export type GetAppConfigAuditAggregateType<T extends AppConfigAuditAggregateArgs> = {
        [P in keyof T & keyof AggregateAppConfigAudit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppConfigAudit[P]>
      : GetScalarType<T[P], AggregateAppConfigAudit[P]>
  }




  export type appConfigAuditGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: appConfigAuditWhereInput
    orderBy?: appConfigAuditOrderByWithAggregationInput | appConfigAuditOrderByWithAggregationInput[]
    by: AppConfigAuditScalarFieldEnum[] | AppConfigAuditScalarFieldEnum
    having?: appConfigAuditScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppConfigAuditCountAggregateInputType | true
    _avg?: AppConfigAuditAvgAggregateInputType
    _sum?: AppConfigAuditSumAggregateInputType
    _min?: AppConfigAuditMinAggregateInputType
    _max?: AppConfigAuditMaxAggregateInputType
  }

  export type AppConfigAuditGroupByOutputType = {
    id: number
    configId: number | null
    oldValue: string | null
    newValue: string | null
    changedUserId: number
    created_at: Date
    updated_at: Date
    _count: AppConfigAuditCountAggregateOutputType | null
    _avg: AppConfigAuditAvgAggregateOutputType | null
    _sum: AppConfigAuditSumAggregateOutputType | null
    _min: AppConfigAuditMinAggregateOutputType | null
    _max: AppConfigAuditMaxAggregateOutputType | null
  }

  type GetAppConfigAuditGroupByPayload<T extends appConfigAuditGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppConfigAuditGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppConfigAuditGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppConfigAuditGroupByOutputType[P]>
            : GetScalarType<T[P], AppConfigAuditGroupByOutputType[P]>
        }
      >
    >


  export type appConfigAuditSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    configId?: boolean
    oldValue?: boolean
    newValue?: boolean
    changedUserId?: boolean
    created_at?: boolean
    updated_at?: boolean
    config?: boolean | appConfigAudit$configArgs<ExtArgs>
    changedBy?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appConfigAudit"]>



  export type appConfigAuditSelectScalar = {
    id?: boolean
    configId?: boolean
    oldValue?: boolean
    newValue?: boolean
    changedUserId?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type appConfigAuditOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "configId" | "oldValue" | "newValue" | "changedUserId" | "created_at" | "updated_at", ExtArgs["result"]["appConfigAudit"]>
  export type appConfigAuditInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    config?: boolean | appConfigAudit$configArgs<ExtArgs>
    changedBy?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $appConfigAuditPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "appConfigAudit"
    objects: {
      config: Prisma.$appConfigPayload<ExtArgs> | null
      changedBy: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      configId: number | null
      oldValue: string | null
      newValue: string | null
      changedUserId: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["appConfigAudit"]>
    composites: {}
  }

  type appConfigAuditGetPayload<S extends boolean | null | undefined | appConfigAuditDefaultArgs> = $Result.GetResult<Prisma.$appConfigAuditPayload, S>

  type appConfigAuditCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<appConfigAuditFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppConfigAuditCountAggregateInputType | true
    }

  export interface appConfigAuditDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['appConfigAudit'], meta: { name: 'appConfigAudit' } }
    /**
     * Find zero or one AppConfigAudit that matches the filter.
     * @param {appConfigAuditFindUniqueArgs} args - Arguments to find a AppConfigAudit
     * @example
     * // Get one AppConfigAudit
     * const appConfigAudit = await prisma.appConfigAudit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends appConfigAuditFindUniqueArgs>(args: SelectSubset<T, appConfigAuditFindUniqueArgs<ExtArgs>>): Prisma__appConfigAuditClient<$Result.GetResult<Prisma.$appConfigAuditPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AppConfigAudit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {appConfigAuditFindUniqueOrThrowArgs} args - Arguments to find a AppConfigAudit
     * @example
     * // Get one AppConfigAudit
     * const appConfigAudit = await prisma.appConfigAudit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends appConfigAuditFindUniqueOrThrowArgs>(args: SelectSubset<T, appConfigAuditFindUniqueOrThrowArgs<ExtArgs>>): Prisma__appConfigAuditClient<$Result.GetResult<Prisma.$appConfigAuditPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppConfigAudit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appConfigAuditFindFirstArgs} args - Arguments to find a AppConfigAudit
     * @example
     * // Get one AppConfigAudit
     * const appConfigAudit = await prisma.appConfigAudit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends appConfigAuditFindFirstArgs>(args?: SelectSubset<T, appConfigAuditFindFirstArgs<ExtArgs>>): Prisma__appConfigAuditClient<$Result.GetResult<Prisma.$appConfigAuditPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppConfigAudit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appConfigAuditFindFirstOrThrowArgs} args - Arguments to find a AppConfigAudit
     * @example
     * // Get one AppConfigAudit
     * const appConfigAudit = await prisma.appConfigAudit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends appConfigAuditFindFirstOrThrowArgs>(args?: SelectSubset<T, appConfigAuditFindFirstOrThrowArgs<ExtArgs>>): Prisma__appConfigAuditClient<$Result.GetResult<Prisma.$appConfigAuditPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AppConfigAudits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appConfigAuditFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppConfigAudits
     * const appConfigAudits = await prisma.appConfigAudit.findMany()
     * 
     * // Get first 10 AppConfigAudits
     * const appConfigAudits = await prisma.appConfigAudit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appConfigAuditWithIdOnly = await prisma.appConfigAudit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends appConfigAuditFindManyArgs>(args?: SelectSubset<T, appConfigAuditFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$appConfigAuditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AppConfigAudit.
     * @param {appConfigAuditCreateArgs} args - Arguments to create a AppConfigAudit.
     * @example
     * // Create one AppConfigAudit
     * const AppConfigAudit = await prisma.appConfigAudit.create({
     *   data: {
     *     // ... data to create a AppConfigAudit
     *   }
     * })
     * 
     */
    create<T extends appConfigAuditCreateArgs>(args: SelectSubset<T, appConfigAuditCreateArgs<ExtArgs>>): Prisma__appConfigAuditClient<$Result.GetResult<Prisma.$appConfigAuditPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AppConfigAudits.
     * @param {appConfigAuditCreateManyArgs} args - Arguments to create many AppConfigAudits.
     * @example
     * // Create many AppConfigAudits
     * const appConfigAudit = await prisma.appConfigAudit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends appConfigAuditCreateManyArgs>(args?: SelectSubset<T, appConfigAuditCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AppConfigAudit.
     * @param {appConfigAuditDeleteArgs} args - Arguments to delete one AppConfigAudit.
     * @example
     * // Delete one AppConfigAudit
     * const AppConfigAudit = await prisma.appConfigAudit.delete({
     *   where: {
     *     // ... filter to delete one AppConfigAudit
     *   }
     * })
     * 
     */
    delete<T extends appConfigAuditDeleteArgs>(args: SelectSubset<T, appConfigAuditDeleteArgs<ExtArgs>>): Prisma__appConfigAuditClient<$Result.GetResult<Prisma.$appConfigAuditPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AppConfigAudit.
     * @param {appConfigAuditUpdateArgs} args - Arguments to update one AppConfigAudit.
     * @example
     * // Update one AppConfigAudit
     * const appConfigAudit = await prisma.appConfigAudit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends appConfigAuditUpdateArgs>(args: SelectSubset<T, appConfigAuditUpdateArgs<ExtArgs>>): Prisma__appConfigAuditClient<$Result.GetResult<Prisma.$appConfigAuditPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AppConfigAudits.
     * @param {appConfigAuditDeleteManyArgs} args - Arguments to filter AppConfigAudits to delete.
     * @example
     * // Delete a few AppConfigAudits
     * const { count } = await prisma.appConfigAudit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends appConfigAuditDeleteManyArgs>(args?: SelectSubset<T, appConfigAuditDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppConfigAudits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appConfigAuditUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppConfigAudits
     * const appConfigAudit = await prisma.appConfigAudit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends appConfigAuditUpdateManyArgs>(args: SelectSubset<T, appConfigAuditUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AppConfigAudit.
     * @param {appConfigAuditUpsertArgs} args - Arguments to update or create a AppConfigAudit.
     * @example
     * // Update or create a AppConfigAudit
     * const appConfigAudit = await prisma.appConfigAudit.upsert({
     *   create: {
     *     // ... data to create a AppConfigAudit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppConfigAudit we want to update
     *   }
     * })
     */
    upsert<T extends appConfigAuditUpsertArgs>(args: SelectSubset<T, appConfigAuditUpsertArgs<ExtArgs>>): Prisma__appConfigAuditClient<$Result.GetResult<Prisma.$appConfigAuditPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AppConfigAudits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appConfigAuditCountArgs} args - Arguments to filter AppConfigAudits to count.
     * @example
     * // Count the number of AppConfigAudits
     * const count = await prisma.appConfigAudit.count({
     *   where: {
     *     // ... the filter for the AppConfigAudits we want to count
     *   }
     * })
    **/
    count<T extends appConfigAuditCountArgs>(
      args?: Subset<T, appConfigAuditCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppConfigAuditCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppConfigAudit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigAuditAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AppConfigAuditAggregateArgs>(args: Subset<T, AppConfigAuditAggregateArgs>): Prisma.PrismaPromise<GetAppConfigAuditAggregateType<T>>

    /**
     * Group by AppConfigAudit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {appConfigAuditGroupByArgs} args - Group by arguments.
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
      T extends appConfigAuditGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: appConfigAuditGroupByArgs['orderBy'] }
        : { orderBy?: appConfigAuditGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, appConfigAuditGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppConfigAuditGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the appConfigAudit model
   */
  readonly fields: appConfigAuditFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for appConfigAudit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__appConfigAuditClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    config<T extends appConfigAudit$configArgs<ExtArgs> = {}>(args?: Subset<T, appConfigAudit$configArgs<ExtArgs>>): Prisma__appConfigClient<$Result.GetResult<Prisma.$appConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    changedBy<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the appConfigAudit model
   */ 
  interface appConfigAuditFieldRefs {
    readonly id: FieldRef<"appConfigAudit", 'Int'>
    readonly configId: FieldRef<"appConfigAudit", 'Int'>
    readonly oldValue: FieldRef<"appConfigAudit", 'String'>
    readonly newValue: FieldRef<"appConfigAudit", 'String'>
    readonly changedUserId: FieldRef<"appConfigAudit", 'Int'>
    readonly created_at: FieldRef<"appConfigAudit", 'DateTime'>
    readonly updated_at: FieldRef<"appConfigAudit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * appConfigAudit findUnique
   */
  export type appConfigAuditFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfigAudit
     */
    select?: appConfigAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfigAudit
     */
    omit?: appConfigAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigAuditInclude<ExtArgs> | null
    /**
     * Filter, which appConfigAudit to fetch.
     */
    where: appConfigAuditWhereUniqueInput
  }

  /**
   * appConfigAudit findUniqueOrThrow
   */
  export type appConfigAuditFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfigAudit
     */
    select?: appConfigAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfigAudit
     */
    omit?: appConfigAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigAuditInclude<ExtArgs> | null
    /**
     * Filter, which appConfigAudit to fetch.
     */
    where: appConfigAuditWhereUniqueInput
  }

  /**
   * appConfigAudit findFirst
   */
  export type appConfigAuditFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfigAudit
     */
    select?: appConfigAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfigAudit
     */
    omit?: appConfigAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigAuditInclude<ExtArgs> | null
    /**
     * Filter, which appConfigAudit to fetch.
     */
    where?: appConfigAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of appConfigAudits to fetch.
     */
    orderBy?: appConfigAuditOrderByWithRelationInput | appConfigAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for appConfigAudits.
     */
    cursor?: appConfigAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` appConfigAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` appConfigAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of appConfigAudits.
     */
    distinct?: AppConfigAuditScalarFieldEnum | AppConfigAuditScalarFieldEnum[]
  }

  /**
   * appConfigAudit findFirstOrThrow
   */
  export type appConfigAuditFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfigAudit
     */
    select?: appConfigAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfigAudit
     */
    omit?: appConfigAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigAuditInclude<ExtArgs> | null
    /**
     * Filter, which appConfigAudit to fetch.
     */
    where?: appConfigAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of appConfigAudits to fetch.
     */
    orderBy?: appConfigAuditOrderByWithRelationInput | appConfigAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for appConfigAudits.
     */
    cursor?: appConfigAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` appConfigAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` appConfigAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of appConfigAudits.
     */
    distinct?: AppConfigAuditScalarFieldEnum | AppConfigAuditScalarFieldEnum[]
  }

  /**
   * appConfigAudit findMany
   */
  export type appConfigAuditFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfigAudit
     */
    select?: appConfigAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfigAudit
     */
    omit?: appConfigAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigAuditInclude<ExtArgs> | null
    /**
     * Filter, which appConfigAudits to fetch.
     */
    where?: appConfigAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of appConfigAudits to fetch.
     */
    orderBy?: appConfigAuditOrderByWithRelationInput | appConfigAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing appConfigAudits.
     */
    cursor?: appConfigAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` appConfigAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` appConfigAudits.
     */
    skip?: number
    distinct?: AppConfigAuditScalarFieldEnum | AppConfigAuditScalarFieldEnum[]
  }

  /**
   * appConfigAudit create
   */
  export type appConfigAuditCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfigAudit
     */
    select?: appConfigAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfigAudit
     */
    omit?: appConfigAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigAuditInclude<ExtArgs> | null
    /**
     * The data needed to create a appConfigAudit.
     */
    data: XOR<appConfigAuditCreateInput, appConfigAuditUncheckedCreateInput>
  }

  /**
   * appConfigAudit createMany
   */
  export type appConfigAuditCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many appConfigAudits.
     */
    data: appConfigAuditCreateManyInput | appConfigAuditCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * appConfigAudit update
   */
  export type appConfigAuditUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfigAudit
     */
    select?: appConfigAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfigAudit
     */
    omit?: appConfigAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigAuditInclude<ExtArgs> | null
    /**
     * The data needed to update a appConfigAudit.
     */
    data: XOR<appConfigAuditUpdateInput, appConfigAuditUncheckedUpdateInput>
    /**
     * Choose, which appConfigAudit to update.
     */
    where: appConfigAuditWhereUniqueInput
  }

  /**
   * appConfigAudit updateMany
   */
  export type appConfigAuditUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update appConfigAudits.
     */
    data: XOR<appConfigAuditUpdateManyMutationInput, appConfigAuditUncheckedUpdateManyInput>
    /**
     * Filter which appConfigAudits to update
     */
    where?: appConfigAuditWhereInput
    /**
     * Limit how many appConfigAudits to update.
     */
    limit?: number
  }

  /**
   * appConfigAudit upsert
   */
  export type appConfigAuditUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfigAudit
     */
    select?: appConfigAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfigAudit
     */
    omit?: appConfigAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigAuditInclude<ExtArgs> | null
    /**
     * The filter to search for the appConfigAudit to update in case it exists.
     */
    where: appConfigAuditWhereUniqueInput
    /**
     * In case the appConfigAudit found by the `where` argument doesn't exist, create a new appConfigAudit with this data.
     */
    create: XOR<appConfigAuditCreateInput, appConfigAuditUncheckedCreateInput>
    /**
     * In case the appConfigAudit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<appConfigAuditUpdateInput, appConfigAuditUncheckedUpdateInput>
  }

  /**
   * appConfigAudit delete
   */
  export type appConfigAuditDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfigAudit
     */
    select?: appConfigAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfigAudit
     */
    omit?: appConfigAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigAuditInclude<ExtArgs> | null
    /**
     * Filter which appConfigAudit to delete.
     */
    where: appConfigAuditWhereUniqueInput
  }

  /**
   * appConfigAudit deleteMany
   */
  export type appConfigAuditDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which appConfigAudits to delete
     */
    where?: appConfigAuditWhereInput
    /**
     * Limit how many appConfigAudits to delete.
     */
    limit?: number
  }

  /**
   * appConfigAudit.config
   */
  export type appConfigAudit$configArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfig
     */
    select?: appConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfig
     */
    omit?: appConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigInclude<ExtArgs> | null
    where?: appConfigWhereInput
  }

  /**
   * appConfigAudit without action
   */
  export type appConfigAuditDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the appConfigAudit
     */
    select?: appConfigAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the appConfigAudit
     */
    omit?: appConfigAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: appConfigAuditInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    created_at: 'created_at',
    updated_at: 'updated_at',
    username: 'username',
    password: 'password'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AppConfigScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    is_encrypted: 'is_encrypted',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AppConfigScalarFieldEnum = (typeof AppConfigScalarFieldEnum)[keyof typeof AppConfigScalarFieldEnum]


  export const AppConfigAuditScalarFieldEnum: {
    id: 'id',
    configId: 'configId',
    oldValue: 'oldValue',
    newValue: 'newValue',
    changedUserId: 'changedUserId',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AppConfigAuditScalarFieldEnum = (typeof AppConfigAuditScalarFieldEnum)[keyof typeof AppConfigAuditScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const userOrderByRelevanceFieldEnum: {
    email: 'email',
    username: 'username',
    password: 'password'
  };

  export type userOrderByRelevanceFieldEnum = (typeof userOrderByRelevanceFieldEnum)[keyof typeof userOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const appConfigOrderByRelevanceFieldEnum: {
    key: 'key',
    value: 'value'
  };

  export type appConfigOrderByRelevanceFieldEnum = (typeof appConfigOrderByRelevanceFieldEnum)[keyof typeof appConfigOrderByRelevanceFieldEnum]


  export const appConfigAuditOrderByRelevanceFieldEnum: {
    oldValue: 'oldValue',
    newValue: 'newValue'
  };

  export type appConfigAuditOrderByRelevanceFieldEnum = (typeof appConfigAuditOrderByRelevanceFieldEnum)[keyof typeof appConfigAuditOrderByRelevanceFieldEnum]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    id?: IntFilter<"user"> | number
    email?: StringFilter<"user"> | string
    created_at?: DateTimeFilter<"user"> | Date | string
    updated_at?: DateTimeFilter<"user"> | Date | string
    username?: StringFilter<"user"> | string
    password?: StringFilter<"user"> | string
    configChanges?: AppConfigAuditListRelationFilter
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    username?: SortOrder
    password?: SortOrder
    configChanges?: appConfigAuditOrderByRelationAggregateInput
    _relevance?: userOrderByRelevanceInput
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    created_at?: DateTimeFilter<"user"> | Date | string
    updated_at?: DateTimeFilter<"user"> | Date | string
    username?: StringFilter<"user"> | string
    password?: StringFilter<"user"> | string
    configChanges?: AppConfigAuditListRelationFilter
  }, "id" | "id" | "email">

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    username?: SortOrder
    password?: SortOrder
    _count?: userCountOrderByAggregateInput
    _avg?: userAvgOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
    _sum?: userSumOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"user"> | number
    email?: StringWithAggregatesFilter<"user"> | string
    created_at?: DateTimeWithAggregatesFilter<"user"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"user"> | Date | string
    username?: StringWithAggregatesFilter<"user"> | string
    password?: StringWithAggregatesFilter<"user"> | string
  }

  export type appConfigWhereInput = {
    AND?: appConfigWhereInput | appConfigWhereInput[]
    OR?: appConfigWhereInput[]
    NOT?: appConfigWhereInput | appConfigWhereInput[]
    id?: IntFilter<"appConfig"> | number
    key?: StringFilter<"appConfig"> | string
    value?: StringNullableFilter<"appConfig"> | string | null
    is_encrypted?: BoolFilter<"appConfig"> | boolean
    created_at?: DateTimeFilter<"appConfig"> | Date | string
    updated_at?: DateTimeFilter<"appConfig"> | Date | string
    appConfigAudit?: AppConfigAuditListRelationFilter
  }

  export type appConfigOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrderInput | SortOrder
    is_encrypted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    appConfigAudit?: appConfigAuditOrderByRelationAggregateInput
    _relevance?: appConfigOrderByRelevanceInput
  }

  export type appConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    key?: string
    AND?: appConfigWhereInput | appConfigWhereInput[]
    OR?: appConfigWhereInput[]
    NOT?: appConfigWhereInput | appConfigWhereInput[]
    value?: StringNullableFilter<"appConfig"> | string | null
    is_encrypted?: BoolFilter<"appConfig"> | boolean
    created_at?: DateTimeFilter<"appConfig"> | Date | string
    updated_at?: DateTimeFilter<"appConfig"> | Date | string
    appConfigAudit?: AppConfigAuditListRelationFilter
  }, "id" | "id" | "key">

  export type appConfigOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrderInput | SortOrder
    is_encrypted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: appConfigCountOrderByAggregateInput
    _avg?: appConfigAvgOrderByAggregateInput
    _max?: appConfigMaxOrderByAggregateInput
    _min?: appConfigMinOrderByAggregateInput
    _sum?: appConfigSumOrderByAggregateInput
  }

  export type appConfigScalarWhereWithAggregatesInput = {
    AND?: appConfigScalarWhereWithAggregatesInput | appConfigScalarWhereWithAggregatesInput[]
    OR?: appConfigScalarWhereWithAggregatesInput[]
    NOT?: appConfigScalarWhereWithAggregatesInput | appConfigScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"appConfig"> | number
    key?: StringWithAggregatesFilter<"appConfig"> | string
    value?: StringNullableWithAggregatesFilter<"appConfig"> | string | null
    is_encrypted?: BoolWithAggregatesFilter<"appConfig"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"appConfig"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"appConfig"> | Date | string
  }

  export type appConfigAuditWhereInput = {
    AND?: appConfigAuditWhereInput | appConfigAuditWhereInput[]
    OR?: appConfigAuditWhereInput[]
    NOT?: appConfigAuditWhereInput | appConfigAuditWhereInput[]
    id?: IntFilter<"appConfigAudit"> | number
    configId?: IntNullableFilter<"appConfigAudit"> | number | null
    oldValue?: StringNullableFilter<"appConfigAudit"> | string | null
    newValue?: StringNullableFilter<"appConfigAudit"> | string | null
    changedUserId?: IntFilter<"appConfigAudit"> | number
    created_at?: DateTimeFilter<"appConfigAudit"> | Date | string
    updated_at?: DateTimeFilter<"appConfigAudit"> | Date | string
    config?: XOR<AppConfigNullableScalarRelationFilter, appConfigWhereInput> | null
    changedBy?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type appConfigAuditOrderByWithRelationInput = {
    id?: SortOrder
    configId?: SortOrderInput | SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    changedUserId?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    config?: appConfigOrderByWithRelationInput
    changedBy?: userOrderByWithRelationInput
    _relevance?: appConfigAuditOrderByRelevanceInput
  }

  export type appConfigAuditWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: appConfigAuditWhereInput | appConfigAuditWhereInput[]
    OR?: appConfigAuditWhereInput[]
    NOT?: appConfigAuditWhereInput | appConfigAuditWhereInput[]
    configId?: IntNullableFilter<"appConfigAudit"> | number | null
    oldValue?: StringNullableFilter<"appConfigAudit"> | string | null
    newValue?: StringNullableFilter<"appConfigAudit"> | string | null
    changedUserId?: IntFilter<"appConfigAudit"> | number
    created_at?: DateTimeFilter<"appConfigAudit"> | Date | string
    updated_at?: DateTimeFilter<"appConfigAudit"> | Date | string
    config?: XOR<AppConfigNullableScalarRelationFilter, appConfigWhereInput> | null
    changedBy?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id" | "id">

  export type appConfigAuditOrderByWithAggregationInput = {
    id?: SortOrder
    configId?: SortOrderInput | SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    changedUserId?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: appConfigAuditCountOrderByAggregateInput
    _avg?: appConfigAuditAvgOrderByAggregateInput
    _max?: appConfigAuditMaxOrderByAggregateInput
    _min?: appConfigAuditMinOrderByAggregateInput
    _sum?: appConfigAuditSumOrderByAggregateInput
  }

  export type appConfigAuditScalarWhereWithAggregatesInput = {
    AND?: appConfigAuditScalarWhereWithAggregatesInput | appConfigAuditScalarWhereWithAggregatesInput[]
    OR?: appConfigAuditScalarWhereWithAggregatesInput[]
    NOT?: appConfigAuditScalarWhereWithAggregatesInput | appConfigAuditScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"appConfigAudit"> | number
    configId?: IntNullableWithAggregatesFilter<"appConfigAudit"> | number | null
    oldValue?: StringNullableWithAggregatesFilter<"appConfigAudit"> | string | null
    newValue?: StringNullableWithAggregatesFilter<"appConfigAudit"> | string | null
    changedUserId?: IntWithAggregatesFilter<"appConfigAudit"> | number
    created_at?: DateTimeWithAggregatesFilter<"appConfigAudit"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"appConfigAudit"> | Date | string
  }

  export type userCreateInput = {
    email: string
    created_at?: Date | string
    updated_at?: Date | string
    username: string
    password: string
    configChanges?: appConfigAuditCreateNestedManyWithoutChangedByInput
  }

  export type userUncheckedCreateInput = {
    id?: number
    email: string
    created_at?: Date | string
    updated_at?: Date | string
    username: string
    password: string
    configChanges?: appConfigAuditUncheckedCreateNestedManyWithoutChangedByInput
  }

  export type userUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    configChanges?: appConfigAuditUpdateManyWithoutChangedByNestedInput
  }

  export type userUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    configChanges?: appConfigAuditUncheckedUpdateManyWithoutChangedByNestedInput
  }

  export type userCreateManyInput = {
    id?: number
    email: string
    created_at?: Date | string
    updated_at?: Date | string
    username: string
    password: string
  }

  export type userUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type userUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type appConfigCreateInput = {
    key: string
    value?: string | null
    is_encrypted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    appConfigAudit?: appConfigAuditCreateNestedManyWithoutConfigInput
  }

  export type appConfigUncheckedCreateInput = {
    id?: number
    key: string
    value?: string | null
    is_encrypted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    appConfigAudit?: appConfigAuditUncheckedCreateNestedManyWithoutConfigInput
  }

  export type appConfigUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    is_encrypted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    appConfigAudit?: appConfigAuditUpdateManyWithoutConfigNestedInput
  }

  export type appConfigUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    is_encrypted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    appConfigAudit?: appConfigAuditUncheckedUpdateManyWithoutConfigNestedInput
  }

  export type appConfigCreateManyInput = {
    id?: number
    key: string
    value?: string | null
    is_encrypted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type appConfigUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    is_encrypted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type appConfigUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    is_encrypted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type appConfigAuditCreateInput = {
    oldValue?: string | null
    newValue?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    config?: appConfigCreateNestedOneWithoutAppConfigAuditInput
    changedBy: userCreateNestedOneWithoutConfigChangesInput
  }

  export type appConfigAuditUncheckedCreateInput = {
    id?: number
    configId?: number | null
    oldValue?: string | null
    newValue?: string | null
    changedUserId: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type appConfigAuditUpdateInput = {
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    config?: appConfigUpdateOneWithoutAppConfigAuditNestedInput
    changedBy?: userUpdateOneRequiredWithoutConfigChangesNestedInput
  }

  export type appConfigAuditUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    configId?: NullableIntFieldUpdateOperationsInput | number | null
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    changedUserId?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type appConfigAuditCreateManyInput = {
    id?: number
    configId?: number | null
    oldValue?: string | null
    newValue?: string | null
    changedUserId: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type appConfigAuditUpdateManyMutationInput = {
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type appConfigAuditUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    configId?: NullableIntFieldUpdateOperationsInput | number | null
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    changedUserId?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type AppConfigAuditListRelationFilter = {
    every?: appConfigAuditWhereInput
    some?: appConfigAuditWhereInput
    none?: appConfigAuditWhereInput
  }

  export type appConfigAuditOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type userOrderByRelevanceInput = {
    fields: userOrderByRelevanceFieldEnum | userOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    username?: SortOrder
    password?: SortOrder
  }

  export type userAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    username?: SortOrder
    password?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    username?: SortOrder
    password?: SortOrder
  }

  export type userSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type appConfigOrderByRelevanceInput = {
    fields: appConfigOrderByRelevanceFieldEnum | appConfigOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type appConfigCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    is_encrypted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type appConfigAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type appConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    is_encrypted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type appConfigMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    is_encrypted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type appConfigSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AppConfigNullableScalarRelationFilter = {
    is?: appConfigWhereInput | null
    isNot?: appConfigWhereInput | null
  }

  export type UserScalarRelationFilter = {
    is?: userWhereInput
    isNot?: userWhereInput
  }

  export type appConfigAuditOrderByRelevanceInput = {
    fields: appConfigAuditOrderByRelevanceFieldEnum | appConfigAuditOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type appConfigAuditCountOrderByAggregateInput = {
    id?: SortOrder
    configId?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    changedUserId?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type appConfigAuditAvgOrderByAggregateInput = {
    id?: SortOrder
    configId?: SortOrder
    changedUserId?: SortOrder
  }

  export type appConfigAuditMaxOrderByAggregateInput = {
    id?: SortOrder
    configId?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    changedUserId?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type appConfigAuditMinOrderByAggregateInput = {
    id?: SortOrder
    configId?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    changedUserId?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type appConfigAuditSumOrderByAggregateInput = {
    id?: SortOrder
    configId?: SortOrder
    changedUserId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type appConfigAuditCreateNestedManyWithoutChangedByInput = {
    create?: XOR<appConfigAuditCreateWithoutChangedByInput, appConfigAuditUncheckedCreateWithoutChangedByInput> | appConfigAuditCreateWithoutChangedByInput[] | appConfigAuditUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: appConfigAuditCreateOrConnectWithoutChangedByInput | appConfigAuditCreateOrConnectWithoutChangedByInput[]
    createMany?: appConfigAuditCreateManyChangedByInputEnvelope
    connect?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
  }

  export type appConfigAuditUncheckedCreateNestedManyWithoutChangedByInput = {
    create?: XOR<appConfigAuditCreateWithoutChangedByInput, appConfigAuditUncheckedCreateWithoutChangedByInput> | appConfigAuditCreateWithoutChangedByInput[] | appConfigAuditUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: appConfigAuditCreateOrConnectWithoutChangedByInput | appConfigAuditCreateOrConnectWithoutChangedByInput[]
    createMany?: appConfigAuditCreateManyChangedByInputEnvelope
    connect?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type appConfigAuditUpdateManyWithoutChangedByNestedInput = {
    create?: XOR<appConfigAuditCreateWithoutChangedByInput, appConfigAuditUncheckedCreateWithoutChangedByInput> | appConfigAuditCreateWithoutChangedByInput[] | appConfigAuditUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: appConfigAuditCreateOrConnectWithoutChangedByInput | appConfigAuditCreateOrConnectWithoutChangedByInput[]
    upsert?: appConfigAuditUpsertWithWhereUniqueWithoutChangedByInput | appConfigAuditUpsertWithWhereUniqueWithoutChangedByInput[]
    createMany?: appConfigAuditCreateManyChangedByInputEnvelope
    set?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    disconnect?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    delete?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    connect?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    update?: appConfigAuditUpdateWithWhereUniqueWithoutChangedByInput | appConfigAuditUpdateWithWhereUniqueWithoutChangedByInput[]
    updateMany?: appConfigAuditUpdateManyWithWhereWithoutChangedByInput | appConfigAuditUpdateManyWithWhereWithoutChangedByInput[]
    deleteMany?: appConfigAuditScalarWhereInput | appConfigAuditScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type appConfigAuditUncheckedUpdateManyWithoutChangedByNestedInput = {
    create?: XOR<appConfigAuditCreateWithoutChangedByInput, appConfigAuditUncheckedCreateWithoutChangedByInput> | appConfigAuditCreateWithoutChangedByInput[] | appConfigAuditUncheckedCreateWithoutChangedByInput[]
    connectOrCreate?: appConfigAuditCreateOrConnectWithoutChangedByInput | appConfigAuditCreateOrConnectWithoutChangedByInput[]
    upsert?: appConfigAuditUpsertWithWhereUniqueWithoutChangedByInput | appConfigAuditUpsertWithWhereUniqueWithoutChangedByInput[]
    createMany?: appConfigAuditCreateManyChangedByInputEnvelope
    set?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    disconnect?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    delete?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    connect?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    update?: appConfigAuditUpdateWithWhereUniqueWithoutChangedByInput | appConfigAuditUpdateWithWhereUniqueWithoutChangedByInput[]
    updateMany?: appConfigAuditUpdateManyWithWhereWithoutChangedByInput | appConfigAuditUpdateManyWithWhereWithoutChangedByInput[]
    deleteMany?: appConfigAuditScalarWhereInput | appConfigAuditScalarWhereInput[]
  }

  export type appConfigAuditCreateNestedManyWithoutConfigInput = {
    create?: XOR<appConfigAuditCreateWithoutConfigInput, appConfigAuditUncheckedCreateWithoutConfigInput> | appConfigAuditCreateWithoutConfigInput[] | appConfigAuditUncheckedCreateWithoutConfigInput[]
    connectOrCreate?: appConfigAuditCreateOrConnectWithoutConfigInput | appConfigAuditCreateOrConnectWithoutConfigInput[]
    createMany?: appConfigAuditCreateManyConfigInputEnvelope
    connect?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
  }

  export type appConfigAuditUncheckedCreateNestedManyWithoutConfigInput = {
    create?: XOR<appConfigAuditCreateWithoutConfigInput, appConfigAuditUncheckedCreateWithoutConfigInput> | appConfigAuditCreateWithoutConfigInput[] | appConfigAuditUncheckedCreateWithoutConfigInput[]
    connectOrCreate?: appConfigAuditCreateOrConnectWithoutConfigInput | appConfigAuditCreateOrConnectWithoutConfigInput[]
    createMany?: appConfigAuditCreateManyConfigInputEnvelope
    connect?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type appConfigAuditUpdateManyWithoutConfigNestedInput = {
    create?: XOR<appConfigAuditCreateWithoutConfigInput, appConfigAuditUncheckedCreateWithoutConfigInput> | appConfigAuditCreateWithoutConfigInput[] | appConfigAuditUncheckedCreateWithoutConfigInput[]
    connectOrCreate?: appConfigAuditCreateOrConnectWithoutConfigInput | appConfigAuditCreateOrConnectWithoutConfigInput[]
    upsert?: appConfigAuditUpsertWithWhereUniqueWithoutConfigInput | appConfigAuditUpsertWithWhereUniqueWithoutConfigInput[]
    createMany?: appConfigAuditCreateManyConfigInputEnvelope
    set?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    disconnect?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    delete?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    connect?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    update?: appConfigAuditUpdateWithWhereUniqueWithoutConfigInput | appConfigAuditUpdateWithWhereUniqueWithoutConfigInput[]
    updateMany?: appConfigAuditUpdateManyWithWhereWithoutConfigInput | appConfigAuditUpdateManyWithWhereWithoutConfigInput[]
    deleteMany?: appConfigAuditScalarWhereInput | appConfigAuditScalarWhereInput[]
  }

  export type appConfigAuditUncheckedUpdateManyWithoutConfigNestedInput = {
    create?: XOR<appConfigAuditCreateWithoutConfigInput, appConfigAuditUncheckedCreateWithoutConfigInput> | appConfigAuditCreateWithoutConfigInput[] | appConfigAuditUncheckedCreateWithoutConfigInput[]
    connectOrCreate?: appConfigAuditCreateOrConnectWithoutConfigInput | appConfigAuditCreateOrConnectWithoutConfigInput[]
    upsert?: appConfigAuditUpsertWithWhereUniqueWithoutConfigInput | appConfigAuditUpsertWithWhereUniqueWithoutConfigInput[]
    createMany?: appConfigAuditCreateManyConfigInputEnvelope
    set?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    disconnect?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    delete?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    connect?: appConfigAuditWhereUniqueInput | appConfigAuditWhereUniqueInput[]
    update?: appConfigAuditUpdateWithWhereUniqueWithoutConfigInput | appConfigAuditUpdateWithWhereUniqueWithoutConfigInput[]
    updateMany?: appConfigAuditUpdateManyWithWhereWithoutConfigInput | appConfigAuditUpdateManyWithWhereWithoutConfigInput[]
    deleteMany?: appConfigAuditScalarWhereInput | appConfigAuditScalarWhereInput[]
  }

  export type appConfigCreateNestedOneWithoutAppConfigAuditInput = {
    create?: XOR<appConfigCreateWithoutAppConfigAuditInput, appConfigUncheckedCreateWithoutAppConfigAuditInput>
    connectOrCreate?: appConfigCreateOrConnectWithoutAppConfigAuditInput
    connect?: appConfigWhereUniqueInput
  }

  export type userCreateNestedOneWithoutConfigChangesInput = {
    create?: XOR<userCreateWithoutConfigChangesInput, userUncheckedCreateWithoutConfigChangesInput>
    connectOrCreate?: userCreateOrConnectWithoutConfigChangesInput
    connect?: userWhereUniqueInput
  }

  export type appConfigUpdateOneWithoutAppConfigAuditNestedInput = {
    create?: XOR<appConfigCreateWithoutAppConfigAuditInput, appConfigUncheckedCreateWithoutAppConfigAuditInput>
    connectOrCreate?: appConfigCreateOrConnectWithoutAppConfigAuditInput
    upsert?: appConfigUpsertWithoutAppConfigAuditInput
    disconnect?: appConfigWhereInput | boolean
    delete?: appConfigWhereInput | boolean
    connect?: appConfigWhereUniqueInput
    update?: XOR<XOR<appConfigUpdateToOneWithWhereWithoutAppConfigAuditInput, appConfigUpdateWithoutAppConfigAuditInput>, appConfigUncheckedUpdateWithoutAppConfigAuditInput>
  }

  export type userUpdateOneRequiredWithoutConfigChangesNestedInput = {
    create?: XOR<userCreateWithoutConfigChangesInput, userUncheckedCreateWithoutConfigChangesInput>
    connectOrCreate?: userCreateOrConnectWithoutConfigChangesInput
    upsert?: userUpsertWithoutConfigChangesInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutConfigChangesInput, userUpdateWithoutConfigChangesInput>, userUncheckedUpdateWithoutConfigChangesInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type appConfigAuditCreateWithoutChangedByInput = {
    oldValue?: string | null
    newValue?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    config?: appConfigCreateNestedOneWithoutAppConfigAuditInput
  }

  export type appConfigAuditUncheckedCreateWithoutChangedByInput = {
    id?: number
    configId?: number | null
    oldValue?: string | null
    newValue?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type appConfigAuditCreateOrConnectWithoutChangedByInput = {
    where: appConfigAuditWhereUniqueInput
    create: XOR<appConfigAuditCreateWithoutChangedByInput, appConfigAuditUncheckedCreateWithoutChangedByInput>
  }

  export type appConfigAuditCreateManyChangedByInputEnvelope = {
    data: appConfigAuditCreateManyChangedByInput | appConfigAuditCreateManyChangedByInput[]
    skipDuplicates?: boolean
  }

  export type appConfigAuditUpsertWithWhereUniqueWithoutChangedByInput = {
    where: appConfigAuditWhereUniqueInput
    update: XOR<appConfigAuditUpdateWithoutChangedByInput, appConfigAuditUncheckedUpdateWithoutChangedByInput>
    create: XOR<appConfigAuditCreateWithoutChangedByInput, appConfigAuditUncheckedCreateWithoutChangedByInput>
  }

  export type appConfigAuditUpdateWithWhereUniqueWithoutChangedByInput = {
    where: appConfigAuditWhereUniqueInput
    data: XOR<appConfigAuditUpdateWithoutChangedByInput, appConfigAuditUncheckedUpdateWithoutChangedByInput>
  }

  export type appConfigAuditUpdateManyWithWhereWithoutChangedByInput = {
    where: appConfigAuditScalarWhereInput
    data: XOR<appConfigAuditUpdateManyMutationInput, appConfigAuditUncheckedUpdateManyWithoutChangedByInput>
  }

  export type appConfigAuditScalarWhereInput = {
    AND?: appConfigAuditScalarWhereInput | appConfigAuditScalarWhereInput[]
    OR?: appConfigAuditScalarWhereInput[]
    NOT?: appConfigAuditScalarWhereInput | appConfigAuditScalarWhereInput[]
    id?: IntFilter<"appConfigAudit"> | number
    configId?: IntNullableFilter<"appConfigAudit"> | number | null
    oldValue?: StringNullableFilter<"appConfigAudit"> | string | null
    newValue?: StringNullableFilter<"appConfigAudit"> | string | null
    changedUserId?: IntFilter<"appConfigAudit"> | number
    created_at?: DateTimeFilter<"appConfigAudit"> | Date | string
    updated_at?: DateTimeFilter<"appConfigAudit"> | Date | string
  }

  export type appConfigAuditCreateWithoutConfigInput = {
    oldValue?: string | null
    newValue?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    changedBy: userCreateNestedOneWithoutConfigChangesInput
  }

  export type appConfigAuditUncheckedCreateWithoutConfigInput = {
    id?: number
    oldValue?: string | null
    newValue?: string | null
    changedUserId: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type appConfigAuditCreateOrConnectWithoutConfigInput = {
    where: appConfigAuditWhereUniqueInput
    create: XOR<appConfigAuditCreateWithoutConfigInput, appConfigAuditUncheckedCreateWithoutConfigInput>
  }

  export type appConfigAuditCreateManyConfigInputEnvelope = {
    data: appConfigAuditCreateManyConfigInput | appConfigAuditCreateManyConfigInput[]
    skipDuplicates?: boolean
  }

  export type appConfigAuditUpsertWithWhereUniqueWithoutConfigInput = {
    where: appConfigAuditWhereUniqueInput
    update: XOR<appConfigAuditUpdateWithoutConfigInput, appConfigAuditUncheckedUpdateWithoutConfigInput>
    create: XOR<appConfigAuditCreateWithoutConfigInput, appConfigAuditUncheckedCreateWithoutConfigInput>
  }

  export type appConfigAuditUpdateWithWhereUniqueWithoutConfigInput = {
    where: appConfigAuditWhereUniqueInput
    data: XOR<appConfigAuditUpdateWithoutConfigInput, appConfigAuditUncheckedUpdateWithoutConfigInput>
  }

  export type appConfigAuditUpdateManyWithWhereWithoutConfigInput = {
    where: appConfigAuditScalarWhereInput
    data: XOR<appConfigAuditUpdateManyMutationInput, appConfigAuditUncheckedUpdateManyWithoutConfigInput>
  }

  export type appConfigCreateWithoutAppConfigAuditInput = {
    key: string
    value?: string | null
    is_encrypted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type appConfigUncheckedCreateWithoutAppConfigAuditInput = {
    id?: number
    key: string
    value?: string | null
    is_encrypted?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type appConfigCreateOrConnectWithoutAppConfigAuditInput = {
    where: appConfigWhereUniqueInput
    create: XOR<appConfigCreateWithoutAppConfigAuditInput, appConfigUncheckedCreateWithoutAppConfigAuditInput>
  }

  export type userCreateWithoutConfigChangesInput = {
    email: string
    created_at?: Date | string
    updated_at?: Date | string
    username: string
    password: string
  }

  export type userUncheckedCreateWithoutConfigChangesInput = {
    id?: number
    email: string
    created_at?: Date | string
    updated_at?: Date | string
    username: string
    password: string
  }

  export type userCreateOrConnectWithoutConfigChangesInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutConfigChangesInput, userUncheckedCreateWithoutConfigChangesInput>
  }

  export type appConfigUpsertWithoutAppConfigAuditInput = {
    update: XOR<appConfigUpdateWithoutAppConfigAuditInput, appConfigUncheckedUpdateWithoutAppConfigAuditInput>
    create: XOR<appConfigCreateWithoutAppConfigAuditInput, appConfigUncheckedCreateWithoutAppConfigAuditInput>
    where?: appConfigWhereInput
  }

  export type appConfigUpdateToOneWithWhereWithoutAppConfigAuditInput = {
    where?: appConfigWhereInput
    data: XOR<appConfigUpdateWithoutAppConfigAuditInput, appConfigUncheckedUpdateWithoutAppConfigAuditInput>
  }

  export type appConfigUpdateWithoutAppConfigAuditInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    is_encrypted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type appConfigUncheckedUpdateWithoutAppConfigAuditInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    is_encrypted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userUpsertWithoutConfigChangesInput = {
    update: XOR<userUpdateWithoutConfigChangesInput, userUncheckedUpdateWithoutConfigChangesInput>
    create: XOR<userCreateWithoutConfigChangesInput, userUncheckedCreateWithoutConfigChangesInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutConfigChangesInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutConfigChangesInput, userUncheckedUpdateWithoutConfigChangesInput>
  }

  export type userUpdateWithoutConfigChangesInput = {
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type userUncheckedUpdateWithoutConfigChangesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type appConfigAuditCreateManyChangedByInput = {
    id?: number
    configId?: number | null
    oldValue?: string | null
    newValue?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type appConfigAuditUpdateWithoutChangedByInput = {
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    config?: appConfigUpdateOneWithoutAppConfigAuditNestedInput
  }

  export type appConfigAuditUncheckedUpdateWithoutChangedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    configId?: NullableIntFieldUpdateOperationsInput | number | null
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type appConfigAuditUncheckedUpdateManyWithoutChangedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    configId?: NullableIntFieldUpdateOperationsInput | number | null
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type appConfigAuditCreateManyConfigInput = {
    id?: number
    oldValue?: string | null
    newValue?: string | null
    changedUserId: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type appConfigAuditUpdateWithoutConfigInput = {
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    changedBy?: userUpdateOneRequiredWithoutConfigChangesNestedInput
  }

  export type appConfigAuditUncheckedUpdateWithoutConfigInput = {
    id?: IntFieldUpdateOperationsInput | number
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    changedUserId?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type appConfigAuditUncheckedUpdateManyWithoutConfigInput = {
    id?: IntFieldUpdateOperationsInput | number
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    changedUserId?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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