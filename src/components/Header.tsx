import { useState, ChangeEvent } from "react"; // Added useState, ChangeEvent
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, User, Heart, Map, Mic, Trophy, Upload, Utensils, Gift, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import useVoiceSearch from "@/hooks/useVoiceSearch"; // Import the hook
import { toast } from "sonner"; // For displaying messages

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const user = null; // Replace with actual user state when integrating auth

  const handleSearchResult = (transcript: string) => {
    setSearchTerm(transcript);
    // Optionally, navigate to search results page directly
    // navigate(`/search?q=${encodeURIComponent(transcript)}`);
    toast.success(`Voice search result: ${transcript}`);
  };

  const handleVoiceError = (error: string) => {
    toast.error(error);
  };

  const { isListening, isSupported, startListening } = useVoiceSearch({
    onResult: handleSearchResult,
    onError: handleVoiceError,
    lang: 'hi-IN', // Set to Hindi for elderly users, can be made configurable
  });

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      // Implement navigation to a search results page or filter logic
      console.log("Searching for:", searchTerm);
      navigate(`/explore?q=${encodeURIComponent(searchTerm.trim())}`); // Example navigation
      setSearchTerm(""); // Clear search term after submit
    }
  };

  const handleVoiceSearchClick = () => {
    if (!isSupported) {
      toast.error("Voice search is not supported in your browser.");
      return;
    }
    if (isListening) {
      // stopListening(); // Hook doesn't expose stop, it stops automatically
    } else {
      startListening();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-gentle">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/assets/logo.jpg" alt="गृहिणी Logo" className="h-10 w-auto" />
          </Link>

          {/* Navbar Links */}
          <nav className="hidden md:flex space-x-4 font-semibold text-md">
            <Link to="/explore" className="hover:text-primary transition-colors flex items-center gap-1">
              <Utensils className="h-4 w-4" /> Browse Products
            </Link>
            <Link to="/customise-food" className="hover:text-primary transition-colors flex items-center gap-1">
              <Users className="h-4 w-4" /> Customise Meal
            </Link>
            <Button type="button" variant="ghost" size="sm" className="flex items-center gap-1 px-2" onClick={handleVoiceSearchClick} aria-label="Voice search">
              <Mic className="h-4 w-4" /> Voice Search
            </Button>
            <Link to="/festive-booking" className="hover:text-primary transition-colors flex items-center gap-1">
              <Gift className="h-4 w-4" /> Festive Booking
            </Link>
            <Link to="/leaderboard" className="hover:text-primary transition-colors flex items-center gap-1">
              <Trophy className="h-4 w-4" /> Leaderboard
            </Link>
            <Link to="/upload-items" className="hover:text-primary transition-colors flex items-center gap-1">
              <Upload className="h-4 w-4" /> Upload Items
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder={isListening ? "Listening..." : "Search for homemade delights..."}
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              {isSupported && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={handleVoiceSearchClick}
                  aria-label="Voice search"
                  disabled={!isSupported}
                >
                  <Mic className={`h-5 w-5 ${isListening ? 'text-destructive animate-pulse' : 'text-muted-foreground hover:text-primary'}`} />
                </Button>
              )}
            </div>
          </form>

          {/* User/Login/Cart */}
          <div className="flex items-center space-x-2">
            <Link to="/cart">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0l1.7 6.385m-.383-7.822L6.75 7.5m0 0h10.5m-10.5 0l1.7 6.385m8.8-6.385l1.7 6.385m-1.7-6.385H6.75m10.5 0l.383-1.437A1.125 1.125 0 0 1 18.364 3h1.386m-1.769 4.5l1.7 6.385m-1.7-6.385H6.75" />
                </svg>
              </Button>
            </Link>
            {user ? (
              <Button variant="ethnic" size="sm" className="px-3">
                {user.name}
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="ethnic" size="sm" className="px-3">
                  Login / Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        <nav className="md:hidden flex justify-between mt-3 text-sm font-semibold">
          <Link to="/explore" className="flex-1 text-center py-2 hover:text-primary">Browse</Link>
          <Link to="/customise-food" className="flex-1 text-center py-2 hover:text-primary">Customise</Link>
          <Button type="button" variant="ghost" size="sm" className="flex-1 text-center py-2" onClick={handleVoiceSearchClick} aria-label="Voice search">
            Voice
          </Button>
          <Link to="/festive-booking" className="flex-1 text-center py-2 hover:text-primary">Festive</Link>
          <Link to="/leaderboard" className="flex-1 text-center py-2 hover:text-primary">Leaders</Link>
          <Link to="/upload-items" className="flex-1 text-center py-2 hover:text-primary">Upload</Link>
        </nav>

        {/* Mobile Search */}
        <form onSubmit={handleSearchSubmit} className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <input
              type="text"
              placeholder={isListening ? "Listening..." : "Search homemade products..."}
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="w-full pl-10 pr-10 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {isSupported && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                onClick={handleVoiceSearchClick}
                aria-label="Voice search"
                disabled={!isSupported}
              >
                <Mic className={`h-5 w-5 ${isListening ? 'text-destructive animate-pulse' : 'text-muted-foreground hover:text-primary'}`} />
              </Button>
            )}
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;