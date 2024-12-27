import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { GetFetchs } from "./fetchs/gets";
import { TUsersByHub } from "./dto/types";

export class Querys {
  constructor(
    private get: GetFetchs,
  ) { }

  private resetClient(key: string) {
    const client = useQueryClient()
    client.invalidateQueries(key)
    client.resetQueries(key)
  }


  public useRelationsMetricasUser() {
    return useQuery({
      queryFn: this.get.relationMetricasUser,
      queryKey: ['relationsMetricasUser'],
    })
  }

  public useUserByHub(params: { nome: string, hub: string }) {
    const newParams = {
      ...params,
      pageNumber: 0,
      pageSize: 15,
    };

    return useInfiniteQuery({
      queryKey: ['userByHub', newParams],
      queryFn: ({ pageParam = 0 }) =>

        this.get.userByHub({
          ...newParams,
          pageNumber: pageParam,
        }),
      getNextPageParam: lastPage => {
        if (lastPage.pageNumber === lastPage.totalPages - 1) {
          return undefined;
        }

        return lastPage.pageNumber + lastPage.pageSize;
      },
    });
  }

  public relationByReceptor() {
    return useQuery({
      queryFn: this.get.relationByReceptor,
      queryKey: ['relationByReceptor'],
    })
  }

  public relationForAprovation() {
    return useQuery({
      queryFn: this.get.relationForAprovation,
      queryKey: ['relationForAprovation'],
    })
  }

  public relationNotvalidBytype(type: number) {
    return useQuery({
      queryKey: ['relationNotvalidBytype', type],
      queryFn: () => this.get.relationNotvalidBytype(type),
    })
  }
}