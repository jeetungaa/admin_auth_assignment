import { atom, selector } from "recoil";

export const wishListState = atom({
    key: 'wishList',
    default: []
});

export const getWList = selector({
    key: 'getList',
    get: async ({ get }) => {
        const req = await fetch('https://admin-auth-assignment.onrender.com/products/wish', {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        });
        const data = await req.json();
        return data;
    }
});

export const wList = selector({
    key: 'active',
    get: async ({ get }) => {
        const list = get(wishListState);
        const req = await fetch('https://admin-auth-assignment.onrender.com/products/wish', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ list })
        });
        const dta = await req.json();
        return dta;
    }
});
