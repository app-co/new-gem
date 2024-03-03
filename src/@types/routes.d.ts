
interface ISegments {
  providerId: string
  avatar: string
  name: string
  workname: string
  token: string
}

interface ISucess {
  prestador: string
  description: string
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      segments: ISegments
      sucess: ISucess
      'SOLICITAÇÕES': undefined
    }
  }
}
