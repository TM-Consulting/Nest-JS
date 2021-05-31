import * as dotenv from 'dotenv';
dotenv.config();

export default {
  database: {
    mongoDB_Cluster: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSEWORD}@cluster0.3ow5w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  },
};
