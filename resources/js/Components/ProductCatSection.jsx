import { Link } from "react-router-dom";
import useHomeStore from "../Stores/useHomeStore";
import useThemeStore from "../Stores/useThemeStore";

const ProductCatSection = ({productCategories}) =>{
    const { setProductCategory } = useHomeStore();
    const {logo} = useThemeStore();
    return (
        <section className="w-full h-full pb-10 bg-base-300">
           <div className="w-full h-full m-auto">
                <h1 className="text-center text-primary font-bold text-4xl py-5">Product Categories</h1>
                    {productCategories && 
                        <div className="flex flex-col justify-center md:grid md:grid-cols-4 md:gap-x-5 gap-y-5 p-2 ">
                            {productCategories.map((category, index)=>{
                                const newIndex = index + 1;
                                return (
                                <Link to="/menu" key={category.id} className={`w-full h-40 md:h-55 md:col-span-${newIndex % 3 == 0 ? 2 : newIndex % 2 == 0 ? 2 : 1}`} onClick={()=>setProductCategory(category.id)}>
                                    <div className="w-full h-full shadow-md rounded-2xl bg-center bg-cover m-auto hover:shadow-primary flex items-center justify-center" style={{backgroundImage: `url(${category.image === "" ? logo : category.image})`}}>
                                        <p className="text-white text-shadow-lg text-shadow-primary font-bold text-4xl">{category.name}</p>
                                    </div>
                                </Link>
                            )
                            })}
                            <Link to="/menu" className="w-full h-40 md:h-55 col-span-3 col-start-2 col-end-5" onClick={()=>setProductCategory(null)}>
                                <div className="w-full h-full shadow-md rounded-2xl bg-center bg-cover m-auto hover:shadow-primary flex items-center justify-center bg-[url('../images/breads.jpg')]">
                                    <p className="text-white text-shadow-lg text-shadow-primary font-bold text-4xl">All Products</p>
                                </div>
                            </Link>
                        </div>
                    }
           </div>
        </section>
    )
}

export default ProductCatSection;