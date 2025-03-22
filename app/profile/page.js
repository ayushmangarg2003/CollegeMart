"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/libs/supabase/client";
import ButtonAccount from "@/components/ButtonAccount";
import { Loader, Activity, ShoppingBag, Heart, Eye } from "lucide-react";
import Link from "next/link";
import config from "@/config";
import logo from "@/app/icon.png";
import Image from "next/image";
import EditProductCard from "@/components/EditProductCard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const Profile = () => {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [watchlist, setWatchlist] = useState([]); // Keeping this as it is
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
          .eq("owner", user.email)
          .order("listedDate", { ascending: false });

        if (productsError) throw productsError;

        setUserProducts(products);
        
        // Generate chart data based on products
        generateChartData(products);
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndProducts();
  }, [supabase]);
  
  // Function to generate chart data from products
  const generateChartData = (products) => {
    if (!products || products.length === 0) return;
    
    // Generate data for product price pie chart
    const priceData = products.map(product => ({
      name: product.name?.substring(0, 15) || 'Unnamed',
      value: product.price || 0,
    }));
    setProductPriceData(priceData);
    
    // Generate mock activity data - in a real app, you'd fetch this from your analytics
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const activityData = months.map(month => {
      // In a real app, this would be actual historical data from your database
      return {
        name: month,
        views: Math.floor(Math.random() * 50),
        inquiries: 0,
      };
    });
    setProductActivityData(activityData);
  };

  // Calculate metrics
  const calculateMetrics = () => {
    const totalViews = userProducts.reduce((sum, product) => sum + (product.views || 0), 0);
    const totalInquiries = userProducts.reduce((sum, product) => sum + (product.inquiries || 0), 0);
    
    return {
      totalViews: totalViews || 0,
      totalInquiries: totalInquiries || 0,
      totalProducts: userProducts.length,
      watchlistItems: watchlist.length,
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
              <h3 className="font-semibold">Watchlist Items</h3>
            </div>
            <p className="text-3xl font-bold">{metrics.watchlistItems}</p>
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
                  <LineChart
                    width={800}
                    height={250}
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
                      dataKey="views" 
                      stroke="#8884d8" 
                      strokeWidth={2} 
                      name="Views"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="inquiries" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      name="Inquiries" 
                    />
                  </LineChart>
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
                  <PieChart width={300} height={250}>
                    <Pie
                      data={productPriceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => 
                        `${name}${name.length > 10 ? '...' : ''}: $${value.toFixed(2)}`
                      }
                    >
                      {productPriceData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'][index % 5]} 
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
            <div className="flex flex-wrap mt-6">
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

        {/* Watchlist Section */}
        <section>
          <h2 className="text-2xl font-semibold text-[#4b4b4b] mb-8 flex items-center">
            <Heart className="text-[#cc0000] mr-2" size={20} />
            Your Watchlist
          </h2>
          {watchlist.length > 0 ? (
            <div className="flex flex-wrap mt-6">
              {watchlist.map((product) => (
                <EditProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-neutral-50">
              <p className="text-lg text-neutral-600">
                No items in your watchlist yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Profile;