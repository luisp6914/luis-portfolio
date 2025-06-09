import { Icon } from "@iconify/react"
import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import '../../styles/digiKey-project.css'

interface Category{
    CategoryId: number;
    ParentId: number;
    Name: string;
    ProductCount: number;
    Children: Category[];
}

//Interfaces for keyword search
interface Products{
    Category: Category;
    Description : Description;
    Manufacturer : Manufacturer;
    PhotoUrl: string;
    ProductUrl: string;
    ProductStatus: ProductStatus
}
interface Description{
    DetailedDescription: string;
    ProductDescription: string;
}
interface Manufacturer{
    Id: number;
    Name: string;
}
interface ProductStatus{
    Id: number;
    Status: string
}


const CLIENT_ID = import.meta.env.VITE_DIGIKEY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_DIGIKEY_CLIENT_SECRET;
const CLIENT_BASE_URL = import.meta.env.VITE_DIGIKEY_API_BASE_URL;

//Method for getting tokens 
const getAccessTokens = async() => {
    const tokenURL = CLIENT_BASE_URL + "/v1/oauth2/token";

    //Setting headers
    const body = qs.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials"
    });

    try {
        const response = await axios.post(
            tokenURL,
            body,{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
        );

        const accessTokens = response.data.access_token;
        return accessTokens;

    } catch (error) {
        console.error(`Error getting access token: ${error}`);
    }

};


