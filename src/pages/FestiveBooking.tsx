import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar'; // Assuming this is shadcn/ui calendar
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Mock Data (to be replaced or expanded)
const occasions = ["Diwali", "Holi", "Rakhi", "Christmas", "New Year", "Other"];
const hamperSizes = [
  { id: "small", name: "Small Hamper", price: 199, description: "A delightful selection for one." },
  { id: "medium", name: "Medium Hamper", price: 499, description: "Perfect for a small family." },
  { id: "large", name: "Large Hamper", price: 999, description: "A grand gesture for celebrations." },
];
const availableItems = [
  { id: "mithai_mix", name: "Assorted Mithai (250g)", category: "Sweets" },
  { id: "dry_fruits_small", name: "Dry Fruits Mix (100g)", category: "Healthy Bites" },
  { id: "diyas_set", name: "Decorative Diyas (Set of 4)", category: "Decorations" },
  { id: "chocolates_artisanal", name: "Artisanal Chocolates (Box of 6)", category: "Sweets" },
  { id: "savory_snacks_mix", name: "Namkeen Mix (200g)", category: "Savories" },
  { id: "scented_candle", name: "Scented Candle (Large)", category: "Decorations" },
  { id: "herbal_tea_set", name: "Herbal Tea Collection", category: "Healthy Bites" },
];

const FestiveBooking = () => {
  const [selectedOccasion, setSelectedOccasion] = useState<string | undefined>();
  const [selectedHamperSize, setSelectedHamperSize] = useState<string | undefined>();
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [specialNotes, setSpecialNotes] = useState("");
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>();

  const handleItemSelection = (itemId: string) => {
    setSelectedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOccasion || !selectedHamperSize || !deliveryDate) {
      toast.error("Please select an occasion, hamper size, and delivery date.");
      return;
    }
    const bookingDetails = {
      occasion: selectedOccasion,
      hamperSize: selectedHamperSize,
      items: Object.entries(selectedItems).filter(([,isSelected]) => isSelected).map(([id]) => id),
      notes: specialNotes,
      date: deliveryDate?.toISOString().split('T')[0],
    };
    console.log("Festive Hamper Booking:", bookingDetails);
    toast.success(`Hamper for ${selectedOccasion} booked! Details in console.`);
    // Reset form (optional)
    // setSelectedOccasion(undefined);
    // setSelectedHamperSize(undefined);
    // setSelectedItems({});
    // setSpecialNotes("");
    // setDeliveryDate(undefined);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-heading text-center text-ethnic-primary mb-8">
          Festive Hamper Booking
        </h1>

        <form onSubmit={handleSubmitBooking} className="space-y-8 max-w-3xl mx-auto">
          {/* Occasion Selection */}
          <Card>
            <CardHeader>
              <CardTitle>1. Select Occasion</CardTitle>
              <CardDescription>Choose the festival or event for your hamper.</CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedOccasion} value={selectedOccasion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an occasion" />
                </SelectTrigger>
                <SelectContent>
                  {occasions.map(occasion => (
                    <SelectItem key={occasion} value={occasion}>{occasion}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Hamper Size/Price Tiers */}
          <Card>
            <CardHeader>
              <CardTitle>2. Choose Hamper Size</CardTitle>
              <CardDescription>Pick the perfect size for your needs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {hamperSizes.map(size => (
                <div
                  key={size.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedHamperSize === size.id ? 'border-primary ring-2 ring-primary bg-primary/5' : 'hover:border-primary/50'}`}
                  onClick={() => setSelectedHamperSize(size.id)}
                >
                  <h3 className="font-semibold text-lg text-ethnic-primary">{size.name} - ₹{size.price}</h3>
                  <p className="text-sm text-muted-foreground">{size.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Content Customization */}
          <Card>
            <CardHeader>
              <CardTitle>3. Customize Your Hamper</CardTitle>
              <CardDescription>Select items you'd like to include (optional).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {availableItems.map(item => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={item.id}
                    checked={selectedItems[item.id] || false}
                    onCheckedChange={() => handleItemSelection(item.id)}
                  />
                  <Label htmlFor={item.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {item.name} <span className="text-xs text-muted-foreground">({item.category})</span>
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Special Notes */}
          <Card>
            <CardHeader>
              <CardTitle>4. Special Instructions</CardTitle>
              <CardDescription>Any specific requests or notes for the seller?</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="E.g., 'Please make it less spicy', 'Include a hand-written note: Happy Diwali!'"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Delivery Date */}
          <Card>
            <CardHeader>
              <CardTitle>5. Schedule Delivery</CardTitle>
              <CardDescription>Pick a date for when you'd like the hamper delivered.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={deliveryDate}
                onSelect={setDeliveryDate}
                className="rounded-md border"
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))} // Disable past dates
              />
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full font-semibold text-lg py-6">
            Book Your Festive Hamper
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default FestiveBooking;
