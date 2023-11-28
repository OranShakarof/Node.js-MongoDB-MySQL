class AppConfig {

    public readonly prot = 4000;
    public readonly mysqlHost = "localhost";
    public readonly mysqlUser = "root";
    public readonly mysqlPassword = "";
    public readonly mysqlDatabase = "northwind";
    public readonly domainName = "http://localhost:" + this.prot;

}
const appConfig = new AppConfig();

export default appConfig;