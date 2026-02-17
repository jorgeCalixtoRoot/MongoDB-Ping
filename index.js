import dotenv from 'dotenv'
import { MongoClient, ServerApiVersion } from 'mongodb'
dotenv.config()
const uri = process.env.Mongo_uri


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

const run = async () => {

    try {
        await client.connect();
        await client.db("admin").command({ping: 1})

        const dbName = "Cafeteria"
        const adminDb = client.db(dbName)
        const dbList = await adminDb.admin().listDatabases()

        const existDb = dbList.databases.some(db => db.name === dbName)
        existDb ? console.log(`${dbName} existe.`) : console.log(`${dbName} no existe.`)
        
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error)
    }
     finally {
        await client.close();
    }
}

run().catch(console.dir);
