import { selector } from "recoil";

export const products=selector({
    key:'products',
    get:async ({get})=>{
        const res = await fetch('https://admin-authassignment.vercel.app/products/',{
            headers:{
                'authorization':localStorage.getItem('token')
            }
        });
        const data = await res.json();
        return data;  
    }
})

export const categories=selector({
    key:'category',
    get:async ({get})=>{
        const res = await fetch('https://admin-authassignment.vercel.app/categories/',{
            headers:{
                'authorization':localStorage.getItem('token')
            }
        });
        const data = await res.json();
        console.log(data);
        return data;
    }
})