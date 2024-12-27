
interface ISegments {
  providerId: string
  avatar: string
  name: string
  workname: string
}

interface ISucess {
  workName: string
  userId: string
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      segments: ISegments
      sucess: ISucess
      'SOLICITAÇÕES': undefined,
      Post: undefined
    }
  }
}
