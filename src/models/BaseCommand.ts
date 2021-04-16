/**
 * A Command model. Used for defining and handling commands.
 */
export type BaseCommand = {
    type: string;
    name: string;
    description: string;
    usage: string[];
};
