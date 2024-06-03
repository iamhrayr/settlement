import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum SettlementStatus {
  Pending = "pending",
  Settled = "settled",
  Disputed = "disputed",
}

@Entity()
export class Settlement {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column("float")
  amount: number;

  @Column()
  status: SettlementStatus;

  @Column({ nullable: true })
  lastResponse: string;
}
