import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('logger')
export class LoggerEntity {

  @PrimaryGeneratedColumn()
  id:number

  @Column('varchar',{nullable:false})
  name:string

  @Column('boolean',{nullable:false,default:false})
  showName:boolean


  @Column('boolean',{default:false,nullable:false})
  params:boolean

  @Column('boolean',{default:false,nullable:false})
  result:boolean

  @Column('boolean',{default:false,nullable:false})
  executionTime:boolean

  @Column('boolean',{default:false,nullable:false})
  beginTime:boolean

  @Column('boolean',{default:false,nullable:false})
  endTime:boolean


  @Column('varchar',{default:null,nullable:true})
  text:string



}



