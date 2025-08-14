"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotByeModule = void 0;
var common_1 = require("@nestjs/common");
var botbye_nest_core_1 = require("botbye-nest-core");
var botbye_node_fastify_1 = require("botbye-node-fastify");
var botbye_node_core_1 = require("botbye-node-core");
(0, botbye_node_core_1.initPackageInfo)({ name: "NodeJS - NestJS - Fastify", version: "0.1.1" });
var BotByeModule = (function () {
    function BotByeModule() {
    }
    BotByeModule_1 = BotByeModule;
    BotByeModule.register = function (options) {
        return {
            module: BotByeModule_1,
            providers: (0, botbye_nest_core_1.getProvidersList)(options, botbye_node_fastify_1.validateRequest),
            exports: (0, botbye_nest_core_1.getExports)(),
        };
    };
    var BotByeModule_1;
    BotByeModule = BotByeModule_1 = __decorate([
        (0, common_1.Module)({})
    ], BotByeModule);
    return BotByeModule;
}());
exports.BotByeModule = BotByeModule;
