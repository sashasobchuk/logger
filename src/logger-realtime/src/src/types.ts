
export type LoggerBodyType = Omit<LoggerEntity, 'id'>


export type LoggerDataType = Omit<LoggerEntity, 'id' |'name'>

export type DefaultLogData =Omit<LoggerBodyType, "showAny" | "id" | "name" | "text">

export interface DBParams {
  type: string,
  port: number,
  password: string,
  username: string,
  database: string,
  host: string,
  user: string

}
export type LoggerEntity =  {
  id: number;
  name: string;
  params: boolean;
  result: boolean;
  executionTime: boolean;
  beginTime: boolean;
  endTime: boolean;
  changeOnRebuild: boolean;
  showName: boolean;
  text?: string | null;
};

