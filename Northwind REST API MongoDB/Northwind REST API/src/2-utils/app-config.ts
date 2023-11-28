class AppConfig {
    public readonly port = 4000;
    public mongodbConnectionString="mongodb://127.0.0.1:27017/northwind";
}

const appConfig = new AppConfig();

export default appConfig;
