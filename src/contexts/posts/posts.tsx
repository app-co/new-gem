import { useQuery } from "react-query";
import { api } from "../../services/api";
import { IPost } from "./dtos";

export async function fatchPosts(): Promise<IPost[]> {
  const { data } = await api.get('/post')


  return data as IPost[]
}

export function usePosts() {
  const post = useQuery<IPost[]>('get-posts', fatchPosts)

  return {
    getPosts: post.data,
    isLoading: post.isLoading,
    isError: post.isError,
    refetch: post.refetch
  }
}