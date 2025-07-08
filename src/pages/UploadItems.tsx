import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Camera, FileText, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  estimatedPrice: string;
  category: string;
}

const UploadItems = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock AI processing function
  const processImage = async (imageFile: File): Promise<CartItem[]> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock detected items (in real app, this would come from AI service)
    return [
      { id: '1', name: 'Homemade Pickle (Mango)', quantity: 1, estimatedPrice: '₹150', category: 'Condiments' },
      { id: '2', name: 'Fresh Rotis (Pack of 10)', quantity: 2, estimatedPrice: '₹80', category: 'Bread' },
      { id: '3', name: 'Dal Tadka (500ml)', quantity: 1, estimatedPrice: '₹120', category: 'Curry' },
      { id: '4', name: 'Homemade Ghee (250g)', quantity: 1, estimatedPrice: '₹200', category: 'Dairy' },
      { id: '5', name: 'Mixed Vegetable Curry', quantity: 1, estimatedPrice: '₹100', category: 'Curry' }
    ];
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setIsProcessing(true);

    try {
      const detectedItems = await processImage(file);
      setCartItems(detectedItems);
      toast.success(`Detected ${detectedItems.length} items from your list!`);
    } catch (error) {
      toast.error('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would open camera
    toast.info('Camera feature coming soon! Please use upload for now.');
  };

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = () => {
    if (cartItems.length === 0) {
      toast.error('No items to add to cart');
      return;
    }
    
    // In real app, this would add items to actual cart
    toast.success(`Added ${cartItems.length} items to cart!`);
    console.log('Cart items:', cartItems);
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setCartItems([]);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300 px-4 py-2 mb-4">
            📱 Smart Shopping
          </Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-ethnic-primary mb-4">
            Upload Your Shopping List
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take a photo of your handwritten list or upload an image. Our AI will automatically detect items and add them to your cart!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Your List
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!uploadedImage ? (
                  <div className="space-y-4">
                    {/* Upload Area */}
                    <div 
                      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-ethnic-primary mb-2">
                        Upload Shopping List Image
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Drag and drop or click to select an image of your shopping list
                      </p>
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="text-muted-foreground mb-4">Or</p>
                      <Button variant="ethnic" onClick={handleCameraCapture} className="w-full">
                        <Camera className="h-4 w-4 mr-2" />
                        Take Photo with Camera
                      </Button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Uploaded Image */}
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Uploaded shopping list"
                        className="w-full h-64 object-cover rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={resetUpload}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {isProcessing && (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-lg font-semibold text-ethnic-primary">
                          AI is analyzing your list...
                        </p>
                        <p className="text-muted-foreground">
                          This may take a few seconds
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tips */}
                <div className="bg-accent/20 rounded-lg p-4">
                  <h4 className="font-semibold text-ethnic-primary mb-2">📝 Tips for better results:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Ensure good lighting and clear handwriting</li>
                    <li>• Keep the list flat and avoid shadows</li>
                    <li>• Write items in separate lines</li>
                    <li>• Include quantities if needed (e.g., "2 kg rice")</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detected Items */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    Detected Items ({cartItems.length})
                  </span>
                  {cartItems.length > 0 && (
                    <Button variant="outline" size="sm" onClick={resetUpload}>
                      Clear All
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Upload an image to see detected items here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-semibold text-ethnic-primary">{item.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                            <span className="text-sm text-trust-green font-medium">
                              {item.estimatedPrice}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t">
                      <Button onClick={addToCart} className="w-full" size="lg">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add All Items to Cart
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* How it Works */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <div className="font-medium">Upload or Capture</div>
                    <div className="text-sm text-muted-foreground">Take a photo of your handwritten shopping list</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <div className="font-medium">AI Detection</div>
                    <div className="text-sm text-muted-foreground">Our AI reads and identifies items from your list</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <div className="font-medium">Review & Add</div>
                    <div className="text-sm text-muted-foreground">Review detected items and add them to your cart</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                  <div>
                    <div className="font-medium">Shop & Enjoy</div>
                    <div className="text-sm text-muted-foreground">Complete your order and get fresh homemade products</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UploadItems;