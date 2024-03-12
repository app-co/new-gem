export interface IPost {
  id: string
  image: string
  description: string
  created_at: string
  fk_id_user: string
  like:
  {
    id: string
    like: number
    liked: boolean
    user_id: string
    fk_id_post: string
  }[]

}