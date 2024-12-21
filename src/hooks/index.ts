import { DelteFetchs } from "./fetchs/delte";
import { GetFetchs } from "./fetchs/gets";
import { PostFetchs } from "./fetchs/posts";
import { PutFetchs } from "./fetchs/put";
import { Mutations } from "./mutations";

export function make() {
  const get = new GetFetchs()
  const post = new PostFetchs()
  const put = new PutFetchs()
  const del = new DelteFetchs()

  const mutations = new Mutations(get, post, put, del)

  return { mutations }
}