export type AppConfig = {
  nodeEnv: string;
  name: string;
  url: string;
  port: number;
  debug: boolean;
  fallbackLanguage: string;
  logLevel: string;
  logService: string;
  corsOrigin: boolean | string | RegExp | (string | RegExp)[];
  apiPrefix: string;
  apiDocsEnabled: boolean;
};
