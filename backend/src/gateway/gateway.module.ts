import { forwardRef, Module } from '@nestjs/common';
import { AppModule } from '../app.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SocketGateway } from './socketGateWay';

@Module({
    imports: [
        forwardRef(() => AppModule),
        ScheduleModule.forRoot(),
    ],
    providers: [SocketGateway],
    exports: [SocketGateway],
})
export class GatewayModule {}
