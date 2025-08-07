export interface Project {
  title: string;
  description: string;
  logo: string;
  link: string;
  slug: string;
  category: string;
}

export interface Repo {
  id: number;
  name: string;
  description: string;
  language: string;
  watchers: number;
  forks: number;
  stargazers_count: number;
  html_url: string;
  homepage: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface User {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
}
