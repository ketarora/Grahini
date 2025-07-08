import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Eye, Package, TrendingUp, Users, Star, Upload, Camera } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  status: 'pending' | 'approved' | 'rejected';
  stock: number;
  rating: number;
  orders: number;
}

const SellerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Homemade Mango Pickle',
      price: 150,
      category: 'Condiments',
      description: 'Traditional mango pickle made with fresh mangoes and authentic spices',
      image: 'https://source.unsplash.com/300x200/?mango,pickle',
      status: 'approved',
      stock: 25,
      rating: 4.8,
      orders: 45
    },
    {
      id: '2',
      name: 'Fresh Rotis (Pack of 10)',
      price: 80,
      category: 'Bread',
      description: 'Freshly made rotis using whole wheat flour',
      image: 'https://source.unsplash.com/300x200/?roti,bread',
      status: 'pending',
      stock: 50,
      rating: 0,
      orders: 0
    }
  ]);

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: '',
    image: ''
  });

  const categories = [
    'Homemade Food',
    'Natural Cosmetics',
    'Handmade Crafts',
    'Condiments',
    'Bread',
    'Sweets',
    'Snacks',
    'Beverages',
    'Dairy Products',
    'Spices'
  ];

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      description: newProduct.description,
      image: newProduct.image || 'https://source.unsplash.com/300x200/?food,homemade',
      status: 'pending',
      stock: parseInt(newProduct.stock) || 0,
      rating: 0,
      orders: 0
    };

    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', category: '', description: '', stock: '', image: '' });
    setIsAddingProduct(false);
    toast.success('Product added successfully! It will be reviewed by our team.');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted successfully');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct({ ...newProduct, image: imageUrl });
      toast.success('Image uploaded successfully');
    }
  };

  const stats = {
    totalProducts: products.length,
    approvedProducts: products.filter(p => p.status === 'approved').length,
    pendingProducts: products.filter(p => p.status === 'pending').length,
    totalOrders: products.reduce((sum, p) => sum + p.orders, 0),
    totalRevenue: products.reduce((sum, p) => sum + (p.price * p.orders), 0),
    averageRating: products.filter(p => p.rating > 0).reduce((sum, p) => sum + p.rating, 0) / products.filter(p => p.rating > 0).length || 0
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading text-ethnic-primary">Seller Dashboard</h1>
            <p className="text-muted-foreground">Manage your products and track your business</p>
          </div>
          <Button onClick={() => setIsAddingProduct(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold text-ethnic-primary">{stats.totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold text-ethnic-primary">{stats.totalOrders}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-trust-green" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-ethnic-primary">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Rating</p>
                  <p className="text-2xl font-bold text-ethnic-primary">{stats.averageRating.toFixed(1)}</p>
                </div>
                <Star className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Add Product Form */}
            {isAddingProduct && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Product Name *</Label>
                      <Input
                        placeholder="Enter product name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Price (₹) *</Label>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Select onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Stock Quantity</Label>
                      <Input
                        type="number"
                        placeholder="Enter stock quantity"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Describe your product..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Product Image</Label>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                      <Button variant="outline">
                        <Camera className="h-4 w-4 mr-2" />
                        Take Photo
                      </Button>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    {newProduct.image && (
                      <img src={newProduct.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleAddProduct}>Add Product</Button>
                    <Button variant="outline" onClick={() => setIsAddingProduct(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Products List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <Badge 
                      className={`absolute top-2 right-2 ${
                        product.status === 'approved' ? 'bg-trust-green' :
                        product.status === 'pending' ? 'bg-amber-500' : 'bg-destructive'
                      }`}
                    >
                      {product.status}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-ethnic-primary mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                    <p className="text-lg font-bold text-trust-green mb-2">₹{product.price}</p>
                    
                    {product.status === 'approved' && (
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>Stock: {product.stock}</span>
                        <span>Orders: {product.orders}</span>
                        {product.rating > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {product.rating}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Order management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Business Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default SellerDashboard;