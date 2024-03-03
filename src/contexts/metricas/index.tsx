import { useQuery } from "react-query"
import { api } from "../../services/api"
import { IMetricUser, TGlobalMetric } from "./dto"

async function fatchUserMetric(): Promise<IMetricUser> {
   const { data } = await api.get('/metric/user')

   return data as IMetricUser
}

async function fatchGloablMetric(): Promise<TGlobalMetric> {
   const { data } = await api.get('/metric')

   return data as TGlobalMetric
}

export function useMetricas() {

   const user = useQuery('getmetric:user', fatchUserMetric)
   const gloabl = useQuery('getmetric:global', fatchGloablMetric)


   return {
      getSelfMetric: {
         isLoading: user.isLoading,
         isError: user.isError,
         data: user.data
      },

      getGlobalMetric: {
         isLoading: gloabl.isLoading,
         isError: gloabl.isError,
         data: gloabl.data
      }
   }
}