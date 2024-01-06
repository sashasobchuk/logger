export type LoggerType = {
  name: string,
  showName:boolean
  params: boolean,
  result: boolean,
  executionTime: boolean
  beginTime: boolean
  endTime: boolean
  changeOnRebuild:boolean
  text?: string
}

export type DefaultLogData =Omit<LoggerType, "showAny" | "id" | "name" | "text">




