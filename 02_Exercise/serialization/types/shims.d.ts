declare module 'iarna-toml-esm' {
  export const parse: (toml: string) => any;
  export const stringify: (obj: any) => string;
}
