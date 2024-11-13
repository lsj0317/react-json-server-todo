import { Post } from "../types/types";

const API_URL = "http://localhost:5000/posts"; // 예시 API URL

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch(API_URL);
    return response.json();
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
    return response.json();
};

export const updatePost = async (post: Post): Promise<Post> => {
    const response = await fetch(`${API_URL}/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
    return response.json();
};

export const deletePost = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

// 실행시 명령어
// npx json-server --watch C:\Users\lhd03\Desktop\ReactProject\my-board\src\db\db.json --port 5000