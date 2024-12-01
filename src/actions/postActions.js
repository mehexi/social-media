import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deletePost = async (id) => {
    const res = await axios.delete(`/api/post?id=${id}`);
    return res.data;
};

const useDeletePost = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: deletePost, 
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        },
        onError: (error) => {
            console.error(error);
        }
    });
};

export default useDeletePost;
