"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BotByeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotByeModule = void 0;
const common_1 = require("@nestjs/common");
const nest_core_1 = require("@botbye/nest-core");
const fastify_1 = require("@botbye/fastify");
const constants_1 = require("./constants");
let BotByeModule = BotByeModule_1 = class BotByeModule {
    static register(options) {
        return {
            module: BotByeModule_1,
            providers: (0, nest_core_1.getProvidersList)(options, (0, fastify_1.factory)({ module: { name: constants_1.MODULE_NAME, version: constants_1.MODULE_VERSION } })),
            exports: (0, nest_core_1.getExports)(),
        };
    }
};
exports.BotByeModule = BotByeModule;
exports.BotByeModule = BotByeModule = BotByeModule_1 = __decorate([
    (0, common_1.Module)({})
], BotByeModule);
