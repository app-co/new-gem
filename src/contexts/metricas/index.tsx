import { useQuery } from "react-query"
import { useAuth } from "../../hooks/useAuth"
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
   const { user } = useAuth()

   const get = useQuery(`getmetric:${user.id}`, fatchUserMetric)
   const gloabl = useQuery('getmetric:global', fatchGloablMetric)


   return {
      getSelfMetric: {
         isLoading: get.isLoading,
         isError: get.isError,
         data: get.data,
         fetch: get.refetch
      },

      getGlobalMetric: {
         isLoading: gloabl.isLoading,
         isError: gloabl.isError,
         data: gloabl.data
      }
   }
}