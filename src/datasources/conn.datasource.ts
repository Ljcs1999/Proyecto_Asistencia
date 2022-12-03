import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'conn',
  connector: 'mysql',
  url: 'mysql://u4hddjedgo6cv2ta:qq00XIAE7MYIo4UTMDje@bq61oxhyg2wgt5bpywtx-mysql.services.clever-cloud.com:3306/bq61oxhyg2wgt5bpywtx',
  host: 'bq61oxhyg2wgt5bpywtx-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'u4hddjedgo6cv2ta',
  password: 'qq00XIAE7MYIo4UTMDje',
  database: 'bq61oxhyg2wgt5bpywtx'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ConnDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'conn';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.conn', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
