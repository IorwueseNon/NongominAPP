export default ()=>({
    port: parseInt(process.env.PORT),
    secret: process.env.SECRET,
    dbHost:process.env.DB_HOST,
    dbPort:process.env.DB_PORT,
    username:process.env.USERNAME,
    dbPassword:process.env.DB_PASSWORD,
    dbName:process.env.DB_NAME

})