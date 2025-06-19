import amqplib from "amqplib";
import axios from "axios";

async function connect() {
  const queue = 'auth';
  const conn = await amqplib.connect('amqp://localhost');

  const channel = await conn.createChannel();
  await channel.assertQueue(queue, { durable: false });

  channel.consume(queue, async (msg: any) => {
    if (msg !== null) {
      const content = msg.content.toString();
      const data = JSON.parse(content);
      const sendEmail = await axios.post('http://localhost:3003/api/v1/send-email', {
        to: data.to,
        subject: data.subject,
        body: data.body
      });

      if(!sendEmail) {
        console.log('Something went happend');
        return;
      }

      // Acknowledge the message
      channel.ack(msg);
    }
  });
}

export {
    connect
}