import { Command } from "../../models/commands";

import help from "./help";
import react from "./react";
import poll from "./poll";

const commands: Command[] = [help, react, poll];

export default commands;
