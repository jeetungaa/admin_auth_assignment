import React, { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { ProductCard } from "../components/ProductCard";
import { SideBar } from "../components/SideBar";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { products } from "../store/products";
import { sideBar } from "../store/dash";
import { filterr } from "../store/filter";


const images = [
    'https://jumbotail.com/wp-content/uploads/2019/07/wide-range-of-products-500px.jpg',
    'https://jumbotail.com/wp-content/uploads/2019/07/wide-range-of-products-500px.jpg',
    'https://jumbotail.com/wp-content/uploads/2019/07/wide-range-of-products-500px.jpg',
    'https://jumbotail.com/wp-content/uploads/2019/07/wide-range-of-products-500px.jpg',
    'https://jumbotail.com/wp-content/uploads/2019/07/wide-range-of-products-500px.jpg',

];

export const Main = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [productData, setProductData] = useState([]);
    const [active, setActive] = useRecoilState(sideBar);
    const [filter, setFilter] = useRecoilState(filterr);
    const data = useRecoilValueLoadable(products);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (data.state === 'hasValue') {
                    console.log(data.contents); 
                    setProductData(data.contents.data); 
                } else if (data.state === 'hasError') {
                    setError('Error loading products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [data]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center bg-background text-text/30 font-bold items-center text-3xl  h-screen">
            <Nav/>
            <div>Error: {error}</div>

            </div>;
    }

    return (
        <div className="flex flex-col min-h-screen h-full  no-scrool justify-center items-center bg-backgrounds text-text w-full">
            <Nav  home={true}/>
            <SideBar top='Home' />
            
            <div className={`w-full  h-full transition-all duration-300  ${active?'pl-64 ':'w-full'} no-scrool`}>
        
                
                <div className={`w-full min-h-screen transition-all duration-300 flex h-full ${active?'':"px-5 sm:px-8 md:px-10 lg:px-20"}`}>
                         

                    <div className={`grid bg-background transition-all  ${filter?'mt-20 w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5':'grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'} px-1 rounded-md sm:px-2 md:px-4 duration-300 float-right min-h-screen  h-full ${active?'grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'  :   ' 2xl:grid-cols-4'}`}>
                        {productData.map((product, index) => (
                            <ProductCard
                                key={index}
                                image={product.images} 
                                title={product.name} 
                                description={product.description}
                                vendor={product.vendor_id?.business_name ||"Admin"} 
                                price={product.price} 
                                mrp={product.mrp}
                                id={product._id}
                            />
                            
                            
                        ))}
                        {/* {productData.map((product, index) => (
                            <ProductCard
                                key={index}
                                image={product.images} 
                                title={product.name} 
                                description={product.description}
                                vendor={product.vendor_id?.business_name ||"Admin"} 
                                price={product.price} 
                                mrp={product.mrp}
                            />
                        ))}
                        {productData.map((product, index) => (
                            <ProductCard
                                key={index}
                                image={product.images} 
                                title={product.name} 
                                description={product.description}
                                vendor={product.vendor_id?.business_name ||"Admin"} 
                                price={product.price} 
                            />
                        ))} */}
                    </div>
                </div>
            </div>
            <div>
                {/* {productData.map((product,i)=>{
                    console.log(product._id,i);
                })} */}
            </div>
        </div>
    );
};
