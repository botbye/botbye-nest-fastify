import { DynamicModule } from "@nestjs/common";
import { type TBotByeModuleOptions } from "./botbye.types";
declare class BotByeModule {
    static register(options: TBotByeModuleOptions): DynamicModule;
}
export { BotByeModule };
