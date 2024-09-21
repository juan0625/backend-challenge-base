import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
void bootstrap();


const config = new DocumentBuilder()
  .setTitle('API de Películas')
  .setDescription('Documentación API')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
