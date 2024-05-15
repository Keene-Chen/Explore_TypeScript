import * as toml from 'iarna-toml-esm';

const tomlString = `
[package]
name = "my-package"
version = "0.1.0"

[dependencies]
serde = "1.0"
serde_json = "1.0"
`;

const parsedToml = toml.parse(tomlString);

console.log(JSON.stringify(parsedToml, null, 2));
