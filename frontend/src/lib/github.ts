/**
 * GitHub API helpers for fetching dev-aditya-lab profile data.
 * All fetches are client-side to avoid SSR/hydration mismatches.
 */

export interface GitHubProfile {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  blog: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

export async function fetchGitHubProfile(username = "dev-aditya-lab"): Promise<GitHubProfile | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
      // 60 s cache — avoid hammering the API
      next: { revalidate: 60 },
    } as RequestInit);
    if (!res.ok) return null;
    return (await res.json()) as GitHubProfile;
  } catch {
    return null;
  }
}
