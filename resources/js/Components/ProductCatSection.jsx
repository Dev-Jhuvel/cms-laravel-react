import { Link } from "react-router-dom";

const ProductCatSection = ({productCategories}) =>{
    return (
        <section className="w-full pb-20">
           <div className="w-[70%] h-full m-auto">
                <h1 className="text-center text-primary font-bold text-4xl py-12">Product Categories</h1>
                    {productCategories && 
                        <div className="border-red-500 w-full flex">
                            {productCategories.map((category)=>(
                                <Link to="/menu" key={category.id} className="w-full h-90 flex gap-5">
                                    <div className="w-[80%] h-[90%] shadow-md rounded-2xl bg-center bg-cover m-auto hover:shadow-primary flex items-center justify-center" style={{backgroundImage: `url(${category.image === "" ? logo : category.image})`}}>
                                        <p className="text-white text-shadow-lg text-shadow-primary-content font-bold text-7xl">{category.name}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    }
           </div>
        </section>
    )
}

export default ProductCatSection;