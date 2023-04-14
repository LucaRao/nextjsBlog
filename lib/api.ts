import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import PostType from "../interfaces/post";
import {supabase} from "../utils/supabase";
interface PostData {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: string;
  updated_at: string;
}

// const postsDirectory = join(process.cwd(), '_posts')

export async function getPosts(fields: string[] = ['id', 'title', 'created_at', 'picture', 'excerpt', 'content']){
  
  // return fs.readdirSync(postsDirectory)
  const {data, error} = await supabase.from('post').select();
    if (error) {
        throw new Error('Error getting post')
    }else if(data){
      return data;
    }
  
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  // const realSlug = slug.replace(/\.md$/, '')
  // const fullPath = join(postsDirectory, `${realSlug}.md`)
  // const fileContents = fs.readFileSync(fullPath, 'utf8')
  // const { data, content } = matter(fileContents)

  const {data, error} = await supabase.from('post').select(fields.join(',')).eq('id', slug).single<PostData>();
  if (error) {
    throw new Error('Error getting post')
      console.log(error)
  }
  return data;


  // type Items = {
  //   [key: string]: string
  // }
  //
  // const items: Items = {}
  //
  // // Ensure only the minimal needed data is exposed
  // fields.forEach((field) => {
  //   if (field === 'slug') {
  //     items[field] = realSlug
  //   }
  //   if (field === 'content') {
  //     items[field] = content
  //   }
  //
  //   if (typeof data[field] !== 'undefined') {
  //     items[field] = data[field]
  //   }
  // })
  //
  // return items
}

export async function getAllPosts(fields: string[] = []) {
  const posts= await getPosts(fields);
  return posts
      .sort((post1, post2) => (post1.created_at > post2.created_at ? -1 : 1))
        .map((post) => {
          return {
              slug: post.id,
              ...post
          }
        })
}
