import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Logger {

  @PrimaryGeneratedColumn()
  id:number

  @Column('varchar',{nullable:false})
  name:string

  @Column('boolean',{default:false,nullable:false})
  params:boolean

  @Column('boolean',{default:false,nullable:false})
  result:boolean

  @Column('boolean',{default:false,nullable:false})
  executionTime:boolean





}



