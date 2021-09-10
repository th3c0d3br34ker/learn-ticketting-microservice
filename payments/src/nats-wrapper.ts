import { connect, Stan } from 'node-nats-streaming';
class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Can not access client before connecting...');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this._client?.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });

      this._client?.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
