import { DataSource } from "typeorm";
import { Settlement } from "./entity/Settlement";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./settlements.db",
  synchronize: true,
  logging: false,
  entities: [Settlement],
});
