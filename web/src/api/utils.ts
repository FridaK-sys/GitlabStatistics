export const getEnv = (envName: string): string => {
    const variable = process.env[envName];
    if (!variable) throw new Error(`Environmental variable ${envName} not found`);
    return variable;
};