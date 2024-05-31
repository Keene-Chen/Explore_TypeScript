import figlet from 'figlet';
import mqtt, { type IClientOptions } from 'mqtt';
import fs from 'node:fs';
import { URL, fileURLToPath } from 'node:url';

/** SSL */
function readCertificate(path: string): Buffer {
  return fs.readFileSync(fileURLToPath(new URL(path, import.meta.url)));
}
const ca = readCertificate('../config/emqx-certs/cacert.pem');
const cert = readCertificate('../config/emqx-certs/client-cert.pem');
const key = readCertificate('../config/emqx-certs/client-key.pem');

/** MQTTClient Optons */
const options: IClientOptions = {
  host: 'gcloud.keenechen.cn',
  port: 8883,
  protocol: 'mqtts',
  clientId: 'mqttjs_' + Math.random().toString(16).slice(0, 8),
  clean: true,
  keepalive: 60,
  connectTimeout: 4000,
  username: 'keenechen',
  password: 'keenechen123*',
  ca,
  cert,
  key,
  rejectUnauthorized: false,
};

const client = mqtt.connect(options);

client.on('connect', () => {
  client.subscribe('test/#');
  client.publish('test/1', 'Hello mqtt');
});

client.on('message', (topic, message) => {
  console.log(topic, message.toString());
  // client.end();
});

client.on('error', error => {
  console.log(error);
});

client.on('close', () => {
  console.log('close');
});

const text = figlet.textSync('KeeneChen', {
  font: 'ANSI Shadow',
  horizontalLayout: 'full',
  verticalLayout: 'default',
  width: 200,
  whitespaceBreak: true,
});

console.log(text);