const DigiContent = () => {
    const [categories, setCategories] = useState<Category | null>(null);

    //Search Category by ID
    const [categoryById, setCategoryById] = useState<Category | null>(null);
    const [categoryID, setCategoryID] = useState<string>("");

    //Keyword search
    const [keyword, setKeyword] = useState<string>("");
    const [products, setProducts]= useState<Products[] | null>(null);
    

    useEffect(() => {
        const fetchData = async () =>{
            try {
                //getting access tokens from function
                const accessTokens = await getAccessTokens();
                
                //Fetching categories 
                const response = await axios.get(`${CLIENT_BASE_URL}/products/v4/search/categories/38`, {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessTokens}`,
                        "X-DIGIKEY-Client-Id": CLIENT_ID,
                        "X-DIGIKEY-Locale-Site": "US",
                        "X-DIGIKEY-Locale-Language": "en",
                        "X-DIGIKEY-Locale-Currency": "USD",
                    },
                });

                setCategories(response.data.Category);
            } catch (error) {
                console.error(`Failed to get categories ${error}`);
            }
        }
        fetchData();
        window.scrollTo(0,0)
    }, []);

    const handleSearchByIdClick = async (e : React.FormEvent) => {
        e.preventDefault();

        if(!categoryID || isNaN(Number(categoryID)) || Number(categoryID) < 1  ){
            alert("Please Enter a valid category ID")
            return;
        }

        try {
            //Getting access tokens
            const accessTokens = await getAccessTokens();

            //Fetching category
            const response = await axios.get(`${CLIENT_BASE_URL}/products/v4/search/categories/${categoryID}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessTokens}`,
                    "X-DIGIKEY-Client-Id": CLIENT_ID,
                    "X-DIGIKEY-Locale-Site": "US",
                    "X-DIGIKEY-Locale-Language": "en",
                    "X-DIGIKEY-Locale-Currency": "USD",
                }
            });

            setCategoryById(response.data.Category)
        } catch (error : any) {
            if(error.response &&  error.response.status === 404){
                alert("Category was not found")
                return;
            }
            console.error(`Failed to get category by ID: ${error}`);
        }
    }

    const handleKeywordSearch = async (e : React.FormEvent) => {
        e.preventDefault();
        try {
            //Setting query 
            const data = JSON.stringify({
                Keywords: keyword,
                Limit: 50,
                Offset: 0
            });

            //Getting access Tokens
            const accessTokens = await getAccessTokens();

            //Fetching 
            const response = await axios.post(
                `${CLIENT_BASE_URL}/products/v4/search/keyword`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessTokens}`,
                        "X-DIGIKEY-Client-Id": CLIENT_ID,
                        "X-DIGIKEY-Locale-Site": "US",
                        "X-DIGIKEY-Locale-Language": "en",
                        "X-DIGIKEY-Locale-Currency": "USD",
                    }
                }
            )
            setProducts(response.data.Products); 
        } catch (error : any) {
            if(error.response &&  error.response.status === 404){
                alert(`${keyword} was not found`)
                return;
            }
            console.error(`Failed to get keyword: ${error}`);
        }
    };
    
    return(
        <div className="digiContainer">
            <div className="d-flex mainContainer">
                <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button className="nav-link m-2 p-3 active" id="v-pills-categories-tab" data-bs-toggle="pill" data-bs-target="#v-pills-categories" type="button" role="tab" aria-controls="v-pills-categories" aria-selected="true">
                        <span className="tabText">Categories</span>
                        <Icon className="tabIcon" icon="fluent-mdl2:product-list"/>
                    </button>

                    <button className="nav-link m-2 p-3" id="v-pills-searchById-tab" data-bs-toggle="pill" data-bs-target="#v-pills-searchById" type="button" role="tab" aria-controls="v-pills-searchById" aria-selected="false">
                        <span className="tabText">Search Category By ID</span>
                        <Icon className="tabIcon" icon="fluent:box-search-16-regular"/>
                    </button>

                    <button className="nav-link m-2 p-3" id="v-pills-searchByKeyword-tab" data-bs-toggle="pill" data-bs-target="#v-pills-searchByKeyword" type="button" role="tab" aria-controls="v-pills-searchByKeyword" aria-selected="false">
                        <span className="tabText">Keyword Search</span>
                        <Icon className="tabIcon" icon="lineicons:search-text" />
                    </button>
                </div>

                <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-categories" role="tabpanel" aria-labelledby="v-pills-categories-tab">
                        {categories ? (
                            <>
                                <h1 style={{textAlign: "center", marginBottom: "2rem"}}>{categories.Name} </h1>
                                <div className="row row-cols-12 row-cols-sm-12 row-cols-md-4 row-cols-lg-2 category-cards">
                                    {categories.Children.map(category => (
                                        <div className="card digi-card" style={{width: '500px', height: '350px'}} key={category.CategoryId}>
                                            
                                            <div className="card-body card-data">
                                                <h2 className="card-title" style={{whiteSpace: "nowrap", overflowX: "auto", overflowY: "hidden" , maxWidth: "100%"}}>{category.Name}</h2>
                                                <p><b>Product Count:</b> {category.ProductCount}</p>
                                                <p><b>Category ID:</b> {category.CategoryId}</p>
                                                <p><b>ParentId:</b> {category.ParentId}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="loading-container">
                                <Icon className="loading" icon="svg-spinners:blocks-wave" />
                            </div>
                        )}
                    </div>

                    <div className="tab-pane fade" id="v-pills-searchById" role="tabpanel" aria-labelledby="v-pills-searchById-tab">
                        {categoryById ? (
                            <>
                                <form onSubmit={handleSearchByIdClick} className="search-form-container">
                                    <div className="search-form">
                                        <div className="input-group">
                                            <div className="form-floating mb">
                                                <input type="text" className="form-control" aria-describedby="categoryHelpBlock" id="category-Id" placeholder="Category ID" value={categoryID} onChange={(e) => setCategoryID(e.target.value)} required/>
                                                <label htmlFor="category-Id" className="col-form-label floatingInput">Enter Category ID</label>
                                            </div>
                                            <button className="btn btn-primary" type="submit">
                                                <Icon icon="ic:baseline-search" />
                                            </button>
                                        </div>
                                        <div id="categoryHelpBlock" className="form-text">
                                            The category ID number must be a valid number
                                        </div>
                                    </div>
                                </form>

                                <h1 style={{textAlign: "center", marginBottom: "2rem"}}>{categoryById.Name} </h1>
                                <div className="row row-cols-12 row-cols-sm-12 row-cols-md-4 row-cols-lg-2 category-cards">
                                    {categoryById.Children.map(category => (
                                        <div className="card " style={{ width: '500px', height: '350px' }} key={category.CategoryId}>
                                            
                                            <div className="card-body card-data">
                                                <h2 className="card-title" style={{whiteSpace: "nowrap", overflowX: "auto", overflowY: "hidden" , maxWidth: "100%"}}>{category.Name}</h2>
                                                <p><b>Product Count:</b> {category.ProductCount}</p>
                                                <p><b>Category ID:</b> {category.CategoryId}</p>
                                                <p><b>ParentId:</b> {category.ParentId}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleSearchByIdClick} className="search-form-container">
                                <div className="search-form">
                                    <div className="input-group">
                                        <div className="form-floating mb">
                                            <input type="text" className="form-control" aria-describedby="categoryHelpBlock" id="category-Id" placeholder="Category ID" value={categoryID} onChange={(e) => setCategoryID(e.target.value)} required/>
                                            <label htmlFor="category-Id" className="col-form-label floatingInput">Enter Category ID</label>
                                    
                                        </div>
                                        <button className="btn btn-primary" type="submit">
                                            <Icon icon="ic:baseline-search" />
                                        </button>
                                    
                                    </div>
                                    <div id="categoryHelpBlock" className="form-text">
                                        The category ID must be a valid number
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className="tab-pane fade" id="v-pills-searchByKeyword" role="tabpanel" aria-labelledby="v-pills-searchByKeyword-tab">
                        {products ? (
                            <>
                                <form onSubmit={handleKeywordSearch} className="search-form-container">
                                    <div className="search-form">
                                        <div className="input-group">
                                            <div className="form-floating mb">
                                                <input type="text" className="form-control" aria-describedby="keywordHelpBlock" id="keyword" placeholder="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} required/>
                                                <label htmlFor="keyword" className="col-form-label floatingInput">Keyword</label>
                                            </div>
                                            <button className="btn btn-primary" type="submit">
                                                <Icon icon="ic:baseline-search" />
                                            </button>
                                        </div>
                                        <div id="keywordHelpBlock" className="form-text">
                                            Enter an eletronic component ex: "GPU" or "CPU"
                                        </div>
                                    </div>
                                </form>

                                <div className="row row-cols-12 row-cols-sm-12 row-cols-md-4 row-cols-lg-2 category-cards mt-5">
                                    {products.map(
                                        (product, index) => (
                                            <div className="card overflow-auto" style={{width: "18rem"}} key={index}>
                                                
                                                {product.PhotoUrl ? 
                                                    (<img className="card-img-top object-fit-fill product-img mb-4 mt-4" src={product.PhotoUrl} alt={product.Category.Name} />) : 
                                                    (<Icon className="missingImage" icon="carbon:no-image" width="262" height="262" />)
                                                }
                                                <div className="card-body">
                                                    <a href={product.ProductUrl} className="btn btn-primary">
                                                        <Icon icon="ix:product"> </Icon>
                                                        {product.Description.ProductDescription}
                                                    </a>
                                                    <ul className="list-group" style={{listStyleType: "none", height: "100%"}}>
                                                        <li className="card-text mb-2 mt-2"><b>{product.Description.DetailedDescription}</b></li>
                                                        <li className="card-text mb-2 mt-2"><b>Manufacturer ID:</b> {product.Manufacturer.Id}</li>
                                                        <li className="card-text mb-2 mt-2"><b>Manufacturer Name:</b> {product.Manufacturer.Name}</li>
                                                        
                                                    </ul>
                                                    
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleKeywordSearch} className="search-form-container">
                                <div className="search-form">
                                    <div className="input-group">
                                        <div className="form-floating mb">
                                            <input type="text" className="form-control" aria-describedby="keywordHelpBlock" id="keyword" placeholder="Keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} required/>
                                            <label htmlFor="keyword" className="col-form-label floatingInput">Keyword</label>
                                    
                                        </div>
                                        <button className="btn btn-primary" type="submit">
                                            <Icon icon="ic:baseline-search" />
                                        </button>
                                    
                                    </div>
                                    <div id="keywordHelpBlock" className="form-text">
                                        Enter an eletronic component ex: "GPU" or "CPU"
                                    </div>
                                </div>
                            </form>

                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DigiContent;