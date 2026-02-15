import { useEffect } from 'react';
import Slider from '../Components/Slider';
import useHomeStore from "../Stores/useHomeStore";
import ProductCatSection from '../Components/ProductCatSection';


export default function Home() {
    const {posts, productCategories, getData} = useHomeStore();
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <div className="w-full bg-base-100">
                <Slider posts={posts} />
                <ProductCatSection productCategories={productCategories} />
            </div>
        </>
    );
}
