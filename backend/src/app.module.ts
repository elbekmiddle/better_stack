import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorsModule } from './modules/monitors/monitors.module';
import { IncidentsModule } from './modules/incidents/incidents.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { LogsModule } from './modules/logs/logs.module';
import { ServersModule } from './modules/servers/servers.module';
import { StatusPagesModule } from './modules/status-pages/status-pages.module';
import { GatewayModule } from 'src/gateway/gateway.module'
import { UsersModule } from 'src/modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      
      ssl: {
    rejectUnauthorized: false,
    },

  extra: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },


      autoLoadEntities: true,
      synchronize: false,
    }),


    MonitorsModule,

    IncidentsModule,

    AlertsModule,
    GatewayModule,

    LogsModule,

    ServersModule,
    StatusPagesModule,
    UsersModule,
    AuthModule
  ],
})
export class AppModule {}