import { Command } from "../../models/commands";

import help from "./help";
import get from "./get";

const commands: Command[] = [help, get];

export default commands;
