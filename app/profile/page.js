"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/libs/supabase/client";
import ButtonAccount from "@/components/ButtonAccount";
import { Loader, Activity, ShoppingBag, Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import config from "@/config";
import logo from "@/app/icon.png";
import Image from "next/image";
import EditProductCard from "@/components/EditProductCard";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Profile = () => {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productPriceData, setProductPriceData] = useState([]);
  const [productActivityData, setProductActivityData] = useState([]);

  useEffect(() => {
    const fetchUserAndProducts = async () => {
      setIsLoading(true);
      try {
        // Get logged-in user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) throw new Error("You must be logged in to view this page.");

        setUser(user);

        // Fetch user's listed products
        const { data: products, error: productsError } = await supabase
          .from("products")
          .select("*")
          .ilike("owner", user.email)
          .order("listedDate", { ascending: false });

        if (productsError) throw productsError;

        setUserProducts(products);

        // Generate chart data based on products
        generateChartData(products);
        
        // Fetch wishlist items from localStorage
        fetchWishlistItems();
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndProducts();
  }, [supabase]);

  // Function to fetch wishlist items from localStorage
  const fetchWishlistItems = () => {
    try {
      const wishlistData = localStorage.getItem('wishlist');
      
      if (!wishlistData) {
        setWishlistItems([]);
        return;
      }
      
      const wishlist = JSON.parse(wishlistData);
      
      if (Array.isArray(wishlist)) {
        setWishlistItems(wishlist);
      } else {
        // Reset if not an array
        localStorage.setItem('wishlist', JSON.stringify([]));
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      localStorage.setItem('wishlist', JSON.stringify([]));
      setWishlistItems([]);
    }
  };

  // Function to remove item from wishlist
  const removeFromWishlist = (productId) => {
    try {
      const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlistItems(updatedWishlist);
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  // Function to generate chart data from products
  const generateChartData = (products) => {
    if (!products || products.length === 0) return;

    // Generate data for product price pie chart
    const priceData = products.map((product) => ({
      name: product.name?.substring(0, 15) || "Unnamed",
      value: product.price || 0,
    }));
    setProductPriceData(priceData);

    // Generate mock activity data - in a real app, you'd fetch this from your analytics
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const activityData = months.map((month) => {
      // In a real app, this would be actual historical data from your database
      return {
        name: month,
        Sales: Math.floor(Math.random() * 50) + 2000,
        NoOfItems: Math.floor(Math.random() * 50) + 100,
      };
    });
    setProductActivityData(activityData);
  };

  // Calculate metrics
  const calculateMetrics = () => {
    const totalsales = userProducts.reduce(
      (sum, product) => sum + (product.sales || 0),
      0
    );
    const NotalnoOfItems = userProducts.reduce(
      (sum, product) => sum + (product.NoOfItems || 0),
      0
    );

    return {
      totalsales: totalsales || 0,
      NotalnoOfItems: NotalnoOfItems || 0,
      totalProducts: userProducts.length,
      wishlistItems: wishlistItems.length,
    };
  };

  const metrics = calculateMetrics();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 text-[#cc0000] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-base-200 flex justify-center">
        <header className="bg-base-200 max-w-7xl bg-base-100 w-full flex justify-between py-4">
          <Link
            className="flex items-center gap-2 shrink-0"
            href="/"
            title={`${config.appName} homepage`}
          >
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              className="w-8"
              placeholder="blur"
              priority={true}
              width={32}
              height={32}
            />
            <span className="font-extrabold text-lg">{config.appName}</span>
          </Link>

          <ButtonAccount />
        </header>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        {/* User Profile Info */}
        <section className="mb-8">
          <h1 className="text-4xl font-bold text-[#4b4b4b] mb-3">
            {user?.user_metadata?.name || "Welcome back!"}
          </h1>
          <p className="text-xl text-neutral-600">{user?.email}</p>
        </section>

        {/* Dashboard Analytics Cards */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center mb-2">
              <ShoppingBag className="text-indigo-500 mr-2" size={20} />
              <h3 className="font-semibold">Listed Products</h3>
            </div>
            <p className="text-3xl font-bold">{metrics.totalProducts}</p>
            <p className="text-xs text-neutral-500">Active Listings</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center mb-2">
              <Heart className="text-red-500 mr-2" size={20} />
              <h3 className="font-semibold">Wishlist Items</h3>
            </div>
            <p className="text-3xl font-bold">{metrics.wishlistItems}</p>
            <p className="text-xs text-neutral-500">Saved Items</p>
          </div>
        </section>

        {/* Dashboard Charts */}
        {userProducts.length > 0 && (
          <>
            {/* Activity Chart */}
            <section className="mb-8">
              <div className="bg-white p-6 rounded-lg shadow border">
                <h2 className="text-xl font-semibold text-[#4b4b4b] mb-4 flex items-center">
                  <Activity className="text-indigo-600 mr-2" size={20} />
                  Marketplace Activity
                </h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={productActivityData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="NoOfItems"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        name="No Of Items Sold"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* Product Price Distribution */}
            <section className="mb-12">
              <div className="bg-white p-6 rounded-lg shadow border">
                <h2 className="text-xl font-semibold text-[#4b4b4b] mb-4">
                  Product Price Distribution
                </h2>
                <div className="h-64 flex justify-center items-center">
                  <PieChart width={600} height={250}>
                    <Pie
                      data={productPriceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) =>
                        `${name}${
                          name.length > 10 ? "..." : ""
                        }: $${value.toFixed(2)}`
                      }
                    >
                      {productPriceData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            [
                              "#8884d8",
                              "#82ca9d",
                              "#ffc658",
                              "#ff8042",
                              "#0088FE",
                            ][index % 5]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  </PieChart>
                </div>
              </div>
            </section>
          </>
        )}

        {/* User's Listed Products */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-[#4b4b4b] flex items-center">
              <ShoppingBag className="text-[#cc0000] mr-2" size={20} />
              Your Listed Products
            </h2>
            <Link href="/add">
              <button className="text-[#cc0000] hover:text-[#b30000] font-medium">
                + Add New Product
              </button>
            </Link>
          </div>

          {userProducts.length > 0 ? (
            <div className="">
              {userProducts.map((product) => (
                <EditProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-neutral-50">
              <p className="text-lg text-neutral-600">
                You have not listed any products yet.
              </p>
            </div>
          )}
        </section>

        {/* Wishlist Section */}
        <section>
          <div className="flex items-center gap-2 mb-8">
            <Heart className="w-6 h-6 text-[#cc0000]" />
            <h2 className="text-2xl font-semibold text-[#4b4b4b]">
              Your Wishlist
            </h2>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 bg-neutral-50">
              <p className="text-lg text-neutral-600">
                Your wishlist is empty
              </p>
              <Link 
                href="/marketplace" 
                className="inline-block bg-[#cc0000] text-white px-6 py-3 font-medium mt-4"
              >
                Explore Marketplace
              </Link>
            </div>
          ) : (
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div 
                  key={item.id} 
                  className="border border-neutral-200 hover:shadow-md transition-shadow relative"
                >
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="bg-white p-2 rounded-full shadow-md hover:bg-neutral-100 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-5 h-5 text-[#cc0000]" />
                    </button>
                  </div>
                  
                  <Link href={`/product/${item.id}`}>
                    <div className="aspect-square bg-neutral-50 relative">
                      <img
                        src={item.image || "/placeholder-image.jpg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.originalPrice > item.price && (
                        <div className="absolute top-3 left-3 bg-[#cc0000] text-white px-3 py-1 text-sm font-medium">
                          {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                        </div>
                      )}
                      {item.condition && (
                        <div className="absolute bottom-3 left-3 bg-neutral-800 bg-opacity-70 text-white px-3 py-1 text-sm">
                          {item.condition}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-neutral-800 mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-lg font-bold text-[#cc0000]">
                          ${item.price?.toLocaleString()}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-neutral-500 line-through">
                            ${item.originalPrice?.toLocaleString()}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex justify-end mt-2">
                        <Link 
                          href={`/product/${item.id}`}
                          className="bg-[#cc0000] text-white px-4 py-2 flex items-center gap-2 hover:bg-[#aa0000] transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          View Details
                        </Link>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Profile;