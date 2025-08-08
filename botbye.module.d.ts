import { DynamicModule } from "@nestjs/common";
import { TBotByeModuleOptions } from "./botbye.types";
declare class BotByeModule {
    static register(options: TBotByeModuleOptions): DynamicModule;
}
export { BotByeModule, };
