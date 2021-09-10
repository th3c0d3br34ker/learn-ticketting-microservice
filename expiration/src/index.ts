import app, { PORT } from './app';
import { OrderCreatedListner } from './events/listeners/order-created-listener';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  try {
    if (!process.env.NATS_CLIENT_ID) {
      throw new Error('NATS_CLIENT_ID not defined!');
    }
    if (!process.env.NATS_URI) {
      throw new Error('NATS_URI not defined!');
    }
    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error('NATS_CLUSTER_ID not defined!');
    }

    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URI
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new OrderCreatedListner(natsWrapper.client).listen();
  } catch (error) {
    console.log('Error : ', error);
  }
};

app.listen(PORT, () => {
  console.log(
    `Expiration Service v${process.env.npm_package_version} started on PORT: ${PORT}`
  );
});

start();
