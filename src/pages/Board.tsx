import React, { useState, useEffect } from "react";
import { Post } from "../types/types";
import { fetchPosts, createPost, updatePost, deletePost } from "../api/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const Board: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        const data = await fetchPosts();
        setPosts(data);
    };

    const handleCreate = async () => {
        if (!title || !content) return;
        const newPost = await createPost({ title, content });
        setPosts([...posts, newPost]);
        setTitle("");
        setContent("");
    };

    const handleUpdate = async () => {
        if (!editingPost) return;
        const updatedPost = await updatePost({ ...editingPost, title, content });
        setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
        setEditingPost(null);
        setTitle("");
        setContent("");
    };

    const handleDelete = async (id: number) => {
        await deletePost(id);
        setPosts(posts.filter((post) => post.id !== id));
    };

    const startEditing = (post: Post) => {
        setEditingPost(post);
        setTitle(post.title);
        setContent(post.content);
    };

    return (
        <div>
            <h1>TODO LIST!!!</h1>
            <div>
                <input
                    className="form-control mb-2"
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="form-control mb-4"
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                {editingPost ? (
                    <div className="d-grid gap-2 col-6 mx-auto mb-4">
                        <button className="btn btn-primary" onClick={handleUpdate} type="button">수정</button>
                    </div>
                ) : (
                    <div className="d-grid gap-2 col-6 mx-auto mb-4">
                        <button className="btn btn-primary" onClick={handleCreate} type="button">생성</button>
                    </div>
                )}
            </div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <div className="card mb-2">
                            <div className="card-body">
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                                <button className="btn btn-warning" onClick={() => startEditing(post)}>수정</button>
                                <button className="btn btn-danger mx-1" onClick={() => handleDelete(post.id)}>삭제</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Board;
