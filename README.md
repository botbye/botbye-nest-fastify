[BotBye!](https://botbye.com)  
[BotBye! | Docs](https://botbye.com/docs)

# BotBye! NestJS Fastify

## Install

```bash
npm i botbye-nest-fastify
```

or

```bash
yarn add botbye-nest-fastify
```

## Usage

1. Create options for `BotByeModule`.

```typescript
import { TBotByeModuleOptions } from "botbye-nest-fastify"

const botbyeModuleOptions: TBotByeModuleOptions = {
    /* Use your server-key */
    serverKey: '00000000-0000-0000-0000-000000000000',

    /*
    * Function that extracts token from fastify Request object.
    * For example, from 'x-botbye-token' header
    */
    tokenExtractor: (request) => request.headers['x-botbye-token'],

    /*
    * Optional function that extracts customFields
    * from fastify Request object
    */
    customFieldsExtractor: (request) => ({
        example: request.headers['example'],
    }),
};
```

2. Register `BotByeModule` in Root module `imports` using `botbyeModuleOptions`.

```typescript
import { BotByeModule } from "botbye-nest-fastify"

...

@Module({
    imports: [BotByeModule.register(botbyeModuleOptions)],
    controllers: [AppController],
    providers: [AppService],
})
class AppModule {}
```

3. Add `BotByeMiddleware`.

```typescript
import { BotByeMiddleware } from "botbye-nest-fastify"

...

class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(BotByeMiddleware)
            /* Select routes that should be protected */
            .forRoutes('*');
    }
}
```

4. Use `@BotByeResponse()` decorator in controllers to process request.

```typescript
import { BotByeResponse, type TBotByeResponse } from 'botbye-nest-fastify';

@Controller('some-route')
class SomeController {
    @Get()
    someGet(@BotByeResponse() botbyeResponse: TBotByeResponse) {
        const isAllowed = botbyeResponse.result?.isAllowed ?? true;
        if (!isAllowed) {
            /*
            * When BotBye! not allow request
            * throw ForbiddenException, for example
            */
            throw new ForbiddenException();
        };
        /* In other case process request as usual */
        return "Some Response"
    }
}
```

### Examples of BotBye API responses:

#### Bot detected:

```json
{
  "reqId": "f77b2abd-c5d7-44f0-be4f-174b04876583",
  "result": {
    "isAllowed": false
  },
  "error": null
}
```

#### Bot not detected:

```json
{
  "reqId": "f77b2abd-c5d7-44f0-be4f-174b04876583",
  "result": {
    "isAllowed": true
  },
  "error": null
}
```

#### Request banned by custom rule:

```json
{
  "reqId": "f77b2abd-c5d7-44f0-be4f-174b04876583",
  "result": {
    "isAllowed": false
  },
  "error": {
    "message": "Banned by rule: MY_CUSTOM_RULE"
  }
}
```

#### Invalid `serverKey`:

```json
{
  "reqId": "f77b2abd-c5d7-44f0-be4f-174b04876583",
  "result": null,
  "error": {
    "message": "[BotBye] Bad Request: Invalid Server Key"
  }
}
```

## Full code example

`app.module.ts`

```typescript
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
    BotByeMiddleware,
    BotByeModule,
    TBotByeModuleOptions,
} from 'botbye-nest-fastify';
import { SomeController } from './SomeModule/SomeController';

const botbyeModuleOptions: TBotByeModuleOptions = {
    /* Use your server-key */
    serverKey: '00000000-0000-0000-0000-000000000000',

    /* Function that extracts token from express Request object */
    tokenExtractor: (request) => request.headers['x-botbye-token'],

    /*
    * Optional function that extracts customFields
    * from express Request object
    */
    customFieldsExtractor: (request) => ({
        example: request.headers['example'],
    }),
};

@Module({
    imports: [BotByeModule.register(botbyeModuleOptions)],
    controllers: [AppController, SomeController],
    providers: [AppService],
})
class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(BotByeMiddleware)
            /* Select routes that should be protected */
            .forRoutes('*');
    }
}
```

`some.controller.ts`

```typescript
import {Controller, ForbiddenException, Get} from '@nestjs/common';
import { BotByeResponse, type TBotByeResponse } from 'botbye-nest-fastify';

@Controller('some-route')
class SomeController {
    @Get()
    someGet(@BotByeResponse() botbyeResponse: TBotByeResponse) {
        const isAllowed = botbyeResponse.result?.isAllowed ?? true;
        if (!isAllowed) {
            /*
            * When BotBye! not allow request
            * throw ForbiddenException, for example
            */
            throw new ForbiddenException();
        };
        /* In other case process request as usual */
        return "Some Response"
    }
}
```