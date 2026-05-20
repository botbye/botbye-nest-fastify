import type { FastifyRequest } from "fastify";
import type { IBotByeService, TBotByeModuleOptions as TBotByeModuleCoreOptions } from "@botbye/nest-core";
type TBotByeModuleOptions = TBotByeModuleCoreOptions<FastifyRequest>;
type TBotByeService = IBotByeService<FastifyRequest>;
export type { TBotByeModuleOptions, TBotByeService };
