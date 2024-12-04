import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deletePost = async (id) => {
    const res = await axios.delete(`/api/post?id=${id}`);
    toast({
        title: "Post deleted",
    })
    return res.data;
};

export const useDeletePost = () => {
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

export const bookMarkPost = async (id) => {
    try {
        const res = await axios.post(`/api/bookmark/?id=${id}`);
        const {message,added} = res.data
        return added
    } catch (error) {
        console.error(error);
        toast({
            title: "Something Went Wrong",
        });
    }
};

export const pinPost = async (id) => {
    try {
        const res = await axios.post(`/api/pin/?id=${id}`)
        const { message, added } = res.data
        return added
    }
    catch (error) {
        console.error(error);
        toast({
            title: "Something Went Wrong",
        })
    }
}
