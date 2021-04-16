import help from "./help";
import currency from "./currency";

import { ExecCommand } from "../../models/ExecCommand";
import { ApiCommand } from "../../models/ApiCommand";

const commands: (ExecCommand | ApiCommand)[] = [help, currency];

export default commands;
