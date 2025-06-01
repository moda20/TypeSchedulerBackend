export interface FlattenedProperties {
  [key: string]: {
    value: any;
    is_encrypted?: boolean;
    db_mirror?: boolean;
    doc?: string;
    default?: string;
    format?: string;
    base?: boolean;
  };
}
