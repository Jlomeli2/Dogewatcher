import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

// Force the values to be strings as they will be validated later
const env = process.env as Record<string, string>;
const optionalEnvs: string[] = ["DEV_ID"];
const envVars: Record<string, string> = {
    DISCORD_TOKEN: env.DISCORD_TOKEN,
    NODE_ENV: env.NODE_ENV,
    COMMAND_PREFIX: env.COMMAND_PREFIX,
    DEV_ID: env.DEV_ID,
};

/**
 * Check if a .env value is an acceptable type or has acceptable properties
 *
 * @param {unknown} envValue A value from the .env configuration.
 *
 * @returns {Boolean} A boolean value determining if an .env variable is nor undefined and not an empty string.
 */
function validEnvData(envValue: unknown): boolean {
    if (envValue === undefined || (typeof envValue === "string" && envValue.length === 0)) {
        return false;
    }

    return true;
}

/**
 * Retrieves a list with all required .env variable keys that are missing.
 *
 * @returns {String[]} A list with all required .env variable keys that are missing.
 */
function getMissingRequiredEnvVars(): string[] {
    // Retrieves all missing required .env variables.
    const missingEnvs = Object.entries(envVars).reduce((acc: string[], [key, value]) => {
        const isMissing = !validEnvData(value);
        const shouldError = isMissing && !optionalEnvs.includes(key);

        if (shouldError) {
            return [...acc, key];
        }

        return acc;
    }, []);

    return missingEnvs;
}

/**
 * Check if the envVars variable is missing any required .env variables.
 */
function checkMissingRequiredEnvVars(): void {
    const missingEnvs = getMissingRequiredEnvVars();

    // Exits bot execution if required .env variables are missing.
    if (missingEnvs.length > 0) {
        missingEnvs.forEach((key) => {
            console.error(chalk.red(`Missing env variable '${key}'. Set it in the environment or in the .env file`));
        });

        process.exit(1);
    }
}

// Make sure all .env variables exist before export.
checkMissingRequiredEnvVars();

export default envVars;
