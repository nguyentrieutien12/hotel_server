import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { HotelsModule } from './hotels/hotels.module';
import { SpasModule } from './spas/spas.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { GymsModule } from './gyms/gyms.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { DishesModule } from './dishes/dishes.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { SeftCaresModule } from './seft_cares/seft_cares.module';
import { FileModule } from './file/file.module';
import { ImageModule } from './image/image.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { RecoveryModule } from './recovery/recovery.module';
import { BodyRecoveryModule } from './body_recovery/body_recovery.module';
import { VideoModule } from './video/video.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AccountsModule,
    AuthModule,
    HotelsModule,
    SpasModule,
    RestaurantsModule,
    GymsModule,
    TreatmentsModule,
    DishesModule,
    WorkoutsModule,
    SeftCaresModule,
    FileModule,
    ImageModule,
    QrcodeModule,
    RecoveryModule,
    BodyRecoveryModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
