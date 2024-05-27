import { ChalkAnimation } from '@figliolia/chalk-animation';
import figlet from 'figlet';
import gradient from 'gradient-string';
import mqtt, { type IClientOptions } from 'mqtt';

const brokerUrl = [
  {
    id: 0,
    name: 'broker1',
    url: 'mqtt://1.14.76.121:1883',
    status: 'offline',
  },
];

const options: IClientOptions = {
  host: '1.14.76.121',
  port: 1883,
  protocol: 'mqtt',
  clientId: 'mqttjs_' + Math.random().toString(16).slice(0, 8),
  clean: true,
  keepalive: 60,
  connectTimeout: 4000,
  username: 'smartsl',
  password: 'smartsl123*',
  // ca: [],
  // key: [],
  // rejectUnauthorized: false,
};

const client = mqtt.connect(brokerUrl[0].url, options);

client.on('connect', () => {
  client.subscribe('test/#');
  client.publish('test/1', 'Hello mqtt');
});

client.on('message', (topic, message) => {
  // console.log(topic, message.toString());
  client.end();
});

client.on('error', error => {
  console.log(error);
});

client.on('close', () => {
  console.log('close');
});

console.log(client.options);

const text = figlet.textSync('KeeneChen', {
  font: 'ANSI Shadow',
  horizontalLayout: 'full',
  verticalLayout: 'default',
  width: 200,
  whitespaceBreak: true,
});

const gradientText = gradient.vice.multiline(text);

const rainbow = ChalkAnimation.rainbow('Lorem ipsum'); // Animation starts

// setTimeout(() => {
//     rainbow.stop(); // Animation stops
// }, 1000);

setTimeout(() => {
    rainbow.start(); // Animation resumes
}, 2000);
